/**
 * Converts a PageDSL object into a complete Next.js page.tsx string.
 * This is used at publish time — never at runtime.
 */
import type { PageDSL, HeroProps } from './dsl-schema'
import { normalizeDSL } from './dsl-utils'

// JSON.stringify all user strings — handles quotes, backslashes, newlines
const normalizeString = (s?: string | null) => (s ?? '').replace(/\\"/g, '"')

function normalizeDslStrings(dsl: PageDSL): PageDSL {
  return JSON.parse(
    JSON.stringify(dsl, (_key, value) => {
      if (typeof value === 'string') return normalizeString(value)
      return value
    })
  ) as PageDSL
}

export function dslToTsx(dsl: PageDSL, slug: string): string {
  const normalized = normalizeDslStrings(normalizeDSL(dsl))
  const { meta, sections } = normalized
  const path = meta.canonical.startsWith('/') ? meta.canonical : `/${meta.canonical}`
  const pageTitle = meta.title
  const pageDesc = meta.description

  const hero = sections.find((s) => s.type === 'hero')
  const pageHeadline = hero ? ((hero.props as HeroProps).headline ?? slug) : slug

  return `import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: ${JSON.stringify(pageTitle)},
  description: ${JSON.stringify(pageDesc)},
  robots: { index: ${meta.noindex ? 'false' : 'true'}, follow: true },
  alternates: { canonical: 'https://www.pingcap.com${path}' },
  openGraph: {
    title: ${JSON.stringify(pageTitle)},
    description: ${JSON.stringify(pageDesc)},
    url: 'https://www.pingcap.com${path}',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
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
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
`
}
