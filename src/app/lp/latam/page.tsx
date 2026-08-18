import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import { Header, Footer } from '@/components'
import { LatamPageClient } from './LatamPageClient'
import { LOCALE_COOKIE, countryFromHeaders, detectLocale } from './detect-locale'

export const metadata: Metadata = {
  title: "Distributed SQL for Latin America's Digital Future | TiDB",
  description:
    "Build scalable, AI-ready apps on TiDB's distributed SQL platform for always-on transactions, real-time intelligence, and cloud-native growth across Latin America.",
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.pingcap.com/lp/latam/' },
  openGraph: {
    title: "Distributed SQL for Latin America's Digital Future | TiDB",
    description:
      "Build scalable, AI-ready apps on TiDB's distributed SQL platform for always-on transactions, real-time intelligence, and cloud-native growth across Latin America.",
    url: 'https://www.pingcap.com/lp/latam/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
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
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

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
      <Header />
      <LatamPageClient initialLocale={locale} />
      <Footer />
    </>
  )
}
