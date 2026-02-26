'use client'

import { useState, useEffect } from 'react'
import { GhostButton } from './GhostButton'
import { PrimaryButton } from './PrimaryButton'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Cloud,
  Layers,
  DollarSign,
  Settings,
  Sliders,
  Star,
  Eye,
  TrendingDown,
  RefreshCw,
  Cpu,
  Bot,
  Landmark,
  ShoppingBag,
  Monitor,
  FileText,
  BookOpen,
  Video,
  BarChart2,
  CalendarDays,
  MessageSquare,
  Code2,
  Bookmark,
  GraduationCap,
  FlaskConical,
  Award,
  Newspaper,
  Building2,
  Briefcase,
  Users,
  AtSign,
  Menu,
  X,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string
  href: string
  icon?: LucideIcon
  description?: string
}

interface DropdownSection {
  title?: string
  titleHref?: string   // if set, title renders as a link with → arrow
  description?: string // shown below title (used when no items, e.g. Customer Stories)
  items: DropdownItem[]
}

interface NavDropdown {
  label: string
  translateX?: string  // horizontal offset for the dropdown panel, default '-translate-x-1/2'
  featured?: {
    description: string
    cta: { label: string; href: string }
  }
  sections: DropdownSection[]
}

interface NavLink {
  label: string
  href: string
  external?: boolean
}

type NavItem = NavDropdown | NavLink

function isDropdown(item: NavItem): item is NavDropdown {
  return 'sections' in item
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  {
    label: 'Product',
    translateX: '-translate-x-[24%]',
    featured: {
      description:
        'An open-source distributed SQL database trusted by innovators to power transactional, AI, and other modern applications.',
      cta: { label: 'Product Overview', href: '/tidb/' },
    },
    sections: [
      {
        title: 'Deployment Options',
        items: [
          { label: 'TiDB Cloud', href: '/tidb/cloud/', icon: Cloud },
          { label: 'TiDB Self-Managed', href: '/tidb/self-managed/', icon: Layers },
          { label: 'Pricing', href: '/tidb/pricing/', icon: DollarSign },
        ],
      },
      {
        title: 'Ecosystem',
        items: [
          { label: 'Integrations', href: '/tidb/integrations/', icon: Settings },
          { label: 'TiKV', href: '/tikv/', icon: Sliders },
          { label: 'TiSpark', href: '/tispark/', icon: Star },
          { label: 'OSS Insight', href: 'https://ossinsight.io/', icon: Eye },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    translateX: '-translate-x-[34%]',
    sections: [
      {
        title: 'By Use Case',
        items: [
          { label: 'Lower Infrastructure Costs', href: '/solutions/lower-infrastructure-costs/', icon: TrendingDown },
          { label: 'Enable Operational Intelligence', href: '/solutions/operational-intelligence/', icon: Star },
          { label: 'Modernize MySQL Workloads', href: '/solutions/mysql-alternative/', icon: RefreshCw },
          { label: 'Build GenAI Applications', href: '/solutions/genai/', icon: Cpu },
        ],
      },
      {
        title: 'By Industry',
        items: [
          { label: 'AI', href: '/solutions/ai/', icon: Bot },
          { label: 'Fintech', href: '/solutions/fintech/', icon: Landmark },
          { label: 'eCommerce', href: '/solutions/ecommerce/', icon: ShoppingBag },
          { label: 'SaaS', href: '/solutions/saas/', icon: Monitor },
        ],
      },
      {
        title: 'Customer Stories',
        titleHref: '/customers/',
        description: 'Trusted and verified by innovation leaders around the world.',
        items: [],
      },
    ],
  },
  {
    label: 'Resources',
    sections: [
      {
        title: 'Learn',
        items: [
          { label: 'Blog', href: '/blog/', icon: FileText },
          { label: 'eBooks & Whitepapers', href: '/resources/ebooks/', icon: BookOpen },
          { label: 'Videos & Replays', href: '/resources/videos/', icon: Video },
          { label: 'Horizontal Scaling', href: '/resources/horizontal-scaling/', icon: BarChart2 },
        ],
      },
      {
        title: 'Engage',
        items: [
          { label: 'Events & Webinars', href: '/events/', icon: CalendarDays },
          { label: 'Discord Community', href: 'https://discord.gg/pingcap', icon: MessageSquare },
          { label: 'Developer Hub', href: '/developer/', icon: Code2 },
          { label: 'TiDB SCaiLE', href: '/tidb-scaile/', icon: Bookmark },
        ],
      },
      {
        title: 'PingCAP University',
        items: [
          { label: 'Courses', href: '/university/courses/', icon: GraduationCap },
          { label: 'Hands-on Labs', href: '/university/labs/', icon: FlaskConical },
          { label: 'Certifications', href: '/university/certifications/', icon: Award },
        ],
      },
    ],
  },
  {
    label: 'Company',
    sections: [
      {
        title: 'About',
        items: [
          { label: 'Press Releases & News', href: '/news/', icon: Newspaper },
          { label: 'About Us', href: '/about/', icon: Building2 },
          { label: 'Careers', href: '/careers/', icon: Briefcase },
          { label: 'Partners', href: '/partners/', icon: Users },
          { label: 'Contact Us', href: '/contact-us/', icon: AtSign },
        ],
      },
      {
        title: 'Trust Hub',
        titleHref: '/trust-hub/',
        description: 'Explore how TiDB ensures the confidentiality and availability of your data',
        items: [],
      },
    ],
  },
  {
    label: 'Docs',
    href: 'https://docs.pingcap.com/',
    external: true,
  },
]

// ─── Desktop dropdown panel ────────────────────────────────────────────────────

function MegaMenu({ item }: { item: NavDropdown }) {
  const sectionCount = item.sections.length
  const hasFeatured = !!item.featured
  const translateX = item.translateX ?? '-translate-x-1/2'

  // Panel min-width
  const panelMinWidth =
    hasFeatured ? 'min-w-[828px]' :
    sectionCount === 1 ? 'min-w-[260px]' :
    sectionCount === 2 ? 'min-w-[500px]' :
    'min-w-[660px]'

  return (
    <div className={cn('absolute top-full left-1/2 pt-3 hidden group-hover:block z-50', translateX)}>
      <div className={`bg-bg-inverse border border-carbon-800 shadow-card p-5 overflow-hidden ${panelMinWidth}`}>
        <div className={hasFeatured ? 'grid grid-cols-[408px_1fr]' : ''}>

          {/* Featured panel (Product only) */}
          {item.featured && (
            <div className="flex flex-col pr-12 mr-12 border-r border-carbon-800">
              <Image
                src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
                alt="TiDB"
                width={60}
                height={25}
                className="block"
              />
              <p className="text-base text-carbon-400 my-4 leading-relaxed">
                {item.featured.description}
              </p>
              <a
                href={item.featured.cta.href}
                className="group/cta inline-flex items-center gap-2 text-body-md text-text-inverse font-medium"
              >
                {item.featured.cta.label}
                <span aria-hidden="true" className="inline-flex items-center">
                  <span className="block h-px bg-current w-3 transition-[width] duration-200 group-hover/cta:w-5" />
                  <span className="inline-block w-2 h-2 border-r border-t border-current rotate-45 -ml-2" />
                </span>
              </a>
            </div>
          )}

          {/* Sections */}
          <div className="flex">
            {item.sections.map((section, i) => (
              <div key={section.title ?? i} className={cn(
                'space-y-4',
                i !== 0 && 'pl-12 ml-12 border-l border-carbon-800',
                section.titleHref && 'min-w-[360px]',
              )}>
                {/* Section title — plain or linked (Customer Stories style) */}
                {section.title && (
                  section.titleHref ? (
                    <a
                      href={section.titleHref}
                      className="group/col inline-flex items-center gap-2 text-base text-text-inverse font-medium"
                    >
                      {section.title}
                      <span aria-hidden="true" className="inline-flex items-center">
                        <span className="block h-px bg-current w-3 transition-[width] duration-200 group-hover/col:w-5" />
                        <span className="inline-block w-2 h-2 border-r border-t border-current rotate-45 -ml-2" />
                      </span>
                    </a>
                  ) : (
                    <p className="text-base text-text-inverse font-medium whitespace-nowrap">
                      {section.title}
                    </p>
                  )
                )}
                {/* Section description (no items, e.g. Customer Stories) */}
                {section.description && section.items.length === 0 && (
                  <p className="text-base text-carbon-400 leading-relaxed">
                    {section.description}
                  </p>
                )}
                {/* Items */}
                {section.items.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="flex items-start gap-3 text-carbon-400 hover:text-text-inverse group/item font-medium"
                  >
                    {sub.icon && (
                      <sub.icon size={16} className="shrink-0 mt-0.5" />
                    )}
                    <span>
                      <span className="block text-body-md whitespace-nowrap">
                        {sub.label}
                      </span>
                      {sub.description && (
                        <span className="block text-[11px] text-text-inverse/40 mt-0.5 leading-snug whitespace-normal">
                          {sub.description}
                        </span>
                      )}
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile accordion item ─────────────────────────────────────────────────────

function MobileAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: NavDropdown
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <li className="py-1">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full py-3 text-lg font-medium text-text-inverse"
      >
        <span>{item.label}</span>
        <ChevronRight
          size={16}
          className={cn('text-carbon-400 transition-transform duration-200', isOpen && 'rotate-90')}
        />
      </button>

      <div className={cn(
        'overflow-hidden transition-[max-height] duration-300 ease-in-out',
        isOpen ? 'max-h-[800px]' : 'max-h-0',
      )}>
        <div className="divide-y divide-carbon-800">
          {/* Featured panel (Product only) */}
          {item.featured && (
            <div className="pb-4 space-y-3">
              <Image
                src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
                alt="TiDB"
                width={60}
                height={25}
                className="block"
              />
              <p className="text-base text-carbon-400 leading-relaxed">
                {item.featured.description}
              </p>
              <a
                href={item.featured.cta.href}
                className="inline-flex items-center gap-1 text-base font-medium text-text-inverse"
              >
                {item.featured.cta.label} →
              </a>
            </div>
          )}

          {item.sections.map((section, i) => (
            <div key={section.title ?? i} className="py-4 space-y-3">
              {section.title && (
                section.titleHref ? (
                  <a
                    href={section.titleHref}
                    className="block text-base font-semibold text-text-inverse"
                  >
                    {section.title} →
                  </a>
                ) : (
                  <p className="text-base font-semibold text-text-inverse">
                    {section.title}
                  </p>
                )
              )}
              {section.description && section.items.length === 0 && (
                <p className="text-base text-carbon-400 leading-relaxed">
                  {section.description}
                </p>
              )}
              {section.items.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {section.items.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="flex items-center gap-2 text-base text-carbon-400 font-medium"
                    >
                      {sub.icon && <sub.icon size={14} className="shrink-0" />}
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}

// ─── Mobile menu panel ─────────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  openAccordion,
  onToggleAccordion,
}: {
  isOpen: boolean
  openAccordion: string | null
  onToggleAccordion: (label: string) => void
}) {
  return (
    <div className={cn(
      'lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out',
      isOpen ? 'max-h-screen' : 'max-h-0',
    )}>
      <div className="bg-bg-inverse h-[calc(100vh-62px)] overflow-y-auto">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <ul className="py-2 divide-y divide-carbon-800">
            {navItems.map((item) =>
              isDropdown(item) ? (
                <MobileAccordionItem
                  key={item.label}
                  item={item}
                  isOpen={openAccordion === item.label}
                  onToggle={() => onToggleAccordion(item.label)}
                />
              ) : (
                <li key={item.label} className="py-1">
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center py-3 text-base font-medium text-text-inverse"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
            {/* Sign In as plain list item */}
            <li className="py-1">
              <a href="/signin/" className="flex items-center py-3 text-base font-medium text-text-inverse">
                Sign In
              </a>
            </li>
          </ul>

          {/* Start for Free button */}
          <div className="py-4 flex justify-center">
            <PrimaryButton href="/signup/" className="w-full max-w-[230px] justify-center">Start for Free</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const toggleAccordion = (label: string) =>
    setOpenAccordion((prev) => (prev === label ? null : label))

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-inverse">
      <div className="h-[62px] lg:h-20">
        <nav
          className="max-w-container mx-auto h-full px-4 md:px-8 lg:px-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="/tidb/" className="shrink-0">
            <Image
              src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
              alt="TiDB"
              width={120}
              height={50}
              className="block w-[92px] h-[38px] lg:w-[120px] lg:h-[50px]"
              priority
            />
          </a>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-1 text-base font-medium text-text-inverse">
            {navItems.map((item) =>
              isDropdown(item) ? (
                <li key={item.label} className="group relative">
                  <button className="flex items-center gap-1 px-3 py-2 hover:text-carbon-400 transition-colors duration-150 cursor-pointer">
                    {item.label}
                  </button>
                  <MegaMenu item={item} />
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="px-3 py-2 hover:text-carbon-400 transition-colors duration-150 block"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <GhostButton href="/signin/">Sign In</GhostButton>
            <PrimaryButton href="/signup/">Start for Free</PrimaryButton>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="lg:hidden flex items-center justify-center w-6 h-10 text-text-inverse"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setMobileOpen((p) => !p)
              if (mobileOpen) setOpenAccordion(null)
            }}
          >
            {mobileOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </nav>
      </div>

      <MobileMenu
        isOpen={mobileOpen}
        openAccordion={openAccordion}
        onToggleAccordion={toggleAccordion}
      />
    </header>
  )
}
