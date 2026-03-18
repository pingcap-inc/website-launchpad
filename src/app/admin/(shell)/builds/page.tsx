'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  CheckCircle,
  Loader2,
  XCircle,
  ExternalLink,
  RefreshCw,
  GitBranch,
  AlertCircle,
} from 'lucide-react'
import type { BuildItem } from '@/app/api/builds/route'

function StatusBadge({ status }: { status: BuildItem['status'] }) {
  if (status === 'ready')
    return (
      <span className="flex items-center gap-1.5 text-brand-teal-medium text-body-sm font-bold">
        <CheckCircle size={13} /> Ready
      </span>
    )
  if (status === 'building')
    return (
      <span className="flex items-center gap-1.5 text-brand-mango-DEFAULT text-body-sm font-bold">
        <Loader2 size={13} className="animate-spin" /> Building
      </span>
    )
  if (status === 'error')
    return (
      <span className="flex items-center gap-1.5 text-red-500 text-body-sm font-bold">
        <XCircle size={13} /> Failed
      </span>
    )
  return <span className="text-gray-400 text-body-sm">—</span>
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function BuildsPage() {
  const [builds, setBuilds] = useState<BuildItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchBuilds = useCallback(async () => {
    setLoading((prev) => (builds.length === 0 ? true : prev))
    setError('')
    try {
      const res = await fetch('/api/builds')
      const data = await res.json()
      if (data.error && !data.builds?.length) {
        setError(data.error)
      } else {
        setBuilds(data.builds ?? [])
        setLastRefresh(new Date())
      }
    } catch {
      setError('Failed to fetch builds')
    } finally {
      setLoading(false)
    }
  }, [builds.length])

  // Auto-refresh every 30s
  useEffect(() => {
    fetchBuilds()
    const id = setInterval(fetchBuilds, 30000)
    return () => clearInterval(id)
  }, [fetchBuilds])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h3-xl font-bold text-gray-900">Preview Builds</h1>
          <p className="text-body-sm text-gray-500 mt-1">
            Vercel deployment history · auto-refreshes every 30s
            {lastRefresh && (
              <span className="ml-2 text-gray-400">· last: {lastRefresh.toLocaleTimeString()}</span>
            )}
          </p>
        </div>
        <button
          onClick={fetchBuilds}
          className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold transition-colors rounded flex items-center gap-2"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {error && (
        <div className="flex gap-2 items-center text-red-600 text-body-sm p-4 bg-red-50 border border-red-200 rounded mb-6">
          <AlertCircle size={15} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {loading && builds.length === 0 ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 border border-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      ) : builds.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded">
          <p className="text-gray-500 text-body-sm">No deployments found.</p>
          <p className="text-gray-400 text-body-sm mt-1">
            Configure VERCEL_TOKEN + VERCEL_PROJECT_ID to see builds.
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded overflow-hidden bg-white">
          {/* Header */}
          <div className="grid grid-cols-[180px_1fr_120px_100px_80px_40px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Status
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Commit
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Branch
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">Time</span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Duration
            </span>
            <span />
          </div>

          {builds.map((build) => (
            <div
              key={build.id}
              className="grid grid-cols-[180px_1fr_120px_100px_80px_40px] gap-4 items-center px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <StatusBadge status={build.status} />
              <p className="text-body-sm text-gray-900 truncate">
                {build.commitMessage ?? <span className="text-gray-400">—</span>}
              </p>
              <div className="flex items-center gap-1.5 text-gray-500 text-body-sm truncate">
                <GitBranch size={12} className="shrink-0" />
                <span className="truncate">{build.branch ?? '—'}</span>
              </div>
              <span className="text-gray-500 text-body-sm">{timeAgo(build.createdAt)}</span>
              <span className="text-gray-500 text-body-sm">
                {build.elapsed != null ? `${build.elapsed}s` : '—'}
              </span>
              <div className="flex justify-end">
                {build.url && (
                  <a
                    href={build.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 p-1.5 rounded transition-colors"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
