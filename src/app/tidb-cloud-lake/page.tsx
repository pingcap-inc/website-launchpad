import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
  description: "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI workloads.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud-lake/' },
  openGraph: {
    title: "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
    description: "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI workloads.",
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
  title: "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
  description: "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI workloads.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Analytics and search. <span class=\"text-gradient-violet\">One engine. </span>", path: "/tidb-cloud-lake/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
  "meta": {
    "title": "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
    "description": "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI workloads.",
    "canonical": "/tidb-cloud-lake/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "image-right",
        "eyebrow": "TiDB Cloud Lake | Public Preview",
        "headline": "Analytics and search. <span class=\"text-gradient-violet\">One engine. </span>",
        "subheadline": "TiDB Cloud Lake is a managed analytics warehouse for data and platform teams. Prepare business data, analyze logs and explore agent traces with SQL, full-text search and vector search.",
        "primaryCta": {
          "text": "Get Started",
          "href": "https://tidbcloud.com/signup/?signup_source=pingcap-en-lake"
        },
        "secondaryCta": {
          "text": "View Pricing",
          "href": "https://www.pingcap.com/pricing/"
        },
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/e0454c7c-group_1000011598__1_.png",
            "alt": "Cloud lake illustration",
            "width": 386,
            "height": 370
          },
          "alt": "Cloud lake illustration",
          "width": 386,
          "height": 370
        }
      },
      "style": {
        "spacing": "hero"
      }
    },
    {
      "id": "why-tidb-cloud-lake",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Prepare. Search. Scale.",
        "title": "Why TiDB Cloud Lake",
        "subtitle": "",
        "items": [
          {
            "variant": "violet",
            "title": "Prepare Data with SQL",
            "description": "Join operational data with historical records using SQL. Use tasks and streams to automate transformations and build analytical tables for metrics, reporting and ad hoc analysis.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Layers"
          },
          {
            "variant": "blue",
            "title": "Search Across Your Data",
            "description": "Combine SQL, full-text search and vector search over logs, events and nested JSON. Explore application behavior and retrieve context from business records and agent traces.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Search"
          },
          {
            "variant": "teal",
            "title": "Scale Compute on Demand",
            "description": "Keep data in object storage and scale compute independently. Resize warehouses as demand changes, and use auto-suspend to stop idle warehouse compute charges.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Gauge"
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
        "eyebrow": "How It Works",
        "title": "Connect your data. Build analytics and search.",
        "subtitle": "TiDB Cloud runs your transactional applications. Cloud Lake brings a copy of that data together with other sources for analytics and search, using separate analytical compute.",
        "items": [
          {
            "title": "",
            "description": "",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/dd0669e1-clip_path_group.png",
                "alt": "clip path group",
                "width": 720,
                "height": 664
              },
              "alt": "clip path group",
              "width": 720,
              "height": 664
            }
          }
        ],
        "startPosition": "right"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "featureCard-1790893237169",
      "type": "featureCard",
      "props": {
        "title": "How Customers Use Cloud Lake",
        "items": [
          {
            "title": "ClinkPay",
            "description": "Payment analytics\nClinkPay uses TiDB Cloud Lake for continuous payment-data processing and analytics models. Its core analytics system went live in about one week."
          },
          {
            "title": "Global Digital-Asset Exchange Serving Millions of Users",
            "description": "Production log analytics\nA global digital-asset exchange migrated production log analytics to TiDB Cloud Lake. Queries that previously timed out after a minute now return within five seconds, while estimated monthly costs decreased by 67%."
          },
          {
            "title": "Production iGaming Platform Running Live Vector Search",
            "description": "Vector Search\nA production iGaming platform continuously synchronizes vector data from TiDB Essential into TiDB Cloud Lake and runs live vector search across its application data."
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "faq-section",
      "type": "faq",
      "props": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "How Does TiDB Cloud Lake Work with TiDB Cloud?",
            "a": "TiDB Cloud runs transactional applications; Cloud Lake runs analytics and search on a separate copy of your data. An initial snapshot and ongoing TiCDC changes move through S3 staging into Lake. You can also use Lake with data from other sources."
          },
          {
            "q": "What Data Can I Bring Into TiDB Cloud Lake?",
            "a": "Synchronize MySQL or PostgreSQL data with snapshot and change data capture (CDC) tasks. Load CSV, Parquet or NDJSON files from Amazon S3 through one-time or continuous ingestion.  Explore integration options - https://docs.pingcap.com/tidbcloudlake/data-integration-overview/"
          },
          {
            "q": "How Is TiDB Cloud Lake Priced?",
            "a": "Pricing covers warehouse compute, storage, cloud service/API usage and applicable Data Integration hosting. Suspending a warehouse stops its compute charges; storage and other applicable charges continue. View pricing - https://www.pingcap.com/pricing/"
          },
          {
            "q": "Is TiDB Cloud Lake Available Now?",
            "a": "TiDB Cloud Lake is in Public Preview. Sign in to TiDB Cloud, open My Lake and initialize the service. Follow the Quick Start to create a warehouse and run your first query. Read the Quickstart Guide  - https://docs.pingcap.com/tidbcloudlake/lake-quick-start/"
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Start building with TiDB Cloud Lake",
        "subtitle": "Explore the Quick Start, or talk with us about your workload.",
        "primaryCta": {
          "text": "Get Started",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Contact Sales",
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
