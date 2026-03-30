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

async function headCheck(href: string): Promise<{ status: number | 'error'; ok: boolean }> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const res = await fetch(href, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'PingCAP-LinkChecker/1.0',
      },
    })

    clearTimeout(timer)

    // Some servers reject HEAD but accept GET — retry with GET for 405
    if (res.status === 405) {
      const controller2 = new AbortController()
      const timer2 = setTimeout(() => controller2.abort(), TIMEOUT_MS)
      const getRes = await fetch(href, {
        method: 'GET',
        redirect: 'follow',
        signal: controller2.signal,
        headers: { 'User-Agent': 'PingCAP-LinkChecker/1.0' },
      })
      clearTimeout(timer2)
      return { status: getRes.status, ok: getRes.ok }
    }

    return { status: res.status, ok: res.ok }
  } catch {
    return { status: 'error', ok: false }
  }
}

export async function checkLinks(hrefs: HrefEntry[]): Promise<LinkCheckResult[]> {
  if (hrefs.length === 0) return []

  const results = await Promise.allSettled(
    hrefs.map(async ({ href, location }): Promise<LinkCheckResult> => {
      // Check if domain is trusted first
      try {
        const url = new URL(href)
        if (!TRUSTED_DOMAINS.has(url.hostname)) {
          return { href, status: 'error', ok: false, location: `${location} [untrusted domain]` }
        }
      } catch {
        return { href, status: 'error', ok: false, location: `${location} [malformed URL]` }
      }

      const { status, ok } = await headCheck(href)
      return { href, status, ok, location }
    })
  )

  return results.map((r) =>
    r.status === 'fulfilled'
      ? r.value
      : { href: '', status: 'error' as const, ok: false, location: 'unknown' }
  )
}
