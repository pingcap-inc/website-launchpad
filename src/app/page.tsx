import type { Metadata } from 'next'
import {
  Header,
  Footer,
  HeroSection,
  FeaturesGrid,
  CtaSection,
  JsonLd,
  ColorCard,
} from '@/components'
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'
import {
  Database,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Cpu,
  Rocket,
  Brain,
  Cloud,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
  description:
    'TiDB is an open-source distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP). Scale from gigabytes to petabytes without re-architecting.',
  keywords: ['TiDB', 'distributed database', 'HTAP', 'MySQL compatible', 'NewSQL'],
  openGraph: {
    title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
    description: 'Open-source distributed SQL database supporting HTAP workloads at any scale.',
    url: 'https://www.pingcap.com/',
    siteName: 'PingCAP',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TiDB — The Distributed SQL Database',
    description: 'Open-source HTAP database. Scale without re-architecting.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/' },
}

const schema = buildPageSchema({
  path: '/',
  title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
  description: 'Open-source distributed SQL database supporting HTAP workloads at any scale.',
  pageType: 'WebPage',
  breadcrumbs: [{ name: 'Home', path: '/' }],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    softwareApplicationSchema({
      name: 'TiDB',
      description: 'Open-source distributed SQL database supporting HTAP workloads.',
      url: 'https://www.pingcap.com/tidb/',
    }),
  ],
})

const features = [
  {
    icon: <Database className="w-full h-full text-brand-red-primary" />,
    title: 'Horizontal Scalability',
    description:
      'Scale out storage and compute independently. Add nodes to handle petabyte-scale workloads without downtime.',
  },
  {
    icon: <Zap className="w-full h-full text-brand-red-primary" />,
    title: 'Real-Time HTAP',
    description:
      'Run OLTP and OLAP workloads simultaneously on the same dataset. Eliminate ETL pipelines and data silos.',
  },
  {
    icon: <Shield className="w-full h-full text-brand-red-primary" />,
    title: '99.99% Availability',
    description:
      'Built-in high availability with automatic failover. Multi-region replication with strong consistency guarantees.',
  },
  {
    icon: <Globe className="w-full h-full text-brand-red-primary" />,
    title: 'MySQL Compatible',
    description:
      'Drop-in replacement for MySQL. Migrate existing applications without rewriting queries or changing your ORM.',
  },
  {
    icon: <BarChart3 className="w-full h-full text-brand-red-primary" />,
    title: 'Intelligent Resource Isolation',
    description:
      'Resource control groups prevent analytical queries from impacting transactional performance.',
  },
  {
    icon: <Cpu className="w-full h-full text-brand-red-primary" />,
    title: 'Cloud Native',
    description:
      'Deploy on Kubernetes or use TiDB Cloud. Fully managed service available on AWS, GCP, and Azure.',
  },
]

const valueSignals = [
  { label: 'Availability', value: '99.99%' },
  { label: 'Scale', value: 'PB+' },
  { label: 'SQL Compatibility', value: 'MySQL' },
  { label: 'Regions', value: 'Multi-Region' },
]

function HeroTelemetryPanel() {
  return (
    <div className="border border-carbon-700 bg-gradient-dark-top p-6 md:p-8">
      <p className="font-mono text-label text-carbon-300 mb-4">Live workload profile</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-carbon-700 p-4">
          <p className="font-mono text-label text-carbon-400 mb-2">Transactions</p>
          <p className="text-h3-lg font-bold text-text-inverse">42.8K/s</p>
        </div>
        <div className="border border-carbon-700 p-4">
          <p className="font-mono text-label text-carbon-400 mb-2">Analytics QPS</p>
          <p className="text-h3-lg font-bold text-text-inverse">7.2K/s</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-2 bg-carbon-800 overflow-hidden">
          <div className="h-full bg-brand-red-primary w-4/5" />
        </div>
        <div className="h-2 bg-carbon-800 overflow-hidden">
          <div className="h-full bg-brand-blue-medium w-3/5" />
        </div>
        <div className="h-2 bg-carbon-800 overflow-hidden">
          <div className="h-full bg-brand-teal-medium w-2/3" />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-carbon-700 flex items-center justify-between text-body-sm text-carbon-300">
        <span>OLTP + OLAP in one cluster</span>
        <span className="font-mono text-label text-carbon-400">No ETL</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <HeroSection
          eyebrow="Distributed SQL Database"
          headline="Run Transactions and Analytics in Real Time"
          subheadline="TiDB serves low-latency OLTP and large-scale analytics from one source of truth, so teams ship faster without brittle data pipelines."
          primaryCta={{ text: 'Start for Free', href: '/signup/' }}
          secondaryCta={{ text: 'View Demo', href: '/demo/' }}
          rightSlot={<HeroTelemetryPanel />}
          backgroundImage={{
            src: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
            opacityClassName: 'opacity-35',
            overlayClassName: 'bg-bg-primary/70',
            positionClassName: 'object-center',
            priority: true,
          }}
        />
        <section className="bg-gradient-dark-bottom pb-section-sm lg:pb-section">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 border border-carbon-800">
              {valueSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="p-4 md:p-6 border-b md:border-b-0 border-carbon-800"
                >
                  <p className="font-mono text-label text-carbon-400 mb-2">{signal.label}</p>
                  <p className="text-h3-sm md:text-h3-lg font-bold text-text-inverse">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <FeaturesGrid
          label="Capabilities"
          title="One Database for Every Workload"
          subtitle="Move from fragmented data architecture to one platform that scales transactional traffic and real-time insights together."
          features={features}
          columns={3}
          className="bg-gradient-dark-top"
        />
        <section className="py-section-sm lg:py-section bg-bg-primary">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <div className="max-w-section-title mb-12">
              <p className="font-mono text-eyebrow text-carbon-400 mb-6">Use Cases</p>
              <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-text-inverse mb-4">
                Built for Product Teams That Need Speed and Stability
              </h2>
              <p className="text-body-lg text-carbon-300 leading-relaxed">
                Pick the deployment and architecture path that fits your stage, then scale without a
                second migration.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorCard
                variant="red"
                icon={<Rocket className="w-full h-full" />}
                title="Launch Faster"
                description="Ship data-heavy features quickly with native horizontal scaling and MySQL compatibility."
                cta={{ text: 'Learn More', href: '/developer/get-started/' }}
              />
              <ColorCard
                variant="violet"
                icon={<Brain className="w-full h-full" />}
                title="Power AI Apps"
                description="Serve embeddings, vectors, and transactional state in one architecture for AI products."
                cta={{ text: 'Learn More', href: '/developer/build-ai-apps/' }}
              />
              <ColorCard
                variant="blue"
                icon={<Cloud className="w-full h-full" />}
                title="Cloud Native"
                description="Run in TiDB Cloud or Kubernetes with operational workflows built for modern platform teams."
                cta={{ text: 'Learn More', href: '/developer/build-data-apps/' }}
              />
              <ColorCard
                variant="teal"
                icon={<Workflow className="w-full h-full" />}
                title="Consolidate Stack"
                description="Replace brittle ETL pipelines with HTAP and keep analytics synchronized in real time."
                cta={{ text: 'Learn More', href: '/developer/migration-center/' }}
              />
            </div>
          </div>
        </section>
        <CtaSection
          label="Get Started"
          title="Ready to Build with TiDB?"
          subtitle="Start serverless in minutes and scale to production traffic without re-architecting."
          primaryCta={{ text: 'Start for Free', href: '/signup/' }}
          secondaryCta={{ text: 'Read the Docs', href: '/docs/' }}
          background="blue"
        />
      </main>
      <Footer />
    </>
  )
}
