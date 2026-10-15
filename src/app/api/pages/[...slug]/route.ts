import { NextRequest, NextResponse } from 'next/server'
import { logAudit, resolveActor } from '@/lib/audit'
import { stampAuthorship } from '@/lib/authorship'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import type { PageDSL } from '@/lib/dsl-schema'

const SKIP_SLUGS = new Set(['api', 'admin', 'sections'])

function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  if (segments.length === 0) return false
  if (SKIP_SLUGS.has(segments[0])) return false
  return segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

function getSlug(params: { slug?: string[] }) {
  return (params.slug ?? []).join('/')
}

/**
 * GET /api/pages/[...slug]
 * Fetches the page.dsl.json for the given slug path from GitHub.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugParts } = await params
  const slug = getSlug({ slug: slugParts })
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = req.nextUrl.searchParams.get('branch') ?? process.env.GITHUB_BRANCH ?? 'staging'

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!isValidSlugPath(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const dslPath = `src/app/${slug}/page.dsl.json`
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dslPath}?ref=${branch}`,
    { headers }
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
 * PUT /api/pages/[...slug]
 * Saves an updated page.dsl.json to GitHub (draft save — does not publish page.tsx).
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugParts } = await params
  const slug = getSlug({ slug: slugParts })
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = process.env.GITHUB_BRANCH ?? 'staging'

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!isValidSlugPath(slug)) {
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

  // Check for existing SHA (upsert). The contents response also carries the prior
  // file, so we read the previous creator from it and carry it forward — the
  // original creator survives even if this payload dropped the field.
  let sha: string | undefined
  let priorCreatedBy: string | undefined
  let priorCreatedAt: string | undefined
  const check = await fetch(
    `${baseUrl}/contents/${dslPath}?ref=${encodeURIComponent(writeBranch)}`,
    { headers }
  )
  if (check.ok) {
    const existing = (await check.json()) as { sha: string; content?: string }
    sha = existing.sha
    if (existing.content) {
      try {
        const prior = JSON.parse(
          Buffer.from(existing.content, 'base64').toString('utf-8')
        ) as PageDSL
        priorCreatedBy = prior?.meta?.createdBy
        priorCreatedAt = prior?.meta?.createdAt
      } catch {
        // Unparseable prior DSL — fall back to stamping a fresh creator.
      }
    }
  }

  const actor = await resolveActor()
  stampAuthorship(dsl, actor, { priorCreatedBy, priorCreatedAt })

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

  await logAudit(req, {
    action: 'draft-save',
    target: slug,
    branch: writeBranch,
    status: 'success',
  })

  return NextResponse.json({ success: true })
}
