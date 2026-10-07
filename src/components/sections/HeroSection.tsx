import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import type { ImageRef, HeroProps } from '@/lib/dsl-schema'
import { resolveCdnUrl } from '@/lib/cdn-url'
import { Badge } from '@/components/ui/badge'

// ─── Types ─────────────────────────────────────────────────────────────────────

/**
 * Three layout modes:
 * - `centered`    — text centered
 * - `split`       — 1:1 left text / right rightSlot (form, image, any ReactNode)
 * - `image-right` — left text (max-w-[780px]) / right hero image with alignment control
 */
export type HeroLayout = 'centered' | 'split' | 'image-right'

/** Used with `layout="image-right"` */
export interface HeroImageSlot {
  image: ImageRef
  /** Static visual for visitors who request reduced motion. */
  reducedMotionImage?: ImageRef
  alt?: string
  width?: number
  height?: number
  /** Desktop image alignment. Defaults to `'right'`. */
  align?: 'right' | 'center'
  priority?: boolean
}

interface HeroSectionProps {
  /**
   * Layout variant.
   * - `'split'`                 — 1:1 grid, left text, right `rightSlot`
   * - `'centered'`              — centered text with optional background image
   * - `'image-right'` (default) — left text (max-w 780px) + right `heroImage`
   */
  layout?: HeroLayout
  eyebrow?: string
  statusBadge?: HeroProps['statusBadge']
  /** Opt-in decorative visual; omitted preserves the standard layout. */
  imagePresentation?: HeroProps['imagePresentation']
  /**
   * Plain text, a React node, or an HTML string.
   * HTML strings (detected by `<` tag) are rendered via `dangerouslySetInnerHTML`.
   * SECURITY: HTML headline strings must be code-owned/trusted (not user/CMS input).
   * Use CSS classes from globals.css for gradient effects, e.g.:
   * `"Unlock <span class=\"text-gradient-violet animate-glow-sweep\">TiDB Cloud</span>"`
   */
  headline: string | React.ReactNode
  subheadline?: string | React.ReactNode
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  /** Right column content. Used in `split` layout. */
  rightSlot?: React.ReactNode
  /** Hero image config. Used in `image-right` layout. */
  heroImage?: HeroImageSlot
  className?: string
}

function HeroVisual({ heroImage, decorative }: { heroImage: HeroImageSlot; decorative: boolean }) {
  const image = (
    <Image
      src={heroImage.image.url}
      alt={heroImage.alt ?? ''}
      width={heroImage.width || 800}
      height={heroImage.height || 500}
      className={cn(
        'max-w-full h-auto',
        decorative &&
          'w-[88vw] max-w-[360px] md:w-[54vw] md:max-w-[430px] lg:w-[36vw] lg:max-w-[520px]'
      )}
      sizes={decorative ? '(min-width: 1024px) 36vw, (min-width: 768px) 54vw, 88vw' : undefined}
      priority={heroImage.priority ?? true}
    />
  )
  if (!heroImage.reducedMotionImage?.url) return image
  return (
    <picture>
      <source
        media="(prefers-reduced-motion: reduce)"
        srcSet={resolveCdnUrl(heroImage.reducedMotionImage.url)}
      />
      {image}
    </picture>
  )
}

// ─── Shared text block ─────────────────────────────────────────────────────────

function HeroTextBlock({
  eyebrow,
  statusBadge,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  centered,
  className,
  decorative,
}: Pick<
  HeroSectionProps,
  'eyebrow' | 'statusBadge' | 'headline' | 'subheadline' | 'primaryCta' | 'secondaryCta'
> & { centered?: boolean; decorative?: boolean; className?: string }) {
  // Detect HTML strings so we can use dangerouslySetInnerHTML
  const isHtmlHeadline = typeof headline === 'string' && /<[a-z][\s\S]*>/i.test(headline)

  return (
    <div className={className}>
      {statusBadge?.text ? (
        <div className={cn('flex items-center gap-5 flex-wrap mb-8', centered && 'justify-center')}>
          {eyebrow && <p className="font-mono text-eyebrow text-secondary">{eyebrow}</p>}
          <Badge variant={statusBadge.variant} className="font-mono font-medium">
            {statusBadge.text}
          </Badge>
        </div>
      ) : (
        eyebrow && <p className="font-mono text-eyebrow text-secondary mb-8">{eyebrow}</p>
      )}
      <h1
        className={cn(
          'text-h1-mb md:text-h1 font-bold leading-tight max-w-hero-title',
          decorative && 'md:text-[52px] lg:text-[56px] xl:text-h1',
          !isHtmlHeadline && 'whitespace-pre-line',
          centered && 'mx-auto'
        )}
        {...(isHtmlHeadline ? { dangerouslySetInnerHTML: { __html: headline as string } } : {})}
      >
        {!isHtmlHeadline ? headline : null}
      </h1>
      {subheadline && (
        <p
          className={cn(
            'text-body-2xl leading-relaxed text-text-secondary max-w-subtitle mt-6',
            centered && 'mx-auto mb-10'
          )}
        >
          {subheadline}
        </p>
      )}
      {(primaryCta?.text || secondaryCta?.text) && (
        <div
          className={cn(
            'flex items-center gap-4 md:gap-8 flex-wrap mt-8',
            centered && 'justify-center'
          )}
        >
          {primaryCta?.text && (
            <PrimaryButton href={primaryCta.href}>{primaryCta.text}</PrimaryButton>
          )}
          {secondaryCta?.text && (
            <SecondaryButton href={secondaryCta.href}>{secondaryCta.text}</SecondaryButton>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function HeroSection({
  layout,
  eyebrow,
  statusBadge,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  rightSlot,
  heroImage,
  imagePresentation,
  className,
}: HeroSectionProps) {
  const resolvedLayout: HeroLayout = layout ?? 'image-right'
  const isCentered = resolvedLayout === 'centered'
  const decorative = imagePresentation === 'decorative'

  // Right slot for split layout
  const resolvedRightSlot = resolvedLayout === 'split' ? (rightSlot ?? null) : null

  return (
    <div className={cn('relative overflow-hidden', isCentered && 'text-center', className)}>
      {/* ── Content ── */}
      <div>
        {/* Layout 1: centered */}
        {resolvedLayout === 'centered' && (
          <HeroTextBlock
            eyebrow={eyebrow}
            statusBadge={statusBadge}
            headline={headline}
            subheadline={subheadline}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            centered
            className="pt-10 md:py-20"
          />
        )}

        {/* Layout 2: split — 1:1 grid, right = rightSlot */}
        {resolvedLayout === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <HeroTextBlock
              eyebrow={eyebrow}
              statusBadge={statusBadge}
              headline={headline}
              subheadline={subheadline}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              className="pt-10 md:pt-20 lg:py-20"
            />
            <div className="py-4 md:pb-20 lg:py-0">{resolvedRightSlot}</div>
          </div>
        )}

        {/* Layout 3: image-right — left text (max 780px) + right heroImage */}
        {resolvedLayout === 'image-right' && (
          <div
            className={cn(
              'flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12',
              decorative && 'relative md:min-h-[720px] lg:min-h-0'
            )}
          >
            <HeroTextBlock
              eyebrow={eyebrow}
              statusBadge={statusBadge}
              headline={headline}
              subheadline={subheadline}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              decorative={decorative}
              className={cn(
                'pt-10 md:pt-20 lg:py-20 w-full lg:max-w-[780px] xlg:shrink-0',
                decorative &&
                  'relative z-10 md:w-3/4 md:max-w-[570px] lg:w-3/5 lg:max-w-none lg:shrink-0'
              )}
            />
            <div
              className={cn(
                'pt-4 lg:py-4 flex-1 flex items-center justify-center',
                heroImage?.align === 'center'
                  ? 'lg:justify-center'
                  : 'pb-10 lg:py-0 lg:justify-end lg:min-w-[300px]',
                decorative &&
                  'relative z-0 md:absolute md:right-0 md:bottom-5 md:w-[58%] md:p-0 lg:relative lg:right-auto lg:bottom-auto lg:w-2/5 lg:min-w-0'
              )}
            >
              {decorative && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-y-1/4 -left-1/4 right-0 z-10 hidden md:block lg:hidden bg-gradient-to-r from-bg-primary via-bg-primary/90 to-transparent"
                />
              )}
              {heroImage && <HeroVisual heroImage={heroImage} decorative={decorative} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
