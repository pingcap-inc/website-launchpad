import type { Metadata } from 'next'
import Image from 'next/image'
import { BrainCircuit, CheckSquare, ChartNoAxesCombined, Cloud, Radius } from 'lucide-react'
import {
  FaqSection,
  Footer,
  FeatureCardSection,
  FeatureGridSection,
  FeatureHighlightsSection,
  Header,
  HeroSection,
  InlineLink,
  JsonLd,
  LogoCloudSection,
  PrimaryButton,
  SectionHeader,
  SectionWrapper,
  SecondaryButton,
} from '@/components'
import type { ColorCardItem } from '@/components/sections/FeatureHighlightsSection'
import { articleSchema, buildPageSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { reactNodeToPlainText } from '@/lib/react-text'
import { VideoDialog } from '@/components/ui/VideoDialog'
import { HeroVideo } from './_components/HeroVideo'

const pageTitle = 'What is TiDB? Distributed SQL for Apps and AI Agents | TiDB'
const pageDescription =
  'TiDB is an open-source distributed SQL database that gives apps and AI agents one data layer: transactions, analytics, and vector search. Learn how it works.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.pingcap.com/what-is-tidb/',
    siteName: 'TiDB',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png',
        width: 1200,
        height: 630,
        alt: 'TiDB — Open-source distributed SQL database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    site: '@PingCAP',
    creator: '@PingCAP',
    images: ['https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/what-is-tidb/' },
}

// Declared before `schema` so the FAQPage node can be derived from these exact
// answers rather than a hand-maintained copy of them.
const faqs = [
  {
    q: 'What is TiDB?',
    a: (
      <>
        TiDB is an open-source, distributed SQL database built by{' '}
        <InlineLink href="https://www.pingcap.com/about-us/">PingCAP</InlineLink>. It gives
        applications and AI agents one data layer, with transactions, real-time analytics (HTAP),
        and native vector search (in public preview) in one system. It is compatible with the MySQL
        protocol and scales horizontally across commodity hardware. TiDB is licensed under Apache
        2.0, and its storage layer{' '}
        <InlineLink href="https://www.cncf.io/projects/tikv/">TiKV</InlineLink> is a CNCF Graduated
        project.
      </>
    ),
  },
  {
    q: 'Is TiDB compatible with MySQL?',
    a: (
      <>
        Yes. TiDB implements the MySQL wire protocol and is compatible with MySQL syntax, drivers,
        and ORM frameworks. Most applications running on MySQL can connect to TiDB with zero code
        changes. TiDB also provides{' '}
        <InlineLink href="https://docs.pingcap.com/tidb/stable/migration-overview/">
          data migration tools
        </InlineLink>{' '}
        to simplify the transition from existing MySQL or MariaDB instances.
      </>
    ),
  },
  {
    q: 'Is TiDB open source?',
    a: (
      <>
        Yes. TiDB is fully open source under the Apache 2.0 license, including enterprise-grade
        features. The full source code is available on{' '}
        <InlineLink href="https://github.com/pingcap/tidb">GitHub</InlineLink>, where TiDB has over
        40,000 stars and more than 1,200 contributors. TiKV, TiDB&rsquo;s distributed storage
        engine, is a{' '}
        <InlineLink href="https://www.cncf.io/projects/tikv/">
          graduated project of the Cloud Native Computing Foundation
        </InlineLink>
        .
      </>
    ),
  },
  {
    q: 'What does HTAP mean?',
    a: 'HTAP stands for Hybrid Transactional and Analytical Processing. It describes a database architecture that can handle both transactional (OLTP) and analytical (OLAP) workloads on the same dataset simultaneously. In TiDB, TiKV serves transactional queries while TiFlash handles analytical queries in real time, eliminating the need for separate ETL pipelines or dedicated analytics databases.',
  },
  {
    q: 'How does TiDB scale?',
    a: (
      <>
        TiDB scales horizontally by adding nodes to the cluster. Because compute (TiDB Server) and
        storage (TiKV/TiFlash) are decoupled, each layer scales independently. Need more query
        throughput? Add TiDB Server nodes. Need more storage capacity? Add TiKV nodes. Scaling
        happens online with no downtime and no manual data redistribution.{' '}
        <SecondaryButton href="https://docs.pingcap.com/tidb/stable/overview/">
          Learn more about TiDB&rsquo;s architecture
        </SecondaryButton>
      </>
    ),
  },
  {
    q: 'How is TiDB different from TiDB Cloud?',
    a: (
      <>
        TiDB is the open-source distributed SQL database engine, available to anyone under the
        Apache 2.0 license. You can download it, deploy it on your own infrastructure, and manage it
        yourself. <InlineLink href="https://www.pingcap.com/tidb-cloud/">TiDB Cloud</InlineLink> is
        PingCAP&rsquo;s fully managed Database-as-a-Service built on top of TiDB. It handles
        provisioning, scaling, backups, and upgrades so your team can focus on building applications
        instead of operating database infrastructure. TiDB Cloud is available on AWS, Google Cloud,
        and Azure. TiDB Cloud comes in Starter for large numbers of small databases, Essential for
        production apps that need predictable throughput, Premium for the most demanding enterprise
        workloads, and BYOC, which runs in your own cloud account with PingCAP handling maintenance
        and upgrades. New clusters on all four run on the TiDB X architecture.
      </>
    ),
  },
  {
    q: 'Can TiDB be used as a vector database?',
    a: (
      <>
        Yes. TiDB supports a native VECTOR data type and vector indexes for similarity search, so
        you can store embeddings next to your relational data and query both with SQL. Because
        vectors live in the same distributed database as your operational data, you avoid syncing
        data into a separate vector store. Vector search is in public preview on TiDB Cloud Starter
        and TiDB Self-Managed (v8.4.0 and later).
      </>
    ),
  },
  {
    q: 'Is TiDB a good database for AI agents?',
    a: (
      <>
        TiDB fits agent workloads that read and write state at high concurrency, retrieve context
        with vector search, and need consistent data. It scales horizontally as agent traffic grows,
        runs ACID transactions across nodes, and supports online schema changes as agents add
        tables.{' '}
        <InlineLink href="https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/">
          Manus
        </InlineLink>
        , a general-purpose AI agent platform, runs on TiDB Cloud, where over 90% of new database
        clusters are created by AI agents.
      </>
    ),
  },
  {
    q: 'What is TiDB X?',
    a: (
      <>
        TiDB X is the cloud-native architecture that powers TiDB Cloud. It separates compute from
        storage and separates heavy background work from transactions, so TiDB can run millions of
        small databases cost-effectively and keep latency steady for large production workloads.
        PingCAP has announced it will open-source the TiDB X core by the end of 2026.
      </>
    ),
  },
]

const schema = buildPageSchema({
  path: '/what-is-tidb/',
  title: pageTitle,
  description: pageDescription,
  pageType: 'AboutPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'What is TiDB?', path: '/what-is-tidb/' },
  ],
  extraSchemas: [
    articleSchema({
      title: 'What is TiDB?',
      description: pageDescription,
      url: 'https://www.pingcap.com/what-is-tidb/',
      datePublished: '2026-04-27T13:58:08+08:00',
      dateModified: '2026-10-29T00:00:00+08:00',
      image: 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png',
    }),
    softwareApplicationSchema({
      name: 'TiDB',
      description:
        'TiDB is an open-source, distributed SQL database with MySQL compatibility, horizontal scalability, built-in HTAP for real-time transactional and analytical workloads, and native vector and full-text search for applications and AI agents.',
      url: 'https://www.pingcap.com/tidb/',
      featureList: [
        'HTAP',
        'Vector search',
        'Full-text search',
        'MySQL compatibility',
        'Horizontal scaling',
      ],
    }),
    // Derived from `faqs` so the schema can never drift from the rendered copy.
    faqSchema(faqs.map((faq) => ({ question: faq.q, answer: reactNodeToPlainText(faq.a) }))),
  ],
})

const componentCards: ColorCardItem[] = [
  {
    variant: 'red',
    title: (
      <div className="flex gap-2 items-center">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold leading-none text-black">
          1
        </div>
        TiDB Server
      </div>
    ),
    description: (
      <>
        <InlineLink
          href="https://docs.pingcap.com/tidb/stable/tidb-computing/"
          className="border-white"
        >
          TiDB Server
        </InlineLink>{' '}
        is the stateless SQL layer. It parses queries, optimizes execution plans, and coordinates
        reads and writes across the storage layer. Because it&rsquo;s stateless, you can add or
        remove TiDB Server instances without touching your data.
      </>
    ),
    icon: (
      <Image
        src="/images/what-is-tidb/tidb-server.svg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    ),
  },
  {
    variant: 'teal',
    title: (
      <div className="flex gap-2 items-center">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold leading-none text-black">
          2
        </div>
        PD (Placement Driver)
      </div>
    ),
    description: (
      <>
        <InlineLink
          href="https://docs.pingcap.com/tidb/stable/tidb-scheduling/"
          className="border-white"
        >
          PD (Placement Driver)
        </InlineLink>{' '}
        manages cluster metadata, handles timestamp allocation for transactions, and makes
        scheduling decisions, like where to place data replicas and how to balance load across
        nodes.
      </>
    ),
    icon: (
      <Image
        src="/images/what-is-tidb/pd.svg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    ),
  },
  {
    variant: 'violet',
    title: (
      <div className="flex gap-2 items-center">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold leading-none text-black">
          3
        </div>
        TiKV
      </div>
    ),
    description: (
      <>
        <InlineLink
          href="https://docs.pingcap.com/tidb/stable/tikv-overview/"
          className="border-white"
        >
          TiKV
        </InlineLink>{' '}
        is a distributed, row-based key-value store that handles transactional (OLTP) workloads.
        Data is automatically split into regions and replicated across nodes using a consensus
        protocol, which ensures strong consistency and automatic failover if a node goes down.
      </>
    ),
    icon: (
      <Image
        src="/images/what-is-tidb/tikv.svg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    ),
  },
  {
    variant: 'blue',
    title: (
      <div className="flex gap-2 items-center">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold leading-none text-black">
          4
        </div>
        TiFlash
      </div>
    ),
    description: (
      <>
        <InlineLink
          href="https://docs.pingcap.com/tidb/stable/tiflash-overview/"
          className="border-white"
        >
          TiFlash
        </InlineLink>{' '}
        is a columnar storage engine that replicates data from TiKV in real time. It handles
        analytical (OLAP) queries without impacting transactional performance. This is what makes
        TiDB an HTAP database. You run analytics directly on live transactional data, with no ETL
        pipeline required.
      </>
    ),
    icon: (
      <Image
        src="/images/what-is-tidb/tiflash.svg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    ),
  },
]

const capabilities = [
  {
    title: 'MySQL Compatibility',
    description: (
      <>
        TiDB implements the MySQL wire protocol and is compatible with MySQL syntax, functions, and
        ecosystem tooling. Most applications built on MySQL can connect to TiDB with zero code
        changes. Same connection strings, same ORMs, same drivers. For teams already running MySQL,
        this means you can migrate to a distributed database without rewriting your application
        layer or retraining your developers. TiDB also provides a suite of{' '}
        <InlineLink href="https://docs.pingcap.com/tidb/stable/migration-overview/">
          data migration tools
        </InlineLink>{' '}
        to simplify the transition.
      </>
    ),
    icon: <CheckSquare className="h-10 w-10 text-text-inverse" strokeWidth={1} />,
  },
  {
    title: 'Native Vector and Full-Text Search',
    description: (
      <>
        TiDB stores embeddings in a native VECTOR data type and indexes them for fast similarity
        search, alongside full-text search on the same tables. You can join similarity results with
        live relational data in one SQL query, inside one ACID transaction. RAG pipelines and agent
        memory run without a separate vector database or a sync job to keep it current. Vector
        search is in public preview on TiDB Cloud Starter and TiDB Self-Managed v8.4.0 and later.
        Full-text search is in public preview on TiDB Cloud Starter in select AWS regions. See the{' '}
        <InlineLink href="https://docs.pingcap.com/tidbcloud/vector-search-overview/">
          vector search docs
        </InlineLink>
        .
      </>
    ),
    icon: <BrainCircuit className="h-10 w-10 text-text-inverse" strokeWidth={1} />,
  },
  {
    title: 'Scale on Every Dimension',
    description: (
      <>
        When your workload grows, you add nodes. TiDB{' '}
        <InlineLink href="https://www.pingcap.com/horizontal-scaling-vs-vertical-scaling/">
          scales horizontally
        </InlineLink>{' '}
        with no manual sharding, and compute and storage scale independently. Scale is more than
        data volume: TiDB scales tables, connections, and online schema changes in a single cluster,
        and adds indexes at up to{' '}
        <InlineLink href="https://www.pingcap.com/blog/tidb-x-index-creation-5-5m-rows-near-zero-business-impact-online-ddl/">
          5.5 million rows per second
        </InlineLink>
        . It also scales the number of databases: TiDB Cloud Starter runs millions of database
        instances, most of them created by AI agents. Scaling happens online with zero downtime.
      </>
    ),
    icon: (
      <Image
        src="/images/what-is-tidb/scalability.svg"
        alt="scalability"
        width={40}
        height={40}
        className="h-10 w-10 text-text-inverse"
      />
    ),
  },
  {
    title: 'Real-Time Analytics (HTAP)',
    description:
      'Most databases force you to choose between transactions and analytics. TiDB handles both. TiKV serves your OLTP workload while TiFlash runs OLAP queries on the same data in real time. There’s no ETL pipeline to build, no replica lag to worry about, and no separate analytics database to maintain. Your application writes to TiDB once, and both operational queries and analytical dashboards read from the same source of truth.',
    icon: <ChartNoAxesCombined className="h-10 w-10 text-text-inverse" strokeWidth={1} />,
  },
  {
    title: 'Cloud-Native Deployment',
    description: (
      <>
        TiDB was designed for cloud infrastructure from the start. It runs natively on Kubernetes
        using{' '}
        <InlineLink href="https://docs.pingcap.com/tidb-in-kubernetes/stable/">
          TiDB Operator
        </InlineLink>
        , which automates deployment, scaling, upgrades, and failover. You can self-manage TiDB on
        any Kubernetes-compatible environment, or use{' '}
        <InlineLink href="https://www.pingcap.com/tidb-cloud/">TiDB Cloud</InlineLink>,
        PingCAP&rsquo;s fully managed Database-as-a-Service available on AWS, Google Cloud, and
        Azure. TiDB Cloud also lets AI agents create databases on demand through an API. At Manus,
        over 90% of new database clusters are created by AI agents, not humans.
      </>
    ),
    icon: <Cloud className="h-10 w-10 text-text-inverse" strokeWidth={1} />,
  },
  {
    title: 'Strong Consistency and High Availability',
    description: (
      <>
        TiDB provides full{' '}
        <InlineLink href="https://www.pingcap.com/blog/distributed-transactions-tidb/">
          ACID transactions
        </InlineLink>{' '}
        across distributed nodes. Every piece of data is replicated to multiple nodes, and
        transactions are committed only when a majority of replicas acknowledge the write. If a node
        fails, the cluster automatically redistributes its workload with no manual intervention. You
        get the consistency guarantees of a traditional relational database with the fault tolerance
        of a distributed system.
      </>
    ),
    icon: <Radius className="h-10 w-10 text-text-inverse" strokeWidth={1} />,
  },
]

const useCases = [
  {
    title: 'AI Agents and AI Applications',
    description: (
      <>
        AI agents read context, make decisions, and write results back, often in the same step. TiDB
        handles that in one system:{' '}
        <InlineLink href="https://docs.pingcap.com/tidbcloud/vector-search-overview/">
          native vector
        </InlineLink>{' '}
        and full-text search for retrieval and RAG, ACID transactions for agent state and memory,
        and real-time analytics on the same data. Agent workloads also look different: most agent
        databases stay tiny while a few grow huge, schemas change as the agent works, and traffic
        arrives in bursts. TiDB handles this with online schema changes and compute that scales to
        zero when idle. AI-native companies like Manus, Kimi, and Dify use TiDB as their unified
        data layer.
      </>
    ),
    href: 'https://www.pingcap.com/ai/',
    ctaText: 'Learn more',
    borderColor: 'border-brand-teal-medium',
    icon: (
      <Image
        src="/images/what-is-tidb/ai.svg"
        alt=""
        width={60}
        height={60}
        className="h-15 w-15"
      />
    ),
  },
  {
    title: 'SaaS and Internet-Scale Applications',
    description:
      'TiDB powers production workloads at companies like Atlassian, Plaid, and Databricks. For SaaS platforms and internet-scale applications, TiDB eliminates the sharding complexity and operational overhead that come with outgrowing a single MySQL or PostgreSQL instance. You scale by adding nodes, not by rewriting your data access layer.',
    href: 'https://www.pingcap.com/solutions/saas/',
    ctaText: 'Learn more',
    borderColor: 'border-brand-violet-medium',
    icon: (
      <Image
        src="/images/what-is-tidb/saas.svg"
        alt=""
        width={60}
        height={60}
        className="h-15 w-15"
      />
    ),
  },
  {
    title: 'Financial Services',
    description:
      'Banks, payment processors, and fintech platforms use TiDB for workloads where data consistency, high availability, and disaster tolerance are non-negotiable. TiDB’s multi-replica architecture and ACID guarantees meet the requirements of ledger systems, fraud detection, and regulatory reporting, while scaling to handle transaction volumes that overwhelm single-node databases.',
    href: 'https://www.pingcap.com/solutions/fintech/',
    ctaText: 'Learn more',
    borderColor: 'border-brand-red-primary',
    icon: (
      <Image
        src="/images/what-is-tidb/financial.svg"
        alt=""
        width={60}
        height={60}
        className="h-15 w-15"
      />
    ),
  },
  {
    title: 'Real-Time Analytics and Operational Reporting',
    description:
      'Teams that need real-time dashboards, cohort analysis, or operational reporting on transactional data can run those queries directly in TiDB using TiFlash. There’s no need to build and maintain a separate ETL pipeline into an analytics warehouse. One database, one source of truth, both workloads.',
    href: 'https://www.pingcap.com/solutions/enable-operational-intelligence/',
    ctaText: 'Learn more',
    borderColor: 'border-brand-blue-medium',
    icon: (
      <Image
        src="/images/what-is-tidb/real-time.svg"
        alt=""
        width={60}
        height={60}
        className="h-15 w-15"
      />
    ),
  },
]

const companyLogos = [
  { name: 'Manus', image: { url: '/images/logos/manuse-logo-white.svg' }, width: 96, height: 24 },
  { name: 'Plaid', image: { url: '/images/logos/plaid-logo-white.svg' }, width: 78, height: 24 },
  { name: 'Dify', image: { url: '/images/logos/dify-logo-white.svg' }, width: 84, height: 24 },
  {
    name: 'Pinterest',
    image: { url: '/images/logos/pinterest-logo-white.svg' },
    width: 94,
    height: 24,
  },
  { name: 'Square', image: { url: '/images/logos/square-logo-white.svg' }, width: 94, height: 24 },
  {
    name: 'Flipkart',
    image: { url: '/images/logos/flipkart-logo-white.svg' },
    width: 94,
    height: 24,
  },
  { name: 'Bolt', image: { url: '/images/logos/bolt-logo-white.svg' }, width: 64, height: 24 },
  { name: 'conga', image: { url: '/images/logos/conga-logo-white.svg' }, width: 68, height: 24 },
  {
    name: 'Catalyst',
    image: { url: '/images/logos/catalyst-logo-white.svg' },
    width: 90,
    height: 24,
  },
  {
    name: 'Rakuten',
    image: { url: '/images/logos/rakuten-logo-white.svg' },
    width: 94,
    height: 24,
  },
]

const customerStories = [
  {
    company: 'manus',
    quote:
      '“TiDB’s elastic architecture enabled us to migrate in two weeks, supporting users and massive ‘Context Engineering’ workloads for viral success.”',
    attribution: 'Manus engineering team',
    body: 'Migrated to TiDB Cloud in two weeks to support the viral launch of their general-purpose agentic AI platform. After amassing a two-million-plus waitlist within weeks of launch, Manus needed extreme write throughput and low-latency state reconstruction for thousands of stateful agent iterations per task. Those are workloads a monolithic database couldn’t sustain. TiDB now powers Manus’s “Wide Research” agent swarms, with over 90% of new database clusters created by AI agents, not humans.',
    primaryCta: {
      text: 'Read the Case Study',
      href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
    },
    tone: 'bg-brand-blue-bg',
  },
  {
    company: 'Kimi',
    body: 'Runs its agent app-hosting platform on TiDB Cloud Starter, where every app an agent builds gets its own database and idle apps use no compute. Each database provisions in under a second, and sites with no traffic generate no database compute cost, so Kimi can host agent-created apps at the scale of millions of tenants.',
    primaryCta: {
      text: 'Read the Case Study',
      href: 'https://www.pingcap.com/case-study/kimi-2-6-agent-hosting-platform-tidb-cloud/',
    },
    tone: 'bg-brand-red-bg',
  },
  {
    company: 'Dify',
    quote:
      '“We consolidated our entire AI backend into TiDB, letting our engineers focus on building agent features instead of managing database complexity.”',
    attribution: 'Dify engineering team',
    body: 'Consolidated nearly half a million database containers into one unified TiDB system, cutting operational overhead by 90%. Dify, one of the most popular open-source LLM app development platforms, with over 100,000 GitHub stars, needed a single data layer that could handle documents, vectors, chat histories, and relational data for thousands of developers building AI applications. TiDB’s native vector search enabled built-in RAG workflows without a separate vector database.',
    primaryCta: {
      text: 'Read the Case Study',
      href: 'https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/',
    },
    tone: 'bg-brand-teal-bg',
  },
  {
    company: 'Atlassian',
    quote:
      '“TiDB came to our rescue, consolidating 750 Postgres clusters down to 16 with zero performance degradation.”',
    attribution: 'Atlassian engineering team',
    body: 'Consolidated 750+ PostgreSQL clusters into 16 TiDB clusters to power the Forge plugin platform. Atlassian’s one-schema-per-tenant SaaS model required hosting over 3 million tables in a single system, something traditional single-node databases couldn’t handle. TiDB delivered 6-7x DDL throughput improvement, validated 500,000 concurrent active connections per cluster, and cut node initialization time from 20 minutes to 2 minutes.',
    primaryCta: {
      text: 'Read the Engineering Story',
      href: 'https://www.pingcap.com/blog/how-atlassian-scaled-three-million-tables-multi-tenancy-tidb/',
    },
    secondaryCta: { text: 'Watch video', href: 'https://www.youtube.com/watch?v=asnCJI39MpE' },
    tone: 'bg-brand-violet-bg',
  },
  {
    company: 'PLAID',
    quote:
      '“With TiDB, we can now perform upgrades with zero downtime and large table schema migrations.”',
    attribution: 'Zander Hill | Experienced Data Reliability Engineer',
    body: 'Reduced database maintenance effort by 96% with zero downtime upgrades after migrating from Amazon Aurora to TiDB. A team of six engineers migrated nearly 100 services in under two years. Where Aurora upgrades once consumed 26 engineering weeks and 104 minutes of planned downtime, equivalent TiDB upgrades now take one engineering week with zero downtime.',
    primaryCta: {
      text: 'Read the Customer Story',
      href: 'https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/',
    },
    secondaryCta: { text: 'Watch video', href: 'https://www.youtube.com/watch?v=jRsZ35K1wx8' },
    tone: 'bg-brand-red-bg',
  },
]

const recognitionCards = [
  {
    title: 'G2: Leader in Three Categories',
    body: (
      <>
        TiDB earned a leader position in{' '}
        <InlineLink href="https://www.g2.com/products/tidb/reviews">
          G2’s Summer 2025 Grid reports
        </InlineLink>{' '}
        across three categories: Database-as-a-Service, Database Management Systems, and Relational
        Databases. G2 placements are based on verified customer reviews evaluating satisfaction and
        market presence.
      </>
    ),
    logo: 'g2' as const,
    quote: '“TiDB shines when you want MySQL-like simplicity with cloud-scale architecture.”',
    attribution: 'Verified G2 reviewer',
  },
  {
    title: 'Gartner Peer Insights',
    body: (
      <>
        TiDB has 165+ reviews on{' '}
        <InlineLink href="https://www.gartner.com/reviews/market/cloud-database-management-systems/vendor/pingcap/product/tidb">
          Gartner Peer Insights
        </InlineLink>
        , with reviewers highlighting MySQL compatibility, horizontal scalability, and operational
        simplicity as standout strengths.
      </>
    ),
    logo: 'gartner' as const,
    quote:
      '“MySQL compatibility makes using TiDB extremely easy. Having both row storage and column storage while using the same datasource is a great feature.”',
    attribution: 'Verified Gartner Peer Insights reviewer',
  },
  {
    title: 'Open Source Community',
    body: (
      <>
        TiDB has over{' '}
        <InlineLink href="https://github.com/pingcap/tidb">40,000 GitHub stars</InlineLink> and more
        than 1,200 contributors worldwide. Its storage engine, TiKV, is a CNCF Graduated project,
        the highest maturity level in the Cloud Native Computing Foundation, alongside projects like
        Kubernetes and Prometheus.
      </>
    ),
    logo: 'cncf' as const,
    stats: [
      { image: '/images/what-is-tidb/FUTURO_ICONS-1.svg', value: '40K+', label: 'GitHub stars' },
      {
        image: '/images/what-is-tidb/FUTURO_ICONS-2.svg',
        value: '1200+',
        label: 'Contributors',
      },
    ],
  },
]

const getStartedCards = [
  {
    variant: 'red' as const,
    title: 'TiDB Cloud',
    description:
      'Fully managed Database-as-a-Service on AWS, Google Cloud, and Azure. Free tier. No credit card required to start.',
    cta: { text: 'Start Free', href: 'https://tidbcloud.com/free-trial/' },
  },
  {
    variant: 'violet' as const,
    title: 'TiDB Self-Managed',
    description:
      'Deploy on your own infrastructure using TiDB Operator on Kubernetes. Full control, full flexibility, open source.',
    cta: {
      text: 'Quick Start Guide',
      href: 'https://docs.pingcap.com/tidb/stable/quick-start-with-tidb/',
    },
  },
  {
    variant: 'blue' as const,
    title: 'TiDB Playground',
    description:
      'Try TiDB instantly in your browser. No signup, no installation, no configuration.',
    cta: { text: 'Try Now', href: 'https://play.tidbcloud.com/' },
  },
  {
    variant: 'teal' as const,
    title: 'TiDB Cloud Zero',
    description:
      'For AI agents. Your agent gets a live database in about a second, with no sign-up. Claim it into TiDB Cloud Starter to keep it.',
    cta: { text: 'Try TiDB Cloud Zero', href: 'https://zero.tidbcloud.com/' },
  },
]

function StoryWordmark({ company }: { company: string }) {
  if (company === 'manus') {
    return (
      <Image
        src="/images/logos/manuse-logo-white.svg"
        alt="manus"
        width={148}
        height={40}
        className="h-10 w-auto"
      />
    )
  }
  if (company === 'Kimi') {
    return (
      <Image
        src="/images/logos/latam-kimi-logo-white.svg"
        alt="Kimi"
        width={118}
        height={40}
        className="h-10 w-auto"
      />
    )
  }
  if (company === 'Dify') {
    return (
      <Image
        src="/images/logos/dify-logo-white.svg"
        alt="Dify"
        width={132}
        height={40}
        className="h-10 w-auto"
      />
    )
  }
  if (company === 'PLAID') {
    return (
      <Image
        src="/images/logos/plaid-logo-white.svg"
        alt="PLAID"
        width={124}
        height={40}
        className="h-10 w-auto"
      />
    )
  }
  return <span className="text-[28px] font-bold tracking-tight text-white">{company}</span>
}

function CustomerStoryCard({
  company,
  quote,
  attribution,
  body,
  primaryCta,
  secondaryCta,
  tone,
}: (typeof customerStories)[number]) {
  return (
    <article className="flex h-full flex-col border border-border-primary bg-black">
      <div
        className={`${tone} grid min-h-[178px] gap-8 items-center px-8 py-4 md:grid-cols-[170px_minmax(0,1fr)]`}
      >
        <div className="flex items-center">
          <StoryWordmark company={company} />
        </div>
        {quote ? (
          <div>
            <p className="max-w-[460px] text-body-lg italic leading-relaxed text-white">{quote}</p>
            <p className="mt-5 text-body-md italic text-carbon-200">{attribution}</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-8">
        <p className="text-body-md leading-relaxed text-carbon-300">{body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-8">
          <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
          {secondaryCta ? (
            <VideoDialog
              videoUrl={secondaryCta.href}
              title={`${company} customer story video`}
              description="Watch the customer story on YouTube."
            >
              <SecondaryButton>{secondaryCta.text}</SecondaryButton>
            </VideoDialog>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function RecognitionLogo({ kind }: { kind: 'g2' | 'gartner' | 'cncf' }) {
  if (kind === 'g2') {
    return (
      <Image
        src="/images/what-is-tidb/26fe3c9c-helpdesk_leader_leader.svg"
        alt="G2 Leader Winter 2025"
        width={94}
        height={112}
        className="h-[112px] w-auto"
      />
    )
  }

  if (kind === 'gartner') {
    return (
      <Image
        src="/images/what-is-tidb/peer-insights-r-TM-rgb-for-gartnerblue-bkgrnd.png"
        alt="Gartner Peer Insights"
        width={188}
        height={52}
        className="h-[52px] w-auto"
      />
    )
  }

  return (
    <Image
      src="/images/what-is-tidb/cncf-white 1.svg"
      alt="Cloud Native Computing Foundation"
      width={240}
      height={48}
      className="h-[48px] w-auto"
    />
  )
}

function RecognitionCard({
  title,
  body,
  logo,
  quote,
  attribution,
  stats,
}: (typeof recognitionCards)[number]) {
  return (
    <article className="border border-border-primary bg-carbon px-8 py-7">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.9fr)] lg:items-center">
        <div>
          <h3 className="text-h3-xl leading-tight text-text-inverse">{title}</h3>
          <div className="mt-5 max-w-[640px] text-body-lg leading-relaxed text-carbon-400">
            {body}
          </div>
        </div>

        {stats ? (
          <div className="grid gap-6 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <RecognitionLogo kind={logo} />
            {stats.map((stat) => {
              return (
                <div key={stat.label} className="text-center text-text-inverse">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                    <Image
                      src={stat.image}
                      alt={stat.label}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div className="text-[44px] font-bold leading-none">{stat.value}</div>
                  <div className="mt-2 text-body-sm text-carbon-300">{stat.label}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center">
            <RecognitionLogo kind={logo} />
            <div>
              <p className="max-w-[360px] text-body-md italic leading-relaxed text-white">
                {quote}
              </p>
              <p className="mt-5 text-body-sm italic text-carbon-300">{attribution}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

function ComparisonGraphic() {
  return (
    <div className="mx-auto flex w-full max-w-[400px] justify-center">
      <Image
        src="/images/hero/r/Graphic-14-Dk.svg"
        alt=""
        width={400}
        height={400}
        className="h-auto w-full object-contain"
      />
    </div>
  )
}

export default function WhatIsTidbPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="bg-bg-primary pt-[62px] text-text-inverse lg:pt-20">
        <SectionWrapper
          style={{
            spacing: 'hero',
          }}
        >
          <HeroSection
            layout="split"
            headline="What is TiDB?"
            subheadline={
              <>
                TiDB (pronounced &quot;/ˈtaɪdiːbiː/&quot;, &quot;Ti&quot; stands for Titanium) is an
                open-source, distributed SQL database that gives applications and AI agents one data
                layer: transactions, real-time analytics, and vector search (in public preview) in a
                single ACID system. It is MySQL compatible and scales horizontally on every
                dimension, from data volume and connections to the number of databases you run.
                <span className="mt-4 block">
                  TiDB is built by <InlineLink href="https://www.pingcap.com/">PingCAP</InlineLink>,
                  licensed under Apache 2.0, and its storage engine{' '}
                  <InlineLink href="https://www.cncf.io/projects/tikv/">TiKV</InlineLink> is a
                  graduated project of the Cloud Native Computing Foundation (CNCF).
                </span>
              </>
            }
            rightSlot={
              <div className="lg:pl-4">
                <HeroVideo />
              </div>
            }
          />
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'gradient-dark-bottom',
            spacing: 'section',
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:items-center">
            <div className="max-w-[560px]">
              <SectionHeader
                title="How TiDB Works"
                subtitle={
                  <>
                    TiDB separates compute from storage, which means you can scale each layer
                    independently based on your workload. The{' '}
                    <InlineLink href="https://www.pingcap.com/tidb/">architecture</InlineLink> has
                    four core components:
                  </>
                }
                align="left"
                className="mb-6"
              />
              <div className="mt-10 max-w-[360px]">
                <Image
                  src="/images/what-is-tidb/stack.svg"
                  alt=""
                  width={360}
                  height={281}
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src="/images/what-is-tidb/architecture.svg"
                alt="TiDB architecture diagram showing PD cluster, TiDB cluster, and storage cluster with TiKV and TiFlash nodes"
                width={728}
                height={534}
                className="h-auto w-full max-w-[680px]"
              />
            </div>
          </div>

          <div className="mt-12">
            <FeatureHighlightsSection items={componentCards} columns={4} cardClassName="px-4" />
          </div>

          <div className="mt-8 border border-carbon-800 px-5 py-6 sm:px-6">
            <p className="text-body-lg leading-relaxed">
              The result is a system where you can scale your SQL compute independently from your
              storage, run transactional, analytical, and vector search workloads on the same data
              simultaneously, and maintain strong consistency across the entire cluster. For a full
              technical deep dive, see the{' '}
              <InlineLink
                href="https://docs.pingcap.com/tidb/stable/overview/"
                className="border-white"
              >
                TiDB architecture documentation
              </InlineLink>
              .
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(200px,0.35fr)] lg:items-center">
            <div className="max-w-[960px]">
              <h3 className="text-h3-xl leading-tight text-text-inverse">
                TiDB X: The Architecture Behind TiDB Cloud
              </h3>
              <p className="mt-5 text-body-lg leading-relaxed text-carbon-300">
                New TiDB Cloud clusters run on TiDB X, a cloud-native architecture built on two
                separations. First, compute is separated from storage: data lives in durable object
                storage, hot data is cached next to compute, and compute follows the work. On TiDB
                Cloud Starter, an idle database&rsquo;s compute goes to zero while its data stays in
                storage. Second, compute is separated from compute: heavy background work like index
                builds, statistics, and compaction runs on its own resources, so it does not slow
                down transactions. Scaling is 5&ndash;10x faster than classic TiDB, and backups
                finish in seconds regardless of data volume.
              </p>
              <div className="mt-8">
                <SecondaryButton href="https://docs.pingcap.com/tidbcloud/tidb-x-architecture/">
                  Read the TiDB X Architecture Docs
                </SecondaryButton>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/what-is-tidb/tidb-x-logo.png"
                alt="TiDB X logo"
                width={300}
                height={275}
                className="h-auto w-32 lg:w-[220px]"
              />
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'primary',
            spacing: 'section',
          }}
        >
          <FeatureGridSection
            title="Key Capabilities"
            subtitle="TiDB combines the familiarity of MySQL with the scale of a distributed system, and adds the analytical and vector engines that AI workloads need. These are the core capabilities that make that possible."
            features={capabilities}
            columns={3}
            itemLayout="vertical"
          />
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'primary',
            spacing: 'section',
          }}
        >
          <FeatureCardSection
            title="Common Use Cases"
            subtitle="From AI agent platforms to financial infrastructure, TiDB powers production workloads where scale, consistency, and uptime are non-negotiable."
            items={useCases}
            columns={2}
          />
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'primary',
            spacing: 'section',
          }}
        >
          <SectionHeader
            title="Who Uses TiDB"
            subtitle="AI-native companies and global enterprises run TiDB in production."
            h2Size="sm"
            align="left"
          />

          <div className="mt-10 space-y-5">
            <LogoCloudSection
              logos={companyLogos}
              variant="minimal"
              align="left"
              autoScroll={false}
              logoClassName="h-6"
              className="!space-y-0"
            />
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-2">
            {customerStories.map((story) => (
              <CustomerStoryCard key={story.company} {...story} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'primary',
            spacing: 'section',
          }}
        >
          <SectionHeader
            title={'Analyst and Peer\nRecognition'}
            subtitle="Independent reviewers and the open source community back TiDB’s track record."
            h2Size="sm"
            align="left"
            className="max-w-[760px]"
          />

          <div className="mt-12 space-y-4">
            {recognitionCards.map((card) => (
              <RecognitionCard key={card.title} {...card} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'brand-violet',
            spacing: 'section',
            className: 'overflow-hidden',
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.42fr)_minmax(280px,0.58fr)] lg:items-center">
            <div className="max-w-[960px]">
              <SectionHeader
                title="TiDB vs. Traditional and Fragmented Data Stacks"
                h2Size="sm"
                align="left"
              />
              <p className="text-body-2xl text-carbon-200">
                If you’re running MySQL or PostgreSQL today, you already know the pattern. Your
                application grows, your data grows, and eventually a single database server can’t
                keep up. The conventional playbook (read replicas, manual sharding, a separate
                analytics warehouse connected by ETL pipelines) adds layers of complexity that
                compound over time. Every new shard means new routing logic in your application.
                Every analytics query runs on data that’s at least minutes old. Every failover event
                is a manual scramble.
              </p>
              <p className="mt-8 text-body-2xl text-carbon-200">
                TiDB eliminates these layers. Because it’s a distributed SQL database with MySQL
                wire-protocol compatibility, you keep writing standard SQL against a
                MySQL-compatible interface. But behind that interface, TiDB distributes your data
                automatically, scales horizontally without sharding, runs real-time analytics on
                live transactional data, and fails over automatically with no data loss. You don’t
                migrate to a different paradigm. You migrate to a better architecture for the same
                paradigm.
              </p>
              <p className="mt-8 text-body-2xl text-carbon-200">
                AI applications add more layers. Teams often run a vector database for embeddings, a
                cache for session state, and a warehouse for analytics, each with its own sync jobs
                and consistency model. TiDB keeps operational data, vectors, and analytics in one
                distributed SQL database, so an agent can retrieve context and write its result in
                the same transaction. The same architecture runs systems of record for companies
                like Atlassian and millions of databases created by AI agents.
              </p>
              <div className="mt-10">
                <PrimaryButton href="https://www.pingcap.com/compare/">
                  See How TiDB Compares
                </PrimaryButton>
              </div>
            </div>

            <ComparisonGraphic />
          </div>
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'primary',
            spacing: 'section',
          }}
        >
          <FeatureHighlightsSection
            title="Get Started with TiDB"
            subtitle="Choose the path that best fits your workflow."
            items={getStartedCards}
            columns={4}
          />
        </SectionWrapper>

        <SectionWrapper
          contentWidth="md"
          style={{
            background: 'brand-violet',
            spacing: 'section',
            backgroundImage: {
              image: { url: '/images/what-is-tidb/cta-bg.svg' },
            },
            backgroundImageOpacityClassName: 'opacity-100',
          }}
        >
          <div className="flex justify-center">
            <div className="text-left">
              <h2 className="text-h2-mb text-text-inverse">Want to Talk to An Expert?</h2>
              <p className="mt-6 text-body-2xl leading-relaxed">
                Book a meeting to discuss your specific use case with our solutions engineering
                team.
              </p>
              <div className="mt-10">
                <PrimaryButton href="https://www.pingcap.com/contact-us/">
                  Book Meeting
                </PrimaryButton>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper
          style={{
            background: 'primary',
            spacing: 'section',
          }}
        >
          <FaqSection title="TiDB Frequently Asked Questions" items={faqs} />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
