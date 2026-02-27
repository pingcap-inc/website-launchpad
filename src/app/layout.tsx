import type { Metadata } from 'next'
import '@/styles/globals.css'
import { GTMScript, GTMNoScript } from '@/lib/gtm'
import { RouteTracker } from '@/components/ui/RouteTracker'

export const metadata: Metadata = {
  title: {
    default: 'TiDB — The Distributed SQL Database',
    template: '%s — TiDB',
  },
  description: 'TiDB is an open-source distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP).',
  metadataBase: new URL('https://www.pingcap.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GTMScript />
        <link rel="preconnect" href="https://static.pingcap.com" />
        <link rel="dns-prefetch" href="https://static.pingcap.com" />
        <link rel="preconnect" href="https://js.hsforms.net" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />
      </head>
      <body className="font-sans bg-bg-primary text-text-inverse antialiased">
        <GTMNoScript />
        <RouteTracker />
        {children}
      </body>
    </html>
  )
}
