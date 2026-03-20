import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FeatureCard } from '@/components/ui/FeatureCard'

export interface FeatureCardItem {
  icon?: React.ReactNode
  title: string
  description: string
  borderColor?: string
  href?: string
  className?: string
}

interface FeatureCardSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureCardItem[]
  columns?: 2 | 3 | 4
  borderStyle?: 'gray' | 'color'
  className?: string
}

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

const borderColorOrder = [
  'border-brand-red-medium',
  'border-brand-violet-medium',
  'border-brand-blue-medium',
  'border-brand-teal-medium',
]

export function FeatureCardSection({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 2,
  borderStyle = 'gray',
  className,
}: FeatureCardSectionProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={cn('grid grid-cols-1 gap-6', colsMap[columns])}>
        {items.map((item, index) => (
          <FeatureCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            borderColor={
              item.borderColor ??
              (borderStyle === 'color'
                ? borderColorOrder[index % borderColorOrder.length]
                : undefined)
            }
            href={item.href}
            className={item.className}
          />
        ))}
      </div>
    </div>
  )
}
