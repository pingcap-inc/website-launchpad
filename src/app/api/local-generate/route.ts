import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/security/require-admin'
import { promises as fs } from 'fs'
import path from 'path'
import prettier from 'prettier'
import prettierConfig from '../../../../prettier.config.mjs'
import { dslToTsx } from '@/lib/dsl-to-tsx'
import { logAudit } from '@/lib/audit'
import type { PageDSL } from '@/lib/dsl-schema'
import { normalizePageSlug, readJsonBody } from '@/lib/security/api-guards'
import { findInvalidSection } from '@/lib/security/api-section-types'
import { isCodeOwnedDir } from '@/lib/security/api-code-owned'

interface LocalGenerateRequest {
  slug: unknown
  dsl: PageDSL
}

// File names directly inside `dir` (empty when it does not exist). A file (not a
// directory) at the slug path reads as code-owned, like the GitHub classifier.
async function listDir(dir: string): Promise<string[] | 'not-a-dir'> {
  try {
    return await fs.readdir(dir)
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'ENOENT') return []
    if (code === 'ENOTDIR') return 'not-a-dir'
    throw err
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request)
  if (denied) return denied
  // Every outcome below — denied, invalid, failed or written — gets an audit line.
  const audit = (status: 'success' | 'denied' | 'error', target?: string, detail?: string) =>
    logAudit(request, { action: 'local-generate', target, status, detail })

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    await audit('denied', undefined, 'disabled outside local dev')
    return NextResponse.json(
      { error: 'Local generate is disabled in production.' },
      { status: 403 }
    )
  }

  const parsed = await readJsonBody<LocalGenerateRequest>(request, 2 * 1024 * 1024)
  if (!parsed.ok) {
    await audit('denied', undefined, `unreadable body (${parsed.response.status})`)
    return parsed.response
  }
  const { slug: rawSlug, dsl } = parsed.data
  // Same canonical slug rule as the publish route (rejects reserved dirs like api/admin).
  const slug = normalizePageSlug(rawSlug)

  if (!slug) {
    await audit(
      'denied',
      typeof rawSlug === 'string' ? rawSlug.slice(0, 200) : undefined,
      'invalid slug'
    )
    return NextResponse.json(
      { error: 'Invalid slug. Use lowercase letters, numbers, hyphens, and slashes only.' },
      { status: 400 }
    )
  }
  if (!dsl?.meta || !Array.isArray(dsl?.sections) || findInvalidSection(dsl.sections)) {
    await audit('denied', slug, 'invalid DSL structure')
    return NextResponse.json({ error: 'Invalid DSL structure' }, { status: 400 })
  }

  const appDir = path.join(process.cwd(), 'src', 'app', slug)
  const pagePath = path.join(appDir, 'page.tsx')
  const dslPath = path.join(appDir, 'page.dsl.json')

  try {
    // Refuse to overwrite a hand-authored page or route (shared code-owned rule).
    const names = await listDir(appDir)
    if (names === 'not-a-dir' || isCodeOwnedDir(names)) {
      await audit('denied', slug, 'code-owned page')
      return NextResponse.json(
        { error: 'Refusing to overwrite a code-owned page or route at this path.' },
        { status: 409 }
      )
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

    await fs.mkdir(appDir, { recursive: true })
    await fs.writeFile(pagePath, pageCode, 'utf-8')
    await fs.writeFile(dslPath, dslJson, 'utf-8')
  } catch (err) {
    console.error('[local-generate] failed:', err)
    await audit('error', slug, 'generate/write failed')
    return NextResponse.json({ error: 'Local generate failed' }, { status: 500 })
  }

  await audit('success', slug)
  return NextResponse.json({ success: true, pagePath, dslPath })
}
