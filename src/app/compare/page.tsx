import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Database Comparisons | PingCAP",
  description: "Head-to-head comparisons of TiDB vs MySQL, Aurora, CockroachDB, YugabyteDB, and guides to choosing the right distributed SQL database for your workload.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/compare/' },
  openGraph: {
    title: "TiDB Database Comparisons | PingCAP",
    description: "Head-to-head comparisons of TiDB vs MySQL, Aurora, CockroachDB, YugabyteDB, and guides to choosing the right distributed SQL database for your workload.",
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
  title: "TiDB Database Comparisons | PingCAP",
  description: "Head-to-head comparisons of TiDB vs MySQL, Aurora, CockroachDB, YugabyteDB, and guides to choosing the right distributed SQL database for your workload.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Choose the Right <span class=\"text-gradient-blue\">Database</span> for Your Workload", path: "/compare/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Database Comparisons | PingCAP",
  "meta": {
    "title": "TiDB Database Comparisons | PingCAP",
    "description": "Head-to-head comparisons of TiDB vs MySQL, Aurora, CockroachDB, YugabyteDB, and guides to choosing the right distributed SQL database for your workload.",
    "canonical": "/compare/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "Database Comparisons",
        "headline": "Choose the Right <span class=\"text-gradient-blue\">Database</span> for Your Workload",
        "subheadline": "Head-to-head comparisons of TiDB against MySQL, Aurora, CockroachDB, YugabyteDB, and guides to distributed SQL databases for OLTP, HTAP, SaaS, and AI workloads. Written by engineers, reviewed in production.",
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View Docs",
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
        "spacing": "hero"
      }
    },
    {
      "id": "head-to-head",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Head-to-Head Comparisons",
        "title": "Detailed Workload-Driven Comparisons",
        "subtitle": "Each page covers architecture, scalability, ACID behavior, HA, TCO, and a clear verdict for your use case.",
        "items": [
          {
            "icon": "Database",
            "title": "TiDB vs MySQL",
            "description": "Scale-out writes, HTAP, and distributed transactions vs. MySQL's single-primary simplicity. The definitive guide for teams hitting write limits or approaching sharding.",
            "cta": {
              "text": "Compare",
              "href": "https://www.pingcap.com/compare/mysql-vs-tidb/"
            }
          },
          {
            "icon": "Cloud",
            "title": "TiDB vs Amazon Aurora",
            "description": "Cloud-native distributed SQL vs. AWS's managed relational offering. Covers TCO at scale, multi-region HA, HTAP, and reducing AWS dependency.",
            "cta": {
              "text": "Compare",
              "href": "https://www.pingcap.com/compare/amazon-aurora-vs-tidb/"
            }
          },
          {
            "icon": "Cpu",
            "title": "TiDB vs CockroachDB",
            "description": "The two most-evaluated NewSQL databases. MySQL ecosystem vs. PostgreSQL wire protocol, HTAP capabilities, and Kubernetes operations compared.",
            "cta": {
              "text": "Compare",
              "href": "https://www.pingcap.com/compare/cockroachdb-vs-tidb/"
            }
          },
          {
            "icon": "Server",
            "title": "TiDB vs YugabyteDB",
            "description": "Two open-source distributed SQL databases with different protocol approaches and consistency models. HTAP support, compatibility, and licensing.",
            "cta": {
              "text": "Compare",
              "href": "https://www.pingcap.com/compare/yugabytedb-vs-tidb/"
            }
          },
          {
            "title": "TiDB vs PostgreSQL",
            "description": "Distributed SQL vs. the world's most extensible open-source database. Covers horizontal scaling, HTAP, MySQL compatibility, and when Postgres hits its limits.",
            "cta": {
              "text": "Compare",
              "href": "https://www.pingcap.com/compare/tidb-vs-postgresql-2026-comparison-guide/"
            },
            "layout": "vertical"
          }
        ],
        "columns": 2
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "guides",
      "type": "featureCard",
      "props": {
        "eyebrow": "Guides & Listicles",
        "title": "Not Sure Which Database to Shortlist?",
        "subtitle": "Coverage by workload — not by vendor.",
        "items": [
          {
            "icon": "Layers",
            "title": "Best Distributed SQL Databases (2026)",
            "description": "Ranked guide to leading distributed SQL databases — covering architecture, consistency guarantees, ecosystem fit, and when each is the right call.",
            "href": "https://www.pingcap.com/compare/best-distributed-sql-databases/"
          },
          {
            "icon": "Bot",
            "title": "Best Database for AI Agents (2026)",
            "description": "Memory layers, vector search, ACID state management, and multi-agent scale. Compares TiDB, Pinecone, Redis, pgvector, Milvus, MongoDB, and others.",
            "href": "https://www.pingcap.com/compare/best-database-for-ai-agents/"
          },
          {
            "icon": "GitBranch",
            "title": "Best Vector Database for RAG (2026)",
            "description": "Retrieval quality, metadata filtering, hybrid search, and production readiness. Updated quarterly to reflect real vendor capability changes.",
            "href": "https://www.pingcap.com/compare/best-vector-database/"
          },
          {
            "icon": "Building",
            "title": "Best Databases for SaaS at Scale",
            "description": "Multi-tenant isolation, horizontal scaling, schema flexibility, and cost predictability for SaaS applications hitting growth inflection points.",
            "href": "https://www.pingcap.com/compare/best-databases-for-saas-applications-at-scale/"
          },
          {
            "icon": "FileCode",
            "title": "Best Database for AI Applications",
            "description": "A practical guide comparing 10 databases for RAG pipelines, vector search, and real-time AI workloads — covering SQL support, ACID compliance, scalability, and when to use a unified platform vs. purpose-built tools.",
            "href": "https://www.pingcap.com/compare/best-database-building-ai-apps/"
          }
        ],
        "columns": 2,
        "borderStyle": "color"
      },
      "style": {
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
            "q": "What is TiDB and how does it differ from MySQL?",
            "a": "TiDB is an open-source distributed SQL database that speaks the MySQL protocol, so most MySQL applications connect without code changes. The key difference is scaling model: MySQL scales vertically on a single primary (plus read replicas), while TiDB distributes both storage and compute across nodes — handling scale-out writes, ACID transactions, and real-time analytics (HTAP) in one system. See TiDB vs MySQL comparison for details."
          },
          {
            "q": "When should I choose TiDB over MySQL or PostgreSQL?",
            "a": "Choose TiDB when you're hitting write scaling limits on a single primary, when sharding is becoming a serious conversation, or when you need fresh analytics on live transactional data without building a separate warehouse pipeline. If your workload fits comfortably on a single primary with read replicas, MySQL or PostgreSQL is simpler — and that simplicity has real value. TiDB adds the most value at scale."
          },
          {
            "q": "Is TiDB really MySQL-compatible?",
            "a": "TiDB is wire-protocol compatible with MySQL 5.7/8.0 and supports the majority of MySQL SQL syntax. In practice, most MySQL applications connect and run without changes. Edge cases exist — stored procedures and functions, triggers, and events are not supported, and some SELECT FOR UPDATE patterns and a handful of MySQL-specific functions differ. Foreign keys are fully supported as of v8.5. Full compatibility reference available in docs."
          },
          {
            "q": "What does HTAP mean, and does TiDB actually do it?",
            "a": "HTAP — Hybrid Transactional and Analytical Processing — means running OLTP and OLAP queries on the same live data without ETL. TiDB does this via two storage engines: TiKV (row-based, for transactions) and TiFlash (column-based, for analytics), with asynchronous replication that stays near real-time. Queries automatically route to the right engine. The practical benefit is fresher analytics without a separate data warehouse."
          },
          {
            "q": "How does TiDB compare to CockroachDB?",
            "a": "Both are NewSQL databases built for horizontal scale-out with ACID transactions. TiDB is MySQL-compatible and has a stronger HTAP story via TiFlash. CockroachDB is PostgreSQL-compatible and leans into global multi-region active-active deployments. TiDB is Apache 2.0 open-source; CockroachDB moved to an Enterprise license in 2024. See full comparison for details.Both are NewSQL databases built for horizontal scale-out with ACID transactions. TiDB is MySQL-compatible and has a stronger HTAP story via TiFlash. CockroachDB is PostgreSQL-compatible and leans into global multi-region active-active deployments. TiDB is Apache 2.0 open-source; CockroachDB moved to an Enterprise license in 2024. See full comparison for details."
          },
          {
            "q": "Can TiDB handle AI and vector search workloads?",
            "a": "Yes. TiDB Vector Search adds native vector similarity search (HNSW indexing) within the same database as your SQL tables. The real power is combining vector search, full-text search (BM25), and SQL filters in a single hybrid query — enabling semantic retrieval with structured data in one system. TiDB also supports auto-embedding on INSERT, so vectors can be generated automatically as data is written. See AI Agents and Vector Database guides for detailed coverage."
          },
          {
            "q": "Is TiDB free to use?",
            "a": "TiDB Self-Managed is fully open-source under Apache 2.0 — no licensing fees. TiDB Cloud (managed service on AWS, GCP, Azure) has a free Starter tier with no credit card required."
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "about",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "About These Comparisons",
        "title": "Built for Production Context",
        "subtitle": "Each comparison is written with real architectural tradeoffs in mind, reviewed by engineers who have run these systems in production workloads.",
        "items": [
          {
            "variant": "blue",
            "title": "Architecture Tradeoffs",
            "description": "We cover scaling models, consistency guarantees, HA behavior under failure, and operational complexity — not just feature checklists.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Layers"
          },
          {
            "variant": "violet",
            "title": "Production-Reviewed",
            "description": "Each page is reviewed by practitioners who have deployed these databases at scale. Known limitations are flagged prominently.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "CheckCircle"
          },
          {
            "variant": "teal",
            "title": "Quarterly Updates",
            "description": "Comparisons are updated at least quarterly to reflect real vendor capability changes. Review dates are shown on every page.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Repeat"
          }
        ],
        "columns": 3
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Try TiDB Against Your Workload",
        "subtitle": "No credit card required. Connects with your existing MySQL driver in minutes.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "MySQL Compatibility Docs",
          "href": "https://docs.pingcap.com/tidb/stable/mysql-compatibility"
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
