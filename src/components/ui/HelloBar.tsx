import { ArrowUpRightIcon } from './PrimaryButton'

/**
 * Announcement bar mirrored from the WordPress site's `.site-header__hello-bar`
 * (the `green` variant: #1AA8A8 background, black text, 16px/24px, 6px block
 * padding). The banner is edited in WordPress, so when it changes there, update
 * the copy and links here to match — nothing syncs it automatically.
 */
const HELLO_BAR = {
  intro: 'New in Public Preview – ',
  separator: ' and ',
  links: [
    { label: 'PostgreSQL Support', href: '/tidb-cloud-starter/' },
    { label: 'TiDB Cloud Filesystem', href: '/tidb/tidb-cloud-filesystem/' },
  ],
}

function HelloBarLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center pr-7 font-medium text-text-primary
                 transition-colors duration-200 ease-in-out hover:text-text-inverse"
    >
      {label}
      {/* Hovering turns the arrow into a white disc with a black glyph pointing
          right, the same treatment the main site gives the banner links. */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 flex h-[22px] w-[22px] -translate-y-1/2 items-center
                   justify-center rounded-full transition duration-200 ease-in-out
                   group-hover:rotate-45 group-hover:bg-bg-inverse group-hover:text-text-primary"
      >
        <ArrowUpRightIcon className="h-3 w-3" />
      </span>
    </a>
  )
}

export function HelloBar() {
  const [first, second] = HELLO_BAR.links

  return (
    <div className="bg-brand-teal-medium py-1.5 text-base leading-6 text-text-primary">
      <div className="contain text-center">
        {HELLO_BAR.intro}
        <HelloBarLink href={first.href} label={first.label} />
        {HELLO_BAR.separator}
        <HelloBarLink href={second.href} label={second.label} />
      </div>
    </div>
  )
}
