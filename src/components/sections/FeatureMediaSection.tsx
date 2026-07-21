import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SlideIn } from '@/components/ui/SlideIn'
import type { ImageRef } from '@/lib/dsl-schema'

/** Inline-link markdown: [label](url). Internal (starts with / or #) → <Link>, external → <a>. */
const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g
const LINK_CLASS =
  'text-brand-red-primary underline underline-offset-2 hover:no-underline transition-colors'

function renderDescription(text: string): React.ReactNode {
  if (!text.includes('](')) return text

  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  INLINE_LINK_RE.lastIndex = 0

  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    const [full, label, href] = match
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    const isInternal = href.startsWith('/') || href.startsWith('#')
    nodes.push(
      isInternal ? (
        <Link key={match.index} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ) : (
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      )
    )
    lastIndex = match.index + full.length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))

  return nodes
}

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
}

interface FeatureMediaSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: FeatureMediaItem[]
  /** Which side the first image appears on. Default: 'right' */
  startPosition?: 'left' | 'right'
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
        const isImageRight = index % 2 === 0 ? startPosition !== 'left' : startPosition === 'left'

        const textContent = item.content ?? (
          <>
            <h3 className="text-h3-lg md:text-h2-sm font-bold mb-4">{item.title}</h3>
            <p className="text-body-2xl text-secondary leading-relaxed whitespace-pre-line">
              {renderDescription(item.description)}
            </p>
          </>
        )

        const imageContent = (
          <div
            className={cn(
              'relative w-full overflow-hidden flex justify-center',
              isImageRight ? 'lg:justify-end' : 'lg:justify-start'
            )}
          >
            <Image
              src={item.image.image.url}
              alt={item.image.alt ?? ''}
              width={item.image.width ?? 600}
              height={item.image.height ?? 600}
              className="max-w-full xlg:max-w-[600px] max-h-[600px] h-auto object-contain"
            />
          </div>
        )

        const Wrapper = animate ? SlideIn : 'div'

        return (
          <div
            key={item.title ? `${item.title}-${index}` : `feature-media-${index}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <Wrapper
              {...(animate
                ? {
                    direction: 'up',
                    variant: 'fade',
                  }
                : {})}
              className={cn('lg:col-span-6', !isImageRight && 'lg:order-2')}
            >
              {textContent}
            </Wrapper>
            <Wrapper
              {...(animate
                ? {
                    direction: 'up',
                    variant: 'fade',
                    delay: 150,
                  }
                : {})}
              className={cn('lg:col-span-6', !isImageRight && 'lg:order-1')}
            >
              {item.image.image.url && imageContent}
            </Wrapper>
          </div>
        )
      })}
    </div>
  )
}
