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

async function readSha(
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
  const data = (await res.json()) as { sha: string }
  return data.sha
}

async function deleteFile(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string,
  sha: string,
  message: string
) {
  const res = await fetch(`${baseUrl}/contents/${path}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ message, sha, branch }),
  })
  if (!res.ok) {
    const err = (await res.json()) as { message?: string }
    throw new Error(err.message ?? `Failed to delete ${path} on ${branch}`)
  }
}

export async function POST(req: NextRequest) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const publishedBranch = process.env.GITHUB_BRANCH ?? 'staging'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const body = (await req.json()) as {
    slug: string
    includeDraft?: boolean
    includePublished?: boolean
  }

  const slug = body.slug?.replace(/^\/|\/$/g, '')
  if (!isValidSlugPath(slug)) {
    return NextResponse.json({ error: 'Invalid slug path' }, { status: 400 })
  }

  const includeDraft = body.includeDraft !== false
  const includePublished = body.includePublished !== false

  const headers = getGitHubHeaders()
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
  const message = `chore: delete page /${slug}/`

  const targets: Array<{ branch: string; path: string }> = []

  if (includePublished) {
    targets.push(
      { branch: publishedBranch, path: `src/app/${slug}/page.tsx` },
      { branch: publishedBranch, path: `src/app/${slug}/page.dsl.json` }
    )
  }

  if (includeDraft) {
    targets.push({ branch: DRAFT_BRANCH, path: `src/app/${slug}/page.dsl.json` })
  }

  let deleted = 0
  for (const target of targets) {
    const sha = await readSha(baseUrl, headers, target.path, target.branch)
    if (!sha) continue
    await deleteFile(baseUrl, headers, target.path, target.branch, sha, message)
    deleted += 1
  }

  if (deleted === 0) {
    return NextResponse.json({ error: 'No matching files to delete' }, { status: 404 })
  }

  return NextResponse.json({ success: true, deleted })
}
