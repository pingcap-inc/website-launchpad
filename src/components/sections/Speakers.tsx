import { SectionHeader } from '@/components/ui/SectionHeader'

export interface SpeakerItem {
  name: string
  title: string
  company?: string
  bio?: string
  image?: { image: { url: string }; alt?: string }
}

export interface SpeakersProps {
  eyebrow?: string
  title: string
  items: SpeakerItem[]
  className?: string
}

const BORDER_COLORS = [
  'border-l-brand-teal-medium',
  'border-l-brand-red-primary',
  'border-l-brand-violet-medium',
  'border-l-brand-blue-medium',
]

export function Speakers({ eyebrow, title, items, className }: SpeakersProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-container px-container">
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((s, i) => {
            const borderColor = BORDER_COLORS[i % BORDER_COLORS.length]
            return (
              <div
                key={i}
                className={`flex gap-5 border border-border-primary ${borderColor} border-l-4 p-5 hover:-translate-y-1 transition-transform duration-200 ease-in-out`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {s.image?.image?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.image.image.url}
                      alt={s.image.alt ?? s.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-16 h-16 rounded-full bg-bg-surface flex items-center justify-center text-text-secondary text-xl font-bold">
                      {s.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                {/* Info */}
                <div className="min-w-0">
                  <p className="text-body-md font-bold text-text-inverse">{s.name}</p>
                  <p className="text-body-sm text-text-secondary">
                    {s.title}
                    {s.company ? `, ${s.company}` : ''}
                  </p>
                  {s.bio && (
                    <p className="text-body-sm text-text-secondary mt-2 leading-relaxed">{s.bio}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
