import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "listicle",
  description: "Discover the top 5 key differences between TiDB and MySQL that every developer should understand for better database decisions.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/listicle/' },
  openGraph: {
    title: "listicle",
    description: "Discover the top 5 key differences between TiDB and MySQL that every developer should understand for better database decisions.",
    url: 'https://www.pingcap.com/listicle/',
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
  path: "/listicle/",
  title: "listicle",
  description: "Discover the top 5 key differences between TiDB and MySQL that every developer should understand for better database decisions.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "listicle", path: "/listicle/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "Listicle hub",
  "meta": {
    "title": "listicle",
    "description": "Discover the top 5 key differences between TiDB and MySQL that every developer should understand for better database decisions.",
    "canonical": "/listicle/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "",
        "headline": "listicle",
        "subheadline": "",
        "primaryCta": {
          "text": "",
          "href": ""
        },
        "secondaryCta": {
          "text": "",
          "href": ""
        },
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 400
        }
      },
      "style": {
        "spacing": "hero"
      }
    }
  ]
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
