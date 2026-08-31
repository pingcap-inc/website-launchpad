import * as React from 'react'
import { CtaSection } from '@/components/sections/CtaSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const CUBE = { width: 278, height: 256 }

/** Canonical usage: violet band, illustration on the left, two CTAs. */
export const VioletWithIllustration = () => (
  <SectionWrapper style={{ background: 'brand-violet', spacing: 'md' }}>
    <CtaSection
      title="Start Building With TiDB"
      subtitle="Deploy on a trusted data platform in minutes, or talk to our team about designing for your workload."
      primaryCta={{ text: 'Get Started Free', href: 'https://tidbcloud.com/free-trial/' }}
      secondaryCta={{ text: 'Talk to an Expert', href: '/contact-us/' }}
      image={{
        image: { url: 'https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg' },
        alt: 'TiDB CTA cube',
        ...CUBE,
      }}
    />
  </SectionWrapper>
)

/** Red band — the same layout carrying the primary brand color. */
export const RedWithIllustration = () => (
  <SectionWrapper style={{ background: 'brand-red', spacing: 'md' }}>
    <CtaSection
      title="Ready to Put These Concepts Into Practice?"
      subtitle="TiDB Cloud brings HTAP, elastic scaling, and MySQL compatibility to a fully managed service."
      primaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
      secondaryCta={{ text: 'Read the Docs', href: 'https://docs.pingcap.com/' }}
      image={{
        image: {
          url: 'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-red-mini.svg',
        },
        alt: 'TiDB CTA cube',
        ...CUBE,
      }}
    />
  </SectionWrapper>
)

/** Teal band with a single CTA — one unambiguous next step for campaign pages. */
export const TealPrimaryOnly = () => (
  <SectionWrapper style={{ background: 'brand-teal', spacing: 'md' }}>
    <CtaSection
      title="Ready to Claim Your Credits?"
      subtitle="Link your GitHub, check your contribution score, and get up to $2,000 in TiDB Cloud credits — in under 3 minutes."
      primaryCta={{ text: 'Claim Your Credits Now', href: '/open-source-heroes/' }}
      image={{
        image: {
          url: 'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-teal-mini.svg',
        },
        alt: 'TiDB CTA cube',
        ...CUBE,
      }}
    />
  </SectionWrapper>
)

/** No `image` — the copy and buttons center themselves across the full width. */
export const CenteredNoImage = () => (
  <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'md' }}>
    <CtaSection
      title="See TiDB Running on Your Workload"
      subtitle="Bring a schema and a query pattern. We will size a cluster and run it with you."
      primaryCta={{ text: 'Book a Demo', href: '/demo/' }}
      secondaryCta={{ text: 'Browse Case Studies', href: '/customers/' }}
    />
  </SectionWrapper>
)
