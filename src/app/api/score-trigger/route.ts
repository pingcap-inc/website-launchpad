import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } = process.env
  const triggerToken = process.env.SCORE_TRIGGER_TOKEN
  const provided = req.headers.get('x-score-token')

  if (!triggerToken || !provided || provided !== triggerToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const body = (await req.json().catch(() => ({}))) as {
    slug?: string
    baseUrl?: string
  }
  const slug = body.slug
  const baseUrl = body.baseUrl ?? process.env.NEXT_PUBLIC_SITE_BASE_URL
  if (!slug || !baseUrl) {
    return NextResponse.json({ error: 'Missing slug or baseUrl' }, { status: 400 })
  }

  const ref = GITHUB_BRANCH ?? 'staging'
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/score-pages.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref,
        inputs: {
          slug,
          baseUrl,
        },
      }),
    }
  )

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    return NextResponse.json(
      { error: err.message ?? 'Failed to dispatch scoring workflow' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
