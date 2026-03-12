import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

// ─── Types ─────────────────────────────────────────────────────────────────────

/**
 * Three layout modes:
 * - `centered`    — text centered, optional background image
 * - `split`       — 1:1 left text / right rightSlot (form, image, any ReactNode)
 * - `image-right` — left text (max-w-[780px]) / right hero image with alignment control
 */
export type HeroLayout = 'centered' | 'split' | 'image-right'

interface HeroBackgroundImage {
  src?: string
  alt?: string
  priority?: boolean
  /** Defaults to opacity-40 */
  opacityClassName?: string
  /** Optional overlay class. No overlay is applied unless this is provided. */
  overlayClassName?: string
  /** Defaults to object-center */
  positionClassName?: string
}

/** Used with `layout="image-right"` */
export interface HeroImageSlot {
  src: string
  alt?: string
  width: number
  height: number
  /** Desktop image alignment. Defaults to `'right'`. */
  align?: 'right' | 'center'
  priority?: boolean
}

interface HeroSectionProps {
  /**
   * Layout variant.
   * - `'split'`                 — 1:1 grid, left text, right `rightSlot`
   * - `'centered'`              — centered text with optional background image
   * - `'image-right'` (default) — left text (max-w 780px) + right `heroImage`
   */
  layout?: HeroLayout
  eyebrow?: string
  headline: string | React.ReactNode
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  /** Right column content. Used in `split` layout. */
  rightSlot?: React.ReactNode
  /** Hero image config. Used in `image-right` layout. */
  heroImage?: HeroImageSlot
  backgroundImage?: HeroBackgroundImage
  className?: string
}

// ─── Shared text block ─────────────────────────────────────────────────────────

function HeroTextBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  centered,
  className,
}: Pick<
  HeroSectionProps,
  'eyebrow' | 'headline' | 'subheadline' | 'primaryCta' | 'secondaryCta'
> & { centered?: boolean; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>}
      <h1
        className={cn(
          'text-h1-mb md:text-h1 font-bold leading-tight max-w-hero-title mb-6 whitespace-pre-line',
          centered && 'mx-auto'
        )}
      >
        {headline}
      </h1>
      {subheadline && (
        <p
          className={cn(
            'text-body-2xl leading-relaxed text-text-secondary max-w-subtitle',
            centered && 'mx-auto mb-10'
          )}
        >
          {subheadline}
        </p>
      )}
      {(primaryCta || secondaryCta) && (
        <div
          className={cn(
            'flex items-center gap-4 md:gap-8 flex-wrap mt-8',
            centered && 'justify-center'
          )}
        >
          {primaryCta && <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>}
          {secondaryCta && (
            <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_HERO_IMAGE: HeroImageSlot = {
  src: '/images/hero/r/Graphic-1-Dk.png',
  alt: '',
  width: 800,
  height: 500,
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function HeroSection({
  layout,
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  rightSlot,
  heroImage,
  backgroundImage,
  className,
}: HeroSectionProps) {
  const resolvedLayout: HeroLayout = layout ?? 'image-right'
  const isCentered = resolvedLayout === 'centered'
  const resolvedHeroImage = heroImage ?? DEFAULT_HERO_IMAGE

  const resolvedBackgroundSrc = backgroundImage?.src
  const heroBackgroundImage = resolvedBackgroundSrc
    ? { ...backgroundImage, src: resolvedBackgroundSrc }
    : null
  const useCssBackgroundForCentered = isCentered && !!heroBackgroundImage

  // Right slot for split layout
  const resolvedRightSlot = resolvedLayout === 'split' ? (rightSlot ?? null) : null

  return (
    <section
      className={cn(
        'bg-bg-primary text-text-inverse relative overflow-hidden py-10 md:py-0',
        isCentered && 'text-center',
        className
      )}
    >
      {/* ── Background layer ── */}
      {heroBackgroundImage && (
        <>
          {useCssBackgroundForCentered ? (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 bg-cover',
                heroBackgroundImage.positionClassName ?? 'bg-center',
                heroBackgroundImage.opacityClassName ?? 'opacity-40'
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
                heroBackgroundImage.opacityClassName ?? 'opacity-40'
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

      {/* ── Content ── */}
      <div
        className={cn(
          'max-w-container mx-auto px-4 md:px-8 lg:px-16',
          heroBackgroundImage && 'relative z-10'
        )}
      >
        {/* Layout 1: centered */}
        {resolvedLayout === 'centered' && (
          <HeroTextBlock
            eyebrow={eyebrow}
            headline={headline}
            subheadline={subheadline}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            centered
            className="pt-10 md:py-20"
          />
        )}

        {/* Layout 2: split — 1:1 grid, right = rightSlot */}
        {resolvedLayout === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <HeroTextBlock
              eyebrow={eyebrow}
              headline={headline}
              subheadline={subheadline}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              className="pt-10 md:py-20"
            />
            <div className="py-4">{resolvedRightSlot}</div>
          </div>
        )}

        {/* Layout 3: image-right — left text (max 780px) + right heroImage */}
        {resolvedLayout === 'image-right' && (
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
            <HeroTextBlock
              eyebrow={eyebrow}
              headline={headline}
              subheadline={subheadline}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              className="md:py-20 w-full lg:max-w-[780px] lg:shrink-0"
            />
            <div
              className={cn(
                'pt-4 lg:py-4 flex-1 flex items-center justify-center',
                resolvedHeroImage.align === 'center' ? 'lg:justify-center' : 'lg:justify-end'
              )}
            >
              <Image
                src={resolvedHeroImage.src}
                alt={resolvedHeroImage.alt ?? ''}
                width={resolvedHeroImage.width}
                height={resolvedHeroImage.height}
                className="max-w-full h-auto"
                priority={resolvedHeroImage.priority ?? true}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
