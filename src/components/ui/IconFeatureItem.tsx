import { cn } from '@/lib/utils'

interface IconFeatureItemProps {
  icon?: React.ReactNode
  title: string
  description: string
  /** 'horizontal' = icon-left（默认）| 'vertical' = icon-top */
  layout?: 'horizontal' | 'vertical'
  className?: string
}

export function IconFeatureItem({
  icon,
  title,
  description,
  layout = 'horizontal',
  className,
}: IconFeatureItemProps) {
  return (
    <div
      className={cn(
        layout === 'vertical' ? 'flex flex-col gap-4' : 'flex flex-row gap-4',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'shrink-0 flex',
            layout === 'horizontal' ? 'items-start justify-center' : 'justify-start'
          )}
        >
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-h3-lg font-bold text-current mb-2">{title}</h3>
        <p className="text-body-md text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
