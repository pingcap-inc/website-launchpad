'use client'

import { useState } from 'react'
import {
  GripVertical,
  Pencil,
  Bot,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { SectionNode } from '@/lib/dsl-schema'
import { SectionFieldEditor } from './SectionFieldEditor'

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero',
  stats: 'Stats',
  featureGrid: 'Feature Grid',
  featureCard: 'Feature Cards',
  featureTabs: 'Feature Tabs',
  logoCloud: 'Logo Cloud',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  cta: 'CTA',
  form: 'Form',
}

const SECTION_COLORS: Record<string, string> = {
  hero: 'bg-violet-100 text-violet-700',
  stats: 'bg-blue-100 text-blue-700',
  featureGrid: 'bg-emerald-100 text-emerald-700',
  featureCard: 'bg-teal-100 text-teal-700',
  featureTabs: 'bg-cyan-100 text-cyan-700',
  logoCloud: 'bg-orange-100 text-orange-700',
  testimonials: 'bg-yellow-100 text-yellow-700',
  faq: 'bg-pink-100 text-pink-700',
  cta: 'bg-red-100 text-red-700',
  form: 'bg-indigo-100 text-indigo-700',
}

function sectionSummary(node: SectionNode): string {
  switch (node.type) {
    case 'hero':
      return node.headline.slice(0, 60) + (node.headline.length > 60 ? '…' : '')
    case 'stats':
      return `${node.items.length} stats`
    case 'featureGrid':
    case 'featureCard':
      return node.title
    case 'featureTabs':
      return `${node.tabs.length} tabs — ${node.title}`
    case 'logoCloud':
      return `${node.logos.length} logos`
    case 'testimonials':
      return `${node.items.length} testimonials — ${node.title}`
    case 'faq':
      return `${node.items.length} Q&A`
    case 'cta':
      return node.title
    case 'form':
      return node.title ?? 'HubSpot Form'
    default:
      return ''
  }
}

interface SectionCardProps {
  id: string
  node: SectionNode
  slug?: string
  onChange: (updated: SectionNode) => void
  onDelete: () => void
  onRegenerate: (instruction: string) => Promise<void>
}

export function SectionCard({
  id,
  node,
  slug,
  onChange,
  onDelete,
  onRegenerate,
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [regenOpen, setRegenOpen] = useState(false)
  const [regenText, setRegenText] = useState('')
  const [regenerating, setRegenerating] = useState(false)
  const [regenError, setRegenError] = useState('')

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleRegen = async () => {
    setRegenerating(true)
    setRegenError('')
    try {
      await onRegenerate(regenText || 'Improve this section')
      setRegenOpen(false)
      setRegenText('')
    } catch (err) {
      setRegenError(err instanceof Error ? err.message : 'Regeneration failed')
    } finally {
      setRegenerating(false)
    }
  }

  const label = SECTION_LABELS[node.type] ?? node.type
  const badgeClass = SECTION_COLORS[node.type] ?? 'bg-gray-100 text-gray-600'
  const summary = sectionSummary(node)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded bg-white overflow-hidden"
    >
      {/* Card header */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Drag handle */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 shrink-0"
        >
          <GripVertical size={16} />
        </span>

        {/* Badge */}
        <span className={`text-label font-bold px-1.5 py-0.5 rounded shrink-0 ${badgeClass}`}>
          {label}
        </span>

        {/* Summary */}
        <span className="text-body-sm text-gray-500 truncate flex-1">{summary}</span>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            title="Edit"
            onClick={() => setExpanded(!expanded)}
            className={`p-1 rounded transition-colors ${expanded ? 'text-gray-900 bg-gray-100' : 'text-gray-400 hover:text-gray-700'}`}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            type="button"
            title="AI Regenerate"
            onClick={() => setRegenOpen(!regenOpen)}
            className="p-1 rounded text-gray-400 hover:text-brand-violet-medium transition-colors"
          >
            <Bot size={14} />
          </button>
          <button
            type="button"
            title="Delete section"
            onClick={onDelete}
            className="p-1 rounded text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Inline field editor */}
      {expanded && (
        <div className="border-t border-gray-100 px-3 py-3 bg-gray-50 space-y-0">
          <SectionFieldEditor node={node} onChange={onChange} slug={slug} />
        </div>
      )}

      {/* Regenerate prompt */}
      {regenOpen && (
        <div className="border-t border-gray-100 px-3 py-2.5 bg-white space-y-2">
          <p className="text-label font-bold text-gray-600 flex items-center gap-1.5">
            <Bot size={12} /> What to change?
          </p>
          <textarea
            value={regenText}
            onChange={(e) => setRegenText(e.target.value)}
            rows={2}
            placeholder="e.g. Add more detail, change tone to be more technical"
            className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-300"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRegen}
              disabled={regenerating}
              className="flex-1 bg-gray-900 text-white font-bold py-1.5 text-body-sm rounded hover:bg-gray-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
            >
              {regenerating ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Regenerating…
                </>
              ) : (
                '🤖 Regenerate'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setRegenOpen(false)
                setRegenError('')
              }}
              className="px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-gray-900 text-body-sm rounded transition-colors"
            >
              Cancel
            </button>
          </div>
          {regenError && (
            <p className="text-label text-red-500 flex items-center gap-1">
              <AlertCircle size={11} className="shrink-0" /> {regenError}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
