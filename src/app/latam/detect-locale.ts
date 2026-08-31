import type { Locale } from './translations'

/**
 * Locale auto-detection for the LATAM landing page.
 *
 * Resolution order (first match wins):
 *   1. `?lang=` query param — explicit override, useful for campaign links and QA
 *   2. Cookie              — a language the visitor picked themselves
 *   3. Accept-Language     — the browser's own language preference
 *   4. IP country header   — where the request appears to come from
 *   5. English             — fallback
 *
 * Accept-Language is checked before the IP country on purpose: this app sits
 * behind an nginx proxy, so the country header may reflect the proxy's own
 * location rather than the visitor's. Request headers pass through nginx
 * untouched, so Accept-Language is the more trustworthy signal here.
 */

export const LOCALE_COOKIE = 'latam-locale'
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

const SUPPORTED: Locale[] = ['en', 'es', 'pt']

/** ISO 3166-1 alpha-2 → locale. Latin America plus the European homelands. */
const COUNTRY_LOCALE: Record<string, Locale> = {
  // ── Spanish-speaking Latin America ──
  MX: 'es', // Mexico
  GT: 'es', // Guatemala
  SV: 'es', // El Salvador
  HN: 'es', // Honduras
  NI: 'es', // Nicaragua
  CR: 'es', // Costa Rica
  PA: 'es', // Panama
  CU: 'es', // Cuba
  DO: 'es', // Dominican Republic
  PR: 'es', // Puerto Rico
  CO: 'es', // Colombia
  VE: 'es', // Venezuela
  EC: 'es', // Ecuador
  PE: 'es', // Peru
  BO: 'es', // Bolivia
  CL: 'es', // Chile
  AR: 'es', // Argentina
  UY: 'es', // Uruguay
  PY: 'es', // Paraguay
  ES: 'es', // Spain

  // ── Portuguese-speaking ──
  BR: 'pt', // Brazil
  PT: 'pt', // Portugal
}

/** Narrow an arbitrary string to a supported Locale. */
export function toLocale(value: string | undefined | null): Locale | undefined {
  if (!value) return undefined
  const normalized = value.trim().toLowerCase()
  return SUPPORTED.find((locale) => locale === normalized)
}

/** Map an ISO country code to a locale. Unknown countries return undefined. */
export function localeFromCountry(country: string | undefined | null): Locale | undefined {
  if (!country) return undefined
  return COUNTRY_LOCALE[country.trim().toUpperCase()]
}

/**
 * Pick a locale from an Accept-Language header, honouring q-values.
 * e.g. "pt-BR,pt;q=0.9,en-US;q=0.8" → 'pt'
 */
export function localeFromAcceptLanguage(header: string | undefined | null): Locale | undefined {
  if (!header) return undefined

  const entries = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const qParam = params.find((p) => p.trim().startsWith('q='))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 }
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const { tag } of entries) {
    // Match the primary subtag so "pt-BR" and "es-419" both resolve.
    const primary = tag.split('-')[0]
    const match = toLocale(primary)
    if (match) return match
  }

  return undefined
}

export interface LocaleSignals {
  /** `?lang=` query param. */
  queryParam?: string | null
  /** Value of the locale cookie, if set. */
  cookie?: string | null
  /** Raw Accept-Language header. */
  acceptLanguage?: string | null
  /** ISO country code from the CDN/proxy, if any. */
  country?: string | null
}

export interface LocaleDecision {
  locale: Locale
  /** Which signal decided it — surfaced by the debug endpoint. */
  source: 'query' | 'cookie' | 'accept-language' | 'country' | 'default'
}

export function detectLocale(signals: LocaleSignals): LocaleDecision {
  const fromQuery = toLocale(signals.queryParam)
  if (fromQuery) return { locale: fromQuery, source: 'query' }

  const fromCookie = toLocale(signals.cookie)
  if (fromCookie) return { locale: fromCookie, source: 'cookie' }

  const fromLanguage = localeFromAcceptLanguage(signals.acceptLanguage)
  if (fromLanguage) return { locale: fromLanguage, source: 'accept-language' }

  const fromCountry = localeFromCountry(signals.country)
  if (fromCountry) return { locale: fromCountry, source: 'country' }

  return { locale: 'en', source: 'default' }
}

/**
 * Read the visitor's country from whichever CDN/proxy header is present.
 * Vercel sets the first; the others cover Cloudflare and a custom nginx header,
 * so the feature keeps working if the edge setup changes.
 */
export function countryFromHeaders(get: (name: string) => string | null | undefined) {
  return (
    get('x-vercel-ip-country') ??
    get('cf-ipcountry') ??
    get('x-country-code') ??
    get('x-geo-country') ??
    null
  )
}
