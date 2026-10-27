import crypto from 'crypto'
import { NextResponse } from 'next/server'

/**
 * Shared input guards for the admin API routes (src/app/api/**).
 *
 * The middleware already restricts these routes to signed-in @pingcap.com users on
 * the staging deployment, but the routes hold a GitHub write token and AWS creds, so
 * they validate their own input too (defense in depth against a misused session).
 */

/** First path segments under src/app that are never CMS pages. */
export const RESERVED_TOP_SEGMENTS = new Set(['api', 'admin', 'sections'])

/** The branch where admin drafts live. */
export const DRAFT_BRANCH = 'drafts/ai'

/** The branch the CMS publishes to by default (staging). */
export function publishedBranch(): string {
  return process.env.GITHUB_BRANCH ?? 'staging'
}

/**
 * A CMS page slug: one or more `[a-z0-9-]` segments, not under a reserved top-level
 * directory. No dots, so no `.`/`..` traversal and no `route.xml`-style dirs.
 */
export function isValidPageSlug(slug: string | undefined | null): slug is string {
  if (!slug || slug.length > 200) return false
  const segments = slug.split('/').filter(Boolean)
  if (segments.length === 0 || segments.length > 8) return false
  if (RESERVED_TOP_SEGMENTS.has(segments[0])) return false
  return segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

/** Constant-time string comparison (hashing first equalises the lengths). */
export function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest()
  const hb = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(ha, hb)
}

/** Keys that must never be used as plain-object property names from user input. */
export function isUnsafeObjectKey(key: string): boolean {
  return key === '__proto__' || key === 'constructor' || key === 'prototype'
}

/** Default request-body cap for JSON routes that forward input to an LLM/scorer. */
export const DEFAULT_JSON_BODY_LIMIT = 1024 * 1024

/**
 * Parse a JSON request body, refusing it (413) when it exceeds `maxBytes`. The
 * Content-Length header is checked before anything is read; the actual length is
 * re-checked after reading, for chunked bodies without a length.
 */
export async function readJsonBody<T>(
  req: Request,
  maxBytes: number = DEFAULT_JSON_BODY_LIMIT
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  const tooLarge = () => ({
    ok: false as const,
    response: NextResponse.json({ error: 'Request body too large' }, { status: 413 }),
  })
  const declared = Number(req.headers.get('content-length') ?? '')
  if (Number.isFinite(declared) && declared > maxBytes) return tooLarge()

  let text: string
  try {
    text = await req.text()
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Could not read request body' }, { status: 400 }),
    }
  }
  if (Buffer.byteLength(text, 'utf-8') > maxBytes) return tooLarge()

  try {
    return { ok: true, data: JSON.parse(text) as T }
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 }),
    }
  }
}
