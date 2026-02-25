import { SectionHeader } from '@/components/ui/SectionHeader'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { cn } from '@/lib/utils'

interface Feature {
  icon?: React.ReactNode
  title: string
  description: string
}

interface FeaturesGridProps {
  label?: string
  title: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  className?: string
  dark?: boolean
}

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

export function FeaturesGrid({
  label,
  title,
  subtitle,
  features,
  columns = 3,
  className,
}: FeaturesGridProps) {
  return (
    <section className={cn('py-section md:py-section-sm', className)}>
      <div className="max-w-container mx-auto px-16 lg:px-8 sm:px-4">
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
        />
        <div className={cn('grid grid-cols-1 gap-6', colsMap[columns])}>
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
