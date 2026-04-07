import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import type { PageDSL } from '@/lib/dsl-schema'

interface LocalGenerateRequest {
  slug: string
  dsl: PageDSL
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return NextResponse.json(
      { error: 'Local generate is disabled in production.' },
      { status: 403 }
    )
  }

  const { slug, dsl } = (await request.json()) as LocalGenerateRequest

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: 'Invalid slug. Use lowercase letters, numbers, and hyphens only.' },
      { status: 400 }
    )
  }
  if (!dsl?.meta || !dsl?.sections) {
    return NextResponse.json({ error: 'Invalid DSL structure' }, { status: 400 })
  }

  const pageCode = dslToTsx(dsl, slug)
  const appDir = path.join(process.cwd(), 'src', 'app', slug)
  const pagePath = path.join(appDir, 'page.tsx')
  const dslPath = path.join(appDir, 'page.dsl.json')

  await fs.mkdir(appDir, { recursive: true })
  await fs.writeFile(pagePath, pageCode, 'utf-8')
  await fs.writeFile(dslPath, JSON.stringify(dsl, null, 2), 'utf-8')

  return NextResponse.json({ success: true, pagePath, dslPath })
}
