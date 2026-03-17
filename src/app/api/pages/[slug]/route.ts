import { NextRequest, NextResponse } from 'next/server'
import type { PageDSL } from '@/lib/dsl-schema'

const SKIP_SLUGS = new Set(['api', 'admin', 'sections', 'developer', 'developers'])

function getGitHubHeaders() {
  const { GITHUB_TOKEN } = process.env
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

/**
 * GET /api/pages/[slug]
 * Fetches the page.dsl.json for the given slug from GitHub.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = req.nextUrl.searchParams.get('branch') ?? process.env.GITHUB_BRANCH ?? 'main'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!slug || SKIP_SLUGS.has(slug) || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const dslPath = `src/app/${slug}/page.dsl.json`
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dslPath}?ref=${branch}`,
    { headers: getGitHubHeaders() }
  )

  if (res.status === 404) {
    return NextResponse.json({ error: 'Page DSL not found' }, { status: 404 })
  }
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch DSL' }, { status: 500 })
  }

  const data = (await res.json()) as { content: string }
  try {
    const dsl = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')) as PageDSL
    return NextResponse.json(dsl)
  } catch {
    return NextResponse.json({ error: 'Failed to parse DSL JSON' }, { status: 500 })
  }
}

/**
 * PUT /api/pages/[slug]
 * Saves an updated page.dsl.json to GitHub (draft save — does not publish page.tsx).
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = process.env.GITHUB_BRANCH ?? 'main'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!slug || SKIP_SLUGS.has(slug) || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const body = (await req.json()) as { dsl: PageDSL; branch?: string }
  const { dsl } = body
  // Allow caller to override branch (e.g. 'drafts/ai' for draft saves)
  const writeBranch = body.branch ?? branch
  if (!dsl) {
    return NextResponse.json({ error: 'dsl is required' }, { status: 400 })
  }

  const dslPath = `src/app/${slug}/page.dsl.json`
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
  const headers = getGitHubHeaders()

  // Check for existing SHA (upsert)
  let sha: string | undefined
  const check = await fetch(
    `${baseUrl}/contents/${dslPath}?ref=${encodeURIComponent(writeBranch)}`,
    { headers }
  )
  if (check.ok) {
    const existing = (await check.json()) as { sha: string }
    sha = existing.sha
  }

  const putBody: Record<string, unknown> = {
    message: `chore: update DSL draft for /${slug}/`,
    content: Buffer.from(JSON.stringify(dsl, null, 2), 'utf-8').toString('base64'),
    branch: writeBranch,
  }
  if (sha) putBody.sha = sha

  const res = await fetch(`${baseUrl}/contents/${dslPath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(putBody),
  })

  if (!res.ok) {
    const err = (await res.json()) as { message?: string }
    return NextResponse.json({ error: err.message ?? 'Failed to save DSL' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
