import { auth } from '@/auth'
import { canManagePages } from '@/lib/admin-permissions'
import { writeAuditRecord } from '@/lib/audit'
import { isLocalDevAuthBypass, isLoopbackHost, isStagingDeployment } from '@/lib/dev-auth'

/**
 * Handler-level backstop for the admin gate in `src/middleware.ts`.
 *
 * The middleware is the primary gate; route handlers call these helpers as well so
 * a matcher change, a mis-normalised path or a future runtime that skips middleware
 * cannot expose an admin API on its own. This replicates the middleware's
 * environment + session decision (NOT its CSRF check or response headers):
 *
 * - `VERCEL_ENV === 'production'` → 404.
 * - Off Vercel: only `next dev` with a loopback Host. Allowed without a session
 *   only when the developer opted out (`isLocalDevAuthBypass`); otherwise a valid
 *   Auth.js session is required (401 without one). Anything else → 404.
 * - The staging deployment (`isStagingDeployment`) → a valid session is required.
 * - Anything else → 404 (fails closed).
 *
 * Usage in a route handler (Node runtime):
 *
 *   const denied = await requireAdmin(req)
 *   if (denied) return denied
 *
 * Both helpers return `null` when the request may proceed, else the Response to send.
 */

type Decision =
  { kind: 'deny'; res: Response } | { kind: 'bypass' } | { kind: 'session'; email: string | null }

const notFound = () => new Response(null, { status: 404 })

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function logDenied(req: Request, actor: string, status: number, reason: string) {
  let target = req.url
  try {
    target = new URL(req.url).pathname
  } catch {
    // keep the raw URL
  }
  writeAuditRecord(req, actor, {
    action: 'access',
    target,
    status: 'denied',
    detail: `${req.method.toUpperCase()} ${status} ${reason} (handler)`,
  })
}

async function decide(req: Request): Promise<Decision> {
  const vercelEnv = process.env.VERCEL_ENV

  if (vercelEnv === 'production') return { kind: 'deny', res: notFound() }

  if (!vercelEnv) {
    if (process.env.NODE_ENV !== 'development') return { kind: 'deny', res: notFound() }
    if (!isLoopbackHost(req.headers.get('host'))) return { kind: 'deny', res: notFound() }
    if (isLocalDevAuthBypass()) return { kind: 'bypass' }
  } else if (!isStagingDeployment()) {
    return { kind: 'deny', res: notFound() }
  }

  let email: string | null = null
  let signedIn = false
  try {
    const session = await auth()
    signedIn = !!session?.user
    email = session?.user?.email ?? null
  } catch {
    signedIn = false
  }
  if (!signedIn) {
    logDenied(req, 'anonymous', 401, 'not signed in')
    return { kind: 'deny', res: json({ error: 'Unauthorized' }, 401) }
  }
  return { kind: 'session', email }
}

/** Allow any signed-in admin (or the explicit local-dev opt-out). */
export async function requireAdmin(req: Request): Promise<Response | null> {
  const d = await decide(req)
  return d.kind === 'deny' ? d.res : null
}

/**
 * Like `requireAdmin`, but additionally requires a `canManagePages` account — for
 * destructive page operations (delete, move). The local-dev opt-out is allowed.
 */
export async function requirePageManager(req: Request): Promise<Response | null> {
  const d = await decide(req)
  if (d.kind === 'deny') return d.res
  if (d.kind === 'bypass') return null
  if (!canManagePages(d.email)) {
    logDenied(req, d.email || 'unknown', 403, 'not a page manager')
    return json({ error: 'Forbidden: you are not allowed to delete or move pages' }, 403)
  }
  return null
}
