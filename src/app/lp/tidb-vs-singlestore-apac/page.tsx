import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'TiDB vs SingleStore: Open-Source Distributed SQL Comparison',
  description:
    'Compare TiDB and SingleStore for distributed SQL. TiDB offers true MySQL compatibility, open-source freedom, and elastic scaling without vendor lock-in.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/lp/tidb-vs-singlestore-apac/' },
  openGraph: {
    title: 'TiDB vs SingleStore: Open-Source Distributed SQL Comparison',
    description:
      'Compare TiDB and SingleStore for distributed SQL. TiDB offers true MySQL compatibility, open-source freedom, and elastic scaling without vendor lock-in.',
    url: 'https://www.pingcap.com/lp/tidb-vs-singlestore-apac/',
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
  path: '/lp/tidb-vs-singlestore-apac/',
  title: 'TiDB vs SingleStore: Open-Source Distributed SQL Comparison',
  description:
    'Compare TiDB and SingleStore for distributed SQL. TiDB offers true MySQL compatibility, open-source freedom, and elastic scaling without vendor lock-in.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'TiDB vs. <span class="text-gradient-violet">SingleStore</span>',
      path: '/lp/tidb-vs-singlestore-apac/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'TiDB vs SingleStore: Open-Source Distributed SQL Comparison',
  meta: {
    title: 'TiDB vs SingleStore: Open-Source Distributed SQL Comparison',
    description:
      'Compare TiDB and SingleStore for distributed SQL. TiDB offers true MySQL compatibility, open-source freedom, and elastic scaling without vendor lock-in.',
    canonical: '/lp/tidb-vs-singlestore-apac/',
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
        headline: 'TiDB vs. <span class="text-gradient-violet">SingleStore</span>',
        subheadline:
          'Open-source distributed SQL with true MySQL compatibility, elastic scaling, and strong consistency. No vendor lock-in.',
        primaryCta: {
          text: 'Book a 30-minute Architecture Call',
          href: '#book',
        },
        secondaryCta: {
          text: 'Read the Full Comparison Guide',
          href: 'https://www.pingcap.com/blog/singlestore-vs-tidb-distributed-sql-database-comparison-guide/',
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
        title: 'Open Source vs. Proprietary Lock-In',
        subtitle:
          'Proprietary databases like SingleStore promise simplicity but deliver complexity, from opaque licensing to manual tuning. TiDB is open-source distributed SQL: MySQL-compatible, strongly consistent, and elastically scalable.',
        items: [
          {
            variant: 'violet',
            title: 'Apache 2.0 Licensed',
            description:
              'Complete control, no vendor lock-in, no surprise license audits or forced upgrades',
            cta: {
              text: 'Learn More',
              href: '#open-source',
            },
            icon: 'Shield',
          },
          {
            variant: 'blue',
            title: 'True MySQL Compatibility',
            description:
              'Wire-protocol compatible, so your existing tools, apps, and workflows work immediately',
            cta: {
              text: 'Learn More',
              href: '#mysql-compatibility',
            },
            icon: 'Database',
          },
          {
            variant: 'teal',
            title: 'Transparent Auto-Sharding',
            description:
              'Automatic data distribution with no complex partitioning or manual resharding required',
            cta: {
              text: 'Learn More',
              href: '#acid-scale',
            },
            icon: 'Layers',
          },
        ],
        columns: 3,
        iconSize: 48,
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'comparison-table',
      type: 'comparisonTable',
      props: {
        eyebrow: 'Feature Comparison',
        title: 'TiDB vs SingleStore at a Glance',
        subtitle:
          'See how TiDB delivers open-source freedom, MySQL compatibility, and distributed ACID without compromise',
        ourProduct: 'TiDB',
        competitor: 'SingleStore',
        rows: [
          {
            feature: 'Open source',
            ours: 'Apache 2.0',
            theirs: 'Proprietary',
          },
          {
            feature: 'MySQL compatibility',
            ours: 'True wire-protocol',
            theirs: 'Partial',
          },
          {
            feature: 'Distributed ACID',
            ours: true,
            theirs: 'Requires tuning',
          },
          {
            feature: 'Transparent auto-sharding',
            ours: true,
            theirs: 'Manual',
          },
          {
            feature: 'Native HTAP',
            ours: 'Yes (TiFlash)',
            theirs: true,
          },
          {
            feature: 'Vendor lock-in',
            ours: 'None',
            theirs: 'Licensing dependency',
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
      id: 'featureGrid-1788214084527',
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
              'Replace MySQL, Amazon Aurora, PostgreSQL with one MySQL-compatible distributed SQL engine',
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
        background: 'primary',
        spacing: 'section',
      },
    },
    {
      id: 'open-source',
      type: 'featureMedia',
      props: {
        eyebrow: 'Open-Source Freedom',
        title: 'No Black Box, No Lock-In',
        items: [
          {
            title: 'True Open-Source Freedom',
            description:
              "TiDB is 100% open source under an Apache 2.0 license. SingleStore's proprietary licensing creates dependency and limits deployment flexibility. You control your own roadmap with TiDB, deploy anywhere, and avoid licensing fees while still getting enterprise support when you need it.",
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
        ],
        startPosition: 'left',
        spacing: 'lg',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'mysql-compatibility',
      type: 'featureMedia',
      props: {
        eyebrow: 'MySQL Compatibility',
        title: 'Migration Without Rewriting',
        items: [
          {
            title: 'MySQL Compatibility Without Compromise',
            description:
              "True MySQL wire-protocol compatibility makes migration seamless. Your existing tools, applications, and workflows work immediately, no rewriting required. Unlike SingleStore's partial compatibility, TiDB supports MySQL drivers, ORMs, and SQL syntax out of the box, so you keep your investments in tooling and expertise.",
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
        startPosition: 'right',
        spacing: 'lg',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'acid-scale',
      type: 'featureCard',
      props: {
        eyebrow: 'Distributed Architecture',
        title: 'Strong ACID at Scale + Transparent Auto-Sharding',
        subtitle:
          'Automatic scaling and data distribution with no manual tuning or complex partitioning',
        items: [
          {
            icon: 'Lock',
            title: 'Distributed ACID Transactions',
            description:
              "Snapshot isolation across the whole cluster. No tuning required, unlike SingleStore's manual optimization",
            borderColor: 'violet',
          },
          {
            icon: 'Network',
            title: 'Automatic Data Distribution',
            description:
              'Transparent auto-sharding eliminates complex partitioning and resharding operations',
            borderColor: 'blue',
          },
          {
            icon: 'Layers',
            title: 'Separated Compute and Storage',
            description:
              'Scale compute and storage independently without downtime or manual intervention',
            borderColor: 'teal',
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
            q: 'Is TiDB really open source?',
            a: 'Yes. TiDB is Apache 2.0 licensed. You control your own roadmap with no black box and no forced upgrades. Unlike proprietary databases, there are no surprise license audits or vendor lock-in.',
          },
          {
            q: 'How compatible is TiDB with MySQL?',
            a: 'TiDB offers true MySQL wire-protocol compatibility, so drivers, ORMs, and SQL keep working through migration. SingleStore only offers partial MySQL compatibility, requiring rewrites and custom tooling.',
          },
          {
            q: 'Does TiDB match SingleStore on analytics?',
            a: 'Yes. TiFlash provides native columnar HTAP so OLTP and OLAP run on the same data with no ETL. You get real-time analytics without maintaining separate data pipelines.',
          },
          {
            q: 'What does switching cost?',
            a: "Migration is low-friction thanks to MySQL compatibility. You avoid SingleStore's licensing fees with an open-source model plus enterprise support when you need it. Our team will walk you through your specific migration path.",
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'demo-cta',
      type: 'cta',
      props: {
        title: 'Compare on Your Own Schema',
        subtitle:
          'See how TiDB compares to SingleStore for your workload. Schedule an architecture call with our engineering team.',
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
          href: 'https://www.pingcap.com/blog/singlestore-vs-tidb-distributed-sql-database-comparison-guide/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'section',
      },
    },
    {
      id: 'book',
      type: 'form',
      props: {
        title: 'Book Your Architecture Call',
        subtitle:
          "Tell us about your workload and we'll set up a 30-minute call with our engineering team. We'll walk through your MySQL data model, scaling needs, and migration path.",
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
