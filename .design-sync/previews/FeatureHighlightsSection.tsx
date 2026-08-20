import * as React from 'react'
import { BookOpen, Compass, Layers, Rocket, Terminal, Users } from 'lucide-react'
import { FeatureHighlightsSection } from '@/components/sections/FeatureHighlightsSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

/**
 * Three color cards plus a view-more link — the canonical "pick a path"
 * configuration used on program and solution pages.
 */
export const ThreeColorCardsWithViewMore = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureHighlightsSection
      eyebrow="Color Cards"
      title="Highlight Key Initiatives"
      subtitle="Bold tiles with strong color cues and CTA focus."
      items={[
        {
          variant: 'red',
          title: 'Launch Partner Program',
          description: 'Co-market with PingCAP and reach new developer audiences.',
          cta: { text: 'Join Program', href: '/open-source-heroes/' },
          icon: <Rocket strokeWidth={1.5} size={32} />,
        },
        {
          variant: 'violet',
          title: 'Startup Credits',
          description: 'Apply for credits to accelerate your next production release.',
          cta: { text: 'Apply Now', href: '/tidb-cloud-startup-program/' },
          icon: <Layers strokeWidth={1.5} size={32} />,
        },
        {
          variant: 'blue',
          title: 'Architecture Review',
          description: 'Get guidance from our solutions engineers before you migrate.',
          cta: { text: 'Book Review', href: '/contact-us/' },
          icon: <Compass strokeWidth={1.5} size={32} />,
        },
      ]}
      columns={3}
      viewMore={{ text: 'View all initiatives', href: '/about-us/' }}
    />
  </SectionWrapper>
)

/** All four brand variants across four columns — the densest arrangement. */
export const FourVariantsAcrossFourColumns = () => (
  <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
    <FeatureHighlightsSection
      title="Get Started with TiDB"
      subtitle="Choose the path that best fits your workflow."
      items={[
        {
          variant: 'red',
          title: 'TiDB Cloud Starter',
          description: 'Spin up a serverless cluster in under a minute.',
          cta: { text: 'Start Free', href: '/tidb-cloud/' },
          icon: <Rocket strokeWidth={1.5} size={32} />,
        },
        {
          variant: 'violet',
          title: 'Read the Docs',
          description: 'Schema design, migration guides, and SQL reference.',
          cta: { text: 'Browse Docs', href: '/developers/' },
          icon: <BookOpen strokeWidth={1.5} size={32} />,
        },
        {
          variant: 'blue',
          title: 'Run It Locally',
          description: 'Bring up a full cluster on your laptop with TiUP playground.',
          cta: { text: 'Install TiUP', href: '/downloads/' },
          icon: <Terminal strokeWidth={1.5} size={32} />,
        },
        {
          variant: 'teal',
          title: 'Join the Community',
          description: 'Ask questions and compare notes with other TiDB operators.',
          cta: { text: 'Join Slack', href: '/community/' },
          icon: <Users strokeWidth={1.5} size={32} />,
        },
      ]}
      columns={4}
    />
  </SectionWrapper>
)

/**
 * Headerless, two columns — the section header collapses entirely when no
 * eyebrow, title, or subtitle is supplied, so the cards can sit under a
 * page-level heading.
 */
export const HeaderlessTwoColumn = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FeatureHighlightsSection
      items={[
        {
          variant: 'teal',
          title: 'Migrate from MySQL',
          description:
            'Keep your drivers, ORMs, and SQL. Data Migration streams your existing tables into TiDB with no application rewrite.',
          cta: { text: 'See the migration guide', href: '/migrate-from-mysql/' },
          icon: <Layers strokeWidth={1.5} size={32} />,
        },
        {
          variant: 'blue',
          title: 'Talk to an Architect',
          description:
            'Walk through your workload with a solutions engineer and get a sizing plan before you commit.',
          cta: { text: 'Book a session', href: '/contact-us/' },
          icon: <Compass strokeWidth={1.5} size={32} />,
        },
      ]}
      columns={2}
    />
  </SectionWrapper>
)
