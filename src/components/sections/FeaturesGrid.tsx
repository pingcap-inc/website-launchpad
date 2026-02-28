import { SectionHeader } from '@/components/ui/SectionHeader'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
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
  viewMore?: { text?: string; href: string }
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
  viewMore,
  className,
}: FeaturesGridProps) {
  return (
    <section className={cn('py-section-sm lg:py-section', className)}>
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
        <SectionHeader label={label} title={title} subtitle={subtitle} />
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
        {viewMore && (
          <div className="mt-12 flex justify-center">
            <SecondaryButton href={viewMore.href} dark={false}>
              {viewMore.text ?? 'View More'}
            </SecondaryButton>
          </div>
        )}
      </div>
    </section>
  )
}
