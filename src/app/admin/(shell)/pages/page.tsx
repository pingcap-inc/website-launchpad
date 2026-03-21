'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FileText,
  Edit3,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  Trash2,
} from 'lucide-react'
import { SITE_BASE_URL } from '@/lib/env'

interface PageItem {
  slug: string
  title: string
  updatedAt: string | null
  hasDsl: boolean
  hasPublished: boolean
  hasDraft: boolean
  isCode: boolean
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

function toTitleCase(input: string) {
  return input
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type TreeNode = {
  slug: string
  name: string
  page?: PageItem
  children: Map<string, TreeNode>
}

type TreeRow = {
  node: TreeNode
  depth: number
  hasChildren: boolean
  isGroup: boolean
}

function buildTree(pages: PageItem[]) {
  const root: TreeNode = { slug: '', name: '', children: new Map() }
  for (const page of pages) {
    const segments = page.slug.split('/').filter(Boolean)
    let current = root
    let path = ''
    for (const segment of segments) {
      path = path ? `${path}/${segment}` : segment
      if (!current.children.has(segment)) {
        current.children.set(segment, { slug: path, name: segment, children: new Map() })
      }
      current = current.children.get(segment)!
    }
    current.page = page
  }
  return root
}

function buildVisibleRows(
  root: TreeNode,
  expanded: Set<string>,
  matches: Set<string> | null
): TreeRow[] {
  const rows: TreeRow[] = []

  const shouldShow = (node: TreeNode): boolean => {
    if (!matches) return true
    if (node.page && matches.has(node.slug)) return true
    for (const child of node.children.values()) {
      if (shouldShow(child)) return true
    }
    return false
  }

  const walk = (node: TreeNode, depth: number) => {
    if (node.slug && !shouldShow(node)) return
    if (node.slug) {
      const hasChildren = node.children.size > 0
      rows.push({
        node,
        depth,
        hasChildren,
        isGroup: !node.page,
      })
      if (hasChildren && !expanded.has(node.slug)) return
    }

    const sortedChildren = Array.from(node.children.values()).sort((a, b) =>
      a.slug.localeCompare(b.slug)
    )
    for (const child of sortedChildren) {
      walk(child, node.slug ? depth + 1 : depth)
    }
  }

  walk(root, 0)
  return rows
}

export default function PagesPage() {
  const [pages, setPages] = useState<PageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [deletingSlug, setDeletingSlug] = useState('')
  const [pendingDeleteSlug, setPendingDeleteSlug] = useState('')
  const fetchPages = async (options?: { includeTitle?: boolean; includeUpdated?: boolean }) => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (options?.includeTitle === false) params.set('includeTitle', '0')
      if (options?.includeUpdated === false) params.set('includeUpdated', '0')
      const query = params.toString()
      const res = await fetch(`/api/pages${query ? `?${query}` : ''}`)
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
    const load = async () => {
      await fetchPages({ includeTitle: false, includeUpdated: false })
      fetchPages()
    }
    load()
  }, [])

  const handleDelete = async () => {
    if (!pendingDeleteSlug) return
    const slug = pendingDeleteSlug
    setDeletingSlug(slug)
    try {
      const res = await fetch('/api/pages/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Delete failed')
      await fetchPages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeletingSlug('')
      setPendingDeleteSlug('')
    }
  }

  const normalizedQuery = query.trim().toLowerCase()
  const matchSet = normalizedQuery
    ? new Set(
        pages
          .filter((page) => {
            const haystack = `${page.slug} ${page.title}`.toLowerCase()
            return haystack.includes(normalizedQuery)
          })
          .map((page) => page.slug)
      )
    : null

  const tree = buildTree(pages)
  const autoExpanded = (() => {
    if (!matchSet) return null
    const set = new Set<string>()
    for (const page of pages) {
      if (!matchSet.has(page.slug)) continue
      const segments = page.slug.split('/').filter(Boolean)
      let path = ''
      for (const segment of segments.slice(0, -1)) {
        path = path ? `${path}/${segment}` : segment
        set.add(path)
      }
    }
    return set
  })()
  const activeExpanded = autoExpanded ?? expandedNodes
  const rows = buildVisibleRows(tree, activeExpanded, matchSet)

  const toggleNode = (slug: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

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
            onClick={() => {
              fetchPages()
            }}
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

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by slug or title…"
          className="w-full max-w-md text-body-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-body-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Clear
          </button>
        )}
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
      ) : rows.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded">
          <FileText size={32} className="text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-gray-500 text-body-sm">
            {pages.length === 0 ? 'No pages found.' : 'No matching pages.'}
          </p>
          <p className="text-gray-400 text-body-sm mt-1">
            Published DSL pages, draft-only DSL pages, and code pages will appear here.
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
          <div className="grid grid-cols-[1fr_2fr_140px_140px_120px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">Slug</span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Title
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Last updated
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide">
              Status
            </span>
            <span className="text-label font-bold text-gray-500 uppercase tracking-wide text-right">
              Actions
            </span>
          </div>

          {/* Table rows */}
          {rows.map((row) => {
            const { node, depth, hasChildren, isGroup } = row
            const page = node.page
            const title = page ? page.title : toTitleCase(node.name)
            return (
              <div
                key={node.slug}
                className="grid grid-cols-[1fr_2fr_140px_140px_120px] gap-4 items-center px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center" style={{ paddingLeft: `${depth * 16}px` }}>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => toggleNode(node.slug)}
                        className="mr-1.5 h-6 w-6 inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
                        title={activeExpanded.has(node.slug) ? 'Collapse' : 'Expand'}
                      >
                        {activeExpanded.has(node.slug) ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    ) : (
                      <span className="mr-1.5 w-3" />
                    )}
                    <code className="text-body-sm text-gray-700 font-mono">/{node.slug}/</code>
                  </div>
                </div>
                <p className="text-body-sm text-gray-900 truncate">{title}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-body-sm">
                  <Clock size={12} />
                  {page ? timeAgo(page.updatedAt) : '—'}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {page?.isCode ? (
                    <span className="px-2 py-0.5 rounded-full text-label font-bold border border-gray-200 text-gray-500 bg-gray-50">
                      Code
                    </span>
                  ) : (
                    <>
                      {page?.hasPublished && (
                        <span className="px-2 py-0.5 rounded-full text-label font-bold border border-green-200 text-green-700 bg-green-50">
                          Published
                        </span>
                      )}
                      {page?.hasDraft && (
                        <span className="px-2 py-0.5 rounded-full text-label font-bold border border-amber-200 text-amber-700 bg-amber-50">
                          Draft
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 justify-end">
                  {page && (
                    <>
                      {!page.isCode && (
                        <Link
                          href={`/admin/create?slug=${page.slug}&mode=edit`}
                          className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 p-1.5 rounded transition-colors"
                          title="Edit page"
                        >
                          <Edit3 size={14} />
                        </Link>
                      )}
                      {page.hasPublished || page.isCode ? (
                        <a
                          href={`${SITE_BASE_URL.replace(/\/$/, '')}/${page.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 p-1.5 rounded transition-colors"
                          title="View live page"
                        >
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="border border-gray-200 text-gray-300 p-1.5 rounded">
                          <ExternalLink size={14} />
                        </span>
                      )}

                      {process.env.NODE_ENV === 'development' && (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteSlug(page.slug)}
                          disabled={deletingSlug === page.slug}
                          className="text-gray-400 hover:text-red-600 p-1.5 rounded transition-colors disabled:opacity-40"
                          title="Delete page"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pendingDeleteSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => (deletingSlug ? null : setPendingDeleteSlug(''))}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-body-md font-bold text-gray-900 mb-2">Delete Page</h3>
            <p className="text-body-sm text-gray-600">
              Delete <span className="font-mono text-gray-900">/{pendingDeleteSlug}/</span>? This
              will remove both draft and published files.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDeleteSlug('')}
                disabled={!!deletingSlug}
                className="border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={!!deletingSlug}
                className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 text-body-sm font-bold rounded transition-colors disabled:opacity-40"
              >
                {deletingSlug ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
