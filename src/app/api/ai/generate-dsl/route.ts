import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import { DSL_SCHEMA_PROMPT, sanitizeDSLIcons } from '@/lib/dsl-schema'
import type { PageDSL } from '@/lib/dsl-schema'

const SYSTEM_PROMPT = `You are a PingCAP website content expert. Generate production-ready page content for pingcap.com.

${DSL_SCHEMA_PROMPT}

Rules:
- siteName must be exactly "TiDB"
- canonical must start and end with "/"
- primaryCta hrefs: use "/tidbcloud/trial/" for signup, real PingCAP paths for others
- Every featureGrid/featureCard item must have an icon
- Page must have 4-8 sections; always start with "hero"
- Stats values should be impressive and realistic (e.g. "99.99%", "10x", "$0")
- Return ONLY a valid JSON object, no explanation or markdown
`

export async function POST(request: NextRequest) {
  if (AI_PROVIDER === 'nvidia' && !process.env.NVIDIA_API_KEY) {
    return NextResponse.json({ error: 'NVIDIA_API_KEY not configured' }, { status: 500 })
  }
  if (AI_PROVIDER === 'bedrock') {
    if (!process.env.AWS_BEARER_TOKEN_BEDROCK)
      return NextResponse.json(
        { error: 'AWS_BEARER_TOKEN_BEDROCK not configured' },
        { status: 500 }
      )
    if (!process.env.ANTHROPIC_MODEL)
      return NextResponse.json({ error: 'ANTHROPIC_MODEL not configured' }, { status: 500 })
  }

  const { intent, pageType } = (await request.json()) as { intent: string; pageType?: string }
  if (!intent?.trim()) {
    return NextResponse.json({ error: 'intent is required' }, { status: 400 })
  }

  try {
    const text = await generateJSON([
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Generate a complete PageDSL for: ${intent}${pageType ? ` (page type: ${pageType})` : ''}.`,
      },
    ])

    const dsl = JSON.parse(text) as PageDSL
    sanitizeDSLIcons(dsl)
    return NextResponse.json(dsl)
  } catch (error) {
    console.error('AI generate-dsl error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI API error' },
      { status: 500 }
    )
  }
}
