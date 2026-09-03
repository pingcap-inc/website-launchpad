import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'TiDB vs MySQL: Scale Without Sharding | MySQL Alternative',
  description:
    'Compare TiDB and MySQL for horizontal scale, distributed ACID, and HTAP. Drop-in MySQL compatibility with automatic sharding and zero-downtime DDL.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-vs-mysql/' },
  openGraph: {
    title: 'TiDB vs MySQL: Scale Without Sharding | MySQL Alternative',
    description:
      'Compare TiDB and MySQL for horizontal scale, distributed ACID, and HTAP. Drop-in MySQL compatibility with automatic sharding and zero-downtime DDL.',
    url: 'https://www.pingcap.com/tidb-vs-mysql/',
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
  path: '/tidb-vs-mysql/',
  title: 'TiDB vs MySQL: Scale Without Sharding | MySQL Alternative',
  description:
    'Compare TiDB and MySQL for horizontal scale, distributed ACID, and HTAP. Drop-in MySQL compatibility with automatic sharding and zero-downtime DDL.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB vs. <span class="text-gradient-violet">MySQL</span>', path: '/tidb-vs-mysql/' },
  ],
})

const dsl: PageDSL = {
  pageName: 'TiDB vs MySQL: Scale Without Sharding | MySQL Alternative',
  meta: {
    title: 'TiDB vs MySQL: Scale Without Sharding | MySQL Alternative',
    description:
      'Compare TiDB and MySQL for horizontal scale, distributed ACID, and HTAP. Drop-in MySQL compatibility with automatic sharding and zero-downtime DDL.',
    canonical: '/tidb-vs-mysql/',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'Database Comparison',
        headline: 'TiDB vs. <span class="text-gradient-violet">MySQL</span>',
        subheadline:
          'Scale MySQL reads and writes past a single primary without manual sharding, and keep strong ACID consistency.',
        primaryCta: {
          text: 'Book a 30-minute Architecture Call',
          href: '#book',
        },
        secondaryCta: {
          text: 'Read the Full Comparison Guide',
          href: 'https://www.pingcap.com/compare/mysql-vs-tidb/',
        },
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'hero image',
          width: 500,
          height: 400,
        },
        heroForm: {
          formId: '69c1c0c2-c4d5-4977-ba73-106e608fe731',
          portalId: '4466002',
          region: 'na1',
        },
      },
      style: {
        spacing: 'hero',
      },
    },
    {
      id: 'decision-brief',
      type: 'featureHighlights',
      props: {
        eyebrow: 'The Decision in Brief',
        title: 'Why Teams Choose TiDB Over MySQL',
        subtitle:
          'Technical complexity rises as scaling and high-availability needs grow. Manual sharding, clustering, and replication add maintenance overhead. TiDB provides one MySQL-compatible engine for transactions and real-time analytics — scaling out without app-side sharding.',
        items: [
          {
            variant: 'violet',
            title: 'Scale Writes Without Sharding',
            description:
              'Transparent horizontal scale for reads and writes — no app-level sharding logic required.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Layers',
          },
          {
            variant: 'blue',
            title: 'Distributed ACID Transactions',
            description: 'Cluster-wide strong consistency with ACID guarantees across all nodes.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Shield',
          },
          {
            variant: 'teal',
            title: 'Native HTAP Capability',
            description:
              'Run real-time analytics on live transactional data with TiFlash columnar storage.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'BarChart2',
          },
        ],
        columns: 3,
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'comparison-table',
      type: 'comparisonTable',
      props: {
        eyebrow: 'Head-to-Head',
        title: 'TiDB vs MySQL: Feature Comparison',
        subtitle:
          'See how TiDB and MySQL stack up across scalability, ACID guarantees, analytics, and operational complexity.',
        ourProduct: 'TiDB',
        competitor: 'MySQL',
        rows: [
          {
            feature: 'Horizontal scale (writes + reads)',
            ours: 'Transparent, automatic',
            theirs: 'Manual sharding required',
          },
          {
            feature: 'Distributed ACID',
            ours: true,
            theirs: 'Single-node ACID only',
          },
          {
            feature: 'Native HTAP',
            ours: 'Yes (TiFlash columnar replicas)',
            theirs: false,
          },
          {
            feature: 'Auto-sharding / rebalancing',
            ours: 'Transparent cluster-wide',
            theirs: 'App-level implementation',
          },
          {
            feature: 'MySQL compatibility',
            ours: 'Full wire protocol',
            theirs: 'Native',
          },
          {
            feature: 'Online schema change',
            ours: 'Zero-downtime DDL',
            theirs: 'Locking or tooling required',
          },
          {
            feature: 'High availability',
            ours: 'Distributed, automatic failover',
            theirs: 'Clustering setup required',
          },
        ],
        cta: {
          text: 'Book a 30-minute Architecture Call',
          href: '#book',
        },
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'featureGrid-1788212651859',
      type: 'featureGrid',
      props: {
        eyebrow: 'One Engine, Not a Bolt-On Stack',
        title: 'Consolidate Four Systems Into One Distributed SQL Engine',
        subtitle:
          'Most teams stitch four or more systems together long before they hit true scale. TiDB consolidates them onto a single distributed SQL engine — lower cost, fewer failure modes, no ETL, and AI-ready.',
        items: [
          {
            icon: 'Database',
            title: 'Operational Database',
            description:
              'Replace MySQL, Amazon Aurora, PostgreSQL with one MySQL-compatible distributed SQL engine',
          },
          {
            icon: 'BarChart2',
            title: 'Analytics Warehouse',
            description:
              'Native columnar HTAP with TiFlash replaces Snowflake, BigQuery, Redshift — no ETL required',
            layout: 'vertical',
          },
          {
            icon: 'Search',
            title: 'Search & Vector Store',
            description:
              'Built-in full-text and vector search eliminates Elasticsearch, OpenSearch, standalone vector databases',
            layout: 'vertical',
          },
          {
            icon: 'Layers',
            title: 'Sharding & Caches',
            description:
              'Transparent auto-sharding with strong consistency, no app-side sharding or external caching layers',
            layout: 'vertical',
          },
        ],
        columns: 4,
        itemLayout: 'vertical',
      },
      style: {
        background: 'primary',
        spacing: 'section',
      },
    },
    {
      id: 'key-benefits',
      type: 'featureMedia',
      props: {
        eyebrow: 'Key Benefits',
        title: 'Why TiDB Is the MySQL Alternative for Scale',
        items: [
          {
            title: 'Drop-in MySQL Compatibility',
            description:
              'TiDB speaks the MySQL protocol, so your drivers, ORMs, and SQL keep working. Migrate without a rewrite, then add Spark, Kafka, and Kubernetes connectors as you grow.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/853056b9-rapid_productivity_illustration-1.svg',
                alt: 'rapid productivity illustration 1',
                width: 500,
                height: 448,
              },
              alt: 'rapid productivity illustration 1',
              width: 500,
              height: 448,
            },
          },
          {
            title: 'Scale Writes Without Sharding',
            description:
              'TiDB transparently shards and rebalances across nodes, so you scale writes and reads without building or maintaining application-level sharding. Add nodes as your workload grows — zero downtime, zero manual rebalancing.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/7ccab1c9-rapid_productivity_illustration.svg',
                alt: 'rapid productivity illustration',
                width: 600,
                height: 600,
              },
              alt: 'rapid productivity illustration',
              width: 600,
              height: 600,
            },
          },
          {
            title: 'Consolidated Data Platform',
            description:
              'One endpoint for transactional and analytical workloads with strong ACID consistency at scale — no separate OLAP system, no ETL. TiFlash columnar replicas run real-time analytics on live data in the same engine.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/4bbb32b4-rapid_productivity_illustration_3_.svg',
                alt: 'rapid productivity illustration 3',
                width: 500,
                height: 448,
              },
              alt: 'rapid productivity illustration 3',
              width: 500,
              height: 448,
            },
          },
        ],
        startPosition: 'left',
        spacing: 'lg',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'customer-proof',
      type: 'caseStudyCards',
      props: {
        eyebrow: 'Proven at Scale',
        title: 'Leading Fintech, Social, and SaaS Platforms Choose TiDB',
        items: [
          {
            badge: 'Fintech',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/23ea2f33-plaid-logo.png',
                alt: 'plaid logo',
                width: 351,
                height: 132,
              },
              alt: 'plaid logo',
              width: 351,
              height: 132,
            },
            title: 'Plaid: 100 Services Migrated from Aurora with Zero Downtime',
            description:
              'A team of six engineers migrated nearly 100 services from Amazon Aurora to TiDB in under 2.5 years, reducing cutover downtime from five minutes to under 60 second per service.',
            stats: [
              {
                value: '96%',
                label: 'Less maintenance',
              },
              {
                value: '<60s',
                label: 'Cutover downtime',
              },
            ],
            href: 'https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/',
          },
          {
            badge: 'Social',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/51545d7d-pinterest-logo.svg',
                alt: 'pinterest logo',
                width: 181,
                height: 50,
              },
              alt: 'pinterest logo',
              width: 181,
              height: 50,
            },
            title: 'Pinterest: Graph Service Scaled with 10x Latency Reduction',
            description:
              'Modernized its graph service with TiDB eliminating manual sharding and achieving dramatic performance gains while cutting infrastructure costs by more than half.',
            stats: [
              {
                value: '50%+',
                label: 'Infra savings',
              },
              {
                value: '10x',
                label: 'P99 latency cut',
              },
            ],
            href: 'https://www.pingcap.com/blog/why-pinterest-modernized-graph-service-distributed-sql/',
          },
          {
            badge: 'SaaS',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/4043e4af-catalyst.svg',
                alt: 'catalyst',
                width: 252,
                height: 72,
              },
              alt: 'catalyst',
              width: 252,
              height: 72,
            },
            title: 'Catalyst: SaaS Data Serving Layer Rearchitected for 60x Faster Queries',
            description:
              'Catalyst selected TiDB over Aurora and YugabyteDB to power its customer growth platform, achieving up to 60x faster query response with HTAP capabilities that handle both object and time series data in one stack.',
            stats: [
              {
                value: '60x',
                label: 'Faster queries',
              },
              {
                value: '1',
                label: 'Unified stack',
              },
            ],
            href: 'https://www.pingcap.com/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
          },
          {
            badge: 'SaaS',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/239173a5-apps-m.svg',
                alt: 'apps m',
                width: 24,
                height: 24,
              },
              alt: 'apps m',
              width: 24,
              height: 24,
            },
            title: 'Atlassian: 750+ Postgres clusters consolidated to 16 TiDB clusters',
            description:
              'Atlassian replaced hundreds of sharded PostgreSQL clusters with 16 global TiDB clusters to power its Forge platform, scaling to 3M+ tables and 500k concurrent connections per cluster.',
            stats: [
              {
                value: '3M+',
                label: 'Tables per cluster',
              },
              {
                value: '750+',
                label: 'PG clusters replaced',
              },
            ],
            href: 'https://www.pingcap.com/blog/how-atlassian-scaled-three-million-tables-multi-tenancy-tidb/',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'third-party-recognition',
      type: 'logoCloud',
      props: {
        eyebrow: 'Third-Party Recognition',
        title: 'Recognized by Industry Analysts and Customers',
        logos: [
          {
            name: 'G2 Leader Winter 2026',
            image: {
              url: 'https://static.pingcap.com/images/053856a3-20260506-160923.png',
              alt: '20260506 160923',
              width: 968,
              height: 598,
            },
            href: 'https://www.g2.com/products/tidb/reviews',
          },
          {
            name: "Gartner Peer Insights Customers' Choice 2025",
            image: {
              url: 'https://static.pingcap.com/images/e54e2db0-20260506-160445.png',
              alt: '20260506 160445',
              width: 972,
              height: 594,
            },
            href: 'https://www.gartner.com/reviews/market/cloud-database-management-systems',
          },
        ],
        variant: 'minimal',
        align: 'center',
      },
      style: {
        spacing: 'md',
      },
    },
    {
      id: 'faq',
      type: 'faq',
      props: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is TiDB a drop-in replacement for MySQL?',
            a: 'TiDB is MySQL wire protocol compatible, so most apps connect without code changes. Your existing MySQL drivers, ORMs (like Sequelize, ActiveRecord, Django ORM), and SQL queries work as-is. Edge cases (stored procedures, specific engine behaviors) should be validated in a POC.',
          },
          {
            q: 'How does TiDB scale writes without sharding?',
            a: 'TiDB auto-splits data into ranges (regions) and rebalances them across TiKV nodes transparently. Your app never manages shard keys, routing logic, or cross-shard transactions — TiDB handles it cluster-wide with distributed ACID guarantees.',
          },
          {
            q: 'Does TiDB support real-time analytics?',
            a: 'Yes. TiFlash columnar replicas run OLAP queries on live transactional data in the same engine, with no ETL. You query the same SQL endpoint for OLTP and OLAP, and TiDB routes analytical queries to TiFlash automatically.',
          },
          {
            q: 'What about high availability?',
            a: 'TiDB uses a distributed, Raft-replicated architecture with automatic failover and no single points of failure. Nodes can fail without data loss or downtime — the cluster self-heals and rebalances.',
          },
          {
            q: 'How does online schema change work in TiDB?',
            a: "TiDB performs DDL operations (ALTER TABLE, ADD INDEX) online with zero downtime. Unlike MySQL, which can lock tables or require third-party tools like pt-online-schema-change, TiDB's distributed architecture allows schema changes to apply incrementally across the cluster.",
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'book',
      type: 'cta',
      props: {
        title: 'Compare TiDB on Your Own Schema',
        subtitle:
          "Book a 30-minute architecture call with our engineering team. We'll walk through your MySQL data model, scaling needs, and migration path — no sales pitch, just technical guidance.",
        image: {
          image: {
            url: 'https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg',
          },
          alt: '',
          width: 278,
          height: 256,
        },
        primaryCta: {
          text: 'Book a 30-minute Architecture Call',
          href: '#form',
        },
        secondaryCta: {
          text: 'Read the Full Comparison Guide',
          href: 'https://www.pingcap.com/compare/mysql-vs-tidb/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'section',
      },
    },
    {
      id: 'form',
      type: 'form',
      props: {
        title: 'Book Your Architecture Call',
        subtitle:
          "Tell us about your workload and we'll set up a 30-minute call with our engineering team.",
        portalId: '4466002',
        formId: '69c1c0c2-c4d5-4977-ba73-106e608fe731',
        region: 'na1',
      },
      style: {
        spacing: 'section',
      },
    },
  ],
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
