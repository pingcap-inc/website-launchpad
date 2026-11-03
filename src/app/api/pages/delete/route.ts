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
import { classifyRepoPageDir, type PageDirKind } from '@/lib/security/api-code-owned'

async function readSha(
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
  const denied = await requirePageManager(req)
  if (denied) return denied
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const pubBranch = publishedBranch()

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const parsed = await readJsonBody<{
    slug?: unknown
    includeDraft?: boolean
    includePublished?: boolean
  }>(req, 16 * 1024)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

  const slug = normalizePageSlug(body.slug)
  if (!slug) {
    return NextResponse.json({ error: 'Invalid slug path' }, { status: 400 })
  }

  const includeDraft = body.includeDraft !== false
  const includePublished = body.includePublished !== false

  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
  const message = `chore: delete page /${slug}/`

  const targets: Array<{ branch: string; path: string }> = []

  if (includePublished) {
    // Only delete the published page.tsx when the directory is CMS-managed (has a
    // page.dsl.json). A code-owned directory (page/route file with no DSL) is
    // hand-authored; deleting it through the CMS API would silently destroy a
    // developer's file, so refuse it here. Same rule as publish/move/draft-save.
    let kind: PageDirKind
    try {
      kind = await classifyRepoPageDir(baseUrl, headers, slug, pubBranch)
    } catch (err) {
      console.error('[pages/delete] inspect failed:', err)
      await logAudit(req, { action: 'delete', target: slug, status: 'error', detail: 'inspect' })
      return NextResponse.json({ error: 'Could not inspect the page' }, { status: 500 })
    }

    if (kind === 'code-owned') {
      await logAudit(req, {
        action: 'delete',
        target: slug,
        status: 'denied',
        detail: 'code-owned page (page/route file with no page.dsl.json)',
      })
      return NextResponse.json(
        {
          error:
            'Refusing to delete a code-owned page (page.tsx with no page.dsl.json). Delete it in the repository instead.',
        },
        { status: 409 }
      )
    }
    if (kind === 'cms') {
      targets.push(
        { branch: pubBranch, path: `src/app/${slug}/page.tsx` },
        { branch: pubBranch, path: `src/app/${slug}/page.dsl.json` }
      )
    }
  }

  if (includeDraft) {
    targets.push({ branch: DRAFT_BRANCH, path: `src/app/${slug}/page.dsl.json` })
  }

  let deleted = 0
  try {
    for (const target of targets) {
      const sha = await readSha(baseUrl, headers, target.path, target.branch)
      if (!sha) continue
      await deleteFile(baseUrl, headers, target.path, target.branch, sha, message)
      deleted += 1
    }
  } catch (err) {
    console.error('[pages/delete] failed:', err)
    await logAudit(req, {
      action: 'delete',
      target: slug,
      status: 'error',
      detail: `failed after ${deleted} file(s)`,
    })
    return NextResponse.json({ error: 'Deletion failed', deleted }, { status: 500 })
  }

  if (deleted === 0) {
    return NextResponse.json({ error: 'No matching files to delete' }, { status: 404 })
  }

  await logAudit(req, {
    action: 'delete',
    target: slug,
    status: 'success',
    detail: `${deleted} file(s)`,
  })

  return NextResponse.json({ success: true, deleted })
}
