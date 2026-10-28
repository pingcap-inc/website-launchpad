import { NextRequest, NextResponse } from 'next/server'
import { logAudit } from '@/lib/audit'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import { DRAFT_BRANCH, isValidPageSlug, publishedBranch } from '@/lib/security/api-guards'

async function readFile(
  baseUrl: string,
  headers: Record<string, string>,
  path: string,
  branch: string
) {
  const res = await fetch(
    `${baseUrl}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(branch)}`,
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
    `${baseUrl}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(branch)}`,
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
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const pubBranch = publishedBranch()

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  let body: { from?: string; to?: string; includeDraft?: boolean; includePublished?: boolean }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const from = typeof body.from === 'string' ? body.from.replace(/^\/|\/$/g, '') : ''
  const to = typeof body.to === 'string' ? body.to.replace(/^\/|\/$/g, '') : ''
  if (!isValidPageSlug(from) || !isValidPageSlug(to)) {
    return NextResponse.json({ error: 'Invalid slug path' }, { status: 400 })
  }
  if (from === to) {
    return NextResponse.json({ error: 'Source and destination are the same' }, { status: 400 })
  }

  const includeDraft = body.includeDraft !== false
  const includePublished = body.includePublished !== false

  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  const operations: Array<{ branch: string; path: string; fromPath: string }> = []

  if (includePublished) {
    operations.push(
      {
        branch: pubBranch,
        path: `src/app/${to}/page.tsx`,
        fromPath: `src/app/${from}/page.tsx`,
      },
      {
        branch: pubBranch,
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

  const deny = async (error: string, status: number, detail: string) => {
    await logAudit(req, { action: 'move', target: from, targetTo: to, status: 'denied', detail })
    return NextResponse.json({ error }, { status })
  }

  const moved: string[] = []
  try {
    // Pre-flight, before any write:
    // 1. A page.tsx with no sibling page.dsl.json is hand-authored (code-owned) —
    //    the CMS must not move it (same rule as /api/pages/delete).
    if (includePublished) {
      const [srcTsx, srcDsl] = await Promise.all([
        fileExists(baseUrl, headers, `src/app/${from}/page.tsx`, pubBranch),
        fileExists(baseUrl, headers, `src/app/${from}/page.dsl.json`, pubBranch),
      ])
      if (srcTsx && !srcDsl) {
        return deny(
          'Refusing to move a code-owned page (page.tsx with no page.dsl.json). Move it in the repository instead.',
          409,
          'code-owned source'
        )
      }
    }
    // 2. Never overwrite anything already at the destination.
    const destTaken = await Promise.all([
      ...operations.map((op) => fileExists(baseUrl, headers, op.path, op.branch)),
      fileExists(baseUrl, headers, `src/app/${to}/page.tsx`, pubBranch),
    ])
    if (destTaken.some(Boolean)) {
      return deny(`A page already exists at /${to}/`, 409, 'destination exists')
    }

    for (const op of operations) {
      const file = await readFile(baseUrl, headers, op.fromPath, op.branch)
      if (!file) continue
      const message = `chore: move ${op.fromPath} -> ${op.path}`
      await writeFile(baseUrl, headers, op.path, op.branch, file.content, message)
      await deleteFile(baseUrl, headers, op.fromPath, op.branch, file.sha, message)
      moved.push(`${op.branch}:${op.fromPath}`)
    }
  } catch (err) {
    console.error('[pages/move] failed:', err)
    await logAudit(req, {
      action: 'move',
      target: from,
      targetTo: to,
      status: 'error',
      detail: `failed after ${moved.length} file(s)`,
    })
    return NextResponse.json({ error: 'Move failed', moved }, { status: 500 })
  }

  if (moved.length === 0) {
    return NextResponse.json({ error: 'No matching files to move' }, { status: 404 })
  }

  await logAudit(req, {
    action: 'move',
    target: from,
    targetTo: to,
    status: 'success',
    detail: `${moved.length} file(s)`,
  })

  return NextResponse.json({ success: true, moved })
}
