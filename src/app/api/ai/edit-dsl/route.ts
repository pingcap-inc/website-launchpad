import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import { DSL_SCHEMA_PROMPT, sanitizeDSLIcons } from '@/lib/dsl-schema'
import type { PageDSL } from '@/lib/dsl-schema'

const SYSTEM_PROMPT = `You are a PingCAP website content expert editing an existing page DSL.

${DSL_SCHEMA_PROMPT}

You will receive:
1. The current PageDSL (JSON)
2. An instruction describing what to change

Rules:
- Apply ONLY the requested change — keep everything else identical
- Return the complete updated PageDSL (not a diff or partial update)
- Maintain all existing section types and order unless the instruction says to add/remove/reorder
- Return ONLY the JSON object, no explanation
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

  const { dsl, instruction } = (await request.json()) as {
    dsl: PageDSL
    instruction: string
  }

  if (!dsl || !instruction?.trim()) {
    return NextResponse.json({ error: 'dsl and instruction are required' }, { status: 400 })
  }

  try {
    const text = await generateJSON([
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Current DSL:\n${JSON.stringify(dsl, null, 2)}\n\nInstruction: ${instruction}`,
      },
    ])

    const updated = JSON.parse(text) as PageDSL
    sanitizeDSLIcons(updated)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('AI edit-dsl error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI API error' },
      { status: 500 }
    )
  }
}
