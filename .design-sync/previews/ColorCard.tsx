import * as React from 'react'
import { Boxes, GraduationCap, Rocket, Sparkles, Workflow } from 'lucide-react'
import { ColorCard } from '@/components/ui/ColorCard'

/** The full colour axis — red, violet, blue, and teal in one row. */
export const AllFourVariants = () => (
  <div className="grid grid-cols-4 gap-4">
    <ColorCard
      variant="red"
      icon={<Rocket size={40} strokeWidth={1.5} />}
      title="Get Started"
      description="Run your first TiDB cluster in minutes."
    />
    <ColorCard
      variant="violet"
      icon={<Boxes size={40} strokeWidth={1.5} />}
      title="Build Data Apps"
      description="Model data and run mixed workloads in one system."
    />
    <ColorCard
      variant="blue"
      icon={<Sparkles size={40} strokeWidth={1.5} />}
      title="Build AI Apps"
      description="Vector search and RAG on live operational data."
    />
    <ColorCard
      variant="teal"
      icon={<Workflow size={40} strokeWidth={1.5} />}
      title="Migration Center"
      description="Plan and execute a safe move off MySQL."
    />
  </div>
)

/** With a cta — the whole card becomes a link and gains the hover float. */
export const WithCtaLinks = () => (
  <div className="grid grid-cols-2 gap-4">
    <ColorCard
      variant="red"
      icon={<GraduationCap size={40} strokeWidth={1.5} />}
      title="Learn by Course"
      description="Self-paced paths through TiDB architecture, HTAP, and operations, ending in a free certification exam."
      cta={{ text: 'Explore', href: '/developers/learn/' }}
    />
    <ColorCard
      variant="teal"
      icon={<Workflow size={40} strokeWidth={1.5} />}
      title="Learn by Doing"
      description="Hands-on labs that let you validate assumptions and benchmark performance against a live cluster."
      cta={{ text: 'Explore', href: '/developers/get-started/' }}
    />
  </div>
)

/** A single featured card — used when one path deserves more weight than the rest. */
export const SingleFeatured = () => (
  <div className="max-w-md">
    <ColorCard
      variant="violet"
      icon={<Sparkles size={40} strokeWidth={1.5} />}
      title="Build AI Applications"
      description="Ship retrieval-augmented generation, semantic search, and agentic workflows on vector indexes that sit next to the rows your application already writes."
      cta={{ text: 'Start Building', href: '/developers/build-ai-apps/' }}
    />
  </div>
)
