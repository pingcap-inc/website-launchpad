import * as React from 'react'
import { FaqSection } from '@/components/sections/FaqSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

/** Canonical usage: untitled accordion on the light `inverse` background, first item open. */
export const LightBackground = () => (
  <SectionWrapper style={{ background: 'inverse', spacing: 'section' }}>
    <FaqSection
      items={[
        {
          q: 'Can we mix sections from different pages?',
          a: 'Yes. Each section is designed to stand alone or be composed into new layouts.',
        },
        {
          q: 'How do we customize colors or spacing?',
          a: 'Use the existing theme tokens and utility classes already used across marketing pages.',
        },
        {
          q: 'Is this only for marketing pages?',
          a: 'No. The sections work for docs landing pages, campaigns, or internal demos too.',
        },
      ]}
    />
  </SectionWrapper>
)

/** Titled FAQ on the dark background, with an inline link inside an answer. */
export const DarkWithTitle = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FaqSection
      title="TiDB Frequently Asked Questions"
      items={[
        {
          q: 'What is TiDB?',
          a: 'TiDB is an open-source, distributed SQL database built by [PingCAP](https://www.pingcap.com/about-us/). It supports Hybrid Transactional and Analytical Processing (HTAP) workloads, speaks the MySQL protocol, and scales horizontally across commodity hardware.',
        },
        {
          q: 'Is TiDB compatible with MySQL?',
          a: 'Yes. TiDB implements the MySQL wire protocol and is compatible with MySQL syntax, drivers, and ORM frameworks, so most applications connect with zero code changes.',
        },
        {
          q: 'How does TiDB handle analytical queries?',
          a: 'TiFlash maintains real-time columnar replicas of selected tables. The optimizer routes each query to TiKV, TiFlash, or both, so analytics run without slowing transactional writes.',
        },
        {
          q: 'Can we run TiDB without managing infrastructure?',
          a: 'TiDB Cloud is the fully managed option and handles provisioning, patching, backups, and monitoring. Self-managed deployments on Kubernetes are supported through TiDB Operator.',
        },
      ]}
    />
  </SectionWrapper>
)

/** `compact` tightens the vertical rhythm — for FAQs nested inside a denser page. */
export const Compact = () => (
  <SectionWrapper style={{ background: 'inverse', spacing: 'section' }}>
    <FaqSection
      compact
      title="Startup Program Questions"
      items={[
        {
          q: 'Who qualifies for TiDB Cloud startup credits?',
          a: 'Seed to Series A companies that have not previously received TiDB Cloud credits are eligible to apply.',
        },
        {
          q: 'How long do the credits last?',
          a: 'Credits are valid for 12 months from the date they are applied to your organization.',
        },
        {
          q: 'What happens when the credits run out?',
          a: 'Your clusters keep running and usage bills at standard rates. Nothing is paused or deleted.',
        },
      ]}
    />
  </SectionWrapper>
)
