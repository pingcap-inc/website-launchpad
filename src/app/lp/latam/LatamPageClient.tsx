'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Network,
  Sparkles,
  Shield,
  Bot,
  Brain,
  Database,
  RefreshCw,
  Layers,
  GitMerge,
} from 'lucide-react'
import {
  Header,
  Footer,
  HeroSection,
  FeatureGridSection,
  SectionWrapper,
  SectionHeader,
  SecondaryButton,
  PrimaryButton,
} from '@/components'
import { type Locale, type LatamCopy, locales, translations } from './translations'

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
    </>
  )
}

const currencyCoins = [
  { symbol: '$', cx: 70, color: '#DC150B' },
  { symbol: '€', cx: 170, color: '#1AA8A8' },
  { symbol: '₿', cx: 270, color: '#E99100' },
]

function FintechIllustration() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <IllustrationChrome id="illo-fin" />

      {currencyCoins.map((coin) => (
        <g key={coin.symbol}>
          <ellipse cx={coin.cx} cy="120" rx="26" ry="6" fill="#111111" fillOpacity="0.08" />
          <circle cx={coin.cx} cy="82" r="32" fill="#FFFFFF" stroke="#CBD1D7" strokeWidth="1.5" />
          <text
            x={coin.cx}
            y="94"
            fontSize="32"
            fontWeight="800"
            fill={coin.color}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {coin.symbol}
          </text>
        </g>
      ))}
    </svg>
  )
}

function EcommIllustration() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <IllustrationChrome id="illo-ecom" />

      {/* Storefront */}
      <g transform="translate(30,50)">
        <rect x="0" y="0" width="90" height="14" fill="#DC150B" />
        <rect x="0" y="0" width="16" height="14" fill="#FFFFFF" />
        <rect x="32" y="0" width="16" height="14" fill="#FFFFFF" />
        <rect x="64" y="0" width="16" height="14" fill="#FFFFFF" />
        <rect x="6" y="14" width="78" height="56" fill="#FFFFFF" stroke="#2C80CE" strokeWidth="2" />
        <rect
          x="12"
          y="26"
          width="16"
          height="16"
          fill="#509DEA"
          fillOpacity="0.22"
          stroke="#2C80CE"
        />
        <rect
          x="62"
          y="26"
          width="16"
          height="16"
          fill="#509DEA"
          fillOpacity="0.22"
          stroke="#2C80CE"
        />
        <rect
          x="33"
          y="38"
          width="24"
          height="32"
          fill="#FFFFFF"
          stroke="#2C80CE"
          strokeWidth="2"
        />
      </g>

      {/* Payment cards */}
      <g>
        <rect
          x="228"
          y="55"
          width="74"
          height="48"
          rx="6"
          fill="#FFFFFF"
          stroke="#CBD1D7"
          strokeWidth="1.5"
        />
        <rect
          x="220"
          y="45"
          width="74"
          height="48"
          rx="6"
          fill="#FFFFFF"
          stroke="#2C80CE"
          strokeWidth="2"
        />
        <rect x="220" y="59" width="74" height="10" fill="#DC150B" />
      </g>
    </svg>
  )
}

const aiNativeIcons = [
  { Icon: Bot, cx: 130, color: '#2C80CE' },
  { Icon: Brain, cx: 230, color: '#DC150B' },
]

function AiNativeIllustration() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <IllustrationChrome id="illo-ai" />
      {aiNativeIcons.map(({ Icon, cx, color }) => (
        <g key={cx}>
          <ellipse cx={cx} cy="118" rx="28" ry="6" fill="#111111" fillOpacity="0.08" />
          <circle cx={cx} cy="80" r="34" fill="#FFFFFF" stroke="#CBD1D7" strokeWidth="1.5" />
          <Icon x={cx - 18} y={62} width={36} height={36} color={color} strokeWidth={1.6} />
        </g>
      ))}
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

function HeroVisual({ copy }: { copy: LatamCopy['heroVisual'] }) {
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
          {copy.topline}
        </text>
        <circle cx="316" cy="346" r="4" fill="#DC150B" />
        <text x="326" y="350" fill="#F35048" fontSize="11" fontWeight="700">
          {copy.live}
        </text>
        <line x1="22" y1="364" x2="358" y2="364" stroke="#FFFFFF" strokeOpacity="0.16" />

        {/* Signal rows */}
        <text x="22" y="388" fill="#B9C2CA" fontSize="11">
          {copy.transactions}
        </text>
        <text x="358" y="388" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="end">
          35K QPS
        </text>
        <text x="22" y="410" fill="#B9C2CA" fontSize="11">
          {copy.agentState}
        </text>
        <text x="358" y="410" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="end">
          ACID
        </text>
        <text x="22" y="432" fill="#B9C2CA" fontSize="11">
          {copy.vectorSql}
        </text>
        <text x="358" y="432" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="end">
          {copy.oneQuery}
        </text>
        <line x1="22" y1="448" x2="358" y2="448" stroke="#FFFFFF" strokeOpacity="0.16" />

        {/* SQL snippet (code stays in English — SQL keywords aren't translated) */}
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

// ─── Locale-independent section metadata (icons, illustrations, hrefs) ──────────

const architectureIcons = [
  <Network key="network" strokeWidth={1.5} />,
  <Sparkles key="sparkles" strokeWidth={1.5} />,
  <Shield key="shield" strokeWidth={1.5} />,
]

const highScaleMeta = [
  {
    index: '01',
    metric: '99.99%',
    illustration: <FintechIllustration />,
    href: 'https://www.pingcap.com/solutions/fintech/',
  },
  {
    index: '02',
    metric: '1M',
    illustration: <EcommIllustration />,
    href: 'https://www.pingcap.com/solutions/e-commerce/',
  },
  {
    index: '03',
    metric: '1',
    illustration: <AiNativeIllustration />,
    href: 'https://www.pingcap.com/ai/',
  },
]

const modernizationIcons = [
  <Database key="db" className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
  <RefreshCw key="refresh" className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
  <Layers key="layers" className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
  <GitMerge key="merge" className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
]

const modernizationSecondaryHrefs = [
  'https://www.pingcap.com/developers/migration-center/',
  'https://www.pingcap.com/customers/',
  'https://www.pingcap.com/tidb/cloud/',
]

const partnerPlaceholders = ['Multi-Cloud', 'Regional SI', 'Service Partner', 'Security ISV']

const whyTidbMeta = [
  { index: '01', illustration: <CostIllustration /> },
  { index: '02', illustration: <MultiCloudIllustration /> },
  { index: '03', illustration: <ModernizationIllustration /> },
  { index: '04', illustration: <SecurityIllustration /> },
  { index: '05', illustration: <AiConnectedIllustration /> },
]

const customerLogos = [
  {
    name: 'Databricks',
    src: '/images/logos/latam-databricks-logo-white.png',
    width: 576,
    height: 204,
    className: 'h-20',
  },
  {
    name: 'Square',
    src: '/images/logos/latam-square-logo-white.svg',
    width: 138,
    height: 42,
    className: 'h-9',
  },
  {
    name: 'Manus',
    src: '/images/logos/latam-manus-logo-white.svg',
    width: 207,
    height: 60,
    className: 'h-12',
  },
  {
    name: 'Pinterest',
    src: '/images/logos/latam-pinterest-logo-white.svg',
    width: 181,
    height: 50,
    className: 'h-12',
  },
  {
    name: 'Kimi',
    src: '/images/logos/latam-kimi-logo-white.svg',
    width: 118,
    height: 40,
    className: 'h-10',
  },
]

// ─── Language switcher ───────────────────────────────────────────────────────

function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
}) {
  return (
    <div className="fixed top-[62px] lg:top-20 left-0 right-0 z-40 bg-bg-primary border-b border-carbon-800">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-end gap-1">
        {locales.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-current={locale === code}
            className={`px-3 py-1 text-label font-mono uppercase transition-colors duration-150 ${
              locale === code
                ? 'bg-brand-red-primary text-text-inverse'
                : 'text-carbon-500 hover:text-text-inverse'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function LatamPageClient() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = translations[locale]

  const architectureFeatures = t.architecture.features.map((feature, i) => ({
    icon: architectureIcons[i],
    title: feature.title,
    description: feature.description,
    layout: 'vertical' as const,
  }))

  const highScaleCards = t.highScale.cards.map((card, i) => ({
    ...highScaleMeta[i],
    metricCaption: card.metricCaption,
    title: card.title,
    bullets: card.bullets,
    ctaText: card.ctaText,
  }))

  const whyTidbCards = t.whyTidb.cards.map((card, i) => ({
    ...whyTidbMeta[i],
    title: card.title,
    description: card.description,
  }))

  return (
    <>
      <LanguageSwitcher locale={locale} onChange={setLocale} />
      <Header />
      <main className="pt-[98px] lg:pt-[116px]">
        {/* ── 1. Hero ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
          <HeroSection
            layout="split"
            eyebrow={t.hero.eyebrow}
            headline={t.hero.headline}
            subheadline={t.hero.subheadline}
            primaryCta={{
              text: t.hero.primaryCta,
              href: 'https://tidbcloud.com/free-trial/',
            }}
            secondaryCta={{
              text: t.hero.secondaryCta,
              href: 'https://www.pingcap.com/contact-us/',
            }}
            rightSlot={<HeroVisual copy={t.heroVisual} />}
          />
        </SectionWrapper>

        {/* ── 1b. Customer logos ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'sm', removePaddingTop: true }}>
          <p className="font-mono text-eyebrow text-carbon-500 mb-6 text-center">
            {t.logos.trustedBy}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {customerLogos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center h-24">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── 2. Architecture ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
          <FeatureGridSection
            eyebrow={t.architecture.eyebrow}
            title={t.architecture.title}
            subtitle={t.architecture.subtitle}
            features={architectureFeatures}
            columns={3}
            itemLayout="vertical"
            dark={true}
            viewMore={{
              text: t.architecture.viewMoreText,
              href: 'https://www.pingcap.com/ai/',
              openInNewTab: true,
            }}
          />
        </SectionWrapper>

        {/* ── 3. High-scale operations ── */}
        <SectionWrapper style={{ background: 'inverse', spacing: 'section' }}>
          <SectionHeader
            className="mb-16"
            eyebrow={t.highScale.eyebrow}
            title={t.highScale.title}
            subtitle={t.highScale.subtitle}
          />

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

                <div className="border-t border-carbon-200 px-6 lg:px-8 py-5">
                  <SecondaryButton href={card.href} dark={false}>
                    {card.ctaText}
                  </SecondaryButton>
                </div>
              </article>
            ))}
          </div>
        </SectionWrapper>

        {/* ── 4. Modernization ── */}
        <SectionWrapper style={{ background: 'gray', spacing: 'section' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: intro + migration flow + link stack */}
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow={t.modernization.eyebrow}
                title={t.modernization.title}
                subtitle={t.modernization.subtitle}
              />

              {/* Link stack */}
              <div className="mt-8 flex flex-col items-start gap-4">
                {t.modernization.secondaryLinks.map((text, i) => (
                  <SecondaryButton href={modernizationSecondaryHrefs[i]} dark={false} key={text}>
                    {text}
                  </SecondaryButton>
                ))}
              </div>
            </div>

            {/* Right: 2x2 cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.modernization.features.map((feature, i) => (
                <article
                  key={feature.title}
                  className="border border-carbon-200 bg-white p-6 lg:p-8"
                >
                  <div className="mb-4">{modernizationIcons[i]}</div>
                  <h3 className="text-h3-sm font-bold text-text-primary leading-snug mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body-md text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── 5. Partner ecosystem ── */}
        <SectionWrapper style={{ background: 'brand-red', spacing: 'section' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: customer-facing copy + cross-link */}
            <div className="lg:col-span-6">
              <SectionHeader eyebrow={t.ecosystem.eyebrow} title={t.ecosystem.title} />
              <ul className="mt-8 space-y-5">
                {t.ecosystem.paragraphs.map((paragraph) => (
                  <li
                    key={paragraph}
                    className="flex items-start gap-3 text-body-lg text-carbon-100 leading-relaxed"
                  >
                    <span className="mt-[10px] w-2 h-2 shrink-0 bg-text-inverse" />
                    {paragraph}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <SecondaryButton href="https://www.pingcap.com/partners/" dark={true} openInNewTab>
                  {t.ecosystem.viewMoreText}
                </SecondaryButton>
              </div>
            </div>

            {/* Right: partner-category placeholders */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {partnerPlaceholders.map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-center h-24 px-3 text-center border border-text-inverse/20 font-mono text-label uppercase text-carbon-100"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── 6. Why TiDB ── */}
        <SectionWrapper style={{ background: 'inverse', spacing: 'section' }}>
          {/* Header: title left, supporting copy right */}
          <SectionHeader
            eyebrow={t.whyTidb.eyebrow}
            title={t.whyTidb.title}
            subtitle={t.whyTidb.subtitle}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CTA 1 — modernize */}
            <div className="flex min-h-[300px] flex-col items-start border border-carbon-800 p-8 lg:p-10">
              <p className="font-mono text-eyebrow uppercase text-brand-red-primary mb-4">
                {t.cta.modernize.eyebrow}
              </p>
              <h2 className="text-h2-mb md:text-h2-sm font-bold text-text-inverse leading-tight">
                {t.cta.modernize.title}
              </h2>
              <div className="mt-auto pt-8">
                <PrimaryButton href="https://www.pingcap.com/tidb-cloud/">
                  {t.cta.modernize.button}
                </PrimaryButton>
              </div>
            </div>

            {/* CTA 2 — co-design */}
            <div className="flex min-h-[300px] flex-col items-start border border-carbon-800 p-8 lg:p-10">
              <p className="font-mono text-eyebrow uppercase text-brand-red-primary mb-4">
                {t.cta.coDesign.eyebrow}
              </p>
              <h2 className="text-h2-mb md:text-h2-sm font-bold text-text-inverse leading-tight">
                {t.cta.coDesign.title}
              </h2>
              <div className="mt-auto pt-8">
                <SecondaryButton href="https://www.pingcap.com/contact-us/" dark={true}>
                  {t.cta.coDesign.button}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
