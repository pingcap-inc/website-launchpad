import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'

const SYSTEM_PROMPT = `You are an SEO expert for pingcap.com (TiDB distributed SQL database).

Given the long-form page content, produce a strict JSON object:
{
  "slug": string,        // URL slug for the leaf segment only (no parent prefix). lowercase, hyphens.
  "title": string,       // Meta <title>. 50–60 chars. Includes primary keyword. End with " | TiDB" only if it fits within 60 chars.
  "description": string  // Meta description. 120–160 chars, full sentence, includes primary keyword and a benefit/CTA hint
}

Page type guidance:
- "listicle": page is a "best X", "top N", or ranked list article. slug like "best-vector-databases-for-rag", "top-mysql-alternatives". Title naturally reads like a listicle.
- "compare": page compares TiDB to another database/product. slug like "tidb-vs-mysql", "tidb-vs-cockroachdb-performance". Title naturally reads as a comparison.
- "playbook": page is a how-to / runbook / guide. slug like "scaling-tidb-on-kubernetes", "migrating-from-mysql-to-tidb". Title naturally reads as a guide.

Rules:
- slug: only [a-z0-9-], no leading/trailing hyphens, no slashes, no parent prefix like "compare/" or "playbook/"
- title: never exceed 60 chars; aim for 50–60
- description: never exceed 160 chars; aim for 130–155
- Be specific to the actual content. Do not invent products or topics that aren't mentioned.
- Return ONLY a valid JSON object. No markdown, no commentary.`

function clamp(value: string, max: number): string {
  if (value.length <= max) return value
  const sliced = value.slice(0, max)
  const lastSpace = sliced.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced).trim()
}

function normalizeSlugLeaf(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9-/]/g, '-')
      .split('/')
      .filter(Boolean)
      .pop() || ''
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      content?: string
      pageType?: string
      headline?: string
    }
    const content = (body.content ?? '').trim()
    if (!content) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 })
    }

    const truncated = content.length > 6000 ? content.slice(0, 6000) : content
    const userPrompt = `Page type: ${body.pageType ?? 'compare'}
${body.headline ? `Working headline: ${body.headline}\n` : ''}Content:
${truncated}${AI_PROVIDER === 'bedrock' ? '\n\nStart your response with { and end with }' : ''}`

    const raw = await generateJSON(
      [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      { maxTokens: 400 }
    )

    let parsed: { slug?: unknown; title?: unknown; description?: unknown }
    try {
      parsed = JSON.parse(raw) as typeof parsed
    } catch {
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 502 })
    }

    const slugRaw = typeof parsed.slug === 'string' ? parsed.slug.trim() : ''
    const titleRaw = typeof parsed.title === 'string' ? parsed.title.trim() : ''
    const descRaw = typeof parsed.description === 'string' ? parsed.description.trim() : ''

    const slug = normalizeSlugLeaf(slugRaw)
    const title = clamp(titleRaw, 60)
    const description = clamp(descRaw, 160)

    if (!slug || !title || !description) {
      return NextResponse.json(
        { error: 'AI response missing required fields', raw: parsed },
        { status: 502 }
      )
    }

    return NextResponse.json({ slug, title, description })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
