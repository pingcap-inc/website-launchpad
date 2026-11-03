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
 * A CMS page slug in canonical form: one or more `[a-z0-9-]` segments joined by
 * single slashes, with no leading/trailing slash, not under a reserved top-level
 * directory. No dots, so no `.`/`..` traversal and no `route.xml`-style dirs.
 *
 * Strict on purpose: a value that is only valid after normalization (`/a/`, `a//b`)
 * is rejected, so a guard can never approve one string while the commit path is
 * built from another. Run caller input through `normalizePageSlug` first.
 */
export function isValidPageSlug(slug: string | undefined | null): slug is string {
  if (typeof slug !== 'string' || !slug || slug.length > 200) return false
  const segments = slug.split('/')
  if (segments.length > 8) return false
  if (RESERVED_TOP_SEGMENTS.has(segments[0])) return false
  return segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

/**
 * Canonicalize a caller-supplied slug (trim whitespace, drop leading/trailing
 * slashes, collapse repeated slashes) and validate it. Returns the single string
 * every later check and path must use, or null when it is not a valid page slug.
 * Case is not folded: an uppercase slug is rejected rather than silently renamed.
 */
export function normalizePageSlug(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const slug = raw.trim().split('/').filter(Boolean).join('/')
  return isValidPageSlug(slug) ? slug : null
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
