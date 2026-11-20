'use client'

import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CountUp } from '@/components/ui/CountUp'

export interface StatItem {
  icon?: React.ReactNode
  value: string
  /** Bold line under the value. Omit to show only the (gray) description. */
  label?: string
  description?: string
  /** Optional text color/gradient classes for the value (defaults to the current text color). */
  valueClassName?: string
}

interface StatsSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
  /** Wrap each stat in a bordered box (matches the web3 stat row on live). */
  bordered?: boolean
  /** Center each stat's icon, value and text. */
  centered?: boolean
  /** Size classes for the icon wrapper (default 48px). */
  iconClassName?: string
  /** Classes for the label line (default: bold body text). */
  labelClassName?: string
  className?: string
}

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

export function StatsSection({
  eyebrow,
  title,
  subtitle,
  stats,
  columns = 3,
  bordered = false,
  centered = false,
  iconClassName = 'w-12 h-12',
  labelClassName = 'text-body-md font-bold text-current',
  className,
}: StatsSectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle)

  return (
    <div className={cn('space-y-16', className)}>
      {hasHeader && <SectionHeader eyebrow={eyebrow} title={title ?? ''} subtitle={subtitle} />}
      <div className={cn('grid grid-cols-1 gap-6', colsMap[columns])}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              'px-8 py-8 flex flex-col gap-4',
              bordered && 'border border-carbon-800 bg-black',
              centered && 'items-center text-center'
            )}
          >
            {stat.icon && <div className={cn('text-current', iconClassName)}>{stat.icon}</div>}
            <CountUp
              value={stat.value}
              className={cn(
                'text-h2-mb md:text-h2-sm font-bold leading-none',
                stat.valueClassName ?? 'text-current'
              )}
            />
            {stat.label && <p className={labelClassName}>{stat.label}</p>}
            {stat.description && (
              <p className="text-body-sm text-secondary leading-relaxed">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
