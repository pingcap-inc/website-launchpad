import { cn } from '@/lib/utils'

type H2Size = 'lg' | 'md' | 'sm'
type Align = 'center' | 'left'

const h2SizeMap: Record<H2Size, string> = {
  lg: 'text-h2-mb md:text-h2-lg',
  md: 'text-h2-mb md:text-h2-md',
  sm: 'text-h2-mb md:text-h2-sm',
}

interface SectionHeaderProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  h2Size?: H2Size
  align?: Align
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  h2Size = 'lg',
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <div className="font-mono text-eyebrow text-text-secondary block mb-4">{eyebrow}</div>
      )}
      <h2
        className={cn(
          h2SizeMap[h2Size],
          'font-bold leading-tight mb-6 text-text-inverse',
          align === 'left' && 'max-w-section-title'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-body-2xl leading-relaxed max-w-subtitle text-text-secondary',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
