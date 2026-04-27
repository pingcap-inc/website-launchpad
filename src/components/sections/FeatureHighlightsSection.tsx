import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ColorCard } from '@/components/ui/ColorCard'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

type ColorCardVariant = 'red' | 'violet' | 'blue' | 'teal'

export interface ColorCardItem {
  variant: ColorCardVariant
  title: string | React.ReactNode
  description: string | React.ReactNode
  cta?: { text: string; href: string }
  icon?: React.ReactNode
}

interface FeatureHighlightsProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: ColorCardItem[]
  columns?: 2 | 3 | 4
  viewMore?: { text: string; href: string }
  className?: string
  /** Extra classes applied to every card */
  cardClassName?: string
}

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureHighlightsSection({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
  viewMore,
  className,
  cardClassName,
}: FeatureHighlightsProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle)
  return (
    <div className={cn('space-y-16', className)}>
      {hasHeader && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
      <div className={cn('grid grid-cols-1 gap-6', colsMap[columns])}>
        {items.map((item, index) => (
          <ColorCard
            key={typeof item.title === 'string' ? item.title : index}
            {...item}
            className={cardClassName}
          />
        ))}
      </div>
      {viewMore && (
        <div className="mt-12 flex justify-center">
          <SecondaryButton href={viewMore.href}>{viewMore.text}</SecondaryButton>
        </div>
      )}
    </div>
  )
}
