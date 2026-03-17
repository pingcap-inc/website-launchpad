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
import { DollarSign, Zap, Shield, TrendingUp, Cloud, Cpu, Users, Rocket, Lock, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program: $100k Credits & Fast Launch",
  description: "Join the TiDB Cloud Startup Program to launch faster and scale without limits. Get $100,000 in free credits, technical support, and go-to-market resources.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/startup-program/' },
  openGraph: {
    title: "TiDB Cloud Startup Program: $100k Credits & Fast Launch",
    description: "Join the TiDB Cloud Startup Program to launch faster and scale without limits. Get $100,000 in free credits, technical support, and go-to-market resources.",
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
  title: "TiDB Cloud Startup Program: $100k Credits & Fast Launch",
  description: "Join the TiDB Cloud Startup Program to launch faster and scale without limits. Get $100,000 in free credits, technical support, and go-to-market resources.",
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
          subheadline="Join the TiDB Cloud Startup Program and get $100,000 in free credits to build your next generation application on a serverless, distributed SQL database."
          primaryCta={{ text: "Apply Now", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Learn More", href: "/tidb-cloud/" }}
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
          title="Why Startups Choose TiDB Cloud"
          stats={[
          { icon: <DollarSign className="" strokeWidth={1.5} />, value: "$100,000", label: "Free Cloud Credits", description: "Get up to $100k in credits to cover your infrastructure costs for up to 12 months." },
          { icon: <Zap className="" strokeWidth={1.5} />, value: "10x", label: "Faster Time to Market", description: "Eliminate sharding complexity and focus on building features, not database architecture." },
          { icon: <Shield className="" strokeWidth={1.5} />, value: "99.99%", label: "High Availability", description: "Enterprise-grade reliability and automatic failover built into every cluster." },
          { icon: <TrendingUp className="" strokeWidth={1.5} />, value: "Unlimited", label: "Elastic Scale", description: "Scale storage and compute independently to handle sudden traffic spikes instantly." }
          ]}
          columns={4}
        />
        <FeatureGridSection
          eyebrow="Program Benefits"
          title="Everything You Need to Grow"
          subtitle="Our comprehensive startup program provides more than just credits. We offer the technical and business support you need to succeed."
          features={[
          { icon: <Cloud className="" strokeWidth={1.5} />, title: "Massive Cloud Credits", description: "Receive up to $100,000 in TiDB Cloud credits to power your development, staging, and production environments." },
          { icon: <Cpu className="" strokeWidth={1.5} />, title: "Serverless Architecture", description: "Pay only for what you use with our serverless compute. No capacity planning or over-provisioning required." },
          { icon: <Users className="" strokeWidth={1.5} />, title: "Technical Mentorship", description: "Get direct access to TiDB engineers and solution architects to optimize your database performance." },
          { icon: <Rocket className="" strokeWidth={1.5} />, title: "Go-to-Market Support", description: "Leverage our marketing channels, case studies, and co-marketing opportunities to accelerate growth." },
          { icon: <Lock className="" strokeWidth={1.5} />, title: "Enterprise Security", description: "Built-in encryption at rest and in transit, VPC peering, and compliance certifications for secure scaling." },
          { icon: <Database className="" strokeWidth={1.5} />, title: "MySQL Compatibility", description: "Drop-in compatibility with MySQL allows you to migrate existing applications with minimal code changes." }
          ]}
          columns={3}
        />
        <LogoCloudSection
          title="Trusted by Fast-Growing Startups"
          logos={[
          { name: "TechFlow", src: "/images/logos/techflow.svg" },
          { name: "DataScale", src: "/images/logos/datascale.svg" },
          { name: "CloudNative", src: "/images/logos/cloudnative.svg" },
          { name: "FinTechOne", src: "/images/logos/fintechone.svg" },
          { name: "StreamLine", src: "/images/logos/streamline.svg" }
          ]}
          variant="minimal"
          autoScroll={true}
        />
        <TestimonialsSection
          title="What Our Startup Partners Say"
          testimonials={[
          { quote: "The TiDB Cloud Startup Program gave us the confidence to scale globally. The $100k credits covered our entire infrastructure for the first year, and the performance is unmatched.", author: "Sarah Chen, CTO at DataScale", href: "/case-studies/datascale" },
          { quote: "We needed a database that could handle unpredictable traffic spikes without complex sharding. TiDB Cloud's serverless architecture was the perfect fit.", author: "Michael Ross, Founder at StreamLine", href: "/case-studies/streamline" }
          ]}
        />
        <FaqSection
          title="Frequently Asked Questions"
          items={[
          { q: "Who is eligible for the TiDB Cloud Startup Program?", a: "The program is open to early-stage startups that are less than 5 years old, have not raised more than $20M in total funding, and are not a competitor to PingCAP." },
          { q: "How do I apply for the credits?", a: "Simply fill out the application form on this page. Our team will review your application and contact you within 48 hours to verify eligibility and distribute your credits." },
          { q: "Can I use the credits for production workloads?", a: "Yes, the credits can be used for any TiDB Cloud service, including production environments, as long as you adhere to the program terms and conditions." },
          { q: "Is there a limit to how much I can spend?", a: "The credits are capped at $100,000. Once the credits are exhausted or the 12-month period ends, you will be billed according to standard TiDB Cloud pricing." }
          ]}
        />
        <CtaSection
          title="Ready to Scale Your Startup?"
          subtitle="Join the TiDB Cloud Startup Program today and get $100,000 in credits to build your future."
          background="violet"
          primaryCta={{ text: "Apply for Credits", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Contact Sales", href: "/contact-us/" }}
        />
      </main>
      <Footer />
    </>
  )
}
