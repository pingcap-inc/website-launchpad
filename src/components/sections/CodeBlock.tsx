import { cn } from '@/lib/utils'

export interface CodeBlockProps {
  title?: string
  filename?: string
  language?: string
  code: string
  className?: string
}

export function CodeBlock({ title, filename, language, code, className }: CodeBlockProps) {
  const hasMeta = title || filename || language
  return (
    <div className={cn('mx-auto', className)}>
      <div className="rounded-xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        {hasMeta ? (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3">
            <div className="flex flex-wrap items-center gap-3">
              {title ? (
                <span className="text-sm font-semibold text-text-inverse">{title}</span>
              ) : null}
              {filename ? (
                <span className="rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-carbon-200">
                  {filename}
                </span>
              ) : null}
            </div>
            {language ? (
              <span className="rounded-full bg-brand-blue-light/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue-light">
                {language}
              </span>
            ) : null}
          </div>
        ) : null}
        <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed text-carbon-200">
          <code className={language ? `language-${language}` : undefined}>{code}</code>
        </pre>
      </div>
    </div>
  )
}
