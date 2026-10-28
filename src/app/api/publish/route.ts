import { NextRequest, NextResponse } from 'next/server'
import prettier from 'prettier'
import prettierConfig from '../../../../prettier.config.mjs'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import { SITE_BASE_URL } from '@/lib/env'
import { logAudit, resolveActor } from '@/lib/audit'
import { stampAuthorship } from '@/lib/authorship'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import {
  DRAFT_BRANCH,
  isValidPageSlug,
  publishedBranch,
  safeEqual,
} from '@/lib/security/api-guards'
import type { PageDSL } from '@/lib/dsl-schema'

interface PublishRequest {
  slug: string
  dsl: PageDSL
  branch?: string
  addToSitemap?: boolean
  priority?: number
  changeFrequency?: string
}

const CHANGE_FREQUENCIES = new Set([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
])

// Route files that mark a directory as code-owned (or as a non-page route). The CMS
// must never overwrite or sit beside these — a page.tsx with no page.dsl.json is a
// hand-authored page, and a page next to a route.ts fails the build.
const CODE_OWNED_FILES = new Set([
  'page.tsx',
  'page.jsx',
  'page.js',
  'page.mdx',
  'route.ts',
  'route.js',
])

function injectSitemapEntry(
  source: string,
  slug: string,
  priority: number,
  changeFrequency: string
): string {
  // Both values are validated by the caller (finite number in [0, 1], and a member
  // of CHANGE_FREQUENCIES), so nothing here can break out of the literal.
  const newEntry = `  { url: '/${slug}/', priority: ${priority}, changeFrequency: '${changeFrequency}' },`
  const insertPoint = source.lastIndexOf('\n]')
  if (insertPoint === -1) throw new Error('Could not find sitemap routes array closing bracket')
  return source.slice(0, insertPoint) + '\n' + newEntry + source.slice(insertPoint)
}

// Only staging (or the configured GITHUB_BRANCH) and main are publish targets. An allowlist
// (rather than a ref-name syntax check) also rules out dot-segment values like
// `foo/../main` that would normalize to a different ref in the GitHub URL and slip
// past the `branch === 'main'` token gate below.
function isAllowedPublishBranch(branch: unknown): branch is string {
  return (
    typeof branch === 'string' &&
    (branch === 'main' || branch === 'staging' || branch === publishedBranch())
  )
}

type DirState = { kind: 'missing' } | { kind: 'cms' } | { kind: 'code-owned' }

// Classify the target directory on the branch being published to, so a publish can
// create a new page or update a CMS page but never overwrite a code-owned one.
async function readTargetDir(
  baseUrl: string,
  headers: Record<string, string>,
  slug: string,
  branch: string
): Promise<DirState> {
  const res = await fetch(`${baseUrl}/contents/src/app/${slug}?ref=${encodeURIComponent(branch)}`, {
    headers,
  })
  if (res.status === 404) return { kind: 'missing' }
  if (!res.ok) throw new Error('Failed to inspect target path')
  const data = (await res.json()) as unknown
  // A file (not a directory) at the slug path is never a valid page target.
  if (!Array.isArray(data)) return { kind: 'code-owned' }
  const names = new Set(data.map((entry) => (entry as { name?: string }).name ?? ''))
  if (names.has('page.dsl.json')) return { kind: 'cms' }
  for (const name of names) {
    if (CODE_OWNED_FILES.has(name)) return { kind: 'code-owned' }
  }
  return { kind: 'missing' }
}

// The previously-committed creator, read from the repo (never from the request).
async function readPriorAuthorship(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string
): Promise<{ createdBy?: string; createdAt?: string } | null> {
  const res = await fetch(`${baseUrl}/contents/${path}?ref=${encodeURIComponent(branch)}`, {
    headers,
  })
  if (!res.ok) return null
  try {
    const data = (await res.json()) as { content?: string }
    if (!data.content) return null
    const prior = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')) as PageDSL
    if (!prior?.meta?.createdBy) return null
    return { createdBy: prior.meta.createdBy, createdAt: prior.meta.createdAt }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  const { GITHUB_OWNER, GITHUB_REPO, VERCEL_OWNER } = process.env
  const mainPublishToken = process.env.PUBLISH_MAIN_TOKEN

  let body: PublishRequest
  try {
    body = (await request.json()) as PublishRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const {
    slug,
    dsl,
    branch = publishedBranch(),
    addToSitemap: _addToSitemapLegacy,
    priority = 0.7,
    changeFrequency = 'monthly',
  } = body

  // Reject non-allowlisted branches before any gate decision.
  if (!isAllowedPublishBranch(branch)) {
    return NextResponse.json({ error: 'Invalid branch name.' }, { status: 400 })
  }

  if (branch === 'main') {
    const providedToken = request.headers.get('x-publish-main-token')
    if (!mainPublishToken || !providedToken || !safeEqual(providedToken, mainPublishToken)) {
      await logAudit(request, {
        action: 'publish',
        target: typeof slug === 'string' ? slug : undefined,
        branch,
        status: 'denied',
        detail: 'missing or invalid x-publish-main-token',
      })
      return NextResponse.json(
        {
          error: 'Publishing to main is restricted. Provide a valid x-publish-main-token header.',
        },
        { status: 403 }
      )
    }
  }

  if (!isValidPageSlug(slug)) {
    return NextResponse.json(
      { error: 'Invalid slug. Use lowercase letters, numbers, hyphens, and slashes only.' },
      { status: 400 }
    )
  }
  if (!dsl?.meta || !Array.isArray(dsl?.sections)) {
    return NextResponse.json({ error: 'Invalid DSL structure' }, { status: 400 })
  }
  if (
    typeof priority !== 'number' ||
    !Number.isFinite(priority) ||
    priority < 0 ||
    priority > 1 ||
    typeof changeFrequency !== 'string' ||
    !CHANGE_FREQUENCIES.has(changeFrequency)
  ) {
    return NextResponse.json(
      { error: 'Invalid sitemap priority or changeFrequency' },
      { status: 400 }
    )
  }

  // Mock mode (local/e2e) short-circuits only after the same validation and gate as
  // a real publish, and is still audited.
  if (process.env.MOCK_PUBLISH_SUCCESS === '1') {
    await logAudit(request, {
      action: 'publish',
      target: slug,
      branch,
      status: 'success',
      detail: 'mock',
    })
    const host = request.headers.get('host')
    const mockBase = process.env.NEXT_PUBLIC_SITE_BASE_URL ?? (host ? `http://${host}` : '')
    return NextResponse.json({
      success: true,
      pageCommitUrl: 'https://example.com/mock-commit',
      sitemapCommitUrl: body.addToSitemap ? 'https://example.com/mock-sitemap-commit' : undefined,
      deployUrl: `${mockBase.replace(/\/$/, '')}/${slug}/`,
    })
  }

  if (!GITHUB_OWNER || !GITHUB_REPO || !VERCEL_OWNER) {
    return NextResponse.json({ error: 'Environment variables not configured' }, { status: 500 })
  }

  // Auto-add to sitemap when publishing to main; skip for feature/staging branches.
  // Unlisted / noindex pages are kept out of the sitemap — they stay live at their
  // URL but must not be surfaced for discovery.
  const addToSitemap = branch === 'main' && !dsl.meta.unlisted && !dsl.meta.noindex

  const headers = await getGitHubAuthHeaders()
  if (!headers) {
    return NextResponse.json({ error: 'Environment variables not configured' }, { status: 500 })
  }
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  let targetDir: DirState
  try {
    targetDir = await readTargetDir(baseUrl, headers, slug, branch)
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to inspect target path', step: 'inspect' },
      { status: 500 }
    )
  }
  if (targetDir.kind === 'code-owned') {
    await logAudit(request, {
      action: 'publish',
      target: slug,
      branch,
      status: 'denied',
      detail: 'target is code-owned (no page.dsl.json)',
    })
    return NextResponse.json(
      {
        error:
          'Refusing to overwrite a code-owned page or route at this path. Choose another slug or edit it in the repository.',
      },
      { status: 409 }
    )
  }

  // Record authorship (who/when) into the DSL meta before it is committed. The
  // creator is carried forward from the repo — the already-published DSL, else the
  // draft — never from the request; the modifier is always the current user.
  const dslRepoPath = `src/app/${slug}/page.dsl.json`
  const prior =
    (targetDir.kind === 'cms'
      ? await readPriorAuthorship(baseUrl, headers, dslRepoPath, branch)
      : null) ?? (await readPriorAuthorship(baseUrl, headers, dslRepoPath, DRAFT_BRANCH))
  const actor = await resolveActor()
  stampAuthorship(dsl, actor, {
    priorCreatedBy: prior?.createdBy,
    priorCreatedAt: prior?.createdAt,
  })

  // Generate page.tsx from DSL, then format with the repo's Prettier config so the
  // committed output is byte-identical to what local `prettier --write` produces.
  // Without this, admin-published pages land unformatted and diverge from local code.
  //
  // The options are imported, not resolved from disk. `prettier.resolveConfig()`
  // takes a *file* path and searches upward from its parent directory, so the
  // previous `resolveConfig(process.cwd())` looked one level above the repo,
  // found nothing, and silently fell back to Prettier's defaults (double quotes,
  // semicolons) — which is how admin-published pages picked up a whole-file
  // reformat on every publish. A deployed serverless bundle has no .prettierrc
  // on disk either, so importing is the only reliable source here.
  const prettierOptions = prettierConfig
  const pagePath = `src/app/${slug}/page.tsx`

  const pageCode = await prettier.format(dslToTsx(dsl, slug), {
    ...prettierOptions,
    parser: 'typescript',
  })
  const dslJson = await prettier.format(JSON.stringify(dsl), {
    ...prettierOptions,
    parser: 'json',
  })

  // Collect all files to commit
  const files: { path: string; content: string }[] = [
    { path: pagePath, content: pageCode },
    { path: dslRepoPath, content: dslJson },
  ]

  // Read and patch sitemap if requested
  if (addToSitemap) {
    const sitemapPath = 'src/app/launchpad-sitemap.xml/route.ts'
    const sitemapRes = await fetch(
      `${baseUrl}/contents/${sitemapPath}?ref=${encodeURIComponent(branch)}`,
      { headers }
    )
    if (sitemapRes.ok) {
      const sitemapData = (await sitemapRes.json()) as { content: string }
      const sitemapSource = Buffer.from(sitemapData.content, 'base64').toString('utf-8')
      try {
        const patched = injectSitemapEntry(sitemapSource, slug, priority, changeFrequency)
        const formatted = await prettier.format(patched, {
          ...prettierOptions,
          parser: 'typescript',
        })
        files.push({ path: sitemapPath, content: formatted })
      } catch {
        // Sitemap patch failure is non-fatal — proceed without it
      }
    }
  }

  // --- Git Trees API: batch all files into a single commit ---

  // 1. Get current branch HEAD commit SHA
  const refRes = await fetch(`${baseUrl}/git/ref/heads/${branch}`, { headers })
  if (!refRes.ok) {
    return NextResponse.json(
      { success: false, error: `Branch '${branch}' not found`, step: 'ref' },
      { status: 500 }
    )
  }
  const {
    object: { sha: headSha },
  } = (await refRes.json()) as { object: { sha: string } }

  // 2. Get the tree SHA of the HEAD commit
  const commitRes = await fetch(`${baseUrl}/git/commits/${headSha}`, { headers })
  if (!commitRes.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch HEAD commit', step: 'commit' },
      { status: 500 }
    )
  }
  const {
    tree: { sha: baseTreeSha },
  } = (await commitRes.json()) as { tree: { sha: string } }

  // 3. Create blobs for each file
  const treeItems = await Promise.all(
    files.map(async ({ path, content }) => {
      const blobRes = await fetch(`${baseUrl}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, encoding: 'utf-8' }),
      })
      const { sha: blobSha } = (await blobRes.json()) as { sha: string }
      return { path, mode: '100644', type: 'blob', sha: blobSha }
    })
  )

  // 4. Create new tree
  const treeRes = await fetch(`${baseUrl}/git/trees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
  })
  if (!treeRes.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to create git tree', step: 'tree' },
      { status: 500 }
    )
  }
  const { sha: newTreeSha } = (await treeRes.json()) as { sha: string }

  // 5. Create commit
  const hasSitemap = files.some((f) => f.path === 'src/app/launchpad-sitemap.xml/route.ts')
  const commitMessage = hasSitemap
    ? `feat: publish /${slug}/ and add to sitemap`
    : `feat: publish /${slug}/`

  const newCommitRes = await fetch(`${baseUrl}/git/commits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message: commitMessage, tree: newTreeSha, parents: [headSha] }),
  })
  if (!newCommitRes.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to create commit', step: 'commit-create' },
      { status: 500 }
    )
  }
  const { sha: newCommitSha, html_url: commitHtmlUrl } = (await newCommitRes.json()) as {
    sha: string
    html_url: string
  }

  // 6. Update branch ref
  const updateRefRes = await fetch(`${baseUrl}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ sha: newCommitSha }),
  })
  if (!updateRefRes.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to update branch ref', step: 'update-ref' },
      { status: 500 }
    )
  }

  const deployUrl =
    branch === 'main'
      ? `https://www.pingcap.com/${slug}/`
      : `${SITE_BASE_URL.replace(/\/$/, '') || `https://${GITHUB_REPO}-git-${branch.replace(/[^a-z0-9]/g, '-')}-${VERCEL_OWNER}.vercel.app`}/${slug}/`

  await logAudit(request, {
    action: 'publish',
    target: slug,
    branch,
    status: 'success',
    detail: hasSitemap ? 'page + sitemap' : 'page',
  })

  return NextResponse.json({
    success: true,
    pageCommitUrl: commitHtmlUrl,
    sitemapCommitUrl: hasSitemap ? commitHtmlUrl : undefined,
    deployUrl,
  })
}
