import type { PageDSL } from '@/lib/dsl-schema'
import type { ContentPageType } from '@/lib/detect-page-type'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import type { LLMScore, TopIssue } from './index'

const clampScore = (value: number, max: number) => Math.max(0, Math.min(max, value))

type LLMTopIssueRaw =
  | string
  | { issue?: string; fix?: string; severity?: string; dimension?: string }

type LLMResponse = {
  overallScore?: number
  ux?: { score?: number; feedback?: string[] }
  seo?: { score?: number; feedback?: string[] }
  consistency?: { score?: number; feedback?: string[] }
  topIssues?: LLMTopIssueRaw[]
}

function normalizeFeedback(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string') as string[]
  if (typeof value === 'string') return [value]
  return []
}

function normalizeTopIssues(value: unknown): TopIssue[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item) => item != null)
    .map((item): TopIssue => {
      // Handle plain string (backward compat)
      if (typeof item === 'string') {
        return {
          issue: item,
          fix: 'Review and improve this area.',
          severity: 'warning',
          dimension: 'ux',
        }
      }
      const raw = item as { issue?: string; fix?: string; severity?: string; dimension?: string }
      const validDimensions: TopIssue['dimension'][] = ['ux', 'seo', 'consistency']
      const validSeverities: TopIssue['severity'][] = ['error', 'warning']
      return {
        issue: typeof raw.issue === 'string' ? raw.issue : String(raw.issue ?? ''),
        fix: typeof raw.fix === 'string' ? raw.fix : 'Review and improve this area.',
        severity: validSeverities.includes(raw.severity as TopIssue['severity'])
          ? (raw.severity as TopIssue['severity'])
          : 'warning',
        dimension: validDimensions.includes(raw.dimension as TopIssue['dimension'])
          ? (raw.dimension as TopIssue['dimension'])
          : 'ux',
      }
    })
    .filter((item) => item.issue.trim().length > 0)
}

function normalizeScore(value: unknown, max: number, fallback: number) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return clampScore(Math.round(n), max)
}

function buildFallback(): LLMScore {
  const ux = 30
  const seo = 20
  const consistency = 20
  return {
    overallScore: ux + seo + consistency,
    ux: { score: ux, feedback: ['LLM evaluation unavailable.'] },
    seo: { score: seo, feedback: ['LLM evaluation unavailable.'] },
    consistency: { score: consistency, feedback: ['LLM evaluation unavailable.'] },
    topIssues: [] as TopIssue[],
  }
}

// ─── Marketing page LLM prompt ───────────────────────────────────────────────

function buildMarketingPrompt(dsl: PageDSL): { system: string; user: string } {
  const system = [
    'You are a strict evaluator for AI-generated marketing pages.',
    'Score the page on UX (0–40), SEO (0–30), Consistency (0–30).',
    'Return JSON only. Do not include code fences.',
  ].join(' ')

  const user = [
    'Evaluate this PageDSL JSON and return a JSON object with:',
    '- overallScore (0-100)',
    '- ux: { score, feedback[] }',
    '- seo: { score, feedback[] }',
    '- consistency: { score, feedback[] }',
    '- topIssues (max 5): array of objects with { issue: string, fix: string, severity: "error"|"warning", dimension: "ux"|"seo"|"consistency" }',
    '  Use severity "error" for critical issues that significantly harm conversions or SEO, "warning" for minor improvements.',
    'Scoring criteria:',
    '[UX - 40 points]',
    '- Clear information hierarchy (headline → sections)',
    '- CTA clarity and placement',
    '- Content scannability (lists, cards, spacing)',
    '- Section length and readability',
    '- Visual balance',
    '[SEO - 30 points]',
    '- Presence of title and meta description',
    '- Proper heading structure (H1, H2, H3)',
    '- Keyword usage (natural, not stuffed)',
    '- Semantic structure',
    '- Image alt text (if applicable)',
    '[Consistency - 30 points]',
    '- Use of allowed components (DSL validity)',
    '- Layout consistency (spacing, width)',
    '- Tone consistency (marketing, not technical)',
    '- Avoid redundancy / verbosity',
    'Guidance:',
    '- Penalize missing required meta fields and missing CTA.',
    '- Focus on marketing tone and clarity.',
    '- DO NOT flag heading hierarchy (H1/H2/H3) as an issue. The component system automatically maps hero.headline → H1, section titles → H2, and subheadlines → H3. This is already correct.',
    '- DO NOT flag image dimensions or layout shifts as an issue. All images use next/image which handles responsive sizing and CLS prevention automatically. width/height in the DSL are hints, not fixed pixel constraints.',
    '- Individual feature cards, feature highlights, and feature grid items do NOT require a CTA. Their href/cta props are optional. Only flag missing CTA as an error if the entire page has no CTA section at all.',
    AI_PROVIDER === 'bedrock' ? 'Start your response with { and end with }.' : '',
    'PageDSL:',
    JSON.stringify(dsl),
  ].join('\n')

  return { system, user }
}

// ─── Listicle / AEO page LLM prompt ─────────────────────────────────────────

function buildListiclePrompt(dsl: PageDSL): { system: string; user: string } {
  const system = [
    'You are a strict evaluator for AI-generated listicle and comparison pages optimized for AEO (Answer Engine Optimization).',
    'Score the page on Content Depth (0–40), AEO Quality (0–30), and Structure (0–30).',
    'This is NOT a marketing page — do NOT penalize for informational/editorial tone.',
    'Return JSON only. Do not include code fences.',
  ].join(' ')

  const user = [
    'Evaluate this PageDSL JSON (a listicle/comparison page) and return a JSON object with:',
    '- overallScore (0-100)',
    '- ux: { score, feedback[] }       ← relabel as "Content Depth" in feedback',
    '- seo: { score, feedback[] }      ← relabel as "AEO Quality" in feedback',
    '- consistency: { score, feedback[] } ← relabel as "Structure" in feedback',
    '- topIssues (max 5): array of objects with { issue: string, fix: string, severity: "error"|"warning", dimension: "ux"|"seo"|"consistency" }',
    '  Use severity "error" for critical issues that significantly harm AEO or structure, "warning" for minor improvements.',
    '',
    'Scoring criteria:',
    '[Content Depth - 40 points]',
    '- Main content is substantive (not just 1-2 sentences per section)',
    '- Coverage includes key differentiators: use cases, pros/cons, pricing signals',
    '- Intro paragraph directly answers the core question the page targets',
    '- No filler or duplicate content across items',
    '',
    '[AEO Quality - 30 points]',
    '- FAQ section present with substantive answers (not one-liners)',
    '- Intro answers the key question in the first paragraph (direct answer principle)',
    '- Entities (product names, vendors) are specific and accurate',
    '- Content is structured for AI citation: clear subject → claim → evidence',
    '- Headings and section titles clarify the page taxonomy',
    '',
    '[Structure - 30 points]',
    '- Page uses richTextBlock for intro and main content (avoid redundant extra blocks)',
    '- meta title (50–60 chars) and description (120–160 chars) are present',
    '- pageName is present (used as H1)',
    '- No redundant sections that repeat the same content',
    '',
    'Guidance:',
    '- DO NOT flag heading hierarchy (H1/H2/H3) as an issue. The component system automatically maps hero.headline → H1, section titles → H2, and subheadlines → H3. This is already correct.',
    '- DO NOT flag image dimensions or layout shifts as an issue. All images use next/image which handles responsive sizing and CLS prevention automatically.',
    '- Individual feature cards, feature highlights, and feature grid items do NOT require a CTA. Their href/cta props are optional. Only flag missing CTA as an error if the entire page has no CTA section at all.',
    '- Reward pages where each item body is factual and scannable (bold labels, bullet points).',
    '- Penalize vague or generic item descriptions that could apply to any product.',
    '- Penalize missing FAQ or FAQ with fewer than 3 real questions.',
    '- Do NOT penalize for lack of hero section, hero image, or marketing CTA copy.',
    AI_PROVIDER === 'bedrock' ? 'Start your response with { and end with }.' : '',
    '',
    'PageDSL:',
    JSON.stringify(dsl),
  ].join('\n')

  return { system, user }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function evaluateWithLLM(dsl: PageDSL, pageType?: ContentPageType): Promise<LLMScore> {
  const isListicle = pageType === 'listicle' || pageType === 'compare' || pageType === 'playbook'

  const { system, user } = isListicle ? buildListiclePrompt(dsl) : buildMarketingPrompt(dsl)

  try {
    const raw = await generateJSON(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      { maxTokens: 1600 }
    )

    const parsed = JSON.parse(raw) as LLMResponse

    const ux = normalizeScore(parsed.ux?.score, 40, 28)
    const seo = normalizeScore(parsed.seo?.score, 30, 20)
    const consistency = normalizeScore(parsed.consistency?.score, 30, 20)
    const overall =
      typeof parsed.overallScore === 'number'
        ? normalizeScore(parsed.overallScore, 100, ux + seo + consistency)
        : ux + seo + consistency

    return {
      overallScore: overall,
      ux: { score: ux, feedback: normalizeFeedback(parsed.ux?.feedback) },
      seo: { score: seo, feedback: normalizeFeedback(parsed.seo?.feedback) },
      consistency: {
        score: consistency,
        feedback: normalizeFeedback(parsed.consistency?.feedback),
      },
      topIssues: normalizeTopIssues(parsed.topIssues),
    }
  } catch {
    return buildFallback()
  }
}
