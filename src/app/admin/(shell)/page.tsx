import Link from 'next/link'
import {
  FileText,
  PlusSquare,
  BookOpen,
  ArrowRight,
  Megaphone,
  Upload,
  HelpCircle,
  Info,
} from 'lucide-react'

const userTypes = [
  {
    badge: 'Type 1 · Marketing team',
    badgeClass: 'bg-blue-50 text-blue-800',
    title: 'Build a New Page with AI',
    desc: "I'm on the marketing team and need to create a brand-new page from scratch using AI.",
    tags: ['Campaign landing', 'Event signup', 'Program announcement', 'Battle card'],
    href: '/admin/create?mode=marketing',
    icon: Megaphone,
    iconColor: 'text-blue-600',
  },
  {
    badge: 'Type 2 · Have existing content',
    badgeClass: 'bg-teal-50 text-teal-800',
    title: 'Publish an Existing AI Page',
    desc: 'I already have AI-generated content and need to bring it into the official site, get it reviewed, and publish.',
    tags: ['Import Google Docs', 'Paste content', 'Upload .docx / .md'],
    href: '/admin/create?mode=import',
    icon: Upload,
    iconColor: 'text-teal-600',
  },
  {
    badge: 'Type 3 · New here',
    badgeClass: 'bg-amber-50 text-amber-800',
    title: "I Don't Know Where to Start",
    desc: "First time using this platform. I'd like a guided walkthrough to create my first page.",
    tags: ['Step-by-step guide', 'General page'],
    href: '/admin/create?mode=guided',
    icon: HelpCircle,
    iconColor: 'text-amber-600',
  },
]

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-h3-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-body-sm text-gray-500 mt-1">
          Welcome to AI Website Platform · PingCAP internal tool
        </p>
      </div>

      {/* Who are you? — 3 user-type entry cards */}
      <div className="mb-10">
        <p className="text-body-sm text-gray-500 mb-4">Choose the path that fits you best</p>
        <div className="grid grid-cols-3 gap-4">
          {userTypes.map(
            ({ badge, badgeClass, title, desc, tags, href, icon: Icon, iconColor }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded hover:border-gray-400 transition-colors"
              >
                <Icon size={24} className={iconColor} strokeWidth={1.5} />
                <span
                  className={`${badgeClass} text-xs font-medium px-2 py-0.5 rounded self-start`}
                >
                  {badge}
                </span>
                <div>
                  <p className="text-body-md font-bold text-gray-900">{title}</p>
                  <p className="text-body-sm text-gray-500 mt-1">{desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-body-sm font-bold text-gray-700 group-hover:text-gray-900">
                  Get started <ArrowRight size={14} />
                </span>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Before you publish — review workflow explanation */}
      <div className="mb-10">
        <h2 className="text-body-md font-bold text-gray-900 mb-4">Before You Publish</h2>
        <div className="border border-gray-200 rounded bg-white p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-label font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-body-sm font-bold text-gray-900 mb-1">Run pre-publish checks</p>
                <p className="text-body-sm text-gray-500">
                  Auto-validates SEO fields (meta title, description) and required content in every
                  section — slug, headlines, items.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-label font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-body-sm font-bold text-gray-900 mb-1">Score with AI</p>
                <p className="text-body-sm text-gray-500">
                  Click &ldquo;Run scoring&rdquo; to get an Overall score (UX · SEO · Consistency).
                  Aim for 80+ before publishing. Fix flagged issues in the editor.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-label font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-body-sm font-bold text-gray-900 mb-1">
                  Publish to staging first
                </p>
                <p className="text-body-sm text-gray-500">
                  Always publish to staging before production. Share the staging URL with
                  stakeholders for sign-off. Publishing to main requires a developer.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
            <Info size={14} className="text-gray-400 shrink-0" strokeWidth={2} />
            <p className="text-label text-gray-500">
              Access the review panel by opening any page in the editor and clicking{' '}
              <strong className="text-gray-700">Publish →</strong> in the top bar. The panel opens
              on the right side.
            </p>
          </div>
        </div>
      </div>

      {/* Common tools */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
            Common tools
          </span>
          <div className="flex-1 border-t border-gray-200" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/admin/create"
            className="group flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded hover:border-gray-400 transition-colors"
          >
            <PlusSquare size={24} className="text-brand-red-primary" strokeWidth={1.5} />
            <div>
              <p className="text-body-md font-bold text-gray-900">Create Page</p>
              <p className="text-body-sm text-gray-500 mt-0.5">
                AI generates DSL → Preview → Publish
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-body-sm font-bold text-gray-700 group-hover:text-gray-900">
              Create page <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/admin/refine"
            className="group flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded hover:border-gray-400 transition-colors"
          >
            <FileText size={24} className="text-brand-violet-medium" strokeWidth={1.5} />
            <div>
              <p className="text-body-md font-bold text-gray-900">All Pages</p>
              <p className="text-body-sm text-gray-500 mt-0.5">View and edit published pages</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-body-sm font-bold text-gray-700 group-hover:text-gray-900">
              View all pages <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* Workflow overview */}
      <div className="border border-gray-200 rounded p-6 bg-white">
        <h2 className="text-body-md font-bold text-gray-900 mb-5">How It Works</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Describe',
              desc: 'Write a page intent or select an existing page to edit',
              color: 'text-brand-red-primary',
            },
            {
              step: '02',
              title: 'Generate DSL',
              desc: 'AI produces a structured Page DSL — no coding required',
              color: 'text-brand-violet-medium',
            },
            {
              step: '03',
              title: 'Preview',
              desc: 'Instantly see the rendered page in browser preview',
              color: 'text-brand-blue-medium',
            },
            {
              step: '04',
              title: 'Publish',
              desc: 'One click commits to GitHub · Vercel rebuilds in ~2 min',
              color: 'text-brand-teal-medium',
            },
          ].map(({ step, title, desc, color }) => (
            <div key={step} className="space-y-2">
              <span className={`text-h3-sm font-bold ${color}`}>{step}</span>
              <p className="text-body-sm font-bold text-gray-900">{title}</p>
              <p className="text-body-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
