import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

interface HeroSectionProps {
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  rightSlot?: React.ReactNode
  className?: string
}

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  rightSlot,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'bg-bg-inverse pt-20 pb-20 text-text-inverse relative overflow-hidden',
        rightSlot ? '' : 'text-center',
        className
      )}
    >
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
        {rightSlot ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              {eyebrow && (
                <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>
              )}
              <h1 className="text-h2-mb md:text-h2-sm lg:text-h2-md font-bold leading-tight mb-6">
                {headline}
              </h1>
              {subheadline && (
                <p className="text-body-xl text-carbon-300 max-w-subtitle leading-relaxed mb-8">
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
            <div>{rightSlot}</div>
          </div>
        ) : (
          <>
            {eyebrow && (
              <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>
            )}
            <h1 className="text-h1-mb md:text-h1 font-bold leading-tight max-w-hero-title mx-auto mb-6">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-body-xl text-carbon-400 max-w-subtitle mx-auto mb-10">
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
