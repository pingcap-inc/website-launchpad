import * as React from 'react'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DIFY_LOGO = {
  image: { url: 'https://static.pingcap.com/images/712552a8-dify.png' },
  alt: 'Dify',
  size: 47,
}

const MANUS_LOGO = {
  image: { url: 'https://static.pingcap.com/images/f003549b-manus.png' },
  alt: 'Manus',
}

const RENGAGE_LOGO = {
  image: { url: 'https://static.pingcap.com/images/86f45063-rengage.png' },
  alt: 'ReEngage',
}

/** Canonical usage: headline on the left, an auto-rotating stack of linked quote cards on the right. */
export const RotatingQuotes = () => (
  <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'section' }}>
    <TestimonialsSection
      eyebrow="Social Proof"
      title="Proven in Real-World AI Deployments"
      testimonials={[
        {
          quote: 'TiDB lets us run AI features on live data without rebuilding our stack.',
          author: 'Enterprise AI Team · Dify',
          href: 'https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/',
          cta: 'Read the story',
          logo: DIFY_LOGO,
        },
        {
          quote:
            'TiDB’s elastic architecture let us migrate in two weeks and absorb viral growth without re-sharding.',
          author: 'Engineering Leader · Manus',
          href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
          cta: 'Read the story',
          logo: MANUS_LOGO,
        },
        {
          quote:
            'A unified architecture gives our agents complete, real-time user context for autonomous decisions.',
          author: 'Head of Engineering · ReEngage',
          href: 'https://www.pingcap.com/case-study/rengage-autonomous-marketing-tidb/',
          cta: 'Read the story',
          logo: RENGAGE_LOGO,
        },
      ]}
    />
  </SectionWrapper>
)

/** A single quote — the carousel machinery stands down and one static card is shown. */
export const SingleQuote = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <TestimonialsSection
      eyebrow="Customer Story"
      title="One Database Behind a Viral Launch"
      testimonials={[
        {
          quote:
            'We migrated to TiDB Cloud in two weeks and it now stores the context behind every agent run.',
          author: 'Engineering Leader · Manus',
          href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
          cta: 'Read the story',
          logo: MANUS_LOGO,
        },
      ]}
    />
  </SectionWrapper>
)

/** No logos and no per-card CTA — the plain-text treatment for quote-only pages. */
export const QuotesWithoutLogos = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <TestimonialsSection
      title="What Platform Teams Tell Us"
      testimonials={[
        {
          quote:
            'We replaced a patchwork of caches with a single HTAP store and cut p99 read latency by 38%.',
          author: 'Data Platform Lead · Fintech',
        },
        {
          quote:
            'Scaling used to mean a re-sharding project. Now it is a slider and a maintenance-free afternoon.',
          author: 'Director of Infrastructure · Marketplace',
        },
        {
          quote:
            'MySQL compatibility meant our ORM, drivers, and test suite came across untouched.',
          author: 'Staff Engineer · Dev Tools',
        },
      ]}
    />
  </SectionWrapper>
)
