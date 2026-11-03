import { NextRequest, NextResponse } from 'next/server'
import { requirePageManager } from '@/lib/security/require-admin'
import { logAudit } from '@/lib/audit'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import {
  DRAFT_BRANCH,
  normalizePageSlug,
  publishedBranch,
  readJsonBody,
} from '@/lib/security/api-guards'
import { classifyRepoPageDir } from '@/lib/security/api-code-owned'

type GitHubHeaders = Record<string, string>

// Blob sha of `path` on `branch`, or null when the file does not exist.
async function readBlobSha(baseUrl: string, headers: GitHubHeaders, path: string, branch: string) {
  const res = await fetch(
    `${baseUrl}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(branch)}`,
    { headers }
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to read ${path} on ${branch}`)
  const data = (await res.json()) as { sha?: string; type?: string }
  if (data.type !== 'file' || !data.sha) throw new Error(`${path} on ${branch} is not a file`)
  return data.sha
}

async function fileExists(baseUrl: string, headers: GitHubHeaders, path: string, branch: string) {
  return (await readBlobSha(baseUrl, headers, path, branch)) !== null
}

async function githubJson<T>(url: string, headers: GitHubHeaders, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `GitHub request failed (${res.status})`)
  }
  return (await res.json()) as T
}

/**
 * Move files on one branch as a single commit (Git data API): one tree that adds
 * every destination path and removes every source path, one commit, one ref update.
 * Either all of the branch's files move or none do, so a page.tsx can never be left
 * without its page.dsl.json. The ref update is a fast-forward only, so a concurrent
 * push makes it fail cleanly rather than being overwritten.
 */
async function moveOnBranch(
  baseUrl: string,
  headers: GitHubHeaders,
  branch: string,
  moves: Array<{ fromPath: string; path: string; sha: string }>,
  message: string
) {
  const ref = await githubJson<{ object: { sha: string } }>(
    `${baseUrl}/git/ref/heads/${branch}`,
    headers
  )
  const head = await githubJson<{ tree: { sha: string } }>(
    `${baseUrl}/git/commits/${ref.object.sha}`,
    headers
  )
  const tree = await githubJson<{ sha: string }>(`${baseUrl}/git/trees`, headers, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: head.tree.sha,
      tree: moves.flatMap((m) => [
        { path: m.path, mode: '100644', type: 'blob', sha: m.sha },
        { path: m.fromPath, mode: '100644', type: 'blob', sha: null },
      ]),
    }),
  })
  const commit = await githubJson<{ sha: string }>(`${baseUrl}/git/commits`, headers, {
    method: 'POST',
    body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }),
  })
  await githubJson(`${baseUrl}/git/refs/heads/${branch}`, headers, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  })
}

export async function POST(req: NextRequest) {
  const denied = await requirePageManager(req)
  if (denied) return denied
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const pubBranch = publishedBranch()

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const parsed = await readJsonBody<{
    from?: unknown
    to?: unknown
    includeDraft?: boolean
    includePublished?: boolean
  }>(req, 16 * 1024)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

  const from = normalizePageSlug(body.from)
  const to = normalizePageSlug(body.to)
  if (!from || !to) {
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
    // Pre-flight, before any write (same code-owned rule as publish/delete/draft-save):
    // 1. A hand-authored (code-owned) source must not be moved by the CMS.
    const [srcKind, destKind] = await Promise.all([
      classifyRepoPageDir(baseUrl, headers, from, pubBranch),
      classifyRepoPageDir(baseUrl, headers, to, pubBranch),
    ])
    if (srcKind === 'code-owned') {
      return deny(
        'Refusing to move a code-owned page (page.tsx with no page.dsl.json). Move it in the repository instead.',
        409,
        'code-owned source'
      )
    }
    // 2. Never overwrite anything already at the destination (a CMS page, a
    //    hand-authored page or route on the published branch, or a draft).
    const destTaken = await Promise.all(
      operations.map((op) => fileExists(baseUrl, headers, op.path, op.branch))
    )
    if (destKind !== 'missing' || destTaken.some(Boolean)) {
      return deny(`A page already exists at /${to}/`, 409, 'destination exists')
    }

    // Resolve every source blob first, then commit each branch's moves at once.
    const byBranch = new Map<string, Array<{ fromPath: string; path: string; sha: string }>>()
    for (const op of operations) {
      const sha = await readBlobSha(baseUrl, headers, op.fromPath, op.branch)
      if (!sha) continue
      const list = byBranch.get(op.branch) ?? []
      list.push({ fromPath: op.fromPath, path: op.path, sha })
      byBranch.set(op.branch, list)
    }
    for (const [branch, moves] of byBranch) {
      await moveOnBranch(baseUrl, headers, branch, moves, `chore: move /${from}/ -> /${to}/`)
      for (const m of moves) moved.push(`${branch}:${m.fromPath}`)
    }
  } catch (err) {
    console.error('[pages/move] failed:', err)
    await logAudit(req, {
      action: 'move',
      target: from,
      targetTo: to,
      status: 'error',
      detail: `failed after ${moved.length} file(s) (each branch moves in one commit)`,
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
