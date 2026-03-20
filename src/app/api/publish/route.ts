import { NextRequest, NextResponse } from 'next/server'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import { SITE_BASE_URL } from '@/lib/env'
import type { PageDSL } from '@/lib/dsl-schema'

interface PublishRequest {
  slug: string
  dsl: PageDSL
  branch?: string
  addToSitemap?: boolean
  priority?: number
  changeFrequency?: string
  triggerScore?: boolean
}

function injectSitemapEntry(
  source: string,
  slug: string,
  priority: number,
  changeFrequency: string
): string {
  const newEntry = `    { url: '/${slug}/', priority: ${priority}, changeFrequency: '${changeFrequency}' },`
  const insertPoint = source.lastIndexOf('\n  ]')
  if (insertPoint === -1) throw new Error('Could not find sitemap routes array closing bracket')
  return source.slice(0, insertPoint) + '\n' + newEntry + source.slice(insertPoint)
}

function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  return segments.length > 0 && segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

export async function POST(request: NextRequest) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, VERCEL_OWNER } = process.env
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
      scoreTriggered: false,
    })
  }
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !VERCEL_OWNER) {
    return NextResponse.json({ error: 'Environment variables not configured' }, { status: 500 })
  }

  const {
    slug,
    dsl,
    branch = process.env.GITHUB_BRANCH ?? 'staging',
    addToSitemap = false,
    priority = 0.7,
    changeFrequency = 'monthly',
    triggerScore,
  } = (await request.json()) as PublishRequest

  if (branch === 'main') {
    const providedToken = request.headers.get('x-publish-main-token')
    if (!mainPublishToken || !providedToken || providedToken !== mainPublishToken) {
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

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  // Generate page.tsx from DSL
  const pageCode = dslToTsx(dsl, slug)
  const pagePath = `src/app/${slug}/page.tsx`
  const dslPath = `src/app/${slug}/page.dsl.json`

  // Collect all files to commit
  const files: { path: string; content: string }[] = [
    { path: pagePath, content: pageCode },
    { path: dslPath, content: JSON.stringify(dsl, null, 2) },
  ]

  // Read and patch sitemap if requested
  if (addToSitemap) {
    const sitemapPath = 'src/app/sitemap.ts'
    const sitemapRes = await fetch(`${baseUrl}/contents/${sitemapPath}?ref=${branch}`, { headers })
    if (sitemapRes.ok) {
      const sitemapData = (await sitemapRes.json()) as { content: string }
      const sitemapSource = Buffer.from(sitemapData.content, 'base64').toString('utf-8')
      try {
        const patched = injectSitemapEntry(sitemapSource, slug, priority, changeFrequency)
        files.push({ path: sitemapPath, content: patched })
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
  const hasSitemap = files.some((f) => f.path === 'src/app/sitemap.ts')
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

  const shouldTriggerScore = triggerScore ?? process.env.ENABLE_PAGE_SCORING_ON_PUBLISH === '1'
  let scoreTriggered = false
  let scoreTriggerError: string | undefined
  let scoreTriggerSkipped = false
  let scoreTriggerReason: string | undefined

  if (shouldTriggerScore) {
    const sampleEveryRaw = process.env.SCORE_PUBLISH_EVERY_N
    const sampleEvery = sampleEveryRaw ? Number(sampleEveryRaw) : 0
    if (sampleEveryRaw && (!Number.isFinite(sampleEvery) || sampleEvery < 1)) {
      scoreTriggerError = 'Invalid SCORE_PUBLISH_EVERY_N'
    } else if (sampleEvery >= 2) {
      const seed = parseInt(newCommitSha.slice(-2), 16)
      if (!Number.isFinite(seed) || seed % sampleEvery !== 0) {
        scoreTriggerSkipped = true
        scoreTriggerReason = `Skipped by sampling rule (every ${sampleEvery} publishes)`
      }
    }
  }

  if (shouldTriggerScore && !scoreTriggerSkipped && !scoreTriggerError) {
    const host = request.headers.get('host')
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL ?? (host ? `http://${host}` : null)
    const triggerToken = process.env.SCORE_TRIGGER_TOKEN
    if (baseUrl && triggerToken) {
      try {
        const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/score-trigger`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-score-token': triggerToken,
          },
          body: JSON.stringify({ slug, baseUrl }),
        })
        if (res.ok) {
          scoreTriggered = true
        } else {
          scoreTriggerError = 'Failed to trigger scoring'
        }
      } catch {
        scoreTriggerError = 'Failed to trigger scoring'
      }
    } else {
      scoreTriggerError = 'Scoring not configured'
    }
  }

  return NextResponse.json({
    success: true,
    pageCommitUrl: commitHtmlUrl,
    sitemapCommitUrl: hasSitemap ? commitHtmlUrl : undefined,
    deployUrl,
    scoreTriggered,
    scoreTriggerError,
    scoreTriggerSkipped,
    scoreTriggerReason,
  })
}
