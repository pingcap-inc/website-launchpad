import { NextRequest, NextResponse } from 'next/server'

const DRAFT_BRANCH = 'drafts/ai'

function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  if (segments.length === 0) return false
  return segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

function getGitHubHeaders() {
  const { GITHUB_TOKEN } = process.env
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

async function readFile(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string
) {
  const res = await fetch(
    `${baseUrl}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${branch}`,
    { headers }
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to read ${path} on ${branch}`)
  const data = (await res.json()) as { sha: string; content: string }
  return {
    sha: data.sha,
    content: Buffer.from(data.content, 'base64').toString('utf-8'),
  }
}

async function fileExists(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string
) {
  const res = await fetch(
    `${baseUrl}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${branch}`,
    { headers }
  )
  if (res.status === 404) return false
  if (!res.ok) throw new Error(`Failed to check ${path} on ${branch}`)
  return true
}

async function writeFile(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string,
  content: string,
  message: string
) {
  const res = await fetch(`${baseUrl}/contents/${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      branch,
    }),
  })
  if (!res.ok) {
    const err = (await res.json()) as { message?: string }
    throw new Error(err.message ?? `Failed to write ${path} on ${branch}`)
  }
}

// Rewrite the duplicated DSL's identity so it stands on its own:
// point the SEO canonical at the new slug instead of the source's.
function reslugDsl(raw: string, toSlug: string): string {
  let dsl: unknown
  try {
    dsl = JSON.parse(raw)
  } catch {
    // If the DSL isn't parseable JSON, copy it verbatim rather than fail.
    return raw
  }
  if (dsl && typeof dsl === 'object') {
    const obj = dsl as { meta?: { canonical?: string } }
    if (obj.meta && typeof obj.meta === 'object') {
      obj.meta.canonical = `/${toSlug}/`
    }
  }
  return `${JSON.stringify(dsl, null, 2)}\n`
}

export async function POST(req: NextRequest) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const publishedBranch = process.env.GITHUB_BRANCH ?? 'staging'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  let body: { from?: string; to?: string }
  try {
    body = (await req.json()) as { from?: string; to?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const from = body.from?.replace(/^\/|\/$/g, '') ?? ''
  const to = body.to?.replace(/^\/|\/$/g, '') ?? ''
  if (!isValidSlugPath(from) || !isValidSlugPath(to)) {
    return NextResponse.json({ error: 'Invalid slug path' }, { status: 400 })
  }
  if (from === to) {
    return NextResponse.json({ error: 'Source and destination are the same' }, { status: 400 })
  }

  const headers = getGitHubHeaders()
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  const destDraftPath = `src/app/${to}/page.dsl.json`
  const destPublishedPath = `src/app/${to}/page.tsx`

  try {
    // Refuse to clobber an existing page at the destination slug.
    const [draftTaken, publishedTaken] = await Promise.all([
      fileExists(baseUrl, headers, destDraftPath, DRAFT_BRANCH),
      fileExists(baseUrl, headers, destPublishedPath, publishedBranch),
    ])
    if (draftTaken || publishedTaken) {
      return NextResponse.json({ error: `A page already exists at /${to}/` }, { status: 409 })
    }

    // Seed the duplicate from the source's best-available DSL:
    // prefer the published DSL (final content), fall back to the draft.
    const source =
      (await readFile(baseUrl, headers, `src/app/${from}/page.dsl.json`, publishedBranch)) ??
      (await readFile(baseUrl, headers, `src/app/${from}/page.dsl.json`, DRAFT_BRANCH))

    if (!source) {
      return NextResponse.json(
        { error: `No editable DSL found for /${from}/ to copy from` },
        { status: 404 }
      )
    }

    // The duplicate always lands as a fresh draft — it goes through the
    // normal review → publish flow rather than going live immediately.
    const content = reslugDsl(source.content, to)
    await writeFile(
      baseUrl,
      headers,
      destDraftPath,
      DRAFT_BRANCH,
      content,
      `chore: duplicate page /${from}/ -> /${to}/`
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error during copy'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  return NextResponse.json({ success: true, slug: to })
}
