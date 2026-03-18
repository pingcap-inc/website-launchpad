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
  title: string
  description: string
  cta: { text: string; href: string }
  /** Lucide icon or any SVG node */
  icon?: React.ReactNode
}

export function ColorCard({ variant, title, description, cta, icon }: ColorCardProps) {
  return (
    <a
      href={cta.href}
      className={cn(
        'group flex flex-col p-8',
        bgMap[variant],
        'hover:-translate-y-2 transition-transform duration-200 ease-in-out'
      )}
      {...externalLinkProps(cta.href)}
    >
      {/* Icon or image */}
      {icon && <div className="mb-6 text-white shrink-0">{icon}</div>}

      <h3 className="text-h3-lg font-bold text-text-inverse mb-4">{title}</h3>
      <p className="text-body-md text-white leading-relaxed flex-1">{description}</p>

      {/* SecondaryButton — triggered by card group hover */}
      <div className="mt-8">
        <SecondaryButton
          className="group-hover:bg-transparent group-hover:text-text-inverse"
          as="span"
        >
          {cta.text}
        </SecondaryButton>
      </div>
    </a>
  )
}
