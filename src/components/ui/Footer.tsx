import { NewsletterForm } from './NewsletterForm'
import { LanguageSwitcher } from './LanguageSwitcher'

// ─── Nav data ─────────────────────────────────────────────────────────────────

const footerNav = [
  {
    title: 'Product',
    links: [
      { label: 'Product Overview', href: '/tidb/' },
      { label: 'TiDB Cloud', href: '/tidb/cloud/' },
      { label: 'TiDB Self-Managed', href: '/tidb/self-managed/' },
      { label: 'Pricing', href: '/tidb/pricing/' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Integrations', href: '/tidb/integrations/' },
      { label: 'TiKV', href: '/tikv/' },
      { label: 'TiSpark', href: '/tispark/' },
      { label: 'OSS Insight', href: 'https://ossinsight.io/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog/' },
      { label: 'Articles', href: '/resources/articles/' },
      { label: 'Events & Webinars', href: '/events/' },
      { label: 'TiDB SCaiLE', href: '/tidb-scaile/' },
      { label: 'Docs', href: 'https://docs.pingcap.com/' },
      { label: 'Developer Guide', href: '/developer/' },
      { label: 'FAQs', href: '/faqs/' },
      { label: 'Support', href: '/support/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'News', href: '/news/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Contact Us', href: '/contact-us/' },
      { label: 'Partners', href: '/partners/' },
      { label: 'Trust Hub', href: '/trust-hub/' },
      { label: 'Security', href: '/security/' },
      { label: 'Release Support', href: '/release-support/' },
      { label: 'Brand Guidelines', href: '/brand/' },
    ],
  },
]

// ─── Social icons (inline SVG for brand accuracy) ─────────────────────────────

const socialLinks: { label: string; href: string; path: string }[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/pingcap',
    path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
  {
    label: 'X',
    href: 'https://x.com/PingCAP',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pingcap/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/pingcap2015/',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Slack',
    href: 'https://slack.tidb.io/',
    path: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z',
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/DQZ2dy3cuc',
    path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.019.011.037.024.049a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-bg-inverse">
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-20">

        {/* Language switcher — mobile only, first row */}
        <div className="lg:hidden mb-8">
          <LanguageSwitcher />
        </div>

        {/* Main nav grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(4,1fr)_minmax(260px,1.4fr)] gap-10 lg:gap-8">

          {/* Product column — rendered separately to host desktop language switcher */}
          <div className="space-y-4">
            <p className="font-mono text-eyebrow text-carbon-400">{footerNav[0].title}</p>
            <ul className="space-y-3">
              {footerNav[0].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-md text-text-inverse hover:text-carbon-400 transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Language switcher — desktop only, under Product */}
            <div className="hidden lg:flex pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Remaining nav columns */}
          {footerNav.slice(1).map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="font-mono text-eyebrow text-carbon-400">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-md text-text-inverse hover:text-carbon-400 transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay Connected */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <p className="font-mono text-eyebrow text-carbon-400">Stay Connected</p>
            <NewsletterForm />
            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-carbon-700 flex items-center justify-center text-text-inverse hover:border-carbon-400 transition-colors duration-150"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={14}
                    height={14}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6">
          <p className="text-body-sm font-mono text-carbon-400">
            © 2026 PingCAP. All Rights Reserved.{' '}
            <span className="mx-1 text-carbon-700">/</span>
            <a href="/privacy-policy/" className="hover:text-text-inverse transition-colors duration-150">
              Privacy Policy
            </a>
            <span className="mx-1 text-carbon-700">/</span>
            <a href="/legal/" className="hover:text-text-inverse transition-colors duration-150">
              Legal
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
