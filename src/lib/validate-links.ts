import type { PageDSL } from '@/lib/dsl-schema'
import { TRUSTED_DOMAINS } from '@/lib/safe-links'

export interface LinkCheckResult {
  href: string
  status: number | 'error'
  ok: boolean
  location: string // e.g. "Section 1 (hero) → primaryCta"
}

interface HrefEntry {
  href: string
  location: string
}

// ─── Extract all external hrefs from a PageDSL ─────────────────────────────

function isExternalHref(href: unknown): href is string {
  return typeof href === 'string' && /^https?:\/\//.test(href)
}

function collectCtaHref(
  obj: Record<string, unknown>,
  key: string,
  prefix: string,
  out: HrefEntry[]
) {
  const cta = obj[key] as { href?: string } | undefined
  if (cta?.href && isExternalHref(cta.href)) {
    out.push({ href: cta.href, location: `${prefix} → ${key}` })
  }
}

export function extractExternalHrefs(dsl: PageDSL): HrefEntry[] {
  const entries: HrefEntry[] = []

  for (let i = 0; i < dsl.sections.length; i++) {
    const section = dsl.sections[i]
    const prefix = `Section ${i + 1} (${section.type})`
    const props = section.props as unknown as Record<string, unknown>

    // Top-level CTAs
    collectCtaHref(props, 'primaryCta', prefix, entries)
    collectCtaHref(props, 'secondaryCta', prefix, entries)

    // viewMore (featureGrid, featureHighlights)
    const viewMore = props.viewMore as { href?: string } | undefined
    if (viewMore?.href && isExternalHref(viewMore.href)) {
      entries.push({ href: viewMore.href, location: `${prefix} → viewMore` })
    }

    // comparisonTable cta
    collectCtaHref(props, 'cta', prefix, entries)

    // items array
    const items = props.items as Array<Record<string, unknown>> | undefined
    if (Array.isArray(items)) {
      for (let j = 0; j < items.length; j++) {
        const item = items[j]
        if (!item || typeof item !== 'object') continue
        const itemPrefix = `${prefix} → items[${j}]`
        collectCtaHref(item, 'cta', itemPrefix, entries)
        collectCtaHref(item, 'primaryCta', itemPrefix, entries)
        collectCtaHref(item, 'secondaryCta', itemPrefix, entries)
        if (isExternalHref(item.href)) {
          entries.push({ href: item.href as string, location: `${itemPrefix} → href` })
        }
      }
    }

    // tabs array
    const tabs = props.tabs as Array<Record<string, unknown>> | undefined
    if (Array.isArray(tabs)) {
      for (let j = 0; j < tabs.length; j++) {
        const tab = tabs[j]
        if (!tab || typeof tab !== 'object') continue
        const tabPrefix = `${prefix} → tabs[${j}]`
        collectCtaHref(tab, 'primaryCta', tabPrefix, entries)
        collectCtaHref(tab, 'secondaryCta', tabPrefix, entries)
      }
    }

    // logos array
    const logos = props.logos as Array<Record<string, unknown>> | undefined
    if (Array.isArray(logos)) {
      for (let j = 0; j < logos.length; j++) {
        const logo = logos[j]
        if (!logo || typeof logo !== 'object') continue
        if (isExternalHref(logo.href)) {
          entries.push({
            href: logo.href as string,
            location: `${prefix} → logos[${j}] → href`,
          })
        }
      }
    }
  }

  // De-duplicate by href (same URL may appear in multiple places)
  const seen = new Set<string>()
  return entries.filter((e) => {
    if (seen.has(e.href)) return false
    seen.add(e.href)
    return true
  })
}

// ─── HTTP HEAD checker ──────────────────────────────────────────────────────

const TIMEOUT_MS = 5_000

// Statuses that mean "the server answered, it just refuses automated clients."
// Common on bot-hostile hosts (G2, Gartner, some CDNs). The page is reachable
// for real users, so we treat these as OK rather than broken links.
const BOT_BLOCK_STATUSES = new Set([401, 403, 429])

// A 3xx here is a redirect we deliberately did not follow (off the allowlist or
// past the hop cap): the link resolves, so it is not reported as broken.
function statusIsOk(status: number, resOk: boolean): boolean {
  return resOk || BOT_BLOCK_STATUSES.has(status) || (status >= 300 && status < 400)
}

const MAX_REDIRECTS = 5
const USER_AGENT = 'PingCAP-LinkChecker/1.0'

/**
 * Whether the server may request `href`: https only, default port, no credentials,
 * and an allowlisted host. Applied to the initial URL and to every redirect hop.
 */
export function isCheckableUrl(href: string): boolean {
  try {
    const url = new URL(href)
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      url.port === '' &&
      TRUSTED_DOMAINS.has(url.hostname)
    )
  } catch {
    return false
  }
}

/**
 * Fetch `href` following redirects by hand (`redirect: 'manual'`), so each hop's
 * target is re-validated against the allowlist before it is requested — an allowed
 * host cannot bounce the server to an internal or arbitrary one. A redirect whose
 * target is not allowlisted is not followed; that 3xx response is returned as-is
 * (the link resolves, we just don't chase it off the allowlist).
 */
async function fetchAllowlisted(href: string, method: 'HEAD' | 'GET'): Promise<Response> {
  if (!isCheckableUrl(href)) throw new Error('disallowed URL')
  let current = href
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const res = await fetch(current, {
      method,
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': USER_AGENT },
    })
    // The body is never needed; release the connection.
    await res.body?.cancel().catch(() => {})
    const location = res.headers.get('location')
    if (res.status < 300 || res.status >= 400 || !location) return res
    const next = new URL(location, current).toString()
    if (!isCheckableUrl(next)) return res
    current = next
  }
  throw new Error('too many redirects')
}

async function headCheck(href: string): Promise<{ status: number | 'error'; ok: boolean }> {
  try {
    const res = await fetchAllowlisted(href, 'HEAD')
    // Some servers reject HEAD but accept GET — retry with GET for 405
    if (res.status === 405) {
      const getRes = await fetchAllowlisted(href, 'GET')
      return { status: getRes.status, ok: statusIsOk(getRes.status, getRes.ok) }
    }
    return { status: res.status, ok: statusIsOk(res.status, res.ok) }
  } catch {
    return { status: 'error', ok: false }
  }
}

// Bound the outbound fan-out of one request: at most MAX_LINKS URLs are checked,
// with at most CONCURRENCY requests in flight at a time.
const MAX_LINKS = 200
const CONCURRENCY = 8

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const index = next++
      try {
        results[index] = { status: 'fulfilled', value: await fn(items[index]) }
      } catch (reason) {
        results[index] = { status: 'rejected', reason }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

export async function checkLinks(hrefs: HrefEntry[]): Promise<LinkCheckResult[]> {
  if (hrefs.length === 0) return []

  const checked = hrefs.slice(0, MAX_LINKS)
  const skipped: LinkCheckResult[] = hrefs.slice(MAX_LINKS).map(({ href, location }) => ({
    href,
    status: 'error',
    ok: false,
    location: `${location} [not checked: over ${MAX_LINKS}-link limit]`,
  }))

  const results = await mapWithConcurrency(
    checked,
    CONCURRENCY,
    async ({ href, location }): Promise<LinkCheckResult> => {
      // Check the URL is one the server may request (https + trusted host) first
      let url: URL
      try {
        url = new URL(href)
      } catch {
        return { href, status: 'error', ok: false, location: `${location} [malformed URL]` }
      }
      if (!TRUSTED_DOMAINS.has(url.hostname)) {
        return { href, status: 'error', ok: false, location: `${location} [untrusted domain]` }
      }
      if (!isCheckableUrl(href)) {
        return {
          href,
          status: 'error',
          ok: false,
          location: `${location} [only https URLs on the default port are checked]`,
        }
      }

      const { status, ok } = await headCheck(href)
      return { href, status, ok, location }
    }
  )

  return [
    ...results.map((r) =>
      r.status === 'fulfilled'
        ? r.value
        : { href: '', status: 'error' as const, ok: false, location: 'unknown' }
    ),
    ...skipped,
  ]
}
