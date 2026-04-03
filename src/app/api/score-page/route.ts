import { NextResponse } from 'next/server'
import type { PageDSL } from '@/lib/dsl-schema'
import type { ContentPageType } from '@/lib/detect-page-type'
import { scorePage } from '@/lib/scoring'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { dsl?: PageDSL; pageType?: ContentPageType }
    if (!body.dsl) {
      return NextResponse.json({ error: 'Missing PageDSL' }, { status: 400 })
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
