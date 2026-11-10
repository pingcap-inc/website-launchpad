import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Tabs } from '@/components/ui/Tabs'

export interface CompareColumn {
  /** Column heading, e.g. "Problems" / "TiDB Value" or "MySQL" / "TiDB". */
  heading: string
  /** "label" renders a mono eyebrow; "h4" renders an H4 heading. */
  headingStyle: 'label' | 'h4'
  tone: 'red' | 'blue' | 'teal'
  image: string
  imageAlt: string
  items: string[]
}

export interface CompareTab {
  id: string
  label: string
  columns: [CompareColumn, CompareColumn]
}

const toneBorder = {
  red: 'border-brand-red-medium',
  blue: 'border-brand-blue-medium',
  teal: 'border-brand-teal-medium',
}

/**
 * Tabbed two-column comparison (problem vs. value). Tab labels render as H3s
 * (via <Tabs>), matching the live page. The wrapper scrolls the tab row
 * horizontally on narrow screens instead of widening the page.
 */
export function CompareTabs({ tabs }: { tabs: CompareTab[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <Tabs
        autoSwitch={true}
        autoSwitchInterval={6000}
        tabs={tabs.map((tab) => ({
          id: tab.id,
          label: tab.label,
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {tab.columns.map((col) => (
                  <div
                    key={col.heading}
                    className={cn(
                      'flex flex-col gap-4 border-t-4 bg-bg-gray/5 p-8',
                      toneBorder[col.tone]
                    )}
                  >
                    <Image
                      src={col.image}
                      alt={col.imageAlt}
                      width={320}
                      height={200}
                      className="h-auto w-full max-w-[320px]"
                    />
                    {col.headingStyle === 'h4' ? (
                      <h4 className="text-h3-sm font-bold m-0">{col.heading}</h4>
                    ) : (
                      <p className="font-mono text-eyebrow text-secondary m-0">{col.heading}</p>
                    )}
                    <ul className="list-disc space-y-2 pl-5 text-body-md text-secondary">
                      {col.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ),
        }))}
      />
    </div>
  )
}
