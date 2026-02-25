import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

type CtaBackground = 'red' | 'violet' | 'blue' | 'teal'

const bgMap: Record<CtaBackground, string> = {
  red:    'bg-brand-red-bg',
  violet: 'bg-brand-violet-bg',
  blue:   'bg-brand-blue-bg',
  teal:   'bg-brand-teal-bg',
}

interface CtaSectionProps {
  label?: string
  title: string
  subtitle?: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  background?: CtaBackground
  className?: string
}

export function CtaSection({
  label,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  background = 'red',
  className,
}: CtaSectionProps) {
  return (
    <section className={cn(bgMap[background], 'py-section md:py-section-sm', className)}>
      <div className="max-w-container mx-auto px-16 lg:px-8 sm:px-4 text-center">
        {label && (
          <p className="font-mono text-eyebrow text-carbon-400 mb-8">{label}</p>
        )}
        <h2 className="text-h2-md md:text-h2-mb font-bold leading-tight text-text-inverse mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="text-body-lg text-text-inverse/65 max-w-subtitle mx-auto mb-10">
            {subtitle}
          </p>
        )}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <PrimaryButton href={primaryCta.href}>
            {primaryCta.text}
          </PrimaryButton>
          {secondaryCta && (
            <SecondaryButton href={secondaryCta.href}>
              {secondaryCta.text}
            </SecondaryButton>
          )}
        </div>
      </div>
    </section>
  )
}
