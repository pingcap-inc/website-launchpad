'use client'

import { useState, createElement, type ComponentType } from 'react'
import {
  Zap,
  Shield,
  Globe,
  Database,
  Server,
  Cloud,
  Lock,
  Activity,
  Layers,
  Cpu,
  Rocket,
  BarChart,
  CheckCircle,
  Star,
  ArrowRight,
  GitBranch,
  Package,
  RefreshCw,
  Gauge,
  Code2,
  Brain,
  Sparkles,
  Bot,
  MessageSquare,
  Search,
  Settings,
  Wrench,
  Terminal,
  FileCode,
  GitMerge,
  LayoutGrid,
  Table,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Filter,
  Clock,
  Repeat,
  Scale,
  DollarSign,
  Users,
  Building,
  Briefcase,
  Award,
  Target,
  Lightbulb,
  Puzzle,
  Network,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { ALL_ICON_NAMES, type IconName, type IconValue } from '@/lib/dsl-schema'
import { ImageField } from './ImageField'

type IconComponent = ComponentType<LucideProps>

const ICON_MAP: Record<IconName, IconComponent> = {
  Zap,
  Shield,
  Globe,
  Database,
  Server,
  Cloud,
  Lock,
  Activity,
  Layers,
  Cpu,
  Rocket,
  BarChart,
  CheckCircle,
  Star,
  ArrowRight,
  GitBranch,
  Package,
  RefreshCw,
  Gauge,
  Code2,
  Brain,
  Sparkles,
  Bot,
  MessageSquare,
  Search,
  Settings,
  Wrench,
  Terminal,
  FileCode,
  GitMerge,
  LayoutGrid,
  Table,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Filter,
  Clock,
  Repeat,
  Scale,
  DollarSign,
  Users,
  Building,
  Briefcase,
  Award,
  Target,
  Lightbulb,
  Puzzle,
  Network,
}

interface IconPickerProps {
  value?: IconValue
  onChange: (value?: IconValue) => void
  slug?: string
}

type Tab = 'lucide' | 'image'

function isImagePath(v: string) {
  return v.startsWith('/') || v.startsWith('http')
}

export function IconPicker({ value, onChange, slug }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>(
    value && typeof value === 'object'
      ? 'image'
      : value && isImagePath(value as string)
        ? 'image'
        : 'lucide'
  )

  const currentIsImage = Boolean(
    value && typeof value === 'object' ? true : value && isImagePath(value as string)
  )
  const CurrentIcon = value && !currentIsImage ? (ICON_MAP[value as IconName] ?? Zap) : null

  return (
    <div className="space-y-1.5">
      <label className="block text-body-sm font-bold text-gray-700">Icon</label>
      <div className="flex items-center gap-2">
        {/* Current preview */}
        <div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center bg-gray-50 shrink-0">
          {currentIsImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof value === 'object' && value ? value.url : (value as string)}
              alt=""
              className="w-full h-full object-contain p-1"
            />
          ) : CurrentIcon ? (
            createElement(CurrentIcon, { size: 18, strokeWidth: 1.5, className: 'text-gray-700' })
          ) : (
            <span className="text-gray-300 text-label">—</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 text-left border border-gray-200 rounded px-3 py-2 text-body-sm text-gray-600 hover:border-gray-400 transition-colors bg-white"
        >
          {(typeof value === 'string' ? value : value?.url) || 'Choose icon…'}
        </button>
      </div>

      {open && (
        <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-gray-200">
            {(['lucide', 'image'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={[
                  'flex-1 py-2 text-label font-bold transition-colors capitalize',
                  tab === t ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900',
                ].join(' ')}
              >
                {t === 'lucide' ? '⚡ Lucide Icon' : '🖼 Image Icon'}
              </button>
            ))}
          </div>

          {tab === 'lucide' ? (
            <div className="p-2 grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
              {ALL_ICON_NAMES.map((name) => {
                const Icon = ICON_MAP[name]
                const selected = value === name
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => {
                      onChange(name)
                      setOpen(false)
                    }}
                    className={[
                      'flex items-center justify-center h-9 rounded transition-colors',
                      selected ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 text-gray-600',
                    ].join(' ')}
                  >
                    {createElement(Icon, { size: 16, strokeWidth: 1.5 })}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="p-3">
              <ImageField
                value={
                  currentIsImage
                    ? typeof value === 'object'
                      ? value
                      : { url: value as string }
                    : undefined
                }
                onChange={(v) => {
                  onChange(v)
                  if (v?.url) setOpen(false)
                }}
                slug={slug}
                label=""
                compact
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
