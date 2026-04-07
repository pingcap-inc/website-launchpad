'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Sparkles,
  Bot,
  Send,
  User,
  AlertCircle,
  Loader2,
  Save,
  ExternalLink,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import type { PageDSL } from '@/lib/dsl-schema'
import { PageRenderer } from '@/lib/page-renderer'
import { normalizeDSL } from '@/lib/dsl-utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
  dsl?: PageDSL
}

interface PageOption {
  slug: string
  title: string
}

export default function AssistantPage() {
  const [pages, setPages] = useState<PageOption[]>([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [dsl, setDsl] = useState<PageDSL | null>(null)
  const [loadingPage, setLoadingPage] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! Select a page from the dropdown, then tell me what you'd like to change. I'll update the DSL and you can preview the result instantly.",
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [error, setError] = useState('')
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [iframeHeight, setIframeHeight] = useState(3000)
  const [previewKey, setPreviewKey] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Sync DSL to localStorage for mobile iframe
  useEffect(() => {
    if (viewport === 'mobile' && dsl) {
      localStorage.setItem('admin-preview-dsl', JSON.stringify(dsl))
      setPreviewKey((k) => k + 1)
    }
  }, [dsl, viewport])

  // Listen for height reported by the iframe preview page
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'preview-height') setIframeHeight(e.data.height)
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // Fullscreen
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggleFullscreen = () => {
    if (!previewRef.current) return
    if (document.fullscreenElement) document.exitFullscreen()
    else previewRef.current.requestFullscreen()
  }

  // Load pages list
  useEffect(() => {
    fetch('/api/pages?onlyDsl=1')
      .then((r) => r.json())
      .then((d) => setPages(d.pages ?? []))
      .catch(() => {})
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadPage = async (slug: string) => {
    if (!slug) return
    setLoadingPage(true)
    setError('')
    try {
      const res = await fetch(`/api/pages/${slug}`)
      if (!res.ok)
        throw new Error(
          'Page DSL not found — only pages published via this platform can be edited.'
        )
      const data = await res.json()
      const normalized = normalizeDSL(data)
      setDsl(normalized)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Loaded **${normalized.meta.title}** (/${slug}/). It has ${normalized.sections.length} sections: ${normalized.sections.map((s) => s.type).join(', ')}. What would you like to change?`,
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load page')
    } finally {
      setLoadingPage(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || !dsl) return
    const instruction = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: instruction }])
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/ai/edit-dsl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dsl, instruction }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Edit failed')
      setDsl(normalizeDSL(data))
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Done! I've updated the DSL based on your instruction. Check the preview on the right. You can keep refining or save the changes.`,
          dsl: data,
        },
      ])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, something went wrong: ${msg}` },
      ])
    } finally {
      setSending(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!dsl || !selectedSlug) return
    setSaving(true)
    setSaveMsg('')
    try {
      const res = await fetch(`/api/pages/${selectedSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dsl }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaveMsg('Draft saved ✓')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch {
      setSaveMsg('Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
      {/* Left: chat panel */}
      <div className="w-full lg:w-[420px] shrink-0 flex flex-col border-b border-gray-200 lg:border-b-0 lg:border-r bg-white">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 space-y-3 shrink-0">
          <div>
            <h1 className="text-body-md font-bold text-gray-900">AI Assistant</h1>
            <p className="text-body-sm text-gray-500">Chat to edit any page DSL</p>
          </div>
          <select
            value={selectedSlug}
            onChange={(e) => {
              setSelectedSlug(e.target.value)
              loadPage(e.target.value)
            }}
            className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 text-body-sm focus:outline-none focus:border-gray-400 transition-colors rounded"
          >
            <option value="">— select a page —</option>
            {pages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
          {loadingPage && (
            <p className="text-gray-400 text-body-sm flex items-center gap-1.5">
              <Loader2 size={13} className="animate-spin" /> Loading…
            </p>
          )}
          {error && (
            <p className="text-red-500 text-body-sm flex items-center gap-1.5">
              <AlertCircle size={13} /> {error}
            </p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div
                className={[
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                  msg.role === 'assistant' ? 'bg-gray-900' : 'bg-gray-200',
                ].join(' ')}
              >
                {msg.role === 'assistant' ? (
                  <Bot size={14} className="text-white" />
                ) : (
                  <User size={14} className="text-gray-600" />
                )}
              </div>
              <div
                className={[
                  'rounded px-3 py-2.5 text-body-sm max-w-[85%]',
                  msg.role === 'assistant'
                    ? 'bg-white text-gray-700 border border-gray-200'
                    : 'bg-gray-900 text-white',
                ].join(' ')}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded px-3 py-2.5">
                <Loader2 size={14} className="animate-spin text-gray-400" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-gray-200 space-y-2 shrink-0 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={
                dsl ? 'e.g. Change hero headline to emphasize AI...' : 'Select a page first'
              }
              disabled={!dsl || sending}
              className="flex-1 bg-white border border-gray-200 text-gray-900 px-3 py-2 text-body-sm focus:outline-none focus:border-gray-400 transition-colors rounded placeholder:text-gray-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!dsl || !input.trim() || sending}
              className="bg-gray-900 text-white p-2 rounded hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              <Send size={15} />
            </button>
          </div>

          {dsl && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="flex-1 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 px-3 py-1.5 text-body-sm font-bold transition-colors rounded flex items-center justify-center gap-1.5"
              >
                <Save size={13} /> {saving ? 'Saving…' : 'Save Draft'}
              </button>
              <a
                href={`/admin/create?slug=${selectedSlug}&mode=edit`}
                className="flex-1 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-3 py-1.5 text-body-sm font-bold transition-colors rounded flex items-center justify-center gap-1.5"
              >
                <ExternalLink size={13} /> Publish
              </a>
            </div>
          )}
          {saveMsg && <p className="text-brand-teal-medium text-body-sm text-center">{saveMsg}</p>}
        </div>
      </div>

      {/* Right: live preview */}
      <div
        ref={previewRef}
        className="flex-1 overflow-hidden flex flex-col bg-gray-50 border-t border-gray-200 lg:border-t-0 lg:border-l"
      >
        {/* Viewport toggle */}
        <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2 shrink-0 bg-white">
          {(['desktop', 'mobile'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setViewport(v)}
              className={[
                'px-3 py-1 rounded text-label font-bold transition-colors capitalize',
                viewport === v ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900',
              ].join(' ')}
            >
              {v}
            </button>
          ))}
          <button
            onClick={toggleFullscreen}
            className="ml-auto p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
        {!dsl ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-300">
            <Bot size={40} strokeWidth={1} />
            <p className="text-body-sm text-gray-400">Select a page to see its live preview here</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ contain: 'paint' }}>
            {viewport === 'mobile' ? (
              <div className="flex justify-center bg-gray-100 min-h-full py-4 px-3">
                <iframe
                  key={previewKey}
                  src="/admin/preview"
                  style={{
                    width: '100%',
                    maxWidth: 390,
                    height: iframeHeight,
                    border: 'none',
                    display: 'block',
                  }}
                  title="Mobile preview"
                />
              </div>
            ) : (
              <div className="w-full max-w-[1440px] mx-auto">
                <PageRenderer dsl={dsl} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
