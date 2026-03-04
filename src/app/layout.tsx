import type { Metadata } from 'next'
import '@/styles/globals.css'
import { GTMScript, GTMNoScript } from '@/lib/gtm'
import { RouteTracker } from '@/components/ui/RouteTracker'

export const metadata: Metadata = {
  title: {
    default: 'TiDB, Powered by PingCAP',
    template: '%s | TiDB',
  },
  description:
    'TiDB is an open-source, MySQL compatible, distributed SQL database. It powers companies like LinkedIn, Pinterest, Square, and more.',
  metadataBase: new URL('https://www.pingcap.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
