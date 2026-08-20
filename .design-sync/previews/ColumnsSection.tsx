import * as React from 'react'
import { ColumnsSection } from '@/components/sections/ColumnsSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const ARCHITECTURE_IMAGE = {
  image: { url: 'https://static.pingcap.com/images/e30c09ce-tidb-vs-mysql.svg' },
  alt: 'TiDB compute and storage layers compared with a sharded MySQL topology',
  width: 591,
  height: 450,
}

const WIDE_DIAGRAM = {
  image: { url: 'https://static.pingcap.com/files/2026/01/29013437/Hybrid-search-flow.jpg' },
  alt: 'Hybrid search flow combining vector and full-text retrieval inside TiDB',
  width: 680,
  height: 397,
}

/** Split layout — copy in the left six columns, media in the right six. */
export const SplitTextAndMedia = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <ColumnsSection
      layout="split"
      eyebrow="Architecture"
      title="Stop Sharding. Start Scaling."
      subtitle="TiDB separates compute from storage, so you add capacity by adding nodes — not by rewriting your data access layer or maintaining a shard map."
      mediaType="image"
      image={ARCHITECTURE_IMAGE}
    />
  </SectionWrapper>
)

/** Single column, full-width title — header spans the container, media sits below. */
export const SingleColumnFullWidthTitle = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <ColumnsSection
      layout="single"
      titleFullWidth
      eyebrow="Vector Search"
      title="Hybrid Retrieval, One Database"
      subtitle="Vector similarity and full-text search run against the rows your application already writes."
      mediaType="image"
      image={WIDE_DIAGRAM}
    />
  </SectionWrapper>
)

/** Single column with a constrained header — titleFullWidth off caps the copy width. */
export const SingleColumnConstrainedTitle = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <ColumnsSection
      layout="single"
      titleFullWidth={false}
      eyebrow="Migration"
      title="MySQL Compatible, Down to the Wire Protocol"
      subtitle="Keep your drivers, ORMs, and SQL. For most teams, moving to TiDB is a connection-string change plus a compatibility review — not an application rewrite."
    />
  </SectionWrapper>
)
