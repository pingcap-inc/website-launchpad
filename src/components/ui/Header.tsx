'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { GhostButton } from './GhostButton'
import { PrimaryButton } from './PrimaryButton'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { isExternalHref } from '@/lib/links'

const HeaderMegaMenu = dynamic(() => import('./HeaderMenus').then((mod) => mod.HeaderMegaMenu))
const HeaderMobileMenu = dynamic(() => import('./HeaderMenus').then((mod) => mod.HeaderMobileMenu))

interface NavDropdownLite {
  label: string
  kind: 'dropdown'
}

interface NavLinkLite {
  label: string
  kind: 'link'
  href: string
  external?: boolean
}

type NavItemLite = NavDropdownLite | NavLinkLite

function isDropdown(item: NavItemLite): item is NavDropdownLite {
  return item.kind === 'dropdown'
}

const navItems: NavItemLite[] = [
  { label: 'Product', kind: 'dropdown' },
  { label: 'Solutions', kind: 'dropdown' },
  { label: 'Resources', kind: 'dropdown' },
  { label: 'Company', kind: 'dropdown' },
  {
    label: 'Docs',
    kind: 'link',
    href: 'https://docs.pingcap.com/',
    external: true,
  },
]

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const preloadMenus = () => {
    ;(HeaderMegaMenu as unknown as { preload?: () => void }).preload?.()
  }

  const openMenu = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    preloadMenus()
    setOpenDropdown(label)
  }

  const closeMenuSoon = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 100)
  }

  return (
    <ul className="hidden lg:flex items-center gap-1 text-base font-medium text-text-inverse">
      {navItems.map((item) =>
        isDropdown(item) ? (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => openMenu(item.label)}
            onMouseLeave={closeMenuSoon}
            onFocus={() => openMenu(item.label)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setOpenDropdown(null)
              }
            }}
          >
            <button className="flex items-center gap-1 px-3 py-2 hover:text-carbon-400 transition-colors duration-150 cursor-pointer">
              {item.label}
            </button>
            {openDropdown === item.label && <HeaderMegaMenu label={item.label} />}
          </li>
        ) : (
          <li key={item.label}>
            <a
              href={item.href}
              {...(item.external || isExternalHref(item.href)
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="px-3 py-2 hover:text-carbon-400 transition-colors duration-150 block"
            >
              {item.label}
            </a>
          </li>
        )
      )}
    </ul>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const toggleAccordion = (label: string) =>
    setOpenAccordion((prev) => (prev === label ? null : label))

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary">
      <div className="h-[62px] lg:h-20">
        <nav
          className="max-w-container mx-auto h-full px-4 md:px-8 lg:px-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <a href="/" className="shrink-0">
            <Image
              src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
              alt="TiDB"
              width={120}
              height={50}
              className="block w-[92px] h-[38px] lg:w-[120px] lg:h-[50px]"
              priority
            />
          </a>

          <Navbar />

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <GhostButton href="https://tidbcloud.com/signin">Sign In</GhostButton>
            <PrimaryButton href="https://tidbcloud.com/free-trial/">Start for Free</PrimaryButton>
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-6 h-6 text-text-inverse"
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

      {mobileOpen && (
        <HeaderMobileMenu
          isOpen={mobileOpen}
          openAccordion={openAccordion}
          onToggleAccordion={toggleAccordion}
        />
      )}
    </header>
  )
}
