import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'TiDB vs YugabyteDB: MySQL-First Distributed SQL Database',
  description:
    'Compare TiDB and YugabyteDB for MySQL-first teams. TiDB offers MySQL 8.0 compatibility, native HTAP analytics, and distributed SQL at scale with lower migration friction.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/lp/tidb-vs-yugabytedb-apac/' },
  openGraph: {
    title: 'TiDB vs YugabyteDB: MySQL-First Distributed SQL Database',
    description:
      'Compare TiDB and YugabyteDB for MySQL-first teams. TiDB offers MySQL 8.0 compatibility, native HTAP analytics, and distributed SQL at scale with lower migration friction.',
    url: 'https://www.pingcap.com/lp/tidb-vs-yugabytedb-apac/',
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
  path: '/lp/tidb-vs-yugabytedb-apac/',
  title: 'TiDB vs YugabyteDB: MySQL-First Distributed SQL Database',
  description:
    'Compare TiDB and YugabyteDB for MySQL-first teams. TiDB offers MySQL 8.0 compatibility, native HTAP analytics, and distributed SQL at scale with lower migration friction.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'TiDB vs YugabyteDB: <span class="text-gradient-violet">MySQL-First</span> Distributed SQL',
      path: '/lp/tidb-vs-yugabytedb-apac/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'TiDB vs YugabyteDB: MySQL-First Distributed SQL Database',
  meta: {
    title: 'TiDB vs YugabyteDB: MySQL-First Distributed SQL Database',
    description:
      'Compare TiDB and YugabyteDB for MySQL-first teams. TiDB offers MySQL 8.0 compatibility, native HTAP analytics, and distributed SQL at scale with lower migration friction.',
    canonical: '/lp/tidb-vs-yugabytedb-apac/',
    unlisted: true,
    header: 'lp',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'Database Comparison',
        headline:
          'TiDB vs YugabyteDB: <span class="text-gradient-violet">MySQL-First</span> Distributed SQL',
        subheadline:
          'YugabyteDB is Postgres-first; TiDB is MySQL-compatible with native HTAP. If you are modernizing MySQL and want analytics on live data, TiDB is the pragmatic fit.',
        primaryCta: {
          text: 'Book a 30-minute Architecture Call',
          href: '#book',
        },
        secondaryCta: {
          text: 'Read the Full Comparison Guide',
          href: 'https://www.pingcap.com/compare/yugabytedb-vs-tidb/',
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
        title: 'MySQL Compatibility vs Postgres Wire Protocol',
        items: [
          {
            variant: 'violet',
            title: 'MySQL-First? Choose TiDB',
            description:
              'MySQL 8.0 wire protocol compatibility minimizes application changes and tooling rework. Leverage existing MySQL expertise.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Database',
          },
          {
            variant: 'blue',
            title: 'Postgres-First? Consider YugabyteDB',
            description:
              "If your stack is PostgreSQL-native, YugabyteDB's Postgres compatibility may fit better. Requires PostgreSQL migration path.",
            cta: {
              text: '',
              href: '',
            },
            icon: 'Server',
          },
          {
            variant: 'teal',
            title: 'HTAP + Analytics? TiDB Wins',
            description:
              'Native columnar HTAP with TiFlash. Run transactional and analytical workloads in one system. No separate OLAP stack, no ETL.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Zap',
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
        title: 'Compatibility Comparison: TiDB vs YugabyteDB',
        subtitle: 'For MySQL teams, TiDB minimizes application changes and tooling rework',
        ourProduct: 'TiDB',
        competitor: 'YugabyteDB',
        rows: [
          {
            feature: 'Wire Protocol',
            ours: 'MySQL 8.0',
            theirs: 'PostgreSQL',
          },
          {
            feature: 'Migration Path',
            ours: 'Direct from MySQL',
            theirs: 'Requires PostgreSQL migration',
          },
          {
            feature: 'Team Knowledge',
            ours: 'Leverage existing MySQL expertise',
            theirs: 'Requires PostgreSQL training',
          },
          {
            feature: 'HTAP / Analytics',
            ours: 'Native columnar HTAP (TiFlash), no ETL',
            theirs: 'External / separate OLAP',
          },
          {
            feature: 'Kubernetes',
            ours: 'Mature operator, cloud-native',
            theirs: 'Operator available',
          },
          {
            feature: 'Distributed Transactions',
            ours: true,
            theirs: true,
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
      id: 'consolidation',
      type: 'featureGrid',
      props: {
        eyebrow: 'One Engine, Not a Bolt-On Stack',
        title: 'Consolidate Four Systems into One Distributed SQL Engine',
        subtitle:
          'Most teams stitch four or more systems together long before they hit true scale. TiDB consolidates them onto a single distributed SQL engine — lower cost, fewer failure modes, no ETL, and AI-ready.',
        items: [
          {
            icon: 'Database',
            title: 'Operational Database',
            description:
              'Replace MySQL, Amazon Aurora, and PostgreSQL with one MySQL-compatible distributed SQL engine',
            layout: 'vertical',
          },
          {
            icon: 'BarChart2',
            title: 'Analytics Warehouse',
            description:
              'Native columnar HTAP with TiFlash replaces Snowflake, BigQuery, and Redshift. No ETL required',
            layout: 'vertical',
          },
          {
            icon: 'Search',
            title: 'Search & Vector Store',
            description:
              'Built-in full-text and vector search eliminates Elasticsearch, OpenSearch, and standalone vector databases',
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
        spacing: 'section',
      },
    },
    {
      id: 'htap-architecture',
      type: 'featureMedia',
      props: {
        eyebrow: 'Native HTAP',
        title: 'OLTP + OLAP on the Same Data',
        items: [
          {
            title: 'No ETL, No Separate OLAP Stack',
            description:
              'TiFlash provides analytical (columnar) replicas so you run transactional and analytical workloads in one system. YugabyteDB requires external analytics tools. ',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/1d4c74b6-tidb-architecture-v6.png',
                alt: 'tidb architecture v6',
                width: 3000,
                height: 1600,
              },
              alt: 'tidb architecture v6',
              width: 3000,
              height: 1600,
            },
          },
          {
            title: 'Architecture & Kubernetes',
            description:
              'Stateless TiDB SQL layer + Placement Driver + TiKV storage + optional TiFlash. Mature Kubernetes operator for cloud-native operations. Distributed ACID transactions across the cluster.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/b5e970e8-kubernetes-database-operator-workflow.png',
                alt: 'kubernetes database operator workflow',
                width: 1024,
                height: 482,
              },
              alt: 'kubernetes database operator workflow',
              width: 1024,
              height: 482,
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
      id: 'case-studies',
      type: 'caseStudyCards',
      props: {
        eyebrow: 'Proven at Scale',
        title: 'AI-Native Platforms Build on TiDB',
        items: [
          {
            badge: 'AI Agent Platform',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/68b65a2a-20260826-203218.png',
                alt: '20260826 203218',
                width: 1511,
                height: 512,
              },
              alt: '20260826 203218',
              width: 1511,
              height: 512,
            },
            title: 'Kimi: <1s Database Provisioning Per Agent Task',
            description:
              'Runs a production agent-hosting platform on TiDB Cloud with elastic, strongly consistent scale.',
            stats: [
              {
                value: '<1s',
                label: 'DB provisioning per task',
              },
            ],
            href: 'https://www.pingcap.com/case-study/kimi-2-6-agent-hosting-platform-tidb-cloud/',
            cta: 'Read the story',
          },
          {
            badge: 'Agentic AI Platform',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/0fc78057-manus.svg',
                alt: 'manus',
                width: 165,
                height: 48,
              },
              alt: 'manus',
              width: 165,
              height: 48,
            },
            title: 'Manus: 2 Weeks to Migrate',
            description:
              'Viral agentic AI platform migrated to TiDB Cloud with no application rewrite.',
            stats: [
              {
                value: '2 weeks',
                label: 'Migration time',
              },
            ],
            href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
            cta: 'Read the story',
          },
          {
            badge: 'AI Note-Taking',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/a9c1110c-logo-plaud.png',
                alt: 'logo plaud',
                width: 362,
                height: 100,
              },
              alt: 'logo plaud',
              width: 362,
              height: 100,
            },
            title: 'Plaud: 10x QPS Under Peak Load',
            description:
              'Eliminated MySQL write-throughput and DDL bottlenecks for 2M+ users across 170 countries.',
            stats: [
              {
                value: '10x',
                label: 'QPS improvement',
              },
              {
                value: '2M+',
                label: 'Users',
              },
            ],
            href: 'https://www.pingcap.com/case-study/how-plaud-eliminated-s3-latency-limitless-scale/',
            cta: 'Read the story',
          },
          {
            badge: 'Infrastructure Sprawl',
            logo: {
              image: {
                url: 'https://static.pingcap.com/images/ee6420d5-dify-logo-white.svg',
                alt: 'dify logo white',
                width: 102,
                height: 45,
              },
              alt: 'dify logo white',
              width: 102,
              height: 45,
            },
            title: 'Dify: 80% Infrastructure Cost Reduction',
            description:
              'Consolidated ~500K isolated database containers into one unified TiDB deployment.',
            stats: [
              {
                value: '80%',
                label: 'Cost reduction',
              },
              {
                value: '500K',
                label: 'Containers consolidated',
              },
            ],
            href: 'https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/',
            cta: 'Read the Dify story',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'recognition',
      type: 'columns',
      props: {
        eyebrow: 'Industry Recognition',
        title: 'Recognized by Third Parties',
        titleFullWidth: true,
        layout: 'single',
        mediaType: 'shortcode',
        shortCode: '[review-badges]',
        itemColumns: 2,
      },
      style: {
        background: 'primary',
        spacing: 'section',
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
            a: 'TiDB provides MySQL 8.0 binary compatibility, so most applications connect unchanged. Confirm edge cases in a proof-of-concept to validate your specific workload and MySQL feature usage.',
          },
          {
            q: 'Is YugabyteDB PostgreSQL-compatible enough for my app?',
            a: 'It depends on your Postgres feature use. If your stack is MySQL, TiDB is the lower-friction path with direct MySQL 8.0 wire protocol compatibility.',
          },
          {
            q: 'How do distributed transactions work in TiDB vs YugabyteDB?',
            a: 'Both provide distributed ACID transactions. Verify isolation semantics for your workload in a proof-of-concept to ensure they meet your consistency and performance requirements.',
          },
          {
            q: 'What is the easiest way to run TiDB on Kubernetes?',
            a: 'The TiDB Kubernetes operator provides mature, cloud-native operations for running TiDB clusters on Kubernetes with automated scaling, backup, and recovery.',
          },
          {
            q: 'What should I test in a TiDB vs YugabyteDB POC?',
            a: 'Test compatibility with your app, distributed-transaction behavior under load, HTAP query performance, and Kubernetes operations. We recommend a 30-minute architecture call to scope your POC requirements.',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'cta',
      type: 'cta',
      props: {
        title: 'Compare on Your Own Schema',
        subtitle:
          'Compare TiDB and YugabyteDB on your own schema. Schedule an architecture call with our engineering team.',
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
          href: '#book',
        },
        secondaryCta: {
          text: 'Read the Full Comparison Guide',
          href: 'https://www.pingcap.com/compare/yugabytedb-vs-tidb/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'section',
      },
    },
    {
      id: 'form-1788204289705',
      type: 'form',
      props: {
        title: 'Book Your Architecture Call',
        subtitle:
          "Tell us about your workload and we'll set up a 30-minute call with our engineering team. We'll walk your data model, scaling needs, and migration path.",
        portalId: '4466002',
        formId: '69c1c0c2-c4d5-4977-ba73-106e608fe731',
        region: 'na1',
      },
      style: {
        background: 'primary',
        spacing: 'section',
        anchorId: 'book',
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
