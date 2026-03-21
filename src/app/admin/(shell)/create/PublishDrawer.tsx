'use client'

import { useState, useEffect, useMemo } from 'react'
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
import { SITE_BASE_URL } from '@/lib/env'
import type { PageScoreResult } from '@/lib/scoring'
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

const DEPLOY_STEPS = (
  result: PublishResult | null,
  addToSitemap: boolean,
  deployStatus: DeployStatus
) => [
  { label: 'Pushed to GitHub', done: !!result?.success },
  {
    label: 'Sitemap updated',
    done: !!result?.sitemapCommitUrl || (!!result?.success && !addToSitemap),
  },
  { label: 'Vercel rebuilding', done: deployStatus === 'ready' || deployStatus === 'error' },
  { label: 'Live globally', done: deployStatus === 'ready' },
]

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
  const [aiScoreStatus, setAiScoreStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [showChecklist, setShowChecklist] = useState(false)
  const [aiScore, setAiScore] = useState<PageScoreResult | null>(null)
  const [aiScoreError, setAiScoreError] = useState('')

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
          addToSitemap,
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

  const handleRunAiScore = async () => {
    setAiScoreError('')
    setAiScoreStatus('loading')
    try {
      const res = await fetch('/api/score-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dsl }),
      })
      const data = (await res.json()) as { score?: PageScoreResult; error?: string }
      if (!res.ok || !data.score) throw new Error(data.error ?? 'Failed to score page')
      setAiScore(data.score)
      setAiScoreStatus('ready')
    } catch (err) {
      setAiScoreStatus('error')
      setAiScoreError(err instanceof Error ? err.message : 'Failed to score page')
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

  const steps = DEPLOY_STEPS(result, addToSitemap, deployStatus)

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

          {/* AI scoring */}
          {!hasBlockingChecks && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-body-sm font-bold text-gray-700">AI Scoring</p>
                <button
                  type="button"
                  onClick={handleRunAiScore}
                  disabled={aiScoreStatus === 'loading'}
                  className="text-gray-700 underline text-label font-bold disabled:opacity-50"
                >
                  {aiScoreStatus === 'loading' ? 'Scoring…' : 'Run scoring'}
                </button>
              </div>
              {aiScoreStatus === 'idle' && (
                <div className="text-body-sm text-gray-500 bg-gray-50 border border-gray-200 rounded p-3">
                  Ready to score. Run AI scoring to review UX, SEO, and consistency.
                </div>
              )}
              {aiScoreStatus === 'error' && (
                <div className="flex items-start gap-2 text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <p>{aiScoreError || 'Failed to score page'}</p>
                </div>
              )}
              {aiScoreStatus === 'ready' && aiScore && (
                <div className="border border-gray-200 rounded p-3 bg-gray-50 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-label font-bold border border-emerald-200 text-emerald-700 bg-emerald-50">
                      Overall {aiScore.finalScore}
                    </span>
                    <span className="text-label text-gray-500">
                      UX {aiScore.ux.score} · SEO {aiScore.seo.score} · Cons{' '}
                      {aiScore.consistency.score}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-body-sm text-gray-500 hover:text-gray-700"
                            aria-label="View scoring criteria"
                          >
                            <span>Scoring criteria</span>
                            <Info size={14} className="text-gray-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs whitespace-normal text-body-sm">
                          <div className="space-y-2">
                            <div>
                              <p className="font-bold text-text-inverse">UX (40)</p>
                              <p>
                                Clear hierarchy, CTA clarity/placement, scannability, section length
                                and readability, visual balance.
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-text-inverse">SEO (30)</p>
                              <p>
                                Title/description presence, heading structure, natural keywords,
                                semantic structure, image alt text.
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-text-inverse">Consistency (30)</p>
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
                  {aiScore.topIssues.length > 0 ? (
                    <div>
                      <p className="text-label font-bold text-gray-600 mb-1">Top issues</p>
                      <ul className="list-disc pl-4 text-body-sm text-gray-600 space-y-1">
                        {aiScore.topIssues.map((issue, index) => (
                          <li key={`${issue}-${index}`}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-body-sm text-gray-500">No major issues detected.</p>
                  )}
                </div>
              )}
            </div>
          )}

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
