import type { Metadata } from 'next'
import {
  Header,
  Footer,
  JsonLd,
  ColorCard,
  SectionHeader,
  HeroSection,
  SecondaryButton,
} from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { Scale, Database, Cpu, Shield, Layers, Code2 } from 'lucide-react'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'

export const metadata: Metadata = {
  title: 'Get Started with TiDB | PingCAP Developer Hub',
  description:
    'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
  openGraph: {
    title: 'Get Started with TiDB | PingCAP Developer Hub',
    description:
      'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
    url: 'https://www.pingcap.com/developer/get-started/',
    siteName: 'PingCAP',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started with TiDB | PingCAP Developer Hub',
    description:
      'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developer/get-started/' },
}

const schema = buildPageSchema({
  path: '/developer/get-started/',
  title: 'Get Started with TiDB | PingCAP Developer Hub',
  description: 'Everything you need to get started with TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developer/' },
    { name: 'Get Started', path: '/developer/get-started/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Get Started with TiDB | PingCAP Developer Hub',
      description:
        'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
      url: '/developer/get-started/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Beginner',
      dateModified: '2026-02-28',
    }),
  ],
})

// ─── Data ─────────────────────────────────────────────────────────────────────

const whyFeatures = [
  {
    icon: <Scale className="w-5 h-5" />,
    title: 'Seamless Scalability',
    description: 'Scale reads and writes horizontally without manual sharding.',
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: 'MySQL Compatibility',
    description: 'Use familiar SQL, drivers, and tools while gaining distributed scale.',
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: 'AI and Vector Ready',
    description: 'Power RAG and agents. AI with built-in vector search.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Strong Consistency & High Availability',
    description: 'Built on Raft for fault tolerance and predictable behavior.',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Simplified Architecture',
    description:
      'Replace fragmented stacks with a single system for transactional, analytical, and AI workloads.',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Developer-Friendly Ecosystem',
    description: 'Works with existing ORMs, BI tools, and AI frameworks.',
  },
]

const basics = [
  {
    tag: 'Blog',
    tagColor: '#F35048',
    title: 'How TiDB Compares to Other Databases',
    href: 'https://www.pingcap.com/blog/how-tidb-compares-to-other-databases/',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'How TiDB Works Under the Hood',
    href: 'https://docs.pingcap.com/tidb/stable/tidb-architecture',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'Transactional + analytical workloads (HTAP)',
    href: 'https://www.pingcap.com/blog/htap-database/',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'Vector Search',
    href: 'https://www.pingcap.com/blog/vector-search-tidb/',
  },
  {
    tag: 'Infographic',
    tagColor: '#513669',
    title: 'When Teams Outgrow MySQL',
    href: 'https://www.pingcap.com/blog/when-to-move-from-mysql-to-tidb/',
  },
]

const nextSteps = [
  {
    variant: 'red' as const,
    title: 'Build a Data Application',
    description:
      'Design schemas, connect your app, and run scalable transactional and analytical queries.',
    cta: { text: 'Build Data Applications', href: '/developer/build-data-apps/' },
  },
  {
    variant: 'violet' as const,
    title: 'Build an AI Application',
    description: 'Store embeddings, run vector search, and build RAG or agentic AI systems.',
    cta: { text: 'Build AI Applications', href: '/developer/build-ai-apps/' },
  },
  {
    variant: 'teal' as const,
    title: 'Migrate to TiDB',
    description: 'Evaluate compatibility, plan your migration, and move data safely.',
    cta: { text: 'Migration Center', href: '/developer/migration-center/' },
  },
  {
    variant: 'blue' as const,
    title: 'Try TiDB Cloud for Free',
    description: 'Spin up a managed TiDB cluster in minutes.',
    cta: { text: 'Start Free Trial', href: '/signup/' },
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        <DeveloperSubnav />

        <main>
          {/* ── Hero ── */}
          <HeroSection
            headline="Get Started TiDB"
            subheadline="It scales horizontally, maintains strong consistency, and brings transactional, analytical, and AI (vector search) workloads together in one unified system — eliminating the need for sharding, separate databases or complex data pipelines."
            rightSlot={
              <div className="hidden lg:flex justify-center items-start pt-10">
                <p className="text-brand-red-light text-h3-sm italic">
                  Illustrations to be updated
                </p>
              </div>
            }
          />

          {/* ── Why TiDB ── */}
          <section className="pb-section-sm lg:pb-section bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Why Do Developers Choose TiDB?" h2Size="md" align="left" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-carbon-700 flex items-center justify-center text-carbon-300">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-body-lg font-semibold text-text-inverse mb-4">
                        {f.title}
                      </h3>
                      <p className="text-body-md text-carbon-400 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Understand the Basics ── */}
          <section className="py-section-sm lg:py-section bg-gradient-dark-top">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                {/* Left: title + illustration */}
                <div className="flex flex-col gap-8">
                  <h2 className="text-h2-mb md:text-h2-sm font-bold text-text-inverse leading-tight">
                    Understand the Basics
                  </h2>
                  <div className="hidden lg:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://static.pingcap.com/files/2024/09/05020155/features-bg.svg"
                      alt=""
                      className="w-full max-w-[360px]"
                    />
                  </div>
                </div>

                {/* Right: article cards — 2 columns */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {basics.map((item) => (
                    <div key={item.title} className="flex flex-col gap-4">
                      <span
                        className="font-mono text-label text-white self-start px-2 py-0.5"
                        style={{ background: item.tagColor }}
                      >
                        {item.tag}
                      </span>
                      <h3 className="text-h3-lg font-bold text-text-inverse leading-snug flex-1">
                        {item.title}
                      </h3>
                      <SecondaryButton href={item.href}>Read More</SecondaryButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Choose What to Do Next ── */}
          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Choose What to Do Next" h2Size="sm" align="left" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nextSteps.map((card) => (
                  <ColorCard
                    key={card.title}
                    variant={card.variant}
                    title={card.title}
                    description={card.description}
                    cta={card.cta}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
