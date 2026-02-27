import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

type CtaBackground = 'red' | 'violet' | 'blue' | 'teal'

const bgMap: Record<CtaBackground, string> = {
  red:    'bg-brand-red-bg',
  violet: 'bg-brand-violet-bg',
  blue:   'bg-brand-blue-bg',
  teal:   'bg-brand-teal-bg',
}

const cubeImageMap: Record<CtaBackground, string> = {
  red:    'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-red-mini.svg',
  violet: 'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-violet-mini.svg',
  blue:   'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-blue-mini.svg',
  teal:   'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-teal-mini.svg',
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
    <section className={cn('py-section-sm lg:py-section-md',  bgMap[background], className)}>
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
        <div className={cn('grid grid-cols-1 md:grid-cols-12 gap-8 items-center lg:px-16')}>
          <div className="col-span-4">
            <Image
              src={cubeImageMap[background]}
              alt="CTA cube"
              width={278}
              height={256}
              className='mx-auto'
            />
          </div>
          <div className="col-span-8">
            <h2 className="text-h3-lg md:text-h2-md font-bold leading-tight text-text-inverse mb-4">{title}</h2>
            {subtitle && (
              <p className="text-2xl text-text-inverse mb-4 leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="flex items-center gap-4 flex-wrap">
             {primaryCta && (
                <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
              )}
              {secondaryCta && (
                <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
