import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/security/require-admin'
import { logAudit, resolveActor } from '@/lib/audit'
import { stampAuthorship } from '@/lib/authorship'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import {
  DRAFT_BRANCH,
  isValidPageSlug,
  publishedBranch,
  readJsonBody,
} from '@/lib/security/api-guards'
import { classifyRepoPageDir } from '@/lib/security/api-code-owned'
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

// A DSL is a few hundred KB at most; 2 MB leaves ample headroom.
const DSL_BODY_LIMIT = 2 * 1024 * 1024

// A git blob sha as the GitHub contents API reports it.
function isBlobSha(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{40}$/.test(value)
}

function getSlug(params: { slug?: string[] }) {
  return (params.slug ?? []).join('/')
}

/**
 * GET /api/pages/[...slug]
 * Fetches the page.dsl.json for the given slug path from GitHub.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const denied = await requireAdmin(req)
  if (denied) return denied
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

  const data = (await res.json()) as { content: string; sha?: string }
  try {
    const dsl = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')) as PageDSL
    // The blob sha lets a client save with `baseSha` (optimistic concurrency, see PUT).
    return NextResponse.json(dsl, {
      headers: isBlobSha(data.sha) ? { 'x-dsl-sha': data.sha } : undefined,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to parse DSL JSON' }, { status: 500 })
  }
}

/**
 * PUT /api/pages/[...slug]
 * Saves an updated page.dsl.json to the draft branch (draft save — does not publish
 * page.tsx). Only the draft branch is writable here: the published (staging) branch
 * is written exclusively by /api/publish, which validates the DSL, regenerates
 * page.tsx and records a `publish` audit entry.
 *
 * Optimistic concurrency: a client may send `baseSha` — the blob sha it loaded (the
 * GET response's `x-dsl-sha` header), or `null` when it is creating the draft. If the
 * draft changed since, the save is refused with 409 instead of overwriting it. When
 * `baseSha` is omitted the save is last-writer-wins (legacy behaviour).
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const { slug: slugParts } = await params
  const slug = getSlug({ slug: slugParts })
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const pubBranch = publishedBranch()
  const writeBranch = DRAFT_BRANCH

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }
  if (!isValidPageSlug(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const parsed = await readJsonBody<{ dsl: PageDSL; branch?: unknown; baseSha?: unknown }>(
    req,
    DSL_BODY_LIMIT
  )
  if (!parsed.ok) return parsed.response
  const body = parsed.data
  const { dsl } = body

  const audit = (status: 'success' | 'denied' | 'error', detail?: string) =>
    logAudit(req, { action: 'draft-save', target: slug, branch: writeBranch, status, detail })

  // Draft saves go to the draft branch only. `branch` is still accepted for
  // compatibility, but only when it names the draft branch.
  if (body.branch !== undefined && body.branch !== DRAFT_BRANCH) {
    await audit('denied', 'non-draft branch requested')
    return NextResponse.json(
      {
        error: `Draft saves can only write to ${DRAFT_BRANCH}. Use Publish to update ${pubBranch}.`,
      },
      { status: 400 }
    )
  }
  const baseSha = body.baseSha
  if (baseSha !== undefined && baseSha !== null && !isBlobSha(baseSha)) {
    return NextResponse.json({ error: 'Invalid baseSha' }, { status: 400 })
  }
  if (!dsl?.meta || typeof dsl.meta !== 'object' || !Array.isArray(dsl.sections)) {
    return NextResponse.json({ error: 'dsl is required' }, { status: 400 })
  }

  const dslPath = `src/app/${slug}/page.dsl.json`
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  // A draft DSL for a hand-authored page would make publish (and delete/move) treat
  // it as a CMS page. Ownership is decided on the published branch — where publish
  // will write — whatever branch this save targets. Fails closed.
  try {
    if ((await classifyRepoPageDir(baseUrl, headers, slug, pubBranch)) === 'code-owned') {
      await audit('denied', `code-owned page on ${pubBranch}`)
      return NextResponse.json(
        { error: 'Refusing to attach a DSL to a code-owned page.' },
        { status: 409 }
      )
    }
  } catch {
    await audit('error', 'code-owned check failed')
    return NextResponse.json(
      { error: 'Could not verify the page is not code-owned' },
      { status: 502 }
    )
  }

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
  } else if (check.status !== 404) {
    await audit('error', `read existing draft failed (${check.status})`)
    return NextResponse.json({ error: 'Failed to read existing DSL' }, { status: 500 })
  }

  // Someone else saved (or created/deleted) this draft since the client loaded it.
  if (baseSha !== undefined && (baseSha ?? undefined) !== sha) {
    await audit('denied', 'stale baseSha (draft changed since it was loaded)')
    return NextResponse.json(
      {
        error: 'This draft was changed by someone else. Reload it before saving.',
        sha: sha ?? null,
      },
      { status: 409 }
    )
  }

  // First draft of an already-published page: carry its creator over from the
  // published DSL so editing a page doesn't re-attribute it.
  if (!priorCreatedBy) {
    const published = await fetch(
      `${baseUrl}/contents/${dslPath}?ref=${encodeURIComponent(pubBranch)}`,
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
  // GitHub rejects the write (409) if the file's sha no longer matches, so a save
  // racing another one between our read and this write cannot overwrite it either.
  if (sha) putBody.sha = sha

  const res = await fetch(`${baseUrl}/contents/${dslPath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(putBody),
  })

  if (!res.ok) {
    console.error('[pages] DSL save failed:', res.status, await res.text().catch(() => ''))
    if (res.status === 409 || res.status === 422) {
      await audit('denied', `github ${res.status} (concurrent change)`)
      return NextResponse.json(
        { error: 'This draft was changed by someone else. Reload it before saving.' },
        { status: 409 }
      )
    }
    await audit('error', `github ${res.status}`)
    return NextResponse.json({ error: 'Failed to save DSL' }, { status: 500 })
  }

  const saved = (await res.json().catch(() => ({}))) as { content?: { sha?: string } }
  await audit('success')

  return NextResponse.json({ success: true, sha: saved.content?.sha })
}
