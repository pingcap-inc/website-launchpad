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
      {icon && <div className="shrink-0 flex justify-center">{icon}</div>}
      <div>
        <h3 className="text-h3-lg font-bold text-text-inverse mb-2">{title}</h3>
        <p className="text-body-md text-carbon-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
