import fs from 'node:fs/promises'
import path from 'node:path'
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
import { load } from 'cheerio'

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL

const SCORES_DIR = path.join(process.cwd(), 'reports')
const JSON_PATH = path.join(SCORES_DIR, 'page-scorecards.json')
const MD_PATH = path.join(SCORES_DIR, 'page-scorecards.md')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const scoreClamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

const scoreRange = (len, min, max) => {
  if (len <= 0) return 0
  if (len >= min && len <= max) return 100
  const under = len < min ? (len / min) * 100 : 100 - ((len - max) / max) * 100
  return scoreClamp(under)
}

const titleCaseWord = (word) => /^[A-Z][a-z0-9'’\-]*$/.test(word)
const isTitleCase = (text) => {
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length === 0) return false
  return words.every(titleCaseWord)
}

const isSentenceCase = (text) =>
  /^[A-Z][^A-Z]*$/.test(text.trim()) && !isTitleCase(text)

const casingScore = (labels) => {
  if (labels.length < 2) return 100
  const titleCount = labels.filter(isTitleCase).length
  const sentenceCount = labels.filter(isSentenceCase).length
  const max = Math.max(titleCount, sentenceCount)
  const ratio = max / labels.length
  if (ratio >= 0.8) return 100
  if (ratio >= 0.6) return 70
  return 40
}

const headingStructureScore = ($) => {
  const hasH2 = $('h2').length > 0
  const hasH3 = $('h3').length > 0
  const hasH4 = $('h4').length > 0
  if (hasH4 && !hasH3) return 40
  if (hasH3 && !hasH2) return 60
  return 100
}

const internalLinksScore = ($) => {
  const links = $('a[href]')
    .map((_, el) => $(el).attr('href'))
    .get()
    .filter((href) => href && href.startsWith('/') && !href.startsWith('//'))
  if (links.length >= 2) return 100
  if (links.length === 1) return 70
  return 40
}

const altCoverageScore = ($) => {
  const images = $('img')
  const total = images.length
  if (total === 0) return 100
  const withAlt = images
    .map((_, el) => ($(el).attr('alt') ?? '').trim())
    .get()
    .filter((alt) => alt.length > 0).length
  return scoreClamp((withAlt / total) * 100)
}

const h1Score = ($) => {
  const count = $('h1').length
  if (count === 1) return 100
  if (count === 0) return 40
  return 60
}

const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)
    try {
      const res = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(timeout)
      return res
    } catch (err) {
      clearTimeout(timeout)
      if (attempt === retries) throw err
      await sleep(500 * attempt)
    }
  }
  throw new Error('Failed to fetch')
}

const getPageList = async (baseUrl) => {
  const res = await fetchWithRetry(
    `${baseUrl.replace(/\/$/, '')}/api/pages?includeTitle=0&includeUpdated=0`
  )
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Failed to load pages list')
  }
  const data = await res.json()
  return data.pages ?? []
}

const runLighthouse = async (url, timeoutMs = 60_000) => {
  const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] })
  try {
    const runner = lighthouse(url, {
      port: chrome.port,
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    })
    const result = await Promise.race([
      runner,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Lighthouse timeout after ${timeoutMs}ms`)), timeoutMs)
      ),
    ])
    const categories = result.lhr.categories
    return {
      performance: (categories.performance?.score ?? 0) * 100,
      accessibility: (categories.accessibility?.score ?? 0) * 100,
      bestPractices: (categories['best-practices']?.score ?? 0) * 100,
      seo: (categories.seo?.score ?? 0) * 100,
    }
  } finally {
    await chrome.kill()
  }
}

const fetchDom = async (url) => {
  const res = await fetchWithRetry(url)
  if (!res.ok) throw new Error(`Failed to fetch HTML for ${url} (status ${res.status})`)
  const html = await res.text()
  return load(html)
}

const computeScores = async (baseUrl, slug, timeoutMs) => {
  const url = `${baseUrl.replace(/\/$/, '')}/${slug}/`
  const [lighthouseScores, $] = await Promise.all([
    runLighthouse(url, timeoutMs),
    fetchDom(url),
  ])

  const metaTitle = $('title').text().trim()
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() ?? ''

  const ux =
    lighthouseScores.performance * 0.4 +
    lighthouseScores.accessibility * 0.3 +
    lighthouseScores.bestPractices * 0.3

  const seo =
    lighthouseScores.seo * 0.5 +
    scoreRange(metaTitle.length, 50, 60) * 0.1 +
    scoreRange(metaDescription.length, 120, 160) * 0.1 +
    h1Score($) * 0.1 +
    internalLinksScore($) * 0.1 +
    headingStructureScore($) * 0.1

  const ctaLabels = $('button, a[role="button"], a[class*="btn"], a[class*="button"], a[class*="cta"]')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((text) => text.length >= 2 && text.length <= 40)

  const consistency =
    h1Score($) * 0.2 +
    headingStructureScore($) * 0.2 +
    altCoverageScore($) * 0.2 +
    casingScore(ctaLabels) * 0.2 +
    internalLinksScore($) * 0.2

  const overall = (ux + seo + consistency) / 3

  return {
    slug,
    url,
    ux: scoreClamp(ux),
    seo: scoreClamp(seo),
    consistency: scoreClamp(consistency),
    overall: scoreClamp(overall),
    lighthouse: lighthouseScores,
    checks: {
      metaTitleLength: metaTitle.length,
      metaDescriptionLength: metaDescription.length,
      h1Count: $('h1').length,
      internalLinks: $('a[href]')
        .map((_, el) => $(el).attr('href'))
        .get()
        .filter((href) => href && href.startsWith('/') && !href.startsWith('//')).length,
    },
  }
}

const run = async () => {
  const args = process.argv.slice(2)
  let baseUrl = DEFAULT_BASE_URL
  let slugFilter = null
  let timeoutMs = 60_000
  for (const arg of args) {
    if (arg.startsWith('--slug=')) slugFilter = arg.slice('--slug='.length)
    else if (arg.startsWith('--timeout=')) timeoutMs = Number(arg.slice('--timeout='.length)) || 60_000
    else if (!arg.startsWith('--')) baseUrl = arg
  }
  if (!baseUrl) {
    throw new Error('Missing base URL. Set NEXT_PUBLIC_SITE_BASE_URL or pass as first arg.')
  }

  const pages = await getPageList(baseUrl)
  const slugs = pages
    .map((page) => page.slug)
    .filter((slug) => (slugFilter ? slug === slugFilter : true))
  if (slugFilter && slugs.length === 0) {
    throw new Error(`Slug not found in pages list: ${slugFilter}`)
  }
  const results = []

  for (const slug of slugs) {
    // Small delay to avoid hammering the server
    await sleep(250)
    try {
      const score = await computeScores(baseUrl, slug, timeoutMs)
      results.push(score)
    } catch (err) {
      results.push({
        slug,
        url: `${baseUrl.replace(/\/$/, '')}/${slug}/`,
        ux: 0,
        seo: 0,
        consistency: 0,
        overall: 0,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  await fs.mkdir(SCORES_DIR, { recursive: true })
  await fs.writeFile(JSON_PATH, JSON.stringify({ baseUrl, results }, null, 2), 'utf-8')

  const lines = [
    `# Page Scorecards`,
    ``,
    `Base URL: ${baseUrl}`,
    ``,
    `| Page | UX | SEO | Consistency | Overall | Error |`,
    `| --- | --- | --- | --- | --- | --- |`,
    ...results.map((r) => {
      if (r.error) {
        return `| /${r.slug}/ | — | — | — | — | ${r.error.replace(/\|/g, '\\|')} |`
      }
      return `| /${r.slug}/ | ${r.ux} | ${r.seo} | ${r.consistency} | ${r.overall} |`
    }),
    ``,
  ]

  await fs.writeFile(MD_PATH, lines.join('\n'), 'utf-8')
  // eslint-disable-next-line no-console
  console.log(`Saved ${results.length} scorecards to ${JSON_PATH} and ${MD_PATH}`)
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
