import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB vs CockroachDB: MySQL-Compatible Native HTAP Database",
  description: "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling without Postgres migration costs.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-vs-cockroachdb-lp/' },
  openGraph: {
    title: "TiDB vs CockroachDB: MySQL-Compatible Native HTAP Database",
    description: "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling without Postgres migration costs.",
    url: 'https://www.pingcap.com/tidb-vs-cockroachdb-lp/',
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
  path: "/tidb-vs-cockroachdb-lp/",
  title: "TiDB vs CockroachDB: MySQL-Compatible Native HTAP Database",
  description: "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling without Postgres migration costs.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB vs CockroachDB: <span class=\"text-gradient-violet\">MySQL-Compatible</span>, Native HTAP", path: "/tidb-vs-cockroachdb-lp/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB vs CockroachDB: MySQL-Compatible Native HTAP Database",
  "meta": {
    "title": "TiDB vs CockroachDB: MySQL-Compatible Native HTAP Database",
    "description": "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling without Postgres migration costs.",
    "canonical": "/tidb-vs-cockroachdb-lp/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "split",
        "eyebrow": "North America",
        "headline": "TiDB vs CockroachDB: <span class=\"text-gradient-violet\">MySQL-Compatible</span>, Native HTAP",
        "subheadline": "If your stack is MySQL and you need real analytics on live data, TiDB gives you MySQL compatibility, native columnar HTAP, and independent compute/storage scaling — without a Postgres-wire migration.",
        "primaryCta": {
          "text": "Book a 30-minute Architecture Call",
          "href": ""
        },
        "secondaryCta": {
          "text": "Read the Full Comparison Guide",
          "href": "www.pingcap.com/compare/cockroachdb-vs-tidb/"
        },
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 400
        },
        "heroForm": null
      },
      "style": {
        "spacing": "hero"
      }
    },
    {
      "id": "decision-brief",
      "type": "featureCard",
      "props": {
        "title": "The Decision in Brief",
        "subtitle": "CockroachDB is Postgres-wire compatible; TiDB is MySQL-compatible. For MySQL shops, TiDB avoids the migration cost of moving to a Postgres-compatible engine. TiDB also has native columnar HTAP (TiFlash), where CockroachDB relies on external analytics patterns.",
        "items": [
          {
            "icon": "Database",
            "title": "MySQL Wire Protocol",
            "description": "Keep your MySQL drivers, ORMs, and team expertise — no Postgres migration layer.",
            "borderColor": "violet"
          },
          {
            "icon": "Layers",
            "title": "Native Columnar HTAP",
            "description": "TiFlash columnar replicas run analytics on fresh transactional data, no ETL pipeline.",
            "borderColor": "blue"
          },
          {
            "icon": "Cpu",
            "title": "Disaggregated Architecture",
            "description": "Scale compute and storage independently — only pay for what you use.",
            "borderColor": "teal"
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
      "id": "compatibility-comparison",
      "type": "comparisonTable",
      "props": {
        "eyebrow": "Compatibility",
        "title": "MySQL Stack vs Postgres Stack",
        "subtitle": "If your application, drivers, ORMs, and team expertise are MySQL-based, TiDB keeps everything productive through migration — without Postgres-wire compatibility-layer costs.",
        "ourProduct": "TiDB",
        "competitor": "CockroachDB",
        "rows": [
          {
            "feature": "Wire Protocol",
            "ours": "MySQL 8.0",
            "theirs": "PostgreSQL"
          },
          {
            "feature": "Driver Compatibility",
            "ours": "MySQL drivers (JDBC, Go, Python, etc.)",
            "theirs": "PostgreSQL drivers"
          },
          {
            "feature": "ORM Support",
            "ours": "Native MySQL ORM support",
            "theirs": "PostgreSQL ORM support"
          },
          {
            "feature": "Migration Path",
            "ours": "Direct from MySQL",
            "theirs": "Requires PostgreSQL migration"
          },
          {
            "feature": "Team Knowledge",
            "ours": "Leverage existing MySQL expertise",
            "theirs": "Requires PostgreSQL training"
          },
          {
            "feature": "HTAP / Analytics",
            "ours": "Native columnar HTAP (TiFlash), no ETL",
            "theirs": "External analytics patterns"
          }
        ],
        "cta": {
          "text": "Read the full comparison guide",
          "href": "https://www.pingcap.com/compare/cockroachdb-vs-tidb/"
        }
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "tiflash-htap",
      "type": "featureMedia",
      "props": {
        "eyebrow": "Architectural Advantages",
        "title": "TiFlash vs External Analytics: One System, No ETL",
        "items": [
          {
            "title": "Native Columnar HTAP",
            "description": "TiFlash columnar replicas plus optimizer pushdown run OLTP and OLAP on the same fresh data, in one system. No separate warehouse, no ETL pipelines, no data lag. CockroachDB is row-store only; for analytics you export to an external warehouse, adding latency, ETL complexity, and cost.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/1d4c74b6-tidb-architecture-v6.png",
                "alt": "tidb architecture v6",
                "width": 3000,
                "height": 1600
              },
              "alt": "tidb architecture v6",
              "width": 3000,
              "height": 1600
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
      "id": "architectural-advantages",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Architecture",
        "title": "Auto-Sharding, Disaggregated Compute, Online DDL",
        "items": [
          {
            "icon": "LayoutGrid",
            "title": "Auto-Sharding",
            "description": "No manual sharding — data auto-splits into Regions and rebalances transparently; your app never manages shard keys.",
            "layout": "vertical"
          },
          {
            "icon": "Server",
            "title": "Disaggregated Compute & Storage",
            "description": "Scale the actual bottleneck instead of over-provisioning both — compute and storage scale independently.",
            "layout": "vertical"
          },
          {
            "icon": "RefreshCw",
            "title": "Online DDL",
            "description": "Online schema changes (DDL) run across the cluster without stop-the-world blocking.",
            "layout": "vertical"
          },
          {
            "icon": "Shield",
            "title": "Strict ACID Transactions",
            "description": "Strict ACID with snapshot-isolation transactions coordinated by the Placement Driver.",
            "layout": "vertical"
          }
        ],
        "columns": 4,
        "itemLayout": "vertical",
        "iconSize": 48
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "proof-north-america",
      "type": "caseStudyCards",
      "props": {
        "eyebrow": "Customer Proof",
        "title": "Proven at Scale",
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
            "title": "Plaid",
            "description": "Migrated off Amazon Aurora to distributed SQL for mission-critical fintech workloads.",
            "stats": [
              {
                "value": "96%",
                "label": "Reduction in Maintenance Effort"
              }
            ]
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
            "title": "Pinterest",
            "description": "Consolidated bolt-on systems onto one MySQL-compatible engine at scale.",
            "stats": [
              {
                "value": "80%+",
                "label": "Savings on Infrastructure Costs"
              }
            ]
          },
          {
            "badge": "Payments",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/a0a5fcc1-square.svg",
                "alt": "square",
                "width": 138,
                "height": 42
              },
              "alt": "square",
              "width": 138,
              "height": 42
            },
            "title": "Square",
            "description": "Eliminated manual sharding at scale with auto-sharding and disaggregated architecture.",
            "stats": [
              {
                "value": "MySQL",
                "label": "Latency and Manual Sharding Reduced"
              }
            ]
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
            "title": "Catalyst",
            "description": "Runs multi-tenant SaaS workloads on TiDB with MySQL compatibility and HTAP.",
            "stats": [
              {
                "value": "60x",
                "label": "Query Speed Performance Boost"
              }
            ]
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "third-party-recognition",
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
            "width": 200,
            "height": 168
          },
          {
            "name": "Gartner Peer Insights Customers' Choice 2025",
            "image": {
              "url": "https://static.pingcap.com/images/e54e2db0-20260506-160445.png",
              "alt": "20260506 160445",
              "width": 972,
              "height": 594
            },
            "width": 200,
            "height": 168
          }
        ],
        "variant": "minimal",
        "align": "center"
      },
      "style": {
        "spacing": "md"
      }
    },
    {
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "Is TiDB a drop-in replacement for MySQL?",
            "a": "TiDB is binary-compatible with the MySQL 8.0 wire protocol — most applications connect with no code change. Validate specifics in a proof-of-concept with your own schema and queries."
          },
          {
            "q": "How does TiDB handle distributed transactions and ACID?",
            "a": "Strict ACID with snapshot-isolation transactions coordinated by the Placement Driver — strong consistency across all nodes."
          },
          {
            "q": "What does HTAP mean, and how does TiFlash work?",
            "a": "Hybrid transactional/analytical processing. TiFlash keeps columnar replicas so one query can span row and column stores on fresh data, with no ETL."
          },
          {
            "q": "Do I need sharding or partitioning with TiDB?",
            "a": "No manual sharding. Data auto-splits and rebalances; the app never needs to know where data lives."
          },
          {
            "q": "How do online schema changes work?",
            "a": "DDL parallelizes across the cluster on isolated resources, so it does not block production."
          },
          {
            "q": "How should I evaluate performance?",
            "a": "Run a POC on your own schema and workload — the architectural differences (MySQL wire, native HTAP, disaggregated storage) are structural."
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "props": {
        "title": "Compare on Your Own Schema",
        "subtitle": "Compare TiDB and CockroachDB on your own schema. Book a 30-minute architecture call with our engineering team.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Book a 30-minute Architecture Call",
          "href": "https://www.pingcap.com/contact-us/"
        },
        "secondaryCta": {
          "text": "Read the Full Comparison Guide",
          "href": "https://www.pingcap.com/compare/cockroachdb-vs-tidb/"
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
