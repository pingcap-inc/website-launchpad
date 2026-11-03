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
