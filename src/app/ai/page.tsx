import type { Metadata } from 'next'
import Image from 'next/image'
import { Database, Cpu, BarChart2, Network } from 'lucide-react'
import {
  Header,
  Footer,
  JsonLd,
  PrimaryButton,
  SecondaryButton,
  FeaturesGrid,
  CtaSection,
  ColorCard,
  SectionHeader,
} from '@/components'
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'
import { HeroBackground } from './_components/HeroBackground'

const PAGE_PATH = '/ai/'
const PAGE_TITLE = 'TiDB: The Unified Database for Production AI, RAG & Agents'
const PAGE_DESCRIPTION =
  'TiDB unifies the foundation for production AI. Power accurate RAG and stateful agents with live data, strong consistency, and massive real-time scale.'
const OG_IMAGE = 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `https://www.pingcap.com${PAGE_PATH}`,
    siteName: 'TiDB',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `https://www.pingcap.com${PAGE_PATH}` },
}

const schema = buildPageSchema({
  path: PAGE_PATH,
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB for AI', path: PAGE_PATH },
  ],
  image: OG_IMAGE,
  extraSchemas: [
    softwareApplicationSchema({
      name: 'TiDB',
      description: PAGE_DESCRIPTION,
      url: `https://www.pingcap.com${PAGE_PATH}`,
    }),
  ],
})

const pillars = [
  {
    icon: <Database size={24} className="text-text-inverse" />,
    title: 'Precise Retrieval with Continuously Current Context',
    description:
      'Enable semantic search and RAG experiences that reflect the latest state of your data—without stale indexes or delayed pipelines.',
  },
  {
    icon: <Cpu size={24} className="text-text-inverse" />,
    title: 'Durable State for Autonomous and Multi-Step Agents',
    description:
      'Persist conversations, tool interactions, and workflow progress with consistency designed for long-running and concurrent AI behavior.',
  },
  {
    icon: <BarChart2 size={24} className="text-text-inverse" />,
    title: 'Intelligence Across Operational and Analytical Data',
    description:
      'Allow AI to reason across transactions and analytics together, eliminating complex synchronization between systems.',
  },
  {
    icon: <Network size={24} className="text-text-inverse" />,
    title: 'Distributed Architecture That Scales with AI Demand',
    description:
      'Support growth across users, agents, sessions, and environments with built-in concurrency, isolation, and horizontal expansion.',
  },
]

export default function AiPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        <main>
          {/* 1. Hero — full-bleed animation background */}
          <section className="relative bg-bg-primary min-h-[600px] lg:min-h-[720px] flex items-center overflow-hidden pb-20">
            {/* Background animation — canvas particle network */}
            <HeroBackground />
            {/* Dot-grid background texture at 15% opacity (matches reference) */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                opacity: 0.15,
                backgroundImage:
                  'radial-gradient(circle, rgba(0,255,255,0.55) 1px, transparent 1px)',
                backgroundSize: '35px 35px',
              }}
            />
            {/* Left-to-right overlay for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(to right, #000000 42%, rgba(0,0,0,0.88) 62%, rgba(0,0,0,0.3) 82%, transparent 100%)',
              }}
            />
            {/* Content */}
            <div className="relative z-10 max-w-container mx-auto px-4 md:px-8 lg:px-16 w-full">
              <h1 className="text-h1-mb md:text-h1 font-bold leading-tight max-w-hero-title mb-6">
                <span className="text-text-inverse block">The Database for</span>
                <span className="block text-text-inverse">Production AI</span>
              </h1>
              <p className="text-body-xl text-carbon-300 max-w-subtitle leading-relaxed mb-8">
                From grounded retrieval to stateful agents, TiDB unifies the foundation for
                production AI applications with live data, consistent state, and real-time scale.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <PrimaryButton href="/ai/rag/">Explore Vector Search &amp; RAG</PrimaryButton>
                <SecondaryButton href="/ai/agents/">Build Agentic AI Systems</SecondaryButton>
              </div>
            </div>
          </section>

          {/* 2. Why TiDB for AI — 4 pillars */}
          <FeaturesGrid
            title="The Unified Data Platform for AI-Native Systems"
            subtitle="A single architecture that brings transactional, analytical, and AI workloads together—enabling retrieval, stateful agents, and reasoning in one DB engine."
            features={pillars}
            columns={2}
            className="bg-bg-primary"
          />

          {/* 3. Where TiDB Powers Modern AI — 2 use-case cards */}
          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader
                title="Where TiDB Powers Modern AI"
                subtitle="From retrieval-driven experiences to autonomous agent systems, TiDB supports the architectures teams rely on to rapidly build and operate AI at scale."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorCard
                  variant="red"
                  title="Search, Retrieval, and RAG"
                  description="Build accurate, context-aware AI experiences using semantic search, hybrid queries, and continuously fresh data."
                  cta={{ text: 'Explore Vector Search & RAG', href: '/ai/rag/' }}
                />
                <ColorCard
                  variant="violet"
                  title="Stateful Agents and Autonomous Workflows"
                  description="Build agents that maintain memory, coordinate tools, and operate reliably across complex, multi-step processes."
                  cta={{ text: 'Explore Agentic AI', href: '/ai/agents/' }}
                />
              </div>
            </div>
          </section>

          {/* 4. Social proof — Proven in Real-World AI Deployments */}
          <section className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <SectionHeader
                title="Proven in Real-World AI Deployments"
                subtitle="Teams building AI‑driven applications rely on TiDB to support retrieval, agents, and live data across users, workloads, and environments."
              />
              <div className="border border-carbon-800 p-8 md:p-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <blockquote className="md:col-span-8 text-body-xl italic text-text-inverse leading-relaxed">
                  &ldquo;We migrated to TiDB Cloud in just two weeks. It let us scale our agentic AI
                  platform seamlessly—without needing to re-architect our system.&rdquo;
                </blockquote>
                <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3">
                  <Image
                    src="https://static.pingcap.com/files/2026/01/20080234/manus.png"
                    alt="Manus"
                    width={80}
                    height={24}
                    className="object-contain"
                  />
                  <div className="md:text-right">
                    <p className="text-body-md font-bold text-text-inverse">Ziming Miao</p>
                    <p className="text-body-sm text-text-secondary">VP of Engineering, Manus</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Bottom CTA */}
          <CtaSection
            title="Deploy AI on a Trusted Data Platform"
            subtitle="Start building AI with TiDB in minutes, or connect with our team to design systems tailored to your application."
            primaryCta={{
              text: 'Get Started with TiDB',
              href: 'https://tidbcloud.com/free-trial/',
            }}
            secondaryCta={{
              text: 'Talk to an AI Expert',
              href: 'https://www.pingcap.com/contact-us/',
            }}
          />
        </main>
      </div>

      <Footer />
    </>
  )
}
