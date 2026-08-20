import * as React from 'react'
import {
  Banknote,
  Bot,
  Compass,
  Cpu,
  Layers,
  Rocket,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react'
import { FeatureCardSection } from '@/components/sections/FeatureCardSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

/**
 * Four bordered cards with the brand color cycle — the canonical
 * "capabilities round-up" configuration.
 */
export const ColorBordersFourUp = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureCardSection
      eyebrow="Why TiDB"
      title="Bordered Cards with Color Accents"
      subtitle="Each card cycles through the brand palette when borderStyle is set to color."
      items={[
        {
          title: 'Secure by Default',
          description: 'Built-in encryption, IAM integration, and audit-ready logs.',
          icon: <ShieldCheck strokeWidth={1.5} size={28} />,
        },
        {
          title: 'Global Ready',
          description: 'Deploy across regions with predictable performance.',
          icon: <Compass strokeWidth={1.5} size={28} />,
        },
        {
          title: 'Developer Friendly',
          description: 'MySQL-compatible with a modern observability stack.',
          icon: <Layers strokeWidth={1.5} size={28} />,
        },
        {
          title: 'Reliable Operations',
          description: 'Automated backups and failure recovery at scale.',
          icon: <Cpu strokeWidth={1.5} size={28} />,
        },
      ]}
      columns={4}
      borderStyle="color"
    />
  </SectionWrapper>
)

/**
 * Two columns, neutral borders, each card linked — `href` + `ctaText` turn the
 * whole card into an anchor with the hover-float treatment.
 */
export const TwoColumnLinkedCards = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <FeatureCardSection
      title="Common Use Cases"
      subtitle="From financial infrastructure to AI agent platforms, TiDB powers production workloads where scale, consistency, and uptime are non-negotiable."
      items={[
        {
          title: 'Financial Systems of Record',
          description:
            'Strongly consistent transactions across regions, with the audit trail compliance teams expect.',
          icon: <Banknote strokeWidth={1.5} size={28} />,
          href: '/solutions/financial-services/',
          ctaText: 'Read the solution brief',
        },
        {
          title: 'AI Agent Context Stores',
          description:
            'Vector search and transactional state in one engine, so agent memory stays consistent as it grows.',
          icon: <Bot strokeWidth={1.5} size={28} />,
          href: '/ai-agent-context/',
          ctaText: 'See how it works',
        },
      ]}
      columns={2}
    />
  </SectionWrapper>
)

/** Three neutral cards, no eyebrow — the quieter default `gray` border style. */
export const ThreeColumnNeutral = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureCardSection
      title="Where Teams Put TiDB to Work"
      items={[
        {
          title: 'Order and Inventory',
          description:
            'Handle peak-season write bursts without sharding logic in the application layer.',
          icon: <ShoppingCart strokeWidth={1.5} size={28} />,
        },
        {
          title: 'Real-Time Reporting',
          description: 'Run analytical queries against live transactional data — no ETL window.',
          icon: <Rocket strokeWidth={1.5} size={28} />,
        },
        {
          title: 'Multi-Tenant SaaS',
          description: 'One elastic cluster per environment instead of a fleet of MySQL shards.',
          icon: <Layers strokeWidth={1.5} size={28} />,
        },
      ]}
      columns={3}
    />
  </SectionWrapper>
)
