'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
  X,
  Loader2,
  Check,
  ExternalLink,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react'
import type { PageDSL } from '@/lib/dsl-schema'
import type { ContentPageType } from '@/lib/detect-page-type'
import { SITE_BASE_URL } from '@/lib/env'
import type { PageScoreResult, TopIssue } from '@/lib/scoring'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type DeployStatus = 'idle' | 'building' | 'ready' | 'error'

interface PublishResult {
  success?: boolean
  pageCommitUrl?: string
  sitemapCommitUrl?: string
  deployUrl?: string
  error?: string
}

interface LocalGenerateResult {
  success?: boolean
  pagePath?: string
  dslPath?: string
  error?: string
}

interface PublishDrawerProps {
  dsl: PageDSL
  slug: string
  slugLocked?: boolean
  onSlugChange: (slug: string) => void
  onMetaChange: (patch: Partial<PageDSL['meta']>) => void
  onClose: () => void
}

type CheckStatus = 'pass' | 'warn' | 'fail'
type PrePublishCheck = { label: string; status: CheckStatus; detail?: string }

const DEPLOY_STEPS = (result: PublishResult | null, deployStatus: DeployStatus) => [
  { label: 'Pushed to GitHub', done: !!result?.success },
  { label: 'Vercel rebuilding', done: deployStatus === 'ready' || deployStatus === 'error' },
  { label: 'Live globally', done: deployStatus === 'ready' },
]

function getScoreColor(score: number) {
  if (score >= 80)
    return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  if (score >= 60) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
  return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' }
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
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<PublishResult | null>(null)
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle')
  const [deployUrl, setDeployUrl] = useState('')
  const [localGenerating, setLocalGenerating] = useState(false)
  const [localResult, setLocalResult] = useState<LocalGenerateResult | null>(null)
  const [aiScoreStatus, setAiScoreStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [showChecklist, setShowChecklist] = useState(false)
  const [showScoreDetails, setShowScoreDetails] = useState(false)
  const [aiScore, setAiScore] = useState<PageScoreResult | null>(null)
  const [aiScoreError, setAiScoreError] = useState('')
  const hasTriggeredScoreRef = useRef(false)
  const scoredDslRef = useRef<string | null>(null)

  const localSlug = slug.trim().replace(/^\/|\/$/g, '')
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
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: localSlug,
          dsl,
          branch: 'staging',
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

  const contentPageType: ContentPageType = dsl.sections.some(
    (s) => (s.type as string) === 'numberedList'
  )
    ? 'listicle'
    : 'marketing'
  const scoreLabels =
    contentPageType === 'listicle'
      ? { ux: 'Content Depth', seo: 'AEO Quality', consistency: 'Structure' }
      : { ux: 'UX', seo: 'SEO', consistency: 'Consistency' }

  const handleRunAiScore = useCallback(async () => {
    setAiScoreError('')
    setAiScoreStatus('loading')
    try {
      const res = await fetch('/api/score-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dsl, pageType: contentPageType }),
      })
      const data = (await res.json()) as { score?: PageScoreResult; error?: string }
      if (!res.ok || !data.score) throw new Error(data.error ?? 'Failed to score page')
      setAiScore(data.score)
      scoredDslRef.current = JSON.stringify(dsl)
      setAiScoreStatus('ready')
    } catch (err) {
      setAiScoreStatus('error')
      setAiScoreError(err instanceof Error ? err.message : 'Failed to score page')
    }
  }, [dsl, contentPageType])

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

  const steps = DEPLOY_STEPS(result, deployStatus)

  const { seoChecks, lintChecks, hasBlockingChecks } = useMemo(() => {
    const nextSeo: PrePublishCheck[] = []
    const nextLint: PrePublishCheck[] = []

    const title = (dsl.meta.title ?? '').trim()
    const description = (dsl.meta.description ?? '').trim()
    const canonical = (dsl.meta.canonical ?? '').trim()
    const canonicalExpected = `/${localSlug}/`

    if (!title) {
      nextSeo.push({ label: 'Meta title', status: 'fail', detail: 'Required.' })
    } else {
      nextSeo.push({ label: 'Meta title', status: 'pass' })
    }

    if (!description) {
      nextSeo.push({ label: 'Meta description', status: 'fail', detail: 'Required.' })
    } else {
      nextSeo.push({ label: 'Meta description', status: 'pass' })
    }

    if (!slugValid) {
      nextLint.push({
        label: 'Slug',
        status: 'fail',
        detail: `Slug value: "${slug}" → normalized: "${localSlug}"`,
      })
    } else {
      nextLint.push({ label: 'Slug', status: 'pass' })
    }

    dsl.sections.forEach((section, idx) => {
      const prefix = `Section ${idx + 1} (${section.type})`
      const props = section.props as any
      switch (section.type) {
        case 'hero':
          if (!props.headline?.trim()) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Headline is required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Headline` })
          }
          break
        case 'stats':
          if (!props.items?.length) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Add stats.`,
            })
          } else if (props.items.some((item: any) => !item.value || !item.label)) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Each stat needs value + label.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Stats` })
          }
          break
        case 'featureGrid':
        case 'featureCard':
        case 'featureHighlights':
          if (!props.title?.trim()) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Title is required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Title` })
          }
          if (!props.items?.length) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Add items.`,
            })
          } else if (props.items.some((item: any) => !item.title || !item.description)) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Each item needs title + description.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Items` })
          }
          break
        case 'featureTabs':
          if (!props.title?.trim()) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Title is required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Title` })
          }
          if (!props.tabs?.length) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Add tabs.`,
            })
          } else if (props.tabs.some((tab: any) => !tab.label || !tab.image?.image?.url)) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Each tab needs label + image.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Tabs` })
          }
          break
        case 'logoCloud':
          if (!props.logos?.length) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Add logos.`,
            })
          } else if (props.logos.some((logo: any) => !logo.name || !logo.image?.url)) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Each logo needs name + image.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Logos` })
          }
          break
        case 'testimonials':
          if (!props.title?.trim()) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Title is required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Title` })
          }
          if (!props.items?.length) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Add testimonials.`,
            })
          } else if (props.items.some((item: any) => !item.quote || !item.author)) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Each item needs quote + author.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Testimonials` })
          }
          break
        case 'faq':
          if (!props.items?.length) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Add FAQs.`,
            })
          } else if (props.items.some((item: any) => !item.q || !item.a)) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Each item needs question + answer.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · FAQs` })
          }
          break
        case 'cta':
          if (!props.title?.trim()) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Title is required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Title` })
          }
          if (!props.primaryCta?.text || !props.primaryCta?.href) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Primary CTA text + href required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Primary CTA` })
          }
          break
        case 'form':
          if (!props.formId || !props.portalId) {
            nextLint.push({
              label: 'Section',
              status: 'fail',
              detail: `${prefix} · Form ID + Portal ID required.`,
            })
          } else {
            nextLint.push({ label: 'Section', status: 'pass', detail: `${prefix} · Form` })
          }
          break
        default:
          break
      }
    })

    const blocking = [...nextSeo, ...nextLint].some((check) => check.status === 'fail')
    return { seoChecks: nextSeo, lintChecks: nextLint, hasBlockingChecks: blocking }
  }, [dsl, localSlug, slugValid])

  const canPublishNow = canPublish && !hasBlockingChecks

  const isScoreStale = useMemo(
    () =>
      aiScoreStatus === 'ready' &&
      scoredDslRef.current !== null &&
      scoredDslRef.current !== JSON.stringify(dsl),
    [aiScoreStatus, dsl]
  )

  const groupedIssues = useMemo(() => {
    if (!aiScore) return {} as Record<string, TopIssue[]>
    return aiScore.topIssues.reduce<Record<string, TopIssue[]>>((acc, issue) => {
      const key = issue.dimension
      if (!acc[key]) acc[key] = []
      acc[key].push(issue)
      return acc
    }, {})
  }, [aiScore])

  useEffect(() => {
    if (!hasBlockingChecks && aiScoreStatus === 'idle' && !hasTriggeredScoreRef.current) {
      hasTriggeredScoreRef.current = true
      handleRunAiScore()
    }
  }, [hasBlockingChecks, aiScoreStatus, handleRunAiScore])

  const scoreColors = aiScore ? getScoreColor(aiScore.finalScore) : null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30" onClick={onClose} />

      {/* Drawer */}
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

          {/* Pre-publish checks */}
          <div className="space-y-2">
            <p className="text-body-sm font-bold text-gray-700">Pre-publish checks</p>
            <div className="flex items-center justify-between gap-2">
              {(() => {
                const failed = [...seoChecks, ...lintChecks].filter(
                  (check) => check.status === 'fail'
                ).length
                if (failed === 0) {
                  return (
                    <div className="inline-flex items-center gap-1.5 text-label font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      All checks passed
                    </div>
                  )
                }
                return (
                  <div className="inline-flex items-center gap-1.5 text-label font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {failed} checks failed
                  </div>
                )
              })()}
              <button
                type="button"
                onClick={() => setShowChecklist((v) => !v)}
                className="text-gray-600 hover:text-gray-900 text-label font-bold flex items-center gap-1"
                aria-label={showChecklist ? 'Hide checklist' : 'Show checklist'}
              >
                {showChecklist ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {showChecklist && (
              <div className="grid grid-cols-1 gap-2">
                {seoChecks.length === 0 && lintChecks.length === 0 ? (
                  <div className="text-body-sm text-gray-400">No issues found.</div>
                ) : (
                  <>
                    {seoChecks.length > 0 && (
                      <div className="border border-gray-200 rounded p-3 bg-gray-50">
                        <p className="text-label font-bold text-gray-600 mb-2">SEO</p>
                        <div className="space-y-1">
                          {seoChecks.map((check, index) => (
                            <div
                              key={`${check.label}-${index}`}
                              className="flex items-start gap-2 text-body-sm"
                            >
                              {check.status === 'pass' ? (
                                <span className="mt-0.5 text-emerald-600">
                                  <Check size={12} />
                                </span>
                              ) : (
                                <span className="mt-0.5 text-red-500">
                                  <X size={12} />
                                </span>
                              )}
                              <span className="text-gray-700">
                                {check.label}
                                {check.detail ? (
                                  <span className="text-gray-400"> · {check.detail}</span>
                                ) : null}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {lintChecks.length > 0 && (
                      <div className="border border-gray-200 rounded p-3 bg-gray-50">
                        <p className="text-label font-bold text-gray-600 mb-2">Lint</p>
                        <div className="space-y-1">
                          {lintChecks.map((check, index) => (
                            <div
                              key={`${check.label}-${index}`}
                              className="flex items-start gap-2 text-body-sm"
                            >
                              {check.status === 'pass' ? (
                                <span className="mt-0.5 text-emerald-600">
                                  <Check size={12} />
                                </span>
                              ) : (
                                <span className="mt-0.5 text-red-500">
                                  <X size={12} />
                                </span>
                              )}
                              <span className="text-gray-700">
                                {check.label}
                                {check.detail ? (
                                  <span className="text-gray-400"> · {check.detail}</span>
                                ) : null}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {hasBlockingChecks && (
              <p className="text-label text-red-500">Fix blocking checks to enable publish.</p>
            )}
          </div>

          {/* AI Quality Review — always visible */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-body-sm font-bold text-gray-700">AI Quality Review</p>
              {aiScoreStatus === 'ready' && !isScoreStale && (
                <button
                  type="button"
                  onClick={handleRunAiScore}
                  className="text-gray-500 hover:text-gray-700 underline text-label font-bold"
                >
                  Re-score
                </button>
              )}
            </div>

            {/* Stale score banner */}
            {isScoreStale && (
              <div className="flex items-center justify-between gap-2 text-label text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                <span>Content changed · Score may be outdated</span>
                <button
                  type="button"
                  onClick={handleRunAiScore}
                  className="font-bold underline shrink-0"
                >
                  Re-score
                </button>
              </div>
            )}

            {/* Blocked by pre-publish checks */}
            {hasBlockingChecks && (
              <div className="text-body-sm text-gray-400 bg-gray-50 border border-gray-100 rounded p-3">
                Fix checks above to review quality.
              </div>
            )}

            {/* Loading */}
            {!hasBlockingChecks && aiScoreStatus === 'loading' && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-center gap-2 text-body-sm text-gray-500">
                  <Loader2 size={14} className="animate-spin" />
                  Analyzing page quality…
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-2 bg-gray-100 rounded animate-pulse w-2/3" />
                  <div className="h-2 bg-gray-100 rounded animate-pulse w-1/2" />
                </div>
              </div>
            )}

            {/* Error */}
            {!hasBlockingChecks && aiScoreStatus === 'error' && (
              <div className="flex items-start gap-2 text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p>{aiScoreError || 'Failed to score page'}</p>
                  <button
                    type="button"
                    onClick={handleRunAiScore}
                    className="mt-1 text-red-600 underline text-label font-bold"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!hasBlockingChecks && aiScoreStatus === 'idle' && (
              <div className="text-body-sm text-gray-500 bg-gray-50 border border-gray-200 rounded p-3 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-gray-400" />
                Preparing quality review…
              </div>
            )}

            {/* Score results */}
            {!hasBlockingChecks && aiScoreStatus === 'ready' && aiScore && scoreColors && (
              <div className="space-y-3">
                {/* Score banner */}
                <div className={`rounded-lg p-4 ${scoreColors.bg} border ${scoreColors.border}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${scoreColors.bg} border-2 ${scoreColors.border}`}
                    >
                      <span className={`text-body-lg font-bold ${scoreColors.text}`}>
                        {aiScore.finalScore}
                      </span>
                    </div>
                    <div>
                      <p className={`text-body-sm font-bold ${scoreColors.text}`}>Quality Score</p>
                      <p className="text-label text-gray-500">
                        {aiScore.finalScore >= 80
                          ? 'Ready to publish'
                          : aiScore.finalScore >= 60
                            ? 'Review suggested improvements'
                            : 'Significant improvements needed'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label font-bold bg-white/60 text-gray-700 border border-gray-200/60">
                      {scoreLabels.ux} {aiScore.ux.score}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label font-bold bg-white/60 text-gray-700 border border-gray-200/60">
                      {scoreLabels.seo} {aiScore.seo.score}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label font-bold bg-white/60 text-gray-700 border border-gray-200/60">
                      {scoreLabels.consistency} {aiScore.consistency.score}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center"
                            aria-label="View scoring criteria"
                          >
                            <Info size={13} className="text-gray-400 hover:text-gray-600" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs whitespace-normal text-body-sm">
                          <div className="space-y-2">
                            <div>
                              <p className="font-bold text-text-inverse">{scoreLabels.ux} (40)</p>
                              <p>
                                Clear hierarchy, CTA clarity/placement, scannability, section length
                                and readability, visual balance.
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-text-inverse">{scoreLabels.seo} (30)</p>
                              <p>
                                Title/description presence, heading structure, natural keywords,
                                semantic structure, image alt text.
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-text-inverse">
                                {scoreLabels.consistency} (30)
                              </p>
                              <p>
                                Allowed components, layout consistency (spacing/width), tone
                                consistency (marketing), avoid redundancy.
                              </p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Suggested improvements */}
                {aiScore.topIssues.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-label font-bold text-gray-600">Suggested Improvements</p>
                    <div className="space-y-1.5">
                      {aiScore.topIssues.map((item, index) => {
                        const isError = item.severity === 'error'
                        return (
                          <div
                            key={`issue-${index}`}
                            className={[
                              'rounded px-3 py-2 border',
                              isError
                                ? 'bg-red-50/60 border-red-200'
                                : 'bg-amber-50/50 border-amber-100',
                            ].join(' ')}
                          >
                            <div className="flex items-start gap-2 text-body-sm text-gray-700">
                              <AlertTriangle
                                size={13}
                                className={[
                                  'mt-0.5 shrink-0',
                                  isError ? 'text-red-500' : 'text-amber-500',
                                ].join(' ')}
                              />
                              <span className="font-medium">{item.issue}</span>
                            </div>
                            {item.fix && (
                              <p className="mt-1 ml-5 text-label text-gray-500">→ {item.fix}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-body-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-3 py-2">
                    <Check size={13} className="shrink-0" />
                    <span>No major issues found.</span>
                  </div>
                )}

                {/* Detailed feedback (expandable) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowScoreDetails((value) => !value)}
                    className="text-gray-500 hover:text-gray-700 text-label font-bold inline-flex items-center gap-1"
                  >
                    {showScoreDetails ? 'Hide detailed feedback' : 'Show detailed feedback'}
                    {showScoreDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                {showScoreDetails && (
                  <div className="border border-gray-200 rounded p-3 bg-gray-50 space-y-4 text-body-sm text-gray-600">
                    {(
                      [
                        { key: 'ux', label: scoreLabels.ux, data: aiScore.ux },
                        { key: 'seo', label: scoreLabels.seo, data: aiScore.seo },
                        {
                          key: 'consistency',
                          label: scoreLabels.consistency,
                          data: aiScore.consistency,
                        },
                      ] as const
                    ).map(({ key, label, data }) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-label font-bold text-gray-600">{label}</p>
                          <span className="text-label text-gray-400">
                            {key === 'ux' ? `${data.score}/40` : `${data.score}/30`}
                          </span>
                        </div>
                        {data.feedback.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-1">
                            {data.feedback.map((item, i) => (
                              <li key={`${key}-${i}`}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400">No feedback.</p>
                        )}
                        {/* Issues from topIssues that belong to this dimension */}
                        {(groupedIssues[key]?.length ?? 0) > 0 && (
                          <div className="mt-2 space-y-1">
                            {groupedIssues[key].map((issue, i) => (
                              <div
                                key={`grouped-${key}-${i}`}
                                className={[
                                  'rounded px-2.5 py-1.5 border text-label',
                                  issue.severity === 'error'
                                    ? 'bg-red-50 border-red-200 text-red-700'
                                    : 'bg-amber-50 border-amber-100 text-amber-700',
                                ].join(' ')}
                              >
                                <span className="font-medium">{issue.issue}</span>
                                {issue.fix && (
                                  <span className="block text-gray-500 mt-0.5">→ {issue.fix}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {aiScore.ruleFindings.length > 0 && (
                      <div>
                        <p className="text-label font-bold text-gray-600 mb-1">Rule checks</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {aiScore.ruleFindings.map((finding, index) => (
                            <li key={`rule-${index}`}>
                              {finding.detail
                                ? `${finding.label}: ${finding.detail}`
                                : finding.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Publish button */}
          <button
            onClick={handlePublish}
            disabled={!canPublishNow}
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
            </div>
          )}

          {/* Promote to Production — disabled */}
        </div>
      </div>
    </div>
  )
}
