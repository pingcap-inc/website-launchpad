/**
 * Converts a PageDSL object into a complete Next.js page.tsx string.
 * This is used at publish time — never at runtime.
 */
import type { PageDSL, HeroProps } from './dsl-schema'
import { normalizeDSL } from './dsl-utils'
import { safeCanonicalPath } from './security/sanitize'

/** Site-wide fallback social card, used when a page sets no `meta.ogImage`. */
export const DEFAULT_SOCIAL_IMAGE =
  'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'

// `public/` is mirrored here in production (see cdn-asset.ts). A per-page admin
// upload is committed to `public/` and reported as a site-relative path, so it
// has to be rewritten to this base: og:image must be absolute for crawlers, and
// unlike cdn-asset.ts this cannot be env-gated — the string is baked into the
// page.tsx we are generating, which only ever runs in production.
const SOCIAL_CDN_BASE = 'https://static.pingcap.com/launchpad'

function absoluteSocialUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url
  return `${SOCIAL_CDN_BASE}${url.startsWith('/') ? '' : '/'}${url}`
}

// Every DSL-derived value below is emitted via JSON.stringify (strings) or a
// checked number, so it can only ever be a literal in the generated source.
const normalizeString = (s?: string | null) => (s ?? '').replace(/\\"/g, '"')

function normalizeDslStrings(dsl: PageDSL): PageDSL {
  return JSON.parse(
    JSON.stringify(dsl, (_key, value) => {
      if (typeof value === 'string') return normalizeString(value)
      return value
    })
  ) as PageDSL
}

function toPositiveInt(value: unknown, fallback: number): number {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.round(n) : fallback
}

export function dslToTsx(dsl: PageDSL, slug: string): string {
  const normalized = normalizeDslStrings(normalizeDSL(dsl))
  const { meta, sections } = normalized
  // Throws on anything that is not a plain URL path — it is baked into prod code.
  const path = safeCanonicalPath(meta.canonical)
  // safeCanonicalPath allows only [A-Za-z0-9._~/-], so the single-quoted
  // literals below cannot be broken out of (and keep the committed formatting).
  const canonicalUrl = `https://www.pingcap.com${path}`
  const pageTitle = meta.title
  const pageDesc = meta.description

  const hero = sections.find((s) => s.type === 'hero')
  const pageHeadline =
    meta.breadcrumbName ?? (hero ? ((hero.props as HeroProps).headline ?? slug) : slug)

  // A faq section only emits FAQPage structured data when the page wraps its
  // schema with withFaqFromDSL — so import and apply it only when one exists.
  const hasFaq = sections.some((s) => s.type === 'faq')

  // Page-specific social card, falling back to the site default. Read from the
  // DSL so a per-page card is not lost the next time this file is regenerated.
  const ogImageUrl = meta.ogImage?.url?.trim()
  const ogImage = ogImageUrl ? absoluteSocialUrl(ogImageUrl) : DEFAULT_SOCIAL_IMAGE
  // The default card is 1200x630; an uploaded one reports its measured size.
  const ogWidth = toPositiveInt(ogImageUrl && meta.ogImage?.width, 1200)
  const ogHeight = toPositiveInt(ogImageUrl && meta.ogImage?.height, 630)

  return `import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema${hasFaq ? ', withFaqFromDSL' : ''} } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: ${JSON.stringify(pageTitle)},
  description: ${JSON.stringify(pageDesc)},
  robots: { index: ${meta.noindex || meta.unlisted ? 'false' : 'true'}, follow: true },
  alternates: { canonical: '${canonicalUrl}' },
  openGraph: {
    title: ${JSON.stringify(pageTitle)},
    description: ${JSON.stringify(pageDesc)},
    url: '${canonicalUrl}',
    siteName: 'TiDB',
    images: [
      {
        url: ${JSON.stringify(ogImage)},
        width: ${ogWidth},
        height: ${ogHeight},
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: [${JSON.stringify(ogImage)}],
  },
}

const schema = buildPageSchema({
  path: ${JSON.stringify(path)},
  title: ${JSON.stringify(pageTitle)},
  description: ${JSON.stringify(pageDesc)},
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: ${JSON.stringify(pageHeadline)}, path: ${JSON.stringify(path)} },
  ],
})

const dsl: PageDSL = ${JSON.stringify(normalized, null, 2)}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={${hasFaq ? 'withFaqFromDSL(schema, dsl)' : 'schema'}} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
`
}
