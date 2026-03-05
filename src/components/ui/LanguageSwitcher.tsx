import { ChevronDown, Globe } from 'lucide-react'

export function LanguageSwitcher() {
  return (
    <div className="relative mt-16 group">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        className="flex items-center gap-2 text-body-md font-normal text-text-inverse transition-colors duration-150"
      >
        <Globe size={16} className="shrink-0" />
        <span>English</span>
        <ChevronDown
          size={13}
          className="text-text-inverse transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </button>

      <div className="absolute top-full left-0 pt-2 min-w-[120px] z-10 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
        <div className="bg-[#0a0a0a] border border-carbon-800">
          <a
            href="https://pingcap.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-3 py-2 text-body-sm text-carbon-400 hover:text-text-inverse transition-colors duration-150"
          >
            日本語
          </a>
        </div>
      </div>
    </div>
  )
}
