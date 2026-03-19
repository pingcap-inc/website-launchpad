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
    // Company pages
    // { url: '/about-us/', priority: 0.7, changeFrequency: 'monthly' },
    // Campaign / program pages
    // { url: '/tidb-cloud-startup-program/', priority: 0.6, changeFrequency: 'monthly' },
    // { url: '/open-source-heroes/', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/tidb-cloud/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/tidb-cloud-startup-program/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/tidb-test/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/agentic-ai/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/ai-test/', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/search-retrieval-test/', priority: 0.7, changeFrequency: 'monthly' },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
