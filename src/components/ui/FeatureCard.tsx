import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'flex flex-col gap-4 p-8 rounded-none border border-border-subtle/20',
      'transition-all duration-250 hover:shadow-card',
      className
    )}>
      {icon && (
        <div className="w-12 h-12">{icon}</div>
      )}
      <h3 className="text-h3-sm font-bold leading-normal m-0 text-text-inverse">
        {title}
      </h3>
      <p className="text-body-sm leading-relaxed m-0 text-text-inverse/65">
        {description}
      </p>
    </div>
  )
}
