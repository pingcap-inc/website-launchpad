import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface IconGridItem {
  title: string
  description: string
  icon: {
    src: string
    alt: string
    width?: number
    height?: number
  }
}

interface IconGridProps {
  eyebrow?: string
  title?: string
  align?: 'left' | 'center'
  h2Size?: 'sm' | 'md' | 'lg'
  items: IconGridItem[]
  withSectionPadding?: boolean
  className?: string
}

export function IconGridSection({
  eyebrow,
  title,
  align = 'left',
  h2Size = 'sm',
  items,
  withSectionPadding = true,
  className,
}: IconGridProps) {
  return (
    <section className={cn(withSectionPadding && 'py-section-sm lg:py-section-md', className)}>
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
        {title && <SectionHeader align={align} h2Size={h2Size} title={title} eyebrow={eyebrow} />}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="space-y-4">
              <div className="h-12 w-12">
                <Image
                  src={item.icon.src}
                  alt={item.icon.alt}
                  width={item.icon.width ?? 48}
                  height={item.icon.height ?? 48}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-h3-lg text-text-inverse">{item.title}</h3>
              <p className="text-body-md text-carbon-300 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
