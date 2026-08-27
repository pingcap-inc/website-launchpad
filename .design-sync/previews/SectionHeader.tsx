import * as React from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'

/** Default: left-aligned, largest H2, eyebrow and subtitle present. */
export const LeftAlignedLarge = () => (
  <SectionHeader
    eyebrow="Why TiDB"
    title="One Database for Transactions and Analytics"
    subtitle="Serve operational writes and analytical reads from the same cluster, with no ETL pipeline in between."
  />
)

/** Centered, medium H2 — the standard heading for a full-width marketing section. */
export const CenteredMedium = () => (
  <SectionHeader
    eyebrow="Platform"
    title="Built for Production From Day One"
    subtitle="Automated failover, online schema changes, and point-in-time recovery ship in the box."
    h2Size="md"
    align="center"
  />
)

/** Small H2, title only — a compact sub-heading inside a longer page. */
export const SmallTitleOnly = () => <SectionHeader title="Who Uses TiDB" h2Size="sm" />

/** fullWidth removes the title clamp, letting a long headline use the whole container. */
export const FullWidthTitle = () => (
  <SectionHeader
    eyebrow="Migration"
    title="Move Off Sharded MySQL Without Rewriting Your Application"
    subtitle="TiDB speaks the MySQL wire protocol, so your drivers, ORMs, and existing SQL keep working through the cutover."
    h2Size="sm"
    fullWidth
  />
)
