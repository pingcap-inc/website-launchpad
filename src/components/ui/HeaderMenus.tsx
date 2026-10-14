'use client'

import Image from 'next/image'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { externalLinkProps, isExternalHref } from '@/lib/links'
import {
  type IconProps,
  CloudTIcon,
  StackTIcon,
  DollarTIcon,
  GearIcon,
  SlidersIcon,
  StarIcon,
  EyeIcon,
  ChartDownTIcon,
  AiTIcon,
  WalletTIcon,
  BagT1Icon,
  DesktopTIcon,
  FileTIcon,
  BookTIcon,
  VideoIcon,
  CalendarTIcon,
  CommentsTIcon,
  CodeTIcon,
  BookmarkTIcon,
  EducationIcon,
  AppWindowIcon,
  AwardIcon,
  NewspaperIcon,
  BuildingsIcon,
  BriefcaseIcon,
  HandshakeIcon,
  AtIcon,
  CashIcon,
  MenuIcon,
  ArchiveIcon,
  BoltTIcon,
  ChartHistogramTIcon,
  SlidersTIcon,
} from './header-icons'
import { PrimaryButton } from './PrimaryButton'
import { ArrowUpRight } from './SecondaryButton'

interface DropdownItem {
  label: string
  href: string
  icon?: LucideIcon | React.FC<IconProps> | string
  description?: string
  /** Custom badge label shown next to the item label, e.g. 'New'. */
  badges?: string
}

interface DropdownSection {
  title?: string
  titleHref?: string
  description?: string
  items: DropdownItem[]
}

interface MenuCta {
  label: string
  href: string
}

/** One bordered product panel in the Product mega-menu's top row. */
interface ProductPanel {
  title: string
  subtitle: string
  description: string
  cta: MenuCta
  badge?: string
  /** Spans two grid columns, gets the red accent rule and the deployment cards. */
  wide?: boolean
  cardsLabel?: string
  cards?: DropdownItem[]
}

/** Full-width row under the panels, e.g. the Pricing banner. */
interface ProductBanner {
  icon: LucideIcon | React.FC<IconProps>
  title: string
  description: string
  cta: MenuCta
}

/**
 * Desktop-only layout for the Product menu (panels + links column + banner).
 * Mobile keeps rendering the plain `sections` list below.
 */
interface ProductMenu {
  panels: ProductPanel[]
  links: DropdownSection
  banner: ProductBanner
}

interface NavDropdown {
  label: string
  translateX?: string
  panelWidth?: string
  featured?: {
    description: string
    cta: MenuCta
  }
  product?: ProductMenu
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

const dropdowns: NavDropdown[] = [
  {
    label: 'AI',
    translateX: '-translate-x-[12%]',
    panelWidth: 'min-w-[420px]',
    sections: [
      {
        title: 'TiDB for Agentic AI',
        items: [
          {
            label: 'Database for Agentic AI',
            href: 'https://www.pingcap.com/ai/agentic-ai/',
            icon: 'https://static.pingcap.com/files/2026/04/14001529/Database-for-Agentic-Al.svg',
            description: 'Purpose-built for agent memory, state, and multi-hop reasoning',
          },
          {
            label: 'Persistent Context for AI Agents',
            href: 'https://www.pingcap.com/solutions/ai-agent-context/',
            icon: 'https://static.pingcap.com/files/2026/04/14001529/Quick-Start.svg',
            description: 'Persistent, queryable memory for AI agents with per-agent isolation',
          },
          {
            label: 'Build AI Applications',
            href: 'https://www.pingcap.com/developers/build-ai-apps/',
            icon: 'https://static.pingcap.com/files/2026/04/14001528/Build-AI-Applications.svg',
            description: 'SDKs, guides, and templates for shipping AI apps fast',
          },
          {
            label: 'Vector Search & RAG',
            href: 'https://www.pingcap.com/ai/vector-search/',
            icon: 'https://static.pingcap.com/files/2026/04/14001530/Vector-Search-RAG.svg',
            description: 'Native vector indexing and retrieval-augmented generation pipelines',
          },
          {
            label: 'AI Startup Program',
            href: 'https://www.pingcap.com/tidb-ai-startup-program/',
            icon: 'https://static.pingcap.com/files/2026/08/13000834/Al-Startup-Program.svg',
            description: 'Scale faster without letting infrastructure become the bottleneck',
            badges: 'PROGRAM',
          },
        ],
      },
    ],
  },
  {
    label: 'Product',
    translateX: '-translate-x-[24%]',
    featured: {
      description:
        'An open-source distributed SQL database trusted by innovators to power transactional, AI, and other modern applications.',
      cta: { label: 'Product Overview', href: '/tidb/' },
    },
    // Desktop uses the panel layout; `sections` below still drives mobile.
    product: {
      panels: [
        {
          wide: true,
          title: 'TiDB',
          subtitle: 'Distributed SQL database',
          description:
            'Power transactional and AI applications with an open-source distributed SQL database.',
          cta: { label: 'Product Overview', href: '/tidb/' },
          cardsLabel: 'Deployment Options',
          cards: [
            {
              label: 'TiDB Cloud',
              href: 'https://www.pingcap.com/tidb/cloud/',
              description: 'Fully managed service',
              icon: CloudTIcon,
            },
            {
              label: 'TiDB Self-Managed',
              href: 'https://www.pingcap.com/tidb/self-managed/',
              description: 'Deploy on your own infrastructure',
              icon: StackTIcon,
            },
          ],
        },
        {
          title: 'TiDB Cloud Lake',
          badge: 'Public Preview',
          subtitle: 'Managed analytics and search',
          description:
            'Analyze data with SQL, full-text search, and vector search in a managed warehouse.',
          cta: { label: 'Explore TiDB Cloud Lake', href: '/tidb-cloud-lake/' },
        },
      ],
      links: {
        title: 'Ecosystem',
        items: [
          { label: 'Integrations', href: 'https://www.pingcap.com/integrations/', icon: GearIcon },
          { label: 'TiKV', href: 'https://github.com/tikv/tikv', icon: SlidersIcon },
          { label: 'mem9', href: 'https://mem9.ai/', icon: CashIcon },
          {
            label: 'TiDB Cloud Filesystem',
            href: 'https://www.pingcap.com/tidb/tidb-cloud-filesystem/',
            icon: WalletTIcon,
          },
          { label: 'TiDB Cloud Zero', href: 'https://zero.tidbcloud.com/', icon: BoltTIcon },
          { label: 'OSS Insight', href: 'https://ossinsight.io/', icon: EyeIcon },
        ],
      },
      banner: {
        icon: DollarTIcon,
        title: 'Pricing',
        description: 'Compare plans and pricing for TiDB and TiDB Cloud Lake',
        cta: { label: 'View Pricing', href: 'https://www.pingcap.com/pricing/' },
      },
    },
    sections: [
      {
        title: 'Deployment Options',
        items: [
          { label: 'TiDB Cloud', href: 'https://www.pingcap.com/tidb/cloud/', icon: CloudTIcon },
          {
            label: 'TiDB Self-Managed',
            href: 'https://www.pingcap.com/tidb/self-managed/',
            icon: StackTIcon,
          },
          {
            label: 'TiDB Cloud Lake',
            href: '/tidb-cloud-lake/',
            icon: ChartHistogramTIcon,
          },
          { label: 'Pricing', href: 'https://www.pingcap.com/pricing/', icon: DollarTIcon },
        ],
      },
      {
        title: 'Ecosystem',
        items: [
          { label: 'Integrations', href: 'https://www.pingcap.com/integrations/', icon: GearIcon },
          { label: 'TiKV', href: 'https://github.com/tikv/tikv', icon: SlidersIcon },
          { label: 'mem9', href: 'https://mem9.ai/', icon: CashIcon },
          {
            label: 'TiDB Cloud Filesystem',
            href: 'https://www.pingcap.com/tidb/tidb-cloud-filesystem/',
            icon: WalletTIcon,
          },
          { label: 'TiDB Cloud Zero', href: 'https://zero.tidbcloud.com/', icon: BoltTIcon },
          { label: 'OSS Insight', href: 'https://ossinsight.io/', icon: EyeIcon },
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
          {
            label: 'Lower Infrastructure Costs',
            href: 'https://www.pingcap.com/solutions/lower-infrastructure-costs/',
            icon: ChartDownTIcon,
          },
          {
            label: 'Enable Operational Intelligence',
            href: 'https://www.pingcap.com/solutions/enable-operational-intelligence/',
            icon: StarIcon,
          },
          {
            label: 'Modernize MySQL Workloads',
            href: 'https://www.pingcap.com/solutions/modernize-mysql-workloads/',
            icon: CloudTIcon,
          },
          { label: 'Build GenAI Applications', href: 'https://www.pingcap.com/ai/', icon: AiTIcon },
          {
            label: 'Build Persistent Context for AI Agents',
            href: 'https://www.pingcap.com/solutions/ai-agent-context/',
            icon: AiTIcon,
          },
        ],
      },
      {
        title: 'By Industry',
        items: [
          { label: 'AI', href: 'https://www.pingcap.com/ai/', icon: AiTIcon },
          {
            label: 'Fintech',
            href: 'https://www.pingcap.com/solutions/fintech/',
            icon: WalletTIcon,
          },
          {
            label: 'eCommerce',
            href: 'https://www.pingcap.com/solutions/e-commerce/',
            icon: BagT1Icon,
          },
          { label: 'SaaS', href: 'https://www.pingcap.com/solutions/saas/', icon: DesktopTIcon },
          {
            label: 'Logistics & Supply Chain',
            href: 'https://www.pingcap.com/solutions/logistics-supply-chain/',
            icon: ArchiveIcon,
          },
          { label: 'Web3', href: 'https://www.pingcap.com/solutions/web3/', icon: SlidersTIcon },
        ],
      },
      {
        title: 'Customer Stories',
        titleHref: 'https://www.pingcap.com/customers/',
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
          { label: 'Blog', href: 'https://www.pingcap.com/blog/', icon: FileTIcon },
          {
            label: 'eBooks & Whitepapers',
            href: 'https://www.pingcap.com/ebook-whitepaper/',
            icon: BookTIcon,
          },
          {
            label: 'Webinars and Videos',
            href: 'https://www.pingcap.com/webinars-videos/',
            icon: VideoIcon,
          },
          {
            label: 'Compare Databases',
            href: 'https://www.pingcap.com/compare/',
            icon: MenuIcon,
          },
          { label: 'Playbooks', href: 'https://www.pingcap.com/playbook/', icon: StackTIcon },
        ],
      },
      {
        title: 'Engage',
        items: [
          { label: 'Events', href: 'https://www.pingcap.com/event/', icon: CalendarTIcon },
          {
            label: 'Discord Community',
            href: 'https://discord.com/invite/vYU9h56kAX',
            icon: CommentsTIcon,
          },
          { label: 'Developer Hub', href: 'https://www.pingcap.com/developers/', icon: CodeTIcon },
          {
            label: 'TiDB SCaiLE',
            href: 'https://www.pingcap.com/tidb-scaile-summit/',
            icon: BookmarkTIcon,
          },
        ],
      },
      {
        title: 'PingCAP University',
        items: [
          { label: 'Courses', href: 'https://www.pingcap.com/education/', icon: EducationIcon },
          { label: 'Hands-on Labs', href: 'https://labs.tidb.io/', icon: AppWindowIcon },
          {
            label: 'Certifications',
            href: 'https://www.pingcap.com/education/certification/',
            icon: AwardIcon,
          },
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
          {
            label: 'Press Releases & News',
            href: 'https://www.pingcap.com/press-releases-news/',
            icon: NewspaperIcon,
          },
          { label: 'About Us', href: 'https://www.pingcap.com/about-us/', icon: BuildingsIcon },
          { label: 'Careers', href: 'https://www.pingcap.com/careers/', icon: BriefcaseIcon },
          { label: 'Partners', href: 'https://www.pingcap.com/partners/', icon: HandshakeIcon },
          { label: 'Contact Us', href: 'https://www.pingcap.com/contact-us/', icon: AtIcon },
        ],
      },
      {
        title: 'Trust Hub',
        titleHref: 'https://www.pingcap.com/trust-hub/',
        description: 'Explore how TiDB ensures the confidentiality and availability of your data.',
        items: [],
      },
    ],
  },
]

const dropdownMap = new Map(dropdowns.map((item) => [item.label, item]))

const mobileNavItems: NavItem[] = [
  ...dropdowns,
  { label: 'Docs', href: 'https://docs.pingcap.com/', external: true },
]

function MegaMenu({ item }: { item: NavDropdown }) {
  const sectionCount = item.sections.length
  const hasFeatured = !!item.featured
  const translateX = item.translateX ?? '-translate-x-1/2'

  const panelMinWidth =
    item.panelWidth ??
    (hasFeatured
      ? 'min-w-[828px]'
      : sectionCount === 1
        ? 'min-w-[260px]'
        : sectionCount === 2
          ? 'min-w-[500px]'
          : 'min-w-[660px]')

  return (
    <div className={cn('absolute top-full left-1/2 pt-3 block z-50', translateX)}>
      <div
        className={`bg-bg-primary border border-carbon-800 shadow-card p-5 overflow-hidden ${panelMinWidth}`}
      >
        <div className={hasFeatured ? 'grid grid-cols-[408px_1fr]' : ''}>
          {item.featured && (
            <div className="flex flex-col pr-12 mr-12 border-r border-carbon-800">
              <Image
                src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
                alt="TiDB"
                width={60}
                height={25}
                className="block"
              />
              <p className="text-[15px] text-carbon-400 my-4 leading-relaxed font-light">
                {item.featured.description}
              </p>
              <a
                href={item.featured.cta.href}
                className="group/cta inline-flex items-center gap-2 text-body-md text-text-inverse font-medium"
                {...externalLinkProps(item.featured.cta.href)}
              >
                {item.featured.cta.label}
                <span aria-hidden="true" className="inline-flex items-center">
                  <span className="block h-px bg-current w-3 transition-[width] duration-200 group-hover/cta:w-5" />
                  <span className="inline-block w-2 h-2 border-r border-t border-current rotate-45 -ml-2" />
                </span>
              </a>
            </div>
          )}

          <div className="flex space-x-12">
            {item.sections.map((section, i) => (
              <div
                key={section.title ?? i}
                className={cn(
                  'space-y-4',
                  i !== 0 && 'pl-12 border-l border-carbon-800',
                  section.titleHref && 'min-w-[388px]'
                )}
              >
                {section.title &&
                  (section.titleHref ? (
                    <a
                      href={section.titleHref}
                      className="group/col inline-flex items-center gap-2 text-base text-text-inverse font-medium"
                      {...externalLinkProps(section.titleHref)}
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
                  ))}
                {section.description && section.items.length === 0 && (
                  <p className="text-base text-carbon-400 leading-relaxed font-light">
                    {section.description}
                  </p>
                )}
                {section.items.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="flex items-center gap-3 text-carbon-400 hover:text-carbon-800 group/item font-medium"
                    {...externalLinkProps(sub.href)}
                  >
                    {sub.icon && <sub.icon size={18} className="shrink-0" />}
                    <span>
                      <span className="block text-body-md whitespace-nowrap">{sub.label}</span>
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

      <div
        className={cn(
          'overflow-hidden transition-[max-height] duration-300 ease-in-out',
          isOpen ? 'max-h-[800px]' : 'max-h-0'
        )}
      >
        <div className="divide-y divide-carbon-800">
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
                {...externalLinkProps(item.featured.cta.href)}
              >
                {item.featured.cta.label} →
              </a>
            </div>
          )}

          {item.sections.map((section, i) => (
            <div key={section.title ?? i} className="py-4 space-y-3">
              {section.title &&
                (section.titleHref ? (
                  <a
                    href={section.titleHref}
                    className="block text-base font-medium text-text-inverse"
                    {...externalLinkProps(section.titleHref)}
                  >
                    {section.title} →
                  </a>
                ) : (
                  <p className="text-base font-medium text-text-inverse">{section.title}</p>
                ))}
              {section.description && section.items.length === 0 && (
                <p className="text-base text-carbon-400 leading-relaxed font-light">
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
                      {...externalLinkProps(sub.href)}
                    >
                      {sub.icon && typeof sub.icon !== 'string' && (
                        <sub.icon size={14} className="shrink-0" />
                      )}
                      {sub.label}
                      {sub.badges && (
                        <span className="ml-auto rounded-xs bg-brand-red-primary px-2 py-0 text-xs font-bold uppercase tracking-wider text-text-inverse">
                          {sub.badges}
                        </span>
                      )}
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

// The "AI" menu uses a dedicated single-column layout (large icon + title +
// description per row), distinct from the generic columns MegaMenu.
function AiMegaMenu({ item }: { item: NavDropdown }) {
  const translateX = '-translate-x-1/2'
  const section = item.sections[0]
  if (!section) return null

  return (
    <div className={cn('absolute top-full left-1/2 pt-6 block z-50', translateX)}>
      <div className="w-[440px] overflow-hidden border border-carbon-800 bg-bg-primary px-6 pb-3 pt-6 shadow-card">
        {section.title && (
          <p className="text-label font-bold uppercase tracking-wider text-white/30">
            {section.title}
          </p>
        )}
        <div className="mt-2 flex flex-col divide-y divide-[#53555e4d]">
          {section.items.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              className="group/item flex items-start gap-3 py-3"
              {...externalLinkProps(sub.href)}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                {typeof sub.icon === 'string' && (
                  <Image src={sub.icon} alt="" width={36} height={36} />
                )}
              </span>
              <span className="flex flex-col">
                <span className="flex items-center gap-2">
                  <span className="text-body-md font-medium text-text-inverse">{sub.label}</span>
                  {sub.badges && (
                    <span className="rounded-sm bg-brand-red-primary px-1.5 py-0 text-xs font-bold uppercase tracking-wider text-text-inverse">
                      {sub.badges}
                    </span>
                  )}
                </span>
                {sub.description && (
                  <span className="mt-0.5 text-sm leading-snug text-text-secondary font-light">
                    {sub.description}
                  </span>
                )}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// Shared CTA treatments for the Product menu: a bordered button (panel + banner)
// and the inline text link used inside the narrow panels.
function ProductCtaButton({ cta, className }: { cta: MenuCta; className?: string }) {
  return (
    <a
      href={cta.href}
      className={cn(
        'group/cta inline-flex shrink-0 items-center gap-2 border border-white/40 px-6 py-4',
        'text-body-md font-medium text-text-inverse',
        'transition-colors duration-200 hover:border-white hover:bg-white/[0.16]',
        className
      )}
      {...externalLinkProps(cta.href)}
    >
      {cta.label}
      <ArrowUpRight
        width={16}
        height={16}
        className="shrink-0 transition-transform duration-200 group-hover/cta:rotate-45"
      />
    </a>
  )
}

function ProductCtaLink({ cta }: { cta: MenuCta }) {
  return (
    <a
      href={cta.href}
      className="group/cta mt-auto inline-flex items-center gap-2 text-body-md font-medium text-text-inverse"
      {...externalLinkProps(cta.href)}
    >
      {cta.label}
      <span aria-hidden="true" className="inline-flex items-center">
        <span className="block h-px w-3 bg-current transition-[width] duration-200 group-hover/cta:w-5" />
        <span className="-ml-2 inline-block h-2 w-2 rotate-45 border-r border-t border-current" />
      </span>
    </a>
  )
}

function ProductPanelCard({ card }: { card: DropdownItem }) {
  return (
    <a
      href={card.href}
      className="flex flex-col gap-1.5 border border-carbon-800/70 p-4 transition-colors duration-200 hover:border-white/50 hover:bg-white/[0.16]"
      {...externalLinkProps(card.href)}
    >
      <span className="flex items-center gap-2.5 text-body-md font-medium leading-snug text-text-inverse">
        {card.icon && typeof card.icon !== 'string' && <card.icon size={18} className="shrink-0" />}
        {card.label}
      </span>
      {card.description && (
        <span className="text-[13px] font-light leading-normal text-text-secondary">
          {card.description}
        </span>
      )}
    </a>
  )
}

// The "Product" menu spans the full container width and uses bordered panels
// instead of the generic columns MegaMenu. It is positioned against the
// viewport (not the nav item) so it lines up with the page container.
function ProductMegaMenu({ item }: { item: NavDropdown }) {
  const product = item.product
  if (!product) return null

  return (
    <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 pt-2">
      <div className="w-[var(--container-max-width)] max-w-[calc(100vw-var(--container-margin)*2)] border border-carbon-800 bg-bg-primary shadow-card">
        <div className="flex flex-col gap-4 p-5">
          <div className="grid grid-cols-4 gap-4">
            {product.panels.map((panel) => (
              <div
                key={panel.title}
                className={cn(
                  'relative flex min-w-0 flex-col border border-carbon-800/70 p-6',
                  panel.wide && 'col-span-2 bg-white/[0.08]'
                )}
              >
                {panel.wide && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-px -right-px -top-px h-0.5 bg-brand-red-primary"
                  />
                )}
                <div className="flex flex-col items-start gap-2">
                  <span
                    className={cn(
                      'font-medium leading-tight text-text-inverse',
                      panel.wide ? 'text-[40px]' : 'text-[24px]'
                    )}
                  >
                    {panel.title}
                  </span>
                  {panel.badge && (
                    <span className="inline-flex items-center rounded-pill border border-white/40 px-2.5 py-0.5 text-xs font-medium text-text-inverse">
                      {panel.badge}
                    </span>
                  )}
                  <span className="text-lg font-medium leading-snug text-text-inverse">
                    {panel.subtitle}
                  </span>
                </div>

                <div
                  className={cn(
                    'mt-4 flex gap-4',
                    panel.wide
                      ? 'flex-row items-center justify-between gap-8'
                      : 'flex-1 flex-col items-start justify-between'
                  )}
                >
                  <p className="text-sm font-light leading-relaxed text-text-secondary">
                    {panel.description}
                  </p>
                  {panel.wide ? (
                    <ProductCtaButton cta={panel.cta} />
                  ) : (
                    <ProductCtaLink cta={panel.cta} />
                  )}
                </div>

                {panel.cards && panel.cards.length > 0 && (
                  <div className="mt-6 border-t border-carbon-800/70 pt-6">
                    {panel.cardsLabel && (
                      <span className="mb-3 block text-sm text-text-secondary">
                        {panel.cardsLabel}
                      </span>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {panel.cards.map((card) => (
                        <ProductPanelCard key={card.label} card={card} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex min-w-0 flex-col gap-4 border-l border-carbon-800/70 pl-5">
              {product.links.title && (
                <span className="text-body-md text-text-inverse">{product.links.title}</span>
              )}
              {product.links.items.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center text-body-md font-light leading-snug text-text-secondary transition-colors duration-200 hover:text-text-inverse"
                  {...externalLinkProps(link.href)}
                >
                  {link.icon && typeof link.icon !== 'string' && (
                    <link.icon size={18} className="mr-3 shrink-0" />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center border border-carbon-800/70 bg-white/[0.08] px-6 py-5">
            <span className="mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-carbon-800/70 text-text-inverse">
              <product.banner.icon size={20} />
            </span>
            <span className="flex flex-col">
              <span className="text-[22px] font-medium leading-tight text-text-inverse">
                {product.banner.title}
              </span>
              <span className="text-sm font-light leading-normal text-text-secondary">
                {product.banner.description}
              </span>
            </span>
            <ProductCtaButton cta={product.banner.cta} className="ml-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeaderMegaMenu({ label }: { label: string }) {
  const item = dropdownMap.get(label)
  if (!item) return null
  if (label === 'AI') return <AiMegaMenu item={item} />
  if (item.product) return <ProductMegaMenu item={item} />
  return <MegaMenu item={item} />
}

export function HeaderMobileMenu({
  isOpen,
  openAccordion,
  onToggleAccordion,
}: {
  isOpen: boolean
  openAccordion: string | null
  onToggleAccordion: (label: string) => void
}) {
  return (
    <div
      className={cn(
        'lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out',
        isOpen ? 'max-h-screen' : 'max-h-0'
      )}
    >
      <div className="bg-bg-primary h-[calc(100vh-62px)] overflow-y-auto">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <ul className="py-2 divide-y divide-carbon-800">
            {mobileNavItems.map((item) =>
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
                    {...(item.external || isExternalHref(item.href)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex items-center py-3 text-base font-medium text-text-inverse"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
            <li className="py-1">
              <a
                href="https://tidbcloud.com/signin"
                className="flex items-center py-3 text-base font-medium text-text-inverse"
                {...externalLinkProps('https://tidbcloud.com/signin')}
              >
                Sign In
              </a>
            </li>
          </ul>
          <div className="py-4 flex justify-center">
            <PrimaryButton
              href="https://tidbcloud.com/free-trial/"
              className="w-full max-w-[230px] justify-center"
            >
              Start for Free
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
