'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DeveloperResourceCard } from './DeveloperResourceCard'

interface LabCard {
  title: string
  href: string
}

interface Framework {
  id: string
  label: string
  image: { src: string; alt: string; width?: number; height?: number }
  href: string
}

const labs: LabCard[] = [
  { title: 'Introduction to TiDB Cloud Starter', href: 'https://labs.tidb.io/labs/demo_203' },
  { title: 'Working with TiDB Cloud Using JDBC', href: 'https://labs.tidb.io/labs/demo_701' },
  {
    title: 'Working with TiDB Cloud Using mysql-connector-python',
    href: 'https://labs.tidb.io/labs/demo_405',
  },
]

const frameworks: Framework[] = [
  {
    id: 'jdbc',
    label: 'JDBC',
    image: { src: '/images/developers/jdbc.svg', alt: 'JDBC logo', width: 90, height: 90 },
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-java-jdbc/',
  },
  {
    id: 'hibernate',
    label: 'Hibernate',
    image: {
      src: '/images/developers/hibernate.svg',
      alt: 'Hibernate logo',
      width: 69,
      height: 52,
    },
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-java-hibernate/',
  },
  {
    id: 'MyBatis',
    label: 'MyBatis',
    image: { src: '/images/developers/mybatis.svg', alt: 'MyBatis logo', width: 67, height: 63 },
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-java-mybatis/',
  },
  {
    id: 'Spring-Boot',
    label: 'Spring Boot',
    image: {
      src: '/images/developers/spring-boot.svg',
      alt: 'Spring Boot logo',
      width: 56,
      height: 51,
    },
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-java-spring-boot/',
  },
  {
    id: 'go',
    label: 'Go-MySQL-Driver',
    image: { src: '/images/developers/go.svg', alt: 'Go logo', width: 81, height: 65 },
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-golang-sql-driver/',
  },
  {
    id: 'python',
    label: 'MySQL Connector/Python',
    image: { src: '/images/developers/python.svg', alt: 'Python logo', width: 50, height: 50 },
    href: 'https://docs.pingcap.com/tidb/stable/dev-guide-sample-application-python-mysql-connector/#connect-to-tidb-with-mysql-connectorpython',
  },
]

interface FrameworkSelectorProps {
  highlightClassName?: string
}

export function FrameworkSelector({
  highlightClassName = 'text-brand-red-primary',
}: FrameworkSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>('jdbc')
  const hovered = hoveredId ? frameworks.find((f) => f.id === hoveredId) : null
  const displayLabel = hovered?.label

  return (
    <div>
      {/* Subtitle */}
      <h3 className="text-h3-xl text-text-inverse mb-6">
        Connect to TiDB with{' '}
        <span className={cn(highlightClassName, 'font-semibold')}>{displayLabel}</span>
      </h3>

      {/* Framework icon row */}
      <div className="flex gap-3 mb-8">
        {frameworks.map((fw) => (
          <a
            key={fw.id}
            onMouseEnter={() => setHoveredId(fw.id)}
            className={cn(
              'w-[90px] h-[90px] flex items-center justify-center transition-colors duration-150 ease-in-out',
              hoveredId === fw.id ? 'bg-bg-inverse' : 'bg-carbon-800 hover:bg-bg-inverse'
            )}
            aria-label={fw.label}
            title={fw.label}
            href={fw.href}
          >
            <Image
              src={fw.image.src}
              alt={fw.image.alt}
              width={fw.image.width}
              height={fw.image.height}
              className="object-contain"
            />
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
        {labs.map((lab) => (
          <DeveloperResourceCard
            key={lab.title}
            item={lab}
            tagText="Hands-on Lab"
            tagClassName="bg-brand-blue-medium"
          />
        ))}
      </div>
    </div>
  )
}
