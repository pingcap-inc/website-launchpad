import * as React from 'react'
import { FeatureMediaSection } from '@/components/sections/FeatureMediaSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const CONTEXT_AWARE = 'https://static.pingcap.com/images/62ca27ae-context-aware.svg'
const DECOUPLED = 'https://static.pingcap.com/images/88a9e52f-decoupled-compute.svg'
const MODULAR = 'https://static.pingcap.com/images/8557dd65-modular-architecture.svg'

/**
 * Alternating rows under a section header — the first image sits on the right,
 * the next flips to the left, and so on.
 */
export const AlternatingRows = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureMediaSection
      eyebrow="Architecture"
      title="Built for the Cloud Era"
      subtitle="A modern architecture that separates compute from storage."
      animate={false}
      items={[
        {
          title: 'Decoupled Compute & Cloud-Native Object Storage',
          description:
            'Powered by the new TiDB X architecture, storage is backed by cloud-native object stores for durability and elasticity, while compute scales independently to meet real-time demand.',
          image: {
            image: { url: DECOUPLED },
            alt: 'Decoupled compute and storage illustration',
            width: 400,
            height: 400,
          },
        },
        {
          title: 'Context-Aware, Usage-Based Scaling',
          description:
            'Autoscaling based on real-time workload signals and RU/s limits — no more overprovisioning or manual tuning.',
          image: {
            image: { url: CONTEXT_AWARE },
            alt: 'Usage-based scaling illustration',
            width: 400,
            height: 400,
          },
        },
      ]}
    />
  </SectionWrapper>
)

/**
 * `startPosition="left"` flips the alternation so the first media block leads
 * on the left. `spacing="md"` tightens the gap between rows.
 */
export const ImageLeftTightSpacing = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <FeatureMediaSection
      eyebrow="Platform"
      title="One Engine, Two Workloads"
      startPosition="left"
      spacing="md"
      animate={false}
      items={[
        {
          title: 'Unified HTAP Engine',
          description:
            'Run transactional and analytical workloads on a single database without ETL pipelines or data movement.',
          image: {
            image: { url: MODULAR },
            alt: 'Unified HTAP engine illustration',
            width: 400,
            height: 400,
          },
        },
        {
          title: 'Elastic by Default',
          description:
            'Add or remove capacity online. Rebalancing happens in the background while queries keep serving.',
          image: {
            image: { url: DECOUPLED },
            alt: 'Elastic scaling illustration',
            width: 400,
            height: 400,
          },
        },
      ]}
    />
  </SectionWrapper>
)

/**
 * Headerless single row with an inline markdown link in the copy —
 * `[label](url)` is rendered as a real anchor.
 */
export const HeaderlessSingleRow = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureMediaSection
      animate={false}
      items={[
        {
          title: 'Vector Search Where Your Data Already Lives',
          description:
            'Store embeddings next to the rows they describe and join them in one SQL statement — no second datastore to keep in sync. See the [vector search guide](/ai/) for schema patterns.',
          image: {
            image: { url: CONTEXT_AWARE },
            alt: 'Vector search illustration',
            width: 400,
            height: 400,
          },
        },
      ]}
    />
  </SectionWrapper>
)
