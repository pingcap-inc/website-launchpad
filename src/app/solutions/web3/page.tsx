import {
  Header,
  Footer,
  JsonLd,
  SectionWrapper,
  StatsSection,
  FaqSection,
  FeatureHighlightsSection,
} from '@/components'
import type { ColorCardItem } from '@/components/sections/FeatureHighlightsSection'
import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'
import {
  Intro,
  SeeTidbInAction,
  SolutionHero,
  WorkloadCards,
  type WorkloadItem,
} from '../_components/shared'
import { solutionMetadata, solutionSchema } from '../_components/meta'

const PATH = '/solutions/web3/'
const TITLE = 'Web3 Database for Exchanges & Digital Assets | TiDB'
const DESCRIPTION =
  'Web3 database for exchanges, wallets, and digital assets. TiDB brings distributed SQL, real-time analytics, and zero data loss to volatile markets.'

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)

const faqs = [
  {
    q: 'What database do crypto exchanges use?',
    a: 'Many exchanges run distributed SQL databases like TiDB to handle order histories, reconciliation, and risk control at scale. A single TiDB cluster stores post-matching orders under sustained write concurrency and serves long-range historical queries without sharding. One exchange on TiDB writes over 100 million orders a day and extended its historical query window from three months to more than a year.',
  },
  {
    q: 'Can TiDB handle on-chain and multi-chain data?',
    a: 'Yes. TiDB ingests and indexes data across multiple chains on one cluster, then runs K-line, DeFi, and trend aggregations against the same data with no separate warehouse. Its HTAP engine serves transactional writes and analytical reads together, which removes the ETL pipeline most on-chain platforms build. One multi-chain insights platform processes more than 250 million transactions a day on TiDB and cut query latency from seconds to milliseconds.',
  },
  {
    q: 'How does TiDB scale for high-growth Web3 workloads?',
    a: 'TiDB scales storage and compute independently by adding nodes, with no database or table sharding and no downtime. Production Web3 clusters have grown from 30 TB to 1 PB on a single deployment, with individual tables above 10 billion rows. Because scaling is horizontal, teams avoid the sharding redesign that MySQL and PostgreSQL deployments hit as data grows.',
  },
  {
    q: 'Does TiDB guarantee data consistency for financial-grade workloads?',
    a: 'Yes. TiDB uses the Raft consensus protocol to replicate data synchronously across three availability zones, and every node is active-active. Within a region, a zone failure loses zero committed data (RPO = 0), and distributed ACID transactions keep balances and reconciliation correct across systems. One exchange kept service running through a single-zone outage with no data loss.',
  },
  {
    q: 'Can I keep Web3 data in my own environment?',
    a: 'Yes. TiDB offers a Bring Your Own Cloud (BYOC) deployment where the data plane runs inside your own VPC while PingCAP manages the control plane. This gives you data sovereignty and managed operations at the same time, which is why BYOC is the recommended model for most Web3 platforms. Fully managed TiDB Cloud and self-managed deployments are also available.',
  },
]

const schema = solutionSchema(
  PATH,
  TITLE,
  DESCRIPTION,
  'Web3',
  faqs.map((f) => ({ question: f.q, answer: typeof f.a === 'string' ? f.a : '' }))
)

const stats = [
  {
    value: '100M+',
    description: 'orders written per day on a single cluster',
    valueClassName: 'md:text-h3-xl text-brand-red-light',
  },
  {
    value: '250M+',
    description: 'transactions processed daily across chains',
    valueClassName: 'md:text-h3-xl text-brand-violet-light',
  },
  {
    value: '30 TB–1 PB',
    description: 'on one deployment, tables above 10B rows',
    valueClassName: 'md:text-h3-xl text-brand-blue-light',
  },
  {
    value: 'RPO = 0',
    description: 'zero committed data lost through a zone outage',
    valueClassName: 'md:text-h3-xl text-brand-teal-light',
  },
]

const workloads: WorkloadItem[] = [
  {
    icon: {
      src: 'https://static.pingcap.com/files/2026/07/28201305/Frame-1.svg',
      alt: 'Real-time on-chain analytics',
    },
    borderColor: 'border-brand-teal-medium',
    title: 'Real-Time On-Chain Analytics Without a Warehouse Stack',
    body: 'Ingest and index multi-chain data, then run K-line, DeFi, and trend aggregations on the same cluster. TiDB replaces the multi-layer data warehouse pipeline, and HTAP serves writes and analytics with no ETL.',
    links: [
      {
        text: 'Read the Web3 Data Infrastructure Guide',
        href: 'https://static.pingcap.com/files/2024/10/17004258/Web3_data_infrastructure_whitepaper.pdf',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2026/07/28213956/Frame-2.svg',
      alt: 'High-concurrency wallets',
    },
    borderColor: 'border-brand-violet-medium',
    title: 'High-Concurrency Wallets With Strong Consistency',
    body: 'Serve asset management, transaction history, and behavioral analytics under heavy read and write load, with strong consistency for every balance.',
    links: [
      {
        text: 'Blitzscaling Your Web3 Business',
        href: 'https://static.pingcap.com/files/2022/12/05212651/Whitepaper_Blitzscaling-Your-Web3-Business-with-an-HTAP-Database.pdf',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2026/07/28213946/Frame-3.svg',
      alt: 'Order histories that scale',
    },
    borderColor: 'border-brand-blue-medium',
    title: 'Order Histories That Scale Without Sharding',
    body: 'Store post-matching orders and serve long-range historical queries under sustained write concurrency. Raft-based replication keeps data strongly consistent, and horizontal scaling removes the sharding redesign.',
    links: [
      {
        text: 'Get the Exchange Scaling White Paper',
        href: 'https://static.pingcap.com/files/2024/10/17004140/Scaling_cryptocurrency_exchanges_with_TiDB_whitepaper.pdf',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2026/07/28213950/Frame-4.svg',
      alt: 'Real-time reconciliation',
    },
    borderColor: 'border-brand-red-medium',
    title: 'Real-Time Reconciliation on a Unified View',
    body: 'Reconcile funds across systems, detect anomalies, and run risk analysis on one consistent dataset, with no cross-database queries and no ETL lag. Distributed ACID transactions hold the data correct.',
    links: [
      {
        text: 'Read the Reconciliation Architecture Guide',
        href: 'https://static.pingcap.com/files/2024/10/17004140/Scaling_cryptocurrency_exchanges_with_TiDB_whitepaper.pdf',
      },
    ],
  },
]

const reasonTabs = [
  {
    id: 'scalability',
    label: 'Elastic Scalability Without Sharding',
    description:
      'Scale storage and compute independently as data and traffic grow, with no database or table sharding and no downtime. Consumption-based pricing means you pay for real usage, not for peak-load headroom that sits idle. Teams report up to 50% lower total cost of ownership versus sharded MySQL deployments. Production clusters have grown from 30 TB to 1 PB on a single deployment.',
    image: {
      image: { url: 'https://static.pingcap.com/files/2026/07/24040150/graphic-container.svg' },
      alt: 'Elastic scalability without sharding',
      width: 600,
      height: 450,
    },
  },
  {
    id: 'analytics',
    label: 'Real-Time Analytics on Live Data',
    description:
      'TiDB’s hybrid transactional and analytical processing (HTAP) engine routes each query to a row or columnar engine automatically, so reconciliation, risk, and market analytics read live transactional data. There is no ETL pipeline and no replication lag between systems.',
    image: {
      image: { url: 'https://static.pingcap.com/files/2026/07/24040250/graphic-container-1.svg' },
      alt: 'Real-time analytics on live data',
      width: 600,
      height: 450,
    },
  },
  {
    id: 'reliability',
    label: 'Always-On Reliability for Financial-Grade Data',
    description:
      'TiDB replicates synchronously across three availability zones through the Raft consensus protocol, with every node active-active. Within a region, a zone failure loses zero committed data, and cross-region replication covers disaster recovery.',
    image: {
      image: { url: 'https://static.pingcap.com/files/2026/07/24040330/graphic-container-2.svg' },
      alt: 'Always-on reliability for financial-grade data',
      width: 600,
      height: 450,
    },
  },
]

// No icon or CTA on these cards — matches the live page.
const deployments: ColorCardItem[] = [
  {
    variant: 'red',
    title: 'TiDB Cloud',
    description:
      'Fully managed distributed SQL with consumption-based scaling. The fastest path to production.',
  },
  {
    variant: 'violet',
    title: 'Bring Your Own Cloud (BYOC)',
    description:
      'The data plane runs inside your own VPC while TiDB manages the control plane. Data sovereignty with managed operations.',
  },
  {
    variant: 'blue',
    title: 'Self-Managed with Enterprise Support',
    description:
      'Deploy open-source TiDB on your own infrastructure with an enterprise support subscription.',
  },
]

export default function Web3Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionHero
          headline={
            <>
              {/* Gradient first line, white second line — as on the live page. */}
              <span className="bg-gradient-to-r from-brand-red-light to-brand-blue-light bg-clip-text text-transparent">
                The Web3 Database
              </span>
              <br />
              Built for Market Volatility
            </>
          }
          subheadline="Power exchanges, perpetual DEXs, wallets, and on-chain data platforms with TiDB, the Web3 database that brings distributed SQL, real-time analytics, and zero data loss to volatile markets."
          primaryCta={{ text: 'Book a Demo', href: '#demo' }}
          secondaryCta={{ text: 'Explore TiDB Cloud', href: 'https://tidbcloud.com/free-trial/' }}
          backgroundUrl="https://static.pingcap.com/files/2026/07/28200048/1000011784.png"
        />

        <SectionWrapper>
          <div className="space-y-10">
            {/* A sentence, so not a heading tag (repo heading rule); styled to match live. */}
            <p className="mx-auto max-w-4xl text-center text-h3-lg md:text-h3-xl font-bold m-0">
              Trusted by leading exchanges, including operators among the world’s top 10 by trading
              volume
            </p>
            <StatsSection stats={stats} columns={4} bordered />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-16">
            <Intro
              title="Built for Web3’s Critical Workloads"
              align="center"
              paragraphs={[
                'TiDB runs the transactional and analytical workloads behind Web3, from on-chain analytics and wallet systems to exchange order histories and reconciliation, on one distributed SQL engine with strong consistency and no sharding.',
              ]}
            />
            <WorkloadCards items={workloads} />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <FeatureTabsSection
            title="Why Web3 Platforms Choose TiDB"
            tabs={reasonTabs.map((t) => ({
              ...t,
              // Live repeats the tab name as a large heading above the description.
              content: (
                <>
                  <h3 className="text-h3-xl md:text-h2-mb font-bold leading-tight mb-6">
                    {t.label}
                  </h3>
                  <p className="text-body-lg text-secondary leading-relaxed m-0">{t.description}</p>
                </>
              ),
            }))}
          />
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            {/* Live sizes this heading smaller (42px) than the other section titles. */}
            <Intro
              title="Deployment Models That Respect Data Sovereignty"
              align="center"
              size="xs"
            />
            {/* Spacing measured on live: 16px sides, title 40px from top, ~46px below body. */}
            <FeatureHighlightsSection
              items={deployments}
              columns={3}
              cardClassName="px-4 pt-10 pb-12"
            />
          </div>
        </SectionWrapper>

        <SeeTidbInAction />

        <SectionWrapper>
          <FaqSection title="Web3 Database FAQs" items={faqs} />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
