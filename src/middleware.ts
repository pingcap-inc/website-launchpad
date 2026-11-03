import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server'
import { auth } from '@/auth'
import { canDeletePages } from '@/lib/admin-permissions'
import { isLocalDevAuthBypass } from '@/lib/dev-auth'

/**
 * Gates the admin surface (`/admin/*`) and its API routes (`/api/*`).
 *
 * - Production: fully disabled (404). Auth.js is never invoked here, so a missing
 *   AUTH_SECRET in production can't surface as a 500 on these paths.
 * - Any deployed branch other than `staging` (per-PR previews, etc.): also 404,
 *   so the admin only ever appears on the single staging deployment.
 * - Local development (`next dev`, i.e. NODE_ENV === 'development'): login is
 *   REQUIRED by default, exactly as on staging. A developer may opt out for their
 *   own machine with `ADMIN_DEV_AUTH_BYPASS=1` in `.env.local` (see
 *   `isLocalDevAuthBypass`); even then only loopback requests are let through —
 *   `pnpm dev` binds to 127.0.0.1, and any request whose Host isn't localhost /
 *   127.0.0.1 / [::1] is refused (defense in depth against DNS rebinding).
 * - Anything else without VERCEL_ENV (e.g. `next start` on a non-Vercel host):
 *   404. The gate fails CLOSED — an unknown environment never gets an open admin.
 * - Staging preview: requires a signed-in Google user on the @pingcap.com domain
 *   (enforced by the `signIn` callback in `@/auth`). The staging URL is public, so
 *   login — not obscurity — is what protects it.
 *
 * - Staging, page deletion: only the accounts in `canDeletePages`
 *   (`@/lib/admin-permissions`) may call the endpoints in DELETE_ONLY_PATHS;
 *   everyone else gets 403.
 *
 * On every environment where the admin is reachable (local dev, staging), a
 * state-changing `/api/*` request carrying a cross-origin `Origin` header is
 * rejected (403) as a CSRF guard. `/api/auth/*` is excluded: Auth.js runs its own
 * CSRF-token check there. Same-origin fetches from the admin UI send a matching
 * Origin; server-to-server callers send none, so neither is affected.
 */

const STATE_CHANGING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

/** True for a state-changing /api request that a browser marked as cross-origin. */
function isCrossOriginApiWrite(req: NextRequest): boolean {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/api/') || pathname.startsWith('/api/auth/')) return false
  if (!STATE_CHANGING_METHODS.has(req.method.toUpperCase())) return false

  const origin = req.headers.get('origin')
  if (origin) return origin !== req.nextUrl.origin

  // No Origin header: browsers that omit it still send Fetch Metadata.
  return req.headers.get('sec-fetch-site') === 'cross-site'
}

/** Hostnames accepted on the ungated local-dev path (port is ignored). */
const LOOPBACK_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1'])

/** True when the request's Host header names a loopback address (any port). */
function isLoopbackHost(req: NextRequest): boolean {
  const host = req.headers.get('host')
  if (!host) return false
  // Strip the port: "[::1]:3000" -> "[::1]", "localhost:3000" -> "localhost".
  const hostname = host.startsWith('[') ? host.slice(0, host.indexOf(']') + 1) : host.split(':')[0]
  return LOOPBACK_HOSTNAMES.has(hostname.toLowerCase())
}

/** Endpoints that delete pages. Only `canDeletePages` accounts may call them on staging. */
const DELETE_ONLY_PATHS = ['/api/pages/delete']

function isDeleteOnlyPath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '')
  return DELETE_ONLY_PATHS.includes(p)
}

// The authenticated gate for staging. Wrapping with `auth()` resolves the session
// into `req.auth`, so this runs ONLY for staging (see the dispatcher below).
const stagingGate = auth((req) => {
  const { pathname } = req.nextUrl

  // Auth.js endpoints must stay reachable so the sign-in round-trip can complete.
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // The custom sign-in page itself must be reachable without a session, otherwise
  // redirecting unauthenticated users to it would loop. Match the trailing-slash
  // form too — `trailingSlash` is enabled, so requests normalize to /admin/login/.
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return NextResponse.next()
  }

  // `req.auth` is set only for a session that cleared the @pingcap.com signIn gate.
  if (req.auth) {
    // Only designated accounts may delete pages.
    if (isDeleteOnlyPath(pathname)) {
      if (!canDeletePages(req.auth.user?.email)) {
        return NextResponse.json(
          { error: 'Forbidden: you are not allowed to delete pages' },
          { status: 403 }
        )
      }
    }
    return NextResponse.next()
  }

  // Unauthenticated: APIs get a 401; browser navigation goes straight to the
  // branded sign-in page (not /api/auth/signin — that adds an extra redirect hop).
  if (pathname.startsWith('/api')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const signInUrl = new URL('/admin/login', req.nextUrl.origin)
  signInUrl.searchParams.set('callbackUrl', req.nextUrl.href)
  return NextResponse.redirect(signInUrl)
})

// Staging is served straight from Vercel, so it doesn't get the proxy-layer security
// headers that www.pingcap.com has. Add the ones that matter for an authenticated
// admin: no framing by other sites (clickjacking), no MIME sniffing, no full-URL
// referrers leaking draft slugs. The /admin/preview iframe is same-origin, so
// `frame-ancestors 'self'` keeps it working.
const ADMIN_SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'Content-Security-Policy': "frame-ancestors 'self'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

function withSecurityHeaders(res: Response | void | null): Response | void | null {
  if (!res) return res
  for (const [name, value] of Object.entries(ADMIN_SECURITY_HEADERS)) {
    res.headers.set(name, value)
  }
  return res
}

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const vercelEnv = process.env.VERCEL_ENV

  // Production: admin fully disabled. Return before touching Auth.js.
  if (vercelEnv === 'production') {
    return new NextResponse(null, { status: 404 })
  }

  // Not on Vercel. Only `next dev` may serve the admin at all; any other host
  // (e.g. `next start` on a VM) fails closed.
  if (!vercelEnv) {
    if (process.env.NODE_ENV !== 'development') {
      return new NextResponse(null, { status: 404 })
    }
    // Defense in depth (DNS rebinding / a dev server accidentally bound to 0.0.0.0):
    // the local admin only answers to a loopback Host.
    if (!isLoopbackHost(req)) {
      return new NextResponse(null, { status: 404 })
    }
    if (isCrossOriginApiWrite(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    // Login is skipped only when the developer explicitly opted out locally.
    if (isLocalDevAuthBypass()) {
      return withSecurityHeaders(NextResponse.next())
    }
    return withSecurityHeaders(
      await stagingGate(req, ev as unknown as Parameters<typeof stagingGate>[1])
    )
  }

  // Deployed but not the staging branch (VERCEL_ENV is 'preview' for every branch
  // preview, so distinguish by the deployed git ref). Hide admin on those too.
  // Fails closed: an unknown VERCEL_ENV value, or a missing ref, is not staging.
  if (vercelEnv !== 'preview' || process.env.VERCEL_GIT_COMMIT_REF !== 'staging') {
    return new NextResponse(null, { status: 404 })
  }

  // CSRF guard ahead of the session check, so a cross-site write is refused even
  // when the victim's browser carries a valid staging session cookie.
  if (isCrossOriginApiWrite(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Staging only: run the authenticated gate (this is where Auth.js runs).
  // `auth()`'s result is typed for route-handler context, but at runtime Next
  // passes a NextFetchEvent (both carry `waitUntil`); cast to its param type.
  return withSecurityHeaders(
    await stagingGate(req, ev as unknown as Parameters<typeof stagingGate>[1])
  )
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
