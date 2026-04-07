import type { PageDSL, SectionDefinition } from '@/lib/dsl-schema'
import { hasCTA } from './utils'

export interface RuleResult {
  id: string
  label: string
  penalty: number
  detail?: string
}

export function evaluateRules(dsl: PageDSL): RuleResult[] {
  const results: RuleResult[] = []

  if (!dsl.meta?.description?.trim()) {
    results.push({
      id: 'missing-meta-description',
      label: 'Missing meta description',
      penalty: 5,
    })
  }

  if (!dsl.meta?.title?.trim()) {
    results.push({
      id: 'missing-meta-title',
      label: 'Missing meta title',
      penalty: 5,
    })
  }

  if (!hasCTA(dsl)) {
    results.push({
      id: 'no-cta',
      label: 'No CTA found',
      penalty: 10,
    })
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

export function sumRulePenalties(results: RuleResult[]): number {
  return results.reduce((acc, item) => acc + item.penalty, 0)
}
