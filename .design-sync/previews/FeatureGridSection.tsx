import * as React from 'react'
import { Compass, Database, Layers, Rocket, ShieldCheck, Zap } from 'lucide-react'
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const FEATURES = [
  {
    title: 'Elastic Scale',
    description: 'Add capacity online — no sharding logic, no downtime windows.',
    icon: <Layers strokeWidth={1.5} />,
  },
  {
    title: 'MySQL Compatible',
    description: 'Keep your drivers, ORMs, and SQL. Migration is a connection-string change.',
    icon: <Database strokeWidth={1.5} />,
  },
  {
    title: 'Real-Time HTAP',
    description: 'Serve transactions and analytics from one system, with no ETL pipeline.',
    icon: <Zap strokeWidth={1.5} />,
  },
  {
    title: 'Enterprise Security',
    description: 'Encryption at rest and in flight, IAM integration, and audit-ready logs.',
    icon: <ShieldCheck strokeWidth={1.5} />,
  },
]

/** Four-column grid — the densest layout, for feature round-ups. */
export const FourColumns = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureGridSection
      eyebrow="Why TiDB"
      title="One Database for Transactions and Analytics"
      subtitle="A flexible grid that scales from two to four columns."
      features={FEATURES}
      columns={4}
      itemLayout="horizontal"
    />
  </SectionWrapper>
)

/** Three columns with a view-more link — the common marketing configuration. */
export const ThreeColumnsWithViewMore = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <FeatureGridSection
      eyebrow="Platform"
      title="Built for Production From Day One"
      features={FEATURES.slice(0, 3)}
      columns={3}
      viewMore={{ text: 'See all capabilities', href: '/tidb-cloud/' }}
    />
  </SectionWrapper>
)

/** Vertical item layout — icon above the copy rather than beside it. */
export const VerticalItems = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureGridSection
      title="Everything Included"
      features={[
        {
          title: 'Automated Backups',
          description: 'Point-in-time recovery across regions.',
          icon: <Rocket strokeWidth={1.5} />,
        },
        {
          title: 'Global Deployment',
          description: 'Predictable latency wherever your users are.',
          icon: <Compass strokeWidth={1.5} />,
        },
      ]}
      columns={2}
      itemLayout="vertical"
    />
  </SectionWrapper>
)
