'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileText, UploadCloud, Sparkles, ArrowRight, X } from 'lucide-react'

const ENTRY_OPTIONS = [
  {
    id: 'paste',
    title: 'Paste Existing Content',
    desc: 'Bring your current copy and let AI restructure it.',
    cta: 'Paste content',
    helper: 'Best for: quick clean-up',
  },
  {
    id: 'gdoc',
    title: 'Import Google Doc',
    desc: 'Pull copy directly from a shared doc and normalize formatting.',
    cta: 'Connect Google Doc',
    helper: 'Best for: long-form pages',
  },
  {
    id: 'score',
    title: 'Score + Improve',
    desc: 'Run content through your scoring system for SEO/UX improvements.',
    cta: 'Run scoring',
    helper: 'Best for: standardization',
  },
]

function isGoogleDocUrl(input: string) {
  return /https?:\/\/docs\.google\.com\/document\/d\/[a-zA-Z0-9-_]+/.test(input)
}

const REFINE_STORAGE_KEY = 'admin-refine-payload'
const REFINE_RESULT_KEY = 'admin-refine-result'
const REFINE_LAST_KEY = 'admin-refine-last'

type RefinePayload =
  | { type: 'paste'; content: string }
  | { type: 'gdoc'; url: string; notes?: string }
  | { type: 'score'; profile: string; target: string }

type RefineResult = {
  sourceLabel: string
  sourceUrl?: string
  wordCount?: number
  score?: number
  suggestions?: string[]
  status?: string
}

function saveRefinePayload(payload: RefinePayload) {
  localStorage.setItem(REFINE_STORAGE_KEY, JSON.stringify(payload))
  localStorage.setItem(REFINE_LAST_KEY, JSON.stringify({ ...payload, savedAt: Date.now() }))
}

function saveRefineResult(result: RefineResult) {
  localStorage.setItem(REFINE_RESULT_KEY, JSON.stringify(result))
}

export default function RefinePage() {
  const router = useRouter()
  const [activeModal, setActiveModal] = useState<null | 'paste' | 'gdoc' | 'score'>(null)
  const [pasteContent, setPasteContent] = useState('')
  const [gdocUrl, setGdocUrl] = useState('')
  const [gdocNotes, setGdocNotes] = useState('')
  const [scoreProfile, setScoreProfile] = useState('')
  const [scoreTarget, setScoreTarget] = useState('')
  const [modalError, setModalError] = useState('')
  const [modalLoading, setModalLoading] = useState(false)

  const openModal = (id: 'paste' | 'gdoc' | 'score') => {
    setModalError('')
    setModalLoading(false)
    setActiveModal(id)
  }
  const closeModal = () => setActiveModal(null)

  const startRefine = (payload: RefinePayload) => {
    saveRefinePayload(payload)
    router.push('/admin/create?refine=1')
  }

  const handlePasteContinue = () => {
    const content = pasteContent.trim()
    if (isGoogleDocUrl(content)) {
      handleGdocContinue(content)
      return
    }
    const wordCount = content ? content.split(/\s+/).length : 0
    saveRefineResult({ sourceLabel: 'Pasted content', wordCount })
    startRefine({ type: 'paste', content })
  }

  const handleGdocContinue = async (overrideUrl?: string) => {
    const nextUrl = overrideUrl ?? gdocUrl
    setModalLoading(true)
    setModalError('')
    try {
      const res = await fetch('/api/refine/google-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: nextUrl, notes: gdocNotes }),
      })
      const data = (await res.json()) as { content?: string; error?: string }
      if (!res.ok || !data.content) throw new Error(data.error ?? 'Import failed')
      const content = data.content.trim()
      const wordCount = content ? content.split(/\s+/).length : 0
      saveRefineResult({ sourceLabel: 'Google Doc import', sourceUrl: nextUrl, wordCount })
      startRefine({ type: 'paste', content })
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Import failed')
    } finally {
      setModalLoading(false)
    }
  }

  const handleScoreContinue = async () => {
    setModalLoading(true)
    setModalError('')
    try {
      const res = await fetch('/api/refine/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: scoreProfile,
          target: scoreTarget,
        }),
      })
      const data = (await res.json()) as {
        score?: number
        suggestions?: string[]
        status?: string
        wordCount?: number
        error?: string
      }
      if (!res.ok) throw new Error(data.error ?? 'Scoring failed')
      saveRefineResult({
        sourceLabel: 'Scoring system',
        score: data.score,
        suggestions: data.suggestions,
        status: data.status,
        wordCount: data.wordCount,
      })
      startRefine({ type: 'score', profile: scoreProfile, target: scoreTarget })
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Scoring failed')
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-10">
        <p className="text-label text-brand-violet-medium uppercase tracking-[0.16em]">
          Import & Standardize Page
        </p>
        <h1 className="text-h3-xl font-bold text-gray-900 mt-2">Import and Standardize a Page</h1>
        <p className="text-body-sm text-gray-500 mt-2 max-w-2xl">
          Import or paste content, then let AI optimize structure, SEO, and UX while applying your
          scoring system. Choose a starting path below.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {ENTRY_OPTIONS.map((option, index) => (
          <div
            key={option.title}
            className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-h3-sm font-bold text-brand-violet-medium">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              {index === 0 && <FileText size={18} className="text-gray-400" />}
              {index === 1 && <UploadCloud size={18} className="text-gray-400" />}
              {index === 2 && <Sparkles size={18} className="text-gray-400" />}
            </div>
            <div>
              <p className="text-body-md font-bold text-gray-900">{option.title}</p>
              <p className="text-body-sm text-gray-500 mt-1">{option.desc}</p>
              <p className="text-label text-gray-400 mt-2">{option.helper}</p>
            </div>
            <button
              type="button"
              onClick={() => openModal(option.id as 'paste' | 'gdoc' | 'score')}
              className="mt-auto inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-bold px-4 py-2 text-body-sm rounded hover:text-gray-900 hover:border-gray-400 transition-colors"
            >
              {option.cta} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl bg-gray-50 p-6">
        <p className="text-body-sm font-bold text-gray-900">Need to pick a page to standardize?</p>
        <p className="text-body-sm text-gray-500 mt-1">
          Go to the Pages list, select a page, and open it in the editor for edits.
        </p>
        <Link
          href="/admin/pages"
          className="mt-3 inline-flex items-center gap-2 text-body-sm font-bold text-gray-700 hover:text-gray-900"
        >
          View all pages <ArrowRight size={14} />
        </Link>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-md font-bold text-gray-900">
                {activeModal === 'paste' && 'Paste content'}
                {activeModal === 'gdoc' && 'Import Google Doc'}
                {activeModal === 'score' && 'Run scoring'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            {activeModal === 'paste' && (
              <div className="space-y-4">
                <textarea
                  value={pasteContent}
                  onChange={(e) => setPasteContent(e.target.value)}
                  rows={8}
                  placeholder="Paste content here... (or paste a Google Doc link)"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePasteContinue}
                    disabled={!pasteContent.trim() || modalLoading}
                    className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
                  >
                    {modalLoading ? 'Loading…' : 'Continue'}
                  </button>
                </div>
                {modalError && (
                  <p className="text-body-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
                    {modalError}
                  </p>
                )}
              </div>
            )}

            {activeModal === 'gdoc' && (
              <div className="space-y-4">
                <div>
                  <label className="text-label text-gray-500">Google Doc URL</label>
                  <input
                    value={gdocUrl}
                    onChange={(e) => setGdocUrl(e.target.value)}
                    placeholder="https://docs.google.com/document/d/..."
                    className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-label text-gray-500">Notes (optional)</label>
                  <textarea
                    value={gdocNotes}
                    onChange={(e) => setGdocNotes(e.target.value)}
                    rows={3}
                    placeholder="Any context or goals for the refinement..."
                    className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGdocContinue()}
                    disabled={!gdocUrl.trim() || modalLoading}
                    className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
                  >
                    {modalLoading ? 'Loading…' : 'Continue'}
                  </button>
                </div>
                {modalError && (
                  <p className="text-body-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
                    {modalError}
                  </p>
                )}
              </div>
            )}

            {activeModal === 'score' && (
              <div className="space-y-4">
                <div>
                  <label className="text-label text-gray-500">Scoring profile</label>
                  <input
                    value={scoreProfile}
                    onChange={(e) => setScoreProfile(e.target.value)}
                    placeholder="e.g. SEO-UX-2024"
                    className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-label text-gray-500">Target URL or paste excerpt</label>
                  <textarea
                    value={scoreTarget}
                    onChange={(e) => setScoreTarget(e.target.value)}
                    rows={4}
                    placeholder="https://www.example.com/page or paste key sections"
                    className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleScoreContinue}
                    disabled={!scoreProfile.trim() || !scoreTarget.trim() || modalLoading}
                    className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
                  >
                    {modalLoading ? 'Loading…' : 'Continue'}
                  </button>
                </div>
                {modalError && (
                  <p className="text-body-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
                    {modalError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
