import Image from 'next/image'
import { Header, Footer, JsonLd, SectionWrapper, FeatureMediaSection } from '@/components'
import {
  CaseCards,
  CtaBand,
  Intro,
  ResourcesRow,
  SeeTidbInAction,
  SolutionHero,
  WorkloadCards,
  withMediaText,
  type WorkloadItem,
} from '../_components/shared'
import { solutionMetadata, solutionSchema } from '../_components/meta'

const PATH = '/solutions/fintech/'
const TITLE = 'Scalable Databases for Fintech Apps | TiDB by PingCAP'
const DESCRIPTION =
  'Discover TiDB’s cloud-native, distributed SQL database for fintech apps—real-time, reliable, and infinitely scalable for payments, fraud detection, and more.'

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'Fintech')

const VECTOR_SEARCH_URL = 'https://www.pingcap.com/ai/vector-search/'

const workloads: WorkloadItem[] = [
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/17001522/Payments.svg',
      alt: 'Payments',
    },
    title: 'Powering Modern Payment Processing Systems',
    body: 'Deliver instant, reliable transactions on a globally scalable foundation. TiDB’s distributed SQL architecture ensures high availability, low latency, and ACID consistency even during traffic surges or cross-border settlements.',
    links: [
      {
        text: 'Download White Paper',
        href: 'https://static.pingcap.com/files/2024/10/23001020/Revolutionizing_payments_with_TiDB.pdf',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/17001605/Trade-exchanges.svg',
      alt: 'Trade exchanges',
    },
    title: 'Distributed SQL for Trading and Transaction Platforms',
    body: 'Maintain precision and performance when markets move fast. TiDB scales linearly and supports complex, high-volume operations with guaranteed consistency and millisecond response, powering both live trading and post-trade reporting.',
    links: [
      {
        text: 'Download White Paper',
        href: 'https://static.pingcap.com/files/2024/10/17004140/Scaling_cryptocurrency_exchanges_with_TiDB_whitepaper.pdf',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/17001707/Web3-infrastructure.svg',
      alt: 'Web3 infrastructure',
    },
    title: 'Cloud-Native Database for Web3 and Digital Assets',
    body: 'Support the next wave of financial innovation with a resilient, cloud-native data layer. TiDB keeps Web3 wallets, exchanges, and blockchain-backed transactions fast, auditable, and always on, with the security and compliance standards modern fintech demands.',
    links: [
      {
        text: 'Download White Paper',
        href: 'https://static.pingcap.com/files/2024/10/17004258/Web3_data_infrastructure_whitepaper.pdf',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/17001731/Fraud-detection.svg',
      alt: 'Fraud detection',
    },
    title: 'Fraud and Risk Analysis on Current Data',
    body: 'Stay ahead of fraud with real-time insight and instant action. TiDB scores risk on live transactions as they land, combining analytics and consistency to catch anomalies early. With native vector search, you can compare each new payment against known fraud patterns by similarity, in the same database that holds the ledger, so there is no separate vector store to keep in sync.',
    links: [
      {
        text: 'Download White Paper',
        href: 'https://static.pingcap.com/files/2024/10/23001123/Implementing-Real-Timefraud_detection_with_TiDB.pdf',
      },
      { text: 'Explore vector search on TiDB', href: VECTOR_SEARCH_URL },
    ],
  },
]

const steps = [
  {
    icon: 'https://static.pingcap.com/files/2025/11/17180917/step-1.svg',
    alt: 'Connect Data Sources icon',
    title: 'Step 1: Connect Data Sources',
    body: 'Connect payment gateways, ledgers, or event streams.',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/11/17180918/step-2.svg',
    alt: 'Deploy TiDB Cloud icon',
    title: 'Step 2: Deploy TiDB Cloud',
    body: 'Launch a fully managed, scalable cluster in minutes.',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/11/17180920/step-3.svg',
    alt: 'Migrate or Stream Data icon',
    title: 'Step 3: Migrate or Stream Data',
    body: 'Move workloads without downtime or disruption.',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/11/17180921/step-4.svg',
    alt: 'Analyze in Real Time icon',
    title: 'Step 4: Analyze in Real Time',
    body: 'Run analytics and risk detection on live data.',
  },
  {
    icon: 'https://static.pingcap.com/files/2025/11/17180922/step-5.svg',
    alt: 'Scale and Govern Securely icon',
    title: 'Step 5: Scale and Govern Securely',
    body: 'Expand seamlessly while meeting security and compliance standards.',
  },
]

const capabilities = [
  {
    title: 'Horizontal Scalability and High Availability Architecture',
    description:
      'Scale effortlessly as your transaction volume increases while keeping operations uninterrupted. TiDB’s distributed SQL architecture delivers both elastic scalability and enterprise-grade reliability, with up to 99.99% availability proven in production across mission-critical financial systems.',
    image: {
      image: {
        url: 'https://static.pingcap.com/files/2024/10/17001926/Unparalleled-Scalability-Illus.svg',
      },
      alt: 'Unparalleled Scalability Illus',
      width: 450,
      height: 375,
    },
  },
  {
    title: 'Real-Time Data Processing and Analytics',
    description:
      'Access live transactional data for instant insights into risk, performance, and customer behavior. TiDB’s hybrid transactional and analytical processing (HTAP) engine eliminates ETL delays, giving your teams accurate insight in milliseconds.',
    image: {
      image: {
        url: 'https://static.pingcap.com/files/2024/10/17002019/Reliable-Operations-Illustration.svg',
      },
      alt: 'Real-Time Insights Illustration',
      width: 450,
      height: 375,
    },
  },
  {
    title: 'Always-On Reliability for Financial Data Infrastructure',
    description:
      'Keep every service running and every transaction consistent, even during maintenance or upgrades. With automatic failover and strong consistency, TiDB helps fintech teams maintain trust, compliance, and business continuity at global scale.',
    image: {
      image: {
        url: 'https://static.pingcap.com/files/2024/10/17002114/Robust-Security-Illustration-1.svg',
      },
      alt: 'HA and Reliability Illustration',
      width: 450,
      height: 375,
    },
  },
]

const cases = [
  {
    logo: { src: 'https://static.pingcap.com/files/2024/10/17003046/PLAID-logo.png', alt: 'PLAID' },
    title: 'Multi-tenant MySQL',
    body: '99.99% uptime and increased developer velocity.',
    href: 'https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/',
  },
  {
    logo: {
      src: 'https://static.pingcap.com/files/2024/10/17002515/elestyle.png',
      alt: 'elestyle',
    },
    title: 'Cloud Scalability',
    body: 'Enhanced data handling and instant analytics for multi-payment services.',
    href: 'https://www.pingcap.com/case-study/elestyle-tidb-cloud-for-scalability-and-real-time-reporting/',
  },
  {
    logo: {
      src: 'https://static.pingcap.com/files/2024/12/03004537/SBPS-logo-white.png',
      alt: 'SBPS-logo-white',
    },
    title: 'Zero-Downtime Scaling',
    body: 'Ensuring seamless performance and reliability for the growing payment systems.',
    href: 'https://www.pingcap.com/case-study/sb-payment-service-adopts-distributed-sql-for-zero-downtime-scaling/',
  },
  {
    logo: {
      src: 'https://static.pingcap.com/files/2024/10/24191914/Top-10-global-bank.png',
      alt: 'Top 10 global bank',
    },
    title: 'Anti-Money Laundering',
    body: 'Managing billions of transactions and millions of live queries.',
    href: 'https://www.pingcap.com/case-study/htap-databases-in-anti-money-laundering-scenarios/',
  },
  {
    logo: {
      src: 'https://static.pingcap.com/files/2024/10/07234638/chainbase.svg',
      alt: 'chainbase',
    },
    title: 'Web3 Data Infrastructure',
    body: 'Slashed Web3 infra costs by 50% with efficient, scalable database solutions.',
    href: 'https://www.pingcap.com/case-study/chainbase-reduced-web3-infra-costs-50-with-tidb/',
  },
]

export default function FintechPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionHero
          headline="Reliable Data Platform to Drive Fintech Innovation"
          subheadline="Accelerate innovation and lead the future of fintech with TiDB’s cloud-native, distributed SQL database built for resilience, real-time insight, and seamless scalability."
          primaryCta={{
            text: 'Get Datasheet',
            href: 'https://static.pingcap.com/files/2025/12/01193453/TiDB_Fintech_One-Pager_new.pdf',
          }}
          secondaryCta={{ text: 'Book a Demo', href: '#demo' }}
          backgroundUrl="https://static.pingcap.com/files/2024/10/01193329/Header-image-Fintech.svg"
        />

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              eyebrow="Relevant workloads"
              title="Built for Fintech’s Critical Workloads"
              paragraphs={[
                'TiDB supports the most demanding fintech applications with unparalleled efficiency and scalability. From payments and trading to fraud detection and digital assets, TiDB delivers fast transactions, global scale, and strong security and consistency.',
              ]}
            />
            <WorkloadCards items={workloads} />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-16">
            <Intro title="How TiDB Simplifies Fintech Adoption" />
            <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
              {steps.map((step) => (
                <li
                  key={step.title}
                  className="flex flex-col gap-4 border-t border-carbon-700 pt-6"
                >
                  <Image
                    src={step.icon}
                    alt={step.alt}
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
                  <h3 className="text-h3-lg font-bold leading-normal m-0">{step.title}</h3>
                  <p className="text-body-md leading-relaxed text-secondary m-0">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'inverse' }}>
          <div className="space-y-16">
            <Intro eyebrow="Key Capabilities" title="Why Fintech Leaders Choose TiDB" />
            <FeatureMediaSection items={capabilities.map(withMediaText)} startPosition="right" />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-top' }}>
          <div className="space-y-16">
            <Intro
              title="Proven Results with Fintech Innovators"
              size="sm"
              paragraphs={[
                'Discover how leading fintech companies have harnessed the power of TiDB to drive innovation, enhance operational efficiency, and secure their transactions',
              ]}
            />
            <CaseCards items={cases} />
          </div>
        </SectionWrapper>

        <ResourcesRow title="Resources to Fuel your TiDB Journey" />
        <CtaBand title="Get Up & Running With Your First TiDB Cluster in Minutes" />
        <SeeTidbInAction />
      </main>
      <Footer />
    </>
  )
}
