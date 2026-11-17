import { Header, Footer, JsonLd } from '@/components'
import { SolutionTemplate, faqForSchema } from '../_components/SolutionTemplate'
import type { SolutionPageData } from '../_components/types'
import { solutionMetadata, solutionSchema } from '../_components/meta'

// ─── Page content (all copy lives here) ──────────────────────────────────────

const PATH = '/solutions/modernize-mysql-workloads/'
const TITLE = 'Effortless MySQL Scaling | TiDB Solutions'
const DESCRIPTION =
  'Scale MySQL workloads without limits. TiDB delivers cloud-native elasticity, real-time analytics, and built-in resiliency—start scaling smarter today.'

const SOLUTION_BRIEF_URL =
  'https://static.pingcap.com/files/2024/11/26023423/Solution-Brief-Modernize-MySQL-with-TiDB.pdf'

const PAGE: SolutionPageData = {
  // Hero is unchanged from the live page (Part B: no change for this page).
  hero: {
    headline: 'MySQL Scaling Without Limits',
    subheadline:
      'Accelerate business growth with a distributed database that’s ready for anything the world throws its way',
    primaryCta: { text: 'Get Solution Brief', href: SOLUTION_BRIEF_URL },
    secondaryCta: { text: 'Book a Demo', href: '/solutions/modernize-mysql-workloads/#demo' },
    backgroundImage: 'https://static.pingcap.com/files/2024/11/26201805/module-_-headline-4.svg',
  },

  logos: {
    title: 'The Trusted MySQL Alternative for 1000s of Customers Globally',
    logos: [
      { name: 'Square', src: 'https://static.pingcap.com/files/2024/11/26201955/Square.svg' },
      {
        name: 'LINE',
        src: 'https://static.pingcap.com/files/2024/11/26202011/LINE.png',
        href: 'https://www.pingcap.com/case-study/line-corporation-exploration-mysql-tidb/',
      },
      {
        name: 'Shopee',
        src: 'https://static.pingcap.com/files/2024/11/26202040/Shopee.png',
        href: 'https://www.pingcap.com/case-study/choosing-right-database-for-your-applications/',
      },
      {
        name: 'Bolt',
        src: 'https://static.pingcap.com/files/2024/11/26202058/Bolt.svg',
        href: 'https://www.pingcap.com/case-study/bolt-modernizing-mysql-tidb-scale-thousands-microservices-aws/',
      },
      {
        name: 'Streak',
        src: 'https://static.pingcap.com/files/2024/11/26202123/Streak-1.svg',
        href: 'https://www.pingcap.com/case-study/streak-find-out-why-streak-built-its-realtime-crm-using-tidb/',
      },
      { name: 'Catalyst', src: 'https://static.pingcap.com/files/2024/11/10225931/Catalyst.svg' },
      {
        name: 'Flipkart',
        src: 'https://static.pingcap.com/files/2024/10/17071419/Flipkart-1-1.png',
      },
    ],
  },

  problem: {
    title: 'Why MySQL Can’t Scale With You',
    paragraphs: [
      'MySQL’s monolithic architecture runs on a single server where query processing, transaction management, and storage are tightly coupled within a single node.',
    ],
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/26202207/Lost-Developer-Productivity.svg',
          alt: 'Lost Developer Productivity',
        },
        title: 'Lost Developer Productivity',
        body: 'Tedious workarounds shift developers away from building features to fixing database gaps',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/26202226/Increased-Business-Risk.svg',
          alt: 'Increased Business Risk',
        },
        title: 'Increased Business Risk',
        body: 'Homemade, purpose-built solutions increase the chances of system failures while adding complexity',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/26202243/Rising-Operational-Costs.svg',
          alt: 'Rising Operational Costs',
        },
        title: 'Rising Operational Costs',
        body: 'Database sprawl eats into profits that could be better invested in growing the business',
      },
    ],
  },

  solution: {
    title: 'Scale Out Beyond MySQL with TiDB',
    paragraphs: [
      // Em dash in this moved sentence replaced with a comma (listed in the PR).
      'With TiDB, data is automatically sharded into small chunks and distributed across storage nodes. This sharding is transparent to the user and can handle massive amounts of data, far beyond what a single node can manage.',
      'Extend your MySQL application with semantic search and RAG. TiDB combines vector similarity with SQL filtering, so AI features can retrieve relevant application data through SQL. [Learn about vector search on TiDB](https://www.pingcap.com/ai/vector-search/)',
    ],
    cta: { text: 'Book a Demo', href: '/solutions/modernize-mysql-workloads/#demo' },
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/05193236/High-traffic-application.svg',
          alt: 'High-traffic-application',
        },
        title: 'High-Traffic Applications',
        points: [
          {
            heading: 'Unlimited Elasticity',
            body: 'Scale your applications with a distributed scale-out architecture and bottomless storage.',
          },
          {
            heading: 'Best-in-Class Resiliency',
            body: 'High availability, disaster recovery, point-in-time recovery (PiTR), backup and restore, and multi-availability zone (AZ) failover.',
          },
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/05193336/Workload-consolidation.svg',
          alt: 'Workload-consolidation',
        },
        title: 'Workload Consolidation',
        points: [
          {
            heading: 'Simplified Data Platform',
            body: 'Provides a single endpoint for transactional and analytical workloads while guaranteeing strong data consistency.',
          },
          {
            heading: 'Extensible APIs',
            body: 'MySQL wire protocol compatibility plus connectors to Apache Spark, Apache Kafka, Kubernetes and more.',
          },
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/05193443/Real-time-analytics-1.svg',
          alt: 'Real-time-analytics',
        },
        title: 'Operational Cost Reduction',
        points: [
          {
            heading: 'Hybrid and Multi-Cloud Enabled',
            body: 'Deploy database clusters anywhere in the world, in public, private, and hybrid cloud environments on VMs, containers, or bare metal.',
          },
          {
            heading: 'Enterprise-Grade Security',
            body: 'Encrypt data both in-flight and at-rest.',
          },
        ],
      },
    ],
  },

  // §5 Workloads: GAP. The live page has no workload cards; not written here (see PR).

  howItWorks: {
    title: 'Adoption Made Simple',
    paragraphs: [
      'TiDB guides you through SQL modernization with a four-step process backed by tools, best practices, and expert support.',
    ],
    steps: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/05194239/Assess.svg',
          alt: 'Assess',
        },
        title: 'Step 1: Assess Workloads & Requirements',
        body: 'Work with TiDB experts to evaluate existing SQL workloads and identify bottlenecks. Our Workload Analysis feature surfaces performance patterns and recommends optimizations.',
        listLabel: 'You’ll get',
        list: [
          'Guided assessment and tuning insights',
          'Automated SQL optimization recommendations',
          'Clear migration baselines for planning',
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/05194240/Migrate.svg',
          alt: 'Migrate',
        },
        title: 'Step 2: Migrate with MySQL Compatibility Tools',
        body: 'Move from MySQL easily with hands-on migration assistance. TiDB’s MySQL protocol and Data Migration (DM) tool enable full or incremental data transfer—no code changes required.',
        listLabel: 'You’ll get',
        list: [
          'Seamless migration from MySQL 5.7 / 8.0',
          'Real-time replication and sharded-table merge',
          'Schema updates with gh-ost',
          'Live monitoring via TiUP',
        ],
      },
      {
        icon: { src: 'https://static.pingcap.com/files/2024/11/05194241/Scale.svg', alt: 'Scale' },
        title: 'Step 3: Scale Elastically in Production',
        body: 'Scale horizontally with zero downtime. TiDB’s distributed architecture separates compute and storage for linear, fault-tolerant growth.',
        listLabel: 'You’ll get',
        list: [
          'Auto-Scaling based on workload demand',
          'Strong consistency via Raft protocol',
          'Column-based HTAP storage for OLTP + analytics',
          'Clusters up to 500+ nodes with RPO = 0',
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/05194242/Ecosystem.svg',
          alt: 'Ecosystem',
        },
        title: 'Step 4: Optimize with Ecosystem Integrations',
        body: 'Keep performance stable with continuous optimization and expert guidance.',
        listLabel: 'You’ll get',
        list: [
          'SQL Plan Management for consistent performance',
          'Dashboard + Key Visualizer for trend insights',
          'Automated query and index optimization',
          'Seamless integration with billing and access systems',
        ],
      },
    ],
  },

  comparison: {
    title: 'MySQL vs. TiDB',
    paragraphs: [
      'TiDB’s distributed SQL design replaces MySQL’s manual scaling workarounds with built-in elasticity, strong consistency, and simplified operations.',
    ],
    tabs: [
      {
        id: 'sharding',
        label: 'Sharding',
        columns: [
          {
            heading: 'MySQL',
            headingStyle: 'h4',
            tone: 'blue',
            image: {
              src: 'https://static.pingcap.com/files/2025/11/10233519/1000011060.svg',
              alt: 'MySQL-sharding',
            },
            items: [
              'Manual, complex sharding across databases',
              'Requires custom logic and schema maintenance',
              'High operational overhead',
            ],
          },
          {
            heading: 'TiDB',
            headingStyle: 'h4',
            tone: 'teal',
            image: {
              src: 'https://static.pingcap.com/files/2025/11/10233521/1000011067.svg',
              alt: 'No-sharding',
            },
            items: [
              'Built-in auto-sharding distributes data seamlessly across nodes',
              'No manual partitioning or application rewrites',
              'Focus on development, not data distribution',
            ],
          },
        ],
      },
      {
        id: 'scaling',
        label: 'Scaling',
        columns: [
          {
            heading: 'MySQL',
            headingStyle: 'h4',
            tone: 'blue',
            image: {
              src: 'https://static.pingcap.com/files/2025/11/11003642/1000011062.svg',
              alt: 'MySQL-Scaling',
            },
            items: [
              'Vertical scaling only—upgrade hardware to grow',
              'Expensive and limited by hardware ceilings',
              'Risk of downtime during scaling',
            ],
          },
          {
            heading: 'TiDB',
            headingStyle: 'h4',
            tone: 'teal',
            image: {
              src: 'https://static.pingcap.com/files/2025/11/11003647/1000011053.svg',
              alt: 'TiDB-Scaling',
            },
            items: [
              'Horizontal scaling—add nodes instantly to increase capacity',
              'Scale out elastically with cloud-native architecture',
              'Zero downtime and linear performance at scale',
            ],
          },
        ],
      },
      {
        id: 'consistency',
        label: 'Consistency',
        columns: [
          {
            heading: 'MySQL',
            headingStyle: 'h4',
            tone: 'blue',
            image: {
              src: 'https://static.pingcap.com/files/2025/11/11003916/1000011064.svg',
              alt: 'MySQL-Consistency',
            },
            items: [
              'Asynchronous replication leads to data lag',
              'Reads may return stale data',
              'Complex failover management',
            ],
          },
          {
            heading: 'TiDB',
            headingStyle: 'h4',
            tone: 'teal',
            image: {
              src: 'https://static.pingcap.com/files/2025/11/11003925/1000011068.svg',
              alt: 'TiDB-Consistency',
            },
            items: [
              'Strong consistency with Raft consensus',
              'Always-consistent data across replicas',
              'Built-in fault tolerance and auto-recovery',
            ],
          },
        ],
      },
    ],
  },

  proof: {
    title: 'How Teams Use TiDB to Scale MySQL Workloads',
    paragraphs: [
      'TiDB is built to help teams evolve from managing databases to scaling intelligently across any workload. TiDB serves as the ideal distributed database to power applications and businesses across fintech, retail & e-commerce, SaaS, AI, gaming, and more.',
    ],
    // Titles and descriptions are each case study's own published H1 and summary.
    cases: [
      {
        logo: { src: 'https://static.pingcap.com/files/2024/11/26202058/Bolt.svg', alt: 'Bolt' },
        title: 'Bolt Modernizes MySQL with TiDB to Scale 1000s of Microservices on AWS',
        description:
          'Discover how rapid 400% revenue growth led this global on-demand mobility company on a journey to modernize MySQL with TiDB.',
        // Source H1: "... to Scale 1000s of Microservices on AWS"
        stat: { value: '1000s', label: 'of Microservices on AWS' },
        href: 'https://www.pingcap.com/case-study/bolt-modernizing-mysql-tidb-scale-thousands-microservices-aws/',
      },
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/11/26202123/Streak-1.svg',
          alt: 'Streak',
        },
        title: 'Why Streak Chose TiDB to Make Its CRM Real-Time',
        description:
          'TiDB is enabling Streak users to share emails and metadata effortlessly, and is enabling our developers to move faster than ever before.',
        // No TiDB outcome figure published by this case study; stat left out.
        href: 'https://www.pingcap.com/case-study/streak-find-out-why-streak-built-its-realtime-crm-using-tidb/',
      },
      {
        logo: { src: 'https://static.pingcap.com/files/2024/11/26202011/LINE.png', alt: 'LINE' },
        title: 'From MySQL to TiDB: Inside LINE Corporation’s Exploration with Distributed SQL',
        description:
          'Learn how LINE Corporation solved its scaling and operational issues by migrating from MySQL to TiDB, a distributed SQL database.',
        // No TiDB outcome figure published by this case study; stat left out.
        href: 'https://www.pingcap.com/case-study/line-corporation-exploration-mysql-tidb/',
      },
    ],
    // Existing stats from the live "Scale Out Beyond MySQL" section, with their captions.
    stats: [
      { value: 'Up to 500TB', label: 'Scale Per Cluster' },
      { value: '2 Million QPS', label: 'At Millisecond Latencies' },
      { value: '99.999% Uptime', label: 'During Planned Outages' },
      { value: '80% Less Sprawl', label: 'Vs. Single-Node Deployments' },
    ],
    quote: {
      quote:
        '“TiDB enables Streak users to share emails and metadata effortlessly, and enables our developers to move faster than ever before.”',
      name: 'Fred Wulff,',
      role: 'VP of Engineering',
      logo: {
        src: 'https://static.pingcap.com/files/2024/11/06192729/streak.svg',
        alt: 'Streak',
        width: 140,
        height: 40,
      },
      href: '/case-study/streak-find-out-why-streak-built-its-realtime-crm-using-tidb/',
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
        q: 'Why is MySQL hard to scale out?',
        a: 'Scaling out this architecture is difficult because MySQL wasn’t built to natively distribute data across multiple nodes. Most teams rely on replication or manual sharding workarounds that add complexity and limit scalability.',
      },
      {
        q: 'Is TiDB compatible with MySQL?',
        a: 'TiDB offers an ultra-reliable distributed SQL database that provides MySQL wire compatibility, horizontal scalability, and strong consistency. It decouples compute from storage, allowing each component to scale out independently.',
      },
      {
        q: 'Is TiDB easy to operate day to day?',
        a: '“Scale-in and scale-out in a cluster configuration is easy, and the ecosystem is very rich, with operational monitoring installed immediately with the installation command (TiUP).” Kentaro Kitagawa, Senior Database Administrator, LINE',
      },
      {
        q: 'Do teams keep moving more MySQL clusters to TiDB after the first migration?',
        a: '“In the following years, we will rely on TiDB even more, including migrating more clusters from MySQL to TiDB and using TiCDC to set up multi-region clusters on AWS for failover.” Boris Savelev, SRE Manager, Bolt',
      },
    ],
  },

  resources: {
    title: 'Resources to Fuel Your TiDB Journey',
    items: [
      {
        type: 'Solution Brief',
        title: 'Modernize MySQL with TiDB',
        href: SOLUTION_BRIEF_URL,
        cta: 'Get Solution Brief',
      },
      {
        type: 'Hands-On Lab · Intermediate · 90 minutes',
        title: 'Migrate from MySQL to TiDB Using TiDB Data Migration',
        // Em dash in this moved sentence replaced with a comma (listed in the PR).
        description:
          'Gain end-to-end experience configuring, migrating, and validating SQL workloads, exactly as outlined in Step 2.',
        href: 'https://labs.tidb.io/labs/demo_011',
        cta: 'Start Lab',
      },
      {
        type: 'Hands-On Lab · Advanced · 90 minutes',
        title: 'SQL Workloads Replay with TiDB Data Migration',
        description:
          'Validate post-migration performance by replaying real SQL traffic, ensuring workloads perform as expected before going live.',
        href: 'https://labs.tidb.io/labs/demo_302',
        cta: 'Start Lab',
      },
      {
        type: 'Case Study',
        title: 'How Shopee Chose the Right Database for Their Applications',
        href: 'https://www.pingcap.com/case-study/choosing-right-database-for-your-applications/',
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
  'Modernize MySQL Workloads',
  faqForSchema(PAGE.faq)
)

export default function ModernizeMysqlPage() {
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
