import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

/**
 * The only email domain allowed to sign in to the admin surface. Access to the
 * CMS and its API routes is restricted to PingCAP employees' Google accounts.
 */
const ALLOWED_DOMAIN = 'pingcap.com'

/** True only for a Google account whose email is on the allowed corporate domain. */
export function isAllowedEmail(email?: string | null): boolean {
  if (!email) return false
  const at = email.lastIndexOf('@')
  return at !== -1 && email.slice(at + 1).toLowerCase() === ALLOWED_DOMAIN
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Preview deployments get rotating *.vercel.app hostnames; trustHost lets
  // Auth.js accept them without a per-deploy AUTH_URL.
  trustHost: true,
  // Use our own branded sign-in page instead of the bare Auth.js default.
  // The middleware must leave /admin/login reachable without a session.
  pages: { signIn: '/admin/login' },
  // A real secret MUST be set (AUTH_SECRET) on every deployed environment. The
  // fallback applies ONLY to local `next dev` off Vercel, so it doesn't crash —
  // local requests are never gated on it (the middleware skips Auth.js there).
  // Anywhere else a missing AUTH_SECRET leaves `secret` undefined and Auth.js fails
  // closed (MissingSecret) instead of signing sessions with a public string.
  secret:
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV === 'development' && !process.env.VERCEL_ENV
      ? 'dev-only-insecure-secret'
      : undefined),
  // JWT sessions can't be revoked server-side, so keep their lifetime short: a
  // stolen or departed-employee session dies within a working day. Active users
  // get the cookie re-issued at most hourly (sliding window).
  session: { strategy: 'jwt', maxAge: 12 * 60 * 60, updateAge: 60 * 60 },
  providers: [
    // clientId / clientSecret are read from AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET.
    Google({
      // `hd` narrows Google's own account chooser to the domain — a hint only,
      // trivially spoofable, so the signIn callback below is the real gate.
      authorization: { params: { hd: ALLOWED_DOMAIN, prompt: 'select_account' } },
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      const verified = (profile as { email_verified?: boolean } | undefined)?.email_verified
      return Boolean(verified) && isAllowedEmail(profile?.email)
    },
  },
})
