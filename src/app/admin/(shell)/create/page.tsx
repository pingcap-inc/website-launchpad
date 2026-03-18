'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
import { normalizeDSL } from '@/lib/dsl-utils'
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

const PAGE_TYPES = [
  // 'Product Page',
  // 'Solution Page',
  // 'Landing Page',
  // 'Glossary Page',
  'General Page',
]
const DRAFT_BRANCH = 'drafts/ai'
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

// ── TopBar ───────────────────────────────────────────────────────────────────

interface TopBarProps {
  dsl: PageDSL | null
  slug: string
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  onSlugChange: (v: string) => void
  onMetaChange: (patch: Partial<PageDSL['meta']>) => void
  onSaveDraft: () => void
  onPublish: () => void
}

function TopBar({
  dsl,
  slug,
  saveStatus,
  onSlugChange,
  onMetaChange,
  onSaveDraft,
  onPublish,
}: TopBarProps) {
  const slugValid = /^[a-z0-9-]+$/.test(slug)

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-200 bg-white shrink-0 min-w-0 h-14">
      {/* Page title */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <input
          type="text"
          value={dsl?.meta?.title ?? ''}
          onChange={(e) => onMetaChange({ title: e.target.value })}
          placeholder="Page title (50–60 chars)"
          className="flex-1 text-body-sm text-gray-800 border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 min-w-0"
        />
        {/* Slug */}
        <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1.5 bg-white focus-within:border-gray-400 transition-colors shrink-0">
          <span className="text-gray-400 text-body-sm">/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="page-slug"
            className="w-28 bg-transparent text-gray-800 text-body-sm focus:outline-none"
          />
          <span className="text-gray-400 text-body-sm">/</span>
        </div>
        {slug && !slugValid && (
          <span className="text-red-500 text-label shrink-0">invalid slug</span>
        )}
      </div>

      {/* Save status + buttons */}
      <div className="flex items-center gap-2 shrink-0">
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

// ── Left panel: intent + section list ───────────────────────────────────────

interface LeftPanelProps {
  pageType: string
  intent: string
  generating: boolean
  generateError: string
  mockMode: boolean
  localJson: string
  localJsonError: string
  dsl: PageDSL | null
  slug: string
  onPageTypeChange: (v: string) => void
  onIntentChange: (v: string) => void
  onGenerate: () => void
  onLocalJsonChange: (v: string) => void
  onLocalJsonLoad: () => void
  onSectionChange: (index: number, updated: SectionNode) => void
  onSectionDelete: (index: number) => void
  onSectionRegenerate: (index: number, instruction: string) => Promise<void>
  onSectionAdd: (node: SectionNode) => void
  onDragEnd: (event: DragEndEvent) => void
}

function LeftPanel({
  pageType,
  intent,
  generating,
  generateError,
  mockMode,
  localJson,
  localJsonError,
  dsl,
  slug,
  onPageTypeChange,
  onIntentChange,
  onGenerate,
  onLocalJsonChange,
  onLocalJsonLoad,
  onSectionChange,
  onSectionDelete,
  onSectionRegenerate,
  onSectionAdd,
  onDragEnd,
}: LeftPanelProps) {
  const [showAdd, setShowAdd] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const sectionIds = dsl?.sections.map((section) => section.id) ?? []

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Generate form */}
      <div className="p-4 border-b border-gray-100 space-y-3 shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <select
            value={pageType}
            onChange={(e) => onPageTypeChange(e.target.value)}
            className="col-span-2 bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
          >
            {PAGE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <textarea
          value={intent}
          onChange={(e) => onIntentChange(e.target.value)}
          rows={3}
          placeholder="Describe the page you want to create…"
          className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-300"
        />
        {/* Quick fill prompts */}
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
        <button
          onClick={onGenerate}
          disabled={!intent.trim() || generating}
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
      </div>

      {/* Section cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {dsl ? (
          <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
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
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function CreatePage() {
  const mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DSL === '1'
  const [pageType, setPageType] = useState(PAGE_TYPES[0])
  const [intent, setIntent] = useState('')
  const [generating, setGenerating] = useState(false)
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

  const previewRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeReadyRef = useRef(false)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      const derived = segments.join('-')
      if (derived && /^[a-z0-9-]+$/.test(derived)) setSlug(derived)
    }
  }, [dsl, slug])

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

  const handleGenerate = async () => {
    setGenerating(true)
    setGenerateError('')
    try {
      const res = await fetch('/api/ai/generate-dsl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, pageType }),
      })
      const data = (await res.json()) as PageDSL & { error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Generation failed')
      const normalized = normalizeDSL(data)
      setDsl(normalized)
      setLocalJson(JSON.stringify(normalized, null, 2))
      setLocalJsonError('')
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setGenerating(false)
    }
  }

  const handleLocalJsonLoad = useCallback(() => {
    setLocalJsonError('')
    try {
      const parsed = JSON.parse(localJson) as PageDSL
      setDsl(normalizeDSL(parsed))
    } catch (err) {
      setLocalJsonError(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }, [localJson])

  const updateDsl = useCallback((updater: (prev: PageDSL) => PageDSL) => {
    setDsl((prev) => (prev ? updater(prev) : prev))
  }, [])

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
        return { ...prev, sections }
      })
    },
    [updateDsl]
  )

  const handleSectionDelete = useCallback(
    (index: number) => {
      updateDsl((prev) => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index),
      }))
    },
    [updateDsl]
  )

  const handleSectionAdd = useCallback(
    (node: SectionNode) => {
      updateDsl((prev) => ({ ...prev, sections: [...prev.sections, node] }))
    },
    [updateDsl]
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
      updateDsl((prev) => ({
        ...prev,
        sections: (() => {
          const oldIndex = prev.sections.findIndex((section) => section.id === activeId)
          const newIndex = prev.sections.findIndex((section) => section.id === overId)
          if (oldIndex === -1 || newIndex === -1) return prev.sections
          return arrayMove(prev.sections, oldIndex, newIndex)
        })(),
      }))
    },
    [updateDsl]
  )

  const handleSaveDraft = async () => {
    if (!dsl || !slug) return
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dsl, branch: DRAFT_BRANCH }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

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
        onSlugChange={setSlug}
        onMetaChange={handleMetaChange}
        onSaveDraft={handleSaveDraft}
        onPublish={() => setShowPublish(true)}
      />

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
            generateError={generateError}
            mockMode={mockMode}
            localJson={localJson}
            localJsonError={localJsonError}
            dsl={dsl}
            slug={slug}
            onPageTypeChange={setPageType}
            onIntentChange={setIntent}
            onGenerate={handleGenerate}
            onLocalJsonChange={setLocalJson}
            onLocalJsonLoad={handleLocalJsonLoad}
            onSectionChange={handleSectionChange}
            onSectionDelete={handleSectionDelete}
            onSectionRegenerate={handleSectionRegenerate}
            onSectionAdd={handleSectionAdd}
            onDragEnd={handleDragEnd}
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
          onSlugChange={setSlug}
          onClose={() => setShowPublish(false)}
        />
      )}
    </div>
  )
}
