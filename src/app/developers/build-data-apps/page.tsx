import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer, JsonLd, SectionHeader, SecondaryButton, HeroSection } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { FrameworkSelector } from '../_components/FrameworkSelector'
import { DeveloperResourceCard } from '../_components/DeveloperResourceCard'
import { IconFrame, IconPoint, IconRocket } from '../_components/icons'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
  description:
    'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
  openGraph: {
    title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
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
    title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
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
  title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
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
      title: 'Build Data Applications with TiDB | PingCAP Developer Hub',
      description:
        'Hands-on examples, frameworks, and best practices for building real-world data applications with TiDB.',
      url: '/developers/build-data-apps/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Intermediate',
      dateModified: '2026-02-28',
    }),
  ],
})

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
    icon: <IconFrame />,
    tag: 'Blog',
    tagClass: 'bg-brand-red-light',
    title: 'Kickstart Your Distributed SQL Journey (TiUP Playground)',
    href: 'https://www.pingcap.com/blog/distributed-sql-tutorial-first-steps-setting-up-tidb-locally/',
    cta: 'Read More',
  },
  {
    icon: <IconRocket />,
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Quick Start with TiDB',
    href: 'https://docs.pingcap.com/tidb/stable/get-started-with-tidb/',
    cta: 'Read More',
  },
  {
    icon: <IconPoint />,
    tagClass: 'bg-brand-blue-medium',
    title: 'TiDB Cloud Free Trial',
    href: 'https://tidbcloud.com/free-trial/',
    cta: 'Start Now',
  },
]

const goDeeperColumns = [
  {
    title: 'Schema Design',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Schema design overview',
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
        title: 'Create and manage database',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-create-database/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Create and manage table',
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
        title: 'Explore SQL with TiDB (Entry-Level Reference):',
        href: 'https://docs.pingcap.com/tidb/stable/basic-sql-operations/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Full SQL Reference (Language, Statements, Functions):',
        href: 'https://docs.pingcap.com/tidb/stable/sql-statements/',
      },
    ],
  },
  {
    title: 'Indexing Best Practices',
    items: [
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Index Best Practices (Primary Recommendation):',
        href: 'https://docs.pingcap.com/tidb/stable/dev-guide-index-best-practice/',
      },
      {
        tag: 'Docs',
        tagClass: 'bg-brand-violet-medium',
        title: 'Secondary index creation (supporting):',
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
          <HeroSection
            layout="image-right"
            headline="Explore Real TiDB Applications"
            subheadline="Hands-on examples, demos, and frameworks that show how TiDB is used in real-world data applications."
            heroImage={{
              src: '/images/developers/build-data-apps-banner.png',
              alt: 'Build Data Applications Banner',
              width: 404,
              height: 388,
              align: 'center',
            }}
          />

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {localOrCloud.map((item) => (
                  <div key={item.title} className="h-full min-h-[180px] flex flex-col">
                    <div className="flex gap-4 mb-4">
                      <div className="mt-8">{item.icon}</div>
                      <div>
                        <span
                          className={cn(
                            'font-mono text-label text-text-inverse px-2 py-0.5',
                            item.tag && item.tagClass
                          )}
                        >
                          {item.tag}
                        </span>
                        <h3 className="text-h3-lg font-bold text-text-inverse mt-2 mb-4 leading-snug max-w-[360px] flex-1">
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
