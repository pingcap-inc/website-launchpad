import type { Metadata } from 'next'
import {
  Network,
  Sparkles,
  Shield,
  Database,
  RefreshCw,
  Layers,
  GitMerge,
  Cloud,
  Users,
  Building,
  Activity,
  Lock,
} from 'lucide-react'
import {
  Header,
  Footer,
  HeroSection,
  FeatureGridSection,
  CtaSection,
  SectionWrapper,
  SectionHeader,
} from '@/components'

export const metadata: Metadata = {
  title: "Distributed SQL for Latin America's Digital Future | TiDB",
  description:
    "Build scalable, AI-ready apps on TiDB's distributed SQL platform for always-on transactions, real-time intelligence, and cloud-native growth across Latin America.",
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.pingcap.com/lp/latam/' },
  openGraph: {
    title: "Distributed SQL for Latin America's Digital Future | TiDB",
    description:
      "Build scalable, AI-ready apps on TiDB's distributed SQL platform for always-on transactions, real-time intelligence, and cloud-native growth across Latin America.",
    url: 'https://www.pingcap.com/lp/latam/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

// ─── Card illustrations (wireframe mini-dashboards) ─────────────────────────────

function IllustrationChrome({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" stroke="#E5E8EB" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0.5" y="0.5" width="339" height="149" fill="#F8FAFB" stroke="#E5E8EB" />
      <rect x="0.5" y="0.5" width="339" height="149" fill={`url(#${id})`} />
      <rect x="14" y="12" width="60" height="30" rx="3" fill="#FFFFFF" stroke="#CBD1D7" />
      <circle cx="27" cy="27" r="3" fill="#DC150B" />
      <circle cx="38" cy="27" r="3" fill="#DC150B" />
      <circle cx="49" cy="27" r="3" fill="#DC150B" />
    </>
  )
}

function FintechIllustration() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <IllustrationChrome id="illo-fin" />
      <rect x="86" y="16" width="110" height="7" rx="3" fill="#CBD1D7" />
      <rect x="86" y="30" width="70" height="7" rx="3" fill="#E5E8EB" />
      <rect x="276" y="14" width="50" height="34" fill="#DC150B" />
      <polygon
        points="150,64 178,92 150,120 122,92"
        fill="#509DEA"
        fillOpacity="0.3"
        stroke="#2C80CE"
      />
      <polygon
        points="202,60 232,90 202,120 172,90"
        fill="#509DEA"
        fillOpacity="0.25"
        stroke="#2C80CE"
      />
      <polygon
        points="250,70 276,95 250,120 224,95"
        fill="#509DEA"
        fillOpacity="0.2"
        stroke="#2C80CE"
      />
      <rect x="28" y="122" width="150" height="9" fill="#DC150B" />
    </svg>
  )
}

function EcommIllustration() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <IllustrationChrome id="illo-ecom" />
      <rect x="90" y="72" width="24" height="60" fill="#1AA8A8" />
      <rect x="122" y="54" width="24" height="78" fill="#1AA8A8" />
      <rect x="154" y="88" width="24" height="44" fill="#DC150B" />
      <polygon
        points="215,64 245,92 215,120 185,92"
        fill="#509DEA"
        fillOpacity="0.28"
        stroke="#2C80CE"
      />
      <polygon
        points="256,72 282,96 256,120 230,96"
        fill="#509DEA"
        fillOpacity="0.2"
        stroke="#2C80CE"
      />
      <rect
        x="282"
        y="30"
        width="40"
        height="40"
        fill="#50DBD9"
        fillOpacity="0.2"
        stroke="#1AA8A8"
      />
    </svg>
  )
}

function AiNativeIllustration() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <IllustrationChrome id="illo-ai" />
      <line x1="96" y1="60" x2="250" y2="118" stroke="#2C80CE" strokeWidth="1.2" />
      <line x1="110" y1="124" x2="245" y2="58" stroke="#2C80CE" strokeWidth="1.2" />
      <circle cx="150" cy="96" r="20" fill="#50DBD9" fillOpacity="0.28" stroke="#1AA8A8" />
      <circle cx="112" cy="112" r="15" fill="#50DBD9" fillOpacity="0.2" stroke="#1AA8A8" />
      <circle cx="288" cy="54" r="24" fill="#F35048" fillOpacity="0.2" stroke="#DC150B" />
      <rect x="266" y="92" width="48" height="34" fill="none" stroke="#DC150B" />
    </svg>
  )
}

function MiniGridBg({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="18" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V18" fill="none" stroke="#E5E8EB" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0.5" y="0.5" width="199" height="89" fill="#F8FAFB" stroke="#E5E8EB" />
      <rect x="0.5" y="0.5" width="199" height="89" fill={`url(#${id})`} />
    </>
  )
}

function CostIllustration() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <MiniGridBg id="illo-cost" />
      <rect x="62" y="16" width="10" height="58" fill="#DC150B" />
      <rect x="95" y="16" width="10" height="58" fill="#2C80CE" />
      <rect x="128" y="16" width="10" height="58" fill="#1AA8A8" />
    </svg>
  )
}

function MultiCloudIllustration() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <MiniGridBg id="illo-cloud" />
      <line x1="40" y1="45" x2="160" y2="45" stroke="#CBD1D7" strokeWidth="1.5" />
      <circle cx="62" cy="45" r="7" fill="#DC150B" />
      <circle cx="100" cy="45" r="7" fill="#2C80CE" />
      <circle cx="138" cy="45" r="7" fill="#1AA8A8" />
    </svg>
  )
}

function ModernizationIllustration() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <MiniGridBg id="illo-modern" />
      <line
        x1="45"
        y1="74"
        x2="162"
        y2="16"
        stroke="#DC150B"
        strokeWidth="9"
        strokeLinecap="square"
      />
    </svg>
  )
}

function SecurityIllustration() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <MiniGridBg id="illo-sec" />
      <rect x="58" y="16" width="14" height="58" fill="#DC150B" />
      <rect x="80" y="16" width="14" height="58" fill="#0D3152" />
      <rect x="102" y="16" width="14" height="58" fill="#0F5353" />
    </svg>
  )
}

function AiConnectedIllustration() {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <MiniGridBg id="illo-aiconn" />
      <line x1="18" y1="45" x2="182" y2="45" stroke="#DC150B" strokeWidth="2" />
      <line x1="100" y1="14" x2="100" y2="76" stroke="#DC150B" strokeWidth="2" />
      <circle cx="100" cy="45" r="28" fill="none" stroke="#2C80CE" strokeWidth="2" />
      <circle cx="100" cy="45" r="11" fill="#F35048" fillOpacity="0.3" />
    </svg>
  )
}

// ─── Hero visual (isometric cube scene + runtime terminal) ──────────────────────

function HeroVisual() {
  return (
    <svg
      viewBox="0 0 480 540"
      className="w-full h-auto max-w-[480px] mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Distributed SQL and AI data layer for Latin America"
    >
      <defs>
        <pattern
          id="hero-iso"
          width="60"
          height="34"
          patternUnits="userSpaceOnUse"
          patternTransform="skewY(-30)"
        >
          <path d="M60 0H0V34" fill="none" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
      </defs>

      {/* ── Isometric cube scene ── */}
      <g>
        <rect
          x="70"
          y="0"
          width="410"
          height="322"
          fill="#0D3152"
          stroke="#FFFFFF"
          strokeOpacity="0.18"
        />
        <rect x="70" y="0" width="410" height="322" fill="url(#hero-iso)" />

        {/* Blue iso cubes (staggered) */}
        <polygon
          points="185,138 233,166 185,194 137,166"
          fill="#2C80CE"
          fillOpacity="0.72"
          stroke="#FFFFFF"
          strokeOpacity="0.7"
        />
        <polygon
          points="312,104 360,132 312,160 264,132"
          fill="#2C80CE"
          fillOpacity="0.55"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
        />
        <polygon
          points="360,196 408,224 360,252 312,224"
          fill="#2C80CE"
          fillOpacity="0.4"
          stroke="#FFFFFF"
          strokeOpacity="0.4"
        />

        {/* Red cornerstone cube — three faces */}
        <polygon points="255,150 305,179 255,208 205,179" fill="#F35048" />
        <polygon points="205,179 255,208 255,268 205,239" fill="#DC150B" />
        <polygon points="305,179 255,208 255,268 305,239" fill="#87120C" />
      </g>

      {/* ── Runtime terminal panel ── */}
      <g fontFamily="'Moderat Mono', ui-monospace, SFMono-Regular, Menlo, monospace">
        <rect x="14" y="336" width="380" height="196" fill="#DC150B" fillOpacity="0.22" />
        <rect
          x="0"
          y="322"
          width="380"
          height="196"
          fill="#000000"
          stroke="#FFFFFF"
          strokeOpacity="0.18"
        />

        {/* Topline */}
        <text x="22" y="350" fill="#CBD1D7" fontSize="11" fontWeight="700" letterSpacing="0.5">
          LATAM DATA PLANE
        </text>
        <circle cx="316" cy="346" r="4" fill="#DC150B" />
        <text x="326" y="350" fill="#F35048" fontSize="11" fontWeight="700">
          live
        </text>
        <line x1="22" y1="364" x2="358" y2="364" stroke="#FFFFFF" strokeOpacity="0.16" />

        {/* Signal rows */}
        <text x="22" y="388" fill="#B9C2CA" fontSize="11">
          transactions
        </text>
        <text x="358" y="388" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="end">
          35K QPS
        </text>
        <text x="22" y="410" fill="#B9C2CA" fontSize="11">
          agent state
        </text>
        <text x="358" y="410" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="end">
          ACID
        </text>
        <text x="22" y="432" fill="#B9C2CA" fontSize="11">
          vector + SQL
        </text>
        <text x="358" y="432" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="end">
          one query
        </text>
        <line x1="22" y1="448" x2="358" y2="448" stroke="#FFFFFF" strokeOpacity="0.16" />

        {/* SQL snippet */}
        <text x="22" y="470" fill="#E5E8EB" fontSize="10.5">
          SELECT app_state, embedding
        </text>
        <text x="22" y="486" fill="#E5E8EB" fontSize="10.5">
          FROM live_workloads
        </text>
        <text x="22" y="502" fill="#E5E8EB" fontSize="10.5">
          WHERE region IN (&apos;BR&apos;, &apos;MX&apos;, &apos;CL&apos;)
        </text>
        <text x="22" y="518" fill="#E5E8EB" fontSize="10.5">
          ORDER BY relevance DESC;
        </text>
      </g>
    </svg>
  )
}

// ─── Section data ──────────────────────────────────────────────────────────────

const architectureFeatures = [
  {
    icon: <Network strokeWidth={1.5} />,
    title: 'Modern Application Architectures',
    description:
      'Support microservices, event-driven systems, and multi-tenant applications requiring predictable latency and elastic horizontal scale.',
    layout: 'vertical' as const,
  },
  {
    icon: <Sparkles strokeWidth={1.5} />,
    title: 'AI-Native Operational Data',
    description:
      'Use TiDB as the unified data layer for application state and AI agent memory, combining relational data and vector embeddings in one database—so AI apps manage live state and run semantic search without separate vector and analytics databases.',
    layout: 'vertical' as const,
  },
  {
    icon: <Shield strokeWidth={1.5} />,
    title: 'Built for Always-on Consistency',
    description:
      'Deliver strongly consistent transactions, high availability, and predictable performance for mission-critical operational workloads as applications continue to grow.',
    layout: 'vertical' as const,
  },
]

const highScaleCards = [
  {
    index: '01',
    metric: '99.99%',
    metricCaption: 'Availability-\nready',
    illustration: <FintechIllustration />,
    title: 'Fintech',
    bullets: [
      'Deliver real-time balances, authorizations, and ledger updates with strong consistency and high availability.',
      'Keep always-on payment and state-update flows responsive under high concurrency without hand-crafted sharding.',
    ],
    href: 'https://www.pingcap.com/tidb/cloud/',
    ctaText: 'Explore TiDB for Fintech →',
  },
  {
    index: '02',
    metric: '25K',
    metricCaption: 'Writes/sec\npatterns',
    illustration: <EcommIllustration />,
    title: 'Ecomm',
    bullets: [
      'Handle orders, sessions, inventory, and flash events from a single distributed SQL cluster.',
      'Absorb seasonal peaks and unpredictable workload growth while keeping critical user journeys fast.',
    ],
    href: 'https://www.pingcap.com/tidb/cloud/',
    ctaText: 'Explore TiDB for eCommerce →',
  },
  {
    index: '03',
    metric: '1',
    metricCaption: 'Unified data\nlayer',
    illustration: <AiNativeIllustration />,
    title: 'AI Native',
    bullets: [
      'Unify live application state, agent memory, relational data, and vector embeddings in one database.',
      'Let AI agents read and write operational state while performing semantic search over knowledge and events.',
    ],
    href: 'https://www.pingcap.com/ai/',
    ctaText: 'Explore TiDB for AI →',
  },
]

const modernizationFeatures = [
  {
    icon: <Database strokeWidth={1.5} />,
    title: 'Modernize Single-Node Database Estates',
    description:
      'Modernize single-node databases through MySQL compatibility, enabling existing applications to migrate with minimal code changes.',
    layout: 'vertical' as const,
  },
  {
    icon: <RefreshCw strokeWidth={1.5} />,
    title: 'Accelerate Migration with TiShift',
    description:
      "Assess existing workloads and automate schema and data migration into TiDB through TiShift's guided migration workflow.",
    layout: 'vertical' as const,
  },
  {
    icon: <Layers strokeWidth={1.5} />,
    title: 'Future-Proof Database Architecture',
    description:
      'Replace vertical scaling limitations and complex sharding with a cloud-native distributed SQL architecture.',
    layout: 'vertical' as const,
  },
  {
    icon: <GitMerge strokeWidth={1.5} />,
    title: 'Consolidate Operational and Analytical Workloads',
    description:
      'Run transactional processing and real-time analytics on one distributed SQL platform instead of maintaining multiple specialized databases.',
    layout: 'vertical' as const,
  },
]

const partnerFeatures = [
  {
    icon: <Cloud strokeWidth={1.5} />,
    title: 'AWS',
    description:
      'Run TiDB Cloud on AWS regions using infrastructure and controls your teams already operate.',
    layout: 'vertical' as const,
  },
  {
    icon: <Cloud strokeWidth={1.5} />,
    title: 'Google Cloud',
    description:
      'Deploy TiDB Cloud on Google Cloud with data residing closer to users throughout the region.',
    layout: 'vertical' as const,
  },
  {
    icon: <Users strokeWidth={1.5} />,
    title: 'Service Partners',
    description:
      'Engage delivery partners for architecture, migration, and production operations support.',
    layout: 'vertical' as const,
  },
  {
    icon: <Building strokeWidth={1.5} />,
    title: 'Regional SIs',
    description:
      'Work with local system integrators who understand regional regulations and enterprise deployment.',
    layout: 'vertical' as const,
  },
  {
    icon: <Activity strokeWidth={1.5} />,
    title: 'Observability',
    description:
      'Integrate TiDB with the monitoring and observability tooling your platform teams standardize on.',
    layout: 'vertical' as const,
  },
  {
    icon: <Lock strokeWidth={1.5} />,
    title: 'Security ISVs',
    description:
      'Connect TiDB into your existing security and data ecosystem instead of rebuilding your stack.',
    layout: 'vertical' as const,
  },
]

const whyTidbCards = [
  {
    index: '01',
    illustration: <CostIllustration />,
    title: 'Cost-Efficient at Scale',
    description:
      'Reduce total database cost through horizontal scalability while consolidating transactional, analytical, vector, and AI workloads onto one distributed SQL platform.',
  },
  {
    index: '02',
    illustration: <MultiCloudIllustration />,
    title: 'Multi-Cloud, Region-Aware',
    description:
      'Deploy across AWS and Google Cloud with data residing closer to users throughout Latin America.',
  },
  {
    index: '03',
    illustration: <ModernizationIllustration />,
    title: 'Proven Database Modernization',
    description:
      'Adopt a MySQL-compatible modernization path validated by organizations running business-critical workloads at scale.',
  },
  {
    index: '04',
    illustration: <SecurityIllustration />,
    title: 'Enterprise-Grade Security',
    description:
      'Operate with SOC 2-compliant controls, independently audited security practices, and comprehensive trust resources.',
  },
  {
    index: '05',
    illustration: <AiConnectedIllustration />,
    title: 'Built for AI-Connected Applications',
    description:
      'Power real-time applications and AI agents using a unified operational data platform supporting both structured data and vector search.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LatamLandingPage() {
  return (
    <>
      <Header />
      <main className="pt-[62px] lg:pt-20">
        {/* ── 1. Hero ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
          <HeroSection
            layout="split"
            eyebrow="One database. Infinite possibilities."
            headline={
              'Distributed SQL for <span class="text-gradient-red">Latin America\'s</span> Digital Future'
            }
            subheadline="Build scalable, AI-ready applications on a distributed SQL platform designed for always-on transactions, real-time intelligence, and cloud-native growth across Latin America."
            primaryCta={{
              text: 'Get started with TiDB Cloud',
              href: 'https://tidbcloud.com/free-trial/',
            }}
            secondaryCta={{
              text: 'Talk to our solutions team',
              href: 'https://www.pingcap.com/contact-us/',
            }}
            rightSlot={<HeroVisual />}
          />
        </SectionWrapper>

        {/* ── 1b. Customer logos ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'sm', removePaddingTop: true }}>
          <p className="font-mono text-eyebrow text-carbon-500 mb-6 text-center">
            Trusted by teams building across Latin America
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-16 border border-carbon-800 text-carbon-600 font-mono text-label"
              >
                Logo {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── 2. Architecture ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
          <FeatureGridSection
            eyebrow="01 / Architecture"
            title="Digital-Native and AI-First Architectures"
            subtitle="A unified operational layer for real-time applications and AI agents that need live data, semantic retrieval, and reliable state."
            features={architectureFeatures}
            columns={3}
            itemLayout="vertical"
            viewMore={{
              text: 'Learn more about TiDB as an AI database with built-in vector search',
              href: 'https://www.pingcap.com/ai/',
            }}
          />
        </SectionWrapper>

        {/* ── 3. High-scale operations ── */}
        <SectionWrapper style={{ background: 'inverse', spacing: 'section' }}>
          {/* Header: title left, supporting copy right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12 lg:mb-16">
            <div className="lg:col-span-8">
              <p className="font-mono text-eyebrow text-brand-red-primary mb-4">02 / SCALE</p>
              <h2 className="text-h2-mb md:text-h2-md font-bold text-text-primary leading-tight">
                High-Scale Operations
              </h2>
            </div>
            <p className="lg:col-span-4 text-body-md text-secondary leading-relaxed lg:pt-2">
              Keep critical operational journeys responsive across fintech, ecommerce, and AI-native
              workloads as demand expands across clouds and regions.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highScaleCards.map((card) => (
              <article key={card.title} className="flex flex-col border border-carbon-200 bg-white">
                {/* Gradient top border */}
                <div className="h-1 bg-gradient-to-r from-brand-red-primary via-brand-blue-medium to-brand-teal-medium" />

                <div className="flex flex-col gap-6 p-6 lg:p-8 flex-1">
                  {/* Index + metric */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-eyebrow text-brand-red-primary">
                      {card.index}
                    </span>
                    <div className="text-right">
                      <p className="text-h3-lg font-bold text-text-primary leading-none">
                        {card.metric}
                      </p>
                      <p className="font-mono text-label uppercase text-carbon-500 mt-1 whitespace-pre-line leading-tight">
                        {card.metricCaption}
                      </p>
                    </div>
                  </div>

                  {/* Illustration */}
                  {card.illustration}

                  {/* Title */}
                  <h3 className="text-h3-lg font-bold text-text-primary">{card.title}</h3>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-body-md text-secondary leading-relaxed"
                      >
                        <span className="mt-[9px] w-2 h-2 shrink-0 bg-brand-red-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore link */}
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-t border-carbon-200 px-6 lg:px-8 py-5 font-bold text-body-md text-brand-red-primary transition-colors duration-150 ease-in-out hover:bg-carbon-100"
                >
                  {card.ctaText}
                </a>
              </article>
            ))}
          </div>
        </SectionWrapper>

        {/* ── 4. Modernization ── */}
        <SectionWrapper style={{ background: 'gray', spacing: 'section' }}>
          <FeatureGridSection
            eyebrow="03 / Modernization"
            title="Database Modernization with TiDB and TiShift"
            subtitle="Move from single-node stacks to a MySQL-compatible distributed SQL path with guided migration tooling."
            features={modernizationFeatures}
            columns={2}
            itemLayout="vertical"
            viewMore={{
              text: 'Explore TiDB for MySQL modernization',
              href: 'https://www.pingcap.com/tidb/cloud/',
            }}
          />
        </SectionWrapper>

        {/* ── 5. Partner ecosystem ── */}
        <SectionWrapper style={{ background: 'brand-red', spacing: 'section' }}>
          <FeatureGridSection
            eyebrow="04 / Ecosystem"
            title="Grounded Partner Ecosystem"
            subtitle="Run TiDB Cloud on AWS and Google Cloud using infrastructure your teams already trust, work with regional implementation partners who understand local requirements across Latin America, and integrate with your existing security, observability, and data ecosystem."
            features={partnerFeatures}
            columns={3}
            itemLayout="vertical"
            viewMore={{
              text: 'Explore the PingCAP partner ecosystem',
              href: 'https://www.pingcap.com/contact-us/',
            }}
            dark={true}
          />
        </SectionWrapper>

        {/* ── 6. Why TiDB ── */}
        <SectionWrapper style={{ background: 'inverse', spacing: 'section' }}>
          {/* Header: title left, supporting copy right */}
          <SectionHeader
            eyebrow="05 / WHY TIDB"
            title="Why Teams in Latin America Choose TiDB"
            subtitle="Practical reasons to consolidate, scale, and build AI-connected applications on one
              distributed SQL platform."
          />

          {/* Cards */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyTidbCards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-5 border border-carbon-200 bg-white p-6"
              >
                <span className="font-mono text-eyebrow text-brand-red-primary">{card.index}</span>
                {card.illustration}
                <h3 className="text-h3-sm font-bold text-text-primary leading-snug">
                  {card.title}
                </h3>
                <p className="text-body-md text-secondary leading-relaxed">{card.description}</p>
              </article>
            ))}
          </div>
        </SectionWrapper>

        {/* ── 7. CTA ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
          <CtaSection
            title="Ready to modernize your database for Latin America?"
            subtitle="Co-design a high-scale, AI-ready architecture with our solutions team—or start building on TiDB Cloud today."
            primaryCta={{
              text: 'Get started with TiDB Cloud',
              href: 'https://tidbcloud.com/free-trial/',
            }}
            secondaryCta={{
              text: 'Talk to our solutions team',
              href: 'https://www.pingcap.com/contact-us/',
            }}
          />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
