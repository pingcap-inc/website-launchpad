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

type EntryPage = {
  href: string
  label: string
}

const APP_DIR = path.join(process.cwd(), 'src/app')

function toTitleCase(input: string) {
  return input
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function getEntryPages(): Promise<EntryPage[]> {
  const entries = await fs.readdir(APP_DIR, { withFileTypes: true })
  const pages: EntryPage[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('_')) continue
    if (entry.name.startsWith('(') && entry.name.endsWith(')')) continue
    if (entry.name.startsWith('[') && entry.name.endsWith(']')) continue

    const pageFile = path.join(APP_DIR, entry.name, 'page.tsx')
    try {
      await fs.access(pageFile)
      pages.push({
        href: `/${entry.name}/`,
        label: toTitleCase(entry.name),
      })
    } catch {
      // Ignore folders without page.tsx.
    }
  }

  return pages.sort((a, b) => a.href.localeCompare(b.href))
}

export default async function HomePage() {
  const entryPages = await getEntryPages()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 py-20 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.16em] text-brand-red-primary">
          website-launchpad
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Local preview entry page</h1>
        <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
          This root page exists for local onboarding. In production, root traffic is still handled
          by WordPress and reverse proxy routing.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {entryPages.length === 0 && (
          <p className="text-sm text-text-secondary">No top-level routes found in `src/app`.</p>
        )}
        {entryPages.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border-primary bg-bg-secondary px-5 py-4 text-base font-bold text-text-inverse transition-colors hover:border-brand-red-primary hover:text-brand-red-primary"
          >
            {item.label}
          </Link>
        ))}
      </section>
    </main>
  )
}
