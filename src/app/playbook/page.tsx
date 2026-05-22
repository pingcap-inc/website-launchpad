import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Engineering Playbooks | Hands-On Guides for Production Database Problems",
  description: "Prudio is a collection of practical playbooks for engineers dealing with MySQL scaling, sharding, and AI data layers. No theory — just what to do and how to implement it.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/playbook/' },
  openGraph: {
    title: "TiDB Engineering Playbooks | Hands-On Guides for Production Database Problems",
    description: "Prudio is a collection of practical playbooks for engineers dealing with MySQL scaling, sharding, and AI data layers. No theory — just what to do and how to implement it.",
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
  title: "TiDB Engineering Playbooks | Hands-On Guides for Production Database Problems",
  description: "Prudio is a collection of practical playbooks for engineers dealing with MySQL scaling, sharding, and AI data layers. No theory — just what to do and how to implement it.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Production database guides, written for engineers.", path: "/playbook/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Engineering Playbooks | Hands-On Guides for Production Database Problems",
  "meta": {
    "title": "TiDB Engineering Playbooks | Hands-On Guides for Production Database Problems",
    "description": "Prudio is a collection of practical playbooks for engineers dealing with MySQL scaling, sharding, and AI data layers. No theory — just what to do and how to implement it.",
    "canonical": "/playbook/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "headline": "Production database guides, written for engineers.",
        "subheadline": "Skip the theory. Each playbook covers a specific problem, the TiDB features that fix it, and how to implement them.",
        "primaryCta": {
          "text": "Start free trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View docs",
          "href": "https://docs.pingcap.com/"
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
        "spacing": "hero",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/images/dd93d65c-group_1000011614.png",
            "alt": "group 1000011614",
            "width": 1440,
            "height": 601
          }
        }
      }
    },
    {
      "id": "published-playbooks",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Published Playbooks",
        "title": "TiDB Engineering Playbooks",
        "items": [
          {
            "icon": "Server",
            "title": "Silence the Noisy Neighbor in Multi-Tenant MySQL",
            "description": "One bad tenant shouldn't take down the rest. This covers how to detect the source, cap it with TiDB Resource Groups, and pin repeat offenders to their own nodes with Placement Rules.",
            "cta": {
              "text": "Read the playbook",
              "href": "https://pingcap.com/playbook-noisy-neighbor-multi-tenant-mysql/"
            }
          },
          {
            "icon": "Sparkles",
            "title": "Embed a Vector DB and Build RAG Faster with TiDB",
            "description": "Running MySQL for transactions and a separate vector store for embeddings is two systems to babysit. TiDB handles both. This covers the native HNSW vector index, how to query embeddings alongside SQL in one statement, and a working RAG pipeline end to end.",
            "cta": {
              "text": "Read the playbook",
              "href": "https://pingcap.com/playbook-embed-vector-db-build-rag/"
            }
          },
          {
            "icon": "LineChart",
            "title": "Escape MySQL Sharding Pain and Scale Fast",
            "description": "Manual sharding creates problems faster than it solves them. This covers what it actually costs to maintain sharded MySQL, how TiDB handles distribution at the storage layer, and how to migrate without a maintenance window.",
            "cta": {
              "text": "Read the playbook",
              "href": "https://pingcap.com/playbook-escape-mysql-sharding-pain/"
            }
          }
        ],
        "columns": 2
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "props": {
        "title": "Try it on your own data. MySQL-compatible, no shard config, free tier available.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start free trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View docs",
          "href": "https://docs.pingcap.com/"
        }
      },
      "style": {
        "background": "brand-violet"
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
