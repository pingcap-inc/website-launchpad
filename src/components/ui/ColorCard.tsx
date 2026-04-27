import { cn } from '@/lib/utils'
import { SecondaryButton } from './SecondaryButton'
import { externalLinkProps } from '@/lib/links'

type ColorCardVariant = 'red' | 'violet' | 'blue' | 'teal'

const bgMap: Record<ColorCardVariant, string> = {
  red: 'bg-brand-red-dark',
  violet: 'bg-brand-violet-dark',
  blue: 'bg-brand-blue-dark',
  teal: 'bg-brand-teal-dark',
}

interface ColorCardProps {
  variant: ColorCardVariant
  title: string | React.ReactNode
  description: string | React.ReactNode
  cta?: { text: string; href: string }
  /** Lucide icon or any SVG node */
  icon?: React.ReactNode
  className?: string
}

export function ColorCard({ variant, title, description, cta, icon, className }: ColorCardProps) {
  const rootClassName = cn(
    'group flex flex-col p-8',
    bgMap[variant],
    cta && 'hover:-translate-y-2 transition-transform duration-200 ease-in-out',
    className
  )

  const content = (
    <>
      {icon && <div className="mb-6 text-text-inverse shrink-0">{icon}</div>}

      <h3 className="text-h3-lg font-bold text-text-inverse mb-4">{title}</h3>
      <div className="text-body-md text-text-inverse leading-relaxed flex-1">{description}</div>

      {cta?.text && (
        <div className="mt-8">
          <SecondaryButton
            className="group-hover:bg-transparent group-hover:text-text-inverse"
            as="span"
          >
            {cta.text}
          </SecondaryButton>
        </div>
      )}
    </>
  )

  if (cta) {
    return (
      <a href={cta.href} className={rootClassName} {...externalLinkProps(cta.href)}>
        {content}
      </a>
    )
  }

  return <div className={rootClassName}>{content}</div>
}
