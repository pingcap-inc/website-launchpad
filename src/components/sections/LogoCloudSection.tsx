import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'

export interface LogoCloudItem {
  name: string
  src: string
  href?: string
  width?: number
  height?: number
}

interface LogoCloudSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  logos: LogoCloudItem[]
  columns?: 2 | 3 | 4 | 5 | 6
  variant?: 'default' | 'minimal'
  autoScroll?: boolean
  scrollSpeedSeconds?: number
  className?: string
}

const colsMap = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-5',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
}

export function LogoCloudSection({
  eyebrow,
  title,
  subtitle,
  logos,
  columns = 4,
  variant = 'default',
  autoScroll = true,
  scrollSpeedSeconds = 28,
  className,
}: LogoCloudSectionProps) {
  const shouldScroll = autoScroll && logos.length > 5

  const renderLogo = (logo: LogoCloudItem, key: string) => {
    const containerClasses =
      variant === 'minimal'
        ? 'flex items-center justify-center'
        : 'flex items-center justify-center rounded-xl border border-carbon-800 bg-bg-surface/40 px-6 py-5 transition-transform duration-200 ease-in-out hover:-translate-y-1'
    const imageClasses =
      variant === 'minimal'
        ? 'h-8 w-auto object-contain opacity-90 transition-opacity duration-200 ease-in-out hover:opacity-100 brightness-0 invert'
        : 'h-10 w-auto object-contain opacity-80 grayscale transition-all duration-200 ease-in-out hover:opacity-100 hover:grayscale-0'
    const content = (
      <div className={containerClasses}>
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.width ?? 140}
          height={logo.height ?? 48}
          className={imageClasses}
        />
      </div>
    )

    if (logo.href) {
      return (
        <a key={key} href={logo.href} aria-label={logo.name} className="shrink-0">
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
    <section className={cn('py-section-sm lg:py-section', className)}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
        {(title || subtitle || eyebrow) && (
          <SectionHeader
            h2Size="sm"
            align={variant === 'minimal' ? 'center' : 'left'}
            eyebrow={eyebrow}
            title={title ?? ''}
            subtitle={subtitle}
          />
        )}
        {shouldScroll ? (
          <div className="relative overflow-hidden flex justify-center">
            <div
              className="flex w-max items-center gap-6 animate-logo-marquee"
              style={{ animationDuration: `${scrollSpeedSeconds}s` }}
            >
              {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}-a`))}
              {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}-b`))}
            </div>
          </div>
        ) : (
          <>
            {variant === 'minimal' ? (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}`))}
              </div>
            ) : (
              <div className={cn('grid gap-6 items-center', colsMap[columns])}>
                {logos.map((logo, index) => renderLogo(logo, `${logo.name}-${index}`))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
