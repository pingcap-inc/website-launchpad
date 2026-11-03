/**
 * Accounts allowed to run DESTRUCTIVE page operations from the admin: deleting a
 * page and moving (renaming) one. A move removes the page from its old URL on both
 * the draft and the published branch, so it is gated exactly like a delete.
 *
 * Everyone else who can sign in (any @pingcap.com account) can still edit, save
 * drafts, copy and publish. Local `pnpm dev` with `ADMIN_DEV_AUTH_BYPASS=1` (no
 * login) is not restricted; without the opt-out the same rule as staging applies.
 *
 * Enforced server-side in `src/middleware.ts` (403 on the paths in
 * DESTRUCTIVE_PAGE_PATHS) and again in the route handlers via `requirePageManager`
 * (`src/lib/security/require-admin.ts`). The UI only uses it to decide whether to
 * show the Delete button. To change who is allowed, edit PAGE_MANAGERS in a PR.
 */
const PAGE_MANAGERS = new Set(['liwen.xu@pingcap.com'])

/** True if `email` may delete or move pages. */
export function canManagePages(email: string | null | undefined): boolean {
  return !!email && PAGE_MANAGERS.has(email.trim().toLowerCase())
}

/** @deprecated Alias of `canManagePages` (delete and move share one allowlist). */
export const canDeletePages = canManagePages

/**
 * API endpoints that delete or move pages. Only `canManagePages` accounts may call
 * them wherever login is enforced (staging, and local dev without the opt-out).
 */
export const DESTRUCTIVE_PAGE_PATHS = ['/api/pages/delete', '/api/pages/move'] as const

/** True if `pathname` (with or without trailing slash) is a destructive page endpoint. */
export function isDestructivePagePath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '')
  return (DESTRUCTIVE_PAGE_PATHS as readonly string[]).includes(p)
}
