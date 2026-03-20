import type { Metadata } from 'next'
import { Fragment } from 'react'
import { Compass, Layers, Rocket } from 'lucide-react'
import {
  CtaSection,
  FeatureHighlightsSection,
  FaqSection,
  FeatureCardSection,
  FeatureTabsSection,
  FeatureGridSection,
  Footer,
  Header,
  HeroSection,
  LogoCloudSection,
  TestimonialsSection,
  StatsSection,
  FormSection,
  SectionWrapper,
} from '@/components'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { Computer, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Section Showcase',
  description: 'Internal preview of section components.',
  robots: {
    index: false,
    follow: false,
  },
}

const SECTIONS_DIR = path.join(process.cwd(), 'src/components/sections')

function toTitleCase(input: string) {
  return input
    .replace(/\.tsx$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
}

async function getSectionComponents() {
  const entries = await fs.readdir(SECTIONS_DIR, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
    .map((entry) => ({
      name: entry.name.replace(/\.tsx$/, ''),
      label: toTitleCase(entry.name),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

const demoRenderers: Record<string, () => React.ReactNode> = {
  HeroSection: () => (
    <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
      <HeroSection
        layout="image-right"
        eyebrow="Section Demo"
        headline="Hero Section Demo"
        subheadline="Swap the copy and CTAs to fit any campaign."
        primaryCta={{ text: 'Primary Action', href: '/' }}
        secondaryCta={{ text: 'Secondary', href: '/' }}
        heroImage={{
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'Hero image',
          width: 300,
          height: 300,
        }}
      />
    </SectionWrapper>
  ),
  FeatureGridSection: () => (
    <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
      <FeatureGridSection
        eyebrow="Features Grid"
        title="Highlight key benefits"
        subtitle="A flexible grid that scales from 2 to 4 columns."
        itemLayout="horizontal"
        features={[
          {
            title: 'Fast Setup',
            description: 'Swap content without touching layout or spacing.',
            icon: <Computer />,
          },
          {
            title: 'Consistent Branding',
            description: 'Typography and color tokens stay aligned.',
            icon: <Landmark />,
          },
          {
            title: 'Composable',
            description: 'Add or remove cards without breaking structure.',
            icon: <Computer />,
          },
          {
            title: 'Responsive',
            description: 'Layouts adapt cleanly across breakpoints.',
            icon: <Landmark />,
          },
        ]}
        columns={4}
      />
    </SectionWrapper>
  ),
  FeatureCardSection: () => (
    <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
      <FeatureCardSection
        eyebrow="Feature Cards"
        title="Bordered Cards with Color Accents"
        subtitle="Each card supports custom border colors or a default neutral border."
        items={[
          {
            title: 'Secure by Default',
            description: 'Built-in encryption, IAM integration, and audit-ready logs.',
            icon: <Rocket size={28} />,
          },
          {
            title: 'Global Ready',
            description: 'Deploy across regions with predictable performance.',
            icon: <Compass size={28} />,
          },
          {
            title: 'Developer Friendly',
            description: 'MySQL-compatible with a modern observability stack.',
            icon: <Layers size={28} />,
          },
          {
            title: 'Reliable Operations',
            description: 'Automated backups and failure recovery at scale.',
            icon: <Computer size={28} />,
          },
        ]}
        columns={4}
        borderStyle="color"
      />
    </SectionWrapper>
  ),
  FeatureTabsSection: () => (
    <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
      <FeatureTabsSection
        eyebrow="Feature Tabs"
        title="Deep Dives with Auto-Switching Tabs"
        subtitle="Each tab pairs a story on the left with a visual on the right."
        tabs={[
          {
            id: 'scale',
            label: 'Scale',
            description:
              'Keep your existing MySQL-compatible workflows while scaling from GB to PB.',
            bullets: ['Horizontal scaling', 'Strong consistency', 'HTAP-ready'],
            primaryCta: { text: 'Learn More', href: '/developers/' },
            image: {
              image: { url: '/images/patterns/graphic-1.svg' },
              alt: 'Scaling illustration',
              width: 910,
              height: 480,
            },
          },
          {
            id: 'speed',
            label: 'Speed',
            description: 'Serve transactional and analytical workloads in a single system.',
            bullets: ['Real-time insights', 'Elastic compute', 'Optimized storage'],
            secondaryCta: { text: 'See Docs', href: '/developers/' },
            image: {
              image: { url: '/images/patterns/graphic-2.svg' },
              alt: 'Performance illustration',
              width: 910,
              height: 480,
            },
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
            image: {
              image: { url: '/images/patterns/graphic-3.svg' },
              alt: 'Operations illustration',
              width: 910,
              height: 480,
            },
          },
        ]}
        autoSwitch={true}
        autoSwitchInterval={6000}
      />
    </SectionWrapper>
  ),
  LogoCloudSection: () => (
    <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'section' }}>
      <LogoCloudSection
        title="Trusted by"
        scrollContentMaxWidth={800}
        logos={[
          {
            name: 'Dify',
            image: { url: '/images/logos/dify-logo-white.svg' },
          },
          {
            name: 'Manus',
            image: { url: '/images/logos/manuse-logo-white.svg' },
          },
          {
            name: 'Rengage',
            image: { url: '/images/logos/rengage-logo-white.svg' },
          },
          {
            name: 'catalyst',
            image: { url: '/images/logos/catalyst-logo-white.svg' },
          },
          {
            name: 'toprism',
            image: { url: '/images/logos/toprism-logo-white.svg' },
          },
          {
            name: 'plaid',
            image: { url: '/images/logos/plaid-logo-white.svg' },
          },
        ]}
        variant="minimal"
      />
    </SectionWrapper>
  ),
  TestimonialsSection: () => (
    <SectionWrapper style={{ background: 'gradient-dark-bottom', spacing: 'section' }}>
      <TestimonialsSection
        eyebrow="Social Proof"
        title="What Teams Are Saying"
        testimonials={[
          {
            quote:
              'We replaced a patchwork of caches with a single HTAP store and reduced latency by 38%.',
            author: 'Data Platform Lead · Fintech',
            href: '/customers/',
            cta: 'Read the Case Study',
            logo: { image: { url: '/images/tidb-cloud-startup-program/Dify.png' }, alt: 'Dify' },
          },
          {
            quote:
              'The sections made it easy to align design with content. We shipped the campaign in two days.',
            author: 'Growth PM · SaaS',
            href: '/customers/',
            cta: 'See the Campaign',
            logo: {
              image: { url: '/images/tidb-cloud-startup-program/Rengage.png' },
              alt: 'Rengage',
            },
          },
          {
            quote: 'Our team finally has a consistent way to narrate product value.',
            author: 'Head of Marketing · Dev Tools',
            href: '/customers/',
            cta: 'Explore Customer Stories',
            logo: { image: { url: '/images/tidb-cloud-startup-program/Manus.png' }, alt: 'Manus' },
          },
        ]}
      />
    </SectionWrapper>
  ),
  CtaSection: () => (
    <SectionWrapper style={{ background: 'brand-violet', spacing: 'md' }}>
      <CtaSection
        title="Ready to Assemble Your Next Page?"
        subtitle="Pick the sections you need, swap the copy, and go live fast."
        primaryCta={{ text: 'Start Building', href: '/open-source-heroes/' }}
        secondaryCta={{ text: 'Explore Pages', href: '/' }}
        image={{
          image: {
            url: 'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-violet-mini.svg',
          },
          alt: 'CTA cube',
          width: 278,
          height: 256,
        }}
      />
    </SectionWrapper>
  ),
  FeatureHighlightsSection: () => (
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
            icon: <Rocket size={32} />,
          },
          {
            variant: 'violet',
            title: 'Startup Credits',
            description: 'Apply for credits to accelerate your next production release.',
            cta: { text: 'Apply Now', href: '/tidb-cloud-startup-program/' },
            icon: <Layers size={32} />,
          },
          {
            variant: 'blue',
            title: 'Architecture Review',
            description: 'Get guidance from our solutions engineers.',
            cta: { text: 'Book Review', href: 'https://www.pingcap.com/contact-us/' },
            icon: <Compass size={32} />,
          },
        ]}
        columns={3}
        viewMore={{ text: 'View all initiatives', href: '/about-us/' }}
      />
    </SectionWrapper>
  ),
  StatsSection: () => (
    <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
      <StatsSection
        eyebrow="BY THE NUMBERS"
        title="Performance You Can Measure"
        stats={[
          {
            icon: <Rocket strokeWidth={1.5} size={28} />,
            value: '10x',
            label: 'Faster Queries',
            description: 'Compared to standard MySQL deployments under mixed workloads.',
          },
          {
            icon: <Compass strokeWidth={1.5} size={28} />,
            value: '99.99%',
            label: 'Uptime SLA',
            description: 'Enterprise-grade availability with automated failover.',
          },
          {
            icon: <Layers strokeWidth={1.5} size={28} />,
            value: '5,000+',
            label: 'Global Customers',
            description: 'Spanning fintech, e-commerce, gaming, and SaaS.',
          },
        ]}
      />
    </SectionWrapper>
  ),
  FaqSection: () => (
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
  ),
  FormSection: () => (
    <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
      <FormSection
        title="Talk to Us"
        subtitle="Drop your info and we’ll get back within 24 hours."
        portalId="4466002"
        formId="8d439c40-4e6b-4192-a99b-a2c619ad4146"
        region="na1"
      />
    </SectionWrapper>
  ),
}

export default async function SectionsPage() {
  const sections = await getSectionComponents()
  return (
    <>
      <Header />
      <div className="pt-[62px] lg:pt-20">
        <SectionWrapper style={{ background: 'primary', spacing: 'hero' }}>
          <HeroSection
            eyebrow="Section Library"
            headline="Preview Reusable Landing Sections"
            subheadline="This page lists every section component found in src/components/sections."
            primaryCta={{ text: 'Use These Sections', href: '/' }}
            secondaryCta={{ text: 'See More Pages', href: '/' }}
          />
        </SectionWrapper>
        <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <a
                key={section.name}
                href={`#${section.name}`}
                className="rounded-2xl border border-carbon-800 bg-bg-surface/60 p-6 transition-colors hover:border-brand-red-primary hover:text-brand-red-primary"
              >
                <p className="text-body-lg font-bold text-text-inverse">{section.label}</p>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {`/components/sections/${section.name}.tsx`}
                </p>
              </a>
            ))}
          </div>
        </SectionWrapper>

        {sections.map((section) => {
          const demo = demoRenderers[section.name]
          if (demo) {
            return <Fragment key={section.name}>{demo()}</Fragment>
          }
          return (
            <SectionWrapper
              key={section.name}
              id={section.name}
              style={{ background: 'primary', spacing: 'section' }}
            >
              <h2 className="text-h2-mb md:text-h2-md font-bold text-text-inverse">
                {section.label}
              </h2>
              <p className="mt-3 text-body-md text-text-secondary">Demo not available yet.</p>
            </SectionWrapper>
          )
        })}
      </div>
      <Footer />
    </>
  )
}
