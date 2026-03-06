import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  /** Border color Tailwind class, e.g. 'border-brand-red-primary'. Defaults to border-carbon-800 */
  borderColor?: string
  /** When provided, renders as <a> with hover float animation */
  href?: string
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  borderColor = 'border-carbon-800',
  href,
  className,
}: FeatureCardProps) {
  const classes = cn(
    'flex flex-col gap-4 p-8 border h-full hover:-translate-y-2 transition-transform duration-200 ease-in-out',
    borderColor,
    className
  )

  const content = (
    <>
      {icon && <div className="relative">{icon}</div>}
      <h3 className="text-h3-lg font-bold leading-normal m-0 text-text-inverse">{title}</h3>
      <p className="text-body-md leading-relaxed m-0 text-text-inverse">{description}</p>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...externalLinkProps(href)}>
        {content}
      </a>
    )
  }

  return <div className={classes}>{content}</div>
}
