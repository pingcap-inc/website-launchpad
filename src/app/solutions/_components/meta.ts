import type { Metadata } from 'next'
import { buildPageSchema, faqSchema } from '@/lib/schema'

const SOCIAL_IMAGE = 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'

/** Metadata for a /solutions/* page. Title and description must match the live page. */
export function solutionMetadata(path: string, title: string, description: string): Metadata {
  const url = `https://www.pingcap.com${path}`
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'TiDB',
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@PingCAP',
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  }
}

/** WebPage + BreadcrumbList + FAQPage, per the solution page template. */
export function solutionSchema(
  path: string,
  title: string,
  description: string,
  name: string,
  faq: { question: string; answer: string }[]
) {
  return buildPageSchema({
    path,
    title,
    description,
    pageType: 'WebPage',
    image: SOCIAL_IMAGE,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name, path },
    ],
    extraSchemas: [faqSchema(faq)],
  })
}
