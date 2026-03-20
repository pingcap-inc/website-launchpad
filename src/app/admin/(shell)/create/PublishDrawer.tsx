'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Loader2, Check, ExternalLink, AlertTriangle } from 'lucide-react'
import type { PageDSL } from '@/lib/dsl-schema'
import { SITE_BASE_URL } from '@/lib/env'

type DeployStatus = 'idle' | 'building' | 'ready' | 'error'

interface PublishResult {
  success?: boolean
  pageCommitUrl?: string
  sitemapCommitUrl?: string
  deployUrl?: string
  scoreTriggered?: boolean
  scoreTriggerError?: string
  scoreTriggerSkipped?: boolean
  scoreTriggerReason?: string
  error?: string
}

interface LocalGenerateResult {
  success?: boolean
  pagePath?: string
  dslPath?: string
  error?: string
}

interface PageScore {
  slug: string
  ux: number
  seo: number
  consistency: number
  overall: number
}

interface PublishDrawerProps {
  dsl: PageDSL
  slug: string
  slugLocked?: boolean
  onSlugChange: (slug: string) => void
  onMetaChange: (patch: Partial<PageDSL['meta']>) => void
  onClose: () => void
}

const DEPLOY_STEPS = (
  result: PublishResult | null,
  addToSitemap: boolean,
  deployStatus: DeployStatus,
  scoreStatus: 'idle' | 'queued' | 'loading' | 'ready' | 'error' | 'skipped'
) => [
  { label: 'Pushed to GitHub', done: !!result?.success },
  {
    label: 'Sitemap updated',
    done: !!result?.sitemapCommitUrl || (!!result?.success && !addToSitemap),
  },
  { label: 'Vercel rebuilding', done: deployStatus === 'ready' || deployStatus === 'error' },
  { label: 'Live globally', done: deployStatus === 'ready' },
  { label: 'Page scored', done: scoreStatus === 'ready' },
]

function scoreBadgeClass(score: number) {
  const base = 'px-2 py-0.5 rounded-full text-label font-bold border'
  if (score >= 85) {
    return `${base} border-emerald-200 text-emerald-700 bg-emerald-50`
  }
  if (score >= 70) {
    return `${base} border-amber-200 text-amber-700 bg-amber-50`
  }
  return `${base} border-red-200 text-red-600 bg-red-50`
}

export function PublishDrawer({
  dsl,
  slug,
  slugLocked = false,
  onSlugChange,
  onMetaChange,
  onClose,
}: PublishDrawerProps) {
  const branch = 'staging'
  const [addToSitemap, setAddToSitemap] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<PublishResult | null>(null)
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle')
  const [deployUrl, setDeployUrl] = useState('')
  const [localGenerating, setLocalGenerating] = useState(false)
  const [localResult, setLocalResult] = useState<LocalGenerateResult | null>(null)
  const [scoreStatus, setScoreStatus] = useState<
    'idle' | 'queued' | 'loading' | 'ready' | 'error' | 'skipped'
  >('idle')
  const [score, setScore] = useState<PageScore | null>(null)
  const [scoreError, setScoreError] = useState('')
  const scorePollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scorePollAttempts = useRef(0)
  const [showScoreNotice, setShowScoreNotice] = useState(false)
  const scoreNoticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const localSlug = slug.replace(/^\/|\/$/g, '')
  const slugValid = (() => {
    if (!localSlug) return false
    const segments = localSlug.split('/').filter(Boolean)
    return segments.length > 0 && segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
  })()

  const normalizeSlugInput = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9-/]/g, '')
      .replace(/\/{2,}/g, '/')
      .replace(/^\/|\/$/g, '')

  const canPublish = slugValid && !publishing

  const pollDeploy = () => {
    const start = Date.now()
    const MAX = 3 * 60 * 1000
    const tick = async () => {
      if (Date.now() - start > MAX) {
        setDeployStatus('error')
        return
      }
      try {
        const res = await fetch('/api/deploy-status')
        const { status } = (await res.json()) as { status: string }
        if (status === 'ready') {
          setDeployStatus('ready')
          return
        }
        if (status === 'error') {
          setDeployStatus('error')
          return
        }
        setDeployStatus('building')
        setTimeout(tick, 5000)
      } catch {
        setTimeout(tick, 5000)
      }
    }
    setTimeout(tick, 8000)
  }

  const handlePublish = async () => {
    setPublishing(true)
    setResult(null)
    setScore(null)
    setScoreError('')
    setScoreStatus('idle')
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: localSlug,
          dsl,
          branch: 'staging',
          addToSitemap,
          triggerScore: false,
        }),
      })
      const data = (await res.json()) as PublishResult
      setResult(data)
      if (data.success) {
        setDeployUrl(data.deployUrl ?? '')
        setDeployStatus('building')
        pollDeploy()
      }
    } finally {
      setPublishing(false)
    }
  }

  const handleLocalGenerate = async () => {
    setLocalGenerating(true)
    setLocalResult(null)
    try {
      const res = await fetch('/api/local-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: localSlug, dsl }),
      })
      const data = (await res.json()) as LocalGenerateResult
      setLocalResult(data)
    } finally {
      setLocalGenerating(false)
    }
  }

  const steps = DEPLOY_STEPS(result, addToSitemap, deployStatus, scoreStatus)

  const fetchScoreOnce = async (silenceErrors = false) => {
    try {
      const res = await fetch('/api/page-scores')
      const data = await res.json()
      const entry = (data.scores ?? []).find((item: PageScore) => item.slug === localSlug) as
        | PageScore
        | undefined
      if (entry) {
        setScore(entry)
        setScoreStatus('ready')
        return true
      }
      setScoreStatus((prev) => (prev === 'error' ? prev : 'loading'))
      return false
    } catch (err) {
      if (!silenceErrors) {
        setScoreStatus('error')
        setScoreError(err instanceof Error ? err.message : 'Failed to load score')
      }
      return false
    }
  }

  const triggerScore = async () => {
    setScoreError('')
    setScoreStatus('queued')
    try {
      const res = await fetch('/api/page-scores/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: localSlug }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to trigger scoring')
      setTimeout(() => {
        fetchScoreOnce(true).catch(() => {})
      }, 10_000)
    } catch (err) {
      setScoreStatus('error')
      setScoreError(err instanceof Error ? err.message : 'Failed to trigger scoring')
    }
  }

  useEffect(() => {
    if (!result?.success) return
    if (scoreStatus !== 'queued' && scoreStatus !== 'loading') return

    if (!scorePollRef.current) {
      scorePollAttempts.current = 0
      scorePollRef.current = setInterval(async () => {
        scorePollAttempts.current += 1
        const found = await fetchScoreOnce(true)
        if (found || scorePollAttempts.current >= 20) {
          if (scorePollRef.current) {
            clearInterval(scorePollRef.current)
            scorePollRef.current = null
          }
        }
      }, 15_000)
    }

    return () => {
      if (scorePollRef.current) {
        clearInterval(scorePollRef.current)
        scorePollRef.current = null
      }
    }
  }, [result?.success, scoreStatus, localSlug])

  useEffect(() => {
    if (scoreStatus !== 'ready' || !score) return
    setShowScoreNotice(true)
    if (scoreNoticeTimer.current) clearTimeout(scoreNoticeTimer.current)
    scoreNoticeTimer.current = setTimeout(() => {
      setShowScoreNotice(false)
    }, 4500)
    return () => {
      if (scoreNoticeTimer.current) {
        clearTimeout(scoreNoticeTimer.current)
        scoreNoticeTimer.current = null
      }
    }
  }, [scoreStatus, score])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      {showScoreNotice && score && (
        <div className="fixed top-4 right-4 z-50 w-[22rem] max-w-[calc(100%-2rem)] rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 shadow-sm animate-slide-in-right">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-body-sm font-bold text-emerald-800">Scoring complete</p>
              <p className="text-label text-emerald-700">
                Overall {score.overall} · UX {score.ux} · SEO {score.seo} · Cons {score.consistency}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowScoreNotice(false)}
              className="text-emerald-700 hover:text-emerald-900 text-label font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <div className="w-96 bg-white h-full shadow-xl flex flex-col overflow-y-auto relative">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-h3-sm font-bold text-gray-900">Publish Page</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5 pb-20">
          {/* Slug */}
          <div className="space-y-1.5">
            <label className="block text-body-sm font-bold text-gray-700">URL Slug</label>
            <div className="flex items-center gap-1 border border-gray-200 rounded px-3 py-2 bg-white focus-within:border-gray-400 transition-colors">
              <span className="text-gray-400 text-body-sm">/</span>
              <input
                type="text"
                value={localSlug}
                onChange={(e) => onSlugChange(normalizeSlugInput(e.target.value))}
                placeholder="page-slug"
                className={[
                  'flex-1 bg-transparent text-body-sm focus:outline-none',
                  slugLocked ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900',
                ].join(' ')}
                disabled={slugLocked}
              />
              <span className="text-gray-400 text-body-sm">/</span>
            </div>
            {localSlug && slugValid && (
              <p className="text-label text-gray-400">
                {SITE_BASE_URL.replace(/\/$/, '')}/
                <span className="text-gray-700">{localSlug}</span>/
              </p>
            )}
            {localSlug && !slugValid && (
              <p className="text-red-500 text-label">Only lowercase letters, numbers, hyphens</p>
            )}
          </div>

          {/* SEO */}
          <div className="space-y-2">
            <p className="text-body-sm font-bold text-gray-700">Meta Title</p>
            <input
              type="text"
              value={dsl.meta.title ?? ''}
              onChange={(e) => onMetaChange({ title: e.target.value })}
              placeholder="Meta title (50–60 chars)"
              className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
            />
            <p className="text-label text-gray-400">
              {(dsl.meta.title ?? '').length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-body-sm font-bold text-gray-700">Meta Description</p>
            <textarea
              value={dsl.meta.description ?? ''}
              onChange={(e) => onMetaChange({ description: e.target.value })}
              rows={3}
              placeholder="Meta description (120–160 chars)"
              className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-300"
            />
            <p className="text-label text-gray-400">
              {(dsl.meta.description ?? '').length}/160 characters · OG/Twitter will be auto
              generated
            </p>
          </div>

          {/* Branch — main publish disabled */}
          <div className="space-y-2">
            <p className="text-body-sm font-bold text-gray-700">Publish Branch</p>
            <div className="flex items-center justify-between rounded border border-gray-200 px-3 py-2">
              <span className="text-body-sm text-gray-900">staging</span>
              <span className="text-label text-gray-400">default</span>
            </div>
            <div className="flex items-start gap-2 text-amber-700 text-body-sm bg-amber-50 border border-amber-200 rounded p-3">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <p>
                Publishing to <span className="font-bold">main</span> is restricted to developers.
                Ask a developer to publish to production.
              </p>
            </div>
          </div>

          {/* Sitemap toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setAddToSitemap(!addToSitemap)}
              className={[
                'w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0',
                addToSitemap ? 'bg-gray-900' : 'bg-gray-200',
              ].join(' ')}
            >
              <div
                className={[
                  'w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow',
                  addToSitemap ? 'translate-x-4' : 'translate-x-0.5',
                ].join(' ')}
              />
            </div>
            <span className="text-body-sm text-gray-700">Add to sitemap.ts</span>
          </label>

          {/* Publish button */}
          <button
            onClick={handlePublish}
            disabled={!canPublish}
            className={[
              'w-full font-bold px-4 py-2.5 text-body-sm rounded transition-colors flex items-center justify-center gap-2',
              'bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40',
            ].join(' ')}
          >
            {publishing ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Publishing…
              </>
            ) : (
              '→ Publish to Staging'
            )}
          </button>

          {/* Local generate button */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={handleLocalGenerate}
              disabled={!slugValid || localGenerating}
              className="w-full font-bold px-4 py-2.5 text-body-sm rounded border border-gray-300 text-gray-800 hover:bg-gray-50 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
            >
              {localGenerating ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Generating locally…
                </>
              ) : (
                'Generate Locally (Test)'
              )}
            </button>
          )}

          {/* {localResult?.success && (
            <div className="text-body-sm text-gray-600 bg-gray-50 border border-gray-200 rounded p-3">
              <p className="font-bold text-gray-700 mb-1">Local files written</p>
              <p className="text-gray-500">page: {localResult.pagePath}</p>
              <p className="text-gray-500">dsl: {localResult.dslPath}</p>
            </div>
          )}
          {localResult?.error && (
            <div className="flex gap-2 items-start text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <p>{localResult.error}</p>
            </div>
          )} */}

          {/* Deploy status */}
          {result && (
            <div className="space-y-3">
              <p className="text-body-sm font-bold text-gray-700">Deployment Status</p>
              {steps.map(({ label, done }, i) => {
                const isRunning = i === 2 && deployStatus === 'building'
                return (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className={[
                        'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                        done ? 'bg-brand-teal-medium' : isRunning ? 'bg-gray-900' : 'bg-gray-100',
                      ].join(' ')}
                    >
                      {done ? (
                        <Check size={11} className="text-white" />
                      ) : isRunning ? (
                        <Loader2 size={11} className="text-white animate-spin" />
                      ) : (
                        <span className="text-label text-gray-400">{i + 1}</span>
                      )}
                    </div>
                    <span
                      className={[
                        'text-body-sm',
                        done
                          ? 'text-brand-teal-medium font-bold'
                          : isRunning
                            ? 'text-gray-900'
                            : 'text-gray-400',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </div>
                )
              })}

              {result.pageCommitUrl && (
                <a
                  href={result.pageCommitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-body-sm text-brand-blue-medium hover:underline"
                >
                  <ExternalLink size={13} /> View commit
                </a>
              )}

              {deployStatus === 'ready' && deployUrl && (
                <a
                  href={deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-teal-bg/20 border border-brand-teal-medium/50 text-brand-teal-medium font-bold px-4 py-2.5 rounded text-body-sm hover:bg-brand-teal-bg/30 transition-colors"
                >
                  <ExternalLink size={14} /> View live page
                </a>
              )}

              {result.error && (
                <div className="flex gap-2 items-start text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <p>{result.error}</p>
                </div>
              )}

              {/* Score status */}
              <div className="space-y-2 pt-2">
                <p className="text-body-sm font-bold text-gray-700">Page Score</p>
                {score ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={scoreBadgeClass(score.overall)}>Overall {score.overall}</span>
                    <span className="text-label text-gray-500">
                      UX {score.ux} · SEO {score.seo} · Cons {score.consistency}
                    </span>
                    <button
                      type="button"
                      onClick={() => fetchScoreOnce()}
                      className="text-gray-400 hover:text-gray-900 text-label font-bold"
                    >
                      Refresh
                    </button>
                  </div>
                ) : scoreStatus === 'error' ? (
                  <div className="flex items-start gap-2 text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                    <div>
                      <p>{scoreError || 'Failed to load score'}</p>
                      <button
                        type="button"
                        onClick={triggerScore}
                        className="text-red-700 underline text-label font-bold mt-1"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                ) : scoreStatus === 'queued' || scoreStatus === 'loading' ? (
                  <div className="text-body-sm text-gray-500 bg-gray-50 border border-gray-200 rounded p-3">
                    <p>
                      Scoring queued. It can take a few minutes after publish. This panel will
                      refresh automatically.
                    </p>
                    <button
                      type="button"
                      onClick={() => fetchScoreOnce()}
                      className="text-gray-700 underline text-label font-bold mt-2"
                    >
                      Check now
                    </button>
                  </div>
                ) : scoreStatus === 'skipped' ? (
                  <div className="text-body-sm text-gray-500 bg-gray-50 border border-gray-200 rounded p-3">
                    <p>{scoreError || 'Scoring skipped by sampling rule.'}</p>
                    <button
                      type="button"
                      onClick={triggerScore}
                      className="text-gray-700 underline text-label font-bold mt-2"
                    >
                      Run scoring now
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm text-gray-400">No score yet.</span>
                    <button
                      type="button"
                      onClick={triggerScore}
                      className="text-gray-700 underline text-label font-bold"
                    >
                      Run scoring now.
                    </button>
                  </div>
                )}
                <p className="text-label text-gray-400">
                  Scores are based on Lighthouse Performance/SEO.
                </p>
              </div>
            </div>
          )}

          {/* Promote to Production — disabled */}
        </div>
      </div>
    </div>
  )
}
