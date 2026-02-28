import type { Metadata } from 'next'
import { Header, Footer, JsonLd, SectionHeader, SecondaryButton, HeroSection } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { FrameworkSelector } from '../_components/FrameworkSelector'
import { DeveloperResourceCard } from '../_components/DeveloperResourceCard'

export const metadata: Metadata = {
  title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
  description:
    'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
  openGraph: {
    title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
    description:
      'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
    url: 'https://www.pingcap.com/developer/build-data-apps/',
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
    title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
    description:
      'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developer/build-data-apps/' },
}

const schema = buildPageSchema({
  path: '/developer/build-data-apps/',
  title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
  description:
    'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developer/' },
    { name: 'Build Data Applications', path: '/developer/build-data-apps/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
      description:
        'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
      url: '/developer/build-data-apps/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Intermediate',
      dateModified: '2026-02-28',
    }),
  ],
})

const demoCards = [
  {
    title: 'E-commerce',
    variant: 'violet' as const,
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-python-sqlalchemy/',
  },
  {
    title: 'Insights into Automotive Sales',
    variant: 'teal' as const,
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-gorm/',
  },
  {
    title: 'Simple S&P500 Dashboard',
    variant: 'blue' as const,
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nodejs-prisma/',
  },
]

const localOrCloud = [
  {
    tag: 'Blog',
    tagClass: 'bg-brand-red-light',
    title: 'Kickstart Your Distributed SQL Journey (TiUP Playground)',
    href: 'https://www.pingcap.com/blog/distributed-sql-tutorial-first-steps-setting-up-tidb-locally/',
    cta: 'Read More',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Quick Start with TiDB',
    href: 'https://docs.pingcap.com/tidb/stable/get-started-with-tidb/',
    cta: 'Read More',
  },
  {
    tag: 'Guide',
    tagClass: 'bg-brand-blue-medium',
    title: 'TiDB Cloud Free Trial',
    href: 'https://tidbcloud.com/free-trial/',
    cta: 'Start Now',
  },
]

const goDeeperColumns = [
  {
    title: 'Schema design',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Schema design overview',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-overview/',
      },
      {
        tag: 'Blog',
        tagClass: 'bg-brand-red-light',
        title: 'Schema Management',
        href: 'https://www.pingcap.com/blog/database-schema-design-best-practices/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Create and manage database',
        href: 'https://docs.pingcap.com/tidb/stable/sql-statement-create-database/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Create and manage table',
        href: 'https://docs.pingcap.com/tidb/stable/sql-statement-create-table/',
      },
    ],
  },
  {
    title: 'SQL reference',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Explore SQL with TiDB (entry-level reference):',
        href: 'https://docs.pingcap.com/tidb/stable/basic-sql-operations/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Full SQL reference (language, statements, functions):',
        href: 'https://docs.pingcap.com/tidb/stable/sql-statements/',
      },
    ],
  },
  {
    title: 'Indexing best practices',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Index best practices (primary recommendation):',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-index-best-practice/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Secondary index creation (supporting):',
        href: 'https://docs.pingcap.com/tidb/stable/sql-statement-create-index/',
      },
    ],
  },
]

function DemoCard({
  title,
  variant,
  href,
}: {
  title: string
  variant: 'violet' | 'teal' | 'blue'
  href: string
}) {
  const variantClass =
    variant === 'violet'
      ? 'from-brand-violet-dark to-brand-violet-bg'
      : variant === 'teal'
        ? 'from-brand-teal-dark to-brand-teal-bg'
        : 'from-brand-blue-dark to-brand-blue-bg'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-[#214865] overflow-hidden hover:-translate-y-1 transition-transform duration-200 ease-in-out"
    >
      <div className={`h-44 bg-gradient-to-br ${variantClass} relative`}>
        <div className="absolute left-4 top-4 font-mono text-label text-text-inverse bg-white/25 px-2 py-0.5">
          Demo
        </div>
        <div className="absolute left-4 top-12 text-h3-sm font-bold text-text-inverse">{title}</div>
        <div className="absolute -bottom-10 -right-10 w-44 h-44 rotate-45 bg-white/15" />
        <div className="absolute -bottom-14 left-3 w-28 h-28 rotate-45 border border-white/30" />
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
          <HeroSection
            headline="Explore Real TiDB Applications"
            subheadline="Hands-on examples, demos, and frameworks that show how TiDB is used in real-world data applications."
            className="pb-10"
            rightSlot={
              <div className="hidden lg:flex justify-center items-start pt-10">
                <p className="text-brand-red-light text-h3-sm italic">
                  Illustrations to be updated
                </p>
              </div>
            }
          />

          <section className="py-section-sm lg:py-section-sm bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Start with a Working Example" align="left" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {demoCards.map((card) => (
                  <DemoCard
                    key={card.title}
                    title={card.title}
                    variant={card.variant}
                    href={card.href}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section-sm bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Try It Locally or in the Cloud" align="left" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {localOrCloud.map((item) => (
                  <div key={item.title} className="h-full min-h-[180px] flex flex-col">
                    <div className="flex gap-4 mb-4">
                      <span className="w-9 h-9 rounded-full border border-carbon-300 shrink-0" />
                      <div>
                        <span
                          className={`font-mono text-label text-text-inverse px-2 py-0.5 ${item.tagClass}`}
                        >
                          {item.tag}
                        </span>
                        <h3 className="text-h3-sm font-bold text-text-inverse mt-2 mb-4 leading-snug max-w-[360px] flex-1">
                          {item.title}
                        </h3>
                        <SecondaryButton href={item.href}>{item.cta}</SecondaryButton>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <p className="text-body-md text-text-inverse mb-4">{column.title}</p>
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
