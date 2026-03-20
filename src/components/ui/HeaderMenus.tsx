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
  ScaleTIcon,
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
} from './header-icons'
import { PrimaryButton } from './PrimaryButton'

interface DropdownItem {
  label: string
  href: string
  icon?: LucideIcon | React.FC<IconProps>
  description?: string
}

interface DropdownSection {
  title?: string
  titleHref?: string
  description?: string
  items: DropdownItem[]
}

interface NavDropdown {
  label: string
  translateX?: string
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

const dropdowns: NavDropdown[] = [
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
          { label: 'TiDB Cloud', href: 'https://www.pingcap.com/tidb/cloud/', icon: CloudTIcon },
          {
            label: 'TiDB Self-Managed',
            href: 'https://www.pingcap.com/tidb/self-managed/',
            icon: StackTIcon,
          },
          { label: 'Pricing', href: 'https://www.pingcap.com/pricing/', icon: DollarTIcon },
        ],
      },
      {
        title: 'Ecosystem',
        items: [
          { label: 'Integrations', href: 'https://www.pingcap.com/integrations/', icon: GearIcon },
          { label: 'TiKV', href: 'https://github.com/tikv/tikv', icon: SlidersIcon },
          { label: 'TiSpark', href: 'https://github.com/pingcap/tispark', icon: StarIcon },
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
          { label: 'Videos & Replays', href: 'https://www.pingcap.com/videos/', icon: VideoIcon },
          {
            label: 'Horizontal Scaling',
            href: 'https://www.pingcap.com/horizontal-scaling-vs-vertical-scaling/',
            icon: ScaleTIcon,
          },
        ],
      },
      {
        title: 'Engage',
        items: [
          {
            label: 'Events & Webinars',
            href: 'https://www.pingcap.com/event/',
            icon: CalendarTIcon,
          },
          { label: 'Discord Community', href: 'https://discord.gg/pingcap', icon: CommentsTIcon },
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
        description: 'Explore how TiDB ensures the confidentiality and availability of your data',
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

  const panelMinWidth = hasFeatured
    ? 'min-w-[828px]'
    : sectionCount === 1
      ? 'min-w-[260px]'
      : sectionCount === 2
        ? 'min-w-[500px]'
        : 'min-w-[660px]'

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
              <p className="text-[15px] text-carbon-400 my-4 leading-relaxed">
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
                  <p className="text-base text-carbon-400 leading-relaxed">{section.description}</p>
                )}
                {section.items.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="flex items-start gap-3 text-carbon-400 hover:text-carbon-800 group/item font-medium"
                    {...externalLinkProps(sub.href)}
                  >
                    {sub.icon && <sub.icon size={16} className="shrink-0 mt-0.5" />}
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
                <p className="text-base text-carbon-400 leading-relaxed">{section.description}</p>
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

export function HeaderMegaMenu({ label }: { label: string }) {
  const item = dropdownMap.get(label)
  if (!item) return null
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
