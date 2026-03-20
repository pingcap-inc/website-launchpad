import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import { DSL_SCHEMA_PROMPT, sanitizeDSLIcons } from '@/lib/dsl-schema'
import type { PageDSL } from '@/lib/dsl-schema'
import { schemaMap } from '@/lib/section-registry'

const VALID_BG = new Set([
  'primary',
  'inverse',
  'gradient-dark-top',
  'gradient-dark-bottom',
  'brand-red',
  'brand-violet',
  'brand-blue',
  'brand-teal',
])

function isImageRef(value: unknown): value is { url: string } {
  return (
    !!value &&
    typeof value === 'object' &&
    'url' in (value as { url?: unknown }) &&
    typeof (value as { url?: unknown }).url === 'string'
  )
}

function isImageContainer(value: unknown): value is { image: { url: string } } {
  return (
    !!value &&
    typeof value === 'object' &&
    'image' in (value as object) &&
    isImageRef((value as { image?: unknown }).image)
  )
}

function stripImageFields(target: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(target)) {
    if (isImageRef(value) || isImageContainer(value)) {
      delete target[key]
      continue
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && typeof item === 'object') stripImageFields(item as Record<string, unknown>)
      }
      continue
    }
    if (value && typeof value === 'object') {
      stripImageFields(value as Record<string, unknown>)
    }
  }
}

function stripBackgroundFields(dsl: PageDSL): void {
  for (const section of dsl.sections) {
    if (section.style && 'background' in section.style) {
      delete section.style.background
      if (Object.keys(section.style).length === 0) {
        delete section.style
      }
    }
  }
}

function applyFeatureTabsDefaults(dsl: PageDSL): void {
  const defaults = schemaMap.featureTabs?.defaultProps
  if (!defaults) return
  for (const section of dsl.sections) {
    if (section.type !== 'featureTabs') continue
    const props = section.props as unknown as Record<string, unknown>
    if (props.autoSwitch === undefined) props.autoSwitch = defaults.autoSwitch
    if (props.autoSwitchInterval === undefined)
      props.autoSwitchInterval = defaults.autoSwitchInterval
  }
}

function sanitizeDSLStyles(dsl: PageDSL): void {
  for (const section of dsl.sections) {
    const style = section.style as Record<string, unknown> | undefined
    if (!style) continue
    if (style.background && !VALID_BG.has(style.background as string)) {
      console.warn(
        `[DSL] Invalid background "${style.background}" on section "${section.id}", stripped`
      )
      delete style.background
    }
  }
}

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
    stripImageFields(updated as unknown as Record<string, unknown>)
    stripBackgroundFields(updated)
    applyFeatureTabsDefaults(updated)
    sanitizeDSLIcons(updated)
    sanitizeDSLStyles(updated)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('AI edit-dsl error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI API error' },
      { status: 500 }
    )
  }
}
