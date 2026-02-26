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
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  background = 'red',
  className,
}: CtaSectionProps) {
  return (
    <section className={cn(bgMap[background], 'py-section md:py-section-sm', className)}>
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 text-center">
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
