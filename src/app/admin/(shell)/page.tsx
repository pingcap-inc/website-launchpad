import Link from 'next/link'
import { FileText, PlusSquare, Layers, ArrowRight, Lock } from 'lucide-react'

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

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4 mb-10">
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
          <ArrowRight
            size={16}
            className="text-gray-300 group-hover:text-gray-500 mt-auto self-end transition-colors"
          />
        </Link>

        <Link
          href="/admin/pages"
          className="group flex flex-col gap-3 p-6 bg-white border border-gray-200 rounded hover:border-gray-400 transition-colors"
        >
          <FileText size={24} className="text-brand-violet-medium" strokeWidth={1.5} />
          <div>
            <p className="text-body-md font-bold text-gray-900">All Pages</p>
            <p className="text-body-sm text-gray-500 mt-0.5">View and edit published pages</p>
          </div>
          <ArrowRight
            size={16}
            className="text-gray-300 group-hover:text-gray-500 mt-auto self-end transition-colors"
          />
        </Link>

        {/* <div className="flex flex-col gap-3 p-6 bg-gray-50 border border-gray-200 rounded cursor-not-allowed">
          <Layers size={24} className="text-gray-300" strokeWidth={1.5} />
          <div>
            <p className="text-body-md font-bold text-gray-300">Preview Builds</p>
            <p className="text-body-sm text-gray-300 mt-0.5">Vercel deployment status</p>
          </div>
          <Lock size={14} className="text-gray-300 mt-auto self-end" strokeWidth={1.5} />
        </div> */}
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

      {/* Env config status */}
      {/* <div className="mt-6 border border-gray-200 rounded p-5 bg-white">
        <h2 className="text-body-sm font-bold text-gray-700 mb-3">Required Environment Variables</h2>
        <div className="grid grid-cols-2 gap-2 text-body-sm">
          {[
            { key: 'NVIDIA_API_KEY', desc: 'AI generation (required)' },
            { key: 'GITHUB_TOKEN', desc: 'GitHub publish (required)' },
            { key: 'GITHUB_OWNER', desc: 'GitHub org/user (required)' },
            { key: 'GITHUB_REPO', desc: 'Repository name (required)' },
            { key: 'VERCEL_TOKEN', desc: 'Deploy status (optional)' },
            { key: 'VERCEL_PROJECT_ID', desc: 'Deploy status (optional)' },
          ].map(({ key, desc }) => (
            <div key={key} className="flex items-center gap-2">
              <code className="text-gray-700 font-mono">{key}</code>
              <span className="text-gray-400">— {desc}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}
