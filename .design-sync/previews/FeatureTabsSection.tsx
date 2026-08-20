import * as React from 'react'
import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const GRAPHIC = (n: number, alt: string) => ({
  image: { url: `https://static.pingcap.com/launchpad/images/patterns/graphic-${n}.svg` },
  alt,
  width: 910,
  height: 480,
})

/**
 * Three auto-switching tabs. The first two use the built-in
 * description + bullets + CTA layout; the third supplies `content` to take
 * over the left column entirely.
 */
export const AutoSwitchingTabs = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'md' }}>
    <FeatureTabsSection
      eyebrow="Feature Tabs"
      title="Deep Dives with Auto-Switching Tabs"
      tabs={[
        {
          id: 'scale',
          label: 'Scale',
          description:
            'Keep your existing MySQL-compatible workflows while scaling from gigabytes to petabytes.',
          bullets: ['Horizontal scaling', 'Strong consistency', 'HTAP-ready'],
          primaryCta: { text: 'Learn More', href: '/developers/' },
          image: GRAPHIC(1, 'Scaling illustration'),
        },
        {
          id: 'speed',
          label: 'Speed',
          description: 'Serve transactional and analytical workloads in a single system.',
          bullets: ['Real-time insights', 'Elastic compute', 'Optimized storage'],
          secondaryCta: { text: 'See Docs', href: '/developers/' },
          image: GRAPHIC(2, 'Performance illustration'),
        },
        {
          id: 'operations',
          label: 'Operations',
          content: (
            <div className="space-y-5">
              <p className="text-body-sm uppercase tracking-[0.18em] text-carbon-500">
                Custom Content
              </p>
              <h3 className="text-h3-lg text-text-inverse">Operate with Confidence</h3>
              <p className="text-body-md text-carbon-300 leading-relaxed">
                Bring your own layout, inline components, or richer narratives per tab.
              </p>
              <div className="grid grid-cols-2 gap-3 text-body-sm text-carbon-300">
                {[
                  'Automated scaling',
                  'Built-in backups',
                  'Observable by default',
                  'SLO-aware',
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-carbon-800 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ),
          image: GRAPHIC(3, 'Operations illustration'),
        },
      ]}
      autoSwitch={true}
      autoSwitchInterval={6000}
    />
  </SectionWrapper>
)

/**
 * Two tabs with auto-switching disabled — the underline sits full-width
 * instead of animating, and the reader drives the comparison manually.
 */
export const ManualTwoTabs = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureTabsSection
      eyebrow="Deployment"
      title="Run TiDB Your Way"
      tabs={[
        {
          id: 'cloud',
          label: 'TiDB Cloud',
          description:
            'A fully managed service that provisions, patches, and scales the cluster for you.',
          bullets: [
            'Serverless and dedicated tiers',
            '99.99% availability SLA',
            'Point-in-time recovery',
          ],
          primaryCta: { text: 'Start Free', href: '/tidb-cloud/' },
          secondaryCta: { text: 'Compare Tiers', href: '/pricing/' },
          image: GRAPHIC(4, 'TiDB Cloud architecture'),
        },
        {
          id: 'self-managed',
          label: 'Self-Managed',
          description:
            'Deploy the same open-source engine in your own VPC or data center with TiUP.',
          bullets: ['Apache 2.0 licensed', 'Kubernetes operator', 'Bring your own observability'],
          secondaryCta: { text: 'Read the Install Guide', href: '/downloads/' },
          image: GRAPHIC(1, 'Self-managed deployment topology'),
        },
      ]}
      autoSwitch={false}
    />
  </SectionWrapper>
)
