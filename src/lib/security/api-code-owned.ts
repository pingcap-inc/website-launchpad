/**
 * The single definition of a "code-owned" page directory, shared by every admin
 * route that writes, moves, copies or deletes pages (publish, draft-save, move,
 * delete, copy, local-generate). Previously each route had its own variant, and the
 * weakest one (draft-save: page.tsx only, checked on the draft branch only) could
 * let a DSL land beside a hand-authored page and flip publish's classification.
 *
 * A directory is:
 * - `cms`        — it holds a page.dsl.json (the CMS owns the page);
 * - `code-owned` — it holds a route/page file below with no page.dsl.json, or the
 *                  path is a file rather than a directory (hand-authored; the CMS
 *                  must never overwrite, move, delete or attach a DSL to it);
 * - `missing`    — neither (absent, or only layouts/sub-directories).
 */

/** Files that make a directory a hand-authored page or a non-page route. */
export const CODE_OWNED_FILES: ReadonlySet<string> = new Set([
  'page.tsx',
  'page.jsx',
  'page.js',
  'page.mdx',
  'route.ts',
  'route.js',
])

/** The file whose presence marks a directory as CMS-managed. */
export const CMS_MARKER_FILE = 'page.dsl.json'

export type PageDirKind = 'missing' | 'cms' | 'code-owned'

/** Classify a directory from the names of the files directly inside it. */
export function classifyPageDir(fileNames: Iterable<string>): PageDirKind {
  const names = new Set(fileNames)
  if (names.has(CMS_MARKER_FILE)) return 'cms'
  for (const name of names) {
    if (CODE_OWNED_FILES.has(name)) return 'code-owned'
  }
  return 'missing'
}

/** True when the directory holds a page/route file and no page.dsl.json. */
export function isCodeOwnedDir(fileNames: Iterable<string>): boolean {
  return classifyPageDir(fileNames) === 'code-owned'
}

/**
 * Classify `src/app/<slug>` on `branch` through the GitHub contents API. Fails
 * closed: anything other than a definitive 404 or a directory listing throws, so a
 * caller can never mistake a transient error for "nothing there".
 * `slug` must already be validated with normalizePageSlug/isValidPageSlug.
 */
export async function classifyRepoPageDir(
  baseUrl: string,
  headers: Record<string, string>,
  slug: string,
  branch: string
): Promise<PageDirKind> {
  const res = await fetch(`${baseUrl}/contents/src/app/${slug}?ref=${encodeURIComponent(branch)}`, {
    headers,
  })
  if (res.status === 404) return 'missing'
  if (!res.ok) throw new Error(`Failed to inspect src/app/${slug} on ${branch} (${res.status})`)
  const data = (await res.json()) as unknown
  // A file (not a directory) at the slug path is never a valid page target.
  if (!Array.isArray(data)) return 'code-owned'
  return classifyPageDir(
    data.map((entry) => {
      const e = entry as { name?: unknown; type?: unknown }
      // A sub-directory is not a page file; anything else (file, symlink) counts.
      return e.type !== 'dir' && typeof e.name === 'string' ? e.name : ''
    })
  )
}
