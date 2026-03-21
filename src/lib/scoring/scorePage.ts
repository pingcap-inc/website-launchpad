import type { PageDSL } from '@/lib/dsl-schema'
import { AI_PROVIDER, generateJSON } from '@/lib/ai-client'
import type { LLMScore } from './index'

const clampScore = (value: number, max: number) => Math.max(0, Math.min(max, value))

type LLMResponse = {
  overallScore?: number
  ux?: { score?: number; feedback?: string[] }
  seo?: { score?: number; feedback?: string[] }
  consistency?: { score?: number; feedback?: string[] }
  topIssues?: string[]
}

function normalizeFeedback(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string') as string[]
  if (typeof value === 'string') return [value]
  return []
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
    topIssues: [],
  }
}

export async function evaluateWithLLM(dsl: PageDSL): Promise<LLMScore> {
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
    '- topIssues[] (max 5, actionable)',
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
    AI_PROVIDER === 'bedrock' ? 'Start your response with { and end with }.' : '',
    'PageDSL:',
    JSON.stringify(dsl),
  ].join('\n')

  try {
    const raw = await generateJSON(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      { maxTokens: 1200 }
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
      topIssues: normalizeFeedback(parsed.topIssues),
    }
  } catch {
    return buildFallback()
  }
}
