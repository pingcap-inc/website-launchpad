/**
 * Accounts allowed to delete pages from the admin on staging. Everyone else who can
 * sign in (any @pingcap.com account) can still edit, save drafts, copy, move and
 * publish. Local `pnpm dev` has no login and is not restricted.
 *
 * Enforced server-side in `src/middleware.ts` (403 on /api/pages/delete); the pages
 * list only uses it to decide whether to show the Delete button.
 */
const PAGE_DELETERS = new Set(['liwen.xu@pingcap.com'])

export function canDeletePages(email: string | null | undefined): boolean {
  return !!email && PAGE_DELETERS.has(email.trim().toLowerCase())
}
