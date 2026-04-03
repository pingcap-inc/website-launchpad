import { NextRequest, NextResponse } from 'next/server'
import { AI_PROVIDER, generateJSON, generateText } from '@/lib/ai-client'
import { DSL_SCHEMA_PROMPT, sanitizeDSLIcons } from '@/lib/dsl-schema'
import type { PageDSL, SectionDefinition, SectionType } from '@/lib/dsl-schema'
import type { PageType } from '@/lib/admin/page-types'
import { schemaMap } from '@/lib/section-registry'
import { SAFE_CTA_LINKS } from '@/lib/safe-links'
import { addTableOfContentsForLongForm } from '@/lib/toc'
import {
  enforceLongFormMaxWidth,
  ensureLongFormHero,
  ensureLongFormLastUpdated,
} from '@/lib/dsl-utils'

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
- When the user's intent is a long document or article (over 500 words), do NOT include all the content verbatim. Instead extract the key structure (headings, main points, CTAs), generate a page layout that represents this structure, and use concise placeholder text for body copy. Keep your DSL response concise — max 3000 tokens. Always return valid, complete JSON. Never truncate mid-array or mid-object.

## Event Page layout
When pageType is "event" OR intent mentions "event", "signup", "register", "meetup", "webinar", or "conference", generate EXACTLY these sections in this order:

1. type: "hero"
   - layout: "split", eyebrow: event label, headline: event title, subheadline: event meta (date, time, location)
   - style.background: "primary"
   - If the user's intent includes a HubSpot formId (a UUID like "abc12345-1234-..."), set heroForm: {formId: "<that id>", portalId: "4466002", region: "na1"}.
     Otherwise, set heroForm: null (do NOT invent a form ID). A plain hero without a form is fine.
   The heroForm automatically renders a HubSpot form in the right column. Do NOT create a separate "form" section.

2. type: "agenda" — session schedule with time slots and descriptions

3. type: "speakers" — speaker profiles with name, title, company, bio

4. type: "cta" — final registration CTA

Do NOT add any sections beyond the 4 listed above.
Do NOT use testimonials, logoCloud, stats, or featureHighlights for event pages unless specifically requested.
The HubspotForm MUST be in the hero via heroForm prop, never as a standalone section at the bottom.

## Battle Card layout
When pageType is "Battle Card" OR intent mentions "battle card", "competitor comparison", "vs", or "alternative to", generate EXACTLY these sections in this order:

1. type: "hero" — headline positioning TiDB vs [competitor]

2. type: "featureHighlights" — top 3 reasons to choose TiDB (key differentiators)

3. type: "comparisonTable" — ourProduct: "TiDB", competitor: "[competitor name]",
   rows covering: scalability, MySQL compatibility, HTAP, operational complexity, cost, support

4. type: "cta" — demo or trial CTA

Do NOT add any sections beyond the 4 listed above.

## Listicle layout
When pageType is "listicle" OR intent mentions "top N", "best X", "ranked list", or "listicle", generate EXACTLY these sections in this order:

1. type: "hero" — centered layout with headline (page title)

2. type: "tableOfContents" — items for section headings and list entries; place immediately after hero

3. type: "richTextBlock" — intro paragraphs setting context (first line must include "Last updated" and author)

4. type: "richTextBlock" — main body content with all ranked/numbered items (Markdown)

5. type: "faq" — frequently asked questions

6. type: "cta" — final call to action

Do NOT use stats, featureGrid, featureCard, featureTabs, featureHighlights, featureMedia, testimonials, logoCloud, or form for listicle pages.

## Playbook layout
When pageType is "playbook" OR intent mentions "how to", "step by step", "step-by-step", "playbook", "migration guide", "implementation guide", generate EXACTLY these sections in this order:

1. type: "hero" — centered layout with headline (page title)

2. type: "tableOfContents" — items for section headings and list entries; place immediately after hero

3. type: "richTextBlock" — intro overview: what the guide covers, who it's for, and expected outcome (first line must include "Last updated" and author)

4. type: "richTextBlock" — steps and procedural content (Markdown)

5. type: "faq" — frequently asked questions about the topic

6. type: "cta" — final call to action

Do NOT use stats, featureGrid, featureCard, featureTabs, featureHighlights, featureMedia, testimonials, logoCloud, or form for playbook pages.

## Compare layout
When pageType is "compare" OR intent mentions "vs", "versus", "comparison guide", "compare X and Y", generate EXACTLY these sections in this order:

1. type: "hero" — centered layout with headline (page title)

2. type: "tableOfContents" — items for section headings and list entries; place immediately after hero

3. type: "richTextBlock" — intro overview of both products, key differences summary (first line must include "Last updated" and author)

4. type: "richTextBlock" — detailed analysis per comparison dimension (Markdown)

5. type: "faq" — frequently asked questions about the comparison

6. type: "cta" — final call to action

Do NOT use stats, featureGrid, featureCard, featureTabs, featureHighlights, featureMedia, testimonials, logoCloud, or form for compare pages.
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

const LISTICLE_OUTLINE_PROMPT = `You are a PingCAP website content expert. Generate a listicle PageDSL outline.

Rules:
- Return ONLY a valid JSON object, no explanation or markdown
- Use the listicle layout: richTextBlock → richTextBlock → faq → cta
- meta.canonical must start and end with "/" and be a single top-level path segment only (no subpaths)
- richTextBlock.content: 2-3 short paragraphs max, Markdown allowed
- faq.items: include q and a (a must be an empty string)
- Do NOT include any image fields
- Keep output concise and valid JSON`

const OUTLINE_SYSTEM_PROMPT = `You are a content structure analyzer. Given a long-form article (listicle, playbook, or comparison page), extract its skeleton structure.

Return ONLY a JSON object, no markdown, no code blocks. Format:
{
  "title": "Page title",
  "slug": "/compare/suggested-url/",
  "meta": { "title": "SEO title (50-60 chars, include TiDB)", "description": "Meta description (120-160 chars)" },
  "sections": [
    { "sectionType": "richTextBlock", "id": "intro", "contentHint": "Opening 2 paragraphs of introduction" },
    { "sectionType": "richTextBlock", "id": "main", "contentHint": "Main body content with all sections" },
    { "sectionType": "faq", "id": "faq", "contentHint": "7 FAQ items" },
    { "sectionType": "cta", "id": "cta", "contentHint": "Final CTA" }
  ]
}

General rules:
- sectionType must be one of: richTextBlock, comparisonTable, faq, cta
- Each section needs a unique id (kebab-case)
- contentHint is a brief summary of what content that section covers from the source material
- slug must start and end with "/"
- meta.title must include "TiDB" and be 50-60 characters
- Keep original H2 headings as H2, do not downgrade to H3.

STRICT RULES FOR pageType=listicle (enforced, no exceptions):
- The sections array MUST contain exactly 4 items in this order:
  1. { "sectionType": "richTextBlock", "id": "intro" }
  2. { "sectionType": "richTextBlock", "id": "main" }
  3. { "sectionType": "faq",          "id": "faq"   }
  4. { "sectionType": "cta",          "id": "cta"   }
- Do NOT create additional sections beyond these 4.
- Do NOT split the article into separate richTextBlock sections for each H2 heading.
- Sections like "Quick Answer", "Comparison Table", "How We Chose", "Buyer Segments",
  "Decision Framework", "Benchmarks", or any other H2-level headings MUST be folded
  into the "intro" richTextBlock's contentHint — they are NOT separate sections.
- If the article includes a Markdown table, it MUST be included in the "intro"
  richTextBlock contentHint (do NOT create a separate section).
- The "main" richTextBlock covers ALL ranked/numbered items from the article.
- The "faq" section covers ALL FAQ or Q&A content from the article.
- Producing more than 4 sections for a listicle is a critical error.
- Keep original H2 headings as H2, do not downgrade to H3.

STRICT RULES FOR pageType=playbook (enforced, no exceptions):
- The sections array MUST contain exactly 4 items in this order:
  1. { "sectionType": "richTextBlock", "id": "intro" } — overview of the guide
  2. { "sectionType": "richTextBlock", "id": "main" } — all steps and procedural content
  3. { "sectionType": "faq",           "id": "faq"   } — all FAQ/Q&A content
  4. { "sectionType": "cta",           "id": "cta"   }
- Do NOT create separate richTextBlock sections per step heading.
- Keep original H2 headings as H2, do not downgrade to H3.

STRICT RULES FOR pageType=compare (enforced, no exceptions):
- The sections array MUST contain exactly 4 items in this order:
  1. { "sectionType": "richTextBlock",    "id": "intro"    } — intro overview of both products
  2. { "sectionType": "richTextBlock",    "id": "main"     } — detailed analysis per dimension
  3. { "sectionType": "faq",             "id": "faq"      } — all FAQ/Q&A content
  4. { "sectionType": "cta",             "id": "cta"      }
- Do NOT create separate sections per H2 heading — fold all headings into the appropriate section.
- Keep original H2 headings as H2, do not downgrade to H3.
`

const FILL_SYSTEM_PROMPT = `You are a PingCAP content writer. Given a section type, a content hint, and the full source article, generate the complete DSL props for that section.

Return ONLY a JSON object with the props for this section. No markdown, no code blocks.

Section types and their expected props format:

richTextBlock: { "content": "Markdown string with full content" }

faq: {
  "title": "FAQ section title",
  "items": [
    { "q": "Question?", "a": "Answer text" }
  ]
}

Rules:
- Use the full source article to write comprehensive, accurate content
- Preserve all factual details, links, and technical specifics from the source
- Use Markdown formatting in body/content fields (bold, lists, links)
- Keep the PingCAP brand voice: professional, technical, authoritative
- Do not invent information not present in the source material
- Keep original H2 headings as H2, do not downgrade to H3.
- If the source includes Markdown tables, preserve them in richTextBlock content. Do NOT drop tables.
`

const PRESERVE_SOURCE_APPENDIX = `\nPreserve-source mode (high fidelity):
- Prefer verbatim sentences from the source. Avoid paraphrasing.
- Do NOT add new information or examples that are not in the source.
- Preserve ordering of facts and steps from the source.
- Keep fenced code blocks exactly as they appear in the source (including language tags).`

function extractJsonObject(raw: string) {
  const start = raw.indexOf('{')
  if (start === -1) return raw
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < raw.length; i += 1) {
    const ch = raw[i]
    if (inString) {
      if (!escaped && ch === '"') inString = false
      escaped = !escaped && ch === '\\'
      continue
    }
    if (ch === '"') {
      inString = true
      escaped = false
      continue
    }
    if (ch === '{') depth += 1
    if (ch === '}') {
      depth -= 1
      if (depth === 0) return raw.slice(start, i + 1)
    }
  }
  return raw
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

function toKebabCase(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function getListicleTargetCount(intent: string) {
  const match =
    intent.match(/(?:top|best|ranked|ranking|list)\s+(\d{1,2})/i) ??
    intent.match(/(\d{1,2})\s+(?:best|top|ranked|ranking|list)/i)
  const count = match ? Number(match[1]) : 10
  if (Number.isNaN(count)) return 10
  return Math.min(20, Math.max(3, count))
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  handler: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = next
      next += 1
      if (index >= items.length) break
      results[index] = await handler(items[index], index)
    }
  })
  await Promise.all(workers)
  return results
}

async function generateListicleOutline(intent: string, pageTypeHint: string) {
  const targetCount = getListicleTargetCount(intent)
  const faqCount = Math.min(8, Math.max(4, Math.round(targetCount * 0.6)))
  const userContent =
    `Generate a listicle PageDSL outline for: ${intent}${pageTypeHint}.\n` +
    `- Create ${faqCount} FAQ questions.\n` +
    `- For FAQ items set a to an empty string.\n` +
    'Return ONLY the JSON object.'

  const messages = [
    { role: 'system' as const, content: LISTICLE_OUTLINE_PROMPT },
    { role: 'user' as const, content: userContent },
  ]
  return (await parseJsonWithRetry<PageDSL>('listicle-outline', messages, 3072)) as PageDSL
}

async function generateFaqAnswer(intent: string, question: string) {
  const messages = [
    {
      role: 'system' as const,
      content:
        'You are a PingCAP content writer. Return ONLY the answer text. No JSON, no code blocks.',
    },
    {
      role: 'user' as const,
      content:
        `Answer this FAQ for a listicle page.\nQuestion: "${question}"\nContext: ${intent}\n` +
        '- 2-3 concise sentences.\n' +
        '- Be specific and useful.\n',
    },
  ]
  const text = await generateText(messages, { maxTokens: 700 })
  return { a: text.trim() }
}

async function parseJsonWithRetry<T>(
  label: string,
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  maxTokens: number
): Promise<T> {
  const text = await generateJSON(messages, { maxTokens })
  try {
    return JSON.parse(repairJson(text)) as T
  } catch (firstError) {
    console.warn(`[DSL] ${label} JSON parse failed, retrying.`, firstError)
    const retryMessages = [
      ...messages,
      { role: 'assistant' as const, content: text },
      {
        role: 'user' as const,
        content:
          'Your response was not valid JSON. Return ONLY the corrected JSON object. Start with { and end with }. Escape all newlines inside string values as \\n. Do not truncate mid-object.',
      },
    ]
    const retryText = await generateJSON(retryMessages, { maxTokens })
    return JSON.parse(repairJson(retryText)) as T
  }
}

async function fillListicleSections(intent: string, dsl: PageDSL) {
  const faq = dsl.sections.find((s) => s.type === 'faq')
  if (faq) {
    const props = (faq.props ?? {}) as { items?: Array<Record<string, unknown>> }
    const items = Array.isArray(props.items) ? props.items : []
    await mapWithConcurrency(items, 4, async (item) => {
      const question = String(item.q ?? '').trim()
      const answerValue = typeof item.a === 'string' ? item.a.trim() : ''
      if (!question || answerValue.length > 40) return
      const { a } = await generateFaqAnswer(intent, question)
      item.a = a ?? ''
    })
  }
}

interface OutlineSection {
  sectionType: string
  id: string
  contentHint: string
}

interface Outline {
  title: string
  slug: string
  meta: { title: string; description: string }
  sections: OutlineSection[]
}

const MAX_AI_CONTENT_CHARS = 24000
const MAX_RICH_TEXT_CHARS = 12000

function isLongFormPageType(value?: string) {
  const normalized = (value ?? '').toLowerCase()
  return (
    normalized.includes('listicle') ||
    normalized.includes('playbook') ||
    normalized.includes('compare') ||
    normalized.includes('comparison')
  )
}

/**
 * For listicle pages the outline must be 4 sections:
 *   richTextBlock(intro) → richTextBlock(main) → faq(faq) → cta(cta)
 *
 * If the outline step produced extra richTextBlock sections (one per H2), this
 * function collapses them into a single intro and discards the rest.
 */
function normalizeListicleOutline(outline: Outline): Outline {
  const richBlocks = outline.sections.filter((s) => s.sectionType === 'richTextBlock')
  const faqs = outline.sections.filter((s) => s.sectionType === 'faq')

  // Merge all richTextBlock contentHints into one intro hint
  const mergedIntroHint =
    richBlocks.length > 0
      ? richBlocks.map((s) => s.contentHint).join(' | ')
      : 'Opening introduction paragraphs'

  const normalized: OutlineSection[] = [
    {
      sectionType: 'richTextBlock',
      id: 'intro',
      contentHint: mergedIntroHint,
    },
    {
      sectionType: 'richTextBlock',
      id: 'main',
      contentHint: 'Main body content including all ranked/numbered items from the article',
    },
    {
      sectionType: 'faq',
      id: 'faq',
      contentHint: faqs[0]?.contentHint ?? '5-7 frequently asked questions',
    },
    {
      sectionType: 'cta',
      id: 'cta',
      contentHint: 'Final call-to-action for TiDB Cloud',
    },
  ]

  return { ...outline, sections: normalized }
}

async function fillSectionWithAI(
  sectionType: string,
  contentHint: string,
  fullContent: string,
  preserveSource: boolean
): Promise<Record<string, unknown>> {
  const maxChars = sectionType === 'richTextBlock' ? MAX_RICH_TEXT_CHARS : MAX_AI_CONTENT_CHARS
  const trimmedContent =
    fullContent.length > maxChars
      ? `${fullContent.slice(0, maxChars)}\n\n[Content truncated for AI processing.]`
      : fullContent
  type Message = { role: 'system' | 'user' | 'assistant'; content: string }
  const messages: Message[] = [
    {
      role: 'system',
      content: preserveSource ? FILL_SYSTEM_PROMPT + PRESERVE_SOURCE_APPENDIX : FILL_SYSTEM_PROMPT,
    },
    {
      role: 'user',
      content: `Generate the props for a "${sectionType}" section.\n\nContent hint: ${contentHint}\n\nFull source article:\n${trimmedContent}`,
    },
  ]

  // Use higher token limit — richTextBlock bodies need room for Markdown
  const text = await generateJSON(messages, { maxTokens: preserveSource ? 4096 : 8192 })
  try {
    return JSON.parse(repairJson(text))
  } catch (firstError) {
    // Retry once asking the model to fix the JSON
    console.warn(
      `[generate-dsl] JSON parse failed for "${sectionType}", retrying. Error: ${firstError}`
    )
    const retryMessages: Message[] = [
      ...messages,
      { role: 'assistant', content: text },
      {
        role: 'user',
        content:
          'Your response was not valid JSON. Return ONLY the corrected JSON object. Start with { and end with }. Escape all newlines inside string values as \\n.',
      },
    ]
    const retryText = await generateJSON(retryMessages, { maxTokens: preserveSource ? 4096 : 8192 })
    try {
      return JSON.parse(repairJson(retryText))
    } catch (secondError) {
      // If still invalid (often due to truncation), force a shorter response.
      console.warn(
        `[generate-dsl] JSON parse failed again for "${sectionType}", attempting compact retry. Error: ${secondError}`
      )
      const compactHint =
        sectionType === 'faq'
          ? 'Limit to 5 Q&A pairs and keep each answer concise (2-3 sentences).'
          : 'Keep the content concise (3-4 short paragraphs or less).'

      const compactMessages: Message[] = [
        {
          role: 'system',
          content: preserveSource
            ? FILL_SYSTEM_PROMPT + PRESERVE_SOURCE_APPENDIX
            : FILL_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content:
            `Generate the props for a "${sectionType}" section. ${compactHint} ` +
            'Return ONLY valid JSON. Use \\n for newlines inside strings. Keep total JSON under 6000 characters.\n\n' +
            `Content hint: ${contentHint}\n\nFull source article (truncated):\n${fullContent.slice(0, 12000)}`,
        },
      ]
      const compactText = await generateJSON(compactMessages, { maxTokens: 1536 })
      try {
        return JSON.parse(repairJson(compactText))
      } catch (finalError) {
        console.warn(
          `[generate-dsl] JSON parse failed for "${sectionType}" after compact retry. Error: ${finalError}`
        )
        const fallback =
          sectionType === 'faq'
            ? { title: 'FAQ', items: [] }
            : { content: fullContent.slice(0, 1200) }
        return fallback
      }
    }
  }
}

type CacheEntry = { value: Record<string, unknown>; expiresAt: number }
const fillSectionCache = new Map<string, CacheEntry>()
const CACHE_TTL_MS = 30 * 60 * 1000

function getCacheKey(
  sectionType: string,
  contentHint: string,
  fullContent: string,
  preserveSource: boolean
): string {
  const preview = fullContent.slice(0, 2000)
  return `${sectionType}::${preserveSource ? 'preserve' : 'default'}::${contentHint}::${preview.length}::${preview}`
}

function getCachedSection(key: string): Record<string, unknown> | null {
  const entry = fillSectionCache.get(key)
  if (!entry) return null
  if (entry.expiresAt < Date.now()) {
    fillSectionCache.delete(key)
    return null
  }
  return entry.value
}

function setCachedSection(key: string, value: Record<string, unknown>) {
  fillSectionCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS })
  if (fillSectionCache.size > 200) {
    const firstKey = fillSectionCache.keys().next().value as string | undefined
    if (firstKey) fillSectionCache.delete(firstKey)
  }
}

function splitIntroMainFromSource(fullContent: string) {
  const blocks = fullContent
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
  const introBlocks = blocks.slice(0, 2)
  const mainBlocks = blocks.slice(2)
  return {
    intro: introBlocks.join('\n\n'),
    main: mainBlocks.join('\n\n'),
  }
}

function trimToParagraphs(text: string, maxParagraphs = 3) {
  const parts = text
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length <= maxParagraphs) return text.trim()
  return parts.slice(0, maxParagraphs).join('\n\n')
}

function detectCodeLanguage(lines: string[]): string {
  const first = lines.find((line) => line.trim().length > 0) ?? ''
  const trimmed = first.trim()
  if (/^(select|with|insert|update|delete)\b/i.test(trimmed)) return 'sql'
  if (/^(curl|wget|git|npm|pnpm|yarn|make)\b/i.test(trimmed)) return 'bash'
  if (/^(python|pip|pytest)\b/i.test(trimmed) || /import\s+\w+/.test(trimmed)) return 'python'
  if (/^(const|let|var|function|import|export)\b/.test(trimmed)) return 'javascript'
  if (/^type\s+\w+|interface\s+\w+/.test(trimmed)) return 'typescript'
  if (/^\{/.test(trimmed) || /^\[/.test(trimmed)) return 'json'
  return 'text'
}

function convertIndentedCodeToFenced(text: string) {
  const lines = text.split('\n')
  const out: string[] = []
  let inFence = false
  let inIndented = false
  let buffer: string[] = []

  const stripIndent = (line: string) => line.replace(/^( {4}|\t)/, '')

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const fenceMatch = line.trim().startsWith('```')

    if (fenceMatch) {
      if (inIndented) {
        out.push('```')
        inIndented = false
      }
      inFence = !inFence
      out.push(line)
      continue
    }

    if (!inFence && /^( {4}|\t)/.test(line)) {
      if (!inIndented) {
        inIndented = true
        buffer = []
      }
      buffer.push(stripIndent(line))
      continue
    }

    if (inIndented) {
      const lang = detectCodeLanguage(buffer)
      out.push(`\`\`\`${lang}`)
      out.push(...buffer)
      out.push('```')
      inIndented = false
      buffer = []
    }
    out.push(line)
  }

  if (inIndented) {
    const lang = detectCodeLanguage(buffer)
    out.push(`\`\`\`${lang}`)
    out.push(...buffer)
    out.push('```')
  }
  return out.join('\n')
}

function normalizeContentForCompare(value: string) {
  return value
    .replace(/^\\*?Last updated:.*$/gim, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractSourceHeadings(fullContent: string): Set<string> {
  const lines = fullContent.split('\n').map((line) => line.trim())
  const headings = lines.filter((line) => {
    if (!line) return false
    if (line.length < 3 || line.length > 140) return false
    if (/[.!?]$/.test(line)) return false
    if (!/[A-Za-z0-9]/.test(line)) return false
    return true
  })
  return new Set(headings)
}

function pruneUnsupportedHeadings(markdown: string, sourceHeadings: Set<string>) {
  const lines = markdown.split('\n')
  const filtered = lines.map((line) => {
    const match = line.match(/^(#{2,4})\\s+(.+)$/)
    if (!match) return line
    const headingText = match[2].trim()
    if (sourceHeadings.has(headingText)) return line
    // Demote unexpected headings back to plain paragraphs
    return headingText
  })
  return filtered.join('\n')
}

function sanitizeHeadingsInProps(
  sectionType: string,
  props: Record<string, unknown>,
  sourceHeadings: Set<string>
) {
  if (sectionType === 'richTextBlock') {
    const content = typeof props.content === 'string' ? props.content : ''
    props.content = pruneUnsupportedHeadings(content, sourceHeadings)
  }
}

async function generateLongFormDslFromOutline(
  content: string,
  pageType: PageType,
  preserveSource: boolean
): Promise<PageDSL> {
  type Message = { role: 'system' | 'user' | 'assistant'; content: string }
  const outlineMessages: Message[] = [
    { role: 'system', content: OUTLINE_SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Extract the outline structure from this ${pageType} article:\n\n${content}`,
    },
  ]
  const outlineText = await generateJSON(outlineMessages, { maxTokens: 4096 })
  const rawOutline = JSON.parse(repairJson(outlineText)) as Outline

  const isListicle =
    pageType.toLowerCase() === 'listicle' ||
    rawOutline.sections.filter((s) => s.sectionType === 'richTextBlock').length > 1

  const outline = isListicle ? normalizeListicleOutline(rawOutline) : rawOutline
  if (isListicle && rawOutline.sections.length !== outline.sections.length) {
    console.info(
      `[generate-dsl] Normalized listicle outline: ${rawOutline.sections.length} → ${outline.sections.length} sections`
    )
  }

  const sourceHeadings = preserveSource ? extractSourceHeadings(content) : null
  const normalizedContent = preserveSource ? convertIndentedCodeToFenced(content) : content
  const split = splitIntroMainFromSource(normalizedContent)
  const useSourceOnly = preserveSource
  const filledSections = await Promise.all(
    outline.sections.map(async (section) => {
      // CTA: use fixed template (no AI needed)
      if (section.sectionType === 'cta') {
        return {
          id: section.id,
          type: 'cta',
          props: {
            title: 'Try TiDB Cloud for AI Apps',
            subtitle:
              'Free serverless tier — no credit card required. Includes vector search, SQL, and TiFlash columnar analytics.',
            primaryCta: {
              text: 'Try TiDB Cloud Free →',
              href: 'https://www.pingcap.com/tidb/cloud/',
            },
            secondaryCta: {
              text: 'Book a Demo',
              href: 'https://www.pingcap.com/contact-us/',
            },
          },
          style: { background: 'gradient-dark-top', spacing: 'section' },
        }
      }

      if (useSourceOnly && section.sectionType === 'richTextBlock') {
        const sectionContent =
          section.id.includes('intro') && split.intro
            ? split.intro
            : section.id.includes('main') && split.main
              ? split.main
              : normalizedContent
        const props: Record<string, unknown> = {
          content: sectionContent.trim(),
        }
        if (section.id.includes('intro') && props.content) {
          props.content = trimToParagraphs(String(props.content), 3)
        }
        return {
          id: section.id,
          type: section.sectionType,
          props,
          style: { background: 'none', spacing: 'section' },
        }
      }

      const sectionContent =
        section.sectionType === 'richTextBlock' && section.id.includes('intro') && split.intro
          ? split.intro
          : section.sectionType === 'richTextBlock' && section.id.includes('main') && split.main
            ? split.main
            : normalizedContent
      const cacheKey = getCacheKey(
        section.sectionType,
        section.contentHint,
        sectionContent,
        preserveSource
      )
      const cached = getCachedSection(cacheKey)
      const start = Date.now()
      const props =
        cached ??
        (await fillSectionWithAI(
          section.sectionType,
          section.contentHint,
          sectionContent,
          preserveSource
        ))
      const elapsedMs = Date.now() - start
      console.log(`[generate-dsl] ${section.sectionType} ${cached ? 'cache' : 'ai'} ${elapsedMs}ms`)
      if (preserveSource && sourceHeadings) {
        sanitizeHeadingsInProps(section.sectionType, props, sourceHeadings)
      }
      if (section.sectionType === 'richTextBlock' && section.id.includes('intro')) {
        const introContent = typeof props.content === 'string' ? props.content : ''
        if (introContent) {
          props.content = trimToParagraphs(introContent, 3)
        }
      }
      if (!cached) setCachedSection(cacheKey, props)

      return {
        id: section.id,
        type: section.sectionType,
        props,
        style: { background: 'none', spacing: 'section' },
      }
    })
  )

  // De-duplicate intro/main if AI repeats the same content
  if (['listicle', 'playbook', 'compare'].includes(pageType.toLowerCase())) {
    const introSection = filledSections.find(
      (s) => s.type === 'richTextBlock' && s.id.includes('intro')
    ) as { props?: { content?: string } } | undefined
    const mainSection = filledSections.find(
      (s) => s.type === 'richTextBlock' && s.id.includes('main')
    ) as { props?: { content?: string } } | undefined
    if (introSection && mainSection) {
      const introContent = String(introSection.props?.content ?? '')
      const mainContent = String(mainSection.props?.content ?? '')
      if (
        introContent &&
        mainContent &&
        normalizeContentForCompare(introContent) === normalizeContentForCompare(mainContent)
      ) {
        const split = splitIntroMainFromSource(content)
        if (split.intro) {
          introSection.props = { ...(introSection.props ?? {}), content: split.intro }
        }
        if (split.main) {
          mainSection.props = { ...(mainSection.props ?? {}), content: split.main }
        }
      }
    }
  }

  return {
    pageName: outline.title,
    meta: {
      title: outline.meta.title,
      description: outline.meta.description,
      canonical: outline.slug,
    },
    sections: filledSections as unknown as SectionDefinition[],
  }
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

/** Strip heroForm when formId looks hallucinated (not a real HubSpot UUID). */
function sanitizeHeroForm(dsl: PageDSL): void {
  for (const section of dsl.sections) {
    if (section.type !== 'hero') continue
    const props = section.props as unknown as Record<string, unknown>
    const heroForm = props.heroForm as Record<string, unknown> | null | undefined
    if (!heroForm) continue
    const formId = heroForm.formId as string | undefined
    // Real HubSpot form IDs are UUIDs (8-4-4-4-12 hex). Anything else is hallucinated.
    if (
      !formId ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formId)
    ) {
      console.warn(
        `[DSL] Stripping hallucinated heroForm.formId "${formId}" on section "${section.id}"`
      )
      props.heroForm = null
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

// ─── Link sanitization ──────────────────────────────────────────────────────

function isInvalidHref(href: unknown): boolean {
  if (typeof href !== 'string') return false
  const h = href.trim()
  return h === '' || h === '#' || h === 'javascript:void(0)'
}

function guessSafeLink(text?: string) {
  if (!text) return SAFE_CTA_LINKS['free-trial']
  const t = text.toLowerCase()
  if (t.includes('trial') || t.includes('start') || t.includes('sign') || t.includes('free'))
    return SAFE_CTA_LINKS['free-trial']
  if (t.includes('contact') || t.includes('talk')) return SAFE_CTA_LINKS['contact-us']
  if (t.includes('demo')) return SAFE_CTA_LINKS['demo']
  if (t.includes('doc')) return SAFE_CTA_LINKS['docs']
  if (t.includes('github')) return SAFE_CTA_LINKS['github']
  return SAFE_CTA_LINKS['free-trial']
}

function fixCtaHref(obj: Record<string, unknown>, key: string): void {
  const cta = obj[key] as { text?: string; href?: string } | undefined
  if (!cta?.href) return
  if (isInvalidHref(cta.href)) {
    const match = guessSafeLink(cta.text)
    if (match) {
      console.warn(`[DSL] Empty href on ${key} "${cta.text}", replaced with "${match.href}"`)
      cta.href = match.href
    } else {
      console.warn(`[DSL] Empty href on ${key} "${cta.text}", removed`)
      delete obj[key]
    }
  }
}

/** Strip empty/placeholder hrefs and replace CTA hrefs with safe links. */
function sanitizeLinks(dsl: PageDSL): void {
  for (const section of dsl.sections) {
    const props = section.props as unknown as Record<string, unknown>
    // Top-level CTAs
    fixCtaHref(props, 'primaryCta')
    fixCtaHref(props, 'secondaryCta')
    // viewMore
    if (props.viewMore && isInvalidHref((props.viewMore as { href?: string }).href)) {
      console.warn(`[DSL] Empty viewMore href on section "${section.id}", removed`)
      delete props.viewMore
    }
    // Walk items / tabs / logos arrays
    for (const arrKey of ['items', 'tabs', 'logos'] as const) {
      const arr = props[arrKey]
      if (!Array.isArray(arr)) continue
      for (const item of arr) {
        if (!item || typeof item !== 'object') continue
        const rec = item as Record<string, unknown>
        fixCtaHref(rec, 'cta')
        fixCtaHref(rec, 'primaryCta')
        fixCtaHref(rec, 'secondaryCta')
        // Bare href="" or href="#"
        if ('href' in rec && isInvalidHref(rec.href)) {
          console.warn(`[DSL] Empty href on ${arrKey} item in section "${section.id}", removed`)
          delete rec.href
        }
      }
    }
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
  'none',
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
function validateDSL(dsl: unknown, pageType?: PageType | 'auto'): string[] {
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
  const noHeroPageTypes = ['listicle', 'playbook', 'compare']
  if (!hasHero && !noHeroPageTypes.includes(pageType?.toLowerCase() ?? ''))
    errors.push('sections must include a "hero" section')

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

  const { intent, pageType, preserveSource } = (await request.json()) as {
    intent: string
    pageType?: PageType | 'auto'
    preserveSource?: boolean
  }
  if (!intent?.trim()) {
    return NextResponse.json({ error: 'intent is required' }, { status: 400 })
  }

  const pageTypeHint =
    pageType === 'auto'
      ? ' (Analyze the content and choose the most appropriate page type automatically. If the content mentions events, meetups, webinars, or registrations → use event layout with heroForm. Otherwise → use general page layout.)'
      : pageType
        ? ` (page type: ${pageType})`
        : ''
  const preserveHint = preserveSource
    ? ' Preserve the original wording and sentence structure as much as possible; avoid paraphrasing.'
    : ''
  const normalizedPageType = pageType === 'auto' ? undefined : pageType
  const useOutlinePipeline = isLongFormPageType(normalizedPageType)

  try {
    let text = ''
    let dsl: PageDSL
    let userContent = ''
    if (useOutlinePipeline) {
      dsl = await generateLongFormDslFromOutline(
        intent,
        normalizedPageType ?? 'listicle',
        !!preserveSource
      )
    } else {
      userContent = `Generate a complete PageDSL for: ${intent}${pageTypeHint}.${preserveHint}${
        AI_PROVIDER === 'bedrock'
          ? '\n\nOutput rules:\n- Return ONLY a raw JSON object. No markdown, no code blocks, no explanation.\n- Start your response with { and end with }'
          : ''
      }`
      type Message = { role: 'system' | 'user' | 'assistant'; content: string }
      const messages: Message[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ]
      text = await generateJSON(messages, { maxTokens: 4096 })
      try {
        dsl = JSON.parse(repairJson(text)) as PageDSL
      } catch (firstError) {
        console.warn('[DSL] JSON parse failed, retrying.', firstError)
        const retryMessages: Message[] = [
          ...messages,
          { role: 'assistant', content: text },
          {
            role: 'user',
            content:
              'Your response was not valid JSON. Return ONLY the corrected JSON object. Start with { and end with }. Escape all newlines inside string values as \\n. Do not truncate mid-array or mid-object.',
          },
        ]
        text = await generateJSON(retryMessages, { maxTokens: 4096 })
        try {
          dsl = JSON.parse(repairJson(text)) as PageDSL
        } catch (secondError) {
          console.warn('[DSL] JSON parse failed again, attempting compact retry.', secondError)
          const compactContent =
            `Generate a complete PageDSL for: ${intent}${pageTypeHint}. Return ONLY valid JSON.\n` +
            '- Keep copy concise (short headlines/subheadlines, 1-2 sentences each).\n' +
            '- Prefer 4-6 sections total.\n' +
            '- Keep total JSON under 6000 characters.\n' +
            '- Use \\n for newlines inside strings.\n'
          const compactMessages: Message[] = [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: compactContent },
          ]
          text = await generateJSON(compactMessages, { maxTokens: 2048 })
          dsl = JSON.parse(repairJson(text)) as PageDSL
        }
      }
    }
    stripImageFields(dsl as unknown as Record<string, unknown>)
    stripBackgroundFields(dsl)
    applyFeatureTabsDefaults(dsl)
    sanitizeHeroForm(dsl)
    sanitizeLinks(dsl)

    // Validate; retry once with error feedback if needed
    let errors = validateDSL(dsl, pageType)
    if (!useOutlinePipeline && errors.length > 0) {
      console.warn('[DSL] Validation failed, retrying. Errors:', errors)
      const retryMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent || `Generate a complete PageDSL for: ${intent}` },
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
      sanitizeHeroForm(dsl)
      errors = validateDSL(dsl, pageType)
      if (errors.length > 0) {
        console.error('[DSL] Retry still has validation errors:', errors)
      }
    } else if (useOutlinePipeline && errors.length > 0) {
      console.warn('[DSL] Validation warnings for outline pipeline:', errors)
    }

    sanitizeDSLIcons(dsl)
    sanitizeDSLStyles(dsl)
    addTableOfContentsForLongForm(dsl, normalizedPageType)
    enforceLongFormMaxWidth(dsl, normalizedPageType)
    ensureLongFormLastUpdated(dsl, normalizedPageType)
    ensureLongFormHero(dsl, normalizedPageType)
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
