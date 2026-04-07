'use client'

import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Loader2,
  AlertCircle,
  Plus,
  CheckCircle2,
  Sparkles,
  Monitor,
  Smartphone,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  TriangleAlert,
  X,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import type { PageDSL, SectionNode } from '@/lib/dsl-schema'
import type { PageTemplate } from '@/lib/admin/page-templates'
import type { ImportPageType, PageType } from '@/lib/admin/page-types'
import { IMPORT_PAGE_TYPES, PAGE_TYPES, PAGE_TYPE_LABELS } from '@/lib/admin/page-types'
import { TemplateSelector } from '@/components/admin/TemplateSelector'
import { ImportInput } from '@/components/admin/ImportInput'
import { normalizeDSL } from '@/lib/dsl-utils'
import { detectPageType } from '@/lib/detect-page-type'
import { addTableOfContentsForLongForm } from '@/lib/toc'
import { SectionCard } from './SectionCard'
import { AddSectionPanel } from './AddSectionPanel'
import { PublishDrawer } from './PublishDrawer'

const QUICK_PROMPTS = [
  {
    label: 'TiDB Cloud Startup Program',
    prompt: `Create a TiDB Cloud Startup Program landing page.

Headline: Launch Fast. Scale without Limits. Get $100,000 in TiDB Cloud Credits.
Subheadline: Apply now and start building with the distributed SQL database that grows with you—from MVP to millions of users.

The page should:
- Hero section with a form (HubSpot portalId: 4466002, formId: 8d439c40-4e6b-4192-a99b-a2c619ad4146)
- Highlight key benefits: $100K credits, serverless scalability, no upfront cost, enterprise support
- Testimonials section
- FAQ section
- CTA section`,
  },
]

function getPageTypeLabel(pageType: PageType): string {
  return PAGE_TYPE_LABELS[pageType] ?? pageType
}
const DRAFT_BRANCH = 'drafts/ai'
const GOOGLE_DOC_REGEX = /https?:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/

const IMPORT_MAX_CHARS = 6000
const LONG_FORM_IMPORT_MAX_CHARS = 20000

function stripBase64Images(text: string): string {
  return (
    text
      // Drop inline base64 images (Markdown or HTML). Keep linked images.
      .replace(/!\[[^\]]*]\(\s*data:image\/[^)\s]+[^)]*\)/gi, '')
      .replace(/<img[^>]+src=["']\s*data:image\/[^"']+["'][^>]*>/gi, '')
      // Drop reference-style base64 image definitions (with or without <>)
      .replace(/^\s*\[[^\]]+]\s*:\s*<?\s*data:image\/\S+.*>?$/gim, '')
      // Drop any remaining inline base64 image tokens
      .replace(/<\s*data:image[\s\S]*?>/gi, '')
      .replace(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g, '')
  )
}

/** Sanitize imported document content to avoid JSON serialization issues and excessive length.
 *  For long-form page types (listicle, playbook, compare), skip truncation. */
function sanitizeImportedContent(
  text: string,
  options?: { isLongForm?: boolean; maxChars?: number }
): string {
  const { isLongForm = false, maxChars = IMPORT_MAX_CHARS } = options ?? {}
  const cleaned = stripBase64Images(text)
    // Normalize line endings
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove null bytes and control characters (keep newline \n and tab \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Collapse 3+ consecutive newlines to 2
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Final guard: drop any lines that still contain base64 image payloads.
  const cleanedLines = cleaned
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      if (!/data:image\//i.test(trimmed)) return true
      return !(
        /^data:image\//i.test(trimmed) ||
        /^!\[[^\]]*]\(\s*data:image/i.test(trimmed) ||
        /^<img[^>]+src=["']\s*data:image/i.test(trimmed) ||
        /^\[[^\]]+]\s*:\s*<?\s*data:image/i.test(trimmed)
      )
    })
    .join('\n')

  // Long-form content (listicle, playbook, compare) — do not truncate
  if (isLongForm || cleanedLines.length <= maxChars) return cleanedLines

  return (
    cleanedLines.substring(0, maxChars) +
    '\n\n[Content truncated to first ~6000 characters for processing. Edit above to include the most relevant sections.]'
  )
}

// ── Draft save helpers ───────────────────────────────────────────────────────

function localDraftKey(slug: string) {
  return `admin-draft-${slug || 'untitled'}`
}

function saveToLocalStorage(slug: string, dsl: PageDSL) {
  try {
    localStorage.setItem(localDraftKey(slug), JSON.stringify(dsl))
  } catch {
    /* ignore */
  }
}

function loadFromLocalStorage(slug: string): PageDSL | null {
  try {
    const raw = localStorage.getItem(localDraftKey(slug))
    return raw ? normalizeDSL(JSON.parse(raw) as PageDSL) : null
  } catch {
    return null
  }
}

function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  if (segments.length === 0) return false
  return segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

function normalizeSlugInput(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-/]/g, '')
    .replace(/\/{2,}/g, '/')
    .replace(/^\/|\/$/g, '')
}

function extractGoogleDocUrl(input: string) {
  const match = input.match(GOOGLE_DOC_REGEX)
  return match?.[0] ?? null
}

function extractGoogleDocId(input: string) {
  const match = input.match(GOOGLE_DOC_REGEX)
  return match?.[1] ?? null
}

function buildTitleFromLine(line: string) {
  const words = line.split(/\s+/).filter(Boolean)
  return words.slice(0, 6).join(' ')
}

function splitTitleAndDescription(line: string) {
  const normalized = line.replace(/^[-*•\\d.\\s]+/, '').trim()
  if (!normalized) return { title: 'Highlight', description: '' }
  if (normalized.includes(':')) {
    const [title, ...rest] = normalized.split(':')
    return { title: title.trim(), description: rest.join(':').trim() }
  }
  const words = normalized.split(/\s+/)
  const title = words.slice(0, 6).join(' ')
  const description = words.slice(6).join(' ')
  return { title, description: description || normalized }
}

function parseTextToDsl(text: string, slug?: string): PageDSL {
  const lines = text
    .split(/\\r?\\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const headline = lines[0] ?? 'Imported page'
  const subheadline = lines[1] ?? 'Standardized from imported content.'

  const featureHeadingIndex = lines.findIndex((line) =>
    /^(features|benefits|highlights|use cases)$/i.test(line.replace(/:$/, ''))
  )
  const faqHeadingIndex = lines.findIndex((line) => /^faqs?$/i.test(line.replace(/:$/, '')))
  const ctaHeadingIndex = lines.findIndex((line) =>
    /^(cta|call to action|next steps)$/i.test(line.replace(/:$/, ''))
  )

  const headingIndexes = [featureHeadingIndex, faqHeadingIndex, ctaHeadingIndex]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)

  const nextHeadingAfter = (start: number) =>
    headingIndexes.find((index) => index > start) ?? lines.length

  const featureLines =
    featureHeadingIndex >= 0
      ? lines.slice(featureHeadingIndex + 1, nextHeadingAfter(featureHeadingIndex))
      : lines.slice(2, 10)

  const bullets = featureLines.filter(
    (line) => /^[-*•]\\s+/.test(line) || /^\\d+\\.\\s+/.test(line)
  )
  const featureSource = bullets.length >= 2 ? bullets : featureLines
  const items = featureSource.slice(0, 6).map((line) => {
    const { title, description } = splitTitleAndDescription(line)
    return {
      title: title || 'Highlight',
      description: description || 'Details to be refined.',
    }
  })

  const faqLines =
    faqHeadingIndex >= 0 ? lines.slice(faqHeadingIndex + 1, nextHeadingAfter(faqHeadingIndex)) : []
  const faqItems: { q: string; a: string }[] = []
  for (let i = 0; i < faqLines.length; i += 1) {
    const line = faqLines[i]
    if (line.endsWith('?')) {
      const answer = faqLines[i + 1] ?? ''
      faqItems.push({ q: line, a: answer })
    }
  }

  const ctaLines =
    ctaHeadingIndex >= 0 ? lines.slice(ctaHeadingIndex + 1, nextHeadingAfter(ctaHeadingIndex)) : []
  const ctaLine =
    ctaLines[0] ||
    lines.find((line) => /call to action|cta|get started|contact|sign up/i.test(line))
  const ctaTitle = ctaLine ? buildTitleFromLine(ctaLine) : 'Ready to take the next step?'
  const ctaSubtitle =
    ctaLines[1] || (lines[lines.length - 1] && lines.length > 2 ? lines[lines.length - 1] : '')

  const canonical = `/${slug || 'imported-page'}/`
  return {
    pageName: headline,
    meta: {
      title: `TiDB | ${headline}`.slice(0, 60),
      description: subheadline.slice(0, 160),
      canonical,
    },
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        props: {
          layout: 'split',
          headline,
          subheadline,
          primaryCta: { text: 'Get started', href: '#' },
          secondaryCta: { text: 'Talk to us', href: '#' },
        },
      },
      {
        id: 'featureGrid-1',
        type: 'featureGrid',
        props: {
          eyebrow: 'Highlights',
          title: 'Key Benefits',
          subtitle: 'Refined from your imported content.',
          columns: 3,
          items: items.length
            ? items
            : [
                { title: 'Benefit One', description: 'Add detail here.' },
                { title: 'Benefit Two', description: 'Add detail here.' },
                { title: 'Benefit Three', description: 'Add detail here.' },
              ],
        },
      },
      ...(faqItems.length
        ? [
            {
              id: 'faq-1',
              type: 'faq' as const,
              props: {
                eyebrow: 'FAQ',
                title: 'Frequently Asked Questions',
                items: faqItems,
              },
            },
          ]
        : []),
      {
        id: 'cta-1',
        type: 'cta',
        props: {
          title: ctaTitle,
          subtitle: ctaSubtitle,
          primaryCta: { text: 'Get started', href: '#' },
          secondaryCta: { text: 'Contact sales', href: '#' },
        },
      },
    ],
  }
}

function appendSourceContentSection(dsl: PageDSL, content: string): PageDSL {
  const trimmed = content.trim()
  if (!trimmed) return dsl
  const sample = trimmed.slice(0, 200)
  const hasSource = dsl.sections.some((section) => {
    if (section.type !== 'richTextBlock') return false
    const sectionContent = (section.props as { content?: string } | undefined)?.content
    return typeof sectionContent === 'string' && sectionContent.includes(sample)
  })
  if (hasSource) return dsl
  const baseId = 'source-content'
  let id = baseId
  let suffix = 2
  while (dsl.sections.some((section) => section.id === id)) {
    id = `${baseId}-${suffix}`
    suffix += 1
  }
  const sourceSection: SectionNode = {
    id,
    type: 'richTextBlock',
    props: {
      content: trimmed,
    },
  }
  return {
    ...dsl,
    sections: [...dsl.sections, sourceSection],
  }
}

function makeUniqueSlug(base: string, existing: Set<string>) {
  if (!existing.has(base)) return base
  const segments = base.split('/').filter(Boolean)
  const last = segments.pop() ?? base
  let i = 2
  while (i < 100) {
    const candidate = `${last}-${i}`
    const next = [...segments, candidate].join('/')
    if (!existing.has(next)) return next
    i += 1
  }
  return base
}

// ── TopBar ───────────────────────────────────────────────────────────────────

interface TopBarProps {
  dsl: PageDSL | null
  slug: string
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  draftAvailable: boolean
  parentSlug: string
  childSlug: string
  parentOptions: { slug: string; title: string }[]
  moveStatus: 'idle' | 'moving' | 'moved' | 'error'
  importBadge?: string | null
  onPageNameChange: (v: string) => void
  onSlugChange: (v: string) => void
  onParentChange: (v: string) => void
  onSaveDraft: () => void
  onLoadDraft: () => void
  onPublish: () => void
}

function TopBar({
  dsl,
  slug,
  saveStatus,
  draftAvailable,
  parentSlug,
  childSlug,
  parentOptions,
  moveStatus,
  importBadge,
  onPageNameChange,
  onSlugChange,
  onParentChange,
  onSaveDraft,
  onLoadDraft,
  onPublish,
}: TopBarProps) {
  const slugValid = isValidSlugPath(slug)

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-200 bg-white shrink-0 min-w-0 h-14">
      {/* Page name */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <input
          type="text"
          value={dsl?.pageName ?? ''}
          onChange={(e) => onPageNameChange(e.target.value)}
          placeholder="Page name"
          className="flex-1 text-body-sm text-gray-800 border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 min-w-0"
        />
        {/* Slug */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={parentSlug}
            onChange={(e) => onParentChange(e.target.value)}
            className="bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors shrink-0"
            title="Parent route (optional)"
          >
            <option value="">No parent</option>
            {parentOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                /{option.slug}/
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1.5 bg-white focus-within:border-gray-400 transition-colors shrink-0">
            <span className="text-gray-400 text-body-sm">/</span>
            <input
              type="text"
              value={childSlug}
              onChange={(e) =>
                onSlugChange(
                  parentSlug
                    ? `${parentSlug}/${normalizeSlugInput(e.target.value)}`
                    : normalizeSlugInput(e.target.value)
                )
              }
              placeholder="child-slug"
              className="w-28 bg-transparent text-gray-800 text-body-sm focus:outline-none"
            />
            <span className="text-gray-400 text-body-sm">/</span>
          </div>
        </div>
        {slug && !slugValid && (
          <span className="text-red-500 text-label shrink-0">invalid slug</span>
        )}
      </div>

      {/* Save status + buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {importBadge && (
          <span className="text-label text-gray-500 border border-gray-200 bg-gray-50 px-2 py-0.5 rounded">
            {importBadge}
          </span>
        )}
        {saveStatus === 'saving' && (
          <span className="text-label text-gray-400 flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Saving…
          </span>
        )}
        {saveStatus === 'saved' && (
          <span className="text-label text-brand-teal-medium flex items-center gap-1">
            <CheckCircle2 size={11} /> Saved
          </span>
        )}
        {saveStatus === 'error' && <span className="text-label text-red-500">Save failed</span>}
        {moveStatus === 'moving' && (
          <span className="text-label text-gray-400 flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Moving…
          </span>
        )}
        {moveStatus === 'moved' && (
          <span className="text-label text-brand-teal-medium flex items-center gap-1">
            <CheckCircle2 size={11} /> Moved
          </span>
        )}
        {moveStatus === 'error' && <span className="text-label text-red-500">Move failed</span>}
        <button
          onClick={onSaveDraft}
          disabled={!dsl || !slug || !slugValid}
          className="flex items-center gap-1.5 border border-gray-300 text-gray-700 font-bold px-3 py-1.5 text-body-sm rounded hover:border-gray-400 disabled:opacity-40 transition-colors"
        >
          Save Draft
        </button>

        <button
          onClick={onPublish}
          disabled={!dsl}
          className="flex items-center gap-1.5 bg-gray-900 text-white font-bold px-4 py-1.5 text-body-sm rounded hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          Publish →
        </button>
      </div>
    </div>
  )
}

// ── Guided input for first-time users ────────────────────────────────────────

const GUIDED_STEPS = [
  {
    label: 'What is this page about?',
    placeholder: 'e.g. TiDB Cloud Startup Program landing page',
  },
  {
    label: 'Who is the target audience?',
    placeholder: 'e.g. Early-stage startup founders evaluating databases',
  },
  {
    label: 'What should visitors do on this page? (main CTA)',
    placeholder: 'e.g. Sign up for the program or contact our team',
  },
]

function GuidedInput({
  generating,
  onPromptChange,
}: {
  generating: boolean
  onPromptChange: (prompt: string, canGenerate: boolean) => void
}) {
  const [values, setValues] = useState(['', '', ''])

  const updateValue = (index: number, value: string) => {
    setValues((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  // Report prompt state to parent whenever values change
  useEffect(() => {
    const filled = values[0].trim() && values[1].trim() && values[2].trim()
    const prompt = filled
      ? `Create a page about: ${values[0].trim()}\nTarget audience: ${values[1].trim()}\nMain call to action: ${values[2].trim()}`
      : ''
    onPromptChange(prompt, !!filled)
  }, [values, onPromptChange])

  return (
    <div className="space-y-4">
      {GUIDED_STEPS.map((step, i) => (
        <div key={i}>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gray-100 text-gray-500 text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <label className="text-body-sm font-medium text-gray-700">{step.label}</label>
          </div>
          {i < 2 ? (
            <input
              type="text"
              value={values[i]}
              onChange={(e) => updateValue(i, e.target.value)}
              placeholder={step.placeholder}
              className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
            />
          ) : (
            <textarea
              value={values[i]}
              onChange={(e) => updateValue(i, e.target.value)}
              rows={3}
              placeholder={step.placeholder}
              className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-y placeholder:text-gray-300"
            />
          )}
        </div>
      ))}
      {generating && values[0].trim() && values[1].trim() && values[2].trim() && (
        <p className="text-label text-gray-500 text-center animate-pulse">
          Generating based on: {values[0].trim()} · {values[1].trim()} · {values[2].trim()}
        </p>
      )}
    </div>
  )
}

// ── Left panel: intent + section list ───────────────────────────────────────

interface LeftPanelProps {
  pageType: PageType
  intent: string
  generating: boolean
  generationStage: string | null
  generateError: string
  importStatus: 'idle' | 'loading' | 'error'
  importError: string
  mockMode: boolean
  localJson: string
  localJsonError: string
  dsl: PageDSL | null
  metaDescription: string
  slug: string
  refineResult: RefineResult | null
  mode: string
  selectedTemplate: PageTemplate | null
  importedContent: string | null
  importWarning: string
  preserveSource: boolean
  onPreserveSourceChange: (v: boolean) => void
  onPageTypeChange: (v: PageType) => void
  onIntentChange: (v: string) => void
  onGenerate: (intentOverride?: string) => void
  onTemplateSelect: (template: PageTemplate) => void
  onTemplateClear: () => void
  onContentImport: (text: string, pageType?: ImportPageType) => void
  onContentImportClear: () => void
  onLocalJsonChange: (v: string) => void
  onLocalJsonLoad: () => void
  onMetaChange: (patch: Partial<PageDSL['meta']>) => void
  onSectionChange: (index: number, updated: SectionNode) => void
  onSectionDelete: (index: number) => void
  onSectionRegenerate: (index: number, instruction: string) => Promise<void>
  onSectionAdd: (node: SectionNode) => void
  onDragEnd: (event: DragEndEvent) => void
  briefUrl: string
  briefFile: File | null
  briefLoading: boolean
  briefError: string
  onBriefUrlChange: (v: string) => void
  onBriefFileChange: (f: File | null) => void
  onBriefErrorChange: (v: string) => void
  onLoadBrief: (fileOverride?: File | null) => void
}

type RefineResult = {
  sourceLabel: string
  sourceUrl?: string
  wordCount?: number
  score?: number
  suggestions?: string[]
  status?: string
}

function LeftPanel({
  pageType,
  intent,
  generating,
  generationStage,
  generateError,
  importStatus,
  importError,
  mockMode,
  localJson,
  localJsonError,
  dsl,
  metaDescription,
  slug,
  refineResult,
  mode,
  selectedTemplate,
  importedContent,
  importWarning,
  preserveSource,
  onPreserveSourceChange,
  onPageTypeChange,
  onIntentChange,
  onGenerate,
  onTemplateSelect,
  onTemplateClear,
  onContentImport,
  onContentImportClear,
  onLocalJsonChange,
  onLocalJsonLoad,
  onMetaChange,
  onSectionChange,
  onSectionDelete,
  onSectionRegenerate,
  onSectionAdd,
  onDragEnd,
  briefUrl,
  briefFile,
  briefLoading,
  briefError,
  onBriefUrlChange,
  onBriefFileChange,
  onBriefErrorChange,
  onLoadBrief,
}: LeftPanelProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [guidedMode, setGuidedMode] = useState(mode === 'guided')
  const [guidedPrompt, setGuidedPrompt] = useState('')
  const [guidedCanGenerate, setGuidedCanGenerate] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGuidedPromptChange = useCallback((prompt: string, canGenerate: boolean) => {
    setGuidedPrompt(prompt)
    setGuidedCanGenerate(canGenerate)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const sectionIds = dsl?.sections.map((section) => section.id) ?? []

  const handleBriefFile = useCallback(
    (file: File) => {
      onBriefErrorChange('')
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!ext || !['md', 'txt', 'docx'].includes(ext)) {
        onBriefFileChange(null)
        onBriefErrorChange('Only .docx, .md, or .txt files are supported.')
        return
      }
      onBriefUrlChange('')
      onBriefFileChange(file)
      onLoadBrief(file)
    },
    [onBriefErrorChange, onBriefFileChange, onBriefUrlChange, onLoadBrief]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleBriefFile(file)
    },
    [handleBriefFile]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleBriefFile(file)
    },
    [handleBriefFile]
  )

  // ── Resizer state & logic ──────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null)
  const [topHeight, setTopHeight] = useState<number | null>(null)

  function getDefaultTopH() {
    return Math.round((containerRef.current?.getBoundingClientRect().height ?? 600) * 0.5)
  }

  function handleResizerMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    const startY = e.clientY
    const startH = topHeight ?? getDefaultTopH()

    function onMouseMove(ev: MouseEvent) {
      const container = containerRef.current
      if (!container) return
      const containerH = container.getBoundingClientRect().height
      const newH = Math.min(Math.max(startH + (ev.clientY - startY), 120), containerH - 160)
      setTopHeight(newH)
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'row-resize'
  }

  // Clamp topHeight on window resize
  useEffect(() => {
    function handleResize() {
      if (!containerRef.current || topHeight === null) return
      const containerH = containerRef.current.getBoundingClientRect().height
      if (topHeight > containerH - 160) {
        setTopHeight(containerH - 160)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [topHeight])

  // Whether the top panel should expand to fill (no sections list shown)
  const isExpandedTop =
    (mode === 'marketing' && !selectedTemplate) || (mode === 'import' && importedContent === null)
  // Whether sections list is visible
  const showSections =
    (mode !== 'marketing' || selectedTemplate) && (mode !== 'import' || importedContent !== null)
  // Whether the generate button should be shown outside the top panel
  const showGenerateBar =
    !(mode === 'marketing' && !selectedTemplate) && !(mode === 'import' && importedContent === null)

  return (
    <div ref={containerRef} className="flex flex-col h-full overflow-hidden">
      {/* Top input panel — height controlled by drag state */}
      <div
        className={`overflow-y-auto p-4 border-b border-gray-100 space-y-3 ${isExpandedTop ? 'flex-1' : 'shrink-0'}`}
        style={
          !isExpandedTop && showSections && (dsl || topHeight !== null)
            ? { height: topHeight ?? getDefaultTopH() }
            : undefined
        }
      >
        {/* Page type selector — show in freeform mode (not guided, not marketing, not import) */}
        {!guidedMode && mode !== 'marketing' && mode !== 'import' && (
          <div className="grid grid-cols-2 gap-2">
            <select
              value={pageType}
              onChange={(e) => onPageTypeChange(e.target.value as PageType)}
              className="col-span-2 bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
            >
              {PAGE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {getPageTypeLabel(t)}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Auto-derived page type badge in marketing mode */}
        {mode === 'marketing' &&
          selectedTemplate?.pageType &&
          selectedTemplate.pageType !== PAGE_TYPES[0] && (
            <span className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
              {getPageTypeLabel(selectedTemplate.pageType)}
            </span>
          )}
        {mode === 'marketing' && !selectedTemplate ? (
          <TemplateSelector onSelect={onTemplateSelect} />
        ) : mode === 'import' && importedContent === null ? (
          <>
            <div className="text-label text-gray-500">
              Tip: If you need to preserve formatting, upload a Markdown (.md) file.
            </div>
            <ImportInput onImport={onContentImport} />
          </>
        ) : guidedMode ? (
          <GuidedInput generating={generating} onPromptChange={handleGuidedPromptChange} />
        ) : (
          <>
            {mode === 'marketing' && selectedTemplate && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onTemplateClear}
                  className="text-body-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Change template
                </button>
                <span className="text-body-sm text-gray-400">·</span>
                <span className="text-body-sm text-gray-500">{selectedTemplate.label}</span>
              </div>
            )}
            {mode === 'import' && importedContent !== null && (
              <>
                {importWarning && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 text-body-sm rounded px-3 py-2 flex gap-2">
                    <span>⚠</span>
                    <span>{importWarning}</span>
                  </div>
                )}
                <div className="bg-teal-50 border border-teal-200 text-teal-800 text-body-sm rounded px-3 py-2">
                  ✓ Content imported · AI will convert it to the official site structure
                </div>
                <button
                  type="button"
                  onClick={onContentImportClear}
                  className="text-body-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Import different content
                </button>
                <div className="w-full">
                  <p className="text-body-sm font-medium text-gray-700 mb-2">Page type</p>
                  <select
                    value={IMPORT_PAGE_TYPES.includes(pageType) ? pageType : IMPORT_PAGE_TYPES[0]}
                    onChange={(e) => onPageTypeChange(e.target.value as PageType)}
                    className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                  >
                    {IMPORT_PAGE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {getPageTypeLabel(t)}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {!guidedMode && !importedContent && (
              <>
                <div className="rounded-lg border border-gray-200 bg-white p-3 space-y-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Paste a Google Doc URL…"
                      value={briefUrl}
                      onChange={(e) => onBriefUrlChange(e.target.value)}
                      className="flex-1 min-w-[220px] text-body-sm rounded border border-gray-200 px-2.5 py-1.5 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      disabled={briefLoading || (!briefUrl.trim() && !briefFile)}
                      onClick={() => onLoadBrief()}
                      className="text-body-sm px-3 py-1.5 rounded bg-gray-900 text-white disabled:opacity-40 hover:bg-gray-700 transition-colors flex items-center gap-1.5"
                    >
                      {briefLoading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" /> Loading…
                        </>
                      ) : (
                        'Load content →'
                      )}
                    </button>
                  </div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragActive(true)
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`relative rounded-md border border-dashed px-3 py-2 text-body-sm cursor-pointer transition-colors ${
                      dragActive
                        ? 'border-gray-400 bg-gray-50 text-gray-600'
                        : 'border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>Drop a .docx / .md / .txt file here, or click to browse</span>
                      {briefFile && (
                        <span className="text-label text-gray-500">{briefFile.name}</span>
                      )}
                    </div>
                    {dragActive && (
                      <div className="absolute inset-0 rounded-md bg-gray-50/80 border border-gray-300 flex items-center justify-center text-gray-600 text-body-sm pointer-events-none">
                        Drop to attach
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx,.md,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {briefError && <p className="text-label text-red-600">{briefError}</p>}
                  <div className="text-label text-gray-500">
                    Tip: Use a .md file to keep formatting intact.
                  </div>
                </div>
              </>
            )}
            <textarea
              value={intent}
              onChange={(e) => onIntentChange(e.target.value)}
              rows={6}
              placeholder="Describe the page you want to create… or paste a Google Doc link"
              className={`w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-y min-h-[160px] placeholder:text-gray-300${mode === 'import' && importedContent !== null ? ' max-h-[180px]' : ''}`}
            />
            {/* {mode === 'import' && importedContent !== null && (
              <label className="flex items-center gap-2 text-body-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={preserveSource}
                  onChange={(e) => onPreserveSourceChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                Preserve source wording as much as possible
              </label>
            )} */}
            {importStatus === 'loading' && (
              <div className="text-label text-gray-500">Importing Google Doc…</div>
            )}
            {importStatus === 'error' && (
              <div className="text-label text-red-600">{importError}</div>
            )}
            {/* Quick fill prompts — show when textarea is empty and no template/import content */}
            {!intent.trim() && !selectedTemplate && importedContent === null && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-label text-gray-400">Try:</span>
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => onIntentChange(p.prompt)}
                    className="text-label px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-colors bg-white"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            {mode !== 'marketing' && mode !== 'import' && (
              <div className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2">
                <div>
                  <p className="text-label font-bold text-gray-700">New here?</p>
                  <p className="text-label text-gray-500">Try the step-by-step guided mode.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGuidedMode(true)}
                  className="text-label font-bold text-gray-700 hover:text-gray-900"
                >
                  Open →
                </button>
              </div>
            )}
          </>
        )}
        {showGenerateBar && (
          <>
            {refineResult && (
              <div className="rounded border border-gray-200 bg-white px-3 py-2.5 space-y-2">
                <p className="text-label font-bold text-gray-700">Refine context loaded</p>
                <div className="text-label text-gray-500 space-y-1">
                  <p>Source: {refineResult.sourceLabel}</p>
                  {refineResult.sourceUrl && <p>URL: {refineResult.sourceUrl}</p>}
                  {typeof refineResult.wordCount === 'number' && (
                    <p>Word count: {refineResult.wordCount}</p>
                  )}
                  {typeof refineResult.score === 'number' && <p>Score: {refineResult.score}</p>}
                  {refineResult.status && <p>Status: {refineResult.status}</p>}
                </div>
                {refineResult.suggestions && refineResult.suggestions.length > 0 && (
                  <div className="text-label text-gray-500 space-y-1">
                    <p className="font-bold text-gray-600">Top suggestions</p>
                    {refineResult.suggestions.map((item) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
            {generateError && (
              <div className="flex gap-2 items-start text-red-600 text-body-sm p-2.5 bg-red-50 border border-red-200 rounded">
                <AlertCircle size={13} className="mt-0.5 shrink-0" />
                <p>{generateError}</p>
              </div>
            )}
            {mockMode && (
              <div className="space-y-2 border border-gray-200 rounded p-2.5 bg-gray-50">
                <p className="text-label font-bold text-gray-600">Local JSON Input</p>
                <textarea
                  value={localJson}
                  onChange={(e) => onLocalJsonChange(e.target.value)}
                  rows={6}
                  placeholder="Paste a PageDSL JSON here..."
                  className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={onLocalJsonLoad}
                  className="w-full border border-gray-300 bg-white text-gray-700 font-bold py-1.5 text-body-sm rounded hover:border-gray-400 transition-colors"
                >
                  Load JSON
                </button>
                {localJsonError && <p className="text-label text-red-600">{localJsonError}</p>}
              </div>
            )}
          </>
        )}
      </div>

      {/* Drag handle — only when sections list is visible */}
      {showSections && (
        <div
          onMouseDown={handleResizerMouseDown}
          className="shrink-0 h-3 bg-gray-100 hover:bg-blue-50 cursor-row-resize flex items-center justify-center transition-colors group border-y border-gray-200"
          title="Drag to resize"
        >
          <div className="flex gap-1">
            <span className="w-5 h-0.5 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors" />
            <span className="w-5 h-0.5 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors" />
            <span className="w-5 h-0.5 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors" />
          </div>
        </div>
      )}

      {/* Generate button — always visible, never resized */}
      {showGenerateBar && (
        <div className="shrink-0 px-4 py-3 border-b border-gray-100 space-y-2">
          <button
            onClick={() => (guidedMode ? onGenerate(guidedPrompt) : onGenerate())}
            disabled={guidedMode ? !guidedCanGenerate || generating : !intent.trim() || generating}
            className="w-full bg-gray-900 text-white font-bold py-2 text-body-sm rounded hover:bg-gray-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 size={13} className="animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles size={13} /> Generate Page
              </>
            )}
          </button>
          {generating && generationStage && (
            <div className="text-label text-gray-500">{generationStage}</div>
          )}
          {guidedMode && (
            <button
              type="button"
              onClick={() => setGuidedMode(false)}
              className="w-full text-center text-label text-gray-400 hover:text-gray-600 transition-colors"
            >
              or, describe freely →
            </button>
          )}
        </div>
      )}

      {/* Section cards */}
      {showSections && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {dsl ? (
            <>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                  {dsl.sections.map((section, i) => (
                    <SectionCard
                      key={section.id}
                      id={section.id}
                      node={section}
                      slug={slug}
                      onChange={(updated) => onSectionChange(i, updated)}
                      onDelete={() => onSectionDelete(i)}
                      onRegenerate={(instruction) => onSectionRegenerate(i, instruction)}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              {/* Add section */}
              {showAdd ? (
                <AddSectionPanel onAdd={onSectionAdd} onClose={() => setShowAdd(false)} />
              ) : (
                <button
                  onClick={() => setShowAdd(true)}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-200 rounded py-2.5 text-body-sm text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors"
                >
                  <Plus size={14} /> Add Section
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-300 text-body-sm text-center gap-2">
              <Sparkles size={20} />
              <p>Describe your page above and click Generate</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

function CreatePageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') ?? ''
  const editMode = mode === 'edit'
  const mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DSL === '1'
  const [pageType, setPageType] = useState(PAGE_TYPES[0])
  const [intent, setIntent] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generationStage, setGenerationStage] = useState<string | null>(null)
  const [generateError, setGenerateError] = useState('')
  const [localJson, setLocalJson] = useState('')
  const [localJsonError, setLocalJsonError] = useState('')
  const [dsl, setDsl] = useState<PageDSL | null>(null)
  const [slug, setSlug] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showPublish, setShowPublish] = useState(false)
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(3000)
  const [previewKey, setPreviewKey] = useState(0)
  const [draftAvailable, setDraftAvailable] = useState(false)
  const [checkingDraft, setCheckingDraft] = useState(false)
  const [parentOptions, setParentOptions] = useState<{ slug: string; title: string }[]>([])
  const [existingSlugs, setExistingSlugs] = useState<Set<string>>(new Set())
  const [moveStatus, setMoveStatus] = useState<'idle' | 'moving' | 'moved' | 'error'>('idle')
  const [initialSlug, setInitialSlug] = useState('')
  const [pendingMoveAction, setPendingMoveAction] = useState<null | { type: 'save' | 'publish' }>(
    null
  )
  const [isDirty, setIsDirty] = useState(false)
  const [refineResult, setRefineResult] = useState<RefineResult | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null)
  const [importedContent, setImportedContent] = useState<string | null>(null)
  const [importWarning, setImportWarning] = useState('')
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [importError, setImportError] = useState('')
  const [parentWarning, setParentWarning] = useState<{
    suggested: string
    parent: string
    fallback: string
  } | null>(null)
  const lastImportedDocIdRef = useRef<string | null>(null)
  const [briefUrl, setBriefUrl] = useState('')
  const [briefFile, setBriefFile] = useState<File | null>(null)
  const [briefLoading, setBriefLoading] = useState(false)
  const [briefError, setBriefError] = useState('')
  const [preserveSource, setPreserveSource] = useState(false)

  const importBadge =
    importStatus === 'loading'
      ? 'Importing Google Doc…'
      : refineResult?.sourceLabel?.includes('Google Doc')
        ? 'Imported from Google Docs'
        : null

  const importSummary =
    refineResult?.sourceLabel?.includes('Google Doc') && dsl
      ? {
          sections: dsl.sections.map((section) => section.type),
          wordCount: refineResult.wordCount,
          sourceUrl: refineResult.sourceUrl,
        }
      : null
  const [pendingNavigation, setPendingNavigation] = useState<
    null | { type: 'href'; href: string } | { type: 'back' }
  >(null)

  const previewRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeReadyRef = useRef(false)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initialSlugRef = useRef<string | null>(null)
  const autoLoadedDraftRef = useRef(false)
  const initializedFromQueryRef = useRef(false)
  const intentInitializedRef = useRef(false)
  const lastSavedRef = useRef<string>('')
  const allowPopRef = useRef(false)
  const lastQuerySlugRef = useRef<string | null>(null)

  // Listen for height + ready signals from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'preview-height') {
        setIframeHeight(e.data.height as number)
      }
      if (e.data?.type === 'preview-ready') {
        iframeReadyRef.current = true
        // Push current DSL immediately when iframe signals ready
        if (dsl) {
          iframeRef.current?.contentWindow?.postMessage({ type: 'preview-dsl', dsl }, '*')
        }
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [dsl])

  // On viewport switch: reset + reload iframe once
  useEffect(() => {
    iframeReadyRef.current = false
    setIframeHeight(3000)
    if (dsl) localStorage.setItem('admin-preview-dsl', JSON.stringify(dsl))
    setPreviewKey((k) => k + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport])

  // When DSL changes + iframe ready: push update (no reload)
  useEffect(() => {
    if (dsl && iframeReadyRef.current) {
      iframeRef.current?.contentWindow?.postMessage({ type: 'preview-dsl', dsl }, '*')
    }
  }, [dsl])

  // Fullscreen listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Auto-derive slug from DSL canonical on first generate
  useEffect(() => {
    if (dsl?.meta?.canonical && !slug) {
      const segments = dsl.meta.canonical
        .replace(/^\/|\/$/g, '')
        .split('/')
        .filter(Boolean)
      const derived = segments[0]
      if (derived && /^[a-z0-9-]+$/.test(derived)) {
        setSlug(makeUniqueSlug(derived, existingSlugs))
        const normalizedCanonical = `/${derived}/`
        if (dsl.meta.canonical !== normalizedCanonical) {
          updateDsl((prev) => ({ ...prev, meta: { ...prev.meta, canonical: normalizedCanonical } }))
        }
      }
    }
  }, [dsl, slug, existingSlugs])

  useEffect(() => {
    const loadParents = async () => {
      try {
        const res = await fetch('/api/pages')
        if (!res.ok) return
        const data = (await res.json()) as { pages?: { slug: string; title: string }[] }
        const options =
          data.pages?.map((page) => ({ slug: page.slug, title: page.title ?? page.slug })) ?? []
        options.sort((a, b) => a.slug.localeCompare(b.slug))
        setParentOptions(options)
        setExistingSlugs(new Set(options.map((option) => option.slug)))
      } catch {
        // ignore
      }
    }
    loadParents()
  }, [])

  // Auto-save to localStorage on DSL change (debounced 2s)
  useEffect(() => {
    if (!dsl) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      saveToLocalStorage(slug || 'untitled', dsl)
    }, 2000)
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [dsl, slug])

  const snapshotState = (nextDsl: PageDSL, nextSlug: string) =>
    JSON.stringify({ dsl: nextDsl, slug: nextSlug })

  const setBaselineState = (nextDsl: PageDSL, nextSlug: string) => {
    lastSavedRef.current = snapshotState(nextDsl, nextSlug)
    setIsDirty(false)
  }

  useEffect(() => {
    if (!dsl) return
    const current = snapshotState(dsl, slug)
    setIsDirty(!!lastSavedRef.current && current !== lastSavedRef.current)
  }, [dsl, slug])

  useEffect(() => {
    if (!isDirty) return
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  useEffect(() => {
    if (!isDirty) return
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      const targetAttr = anchor.getAttribute('target')
      if (!href || targetAttr === '_blank') return
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return
      const url = new URL(href, window.location.href)
      if (url.origin !== window.location.origin) return
      const nextHref = `${url.pathname}${url.search}${url.hash}`
      if (
        nextHref === `${window.location.pathname}${window.location.search}${window.location.hash}`
      )
        return
      event.preventDefault()
      setPendingNavigation({ type: 'href', href: nextHref })
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [isDirty])

  useEffect(() => {
    if (!isDirty) return
    const handlePop = () => {
      if (allowPopRef.current) {
        allowPopRef.current = false
        return
      }
      setPendingNavigation({ type: 'back' })
      window.history.pushState(null, '', window.location.href)
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [isDirty])

  const resetEditorState = useCallback(() => {
    setDsl(null)
    setSlug('')
    setInitialSlug('')
    initialSlugRef.current = null
    autoLoadedDraftRef.current = false
    initializedFromQueryRef.current = false
    lastSavedRef.current = ''
    setLocalJson('')
    setLocalJsonError('')
    setDraftAvailable(false)
    setCheckingDraft(false)
    setIsDirty(false)
    setSaveStatus('idle')
  }, [])

  // Initialize slug from query param (e.g. /admin/create?slug=foo)
  useEffect(() => {
    const querySlug = searchParams.get('slug')
    const normalized = querySlug ? normalizeSlugInput(querySlug) : ''

    if (!normalized) {
      if (lastQuerySlugRef.current) {
        resetEditorState()
      }
      lastQuerySlugRef.current = null
      return
    }

    if (initializedFromQueryRef.current && lastQuerySlugRef.current === normalized) return
    lastQuerySlugRef.current = normalized
    if (!slug) setSlug(normalized)
    initialSlugRef.current = normalized
    setInitialSlug(normalized)
    initializedFromQueryRef.current = true
  }, [searchParams, slug, resetEditorState])

  // Initialize intent from query param (e.g. /admin/create?intent=...)
  useEffect(() => {
    const queryIntent = searchParams.get('intent')
    if (!queryIntent) return
    if (intentInitializedRef.current || intent.trim()) return
    setIntent(queryIntent)
    intentInitializedRef.current = true
  }, [searchParams, intent])

  // Reset mode-specific state when the mode query param changes
  // (e.g. navigating from ?mode=marketing back to /admin/create via sidebar)
  const prevModeRef = useRef(mode)
  useEffect(() => {
    if (prevModeRef.current === mode) return
    prevModeRef.current = mode
    setIntent('')
    setSelectedTemplate(null)
    setImportedContent(null)
    setImportWarning('')
    setRefineResult(null)
    setPageType(PAGE_TYPES[0])
    setGenerateError('')
    intentInitializedRef.current = false
  }, [mode])

  // Auto-open publish panel when arriving via ?action=review
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'review' && dsl) {
      setShowPublish(true)
    }
  }, [searchParams, dsl])

  // Auto-import Google Docs content when a link is pasted into intent.
  useEffect(() => {
    const trimmed = intent.trim()
    if (!trimmed) return
    const url = extractGoogleDocUrl(trimmed)
    if (!url || trimmed !== url) return
    const docId = extractGoogleDocId(url)
    if (!docId || lastImportedDocIdRef.current === docId) return

    let cancelled = false
    const run = async () => {
      setImportStatus('loading')
      setImportError('')
      try {
        const res = await fetch('/api/refine/google-doc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })
        const data = (await res.json()) as { content?: string; error?: string }
        if (!res.ok || !data.content) throw new Error(data.error ?? 'Import failed')
        if (cancelled) return
        const cleanedContent = stripBase64Images(data.content)
        const parsedDsl = normalizeDSL(parseTextToDsl(cleanedContent, slug || 'imported-page'))
        setDsl(parsedDsl)
        setLocalJson(JSON.stringify(parsedDsl, null, 2))
        setLocalJsonError('')
        setBaselineState(parsedDsl, slug)
        lastImportedDocIdRef.current = docId
        setImportStatus('idle')
      } catch (err) {
        if (cancelled) return
        setImportStatus('error')
        setImportError(err instanceof Error ? err.message : 'Import failed')
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [intent, slug])

  // Initialize intent from refine payload (e.g. /admin/create?refine=1)
  useEffect(() => {
    const refineMode = searchParams.get('refine') === '1'
    if (!refineMode) return
    if (intentInitializedRef.current || intent.trim()) return
    try {
      const raw = localStorage.getItem('admin-refine-payload')
      if (!raw) return
      const payload = JSON.parse(raw) as
        | { type: 'paste'; content: string }
        | { type: 'gdoc'; url: string; notes?: string }
        | { type: 'score'; profile: string; target: string }

      if (payload.type === 'paste') {
        const trimmed = payload.content.trim()
        const capped = trimmed.length > 4000 ? `${trimmed.slice(0, 4000)}...` : trimmed
        setIntent(
          [
            'Refine the following page content.',
            'Improve structure, SEO, and UX. Keep meaning and tone.',
            'Content:',
            capped,
          ].join('\n')
        )
      }
      if (payload.type === 'gdoc') {
        setIntent(
          [
            'Refine the page content from this Google Doc.',
            'Improve structure, SEO, and UX, and normalize formatting.',
            `Google Doc: ${payload.url}`,
            payload.notes ? `Notes: ${payload.notes}` : '',
          ]
            .filter(Boolean)
            .join('\n')
        )
      }
      if (payload.type === 'score') {
        setIntent(
          [
            'Refine an existing page using the scoring system below.',
            `Scoring profile: ${payload.profile}`,
            `Target: ${payload.target}`,
          ].join('\n')
        )
      }

      localStorage.removeItem('admin-refine-payload')
      intentInitializedRef.current = true
    } catch {
      // ignore payload errors
    }
  }, [searchParams, intent])

  useEffect(() => {
    const refineMode = searchParams.get('refine') === '1'
    if (!refineMode) return
    try {
      const raw = localStorage.getItem('admin-refine-result')
      if (!raw) return
      setRefineResult(JSON.parse(raw) as RefineResult)
    } catch {
      // ignore
    }
  }, [searchParams])

  // Check draft availability when slug changes
  useEffect(() => {
    if (!slug || !isValidSlugPath(slug)) {
      setDraftAvailable(false)
      return
    }

    setCheckingDraft(false)
    const localDraft = loadFromLocalStorage(slug)
    if (localDraft) {
      setDraftAvailable(true)
      return
    }

    let aborted = false
    setCheckingDraft(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/pages/${slug}?branch=${encodeURIComponent(DRAFT_BRANCH)}`)
        if (!aborted) setDraftAvailable(res.ok)
      } catch {
        if (!aborted) setDraftAvailable(false)
      } finally {
        if (!aborted) setCheckingDraft(false)
      }
    }, 400)

    return () => {
      aborted = true
      clearTimeout(timer)
      setCheckingDraft(false)
    }
  }, [slug])

  const handleLoadBrief = async (fileOverride?: File | null) => {
    setBriefLoading(true)
    setBriefError('')
    try {
      let content = ''
      if (briefUrl && !fileOverride) {
        const match = briefUrl.match(/\/document\/d\/([a-zA-Z0-9_-]+)/)
        const docId = match?.[1]
        if (!docId) {
          setBriefError('Invalid Google Docs URL.')
          return
        }
        const res = await fetch(`/api/import-gdoc?docId=${encodeURIComponent(docId)}`)
        const data = (await res.json()) as { text?: string; error?: string }
        if (!res.ok || data.error) throw new Error(data.error ?? 'Failed to fetch')
        content = data.text ?? ''
      } else if (fileOverride ?? briefFile) {
        const file = fileOverride ?? briefFile
        if (!file) return
        const ext = file.name.split('.').pop()?.toLowerCase()
        if (ext === 'md' || ext === 'txt') {
          content = await file.text()
        } else if (ext === 'docx') {
          const mammoth = await import('mammoth')
          const arrayBuffer = await file.arrayBuffer()
          const result = await mammoth.extractRawText({ arrayBuffer })
          content = result.value
        } else {
          setBriefError('Only .docx, .md, or .txt files are supported.')
          return
        }
      }
      if (content) {
        setIntent(
          `Based on the following SEO brief, generate a ${pageType} page:\n\n${stripBase64Images(content)}`
        )
        setBriefUrl('')
        setBriefFile(null)
      }
    } catch (err) {
      setBriefError(err instanceof Error ? err.message : 'Failed to load brief')
    } finally {
      setBriefLoading(false)
    }
  }

  const handleGenerate = async (intentOverride?: string) => {
    const effectiveIntent = typeof intentOverride === 'string' ? intentOverride : intent
    if (typeof intentOverride === 'string') setIntent(intentOverride)
    setGenerating(true)
    setGenerateError('')
    setParentWarning(null)
    setGenerationStage('Preparing content…')

    // Sanitize imported content to avoid JSON parse errors from special chars / excessive length
    const isImport = mode === 'import' && importedContent !== null
    const detectedType = isImport ? detectPageType(effectiveIntent) : 'marketing'
    const hasManualImportType =
      isImport && IMPORT_PAGE_TYPES.includes(pageType) && pageType !== 'general'
    const manualType = hasManualImportType ? pageType.toLowerCase() : undefined
    const resolvedType = manualType ?? detectedType
    const isLongForm = resolvedType !== 'marketing'
    const base64StrippedIntent = stripBase64Images(effectiveIntent)
    const sanitizedIntent = isImport
      ? sanitizeImportedContent(base64StrippedIntent, { isLongForm })
      : base64StrippedIntent

    // In import mode, let the AI auto-detect page type from content
    const effectivePageType = isImport
      ? hasManualImportType
        ? pageType
        : isLongForm
          ? resolvedType
          : 'auto'
      : pageType

    try {
      setGenerationStage('Generating page…')
      const res = await fetch('/api/ai/generate-dsl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: sanitizedIntent,
          pageType: effectivePageType,
          preserveSource,
        }),
      })
      let data: PageDSL & { error?: string }
      try {
        data = (await res.json()) as PageDSL & { error?: string }
      } catch {
        throw new Error(
          'Failed to parse AI response. If you imported a long document, try trimming it to the most relevant sections and generating again.'
        )
      }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Generation failed')
      if (!res.ok || data.error) throw new Error(data.error ?? 'Generation failed')
      const normalized = normalizeDSL(data)
      const finalDsl = normalized
      if (isLongForm && !slug) {
        const canonical = typeof data.meta?.canonical === 'string' ? data.meta.canonical : ''
        const aiSegments = canonical
          .replace(/^\/|\/$/g, '')
          .split('/')
          .filter(Boolean)
        if (aiSegments.length > 1) {
          const aiParent = aiSegments.slice(0, -1).join('/')
          const aiChild = aiSegments.at(-1)!
          const parentExists = parentOptions.some((opt) => opt.slug === aiParent)
          if (parentExists) {
            setSlug(`${aiParent}/${aiChild}`)
            setParentWarning(null)
          } else {
            setSlug(aiChild)
            setParentWarning({
              suggested: canonical,
              parent: `/${aiParent}/`,
              fallback: `/${aiChild}/`,
            })
          }
        } else if (aiSegments.length === 1) {
          setSlug(aiSegments[0])
          setParentWarning(null)
        }
      }
      setDsl(finalDsl)
      setBaselineState(finalDsl, slug)
      setLocalJson(JSON.stringify(finalDsl, null, 2))
      setLocalJsonError('')
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setGenerating(false)
      setGenerationStage(null)
    }
  }

  const handleLocalJsonLoad = useCallback(() => {
    setLocalJsonError('')
    try {
      const parsed = JSON.parse(localJson) as PageDSL
      const normalized = normalizeDSL(parsed)
      setDsl(normalized)
      setBaselineState(normalized, slug)
    } catch (err) {
      setLocalJsonError(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }, [localJson])

  const updateDsl = useCallback((updater: (prev: PageDSL) => PageDSL) => {
    setDsl((prev) => (prev ? updater(prev) : prev))
  }, [])

  const updateImportWarningFor = useCallback((content: string, selectedPageType: string) => {
    const longFormTypes = ['listicle', 'playbook', 'compare']
    const isLongFormImport = longFormTypes.includes(selectedPageType)
    const importMaxChars = isLongFormImport ? LONG_FORM_IMPORT_MAX_CHARS : IMPORT_MAX_CHARS
    if (isLongFormImport) {
      setImportWarning('')
      return
    }
    if (content.length <= importMaxChars) {
      setImportWarning('')
      return
    }
    const wordCount = content.trim().split(/\s+/).length
    setImportWarning(
      `Document is long (${wordCount.toLocaleString()} words). Only the first ~1,000 words will be sent to AI for page structure analysis. You can edit the content below before generating.`
    )
  }, [])

  useEffect(() => {
    if (mode !== 'import' || !importedContent) return
    updateImportWarningFor(importedContent, pageType)
  }, [importedContent, mode, pageType, updateImportWarningFor])

  const syncTocIfNeeded = useCallback(
    (next: PageDSL) => {
      const longFormTypes = ['listicle', 'playbook', 'compare']
      if (!longFormTypes.includes(pageType)) return next
      const cloned = structuredClone(next)
      return addTableOfContentsForLongForm(cloned, pageType)
    },
    [pageType]
  )

  // Keep canonical in sync with slug changes.
  useEffect(() => {
    if (!dsl) return
    if (!slug || !isValidSlugPath(slug)) return
    const normalizedCanonical = `/${slug}/`
    if (dsl.meta.canonical !== normalizedCanonical) {
      updateDsl((prev) => ({ ...prev, meta: { ...prev.meta, canonical: normalizedCanonical } }))
    }
  }, [dsl, slug, updateDsl])

  const handlePageNameChange = useCallback(
    (pageName: string) => {
      updateDsl((prev) => ({ ...prev, pageName }))
    },
    [updateDsl]
  )

  const handleMetaChange = useCallback(
    (patch: Partial<PageDSL['meta']>) => {
      updateDsl((prev) => ({ ...prev, meta: { ...prev.meta, ...patch } }))
    },
    [updateDsl]
  )

  const handleSectionChange = useCallback(
    (index: number, updated: SectionNode) => {
      updateDsl((prev) => {
        const sections = [...prev.sections]
        sections[index] = updated
        return syncTocIfNeeded({ ...prev, sections })
      })
    },
    [syncTocIfNeeded, updateDsl]
  )

  const handleSectionDelete = useCallback(
    (index: number) => {
      updateDsl((prev) =>
        syncTocIfNeeded({
          ...prev,
          sections: prev.sections.filter((_, i) => i !== index),
        })
      )
    },
    [syncTocIfNeeded, updateDsl]
  )

  const handleSectionAdd = useCallback(
    (node: SectionNode) => {
      updateDsl((prev) => syncTocIfNeeded({ ...prev, sections: [...prev.sections, node] }))
    },
    [syncTocIfNeeded, updateDsl]
  )

  const handleSectionRegenerate = useCallback(
    async (index: number, instruction: string) => {
      if (!dsl) return
      const section = dsl.sections[index]
      const res = await fetch('/api/ai/edit-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, instruction, pageMeta: dsl.meta }),
      })
      const updated = (await res.json()) as SectionNode & { error?: string }
      if (!res.ok || updated.error) throw new Error(updated.error ?? 'Regeneration failed')
      handleSectionChange(index, updated)
    },
    [dsl, handleSectionChange]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const activeId = String(active.id)
      const overId = String(over.id)
      updateDsl((prev) =>
        syncTocIfNeeded({
          ...prev,
          sections: (() => {
            const oldIndex = prev.sections.findIndex((section) => section.id === activeId)
            const newIndex = prev.sections.findIndex((section) => section.id === overId)
            if (oldIndex === -1 || newIndex === -1) return prev.sections
            return arrayMove(prev.sections, oldIndex, newIndex)
          })(),
        })
      )
    },
    [syncTocIfNeeded, updateDsl]
  )

  const handleSaveDraft = async () => {
    if (!dsl || !slug) return
    if (editMode && initialSlug && initialSlug !== slug) {
      setPendingMoveAction({ type: 'save' })
      return
    }
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dsl, branch: DRAFT_BRANCH }),
      })
      if (!res.ok) throw new Error('Save failed')
      setBaselineState(dsl, slug)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const getParentSlug = (value: string) => {
    const parts = value.split('/').filter(Boolean)
    return parts.length > 1 ? parts.slice(0, -1).join('/') : ''
  }

  const getLeafSlug = (value: string) => {
    const parts = value.split('/').filter(Boolean)
    return parts.at(-1) ?? ''
  }

  const handleParentChange = (parent: string) => {
    const leaf = getLeafSlug(slug) || 'page'
    const next = parent ? `${parent}/${leaf}` : leaf
    setSlug(normalizeSlugInput(next))
  }

  const canMove =
    editMode &&
    !!initialSlug &&
    initialSlug !== slug &&
    isValidSlugPath(initialSlug) &&
    isValidSlugPath(slug)

  const handleMovePage = async () => {
    if (!canMove) return false
    setMoveStatus('moving')
    try {
      const res = await fetch('/api/pages/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: initialSlug, to: slug }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Move failed')
      setInitialSlug(slug)
      initialSlugRef.current = slug
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.set('slug', slug)
        window.history.replaceState(null, '', url.toString())
      }
      setMoveStatus('moved')
      setTimeout(() => setMoveStatus('idle'), 3000)
      return true
    } catch {
      setMoveStatus('error')
      setTimeout(() => setMoveStatus('idle'), 3000)
      return false
    }
  }

  const handlePublishRequest = async () => {
    if (editMode && initialSlug && initialSlug !== slug) {
      setPendingMoveAction({ type: 'publish' })
      return
    }
    setShowPublish(true)
  }

  const confirmMoveAndContinue = async () => {
    if (!pendingMoveAction) return
    const moved = await handleMovePage()
    if (!moved) return
    if (pendingMoveAction.type === 'publish') setShowPublish(true)
    else handleSaveDraft()
    setPendingMoveAction(null)
  }

  const handleLeaveConfirm = () => {
    if (!pendingNavigation) return
    const nav = pendingNavigation
    setPendingNavigation(null)
    if (nav.type === 'href') {
      router.push(nav.href)
      return
    }
    allowPopRef.current = true
    window.history.back()
  }

  const handleLoadDraft = useCallback(async () => {
    if (!slug || !isValidSlugPath(slug)) return
    const localDraft = loadFromLocalStorage(slug)
    if (localDraft) {
      setDsl(localDraft)
      setBaselineState(localDraft, slug)
      setLocalJson(JSON.stringify(localDraft, null, 2))
      return
    }

    try {
      const draftRes = await fetch(`/api/pages/${slug}?branch=${encodeURIComponent(DRAFT_BRANCH)}`)
      if (draftRes.ok) {
        const remoteDraft = (await draftRes.json()) as PageDSL
        const normalized = normalizeDSL(remoteDraft)
        setDsl(normalized)
        setBaselineState(normalized, slug)
        setLocalJson(JSON.stringify(normalized, null, 2))
        return
      }

      if (draftRes.status === 404) {
        const publishedRes = await fetch(`/api/pages/${slug}`)
        if (publishedRes.ok) {
          const published = (await publishedRes.json()) as PageDSL
          const normalized = normalizeDSL(published)
          setDsl(normalized)
          setBaselineState(normalized, slug)
          setLocalJson(JSON.stringify(normalized, null, 2))
          return
        }
      }

      throw new Error('Draft not found')
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }, [slug])

  // Auto-load draft when arriving with a slug param
  useEffect(() => {
    if (autoLoadedDraftRef.current) return
    if (!slug || !isValidSlugPath(slug)) return
    if (initialSlugRef.current !== slug) return
    autoLoadedDraftRef.current = true
    handleLoadDraft()
  }, [slug, handleLoadDraft])

  const toggleFullscreen = () => {
    if (!previewRef.current) return
    if (document.fullscreenElement) document.exitFullscreen()
    else previewRef.current.requestFullscreen()
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <TopBar
        dsl={dsl}
        slug={slug}
        saveStatus={saveStatus}
        draftAvailable={draftAvailable && !checkingDraft}
        parentSlug={getParentSlug(slug)}
        childSlug={getLeafSlug(slug)}
        parentOptions={parentOptions}
        moveStatus={moveStatus}
        importBadge={importBadge}
        onPageNameChange={handlePageNameChange}
        onSlugChange={setSlug}
        onParentChange={handleParentChange}
        onSaveDraft={handleSaveDraft}
        onLoadDraft={handleLoadDraft}
        onPublish={handlePublishRequest}
      />

      {/* Parent-page warning banner */}
      {parentWarning && (
        <div className="flex items-start gap-2.5 px-4 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-800 text-body-sm shrink-0">
          <TriangleAlert size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <p className="flex-1">
            The AI-suggested path <span className="font-bold">{parentWarning.suggested}</span>{' '}
            references parent page <span className="font-bold">{parentWarning.parent}</span>, which
            does not exist yet. Saved as root-level{' '}
            <span className="font-bold">{parentWarning.fallback}</span> instead. To nest it under{' '}
            <span className="font-bold">{parentWarning.parent}</span>, create the parent page first.
          </p>
          <button
            onClick={() => setParentWarning(null)}
            className="shrink-0 text-amber-500 hover:text-amber-700 transition-colors"
            title="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Dual panel body */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        {/* Left panel */}
        <div
          className={[
            'shrink-0 border-b border-gray-200 lg:border-b-0 lg:border-r bg-white overflow-hidden flex flex-col transition-all duration-200',
            leftCollapsed ? 'w-full lg:w-0' : 'w-full lg:w-[420px]',
          ].join(' ')}
        >
          <LeftPanel
            pageType={pageType}
            intent={intent}
            generating={generating}
            generationStage={generationStage}
            generateError={generateError}
            importStatus={importStatus}
            importError={importError}
            mockMode={mockMode}
            localJson={localJson}
            localJsonError={localJsonError}
            dsl={dsl}
            metaDescription={dsl?.meta?.description ?? ''}
            slug={slug}
            refineResult={refineResult}
            mode={mode}
            selectedTemplate={selectedTemplate}
            importedContent={importedContent}
            importWarning={importWarning}
            preserveSource={preserveSource}
            onPreserveSourceChange={setPreserveSource}
            onPageTypeChange={setPageType}
            onIntentChange={setIntent}
            onGenerate={handleGenerate}
            onTemplateSelect={(template) => {
              setSelectedTemplate(template)
              setIntent(template.prompt)
              if (template.pageType) setPageType(template.pageType)
            }}
            onTemplateClear={() => {
              setSelectedTemplate(null)
              setIntent('')
              setPageType(PAGE_TYPES[0])
            }}
            onContentImport={(text, importedPageType) => {
              const cleaned = stripBase64Images(text)
              setImportedContent(cleaned)
              setIntent(cleaned)
              // Apply page type from import selector if it's not 'general'
              const detectedType = detectPageType(cleaned)
              const mapped =
                importedPageType && importedPageType !== 'general'
                  ? importedPageType
                  : detectedType !== 'marketing'
                    ? detectedType
                    : PAGE_TYPES[0]
              setPageType(mapped)
              const longFormTypes = ['listicle', 'playbook', 'compare']
              const isLongFormImport = longFormTypes.includes(mapped)
              const importMaxChars = isLongFormImport
                ? LONG_FORM_IMPORT_MAX_CHARS
                : IMPORT_MAX_CHARS

              if (cleaned.length > importMaxChars) {
                updateImportWarningFor(cleaned, mapped)
              } else {
                setImportWarning('')
              }
            }}
            onContentImportClear={() => {
              setImportedContent(null)
              setIntent('')
              setImportWarning('')
            }}
            onLocalJsonChange={setLocalJson}
            onLocalJsonLoad={handleLocalJsonLoad}
            onMetaChange={handleMetaChange}
            onSectionChange={handleSectionChange}
            onSectionDelete={handleSectionDelete}
            onSectionRegenerate={handleSectionRegenerate}
            onSectionAdd={handleSectionAdd}
            onDragEnd={handleDragEnd}
            briefUrl={briefUrl}
            briefFile={briefFile}
            briefLoading={briefLoading}
            briefError={briefError}
            onBriefUrlChange={setBriefUrl}
            onBriefFileChange={setBriefFile}
            onBriefErrorChange={setBriefError}
            onLoadBrief={handleLoadBrief}
          />
        </div>

        {/* Right panel: preview */}
        <div ref={previewRef} className="flex-1 flex flex-col overflow-hidden bg-gray-100 min-h-0">
          {/* Viewport toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-white shrink-0">
            <button
              onClick={() => setLeftCollapsed((v) => !v)}
              title={leftCollapsed ? 'Show editor' : 'Hide editor'}
              className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded mr-1"
            >
              {leftCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
            </button>
            {(['desktop', 'mobile'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                title={v.charAt(0).toUpperCase() + v.slice(1)}
                className={[
                  'p-1.5 rounded transition-colors',
                  viewport === v ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-700',
                ].join(' ')}
              >
                {v === 'desktop' ? <Monitor size={14} /> : <Smartphone size={14} />}
              </button>
            ))}
            <button
              onClick={toggleFullscreen}
              className="ml-auto p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>

          {importSummary && (
            <div className="px-4 py-2.5 border-b border-gray-200 bg-white text-label text-gray-500">
              <span className="font-bold text-gray-700">Import summary:</span>{' '}
              {importSummary.sections.length} sections · {importSummary.sections.join(' · ')}
              {typeof importSummary.wordCount === 'number'
                ? ` · ${importSummary.wordCount} words`
                : ''}
              {importSummary.sourceUrl ? ` · ${importSummary.sourceUrl}` : ''}
            </div>
          )}

          {/* Preview content */}
          {dsl ? (
            viewport === 'desktop' ? (
              <div
                className="flex-1 overflow-y-auto overflow-x-hidden bg-white"
                style={{ contain: 'paint' }}
              >
                <iframe
                  ref={iframeRef}
                  key={previewKey}
                  src="/admin/preview"
                  style={{ width: '100%', height: iframeHeight, border: 'none', display: 'block' }}
                  title="Desktop preview"
                />
              </div>
            ) : (
              <div className="flex justify-center overflow-y-auto bg-gray-100 flex-1 py-6">
                <iframe
                  ref={iframeRef}
                  key={previewKey}
                  src="/admin/preview"
                  style={{
                    width: 390,
                    height: iframeHeight,
                    border: 'none',
                    display: 'block',
                    flexShrink: 0,
                  }}
                  title="Mobile preview"
                />
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-300 gap-3">
              <Monitor size={32} strokeWidth={1} />
              <p className="text-body-sm">Preview will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Publish drawer */}
      {showPublish && dsl && (
        <PublishDrawer
          dsl={dsl}
          slug={slug}
          slugLocked={editMode}
          onSlugChange={setSlug}
          onMetaChange={handleMetaChange}
          onClose={() => setShowPublish(false)}
        />
      )}

      {pendingMoveAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => (moveStatus === 'moving' ? null : setPendingMoveAction(null))}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-body-md font-bold text-gray-900 mb-2">Move Page</h3>
            <p className="text-body-sm text-gray-600">
              The URL has changed. Move the page to the new URL before you{' '}
              {pendingMoveAction.type === 'publish' ? 'publish' : 'save'}?
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingMoveAction(null)}
                disabled={moveStatus === 'moving'}
                className="border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmMoveAndContinue}
                disabled={moveStatus === 'moving'}
                className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
              >
                {moveStatus === 'moving' ? 'Moving…' : 'Move and continue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingNavigation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPendingNavigation(null)}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-body-md font-bold text-gray-900 mb-2">Leave Page?</h3>
            <p className="text-body-sm text-gray-600">
              You have unsaved changes. Are you sure you want to leave?
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingNavigation(null)}
                className="border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold rounded transition-colors"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={handleLeaveConfirm}
                className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 text-body-sm font-bold rounded transition-colors"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="p-6 text-body-sm text-gray-500">Loading editor…</div>}>
      <CreatePageInner />
    </Suspense>
  )
}
