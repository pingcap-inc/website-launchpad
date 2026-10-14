import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import prettier from 'prettier'
import prettierConfig from '../../../../prettier.config.mjs'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import type { PageDSL } from '@/lib/dsl-schema'

interface LocalGenerateRequest {
  slug: string
  dsl: PageDSL
}

function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  return segments.length > 0 && segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return NextResponse.json(
      { error: 'Local generate is disabled in production.' },
      { status: 403 }
    )
  }

  const { slug: rawSlug, dsl } = (await request.json()) as LocalGenerateRequest
  const slug = rawSlug?.replace(/^\/|\/$/g, '')

  if (!isValidSlugPath(slug)) {
    return NextResponse.json(
      { error: 'Invalid slug. Use lowercase letters, numbers, hyphens, and slashes only.' },
      { status: 400 }
    )
  }
  if (!dsl?.meta || !dsl?.sections) {
    return NextResponse.json({ error: 'Invalid DSL structure' }, { status: 400 })
  }

  // Format with the same options the publish route and the Prettier CLI use, so
  // a locally generated page is byte-identical to a published one and does not
  // show up as a whole-file reformat in the next diff.
  const pageCode = await prettier.format(dslToTsx(dsl, slug), {
    ...prettierConfig,
    parser: 'typescript',
  })
  const dslJson = await prettier.format(JSON.stringify(dsl), {
    ...prettierConfig,
    parser: 'json',
  })
  const appDir = path.join(process.cwd(), 'src', 'app', slug)
  const pagePath = path.join(appDir, 'page.tsx')
  const dslPath = path.join(appDir, 'page.dsl.json')

  await fs.mkdir(appDir, { recursive: true })
  await fs.writeFile(pagePath, pageCode, 'utf-8')
  await fs.writeFile(dslPath, dslJson, 'utf-8')

  return NextResponse.json({ success: true, pagePath, dslPath })
}
