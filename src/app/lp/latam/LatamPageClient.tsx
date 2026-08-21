'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Network,
  Sparkles,
  Shield,
  Bot,
  CreditCard,
  ShoppingCart,
  Database,
  RefreshCw,
  Layers,
  GitMerge,
  BarChart3,
  Zap,
  Globe,
  Cloud,
  Building2,
  LifeBuoy,
  ShieldCheck,
} from 'lucide-react'
import {
  HeroSection,
  FeatureGridSection,
  SectionWrapper,
  SectionHeader,
  SecondaryButton,
  PrimaryButton,
} from '@/components'
import { type Locale, locales, translations } from './translations'
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from './detect-locale'
import { cn } from '@/lib/utils'

/**
 * Hero headline size, per locale.
 *
 * The headline has to land on exactly two lines. Spanish and Portuguese run
 * ~35% longer than the English source, so no single size serves all three —
 * each locale gets the largest size that still fits two lines in the hero's
 * text column. Values measured at 1024 / 1280 / 1440px; re-measure if the
 * headline copy or the hero split ratio changes.
 */
const HERO_TITLE_SIZE: Record<Locale, string> = {
  en: 'lg:text-[44px] xl:text-[58px] 2xl:text-[68px]',
  es: 'lg:text-[36px] xl:text-[42px] 2xl:text-[52px]',
  pt: 'lg:text-[34px] xl:text-[39px] 2xl:text-[48px]',
}

function CardVideo({ src }: { src: string }) {
  return (
    <video autoPlay loop muted playsInline className="w-full h-auto border border-carbon-200">
      <source src={src} type="video/mp4" />
    </video>
  )
}

// ─── Hero visual (LATAM map + light beam + rainbow data rays) ────────────────

// Ray/badge endpoints in the 600x450 composition space (see viewBox below).
const rayOrigin = { x: 330, y: 225 }
const rayNodes = [
  {
    icon: BarChart3,
    x: 575,
    y: 55,
    ringClass: 'border-brand-blue-medium text-brand-blue-medium',
    bgClass: 'bg-brand-blue-bg',
    glow: '0 0 26px rgba(80,157,234,0.5)',
  },
  {
    icon: Database,
    x: 600,
    y: 172,
    ringClass: 'border-brand-teal-medium text-brand-teal-medium',
    bgClass: 'bg-brand-teal-bg',
    glow: '0 0 26px rgba(80,219,217,0.5)',
  },
  {
    icon: Zap,
    x: 600,
    y: 292,
    ringClass: 'border-brand-mango text-brand-mango',
    bgClass: 'bg-brand-mango-800',
    glow: '0 0 26px rgba(225,161,65,0.5)',
  },
  {
    icon: Globe,
    x: 565,
    y: 405,
    ringClass: 'border-brand-violet-medium text-brand-violet-medium',
    bgClass: 'bg-brand-violet-bg',
    glow: '0 0 26px rgba(199,111,242,0.5)',
  },
]

// Gradient stop colors mirror the brand tokens in tailwind.config.ts —
// SVG <stop>/<feGaussianBlur> can't reference Tailwind classes, only raw values.
const rayGradients = [
  { id: 'ray-blue', color: '#509DEA' },
  { id: 'ray-teal', color: '#50DBD9' },
  { id: 'ray-mango', color: '#E1A141' },
  { id: 'ray-violet', color: '#C76FF2' },
]

function BinaryRain() {
  const columns = 20
  const rows = 16
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden opacity-[0.12]">
      <div
        className="grid h-full w-full"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, col) => (
          <div
            key={col}
            className="flex flex-col items-center justify-between font-mono text-[10px] leading-none text-brand-red-light"
          >
            {Array.from({ length: rows }).map((_, row) => (
              <span key={row}>{(col * 13 + row * 7) % 5 === 0 ? '1' : '0'}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// The looping sequence's phases live in the keyframes (see globals.css);
// these are per-element stagger offsets within that shared 5s cycle.
const RAY_STAGGER = 90
const BADGE_STAGGER = 120

function HeroVisual() {
  return (
    // The badges sit at the right edge of the composition and are centred on it,
    // so they'd stick out by half their width. HeroSection clips overflow, which
    // sliced them on narrower screens — the right padding keeps them inside.
    //
    // The leftward nudge closes the gap to the headline. 32px is the grid gutter,
    // so it brings the composition flush against the text column without covering
    // it. Desktop only — below lg the two stack vertically, so there is no gap.
    <div className="w-full max-w-[640px] mx-auto pr-8 md:pr-10 lg:-translate-x-8">
      <div className="relative w-full aspect-[4/3]">
        {/* Background digital-rain texture */}
        <BinaryRain />

        {/* White light beam — horizontal, sits behind the map and stops at the
          ray origin so it never reads as crossing the landmass. */}
        <div
          aria-hidden="true"
          className="animate-beam-loop absolute left-0 top-1/2 z-0 h-16 -translate-y-1/2 bg-white/20 blur-2xl"
          style={{ width: `${(rayOrigin.x / 600) * 100}%` }}
        />
        <div
          aria-hidden="true"
          className="animate-beam-loop absolute left-0 top-1/2 z-0 h-1 -translate-y-1/2 blur-[1px]"
          style={{
            width: `${(rayOrigin.x / 600) * 100}%`,
            // Short fade-in at the far left, then full white the rest of the way —
            // the stretch left of the map is what's actually visible.
            background:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 100%)',
          }}
        />

        {/* Hotspot glow where the rays emanate from the map's edge */}
        <div
          aria-hidden="true"
          className="animate-fade-loop absolute z-[5] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl"
          style={{
            left: `${(rayOrigin.x / 600) * 100}%`,
            top: `${(rayOrigin.y / 450) * 100}%`,
          }}
        />

        {/* Map — neutral carbon fill, not brand red: a saturated single colour over
          a whole region reads as a political or risk map. The glow is neutral for
          the same reason; a coloured halo would put that reading straight back. */}
        <div className="absolute inset-y-0 left-0 flex w-[58%] items-center justify-center">
          <Image
            src="/images/latam-map.svg"
            alt="Map of Latin America"
            width={620}
            height={708}
            className="relative z-10 h-auto max-h-full w-full object-contain drop-shadow-[0_0_30px_rgba(185,194,202,0.3)]"
            priority
          />
        </div>

        {/* Rainbow data rays */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 450"
          preserveAspectRatio="none"
          className="absolute inset-0 z-10 h-full w-full overflow-visible"
          style={{ mixBlendMode: 'screen' }}
        >
          <defs>
            {rayGradients.map(({ id, color }) => (
              <linearGradient
                key={id}
                id={id}
                x1={rayOrigin.x}
                y1={rayOrigin.y}
                x2="620"
                y2={rayOrigin.y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="14%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="48%" stopColor={color} stopOpacity="0.85" />
                <stop offset="100%" stopColor={color} stopOpacity="0.95" />
              </linearGradient>
            ))}
            <filter id="beam-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          {/* soft glow layer */}
          <g filter="url(#beam-blur)">
            {rayNodes.map((node, i) => (
              <line
                key={`glow-${rayGradients[i].id}`}
                className="animate-ray-loop"
                pathLength={1}
                x1={rayOrigin.x}
                y1={rayOrigin.y}
                x2={node.x}
                y2={node.y}
                stroke={`url(#${rayGradients[i].id})`}
                strokeWidth="18"
                strokeLinecap="round"
                style={{ animationDelay: `${i * RAY_STAGGER}ms` }}
              />
            ))}
          </g>
          {/* crisp core layer */}
          {rayNodes.map((node, i) => (
            <line
              key={`core-${rayGradients[i].id}`}
              className="animate-ray-loop"
              pathLength={1}
              x1={rayOrigin.x}
              y1={rayOrigin.y}
              x2={node.x}
              y2={node.y}
              stroke={`url(#${rayGradients[i].id})`}
              strokeWidth="3"
              strokeLinecap="round"
              style={{ animationDelay: `${i * RAY_STAGGER}ms` }}
            />
          ))}
        </svg>

        {/* Icon badges at ray endpoints */}
        {rayNodes.map(({ icon: Icon, x, y, ringClass, bgClass, glow }, i) => (
          <div
            key={rayGradients[i].id}
            className={`animate-badge-loop absolute z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 backdrop-blur-sm sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 ${ringClass} ${bgClass}`}
            style={{
              left: `${(x / 600) * 100}%`,
              top: `${(y / 450) * 100}%`,
              boxShadow: glow,
              animationDelay: `${i * BADGE_STAGGER}ms`,
            }}
          >
            <Icon
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7"
              strokeWidth={1.5}
            />
          </div>
        ))}

        {/* Sparkle accents */}
        <Sparkles
          className="animate-fade-loop absolute z-20 h-4 w-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] md:h-6 md:w-6"
          strokeWidth={1.5}
          style={{
            left: `${(500 / 600) * 100}%`,
            top: `${(8 / 450) * 100}%`,
            animationDelay: `${4 * BADGE_STAGGER}ms`,
          }}
        />
        <Sparkles
          className="animate-fade-loop absolute z-20 h-3 w-3 text-white/70 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] md:h-4 md:w-4"
          strokeWidth={1.5}
          style={{
            left: `${(505 / 600) * 100}%`,
            top: `${(447 / 450) * 100}%`,
            animationDelay: `${5 * BADGE_STAGGER}ms`,
          }}
        />
      </div>
    </div>
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
    metric: '99.99%',
    icon: <CreditCard className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
    href: 'https://www.pingcap.com/solutions/fintech/',
  },
  {
    metric: '1M',
    icon: <ShoppingCart className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
    href: 'https://www.pingcap.com/solutions/e-commerce/',
  },
  {
    metric: '1',
    icon: <Bot className="w-8 h-8 text-brand-red-primary" strokeWidth={1.5} />,
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

const ecosystemIcons = [
  <Cloud key="cloud" className="w-7 h-7 text-text-inverse" strokeWidth={1.5} />,
  <Building2 key="si" className="w-7 h-7 text-text-inverse" strokeWidth={1.5} />,
  <LifeBuoy key="service" className="w-7 h-7 text-text-inverse" strokeWidth={1.5} />,
  <ShieldCheck key="security" className="w-7 h-7 text-text-inverse" strokeWidth={1.5} />,
]

const whyTidbMeta = [
  { illustration: <CardVideo src="/videos/triple-bar-growth.mp4" /> },
  { illustration: <CardVideo src="/videos/deploy-scale.mp4" /> },
  { illustration: <CardVideo src="/videos/compatible-line.mp4" /> },
  { illustration: <CardVideo src="/videos/enterprise-security.mp4" /> },
  { illustration: <CardVideo src="/videos/target-pulse.mp4" /> },
]

const customerLogos = [
  {
    name: 'Databricks',
    src: '/images/logos/latam-databricks-logo-white.png',
    width: 576,
    height: 204,
    className: 'h-12 sm:h-16 lg:h-20',
  },
  {
    name: 'Square',
    src: '/images/logos/latam-square-logo-white.svg',
    width: 138,
    height: 42,
    className: 'h-7 sm:h-8 lg:h-9',
  },
  {
    name: 'Manus',
    src: '/images/logos/latam-manus-logo-white.svg',
    width: 207,
    height: 60,
    className: 'h-9 sm:h-10 lg:h-12',
  },
  {
    name: 'Pinterest',
    src: '/images/logos/latam-pinterest-logo-white.svg',
    width: 181,
    height: 50,
    className: 'h-9 sm:h-10 lg:h-12',
  },
  {
    name: 'Kimi',
    src: '/images/logos/latam-kimi-logo-white.svg',
    width: 118,
    height: 40,
    className: 'h-8 sm:h-9 lg:h-10',
  },
]

// Regional implementation partners. Rendered white on the deep-red section
// background, matching the customer row above. Overlabs only ships a JPEG on
// black, so its asset was knocked out to transparent and flattened to white.
const partnerLogos = [
  {
    name: 'AIR — Agentic AI Engineering',
    src: '/images/logos/latam-air-logo-white.png',
    width: 1044,
    height: 220,
    className: 'h-10 sm:h-12 lg:h-14',
  },
  {
    name: 'Derevo, powered by iLink Digital',
    src: '/images/logos/latam-derevo-logo-white.png',
    width: 704,
    height: 220,
    className: 'h-12 sm:h-14 lg:h-16',
  },
  {
    name: 'Overlabs',
    src: '/images/logos/latam-overlabs-logo-white.png',
    width: 983,
    height: 220,
    className: 'h-10 sm:h-12 lg:h-14',
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

export function LatamPageClient({ initialLocale = 'en' }: { initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const t = translations[locale]

  // Remember an explicitly chosen language so auto-detection doesn't override
  // it on the next visit. Server-side detection reads this cookie first.
  const handleLocaleChange = (next: Locale) => {
    setLocale(next)
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`
  }

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
      <LanguageSwitcher locale={locale} onChange={handleLocaleChange} />
      <main className="pt-[98px] lg:pt-[116px]">
        {/* ── 1. Hero ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
          <HeroSection
            layout="split"
            splitRatio="text-heavy"
            eyebrow={t.hero.eyebrow}
            headline={t.hero.headline}
            headlineClassName={cn('text-balance', HERO_TITLE_SIZE[locale])}
            subheadline={t.hero.subheadline}
            primaryCta={{
              text: t.hero.primaryCta,
              href: 'https://tidbcloud.com/free-trial/',
              openInNewTab: false,
            }}
            secondaryCta={{
              text: t.hero.secondaryCta,
              href: 'https://www.pingcap.com/contact-us/',
              openInNewTab: false,
            }}
            rightSlot={<HeroVisual />}
          />
        </SectionWrapper>

        {/* ── 1b. Customer logos ── */}
        <SectionWrapper style={{ background: 'primary', spacing: 'sm', removePaddingTop: true }}>
          <p className="font-mono text-eyebrow text-carbon-500 mb-6 text-center">
            {t.logos.trustedBy}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {customerLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-16 sm:h-20 lg:h-24"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} w-auto max-w-full object-contain`}
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
              openInNewTab: false,
              className: 'whitespace-normal text-left',
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
                  {/* Metric */}
                  <div className="text-right">
                    <p className="text-h3-lg font-bold text-text-primary leading-none">
                      {card.metric}
                    </p>
                    <p className="font-mono text-label uppercase text-carbon-500 mt-1 whitespace-pre-line leading-tight">
                      {card.metricCaption}
                    </p>
                  </div>

                  {/* Icon + title */}
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <h3 className="text-h3-lg font-bold text-text-primary">{card.title}</h3>
                  </div>

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
                  <SecondaryButton
                    href={card.href}
                    dark={false}
                    openInNewTab={false}
                    className="whitespace-normal text-left"
                  >
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
                  <SecondaryButton
                    href={modernizationSecondaryHrefs[i]}
                    dark={false}
                    openInNewTab={false}
                    className="whitespace-normal text-left"
                    key={text}
                  >
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
                <SecondaryButton
                  href="https://www.pingcap.com/partners/"
                  dark={true}
                  openInNewTab={false}
                  className="whitespace-normal text-left"
                >
                  {t.ecosystem.viewMoreText}
                </SecondaryButton>
              </div>
            </div>

            {/* Right: partner categories */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.ecosystem.partners.map((partner, i) => (
                <article
                  key={partner.title}
                  className="flex flex-col gap-3 border border-text-inverse/20 bg-text-inverse/[0.04] p-6"
                >
                  {ecosystemIcons[i]}
                  <h3 className="font-mono text-label uppercase text-text-inverse">
                    {partner.title}
                  </h3>
                  <p className="text-body-md text-carbon-100 leading-relaxed">
                    {partner.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Regional partner logos — same treatment as the customer row in the
            hero, so the two logo strips read as a matched pair. */}
          <div className="mt-16 border-t border-text-inverse/15 pt-12">
            <p className="font-mono text-eyebrow text-carbon-100 mb-8 text-center">
              {t.ecosystem.partnerLogosTitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {partnerLogos.map((logo) => (
                <div key={logo.name} className="flex items-center justify-center h-16 lg:h-20">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className={`${logo.className} w-auto max-w-full object-contain`}
                  />
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
                <PrimaryButton href="https://www.pingcap.com/tidb-cloud/" openInNewTab={false}>
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
                <SecondaryButton
                  href="https://www.pingcap.com/contact-us/"
                  dark={true}
                  openInNewTab={false}
                  className="whitespace-normal text-left"
                >
                  {t.cta.coDesign.button}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  )
}
