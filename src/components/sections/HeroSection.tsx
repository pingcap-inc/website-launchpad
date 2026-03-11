import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

const HERO_RIGHT_IMAGES = [
  '/images/hero/r/Graphic-1-Dk.png',
  '/images/hero/r/Graphic-2-Dk.png',
  '/images/hero/r/Graphic-3-Dk.png',
  '/images/hero/r/Graphic-4-Dk.png',
  '/images/hero/r/Graphic-5-Dk.png',
  '/images/hero/r/Graphic-6-Dk.png',
  '/images/hero/r/Graphic-7-Dk.png',
  '/images/hero/r/Graphic-8-Dk.png',
  '/images/hero/r/Graphic-9-Dk.png',
  '/images/hero/r/Graphic-10-Dk.png',
  '/images/hero/r/Graphic-11-Dk.png',
  '/images/hero/r/Graphic-12-Dk.png',
  '/images/hero/r/Graphic-13-Dk.png',
  '/images/hero/r/Graphic-14-Dk.png',
  '/images/hero/r/Graphic-15-Dk.png',
  '/images/hero/r/Graphic-16-Dk.png',
  '/images/hero/r/Graphic-17-Dk.png',
  '/images/hero/r/Graphic-18-Dk.png',
  '/images/hero/r/Graphic-19-Dk.png',
  '/images/hero/r/Graphic-20-Dk.png',
  '/images/hero/r/Graphic-21-Dk.png',
  '/images/hero/r/Graphic-22-Dk.png',
]

const HERO_CENTERED_IMAGES = ['/images/hero/c/clip-group.svg', '/images/hero/c/bg-banner.svg']

interface HeroBackgroundImage {
  src?: string
  alt?: string
  priority?: boolean
  /** Defaults to opacity-80 */
  opacityClassName?: string
  /** Optional overlay class. No overlay is applied unless this is provided. */
  overlayClassName?: string
  /** Defaults to object-center */
  positionClassName?: string
}

interface HeroSectionProps {
  eyebrow?: string
  headline: React.ReactNode
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  rightSlot?: React.ReactNode
  centered?: boolean
  backgroundImage?: HeroBackgroundImage
  autoGenerateBackgroundImage?: boolean
  className?: string
}

type HeroIllustrationVariant = 'cube-grid' | 'cube-frame' | 'cube-ui'

function hashSeed(seed: string) {
  return Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000003, 7)
}

function pickSeededImage(seed: string, pool: string[]) {
  return pool[hashSeed(seed) % pool.length]
}

function pickHeroIllustrationVariant(seed: string): HeroIllustrationVariant {
  const normalized = seed.toLowerCase()
  if (/(open source|community|program|credits|github|contributors)/.test(normalized)) {
    return 'cube-frame'
  }
  if (/(search|query|analytics|dashboard|ui|app)/.test(normalized)) {
    return 'cube-ui'
  }
  return hashSeed(seed) % 2 === 0 ? 'cube-grid' : 'cube-frame'
}

function createHeroIllustrationDataUri(seed: string, mode: 'panel' | 'background') {
  const variant = pickHeroIllustrationVariant(seed)
  const hash = hashSeed(seed)
  const width = mode === 'panel' ? 1200 : 1600
  const height = mode === 'panel' ? 760 : 900
  const cx = width / 2
  const cy = height / 2 + (mode === 'panel' ? 35 : 10)
  const step = 112 + (hash % 24)
  const dash = variant === 'cube-grid' ? '10 12' : '0'
  const uiBar = variant === 'cube-ui'
  const frame = variant === 'cube-frame'

  const grid = `
    <g stroke="#E5E8EB" stroke-opacity="${mode === 'panel' ? '0.68' : '0.55'}" stroke-width="1" fill="none">
      <path d="M${cx - step * 3} ${cy - step * 2} L${cx} ${cy - step * 4} L${cx + step * 3} ${
        cy - step * 2
      }" ${dash ? `stroke-dasharray="${dash}"` : ''} />
      <path d="M${cx - step * 3} ${cy} L${cx} ${cy - step * 2} L${cx + step * 3} ${cy}" ${
        dash ? `stroke-dasharray="${dash}"` : ''
      } />
      <path d="M${cx - step * 3} ${cy + step * 2} L${cx} ${cy} L${cx + step * 3} ${cy + step * 2}" ${
        dash ? `stroke-dasharray="${dash}"` : ''
      } />
      <path d="M${cx - step * 1.9} ${cy - step * 3} L${cx - step * 1.9} ${cy + step * 3}" ${
        dash ? `stroke-dasharray="${dash}"` : ''
      } />
      <path d="M${cx} ${cy - step * 3.7} L${cx} ${cy + step * 3.3}" ${dash ? `stroke-dasharray="${dash}"` : ''} />
      <path d="M${cx + step * 1.9} ${cy - step * 3} L${cx + step * 1.9} ${cy + step * 3}" ${
        dash ? `stroke-dasharray="${dash}"` : ''
      } />
    </g>
  `

  const cube = `
    <g transform="translate(${cx - 170} ${cy - 186})">
      <polygon points="170,0 340,100 170,200 0,100" fill="#F35048" />
      <polygon points="0,100 170,200 170,430 0,330" fill="#9A0A0A" />
      <polygon points="340,100 170,200 170,430 340,330" fill="#E60E0E" />
    </g>
  `

  const frameBlocks = frame
    ? `
      <g stroke="#E5E8EB" stroke-opacity="0.68" stroke-width="1" fill="none">
        <path d="M${cx - 500} ${cy + 8} l190 -110 l0 286 l-190 110 z" />
        <path d="M${cx - 300} ${cy - 110} l190 -110 l0 286 l-190 110 z" />
        <path d="M${cx + 120} ${cy - 76} l190 -110 l0 286 l-190 110 z" />
        <path d="M${cx + 320} ${cy + 36} l190 -110 l0 286 l-190 110 z" />
      </g>
    `
    : ''

  const uiChrome = uiBar
    ? `
      <g stroke="#FFFFFF" stroke-width="4" fill="none">
        <path d="M${cx + 120} ${cy - 360} h260 a24 24 0 0 1 24 24 v20 a24 24 0 0 1 -24 24 h-260 a24 24 0 0 1 -24 -24 v-20 a24 24 0 0 1 24 -24 z" />
      </g>
      <circle cx="${cx + 350}" cy="${cy - 314}" r="15" stroke="#FFFFFF" stroke-width="4" fill="none" />
      <line x1="${cx + 362}" y1="${cy - 300}" x2="${cx + 374}" y2="${cy - 286}" stroke="#FFFFFF" stroke-width="4" />
      <path d="M${cx} ${cy - 396} L${cx} ${cy - 332}" stroke="#FFFFFF" stroke-width="4" />
      <path d="M${cx - 12} ${cy - 380} L${cx} ${cy - 396} L${cx + 12} ${cy - 380}" stroke="#FFFFFF" stroke-width="4" />
    `
    : ''

  const miniCubes = `
    <g stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="1" fill="none">
      <path d="M${cx - 430} ${cy - 250} l50 -30 l50 30 l-50 30 z" />
      <path d="M${cx - 430} ${cy - 250} l0 72 l50 30 l0 -72 z" />
      <path d="M${cx - 330} ${cy - 250} l0 72 l-50 30 l0 -72 z" />
      <path d="M${cx + 330} ${cy + 290} l50 -30 l50 30 l-50 30 z" />
      <path d="M${cx + 330} ${cy + 290} l0 72 l50 30 l0 -72 z" />
      <path d="M${cx + 430} ${cy + 290} l0 72 l-50 30 l0 -72 z" />
    </g>
  `

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#000000"/>
    ${grid}
    ${frameBlocks}
    ${cube}
    ${uiChrome}
    ${miniCubes}
  </svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function SeededHeroVisual({ seed }: { seed: string }) {
  const src = pickSeededImage(seed, HERO_RIGHT_IMAGES)
  return (
    <div className="relative overflow-hidden">
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={src}
          alt=""
          fill
          priority
          aria-hidden
          className="object-contain object-center"
        />
      </div>
    </div>
  )
}

function AutoHeroBackground({ seed, className }: { seed: string; className?: string }) {
  const src = createHeroIllustrationDataUri(seed, 'background')
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 bg-cover bg-center', className)}
      style={{ backgroundImage: `url("${src}")` }}
    />
  )
}

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  rightSlot,
  centered = false,
  backgroundImage,
  autoGenerateBackgroundImage = false,
  className,
}: HeroSectionProps) {
  const headlineText = typeof headline === 'string' ? headline : ''
  const heroSeed = `${headlineText} ${subheadline ?? ''}`.trim()
  const defaultCenteredBackgroundSrc =
    centered && !backgroundImage?.src && !autoGenerateBackgroundImage
      ? pickSeededImage(heroSeed, HERO_CENTERED_IMAGES)
      : undefined
  const resolvedBackgroundSrc =
    backgroundImage?.src ??
    defaultCenteredBackgroundSrc ??
    (autoGenerateBackgroundImage || backgroundImage ? 'AUTO_REFERENCE' : undefined)

  const heroBackgroundImage = resolvedBackgroundSrc
    ? {
        ...backgroundImage,
        src: resolvedBackgroundSrc,
      }
    : null
  const useCssBackgroundForCentered =
    centered && !!heroBackgroundImage && heroBackgroundImage.src !== 'AUTO_REFERENCE'
  const resolvedRightSlot = rightSlot ?? (!centered ? <SeededHeroVisual seed={heroSeed} /> : null)

  return (
    <section
      className={cn(
        'bg-bg-primary pt-20 pb-20 text-text-inverse relative overflow-hidden',
        centered && 'text-center',
        className
      )}
    >
      {heroBackgroundImage && (
        <>
          {heroBackgroundImage.src === 'AUTO_REFERENCE' ? (
            <AutoHeroBackground
              seed={heroSeed}
              className={cn(
                heroBackgroundImage.positionClassName ?? 'object-center',
                heroBackgroundImage.opacityClassName ?? 'opacity-80'
              )}
            />
          ) : useCssBackgroundForCentered ? (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 bg-cover',
                heroBackgroundImage.positionClassName ?? 'bg-center',
                heroBackgroundImage.opacityClassName ?? 'opacity-80'
              )}
              style={{ backgroundImage: `url("${heroBackgroundImage.src}")` }}
            />
          ) : (
            <Image
              src={heroBackgroundImage.src}
              alt={heroBackgroundImage.alt ?? ''}
              fill
              priority={heroBackgroundImage.priority}
              aria-hidden={heroBackgroundImage.alt ? undefined : true}
              className={cn(
                'pointer-events-none object-cover',
                heroBackgroundImage.positionClassName ?? 'object-center',
                heroBackgroundImage.opacityClassName ?? 'opacity-80'
              )}
            />
          )}
          {heroBackgroundImage.overlayClassName && (
            <div
              aria-hidden="true"
              className={cn('absolute inset-0', heroBackgroundImage.overlayClassName)}
            />
          )}
        </>
      )}
      <div
        className={cn(
          'max-w-container mx-auto px-4 md:px-8 lg:px-16',
          heroBackgroundImage && 'relative z-10'
        )}
      >
        {!centered ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              {eyebrow && <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>}
              <h1 className="text-h1-mb md:text-h1 font-bold leading-tight max-w-hero-title mb-6">
                {headline}
              </h1>
              {subheadline && (
                <p className="text-body-2xl text-carbon-300 max-w-subtitle leading-relaxed mb-8">
                  {subheadline}
                </p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="flex items-center gap-4 flex-wrap">
                  {primaryCta && (
                    <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
                  )}
                  {secondaryCta && (
                    <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
                  )}
                </div>
              )}
            </div>
            <div>{resolvedRightSlot}</div>
          </div>
        ) : (
          <>
            {eyebrow && <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>}
            <h1 className="text-h1-mb md:text-h1 font-bold leading-tight max-w-hero-title mx-auto mb-6">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-body-2xl text-text-secondary max-w-subtitle mx-auto mb-10">
                {subheadline}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {primaryCta && (
                  <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
                )}
                {secondaryCta && (
                  <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
