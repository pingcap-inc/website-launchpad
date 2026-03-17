import type { Metadata } from 'next'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { HubSpotForm } from '@/components/ui/HubSpotForm'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { DollarSign, Rocket, Gauge, Users, Cloud, Shield, Database, Brain } from 'lucide-react'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program - $100k Credits & Support",
  description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Get $100,000 in cloud credits, expert support, and go-to-market benefits.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/startup-program/' },
  openGraph: {
    title: "TiDB Cloud Startup Program - $100k Credits & Support",
    description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Get $100,000 in cloud credits, expert support, and go-to-market benefits.",
    url: 'https://www.pingcap.com/tidb-cloud/startup-program/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

const schema = buildPageSchema({
  path: "/tidb-cloud/startup-program/",
  title: "TiDB Cloud Startup Program - $100k Credits & Support",
  description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Get $100,000 in cloud credits, expert support, and go-to-market benefits.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Launch Fast. Scale without <span class=\"text-gradient-violet\">Limits</span>.", path: "/tidb-cloud/startup-program/" },
  ],
})

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <HeroSection
          layout="split"
          eyebrow="Startup Program"
          headline={"Launch Fast. Scale without <span class=\"text-gradient-violet\">Limits</span>."}
          subheadline="Get $100,000 in TiDB Cloud credits, dedicated technical support, and go-to-market resources to accelerate your growth."
          primaryCta={{ text: "Apply Now", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Learn How It Works", href: "#program-details" }}
          heroImage={{ src: "/images/hero/r/Graphic-1-Dk.png", alt: "TiDB Cloud Startup Program Dashboard", width: 800, height: 500, align: "right" }}
          rightSlot={
            <HubSpotForm
              formId="8d439c40-4e6b-4192-a99b-a2c619ad4146"
              portalId="4466002"
              region="na1"
            />
          }
        />
        <StatsSection
          title="Why Startups Choose TiDB"
          stats={[
          { icon: <DollarSign className="" strokeWidth={1.5} />, value: "$100,000", label: "Cloud Credits", description: "Free credits to build and scale your application on TiDB Cloud." },
          { icon: <Rocket className="" strokeWidth={1.5} />, value: "10x", label: "Faster Launch", description: "Serverless architecture eliminates infrastructure setup time." },
          { icon: <Gauge className="" strokeWidth={1.5} />, value: "99.99%", label: "SLA Uptime", description: "Enterprise-grade reliability for mission-critical data." },
          { icon: <Users className="" strokeWidth={1.5} />, value: "24/7", label: "Expert Support", description: "Direct access to TiDB engineers and architects." }
          ]}
          columns={4}
        />
        <FeatureGridSection
          eyebrow="Program Benefits"
          title="Everything You Need to Scale"
          subtitle="Our Startup Program provides more than just credits. We offer the tools and guidance to help you succeed."
          features={[
          { icon: <Cloud className="" strokeWidth={1.5} />, title: "Serverless Flexibility", description: "Pay only for what you use with our serverless tier. Automatically scale compute and storage without downtime." },
          { icon: <Shield className="" strokeWidth={1.5} />, title: "Global Consistency", description: "Deploy globally with strong consistency. Serve users anywhere with low latency and high availability." },
          { icon: <Database className="" strokeWidth={1.5} />, title: "MySQL Compatible", description: "Leverage your existing MySQL skills and tools. No code changes required to migrate to TiDB." },
          { icon: <Brain className="" strokeWidth={1.5} />, title: "HTAP Capabilities", description: "Run transactions and analytics on the same data in real-time. Eliminate data silos and ETL pipelines." }
          ]}
          columns={2}
        />
        <TestimonialsSection
          title="Trusted by High-Growth Startups"
          testimonials={[
          { quote: "The TiDB Cloud Startup Program gave us the runway we needed to scale globally. The $100k credits were a game-changer for our infrastructure budget.", author: "CTO, Fintech Unicorn", href: "/case-studies/fintech/" },
          { quote: "We migrated from a traditional database in days, not months. The serverless architecture allowed us to handle our viral growth without a single outage.", author: "Lead Engineer, SaaS Platform", href: "/case-studies/saas/" }
          ]}
        />
        <FaqSection
          title="Frequently Asked Questions"
          items={[
          { q: "Who is eligible for the TiDB Cloud Startup Program?", a: "We support early-stage startups, typically those that have raised seed or Series A funding, are less than 5 years old, and have fewer than 50 employees." },
          { q: "How do I use the $100,000 in credits?", a: "Credits are applied directly to your TiDB Cloud account and can be used for Serverless or Dedicated clusters. They expire 12 months after approval." },
          { q: "Do I need to pay anything to apply?", a: "No, the application process is completely free. If approved, you receive credits and support at no upfront cost." },
          { q: "What kind of support is included?", a: "Startups get access to a dedicated Slack channel with TiDB engineers, priority ticket handling, and architectural reviews." }
          ]}
        />
        <CtaSection
          title="Ready to Scale Your Startup?"
          subtitle="Join hundreds of innovative companies building on TiDB Cloud. Apply today to secure your $100,000 in credits."
          background="violet"
          primaryCta={{ text: "Apply for Startup Program", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Contact Sales", href: "/contact-us/" }}
        />
      </main>
      <Footer />
    </>
  )
}
