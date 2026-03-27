import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB vs MySQL: Feature Comparison",
  description: "Compare TiDB with MySQL. See how TiDB delivers superior scalability, HTAP capabilities, and MySQL compatibility for modern applications.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/compare/' },
  openGraph: {
    title: "TiDB vs MySQL: Feature Comparison",
    description: "Compare TiDB with MySQL. See how TiDB delivers superior scalability, HTAP capabilities, and MySQL compatibility for modern applications.",
    url: 'https://www.pingcap.com/compare/',
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
  path: "/compare/",
  title: "TiDB vs MySQL: Feature Comparison",
  description: "Compare TiDB with MySQL. See how TiDB delivers superior scalability, HTAP capabilities, and MySQL compatibility for modern applications.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Compare", path: "/compare/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "Compare",
  "meta": {
    "title": "TiDB vs MySQL: Feature Comparison",
    "description": "Compare TiDB with MySQL. See how TiDB delivers superior scalability, HTAP capabilities, and MySQL compatibility for modern applications.",
    "canonical": "/compare/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "",
        "headline": "Compare",
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
