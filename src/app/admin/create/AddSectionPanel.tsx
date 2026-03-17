'use client'

import {
  LayoutTemplate,
  BarChart2,
  Grid3X3,
  CreditCard,
  Rows3,
  Building2,
  Quote,
  HelpCircle,
  Megaphone,
  FormInput,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SectionNode } from '@/lib/dsl-schema'

interface SectionTypeOption {
  type: SectionNode['type']
  label: string
  description: string
  Icon: LucideIcon
  defaultNode: () => SectionNode
}

const SECTION_OPTIONS: SectionTypeOption[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Full-width hero with headline and CTAs',
    Icon: LayoutTemplate,
    defaultNode: () => ({
      type: 'hero',
      layout: 'image-right',
      headline: 'New Hero Section',
      heroImage: { src: '/images/hero/r/Graphic-1-Dk.png', width: 800, height: 500 },
    }),
  },
  {
    type: 'stats',
    label: 'Stats',
    description: 'Key metrics with CountUp animation',
    Icon: BarChart2,
    defaultNode: () => ({
      type: 'stats',
      title: 'Key Metrics',
      items: [
        { value: '99.99%', label: 'Uptime SLA' },
        { value: '10x', label: 'Faster Queries' },
        { value: '5M+', label: 'Users Served' },
      ],
    }),
  },
  {
    type: 'featureGrid',
    label: 'Feature Grid',
    description: 'Grid of features with icons',
    Icon: Grid3X3,
    defaultNode: () => ({
      type: 'featureGrid',
      title: 'Key Features',
      items: [
        { icon: 'Zap', title: 'Feature One', description: 'Description of this feature.' },
        { icon: 'Shield', title: 'Feature Two', description: 'Description of this feature.' },
        { icon: 'Globe', title: 'Feature Three', description: 'Description of this feature.' },
      ],
      columns: 3,
    }),
  },
  {
    type: 'featureCard',
    label: 'Feature Cards',
    description: 'Bordered cards in a grid layout',
    Icon: CreditCard,
    defaultNode: () => ({
      type: 'featureCard',
      title: 'Use Cases',
      items: [
        { icon: 'Database', title: 'Use Case One', description: 'Description.' },
        { icon: 'Cloud', title: 'Use Case Two', description: 'Description.' },
      ],
      columns: 2,
    }),
  },
  {
    type: 'featureTabs',
    label: 'Feature Tabs',
    description: 'Tabbed feature showcase with images',
    Icon: Rows3,
    defaultNode: () => ({
      type: 'featureTabs',
      title: 'Explore Features',
      tabs: [
        {
          id: 'tab-1',
          label: 'Tab One',
          description: 'Description for tab one.',
          image: { src: '/images/hero/r/Graphic-1-Dk.png', alt: 'Tab 1', width: 1200, height: 800 },
        },
        {
          id: 'tab-2',
          label: 'Tab Two',
          description: 'Description for tab two.',
          image: { src: '/images/hero/r/Graphic-2-Dk.png', alt: 'Tab 2', width: 1200, height: 800 },
        },
      ],
      autoSwitch: true,
      autoSwitchInterval: 6000,
    }),
  },
  {
    type: 'logoCloud',
    label: 'Logo Cloud',
    description: 'Customer or partner logos',
    Icon: Building2,
    defaultNode: () => ({
      type: 'logoCloud',
      title: 'Trusted by Leading Companies',
      logos: [],
      variant: 'default',
      autoScroll: true,
    }),
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Customer quotes and stories',
    Icon: Quote,
    defaultNode: () => ({
      type: 'testimonials',
      title: 'What Our Customers Say',
      items: [{ quote: 'Quote here.', author: 'Name, Company' }],
    }),
  },
  {
    type: 'faq',
    label: 'FAQ',
    description: 'Accordion Q&A section',
    Icon: HelpCircle,
    defaultNode: () => ({
      type: 'faq',
      title: 'Frequently Asked Questions',
      items: [
        { q: 'Question one?', a: 'Answer one.' },
        { q: 'Question two?', a: 'Answer two.' },
      ],
    }),
  },
  {
    type: 'cta',
    label: 'CTA',
    description: 'Call-to-action banner section',
    Icon: Megaphone,
    defaultNode: () => ({
      type: 'cta',
      title: 'Get Started Today',
      subtitle: 'Join thousands of teams building with TiDB.',
      background: 'red',
      primaryCta: { text: 'Start for free', href: '/tidbcloud/trial/' },
    }),
  },
  {
    type: 'form',
    label: 'Form',
    description: 'HubSpot form embed',
    Icon: FormInput,
    defaultNode: () => ({
      type: 'form',
      title: 'Get in Touch',
      portalId: '4466002',
      formId: 'YOUR_FORM_ID',
    }),
  },
]

interface AddSectionPanelProps {
  onAdd: (node: SectionNode) => void
  onClose: () => void
}

export function AddSectionPanel({ onAdd, onClose }: AddSectionPanelProps) {
  return (
    <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="text-body-sm font-bold text-gray-700">Add Section</span>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <div className="p-2 grid grid-cols-2 gap-1.5">
        {SECTION_OPTIONS.map(({ type, label, description, Icon, defaultNode }) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              onAdd(defaultNode())
              onClose()
            }}
            className="text-left border border-gray-100 rounded p-2.5 hover:border-gray-300 hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon
                size={14}
                strokeWidth={1.5}
                className="text-gray-500 group-hover:text-gray-700 shrink-0"
              />
              <span className="text-body-sm font-bold text-gray-700">{label}</span>
            </div>
            <p className="text-label text-gray-400 leading-snug">{description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
