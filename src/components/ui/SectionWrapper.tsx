import type { ReactNode } from 'react'
import type { SectionStyle } from '@/lib/dsl-schema'
import { cn } from '@/lib/utils'

const BACKGROUND_CLASS: Record<string, string> = {
  primary: 'bg-bg-primary',
  inverse: 'bg-bg-inverse',
  'gradient-dark-top': 'bg-gradient-dark-top',
  'gradient-dark-bottom': 'bg-gradient-dark-bottom',
  'brand-red': 'bg-brand-red-bg',
  'brand-violet': 'bg-brand-violet-bg',
  'brand-blue': 'bg-brand-blue-bg',
  'brand-teal': 'bg-brand-teal-bg',
  none: '',
}

const SPACING_CLASS: Record<string, string> = {
  sm: 'py-section-sm',
  md: 'py-section-sm lg:py-section-md',
  lg: 'py-section-sm lg:py-section',
  section: 'py-section-sm lg:py-section',
  hero: '',
  none: '',
}

export function resolveSectionStyle(style?: SectionStyle, defaults?: SectionStyle): SectionStyle {
  return {
    background: style?.background ?? defaults?.background ?? 'primary',
    spacing: style?.spacing ?? defaults?.spacing ?? 'section',
    removePaddingTop: style?.removePaddingTop ?? defaults?.removePaddingTop,
    removePaddingBottom: style?.removePaddingBottom ?? defaults?.removePaddingBottom,
    className: style?.className ?? defaults?.className,
    backgroundImageOpacityClassName:
      style?.backgroundImageOpacityClassName ?? defaults?.backgroundImageOpacityClassName,
    backgroundImageOverlayClassName:
      style?.backgroundImageOverlayClassName ?? defaults?.backgroundImageOverlayClassName,
    backgroundImage: style?.backgroundImage ?? defaults?.backgroundImage,
  }
}

type ContentWidth = 'sm' | 'md' | 'lg'

const CONTENT_WIDTH_CLASS: Record<ContentWidth, string> = {
  sm: 'max-w-content-sm mx-auto',
  md: 'max-w-content-md mx-auto',
  lg: 'contain',
}

export function getToneFromBackground(background?: SectionStyle['background']): 'light' | 'dark' {
  return background === 'inverse' || background === 'none' ? 'dark' : 'light'
}

interface SectionWrapperProps {
  id?: string
  style?: SectionStyle
  defaultStyle?: SectionStyle
  contentWidth?: ContentWidth
  contentClassName?: string
  children: ReactNode
}

export function SectionWrapper({
  id,
  style,
  defaultStyle,
  contentWidth = 'lg',
  contentClassName,
  children,
}: SectionWrapperProps) {
  const resolved = resolveSectionStyle(style, defaultStyle)
  const background = resolved.background ?? 'primary'
  const backgroundImage = resolved.backgroundImage?.image?.url
    ? resolved.backgroundImage
    : undefined
  const backgroundImageOpacityClassName = resolved.backgroundImageOpacityClassName ?? 'opacity-80'
  const backgroundImageOverlayClassName = resolved.backgroundImageOverlayClassName
  const removePaddingTop = resolved.removePaddingTop
  const removePaddingBottom = resolved.removePaddingBottom
  const tone = getToneFromBackground(background)
  const isLightBackground = tone === 'dark'

  return (
    <section
      id={id}
      data-tone={tone === 'dark' ? 'dark' : undefined}
      className={cn(
        BACKGROUND_CLASS[background] ?? '',
        'group/section section-root',
        isLightBackground ? 'text-text-primary' : 'text-text-inverse',
        SPACING_CLASS[resolved.spacing ?? 'section'] ?? '',
        removePaddingTop && 'pt-0 lg:pt-0',
        removePaddingBottom && 'pb-0 lg:pb-0',
        backgroundImage && 'relative overflow-hidden',
        resolved.className
      )}
    >
      {backgroundImage && (
        <>
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 bg-cover bg-center',
              backgroundImageOpacityClassName
            )}
            style={{ backgroundImage: `url("${backgroundImage.image.url}")` }}
          />
          {backgroundImageOverlayClassName && (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0',
                backgroundImageOverlayClassName
              )}
            />
          )}
        </>
      )}
      <div
        className={cn(
          backgroundImage && 'relative z-10',
          CONTENT_WIDTH_CLASS[contentWidth],
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
