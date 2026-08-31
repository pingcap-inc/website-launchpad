import * as React from 'react'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

/** Mixed cells — booleans and short text values, with a closing CTA. */
export const MixedValuesWithCta = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <ComparisonTable
      eyebrow="TiDB vs Amazon Aurora"
      title="How TiDB Compares on Scale and Consistency"
      subtitle="Both are MySQL-compatible. They diverge on how far a single cluster scales and how writes are distributed."
      ourProduct="TiDB"
      competitor="Amazon Aurora"
      rows={[
        { feature: 'Horizontal write scaling', ours: true, theirs: false },
        { feature: 'Maximum cluster capacity', ours: 'Petabytes', theirs: '128 TiB' },
        { feature: 'Real-time analytics on live data', ours: true, theirs: false },
        { feature: 'Native vector search', ours: true, theirs: 'Via extension' },
        { feature: 'Deployment', ours: 'Cloud or self-managed', theirs: 'AWS only' },
        { feature: 'Open source core', ours: true, theirs: false },
      ]}
      cta={{ text: 'Compare in Detail', href: '/tidb-vs-aurora/' }}
    />
  </SectionWrapper>
)

/** Boolean-only capability matrix — the densest, checkmark-driven form. */
export const BooleanCapabilityMatrix = () => (
  <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'section' }}>
    <ComparisonTable
      title="Capabilities at a Glance"
      ourProduct="TiDB"
      competitor="Sharded MySQL"
      rows={[
        { feature: 'Distributed ACID transactions', ours: true, theirs: false },
        { feature: 'Online schema changes', ours: true, theirs: false },
        { feature: 'Automatic rebalancing', ours: true, theirs: false },
        { feature: 'Cross-shard joins', ours: true, theirs: false },
        { feature: 'Point-in-time recovery', ours: true, theirs: true },
      ]}
    />
  </SectionWrapper>
)

/** Text-valued rows only — for quantitative, spec-sheet style comparisons. */
export const TextValueSpecSheet = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <ComparisonTable
      eyebrow="Sizing"
      title="What Each Tier Gives You"
      ourProduct="TiDB Cloud Dedicated"
      competitor="TiDB Cloud Serverless"
      rows={[
        { feature: 'Storage ceiling', ours: 'Unlimited', theirs: '100 GiB free tier' },
        { feature: 'Scaling model', ours: 'Provisioned nodes', theirs: 'Auto-scaling' },
        { feature: 'Availability SLA', ours: '99.99%', theirs: '99.9%' },
        {
          feature: 'Network isolation',
          ours: 'VPC peering, private endpoint',
          theirs: 'Public endpoint',
        },
        { feature: 'Billing', ours: 'Hourly per node', theirs: 'Per request unit' },
      ]}
      cta={{ text: 'See Pricing', href: '/pricing/' }}
    />
  </SectionWrapper>
)
