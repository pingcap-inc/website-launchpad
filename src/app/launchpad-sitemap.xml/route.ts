import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import type { MetadataRoute } from 'next'

// Prerender at build time, where the git checkout is available. The serverless
// runtime has no .git, so this must never run per request.
export const dynamic = 'force-static'

const BASE_URL = 'https://www.pingcap.com'

/**
 * Next.js sitemap for website-launchpad pages, served at /launchpad-sitemap.xml.
 *
 * NOTE: Does NOT include the homepage (/) — that is managed by WordPress.
 * This sitemap is registered in WordPress's sitemap_index.xml via functions.php.
 *
 * Served from a custom filename (launchpad-sitemap.xml) instead of the default
 * /sitemap.xml so it does not collide with the WordPress-managed sitemap.
 *
 * Add new pages to the `routes` array whenever a new route is created in src/app/.
 * Landing pages with robots: noindex should NOT be added here.
 */
const routes: Array<{
  url: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  // Developer section
  { url: '/developers/', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/developers/get-started/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/developers/build-data-apps/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/developers/build-ai-apps/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/developers/migration-center/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/developers/learn/', priority: 0.7, changeFrequency: 'monthly' },
  // Content pages
  { url: '/glossary/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/what-is-tidb/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/integrations/', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tidb-cloud-lake/', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tidb/tidb-cloud-filesystem/', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tidb-cloud-filesystem-pricing-details/', priority: 0.8, changeFrequency: 'weekly' },
  // AI pages
  { url: '/ai/', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/ai/vector-search/', priority: 0.7, changeFrequency: 'monthly' },
  // Compare pages
  { url: '/compare/', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/compare/amazon-aurora-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/best-database-building-ai-apps/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/best-database-for-ai-agents/', priority: 0.7, changeFrequency: 'monthly' },
  {
    url: '/compare/best-databases-for-saas-applications-at-scale/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  { url: '/compare/best-distributed-sql-databases/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/best-vector-database/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/cockroachdb-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/mysql-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/mongodb-vs-mysql/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/mysql-compatible-database/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/planetscale-alternatives/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/supabase-alternative/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/tidb-vs-oceanbase/', priority: 0.7, changeFrequency: 'monthly' },
  {
    url: '/compare/tidb-vs-postgresql-2026-comparison-guide/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  { url: '/compare/yugabytedb-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/vitess-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/compare/htap-database/', priority: 0.7, changeFrequency: 'monthly' },
  {
    url: '/compare/best-databases-for-real-time-analytics/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  // Playbook pages
  { url: '/playbook/', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/playbook/ai-agent-memory/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/playbook/aurora-mysql-migration/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/playbook/build-mcp-server/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/playbook/embed-vector-db-build-rag/', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/playbook/escape-mysql-sharding-pain/', priority: 0.7, changeFrequency: 'monthly' },
  {
    url: '/playbook/how-to-cursor-ai-database-integration/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    url: '/playbook/idea-to-live-app-weekend-app-development-guide/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    url: '/playbook/noisy-neighbor-multi-tenant-mysql/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  { url: '/playbook/vibe-coding-tech-stack-guide/', priority: 0.7, changeFrequency: 'monthly' },
  {
    url: '/playbook/schema-changes-midnight-maintenance/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  // Programs pages
  {
    url: '/programs/agentic-ai-instance-capacity/',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  // Solutions pages
  {
    url: '/solutions/logistics-supply-chain/',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    url: '/solutions/ai-agent-context/',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    url: '/solutions/fintech/',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  // Regional pages
  { url: '/latam/', priority: 0.8, changeFrequency: 'monthly' },
  // Campaign / program pages
  // { url: '/tidb-cloud-startup-program/', priority: 0.6, changeFrequency: 'monthly' },
  // { url: '/open-source-heroes/', priority: 0.6, changeFrequency: 'monthly' },
]

const APP_DIR = path.join(process.cwd(), 'src/app')

/**
 * Files that make up the page at `url`: the files directly in its route folder
 * plus private `_folders` (e.g. `_components`). Child route folders are
 * excluded, so `/developers/` doesn't pick up `/developers/learn/` edits.
 */
function pageFiles(url: string): string[] {
  const dir = path.join(APP_DIR, url)
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() || (e.isDirectory() && e.name.startsWith('_')))
    .map((e) => path.relative(process.cwd(), path.join(dir, e.name)))
}

function shallowBoundaries(): Set<string> {
  try {
    const file = execFileSync('git', ['rev-parse', '--git-path', 'shallow'], {
      encoding: 'utf8',
    }).trim()
    return new Set(existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean) : [])
  } catch {
    return new Set()
  }
}

/**
 * Last time the page's own files changed, taken from git. `--first-parent`
 * reports the merge into the deployed branch rather than the original commit,
 * so the date is when the change went live.
 *
 * Returns undefined when the date can't be known — no git, or the last change
 * is older than a shallow clone's history (the boundary commit would claim to
 * touch every file). An omitted <lastmod> is better than a wrong one: Google
 * stops trusting a sitemap's lastmod once it sees inaccurate values.
 */
function lastModified(url: string, shallow: Set<string>): string | undefined {
  const files = pageFiles(url)
  if (files.length === 0) return undefined
  try {
    const [sha, date] = execFileSync(
      'git',
      ['log', '-1', '--first-parent', '--format=%H %cI', '--', ...files],
      { encoding: 'utf8' }
    )
      .trim()
      .split(' ')
    if (!sha || shallow.has(sha)) return undefined
    return date
  } catch {
    return undefined
  }
}

export function GET() {
  const shallow = shallowBoundaries()

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(({ url, priority, changeFrequency }) => {
    const lastmod = lastModified(url, shallow)
    return `  <url>
    <loc>${BASE_URL}${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
