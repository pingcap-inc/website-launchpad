'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Edit3, ExternalLink, RefreshCw, AlertCircle, Clock } from 'lucide-react'

interface PageItem {
  slug: string
  title: string
  updatedAt: string | null
  hasDsl: boolean
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function PagesPage() {
  const [pages, setPages] = useState<PageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPages = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/pages')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to load pages')
      setPages(data.pages ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h3-xl font-bold text-gray-900">Pages</h1>
          <p className="text-body-sm text-gray-500 mt-1">
            All pages managed by AI Website Platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPages}
            className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold transition-colors rounded flex items-center gap-2"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <Link
            href="/admin/create"
            className="bg-gray-900 text-white font-bold px-4 py-2 text-body-sm hover:bg-gray-700 transition-colors rounded"
          >
            + Create Page
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex gap-2 items-center text-red-600 text-body-sm p-4 bg-red-50 border border-red-200 rounded mb-6">
          <AlertCircle size={15} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 border border-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      ) : pages.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded">
          <FileText size={32} className="text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-gray-500 text-body-sm">No pages found.</p>
          <p className="text-gray-400 text-body-sm mt-1">
            Pages with a <code className="text-gray-600">page.dsl.json</code> will appear here.
          </p>
          <Link
            href="/admin/create"
            className="inline-block mt-4 bg-gray-900 text-white font-bold px-6 py-2.5 text-body-sm hover:bg-gray-700 transition-colors rounded"
          >
            Create your first page
          </Link>
        </div>
      ) : (
        <div className="border border-gray-200 rounded overflow-hidden bg-white">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_2fr_140px_120px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">Slug</span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Title
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Last updated
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide text-right">
              Actions
            </span>
          </div>

          {/* Table rows */}
          {pages.map((page) => (
            <div
              key={page.slug}
              className="grid grid-cols-[1fr_2fr_140px_120px] gap-4 items-center px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <code className="text-body-sm text-gray-700 font-mono">/{page.slug}/</code>
              </div>
              <p className="text-body-sm text-gray-900 truncate">{page.title}</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-body-sm">
                <Clock size={12} />
                {timeAgo(page.updatedAt)}
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Link
                  href={`/admin/create?slug=${page.slug}&mode=edit`}
                  className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 p-1.5 rounded transition-colors"
                  title="Edit page"
                >
                  <Edit3 size={14} />
                </Link>
                <a
                  href={`https://www.pingcap.com/${page.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 p-1.5 rounded transition-colors"
                  title="View live page"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
