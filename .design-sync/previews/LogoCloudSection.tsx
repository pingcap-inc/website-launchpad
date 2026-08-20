import * as React from 'react'
import { LogoCloudSection } from '@/components/sections/LogoCloudSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const CDN = 'https://static.pingcap.com/launchpad/images/logos'

const logo = (name: string, file: string, width = 94) => ({
  name,
  image: { url: `${CDN}/${file}-logo-white.svg` },
  width,
  height: 24,
})

const CUSTOMERS = [
  logo('Manus', 'manuse', 96),
  logo('Plaid', 'plaid', 78),
  logo('Dify', 'dify', 84),
  logo('Pinterest', 'pinterest'),
  logo('Square', 'square'),
  logo('Flipkart', 'flipkart'),
  logo('Bolt', 'bolt', 64),
  logo('Catalyst', 'catalyst', 90),
]

/**
 * Auto-scrolling marquee — the default whenever more than four logos are
 * passed. The track is duplicated and translated, so it reads as a continuous
 * band that runs off both edges of the content column.
 */
export const ScrollingMarquee = () => (
  <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'section' }}>
    <LogoCloudSection
      title="Trusted by"
      variant="minimal"
      scrollSpeedSeconds={120}
      logos={[
        logo('Dify', 'dify', 84),
        logo('Manus', 'manuse', 96),
        logo('Rengage', 'rengage'),
        logo('Catalyst', 'catalyst', 90),
        logo('Toprism', 'toprism'),
        logo('Plaid', 'plaid', 78),
        logo('Crowdsnap', 'crowdsnap'),
        logo('Omniconvert', 'onmiconvert'),
      ]}
    />
  </SectionWrapper>
)

/**
 * Static, left-aligned wall — `autoScroll={false}` wraps the logos into rows
 * instead of a marquee, which is how the "Who uses TiDB" band is built.
 */
export const StaticLeftAligned = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <LogoCloudSection
      title="Who Uses TiDB"
      subtitle="From financial infrastructure to AI agent platforms, TiDB powers production workloads across industries."
      align="left"
      variant="minimal"
      autoScroll={false}
      logoClassName="h-6"
      logos={CUSTOMERS}
    />
  </SectionWrapper>
)

/**
 * Default variant with a full eyebrow/title/subtitle header and few enough
 * logos that the marquee never engages — logos render taller than `minimal`.
 */
export const DefaultVariantCentered = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <LogoCloudSection
      eyebrow="Cloud Partners"
      title="Deploy Anywhere You Already Run"
      subtitle="TiDB Cloud runs on the hyperscaler you have already standardized on."
      variant="default"
      logos={[
        { name: 'Amazon Web Services', image: { url: `${CDN}/aws.svg` }, width: 110, height: 40 },
        { name: 'Google Cloud', image: { url: `${CDN}/google_cloud.svg` }, width: 150, height: 40 },
        {
          name: 'Microsoft Azure',
          image: { url: `${CDN}/Microsoft_Azure.svg` },
          width: 130,
          height: 40,
        },
      ]}
    />
  </SectionWrapper>
)
