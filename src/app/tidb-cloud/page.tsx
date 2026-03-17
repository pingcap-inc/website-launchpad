import type { Metadata } from 'next'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'
import { LogoCloudSection } from '@/components/sections/LogoCloudSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { HubSpotForm } from '@/components/ui/HubSpotForm'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { DollarSign, Rocket, Gauge, Shield, Cloud, Database, Globe, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program: Get $100k Credits",
  description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Apply today to receive $100,000 in free cloud credits for your database needs.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/startup-program/' },
  openGraph: {
    title: "TiDB Cloud Startup Program: Get $100k Credits",
    description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Apply today to receive $100,000 in free cloud credits for your database needs.",
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
  title: "TiDB Cloud Startup Program: Get $100k Credits",
  description: "Join the TiDB Cloud Startup Program to launch fast and scale without limits. Apply today to receive $100,000 in free cloud credits for your database needs.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Launch Fast. Scale <span class=\"text-gradient-violet\">without Limits</span>.", path: "/tidb-cloud/startup-program/" },
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
          headline={"Launch Fast. Scale <span class=\"text-gradient-violet\">without Limits</span>."}
          subheadline="Get $100,000 in TiDB Cloud credits to build your next generation application on the world's most advanced open-source distributed database."
          primaryCta={{ text: "Apply Now", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Learn More", href: "/tidb-cloud/startup-program/" }}
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
          title="Why Join the Program?"
          stats={[
          { icon: <DollarSign className="" strokeWidth={1.5} />, value: "$100,000", label: "In Cloud Credits", description: "Free credits to power your development and production workloads." },
          { icon: <Rocket className="" strokeWidth={1.5} />, value: "99.99%", label: "Uptime SLA", description: "Enterprise-grade reliability without the enterprise price tag." },
          { icon: <Gauge className="" strokeWidth={1.5} />, value: "10x", label: "Faster Scaling", description: "Instantly scale storage and compute as your user base grows." },
          { icon: <Shield className="" strokeWidth={1.5} />, value: "Free", label: "Security & Compliance", description: "Built-in encryption, audit logs, and compliance certifications." }
          ]}
          columns={4}
        />
        <FeatureGridSection
          eyebrow="Program Benefits"
          title="Everything You Need to Succeed"
          subtitle="Our startup program provides more than just credits. We give you the tools and support to win."
          features={[
          { icon: <Cloud className="" strokeWidth={1.5} />, title: "Serverless Architecture", description: "Separate storage and compute to optimize costs and handle unpredictable traffic spikes effortlessly.", cta: { text: "Explore Serverless", href: "/tidb-cloud/serverless/" } },
          { icon: <Database className="" strokeWidth={1.5} />, title: "MySQL Compatible", description: "Drop-in compatibility with MySQL means you can migrate your existing apps with zero code changes.", cta: { text: "See Compatibility", href: "/features/mysql-compatibility/" } },
          { icon: <Globe className="" strokeWidth={1.5} />, title: "Global Distribution", description: "Deploy across multiple regions with a single click to serve your users with low latency worldwide.", cta: { text: "View Regions", href: "/tidb-cloud/regions/" } },
          { icon: <Cpu className="" strokeWidth={1.5} />, title: "HTAP Capabilities", description: "Run real-time analytics and transactional workloads on the same data without complex ETL pipelines.", cta: { text: "Learn HTAP", href: "/features/htap/" } }
          ]}
          columns={2}
        />
        <LogoCloudSection
          title="Trusted by High-Growth Startups"
          logos={[
          { name: "TechFlow", src: "/images/logos/techflow.svg" },
          { name: "DataScale", src: "/images/logos/datascale.svg" },
          { name: "CloudNative", src: "/images/logos/cloudnative.svg" },
          { name: "FinTechX", src: "/images/logos/fintechx.svg" },
          { name: "GameStream", src: "/images/logos/gamestream.svg" }
          ]}
          variant="minimal"
          autoScroll={true}
        />
        <TestimonialsSection
          title="What Founders Say"
          testimonials={[
          { quote: "The $100k credits from the TiDB Cloud Startup Program allowed us to scale our user base from 10k to 1M without worrying about database costs or performance bottlenecks.", author: "Sarah Chen, CTO at DataScale", href: "/customers/datascale" },
          { quote: "Migrating to TiDB Cloud was seamless. The serverless architecture means we only pay for what we use, which is perfect for our variable traffic patterns.", author: "Marcus Johnson, Founder at TechFlow", href: "/customers/techflow" }
          ]}
        />
        <FaqSection
          title="Frequently Asked Questions"
          items={[
          { q: "Who is eligible for the TiDB Cloud Startup Program?", a: "The program is open to early-stage startups, typically those that are less than 5 years old, have less than $10M in funding, and are building cloud-native applications." },
          { q: "How long are the credits valid?", a: "Credits are typically valid for 12 months from the date of approval, giving you ample time to grow your infrastructure." },
          { q: "Do I need to provide financial information to apply?", a: "No, we do not require financial statements for the initial application. We focus on your product, team, and growth potential." },
          { q: "Can I use the credits on the Serverless tier?", a: "Yes, the credits apply to all TiDB Cloud Serverless and Dedicated tiers, allowing you to choose the architecture that best fits your needs." }
          ]}
        />
        <CtaSection
          title="Ready to Scale Your Startup?"
          subtitle="Join the TiDB Cloud Startup Program today and unlock $100,000 in credits to power your growth."
          background="violet"
          primaryCta={{ text: "Apply for Credits", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Contact Sales", href: "/contact-sales/" }}
        />
      </main>
      <Footer />
    </>
  )
}
