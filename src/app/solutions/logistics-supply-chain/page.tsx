import { Header, Footer, JsonLd } from '@/components'
import { SolutionTemplate, faqForSchema } from '../_components/SolutionTemplate'
import type { SolutionPageData } from '../_components/types'
import { solutionMetadata, solutionSchema } from '../_components/meta'

// ─── Page content (all copy lives here) ──────────────────────────────────────
// Previously a DSL page (page.dsl.json). Rebuilt by hand on the shared template so all
// six solution pages can be converted to /admin together (see PR handoff note).

const PATH = '/solutions/logistics-supply-chain/'
const TITLE = 'Real-Time Logistics Data Platform | TiDB'
const DESCRIPTION =
  'TiDB powers real-time supply chain visibility by unifying operational and analytical data in a single distributed SQL platform for global logistics operations.'

const VECTOR_SEARCH_URL = 'https://www.pingcap.com/ai/vector-search/'

const PAGE: SolutionPageData = {
  hero: {
    headline:
      'Real-Time Logistics Data Platform for Global <br><span class="text-gradient-violet">Supply Chain Visibility</span>',
    subheadline:
      'TiDB powers real-time logistics and supply chain visibility by unifying operational and analytical data in a single, distributed SQL platform. Track orders, inventory, and shipments without ETL delays, sharding complexity, or downtime.',
    primaryCta: { text: 'Book a Demo', href: '#demo' },
    secondaryCta: {
      text: 'Read the Delhivery Story',
      href: 'https://www.pingcap.com/case-study/delhivery-scalable-real-time-data-processing-tidb/',
    },
    backgroundImage: 'https://static.pingcap.com/images/47053e7c-module___headline_6.png',
  },

  logos: {
    // Heading reused from the e-commerce and operational intelligence logo bars.
    title: 'The Trusted Data Serving Layer for 1000s of Customers Globally',
    logos: [
      { name: 'Delhivery', src: 'https://static.pingcap.com/files/2024/10/03045359/Delhivery.svg' },
      { name: 'anteraja', src: 'https://static.pingcap.com/files/2024/10/03045503/anteraja.svg' },
      {
        name: 'ninjavan-logo',
        src: 'https://static.pingcap.com/files/2024/10/03045538/ninjavan-logo.png',
      },
      { name: 'ZTO', src: 'https://static.pingcap.com/files/2024/10/03045601/ZTO.svg' },
      { name: 'Rakuten', src: 'https://static.pingcap.com/files/2024/10/24192541/Rakuten.svg' },
      {
        name: 'Flipkart',
        src: 'https://static.pingcap.com/files/2024/10/17071419/Flipkart-1-1.png',
      },
    ],
  },

  problem: {
    eyebrow: 'The High-Velocity Logistics Challenge',
    title: 'Why Legacy Databases Break Real-Time Supply Chain Visibility',
    paragraphs: [
      'Logistics platforms generate high-velocity operational data from orders and inventory updates to shipment scans and telematics events',
      'Legacy databases can’t support real-time supply chain workloads at scale, leading teams to stitch together sharded databases and analytics systems that increase latency, complexity, and risk.',
    ],
    cards: [
      {
        icon: { lucide: 'Clock' },
        title: 'Batch ETL Kills Real Time Visibility',
        body: 'Batch ETL breaks real-time logistics visibility, leading to stale data and missed SLAs.',
      },
      {
        icon: { lucide: 'GitBranch' },
        title: 'Sharding Fragments Logistics Data',
        body: 'Manual sharding and separate analytics systems fragment logistics data, eliminating a single source of truth across orders, inventory, and shipments.',
      },
      {
        icon: { lucide: 'Activity' },
        title: 'Concurrency Limits Break at Peak',
        body: 'Legacy databases can’t handle peak logistics concurrency, resulting in lock contention, timeouts, and unpredictable performance at scale.',
      },
    ],
  },

  solution: {
    title: 'Why Choose TiDB for Logistics Data',
    cards: [
      {
        icon: { lucide: 'Zap' },
        title: 'Real-Time Insight',
        body: 'Query live operational data and historical events in milliseconds',
        // "Lear more" is the live label (typo kept; listed in the PR).
        link: {
          text: 'Lear more',
          href: 'https://www.pingcap.com/article/transforming-logistics-with-tidbs-real-time-analytics/',
        },
      },
      {
        icon: { lucide: 'Layers' },
        title: 'Elastic Scale',
        body: 'Handle unpredictable spikes from orders, tracking, and optimization workloads',
        link: {
          text: 'Learn more',
          href: 'https://docs.pingcap.com/tidbcloud/scalability-concepts/',
        },
      },
      {
        icon: { lucide: 'Shield' },
        title: 'Always-On Availability',
        body: 'Built-in high availability across regions for 24/7 logistics operations',
        link: {
          text: 'Learn more',
          href: 'https://docs.pingcap.com/tidb/stable/high-availability-faq/',
        },
      },
    ],
  },

  workloads: {
    eyebrow: 'Use Cases',
    title: 'From Inventory Management to Last-Mile Visibility',
    paragraphs: ['TiDB supports a range of real-time logistics and supply chain use cases.'],
    cards: [
      {
        icon: { lucide: 'Database' },
        title: 'Use Case: Real-Time Inventory Across Warehouses & Stores',
        body: 'TiDB unifies inventory data across warehouses, stores, and fulfillment centers in real time. Combine stock levels, inbound and outbound shipments, and reservations in one system. Power accurate available-to-promise decisions in seconds, not hours',
      },
      {
        icon: { lucide: 'Zap' },
        title: 'Use Case: Multi-Leg Shipment Tracking',
        body: 'TiDB enables real-time last-mile visibility by ingesting high-velocity delivery data. Stream telematics, driver app events, and delivery scans into a single store. Feed route optimization and ETA prediction engines with fresh, consistent data.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/images/94f9cf3e-rapid_productivity_illustration.svg',
          alt: 'rapid productivity illustration',
        },
        title: 'Ingest Once: Streaming & Batch Pipelines',
        body: 'Connect TMS/WMS/OMS systems, IoT gateways, and Kafka streams. TiDB handles real-time large-scale data ingestion without intermediate ETL layers.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/images/24dffffb-rapid_productivity_illustration_2.svg',
          alt: 'rapid productivity illustration 2',
        },
        title: 'Built-In Monitoring & Alerting',
        body: 'Use standard SQL to detect anomalies directly on live data. Power real-time dashboards with Prometheus and Grafana integration. Run demand forecasts and anomaly detection models against the same fresh operational data, with built-in vector search when you need it, and no exports.',
        links: [{ text: 'Explore AI and vector search on TiDB', href: VECTOR_SEARCH_URL }],
      },
    ],
  },

  howItWorks: {
    title: 'TiDB: Unified Platform for Supply Chain Visibility',
    paragraphs: [
      'TiDB replaces fragmented logistics data stacks with a single, distributed SQL platform that supports both high-volume transactions and real-time analytics. By unifying operational and analytical workloads in one system, TiDB enables global supply chain visibility without batch ETL, manual sharding, or point solutions.',
    ],
    tabs: [
      {
        id: 'htap',
        label: 'HTAP Engine for Real-Time Visibility',
        bullets: [
          'Single distributed SQL cluster for OLTP + analytics',
          'Region-aware deployment for cross-border logistics networks',
        ],
        image: {
          src: 'https://static.pingcap.com/images/fd14d65a-graphic-1.svg',
          alt: 'tab image',
          width: 1200,
          height: 800,
        },
      },
      {
        id: 'inventory',
        label: 'Real-Time Inventory Management and Order Tracking',
        bullets: [
          'Consolidate WMS, OMS, and TMS events into one real-time store',
          'Query stock, orders, and carrier events in a single SQL query',
        ],
        image: {
          src: 'https://static.pingcap.com/images/b4340e16-graphic_3.svg',
          alt: 'graphic 3',
          width: 910,
          height: 480,
        },
      },
      {
        id: 'availability',
        label: 'Always-On Architecture for Logistics Operations',
        bullets: [
          'Multi-AZ and multi-region deployment options',
          'Transparent failover with no downtime for live shipments',
        ],
        image: {
          src: 'https://static.pingcap.com/images/0fd3d5aa-graphic_4.svg',
          alt: 'graphic 4',
          width: 910,
          height: 480,
        },
      },
    ],
  },

  proof: {
    eyebrow: 'Testimonials',
    title: 'Supply Chain Visibility Solutions: Customers & Social Proof',
    // Titles and descriptions are each case study's own published H1 and summary.
    // Anteraja and ZTO were not linked from this page before (see PR).
    cases: [
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/10/03045359/Delhivery.svg',
          alt: 'Delhivery',
        },
        title: 'Delhivery’s Journey to Scalable, Real-Time Data Processing with TiDB',
        description:
          'Learn how Delhivery migrated from Amazon Aurora to TiDB for real-time data mart capabilities, cutting costs and boosting performance.',
        // Source: "achieving SLA compliance with a 15-20% performance gain for P95 queries."
        stat: { value: '15-20%', label: 'performance gain for P95 queries' },
        href: 'https://www.pingcap.com/case-study/delhivery-scalable-real-time-data-processing-tidb/',
      },
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/10/03045503/anteraja.svg',
          alt: 'anteraja',
        },
        title: 'How Anteraja Ensures 50% Faster Response Times with Distributed SQL',
        description:
          'Learn how Anteraja optimized courier management with TiDB, achieving 50% faster performance, 70% cost savings, and greater reliability.',
        // Source title: "How Anteraja Ensures 50% Faster Response Times with Distributed SQL"
        stat: { value: '50%', label: 'Faster Response Times' },
        href: 'https://www.pingcap.com/case-study/anteraja-scalable-high-performance-courier-management/',
      },
      {
        logo: { src: 'https://static.pingcap.com/files/2024/10/03045601/ZTO.svg', alt: 'ZTO' },
        title: 'Real-time Insights Reduce per Order Costs by 25%',
        description:
          'Learn how ZTO Express achieved a 25% cost reduction with real-time insights using TiDB. Discover their success story.',
        // Source title: "Real-time Insights Reduce per Order Costs by 25%"
        stat: { value: '25%', label: 'Reduce per Order Costs' },
        href: 'https://www.pingcap.com/case-study/real-time-insights-reduce-per-order-costs-by-25-percent/',
      },
    ],
    quote: {
      quote:
        "TiDB's futuristic product roadmap proactively addresses many of the pain points of managing distributed systems.",
      name: 'Mani Kuramboyina, Head of Engineering India NinjaVan',
      logo: {
        src: 'https://static.pingcap.com/images/02abcf91-id-qv0xxyp_logos.png',
        alt: 'NinjaVan',
        width: 180,
        height: 180,
      },
    },
  },

  // FAQ answers reuse sentences cut when sections were merged. All entries need content review.
  faq: {
    items: [
      {
        q: 'Do I need a separate data warehouse for logistics analytics?',
        a: 'Consolidate operational tables, event streams, and aggregates in one schema. Run logistics analytics queries without copying data to separate warehouses.',
      },
      {
        q: 'How does TiDB support real-time supply chain monitoring?',
        a: 'TiDB provides a unified architecture for ingesting, storing, and analyzing logistics data in real time. This architecture enables real-time supply chain monitoring and analytics, helping teams enable operational intelligence across logistics, fulfillment, and delivery operations.',
      },
      {
        q: 'How fast is TiDB for high-volume logistics requests?',
        a: '"TiDB enables us to handle thousands of requests per second with less than 100ms latency." Hari Kishan, Senior Engineering Manager, Delhivery',
      },
      {
        q: 'Can moving to TiDB lower my database costs?',
        a: '"The migration to TiDB resulted in significant cost savings of up to 70% due to its efficient resource utilization." Anteraja IT Team',
      },
    ],
  },

  resources: {
    title: 'Resources to Fuel Your TiDB Journey',
    items: [
      {
        type: 'Case Study',
        title: 'Delhivery’s Journey to Scalable, Real-Time Data Processing',
        href: 'https://www.pingcap.com/case-study/delhivery-scalable-real-time-data-processing-tidb/',
        cta: 'Read the Delhivery Story',
      },
      {
        type: 'Blog',
        title: 'Inside Delhivery’s Data Marts Migration Journey to TiDB',
        href: 'https://www.pingcap.com/blog/delhiverys-data-marts-migration-journey-from-oltp-to-htap/',
        cta: 'Read',
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
  'Real-Time Logistics Data Platform',
  faqForSchema(PAGE.faq)
)

export default function LogisticsPage() {
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
