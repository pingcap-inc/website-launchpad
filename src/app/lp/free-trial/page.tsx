import type { Metadata } from 'next'
import { Navbar, HeroSection, FeaturesGrid, CtaSection } from '@/components'
import { Clock, DollarSign, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TiDB Cloud Free Trial — Start in 5 Minutes',
  description: 'Try TiDB Cloud free for 7 days. No credit card required. Deploy a fully managed distributed SQL database in minutes.',
  openGraph: {
    title: 'TiDB Cloud Free Trial — Start in 5 Minutes',
    description: 'Zero-config distributed database. 7-day free trial, no credit card required.',
    url: 'https://www.pingcap.com/lp/free-trial/',
    siteName: 'PingCAP',
    images: [{ url: 'https://www.pingcap.com/og/free-trial.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TiDB Cloud Free Trial',
    description: 'Zero-config distributed database. 7-day free trial.',
    images: ['https://www.pingcap.com/og/free-trial.png'],
  },
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.pingcap.com/lp/free-trial/' },
}

const benefits = [
  {
    icon: <Clock className="w-full h-full text-brand-red-primary" />,
    title: 'Deploy in 5 Minutes',
    description: 'No infrastructure setup. No DBA required. Enter your cluster name and click deploy — TiDB Cloud handles the rest.',
  },
  {
    icon: <DollarSign className="w-full h-full text-brand-red-primary" />,
    title: 'Pay Only for What You Use',
    description: 'Automatic elastic scaling means you never over-provision. Scale down during off-peak hours and save up to 60% on compute costs.',
  },
  {
    icon: <RefreshCw className="w-full h-full text-brand-red-primary" />,
    title: 'Zero Migration Cost',
    description: 'Full MySQL compatibility means your existing queries, ORMs, and drivers work without modification. Migrate in hours, not months.',
  },
]

export default function FreeTrial() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection
          eyebrow="FREE TRIAL"
          headline="Zero Config. Real Scale. 7 Days Free."
          subheadline="Launch a fully managed distributed SQL database in minutes. No credit card required."
          primaryCta={{ text: 'Start Free Trial', href: '/signup/' }}
          secondaryCta={{ text: 'View Pricing', href: '/pricing/' }}
        />

        <FeaturesGrid
          label="WHY TIDB CLOUD"
          title="Everything You Need, Nothing You Don't"
          features={benefits}
          columns={3}
          className="bg-bg-primary"
        />

        <CtaSection
          label="GET STARTED"
          title="Start Your Free Trial Today"
          subtitle="7 days free. No credit card. Cancel anytime."
          primaryCta={{ text: 'Start for Free', href: '/signup/' }}
          background="red"
        />
      </main>
    </>
  )
}
