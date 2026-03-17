import { NextResponse } from 'next/server'

export interface PageListItem {
  slug: string
  title: string
  updatedAt: string | null
  hasDsl: boolean
}

/**
 * GET /api/pages
 * Lists all pages in src/app/ that have a page.dsl.json (managed by this platform).
 * Falls back to listing all directories with page.tsx if GitHub is not configured.
 */
export async function GET() {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = process.env.GITHUB_BRANCH ?? 'main'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  // Fetch src/app directory tree (recursive to find all page.dsl.json files)
  const treeRes = await fetch(`${baseUrl}/git/trees/${branch}?recursive=1`, { headers })

  if (!treeRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch repo tree' }, { status: 500 })
  }

  const tree = (await treeRes.json()) as { tree: { path: string; type: string }[] }

  // Find all src/app/{slug}/page.dsl.json paths
  const dslPaths = tree.tree
    .filter((f) => f.type === 'blob' && /^src\/app\/[^/]+\/page\.dsl\.json$/.test(f.path))
    .map((f) => f.path)

  // Skip internal/system directories
  const SKIP_DIRS = new Set(['api', 'admin', 'sections', 'developer', 'developers'])

  const pages: PageListItem[] = []
  for (const dslPath of dslPaths) {
    const slug = dslPath.split('/')[2]
    if (!slug || SKIP_DIRS.has(slug)) continue

    // Fetch DSL to extract title
    const dslRes = await fetch(`${baseUrl}/contents/${dslPath}?ref=${branch}`, { headers })
    let title = slug
    let updatedAt: string | null = null

    if (dslRes.ok) {
      const dslData = (await dslRes.json()) as { content: string }
      try {
        const dsl = JSON.parse(Buffer.from(dslData.content, 'base64').toString('utf-8'))
        title = dsl?.meta?.title ?? slug
      } catch {
        // keep slug as title
      }
    }

    // Get last commit date for this file
    const commitsRes = await fetch(`${baseUrl}/commits?path=${dslPath}&sha=${branch}&per_page=1`, {
      headers,
    })
    if (commitsRes.ok) {
      const commits = (await commitsRes.json()) as { commit?: { committer?: { date?: string } } }[]
      updatedAt = commits[0]?.commit?.committer?.date ?? null
    }

    pages.push({ slug, title, updatedAt, hasDsl: true })
  }

  return NextResponse.json({ pages })
}
