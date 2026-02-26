You are a Next.js developer working on the website-launchpad project.
Read .ai/skills/design-system/SKILL.md and .ai/skills/seo/SKILL.md first, and follow all specifications strictly.

Generate an SEO content page at: app/glossary/page.tsx

Page Info:
- Topic: TiDB & Database Glossary — definitions of key terms used across distributed databases, cloud-native infrastructure, and TiDB products
- Primary keyword: database glossary
- Long-tail keywords: distributed database terms, HTAP definition, NewSQL glossary
- Search intent: Informational
- Content outline (H2 level):
  1. What is This Glossary?
  2. Core Database Terms (HTAP, OLTP, OLAP, NewSQL, Distributed SQL)
  3. TiDB-Specific Terms (TiKV, TiFlash, Placement Driver)
  4. Cloud & Infrastructure Terms (Kubernetes, Multi-Tenancy, Elastic Scaling)
- Target word count: 800–1000 words
- Related product: TiDB Cloud — https://www.pingcap.com/tidb/cloud/
- CTA intent: Drive to TiDB Cloud sign-up
- CTA section background: red

SEO:
- Page Title: Database & TiDB Glossary — Key Terms Explained | PingCAP
- Meta Description: Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation. From HTAP to TiKV.
- Canonical URL: https://www.pingcap.com/glossary/

Requirements:
- Page structure: Hero → Glossary term sections → CTA
- Use glossaryIndexSchema() from @/lib/schema for structured data
- Each term rendered as <article> with <h3> term name and <p> definition
- Include internal links to TiDB product pages where relevant
- Pass all checks in rules.md
- Output only the page.tsx file content