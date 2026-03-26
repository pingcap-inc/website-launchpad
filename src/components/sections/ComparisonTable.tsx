import { SectionHeader } from '@/components/ui/SectionHeader'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export interface ComparisonRow {
  feature: string
  ours: string | boolean
  theirs: string | boolean
}

export interface ComparisonTableProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ourProduct: string
  competitor: string
  rows: ComparisonRow[]
  cta?: { text: string; href: string }
  className?: string
}

function renderCell(val: string | boolean, highlight = false) {
  if (typeof val === 'boolean') {
    return val ? (
      <span className={`font-bold ${highlight ? 'text-brand-teal-medium' : 'text-carbon-400'}`}>
        ✓
      </span>
    ) : (
      <span className="text-carbon-700">✗</span>
    )
  }
  return (
    <span className={highlight ? 'font-medium text-text-inverse' : 'text-text-secondary'}>
      {val}
    </span>
  )
}

export function ComparisonTable({
  eyebrow,
  title,
  subtitle,
  ourProduct,
  competitor,
  rows,
  cta,
  className,
}: ComparisonTableProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-container px-container">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />

        <div className="overflow-x-auto">
          <table className="w-full text-body-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border-primary">
                <th className="text-left py-3 pr-6 font-bold text-text-secondary w-1/2">Feature</th>
                <th className="text-center py-3 px-4 font-bold text-brand-red-primary">
                  {ourProduct}
                </th>
                <th className="text-center py-3 px-4 font-bold text-text-secondary">
                  {competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border-primary hover:bg-bg-surface transition-colors"
                >
                  <td className="py-3 pr-6 text-text-inverse">{row.feature}</td>
                  <td className="py-3 px-4 text-center">{renderCell(row.ours, true)}</td>
                  <td className="py-3 px-4 text-center">{renderCell(row.theirs, false)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cta && (
          <div className="mt-8 text-center">
            <PrimaryButton href={cta.href}>{cta.text}</PrimaryButton>
          </div>
        )}
      </div>
    </section>
  )
}
