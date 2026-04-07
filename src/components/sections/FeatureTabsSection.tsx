'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Tabs } from '@/components/ui/Tabs'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import type { ImageRef } from '@/lib/dsl-schema'

export interface FeatureTabItem {
  id: string
  label: string
  description?: string
  bullets?: string[]
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  /** Optional custom left-side content override */
  content?: React.ReactNode
  image: { image: ImageRef; alt?: string; width?: number; height?: number }
}

interface FeatureTabsSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  tabs: FeatureTabItem[]
  autoSwitch?: boolean
  autoSwitchInterval?: number
  className?: string
}

export function FeatureTabsSection({
  eyebrow,
  title,
  subtitle,
  tabs,
  autoSwitch = true,
  autoSwitchInterval = 6000,
  className,
}: FeatureTabsSectionProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Tabs
        tabs={tabs.map((tab) => ({
          id: tab.id,
          label: tab.label,
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                {tab.content ?? (
                  <>
                    {tab.description && (
                      <p className="text-body-xl text-current leading-relaxed mb-6">
                        {tab.description}
                      </p>
                    )}
                    {tab.bullets && tab.bullets.length > 0 && (
                      <ul className="space-y-2 text-body-md text-secondary mb-6">
                        {tab.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 rounded-full bg-text-secondary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {(tab.primaryCta || tab.secondaryCta) && (
                      <div className="flex flex-wrap gap-4">
                        {tab.primaryCta && (
                          <PrimaryButton href={tab.primaryCta.href}>
                            {tab.primaryCta.text}
                          </PrimaryButton>
                        )}
                        {tab.secondaryCta && (
                          <SecondaryButton href={tab.secondaryCta.href}>
                            {tab.secondaryCta.text}
                          </SecondaryButton>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="lg:col-span-7">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={tab.image.image.url}
                    alt={tab.image.alt ?? ''}
                    width={tab.image.width ?? 1200}
                    height={tab.image.height ?? 800}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ),
        }))}
        autoSwitch={autoSwitch}
        autoSwitchInterval={autoSwitchInterval}
      />
    </div>
  )
}
