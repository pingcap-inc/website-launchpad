import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import { Header, Footer } from '@/components'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'
import { LatamPageClient } from './LatamPageClient'
import { LOCALE_COOKIE, countryFromHeaders, detectLocale } from './detect-locale'

// Shared by both the metadata export and the JSON-LD graph so the two can't
// drift. The page is localised at runtime, but its canonical/indexable
// representation is the English one these strings describe.
const PAGE_PATH = '/lp/latam/'
const PAGE_URL = 'https://www.pingcap.com/lp/latam/'
const PAGE_TITLE = 'Distributed SQL for Teams Building in Latin America | TiDB'
const PAGE_DESCRIPTION =
  "Build scalable, AI-ready apps on TiDB's data platform for always-on transactions, real-time intelligence, and cloud-native growth."
const OG_IMAGE = 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: 'TiDB',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: [OG_IMAGE],
  },
}

// WebPage + Organization + WebSite + BreadcrumbList, plus a SoftwareApplication
// node for the product the page is about (TiDB Cloud).
const schema = buildPageSchema({
  path: PAGE_PATH,
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: OG_IMAGE,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Distributed SQL for Latin America', path: PAGE_PATH },
  ],
  extraSchemas: [
    softwareApplicationSchema({
      name: 'TiDB Cloud',
      description:
        'A distributed SQL database platform for always-on transactions, real-time analytics, vector search, and AI-native applications.',
      url: 'https://www.pingcap.com/tidb/cloud/',
    }),
  ],
})

export default async function LatamLandingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [headerList, cookieStore, params] = await Promise.all([headers(), cookies(), searchParams])

  const langParam = params.lang
  const { locale } = detectLocale({
    queryParam: Array.isArray(langParam) ? langParam[0] : langParam,
    cookie: cookieStore.get(LOCALE_COOKIE)?.value,
    acceptLanguage: headerList.get('accept-language'),
    country: countryFromHeaders((name) => headerList.get(name)),
  })

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <LatamPageClient initialLocale={locale} />
      <Footer />
    </>
  )
}
