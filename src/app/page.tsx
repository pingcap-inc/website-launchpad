import type { Metadata } from 'next'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { SectionNav } from './_entry/SectionNav'

export const metadata: Metadata = {
  title: 'Local Entry',
  description: 'Local entry page for website-launchpad development and onboarding.',
  robots: {
    index: false,
    follow: false,
  },
}

type Route = {
  href: string
  /** URL segments, e.g. ['solutions', 'web3'] */
  segments: string[]
}

type RouteGroup = {
  /** First URL segment, e.g. 'solutions' */
  key: string
  /** The parent's own index page, if one exists (e.g. /compare/) */
  parent?: Route
  children: Route[]
}

const APP_DIR = path.join(process.cwd(), 'src/app')

/** Sections shown as a single link, without listing their child pages. */
const COLLAPSED = new Set(['admin'])

function toTitleCase(input: string) {
  return input
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Recursively collects every folder under src/app that has a page.tsx. */
async function collectRoutes(dir: string, segments: string[]): Promise<Route[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const routes: Route[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const name = entry.name
    if (name.startsWith('_')) continue // private folders, e.g. _components
    if (name.startsWith('[')) continue // dynamic routes can't be linked to
    if (segments.length === 0 && name === 'api') continue

    // Route groups like (shell) don't add a URL segment.
    const isGroup = name.startsWith('(') && name.endsWith(')')
    const childSegments = isGroup ? segments : [...segments, name]
    const childDir = path.join(dir, name)

    try {
      await fs.access(path.join(childDir, 'page.tsx'))
      if (childSegments.length > 0) {
        routes.push({ href: `/${childSegments.join('/')}/`, segments: childSegments })
      }
    } catch {
      // No page.tsx at this level; it may still have nested pages.
    }

    routes.push(...(await collectRoutes(childDir, childSegments)))
  }

  return routes
}

async function getRouteGroups() {
  const routes = await collectRoutes(APP_DIR, [])
  const groups = new Map<string, RouteGroup>()

  for (const route of routes) {
    const key = route.segments[0]
    const group = groups.get(key) ?? { key, children: [] }
    if (route.segments.length === 1) group.parent = route
    else if (!COLLAPSED.has(key)) group.children.push(route)
    groups.set(key, group)
  }

  const all = [...groups.values()].sort((a, b) => a.key.localeCompare(b.key))
  for (const group of all) group.children.sort((a, b) => a.href.localeCompare(b.href))

  /** Top-level pages with no listed child pages, e.g. /pricing/, /admin/ */
  const standalone = all.filter((g) => g.children.length === 0 && g.parent).map((g) => g.parent!)
  /** Parents with child pages, e.g. /solutions/ → /solutions/web3/ */
  const parents = all.filter((g) => g.children.length > 0)

  return {
    standalone,
    parents,
    /** Pages actually listed (collapsed sections count once). */
    total:
      standalone.length + parents.reduce((n, g) => n + g.children.length + (g.parent ? 1 : 0), 0),
  }
}

/** Compact link: page name with its path underneath. */
function RouteLink({ route, label }: { route: Route; label: string }) {
  return (
    <Link
      href={route.href}
      title={route.href}
      className="group/link flex min-w-0 flex-col rounded px-2 py-1 transition-colors hover:bg-carbon-900"
    >
      <span className="truncate text-sm text-text-inverse group-hover/link:text-brand-red-primary">
        {label}
      </span>
      <span className="truncate font-mono text-xs text-text-secondary">{route.href}</span>
    </Link>
  )
}

export default async function HomePage() {
  const { standalone, parents, total } = await getRouteGroups()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold leading-tight">Local Preview Entry Page</h1>
        <p className="text-sm text-text-secondary">
          {total} pages in `src/app`. Local onboarding only — in production, `/` is served by
          WordPress.
        </p>
      </section>

      {total === 0 && <p className="text-sm text-text-secondary">No routes found in `src/app`.</p>}

      {parents.length > 0 && (
        <SectionNav
          // Single-page sections are skipped here; they're one line away in the list below.
          sections={parents
            .filter((g) => g.children.length > 1)
            .map((g) => ({
              key: g.key,
              label: toTitleCase(g.key),
              count: g.children.length,
            }))}
        />
      )}

      {standalone.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-bold">Top-Level Pages</h2>
          <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-3 lg:grid-cols-5">
            {standalone.map((route) => (
              <RouteLink key={route.href} route={route} label={toTitleCase(route.segments[0])} />
            ))}
          </div>
        </section>
      )}

      {/* Each section with child pages collapses to one line; click to expand. */}
      <section className="divide-y divide-border-primary border-y border-border-primary">
        {parents.map((group) => (
          <details key={group.key} id={group.key} className="group scroll-mt-6 py-2">
            <summary className="flex cursor-pointer list-none items-baseline gap-3 rounded px-2 py-1 hover:bg-carbon-900 [&::-webkit-details-marker]:hidden">
              <span className="w-3 text-text-secondary transition-transform group-open:rotate-90">
                ›
              </span>
              <h2 className="text-lg font-bold">{toTitleCase(group.key)}</h2>
              <span className="text-sm text-text-secondary">
                {group.children.length} {group.children.length === 1 ? 'page' : 'pages'}
              </span>
              {group.parent ? (
                <Link
                  href={group.parent.href}
                  className="ml-auto text-sm text-text-secondary transition-colors hover:text-brand-red-primary"
                >
                  {group.parent.href}
                </Link>
              ) : (
                <span className="ml-auto text-sm text-text-secondary">no index page</span>
              )}
            </summary>
            <div className="grid gap-x-4 pb-2 pl-5 pt-1 sm:grid-cols-2 lg:grid-cols-3">
              {group.children.map((route) => (
                <RouteLink
                  key={route.href}
                  route={route}
                  label={route.segments.slice(1).map(toTitleCase).join(' / ')}
                />
              ))}
            </div>
          </details>
        ))}
      </section>
    </main>
  )
}
