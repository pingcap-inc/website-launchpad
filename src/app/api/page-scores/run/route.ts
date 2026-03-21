import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export async function POST(req: NextRequest) {
  if (process.env.MOCK_SCORE_SUCCESS === '1') {
    const body = (await req.json().catch(() => ({}))) as { slug?: string }
    const slug = body.slug ?? 'mock-page'
    const reportPath = path.join(process.cwd(), 'reports', 'page-scorecards.json')
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL ?? 'http://localhost:3000'
    const payload = {
      baseUrl,
      results: [
        {
          slug,
          url: `${baseUrl.replace(/\/$/, '')}/${slug}/`,
          ux: 92,
          seo: 90,
          consistency: 88,
          overall: 90,
        },
      ],
    }
    await fs.mkdir(path.dirname(reportPath), { recursive: true })
    await fs.writeFile(reportPath, JSON.stringify(payload, null, 2), 'utf-8')
    return NextResponse.json({ success: true, mocked: true })
  }
  const { SCORE_TRIGGER_TOKEN, NEXT_PUBLIC_SITE_BASE_URL } = process.env
  if (!SCORE_TRIGGER_TOKEN || !NEXT_PUBLIC_SITE_BASE_URL) {
    return NextResponse.json({ error: 'Scoring not configured' }, { status: 500 })
  }

  const body = (await req.json().catch(() => ({}))) as { slug?: string }
  const slug = body.slug
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const res = await fetch(`${NEXT_PUBLIC_SITE_BASE_URL.replace(/\/$/, '')}/api/score-trigger`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-score-token': SCORE_TRIGGER_TOKEN,
    },
    body: JSON.stringify({ slug, baseUrl: NEXT_PUBLIC_SITE_BASE_URL }),
  })

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string; error?: string }
    return NextResponse.json(
      { error: err.error ?? err.message ?? 'Failed to trigger scoring' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
