/**
 * Curated CTA link library — verified URLs that AI should use for CTAs.
 * Extensible by the team: just add new entries to the map.
 */
export const SAFE_CTA_LINKS: Record<string, { href: string; label: string }> = {
  'free-trial': { href: 'https://tidbcloud.com/free-trial/', label: 'Start for Free' },
  'contact-us': { href: 'https://www.pingcap.com/contact-us/', label: 'Contact Us' },
  'tidb-cloud': { href: 'https://www.pingcap.com/tidb/cloud/', label: 'Learn More' },
  demo: { href: 'https://www.pingcap.com/demo/', label: 'View Demo' },
  docs: { href: 'https://docs.pingcap.com/', label: 'Read Docs' },
  github: { href: 'https://github.com/pingcap/tidb', label: 'View on GitHub' },
  community: { href: 'https://slack.tidb.io/', label: 'Join Community' },
}

/** All external domains considered trusted (for non-CTA links). */
export const TRUSTED_DOMAINS = new Set([
  'www.pingcap.com',
  'pingcap.com',
  'docs.pingcap.com',
  'static.pingcap.com',
  'tidbcloud.com',
  'ossinsight.io',
  'labs.tidb.io',
  'github.com',
  'slack.tidb.io',
  'discord.gg',
  'twitter.com',
  'linkedin.com',
  'www.linkedin.com',
  'youtube.com',
  'www.youtube.com',
  'pingcap.co.jp',
])
