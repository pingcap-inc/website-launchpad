import { SectionHeader } from '@/components/ui/SectionHeader'
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
  className?: string
}

export function FaqSection({ items, title = 'FAQ', className }: SectionFaqProps) {
  return (
    <section
      className={['py-section-sm lg:py-section bg-gradient-dark-bottom', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 max-w-3xl">
        <SectionHeader title={title} align="left" h2Size="sm" />
        <Accordion type="single" defaultValue="faq-0" collapsible className="space-y-3">
          {items.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${index}`}
              className="border-b border-carbon-800 px-4 md:px-6"
            >
              <AccordionTrigger className="text-text-inverse hover:text-text-inverse">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
