import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface FaqItem {
  q: string
  a: string | React.ReactNode
}

interface SectionFaqProps {
  items: FaqItem[]
  title?: string
  compact?: boolean
  className?: string
}

function renderFaqAnswerHtml(text: string) {
  const escapeHtml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const sanitizeUrl = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed
    try {
      const parsed = new URL(trimmed)
      const protocol = parsed.protocol.toLowerCase()
      if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:') {
        return parsed.toString()
      }
    } catch {
      return null
    }
    return null
  }

  const escaped = escapeHtml(text)
  const withLinks = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    const safe = sanitizeUrl(String(url))
    if (!safe) return label
    return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`
  })

  return withLinks.replace(/\n/g, '<br />')
}

function renderFaqAnswer(answer: FaqItem['a']) {
  if (typeof answer !== 'string') return answer

  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderFaqAnswerHtml(answer) }}
    />
  )
}

export function FaqSection({ items, title, compact = false, className }: SectionFaqProps) {
  const faqSchema =
    items.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: typeof faq.a === 'string' ? faq.a : '',
            },
          })),
        }
      : null

  return (
    <div className={cn(compact ? 'space-y-6' : 'space-y-16', className)}>
      {title && <SectionHeader title={title} align="left" h2Size="sm" />}
      <Accordion type="single" defaultValue="faq-0" collapsible>
        {items.map((faq, index) => (
          <AccordionItem key={faq.q} value={`faq-${index}`}>
            <AccordionTrigger className="text-text-inverse group-data-[tone=dark]/section:text-text-primary hover:text-current">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-secondary [&_a]:text-brand-blue-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-blue-dark">
              {renderFaqAnswer(faq.a)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {faqSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </div>
  )
}
