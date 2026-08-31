import * as React from 'react'
import { Gauge, Globe, Headset, Layers, Rocket, ShieldCheck, Timer, Users } from 'lucide-react'
import { StatsSection } from '@/components/sections/StatsSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

// NOTE ON VALUES: every `value` is rendered through <CountUp>, which animates
// from 0 on scroll. A static screenshot lands mid-animation, so these use
// figures CountUp leaves verbatim (a second digit group defeats its parser) —
// the numbers on the card are then the numbers authored here.

/** Canonical three-column metrics block: eyebrow, title, icon + value + label + description. */
export const ThreeColumnMetrics = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <StatsSection
      eyebrow="BY THE NUMBERS"
      title="Performance You Can Measure"
      stats={[
        {
          icon: <Rocket strokeWidth={1.5} size={28} />,
          value: '8.5x',
          label: 'Faster Queries',
          description: 'Compared to standard MySQL deployments under mixed workloads.',
        },
        {
          icon: <ShieldCheck strokeWidth={1.5} size={28} />,
          value: '99.99%',
          label: 'Uptime SLA',
          description: 'Enterprise-grade availability with automated failover.',
        },
        {
          icon: <Headset strokeWidth={1.5} size={28} />,
          value: '24/7',
          label: 'Expert Support',
          description: 'Follow-the-sun coverage from the engineers who build TiDB.',
        },
      ]}
    />
  </SectionWrapper>
)

/** Four columns, no per-stat description — the compact proof bar under a hero. */
export const FourColumnCompact = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <StatsSection
      eyebrow="TIDB CLOUD AT SCALE"
      title="Production Numbers, Not Benchmarks"
      subtitle="Aggregated across TiDB Cloud clusters running agentic AI and OLTP workloads."
      stats={[
        {
          icon: <Timer strokeWidth={1.5} size={28} />,
          value: '0.4s',
          label: 'Median provisioning',
        },
        {
          icon: <Layers strokeWidth={1.5} size={28} />,
          value: '10.6M',
          label: 'Tenants supported',
        },
        {
          icon: <Gauge strokeWidth={1.5} size={28} />,
          value: '2.4 PB',
          label: 'Largest single cluster',
        },
        {
          icon: <Globe strokeWidth={1.5} size={28} />,
          value: '99.99%',
          label: 'Availability SLA',
        },
      ]}
      columns={4}
    />
  </SectionWrapper>
)

/** Two columns with no section header — drops straight into a longer narrative page. */
export const TwoColumnNoHeader = () => (
  <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'section' }}>
    <StatsSection
      stats={[
        {
          icon: <Gauge strokeWidth={1.5} size={28} />,
          value: '10.4x',
          label: 'Peak OPS Improvement',
          description:
            'Plaud consolidated MySQL and Amazon S3 into one operational database, removing retrieval latency from the critical path.',
        },
        {
          icon: <Users strokeWidth={1.5} size={28} />,
          value: '2.5M+',
          label: 'Users Served Worldwide',
          description:
            'The same cluster now serves customers across 170 countries with online schema changes.',
        },
      ]}
      columns={2}
    />
  </SectionWrapper>
)
