import { NextResponse } from 'next/server'

type ScoreRequest = {
  profile?: string
  target?: string
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
    const body = (await request.json()) as ScoreRequest
    const profile = body.profile?.trim()
    const target = body.target?.trim()

    if (!profile || !target) {
      return NextResponse.json({ error: 'Missing scoring profile or target.' }, { status: 400 })
    }

    let text = target
    if (target.startsWith('http')) {
      const res = await fetch(target)
      if (res.ok) {
        const html = await res.text()
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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Scoring failed.' },
      { status: 500 }
    )
  }
}
