import { NextRequest, NextResponse } from 'next/server'
import type { PageDSL } from '@/lib/dsl-schema'
import { extractExternalHrefs, checkLinks } from '@/lib/validate-links'

/**
 * POST /api/ai/validate-links
 * Body: { dsl: PageDSL }
 * Returns: { results: LinkCheckResult[] }
 *
 * Extracts all external hrefs from a PageDSL and verifies them via HTTP HEAD.
 */
export async function POST(request: NextRequest) {
  try {
    const { dsl } = (await request.json()) as { dsl: PageDSL }

    if (!dsl?.sections) {
      return NextResponse.json({ error: 'dsl with sections is required' }, { status: 400 })
    }

    const hrefs = extractExternalHrefs(dsl)
    const results = await checkLinks(hrefs)

    return NextResponse.json({ results })
  } catch (error) {
    console.error('[validate-links] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    )
  }
}
