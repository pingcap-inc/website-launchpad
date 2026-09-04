import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB vs Amazon Aurora: Scale Past Instance Limits | TiDB",
  description: "Compare TiDB and Amazon Aurora. Scale reads and writes horizontally with strong consistency, real-time HTAP, and online schema changes—no instance ceiling.",
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/lp/tidb-vs-amazon-aurora/' },
  openGraph: {
    title: "TiDB vs Amazon Aurora: Scale Past Instance Limits | TiDB",
    description: "Compare TiDB and Amazon Aurora. Scale reads and writes horizontally with strong consistency, real-time HTAP, and online schema changes—no instance ceiling.",
    url: 'https://www.pingcap.com/lp/tidb-vs-amazon-aurora/',
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
  path: "/lp/tidb-vs-amazon-aurora/",
  title: "TiDB vs Amazon Aurora: Scale Past Instance Limits | TiDB",
  description: "Compare TiDB and Amazon Aurora. Scale reads and writes horizontally with strong consistency, real-time HTAP, and online schema changes—no instance ceiling.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB vs. Amazon Aurora", path: "/lp/tidb-vs-amazon-aurora/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB vs Amazon Aurora: Scale Past Instance Limits | TiDB",
  "meta": {
    "title": "TiDB vs Amazon Aurora: Scale Past Instance Limits | TiDB",
    "description": "Compare TiDB and Amazon Aurora. Scale reads and writes horizontally with strong consistency, real-time HTAP, and online schema changes—no instance ceiling.",
    "canonical": "/lp/tidb-vs-amazon-aurora/",
    "unlisted": true,
    "header": "lp"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "Database Comparison",
        "headline": "TiDB vs. Amazon Aurora",
        "subheadline": "Scale reads and writes past Aurora's instance ceiling with strong consistency and consistent latency at any scale.",
        "primaryCta": {
          "text": "Book a 30-Minute Architecture Call",
          "href": "#book"
        },
        "secondaryCta": {
          "text": "Read the Full Comparison",
          "href": "https://www.pingcap.com/compare/amazon-aurora-vs-tidb/"
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
      "id": "decision-brief",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "The Decision in Brief",
        "title": "Choose the Right Database for Your Workload",
        "items": [
          {
            "variant": "violet",
            "title": "Amazon Aurora",
            "description": "Well-suited for apps with high reads up to a limit. Instance-bound writes with AWS-only deployment.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Database"
          },
          {
            "variant": "blue",
            "title": "TiDB",
            "description": "Handles complex, data-intensive workloads in real time. Scales reads and writes horizontally without an instance ceiling.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Layers"
          }
        ],
        "columns": 2
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "comparison-table",
      "type": "comparisonTable",
      "props": {
        "eyebrow": "Head-to-Head",
        "title": "TiDB vs Amazon Aurora Comparison",
        "subtitle": "See how TiDB compares across key capabilities",
        "ourProduct": "TiDB",
        "competitor": "Amazon Aurora",
        "rows": [
          {
            "feature": "Horizontal read + write scaling",
            "ours": "Yes, no instance ceiling",
            "theirs": "Instance-bound writes"
          },
          {
            "feature": "Real-time HTAP without ETL",
            "ours": true,
            "theirs": false
          },
          {
            "feature": "Online schema change (online DDL)",
            "ours": "Yes, zero-downtime",
            "theirs": "Limited / maintenance windows"
          },
          {
            "feature": "Multi-cloud & hybrid deployment",
            "ours": "AWS, GCP, Azure, on-prem",
            "theirs": "AWS only"
          },
          {
            "feature": "MySQL compatibility",
            "ours": "Full protocol & syntax",
            "theirs": "Aurora MySQL"
          },
          {
            "feature": "Total cost at scale",
            "ours": "Consolidate; scale compute/storage independently",
            "theirs": "Instance + I/O + separate analytics"
          }
        ],
        "cta": {
          "text": "Book a 30-minute Architecture Call",
          "href": "#book"
        }
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "featureGrid-1788210295035",
      "type": "featureGrid",
      "props": {
        "eyebrow": "One Engine, Not a Bolt-On Stack",
        "title": "Consolidate Four Systems Into One Distributed SQL Engine",
        "subtitle": "Most teams stitch four or more systems together long before they hit true scale. TiDB consolidates them onto a single distributed SQL engine — lower cost, fewer failure modes, no ETL, and AI-ready.",
        "items": [
          {
            "icon": "Database",
            "title": "Operational Database",
            "description": "Replace MySQL, Amazon Aurora, and PostgreSQL with one MySQL-compatible distributed SQL engine"
          },
          {
            "icon": "BarChart2",
            "title": "Analytics Warehouse",
            "description": "Native columnar HTAP with TiFlash replaces Snowflake, BigQuery, Redshift, no ETL required",
            "layout": "vertical"
          },
          {
            "icon": "Search",
            "title": "Search & Vector Store",
            "description": "Built-in full-text and vector search eliminates Elasticsearch, OpenSearch, and standalone vector databases",
            "layout": "vertical"
          },
          {
            "icon": "Layers",
            "title": "Sharding & Caches",
            "description": "Transparent auto-sharding with strong consistency, no app-side sharding or external caching layers",
            "layout": "vertical"
          }
        ],
        "columns": 4,
        "itemLayout": "vertical"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "key-differentiators",
      "type": "featureMedia",
      "props": {
        "eyebrow": "Key Differentiators",
        "items": [
          {
            "title": "Online Schema Change, Zero Downtime",
            "description": "Alter tables and add indexes in production with online DDL—no maintenance windows, no blocking migrations. Distributed replication removes single points of failure.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/4bbb32b4-rapid_productivity_illustration_3_.svg",
                "alt": "rapid productivity illustration 3",
                "width": 500,
                "height": 448
              },
              "alt": "rapid productivity illustration 3",
              "width": 500,
              "height": 448
            }
          },
          {
            "title": "Lower Total Cost of Ownership",
            "description": "Consolidate sharded fleets and standalone analytics systems onto one engine that scales storage and compute independently. No more paying for over-provisioned Aurora instances and bolt-on pipelines.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/853056b9-rapid_productivity_illustration-1.svg",
                "alt": "rapid productivity illustration 1",
                "width": 500,
                "height": 448
              },
              "alt": "rapid productivity illustration 1",
              "width": 500,
              "height": 448
            }
          },
          {
            "title": "Real-Time Operational Intelligence",
            "description": "TiFlash columnar replicas run analytics on live operational data in the same system. No ETL, no separate warehouse. Query fresh operational data without impacting transactional workloads.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/2aeed35a-rapid_productivity_illustration_2_.svg",
                "alt": "rapid productivity illustration 2",
                "width": 500,
                "height": 448
              },
              "alt": "rapid productivity illustration 2",
              "width": 500,
              "height": 448
            }
          }
        ],
        "startPosition": "left",
        "spacing": "lg"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "proven-scale",
      "type": "caseStudyCards",
      "props": {
        "eyebrow": "Proven at Scale",
        "title": "Leading Fintech, Social, Data, and SaaS Platforms Run TiDB",
        "items": [
          {
            "badge": "Fintech",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/23ea2f33-plaid-logo.png",
                "alt": "plaid logo",
                "width": 351,
                "height": 132
              },
              "alt": "plaid logo",
              "width": 351,
              "height": 132
            },
            "title": "Plaid: 100 Services Migrated from Aurora with Zero Downtime",
            "description": "A team of six engineers migrated nearly 100 services from Amazon Aurora to TiDB in under 2.5 years, reducing cutover downtime from five minutes to under 60 second per service.",
            "stats": [
              {
                "value": "96%",
                "label": "Less maintenance"
              },
              {
                "value": "<60s",
                "label": "Cutover downtime"
              }
            ],
            "href": "https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/"
          },
          {
            "badge": "Social",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/51545d7d-pinterest-logo.svg",
                "alt": "pinterest logo",
                "width": 181,
                "height": 50
              },
              "alt": "pinterest logo",
              "width": 181,
              "height": 50
            },
            "title": "Pinterest: Graph Service Scaled with 10x Latency Reduction",
            "description": "Modernized its graph service with TiDB eliminating manual sharding and achieving dramatic performance gains while cutting infrastructure costs by more than half.",
            "stats": [
              {
                "value": "50%+",
                "label": "Infra savings"
              },
              {
                "value": "10x",
                "label": "P99 latency cut"
              }
            ],
            "href": "https://www.pingcap.com/blog/why-pinterest-modernized-graph-service-distributed-sql/"
          },
          {
            "badge": "SaaS",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/4043e4af-catalyst.svg",
                "alt": "catalyst",
                "width": 252,
                "height": 72
              },
              "alt": "catalyst",
              "width": 252,
              "height": 72
            },
            "title": "Catalyst: SaaS Data Serving Layer Rearchitected for 60x Faster Queries",
            "description": "Catalyst selected TiDB over Aurora and YugabyteDB to power its customer growth platform, achieving up to 60x faster query response with HTAP capabilities that handle both object and time series data in one stack.",
            "stats": [
              {
                "value": "60x",
                "label": "Faster queries"
              },
              {
                "value": "1",
                "label": "Unified stack"
              }
            ],
            "href": "https://www.pingcap.com/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/"
          },
          {
            "badge": "SaaS",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/239173a5-apps-m.svg",
                "alt": "apps m",
                "width": 24,
                "height": 24
              },
              "alt": "apps m",
              "width": 24,
              "height": 24
            },
            "title": "Atlassian: 750+ Postgres clusters consolidated to 16 TiDB clusters",
            "description": "Atlassian replaced hundreds of sharded PostgreSQL clusters with 16 global TiDB clusters to power its Forge platform, scaling to 3M+ tables and 500k concurrent connections per cluster.",
            "stats": [
              {
                "value": "3M+",
                "label": "Tables per cluster"
              },
              {
                "value": "750+",
                "label": "PG clusters replaced"
              }
            ],
            "href": "https://www.pingcap.com/blog/how-atlassian-scaled-three-million-tables-multi-tenancy-tidb/"
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "recognition",
      "type": "logoCloud",
      "props": {
        "eyebrow": "Industry Recognition",
        "title": "Recognized by Third Parties",
        "logos": [
          {
            "name": "G2 Leader Winter 2026",
            "image": {
              "url": "https://static.pingcap.com/images/053856a3-20260506-160923.png",
              "alt": "20260506 160923",
              "width": 968,
              "height": 598
            },
            "href": "https://www.g2.com/products/tidb/reviews"
          },
          {
            "name": "Gartner Peer Insights Customers' Choice 2025",
            "image": {
              "url": "https://static.pingcap.com/images/e54e2db0-20260506-160445.png",
              "alt": "20260506 160445",
              "width": 972,
              "height": 594
            },
            "href": "https://www.gartner.com/reviews/market/cloud-database-management-systems"
          }
        ],
        "variant": "default",
        "align": "center"
      },
      "style": {
        "spacing": "md"
      }
    },
    {
      "id": "columns-1788502664823",
      "type": "columns",
      "props": {
        "eyebrow": "Industry Recognition",
        "title": "Recognized by Third Parties",
        "titleFullWidth": true,
        "layout": "single",
        "mediaType": "shortcode",
        "shortCode": "[review-badges]",
        "itemColumns": 2
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "Is TiDB a drop-in replacement for MySQL / Aurora MySQL?",
            "a": "TiDB is MySQL-compatible, which means most applications connect with no code change. We recommend validating specifics in a proof-of-concept on your own schema to ensure compatibility with your workload."
          },
          {
            "q": "How does TiDB scale past Aurora's limits?",
            "a": "TiDB scales reads and writes horizontally across nodes with no single-writer instance ceiling while maintaining strong consistency. Add nodes to increase capacity without downtime or architectural changes."
          },
          {
            "q": "Can one system really do OLTP and analytics?",
            "a": "Yes. TiFlash keeps columnar replicas synchronized with row-based storage, and the optimizer routes analytical queries to them on fresh data with no ETL. This hybrid architecture (HTAP) eliminates the need for separate analytics systems."
          },
          {
            "q": "How do online schema changes work?",
            "a": "Online DDL runs in production without maintenance windows or blocking migrations. Schema changes are applied incrementally across the distributed system, allowing your application to continue serving traffic throughout the process."
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "compare-cta",
      "type": "cta",
      "props": {
        "title": "Compare on Your Own Schema",
        "subtitle": "Want to see how TiDB compares to Amazon Aurora for your workload? Schedule an architecture call and our team will walk through your migration path.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Book a 30-Minute Architecture Call",
          "href": "#book"
        },
        "secondaryCta": {
          "text": "Read the Full Comparison Guide",
          "href": "https://www.pingcap.com/compare/amazon-aurora-vs-tidb/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
      }
    },
    {
      "id": "book",
      "type": "form",
      "props": {
        "title": "Book Your Architecture Call",
        "subtitle": "Tell us about your workload and we'll set up a 30-minute call with our engineering team. We'll walk through your MySQL data model, scaling needs, and migration path.",
        "portalId": "4466002",
        "formId": "69c1c0c2-c4d5-4977-ba73-106e608fe731",
        "region": "na1"
      },
      "style": {
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
