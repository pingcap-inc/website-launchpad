import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SlideIn } from '@/components/ui/SlideIn'
import type { ImageRef } from '@/lib/dsl-schema'

export interface FeatureMediaItem {
  title: string
  description: string
  /** Full custom content override for the text side — TSX only, not in DSL */
  content?: React.ReactNode
  image: {
    image: ImageRef
    alt?: string
    width?: number
    height?: number
  }
  imagePosition?: 'left' | 'right'
}

interface FeatureMediaSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: FeatureMediaItem[]
  /** Layout mode. Use 'full' for a stacked full-width section. Default: 'right' */
  startPosition?: 'left' | 'right' | 'full'
  /** Enable SlideIn scroll animations. Default: true */
  animate?: boolean
  className?: string
}

export function FeatureMediaSection({
  eyebrow,
  title,
  subtitle,
  items,
  startPosition = 'right',
  animate = true,
  className,
}: FeatureMediaSectionProps) {
  return (
    <div className={cn('space-y-16', className)}>
      {title && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
      {items.map((item, index) => {
        const isFullWidthLayout = startPosition === 'full'
        const imageOnRight = isFullWidthLayout
          ? 'right'
          : (item.imagePosition ??
            (index % 2 === 0
              ? startPosition !== 'left'
                ? 'right'
                : 'left'
              : startPosition === 'left'
                ? 'right'
                : 'left'))
        const isImageRight = imageOnRight === 'right'

        const textContent = item.content ?? (
          <>
            <h3 className="text-h3-lg md:text-h2-sm font-bold mb-4">{item.title}</h3>
            <p className="text-body-2xl text-secondary leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </>
        )

        const imageContent = (
          <div
            className={cn(
              'relative w-full overflow-hidden flex justify-center',
              isFullWidthLayout ? 'mx-auto' : isImageRight ? 'lg:justify-end' : 'lg:justify-start'
            )}
          >
            <Image
              src={item.image.image.url}
              alt={item.image.alt ?? ''}
              width={item.image.width ?? 600}
              height={item.image.height ?? 600}
              className={cn(
                'w-full h-auto object-contain',
                isFullWidthLayout ? 'max-w-none' : 'max-w-full xlg:max-w-[600px] max-h-[600px]'
              )}
            />
          </div>
        )

        const Wrapper = animate ? SlideIn : 'div'

        return (
          <div
            key={item.title ? `${item.title}-${index}` : `feature-media-${index}`}
            className={cn(
              isFullWidthLayout
                ? 'w-full space-y-8 lg:space-y-10'
                : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'
            )}
          >
            <Wrapper
              {...(animate
                ? {
                    direction: 'up',
                    variant: 'fade',
                  }
                : {})}
              className={cn(
                isFullWidthLayout ? 'w-full max-w-4xl mx-auto' : 'lg:col-span-6',
                !isFullWidthLayout && !isImageRight && 'lg:order-2'
              )}
            >
              {textContent}
            </Wrapper>
            <Wrapper
              {...(animate
                ? {
                    direction: 'up',
                    variant: 'fade',
                    delay: isFullWidthLayout ? 0 : 150,
                  }
                : {})}
              className={cn(
                isFullWidthLayout ? 'w-full max-w-5xl mx-auto' : 'lg:col-span-6',
                !isFullWidthLayout && !isImageRight && 'lg:order-1'
              )}
            >
              {item.image.image.url && imageContent}
            </Wrapper>
          </div>
        )
      })}
    </div>
  )
}
