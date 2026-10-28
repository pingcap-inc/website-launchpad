import { auth } from '@/auth'

/**
 * Audit logging for state-changing admin operations.
 *
 * Emits one structured JSON line per operation, including who performed it (the
 * signed-in Google account), what they did, the target, and the outcome. On
 * Vercel these lines land in the deployment's runtime logs and can be forwarded
 * to a log drain for retention — no extra infra required.
 *
 * The actor comes from the Auth.js session, so it is only meaningful on the
 * staging deployment where login is enforced. Locally (login bypassed) the
 * actor is recorded as `local-dev`.
 */
export interface AuditEntry {
  /** Short verb for the operation, e.g. 'publish', 'delete', 'move'. */
  action: string
  /** Primary target of the operation (slug/path), when applicable. */
  target?: string
  /** Secondary target, e.g. the destination of a move/copy. */
  targetTo?: string
  /** Git branch the operation wrote to, when applicable. */
  branch?: string
  /** Whether the operation succeeded or failed. */
  status: 'success' | 'denied' | 'error'
  /** Free-form extra context (error message, counts, etc.). */
  detail?: string
}

/**
 * The current actor's identity for audit/authorship: the signed-in Google email,
 * or `local-dev` when login is bypassed locally, or `unknown` if unresolved.
 */
export async function resolveActor(): Promise<string> {
  try {
    const session = await auth()
    const email = session?.user?.email
    if (email) return email
  } catch {
    // auth() can throw if the session can't be read; fall through.
  }
  return process.env.VERCEL_ENV ? 'unknown' : 'local-dev'
}

/**
 * Client IP for the audit record. On Vercel, `x-vercel-forwarded-for` / `x-real-ip`
 * are set by the edge and overwrite any client-supplied value; the leftmost entry of
 * `x-forwarded-for` is whatever the client sent, so it is only used off-Vercel
 * (local dev), where it is not security-relevant.
 */
function clientIp(req: Request | null): string | undefined {
  if (!req) return undefined
  const first = (value: string | null) => value?.split(',')[0]?.trim() || undefined
  if (process.env.VERCEL) {
    return first(req.headers.get('x-vercel-forwarded-for')) ?? first(req.headers.get('x-real-ip'))
  }
  return first(req.headers.get('x-real-ip')) ?? first(req.headers.get('x-forwarded-for'))
}

export async function logAudit(req: Request | null, entry: AuditEntry): Promise<void> {
  const actor = await resolveActor()
  const ip = clientIp(req)

  const record = {
    ts: new Date().toISOString(),
    actor,
    ip,
    env: process.env.VERCEL_ENV ?? 'local',
    ...entry,
  }

  // Single-line, greppable, structured. Prefixed so log drains can filter it.
  console.log(`[audit] ${JSON.stringify(record)}`)
}
