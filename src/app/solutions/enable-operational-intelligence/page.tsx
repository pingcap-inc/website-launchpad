import Image from 'next/image'
import { Bot, Minus } from 'lucide-react'
import {
  Header,
  Footer,
  JsonLd,
  SectionWrapper,
  FeatureCardSection,
  InlineLink,
} from '@/components'
import {
  CustomerRatingQuotes,
  IconGrid,
  Intro,
  LogoRow,
  ResourcesRow,
  SeeTidbInAction,
  SolutionHero,
} from '../_components/shared'
import { solutionMetadata, solutionSchema } from '../_components/meta'

const PATH = '/solutions/enable-operational-intelligence/'
const TITLE = 'TiDB: The Cloud-Native Operations Data Store'
const DESCRIPTION =
  'Empower real-time analytics and operational intelligence with TiDB’s unified, scalable data store for hybrid and multi-cloud environments.'

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'Enable Operational Intelligence')

const whyItems = [
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
]

const meetItems = [
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/10230603/effortless-scaling.svg',
      alt: 'effortless scaling',
    },
    title: 'Effortless Scaling',
    body: 'Support the dynamic growth of customer data with a distributed scale-out architecture that can scale both reads and writes seamlessly.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/10230636/built-in-resilience.svg',
      alt: 'built-in resilience',
    },
    title: 'Built-In Resiliency',
    body: 'Ensure uninterrupted access to customer data with high availability, disaster recovery, point-in-time recovery (PiTR), backup and restore, and multi-availability zone (AZ) failover.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/10230706/Agile-data-platform.svg',
      alt: 'Agile data platform',
    },
    title: 'Agile Data Platform',
    body: 'Development teams can build new apps 3-5x faster with online schema changes and flexible indices while reducing complexity.',
  },
  {
    icon: { src: 'https://static.pingcap.com/files/2024/11/10230737/APIs.svg', alt: 'APIs' },
    title: 'Extensible APIs',
    body: 'MySQL wire protocol compatibility plus connectors to Apache Spark, Apache Kafka, Kubernetes and more.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/10230816/Multi-cloud-enabled.svg',
      alt: 'Multi-cloud enabled',
    },
    title: 'Hybrid and Multi-Cloud Enabled',
    body: 'Deploy database clusters anywhere in the world, in public, private, and hybrid cloud environments on VMs, containers, or bare metal.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/10230901/enterprise-grade-security.svg',
      alt: 'enterprise-grade security',
    },
    title: 'Enterprise-Grade Security',
    body: 'Encrypt data both in-flight and at-rest.',
  },
]

const analyticsItems = [
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
]

const COMPARE_COLUMNS = [
  'Larger Data Volumes',
  'High Concurrency',
  'No System Downtime',
  'Increased Development Velocity',
]
const COMPARE_ROWS: { label: string; tidb?: boolean; checks: boolean[] }[] = [
  { label: 'Relational Database', checks: [false, false, false, true] },
  { label: 'Database Sharding', checks: [true, true, false, false] },
  { label: 'NoSQL Database', checks: [true, true, true, false] },
  { label: 'Data Warehouse / Data Lake', checks: [true, false, true, false] },
  { label: 'TiDB', tidb: true, checks: [true, true, true, true] },
]

const provenItems = [
  {
    icon: { src: 'https://static.pingcap.com/files/2024/11/09034845/Trust.svg', alt: 'Trust' },
    title: 'Trusted by Industry Leaders',
    body: 'From fast-scaling SaaS platforms to global financial institutions, TiDB enables operational workloads with reliability and velocity.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/09034912/Security-and-governance.svg',
      alt: 'Security-and-governance',
    },
    title: 'Enterprise-Grade Security and Governance',
    body: 'Data encryption, access controls, auditing, and compliance for regulated environments.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/09034936/integration.svg',
      alt: 'integration',
    },
    title: 'Seamless Integration Across Your Stack',
    body: 'Works with existing CDC pipelines, data lakes, analytics engines, observability tools, and internal services.',
  },
]

function UseCaseLogo({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <div className="flex h-12 items-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto max-h-12 w-auto max-w-[200px]"
      />
    </div>
  )
}

/**
 * PLACEHOLDER: the other use-case cards show a customer logo. This card has no
 * logo or icon yet, so it shows a neutral icon until design supplies one.
 */
const AGENT_CARD_LOGO_PLACEHOLDER = (
  <div
    className="flex h-12 w-12 items-center justify-center border border-dashed border-carbon-700 text-secondary"
    aria-hidden="true"
    data-placeholder="ops-agent-card-logo"
  >
    <Bot strokeWidth={1.5} className="h-7 w-7" />
  </div>
)

const VECTOR_SEARCH_URL = 'https://www.pingcap.com/ai/vector-search/'
// NOTE: CTA target may move to /solutions/ai-agent-context/ (decision pending).
const AGENT_CONTEXT_CTA_HREF = 'https://www.pingcap.com/ai/agentic-ai/'

const useCases = [
  {
    icon: (
      <UseCaseLogo
        src="https://static.pingcap.com/files/2025/05/06194518/DELHIVERY%402x.png"
        alt="DELHIVERY"
        width={481}
        height={100}
      />
    ),
    title: 'Real-Time Analytics for E-commerce & SaaS',
    description:
      'Power inventory visibility, personalization engines, usage tracking, and operational dashboards.',
    href: '/blog/delhiverys-data-marts-migration-journey-from-oltp-to-htap/',
    ctaText: 'Explore This Use Case',
  },
  {
    icon: (
      <UseCaseLogo
        src="https://static.pingcap.com/files/2024/10/17002515/elestyle.png"
        alt="elestyle"
        width={641}
        height={146}
      />
    ),
    title: 'Transactional and Analytical Processing for Fintech',
    description:
      'Support real-time fraud detection, risk scoring, compliance processing, and ledger operations.',
    href: '/case-study/elestyle-tidb-cloud-for-scalability-and-real-time-reporting/',
    ctaText: 'Explore This Use Case',
  },
  {
    icon: (
      <UseCaseLogo
        src="https://static.pingcap.com/files/2025/03/26070714/Catalyst.svg"
        alt="Catalyst"
        width={200}
        height={48}
      />
    ),
    title: 'Operational Data Unification for Cloud-Native Enterprises',
    description:
      'Bring transactional, event, and operational metrics together into one scalable platform.',
    href: '/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
    ctaText: 'Explore This Use Case',
  },
  {
    icon: AGENT_CARD_LOGO_PLACEHOLDER,
    title: 'Operational Context and State for AI Agents',
    description: (
      <>
        Give AI agents and LLM apps business context and a durable record of their work. Query
        operational records with SQL, retrieve context with{' '}
        <InlineLink href={VECTOR_SEARCH_URL}>vector search</InlineLink>, and save results and
        checkpoints with ACID transactions.
      </>
    ),
    href: AGENT_CONTEXT_CTA_HREF,
    ctaText: 'Explore Agent Context and State',
  },
]

export default function OperationalIntelligencePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionHero
          headline="TiDB — The Cloud-Native Operations Data Store for Real-Time Intelligence"
          subheadline="Power every workflow with fast, reliable access to operational data. TiDB gives you real-time visibility, elastic performance, and resilience across any environment."
          primaryCta={{
            text: 'Get Solution Brief',
            href: 'https://static.pingcap.com/files/2024/11/14044554/Solution-Brief-Enable-Operational-Intelligence-with-TiDB.pdf',
          }}
          secondaryCta={{
            text: 'Book a Demo',
            href: '/solutions/enable-operational-intelligence/#demo',
          }}
          backgroundUrl="https://static.pingcap.com/files/2024/11/10225735/banner.svg"
        />

        <SectionWrapper>
          <LogoRow
            title="The Trusted Data Serving Layer for 1000s of Customers Globally"
            logos={[
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
            ]}
          />
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              align="center"
              title="Why Modern Businesses Need an Operations Data Store"
              paragraphs={[
                'Legacy systems can hold companies back from realizing the full potential of their data. Monolithic codebases, complex app dependencies, and outdated development processes constantly hinder business innovation.',
              ]}
            />
            <IconGrid items={whyItems} columns={3} iconSize={120} />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-16">
            <Intro
              title="Meet TiDB — The Unified Data Layer for Operational Intelligence"
              paragraphs={[
                'An operational data store centrally integrates and organizes siloed enterprise data, making it instantly available to consuming applications. TiDB serves as the ideal distributed database to power this architecture. It consolidates data from various source systems, integrates it on the fly, and delivers up-to-the-minute insights for enhanced business performance.',
              ]}
            />
            <IconGrid items={meetItems} columns={2} iconSize={40} horizontal />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              title="Real-Time Analytics at Enterprise Scale"
              paragraphs={[
                'Run operational dashboards, anomaly detection models, and live analytical workloads on the same consistent data source powering your mission-critical transactions.',
              ]}
            />
            <IconGrid items={analyticsItems} columns={3} iconSize={96} />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="p-4" />
                    {COMPARE_COLUMNS.map((c) => (
                      <th key={c} scope="col" className="p-4 text-body-md font-bold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-carbon-800">
                      <th scope="row" className="p-4 text-body-md font-bold">
                        {row.tidb ? (
                          <Image
                            src="https://static.pingcap.com/files/2024/11/04011451/logo-TiDB.svg"
                            alt="TiDB"
                            width={80}
                            height={32}
                            className="h-8 w-auto"
                          />
                        ) : (
                          row.label
                        )}
                      </th>
                      {row.checks.map((ok, i) => (
                        <td key={COMPARE_COLUMNS[i]} className="p-4">
                          {ok ? (
                            <Image
                              src="https://static.pingcap.com/files/2024/11/04012428/check.svg"
                              alt="Yes"
                              width={24}
                              height={24}
                              className="h-6 w-6"
                            />
                          ) : (
                            <Minus
                              strokeWidth={1.5}
                              className="h-6 w-6 text-carbon-700"
                              aria-label="No"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-body-sm text-secondary md:hidden">Swipe right to see more →</p>
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-16">
            <Intro
              title="Proven Enterprise Data Platform"
              paragraphs={[
                'TiDB powers mission-critical operations for enterprises across finance, logistics, SaaS, telecom, and retail.',
              ]}
            />
            <IconGrid items={provenItems} columns={3} iconSize={96} />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <FeatureCardSection
            title="Common Use Cases for TiDB as an Operations Data Store"
            subtitle="TiDB powers mission-critical operations for enterprises across finance, logistics, SaaS, telecom, and retail."
            columns={2}
            items={useCases}
          />
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gray' }}>
          <CustomerRatingQuotes
            items={[
              {
                logo: {
                  src: 'https://static.pingcap.com/files/2024/11/06192722/catayst.svg',
                  alt: 'Catalyst',
                },
                quote:
                  '“TiDB has helped us meet our business goals in terms of data availability to our customers. We now get very fast query times from TiDB, which allows us to provide correct data to our customers with very low latency.”',
                name: 'Andy Trimble,',
                role: 'Principal Software Engineer',
                href: '/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
              },
              {
                logo: {
                  src: 'https://static.pingcap.com/files/2024/11/06192726/pingan.svg',
                  alt: 'PingAn',
                },
                quote:
                  '“TiDB greatly improves the efficiency of our application development. It performs well in steady-state business scenarios. TiDB’s also an ideal choice in agile business scenarios.”',
                name: 'Developer Team,',
                role: 'Jin Guanjia',
                href: '/case-study/how-chinas-insurance-giant-improved-agile-application-performance-with-a-newsql-database/',
              },
              {
                logo: {
                  src: 'https://static.pingcap.com/files/2024/11/06192729/streak.svg',
                  alt: 'Streak',
                },
                quote:
                  '“TiDB enables Streak users to share emails and metadata effortlessly, and enables our developers to move faster than ever before.”',
                name: 'Fred Wulff,',
                role: 'VP of Engineering',
                href: '/case-study/streak-find-out-why-streak-built-its-realtime-crm-using-tidb/',
              },
            ]}
          />
        </SectionWrapper>

        <ResourcesRow title="Resources to Fuel Your TiDB Journey" />
        <SeeTidbInAction />
      </main>
      <Footer />
    </>
  )
}
