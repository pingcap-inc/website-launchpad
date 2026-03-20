import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import { DSL_SCHEMA_PROMPT, sanitizeDSLIcons } from '@/lib/dsl-schema'
import type { PageDSL, SectionType } from '@/lib/dsl-schema'
import { schemaMap } from '@/lib/section-registry'

const SYSTEM_PROMPT = `You are a PingCAP website content expert. Generate production-ready page content for pingcap.com.

${DSL_SCHEMA_PROMPT}

Rules:
- siteName must be exactly "TiDB"
- canonical must start and end with "/" and be a single top-level path segment only (no subpaths). It must reflect the specific page topic (not just the product name). e.g. for "TiDB Cloud startup program" use "/startup-program/", NOT "/tidb-cloud/startup-program/" or "/tidb-cloud/"
- primaryCta hrefs: use "https://tidbcloud.com/free-trial/" for signup, real PingCAP paths for others
- Do NOT include any image fields; leave all images out entirely (the system fills defaults)
- Every featureGrid/featureCard item must have an icon
- Page must have 4-8 sections; always start with "hero"
- Stats values should be impressive and realistic (e.g. "99.99%", "10x", "$0")
- Testimonials section use style.background "gradient-dark-top"
- CTA sections must use style.background "brand-violet" unless the page theme clearly calls for a different brand color
- Return ONLY a valid JSON object, no explanation or markdown
`

const MOCK_DSL: PageDSL = {
  meta: {
    title: 'TiDB Cloud Startup Program',
    description:
      'Build fast with the TiDB Cloud Startup Program. Get credits, support, and a scalable database built for modern teams.',
    canonical: '/startup-program/',
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'Startup Program',
        headline: 'Launch Faster with TiDB Cloud Credits',
        subheadline:
          'Get up to $100k in cloud credits, hands-on engineering support, and a database built for scale.',
        primaryCta: { text: 'Apply Now', href: '/tidbcloud/trial/' },
      },
      style: { background: 'primary', spacing: 'hero' },
    },
    {
      id: 'feature-tabs-1',
      type: 'featureTabs',
      props: {
        eyebrow: 'What You Get',
        title: 'Everything to Scale',
        subtitle: 'Credits, guidance, and infrastructure designed for modern products.',
        tabs: [
          {
            id: 'credits',
            label: 'Credits',
            description: 'Up to $100,000 in TiDB Cloud credits for your startup.',
            image: {
              image: { url: 'https://assets.pingcap.com/startup-apply.png' },
              alt: 'Startup credits',
              width: 1200,
              height: 800,
            },
            primaryCta: { text: 'Apply', href: '/tidbcloud/trial/' },
          },
          {
            id: 'support',
            label: 'Support',
            description: 'Work directly with our engineers to design your data stack.',
            image: {
              image: { url: 'https://assets.pingcap.com/startup-support.png' },
              alt: 'Support',
              width: 1200,
              height: 800,
            },
          },
        ],
        autoSwitch: true,
        autoSwitchInterval: 5000,
      },
      style: { background: 'primary', spacing: 'section' },
    },
    {
      id: 'feature-highlights-1',
      type: 'featureHighlights',
      props: {
        eyebrow: 'Highlights',
        title: 'Why Startups Choose TiDB',
        subtitle: 'A few reasons teams pick TiDB Cloud from day one.',
        items: [
          {
            variant: 'violet',
            title: 'Serverless Scale',
            description: 'Scale from MVP to production without re-architecture.',
            cta: { text: 'Learn More', href: '/tidbcloud/' },
            icon: 'Rocket',
          },
          {
            variant: 'blue',
            title: 'MySQL Compatible',
            description: 'Drop-in compatibility with familiar MySQL tooling.',
            cta: { text: 'See Docs', href: '/docs/' },
            icon: 'Database',
          },
          {
            variant: 'teal',
            title: 'AI Ready',
            description: 'Vector search and HTAP for modern AI workloads.',
            cta: { text: 'Explore AI', href: '/ai/' },
            icon: 'Sparkles',
          },
        ],
        columns: 3,
        viewMore: { text: 'See All Benefits', href: '/tidb-cloud/' },
      },
      style: { background: 'primary', spacing: 'section' },
    },
    {
      id: 'cta-1',
      type: 'cta',
      props: {
        title: 'Ready to Apply?',
        subtitle: 'Join the startup program and start building today.',
        primaryCta: { text: 'Apply Now', href: '/tidbcloud/trial/' },
        image: {
          image: {
            url: 'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-violet-mini.svg',
          },
          alt: 'CTA cube',
          width: 278,
          height: 256,
        },
      },
      style: { background: 'brand-violet', spacing: 'section' },
    },
  ],
}

function extractJsonObject(raw: string) {
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return raw
  return raw.slice(start, end + 1)
}

function escapeUnescapedControlChars(raw: string) {
  let result = ''
  let inString = false
  let escaped = false
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i]
    if (inString) {
      if (!escaped && ch === '"') {
        inString = false
        result += ch
        continue
      }
      if (!escaped && (ch === '\n' || ch === '\r')) {
        result += '\\n'
        continue
      }
      if (!escaped && ch === '\t') {
        result += '\\t'
        continue
      }
      escaped = ch === '\\' && !escaped
      result += ch
      continue
    }
    if (ch === '"') {
      inString = true
      escaped = false
    }
    result += ch
  }
  return result
}

function stripJsonComments(raw: string) {
  let result = ''
  let inString = false
  let escaped = false
  let i = 0
  while (i < raw.length) {
    const ch = raw[i]
    if (inString) {
      if (!escaped && ch === '"') inString = false
      escaped = !escaped && ch === '\\'
      result += ch
      i += 1
      continue
    }
    // line comment
    if (ch === '/' && raw[i + 1] === '/') {
      while (i < raw.length && raw[i] !== '\n') i += 1
      continue
    }
    // block comment
    if (ch === '/' && raw[i + 1] === '*') {
      i += 2
      while (i < raw.length - 1 && !(raw[i] === '*' && raw[i + 1] === '/')) i += 1
      i += 2
      continue
    }
    if (ch === '"') inString = true
    result += ch
    i += 1
  }
  return result
}

function repairJson(raw: string) {
  const trimmed = extractJsonObject(raw.trim())
  const noComments = stripJsonComments(trimmed)
  const escaped = escapeUnescapedControlChars(noComments)
  return escaped.replace(/,\s*([}\]])/g, '$1')
}

// ─── AI image stripping ───────────────────────────────────────────────────────

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

// ─── Style token sanitization ─────────────────────────────────────────────────

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
const VALID_SPACING = new Set(['none', 'sm', 'md', 'lg', 'section', 'hero'])

function sanitizeDSLStyles(dsl: PageDSL): void {
  for (const section of dsl.sections) {
    const style = section.style as Record<string, unknown> | undefined
    if (!style) continue
    // Strip invalid/none background token → SectionWrapper falls back to componentMap defaultStyle
    if (style.background && !VALID_BG.has(style.background as string)) {
      console.warn(
        `[DSL] Invalid background "${style.background}" on section "${section.id}", stripped`
      )
      delete style.background
    }
    // Strip invalid spacing token → SectionWrapper falls back to componentMap defaultStyle
    if (style.spacing && !VALID_SPACING.has(style.spacing as string)) {
      console.warn(`[DSL] Invalid spacing "${style.spacing}" on section "${section.id}", stripped`)
      delete style.spacing
    }
    // Strip backgroundImage from style if URL is not an internal asset
    if (style.backgroundImage) {
      const url = (style.backgroundImage as { image?: { url?: string } })?.image?.url ?? ''
      if (!url || (!url.startsWith('/') && !url.includes('static.pingcap.com'))) {
        console.warn(`[DSL] Invalid backgroundImage URL on section "${section.id}", stripped`)
        delete style.backgroundImage
      }
    }
  }
}

// ─── DSL validation ───────────────────────────────────────────────────────────

/** Returns a list of validation error strings, empty if valid. */
function validateDSL(dsl: unknown): string[] {
  const errors: string[] = []
  if (!dsl || typeof dsl !== 'object') return ['root must be an object']
  const d = dsl as Record<string, unknown>

  // meta
  const meta = d.meta as Record<string, unknown> | undefined
  if (!meta) {
    errors.push('missing meta')
  } else {
    if (!meta.title) errors.push('meta.title is required')
    if (!meta.description) errors.push('meta.description is required')
    if (!meta.canonical) errors.push('meta.canonical is required')
    else if (typeof meta.canonical === 'string' && !meta.canonical.startsWith('/'))
      errors.push('meta.canonical must start with "/"')
  }

  // sections
  const sections = d.sections
  if (!Array.isArray(sections) || sections.length === 0) {
    errors.push('sections must be a non-empty array')
    return errors
  }

  let hasHero = false
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i] as Record<string, unknown>
    const prefix = `sections[${i}]`
    if (!s.id) errors.push(`${prefix}.id is required`)
    if (!s.type) errors.push(`${prefix}.type is required`)
    if (!s.props || typeof s.props !== 'object') errors.push(`${prefix}.props is required`)
    if (s.type === 'hero') {
      hasHero = true
      const props = s.props as Record<string, unknown> | undefined
      if (!props?.headline) errors.push(`${prefix} (hero) must have props.headline`)
    }
    const style = s.style as Record<string, unknown> | undefined
    if (style) {
      if (style.background && !VALID_BG.has(style.background as string))
        errors.push(
          `${prefix}.style.background "${style.background}" is invalid; must be one of: ${[...VALID_BG].join(', ')}`
        )
      if (style.spacing && !VALID_SPACING.has(style.spacing as string))
        errors.push(
          `${prefix}.style.spacing "${style.spacing}" is invalid; must be one of: ${[...VALID_SPACING].join(', ')}`
        )
    }
  }
  if (!hasHero) errors.push('sections must include a "hero" section')

  return errors
}

// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (process.env.USE_MOCK_DSL === '1') {
    return NextResponse.json(MOCK_DSL)
  }
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

  const userContent = `Generate a complete PageDSL for: ${intent}${pageType ? ` (page type: ${pageType})` : ''}.${
    AI_PROVIDER === 'bedrock'
      ? '\n\nOutput rules:\n- Return ONLY a raw JSON object. No markdown, no code blocks, no explanation.\n- Start your response with { and end with }'
      : ''
  }`

  type Message = { role: 'system' | 'user' | 'assistant'; content: string }
  const messages: Message[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userContent },
  ]

  try {
    let text = await generateJSON(messages, { maxTokens: 4096 })
    let dsl = JSON.parse(repairJson(text)) as PageDSL
    stripImageFields(dsl as unknown as Record<string, unknown>)
    stripBackgroundFields(dsl)
    applyFeatureTabsDefaults(dsl)

    // Validate; retry once with error feedback if needed
    let errors = validateDSL(dsl)
    if (errors.length > 0) {
      console.warn('[DSL] Validation failed, retrying. Errors:', errors)
      const retryMessages: Message[] = [
        ...messages,
        { role: 'assistant', content: text },
        {
          role: 'user',
          content: `Your response had the following issues. Please fix them and return the corrected JSON only:\n${errors.map((e) => `- ${e}`).join('\n')}`,
        },
      ]
      text = await generateJSON(retryMessages, { maxTokens: 4096 })
      dsl = JSON.parse(repairJson(text)) as PageDSL
      stripImageFields(dsl as unknown as Record<string, unknown>)
      stripBackgroundFields(dsl)
      applyFeatureTabsDefaults(dsl)
      errors = validateDSL(dsl)
      if (errors.length > 0) {
        console.error('[DSL] Retry still has validation errors:', errors)
      }
    }

    sanitizeDSLIcons(dsl)
    sanitizeDSLStyles(dsl)
    // Ensure CTA sections default to brand-violet background
    for (const section of dsl.sections) {
      if (section.type === 'cta') {
        if (!section.style) section.style = {}
        if (!section.style.background) section.style.background = 'brand-violet'
      }
    }
    return NextResponse.json(dsl)
  } catch (error) {
    console.error('AI generate-dsl error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI API error' },
      { status: 500 }
    )
  }
}
