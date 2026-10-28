interface JsonLdProps {
  data: Record<string, unknown>
}

/**
 * JSON.stringify output is inserted raw into a <script>, so a string value
 * containing `</script>` would end the element. Escape the characters that can
 * break out (or start an HTML comment) as JSON unicode escapes — the parsed
 * JSON-LD is unchanged.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
