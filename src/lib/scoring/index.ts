import type { PageDSL } from '@/lib/dsl-schema'
import type { ContentPageType } from '@/lib/detect-page-type'
import { evaluateRules, sumRulePenalties } from './rules'
import { evaluateWithLLM } from './scorePage'

export interface DimensionScore {
  score: number
  feedback: string[]
}

export interface TopIssue {
  issue: string
  fix: string
  severity: 'error' | 'warning'
  dimension: 'ux' | 'seo' | 'consistency'
}

export interface LLMScore {
  overallScore: number
  ux: DimensionScore
  seo: DimensionScore
  consistency: DimensionScore
  topIssues: TopIssue[]
}

export interface PageScoreResult extends LLMScore {
  rulePenalties: number
  ruleFindings: ReturnType<typeof evaluateRules>
  finalScore: number
}

export async function scorePage(
  dsl: PageDSL,
  pageType?: ContentPageType
): Promise<PageScoreResult> {
  const llmScore = await evaluateWithLLM(dsl, pageType)
  const ruleFindings = evaluateRules(dsl)
  const rulePenalties = sumRulePenalties(ruleFindings)
  const finalScore = Math.max(0, Math.round(llmScore.overallScore - rulePenalties))
  const ruleTopIssues: TopIssue[] = ruleFindings.map((finding) => ({
    issue: finding.detail ? `${finding.label}: ${finding.detail}` : finding.label,
    fix: 'Review and fix this structural issue before publishing.',
    severity: finding.penalty >= 8 ? 'error' : 'warning',
    dimension: 'consistency',
  }))

  const topIssues: TopIssue[] = llmScore.topIssues.length > 0 ? llmScore.topIssues : ruleTopIssues

  return {
    ...llmScore,
    topIssues,
    ruleFindings,
    rulePenalties,
    finalScore,
  }
}
