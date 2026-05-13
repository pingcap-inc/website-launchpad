import { cn } from '@/lib/utils'
import Image from 'next/image'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { SlideIn } from '@/components/ui/SlideIn'
import type { ImageRef } from '@/lib/dsl-schema'

interface CtaSectionProps {
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
  const hasImage = !!image?.image?.url
  const hasTitle = !!title?.trim()

  // Inline long-form CTAs render without a heading and should not show the
  // decorative illustration, even if upstream defaults tried to backfill one.
  if (!hasTitle) {
    return (
      <div className={cn('md:px-8 lg:px-16', className)}>
        {subtitle && (
          <p className="text-body-xl md:text-2xl text-current leading-relaxed">{subtitle}</p>
        )}
        <div className="flex items-center gap-4 flex-wrap mt-6">
          {primaryCta.text && (
            <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
          )}
          {secondaryCta && (
            <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-12 md:gap-8 items-center lg:px-16', className)}
    >
      {hasImage && (
        <SlideIn direction="left" className="md:col-span-4">
          <Image
            src={image!.image.url}
            alt={image!.alt ?? ''}
            width={image!.width ?? 278}
            height={image!.height ?? 256}
            className="mx-auto"
          />
        </SlideIn>
      )}
      {hasImage ? (
        <SlideIn direction="right" className="md:col-span-8">
          {title && (
            <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-current mb-4">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-2xl text-current leading-relaxed">{subtitle}</p>}
          <div className="flex items-center gap-4 flex-wrap mt-8">
            {primaryCta.text && (
              <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
            )}
            {secondaryCta && (
              <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
            )}
          </div>
        </SlideIn>
      ) : (
        <div className="md:col-span-12 text-center">
          <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-current mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-2xl text-current leading-relaxed">{subtitle}</p>}
          <div className="flex items-center gap-4 flex-wrap mt-8 justify-center">
            {primaryCta.text && (
              <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
            )}
            {secondaryCta && (
              <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
