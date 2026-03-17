import type { Metadata } from 'next'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'
import { FeatureCardSection } from '@/components/sections/FeatureCardSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { HubSpotForm } from '@/components/ui/HubSpotForm'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { DollarSign, Users, Network, Zap, Scale, Shield, FileCode, CheckCircle, Rocket, TrendingUp, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program | Free $100K Credits",
  description: "Launch your startup fast with $100,000 in TiDB Cloud credits. Scale without limits. Join the TiDB Cloud Startup Program today.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/startup-program/' },
  openGraph: {
    title: "TiDB Cloud Startup Program | Free $100K Credits",
    description: "Launch your startup fast with $100,000 in TiDB Cloud credits. Scale without limits. Join the TiDB Cloud Startup Program today.",
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
  title: "TiDB Cloud Startup Program | Free $100K Credits",
  description: "Launch your startup fast with $100,000 in TiDB Cloud credits. Scale without limits. Join the TiDB Cloud Startup Program today.",
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
          subheadline="Get $100,000 in TiDB Cloud credits to power your startup's growth. Build the database layer your application deserves."
          secondaryCta={{ text: "Learn More", href: "#benefits" }}
          heroImage={{ src: "/images/hero/r/Graphic-3-Dk.png", alt: "", width: 800, height: 500 }}
          rightSlot={
            <HubSpotForm
              formId="8d439c40-4e6b-4192-a99b-a2c619ad4146"
              portalId="4466002"
              region="na1"
            />
          }
        />
        <FeatureGridSection
          eyebrow="Program Benefits"
          title="Everything You Need to Scale"
          subtitle="From day one to series C, we've got you covered."
          features={[
          { icon: <DollarSign className="" strokeWidth={1.5} />, title: "$100,000 in Credits", description: "Use across TiDB Cloud resources for 12 months. Perfect for development, testing, and production workloads.", cta: { text: "View Pricing", href: "/tidb-cloud/pricing/" } },
          { icon: <Users className="" strokeWidth={1.5} />, title: "Dedicated Support", description: "Direct access to our startup success team. Priority support to help you move fast and solve problems quickly.", cta: { text: "Contact Support", href: "mailto:startup@pingcap.com" } },
          { icon: <Network className="" strokeWidth={1.5} />, title: "Founder Community", description: "Connect with other startup founders using TiDB. Share experiences, best practices, and growth strategies.", cta: { text: "Join Community", href: "https://slack.tidb.io" } },
          { icon: <Zap className="" strokeWidth={1.5} />, title: "Technical Resources", description: "Workshops, webinars, and documentation to help your team get up to speed quickly and build efficiently.", cta: { text: "Explore Docs", href: "https://docs.pingcap.com/tidbcloud/get-started" } },
          { icon: <Scale className="" strokeWidth={1.5} />, title: "Scale on Your Terms", description: "Start small and grow. Auto-scaling capabilities ensure your database grows with your traffic and data.", cta: { text: "Learn About Scaling", href: "/tidb-cloud/features/" } },
          { icon: <Shield className="" strokeWidth={1.5} />, title: "Enterprise Security", description: "Grade-A security features at startup-friendly prices. HIPAA, SOC2, and compliance ready from day one.", cta: { text: "Security Info", href: "/tidb-cloud/security/" } }
          ]}
          columns={3}
        />
        <FeatureCardSection
          eyebrow="How It Works"
          title="Three Steps to $100K Credits"
          items={[
          { icon: <FileCode className="" strokeWidth={1.5} />, title: "Apply", description: "Tell us about your startup. Share your vision, team, and current stage. Applications reviewed within 5 business days." },
          { icon: <CheckCircle className="" strokeWidth={1.5} />, title: "Get Approved", description: "Once approved, receive your $100,000 credit voucher via email. Start using TiDB Cloud immediately." },
          { icon: <Rocket className="" strokeWidth={1.5} />, title: "Build & Scale", description: "Deploy your database, build your application, and scale without worry. We're here to support your success." }
          ]}
          columns={3}
        />
        <StatsSection
          stats={[
          { icon: /* eslint-disable-next-line @next/next/no-img-element */ <img src="https://static.pingcap.com/files/2025/09/03234615/data.svg" alt="" className="object-contain" />, value: "$100K", label: "TiDB Cloud Credits", description: "12 months of free database resources" },
          { icon: <Rocket className="" strokeWidth={1.5} />, value: "500+", label: "Startups Joined", description: "Building the next generation of apps" },
          { icon: <TrendingUp className="" strokeWidth={1.5} />, value: "10x", label: "Faster Scaling", description: "Compared to traditional databases" },
          { icon: <Clock className="" strokeWidth={1.5} />, value: "0", label: "Setup Time", description: "Deploy in minutes, not weeks" }
          ]}
          columns={4}
        />
        <FaqSection
          title="Frequently Asked Questions"
          items={[
          { q: "Who is eligible for the TiDB Cloud Startup Program?", a: "Early-stage startups (typically pre-Series B) that are building with databases. Your company should be less than 5 years old and not a subsidiary of a larger enterprise." },
          { q: "How long are the $100,000 credits valid?", a: "Credits are valid for 12 months from the date of approval. Unused credits expire after 12 months." },
          { q: "Can I use the credits for multiple clusters?", a: "Yes, you can distribute your credits across multiple clusters and environments for development, testing, and production." },
          { q: "What happens after my 12 months of credits expire?", a: "We offer startup pricing rates well beyond your initial credit period. Many of our startups find our ongoing pricing very affordable as they grow." },
          { q: "Do the credits include technical support?", a: "Yes, all startup program participants receive priority support and access to our dedicated startup success team." },
          { q: "Can I transfer my credits to another company?", a: "Credits are non-transferable and tied to the company that applied. They cannot be sold or exchanged for cash." }
          ]}
        />
        <TestimonialsSection
          title="Trusted by Leading Startups"
          testimonials={[
          { quote: "TiDB Cloud credits helped us avoid massive infrastructure costs in our first year. We scaled from 0 to millions of events per day without worrying about the database layer.", author: "Sarah Chen, Co-founder & CTO, DataFlow Labs" },
          { quote: "The startup program's support team was invaluable. They helped us optimize queries and architecture decisions that saved us time and money.", author: "Marcus Johnson, Founder, CloudMetrics AI" },
          { quote: "We needed a database that could handle our rapid growth. TiDB Cloud's automatic scaling and the startup credits made it a no-brainer.", author: "Priya Patel, VP Engineering, NextGen Commerce" }
          ]}
        />
        <CtaSection
          title="Ready to Scale Your Startup?"
          subtitle="Join 500+ startups building with TiDB Cloud. Get your $100,000 in credits today."
          background="violet"
          primaryCta={{ text: "Apply Now", href: "/tidbcloud/trial/" }}
          secondaryCta={{ text: "Questions? Contact Us", href: "mailto:startup@pingcap.com" }}
        />
      </main>
      <Footer />
    </>
  )
}
