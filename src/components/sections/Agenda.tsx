import { SectionHeader } from '@/components/ui/SectionHeader'

type AgendaItem = { time?: string; title: string; description?: string }

export interface AgendaProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: AgendaItem[]
  className?: string
}

export function Agenda({ eyebrow, title, subtitle, items, className }: AgendaProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-container px-container">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
        <div className="border-t border-border-primary divide-y divide-border-primary">
          {items.map((item, i) => (
            <div key={i} className="flex gap-8 py-5">
              <div className="shrink-0 w-28 font-mono text-body-sm text-text-secondary pt-0.5">
                {item.time ?? String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <p className="text-body-md font-bold text-text-inverse">{item.title}</p>
                {item.description && (
                  <p className="text-body-sm text-text-secondary mt-1">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
