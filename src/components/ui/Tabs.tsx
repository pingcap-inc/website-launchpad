'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultActiveTab?: string
  className?: string
  autoSwitch?: boolean
  autoSwitchInterval?: number
  onTabChange?: (tabId: string) => void
}

export function Tabs({
  tabs,
  defaultActiveTab = tabs[0]?.id,
  className,
  autoSwitch = false,
  autoSwitchInterval = 6000,
  onTabChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hoverRef = useRef<boolean>(false)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
    resetAutoSwitch()
  }

  const handleTabHover = (tabId: string) => {
    if (!autoSwitch) return
    if (tabId !== activeTab) {
      setActiveTab(tabId)
      onTabChange?.(tabId)
      resetAutoSwitch()
      hoverRef.current = true
    }
  }

  const resetAutoSwitch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (autoSwitch) {
      intervalRef.current = setInterval(() => {
        if (!hoverRef.current) {
          setActiveTab((prev) => {
            const currentIndex = tabs.findIndex((tab) => tab.id === prev)
            const nextIndex = (currentIndex + 1) % tabs.length
            const nextTabId = tabs[nextIndex].id
            onTabChange?.(nextTabId)
            return nextTabId
          })
        }
      }, autoSwitchInterval)
    }
  }

  useEffect(() => {
    resetAutoSwitch()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoSwitch, autoSwitchInterval, tabs])

  const handleMouseLeave = () => {
    hoverRef.current = false
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-8" onMouseLeave={handleMouseLeave}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            onMouseEnter={() => handleTabHover(tab.id)}
            className="relative flex-1 text-left pb-4"
          >
            <h3
              className={cn(
                'text-h3-lg transition-colors duration-200',
                activeTab === tab.id ? 'text-white' : 'text-carbon-900 hover:text-white'
              )}
            >
              {tab.label}
            </h3>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-carbon-900" />
            {activeTab === tab.id && (
              <span
                className={cn(
                  'pointer-events-none absolute bottom-0 left-0 h-[2px] bg-white',
                  autoSwitch ? 'animate-tab-progress' : 'w-full'
                )}
                style={autoSwitch ? { animationDuration: `${autoSwitchInterval}ms` } : undefined}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'transition-opacity duration-300',
              activeTab === tab.id ? 'opacity-100 block' : 'opacity-0 hidden'
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
