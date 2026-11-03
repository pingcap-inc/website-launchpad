/**
 * Whether the admin may run WITHOUT a login on this process.
 *
 * Secure by default: login is required everywhere unless a developer explicitly
 * opts out for their own machine by putting `ADMIN_DEV_AUTH_BYPASS=1` in
 * `.env.local`. The opt-out only counts under `next dev` off Vercel, and the
 * middleware additionally requires a loopback Host (and `pnpm dev` binds to
 * 127.0.0.1). A container/VM started with NODE_ENV=development, or a fresh checkout
 * without the flag, therefore still requires a signed-in @pingcap.com account.
 */
export function isLocalDevAuthBypass(): boolean {
  return (
    !process.env.VERCEL_ENV &&
    process.env.NODE_ENV === 'development' &&
    process.env.ADMIN_DEV_AUTH_BYPASS === '1'
  )
}

/** Hostnames accepted on the ungated local-dev path (port is ignored). */
const LOOPBACK_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1'])

/** True when a `Host` header value names a loopback address (any port). */
export function isLoopbackHost(host: string | null | undefined): boolean {
  if (!host) return false
  // Strip the port: "[::1]:3000" -> "[::1]", "localhost:3000" -> "localhost".
  const hostname = host.startsWith('[') ? host.slice(0, host.indexOf(']') + 1) : host.split(':')[0]
  return LOOPBACK_HOSTNAMES.has(hostname.toLowerCase())
}

/** The only Git repository whose `staging` branch deployment may serve the admin. */
const ADMIN_REPO_OWNER = 'pingcap-inc'
const ADMIN_REPO_SLUG = 'website-launchpad'

/**
 * True only on the Vercel preview deployment of the `staging` branch of
 * pingcap-inc/website-launchpad. The branch name alone is not trusted: it is also
 * checked against the Vercel system env vars for the source repository, so a
 * `staging` branch in a fork (or another repo wired to the same project) does not
 * qualify. Fails closed when any of the vars is missing.
 */
export function isStagingDeployment(): boolean {
  return (
    process.env.VERCEL_ENV === 'preview' &&
    process.env.VERCEL_GIT_COMMIT_REF === 'staging' &&
    (process.env.VERCEL_GIT_REPO_OWNER ?? '').toLowerCase() === ADMIN_REPO_OWNER &&
    (process.env.VERCEL_GIT_REPO_SLUG ?? '').toLowerCase() === ADMIN_REPO_SLUG
  )
}
