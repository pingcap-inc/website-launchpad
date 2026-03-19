import { SectionHeader } from '@/components/ui/SectionHeader'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { cn } from '@/lib/utils'

interface Feature {
  icon?: React.ReactNode
  title: string
  description: string
  cta?: { text: string; href: string }
}

interface FeaturesGridProps {
  eyebrow?: string
  title: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  viewMore?: { text: string; href: string }
  className?: string
}

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGridSection({
  eyebrow,
  title,
  subtitle,
  features,
  columns = 3,
  viewMore,
  className,
}: FeaturesGridProps) {
  return (
    <div className={cn('max-w-container mx-auto px-4 md:px-8 lg:px-16', className)}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={cn('grid grid-cols-1 gap-8', colsMap[columns])}>
        {features.map((feature) => (
          <div key={`${feature.title}-${feature.description}`} className="space-y-4">
            {feature.icon && <div className="text-text-inverse">{feature.icon}</div>}
            <h3 className="text-h3-lg font-bold text-text-inverse">{feature.title}</h3>
            <p className="text-body-md text-carbon-300 leading-relaxed">{feature.description}</p>
            {feature.cta && (
              <SecondaryButton href={feature.cta.href}>{feature.cta.text}</SecondaryButton>
            )}
          </div>
        ))}
      </div>
      {viewMore && (
        <div className="mt-12 flex justify-center">
          <SecondaryButton href={viewMore.href} dark={false}>
            {viewMore.text}
          </SecondaryButton>
        </div>
      )}
    </div>
  )
}
