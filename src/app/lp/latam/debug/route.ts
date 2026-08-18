import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import { LOCALE_COOKIE, countryFromHeaders, detectLocale } from '../detect-locale'

/**
 * Diagnostic for the LATAM language auto-detection.
 *
 * Visit https://www.pingcap.com/lp/latam/debug/ from a real browser to see
 * which signals actually arrive in production. The important field is
 * `countryHeaderPresent`: this app sits behind an nginx proxy, so the
 * CDN's IP-country header may reflect the proxy rather than the visitor.
 * If it is false or always reports the same country, IP detection is not
 * usable and Accept-Language (which passes through nginx intact) is
 * carrying the feature — which is the intended primary signal anyway.
 */
export async function GET() {
  const [headerList, cookieStore] = await Promise.all([headers(), cookies()])

  const acceptLanguage = headerList.get('accept-language')
  const country = countryFromHeaders((name) => headerList.get(name))
  const cookie = cookieStore.get(LOCALE_COOKIE)?.value ?? null

  const decision = detectLocale({ cookie, acceptLanguage, country })

  return NextResponse.json(
    {
      resolvedLocale: decision.locale,
      decidedBy: decision.source,
      signals: {
        cookie,
        acceptLanguage,
        country,
        countryHeaderPresent: country !== null,
      },
      rawCountryHeaders: {
        'x-vercel-ip-country': headerList.get('x-vercel-ip-country'),
        'cf-ipcountry': headerList.get('cf-ipcountry'),
        'x-country-code': headerList.get('x-country-code'),
        'x-geo-country': headerList.get('x-geo-country'),
      },
      note: 'countryHeaderPresent=false means IP geo does not survive the nginx proxy; Accept-Language is doing the work.',
    },
    { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } }
  )
}
