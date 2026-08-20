import * as React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'What is TiDB?',
    a: 'TiDB is an open-source, MySQL-compatible distributed SQL database that handles transactional and analytical workloads in a single system — no sharding middleware, no separate data warehouse.',
  },
  {
    q: 'How does TiDB scale?',
    a: 'Storage and compute scale independently. Add TiKV nodes for capacity or TiDB nodes for throughput, online, with no downtime window and no application changes.',
  },
  {
    q: 'Is TiDB Cloud Serverless free to start?',
    a: 'Yes. Every cluster includes a free tier with row-based storage and request units, and you only pay once you exceed it.',
  },
]

/**
 * The shipped FAQ pattern: `type="single"` + `collapsible`, with the first
 * question opened by `defaultValue` — exactly what FaqSection renders.
 * The `section-root` wrapper supplies the `--text-secondary` custom property
 * that SectionWrapper provides in real pages.
 */
export const FaqDefaultOpen = () => (
  <div className="section-root">
    <Accordion type="single" defaultValue="faq-0" collapsible>
      {FAQS.map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="text-text-inverse hover:text-current">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-secondary">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)

/** `type="multiple"` — several answers stay open at once. */
export const MultipleOpen = () => (
  <div className="section-root">
    <Accordion type="multiple" defaultValue={['faq-0', 'faq-1']}>
      {FAQS.slice(0, 2).map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="text-text-inverse hover:text-current">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-secondary">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)

/** The resting state — every row closed, showing the Plus affordance and dividers. */
export const AllCollapsed = () => (
  <div className="section-root">
    <Accordion type="single" collapsible>
      {[
        ...FAQS,
        {
          q: 'Can I migrate from Amazon Aurora?',
          a: 'Yes — TiDB speaks the MySQL protocol, so migration is typically a connection-string change plus a data load.',
        },
      ].map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="text-text-inverse hover:text-current">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-secondary">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)
