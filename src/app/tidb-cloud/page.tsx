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
import { DollarSign, Rocket, Gauge, Users, Cloud, Shield, Globe, Database, Code2, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program | $100k Credits & Support",
  description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Get $100,000 in cloud credits, technical support, and go-to-market resources.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/startup-program/' },
  openGraph: {
    title: "TiDB Cloud Startup Program | $100k Credits & Support",
    description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Get $100,000 in cloud credits, technical support, and go-to-market resources.",
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
  title: "TiDB Cloud Startup Program | $100k Credits & Support",
  description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Get $100,000 in cloud credits, technical support, and go-to-market resources.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Launch Fast. Scale without Limits. <span class=\"text-gradient-violet animate-glow\">$100,000</span> in TiDB Cloud Credits", path: "/tidb-cloud/startup-program/" },
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
          headline="Launch Fast. Scale without Limits. <span class=\"text-gradient-violet animate-glow\">$100,000</span> in TiDB Cloud Credits"
          subheadline="Apply now and start building with the distributed SQL database that grows with you—from MVP to millions of users."
          primaryCta={{ text: "Apply Now", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Learn More", href: "#benefits" }}
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
          { icon: <DollarSign className="" strokeWidth={1.5} />, value: "$100,000", label: "Cloud Credits", description: "Free credits to cover your infrastructure costs for up to 12 months." },
          { icon: <Rocket className="" strokeWidth={1.5} />, value: "10x", label: "Faster Time to Market", description: "Deploy serverless databases in seconds, not days." },
          { icon: <Gauge className="" strokeWidth={1.5} />, value: "99.99%", label: "SLA Guarantee", description: "Enterprise-grade reliability for your critical workloads." },
          { icon: <Users className="" strokeWidth={1.5} />, value: "Global", label: "Community Access", description: "Connect with founders, investors, and technical experts." }
          ]}
          columns={4}
        />
        <FeatureGridSection
          eyebrow="Program Benefits"
          title="Everything You Need to Scale"
          subtitle="Our startup program provides more than just credits. We offer the tools and support to help you succeed."
          features={[
          { icon: <Cloud className="" strokeWidth={1.5} />, title: "Massive Cloud Credits", description: "Receive up to $100,000 in TiDB Cloud Serverless credits to fuel your growth without worrying about infrastructure bills.", href: "/tidb-cloud/pricing/" },
          { icon: <Shield className="" strokeWidth={1.5} />, title: "Technical Support", description: "Get direct access to TiDB engineers and solution architects for architecture reviews and troubleshooting.", href: "/tidb-cloud/support/" },
          { icon: <Globe className="" strokeWidth={1.5} />, title: "Go-to-Market Support", description: "Leverage our marketing channels, co-marketing opportunities, and investor network to reach your target audience.", href: "/partners/" },
          { icon: <Database className="" strokeWidth={1.5} />, title: "Serverless Architecture", description: "Eliminate capacity planning. TiDB Cloud automatically scales compute and storage based on your workload.", href: "/tidb-cloud/serverless/" },
          { icon: <Code2 className="" strokeWidth={1.5} />, title: "Developer Resources", description: "Access exclusive tutorials, documentation, and sandbox environments to onboard your engineering team quickly.", href: "/docs/" },
          { icon: <Award className="" strokeWidth={1.5} />, title: "Recognition & Awards", description: "Featured opportunities in our startup spotlight and potential inclusion in industry award nominations.", href: "/blog/" }
          ]}
          columns={3}
        />
        <TestimonialsSection
          title="Success Stories"
          testimonials={[
          { quote: "The $100k credits from the TiDB Cloud Startup Program allowed us to scale our user base by 500% without worrying about our infrastructure budget.", author: "CTO, FinTech Unicorn", href: "/customers/", cta: "Read Case Study" },
          { quote: "TiDB Serverless gave us the flexibility to handle massive data spikes during our product launch. The support team was incredibly responsive.", author: "Founder, AI Analytics Startup", href: "/customers/", cta: "Read Case Study" }
          ]}
        />
        <FaqSection
          title="Frequently Asked Questions"
          items={[
          { q: "Who is eligible for the TiDB Cloud Startup Program?", a: "The program is open to early-stage startups (typically Series A or earlier) that are building innovative products on top of TiDB Cloud. You must be using or planning to use TiDB Cloud for your primary database." },
          { q: "How do I receive the $100,000 in credits?", a: "Once your application is approved, the credits will be applied to your TiDB Cloud account. The credits are typically valid for 12 months from the date of approval." },
          { q: "Is there a commitment required?", a: "No. The program is designed to help you grow. While we encourage long-term partnerships, there is no mandatory commitment to stay on TiDB Cloud after the credits are exhausted." },
          { q: "What kind of technical support is included?", a: "Startups get access to a dedicated Slack channel with TiDB engineers, priority ticket handling, and quarterly architecture reviews to ensure your system is optimized for scale." }
          ]}
        />
        <CtaSection
          title="Ready to Launch Your Startup?"
          subtitle="Join hundreds of innovative companies scaling with TiDB Cloud. Apply today and get $100,000 in credits."
          background="violet"
          primaryCta={{ text: "Apply for Credits", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Contact Sales", href: "/contact-us/" }}
        />
      </main>
      <Footer />
    </>
  )
}
