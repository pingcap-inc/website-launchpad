import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import prettier from 'prettier'
import prettierConfig from '../../../../prettier.config.mjs'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import { logAudit } from '@/lib/audit'
import type { PageDSL } from '@/lib/dsl-schema'
import { normalizePageSlug, readJsonBody } from '@/lib/security/api-guards'
import { findInvalidSection } from '@/lib/security/api-section-types'

interface LocalGenerateRequest {
  slug: unknown
  dsl: PageDSL
}

async function exists(file: string) {
  try {
    await fs.lstat(file)
    return true
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return false
    throw err
  }
}

// Route files that mark a directory as code-owned (or a non-page route). Same rule
// as /api/publish: generate into an empty dir or over a CMS page, never over these.
const CODE_OWNED_FILES = ['page.tsx', 'page.jsx', 'page.js', 'page.mdx', 'route.ts', 'route.js']

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return NextResponse.json(
      { error: 'Local generate is disabled in production.' },
      { status: 403 }
    )
  }

  const parsed = await readJsonBody<LocalGenerateRequest>(request, 2 * 1024 * 1024)
  if (!parsed.ok) return parsed.response
  const { slug: rawSlug, dsl } = parsed.data
  // Same canonical slug rule as the publish route (rejects reserved dirs like api/admin).
  const slug = normalizePageSlug(rawSlug)

  if (!slug) {
    return NextResponse.json(
      { error: 'Invalid slug. Use lowercase letters, numbers, hyphens, and slashes only.' },
      { status: 400 }
    )
  }
  if (!dsl?.meta || !Array.isArray(dsl?.sections) || findInvalidSection(dsl.sections)) {
    return NextResponse.json({ error: 'Invalid DSL structure' }, { status: 400 })
  }

  // Refuse to overwrite a hand-authored page: an existing page.tsx (or route file)
  // with no sibling page.dsl.json is code-owned.
  const appDir = path.join(process.cwd(), 'src', 'app', slug)
  if (!(await exists(path.join(appDir, 'page.dsl.json')))) {
    for (const name of CODE_OWNED_FILES) {
      if (await exists(path.join(appDir, name))) {
        await logAudit(request, {
          action: 'local-generate',
          target: slug,
          status: 'denied',
          detail: 'code-owned page',
        })
        return NextResponse.json(
          { error: 'Refusing to overwrite a code-owned page or route at this path.' },
          { status: 409 }
        )
      }
    }
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
  const pagePath = path.join(appDir, 'page.tsx')
  const dslPath = path.join(appDir, 'page.dsl.json')

  await fs.mkdir(appDir, { recursive: true })
  await fs.writeFile(pagePath, pageCode, 'utf-8')
  await fs.writeFile(dslPath, dslJson, 'utf-8')

  await logAudit(request, { action: 'local-generate', target: slug, status: 'success' })
  return NextResponse.json({ success: true, pagePath, dslPath })
}
