import * as React from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

const HERO_IMAGE = {
  image: { url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg' },
  alt: 'TiDB distributed architecture',
  width: 480,
  height: 400,
}

/** Default layout: copy on the left, product visual on the right. */
export const ImageRight = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
    <HeroSection
      layout="image-right"
      eyebrow="TiDB Cloud"
      headline="The Distributed SQL Database Built for AI Workloads"
      subheadline="MySQL-compatible, horizontally scalable, and HTAP-ready — so transactional and analytical workloads run on one system without ETL."
      primaryCta={{ text: 'Start Free', href: '/tidb-cloud/' }}
      secondaryCta={{ text: 'Read the Docs', href: '/developers/' }}
      heroImage={HERO_IMAGE}
    />
  </SectionWrapper>
)

/** Centered copy — used for campaign and announcement pages. */
export const Centered = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
    <HeroSection
      layout="centered"
      eyebrow="Now Generally Available"
      headline="Scale From Gigabytes to Petabytes Without Re-Architecting"
      subheadline="Elastic compute, cloud-native object storage, and automatic failover — with the MySQL syntax your team already knows."
      primaryCta={{ text: 'Start Free', href: '/tidb-cloud/' }}
      secondaryCta={{ text: 'Talk to Us', href: '/contact-us/' }}
    />
  </SectionWrapper>
)

/** Split layout — right column carries a form, quote, or custom node. */
export const Split = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
    <HeroSection
      layout="split"
      eyebrow="Startup Program"
      headline="Up to $2,000 in TiDB Cloud Credits"
      subheadline="Built for teams shipping AI-native products on a serverless database."
      rightSlot={
        <div className="rounded-2xl border border-border-primary bg-carbon p-8">
          <p className="text-h3-sm text-text-inverse">Apply in Under 5 Minutes</p>
          <p className="mt-3 text-body-md text-carbon-300">
            Tell us about your product and we&rsquo;ll confirm eligibility within two business days.
          </p>
          <div className="mt-6">
            <PrimaryButton href="/tidb-cloud-startup-program/">Apply Now</PrimaryButton>
          </div>
        </div>
      }
    />
  </SectionWrapper>
)
