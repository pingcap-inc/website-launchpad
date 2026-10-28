import { NextResponse } from 'next/server'
import { TRUSTED_DOMAINS } from '@/lib/safe-links'
import { readJsonBody } from '@/lib/security/api-guards'

type ScoreRequest = {
  profile?: string
  target?: string
}

const MAX_FETCH_BYTES = 2 * 1024 * 1024

// Only fetch our own public sites — an arbitrary URL here would let a caller make
// the server request internal/metadata endpoints (SSRF). Redirects are not followed
// so an allowed host can't bounce the request elsewhere.
function isFetchableTarget(target: string) {
  try {
    const url = new URL(target)
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      TRUSTED_DOMAINS.has(url.hostname)
    )
  } catch {
    return false
  }
}

function stripHtml(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ')
}

function buildMockSuggestions(wordCount: number) {
  const suggestions: string[] = []
  if (wordCount < 150) suggestions.push('Add more detail to the body content.')
  if (wordCount < 300) suggestions.push('Expand benefits and proof points.')
  suggestions.push('Strengthen the CTA with a clearer next step.')
  return suggestions
}

export async function POST(request: Request) {
  try {
    const parsed = await readJsonBody<ScoreRequest>(request, 256 * 1024)
    if (!parsed.ok) return parsed.response
    const body = parsed.data
    const profile = body.profile?.trim()
    const target = body.target?.trim()

    if (!profile || !target) {
      return NextResponse.json({ error: 'Missing scoring profile or target.' }, { status: 400 })
    }

    let text = target
    if (/^https?:\/\//i.test(target)) {
      if (!isFetchableTarget(target)) {
        return NextResponse.json(
          { error: 'Only https URLs on pingcap.com / tidbcloud.com sites can be fetched.' },
          { status: 400 }
        )
      }
      const res = await fetch(target, { redirect: 'manual', signal: AbortSignal.timeout(10_000) })
      if (res.ok) {
        const html = (await res.text()).slice(0, MAX_FETCH_BYTES)
        text = stripHtml(html)
      }
    }

    const words = text.split(/\\s+/).filter(Boolean)
    const wordCount = words.length
    const score = Math.min(100, Math.max(40, 40 + Math.round(wordCount / 25)))
    const suggestions = buildMockSuggestions(wordCount)

    return NextResponse.json({
      status: 'mock',
      score,
      wordCount,
      suggestions,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Scoring failed.' }, { status: 500 })
  }
}
