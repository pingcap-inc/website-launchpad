import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Lake | OLTP, Analytics & Data Lake",
  description: "TiDB Cloud Lake is a cloud-native lakehouse for transactions, analytics, and AI workloads on one unified platform. Start free today.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud-lake/' },
  openGraph: {
    title: "TiDB Cloud Lake | OLTP, Analytics & Data Lake",
    description: "TiDB Cloud Lake is a cloud-native lakehouse for transactions, analytics, and AI workloads on one unified platform. Start free today.",
    url: 'https://www.pingcap.com/tidb-cloud-lake/',
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
  path: "/tidb-cloud-lake/",
  title: "TiDB Cloud Lake | OLTP, Analytics & Data Lake",
  description: "TiDB Cloud Lake is a cloud-native lakehouse for transactions, analytics, and AI workloads on one unified platform. Start free today.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "One platform for transactions, analytics, and your data lake.", path: "/tidb-cloud-lake/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Lake | OLTP, Analytics & Data Lake",
  "meta": {
    "title": "TiDB Cloud Lake | OLTP, Analytics & Data Lake",
    "description": "TiDB Cloud Lake is a cloud-native lakehouse for transactions, analytics, and AI workloads on one unified platform. Start free today.",
    "canonical": "/tidb-cloud-lake/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "split",
        "eyebrow": "Now in Private Beta",
        "headline": "One platform for transactions, analytics, and your data lake.",
        "subheadline": "TiDB Cloud Lake is a cloud native lakehouse built into TiDB Cloud. Run analytics and AI workloads next to your live transactional data, on a unified OLTP and OLAP database. You pay for the compute you use.",
        "primaryCta": {
          "text": "Start free in TiDB Cloud",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Request Private Beta access",
          "href": "https://www.pingcap.com/contact-us/"
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
    },
    {
      "id": "why-lake",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Why TiDB Cloud Lake",
        "title": "Eliminate data pipeline complexity",
        "subtitle": "Run transactions, analytics, and AI on one distributed SQL platform. No more data silos between OLTP and OLAP systems.",
        "items": [
          {
            "variant": "blue",
            "title": "Unified HTAP Architecture",
            "description": "Transactional and analytic queries run on the same distributed SQL engine. Your operational data is your analytics data.",
            "cta": {
              "text": "Learn how HTAP works",
              "href": "https://docs.pingcap.com/"
            },
            "icon": "Database"
          },
          {
            "variant": "violet",
            "title": "Elastic Analytic Tier",
            "description": "Warehouses spin up in minutes, resize on demand, and pause when idle. Pay only for compute you actually use.",
            "cta": {
              "text": "See pricing",
              "href": "https://www.pingcap.com/tidb/cloud/"
            },
            "icon": "Gauge"
          },
          {
            "variant": "teal",
            "title": "AI & ML Ready",
            "description": "Build embedding pipelines, feature engineering jobs, and vector search workloads on the same platform as your operational data.",
            "cta": {
              "text": "Explore AI capabilities",
              "href": "https://docs.pingcap.com/"
            },
            "icon": "Brain"
          }
        ],
        "columns": 3
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "how-it-works",
      "type": "featureMedia",
      "props": {
        "eyebrow": "How it works",
        "title": "From warehouse to queries in three steps",
        "items": [
          {
            "title": "Provision a warehouse",
            "description": "Create a TiDB Cloud Lake warehouse from the TiDB Cloud console. Pick a size; pause or resize any time. No infrastructure to manage.",
            "image": {
              "image": {
                "url": ""
              }
            },
            "imagePosition": "right"
          },
          {
            "title": "Query your data in place",
            "description": "Run distributed SQL against live TiDB data plus historical data in object storage. No ETL pipeline required. Access the full power of your data instantly.",
            "image": {
              "image": {
                "url": ""
              }
            },
            "imagePosition": "left"
          },
          {
            "title": "Connect your stack",
            "description": "Point Tableau, Looker, dbt, or your ML pipeline at the warehouse endpoint. MySQL compatibility means most tools work out of the box.",
            "image": {
              "image": {
                "url": ""
              }
            },
            "imagePosition": "right"
          }
        ],
        "startPosition": "right"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "built-on-tidb",
      "type": "featureCard",
      "props": {
        "eyebrow": "Built on TiDB Cloud",
        "title": "One governance boundary for all workloads",
        "subtitle": "TiDB Cloud Lake inherits TiDB Cloud's identity, RBAC, audit, and billing—no separate vendor to manage.",
        "items": [
          {
            "icon": "Shield",
            "title": "Unified Security & Compliance",
            "description": "Share identity, RBAC, and audit logs across OLTP and OLAP tiers. One governance model for transactions and analytics."
          },
          {
            "icon": "DollarSign",
            "title": "Consolidated Billing",
            "description": "Warehouse compute and storage roll into your existing TiDB Cloud invoice. No idle-capacity fees, no surprise bills."
          },
          {
            "icon": "Layers",
            "title": "Integrated Platform",
            "description": "See the TiDB platform overview for architecture, or the TiDB Cloud documentation to get started."
          }
        ],
        "columns": 3,
        "borderStyle": "color"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "faq-section",
      "type": "faq",
      "props": {
        "title": "Frequently asked questions",
        "items": [
          {
            "q": "What is TiDB Cloud Lake?",
            "a": "TiDB Cloud Lake is the lakehouse analytics tier of TiDB Cloud. It adds on-demand analytic warehouses to the distributed SQL database you run OLTP workloads on, enabling you to run transactions, analytics, and AI workloads on a single unified platform."
          },
          {
            "q": "How is TiDB Cloud Lake priced?",
            "a": "TiDB Cloud Lake uses pay-as-you-go pricing for warehouse compute and storage. Costs are consolidated on your TiDB Cloud invoice, so you manage billing in one place with no separate vendor setup."
          },
          {
            "q": "Who is TiDB Cloud Lake for?",
            "a": "TiDB Cloud Lake is ideal for existing TiDB users hitting HTAP scaling limits, platform teams looking to retire a separate data warehouse, AI/ML teams that need a data lake for training and RAG workloads, and mid-market teams already on TiDB Cloud Essential."
          },
          {
            "q": "Is TiDB Cloud Lake available now?",
            "a": "TiDB Cloud Lake is currently in Private Beta. You can request access from your TiDB Cloud workspace or contact our team to get started."
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "closing-cta",
      "type": "cta",
      "props": {
        "title": "Ready to put OLTP, analytics, and AI on one platform?",
        "subtitle": "Sign up for TiDB Cloud and request Private Beta access to TiDB Cloud Lake today.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start free",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Talk to an engineer",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
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
