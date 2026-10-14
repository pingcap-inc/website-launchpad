import { NextRequest, NextResponse } from 'next/server'
import prettier from 'prettier'
import prettierConfig from '../../../../prettier.config.mjs'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import { SITE_BASE_URL } from '@/lib/env'
import { logAudit, resolveActor } from '@/lib/audit'
import { stampAuthorship } from '@/lib/authorship'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import type { PageDSL } from '@/lib/dsl-schema'

interface PublishRequest {
  slug: string
  dsl: PageDSL
  branch?: string
  addToSitemap?: boolean
  priority?: number
  changeFrequency?: string
}

function injectSitemapEntry(
  source: string,
  slug: string,
  priority: number,
  changeFrequency: string
): string {
  const newEntry = `  { url: '/${slug}/', priority: ${priority}, changeFrequency: '${changeFrequency}' },`
  const insertPoint = source.lastIndexOf('\n]')
  if (insertPoint === -1) throw new Error('Could not find sitemap routes array closing bracket')
  return source.slice(0, insertPoint) + '\n' + newEntry + source.slice(insertPoint)
}

function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  return segments.length > 0 && segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

// `branch` is interpolated into GitHub ref paths (git/refs/heads/<branch>), so an
// unvalidated value like `foo/../main` would normalize to `heads/main` when fetch
// parses the URL — writing to main while `branch === 'main'` is false, bypassing
// the PUBLISH_MAIN_TOKEN gate. Allow only plain git ref names: no percent-encoding,
// no empty/`.`/`..` path segments, no leading/trailing slash.
function isValidBranchName(branch: string) {
  if (!branch || branch.length > 255) return false
  if (branch.startsWith('/') || branch.endsWith('/')) return false
  if (!/^[A-Za-z0-9._/-]+$/.test(branch)) return false
  return branch.split('/').every((seg) => seg !== '' && seg !== '.' && seg !== '..')
}

export async function POST(request: NextRequest) {
  const { GITHUB_OWNER, GITHUB_REPO, VERCEL_OWNER } = process.env
  const mainPublishToken = process.env.PUBLISH_MAIN_TOKEN
  if (process.env.MOCK_PUBLISH_SUCCESS === '1') {
    const body = (await request.json().catch(() => ({}))) as PublishRequest
    const slug = body.slug ?? 'mock-page'
    const host = request.headers.get('host')
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL ?? (host ? `http://${host}` : '')
    const mockDeployUrl = `${baseUrl.replace(/\/$/, '')}/${slug}/`
    return NextResponse.json({
      success: true,
      pageCommitUrl: 'https://example.com/mock-commit',
      sitemapCommitUrl: body.addToSitemap ? 'https://example.com/mock-sitemap-commit' : undefined,
      deployUrl: mockDeployUrl,
    })
  }
  if (!GITHUB_OWNER || !GITHUB_REPO || !VERCEL_OWNER) {
    return NextResponse.json({ error: 'Environment variables not configured' }, { status: 500 })
  }

  const {
    slug,
    dsl,
    branch = process.env.GITHUB_BRANCH ?? 'staging',
    addToSitemap: _addToSitemapLegacy,
    priority = 0.7,
    changeFrequency = 'monthly',
  } = (await request.json()) as PublishRequest

  // Reject malformed branch names before any gate decision, so a value that
  // normalizes to a different ref (e.g. `foo/../main`) can't slip past the
  // `branch === 'main'` token check below and still write to main.
  if (!isValidBranchName(branch)) {
    return NextResponse.json({ error: 'Invalid branch name.' }, { status: 400 })
  }

  // Auto-add to sitemap when publishing to main; skip for feature/staging branches.
  // Unlisted / noindex pages are kept out of the sitemap — they stay live at their
  // URL but must not be surfaced for discovery.
  const addToSitemap = branch === 'main' && !dsl?.meta?.unlisted && !dsl?.meta?.noindex

  if (branch === 'main') {
    const providedToken = request.headers.get('x-publish-main-token')
    if (!mainPublishToken || !providedToken || providedToken !== mainPublishToken) {
      await logAudit(request, {
        action: 'publish',
        target: slug,
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

  if (!isValidSlugPath(slug)) {
    return NextResponse.json(
      { error: 'Invalid slug. Use lowercase letters, numbers, hyphens, and slashes only.' },
      { status: 400 }
    )
  }
  if (!dsl?.meta || !dsl?.sections) {
    return NextResponse.json({ error: 'Invalid DSL structure' }, { status: 400 })
  }

  // Record authorship (who/when) into the DSL meta before it is committed. The
  // creator is preserved if already set; the modifier is always the current user.
  const actor = await resolveActor()
  stampAuthorship(dsl, actor)

  const headers = await getGitHubAuthHeaders()
  if (!headers) {
    return NextResponse.json({ error: 'Environment variables not configured' }, { status: 500 })
  }
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

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
  const dslPath = `src/app/${slug}/page.dsl.json`

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
    { path: dslPath, content: dslJson },
  ]

  // Read and patch sitemap if requested
  if (addToSitemap) {
    const sitemapPath = 'src/app/launchpad-sitemap.xml/route.ts'
    const sitemapRes = await fetch(`${baseUrl}/contents/${sitemapPath}?ref=${branch}`, { headers })
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
    const err = (await refRes.json()) as { message?: string }
    return NextResponse.json(
      { success: false, error: err.message ?? `Branch '${branch}' not found`, step: 'ref' },
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
