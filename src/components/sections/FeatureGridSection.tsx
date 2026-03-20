import { SectionHeader } from '@/components/ui/SectionHeader'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { IconFeatureItem } from '@/components/ui/IconFeatureItem'
import { cn } from '@/lib/utils'

interface Feature {
  icon?: React.ReactNode
  title: string
  description: string
  cta?: { text: string; href: string }
  layout?: 'horizontal' | 'vertical'
}

interface FeaturesGridProps {
  eyebrow?: string
  title: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  viewMore?: { text: string; href: string }
  className?: string
  itemLayout?: 'horizontal' | 'vertical'
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
  itemLayout = 'vertical',
}: FeaturesGridProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={cn('grid grid-cols-1 gap-8', colsMap[columns])}>
        {features.map((feature) => {
          const resolvedLayout = feature.layout ?? itemLayout
          return (
            <div key={`${feature.title}-${feature.description}`} className="space-y-4">
              <IconFeatureItem
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                layout={resolvedLayout}
              />
              {feature.cta && (
                <SecondaryButton href={feature.cta.href}>{feature.cta.text}</SecondaryButton>
              )}
            </div>
          )
        })}
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
