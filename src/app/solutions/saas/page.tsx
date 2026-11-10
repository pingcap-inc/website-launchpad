import Image from 'next/image'
import { Header, Footer, JsonLd, SectionWrapper } from '@/components'
import { VideoDialog } from '@/components/ui/VideoDialog'
import {
  IconGrid,
  Intro,
  ResourcesRow,
  SeeTidbInAction,
  SolutionHero,
  WorkloadCards,
  DEFAULT_RESOURCES,
  type WorkloadItem,
} from '../_components/shared'
import { CompareTabs, type CompareTab } from '../_components/CompareTabs'
import { solutionMetadata, solutionSchema } from '../_components/meta'

const PATH = '/solutions/saas/'
const TITLE = 'Database for SaaS Applications | TiDB'
const DESCRIPTION =
  'Discover TiDB, the database for SaaS applications that scales effortlessly, cuts costs, and powers real-time analytics. Book your demo today.'

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'SaaS')

/**
 * Replaces the former "Customer 360" card (Nov 2026).
 * PENDING: product marketing may add "real-time view" and/or "RAG" to this body.
 * Change the copy here only; nothing else references it.
 */
const AI_CONTEXT_CARD_BODY =
  'Build assistants and semantic search around tenant and account data. Store embeddings alongside relational data, then combine similarity search and SQL filters to retrieve relevant application context.'

const tabs: CompareTab[] = [
  {
    id: 'data-volume',
    label: 'Data Volume Management',
    problems: ['Customer Data Growth', 'Performance at Scale'],
    value: ['Effortless Scaling', 'Dynamic Storage Growth', 'High-Concurrency Support'],
    images: [
      'https://static.pingcap.com/files/2025/11/10213706/10000110101.svg',
      'https://static.pingcap.com/files/2025/11/10213708/10000110102.svg',
    ],
  },
  {
    id: 'cost',
    label: 'Manage Cost Customer Growth',
    problems: ['Single-Tenant Overhead', 'Resource Inefficiency'],
    value: ['Cost Efficiency', 'Predictable Performance', 'Granular Controls'],
    images: [
      'https://static.pingcap.com/files/2025/11/10211857/1000011010.svg',
      'https://static.pingcap.com/files/2025/11/10213711/10000110114.svg',
    ],
  },
  {
    id: 'ops',
    label: 'Reduce Operational Complexity',
    problems: [
      'Multi-tenant Management Overhead',
      'Performance SLA Management',
      'Resource Monitoring',
      'Disaster Recovery',
    ],
    value: ['Service Continuity', 'Proactive Monitoring', 'Metadata Management'],
    images: [
      'https://static.pingcap.com/files/2025/11/10213715/10000110345.svg',
      'https://static.pingcap.com/files/2025/11/10213713/10000110206.svg',
    ],
  },
  {
    id: 'analytics',
    label: 'Effective Analytics Usage',
    problems: ['Customer Behavior Insights', 'Usage Analytics'],
    value: ['Unified Analytics', 'Instant Insights', 'Future-Ready Capabilities'],
    images: [
      'https://static.pingcap.com/files/2025/11/10213714/10000110297.svg',
      'https://static.pingcap.com/files/2025/11/10213709/10000110108.svg',
    ],
  },
  {
    id: 'security',
    label: 'Multi-tenant Security',
    problems: ['Data Isolation', 'Access Control', 'Active Auditing'],
    value: ['Comprehensive Protection', 'Granular Access Control', 'Complete Audit and Compliance'],
    images: [
      'https://static.pingcap.com/files/2025/11/10213710/10000110109.svg',
      'https://static.pingcap.com/files/2025/11/10213705/1000011040.svg',
    ],
  },
].map((t): CompareTab => ({
  id: t.id,
  label: t.label,
  columns: [
    {
      heading: 'Problems',
      headingStyle: 'label',
      tone: 'red',
      image: t.images[0],
      imageAlt: '',
      items: t.problems,
    },
    {
      heading: 'TiDB Value',
      headingStyle: 'label',
      tone: 'teal',
      image: t.images[1],
      imageAlt: '',
      items: t.value,
    },
  ],
}))

const complexity = [
  {
    problem: {
      title: 'Noisy Neighbors & Performance Drift',
      body: 'Shared systems create unpredictable latency as tenants compete for resources.',
    },
    enables: {
      title: 'Predictable Performance at Scale',
      body: 'Consistent performance and tenant isolation in distributed SQL architecture.',
      icon: 'https://static.pingcap.com/files/2025/12/17000104/predictable-performance.svg',
      alt: 'Predictable Performance',
    },
  },
  {
    problem: {
      title: 'Sharding Becomes Operational Debt',
      body: 'Manual sharding and routing layers become brittle as schemas evolve and data needs to rebalance.',
    },
    enables: {
      title: 'Zero-Downtime Evolution',
      body: 'Online schema changes and distributed DDL without downtime or risk.',
      icon: 'https://static.pingcap.com/files/2025/12/17000112/zero-downtime-evolution.svg',
      alt: 'Zero-Downtime',
    },
  },
  {
    problem: {
      title: 'Metadata & Connection Explosion',
      body: 'Database-per-tenant models drive runaway metadata growth, connection storms, and schema fragility at scale.',
    },
    enables: {
      title: 'Metadata That Scales Horizontally',
      body: 'Horizontally scalable metadata and efficient multi-tenant connection handling.',
      icon: 'https://static.pingcap.com/files/2025/12/17000116/metadata.svg',
      alt: 'Metadata',
    },
  },
  {
    problem: {
      title: 'Hybrid Models Collapse at Enterprise Scale',
      body: 'Mixing shared and siloed tenants becomes unsustainable as compliance, load, and regional demands grow.',
    },
    enables: {
      title: 'Elastic Scale, No Trade-Offs',
      body: 'Elastic compute and storage separation with global consistency for multi-tenant SaaS workloads.',
      icon: 'https://static.pingcap.com/files/2025/12/17000120/elastic-scale.svg',
      alt: 'Elastic Scale',
    },
  },
]

const meetTidb = [
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000348/Scale-with-Ease.svg',
      alt: 'Scale with Ease',
    },
    title: 'Effortless Scaling',
    body: 'Scale compute and storage independently to handle unpredictable multi-tenant spikes—no downtime, no re-sharding. Manage millions of connections with low latency for seamless user experiences.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000402/Build-on-Trust.svg',
      alt: 'Build on Trust',
    },
    title: 'Enterprise-Grade Reliability',
    body: 'Achieve zero-downtime maintenance with automated failovers. Centralized metadata management and proactive monitoring enhance service reliability.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000418/Enhance-Operational-Flexibility.svg',
      alt: 'Enhance Operational Flexibility',
    },
    title: 'Cost-Effective Multi-Tenancy',
    body: 'Reduce infrastructure costs by up to 50% while ensuring predictable performance with resource isolation. Support millions of schemas without performance degradation.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000435/Simplify-Development.svg',
      alt: 'Simplify Development',
    },
    title: 'Real-Time Insights',
    body: 'Run transactional and analytical workloads simultaneously without ETL. Deliver instant dashboards and advanced analytics for actionable customer insights.',
  },
]

const workloads: WorkloadItem[] = [
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000138/multi-tenant.svg',
      alt: 'multi-tenant',
    },
    title: 'Multi-Tenant Management',
    body: 'Efficient data isolation and management for serving multiple customers from a single platform.',
  },
  {
    // Icon kept from the former Customer 360 card as a placeholder.
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000153/Customer-360.svg',
      alt: 'Customer 360',
    },
    title: 'Customer Context for AI Features',
    body: AI_CONTEXT_CARD_BODY,
    links: [
      {
        text: 'Explore AI Application Patterns',
        href: 'https://www.pingcap.com/developers/build-ai-apps/',
      },
    ],
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000227/Real-time-Analytics.svg',
      alt: 'Real-time Analytics',
    },
    title: 'Real-time Analytics',
    body: 'Enable a way to gather customers’ business insights from up-to-the-minute data analysis with the power of TiFlash, the analytics engine within TiDB.',
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/29000207/Metadata.svg',
      alt: 'Metadata',
    },
    title: 'Metadata Management',
    body: 'Ensure seamless user experiences and swift system responses through efficient metadata management with TiDB.',
  },
]

const videos = [
  {
    url: 'https://youtu.be/HXJrzE_PeD4',
    thumb: 'https://static.pingcap.com/files/2025/02/10195215/Catalyst-customer-story.jpg',
    quote:
      '"TiDB definitely outshines some of the other databases we looked at when it comes to performance and costs."',
    name: 'Sha Ma',
    role: 'Former CTO',
  },
  {
    url: 'https://youtu.be/o6eetnpi-3Q',
    thumb: 'https://static.pingcap.com/files/2024/10/10195300/Plaid-customer-story.jpg',
    quote:
      '"With TiDB, we can now perform upgrades with zero downtime and large table schema migrations."',
    name: 'Zander Hill',
    role: 'Experienced Data Reliability Engineer',
  },
  {
    url: 'https://www.youtube.com/watch?v=ohGY7hm9T80',
    thumb: 'https://static.pingcap.com/files/2026/01/06202609/Conga-Video-Cover.jpg',
    quote:
      '"TiDB stands out primarily for its ability to handle transactional and analytical workloads with exceptional performance."',
    name: 'Andy Buttaro',
    role: 'Platform Services Architect',
  },
]

const resources = [
  {
    ...DEFAULT_RESOURCES[0],
    title: 'Modernizing SaaS Platform',
    description: 'Learn how distributed SQL delivers multi-tenancy at scale.',
    cta: {
      text: 'Read',
      href: '/blog/unlocking-modern-saas-platforms-how-distributed-sql-delivers-multi-tenancy-scale/',
    },
  },
  ...DEFAULT_RESOURCES.slice(1),
]

export default function SaasPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionHero
          headline="The Database for SaaS Applications That Scales With You"
          subheadline="SaaS platform companies grow fast and their databases need to grow faster. TiDB gives you elasticity, reliability, and performance to power multi-tenant SaaS at any scale without downtime, data silos, or escalating costs."
          primaryCta={{
            text: 'Get Datasheet',
            href: 'https://static.pingcap.com/files/2026/01/07002405/Scaling-Multi-Tenant-SaaS-Platforms_one-pager.pdf',
          }}
          secondaryCta={{ text: 'Book a Demo', href: '/solutions/saas/#demo' }}
          backgroundUrl="https://static.pingcap.com/files/2024/11/01200805/Header-image-SaaS-3.svg"
        />

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              title="Why SaaS Needs a Modern Database"
              paragraphs={[
                'Every successful SaaS platform eventually hits the same wall – data growth outpaces the database. Sudden customer surges, query spikes, and feature expansion can quickly overwhelm traditional databases designed for simpler, single-tenant applications.',
              ]}
            />
            <CompareTabs tabs={tabs} />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              title="The Hidden Complexity of Multi-Tenant SaaS at Scale"
              paragraphs={[
                <>
                  As SaaS platforms grow, the real bottleneck isn’t data volume; it’s{' '}
                  <strong>managing tenants, isolation, performance</strong>, and{' '}
                  <strong>cost</strong> in a shared system. These challenges reveal a simple truth:{' '}
                  <strong>
                    Legacy architectures weren’t designed for high-density, elastic multi-tenancy.
                  </strong>
                </>,
              ]}
            />
            <div className="grid grid-cols-1 gap-6">
              {complexity.map((row) => (
                <div key={row.problem.title} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-3 border border-carbon-800 p-8">
                    <p className="font-mono text-eyebrow text-secondary m-0">Problem</p>
                    <h3 className="text-h3-sm md:text-h3-lg font-bold leading-normal m-0">
                      {row.problem.title}
                    </h3>
                    <p className="text-body-md leading-relaxed text-secondary m-0">
                      {row.problem.body}
                    </p>
                  </div>
                  <div className="flex gap-6 border border-brand-blue-medium bg-brand-blue-bg p-8">
                    <Image
                      src={row.enables.icon}
                      alt={row.enables.alt}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0"
                    />
                    <div className="flex flex-col gap-3">
                      <p className="font-mono text-eyebrow text-secondary m-0">TiDB Enables</p>
                      <h3 className="text-h3-sm md:text-h3-lg font-bold leading-normal m-0">
                        {row.enables.title}
                      </h3>
                      <p className="text-body-md leading-relaxed text-secondary m-0">
                        {row.enables.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-16">
            <Intro title="Meet TiDB Cloud: Purpose-Built for SaaS Growth" />
            <IconGrid items={meetTidb} columns={4} iconSize={120} />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              eyebrow="Relevant Workloads"
              title="Tailored for Critical SaaS Workloads"
              paragraphs={[
                'Efficiently handle diverse and demanding SaaS workloads with capabilities tailored for scalability, multi-tenancy, and rapid updates. These foundational elements ensure customer satisfaction and drive operational agility as you scale.',
              ]}
            />
            <WorkloadCards items={workloads} />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-top' }}>
          <div className="space-y-16">
            <Intro
              title="Customer Proof: SaaS Leaders Scaling With TiDB"
              paragraphs={[
                'Join innovative SaaS companies that have modernized their data infrastructure with TiDB.',
              ]}
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {videos.map((v) => (
                <VideoDialog key={v.url} videoUrl={v.url} title={`${v.name}, ${v.role}`}>
                  <button
                    type="button"
                    className="group flex flex-col border border-carbon-800 text-left transition-transform duration-200 ease-in-out hover:-translate-y-2"
                  >
                    <Image
                      src={v.thumb}
                      alt=""
                      width={640}
                      height={360}
                      className="aspect-video h-auto w-full object-cover"
                    />
                    <span className="flex flex-1 flex-col gap-4 p-6">
                      <span className="text-body-lg leading-relaxed">{v.quote}</span>
                      <span className="flex flex-col">
                        <span className="font-bold">{v.name}</span>
                        <span className="text-body-sm text-secondary">{v.role}</span>
                      </span>
                      <span className="mt-auto font-bold underline-offset-4 group-hover:underline">
                        Watch the Video
                      </span>
                    </span>
                  </button>
                </VideoDialog>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <ResourcesRow title="SaaS-Specific Resources to Fuel Your TiDB Journey" items={resources} />
        <SeeTidbInAction />
      </main>
      <Footer />
    </>
  )
}
