import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  /** Remote or local image */
  image?: { src: string; alt: string; width?: number; height?: number }
}

export function ColorCard({ variant, title, description, cta, icon, image }: ColorCardProps) {
  return (
    <a
      href={cta.href}
      className={cn(
        'group flex flex-col p-8',
        bgMap[variant],
        'hover:-translate-y-2 transition-transform duration-200 ease-in-out'
      )}
    >
      {/* Icon or image */}
      {image ? (
        <div className="mb-6 w-12 h-12 relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 48}
            height={image.height ?? 48}
            className="object-contain"
          />
        </div>
      ) : icon ? (
        <div className="mb-6 text-white shrink-0">{icon}</div>
      ) : null}

      <h3 className="text-h3-lg font-bold text-text-inverse mb-4">{title}</h3>
      <p className="text-body-md text-white leading-relaxed flex-1">{description}</p>

      {/* SecondaryButton visual — triggered by card group hover */}
      <div className="mt-8 inline-flex items-center justify-end gap-2 text-base font-medium text-text-inverse">
        <span>{cta.text}</span>
        <span
          className={cn(
            'relative flex items-center justify-center',
            'w-6 h-6 rounded-full aspect-square shrink-0',
            'transition-colors duration-300 ease-in-out',
            'group-hover:bg-text-inverse'
          )}
        >
          <ArrowUpRight
            size={16}
            className="text-text-inverse transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:text-text-primary"
          />
        </span>
      </div>
    </a>
  )
}
