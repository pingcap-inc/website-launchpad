import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.pingcap.com'

/**
 * Next.js sitemap for website-launchpad pages.
 *
 * NOTE: Does NOT include the homepage (/) — that is managed by WordPress.
 * This sitemap is registered in WordPress's sitemap_index.xml via functions.php.
 *
 * Add new pages here whenever a new route is created in src/app/.
 * Landing pages with robots: noindex should NOT be added here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

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
    { url: '/compare/tidb-vs-oceanbase/', priority: 0.7, changeFrequency: 'monthly' },
    {
      url: '/compare/tidb-vs-postgresql-2026-comparison-guide/',
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    { url: '/compare/yugabytedb-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/compare/vitess-vs-tidb/', priority: 0.7, changeFrequency: 'monthly' },
    // Playbook pages
    { url: '/playbook/', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/playbook/embed-vector-db-build-rag/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/playbook/escape-mysql-sharding-pain/', priority: 0.7, changeFrequency: 'monthly' },
    {
      url: '/playbook/how-to-cursor-ai-database-integration/',
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    {
      url: '/playbook/noisy-neighbor-multi-tenant-mysql/',
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    { url: '/playbook/vibe-coding-tech-stack-guide/', priority: 0.7, changeFrequency: 'monthly' },
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
    // Campaign / program pages
    // { url: '/tidb-cloud-startup-program/', priority: 0.6, changeFrequency: 'monthly' },
    // { url: '/open-source-heroes/', priority: 0.6, changeFrequency: 'monthly' },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
