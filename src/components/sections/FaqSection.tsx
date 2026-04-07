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
  a: string
}

interface SectionFaqProps {
  items: FaqItem[]
  title?: string
  compact?: boolean
  className?: string
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
              text: faq.a,
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
            <AccordionContent className="text-secondary">{faq.a}</AccordionContent>
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
