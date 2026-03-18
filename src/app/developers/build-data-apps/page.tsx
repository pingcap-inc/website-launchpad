import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer, JsonLd, SectionHeader, SecondaryButton, HeroSection } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { FrameworkSelector } from '../_components/FrameworkSelector'
import { DeveloperResourceCard } from '../_components/DeveloperResourceCard'

export const metadata: Metadata = {
  title: 'Build Data Applications with TiDB | TiDB Developer Hub',
  description:
    'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
  openGraph: {
    title: 'Build Data Applications with TiDB | TiDB Developer Hub',
    description:
      'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
    url: 'https://www.pingcap.com/developers/build-data-apps/',
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
    title: 'Build Data Applications with TiDB | TiDB Developer Hub',
    description:
      'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    site: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developers/build-data-apps/' },
}

const schema = buildPageSchema({
  path: '/developers/build-data-apps/',
  title: 'Build Data Applications with TiDB | TiDB Developer Hub',
  description:
    'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developers/' },
    { name: 'Build Data Applications', path: '/developers/build-data-apps/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Build Data Applications with TiDB | TiDB Developer Hub',
      description:
        'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
      url: '/developers/build-data-apps/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Intermediate',
      dateModified: '2026-02-28',
    }),
  ],
})

const howToGuides = [
  {
    title: 'How do I migrate from MySQL to TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/migrate-from-mysql-using-data-migration',
  },
  {
    title: 'How do I design a schema for TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-schema-design-overview',
  },
  {
    title: 'How do I connect TiDB to my existing app?',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-overview',
  },
  {
    title: 'How do I choose a driver or ORM?',
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-choose-driver-or-orm',
  },
  {
    title: 'How do I run analytics on live transactional data?',
    href: 'https://docs.pingcap.com/tidb/stable/quick-start-with-htap',
  },
  {
    title: 'How do I apply index best practices in TiDB?',
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-index-best-practice',
  },
]

const demoCards = [
  {
    title: 'E-commerce',
    image: '/images/developers/demo-ecommerce.png',
    href: 'https://github.com/Mini256/tidb-snowflake-e-commerce-demo',
  },
  {
    title: 'Insights into Automotive Sales',
    image: '/images/developers/demo-automotive.png',
    href: 'https://car-sales-insight.vercel.app/',
  },
  {
    title: 'Simple S&P500 Dashboard',
    image: '/images/developers/demo-sp500.png',
    href: 'https://sp500-insight.vercel.app/SP500',
  },
]

const localOrCloud = [
  {
    tag: 'Blog',
    tagClass: 'bg-brand-red-light',
    title: 'Kickstart Your Distributed SQL Journey (TiUP Playground)',
    href: 'https://www.pingcap.com/blog/distributed-sql-tutorial-first-steps-setting-up-tidb-locally/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Quick Start with TiDB',
    href: 'https://docs.pingcap.com/tidb/stable/quick-start-with-tidb',
  },
]

const goDeeperColumns = [
  {
    title: 'Schema Design',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Schema Design Overview',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-schema-design-overview',
      },
      {
        tag: 'Blog',
        tagClass: 'bg-brand-red-light',
        title: 'Schema Management',
        href: 'https://www.pingcap.com/article/mastering-schema-management-in-tidb-for-scalable-databases/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Create and Manage Database',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-create-database/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Create and Manage Table',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-create-table',
      },
    ],
  },
  {
    title: 'SQL Reference',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Explore SQL with TiDB (Entry-Level Reference)',
        href: 'https://docs.pingcap.com/tidb/stable/basic-sql-operations/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Full SQL Reference (Language, Statements, Functions)',
        href: 'https://docs.pingcap.com/tidbcloud/sql-statement-overview/',
      },
    ],
  },
  {
    title: 'Indexing Best Practices',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Index Best Practices Guide',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-index-best-practice/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Secondary Index Creation (Supporting)',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-create-secondary-indexes/',
      },
    ],
  },
]

function DemoCard({ title, image, href }: { title: string; image: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden hover:-translate-y-1 transition-transform duration-200 ease-in-out"
    >
      <div className="h-[290px] relative">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute left-8 top-12 font-mono text-label text-text-inverse bg-white/25 px-2 py-0.5">
          Demo
        </div>
        <div className="absolute left-8 top-24 text-h3-lg font-bold text-text-inverse leading-tight max-w-[80%]">
          {title}
        </div>
      </div>
    </a>
  )
}

export default function BuildDataApplicationsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <div className="pt-[62px] lg:pt-20">
        <DeveloperSubnav />
        <main>
          <section className="bg-bg-primary py-10 md:py-0">
            <HeroSection
              layout="image-right"
              eyebrow="TiDB Developer Hub"
              headline="Build Data-Intensive Apps with No Scale Limits"
              subheadline="Connection guides by language and ORM, schema patterns, and demo apps you can run locally or fork on GitHub."
              heroImage={{
                image: { url: '/images/developers/build-data-apps-banner.png' },
                alt: 'Build Data Applications Banner',
                width: 404,
                height: 388,
                align: 'center',
              }}
            />
          </section>

          {/* ── How-To Guides ── */}
          <section
            id="how-to-guides"
            className="py-section-sm lg:py-section bg-gradient-dark-bottom"
          >
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
                <div className="lg:pt-2">
                  <SectionHeader
                    title={'How-To\nGuides'}
                    h2Size="md"
                    align="left"
                    className="md:!mb-0"
                  />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {howToGuides.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border-l-4 border-brand-red-primary bg-bg-secondary hover:bg-carbon-800 px-5 py-4 transition-colors duration-200 ease-in-out"
                    >
                      <p className="text-body-lg font-semibold text-text-inverse leading-snug">
                        {item.title}
                      </p>
                      <span className="text-brand-red-primary text-lg shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:pb-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Start with a Working Example" align="left" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {demoCards.map((card) => (
                  <DemoCard
                    key={card.title}
                    title={card.title}
                    image={card.image}
                    href={card.href}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section-sm bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Try It Locally or in the Cloud" align="left" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                {/* Left: two resource cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {localOrCloud.map((item) => (
                    <DeveloperResourceCard key={item.title} item={item} openInNewTab />
                  ))}
                </div>
                {/* Right: TiDB Cloud Free Trial CTA */}
                <a
                  href="https://tidbcloud.com/free-trial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between bg-brand-red-primary hover:bg-brand-red-dark border border-brand-red-primary hover:-translate-y-1 transition-all duration-200 ease-in-out p-8 min-h-[160px]"
                >
                  <div>
                    <span className="font-mono text-label text-white bg-white/20 px-2 py-0.5 mb-4 inline-block">
                      Free Trial
                    </span>
                    <h3 className="text-h2-mb md:text-h2-sm font-bold text-white leading-tight mt-3 mb-3">
                      TiDB Cloud Free Trial
                    </h3>
                    <p className="text-body-md text-white/80 leading-relaxed">
                      Spin up a fully managed TiDB cluster in minutes. No credit card required.
                    </p>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 border border-white text-white font-medium px-4 py-2 group-hover:bg-white group-hover:text-brand-red-primary transition-colors duration-200">
                      Start for Free ↗
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section-sm bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Connect Your Application Framework" align="left" />
              <FrameworkSelector highlightClassName="text-brand-violet-medium" />
            </div>
          </section>

          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Go Deeper" align="left" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goDeeperColumns.map((column) => (
                  <div key={column.title}>
                    <p className="text-h3-lg font-normal text-text-inverse mb-4">{column.title}</p>
                    <div className="grid grid-cols-1 gap-4">
                      {column.items.map((item) => (
                        <DeveloperResourceCard key={item.title} item={item} openInNewTab />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}
