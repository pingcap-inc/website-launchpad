import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Migration Playbook - Step-by-Step Guide",
  description: "Learn how to migrate your database to TiDB with our comprehensive step-by-step playbook. Perfect for database administrators and DevOps teams.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/playbook/' },
  openGraph: {
    title: "TiDB Migration Playbook - Step-by-Step Guide",
    description: "Learn how to migrate your database to TiDB with our comprehensive step-by-step playbook. Perfect for database administrators and DevOps teams.",
    url: 'https://www.pingcap.com/playbook/',
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
  path: "/playbook/",
  title: "TiDB Migration Playbook - Step-by-Step Guide",
  description: "Learn how to migrate your database to TiDB with our comprehensive step-by-step playbook. Perfect for database administrators and DevOps teams.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Playbook", path: "/playbook/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "Playbook",
  "meta": {
    "title": "TiDB Migration Playbook - Step-by-Step Guide",
    "description": "Learn how to migrate your database to TiDB with our comprehensive step-by-step playbook. Perfect for database administrators and DevOps teams.",
    "canonical": "/playbook/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "",
        "headline": "Playbook",
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
