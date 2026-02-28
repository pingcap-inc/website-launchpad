import type { Metadata } from 'next'
import { Header, Footer, JsonLd, SectionHeader, HeroSection, SecondaryButton } from '@/components'
import { buildPageSchema, techArticleSchema } from '@/lib/schema'
import { Bot } from 'lucide-react'
import { DeveloperSubnav } from '../_components/DeveloperSubnav'
import { DeveloperResourceCard } from '../_components/DeveloperResourceCard'

export const metadata: Metadata = {
  title: 'Build AI Applications with TiDB | PingCAP Developer Hub',
  description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
  openGraph: {
    title: 'Build AI Applications with TiDB | PingCAP Developer Hub',
    description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
    url: 'https://www.pingcap.com/developer/build-ai-apps/',
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
    title: 'Build AI Applications with TiDB | PingCAP Developer Hub',
    description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developer/build-ai-apps/' },
}

const schema = buildPageSchema({
  path: '/developer/build-ai-apps/',
  title: 'Build AI Applications with TiDB | PingCAP Developer Hub',
  description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developer/' },
    { name: 'Build AI Applications', path: '/developer/build-ai-apps/' },
  ],
  image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
  extraSchemas: [
    techArticleSchema({
      title: 'Build AI Applications with TiDB | PingCAP Developer Hub',
      description: 'Build AI-powered applications with real-time data and vector search on TiDB.',
      url: '/developer/build-ai-apps/',
      image: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
      proficiencyLevel: 'Intermediate',
      dateModified: '2026-02-28',
    }),
  ],
})

const useCases = [
  {
    title: 'AI-powered financial insights',
    description:
      'Building an AI-powered crypto ETF insight app with GPTs and TiDB Cloud Data Service.',
    href: 'https://www.pingcap.com/blog/build-ai-apps-with-tidb/',
    borderClass: 'border-brand-red-primary',
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Building RAG applications with TiDB.',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-integrate-with-llm-frameworks/',
    borderClass: 'border-brand-violet-medium',
  },
  {
    title: 'Agentic AI systems',
    description: 'How to build an AI agent that builds full-stack apps.',
    href: 'https://www.pingcap.com/blog/ai-agent-that-builds-full-stack-apps/',
    borderClass: 'border-brand-blue-medium',
  },
  {
    title: 'AI-ready backends',
    description: 'Mastering TiDB Cloud Data Service: building a data-driven backend.',
    href: 'https://www.pingcap.com/blog/data-service-real-time-apis/',
    borderClass: 'border-brand-teal-medium',
  },
  {
    title: 'Real-time hybrid architectures',
    description: 'Supercharge real-time applications with TiDB and DragonflyDB.',
    href: 'https://www.pingcap.com/blog/realtime-apps-tidb-dragonflydb/',
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
    name: 'Gemini integration',
    subtitle: 'Gemini',
    href: 'https://github.com/pingcap/tidb-vector-python/tree/main/examples/gemini-ai-embeddings-demo',
    logo: 'https://static.pingcap.com/files/2025/07/01063253/icon-gemini.webp',
    cta: 'View Example',
  },
  {
    name: 'LangChain integration',
    subtitle: 'LangChain integration',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-integrate-with-llm-frameworks/#langchain',
    logo: 'https://static.pingcap.com/files/2025/07/01063430/icon-langchain.webp',
    cta: 'Read Docs',
  },
  {
    name: 'LlamaIndex integration',
    subtitle: 'LlamaIndex integration',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-integrate-with-llm-frameworks/#llamaindex',
    logo: 'https://static.pingcap.com/files/2025/07/01063357/icon-llamaindex.webp',
    cta: 'Read Docs',
  },
  {
    name: 'Amazon Bedrock integration',
    subtitle: 'Amazon Bedrock integration',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-integrate-with-llm-frameworks/#amazon-bedrock',
    logo: 'https://static.pingcap.com/files/2026/02/28014556/aws.png',
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
    title: 'Vector Search Functions',
    href: 'https://docs.pingcap.com/tidbcloud/vector-search-functions-and-operators/',
  },
  {
    tag: 'Docs',
    tagClass: 'bg-brand-violet-medium',
    title: 'Design scalable, production-ready AI systems',
    href: 'https://www.pingcap.com/blog/how-to-design-ai-systems-with-vector-search/',
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
            headline="Build AI-powered applications with real-time data and vector search"
            subheadline="Explore how to combine LLMs, embeddings, and live transactional data using TiDB through real AI applications, hands-on integrations, and proven design patterns."
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group min-h-[164px] px-8 py-5 border ${item.borderClass} hover:-translate-y-2 transition-transform duration-200 ease-in-out`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Bot size={24} className="text-text-inverse" />
                      <span className="font-mono text-label text-white px-2 py-0.5 bg-brand-red-light">
                        Blog
                      </span>
                    </div>
                    <h3 className="text-h3-lg font-bold text-text-inverse mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-carbon-400 leading-relaxed">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section bg-gradient-dark-top">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader
                title="Get Hands-On with Vector Search"
                subtitle="Store embeddings, run similarity search, and combine vector queries with SQL in one system."
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vectorHandsOn.map((item) => (
                  <DeveloperResourceCard key={item.title} item={item} openInNewTab />
                ))}
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section-sm bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <SectionHeader
                    title="Integrate with AI Frameworks"
                    subtitle="Use TiDB as the data and retrieval layer in modern AI stacks."
                    align="left"
                    className="mb-0"
                  />
                </div>
                <div className="lg:col-span-7 grid md:grid-cols-2 xl:grid-cols-4 gap-3">
                  {frameworks.map((framework) => (
                    <div
                      key={framework.name}
                      className="group relative overflow-hidden min-h-[148px] border border-border-primary bg-bg-primary flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ease-out"
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
                        <div className="absolute inset-0 bg-brand-red-bg opacity-0 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                          <SecondaryButton
                            href={framework.href}
                            className="mt-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                          >
                            {framework.cta}
                          </SecondaryButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader
                title="Tune and Scale Vector Search"
                subtitle="Use these when you need precise configuration or performance tuning."
                align="left"
              />
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
