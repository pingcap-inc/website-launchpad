import { cn } from '@/lib/utils'

export interface DeveloperResourceCardItem {
  title: string
  href: string
  tag?: string
  tagClassName?: string
  tagClass?: string
}

interface DeveloperResourceCardProps {
  item: DeveloperResourceCardItem
  tagText?: string
  tagClassName?: string
  titleClassName?: string
  cardClassName?: string
  openInNewTab?: boolean
}

export function DeveloperResourceCard({
  item,
  tagText = 'Hands-on Lab',
  tagClassName = 'bg-brand-blue-medium',
  titleClassName = 'text-h3-lg text-text-inverse leading-snug flex-1',
  cardClassName = 'group flex flex-col gap-4 p-6 min-h-[148px] bg-bg-surface border border-border-primary hover:-translate-y-2 transition-transform duration-200 ease-in-out',
  openInNewTab = false,
}: DeveloperResourceCardProps) {
  return (
    <a
      href={item.href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={cardClassName}
    >
      <span
        className={cn(
          'font-mono text-label text-white self-start px-2 py-0.5',
          item.tagClassName ?? item.tagClass ?? tagClassName
        )}
      >
        {item.tag ?? tagText}
      </span>
      <h3 className={titleClassName}>{item.title}</h3>
    </a>
  )
}
