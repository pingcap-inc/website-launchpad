/**
 * Languages offered by the site's language selectors (header, mobile menu and
 * footer). Keep this in step with `Header::LANGUAGE_LINKS` in the WordPress
 * theme (pingcap-inc/NA-website-wordpress-theme), which renders the same
 * selector on the rest of www.pingcap.com.
 *
 * 한국어 is the WordPress site's TranslatePress copy under /ko/. Español and
 * Português point at the LATAM landing page, which picks its language from
 * `?lang=`. URLs are absolute so they also work from previews.
 */

export type SiteLanguageCode = 'en' | 'ja' | 'ko' | 'es' | 'pt'

export interface SiteLanguage {
  code: SiteLanguageCode
  /** Name in the language itself, as listed in the selectors. */
  label: string
  /** Short form shown on the header button. */
  shortLabel: string
  href: string
}

export const SITE_LANGUAGES: SiteLanguage[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', href: 'https://www.pingcap.com/' },
  { code: 'ja', label: '日本語', shortLabel: 'JA', href: 'https://pingcap.co.jp/' },
  { code: 'ko', label: '한국어', shortLabel: 'KO', href: 'https://www.pingcap.com/ko/' },
  {
    code: 'es',
    label: 'Español',
    shortLabel: 'ES',
    href: 'https://www.pingcap.com/latam/?lang=es',
  },
  {
    code: 'pt',
    label: 'Português',
    shortLabel: 'PT',
    href: 'https://www.pingcap.com/latam/?lang=pt',
  },
]

/** Every page is English unless it says otherwise (only /latam does). */
export const DEFAULT_LANGUAGE: SiteLanguageCode = 'en'

/**
 * Lets a page that can change language in place (the LATAM page) take over
 * the selectors. `onSelect` returns true when it handled the choice itself,
 * which stops the link from navigating.
 */
export interface LanguageControl {
  current: SiteLanguageCode
  onSelect?: (code: SiteLanguageCode) => boolean
}

export function findLanguage(code: SiteLanguageCode): SiteLanguage {
  return SITE_LANGUAGES.find((language) => language.code === code) ?? SITE_LANGUAGES[0]
}
