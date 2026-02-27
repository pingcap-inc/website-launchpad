import { HubSpotForm } from './HubSpotForm'
import { LanguageSwitcher } from './LanguageSwitcher'
import { pushEvent } from '@/lib/gtm'

const NEWSLETTER_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID ?? 'd74dfb7c-a14a-4f8d-ab28-eba7a00e7900'
const NEWSLETTER_SFDC_CAMPAIGN_ID = process.env.NEXT_PUBLIC_HUBSPOT_SFDC_CAMPAIGN_ID

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

// ─── Social icons (exact SVG sprites from pingcap.com, viewBox 0 0 25 25) ──────

const socialLinks: { label: string; href: string; svgContent: string }[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/pingcap',
    svgContent: '<path d="M12.5223 0.09375C5.63239 0.09375 0.0454102 5.77495 0.0454102 12.7836C0.0454102 18.3904 3.62041 23.1472 8.57785 24.8252C9.2014 24.9427 9.43033 24.5499 9.43033 24.2147C9.43033 23.9121 9.41876 22.9125 9.41339 21.8521C5.94231 22.6198 5.20987 20.3548 5.20987 20.3548C4.64231 18.888 3.82454 18.498 3.82454 18.498C2.69252 17.7104 3.90987 17.7266 3.90987 17.7266C5.16277 17.8159 5.82248 19.0343 5.82248 19.0343C6.93529 20.9743 8.74128 20.4135 9.45326 20.0892C9.56524 19.2692 9.88859 18.709 10.2454 18.3923C7.47413 18.0714 4.56091 16.9833 4.56091 12.1208C4.56091 10.7354 5.0483 9.60332 5.84644 8.71463C5.7169 8.3948 5.28983 7.10431 5.96731 5.35635C5.96731 5.35635 7.01504 5.01529 9.39934 6.65713C10.3946 6.37596 11.4619 6.23495 12.5223 6.23012C13.5826 6.23495 14.6508 6.37596 15.6479 6.65713C18.0293 5.01529 19.0756 5.35635 19.0756 5.35635C19.7547 7.10431 19.3274 8.3948 19.1979 8.71463C19.9979 9.60332 20.482 10.7354 20.482 12.1208C20.482 16.9949 17.5632 18.0681 14.7849 18.3822C15.2324 18.776 15.6312 19.5483 15.6312 20.7323C15.6312 22.43 15.6167 23.7966 15.6167 24.2147C15.6167 24.5524 15.8413 24.9481 16.4737 24.8235C21.4285 23.1436 24.9989 18.3885 24.9989 12.7836C24.9989 5.77495 19.4128 0.09375 12.5223 0.09375Z"/>',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/PingCAP',
    svgContent: '<path d="M12.5 0C19.4036 2.57703e-07 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 2.57711e-07 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM11.2598 13.667L5.95898 19.8242H7.15625L11.792 14.4404L15.4941 19.8242H19.5371L14.0391 11.8301L19.0947 5.95801H17.8965L13.5078 11.0566L10.002 5.95801H5.95898L11.2598 13.667ZM12.877 11.7891L13.4141 12.5566L17.8975 18.9648H16.0576L12.3984 13.7354L11.8613 12.9678L7.58789 6.85938H9.42773L12.877 11.7891Z"/>',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/pingcap',
    svgContent: '<path d="M12.5 0C19.4036 2.57703e-07 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 2.57711e-07 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM5.89648 10.3525V18.8643H8.72949V10.3525H5.89648ZM15.6836 10.1533C14.18 10.1535 13.5068 10.9791 13.1309 11.5586V10.3535H10.2979C10.335 11.1513 10.2981 18.8129 10.2979 18.8643H13.1309V14.1113C13.1309 13.857 13.1488 13.603 13.2236 13.4209C13.4284 12.9127 13.8951 12.3867 14.6777 12.3867C15.7029 12.3869 16.1123 13.167 16.1123 14.3105V18.8643H18.9453V13.9844C18.9453 11.3701 17.5477 10.1533 15.6836 10.1533ZM7.33203 6.25C6.36309 6.25 5.72967 6.88537 5.72949 7.71973C5.72949 8.53695 6.34393 9.19138 7.29492 9.19141H7.31348C8.30099 9.19123 8.91602 8.53686 8.91602 7.71973C8.89747 6.88545 8.3008 6.25012 7.33203 6.25Z"/>',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/pingcap2015',
    svgContent: '<path d="M12.5 0C19.4036 2.57703e-07 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 2.57711e-07 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM13.8301 6.25C11.5748 6.25 10.7812 7.38697 10.7812 9.29883V10.7061H9.375V13.0488H10.7812V19.8496H13.5947V13.0488H15.4717L15.7207 10.7051H13.5947L13.5977 9.53223C13.5977 8.92115 13.6564 8.59375 14.5342 8.59375H15.707V6.25H13.8301Z"/>',
  },
  {
    label: 'Slack',
    href: 'https://slack.tidb.io/invite?team=tidb-community&channel=everyone&ref=pingcap',
    svgContent: '<path d="M12.5 0C19.4036 2.57703e-07 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 2.57711e-07 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM11.0615 13.2637C10.2599 13.2638 9.60551 13.9191 9.60547 14.7207V18.3682C9.60548 19.1698 10.2599 19.8251 11.0615 19.8252C11.8632 19.8252 12.5185 19.1699 12.5186 18.3682V14.7207C12.5185 13.919 11.8632 13.2637 11.0615 13.2637ZM13.2646 16.9111V18.3682C13.2646 19.1698 13.9192 19.825 14.7207 19.8252C15.5224 19.8252 16.1777 19.1699 16.1777 18.3682C16.1777 17.5664 15.5224 16.9111 14.7207 16.9111H13.2646ZM7.41504 13.2637C6.61336 13.2637 5.95804 13.919 5.95801 14.7207C5.95801 15.5224 6.61334 16.1777 7.41504 16.1777C8.21666 16.1776 8.87109 15.5224 8.87109 14.7207V13.2637H7.41504ZM14.7207 13.2637C13.9192 13.2639 13.2647 13.9191 13.2646 14.7207C13.2646 15.5223 13.9192 16.1775 14.7207 16.1777H18.3682C19.1699 16.1777 19.8252 15.5224 19.8252 14.7207C19.8251 13.919 19.1698 13.2637 18.3682 13.2637H14.7207ZM7.41504 9.60547C6.61334 9.60547 5.95801 10.2608 5.95801 11.0625C5.95825 11.864 6.61349 12.5186 7.41504 12.5186H11.0625C11.8639 12.5183 12.5183 11.8639 12.5186 11.0625C12.5186 10.2609 11.864 9.60571 11.0625 9.60547H7.41504ZM14.7207 5.95801C13.9192 5.95823 13.2646 6.61344 13.2646 7.41504V11.0625C13.2649 11.8639 13.9193 12.5183 14.7207 12.5186C15.5223 12.5186 16.1775 11.864 16.1777 11.0625V7.41504C16.1777 6.6133 15.5224 5.95801 14.7207 5.95801ZM18.3682 9.60547C17.5665 9.60547 16.9111 10.2608 16.9111 11.0625V12.5186H18.3682C19.1696 12.5184 19.824 11.864 19.8242 11.0625C19.8242 10.2608 19.1698 9.60559 18.3682 9.60547ZM11.0615 5.95801C10.2599 5.9581 9.60547 6.61336 9.60547 7.41504C9.60566 8.21656 10.26 8.871 11.0615 8.87109H12.5186V7.41504C12.5186 6.6133 11.8632 5.95801 11.0615 5.95801Z"/>',
  },
  {
    label: 'Discord',
    href: 'https://discord.com/invite/vYU9h56kAX',
    svgContent: '<path d="M12.5 0C19.4036 2.57703e-07 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 2.57711e-07 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM14.8438 7.58301C14.7086 7.82467 14.5865 8.07355 14.4775 8.32812C13.4253 8.16956 12.355 8.16958 11.3027 8.32812C11.1937 8.07356 11.0707 7.82471 10.9355 7.58301C9.94712 7.75158 8.98507 8.04872 8.07324 8.46582C6.26288 11.1444 5.77219 13.7561 6.01758 16.3311C7.0777 17.1143 8.26397 17.7105 9.52539 18.0928C9.80947 17.7107 10.0613 17.3051 10.2773 16.8809C9.86707 16.7276 9.47086 16.5381 9.09375 16.3154C9.19293 16.2435 9.29006 16.1696 9.38379 16.0977C10.4811 16.6137 11.679 16.8809 12.8916 16.8809C14.1042 16.8809 15.3021 16.6137 16.3994 16.0977C16.4942 16.175 16.5914 16.2489 16.6895 16.3154C16.3117 16.5384 15.9148 16.7283 15.5039 16.8818C15.7196 17.3059 15.9706 17.7113 16.2549 18.0928C17.5175 17.7121 18.7052 17.1161 19.7656 16.332C20.0535 13.3459 19.2745 10.7576 17.7051 8.46289C16.794 8.04579 15.8317 7.75016 14.8438 7.58301ZM10.5859 11.9736C11.2872 11.9737 11.8479 12.5999 11.8359 13.3633C11.8239 14.1267 11.2848 14.7471 10.5879 14.7471C9.90414 14.747 9.33887 14.1267 9.33887 13.3633C9.33894 12.5999 9.88469 11.9736 10.5859 11.9736ZM15.1953 11.9736C15.8975 11.9738 16.4533 12.6 16.4414 13.3633C16.4294 14.1266 15.8921 14.7469 15.1953 14.7471C14.5104 14.7471 13.9473 14.1267 13.9473 13.3633C13.9473 12.5999 14.493 11.9736 15.1953 11.9736Z"/>',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/PingCAP',
    svgContent: '<path d="M12.5 0C19.4036 2.57703e-07 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 2.57711e-07 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM12.5 7.91699C12.4912 7.91699 8.32992 7.91736 7.29102 8.20312C6.71736 8.36054 6.26568 8.8241 6.1123 9.41309C5.83576 10.473 5.83302 12.6762 5.83301 12.708C5.83301 12.708 5.83374 14.9362 6.1123 16.0039C6.26575 16.5928 6.71744 17.0564 7.29102 17.2139C8.33001 17.4995 12.4912 17.5 12.5 17.5C12.5 17.5 16.669 17.4999 17.709 17.2139C18.2826 17.0564 18.7343 16.5928 18.8877 16.0039C19.1663 14.9362 19.167 12.708 19.167 12.708C19.167 12.6762 19.1643 10.473 18.8877 9.41309C18.7343 8.82409 18.2826 8.36054 17.709 8.20312C16.6691 7.91704 12.5 7.91699 12.5 7.91699Z"/><path d="M11.25 14.9998V10.8331L14.5833 12.9165L11.25 14.9998Z"/>',
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
          <div className="space-y-6">
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
            <div key={col.title} className="space-y-6">
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
          <div className="col-span-2 md:col-span-1 space-y-6 text-center md:text-left">
            <p className="font-mono text-eyebrow text-carbon-400">Stay Connected</p>
            <div className="space-y-3">
              <HubSpotForm
                formId={NEWSLETTER_FORM_ID}
                {...(NEWSLETTER_SFDC_CAMPAIGN_ID ? { sfdcCampaignId: NEWSLETTER_SFDC_CAMPAIGN_ID } : {})}
                className="hs-newsletter"
                loadingText="Loading subscription form..."
              />
              <p className="text-body-sm text-carbon-400 leading-relaxed">
                Sign up to receive periodic updates and feature releases to your email.
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start md:pt-6">
              {socialLinks.map(({ label, href, svgContent }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-text-inverse hover:opacity-75 transition-opacity duration-150"
                >
                  <svg
                    viewBox="0 0 25 25"
                    width={25}
                    height={25}
                    fill="currentColor"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16">
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
