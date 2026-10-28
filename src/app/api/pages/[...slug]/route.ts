import { NextRequest, NextResponse } from 'next/server'
import { logAudit, resolveActor } from '@/lib/audit'
import { stampAuthorship } from '@/lib/authorship'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import {
  DRAFT_BRANCH,
  isValidPageSlug,
  publishedBranch,
  readJsonBody,
} from '@/lib/security/api-guards'
import type { PageDSL } from '@/lib/dsl-schema'

// The admin only ever reads/writes DSLs on the draft branch or the published
// (staging) branch. Anything else — notably `main`, or a value that would be
// interpolated into the GitHub URL — is refused.
function isAllowedBranch(branch: string) {
  return branch === DRAFT_BRANCH || branch === 'staging' || branch === publishedBranch()
}

// The creator recorded in a committed DSL (base64 contents-API payload), if any.
function creatorOf(content: string | undefined): { createdBy?: string; createdAt?: string } {
  if (!content) return {}
  try {
    const prior = JSON.parse(Buffer.from(content, 'base64').toString('utf-8')) as PageDSL
    return { createdBy: prior?.meta?.createdBy, createdAt: prior?.meta?.createdAt }
  } catch {
    // Unparseable prior DSL — fall back to stamping a fresh creator.
    return {}
  }
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
  const branch = req.nextUrl.searchParams.get('branch') ?? publishedBranch()
  if (!isAllowedBranch(branch)) {
    return NextResponse.json({ error: 'Invalid branch' }, { status: 400 })
  }

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!isValidPageSlug(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const dslPath = `src/app/${slug}/page.dsl.json`
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dslPath}?ref=${encodeURIComponent(branch)}`,
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
  const branch = publishedBranch()

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!isValidPageSlug(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const parsed = await readJsonBody<{ dsl: PageDSL; branch?: string }>(req)
  if (!parsed.ok) return parsed.response
  const body = parsed.data
  const { dsl } = body
  // Allow caller to override branch (e.g. 'drafts/ai' for draft saves), within the allowlist.
  const writeBranch = body.branch ?? branch
  if (typeof writeBranch !== 'string' || !isAllowedBranch(writeBranch)) {
    return NextResponse.json({ error: 'Invalid branch' }, { status: 400 })
  }
  if (!dsl?.meta || !Array.isArray(dsl.sections)) {
    return NextResponse.json({ error: 'dsl is required' }, { status: 400 })
  }

  const dslPath = `src/app/${slug}/page.dsl.json`
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  // Check for existing SHA (upsert). The contents response also carries the prior
  // file, so we read the previous creator from it and carry it forward. Authorship
  // always comes from the repo, never from the request payload.
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
    ;({ createdBy: priorCreatedBy, createdAt: priorCreatedAt } = creatorOf(existing.content))
  } else if (check.status === 404 && writeBranch !== DRAFT_BRANCH) {
    // Creating a new DSL on the published branch. If a hand-authored page.tsx
    // already lives there, a DSL beside it would make the CMS treat the page as
    // its own (and allow it to be deleted/moved/overwritten) — refuse.
    const codePage = await fetch(
      `${baseUrl}/contents/src/app/${slug}/page.tsx?ref=${encodeURIComponent(writeBranch)}`,
      { headers }
    )
    if (codePage.ok) {
      await logAudit(req, {
        action: 'draft-save',
        target: slug,
        branch: writeBranch,
        status: 'denied',
        detail: 'code-owned page (page.tsx with no page.dsl.json)',
      })
      return NextResponse.json(
        { error: 'Refusing to attach a DSL to a code-owned page.' },
        { status: 409 }
      )
    }
  } else if (!check.ok && check.status !== 404) {
    return NextResponse.json({ error: 'Failed to read existing DSL' }, { status: 500 })
  }

  // First draft of an already-published page: carry its creator over from the
  // published DSL so editing a page doesn't re-attribute it.
  if (!priorCreatedBy && writeBranch === DRAFT_BRANCH) {
    const published = await fetch(
      `${baseUrl}/contents/${dslPath}?ref=${encodeURIComponent(branch)}`,
      { headers }
    )
    if (published.ok) {
      const data = (await published.json()) as { content?: string }
      ;({ createdBy: priorCreatedBy, createdAt: priorCreatedAt } = creatorOf(data.content))
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
    console.error('[pages] DSL save failed:', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ error: 'Failed to save DSL' }, { status: 500 })
  }

  await logAudit(req, {
    action: 'draft-save',
    target: slug,
    branch: writeBranch,
    status: 'success',
  })

  return NextResponse.json({ success: true })
}
