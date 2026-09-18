import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'TiDB vs OceanBase: Cloud-Native Distributed SQL Database Comparison',
  description:
    'Compare TiDB and OceanBase for cloud-native HTAP, MySQL compatibility, and real-time analytics. See which distributed SQL database fits your modernization needs.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/lp/tidb-vs-oceanbase/' },
  openGraph: {
    title: 'TiDB vs OceanBase: Cloud-Native Distributed SQL Database Comparison',
    description:
      'Compare TiDB and OceanBase for cloud-native HTAP, MySQL compatibility, and real-time analytics. See which distributed SQL database fits your modernization needs.',
    url: 'https://www.pingcap.com/lp/tidb-vs-oceanbase/',
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
  path: '/lp/tidb-vs-oceanbase/',
  title: 'TiDB vs OceanBase: Cloud-Native Distributed SQL Database Comparison',
  description:
    'Compare TiDB and OceanBase for cloud-native HTAP, MySQL compatibility, and real-time analytics. See which distributed SQL database fits your modernization needs.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'Cloud-Native, Open <span class="text-gradient-violet">Distributed SQL</span>',
      path: '/lp/tidb-vs-oceanbase/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'TiDB vs OceanBase: Cloud-Native Distributed SQL Database Comparison',
  meta: {
    title: 'TiDB vs OceanBase: Cloud-Native Distributed SQL Database Comparison',
    description:
      'Compare TiDB and OceanBase for cloud-native HTAP, MySQL compatibility, and real-time analytics. See which distributed SQL database fits your modernization needs.',
    canonical: '/lp/tidb-vs-oceanbase/',
    unlisted: true,
    header: 'lp',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'TiDB vs OceanBase',
        headline: 'Cloud-Native, Open <span class="text-gradient-violet">Distributed SQL</span>',
        subheadline:
          'MySQL-compatible, real-time HTAP, and compute and storage that scale independently. The distributed SQL database for teams modernizing on the cloud.',
        primaryCta: {
          text: 'Book a 30-Minute Architecture Call',
          href: '#book',
        },
        secondaryCta: {
          text: 'Read Full Comparison',
          href: 'https://www.pingcap.com/compare/tidb-vs-oceanbase/',
        },
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'hero image',
          width: 500,
          height: 400,
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
        title: 'Choose the Right Fit for Your Workload',
        items: [
          {
            variant: 'violet',
            title: 'TiDB: Cloud-Native HTAP',
            description:
              'Built for cloud-native HTAP and real-time analytics, with low-friction MySQL migration. Unifies transactions and analytics in one system.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Zap',
          },
          {
            variant: 'blue',
            title: 'OceanBase: Financial-Grade OLTP',
            description:
              'Often chosen for financial-grade, high-concurrency OLTP and Oracle-replacement scenarios.',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Shield',
          },
        ],
        columns: 2,
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'comparison',
      type: 'comparisonTable',
      props: {
        eyebrow: 'Side-by-Side Comparison',
        title: 'TiDB vs OceanBase: Key Differences',
        subtitle:
          'See how TiDB and OceanBase compare across architecture, compatibility, and cloud-native capabilities.',
        ourProduct: 'TiDB',
        competitor: 'OceanBase',
        rows: [
          {
            feature: 'Best fit',
            ours: 'Cloud-native HTAP + MySQL modernization',
            theirs: 'Financial-grade OLTP, Oracle replacement',
          },
          {
            feature: 'Compatibility',
            ours: 'MySQL protocol & syntax',
            theirs: 'MySQL compatibility',
          },
          {
            feature: 'Architecture',
            ours: 'Separated compute (SQL) + storage (TiKV) + PD',
            theirs: 'Integrated, partition-based',
          },
          {
            feature: 'Real-time analytics',
            ours: 'Native columnar HTAP (TiFlash), no ETL',
            theirs: 'External / separate patterns',
          },
          {
            feature: 'Open source',
            ours: true,
            theirs: 'Vendor-led',
          },
          {
            feature: 'Cloud-native',
            ours: 'K8s operator, multi-cloud',
            theirs: 'Limited',
          },
        ],
        cta: {
          text: 'Book Architecture Call',
          href: '#book',
        },
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'architecture',
      type: 'featureMedia',
      props: {
        eyebrow: 'Architecture',
        title: 'Separation vs Integration',
        items: [
          {
            title: 'TiDB: Compute-Storage Separation',
            description:
              'TiDB separates compute (a stateless SQL layer) from storage (TiKV), coordinated by the Placement Driver, with optional TiFlash columnar replicas for analytics. Scale the exact bottleneck—CPU, storage, or analytics—independently.',
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
            title: 'OceanBase: Integrated Architecture',
            description:
              'OceanBase uses an integrated, partition-based architecture that couples compute and storage more tightly. Scaling requires coordinated partition rebalancing.',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/986a3b44-screenshot_2026-06-04_at_2.33.17_pm.png',
                alt: 'screenshot 2026 06 04 at 2.33.17 pm',
                width: 611,
                height: 364,
              },
              alt: 'screenshot 2026 06 04 at 2.33.17 pm',
              width: 611,
              height: 364,
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
      id: 'htap',
      type: 'featureCard',
      props: {
        eyebrow: 'Real-Time Analytics',
        title: "HTAP & Real-Time Analytics—TiDB's Strength",
        subtitle:
          'TiFlash keeps columnar replicas and the optimizer pushes query fragments to them. One query spans row and column stores on live operational data, with no ETL.',
        items: [
          {
            icon: 'BarChart2',
            title: 'Native Columnar Store',
            description:
              'TiFlash automatically replicates data in columnar format for fast analytics.',
          },
          {
            icon: 'Zap',
            title: 'No ETL Required',
            description:
              'Query live operational data in real time without moving or transforming it.',
          },
          {
            icon: 'Layers',
            title: 'Unified Query Engine',
            description:
              'One SQL query seamlessly spans row and column stores for optimal performance.',
          },
        ],
        columns: 3,
        borderStyle: 'color',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'cloud-native',
      type: 'featureGrid',
      props: {
        eyebrow: 'Cloud-Native & Open',
        title: 'Built for Modern Cloud Architectures',
        items: [
          {
            icon: 'Cloud',
            title: 'Kubernetes Operator',
            description:
              'Native Kubernetes operator and multi-cloud deployment flexibility for seamless orchestration.',
            layout: 'vertical',
          },
          {
            icon: 'Code2',
            title: 'Open Source',
            description:
              "Control your own roadmap, not a vendor's. Contribute, customize, and extend as needed.",
            layout: 'vertical',
          },
          {
            icon: 'Database',
            title: 'MySQL Protocol & Syntax',
            description:
              'Lower migration friction and tooling reuse with full MySQL compatibility.',
            layout: 'vertical',
          },
        ],
        columns: 3,
        itemLayout: 'vertical',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'consolidation',
      type: 'featureMedia',
      props: {
        eyebrow: 'Simplify Your Stack',
        // title-case-ignore
        title: 'One Engine, Not a Bolt-On Stack',
        subtitle:
          'Most teams stitch four or more systems together long before they hit true scale. TiDB consolidates them onto a single distributed SQL engine—lower cost, fewer failure modes, no ETL, and AI-ready.',
        items: [
          {
            title: 'Operational Database',
            description:
              'Replace MySQL, Amazon Aurora, or PostgreSQL with one MySQL-compatible distributed SQL engine.',
            image: {
              image: {
                url: '',
              },
            },
          },
          {
            title: 'Analytics Warehouse',
            description:
              'Eliminate Snowflake, BigQuery, or Redshift with native columnar HTAP via TiFlash—no ETL pipelines.',
            image: {
              image: {
                url: '',
              },
            },
          },
          {
            title: 'Search & Vector Store',
            description:
              'Built-in full-text and vector search replaces Elasticsearch, OpenSearch, and standalone vector databases.',
            image: {
              image: {
                url: '',
              },
            },
          },
          {
            title: 'Sharding & Caching',
            description:
              'Transparent auto-sharding with strong consistency—no app-side sharding middleware or external caches.',
            image: {
              image: {
                url: '',
              },
            },
          },
        ],
        startPosition: 'right',
        spacing: 'md',
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
            // title-case-ignore
            title: 'Kimi: <1s Database Provisioning per Agent Task',
            description:
              'Runs a production agent-hosting platform on TiDB Cloud with elastic, strongly consistent scale.',
            stats: [
              {
                value: '<1s',
                label: 'DB provisioning per task',
              },
            ],
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
            // title-case-ignore
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
          },
          {
            badge: 'AI Workflow Platform',
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
          },
        ],
      },
      style: {
        background: 'primary',
        spacing: 'section',
      },
    },
    {
      id: 'columns-1789634792505',
      type: 'columns',
      props: {
        eyebrow: 'Industry Recognition',
        title: 'Recognized by Third Parties',
        titleFullWidth: true,
        layout: 'single',
        mediaType: 'shortcode',
        shortCode: '[review-badges]',
        items: [
          {
            type: 'media',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/dcdca859-e54e2db0-20260506-160445.webp',
                alt: 'e54e2db0 20260506 160445',
                width: 384,
                height: 235,
              },
              alt: 'e54e2db0 20260506 160445',
              width: 384,
              height: 235,
            },
          },
          {
            type: 'media',
            image: {
              image: {
                url: 'https://static.pingcap.com/images/63eb0af3-053856a3-20260506-160923.webp',
                alt: '053856a3 20260506 160923',
                width: 384,
                height: 237,
              },
              alt: '053856a3 20260506 160923',
              width: 384,
              height: 237,
            },
          },
        ],
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
            q: 'Is TiDB or OceanBase better for HTAP workloads?',
            a: 'TiDB. TiFlash delivers real-time analytics on live data in one system, with no ETL required. OceanBase typically requires external or separate patterns for analytics.',
          },
          {
            q: 'Is OceanBase better for Oracle replacement?',
            a: 'OceanBase is frequently chosen for Oracle-replacement and financial-grade OLTP scenarios. TiDB is MySQL-first—the stronger fit for teams modernizing MySQL, not Oracle.',
          },
          {
            q: 'Which is easier to operate in Kubernetes?',
            a: 'TiDB is cloud-native with a mature Kubernetes operator and multi-cloud flexibility, making it easier to deploy and manage in container orchestration environments.',
          },
          {
            q: 'Are TiDB and OceanBase both MySQL compatible?',
            a: 'Both offer MySQL compatibility. TiDB emphasizes MySQL-first modernization with lower application-migration friction, full MySQL protocol support, and syntax compatibility.',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'book',
      type: 'hero',
      props: {
        layout: 'split',
        eyebrow: 'Compare on Your Own Schema',
        headline: 'Book Your Architecture Call',
        subheadline:
          "Tell us about your workload and we'll set up a 30-minute call with our engineering team. We'll walk through your MySQL data model, scaling needs, and migration path.",
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
