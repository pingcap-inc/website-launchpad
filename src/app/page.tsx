import type { Metadata } from 'next'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'

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

function RouteLink({ route, label }: { route: Route; label: string }) {
  return (
    <Link
      href={route.href}
      className="flex flex-col gap-1 rounded-xl border border-border-primary bg-bg-secondary px-5 py-4 text-text-inverse transition-colors hover:border-brand-red-primary hover:text-brand-red-primary"
    >
      <span className="text-base font-bold">{label}</span>
      <span className="text-xs text-text-secondary">{route.href}</span>
    </Link>
  )
}

export default async function HomePage() {
  const { standalone, parents, total } = await getRouteGroups()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-20 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.16em] text-brand-red-primary">
          website-launchpad
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Local Preview Entry Page</h1>
        <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
          This root page exists for local onboarding. In production, root traffic is still handled
          by WordPress and reverse proxy routing.
        </p>
        <p className="text-sm text-text-secondary">{total} pages found in `src/app`.</p>
      </section>

      {total === 0 && <p className="text-sm text-text-secondary">No routes found in `src/app`.</p>}

      {standalone.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Top-Level Pages</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {standalone.map((route) => (
              <RouteLink key={route.href} route={route} label={toTitleCase(route.segments[0])} />
            ))}
          </div>
        </section>
      )}

      {parents.map((group) => (
        <section key={group.key} className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border-primary pb-3">
            <h2 className="text-2xl font-bold">
              {group.parent ? (
                <Link
                  href={group.parent.href}
                  className="transition-colors hover:text-brand-red-primary"
                >
                  {toTitleCase(group.key)}
                </Link>
              ) : (
                toTitleCase(group.key)
              )}
            </h2>
            <span className="text-sm text-text-secondary">
              /{group.key}/{group.parent ? '' : ' · no index page'} · {group.children.length}{' '}
              {group.children.length === 1 ? 'child page' : 'child pages'}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.children.map((route) => (
              <RouteLink
                key={route.href}
                route={route}
                label={route.segments.slice(1).map(toTitleCase).join(' / ')}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
