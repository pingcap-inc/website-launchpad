---
category: UI
---

## Component spec

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// FAQ section pattern — always place before CtaSection
;<section className="py-section-sm lg:py-section bg-bg-primary">
  <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
    <SectionHeader label="FAQ" title="Frequently Asked Questions" className="mb-12" />
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger>What is TiDB?</AccordionTrigger>
          <AccordionContent>
            TiDB is a distributed SQL database that supports HTAP workloads...
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>How does TiDB scale?</AccordionTrigger>
          <AccordionContent>
            TiDB uses a shared-nothing architecture with separate storage and compute layers...
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</section>
```

**Props:** `type="single"` (one open at a time) · `collapsible` (allow closing all)
**Animation:** Accordion open/close uses CSS height animation via `animate-accordion-down` / `animate-accordion-up` keyframes (added to `tailwind.config.ts`).

---
