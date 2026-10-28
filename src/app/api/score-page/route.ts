import { NextResponse } from 'next/server'
import type { PageDSL } from '@/lib/dsl-schema'
import type { ContentPageType } from '@/lib/detect-page-type'
import { scorePage } from '@/lib/scoring'
import { readJsonBody } from '@/lib/security/api-guards'

const PAGE_TYPES = new Set<ContentPageType>([
  'marketing',
  'general',
  'event',
  'listicle',
  'playbook',
  'compare',
])

export async function POST(req: Request) {
  try {
    const parsed = await readJsonBody<{ dsl?: PageDSL; pageType?: ContentPageType }>(req)
    if (!parsed.ok) return parsed.response
    const body = parsed.data
    if (!body.dsl?.meta || !Array.isArray(body.dsl.sections)) {
      return NextResponse.json({ error: 'Missing PageDSL' }, { status: 400 })
    }
    if (body.pageType !== undefined && !PAGE_TYPES.has(body.pageType)) {
      return NextResponse.json({ error: 'Invalid pageType' }, { status: 400 })
    }
    const score = await scorePage(body.dsl, body.pageType)
    return NextResponse.json({ score })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to score page' },
      { status: 500 }
    )
  }
}
