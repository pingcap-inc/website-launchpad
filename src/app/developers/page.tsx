import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Header,
  HeroSection,
  Footer,
  JsonLd,
  SecondaryButton,
  ColorCard,
  SectionHeader,
  FeatureCard,
} from '@/components'
import { DeveloperSubnav } from './_components/DeveloperSubnav'
import { IconOltpD, IconSelfManagedC, IconBuildAi, IconMigration } from './_components/icons'
import { buildPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Developer Hub: Build Real-Time Applications with TiDB | TiDB',
  description:
    'Everything you need to build scalable, real-time applications ith TiDB. Quick starts, tutorials, courses, and community resources for developers.',
  openGraph: {
    title: 'Developer Hub: Build Real-Time Applications with TiDB | TiDB',
    description:
      'Everything you need to build scalable, real-time applications with TiDB. Quick starts, tutorials, courses, and community resources for developers.',
    url: 'https://www.pingcap.com/developers/',
    siteName: 'TiDB',
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
    title: 'Developer Hub: Build Real-Time Applications with TiDB | TiDB',
    description:
      'Everything you need to build scalable, real-time applications with TiDB. Quick starts, tutorials, courses, and community resources for developers.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    site: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developers/' },
}

const schema = buildPageSchema({
  path: '/developers/',
  title: 'Developer Hub',
  description: 'Everything you need to build scalable, real-time applications with TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developers/' },
  ],
})

// âââ Data âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const pathCards = [
  {
    variant: 'red' as const,
    icon: <IconOltpD />,
    title: 'Get Started',
    description:
      'New to TiDB? Learn what it is, how it works, and run your first cluster in minutes.',
    cta: { text: 'Explore', href: '/developers/get-started' },
  },
  {
    variant: 'violet' as const,
    icon: <IconSelfManagedC />,
    title: 'Build Data Applications',
    description:
      'Connect services, model data, and run transactional and analytical workloads in one system',
    cta: { text: 'Explore', href: '/developers/build-data-apps' },
  },
  {
    variant: 'blue' as const,
    icon: <IconBuildAi />,
    title: 'Build AI Applications',
    description:
      'Build RAG, semantic search, and agentic AI apps using vector search and real-time data.',
    cta: { text: 'Explore', href: '/developers/build-ai-apps' },
  },
  {
    variant: 'teal' as const,
    icon: <IconMigration />,
    title: 'Migration Center',
    description:
      'Evaluate compatibility, plan safely, and migrate from MySQL or other databases to TiDB',
    cta: { text: 'Explore', href: '/developers/migration-center' },
  },
]

const howToGuides = [
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'How do I migrate from MySQL to TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/migrate-from-mysql-using-data-migration',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'How do I build a RAG pipeline with TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-python',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'How do I run analytics on live transactional data?',
    href: 'https://docs.pingcap.com/tidb/stable/quick-start-with-htap',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'How do I connect TiDB to my existing app?',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-overview',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4',
    title: 'How do I store and query vector embeddings in TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-sql',
  },
]

const quickStarts = [
  {
    tag: 'GitHub',
    tagColor: '#A8752B', // brand-mango-600
    title: 'Quick Start for AI with TiDB',
    description: 'Get started with vector search and build your first AI-powered TiDB application.',
    href: 'https://pingcap.github.io/ai/quickstart/',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4', // brand-violet-medium
    title: 'Create a TiDB Cloud Starter Cluster',
    description: 'Deploy and connect to a fully managed TiDB cluster in minutes.',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-build-cluster-in-cloud/',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4', // brand-violet-medium
    title: 'Quick Start Guide for TiDB Data Migration',
    description: 'Move data from MySQL to TiDB using Data Migration (DM) with minimal downtime.',
    href: 'https://docs.pingcap.com/tidb/v5.4/quick-start-with-dm/',
  },
  {
    tag: 'Docs',
    tagColor: '#9E4EC4', // brand-violet-medium
    title: 'Connect to TiDB with Go-MySQL-Driver',
    description: 'Connect a Go application to TiDB Cloud using the standard sql.DB driver.',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-sql-driver/',
  },
]

const tutorials = [
  {
    tag: 'Blog',
    title: 'Kickstart Your Distributed SQL Journey',
    description:
      'A step-by-step guide to running your first TiDB cluster on your local machine â no cloud account required.',
    href: 'https://www.pingcap.com/blog/distributed-sql-tutorial-first-steps-setting-up-tidb-locally/',
    image: '/images/developers/tutorials-1.png',
  },
  {
    tag: 'Blog',
    title: 'How to Build an AI Agent That Builds Full-Stack Apps',
    description:
      'Use TiDB vector search to build an AI agent that generates and deploys full-stack applications end to end.',
    href: 'https://www.pingcap.com/blog/ai-agent-that-builds-full-stack-apps/',
    image: '/images/developers/tutorials-2.png',
  },
  {
    tag: 'Blog',
    title: 'How to Scale TiDB Locally with Online DDL',
    description:
      'Learn how TiDB handles schema changes online, eliminating table locks and service interruptions.',
    href: 'https://www.pingcap.com/blog/scaling-tidb-locally-online-ddl-tutorial/',
    image: '/images/developers/tutorials-3.png',
  },
]

const courses = [
  {
    tag: 'Beginner',
    icon: (
      <Image
        src="/images/developers/course-beginner.svg"
        alt=""
        width={90}
        height={60}
        className="object-contain"
      />
    ),
    title: 'TiDB Certified Practitioner Learning Path',
    description:
      'Learn TiDB fundamentals through a self-paced course and hands-on labs, covering architecture, HTAP capabilities, zero downtime, and culminating in a free certification exam.',
    href: 'https://www.pingcap.com/education/#beginner_path',
    borderColor: 'border-brand-red-primary',
  },
  {
    tag: 'AI',
    icon: (
      <Image
        src="/images/developers/course-ai.svg"
        alt=""
        width={90}
        height={60}
        className="object-contain"
      />
    ),
    title: 'Generative AI Learning Path',
    description:
      'Build AI applications using TiDB Cloud as a unified storage layer, mastering Retrieval-Augmented Generation and Text-to-SQL with hands-on labs featuring Amazon Bedrock and OpenAI.',
    href: 'https://www.pingcap.com/education/#ai_path',
    borderColor: 'border-brand-violet-medium',
  },
  {
    tag: 'Architect',
    icon: (
      <Image
        src="/images/developers/course-architect.svg"
        alt=""
        width={90}
        height={60}
        className="object-contain"
      />
    ),
    title: 'Architect & DBA: Migration to TiDB Learning Path',
    description:
      'Understand the migration process to TiDB, equipping yourself with skills to transition databases smoothly and efficiently.',
    href: 'https://www.pingcap.com/education/#migration_path',
    borderColor: 'border-brand-blue-medium',
  },
]

const community = [
  {
    name: 'Discord',
    href: 'https://discord.gg/DQZ2dy3cuc',
    cta: 'Join Discord',
    bgColor: 'bg-brand-red-bg',
    path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.019.011.037.024.049a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  },
  {
    name: 'slack',
    href: 'https://slack.tidb.io/',
    cta: 'Join Slack',
    bgColor: 'bg-brand-violet-bg',
    path: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z',
  },
  {
    name: 'reddit',
    href: 'https://www.reddit.com/r/TiDB/',
    cta: 'Join reddit',
    bgColor: 'bg-brand-blue-bg',
    path: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/pingcap',
    cta: 'Visit GitHub',
    bgColor: 'bg-brand-teal-bg',
    path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
]

// âââ Page âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export default function DeveloperHubPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        {/* ââ Secondary subnav ââ */}
        <DeveloperSubnav />

        <main>
          {/* ââ Hero ââ */}
          <HeroSection
            layout="image-right"
            eyebrow="TiDB Developer Hub"
            headline={'Build Scalable, \nReal-Time Applications with TiDB'}
            primaryCta={{ text: 'Try for Free', href: 'https://tidbcloud.com/free-trial/' }}
            secondaryCta={{ text: 'Deep Dive with Docs', href: 'https://docs.pingcap.com/' }}
            heroImage={{
              src: '/images/developers/developers-banner.svg',
              alt: 'Developers Banner',
              width: 570,
              height: 444,
              align: 'right',
            }}
          />

          {/* ââ Choose Your Path ââ */}
          <section className="py-section-sm lg:pb-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader className="md:mb-6" subtitle="Choose Your Path" align="left" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pathCards.map((card) => (
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

          {/* ââ Featured Quick Starts ââ */}
          <section id="get-started" className="py-section-sm lg:py-section bg-gradient-dark-bottom">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
                {/* Title â 1/3 */}
                <div className="lg:pt-2">
                  <SectionHeader
                    title={'Featured\nQuick Starts'}
                    h2Size="md"
                    align="left"
                    className="md:!mb-0"
                  />
                </div>
                {/* Items â 2/3 */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {quickStarts.map((item) => (
                    <div key={item.title} className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-mono text-label text-white w-[56px] text-center py-1 shrink-0"
                        style={{ background: item.tagColor }}
                      >
                        {item.tag}
                      </span>
                      <SecondaryButton href={item.href}>{item.title}</SecondaryButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          {/* ── How-To Guides ── */}
          <section id="how-to-guides" className="py-section-sm lg:py-section bg-gradient-dark-bottom">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
                <div className="lg:pt-2">
                  <SectionHeader
                    title={"How-To\nGuides"}
                    h2Size="md"
                    align="left"
                    className="md:!mb-0"
                  />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {howToGuides.map((item) => (
                    <div key={item.title}>
                      <SecondaryButton href={item.href}>{item.title}</SecondaryButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

                    {/* ââ Featured Tutorials ââ */}
          <section id="learn" className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Featured Tutorials" align="left" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tutorials.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group flex flex-col overflow-hidden bg-[#06111A] hover:bg-[#0A1828] hover:-translate-y-2 transition-all duration-200 ease-in-out"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[3/1] overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-contain" />
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="inline-block font-mono text-label text-white bg-brand-red-light px-2 py-0.5 mb-4 self-start">
                        {item.tag}
                      </span>
                      <h3 className="text-h3-sm font-bold text-text-inverse leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ââ Courses ââ */}
          <section className="py-section-sm lg:py-section">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Developer Courses" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courses.map((item) => (
                  <FeatureCard
                    key={item.title}
                    icon={item.icon}
                    title={`${item.tag}: ${item.title}`}
                    description={item.description}
                    borderColor={item.borderColor}
                    href={item.href}
                  />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <SecondaryButton href="https://www.pingcap.com/education/">
                  View More
                </SecondaryButton>
              </div>
            </div>
          </section>

          {/* ââ Community ââ */}
          <section className="py-section-sm lg:py-section">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader title="Join the TiDB Community" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {community.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border border-carbon-800 hover:-translate-y-2 transition-transform duration-200 ease-in-out"
                  >
                    <div
                      className={`flex items-center justify-center gap-3 h-24 py-4 ${platform.bgColor}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-7 h-7 text-white shrink-0"
                      >
                        <path d={platform.path} />
                      </svg>
                      <span className="text-white font-bold text-h3-sm">{platform.name}</span>
                    </div>
                    <div className="flex items-center justify-center py-10 bg-bg-primary">
                      <SecondaryButton href={platform.href}>{platform.cta}</SecondaryButton>
                    </div>
                  </a>
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
