import * as React from 'react'
import Image from 'next/image'
import { Database, Gauge, Layers, Radar, ShieldCheck, Zap } from 'lucide-react'
import { FeatureCard } from '@/components/ui/FeatureCard'

/** Default neutral border — the baseline card used inside a three-up grid. */
export const NeutralGrid = () => (
  <div className="grid grid-cols-3 gap-6">
    <FeatureCard
      icon={<Layers size={32} strokeWidth={1.5} />}
      title="Elastic Scale"
      description="Add capacity online. No sharding logic, no downtime window."
    />
    <FeatureCard
      icon={<Database size={32} strokeWidth={1.5} />}
      title="MySQL Compatible"
      description="Keep your drivers, ORMs, and SQL through the migration."
    />
    <FeatureCard
      icon={<Zap size={32} strokeWidth={1.5} />}
      title="Real-Time HTAP"
      description="Transactions and analytics on one system, with no ETL."
    />
  </div>
)

/** borderColor accents — brand borders differentiate cards in the same grid. */
export const ColorAccentBorders = () => (
  <div className="grid grid-cols-3 gap-6">
    <FeatureCard
      icon={<ShieldCheck size={32} strokeWidth={1.5} />}
      title="Financial Services"
      description="Multi-replica ACID guarantees for ledger and fraud workloads."
      borderColor="border-brand-red-primary"
    />
    <FeatureCard
      icon={<Radar size={32} strokeWidth={1.5} />}
      title="AI Applications"
      description="Vector search alongside the rows your agents already write."
      borderColor="border-brand-violet-medium"
    />
    <FeatureCard
      icon={<Gauge size={32} strokeWidth={1.5} />}
      title="SaaS at Scale"
      description="Grow past a single MySQL instance without a rewrite."
      borderColor="border-brand-teal-medium"
    />
  </div>
)

/** With href and ctaText — the card becomes a link and gains the hover float. */
export const LinkedWithCta = () => (
  <div className="grid grid-cols-2 gap-6">
    <FeatureCard
      icon={<Database size={32} strokeWidth={1.5} />}
      title="Migration Center"
      description="Evaluate compatibility, plan the cutover, and migrate from MySQL safely."
      href="/developers/migration-center/"
      ctaText="Learn more"
      borderColor="border-brand-blue-medium"
    />
    <FeatureCard
      icon={<Zap size={32} strokeWidth={1.5} />}
      title="Build AI Applications"
      description="Ship RAG and agentic apps on vector search backed by live operational data."
      href="/developers/build-ai-apps/"
      ctaText="Learn more"
      borderColor="border-brand-violet-medium"
    />
  </div>
)

/** Illustration icons instead of Lucide glyphs — the pattern used on course cards. */
export const IllustratedIcons = () => (
  <div className="grid grid-cols-2 gap-6">
    <FeatureCard
      icon={
        <Image
          src="https://static.pingcap.com/files/2026/04/14001529/Quick-Start.svg"
          alt=""
          width={90}
          height={60}
          className="object-contain"
        />
      }
      title="Beginner: TiDB Certified Practitioner"
      description="A self-paced path through architecture, HTAP, and zero-downtime operations."
      borderColor="border-brand-red-primary"
    />
    <FeatureCard
      icon={
        <Image
          src="https://static.pingcap.com/files/2026/04/14001528/Build-AI-Applications.svg"
          alt=""
          width={90}
          height={60}
          className="object-contain"
        />
      }
      title="AI: Generative AI Learning Path"
      description="Build retrieval-augmented generation and text-to-SQL on TiDB Cloud."
      borderColor="border-brand-violet-medium"
    />
  </div>
)
