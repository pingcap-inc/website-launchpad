import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { externalLinkProps } from '@/lib/links'
import { buildPageSchema } from '@/lib/schema'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { HeroSection } from '@/components/sections/HeroSection'
import { PricingPlansSection, type PricingPlan } from './_components/PricingPlansSection'
import { LogoCloudSection } from '@/components/sections/LogoCloudSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { FeatureCard } from '@/components/ui/FeatureCard'

const TITLE = 'TiDB Pricing | TiDB Cloud and TiDB Cloud Lake'
const DESCRIPTION =
  'Compare TiDB Cloud plans and TiDB Cloud Lake editions. Explore free usage, starting compute prices, and BYOC deployment to find the right fit for your workload.'
const CANONICAL = 'https://www.pingcap.com/pricing/'
const SOCIAL_IMAGE = 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'
const BILLING_DOCS = 'https://docs.pingcap.com/tidbcloudlake/pricing-billing/'
const DOWNLOAD_URL = 'https://www.pingcap.com/download/'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'TiDB',
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: [SOCIAL_IMAGE],
  },
}

const schema = buildPageSchema({
  path: '/pricing/',
  title: TITLE,
  description: DESCRIPTION,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing/' },
  ],
})

// ─── TiDB Cloud ──────────────────────────────────────────────────────────────

const CLOUD_NAVIGATION = [
  {
    text: 'TiDB Cloud',
    href: '#tidb-cloud',
  },
  {
    text: 'TiDB Cloud Lake',
    href: '#cloud-lake',
  },
]

const CLOUD_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    accent: 'magenta',
    border: 'grey',
    heading: 'Start Building for Free',
    description:
      'For developers who want on-demand compute that scales to zero when idle, with spend limits to control costs.',
    priceLabel: 'Start with',
    price: '$0',
    unit: '/month',
    priceNote: 'Pay for usage beyond the free allowance.',
    primaryCta: {
      text: 'Start for Free',
      href: 'https://tidbcloud.com/free-trial',
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-cloud-starter-pricing-details/',
    },
    detailsLabel: 'Free Monthly Allowance¹',
    features: ['25 GiB row storage', '25 GiB columnar storage', '250M Request Units'],
    detailNote: 'Per organization, across up to five eligible instances.',
    rates: [],
    overage: {
      summary: 'Rates Beyond the Free Allowance',
      rates: [
        {
          label: 'Request Units',
          value: 'From $0.10',
          unit: '/million RUs',
        },
        {
          label: 'Row storage',
          value: 'From $0.20',
          unit: '/GiB-month',
        },
        {
          label: 'Columnar storage',
          value: 'From $0.05',
          unit: '/GiB-month',
        },
      ],
      note: 'Rates vary by cloud provider and region. See pricing details for all applicable charges.',
    },
  },
  {
    name: 'Essential',
    accent: 'periwinkle',
    border: 'white',
    statusBadge: 'Public Preview',
    heading: 'Scale with Capacity Control',
    description:
      'For growing applications that need provisioned compute capacity, with limits you set to match workload demand.',
    priceLabel: 'Compute from',
    price: '$400',
    unit: '/month',
    priceNote: 'Minimum capacity charges apply. Storage and other services are extra.²',
    primaryCta: {
      text: 'Get Started',
      href: 'https://tidbcloud.com/free-trial',
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-cloud-essential-pricing-details/',
    },
    detailsLabel: 'Key Capabilities',
    features: [
      'Autoscaling within your compute limit',
      'Point-in-time recovery',
      'Encryption in transit and at rest',
    ],
    rates: [],
  },
  {
    name: 'Premium',
    accent: 'blue',
    border: 'blue',
    statusBadge: 'Public Preview',
    heading: 'Scale Automatically as Demand Changes',
    description:
      'For business-critical applications that need automatic compute scaling, isolated resources, and advanced security as workload demand changes.',
    priceLabel: 'Compute from',
    price: '$1,800',
    unit: '/month',
    priceNote: 'Minimum capacity charges apply. Storage and other services are extra.²',
    primaryCta: {
      text: 'Get Started',
      href: 'https://tidbcloud.com/free-trial',
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-cloud-premium-pricing-details/',
    },
    detailsLabel: 'Key Capabilities',
    features: [
      'Isolated compute, storage, and network',
      'Private connectivity and customer-managed keys',
      '99.99% availability with multi-zone protection',
    ],
    rates: [],
  },
  {
    name: 'Dedicated',
    accent: 'teal',
    border: 'teal',
    heading: 'Choose Your Cloud and Cluster Size',
    description:
      'For applications that need configurable clusters on AWS, Google Cloud, or Azure. Choose node sizes and counts to match your workload.',
    priceLabel: 'Cluster from',
    price: '$1,376',
    unit: '/month',
    priceNote: 'Rates vary by cloud provider, region, and cluster configuration.³',
    primaryCta: {
      text: 'Get Started',
      href: 'https://tidbcloud.com/signup/?signup_source=pingcap-en-dedicated',
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-dedicated-pricing-details/',
    },
    detailsLabel: 'Key Capabilities',
    features: [
      'Configurable node sizes and counts',
      'Independent compute and storage scaling',
      'Private endpoints and automated backups',
    ],
    rates: [],
  },
]

const CLOUD_NOTES = [
  {
    id: 'pr-starter-allowance',
    label: '1. Starter Allowance',
    text: 'For MySQL-compatible instances, each of up to five eligible instances includes 5 GiB row storage, 5 GiB columnar storage, and 50M Request Units per month. The allowance applies separately to each instance.',
  },
  {
    id: 'pr-compute-pricing',
    label: '2. Essential and Premium Pricing',
    text: 'Starting compute prices use minimum capacity at the lowest published regional rate. Storage, backup, data transfer, and other services are billed separately. Charges vary by region, configuration, and usage.',
  },
  {
    id: 'pr-dedicated-pricing',
    label: '3. Dedicated Pricing',
    text: 'Displayed starting price uses an AWS configuration with 4 vCPUs per node. Pricing varies by cloud provider, region, configuration, and additional services.',
  },
]

const CLOUD_DEPLOYMENT = {
  id: 'byoc',
  label: 'BYOC Deployment Option',
  statusBadge: 'Public Preview',
  title: 'Keep Data in Your Cloud',
  description:
    'Run TiDB as a managed service in your cloud account. You manage your data and application access; TiDB Cloud handles database operations.',
  detailsTitle: 'Pricing for Your Deployment',
  features: ['TiDB Cloud service and support fees', 'Infrastructure billed by your cloud provider'],
  primaryCta: {
    // Same host as this page, so externalLinkProps would keep it in-tab.
    text: 'Contact Sales',
    href: 'https://www.pingcap.com/contact-us/',
    newTab: true,
  },
  secondaryCta: {
    text: 'Learn More',
    href: 'https://docs.pingcap.com/tidbcloud/byoc/',
  },
}

// ─── TiDB Cloud Lake ─────────────────────────────────────────────────────────

const LAKE_PLANS: PricingPlan[] = [
  {
    name: 'Personal',
    accent: 'white',
    border: 'grey',
    statusBadge: 'Public Preview',
    description: 'For developers getting started with analytics and search.',
    priceLabel: 'Warehouse compute from',
    price: '$1.60',
    unit: '/hour',
    priceNote: 'Storage and cloud services billed separately.',
    primaryCta: {
      text: 'Get Started',
      href: 'https://tidbcloud.com/signup/?signup_source=pingcap-en-lake',
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-cloud-lake-pricing-details/',
    },
    features: ['On-demand warehouse compute', 'Up to 1 day of data history'],
    rates: [
      {
        label: 'Storage',
        value: '$23',
        unit: '/TB-month',
      },
      {
        label: 'Cloud services',
        value: '$1',
        unit: '/10,000 API requests',
      },
    ],
  },
  {
    name: 'Business',
    accent: 'white',
    border: 'grey',
    statusBadge: 'Public Preview',
    description: 'For teams that need private connectivity and longer data retention.',
    priceLabel: 'Warehouse compute from',
    price: '$2.40',
    unit: '/hour',
    priceNote: 'Storage and cloud services billed separately.',
    primaryCta: {
      text: 'Get Started',
      href: 'https://tidbcloud.com/signup/?signup_source=pingcap-en-lake',
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-cloud-lake-pricing-details/',
    },
    features: ['Private connectivity with PrivateLink', 'Up to 90 days of data history'],
    rates: [
      {
        label: 'Storage',
        value: '$23',
        unit: '/TB-month',
      },
      {
        label: 'Cloud services',
        value: '$2',
        unit: '/10,000 API requests',
      },
    ],
  },
  {
    name: 'Dedicated',
    accent: 'white',
    border: 'grey',
    statusBadge: 'Public Preview',
    description: 'For workloads that need an isolated environment and custom resources.',
    priceLabel: 'Warehouse compute',
    price: 'Contact Sales',
    priceNote: 'Storage and cloud services billed separately.',
    primaryCta: {
      text: 'Contact Sales',
      href: 'https://www.pingcap.com/contact-us/',
      newTab: true,
    },
    secondaryCta: {
      text: 'View Pricing Details',
      href: 'https://www.pingcap.com/tidb-cloud-lake-pricing-details/',
    },
    features: [
      'Isolated environment with custom resources',
      'Scheduled upgrades to fit your operations',
    ],
    rates: [
      {
        label: 'Storage',
        value: '$23',
        unit: '/TB-month',
      },
      {
        label: 'Cloud services',
        value: 'Contact Sales',
      },
    ],
  },
]

// ─── Supporting sections ─────────────────────────────────────────────────────

const COMPLIANCE_LOGOS = [
  {
    name: 'ISO/IEC 27001 Information Security Management',
    image: {
      url: '/images/pricing/security-1.png',
    },
    width: 111,
    height: 56,
  },
  {
    name: 'ISO/IEC 27701 Privacy Information Management',
    image: {
      url: '/images/pricing/security-2.png',
    },
    width: 111,
    height: 56,
  },
  {
    name: 'AICPA SOC',
    image: {
      url: '/images/pricing/security-3.png',
    },
    width: 56,
    height: 56,
  },
  {
    name: 'PCI DSS',
    image: {
      url: '/images/pricing/security-4.png',
    },
    width: 56,
    height: 56,
  },
  {
    name: 'GDPR',
    image: {
      url: '/images/pricing/security-5.png',
    },
    width: 56,
    height: 56,
  },
  {
    name: 'Data Privacy Framework',
    image: {
      url: '/images/pricing/security-6.svg',
    },
    width: 56,
    height: 56,
  },
  {
    name: 'Cloud Data Protection',
    image: {
      url: '/images/pricing/security-7.png',
    },
    width: 84,
    height: 54,
  },
  {
    name: 'CCPA',
    image: {
      url: '/images/pricing/security-8.svg',
    },
    width: 56,
    height: 56,
  },
  {
    name: 'HIPAA',
    image: {
      url: '/images/pricing/security-9.png',
    },
    width: 56,
    height: 56,
  },
]

const RESOURCE_CARDS = [
  {
    title: 'TiDB Cloud Documentation',
    description: 'Explore setup guides, product capabilities, and billing details.',
    ctaText: 'Read the Docs',
    href: 'https://docs.pingcap.com/tidbcloud/',
    borderColor: 'border-brand-teal-medium',
  },
  {
    title: 'TiDB Cloud Lake Quick Start',
    description: 'Create a warehouse and run your first query.',
    ctaText: 'Follow the Guide',
    href: 'https://docs.pingcap.com/tidbcloudlake/lake-quick-start/',
    borderColor: 'border-brand-violet-medium',
  },
  {
    title: 'TiDB FAQs',
    description: 'Find answers about TiDB features, compatibility, and operations.',
    ctaText: 'Browse FAQs',
    href: 'https://docs.pingcap.com/tidb/stable/faq-overview/',
    borderColor: 'border-brand-blue-medium',
  },
]

export default function PricingPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="bg-bg-primary pt-[62px] text-text-inverse lg:pt-20">
        <SectionWrapper style={{ spacing: 'hero' }}>
          {/* heroImage is deliberately omitted: HeroSection only renders it in the
              image-right layout, so on a centered hero it is dead configuration. */}
          <HeroSection layout={'centered'} headline={'Pricing'} />
        </SectionWrapper>

        <SectionWrapper id="tidb-cloud" style={{ spacing: 'sm', removePaddingTop: true }}>
          <PricingPlansSection
            intro={'Find the right fit for your workload.'}
            navigation={CLOUD_NAVIGATION}
            title={'TiDB Cloud'}
            subtitle={
              'Build and scale your applications with a fully managed distributed SQL database.'
            }
            currency={'All prices in USD.'}
            columns={4}
            deploymentLink={{
              text: 'Need to Keep Data in Your Cloud Account? Explore BYOC',
              href: '#byoc',
            }}
            plans={CLOUD_PLANS}
            notes={CLOUD_NOTES}
            deployment={CLOUD_DEPLOYMENT}
          />
        </SectionWrapper>

        <SectionWrapper id="cloud-lake" style={{ spacing: 'section' }}>
          <PricingPlansSection
            title={'TiDB Cloud Lake'}
            subtitle={
              'Run analytics and search in a managed warehouse, with compute that scales independently of storage.'
            }
            currency={'All prices in USD.'}
            columns={3}
            plans={LAKE_PLANS}
            footer={
              <>
                <p>
                  Warehouse compute is billed by the second while running. Suspending a warehouse
                  stops its compute charges; storage and other applicable charges continue.
                </p>
                <p className="mt-1">
                  Data integration services incur additional charges.{' '}
                  <a
                    href={BILLING_DOCS}
                    className="text-white underline underline-offset-[3px]"
                    {...externalLinkProps(BILLING_DOCS)}
                  >
                    See How Billing Works
                  </a>
                </p>
              </>
            }
          />
          <p className="mt-8 text-center text-body-sm text-carbon-400">
            Looking for open source?{' '}
            <a
              href={DOWNLOAD_URL}
              className="text-white underline underline-offset-[3px]"
              {...externalLinkProps(DOWNLOAD_URL)}
            >
              Download TiDB Community
            </a>
          </p>
        </SectionWrapper>

        <SectionWrapper style={{ background: 'gradient-dark-top', spacing: 'section' }}>
          <LogoCloudSection
            className={'space-y-8'}
            cta={{
              text: 'Explore the Trust Hub',
              href: 'https://www.pingcap.com/trust-hub/',
            }}
            logoClassName={'h-14 w-auto'}
            title={'Security and Compliance'}
            subtitle={
              'Review security controls, privacy practices, and compliance documentation in the Trust Hub.'
            }
            logos={COMPLIANCE_LOGOS}
            align={'center'}
            autoScroll={false}
          />
        </SectionWrapper>

        <SectionWrapper style={{ background: 'brand-violet', spacing: 'section' }}>
          <CtaSection
            title={'Need Help Choosing?'}
            subtitle={
              'Talk through your workload, deployment needs, and expected usage to find the right fit.'
            }
            image={{
              image: {
                url: '/images/pricing/cta-cubes.svg',
              },
              alt: 'Decorative purple cubes',
              width: 278,
              height: 256,
            }}
            primaryCta={{
              text: 'Contact Sales',
              href: 'https://www.pingcap.com/contact-us/',
              newTab: true,
            }}
          />
        </SectionWrapper>

        <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {RESOURCE_CARDS.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
                ctaText={card.ctaText}
                href={card.href}
                borderColor={card.borderColor}
              />
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  )
}
