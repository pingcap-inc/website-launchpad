import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

interface HeroBackgroundImage {
  src: string
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
  className?: string
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
  className,
}: HeroSectionProps) {
  const heroBackgroundImage = backgroundImage?.src
    ? {
        ...backgroundImage,
      }
    : null
  const useCssBackgroundForCentered = centered && !!heroBackgroundImage
  const resolvedRightSlot = rightSlot ?? null

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
          {useCssBackgroundForCentered ? (
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
