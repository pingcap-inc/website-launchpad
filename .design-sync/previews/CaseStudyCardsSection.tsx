import * as React from 'react'
import { CaseStudyCardsSection } from '@/components/sections/CaseStudyCardsSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

// NOTE ON COPY LENGTH: the capture viewport is 1280x760 and these cards are
// tall (badge + logo + heading + body + stat tiles + CTA). Headings are kept to
// two lines and bodies to two, so the whole card — CTA included — lands inside
// the frame.

const KIMI_LOGO = {
  image: { url: 'https://static.pingcap.com/images/68b65a2a-20260525-230213.png' },
  alt: 'Kimi',
  width: 1511,
  height: 512,
}

const MANUS_LOGO = {
  image: { url: 'https://static.pingcap.com/images/0fc78057-manus.svg' },
  alt: 'Manus',
  width: 165,
  height: 48,
}

const PLAUD_LOGO = {
  image: { url: 'https://static.pingcap.com/images/a9c1110c-logo-plaud.png' },
  alt: 'Plaud',
  width: 362,
  height: 100,
}

/** Canonical usage: three linked cards, each with a badge, a customer logo, and two proof stats. */
export const ThreeCards = () => (
  <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'md' }}>
    <CaseStudyCardsSection
      eyebrow="Customer Results"
      title="Proven in Production"
      items={[
        {
          badge: 'Provisioning at Scale',
          logo: KIMI_LOGO,
          title: 'A New Database Per Site, in Under a Second',
          description:
            'Kimi’s agent hosts full-stack apps for millions of users, provisioning an isolated database per site.',
          stats: [
            { value: '<1s', label: 'Provisioning per site' },
            { value: '10M+', label: 'Tenants supported' },
          ],
          href: 'https://www.pingcap.com/case-study/kimi-2-6-agent-hosting-platform-tidb-cloud/',
          cta: 'Read the story',
        },
        {
          badge: 'Tenant Isolation at Scale',
          logo: MANUS_LOGO,
          title: 'From Viral Launch to 1M+ Tenants',
          description:
            'Migrated in two weeks. TiDB now holds the context behind Manus’s agent swarms and app generation.',
          stats: [
            { value: '2 wks', label: 'Migration time' },
            { value: '1M+', label: 'DB tenants' },
          ],
          href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
          cta: 'Read the story',
        },
        {
          badge: 'Data Consolidation',
          logo: PLAUD_LOGO,
          title: 'Two Data Stores Down to One',
          description:
            'Plaud left MySQL plus Amazon S3 behind, cutting retrieval latency for 2M+ users in 170 countries.',
          stats: [
            { value: '10x', label: 'Peak OPS improvement' },
            { value: '13', label: 'Clusters in production' },
          ],
          href: 'https://www.pingcap.com/case-study/how-plaud-eliminated-s3-latency-limitless-scale/',
          cta: 'Read the story',
        },
      ]}
    />
  </SectionWrapper>
)

/** Badges but no logos, and no link target — the card renders as a static article. */
export const NoLogos = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <CaseStudyCardsSection
      title="Migration Outcomes Across Industries"
      items={[
        {
          badge: 'Financial Services',
          title: 'Real-Time Risk Scoring on Live Transaction Data',
          description:
            'A payments platform retired its nightly ETL job and now scores risk against the same rows the application writes.',
          stats: [
            { value: '38%', label: 'Lower p99 read latency' },
            { value: '0', label: 'ETL pipelines maintained' },
          ],
        },
        {
          badge: 'E-Commerce',
          title: 'Peak-Season Traffic Without a Re-Sharding Project',
          description:
            'Elastic compute absorbed a 12x order spike, then scaled back down once the promotion window closed.',
          stats: [
            { value: '12x', label: 'Order-volume spike absorbed' },
            { value: '99.99%', label: 'Availability during peak' },
          ],
        },
        {
          badge: 'Gaming',
          title: 'One Operational Store for Player State and Analytics',
          description:
            'Leaderboards, inventory, and session telemetry share a single MySQL-compatible cluster across three regions.',
          stats: [
            { value: '3', label: 'Regions served from one cluster' },
            { value: '18 ms', label: 'Median write latency' },
          ],
        },
      ]}
    />
  </SectionWrapper>
)

/** Two linked cards with logos and no badge — the shorter proof block for a solution page. */
export const TwoCards = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'md' }}>
    <CaseStudyCardsSection
      eyebrow="Agentic AI"
      title="Context Storage for Agents"
      items={[
        {
          logo: MANUS_LOGO,
          title: 'From Viral Launch to 1M+ Database Tenants',
          description:
            'TiDB Cloud became the durable memory layer behind Manus’s agent swarms, provisioned per tenant and scaled on demand.',
          stats: [
            { value: '2 wks', label: 'Migration time' },
            { value: '1M+', label: 'DB tenants' },
          ],
          href: 'https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/',
          cta: 'Read the story',
        },
        {
          logo: PLAUD_LOGO,
          title: 'From Two Data Stores to One Unified Database',
          description:
            'Consolidating MySQL and Amazon S3 removed retrieval latency from the critical path for 2M+ users.',
          stats: [
            { value: '10x', label: 'Peak OPS improvement' },
            { value: '13', label: 'Clusters in production' },
          ],
          href: 'https://www.pingcap.com/case-study/how-plaud-eliminated-s3-latency-limitless-scale/',
          cta: 'Read the story',
        },
      ]}
    />
  </SectionWrapper>
)
