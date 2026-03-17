import { NextRequest, NextResponse } from 'next/server'
import { generateJSON } from '@/lib/ai-client'
import { sanitizeDSLIcons, DSL_SCHEMA_PROMPT } from '@/lib/dsl-schema'
import type { SectionNode, PageMeta } from '@/lib/dsl-schema'

/**
 * POST /api/ai/edit-section
 * Regenerates a single DSL section based on an instruction.
 * Body: { section: SectionNode, instruction: string, pageMeta: PageMeta }
 */
export async function POST(req: NextRequest) {
  try {
    const { section, instruction, pageMeta } = (await req.json()) as {
      section: SectionNode
      instruction: string
      pageMeta?: PageMeta
    }

    if (!section || !instruction) {
      return NextResponse.json({ error: 'section and instruction are required' }, { status: 400 })
    }

    const prompt = `You are editing a single section of a web page DSL.

Page context:
- Title: ${pageMeta?.title ?? 'Unknown'}
- Description: ${pageMeta?.description ?? 'Unknown'}

Current section (JSON):
${JSON.stringify(section, null, 2)}

Instruction: ${instruction}

${DSL_SCHEMA_PROMPT}

Return ONLY the updated section JSON object (same type as input), no markdown, no code blocks.
Keep all fields that don't need changing. Preserve the "type" field exactly.`

    const raw = await generateJSON([{ role: 'user', content: prompt }])
    let candidate = JSON.parse(raw) as Record<string, unknown>

    // Unwrap if model returned { "hero": { ... } } instead of the section directly
    if (!candidate.type) {
      const inner = Object.values(candidate).find(
        (v) => v && typeof v === 'object' && (v as Record<string, unknown>).type === section.type
      )
      if (inner) candidate = inner as Record<string, unknown>
    }
    const updated = candidate as unknown as SectionNode

    // Ensure type is preserved
    if (updated.type !== section.type) {
      return NextResponse.json({ error: 'AI changed section type — rejected' }, { status: 422 })
    }

    // Sanitize icons
    const fakeDSL = { meta: { title: '', description: '', canonical: '/' }, sections: [updated] }
    sanitizeDSLIcons(fakeDSL)

    return NextResponse.json(fakeDSL.sections[0])
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
