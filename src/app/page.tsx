import type { Metadata } from 'next'
import { Navbar, Footer, HeroSection, FeaturesGrid, CtaSection, JsonLd } from '@/components'
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'
import { Database, Zap, Shield, Globe, BarChart3, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
  description: 'TiDB is an open-source distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP). Scale from gigabytes to petabytes without re-architecting.',
  keywords: ['TiDB', 'distributed database', 'HTAP', 'MySQL compatible', 'NewSQL'],
  openGraph: {
    title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
    description: 'Open-source distributed SQL database supporting HTAP workloads at any scale.',
    url: 'https://www.pingcap.com/',
    siteName: 'PingCAP',
    images: [{ url: 'https://www.pingcap.com/og/home.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TiDB — The Distributed SQL Database',
    description: 'Open-source HTAP database. Scale without re-architecting.',
    images: ['https://www.pingcap.com/og/home.png'],
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
  image: 'https://www.pingcap.com/og/home.png',
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
    description: 'Scale out storage and compute independently. Add nodes to handle petabyte-scale workloads without downtime.',
  },
  {
    icon: <Zap className="w-full h-full text-brand-red-primary" />,
    title: 'Real-Time HTAP',
    description: 'Run OLTP and OLAP workloads simultaneously on the same dataset. Eliminate ETL pipelines and data silos.',
  },
  {
    icon: <Shield className="w-full h-full text-brand-red-primary" />,
    title: '99.99% Availability',
    description: 'Built-in high availability with automatic failover. Multi-region replication with strong consistency guarantees.',
  },
  {
    icon: <Globe className="w-full h-full text-brand-red-primary" />,
    title: 'MySQL Compatible',
    description: 'Drop-in replacement for MySQL. Migrate existing applications without rewriting queries or changing your ORM.',
  },
  {
    icon: <BarChart3 className="w-full h-full text-brand-red-primary" />,
    title: 'Intelligent Resource Isolation',
    description: 'Resource control groups prevent analytical queries from impacting transactional performance.',
  },
  {
    icon: <Cpu className="w-full h-full text-brand-red-primary" />,
    title: 'Cloud Native',
    description: 'Deploy on Kubernetes or use TiDB Cloud. Fully managed service available on AWS, GCP, and Azure.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-[62px] lg:pt-20">
        <HeroSection
          eyebrow="DISTRIBUTED SQL DATABASE"
          headline="Built for Real-Time Data at Any Scale"
          subheadline="TiDB handles transactional and analytical workloads simultaneously. Scale from gigabytes to petabytes without re-architecting your application."
          primaryCta={{ text: 'Start for Free', href: '/signup/' }}
          secondaryCta={{ text: 'View Demo', href: '/demo/' }}
        />
        <FeaturesGrid
          label="CAPABILITIES"
          title="One Database for Every Workload"
          subtitle="Stop choosing between OLTP and OLAP. TiDB delivers both with strong consistency and horizontal scalability."
          features={features}
          columns={3}
          className="bg-bg-primary"
        />
        <CtaSection
          label="GET STARTED"
          title="Ready to Scale Your Database?"
          subtitle="Deploy TiDB in minutes. No credit card required."
          primaryCta={{ text: 'Start for Free', href: '/signup/' }}
          secondaryCta={{ text: 'Read the Docs', href: '/docs/' }}
          background="red"
        />
      </main>
      <Footer />
    </>
  )
}
