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

// âââ Data âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

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

const basics = [
  {
    tag: 'Blog',
    tagColor: '#F35048',
    title: 'How TiDB Compares to Other Databases',
    href: 'https://www.pingcap.com/article/choosing-the-best-open-source-database-tidb-vs-mysql-postgresql-mongodb/',
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
    href: 'https://docs.pingcap.com/tidb/stable/explore-htap/',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'Vector Search',
    href: 'https://docs.pingcap.com/tidb/stable/vector-search-overview',
  },
  {
    tag: 'Infographic',
    tagColor: '#513669',
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

// âââ Page âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export default function GetStartedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        <DeveloperSubnav />

        <main>
          {/* ââ Hero ââ */}
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

          {/* ââ Why TiDB ââ */}
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

          {/* ââ Understand the Basics ââ */}
          
          {/* —— Featured Quick Starts —— */}
          <section id="quick-starts" className="py-section-sm lg:py-section bg-gradient-dark-bottom">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
                {/* Title — 1/3 */}
                <div className="lg:pt-2">
                  <SectionHeader
                    title={'Featured\nQuick Starts'}
                    h2Size="md"
                    align="left"
                    className="md:!mb-0"
                  />
                </div>
                {/* Items — 2/3 */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    {
                      tag: 'Docs',
                      tagColor: '#9E4EC4',
                      title: 'Create a TiDB Cloud Starter Cluster',
                      description: 'Deploy and connect to a fully managed TiDB cluster in minutes.',
                      href: 'https://docs.pingcap.com/tidbcloud/dev-guide-build-cluster-in-cloud/',
                    },
                    {
                      tag: 'Docs',
                      tagColor: '#9E4EC4',
                      title: 'Connect to TiDB with Go-MySQL-Driver',
                      description: 'Connect a Go application to TiDB using the MySQL driver.',
                      href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-sql-driver/',
                    },
                    {
                      tag: 'Docs',
                      tagColor: '#9E4EC4',
                      title: 'Connect to TiDB with Python (Django)',
                      description: 'Connect a Django application to TiDB using django-tidb.',
                      href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-python-django/',
                    },
                    {
                      tag: 'Docs',
                      tagColor: '#9E4EC4',
                      title: 'Connect to TiDB with Node.js (mysql2)',
                      description: 'Connect a Node.js application to TiDB using the mysql2 driver.',
                      href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nodejs-mysql2/',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-mono text-label text-white w-[56px] text-center py-1 shrink-0"
                        style={{ background: item.tagColor }}
                      >
                        {item.tag}
                      </span>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-white hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

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

                {/* Right: article cards â 2 columns */}
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

          {/* ââ Choose What to Do Next ââ */}
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
