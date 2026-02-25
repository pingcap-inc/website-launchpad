interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Preset schemas ───────────────────────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PingCAP',
  url: 'https://www.pingcap.com',
  logo: 'https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg',
  sameAs: [
    'https://twitter.com/PingCAP',
    'https://github.com/pingcap',
    'https://www.linkedin.com/company/pingcap',
  ],
}

export function softwareSchema(overrides?: Partial<typeof _softwareSchemaBase>) {
  return { ..._softwareSchemaBase, ...overrides }
}

const _softwareSchemaBase = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TiDB',
  applicationCategory: 'DatabaseApplication',
  operatingSystem: 'Linux, macOS, Windows',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Open-source distributed SQL database supporting HTAP workloads.',
  url: 'https://www.pingcap.com/tidb/',
}
