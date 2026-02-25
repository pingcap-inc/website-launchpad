import { cn } from '@/lib/utils'

type H2Size = 'lg' | 'md' | 'sm'
type Align = 'center' | 'left'

const h2SizeMap: Record<H2Size, string> = {
  lg: 'text-h2-lg md:text-h2-mb',
  md: 'text-h2-md md:text-h2-mb',
  sm: 'text-h2-sm md:text-h2-mb',
}

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  h2Size?: H2Size
  align?: Align
}

export function SectionHeader({
  label,
  title,
  subtitle,
  h2Size = 'md',
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center')}>
      {label && (
        <p className="font-mono text-eyebrow text-carbon-400 mb-8">{label}</p>
      )}
      <h2 className={cn(
        h2SizeMap[h2Size],
        'font-bold leading-tight mb-4 text-text-inverse'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-body-lg leading-relaxed max-w-subtitle text-text-inverse/65',
          align === 'center' && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
