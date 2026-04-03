import type { PageDSL } from '@/lib/dsl-schema'
import type { ContentPageType } from '@/lib/detect-page-type'
import { hasCTA } from './utils'

export interface RuleResult {
  id: string
  label: string
  penalty: number
  detail?: string
}

// ─── Marketing rules ──────────────────────────────────────────────────────────

function evaluateMarketingRules(dsl: PageDSL): RuleResult[] {
  const results: RuleResult[] = []

  if (!dsl.meta?.description?.trim()) {
    results.push({ id: 'missing-meta-description', label: 'Missing meta description', penalty: 5 })
  }

  if (!dsl.meta?.title?.trim()) {
    results.push({ id: 'missing-meta-title', label: 'Missing meta title', penalty: 5 })
  }

  if (!hasCTA(dsl)) {
    results.push({ id: 'no-cta', label: 'No CTA found', penalty: 10 })
  }

  if (dsl.sections.length > 8) {
    results.push({
      id: 'too-many-sections',
      label: 'Too many sections',
      penalty: 5,
      detail: `${dsl.sections.length} sections`,
    })
  }

  return results
}

// ─── Listicle / AEO rules ─────────────────────────────────────────────────────

function evaluateListicleRules(dsl: PageDSL): RuleResult[] {
  const results: RuleResult[] = []

  // Meta
  if (!dsl.meta?.description?.trim()) {
    results.push({ id: 'missing-meta-description', label: 'Missing meta description', penalty: 5 })
  }
  if (!dsl.meta?.title?.trim()) {
    results.push({ id: 'missing-meta-title', label: 'Missing meta title', penalty: 5 })
  }

  // pageName is used as H1 for listicle pages
  if (!dsl.pageName?.trim()) {
    results.push({ id: 'missing-page-name', label: 'Missing pageName (H1)', penalty: 5 })
  }

  const richTextSections = dsl.sections.filter((s) => s.type === 'richTextBlock')
  if (richTextSections.length === 0) {
    results.push({ id: 'no-richtext', label: 'No richTextBlock sections', penalty: 10 })
  } else {
    const hasBody = richTextSections.some((section) => {
      const content = (section.props as { content?: string }).content ?? ''
      return content.trim().length > 300
    })
    if (!hasBody) {
      results.push({
        id: 'richtext-too-short',
        label: 'richTextBlock content too short',
        penalty: 6,
      })
    }
  }

  // FAQ section — enables FAQPage schema, critical for AEO
  const faqSection = dsl.sections.find((s) => s.type === 'faq')
  if (!faqSection) {
    results.push({
      id: 'no-faq-section',
      label: 'No FAQ section (misses FAQPage schema)',
      penalty: 5,
    })
  } else {
    const faqProps = faqSection.props as unknown as Record<string, unknown>
    const faqItems = Array.isArray(faqProps.items) ? faqProps.items : []
    if (faqItems.length < 3) {
      results.push({
        id: 'faq-too-few',
        label: 'FAQ section has fewer than 3 questions',
        penalty: 3,
        detail: `${faqItems.length} question(s)`,
      })
    }
  }

  // CTA section
  if (!hasCTA(dsl)) {
    results.push({ id: 'no-cta', label: 'No CTA section found', penalty: 5 })
  }

  // Intro richTextBlock
  const hasIntro = dsl.sections.some((s) => s.type === 'richTextBlock')
  if (!hasIntro) {
    results.push({ id: 'no-intro', label: 'No intro richTextBlock section', penalty: 3 })
  }

  return results
}

// ─── Entry point ─────────────────────────────────────────────────────────────

export function evaluateRules(dsl: PageDSL, pageType?: ContentPageType): RuleResult[] {
  if (pageType === 'listicle' || pageType === 'compare' || pageType === 'playbook') {
    return evaluateListicleRules(dsl)
  }
  return evaluateMarketingRules(dsl)
}

export function sumRulePenalties(results: RuleResult[]): number {
  return results.reduce((acc, item) => acc + item.penalty, 0)
}
