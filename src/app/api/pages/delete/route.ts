import { NextRequest, NextResponse } from 'next/server'
import { logAudit } from '@/lib/audit'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import { DRAFT_BRANCH, isValidPageSlug, publishedBranch } from '@/lib/security/api-guards'

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
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const pubBranch = publishedBranch()

  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  let body: { slug: string; includeDraft?: boolean; includePublished?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const slug = typeof body.slug === 'string' ? body.slug.replace(/^\/|\/$/g, '') : ''
  if (!isValidPageSlug(slug)) {
    return NextResponse.json({ error: 'Invalid slug path' }, { status: 400 })
  }

  const includeDraft = body.includeDraft !== false
  const includePublished = body.includePublished !== false

  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
  const message = `chore: delete page /${slug}/`

  const targets: Array<{ branch: string; path: string }> = []

  if (includePublished) {
    // Only delete the published page.tsx when a sibling page.dsl.json exists:
    // its presence marks this as a CMS-managed page. A page.tsx with no DSL is
    // hand-authored (code-owned); deleting it through the CMS API would silently
    // destroy a developer's file, so refuse it here.
    let publishedDslSha: string | null
    try {
      publishedDslSha = await readSha(baseUrl, headers, `src/app/${slug}/page.dsl.json`, pubBranch)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error during deletion'
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    if (publishedDslSha) {
      targets.push(
        { branch: pubBranch, path: `src/app/${slug}/page.tsx` },
        { branch: pubBranch, path: `src/app/${slug}/page.dsl.json` }
      )
    } else {
      let publishedTsxSha: string | null
      try {
        publishedTsxSha = await readSha(baseUrl, headers, `src/app/${slug}/page.tsx`, pubBranch)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error during deletion'
        return NextResponse.json({ error: msg }, { status: 500 })
      }
      if (publishedTsxSha) {
        await logAudit(req, {
          action: 'delete',
          target: slug,
          status: 'denied',
          detail: 'code-owned page (page.tsx with no page.dsl.json)',
        })
        return NextResponse.json(
          {
            error:
              'Refusing to delete a code-owned page (page.tsx with no page.dsl.json). Delete it in the repository instead.',
          },
          { status: 409 }
        )
      }
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
