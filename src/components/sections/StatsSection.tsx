'use client'

import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CountUp } from '@/components/ui/CountUp'

export interface StatItem {
  icon?: React.ReactNode
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
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
  className,
}: StatsSectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle)

  return (
    <div className={cn('max-w-container mx-auto px-4 md:px-8 lg:px-16', className)}>
      {hasHeader && title && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
      <div className={cn('grid grid-cols-1 gap-6', colsMap[columns])}>
        {stats.map((stat, i) => (
          <div key={i} className="px-8 py-8 flex flex-col gap-4">
            {stat.icon && <div className="w-12 h-12 text-text-inverse">{stat.icon}</div>}
            <CountUp
              value={stat.value}
              className="text-h2-mb md:text-h2-sm font-bold text-text-inverse leading-none"
            />
            <p className="text-body-md font-bold text-text-inverse">{stat.label}</p>
            {stat.description && (
              <p className="text-body-sm text-carbon-400 leading-relaxed">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
