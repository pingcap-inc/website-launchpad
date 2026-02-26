import type { Metadata } from 'next'
import { Navbar, Footer, JsonLd, PrimaryButton, SecondaryButton } from '@/components'
import { buildPageSchema } from '@/lib/schema'
import { Rocket, Database, Cpu, GitBranch, ArrowUpRight, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Developer Hub — Build with TiDB | PingCAP',
  description: 'Everything you need to build scalable, real-time applications with TiDB. Quick starts, tutorials, courses, and community resources for developers.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/developer/' },
}

const schema = buildPageSchema({
  path: '/developer/',
  title: 'Developer Hub — Build with TiDB | PingCAP',
  description: 'Everything you need to build scalable, real-time applications with TiDB.',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Developer Hub', path: '/developer/' },
  ],
})

// ─── Data ─────────────────────────────────────────────────────────────────────

const devNav = [
  { label: 'Get Started',              href: '#get-started' },
  { label: 'Build Data Applications',  href: '#data-apps' },
  { label: 'Build AI Applications',    href: '#ai-apps' },
  { label: 'Migration Center',         href: '#migration' },
  { label: 'Run and Optimize',         href: '#run-optimize' },
  { label: 'Learn',                    href: '#learn' },
]

const pathCards = [
  {
    icon: Rocket,
    title: 'Get Started',
    description: 'New to TiDB? Learn what it is, how it works, and run your first cluster in minutes.',
    href: '#get-started',
  },
  {
    icon: Database,
    title: 'Build Data Applications',
    description: 'Connect services, model data, and run transactional and analytical workloads in one system.',
    href: '#data-apps',
  },
  {
    icon: Cpu,
    title: 'Build AI Applications',
    description: 'Build RAG, semantic search, and agentic AI apps using vector search and real-time data.',
    href: '#ai-apps',
  },
  {
    icon: GitBranch,
    title: 'Migration Center',
    description: 'Evaluate compatibility, plan safely, and migrate from MySQL or other databases to TiDB.',
    href: '#migration',
  },
]

const quickStarts = [
  {
    tag: 'AI',
    title: 'TiDB AI Quickstart',
    description: 'Get started with vector search and build your first AI-powered TiDB application.',
    href: 'https://pingcap.github.io/ai/quickstart/',
  },
  {
    tag: 'Cloud',
    title: 'Build Your First TiDB Cloud Cluster',
    description: 'Deploy and connect to a fully managed TiDB cluster in minutes.',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-build-cluster-in-cloud/',
  },
  {
    tag: 'Migration',
    title: 'Quickstart with Data Migration',
    description: 'Move data from MySQL to TiDB using Data Migration (DM) with minimal downtime.',
    href: 'https://docs.pingcap.com/tidb/v5.4/quick-start-with-dm/',
  },
  {
    tag: 'Go',
    title: 'Build a Go App with sql.DB',
    description: 'Connect a Go application to TiDB Cloud using the standard sql.DB driver.',
    href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-sql-driver/',
  },
]

const tutorials = [
  {
    tag: 'SQL',
    title: 'First Steps: Setting Up TiDB Locally',
    description: 'A step-by-step guide to running your first TiDB cluster on your local machine — no cloud account required.',
    href: 'https://www.pingcap.com/blog/distributed-sql-tutorial-first-steps-setting-up-tidb-locally/',
  },
  {
    tag: 'AI',
    title: 'Build an AI Agent for Full-Stack Apps',
    description: 'Use TiDB vector search to build an AI agent that generates and deploys full-stack applications end to end.',
    href: 'https://www.pingcap.com/blog/ai-agent-that-builds-full-stack-apps/',
  },
  {
    tag: 'Schema',
    title: 'Online DDL: Schema Changes Without Downtime',
    description: 'Learn how TiDB handles schema changes online, eliminating table locks and service interruptions.',
    href: 'https://www.pingcap.com/blog/scaling-tidb-locally-online-ddl-tutorial/',
  },
]

const courses = [
  {
    tag: 'Beginner',
    title: 'TiDB Beginner Path',
    description: 'Start from zero and learn TiDB fundamentals, architecture, and basic operations at your own pace.',
    href: 'https://www.pingcap.com/education/#beginner_path',
  },
  {
    tag: 'AI',
    title: 'TiDB AI Developer Path',
    description: 'Build production-ready AI applications with TiDB vector search and real-time data pipelines.',
    href: 'https://www.pingcap.com/education/#ai_path',
  },
]

const community = [
  {
    name: 'Discord',
    description: 'Real-time help and discussion with TiDB developers worldwide.',
    href: 'https://discord.gg/DQZ2dy3cuc',
    path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.019.011.037.024.049a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  },
  {
    name: 'Slack',
    description: 'Connect with TiDB users and contributors in our community workspace.',
    href: 'https://slack.tidb.io/',
    path: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z',
  },
  {
    name: 'Reddit',
    description: 'Discuss TiDB, share experiences, and learn from the developer community.',
    href: 'https://www.reddit.com/r/TiDB/',
    path: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z',
  },
  {
    name: 'GitHub',
    description: 'Explore source code, open issues, and contribute to TiDB open-source projects.',
    href: 'https://github.com/pingcap',
    path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
]

// ─── Cube illustration ────────────────────────────────────────────────────────

function HeroCubeIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[480px]"
      aria-hidden="true"
    >
      {/* Background diagonal grid */}
      <defs>
        <pattern
          id="dev-diag"
          x="0" y="0" width="56" height="56"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 240 200)"
        >
          <line x1="0" y1="0" x2="56" y2="0"
            stroke="white" strokeWidth="0.4"
            strokeOpacity="0.12" strokeDasharray="2 10"
          />
        </pattern>
      </defs>
      <rect width="480" height="400" fill="url(#dev-diag)" />

      {/* ── Wireframe 2 (outermost) ── */}
      <g stroke="white" strokeOpacity="0.1" strokeWidth="0.6" fill="none">
        {/* top face */}
        <polygon points="240,22 442,138 240,254 38,138" />
        {/* vertical edges */}
        <line x1="442" y1="138" x2="442" y2="362" />
        <line x1="38"  y1="138" x2="38"  y2="362" />
        <line x1="240" y1="254" x2="240" y2="478" />
        {/* bottom face */}
        <line x1="38"  y1="362" x2="240" y2="478" />
        <line x1="442" y1="362" x2="240" y2="478" />
        <line x1="38"  y1="362" x2="442" y2="362" />
      </g>

      {/* ── Wireframe 1 (inner) ── */}
      <g stroke="white" strokeOpacity="0.22" strokeWidth="0.8" fill="none">
        {/* top face */}
        <polygon points="240,46 388,130 240,214 92,130" />
        {/* vertical edges */}
        <line x1="388" y1="130" x2="388" y2="298" />
        <line x1="92"  y1="130" x2="92"  y2="298" />
        <line x1="240" y1="214" x2="240" y2="382" />
        {/* bottom face */}
        <line x1="92"  y1="298" x2="240" y2="382" />
        <line x1="388" y1="298" x2="240" y2="382" />
        <line x1="92"  y1="298" x2="388" y2="298" />
      </g>

      {/* ── Red cube ── */}
      {/* Top face — lightest */}
      <polygon points="240,78 336,130 240,182 144,130" fill="#F35048" />
      {/* Left face — primary red */}
      <polygon points="144,130 240,182 240,286 144,234" fill="#DC150B" />
      {/* Right face — darkest */}
      <polygon points="336,130 240,182 240,286 336,234" fill="#87120C" />

      {/* Edge highlights */}
      <g stroke="white" strokeOpacity="0.18" strokeWidth="0.6" fill="none">
        <line x1="240" y1="78"  x2="336" y2="130" />
        <line x1="240" y1="78"  x2="144" y2="130" />
        <line x1="240" y1="78"  x2="240" y2="62" />
      </g>
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DeveloperHubPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />

      <div className="pt-[62px] lg:pt-20">

        {/* ── Secondary subnav ── */}
        <nav
          className="sticky top-[62px] lg:top-20 z-40 bg-bg-inverse border-b border-carbon-800"
          aria-label="Developer Hub navigation"
        >
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <ul className="flex overflow-x-auto scrollbar-none">
              {devNav.map((item) => (
                <li key={item.label} className="shrink-0">
                  <a
                    href={item.href}
                    className="block px-4 py-4 text-body-sm text-carbon-400 hover:text-text-inverse whitespace-nowrap border-b-2 border-transparent hover:border-carbon-400 transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main>

          {/* ── Hero ── */}
          <section className="bg-bg-inverse pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              {/* Split: text left, illustration right */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-8 mb-12 lg:mb-16">
                {/* Text + CTAs */}
                <div className="lg:flex-1">
                  <p className="font-mono text-eyebrow text-carbon-400 mb-8">DEVELOPER HUB</p>
                  <h1 className="text-h1-mb md:text-h1 font-bold text-text-inverse mb-5">
                    Build Scalable, Real-Time Applications with TiDB
                  </h1>
                  <p className="text-body-xl text-carbon-400 mb-10">
                    Choose your path below
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <PrimaryButton href="/signup/">Try for Free</PrimaryButton>
                    <SecondaryButton href="https://docs.pingcap.com/">Deep Dive with Docs</SecondaryButton>
                  </div>
                </div>
                {/* Illustration — desktop only */}
                <div className="hidden lg:flex lg:flex-1 justify-end items-center">
                  <HeroCubeIllustration />
                </div>
              </div>

              {/* Path cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pathCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <a
                      key={card.title}
                      href={card.href}
                      className="group flex flex-col p-6 border border-carbon-800 hover:border-carbon-600 transition-colors duration-150"
                    >
                      <div className="w-10 h-10 mb-5 text-brand-red-primary shrink-0">
                        <Icon className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-h3-lg font-bold text-text-inverse mb-3">{card.title}</h2>
                      <p className="text-body-sm text-carbon-400 leading-relaxed flex-1">{card.description}</p>
                      <span className="inline-flex items-center gap-1 mt-5 text-body-sm text-brand-red-primary">
                        Explore
                        <ChevronRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ── Featured Quick Starts ── */}
          <section id="get-started" className="py-section-sm lg:py-section bg-bg-primary">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <h2 className="text-h2-sm md:text-h2-mb font-bold text-text-inverse mb-12">
                Featured Quick Starts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickStarts.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-6 border border-carbon-800 hover:border-carbon-600 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-label text-carbon-500 uppercase tracking-wide">
                        {item.tag}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-carbon-700 group-hover:text-text-inverse transition-colors duration-150"
                      />
                    </div>
                    <h3 className="text-h3-sm font-bold text-text-inverse mb-3 flex-1">{item.title}</h3>
                    <p className="text-body-sm text-carbon-400 leading-relaxed">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Featured Tutorials ── */}
          <section id="learn" className="py-section-sm lg:py-section bg-bg-subtle">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <h2 className="text-h2-sm md:text-h2-mb font-bold text-text-primary mb-12">
                Featured Tutorials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tutorials.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-6 bg-white border border-border-subtle hover:shadow-card-hover transition-shadow duration-150"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-label text-carbon-500 uppercase tracking-wide">
                        {item.tag}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-carbon-400 group-hover:text-text-primary transition-colors duration-150"
                      />
                    </div>
                    <h3 className="text-h3-sm font-bold text-text-primary mb-3 flex-1">{item.title}</h3>
                    <p className="text-body-sm text-carbon-600 leading-relaxed">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Developer Courses ── */}
          <section className="py-section-sm lg:py-section bg-gradient-dark-top">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <div className="flex items-end justify-between mb-12 gap-4">
                <h2 className="text-h2-sm md:text-h2-mb font-bold text-text-inverse">
                  Developer Courses
                </h2>
                <a
                  href="https://www.pingcap.com/education/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 text-body-sm text-carbon-400 hover:text-text-inverse transition-colors duration-150"
                >
                  View more <ChevronRight size={14} />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-8 border border-carbon-800 hover:border-carbon-600 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-label text-carbon-500 uppercase tracking-wide">
                        {item.tag}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-carbon-700 group-hover:text-text-inverse transition-colors duration-150"
                      />
                    </div>
                    <h3 className="text-h3-lg font-bold text-text-inverse mb-3">{item.title}</h3>
                    <p className="text-body-md text-carbon-400 leading-relaxed">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Community ── */}
          <section className="py-section-sm lg:py-section bg-brand-violet-bg">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              <h2 className="text-h2-sm md:text-h2-mb font-bold text-text-inverse mb-4">
                Join the TiDB Community
              </h2>
              <p className="text-body-lg text-carbon-400 mb-12">
                Ask questions, share projects, and connect with developers building on TiDB.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {community.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-start p-6 bg-white/5 hover:bg-white/10 transition-colors duration-150"
                  >
                    <div className="w-10 h-10 mb-4 text-text-inverse shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-full h-full">
                        <path d={platform.path} />
                      </svg>
                    </div>
                    <h3 className="text-h3-sm font-bold text-text-inverse mb-2">{platform.name}</h3>
                    <p className="text-body-sm text-carbon-400 leading-relaxed">{platform.description}</p>
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
