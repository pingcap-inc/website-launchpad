import type { Metadata } from 'next'
import type React from 'react'
import { Header, Footer, JsonLd, SectionHeader, HeroSection } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import {
  IconMySQLCompatibility,
  IconTiDBLimitations,
  IconTiDBCloudMigration,
  IconMigrateSelfManagedToCloud,
  IconMigrationOverview,
  IconPlanCluster,
  IconPerformanceReference,
  IconMigrateFromMySQL,
  IconMigrateIncremental,
  IconMigrateMySQLShards,
  IconMigrateAwsDms,
  IconPrecheckErrors,
  IconTroubleshootData,
} from '../_components/icons'

export const metadata: Metadata = {
  title: 'Migration Center | TiDB Developer Hub',
  description:
    'Evaluate fit, plan safely, and migrate your data to TiDB with a clear staged approach.',
  openGraph: {
    title: 'Migration Center | TiDB Developer Hub',
    description:
      'Evaluate fit, plan safely, and migrate your data to TiDB with a clear staged approach.',
    url: 'https://www.pingcap.com/developers/migration-center/',
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
    title: 'Migration Center | TiDB Developer Hub',
    description:
      'Evaluate fit, plan safely, and migrate your data to TiDB with a clear staged approach.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    site: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developers/migration-center/' },
}

const schema = buildPageSchema({
  path: '/developers/migration-center/',
  title: 'Migration Center | TiDB Developer Hub',
  description:
    'Evaluate fit, plan safely, and migrate your data to TiDB with a clear staged approach.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developers/' },
    { name: 'Migration Center', path: '/developers/migration-center/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Migration Center | TiDB Developer Hub',
      description:
        'Evaluate fit, plan safely, and migrate your data to TiDB with a clear staged approach.',
      url: '/developers/migration-center/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Intermediate',
      dateModified: '2026-02-28',
    }),
  ],
})

const journey = [
  {
    title: 'Evaluate',
    subtitle: 'Is TiDB the right fit for your workload?',
    description:
      'Understand MySQL compatibility, supported scenarios, and key differences before committing.',
    cards: [
      {
        title: 'MySQL Compatibility',
        href: 'https://docs.pingcap.com/tidb/stable/mysql-compatibility/',
        icon: <IconMySQLCompatibility />,
      },
      {
        title: 'TiDB Limitations',
        href: 'https://docs.pingcap.com/tidb/stable/tidb-limitations/',
        icon: <IconTiDBLimitations />,
      },
      {
        title: 'TiDB Cloud Migration Overview',
        href: 'https://docs.pingcap.com/tidbcloud/tidb-cloud-migration-overview/',
        icon: <IconTiDBCloudMigration />,
      },
      {
        title: 'Migrate from TiDB Self-Managed to TiDB Cloud',
        href: 'https://docs.pingcap.com/tidbcloud/migrate-from-op-tidb/',
        icon: <IconMigrateSelfManagedToCloud />,
      },
    ],
  },
  {
    title: 'Plan',
    subtitle: 'Design a safe migration before touching production.',
    description: 'Choose the right strategy, understand tradeoffs, and plan for rollback.',
    cards: [
      {
        title: 'Migration Overview (TiDB Cloud)',
        href: 'https://docs.pingcap.com/tidbcloud/tidb-cloud-migration-overview/',
        icon: <IconMigrationOverview />,
      },
      {
        title: 'Plan Your Cluster (Sizing & Capacity)',
        href: 'https://docs.pingcap.com/tidbcloud/size-your-cluster',
        icon: <IconPlanCluster />,
      },
      {
        title: 'TiDB Cloud Performance Reference',
        href: 'https://docs.pingcap.com/tidbcloud/tidb-cloud-performance-reference',
        icon: <IconPerformanceReference />,
      },
    ],
  },
  {
    title: 'Execute',
    subtitle: 'Move data using the right tools for your scenario.',
    description: 'High-level guidance on what tool to use when with links to step-by-step docs.',
    cards: [
      {
        title: 'Migrate from MySQL Using Data Migration (DM)',
        href: 'https://docs.pingcap.com/tidbcloud/migrate-from-mysql-using-data-migration/',
        icon: <IconMigrateFromMySQL />,
      },
      {
        title: 'Migrate Incremental Data Using DM',
        href: 'https://docs.pingcap.com/tidbcloud/migrate-incremental-data-from-mysql-using-data-migration/',
        icon: <IconMigrateIncremental />,
      },
      {
        title: 'Migrate MySQL Shards',
        href: 'https://docs.pingcap.com/tidbcloud/migrate-sql-shards/',
        icon: <IconMigrateMySQLShards />,
      },
      {
        title: 'Migrate Using AWS DMS',
        href: 'https://docs.pingcap.com/tidbcloud/migrate-from-mysql-using-aws-dms/',
        icon: <IconMigrateAwsDms />,
      },
    ],
  },
  {
    title: 'Validate & Cut Over',
    subtitle: 'Go live with confidence.',
    description: 'Verify correctness, consistency, and readiness before cutover.',
    cards: [
      {
        title: 'Precheck Errors & Migration Troubleshooting',
        href: 'https://docs.pingcap.com/tidbcloud/tidb-cloud-dm-precheck-and-troubleshooting',
        icon: <IconPrecheckErrors />,
      },
      {
        title: 'Troubleshoot Data Inconsistency Errors',
        href: 'https://docs.pingcap.com/tidb/stable/troubleshoot-data-inconsistency-errors',
        icon: <IconTroubleshootData />,
      },
    ],
  },
]

interface JourneyCard {
  title: string
  href: string
  icon?: React.ReactNode
}

function MigrationDocCard({ card }: { card: JourneyCard }) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-[168px] min-h-[164px] px-4 py-5 border border-border-primary hover:-translate-y-2 transition-transform duration-200 ease-in-out flex flex-col items-center justify-start text-center"
    >
      <span className="mb-4 shrink-0">{card.icon}</span>
      <p className="text-body-sm text-text-inverse leading-snug">{card.title}</p>
    </a>
  )
}

export default function MigrationCenterPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        <DeveloperSubnav />

        <main>
          <HeroSection
            layout="image-right"
            headline="Migrate to TiDB with Confidence"
            subheadline="The Migration Center helps you evaluate fit, plan safely, and migrate your data to TiDB with a clear, staged approach. It focuses on decisions, sequencing, and risk reduction, while routing detailed execution steps to the right documentation."
            className="pb-8"
            heroImage={{
              src: '/images/developers/migrate-banner.svg',
              alt: 'Migration Center Banner',
              width: 431,
              height: 329,
              align: 'right',
            }}
          />

          <section className="py-section-sm lg:pb-section bg-gradient-dark-bottom">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Migration Journey" align="left" />

              <div className="space-y-10 lg:space-y-12">
                {journey.map((stage) => (
                  <div
                    key={stage.title}
                    className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6 lg:gap-8 items-start"
                  >
                    <div>
                      <h3 className="text-h2-mb md:text-h2-sm font-bold text-text-inverse leading-tight mb-4">
                        {stage.title}
                      </h3>
                      <h4 className="text-h3-lg font-bold text-text-inverse leading-snug mb-3">
                        {stage.subtitle}
                      </h4>
                      <p className="text-body-md text-carbon-400 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {stage.cards.map((card) => (
                        <MigrationDocCard key={card.title} card={card} />
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
