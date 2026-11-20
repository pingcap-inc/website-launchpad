import type { Metadata } from 'next'
import { buildPageSchema, softwareApplicationSchema, faqSchema } from '@/lib/schema'

export interface SocialImage {
  url: string
  width: number
  height: number
}

/** Repo default share image, for pages whose live version has no page-specific one. */
const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  url: 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png',
  width: 1200,
  height: 630,
}

/**
 * Metadata for a /solutions/* page. Title and description must match the live
 * page; pass `image` when the live page has its own og:image.
 */
export function solutionMetadata(
  path: string,
  title: string,
  description: string,
  image: SocialImage = DEFAULT_SOCIAL_IMAGE
): Metadata {
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
      images: [image],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@PingCAP',
      title,
      description,
      images: [image.url],
    },
  }
}

export function solutionSchema(
  path: string,
  title: string,
  description: string,
  name: string,
  {
    faq,
    image = DEFAULT_SOCIAL_IMAGE,
  }: {
    faq?: { question: string; answer: string }[]
    /** Same image as passed to solutionMetadata. */
    image?: SocialImage
  } = {}
) {
  return buildPageSchema({
    path,
    title,
    description,
    pageType: 'WebPage',
    image: image.url,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name, path },
    ],
    extraSchemas: [
      softwareApplicationSchema({
        name: 'TiDB',
        description,
        url: 'https://www.pingcap.com/tidb/',
        // These pages publish no price; don't let the schema assert one.
        price: null,
      }),
      // One FAQPage entity per page, only when the page renders a FAQ section.
      ...(faq && faq.length > 0 ? [faqSchema(faq)] : []),
    ],
  })
}
