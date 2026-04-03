'use client'

import {
  Megaphone,
  CalendarDays,
  Sparkles,
  BarChart2,
  List,
  BookOpen,
  Columns2,
} from 'lucide-react'
import type { PageTemplate } from '@/lib/admin/page-templates'
import { PAGE_TEMPLATES } from '@/lib/admin/page-templates'

const TEMPLATE_ICONS: Record<string, React.ReactNode> = {
  'campaign-landing': <Megaphone size={18} strokeWidth={1.5} />,
  'event-signup': <CalendarDays size={18} strokeWidth={1.5} />,
  'program-announcement': <Sparkles size={18} strokeWidth={1.5} />,
  'battle-card': <BarChart2 size={18} strokeWidth={1.5} />,
  listicle: <List size={18} strokeWidth={1.5} />,
  playbook: <BookOpen size={18} strokeWidth={1.5} />,
  compare: <Columns2 size={18} strokeWidth={1.5} />,
}

export function TemplateSelector({ onSelect }: { onSelect: (template: PageTemplate) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-body-sm text-gray-500">Pick a template to get started</p>
      <div className="grid grid-cols-2 gap-3">
        {PAGE_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template)}
            className="flex flex-col gap-2 p-4 bg-white border border-gray-200 rounded hover:border-gray-400 transition-colors cursor-pointer text-left w-full"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{TEMPLATE_ICONS[template.id]}</span>
              <span className="text-body-sm font-bold text-gray-900">{template.label}</span>
            </div>
            <p className="text-label text-gray-500">{template.description}</p>
            <div className="flex flex-wrap gap-1 mt-auto">
              {template.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
