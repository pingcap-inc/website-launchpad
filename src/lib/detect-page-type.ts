import type { PageType } from '@/lib/admin/page-types'

export type ContentPageType = 'marketing' | PageType

/** Detect page type from raw content based on structural patterns. */
export function detectPageType(content: string): ContentPageType {
  const firstHeading = content.match(/^#{1,3}\s+(.+)$/m)?.[1]?.trim() ?? ''
  const hasCompare =
    /\bvs\.?\s+\w|\bversus\b/i.test(firstHeading) || /\bvs\.?\s+\w|\bversus\b/i.test(content)
  // Listicle: numbered headings (e.g. "## 1. TiDB", "### 3) Pinecone")
  if (/^#{1,3}\s+\d+[.)]/m.test(content)) return 'listicle'
  // Compare: versus patterns
  if (hasCompare) return 'compare'
  // Playbook: step-based content
  if (
    /^#{1,3}\s+Step\s+\d+/im.test(content) ||
    /^(#{1,3}\s+)?(Step-by-step|Step by step)\b/im.test(content) ||
    /^(#{1,3}\s+)?Step\s*\d+\s*[:.\-]/im.test(content)
  ) {
    return 'playbook'
  }
  return 'marketing'
}
