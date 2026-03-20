import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { externalLinkProps } from '@/lib/links'
import type { ImageRef } from '@/lib/dsl-schema'

export interface LogoCloudItem {
  name: string
  image: ImageRef
  href?: string
  width?: number
  height?: number
}

interface LogoCloudSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  logos: LogoCloudItem[]
  variant?: 'default' | 'minimal'
  align?: 'center' | 'left'
  autoScroll?: boolean
  scrollSpeedSeconds?: number
  scrollContentMaxWidth?: number
  className?: string
}

export function LogoCloudSection({
  eyebrow,
  title,
  subtitle,
  logos,
  variant = 'default',
  align = 'center',
  autoScroll = true,
  scrollSpeedSeconds = 28,
  scrollContentMaxWidth,
  className,
}: LogoCloudSectionProps) {
  const shouldScroll = autoScroll && logos.length > 4
  const headerAlign = align === 'center' ? 'center' : 'left'
  const contentAlign = align === 'center' ? 'justify-center' : 'justify-start'
  const useCustomScrollWidth = typeof scrollContentMaxWidth === 'number'

  const renderLogo = (logo: LogoCloudItem, key: string) => {
    const containerClasses = 'flex items-center justify-center'
    const imageClasses =
      variant === 'minimal'
        ? 'h-8 w-auto object-contain opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100 brightness-0 invert'
        : 'h-10 w-auto object-contain opacity-75 transition-opacity duration-200 ease-in-out hover:opacity-100 brightness-0 invert'
    const content = (
      <div className={containerClasses}>
        <Image
          src={logo.image.url}
          alt={logo.name}
          width={logo.width ?? 140}
          height={logo.height ?? 48}
          className={imageClasses}
        />
      </div>
    )

    if (logo.href) {
      return (
        <a
          key={key}
          href={logo.href}
          aria-label={logo.name}
          className="shrink-0"
          {...externalLinkProps(logo.href)}
        >
          {content}
        </a>
      )
    }

    return (
      <div key={key} className="shrink-0">
        {content}
      </div>
    )
  }

  return (
    <div className={cn('space-y-16', className)}>
      {(title || subtitle || eyebrow) && (
        <SectionHeader
          h2Size="sm"
          align={headerAlign}
          eyebrow={eyebrow}
          title={title ?? ''}
          subtitle={subtitle}
        />
      )}
      {shouldScroll ? (
        <div
          className="relative overflow-hidden"
          style={
            useCustomScrollWidth ? { maxWidth: scrollContentMaxWidth, margin: '0 auto' } : undefined
          }
        >
          <div
            className={cn('flex w-max items-center gap-10 animate-logo-marquee', contentAlign)}
            style={{ animationDuration: `${scrollSpeedSeconds}s` }}
          >
            {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}-a`))}
            {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}-b`))}
          </div>
        </div>
      ) : (
        <>
          <div className={cn('flex flex-wrap items-center gap-10', contentAlign)}>
            {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}`))}
          </div>
        </>
      )}
    </div>
  )
}
