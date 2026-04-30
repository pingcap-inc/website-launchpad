import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'
import { SecondaryButton } from './SecondaryButton'

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string | React.ReactNode
  /** Border color Tailwind class, e.g. 'border-brand-red-primary'. Defaults to border-carbon-800 */
  borderColor?: string
  /** When provided, renders as <a> with hover float animation */
  href?: string
  ctaText?: string
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  borderColor = 'border-carbon-800',
  href,
  ctaText,
  className,
}: FeatureCardProps) {
  // Description with inline JSX (e.g. <InlineLink>) cannot be nested inside the
  // card-level <a>. In that case, drop the wrapping anchor and let the CTA be the link.
  const wrapInAnchor = href && typeof description === 'string'

  const classes = cn(
    'group flex flex-col gap-4 p-8 border h-full transition-transform duration-200 ease-in-out',
    href && 'hover:-translate-y-2',
    borderColor,
    className
  )

  const content = (
    <>
      {icon && <div className="relative text-current">{icon}</div>}
      <h3 className="text-h3-lg font-bold leading-normal m-0 text-current">{title}</h3>
      <p className="text-body-md leading-relaxed m-0 text-secondary">{description}</p>
      {ctaText && href && (
        <div className="mt-4">
          <SecondaryButton
            className="group-hover:bg-transparent group-hover:text-text-inverse"
            as={wrapInAnchor ? 'span' : 'a'}
            href={wrapInAnchor ? undefined : href}
          >
            {ctaText}
          </SecondaryButton>
        </div>
      )}
    </>
  )

  if (wrapInAnchor) {
    return (
      <a href={href} className={classes} {...externalLinkProps(href)}>
        {content}
      </a>
    )
  }

  return <div className={classes}>{content}</div>
}
