import { cn } from '@/lib/utils'
import Image from 'next/image'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { SlideIn } from '@/components/ui/SlideIn'
import type { ImageRef } from '@/lib/dsl-schema'

interface CtaSectionProps {
  label?: string
  title: string
  subtitle?: string
  image?: { image: ImageRef; alt?: string; width?: number; height?: number }
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  className?: string
}

export function CtaSection({
  title,
  subtitle,
  image,
  primaryCta,
  secondaryCta,
  className,
}: CtaSectionProps) {
  return (
    <div className={cn('max-w-container mx-auto px-4 md:px-8 lg:px-16', className)}>
      <div className={cn('grid grid-cols-1 md:grid-cols-12 md:gap-8 items-center lg:px-16')}>
        <SlideIn direction="left" className="col-span-4">
          {image && (
            <Image
              src={image.image.url}
              alt={image.alt ?? ''}
              width={image.width ?? 278}
              height={image.height ?? 256}
              className="mx-auto"
            />
          )}
        </SlideIn>
        <SlideIn direction="right" className="col-span-8">
          <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-text-inverse mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-2xl text-text-inverse mb-6 leading-relaxed">{subtitle}</p>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            {primaryCta && <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>}
            {secondaryCta && (
              <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
            )}
          </div>
        </SlideIn>
      </div>
    </div>
  )
}
