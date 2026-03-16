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
import { BarChart, Globe, Shield, Database, Cloud, Zap, Activity, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: "TiDB Cloud Free Trial – Start Building Today",
  description: "Try TiDB Cloud free for 30 days. No credit card required. Experience the distributed SQL database trusted by enterprises worldwide.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/trial/' },
  openGraph: {
    title: "TiDB Cloud Free Trial – Start Building Today",
    description: "Try TiDB Cloud free for 30 days. No credit card required. Experience the distributed SQL database trusted by enterprises worldwide.",
    url: 'https://www.pingcap.com/tidb-cloud/trial/',
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
  path: "/tidb-cloud/trial/",
  title: "TiDB Cloud Free Trial – Start Building Today",
  description: "Try TiDB Cloud free for 30 days. No credit card required. Experience the distributed SQL database trusted by enterprises worldwide.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Build Faster with TiDB Cloud", path: "/tidb-cloud/trial/" },
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
          eyebrow="Get Started in Minutes"
          headline="Build Faster with TiDB Cloud"
          headlineClassName="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent"
          subheadline="Experience the power of a distributed SQL database with automatic scaling, built-in resilience, and enterprise-grade performance. Start your free trial today."
          rightSlot={
            <HubSpotForm
              formId="a9f3e8c2-4b1d-4e9a-8f2c-1a3d5b7c9e1f"
              portalId="4466002"
              region="na1"
            />
          }
        />
        <StatsSection
          title="Why Thousands of Companies Choose TiDB"
          stats={[
          { icon: /* eslint-disable-next-line @next/next/no-img-element */ <img src="https://static.pingcap.com/files/2026/01/21011757/bring-your-stack-1.svg" alt="" className="w-full h-full object-contain" />, value: "99.99%", label: "Uptime SLA", description: "Enterprise-grade reliability you can count on" },
          { icon: <BarChart className="" strokeWidth={1.5} />, value: "10x", label: "Faster Scaling", description: "Auto-scale compute and storage independently" },
          { icon: <Globe className="" strokeWidth={1.5} />, value: "150+", label: "Countries", description: "Trusted globally by leading organizations" },
          { icon: <Shield className="" strokeWidth={1.5} />, value: "$0", label: "Setup Cost", description: "Free tier includes everything you need to start" }
          ]}
          columns={4}
        />
        <FeatureGridSection
          eyebrow="Powerful Features"
          title="Everything You Need to Scale"
          subtitle="Built for modern applications that demand reliability, performance, and simplicity"
          features={[
          { icon: <Database className="" strokeWidth={1.5} />, title: "Distributed SQL", description: "ACID transactions across distributed data with zero compromises", href: "/products/tidbcloud/" },
          { icon: <Cloud className="" strokeWidth={1.5} />, title: "Multi-Cloud Deployment", description: "Deploy on AWS, Google Cloud, or Azure with a single click", href: "/products/tidbcloud/" },
          { icon: <Zap className="" strokeWidth={1.5} />, title: "Automatic Scaling", description: "Scale compute and storage independently based on demand", href: "/products/tidbcloud/" },
          { icon: <Shield className="" strokeWidth={1.5} />, title: "Enterprise Security", description: "End-to-end encryption, role-based access, and compliance certifications", href: "/products/tidbcloud/" },
          { icon: <Activity className="" strokeWidth={1.5} />, title: "Real-Time Analytics", description: "Analyze operational data in real-time without ETL complexity", href: "/products/tidbcloud/" },
          { icon: <Layers className="" strokeWidth={1.5} />, title: "Native MySQL Compatibility", description: "Drop-in replacement for MySQL with enhanced capabilities", href: "/products/tidbcloud/" }
          ]}
          columns={3}
        />
        <FaqSection
          title="Common Questions About TiDB Cloud"
          items={[
          { q: "What's included in the free trial?", a: "Your free trial includes 30 days of full access to TiDB Cloud with up to 1 TB of storage, 2 vCPUs for the default cluster, and all enterprise features. No credit card is required to start." },
          { q: "Do I need a credit card to sign up?", a: "No credit card is required for your free trial. You can explore all features at no cost. You'll only be charged if you upgrade to a paid plan after your trial ends." },
          { q: "How long does it take to get started?", a: "You can have a fully functional TiDB Cloud cluster running in minutes. Simply sign up, create a cluster, and connect your applications using standard MySQL tools and drivers." },
          { q: "Can I scale my cluster during the trial?", a: "Yes, you can adjust compute and storage resources at any time during your trial. Changes take effect immediately, allowing you to test TiDB Cloud under realistic workloads." },
          { q: "What happens when my trial ends?", a: "You'll receive a reminder email before your trial expires. You can then choose to upgrade to a paid plan or export your data. Your cluster will not be deleted without your consent." },
          { q: "Is there technical support during the trial?", a: "Yes, you get access to our support team during your trial. We also provide comprehensive documentation, tutorials, and a vibrant community forum." }
          ]}
        />
        <TestimonialsSection
          title="Trusted by Industry Leaders"
          testimonials={[
          { quote: "TiDB Cloud simplified our infrastructure. We eliminated ETL complexity and reduced operational overhead by 60%.", author: "CTO, Fortune 500 Fintech" },
          { quote: "With TiDB's distributed architecture, we scaled to handle 10x traffic growth without any downtime.", author: "Engineering Lead, Global E-Commerce Platform" },
          { quote: "The MySQL compatibility was a game-changer. We migrated in weeks instead of months.", author: "Database Architect, Healthcare Analytics" }
          ]}
        />
        <LogoCloudSection
          title="Businesses of all sizes run on TiDB Cloud"
          logos={[
          { name: "Shopee", src: "/images/logos/shopee.svg" },
          { name: "Grab", src: "/images/logos/grab.svg" },
          { name: "Delivery Hero", src: "/images/logos/delivery-hero.svg" },
          { name: "Trip.com", src: "/images/logos/trip-com.svg" }
          ]}
          variant="default"
          autoScroll={true}
        />
        <CtaSection
          title="Ready to Transform Your Database Infrastructure?"
          subtitle="Join thousands of companies already building faster with TiDB Cloud. Start your free trial today—no credit card required."
          background="blue"
          primaryCta={{ text: "Start Free Trial", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "View Pricing", href: "/tidbcloud/pricing/" }}
        />
      </main>
      <Footer />
    </>
  )
}
