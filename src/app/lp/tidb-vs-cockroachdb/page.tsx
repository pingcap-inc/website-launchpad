import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB vs CockroachDB: MySQL-Compatible, Native HTAP Database",
  description: "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/lp/tidb-vs-cockroachdb/' },
  openGraph: {
    title: "TiDB vs CockroachDB: MySQL-Compatible, Native HTAP Database",
    description: "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling.",
    url: 'https://www.pingcap.com/lp/tidb-vs-cockroachdb/',
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
  path: "/lp/tidb-vs-cockroachdb/",
  title: "TiDB vs CockroachDB: MySQL-Compatible, Native HTAP Database",
  description: "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB vs CockroachDB: <span class=\"text-gradient-violet\">MySQL-Compatible</span>, Native HTAP", path: "/lp/tidb-vs-cockroachdb/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB vs CockroachDB: MySQL-Compatible, Native HTAP Database",
  "meta": {
    "title": "TiDB vs CockroachDB: MySQL-Compatible, Native HTAP Database",
    "description": "Compare TiDB and CockroachDB for MySQL workloads. TiDB offers MySQL compatibility, native columnar HTAP with TiFlash, and disaggregated compute/storage scaling.",
    "canonical": "/lp/tidb-vs-cockroachdb/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "Database Comparison",
        "headline": "TiDB vs CockroachDB: <span class=\"text-gradient-violet\">MySQL-Compatible</span>, Native HTAP",
        "subheadline": "If your stack is MySQL and you need real analytics on live data, TiDB gives you MySQL compatibility, native columnar HTAP, and independent compute/storage scaling without a Postgres-wire migration.",
        "primaryCta": {
          "text": "Book 30-minute Architecture Call",
          "href": "#book"
        },
        "secondaryCta": {
          "text": "Read Full Comparison Guide",
          "href": "https://www.pingcap.com/compare/cockroachdb-vs-tidb/"
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
        "title": "MySQL Compatibility vs Postgres Wire Protocol",
        "subtitle": "CockroachDB is Postgres-wire compatible; TiDB is MySQL-compatible. For MySQL shops, TiDB avoids the migration cost of moving to a Postgres-compatible engine.",
        "items": [
          {
            "variant": "violet",
            "title": "MySQL Wire Protocol",
            "description": "TiDB speaks MySQL 8.0 natively — use existing drivers, ORMs, and team knowledge without retraining.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Database"
          },
          {
            "variant": "blue",
            "title": "Native Columnar HTAP",
            "description": "TiFlash columnar replicas enable real-time analytics on live data. No ETL, no separate warehouse.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "BarChart2"
          },
          {
            "variant": "teal",
            "title": "Disaggregated Architecture",
            "description": "Scale compute and storage independently. Pay for what you actually need, not bundled overhead.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Layers"
          }
        ],
        "columns": 3
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "compatibility-comparison",
      "type": "comparisonTable",
      "props": {
        "eyebrow": "Feature Comparison",
        "title": "Compatibility Comparison: TiDB vs CockroachDB",
        "subtitle": "If your application, drivers, ORMs, and team expertise are MySQL-based, TiDB keeps everything productive through migration without Postgres-wire compatibility-layer costs.",
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
          "text": "Book 30-minute Architecture Call",
          "href": "#book"
        }
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "featureGrid-1788201132533",
      "type": "featureGrid",
      "props": {
        "eyebrow": "One Engine, Not a Bolt-On Stack",
        "title": "Consolidate Four Systems Into One Distributed SQL Engine",
        "subtitle": "Most teams stitch four or more systems together long before they hit true scale. TiDB consolidates them onto a single distributed SQL engine — lower cost, fewer failure modes, no ETL, and AI-ready.",
        "items": [
          {
            "icon": "Database",
            "title": "Operational Database",
            "description": "Replace MySQL, Amazon Aurora, PostgreSQL with one MySQL-compatible distributed SQL engine",
            "layout": "vertical"
          },
          {
            "icon": "BarChart2",
            "title": "Analytics Warehouse",
            "description": "Native columnar HTAP with TiFlash replaces Snowflake, BigQuery, and Redshift. No ETL required",
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
      "id": "tiflash-htap",
      "type": "featureMedia",
      "props": {
        "eyebrow": "Architectural Advantages",
        "title": "TiFlash vs External Analytics: One System, No ETL",
        "subtitle": "",
        "items": [
          {
            "title": "Real-Time Analytics Without Compromise",
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
      "id": "architecture-features",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Minimized Complexity",
        "title": "Auto-Sharding, Disaggregated Compute, Online DDL",
        "subtitle": "TiDB handles distributed database complexity so your team can focus on building features, not managing sharding logic.",
        "items": [
          {
            "icon": "LayoutGrid",
            "title": "Transparent Auto-Sharding",
            "description": "Data auto-splits into Regions and rebalances transparently across nodes. Your application never manages shard keys or partition logic. TiDB handles distribution automatically.",
            "layout": "vertical"
          },
          {
            "icon": "Layers",
            "title": "Disaggregated Compute and Storage",
            "description": "Scale compute (TiDB nodes) and storage (TiKV/TiFlash) independently. Address the actual bottleneck without over-provisioning both layers. Pay only for what you need.",
            "layout": "vertical"
          },
          {
            "icon": "RefreshCw",
            "title": "Non-Blocking Online DDL",
            "description": "Schema changes run in parallel across the cluster on isolated resources. Add columns, create indexes, or modify tables without locking production traffic or scheduling downtime.",
            "layout": "vertical"
          },
          {
            "icon": "Shield",
            "title": "Strict ACID Transactions",
            "description": "Snapshot-isolation transactions coordinated by the Placement Driver provide strong consistency across all nodes. Maintain data integrity at scale without compromising on distributed guarantees.",
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
      "id": "case-studies",
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
            "a": "TiDB is binary-compatible with the MySQL 8.0 wire protocol. Most applications connect with no code change. Validate specifics in a proof-of-concept with your own schema and queries."
          },
          {
            "q": "How does TiDB handle distributed transactions and ACID?",
            "a": "Strict ACID with snapshot-isolation transactions coordinated by the Placement Driver, strong consistency across all nodes."
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
            "a": "Run a POC on your own schema and workload. The architectural differences (MySQL wire, native HTAP, disaggregated storage) are structural."
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "pre-form-cta",
      "type": "cta",
      "props": {
        "title": "Compare on Your Own Schema",
        "subtitle": "Compare TiDB and CockroachDB on your own schema. Schedule an architecture call with our engineering team.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Book 30-minute Architecture Call",
          "href": "#book"
        },
        "secondaryCta": {
          "text": "Read Full Comparison Guide",
          "href": "https://www.pingcap.com/compare/cockroachdb-vs-tidb/"
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
        "subtitle": "Tell us about your workload and we'll set up a 30-minute call with our engineering team. We'll walk through your data model, scaling needs, and migration path.",
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
