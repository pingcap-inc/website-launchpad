'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, Check, ExternalLink, AlertTriangle } from 'lucide-react'
import type { PageDSL } from '@/lib/dsl-schema'

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
  onSlugChange: (slug: string) => void
  onClose: () => void
}

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

export function PublishDrawer({ dsl, slug, onSlugChange, onClose }: PublishDrawerProps) {
  const [branch, setBranch] = useState<'staging' | 'main'>('staging')
  const [addToSitemap, setAddToSitemap] = useState(true)
  const [confirmSlug, setConfirmSlug] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<PublishResult | null>(null)
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle')
  const [deployUrl, setDeployUrl] = useState('')
  const [localGenerating, setLocalGenerating] = useState(false)
  const [localResult, setLocalResult] = useState<LocalGenerateResult | null>(null)

  // Promote staging → production state
  const [promoteConfirmSlug, setPromoteConfirmSlug] = useState('')
  const [promoting, setPromoting] = useState(false)
  const [promoteResult, setPromoteResult] = useState<PublishResult | null>(null)
  const [promoteDeployStatus, setPromoteDeployStatus] = useState<DeployStatus>('idle')
  const [promoteDeployUrl, setPromoteDeployUrl] = useState('')

  const localSlug = slug.replace(/^\/|\/$/g, '')
  const slugValid = /^[a-z0-9-]+$/.test(localSlug)
  const mainConfirmed = branch !== 'main' || confirmSlug === localSlug

  const canPublish = slugValid && !publishing && mainConfirmed

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

  const pollPromoteDeploy = () => {
    const start = Date.now()
    const MAX = 3 * 60 * 1000
    const tick = async () => {
      if (Date.now() - start > MAX) {
        setPromoteDeployStatus('error')
        return
      }
      try {
        const res = await fetch('/api/deploy-status')
        const { status } = (await res.json()) as { status: string }
        if (status === 'ready') {
          setPromoteDeployStatus('ready')
          return
        }
        if (status === 'error') {
          setPromoteDeployStatus('error')
          return
        }
        setPromoteDeployStatus('building')
        setTimeout(tick, 5000)
      } catch {
        setTimeout(tick, 5000)
      }
    }
    setTimeout(tick, 8000)
  }

  const handlePromote = async () => {
    setPromoting(true)
    setPromoteResult(null)
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: localSlug, dsl, branch: 'main', addToSitemap }),
      })
      const data = (await res.json()) as PublishResult
      setPromoteResult(data)
      if (data.success) {
        setPromoteDeployUrl(data.deployUrl ?? '')
        setPromoteDeployStatus('building')
        pollPromoteDeploy()
      }
    } finally {
      setPromoting(false)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    setResult(null)
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: localSlug, dsl, branch, addToSitemap }),
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

  const steps = DEPLOY_STEPS(result, addToSitemap, deployStatus)

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="w-96 bg-white h-full shadow-xl flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-h3-sm font-bold text-gray-900">Publish Page</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Slug */}
          <div className="space-y-1.5">
            <label className="block text-body-sm font-bold text-gray-700">URL Slug</label>
            <div className="flex items-center gap-1 border border-gray-200 rounded px-3 py-2 bg-white focus-within:border-gray-400 transition-colors">
              <span className="text-gray-400 text-body-sm">/</span>
              <input
                type="text"
                value={localSlug}
                onChange={(e) =>
                  onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                }
                placeholder="page-slug"
                className="flex-1 bg-transparent text-gray-900 text-body-sm focus:outline-none"
              />
              <span className="text-gray-400 text-body-sm">/</span>
            </div>
            {localSlug && slugValid && (
              <p className="text-label text-gray-400">
                https://www.pingcap.com/<span className="text-gray-700">{localSlug}</span>/
              </p>
            )}
            {localSlug && !slugValid && (
              <p className="text-red-500 text-label">Only lowercase letters, numbers, hyphens</p>
            )}
          </div>

          {/* Branch */}
          <div className="space-y-1.5">
            <label className="block text-body-sm font-bold text-gray-700">Target Branch</label>
            <div className="space-y-2">
              {(['staging', 'main'] as const).map((b) => (
                <label key={b} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    value={b}
                    checked={branch === b}
                    onChange={() => {
                      setBranch(b)
                      setConfirmSlug('')
                    }}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm font-bold text-gray-700">{b}</span>
                      {b === 'staging' && (
                        <span className="text-label text-brand-teal-medium bg-brand-teal-bg/20 border border-brand-teal-dark/30 px-1.5 py-0.5 rounded">
                          Safe preview
                        </span>
                      )}
                      {b === 'main' && (
                        <span className="text-label text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                          ⚠️ Production
                        </span>
                      )}
                    </div>
                    <p className="text-label text-gray-400 mt-0.5">
                      {b === 'staging'
                        ? 'Deploys to preview URL only'
                        : 'Goes live on pingcap.com immediately'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Main branch warning + confirm */}
          {branch === 'main' && (
            <div className="border border-red-200 bg-red-50 rounded p-3 space-y-2">
              <div className="flex items-start gap-2 text-red-700">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                <p className="text-body-sm font-bold">Publishing to Production</p>
              </div>
              <p className="text-body-sm text-red-600">
                This will immediately go live at <strong>pingcap.com/{localSlug}/</strong> and
                trigger a Vercel production build.
              </p>
              <div className="space-y-1">
                <label className="block text-label text-red-700 font-bold">
                  Type <code className="bg-red-100 px-1 rounded">{localSlug}</code> to confirm
                </label>
                <input
                  type="text"
                  value={confirmSlug}
                  onChange={(e) => setConfirmSlug(e.target.value)}
                  placeholder={localSlug}
                  className="w-full border border-red-300 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          )}

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
              branch === 'main'
                ? 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-40'
                : 'bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40',
            ].join(' ')}
          >
            {publishing ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Publishing…
              </>
            ) : branch === 'main' ? (
              '⚠️ Publish to Production'
            ) : (
              '→ Publish to Staging'
            )}
          </button>

          {/* Local generate button */}
          {process.env.NODE_ENV !== 'development' && (
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

          {/* Promote to Production — only shown after staging deploy is ready */}
          {branch === 'staging' && deployStatus === 'ready' && result?.success && (
            <div className="border border-orange-200 bg-orange-50 rounded p-4 space-y-3">
              <div className="flex items-start gap-2 text-orange-800">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                <p className="text-body-sm font-bold">Promote to Production</p>
              </div>
              <p className="text-body-sm text-orange-700">
                Staging looks good? This will push the same page directly to{' '}
                <strong>pingcap.com/{localSlug}/</strong> and trigger a production build.
              </p>

              {promoteDeployStatus === 'idle' && (
                <div className="space-y-2">
                  <label className="block text-label text-orange-800 font-bold">
                    Type <code className="bg-orange-100 px-1 rounded">{localSlug}</code> to confirm
                  </label>
                  <input
                    type="text"
                    value={promoteConfirmSlug}
                    onChange={(e) => setPromoteConfirmSlug(e.target.value)}
                    placeholder={localSlug}
                    className="w-full border border-orange-300 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors bg-white"
                  />
                  <button
                    onClick={handlePromote}
                    disabled={promoteConfirmSlug !== localSlug || promoting}
                    className="w-full bg-red-600 text-white font-bold px-4 py-2 text-body-sm rounded hover:bg-red-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                  >
                    {promoting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Promoting…
                      </>
                    ) : (
                      '⚠️ Promote to Production'
                    )}
                  </button>
                </div>
              )}

              {promoteDeployStatus !== 'idle' && (
                <div className="space-y-2">
                  {promoteResult?.pageCommitUrl && (
                    <a
                      href={promoteResult.pageCommitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-body-sm text-brand-blue-medium hover:underline"
                    >
                      <ExternalLink size={13} /> View commit on GitHub
                    </a>
                  )}
                  {promoteDeployStatus === 'building' && (
                    <div className="flex items-center gap-2 text-body-sm text-orange-700">
                      <Loader2 size={14} className="animate-spin" /> Production build in progress…
                    </div>
                  )}
                  {promoteDeployStatus === 'ready' && promoteDeployUrl && (
                    <a
                      href={promoteDeployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-teal-bg/20 border border-brand-teal-medium/50 text-brand-teal-medium font-bold px-4 py-2.5 rounded text-body-sm hover:bg-brand-teal-bg/30 transition-colors"
                    >
                      <ExternalLink size={14} /> View live on pingcap.com
                    </a>
                  )}
                  {promoteDeployStatus === 'error' && (
                    <div className="flex gap-2 items-start text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                      <p>Production deploy timed out. Check Vercel dashboard.</p>
                    </div>
                  )}
                  {promoteResult?.error && (
                    <div className="flex gap-2 items-start text-red-600 text-body-sm p-3 bg-red-50 border border-red-200 rounded">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                      <p>{promoteResult.error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
