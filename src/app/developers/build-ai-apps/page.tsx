import type { Metadata } from 'next'
import { Header, Footer, JsonLd, SectionHeader, HeroSection, SecondaryButton } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { Bot, Icon } from 'lucide-react'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { DeveloperResourceCard } from '../_components/DeveloperResourceCard'
import { IconAi, IconAiBackends, IconFinancial, IconRag, IconRealTime } from '../_components/icons'

export const metadata: Metadata = {
  title: 'Build AI Applications with TiDB | TiDB Developer Hub',
  description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
  openGraph: {
    title: 'Build AI Applications with TiDB | TiDB Developer Hub',
    description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
    url: 'https://www.pingcap.com/developers/build-ai-apps/',
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
    title: 'Build AI Applications with TiDB | TiDB Developer Hub',
    description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    site: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developers/build-ai-apps/' },
}

const schema = buildPageSchema({
  path: '/developers/build-ai-apps/',
  title: 'Build AI Applications with TiDB | TiDB Developer Hub',
  description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developers/' },
    { name: 'Build AI Applications', path: '/developers/build-ai-apps/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Build AI Applications with TiDB | TiDB Developer Hub',
      description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
      url: '/developers/build-ai-apps/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Intermediate',
      dateModified: '2026-02-28',
    }),
  ],
})

const howToGuides = [
  {
    title: 'How do I build a RAG pipeline with TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-python',
  },
  {
    title: 'How do I store and query vector embeddings?',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-sql',
  },
  {
    title: 'How do I integrate TiDB with LangChain?',
    href: 'https://docs.pingcap.com/tidb/stable/vector-search-integrate-with-langchain',
  },
  {
    title: 'How do I integrate TiDB with LlamaIndex?',
    href: 'https://docs.pingcap.com/tidb/stable/vector-search-integrate-with-llamaindex',
  },
  {
    title: 'How do I run hybrid search in TiDB?',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-hybrid-search',
  },
  {
    title: 'How do I improve vector search performance?',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-improve-performance',
  },
]

const useCases = [
  {
    icon: <IconFinancial />,
    title: 'AI-Powered Financial Insights',
    description: 'Building an AI-powered crypto ETF insight app with GPTs and TiDB Cloud Data Service.',
    href: 'https://www.pingcap.com/blog/building-ai-powered-crypto-etf-insights-app-gpts-tidb-cloud-data-service/',
    borderClass: 'border-brand-red-primary',
  },
  {
    icon: <IconRag />,
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Building RAG applications with TiDB.',
    href: 'https://www.pingcap.com/blog/dify-tidb-build-scalable-ai-agent-with-knowledge-base/',
    borderClass: 'border-brand-violet-medium',
  },
  {
    icon: <IconAi />,
    title: 'Agentic AI Systems',
    description: 'How to build an AI agent that builds full-stack apps.',
    href: 'https://www.pingcap.com/blog/ai-agent-that-builds-full-stack-apps/',
    borderClass: 'border-brand-blue-medium',
  },
  {
    icon: <IconAiBackends />,
    title: 'AI-Ready Backends',
    description: 'Mastering TiDB Cloud Data Service: building a data-driven backend.',
    href: 'https://www.pingcap.com/blog/building-a-data-driven-backend-with-data-service/',
    borderClass: 'border-brand-teal-medium',
  },
  {
    icon: <IconRealTime />,
    title: 'Real-Time Hybrid Architectures',
    description: 'Supercharge real-time applications with TiDB and DragonflyDB.',
    href: 'https://www.pingcap.com/blog/supercharging-real-time-applications-tidb-dragonflydb/',
    borderClass: 'border-brand-red-primary',
  },
]

const vectorHandsOn = [
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Get Started with Vector Search (Python)',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-python/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Get Started with Vector Search (SQL)',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-sql/',
  },
]

const frameworks = [
  {
    name: 'Amazon Bedrock',
    subtitle: 'Amazon Bedrock',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-integrate-with-amazon-bedrock/',
    logo: 'https://static.pingcap.com/files/2026/02/28014556/aws.png',
    cta: 'Read Docs',
  },
  {
    name: 'Gemini integration',
    subtitle: 'Gemini',
    href: 'https://github.com/pingcap/tidb-vector-python/tree/main/examples/gemini-ai-embeddings-demo',
    logo: 'https://static.pingcap.com/files/2025/07/01063253/icon-gemini.webp',
    cta: 'View Example',
  },
  {
    name: 'LangChain integration',
    subtitle: 'LangChain',
    href: 'https://www.pingcap.com/article/step-by-step-guide-to-langchain-integration/',
    logo: 'https://static.pingcap.com/files/2025/07/01063430/icon-langchain.webp',
    cta: 'Read Docs',
  },
  {
    name: 'LlamaIndex integration',
    subtitle: 'LlamaIndex',
    href: 'https://docs.pingcap.com/tidb/stable/vector-search-integrate-with-llamaindex/',
    logo: 'https://static.pingcap.com/files/2025/07/01063357/icon-llamaindex.webp',
    cta: 'Read Docs',
  },
]

const tuneAndScale = [
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Vector Search Data Types',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-data-types/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Vector Data Operators',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-functions-and-operators/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Design Scalable, Production-Ready AI Systems',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-hybrid-search/',
  },
]

export default function BuildAiAppsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <div className="pt-[62px] lg:pt-20">
        <DeveloperSubnav />
        <main>
          <HeroSection
            layout="image-right"
            eyebrow="TiDB Developer Hub"
            headline="Add AI features to your app using TiDB"
            subheadline="Vector search, RAG patterns, and LLM integrations — with working code for LangChain, LlamaIndex, and raw SQL."
            heroImage={{
              src: '/images/developers/build-ai-apps-banner.svg',
              alt: 'Build AI Applications Banner',
              width: 427,
              height: 444,
              align: 'right',
            }}
          />

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

          <section className="py-section-sm lg:pb-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader
                title="Explore Real AI Use Cases"
                subtitle="See how teams build end-to-end AI systems on TiDB, from data ingestion to intelligent user experiences."
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {useCases.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`group min-h-[164px] px-8 py-5 border ${item.borderClass} hover:-translate-y-2 transition-transform duration-200 ease-in-out`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      {item.icon}
                      <span className="font-mono text-label text-white px-2 py-0.5 bg-brand-red-light">
                        Blog
                      </span>
                    </div>
                    <h3 className="text-h3-lg font-bold text-text-inverse mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-carbon-400 leading-relaxed">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section bg-gradient-dark-bottom">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="mb-8 md:mb-16">
                <h2 className="text-h2-mb md:text-h2-lg font-bold leading-tight mb-4 text-text-inverse">
                  Get Hands-On with Vector Search
                </h2>
                <p className="text-body-xl leading-relaxed text-text-secondary">
                  Store embeddings, run similarity search, and combine vector queries with SQL in one system.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vectorHandsOn.map((item) => (
                  <DeveloperResourceCard key={item.title} item={item} openInNewTab />
                ))}
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <SectionHeader
                    title={'Integrate with \nAI Frameworks'}
                    subtitle="Use TiDB as the data and retrieval layer in modern AI stacks."
                    align="left"
                    className="md:!mb-0"
                  />
                </div>
                <div className="lg:col-span-7 grid md:grid-cols-2 xl:grid-cols-4 gap-3">
                  {frameworks.map((framework) => (
                    <div
                      key={framework.name}
                      className="group relative overflow-hidden min-h-[182px] border border-border-primary bg-bg-primary flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ease-out"
                    >
                      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                        <div className=" p-4 group-hover:opacity-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={framework.logo}
                            alt={framework.name}
                            className="h-7 w-auto object-contain mb-3 mx-auto"
                          />
                          <p className="text-body-md text-text-inverse">{framework.subtitle}</p>
                        </div>
                        <a
                          href={framework.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-brand-red-bg opacity-0 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <SecondaryButton
                            href={framework.href}
                            className="mt-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                          >
                            {framework.cta}
                          </SecondaryButton>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="mb-8 md:mb-16">
                <h2 className="text-h2-mb md:text-h2-lg font-bold leading-tight mb-4 text-text-inverse">
                  Tune and Scale Vector Search
                </h2>
                <p className="text-body-xl leading-relaxed text-text-secondary">
                  Use these when you need precise configuration or performance tuning.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tuneAndScale.map((item) => (
                  <DeveloperResourceCard key={item.title} item={item} openInNewTab />
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
