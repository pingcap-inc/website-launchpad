import type { Metadata } from 'next'
import {
  Header,
  Footer,
  JsonLd,
  ColorCard,
  SectionHeader,
  HeroSection,
  SecondaryButton,
  IconFeatureItem,
} from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { DeveloperResourceCard } from '../_components/DeveloperResourceCard'
import {
  IconSeamless,
  IconMysql,
  IconAiVector,
  IconStrong,
  IconSimplified,
  IconDeveloper,
  IconTryFree,
  IconOltpD,
  IconSelfManagedC,
  IconBuildAi,
} from '../_components/icons'

export const metadata: Metadata = {
  title: 'Get Started with TiDB | TiDB Developer Hub',
  description:
    'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
  openGraph: {
    title: 'Get Started with TiDB | TiDB Developer Hub',
    description:
      'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
    url: 'https://www.pingcap.com/developers/get-started/',
    siteName: 'TiDB',
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
    title: 'Get Started with TiDB | TiDB Developer Hub',
    description:
      'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    site: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developers/get-started/' },
}

const schema = buildPageSchema({
  path: '/developers/get-started/',
  title: 'Get Started with TiDB | TiDB Developer Hub',
  description: 'Everything you need to get started with TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developers/' },
    { name: 'Get Started', path: '/developers/get-started/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Get Started with TiDB | TiDB Developer Hub',
      description:
        'Everything you need to get started with TiDB. Learn the fundamentals, understand the architecture, and launch your first cluster.',
      url: '/developers/get-started/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Beginner',
      dateModified: '2026-02-28',
    }),
  ],
})

// ─── Data ──────────────────────────────────────────────────────────────────────

const whyFeatures = [
  {
    icon: <IconSeamless />,
    title: 'Seamless Scalability',
    description: 'Scale reads and writes horizontally without manual sharding.',
  },
  {
    icon: <IconMysql />,
    title: 'MySQL Compatibility',
    description: 'Use familiar SQL, drivers, and tools while gaining distributed scale.',
  },
  {
    icon: <IconAiVector />,
    title: 'AI and Vector Ready',
    description: 'Power RAG and agents. AI with built-in vector search.',
  },
  {
    icon: <IconStrong />,
    title: 'Strong Consistency & High Availability',
    description: 'Built on Raft for fault tolerance and predictable behavior.',
  },
  {
    icon: <IconSimplified />,
    title: 'Simplified Architecture',
    description:
      'Replace fragmented stacks with a single system for transactional, analytical, and AI workloads.',
  },
  {
    icon: <IconDeveloper />,
    title: 'Developer-Friendly Ecosystem',
    description: 'Works with existing ORMs, BI tools, and AI frameworks.',
  },
]

const quickStarts = [
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Create a TiDB Cloud Starter Cluster',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-build-cluster-in-cloud/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Connect to TiDB with Go-MySQL-Driver',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-sql-driver/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Connect to TiDB with Python (Django)',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-python-django/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Connect to TiDB with Node.js (mysql2)',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nodejs-mysql2/',
  },
]

const basics = [
  {
    tag: 'Blog',
    tagClass: 'bg-brand-red-light',
    title: 'How TiDB Compares to Other Databases',
    href: 'https://www.pingcap.com/article/choosing-the-best-open-source-database-tidb-vs-mysql-postgresql-mongodb/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'How TiDB Works Under the Hood',
    href: 'https://docs.pingcap.com/tidb/stable/tidb-architecture',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Transactional + analytical workloads (HTAP)',
    href: 'https://docs.pingcap.com/tidb/stable/explore-htap/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Vector Search',
    href: 'https://docs.pingcap.com/tidb/stable/vector-search-overview',
  },
  {
    tag: 'Infographic',
    tagClass: 'bg-brand-violet-dark',
    title: 'When Teams Outgrow MySQL',
    href: 'https://static.pingcap.com/files/2025/03/18161435/Infographic-6-Signs-Youve-Outgrown-Traditional-MySQL.pdf',
  },
]

const nextSteps = [
  {
    variant: 'red' as const,
    icon: <IconOltpD />,
    title: 'Build a Data Application',
    description:
      'Design schemas, connect your app, and run scalable transactional and analytical queries.',
    cta: { text: 'Build Data Applications', href: '/developers/build-data-apps/' },
  },
  {
    variant: 'violet' as const,
    icon: <IconSelfManagedC />,
    title: 'Build an AI Application',
    description: 'Store embeddings, run vector search, and build RAG or agentic AI systems.',
    cta: { text: 'Build AI Applications', href: '/developers/build-ai-apps/' },
  },
  {
    variant: 'teal' as const,
    icon: <IconBuildAi />,
    title: 'Migrate to TiDB',
    description: 'Evaluate compatibility, plan your migration, and move data safely.',
    cta: { text: 'Migration Center', href: '/developers/migration-center/' },
  },
  {
    variant: 'blue' as const,
    icon: <IconTryFree />,
    title: 'Try TiDB Cloud for Free',
    description: 'Spin up a managed TiDB cluster in minutes.',
    cta: { text: 'Start Free Trial', href: 'https://www.pingcap.com/tidb-cloud/' },
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

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
            layout="image-right"
            eyebrow="TiDB Developer Hub"
            headline="Get Started with TiDB"
            subheadline="New to TiDB? Start by spinning up a free cluster, then pick a path based on what you want to build."
            heroImage={{
              src: '/images/developers/get-started-banner.svg',
              alt: 'Get Started Banner',
              width: 517,
              height: 200,
              align: 'right',
            }}
          />

          {/* ── Why TiDB ── */}
          <section className="py-section-sm lg:pb-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Why Do Developers Choose TiDB?" h2Size="md" align="left" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                {whyFeatures.map((f) => (
                  <IconFeatureItem
                    key={f.title}
                    layout="horizontal"
                    icon={f.icon}
                    title={f.title}
                    description={f.description}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ── Featured Quick Starts ── */}
          <section id="quick-starts" className="py-section-sm lg:py-section bg-gradient-dark-bottom">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
                <div className="lg:pt-2">
                  <SectionHeader
                    title={'Featured\nQuick Starts'}
                    h2Size="md"
                    align="left"
                    className="md:!mb-0"
                  />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickStarts.map((item) => (
                    <DeveloperResourceCard key={item.title} item={item} openInNewTab />
                  ))}
                </div>
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
                {/* Right: resource cards — 2 columns */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {basics.map((item) => (
                    <DeveloperResourceCard key={item.title} item={item} openInNewTab />
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
                    icon={card.icon}
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
