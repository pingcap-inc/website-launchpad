import { NextResponse } from 'next/server'

export interface PageListItem {
  slug: string
  title: string
  updatedAt: string | null
  hasDsl: boolean
  hasPublished: boolean
  hasDraft: boolean
  isCode: boolean
}

const SKIP_DIRS = new Set(['api', 'admin', 'sections'])
const DSL_PATH_RE = /^src\/app\/(.+)\/page\.dsl\.json$/
const CODE_PATH_RE = /^src\/app\/(.+)\/page\.(tsx|jsx|mdx)$/
const DRAFT_BRANCH = 'drafts/ai'

function toTitleCase(input: string) {
  return input
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getGitHubHeaders() {
  const { GITHUB_TOKEN } = process.env
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

function isPublicRoutePath(routePath: string) {
  const segments = routePath.split('/').filter(Boolean)
  if (segments.length === 0) return false
  if (SKIP_DIRS.has(segments[0])) return false
  for (const segment of segments) {
    if (segment.startsWith('(') && segment.endsWith(')')) return false
    if (segment.startsWith('[') && segment.endsWith(']')) return false
    if (segment.startsWith('_')) return false
  }
  return true
}

async function fetchTree(
  baseUrl: string,
  branch: string,
  headers: Record<string, string>,
  allowMissing: boolean
) {
  const res = await fetch(`${baseUrl}/git/trees/${branch}?recursive=1`, { headers })
  if (!res.ok) {
    if (allowMissing) return null
    throw new Error('Failed to fetch repo tree')
  }
  return (await res.json()) as { tree: { path: string; type: string }[] }
}

async function fetchDslTitle(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string,
  slug: string
) {
  const res = await fetch(`${baseUrl}/contents/${path}?ref=${branch}`, { headers })
  if (!res.ok) return slug
  const data = (await res.json()) as { content: string }
  try {
    const dsl = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
    return dsl?.pageName ?? dsl?.meta?.title ?? slug
  } catch {
    return slug
  }
}

async function fetchLastCommitDate(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string
) {
  const res = await fetch(`${baseUrl}/commits?path=${path}&sha=${branch}&per_page=1`, {
    headers,
  })
  if (!res.ok) return null
  const commits = (await res.json()) as { commit?: { committer?: { date?: string } } }[]
  return commits[0]?.commit?.committer?.date ?? null
}

function createLimiter(max: number) {
  let active = 0
  const queue: Array<() => void> = []

  const next = () => {
    active -= 1
    const run = queue.shift()
    if (run) run()
  }

  return <T>(fn: () => Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      const run = () => {
        active += 1
        fn().then(resolve).catch(reject).finally(next)
      }
      if (active < max) run()
      else queue.push(run)
    })
}

type CacheEntry = {
  ts: number
  data: { pages: PageListItem[] }
}

const CACHE_TTL_MS = 60_000
const cacheKey = (params: URLSearchParams) => `pages:${params.toString() || 'default'}`

/**
 * GET /api/pages
 * Lists pages under src/app. Includes published DSL pages, draft-only DSL pages,
 * and code-only pages (page.tsx/page.jsx/page.mdx).
 */
export async function GET(req: Request) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = process.env.GITHUB_BRANCH ?? 'staging'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const url = new URL(req.url)
  const cacheId = cacheKey(url.searchParams)
  const cached = (globalThis as { __pagesCache?: Map<string, CacheEntry> }).__pagesCache
  if (cached) {
    const entry = cached.get(cacheId)
    if (entry && Date.now() - entry.ts < CACHE_TTL_MS) {
      return NextResponse.json(entry.data)
    }
  }

  const onlyDsl = url.searchParams.get('onlyDsl') === '1'
  const includeDrafts = url.searchParams.get('includeDrafts') !== '0'
  const includeCode = !onlyDsl && url.searchParams.get('includeCode') !== '0'
  const includeTitle = url.searchParams.get('includeTitle') !== '0'
  const includeUpdated = url.searchParams.get('includeUpdated') !== '0'

  const headers = getGitHubHeaders()
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  let mainTree: { tree: { path: string; type: string }[] } | null = null
  let draftTree: { tree: { path: string; type: string }[] } | null = null

  try {
    mainTree = await fetchTree(baseUrl, branch, headers, false)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch repo tree' }, { status: 500 })
  }
  if (!mainTree) {
    return NextResponse.json({ error: 'Failed to fetch repo tree' }, { status: 500 })
  }

  if (includeDrafts) {
    draftTree = await fetchTree(baseUrl, DRAFT_BRANCH, headers, true)
  }

  const publishedDslPaths = new Map<string, string>()
  const draftDslPaths = new Map<string, string>()
  const codePagePaths = new Map<string, string>()

  for (const item of mainTree.tree) {
    if (item.type !== 'blob') continue
    const dslMatch = item.path.match(DSL_PATH_RE)
    if (dslMatch) {
      const slug = dslMatch[1]
      if (isPublicRoutePath(slug)) publishedDslPaths.set(slug, item.path)
      continue
    }
    if (includeCode) {
      const codeMatch = item.path.match(CODE_PATH_RE)
      if (codeMatch) {
        const slug = codeMatch[1]
        if (isPublicRoutePath(slug)) codePagePaths.set(slug, item.path)
      }
    }
  }

  if (draftTree) {
    for (const item of draftTree.tree) {
      if (item.type !== 'blob') continue
      const dslMatch = item.path.match(DSL_PATH_RE)
      if (!dslMatch) continue
      const slug = dslMatch[1]
      if (isPublicRoutePath(slug)) draftDslPaths.set(slug, item.path)
    }
  }

  const slugs = new Set<string>([
    ...publishedDslPaths.keys(),
    ...draftDslPaths.keys(),
    ...codePagePaths.keys(),
  ])

  const limiter = createLimiter(12)
  const sortedSlugs = Array.from(slugs).sort((a, b) => a.localeCompare(b))

  const pages = await Promise.all(
    sortedSlugs.map((slug) =>
      limiter(async () => {
        const publishedPath = publishedDslPaths.get(slug)
        const draftPath = draftDslPaths.get(slug)
        const codePath = codePagePaths.get(slug)

        const hasPublishedDsl = !!publishedPath
        const hasDraftDsl = !!draftPath
        const isCode = !hasPublishedDsl && !hasDraftDsl && !!codePath
        const hasDsl = hasPublishedDsl || hasDraftDsl

        const titleSourcePath = publishedPath ?? draftPath
        const titleSourceBranch = publishedPath ? branch : draftPath ? DRAFT_BRANCH : branch
        const title = includeTitle
          ? titleSourcePath
            ? await fetchDslTitle(baseUrl, headers, titleSourcePath, titleSourceBranch, slug)
            : toTitleCase(slug)
          : toTitleCase(slug)

        const updatedPath = draftPath ?? publishedPath ?? codePath
        const updatedBranch = draftPath ? DRAFT_BRANCH : branch
        const updatedAt =
          includeUpdated && updatedPath
            ? await fetchLastCommitDate(baseUrl, headers, updatedPath, updatedBranch)
            : null

        return {
          slug,
          title,
          updatedAt,
          hasDsl,
          hasPublished: hasPublishedDsl,
          hasDraft: hasDraftDsl,
          isCode,
        } as PageListItem
      })
    )
  )

  const payload = { pages }
  if (!cached) {
    ;(globalThis as { __pagesCache?: Map<string, CacheEntry> }).__pagesCache = new Map([
      [cacheId, { ts: Date.now(), data: payload }],
    ])
  } else {
    cached.set(cacheId, { ts: Date.now(), data: payload })
  }

  return NextResponse.json(payload)
}
