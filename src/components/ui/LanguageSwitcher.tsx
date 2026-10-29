import { ChevronDown, Globe } from 'lucide-react'
import { DEFAULT_LANGUAGE, SITE_LANGUAGES, findLanguage } from '@/lib/languages'
import { externalLinkProps } from '@/lib/links'
import { cn } from '@/lib/utils'

/**
 * Footer language selector. Same languages as the header selector, with the
 * current one named on the button and set in bold in the list. The /latam page
 * hides it, so here the current language is always the default.
 */
export function LanguageSwitcher() {
  const current = findLanguage(DEFAULT_LANGUAGE)

  return (
    <div className="relative mt-16 group">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        className="flex items-center gap-2 text-body-md font-normal text-text-inverse transition-colors duration-150"
      >
        <Globe size={16} className="shrink-0" />
        <span>{current.label}</span>
        <ChevronDown
          size={13}
          className="text-text-inverse transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </button>

      <div className="absolute top-full left-0 pt-2 min-w-[120px] z-10 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
        <div className="bg-[#0a0a0a] border border-carbon-800">
          {SITE_LANGUAGES.map((item) => {
            const isCurrent = item.code === current.code
            return (
              <a
                key={item.code}
                href={item.href}
                lang={item.code}
                hrefLang={item.code}
                aria-current={isCurrent ? 'true' : undefined}
                {...externalLinkProps(item.href)}
                className={cn(
                  'block w-full text-left px-3 py-2 text-body-sm transition-colors duration-150 hover:text-text-inverse',
                  isCurrent ? 'font-semibold text-text-inverse' : 'text-carbon-400'
                )}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
