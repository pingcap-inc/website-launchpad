'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Loader2,
  AlertCircle,
  Plus,
  Save,
  CheckCircle2,
  Sparkles,
  Monitor,
  Smartphone,
  Maximize2,
  Minimize2,
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
import { DslPageRenderer } from '@/lib/dsl-renderer'
import type { PageDSL, SectionNode } from '@/lib/dsl-schema'
import { SectionCard } from './SectionCard'
import { AddSectionPanel } from './AddSectionPanel'
import { PublishDrawer } from './PublishDrawer'

const PAGE_TYPES = [
  'Product Page',
  'Solution Page',
  'Landing Page',
  'Glossary Page',
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
    return raw ? (JSON.parse(raw) as PageDSL) : null
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
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-200 bg-white shrink-0 min-w-0">
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
          onClick={onSaveDraft}
          disabled={!dsl || !slug || !slugValid || saveStatus === 'saving'}
          className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 font-bold px-3 py-1.5 text-body-sm rounded transition-colors disabled:opacity-40"
        >
          <Save size={13} /> Save Draft
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

// ── Left panel: intent + section list ───────────────────────────────────────

interface LeftPanelProps {
  pageType: string
  intent: string
  generating: boolean
  generateError: string
  dsl: PageDSL | null
  slug: string
  onPageTypeChange: (v: string) => void
  onIntentChange: (v: string) => void
  onGenerate: () => void
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
  dsl,
  slug,
  onPageTypeChange,
  onIntentChange,
  onGenerate,
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

  const sectionIds = dsl?.sections.map((_, i) => `section-${i}`) ?? []

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
      </div>

      {/* Section cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {dsl ? (
          <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                {dsl.sections.map((section, i) => (
                  <SectionCard
                    key={`section-${i}`}
                    id={`section-${i}`}
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
  const [pageType, setPageType] = useState(PAGE_TYPES[0])
  const [intent, setIntent] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generateError, setGenerateError] = useState('')
  const [dsl, setDsl] = useState<PageDSL | null>(null)
  const [slug, setSlug] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showPublish, setShowPublish] = useState(false)
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(3000)
  const [previewKey, setPreviewKey] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Listen for height reported by mobile preview iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'preview-height') setIframeHeight(e.data.height)
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // Fullscreen listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Sync DSL to localStorage for mobile iframe
  useEffect(() => {
    if (viewport === 'mobile' && dsl) {
      localStorage.setItem('admin-preview-dsl', JSON.stringify(dsl))
      setPreviewKey((k) => k + 1)
    }
  }, [dsl, viewport])

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
      setDsl(data)
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setGenerating(false)
    }
  }

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
      const oldIndex = parseInt(activeId.replace('section-', ''), 10)
      const newIndex = parseInt(overId.replace('section-', ''), 10)
      updateDsl((prev) => ({
        ...prev,
        sections: arrayMove(prev.sections, oldIndex, newIndex),
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
      <div className="flex flex-1 min-h-0">
        {/* Left panel */}
        <div className="w-[420px] shrink-0 border-r border-gray-200 bg-white overflow-hidden flex flex-col">
          <LeftPanel
            pageType={pageType}
            intent={intent}
            generating={generating}
            generateError={generateError}
            dsl={dsl}
            slug={slug}
            onPageTypeChange={setPageType}
            onIntentChange={setIntent}
            onGenerate={handleGenerate}
            onSectionChange={handleSectionChange}
            onSectionDelete={handleSectionDelete}
            onSectionRegenerate={handleSectionRegenerate}
            onSectionAdd={handleSectionAdd}
            onDragEnd={handleDragEnd}
          />
        </div>

        {/* Right panel: preview */}
        <div ref={previewRef} className="flex-1 flex flex-col overflow-hidden bg-gray-100">
          {/* Viewport toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-white shrink-0">
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
          <div className="flex-1 overflow-y-auto" style={{ contain: 'paint' }}>
            {dsl ? (
              viewport === 'mobile' ? (
                <div className="flex justify-center bg-gray-100 min-h-full py-6">
                  <iframe
                    key={previewKey}
                    src="/admin/preview"
                    style={{ width: 390, height: iframeHeight, border: 'none', display: 'block' }}
                    title="Mobile preview"
                  />
                </div>
              ) : (
                <div className="w-full">
                  <DslPageRenderer dsl={dsl} withChrome />
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
                <Monitor size={32} strokeWidth={1} />
                <p className="text-body-sm">Preview will appear here</p>
              </div>
            )}
          </div>
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
