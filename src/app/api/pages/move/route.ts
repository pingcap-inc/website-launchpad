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
    from: string
    to: string
    includeDraft?: boolean
    includePublished?: boolean
  }

  const from = body.from?.replace(/^\/|\/$/g, '')
  const to = body.to?.replace(/^\/|\/$/g, '')
  if (!isValidSlugPath(from) || !isValidSlugPath(to)) {
    return NextResponse.json({ error: 'Invalid slug path' }, { status: 400 })
  }
  if (from === to) {
    return NextResponse.json({ error: 'Source and destination are the same' }, { status: 400 })
  }

  const includeDraft = body.includeDraft !== false
  const includePublished = body.includePublished !== false

  const headers = getGitHubHeaders()
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  const operations: Array<{ branch: string; path: string; fromPath: string }> = []

  if (includePublished) {
    operations.push(
      {
        branch: publishedBranch,
        path: `src/app/${to}/page.tsx`,
        fromPath: `src/app/${from}/page.tsx`,
      },
      {
        branch: publishedBranch,
        path: `src/app/${to}/page.dsl.json`,
        fromPath: `src/app/${from}/page.dsl.json`,
      }
    )
  }

  if (includeDraft) {
    operations.push({
      branch: DRAFT_BRANCH,
      path: `src/app/${to}/page.dsl.json`,
      fromPath: `src/app/${from}/page.dsl.json`,
    })
  }

  const moved: string[] = []
  for (const op of operations) {
    const file = await readFile(baseUrl, headers, op.fromPath, op.branch)
    if (!file) continue
    const message = `chore: move ${op.fromPath} -> ${op.path}`
    await writeFile(baseUrl, headers, op.path, op.branch, file.content, message)
    await deleteFile(baseUrl, headers, op.fromPath, op.branch, file.sha, message)
    moved.push(`${op.branch}:${op.fromPath}`)
  }

  if (moved.length === 0) {
    return NextResponse.json({ error: 'No matching files to move' }, { status: 404 })
  }

  return NextResponse.json({ success: true, moved })
}
