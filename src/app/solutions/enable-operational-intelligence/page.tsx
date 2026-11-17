import { Header, Footer, JsonLd } from '@/components'
import { SolutionTemplate, faqForSchema } from '../_components/SolutionTemplate'
import type { SolutionPageData } from '../_components/types'
import { solutionMetadata, solutionSchema } from '../_components/meta'

// ─── Page content (all copy lives here) ──────────────────────────────────────

const PATH = '/solutions/enable-operational-intelligence/'
const TITLE = 'TiDB: The Cloud-Native Operations Data Store'
const DESCRIPTION =
  'Empower real-time analytics and operational intelligence with TiDB’s unified, scalable data store for hybrid and multi-cloud environments.'

const VECTOR_SEARCH_URL = 'https://www.pingcap.com/ai/vector-search/'
// NOTE: CTA target may move to /solutions/ai-agent-context/ (decision pending).
const AGENT_CONTEXT_CTA_HREF = 'https://www.pingcap.com/ai/agentic-ai/'

const PAGE: SolutionPageData = {
  hero: {
    // H1 is frozen; its em dash is kept as on the live page (listed in the PR).
    headline: 'TiDB — The Cloud-Native Operations Data Store for Real-Time Intelligence',
    subheadline:
      'Power every workflow with fast, reliable access to operational data. TiDB gives you real-time visibility, elastic performance, and resilience across any environment.',
    primaryCta: { text: 'Book a Demo', href: '#demo' },
    secondaryCta: {
      text: 'Read the Catalyst Story',
      href: 'https://www.pingcap.com/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
    },
    backgroundImage: 'https://static.pingcap.com/files/2024/11/10225735/banner.svg',
  },

  logos: {
    title: 'The Trusted Data Serving Layer for 1000s of Customers Globally',
    logos: [
      {
        name: 'Catalyst',
        src: 'https://static.pingcap.com/files/2024/11/10225931/Catalyst.svg',
        href: 'https://www.pingcap.com/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
      },
      { name: 'conga', src: 'https://static.pingcap.com/files/2024/11/27201923/conga.svg' },
      {
        name: 'PingAn',
        src: 'https://static.pingcap.com/files/2024/11/10230107/PingAn.svg',
        href: 'https://www.pingcap.com/case-study/ping-an-technology-journey-from-oracle-to-ubisql-with-tidb/',
      },
      {
        name: 'ZTO Express',
        src: 'https://static.pingcap.com/files/2024/11/27201111/ZTO-Express-1.svg',
        href: 'https://www.pingcap.com/case-study/real-time-insights-reduce-per-order-costs-by-25-percent/',
      },
      // Moved here from the use-case cards.
      {
        name: 'DELHIVERY',
        src: 'https://static.pingcap.com/files/2025/05/06194518/DELHIVERY%402x.png',
      },
      { name: 'elestyle', src: 'https://static.pingcap.com/files/2024/10/17002515/elestyle.png' },
    ],
  },

  problem: {
    title: 'Why Modern Businesses Need an Operations Data Store',
    paragraphs: [
      'Legacy systems can hold companies back from realizing the full potential of their data. Monolithic codebases, complex app dependencies, and outdated development processes constantly hinder business innovation.',
    ],
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/10230337/Delayer-Analytics.svg',
          alt: 'Delayer Analytics',
        },
        title: 'Data Fragments Slow Decision-Making',
        body: 'Running complex queries across these silos is often slow and resource-intensive',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/10230421/Data-Inconsistency.svg',
          alt: 'Data Inconsistency',
        },
        title: 'Data Inconsistency Hurts Real-time Insights',
        body: 'Running manual integration processes to maintain data consistency is a battle',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/10230449/intergration.svg',
          alt: 'intergration',
        },
        title: 'Limited Integration & Scalability',
        body: 'Legacy systems struggle to integrate with new data sources as your business grows',
      },
    ],
  },

  // Merges "Real-Time Analytics at Enterprise Scale" (3 cards) with one "Meet TiDB" card.
  solution: {
    title: 'Real-Time Analytics at Enterprise Scale',
    paragraphs: [
      'Run operational dashboards, anomaly detection models, and live analytical workloads on the same consistent data source powering your mission-critical transactions.',
    ],
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/03050021/analytics.svg',
          alt: 'analytics',
        },
        title: 'Drive Instant Insights with a Scalable Database',
        body: 'Process large volumes of real-time events with low-latency reads and high throughput.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/09034624/across-systems.svg',
          alt: 'across-systems',
        },
        title: 'Enable Operational Intelligence Across Systems',
        body: 'Feed unified, consistent data into monitoring pipelines, automation workflows, decision engines, and AI agents that need to read and act on live state.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/09034647/Unified-data-access.svg',
          alt: 'Unified-data-access',
        },
        title: 'Achieve Agility Through Unified Data Access',
        body: 'Eliminate ETL bottlenecks and enable faster product iteration with a single source of operational truth.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/10230603/effortless-scaling.svg',
          alt: 'effortless scaling',
        },
        title: 'Effortless Scaling',
        body: 'Support the dynamic growth of customer data with a distributed scale-out architecture that can scale both reads and writes seamlessly.',
      },
    ],
  },

  workloads: {
    title: 'Common Use Cases for TiDB as an Operations Data Store',
    paragraphs: [
      'TiDB powers mission-critical operations for enterprises across finance, logistics, SaaS, telecom, and retail.',
    ],
    cards: [
      {
        icon: { lucide: 'Gauge' },
        title: 'Real-Time Analytics for E-commerce & SaaS',
        body: 'Power inventory visibility, personalization engines, usage tracking, and operational dashboards.',
        links: [
          {
            text: 'Explore This Use Case',
            href: '/blog/delhiverys-data-marts-migration-journey-from-oltp-to-htap/',
          },
        ],
      },
      {
        icon: { lucide: 'Layers' },
        title: 'Transactional and Analytical Processing for Fintech',
        body: 'Support real-time fraud detection, risk scoring, compliance processing, and ledger operations.',
        links: [
          {
            text: 'Explore This Use Case',
            href: '/case-study/elestyle-tidb-cloud-for-scalability-and-real-time-reporting/',
          },
        ],
      },
      {
        icon: { lucide: 'Network' },
        title: 'Operational Data Unification for Cloud-Native Enterprises',
        body: 'Bring transactional, event, and operational metrics together into one scalable platform.',
        links: [
          {
            text: 'Explore This Use Case',
            href: '/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
          },
        ],
      },
      {
        // PLACEHOLDER icon: needs a logo or icon from design (listed in the PR).
        icon: { lucide: 'Bot' },
        title: 'Operational Context and State for AI Agents',
        body: `Give AI agents and LLM apps business context and a durable record of their work. Query operational records with SQL, retrieve context with [vector search](${VECTOR_SEARCH_URL}), and save results and checkpoints with ACID transactions.`,
        links: [{ text: 'Explore Agent Context and State', href: AGENT_CONTEXT_CTA_HREF }],
      },
    ],
  },

  // The comparison grid had no heading of its own on the live page.
  comparison: {
    matrix: {
      columns: [
        'Larger Data Volumes',
        'High Concurrency',
        'No System Downtime',
        'Increased Development Velocity',
      ],
      rows: [
        { label: 'Relational Database', checks: [false, false, false, true] },
        { label: 'Database Sharding', checks: [true, true, false, false] },
        { label: 'NoSQL Database', checks: [true, true, true, false] },
        { label: 'Data Warehouse / Data Lake', checks: [true, false, true, false] },
        {
          label: 'TiDB',
          image: {
            src: 'https://static.pingcap.com/files/2024/11/04011451/logo-TiDB.svg',
            alt: 'TiDB',
            width: 80,
            height: 32,
          },
          checks: [true, true, true, true],
        },
      ],
      mobileHint: 'Swipe right to see more →',
    },
  },

  proof: {
    title: 'Proven Enterprise Data Platform',
    paragraphs: [
      'TiDB powers mission-critical operations for enterprises across finance, logistics, SaaS, telecom, and retail.',
    ],
    // Titles and descriptions are each case study's own published H1 and summary.
    cases: [
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/11/10225931/Catalyst.svg',
          alt: 'Catalyst',
        },
        title: 'Catalyst Rearchitects Core SaaS Platform with TiDB for Up To 60x Performance Boost',
        description:
          'Discover how Catalyst rebuilt its core SaaS platform with TiDB for faster performance, horizontal scalability, and mixed workload processing.',
        // Source H1: "... for Up To 60x Performance Boost"
        stat: { value: 'Up To 60x', label: 'Performance Boost' },
        href: 'https://www.pingcap.com/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
      },
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/11/27201111/ZTO-Express-1.svg',
          alt: 'ZTO Express',
        },
        title: 'Real-time Insights Reduce per Order Costs by 25%',
        description:
          'Learn how ZTO Express achieved a 25% cost reduction with real-time insights using TiDB. Discover their success story.',
        // Source title: "Real-time Insights Reduce per Order Costs by 25%"
        stat: { value: '25%', label: 'Reduce per Order Costs' },
        href: 'https://www.pingcap.com/case-study/real-time-insights-reduce-per-order-costs-by-25-percent/',
      },
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/11/10230107/PingAn.svg',
          alt: 'PingAn',
        },
        title:
          'Ping An Technology Boosts Performance and Cuts Costs by Migrating from Oracle to TiDB',
        description:
          'TiDB enables Ping An Technology to manage large data volumes, boost transaction performance, and ensure system stability.',
        // No headline figure published by this case study; stat left out.
        href: 'https://www.pingcap.com/case-study/ping-an-technology-journey-from-oracle-to-ubisql-with-tidb/',
      },
    ],
    quote: {
      quote:
        '“TiDB has helped us meet our business goals in terms of data availability to our customers. We now get very fast query times from TiDB, which allows us to provide correct data to our customers with very low latency.”',
      name: 'Andy Trimble,',
      role: 'Principal Software Engineer',
      logo: {
        src: 'https://static.pingcap.com/files/2024/11/06192722/catayst.svg',
        alt: 'Catalyst',
        width: 140,
        height: 40,
      },
      href: '/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
      // The 4.9 score is shown with its Gartner Peer Insights source, as on the live page.
      rating: {
        title: 'Customers Give TiDB 4.9 Stars',
        badge: {
          src: 'https://static.pingcap.com/files/2025/08/17212019/cc_award_logo_general_2025.svg',
          alt: 'Gartner Peer Insights',
          width: 96,
          height: 96,
        },
        stars: {
          src: 'https://static.pingcap.com/files/2024/11/06192433/stars.svg',
          alt: 'stars',
          width: 180,
          height: 32,
        },
      },
    },
  },

  // FAQ answers reuse sentences cut when sections were merged. All entries need content review.
  faq: {
    items: [
      {
        q: 'What is an operational data store, and how does TiDB fit in?',
        a: 'An operational data store centrally integrates and organizes siloed enterprise data, making it instantly available to consuming applications. TiDB serves as the ideal distributed database to power this architecture. It consolidates data from various source systems, integrates it on the fly, and delivers up-to-the-minute insights for enhanced business performance.',
      },
      {
        q: 'How does TiDB keep operational data available?',
        a: 'Ensure uninterrupted access to customer data with high availability, disaster recovery, point-in-time recovery (PiTR), backup and restore, and multi-availability zone (AZ) failover.',
      },
      {
        q: 'Can teams build new apps faster on TiDB?',
        a: 'Development teams can build new apps 3-5x faster with online schema changes and flexible indices while reducing complexity.',
      },
      {
        q: 'Will TiDB work with my existing stack and cloud environments?',
        a: 'MySQL wire protocol compatibility plus connectors to Apache Spark, Apache Kafka, Kubernetes and more. Deploy database clusters anywhere in the world, in public, private, and hybrid cloud environments on VMs, containers, or bare metal. Works with existing CDC pipelines, data lakes, analytics engines, observability tools, and internal services.',
      },
      {
        q: 'Is TiDB suitable for regulated industries?',
        a: 'Encrypt data both in-flight and at-rest. Data encryption, access controls, auditing, and compliance for regulated environments. From fast-scaling SaaS platforms to global financial institutions, TiDB enables operational workloads with reliability and velocity.',
      },
      {
        q: 'What do development teams say about building on TiDB?',
        a: '“TiDB greatly improves the efficiency of our application development. It performs well in steady-state business scenarios. TiDB’s also an ideal choice in agile business scenarios.” Developer Team, Jin Guanjia (Ping An)',
      },
    ],
  },

  resources: {
    title: 'Resources to Fuel Your TiDB Journey',
    items: [
      {
        type: 'Solution Brief',
        title: 'Enable Operational Intelligence with TiDB',
        href: 'https://static.pingcap.com/files/2024/11/14044554/Solution-Brief-Enable-Operational-Intelligence-with-TiDB.pdf',
        cta: 'Get Solution Brief',
      },
      {
        type: 'Case Study',
        title: 'Why Streak Chose TiDB to Make Its CRM Real-Time',
        href: '/case-study/streak-find-out-why-streak-built-its-realtime-crm-using-tidb/',
        cta: 'Read More',
      },
      {
        type: 'Blog',
        title: 'Inside Delhivery’s Data Marts Migration Journey to TiDB',
        href: '/blog/delhiverys-data-marts-migration-journey-from-oltp-to-htap/',
        cta: 'Read',
      },
      {
        type: 'Case Study',
        title: 'Migrating to TiDB Cloud for Scalability and Enhanced Analytics with Zero-downtime',
        href: '/case-study/elestyle-tidb-cloud-for-scalability-and-real-time-reporting/',
        cta: 'Read More',
      },
    ],
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(
  PATH,
  TITLE,
  DESCRIPTION,
  'Enable Operational Intelligence',
  faqForSchema(PAGE.faq)
)

export default function OperationalIntelligencePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionTemplate data={PAGE} />
      </main>
      <Footer />
    </>
  )
}
