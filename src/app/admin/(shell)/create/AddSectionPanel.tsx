'use client'

import {
  LayoutTemplate,
  BarChart2,
  Grid3X3,
  CreditCard,
  Rows3,
  Sparkles,
  Building2,
  Quote,
  HelpCircle,
  Megaphone,
  FormInput,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SectionNode } from '@/lib/dsl-schema'
import { createSection, getSectionDescription, getSectionLabel } from '@/lib/section-registry'

interface SectionTypeOption {
  type: SectionNode['type']
  Icon: LucideIcon
}

const SECTION_OPTIONS: SectionTypeOption[] = [
  {
    type: 'hero',
    Icon: LayoutTemplate,
  },
  {
    type: 'stats',
    Icon: BarChart2,
  },
  {
    type: 'featureGrid',
    Icon: Grid3X3,
  },
  {
    type: 'featureCard',
    Icon: CreditCard,
  },
  {
    type: 'featureTabs',
    Icon: Rows3,
  },
  {
    type: 'featureHighlights',
    Icon: Sparkles,
  },
  {
    type: 'logoCloud',
    Icon: Building2,
  },
  {
    type: 'testimonials',
    Icon: Quote,
  },
  {
    type: 'faq',
    Icon: HelpCircle,
  },
  {
    type: 'cta',
    Icon: Megaphone,
  },
  {
    type: 'form',
    Icon: FormInput,
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
        {SECTION_OPTIONS.map(({ type, Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              onAdd(createSection(type))
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
              <span className="text-body-sm font-bold text-gray-700">{getSectionLabel(type)}</span>
            </div>
            <p className="text-label text-gray-400 leading-snug">{getSectionDescription(type)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
