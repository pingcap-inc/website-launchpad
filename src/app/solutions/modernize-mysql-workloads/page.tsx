import {
  Header,
  Footer,
  JsonLd,
  SectionWrapper,
  FeatureMediaSection,
  FeatureCard,
  PrimaryButton,
  CountUp,
  InlineLink,
} from '@/components'
import Image from 'next/image'
import {
  CustomerRatingQuotes,
  IconGrid,
  Intro,
  LogoRow,
  ResourcesRow,
  SeeTidbInAction,
  SolutionHero,
} from '../_components/shared'
import { CompareTabs, type CompareTab } from '../_components/CompareTabs'
import { solutionMetadata, solutionSchema } from '../_components/meta'

const PATH = '/solutions/modernize-mysql-workloads/'
const TITLE = 'Effortless MySQL Scaling | TiDB Solutions'
const DESCRIPTION =
  'Scale MySQL workloads without limits. TiDB delivers cloud-native elasticity, real-time analytics, and built-in resiliency—start scaling smarter today.'

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'Modernize MySQL Workloads')

const painPoints = [
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
]

function CapabilityText({
  title,
  points,
}: {
  title: string
  points: { heading: string; body: string }[]
}) {
  return (
    <>
      <h3 className="text-h3-xl md:text-h2-mb font-bold leading-tight mb-6">{title}</h3>
      <div className="space-y-6">
        {points.map((p) => (
          <div key={p.heading}>
            <h4 className="text-h3-lg font-bold mb-2">{p.heading}</h4>
            <p className="text-body-2xl text-secondary leading-relaxed m-0">{p.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const capabilities = [
  {
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
    image: 'https://static.pingcap.com/files/2024/11/05193236/High-traffic-application.svg',
    alt: 'High-traffic-application',
  },
  {
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
    image: 'https://static.pingcap.com/files/2024/11/05193336/Workload-consolidation.svg',
    alt: 'Workload-consolidation',
  },
  {
    title: 'Operational Cost Reduction',
    points: [
      {
        heading: 'Hybrid and Multi-Cloud Enabled',
        body: 'Deploy database clusters anywhere in the world, in public, private, and hybrid cloud environments on VMs, containers, or bare metal.',
      },
      { heading: 'Enterprise-Grade Security', body: 'Encrypt data both in-flight and at-rest.' },
    ],
    image: 'https://static.pingcap.com/files/2024/11/05193443/Real-time-analytics-1.svg',
    alt: 'Real-time-analytics',
  },
]

const versusTabs: CompareTab[] = [
  {
    id: 'sharding',
    label: 'Sharding',
    mysql: {
      image: 'https://static.pingcap.com/files/2025/11/10233519/1000011060.svg',
      alt: 'MySQL-sharding',
      items: [
        'Manual, complex sharding across databases',
        'Requires custom logic and schema maintenance',
        'High operational overhead',
      ],
    },
    tidb: {
      image: 'https://static.pingcap.com/files/2025/11/10233521/1000011067.svg',
      alt: 'No-sharding',
      items: [
        'Built-in auto-sharding distributes data seamlessly across nodes',
        'No manual partitioning or application rewrites',
        'Focus on development, not data distribution',
      ],
    },
  },
  {
    id: 'scaling',
    label: 'Scaling',
    mysql: {
      image: 'https://static.pingcap.com/files/2025/11/11003642/1000011062.svg',
      alt: 'MySQL-Scaling',
      items: [
        'Vertical scaling only—upgrade hardware to grow',
        'Expensive and limited by hardware ceilings',
        'Risk of downtime during scaling',
      ],
    },
    tidb: {
      image: 'https://static.pingcap.com/files/2025/11/11003647/1000011053.svg',
      alt: 'TiDB-Scaling',
      items: [
        'Horizontal scaling—add nodes instantly to increase capacity',
        'Scale out elastically with cloud-native architecture',
        'Zero downtime and linear performance at scale',
      ],
    },
  },
  {
    id: 'consistency',
    label: 'Consistency',
    mysql: {
      image: 'https://static.pingcap.com/files/2025/11/11003916/1000011064.svg',
      alt: 'MySQL-Consistency',
      items: [
        'Asynchronous replication leads to data lag',
        'Reads may return stale data',
        'Complex failover management',
      ],
    },
    tidb: {
      image: 'https://static.pingcap.com/files/2025/11/11003925/1000011068.svg',
      alt: 'TiDB-Consistency',
      items: [
        'Strong consistency with Raft consensus',
        'Always-consistent data across replicas',
        'Built-in fault tolerance and auto-recovery',
      ],
    },
  },
].map((t): CompareTab => ({
  id: t.id,
  label: t.label,
  columns: [
    {
      heading: 'MySQL',
      headingStyle: 'h4',
      tone: 'blue',
      image: t.mysql.image,
      imageAlt: t.mysql.alt,
      items: t.mysql.items,
    },
    {
      heading: 'TiDB',
      headingStyle: 'h4',
      tone: 'teal',
      image: t.tidb.image,
      imageAlt: t.tidb.alt,
      items: t.tidb.items,
    },
  ],
}))

function YoullGet({ items }: { items: string[] }) {
  return (
    <div className="text-body-md text-secondary">
      <p className="m-0 mb-2">
        <strong className="text-text-inverse">You’ll get</strong>
      </p>
      <ul className="list-disc space-y-1 pl-5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

const adoptionSteps = [
  {
    icon: { src: 'https://static.pingcap.com/files/2024/11/05194239/Assess.svg', alt: 'Assess' },
    title: 'Step 1: Assess Workloads & Requirements',
    body: 'Work with TiDB experts to evaluate existing SQL workloads and identify bottlenecks. Our Workload Analysis feature surfaces performance patterns and recommends optimizations.',
    extra: (
      <YoullGet
        items={[
          'Guided assessment and tuning insights',
          'Automated SQL optimization recommendations',
          'Clear migration baselines for planning',
        ]}
      />
    ),
  },
  {
    icon: { src: 'https://static.pingcap.com/files/2024/11/05194240/Migrate.svg', alt: 'Migrate' },
    title: 'Step 2: Migrate with MySQL Compatibility Tools',
    body: 'Move from MySQL easily with hands-on migration assistance. TiDB’s MySQL protocol and Data Migration (DM) tool enable full or incremental data transfer—no code changes required.',
    extra: (
      <YoullGet
        items={[
          'Seamless migration from MySQL 5.7 / 8.0',
          'Real-time replication and sharded-table merge',
          'Schema updates with gh-ost',
          'Live monitoring via TiUP',
        ]}
      />
    ),
  },
  {
    icon: { src: 'https://static.pingcap.com/files/2024/11/05194241/Scale.svg', alt: 'Scale' },
    title: 'Step 3: Scale Elastically in Production',
    body: 'Scale horizontally with zero downtime. TiDB’s distributed architecture separates compute and storage for linear, fault-tolerant growth.',
    extra: (
      <YoullGet
        items={[
          'Auto-Scaling based on workload demand',
          'Strong consistency via Raft protocol',
          'Column-based HTAP storage for OLTP + analytics',
          'Clusters up to 500+ nodes with RPO = 0',
        ]}
      />
    ),
  },
  {
    icon: {
      src: 'https://static.pingcap.com/files/2024/11/05194242/Ecosystem.svg',
      alt: 'Ecosystem',
    },
    title: 'Step 4: Optimize with Ecosystem Integrations',
    body: 'Keep performance stable with continuous optimization and expert guidance.',
    extra: (
      <YoullGet
        items={[
          'SQL Plan Management for consistent performance',
          'Dashboard + Key Visualizer for trend insights',
          'Automated query and index optimization',
          'Seamless integration with billing and access systems',
        ]}
      />
    ),
  },
]

function LabMeta({ body, level, time }: { body: string; level: string; time: string }) {
  return (
    <>
      {body}
      <span className="mt-4 flex gap-6 font-mono text-eyebrow">
        <span>{level}</span>
        <span>{time}</span>
      </span>
    </>
  )
}

const labIcon = (
  <Image
    src="https://static.pingcap.com/files/2025/07/21210921/hands-on-lab.svg"
    alt="hands-on-lab"
    width={48}
    height={48}
    className="h-12 w-12"
  />
)

const stats = [
  { prefix: 'Up to', value: '500TB', label: 'Scale Per Cluster' },
  { prefix: '', value: '2 Million', suffix: 'QPS', label: 'At Millisecond Latencies' },
  { prefix: '', value: '99.999%', suffix: 'Uptime', label: 'During Planned Outages' },
  { prefix: '', value: '80% Less', suffix: 'Sprawl', label: 'Vs. Single-Node Deployments' },
]

const LABS = [
  {
    icon: labIcon,
    label: 'Hands-on Lab',
    title: 'Migrate from MySQL to TiDB Using TiDB Data Migration',
    description: (
      <LabMeta
        body="Gain end-to-end experience configuring, migrating, and validating SQL workloads—exactly as outlined in Step 2."
        level="Intermediate"
        time="90 minutes"
      />
    ),
    href: 'https://labs.tidb.io/labs/demo_011',
    ctaText: 'Start Lab',
  },
  {
    icon: labIcon,
    label: 'Hands-on Lab',
    title: 'SQL Workloads Replay with TiDB Data Migration',
    description: (
      <LabMeta
        body="Validate post-migration performance by replaying real SQL traffic, ensuring workloads perform as expected before going live."
        level="Advanced"
        time="90 minutes"
      />
    ),
    href: 'https://labs.tidb.io/labs/demo_302',
    ctaText: 'Start Lab',
  },
]

export default function ModernizeMysqlPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionHero
          headline="MySQL Scaling Without Limits"
          subheadline="Accelerate business growth with a distributed database that’s ready for anything the world throws its way"
          primaryCta={{
            text: 'Get Solution Brief',
            href: 'https://static.pingcap.com/files/2024/11/26023423/Solution-Brief-Modernize-MySQL-with-TiDB.pdf',
          }}
          secondaryCta={{ text: 'Book a Demo', href: '/solutions/modernize-mysql-workloads/#demo' }}
          backgroundUrl="https://static.pingcap.com/files/2024/11/26201805/module-_-headline-4.svg"
        />

        <SectionWrapper>
          <LogoRow
            title="The Trusted MySQL Alternative for 1000s of Customers Globally"
            logos={[
              {
                name: 'Square',
                src: 'https://static.pingcap.com/files/2024/11/26201955/Square.svg',
              },
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
            ]}
          />
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              title="Why MySQL Can’t Scale With You"
              paragraphs={[
                'MySQL’s monolithic architecture runs on a single server where query processing, transaction management, and storage are tightly coupled within a single node.',
                'Scaling out this architecture is difficult because MySQL wasn’t built to natively distribute data across multiple nodes. Most teams rely on replication or manual sharding workarounds that add complexity and limit scalability.',
              ]}
            />
            <IconGrid items={painPoints} columns={3} iconSize={120} />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'inverse' }}>
          <div className="space-y-16">
            <Intro
              title="How Teams Use TiDB to Scale MySQL Workloads"
              paragraphs={[
                'TiDB is built to help teams evolve from managing databases to scaling intelligently across any workload. TiDB serves as the ideal distributed database to power applications and businesses across fintech, retail & e-commerce, SaaS, AI, gaming, and more.',
              ]}
            />
            <FeatureMediaSection
              startPosition="right"
              items={capabilities.map((c) => ({
                title: c.title,
                description: '',
                content: <CapabilityText title={c.title} points={c.points} />,
                image: { image: { url: c.image }, alt: c.alt, width: 450, height: 375 },
              }))}
            />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-16">
            <Intro
              title="MySQL vs. TiDB"
              paragraphs={[
                'TiDB’s distributed SQL design replaces MySQL’s manual scaling workarounds with built-in elasticity, strong consistency, and simplified operations.',
              ]}
            />
            <CompareTabs tabs={versusTabs} />
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-bottom' }}>
          <div className="space-y-16">
            <Intro
              title="Adoption Made Simple"
              paragraphs={[
                'TiDB guides you through SQL modernization with a four-step process backed by tools, best practices, and expert support.',
              ]}
            />
            <IconGrid items={adoptionSteps} columns={4} iconSize={50} />
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="space-y-12">
            <Intro title="Hands-on Practice" size="xs" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {LABS.map((lab) => (
                <FeatureCard key={lab.href} {...lab} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-top' }}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Intro
                title="Scale Out Beyond MySQL with TiDB"
                paragraphs={[
                  'TiDB offers an ultra-reliable distributed SQL database that provides MySQL wire compatibility, horizontal scalability, and strong consistency. It decouples compute from storage, allowing each component to scale out independently.',
                  'With TiDB, data is automatically sharded into small chunks and distributed across storage nodes. This sharding is transparent to the user and can handle massive amounts of data—far beyond what a single node can manage.',
                  <>
                    Extend your MySQL application with semantic search and RAG. TiDB combines vector
                    similarity with SQL filtering, so AI features can retrieve relevant application
                    data through SQL.
                    <span className="mt-4 block">
                      <InlineLink
                        href="https://www.pingcap.com/ai/vector-search/"
                        className="text-text-inverse font-bold"
                      >
                        Learn about vector search on TiDB
                      </InlineLink>
                    </span>
                  </>,
                ]}
              />
              <PrimaryButton href="/solutions/modernize-mysql-workloads/#demo">
                Book a Demo
              </PrimaryButton>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-3 border border-carbon-800 p-8">
                  <h3 className="text-h3-lg md:text-h2-sm font-bold leading-tight m-0">
                    {/* Full value for crawlers and screen readers; CountUp renders 0 until scrolled into view. */}
                    <span className="sr-only">
                      {[s.prefix, s.value, s.suffix].filter(Boolean).join(' ')}
                    </span>
                    <span aria-hidden="true">
                      {s.prefix && (
                        <>
                          {s.prefix}
                          <br />
                        </>
                      )}
                      <CountUp value={s.value} />
                      {s.suffix && (
                        <>
                          <br />
                          {s.suffix}
                        </>
                      )}
                    </span>
                  </h3>
                  <p className="text-body-md text-secondary m-0">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gray' }}>
          <CustomerRatingQuotes
            items={[
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
              {
                logo: {
                  src: 'https://static.pingcap.com/files/2024/11/26013409/Bolt-logo_grey_rgb-svg.svg',
                  alt: 'Bolt',
                },
                quote:
                  '“In the following years, we will rely on TiDB even more, including migrating more clusters from MySQL to TiDB and using TiCDC to set up multi-region clusters on AWS for failover.”',
                name: 'Boris Savelev,',
                role: 'SRE Manager',
                href: '/case-study/bolt-modernizing-mysql-tidb-scale-thousands-microservices-aws/',
              },
              {
                logo: {
                  src: 'https://static.pingcap.com/files/2024/11/26015435/LINE-1.svg',
                  alt: 'LINE',
                },
                quote:
                  '“Scale-in and scale-out in a cluster configuration is easy, and the ecosystem is very rich, with operational monitoring installed immediately with the installation command (TiUP).”',
                name: 'Kentaro Kitagawa,',
                role: 'Senior Database Administrator',
                href: '/case-study/line-corporation-exploration-mysql-tidb/',
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
