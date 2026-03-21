import type { PageDSL } from '@/lib/dsl-schema'
import { evaluateRules, sumRulePenalties } from './rules'
import { evaluateWithLLM } from './scorePage'

export interface DimensionScore {
  score: number
  feedback: string[]
}

export interface LLMScore {
  overallScore: number
  ux: DimensionScore
  seo: DimensionScore
  consistency: DimensionScore
  topIssues: string[]
}

export interface PageScoreResult extends LLMScore {
  rulePenalties: number
  ruleFindings: ReturnType<typeof evaluateRules>
  finalScore: number
}

export async function scorePage(dsl: PageDSL): Promise<PageScoreResult> {
  const llmScore = await evaluateWithLLM(dsl)
  const ruleFindings = evaluateRules(dsl)
  const rulePenalties = sumRulePenalties(ruleFindings)
  const finalScore = Math.max(0, Math.round(llmScore.overallScore - rulePenalties))
  const ruleIssues = ruleFindings.map((finding) =>
    finding.detail ? `${finding.label}: ${finding.detail}` : finding.label
  )
  const topIssues = llmScore.topIssues.length > 0 ? llmScore.topIssues : ruleIssues

  return {
    ...llmScore,
    topIssues,
    ruleFindings,
    rulePenalties,
    finalScore,
  }
}
