import Image from 'next/image'
import Link from 'next/link'
import { cn, isVideoUrl } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SlideIn } from '@/components/ui/SlideIn'
import type { ImageRef } from '@/lib/dsl-schema'

/** Inline-link markdown: [label](url). Internal (starts with / or #) → <Link>, external → <a>. */
const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g
const LINK_CLASS = 'underline'

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
  /** When present, a video is rendered on the media side instead of the image. */
  video?: {
    /** Video source URL (mp4/webm). Use `sources` instead to offer multiple formats. */
    src?: string
    /** Multiple encodings; the browser picks the first it can play (e.g. webm then mp4). */
    sources?: { src: string; type?: string }[]
    /** Poster image URL shown before playback. */
    poster?: string
    width?: number
    height?: number
    /** Default: true. Autoplaying video is forced muted + playsInline by browsers. */
    autoPlay?: boolean
    /** Default: true */
    loop?: boolean
    /** Default: true */
    muted?: boolean
    /** Default: false. Show native playback controls. */
    controls?: boolean
  }
}

interface FeatureMediaSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: FeatureMediaItem[]
  /** Which side the first image appears on. Default: 'right' */
  startPosition?: 'left' | 'right'
  /** Vertical gap between feature rows. Default: 'lg' */
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  /** Enable SlideIn scroll animations. Default: true */
  animate?: boolean
  className?: string
}

const SPACING_CLASS: Record<NonNullable<FeatureMediaSectionProps['spacing']>, string> = {
  sm: 'space-y-8',
  md: 'space-y-12',
  lg: 'space-y-16',
  xl: 'space-y-24',
}

export function FeatureMediaSection({
  eyebrow,
  title,
  subtitle,
  items,
  startPosition = 'right',
  spacing = 'lg',
  animate = true,
  className,
}: FeatureMediaSectionProps) {
  return (
    <div className={cn(SPACING_CLASS[spacing] ?? SPACING_CLASS.lg, className)}>
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

        const video = item.video ?? {}
        const videoSources = video.sources?.filter((s) => s.src) ?? []
        const imageUrl = item.image?.image?.url ?? ''
        // A video URL dropped into the image field (via the media library) is
        // rendered as a video automatically — no separate `video` config needed.
        const imageUrlIsVideo = isVideoUrl(imageUrl)
        const videoSrc = video.src ?? (imageUrlIsVideo ? imageUrl : undefined)
        const hasVideo = Boolean(videoSrc || videoSources.length > 0)

        const mediaContent = (
          <div
            className={cn(
              'relative w-full overflow-hidden flex justify-center',
              isImageRight ? 'lg:justify-end' : 'lg:justify-start'
            )}
          >
            {hasVideo ? (
              <video
                src={videoSources.length > 0 ? undefined : videoSrc}
                poster={video.poster}
                width={video.width ?? item.image?.width ?? 600}
                height={video.height ?? item.image?.height ?? 600}
                autoPlay={video.autoPlay ?? true}
                loop={video.loop ?? true}
                muted={video.muted ?? true}
                controls={video.controls ?? false}
                playsInline
                className="max-w-full xlg:max-w-[600px] max-h-[600px] h-auto object-contain"
              >
                {videoSources.map((s, i) => (
                  <source key={`${s.src}-${i}`} src={s.src} type={s.type} />
                ))}
              </video>
            ) : (
              <Image
                src={imageUrl}
                alt={item.image.alt ?? ''}
                width={item.image.width ?? 600}
                height={item.image.height ?? 600}
                className="max-w-full xlg:max-w-[600px] max-h-[600px] h-auto object-contain"
              />
            )}
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
              {(hasVideo || imageUrl) && mediaContent}
            </Wrapper>
          </div>
        )
      })}
    </div>
  )
}
