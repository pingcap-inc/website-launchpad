import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import { sanitizeDSLIcons, DSL_SCHEMA_PROMPT } from '@/lib/dsl-schema'
import type { SectionNode, PageMeta } from '@/lib/dsl-schema'

const VALID_BG = new Set([
  'primary',
  'surface',
  'inverse',
  'gradient-dark-top',
  'gradient-dark-bottom',
  'gradient-dark',
  'brand-red',
  'brand-violet',
  'brand-blue',
  'brand-teal',
  'none',
])
const VALID_SPACING = new Set(['none', 'sm', 'md', 'lg', 'section', 'hero'])

function validateSection(s: unknown, originalType: string): string[] {
  const errors: string[] = []
  if (!s || typeof s !== 'object') return ['response must be an object']
  const sec = s as Record<string, unknown>
  if (!sec.type) errors.push('"type" field is required')
  else if (sec.type !== originalType)
    errors.push(`type must be "${originalType}", got "${sec.type}"`)
  if (!sec.props || typeof sec.props !== 'object') errors.push('"props" field is required')
  const style = sec.style as Record<string, unknown> | undefined
  if (style) {
    if (style.background && !VALID_BG.has(style.background as string))
      errors.push(
        `style.background "${style.background}" is invalid; must be one of: ${[...VALID_BG].join(', ')}`
      )
    if (style.spacing && !VALID_SPACING.has(style.spacing as string))
      errors.push(
        `style.spacing "${style.spacing}" is invalid; must be one of: ${[...VALID_SPACING].join(', ')}`
      )
  }
  return errors
}

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

    const basePrompt = `You are editing a single section of a web page DSL.

Page context:
- Title: ${pageMeta?.title ?? 'Unknown'}
- Description: ${pageMeta?.description ?? 'Unknown'}

Current section (JSON):
${JSON.stringify(section, null, 2)}

Instruction: ${instruction}

${DSL_SCHEMA_PROMPT}

Return ONLY the updated section JSON object (same type as input), no markdown, no code blocks.
Keep all fields that don't need changing. Preserve the "type" field exactly.${
      AI_PROVIDER === 'bedrock' ? '\n\nStart your response with { and end with }' : ''
    }`

    type Message = { role: 'user' | 'assistant'; content: string }
    const messages: Message[] = [{ role: 'user', content: basePrompt }]

    let raw = await generateJSON(messages)
    let candidate = JSON.parse(raw) as Record<string, unknown>

    // Unwrap if model returned { "hero": { ... } } instead of the section directly
    if (!candidate.type) {
      const inner = Object.values(candidate).find(
        (v) => v && typeof v === 'object' && (v as Record<string, unknown>).type === section.type
      )
      if (inner) candidate = inner as Record<string, unknown>
    }

    // Validate; retry once with error feedback if needed
    let errors = validateSection(candidate, section.type)
    if (errors.length > 0) {
      console.warn('[DSL] edit-section validation failed, retrying. Errors:', errors)
      const retryMessages: Message[] = [
        ...messages,
        { role: 'assistant', content: raw },
        {
          role: 'user',
          content: `Your response had the following issues. Please fix them and return the corrected section JSON only:\n${errors.map((e) => `- ${e}`).join('\n')}`,
        },
      ]
      raw = await generateJSON(retryMessages)
      candidate = JSON.parse(raw) as Record<string, unknown>
      if (!candidate.type) {
        const inner = Object.values(candidate).find(
          (v) => v && typeof v === 'object' && (v as Record<string, unknown>).type === section.type
        )
        if (inner) candidate = inner as Record<string, unknown>
      }
      errors = validateSection(candidate, section.type)
      if (errors.length > 0) {
        console.error('[DSL] edit-section retry still has errors:', errors)
      }
    }

    const updated = candidate as unknown as SectionNode

    // Preserve id/style if missing
    if (!updated.id) updated.id = section.id
    if (!updated.style && section.style) updated.style = section.style

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
