import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server'
import { auth } from '@/auth'

/**
 * Gates the admin surface (`/admin/*`) and its API routes (`/api/*`).
 *
 * - Production: fully disabled (404). Auth.js is never invoked here, so a missing
 *   AUTH_SECRET in production can't surface as a 500 on these paths.
 * - Any deployed branch other than `staging` (per-PR previews, etc.): also 404,
 *   so the admin only ever appears on the single staging deployment.
 * - Local development (`next dev`, i.e. NODE_ENV === 'development'): no login gate
 *   (localhost is not internet-exposed). Auth.js is not invoked either, keeping the
 *   dev loop friction-free.
 * - Anything else without VERCEL_ENV (e.g. `next start` on a non-Vercel host):
 *   404. The gate fails CLOSED — an unknown environment never gets an open admin.
 * - Staging preview: requires a signed-in Google user on the @pingcap.com domain
 *   (enforced by the `signIn` callback in `@/auth`). The staging URL is public, so
 *   login — not obscurity — is what protects it.
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

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  const vercelEnv = process.env.VERCEL_ENV

  // Production: admin fully disabled. Return before touching Auth.js.
  if (vercelEnv === 'production') {
    return new NextResponse(null, { status: 404 })
  }

  // Not on Vercel. Only genuine local development (`next dev`) is let through
  // ungated; any other host (e.g. `next start` on a VM) fails closed.
  if (!vercelEnv) {
    if (process.env.NODE_ENV !== 'development') {
      return new NextResponse(null, { status: 404 })
    }
    if (isCrossOriginApiWrite(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.next()
  }

  // Deployed but not the staging branch (VERCEL_ENV is 'preview' for every branch
  // preview, so distinguish by the deployed git ref). Hide admin on those too.
  if (process.env.VERCEL_GIT_COMMIT_REF !== 'staging') {
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
  return stagingGate(req, ev as unknown as Parameters<typeof stagingGate>[1])
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
