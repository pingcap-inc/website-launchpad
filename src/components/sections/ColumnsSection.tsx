'use client'

import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ShortcodeRenderer } from '@/components/shortcodes/ShortcodeRenderer'
import { RichTextBlock } from '@/components/sections/RichTextBlock'
import { cn, isVideoUrl } from '@/lib/utils'
import { isHtmlShortcode, resolveRegisteredShortcode } from '@/lib/shortcodes'
import type { ColumnItem, ColumnMedia, ColumnsProps } from '@/lib/dsl-schema'

interface ColumnsSectionProps extends ColumnsProps {
  className?: string
}

// A column's `content` merges Markdown and shortcodes: a registered shortcode
// token or a trusted HTML snippet renders through the shortcode renderer;
// anything else is treated as Markdown.
function renderColumnContent(content?: string) {
  if (!content) return null
  if (resolveRegisteredShortcode(content) || isHtmlShortcode(content)) {
    return <ShortcodeRenderer shortCode={content} />
  }
  return <RichTextBlock content={content} />
}

function renderColumnItem(item: ColumnItem) {
  if (item.type === 'content') return renderColumnContent(item.content)
  if (item.type === 'media') return renderMedia({ mediaType: 'image', ...item })
  // Fall back to inference when the type is unset.
  return item.content
    ? renderColumnContent(item.content)
    : renderMedia({ mediaType: 'image', ...item })
}

function renderMedia({ mediaType, image, video, shortCode }: ColumnMedia) {
  // Per-column items may omit mediaType — infer it from the fields present.
  const effectiveType = mediaType ?? (shortCode ? 'shortcode' : 'image')

  if (effectiveType === 'shortcode') {
    return shortCode ? <ShortcodeRenderer shortCode={shortCode} /> : null
  }

  // A video URL dropped into the image field (via the media library) renders as
  // a video automatically — no separate `video` config or mediaType needed.
  const videoSources = video?.sources?.filter((s) => s.src) ?? []
  const imageUrl = image?.image?.url
  const videoSrc = video?.src ?? (isVideoUrl(imageUrl) ? imageUrl : undefined)

  if (videoSrc || videoSources.length > 0) {
    return (
      <div className="overflow-hidden flex justify-center">
        <video
          src={videoSources.length > 0 ? undefined : videoSrc}
          poster={video?.poster}
          width={video?.width ?? image?.width ?? 1200}
          height={video?.height ?? image?.height ?? 800}
          autoPlay={video?.autoPlay ?? true}
          loop={video?.loop ?? true}
          muted={video?.muted ?? true}
          controls={video?.controls ?? false}
          playsInline
          className="max-w-full h-auto object-contain"
        >
          {videoSources.map((s, i) => (
            <source key={`${s.src}-${i}`} src={s.src} type={s.type} />
          ))}
        </video>
      </div>
    )
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
  video,
  shortCode,
  items,
  itemColumns = 2,
  className,
}: ColumnsSectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle)
  const media = renderMedia({ mediaType, image, video, shortCode })

  if (layout === 'columns') {
    const columns = items ?? []
    return (
      <div className={cn('min-w-0 space-y-12', className)}>
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
        {columns.length > 0 && (
          <div
            className={cn(
              'grid grid-cols-1 gap-8 md:gap-12',
              itemColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
            )}
          >
            {columns.map((item, i) => (
              <div key={i} className="min-w-0">
                {renderColumnItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

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
