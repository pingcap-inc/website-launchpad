'use client'

import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ShortcodeRenderer } from '@/components/shortcodes/ShortcodeRenderer'
import { cn } from '@/lib/utils'
import type { ColumnsProps } from '@/lib/dsl-schema'

interface ColumnsSectionProps extends ColumnsProps {
  className?: string
}

function renderMedia({ mediaType, image, shortCode }: ColumnsProps) {
  if (mediaType === 'shortcode') {
    return <ShortcodeRenderer shortCode={shortCode} />
  }

  if (image?.image?.url) {
    return (
      <div className="overflow-hidden flex justify-center">
        <Image
          src={image.image.url}
          alt={image.alt || ''}
          width={image.width || 1200}
          height={image.height || 800}
        />
      </div>
    )
  }

  return null
}

export function ColumnsSection({
  eyebrow,
  title,
  subtitle,
  titleFullWidth = true,
  layout = 'split',
  mediaType = 'image',
  image,
  shortCode,
  className,
}: ColumnsSectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle)
  const media = renderMedia({ mediaType, image, shortCode })

  if (layout === 'single') {
    return (
      <div className={cn('min-w-0 space-y-8', className)}>
        {hasHeader && (
          <div className={cn('min-w-0', !titleFullWidth && 'max-w-3xl')}>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
              fullWidth={titleFullWidth}
            />
          </div>
        )}
        {media ? <div className="pt-2">{media}</div> : null}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'min-w-0 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12',
        className
      )}
    >
      {hasHeader ? (
        <div className="min-w-0 lg:col-span-6 lg:self-center">
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} h2Size="md" />
        </div>
      ) : null}
      {media ? (
        <div className={cn('min-w-0 lg:col-span-6 lg:self-center', !hasHeader && 'lg:col-start-7')}>
          {media}
        </div>
      ) : null}
    </div>
  )
}
