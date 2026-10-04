import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
  description: "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud-lake-preview/' },
  openGraph: {
    title: "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
    description: "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI.",
    url: 'https://www.pingcap.com/tidb-cloud-lake-preview/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

const schema = buildPageSchema({
  path: "/tidb-cloud-lake-preview/",
  title: "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
  description: "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "<style>\n@media (min-width:641px) and (max-width:1023px){\n#hero>.contain>.relative.overflow-hidden{min-height:720px}\n#hero>.contain>.relative.overflow-hidden>div>.flex{display:block!important;position:relative;min-height:720px}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:first-child{position:relative;z-index:2;width:74%;max-width:570px;padding-top:80px!important;padding-bottom:80px!important}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child{position:absolute;z-index:1;right:-3%;bottom:20px;width:58%;padding:0!important;justify-content:flex-end}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child::before{content:\"\";position:absolute;inset:-15% -10% -15% -30%;z-index:1;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.95) 28%,rgba(0,0,0,.45) 52%,rgba(0,0,0,0) 78%);pointer-events:none}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child img{position:relative;z-index:0;width:min(54vw,430px);max-width:none}\n#hero h1{font-size:clamp(44px,6.25vw,52px)!important;line-height:1.05!important}\n#hero h1+p{max-width:540px}\n}\n@media (max-width:640px){\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child{position:relative;display:flex;justify-content:center;padding-top:32px!important}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child img{width:min(88vw,360px)}\n}\n@media (min-width:1024px) and (max-width:1279px){#hero h1{font-size:56px!important;line-height:1.05!important}}\n@media (min-width:1024px){#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child img{width:min(36vw,520px);max-width:none}}\n@media (prefers-reduced-motion:reduce){#hero img{animation:none!important}}\n#featureCard-1791047852824 .grid>div:has(>h3:empty){display:none!important}\n#featureCard-1791047852824 p{white-space:pre-line}\n#featureCard-1791047852824 p::first-line{color:#cb8aee}\n#hero p.font-mono.text-eyebrow{display:flex!important;align-items:center;gap:20px;flex-wrap:wrap;font:400 16px/1.5 \"Moderat Mono\",monospace!important;color:#a4a4aa!important}\n#hero p.font-mono.text-eyebrow::after{content:\"Public Preview\";display:inline-flex;align-items:center;min-height:28px;box-sizing:border-box;padding:4px 10px;border:1px solid #8f54ad;border-radius:999px;color:#e1b4f3;background:rgba(164,67,207,.14);font-family:\"Moderat Mono\",monospace;font-size:12px;font-weight:500;line-height:1.5;letter-spacing:.02em}\n</style>Analytics and search.<br><span class=\"text-gradient-violet\">One engine.</span>", path: "/tidb-cloud-lake-preview/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
  "meta": {
    "title": "TiDB Cloud Lake: Cloud-Native Analytics Warehouse",
    "description": "TiDB Cloud Lake is a cloud-native analytics warehouse with elastic warehouses, ANSI SQL, vector search, and object storage for modern analytics and AI.",
    "canonical": "/tidb-cloud-lake-preview/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "image-right",
        "eyebrow": "TiDB Cloud Lake",
        "headline": "<style>\n@media (min-width:641px) and (max-width:1023px){\n#hero>.contain>.relative.overflow-hidden{min-height:720px}\n#hero>.contain>.relative.overflow-hidden>div>.flex{display:block!important;position:relative;min-height:720px}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:first-child{position:relative;z-index:2;width:74%;max-width:570px;padding-top:80px!important;padding-bottom:80px!important}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child{position:absolute;z-index:1;right:-3%;bottom:20px;width:58%;padding:0!important;justify-content:flex-end}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child::before{content:\"\";position:absolute;inset:-15% -10% -15% -30%;z-index:1;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.95) 28%,rgba(0,0,0,.45) 52%,rgba(0,0,0,0) 78%);pointer-events:none}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child img{position:relative;z-index:0;width:min(54vw,430px);max-width:none}\n#hero h1{font-size:clamp(44px,6.25vw,52px)!important;line-height:1.05!important}\n#hero h1+p{max-width:540px}\n}\n@media (max-width:640px){\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child{position:relative;display:flex;justify-content:center;padding-top:32px!important}\n#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child img{width:min(88vw,360px)}\n}\n@media (min-width:1024px) and (max-width:1279px){#hero h1{font-size:56px!important;line-height:1.05!important}}\n@media (min-width:1024px){#hero>.contain>.relative.overflow-hidden>div>.flex>div:last-child img{width:min(36vw,520px);max-width:none}}\n@media (prefers-reduced-motion:reduce){#hero img{animation:none!important}}\n#featureCard-1791047852824 .grid>div:has(>h3:empty){display:none!important}\n#featureCard-1791047852824 p{white-space:pre-line}\n#featureCard-1791047852824 p::first-line{color:#cb8aee}\n#hero p.font-mono.text-eyebrow{display:flex!important;align-items:center;gap:20px;flex-wrap:wrap;font:400 16px/1.5 \"Moderat Mono\",monospace!important;color:#a4a4aa!important}\n#hero p.font-mono.text-eyebrow::after{content:\"Public Preview\";display:inline-flex;align-items:center;min-height:28px;box-sizing:border-box;padding:4px 10px;border:1px solid #8f54ad;border-radius:999px;color:#e1b4f3;background:rgba(164,67,207,.14);font-family:\"Moderat Mono\",monospace;font-size:12px;font-weight:500;line-height:1.5;letter-spacing:.02em}\n</style>Analytics and search.<br><span class=\"text-gradient-violet\">One engine.</span>",
        "subheadline": "TiDB Cloud Lake is a managed analytics warehouse for data and platform teams. Prepare business data, analyze logs and explore agent traces with SQL, full-text search and vector search.",
        "primaryCta": {
          "text": "Get Started",
          "href": "https://tidbcloud.com/signup/?signup_source=pingcap-en-lake"
        },
        "secondaryCta": {
          "text": "View Pricing",
          "href": "https://www.pingcap.com/pricing/"
        },
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/c714e3b8-cloud-lake-hero-animated.webp",
            "alt": "Animated TiDB Cloud Lake analytics, search, and compute illustration",
            "width": 752,
            "height": 722
          },
          "alt": "Animated TiDB Cloud Lake analytics, search, and compute illustration",
          "width": 386,
          "height": 370
        }
      },
      "style": {
        "spacing": "hero"
      }
    },
    {
      "id": "why-tidb-cloud-lake",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Prepare. Search. Scale.",
        "title": "Why TiDB Cloud Lake",
        "subtitle": "",
        "items": [
          {
            "variant": "violet",
            "title": "Prepare Data with SQL",
            "description": "Join operational data with historical records using SQL. Use tasks and streams to automate transformations and build analytical tables for metrics, reporting and ad hoc analysis.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Layers"
          },
          {
            "variant": "blue",
            "title": "Search Across Your Data",
            "description": "Combine SQL, full-text search and vector search over logs, events and nested JSON. Explore application behavior and retrieve context from business records and agent traces.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Search"
          },
          {
            "variant": "teal",
            "title": "Scale Compute on Demand",
            "description": "Keep data in object storage and scale compute independently. Resize warehouses as demand changes, and use auto-suspend to stop idle warehouse compute charges.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Gauge"
          }
        ],
        "columns": 3
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "columns-1791040156339",
      "type": "columns",
      "props": {
        "eyebrow": "How It Works",
        "title": "Connect your data. Build analytics and search.",
        "subtitle": "TiDB Cloud runs your transactional applications. TiDB Cloud Lake brings a copy of that data together with other sources for analytics and search, using separate analytical compute.",
        "titleFullWidth": true,
        "layout": "single",
        "mediaType": "shortcode",
        "shortCode": "<iframe title=\"Animated TiDB Cloud Lake architecture and data flow\" srcdoc=\"&lt;!doctype html&gt;&lt;html&gt;&lt;head&gt;&lt;meta charset=&quot;utf-8&quot;&gt;&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1&quot;&gt;&lt;style&gt;html,body{margin:0;background:#0c0c11;overflow:hidden}.clb-fig{margin:0!important}&lt;/style&gt;&lt;/head&gt;&lt;body&gt;&lt;figure class=&quot;clb-fig&quot; lang=&quot;en&quot; aria-label=&quot;Data sources flow into TiDB Cloud Lake's three-layer architecture and serve BI, applications, data engineering, AI agents, and write-back workflows.&quot;&gt;\n&lt;style&gt;\n.clb-fig{position:relative;margin:48px 0 0;padding:32px;background:#0c0c11;border:1px solid #303037;color:#fff;font-family:Moderat,Arial,sans-serif;font-size:16px;line-height:1.4}\n.clb-fig *{box-sizing:border-box}\n.clb-fig i.clb-nb{font-style:normal;white-space:nowrap}\n.clb-hd{margin:0 0 28px}\n.clb-ey{margin:0;font:400 12px/1.4 'Moderat Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#aaaaba}\n.clb-ey b{font-weight:400;color:#cb8aee;margin-right:.4em}\n.clb-ti{margin:10px 0 0;font-size:24px;line-height:1.25;font-weight:700;color:#9d9dac;text-wrap:pretty}\n.clb-ti em{font-style:normal;color:#fff}\n.clb-grid{--g:104px;display:grid;grid-template-columns:minmax(0,1fr) var(--g) minmax(0,1.9fr) var(--g) minmax(0,1fr);align-items:stretch}\n.clb-col{display:flex;flex-direction:column;min-width:0}\n.clb-src{grid-column:1}.clb-lake{grid-column:3}.clb-out{grid-column:5}\n.clb-k{margin:0 0 12px;font:400 12px/1.4 'Moderat Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#9d9dac;text-align:center}\n.clb-list{flex:1;display:grid;grid-auto-rows:1fr;align-content:stretch;gap:0}\n.clb-n{position:relative;z-index:2}\n.clb-lit{position:absolute;inset:-1px;border:1px solid #6a6a78;pointer-events:none;opacity:0}\n.clb-io{display:grid;grid-template-columns:20px minmax(0,1fr);column-gap:12px;align-items:start;align-content:start;padding:14px 2px 12px;border-top:1px solid #34343e}.clb-io .clb-lit{display:none}\n.clb-io svg,.clb-meta svg,.clb-sto svg{width:20px;height:20px;margin-top:1px;color:#cb8aee}\n.clb-io strong,.clb-meta strong,.clb-st strong{display:block;font-size:16px;line-height:1.3;font-weight:500}\n.clb-io span{display:block;margin-top:4px;font-size:12px;line-height:1.4;color:#aaaaba;text-wrap:balance}\n.clb-lake{position:relative;display:flex;flex-direction:column;padding:34px 20px 20px;border:1px solid #a94fca;background:#1a0f23}\n.clb-lt{position:absolute;left:12px;top:0;transform:translateY(-50%);margin:0;padding:0 8px;font-size:20px;line-height:1.3;font-weight:700;background:linear-gradient(#0c0c11 50%,#1a0f23 50%);white-space:nowrap}\n.clb-meta{align-self:center;max-width:100%;display:grid;grid-template-columns:20px minmax(0,1fr);column-gap:12px;padding:14px 16px;border:1px solid #4a3358;background:#140b1c}\n.clb-meta .clb-lit{border-color:#6c4e82}\n.clb-meta span,.clb-ss{display:block;margin-top:4px;font-size:12px;line-height:1.4;color:#bcb0c7;text-wrap:balance}\n.clb-k2{align-self:center;max-width:46em;text-align:center;margin:22px 0 14px;font:400 12px/1.5 'Moderat Mono',monospace;color:#bcb0c7;letter-spacing:.02em;text-wrap:balance}\n.clb-k2 b{font-weight:400;color:#fff;letter-spacing:.14em}\n.clb-cs{position:relative;height:var(--ch,200px)}\n.clb-scene{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}\n.clb-wh{position:absolute;left:0;top:0;text-align:center;font-size:12px;line-height:1.4;color:#ece4f2;text-wrap:balance}\n.clb-wh span{display:block}\n.clb-wh em{display:block;margin-top:2px;font:400 13px/17px 'Moderat Mono',monospace;font-style:normal;color:#fff}\n.clb-wh em:empty{display:none}\n.clb-sto{align-self:center;max-width:100%;display:grid;grid-template-columns:20px minmax(0,1fr);column-gap:12px;margin-top:16px}\n.clb-st{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:0}\n.clb-chips{display:flex;gap:6px}\n.clb-chip{padding:2px 10px;border:1px solid #4a3358;background:#1e1128;font:400 12px/1.4 'Moderat Mono',monospace;color:#e6def1}\n.clb-w{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:1}\n.clb-c{fill:none;stroke:#9e85b5;stroke-width:1.5}\n.clb-h{visibility:hidden;fill:none}\n@media (max-width:1439px){.clb-grid{--g:88px}.clb-ti{font-size:22px}}\n@media (max-width:1279px){.clb-grid{--g:72px}.clb-io{padding:12px 2px 10px;column-gap:10px}.clb-io strong{font-size:15px}.clb-lake{padding:32px 16px 18px}}\n@media (max-width:1179px){.clb-fig{padding:28px 24px}.clb-grid{grid-template-columns:minmax(0,1fr);row-gap:64px}.clb-src,.clb-lake,.clb-out{grid-column:1}.clb-lake{width:100%;max-width:760px;justify-self:center;padding:34px 24px 22px}.clb-k{text-align:left}.clb-out .clb-k{margin-bottom:44px}.clb-list{grid-auto-rows:auto;grid-template-columns:repeat(5,minmax(0,1fr));gap:0 16px}.clb-io{grid-template-columns:minmax(0,1fr);row-gap:10px}}\n@media screen and (max-width:1179px) and (min-width:700px){.clb-lake{flex-direction:row;flex-wrap:wrap;align-items:center;column-gap:24px}.clb-k2{flex:1 1 220px;text-align:left;margin:0}.clb-cs{flex:1 1 100%;margin-top:22px}.clb-sto{margin:16px auto 0}}\n@media (max-width:999px){.clb-list{grid-template-columns:repeat(2,minmax(0,1fr))}.clb-out .clb-k{margin-bottom:12px}.clb-io{grid-template-columns:20px minmax(0,1fr)}.clb-io:last-child{grid-column:1/-1}}\n@media (max-width:767px){.clb-fig{margin-top:32px;padding:22px 16px}.clb-hd{margin-bottom:28px}.clb-ti{font-size:20px}.clb-grid{row-gap:52px}.clb-lake{padding:30px 16px 18px}.clb-lt{font-size:18px}}\n@media (max-width:599px){.clb-list{grid-template-columns:minmax(0,1fr)}}\n@media (max-width:399px){.clb-fig{padding:18px 12px}.clb-lake{padding:28px 12px 16px}.clb-meta{padding:12px}}\n@media print{.clb-fig{print-color-adjust:exact;-webkit-print-color-adjust:exact;break-inside:avoid;margin:0;padding:18px}.clb-hd{margin-bottom:18px}.clb-ti{font-size:17px}.clb-grid{row-gap:44px}.clb-list{grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.clb-io,.clb-io:last-child{grid-column:auto;grid-template-columns:minmax(0,1fr);row-gap:6px;padding:8px 2px}.clb-io strong{font-size:13px}.clb-io span,.clb-io svg{font-size:10px}.clb-io svg{width:16px;height:16px}.clb-out .clb-k{margin-bottom:36px}.clb-lake{max-width:520px;padding:26px 14px 12px}.clb-k2{margin:10px 0 8px}.clb-meta{padding:8px 12px}.clb-sto{margin-top:8px}.clb-grid{row-gap:36px}}\n@media (forced-colors:active){.clb-lit{display:none}}\n&lt;/style&gt;\n&lt;header class=&quot;clb-hd&quot;&gt;\n  &lt;p class=&quot;clb-ey&quot;&gt;&lt;b&gt;03&lt;/b&gt; Architecture &amp;amp; Data Flow&lt;/p&gt;\n  &lt;p class=&quot;clb-ti&quot;&gt;Separation of compute and storage: &lt;em&gt;metadata, compute, and object storage&lt;/em&gt; in three layers&lt;/p&gt;\n&lt;/header&gt;\n&lt;div class=&quot;clb-grid&quot;&gt;\n  &lt;div class=&quot;clb-col clb-src&quot;&gt;\n    &lt;p class=&quot;clb-k&quot;&gt;Sources&lt;/p&gt;\n    &lt;div class=&quot;clb-list&quot;&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;ellipse cx=&quot;12&quot; cy=&quot;5.5&quot; rx=&quot;7.5&quot; ry=&quot;2.5&quot;&gt;&lt;/ellipse&gt;&lt;path d=&quot;M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;TiDB&lt;/strong&gt;&lt;span&gt;Real-time synchronization with TiCDC&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;ellipse cx=&quot;12&quot; cy=&quot;5.5&quot; rx=&quot;7.5&quot; ry=&quot;2.5&quot;&gt;&lt;/ellipse&gt;&lt;path d=&quot;M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Aurora / MySQL&lt;/strong&gt;&lt;span&gt;Data Integration&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5z&quot;&gt;&lt;/path&gt;&lt;path d=&quot;M14 2.5v5h5M8.5 12.5h7M8.5 16h7&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Kafka / Logs&lt;/strong&gt;&lt;span&gt;S3 Stage&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M3.5 5.5h17l-2 14.5a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3z&quot;&gt;&lt;/path&gt;&lt;path d=&quot;M3.5 5.5c0-1.4 3.8-2.5 8.5-2.5s8.5 1.1 8.5 2.5&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;S3 Files&lt;/strong&gt;&lt;span&gt;&lt;i class=&quot;clb-nb&quot;&gt;CSV ·&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;Parquet ·&lt;/i&gt; NDJSON&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M10 14a4.5 4.5 0 0 0 6.4.4l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2&quot;&gt;&lt;/path&gt;&lt;path d=&quot;M14 10a4.5 4.5 0 0 0-6.4-.4l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Iceberg&lt;/strong&gt;&lt;span&gt;External Catalog&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;clb-lake&quot;&gt;\n    &lt;h3 class=&quot;clb-lt&quot;&gt;TiDB Cloud Lake&lt;/h3&gt;\n    &lt;div class=&quot;clb-n clb-meta&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M12 2.5 4.5 5.5v6c0 4.6 3.2 8.4 7.5 10 4.3-1.6 7.5-5.4 7.5-10v-6z&quot;&gt;&lt;/path&gt;&lt;path d=&quot;m8.8 12 2.2 2.2 4.2-4.4&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Metadata Service · Raft&lt;/strong&gt;&lt;span&gt;&lt;i class=&quot;clb-nb&quot;&gt;Schema ·&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;Clusters ·&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;RBAC ·&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;Security Policies&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n    &lt;p class=&quot;clb-k2&quot;&gt;&lt;b&gt;COMPUTE&lt;/b&gt; · Multiple warehouses, each independently scalable, suspendable, and billed separately&lt;/p&gt;\n    &lt;div class=&quot;clb-cs&quot;&gt;\n      &lt;svg class=&quot;clb-scene&quot; aria-hidden=&quot;true&quot;&gt;&lt;/svg&gt;\n      &lt;div class=&quot;clb-wh&quot;&gt;&lt;span&gt;Ingestion&lt;/span&gt;&lt;em&gt;&lt;/em&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-wh&quot;&gt;&lt;span&gt;Batch Processing&lt;/span&gt;&lt;em&gt;&lt;/em&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-wh&quot;&gt;&lt;span&gt;BI&lt;/span&gt;&lt;em&gt;&lt;/em&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-wh&quot;&gt;&lt;span&gt;Ad Hoc Queries&lt;/span&gt;&lt;em&gt;&lt;/em&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-wh&quot;&gt;&lt;span&gt;Suspended&lt;/span&gt;&lt;em&gt;$0&lt;/em&gt;&lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;clb-sto&quot;&gt;\n      &lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M3 7.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 12c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 16.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0&quot;&gt;&lt;/path&gt;&lt;/svg&gt;\n      &lt;div&gt;&lt;p class=&quot;clb-st&quot;&gt;&lt;strong&gt;Storage · FuseEngine&lt;/strong&gt;&lt;span class=&quot;clb-chips&quot;&gt;&lt;span class=&quot;clb-chip&quot;&gt;S3&lt;/span&gt;&lt;span class=&quot;clb-chip&quot;&gt;BYOB&lt;/span&gt;&lt;span class=&quot;clb-chip&quot;&gt;Parquet&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;span class=&quot;clb-ss&quot;&gt;&lt;i class=&quot;clb-nb&quot;&gt;~8× columnar compression ·&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;MinMax / Bloom /&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;inverted / vector /&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;aggregate indexes&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;clb-col clb-out&quot;&gt;\n    &lt;p class=&quot;clb-k&quot;&gt;Consumers&lt;/p&gt;\n    &lt;div class=&quot;clb-list&quot;&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M3 3v18h18M8 17v-5M13 17V8M18 17v-8&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;BI Tools&lt;/strong&gt;&lt;span&gt;&lt;i class=&quot;clb-nb&quot;&gt;Tableau · Superset ·&lt;/i&gt; etc.&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M9 2.5v5M15 2.5v5M6 7.5h12v4a6 6 0 0 1-12 0zM12 17.5v4&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Applications&lt;/strong&gt;&lt;span&gt;&lt;i class=&quot;clb-nb&quot;&gt;JDBC · MySQL&lt;/i&gt; &lt;i class=&quot;clb-nb&quot;&gt;Protocol · Go&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;m12 3 9 4.5-9 4.5-9-4.5z&quot;&gt;&lt;/path&gt;&lt;path d=&quot;m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Data Engineering&lt;/strong&gt;&lt;span&gt;&lt;i class=&quot;clb-nb&quot;&gt;dbt · SQLAlchemy ·&lt;/i&gt; Jupyter&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;rect x=&quot;4&quot; y=&quot;7.5&quot; width=&quot;16&quot; height=&quot;12&quot; rx=&quot;2&quot;&gt;&lt;/rect&gt;&lt;path d=&quot;M12 7.5V4M9.5 13v1.5M14.5 13v1.5M2 13v3M22 13v3&quot;&gt;&lt;/path&gt;&lt;circle cx=&quot;12&quot; cy=&quot;3.2&quot; r=&quot;.8&quot;&gt;&lt;/circle&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;AI Agents&lt;/strong&gt;&lt;span&gt;MCP Server&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n      &lt;div class=&quot;clb-n clb-io&quot;&gt;&lt;i class=&quot;clb-lit&quot;&gt;&lt;/i&gt;&lt;svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; aria-hidden=&quot;true&quot;&gt;&lt;path d=&quot;M20 11a8 8 0 0 0-14.3-4.9L4 8M4 3.5V8h4.5M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20.5V16h-4.5&quot;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;div&gt;&lt;strong&gt;Write-back&lt;/strong&gt;&lt;span&gt;&lt;i class=&quot;clb-nb&quot;&gt;TiDB · Redis ·&lt;/i&gt; Services&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n&lt;svg class=&quot;clb-w&quot; aria-hidden=&quot;true&quot;&gt;&lt;/svg&gt;\n&lt;script&gt;\n(function(){\nvar s=document.currentScript,F=s&amp;&amp;s.closest('.clb-fig');if(!F||F.clb)return;\nvar q=function(x){return F.querySelector(x)},qa=function(x){return[].slice.call(F.querySelectorAll(x))},Mt=Math,NS='http://www.w3.org/2000/svg',W=q('.clb-w');\nfunction mk(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);(p||W).appendChild(e);return e}\nfunction ss(x){x=x&lt;0?0:x&gt;1?1:x;return x*x*(3-2*x)}\nfunction rp(t,a,b){return ss((t-a)/(b-a))}\nfunction f2(n){return Mt.round(n*100)/100}\nfunction pt(a){return f2(a[0])+','+f2(a[1])}\nfunction poly(a){return'M'+a.map(pt).join('L')+'Z'}\nfunction o(e,v){v=Mt.round(v*1000)/1000;if(e._o===v)return;e._o=v;e.style.opacity=v}\nfunction Hc(a,b){var k=.55*(b[0]-a[0]);return'M'+pt(a)+'C'+pt([a[0]+k,a[1]])+' '+pt([b[0]-k,b[1]])+' '+pt(b)}\nfunction Vs(a,b){var k=.55*(b[1]-a[1]);return'C'+pt([a[0],a[1]+k])+' '+pt([b[0],b[1]-k])+' '+pt(b)}\n/* nodes: a lit border overlay plus the parts that rise from dim to full */\nfunction node(el,dim,parts){var lit=el.querySelector(':scope&gt;.clb-lit');return{el:el,lit:lit,dim:dim==null?.62:dim,parts:parts||[].slice.call(el.children).filter(function(c){return c!==lit})}}\nfunction light(n,p){if(n.lit)o(n.lit,p);n.parts.forEach(function(e){o(e,n.dim+(1-n.dim)*p)})}\nvar SRC=qa('.clb-src .clb-io').map(function(e){return node(e)}),OUT=qa('.clb-out .clb-io').map(function(e){return node(e)}),META=node(q('.clb-meta')),STO=q('.clb-sto'),STH=node(STO,.62,[STO.children[0],q('.clb-st strong'),q('.clb-ss')]),CHIP=qa('.clb-chip');\nvar LT=q('.clb-lt'),K2=q('.clb-k2'),CS=q('.clb-cs'),SV=q('.clb-scene'),LAKE=q('.clb-lake'),SCOL=q('.clb-src'),OCOL=q('.clb-out'),SL=q('.clb-src .clb-list'),OL=q('.clb-out .clb-list');\nvar WH=qa('.clb-wh').map(function(e){return{el:e,sp:e.children[0],em:e.children[1]}});\n/* connectors and packets */\nvar C={},LG={},PF={fill:'#ecdcf7',stroke:'#cb8aee'};\nfunction wire(k){return C[k]||(C[k]={e:mk('path',{'class':'clb-c'}),L:0})}\nfunction leg(k){return LG[k]||(LG[k]={p:mk('path',{'class':'clb-h'}),L:0})}\nfunction pk(n,a){var e=mk(n,Object.assign({},PF,a));e.style.display='none';return e}\nvar KEYS=['s0','s1','s2','s3','s4','o0','o1','o2','o3','o4','ri','ro','mt'];KEYS.forEach(function(k){wire(k);leg(k)});\nvar CHV=[0,1,2,3,4,5].map(function(){return mk('path',{'class':'clb-c',d:'M-3.5-3.5L0 0L-3.5 3.5'})});\nvar bar=function(){return pk('rect',{x:-12,y:-4,width:24,height:8,rx:4})},tick=function(){return pk('circle',{r:3.5})},tile=function(){return pk('path',{d:'M-3.5-3.5h5l2 2v5h-7zM1.5-3.5v2h2','stroke-linejoin':'round'})};\nvar PS=[bar(),tick(),tick(),tile(),tile()],PO=[0,1,2,3,4].map(function(){return pk('circle',{r:3.5,fill:'#cb8aee',stroke:'none'})});\nvar SC={},PQ=matchMedia('print'),CELL=[],CUBE=[],TL={},stk=false,fanIn=true,fanOut=true,MQ=matchMedia('(max-width:1179px)');\n/* compute + storage as ONE object, in the page hero's grammar: an isometric storage floor whose cells fill as warehouses write,\n   with the five warehouse cubes standing on it (dashed when idle, growing solid from the base; the fifth idles, then suspends) */\nvar N=3,HL={fill:'none',stroke:'#fff','stroke-opacity':.5,'stroke-linejoin':'round','stroke-width':.75};\nfunction scene(){SV.textContent='';CELL=[];CUBE=[];var w=CS.clientWidth,ww=0,p,n,a,b,lw,cap=PQ.matches?8:stk?20:14,stg=false,ok=false;\nWH.forEach(function(h){h.el.style.width='min-content';h.mw=h.el.offsetWidth;ww=Mt.max(ww,h.mw)});\nfor(p=6;p&lt;=9;p++){n=2*p+N+2;a=Mt.min(cap,(w-2)/(2*n));b=a/Mt.sqrt(3);lw=Mt.min(2*(p-N)*a-6,w-4*p*a-4,p*b&gt;=40?1e9:p*a-4);if(lw&gt;=ww+2){ok=true;break}}\nif(!ok){stg=true;p=8;n=2*p+N+2;a=Mt.min(cap,(w-2)/(2*n));b=a/Mt.sqrt(3);lw=ww+4}\nvar L=2*b,T=Mt.max(6,Mt.round(1.6*b)),cx=w/2,O=[[1,1+2*p],[1,1+p],[1,1],[1+p,1],[1+2*p,1]];\nfunction P0(X,Y,Z){return[cx+(X-Y)*a,(X+Y)*b-(Z||0)*L]}\nWH.forEach(function(h){h.lw=stg?h.mw+4:lw;h.el.style.width=f2(h.lw)+'px';h.h=h.el.offsetHeight});\nvar hA=Mt.max(WH[1].h,WH[3].h),hB=Mt.max(WH[0].h,WH[2].h,WH[4].h),oy=stg?hA+8+hB+12-P0(1,1,N)[1]:-Mt.min.apply(0,O.map(function(o,k){return P0(o[0],o[1],N)[1]-12-WH[k].h}));\nfunction P(X,Y,Z){var v=P0(X,Y,Z);return[v[0],v[1]+oy]}function dn(v){return[v[0],v[1]+T]}\nCS.style.setProperty('--ch',f2(P(n,n,0)[1]+T)+'px');SC.lc=P(0,n,0);SC.rc=P(n,0,0);\nWH.forEach(function(h,k){var v=P(O[k][0],O[k][1],N),top=stg?(k%2?hA-h.h:hA+8+hB-h.h):v[1]-12-h.h;h.el.style.left=f2(Mt.max(0,Mt.min(w-h.lw,v[0]-h.lw/2)))+'px';h.el.style.top=f2(top)+'px';h.ly=top+h.h});\n/* the floor: the hero's slab, a rhombus whose edges run with the cube axes, two thin side faces, a cell lattice on top */\nvar g=mk('g',{},SV);mk('path',{d:poly([P(0,n),P(n,n),dn(P(n,n)),dn(P(0,n))]),fill:'#07050b'},g);mk('path',{d:poly([P(n,n),P(n,0),dn(P(n,0)),dn(P(n,n))]),fill:'#0b0812'},g);mk('path',{d:poly([P(0,0),P(n,0),P(n,n),P(0,n)]),fill:'#0d0a15'},g);\nvar i,j;for(i=0;i&lt;n;i++)for(j=0;j&lt;n;j++){var d=poly([P(i+.1,j+.1),P(i+.9,j+.1),P(i+.9,j+.9),P(i+.1,j+.9)]),hs=Mt.sin(i*12.9898+j*78.233)*43758.5453;hs-=Mt.floor(hs);mk('path',{d:d,fill:'#1c1428'},g);CELL.push({X:i+.5,Y:j+.5,h:.13+.11*hs,e:mk('path',{d:d,fill:'#9e4ec4',opacity:0},g)})}\nmk('path',Object.assign({d:'M'+[P(0,0),P(n,0),P(n,n),P(0,n)].map(pt).join('L')+'Z'+'M'+pt(P(0,n))+'L'+pt(dn(P(0,n)))+'L'+pt(dn(P(n,n)))+'L'+pt(dn(P(n,0)))+'L'+pt(P(n,0))+'M'+pt(P(n,n))+'L'+pt(dn(P(n,n)))},HL),g);\n/* cubes, painted back to front; index k stays in reading order (left to right) */\nif(stg)WH.forEach(function(h,k){var v=P(O[k][0],O[k][1],N);if(v[1]-h.ly&gt;16)mk('path',{d:'M'+f2(v[0])+' '+f2(h.ly+4)+'V'+f2(v[1]-6),stroke:'#4a3d58','stroke-width':1,fill:'none'},g)});\nvar C5=O.map(function(o,k){var Pc=function(X,Y,Z){return P(o[0]+X,o[1]+Y,Z)};return{k:k,P:Pc,X:o[0]+N/2,Y:o[1]+N/2,z:o[0]+o[1]}});\nC5.slice().sort(function(u,v){return u.z-v.z}).forEach(function(c){var Q=c.P;c.fp=mk('path',{d:poly([Q(0,0),Q(N,0),Q(N,N),Q(0,N)]),fill:'#c76ff2',opacity:0},g);c.solid=mk('g',{opacity:0},g);c.l=mk('path',{fill:'#87120c'},c.solid);c.r=mk('path',{fill:'#dc150b'},c.solid);c.t=mk('path',Object.assign({},HL,{fill:'#f35048','stroke-opacity':.55}),c.solid);\nc.dash=mk('g',{fill:'none',stroke:'#fff','stroke-opacity':.62,'stroke-width':1,'stroke-dasharray':'2.5 2.5'},g);[[0,0,N,N,0,N],[N,0,N,N,N,N],[N,N,N,0,N,N],[0,N,N,0,0,N],[0,N,N,0,N,0],[N,N,N,N,N,0],[N,0,N,N,0,0],[0,N,0,N,N,0],[N,N,0,N,0,0]].forEach(function(e){mk('path',{d:'M'+pt(Q(e[0],e[1],e[2]))+'L'+pt(Q(e[3],e[4],e[5]))},c.dash)});c.kk=-1});CUBE=C5}\nfunction grow(c,k){k=Mt.max(.001,k);if(c.kk===k)return;c.kk=k;var P=c.P,n=N;c.l.setAttribute('d',poly([P(0,n,0),P(n,n,0),P(n,n,n*k),P(0,n,n*k)]));c.r.setAttribute('d',poly([P(n,n,0),P(n,0,0),P(n,0,n*k),P(n,n,n*k)]));c.t.setAttribute('d',poly([P(0,0,n*k),P(n,0,n*k),P(n,n,n*k),P(0,n,n*k)]))}\nfunction du(L){return Mt.max(.45,Mt.min(1.15,L/320))}\nfunction dr(k,p){var c=C[k];if(c.p===p)return;c.p=p;c.e.style.strokeDashoffset=(c.L*(1-p)).toFixed(2);c.e.style.opacity=c.L&amp;&amp;p&gt;0?1:0}\nfunction hide(e){if(e._v!==0){e._v=0;e.style.display='none'}}\nfunction trav(e,k,t,t0,dur,rot){var g=LG[k],u=(t-t0)/dur;if(!g.L||u&lt;=0||u&gt;=1){hide(e);return}var f=ss(u),v=Mt.min(1,f/.08,(1-f)/.08),s=f*g.L,p=g.p.getPointAtLength(s),tr='translate('+f2(p.x)+' '+f2(p.y)+')';if(rot){var a=g.p.getPointAtLength(Mt.max(0,s-1)),b=g.p.getPointAtLength(Mt.min(g.L,s+1));tr+=' rotate('+(Mt.atan2(b.y-a.y,b.x-a.x)*57.2958).toFixed(1)+')'}e.setAttribute('transform',tr);if(e._v!==1){e._v=1;e.style.display=''}e.style.opacity=v.toFixed(3)}\nfunction sk(k){return LG['s'+k].L?'s'+k:'ri'}function ok(k){return LG['o'+k].L?'o'+k:'ro'}\n/* order: sources, metadata, compute (all five power on), storage (four writes spread across the shared floor), the idle fifth suspends to $0, consumers */\nfunction timeline(){var T={s:[],w:[],d:[],o:[]},k,a=0,e=0,gs=fanIn?.16:.5,go=fanOut?.12:.45;for(k=0;k&lt;5;k++){T.s[k]={lit:.15+.1*k,dr:.35+.1*k,go:.65+gs*k,du:du(LG[sk(k)].L)};a=Mt.max(a,T.s[k].go+T.s[k].du)}T.lt=.7;T.meta=a-.05;for(k=0;k&lt;5;k++)T.w[k]=T.meta+.5+.26*k;var wd=T.w[4]+.6;for(k=0;k&lt;4;k++)T.d[k]={land:wd+.34*k};T.st=T.d[0].land;T.sus=T.d[3].land+.55;T.ch=T.sus+.3;T.fan=T.ch+.25;for(k=0;k&lt;5;k++){T.o[k]={go:T.fan+.3+go*k,du:du(LG[ok(k)].L)};e=Mt.max(e,T.o[k].go+T.o[k].du)}T.end=e+.45;return T}\nfunction fill(){var n0=CELL.length,rest=CELL.slice();CELL.forEach(function(c){c.t=TL.end});if(CUBE.length&lt;5)return;[0,1,2,3].forEach(function(j){var n=Mt.round((j+1)*n0/4)-Mt.round(j*n0/4),c0=CUBE[j],t0=TL.d[j].land;var D=function(c){var dx=c.X-c0.X,dy=c.Y-c0.Y;return dx*dx+dy*dy};rest.sort(function(p,q){return D(p)-D(q)});rest.splice(0,n).forEach(function(c,m){c.t=t0+(n&gt;1?Mt.sqrt(m/(n-1)):0)*.55})})}\nfunction lay(){stk=MQ.matches;scene();var ov=W.getBoundingClientRect();function r(e){var b=e.getBoundingClientRect();return{l:b.left-ov.left,t:b.top-ov.top,r:b.right-ov.left,b:b.bottom-ov.top,x:(b.left+b.right)/2-ov.left,y:(b.top+b.bottom)/2-ov.top}}\nvar lk=r(LAKE),d={},lg={},ends=[];fanIn=fanOut=true;\nif(!stk){var cs=r(CS),lc=[cs.l+SC.lc[0]-4,cs.t+SC.lc[1]],rc=[cs.l+SC.rc[0]+4,cs.t+SC.rc[1]],M=[lk.l-1,lc[1]];SRC.forEach(function(n,k){var a=r(n.el),y=r(n.el.querySelector('strong')).y;d['s'+k]=lg['s'+k]=Hc([a.r,y],M)+'H'+f2(lc[0])});ends.push([lc,0]);var X=[lk.r,rc[1]];OUT.forEach(function(n,k){var a=r(n.el),e=[a.l-7,r(n.el.querySelector('strong')).y];d['o'+k]=lg['o'+k]='M'+pt(rc)+'H'+f2(lk.r)+Hc(X,e).replace(/^M[^C]*/,'');ends.push([e,0])})}\nelse{var lt=r(LT),cx=f2(Mt.max(lk.x,lt.r+28)),co=f2(lk.x),si=SRC.map(function(n){return r(n.el)}),so=OUT.map(function(n){return r(n.el)}),row=function(a){return a.every(function(b){return Mt.abs(b.t-a[0].t)&lt;2})},sb=r(SL).b,oc=r(OCOL),ot=r(OL).t;\nfanIn=row(si);fanOut=row(so);\nif(fanIn){var Mi=[cx,sb+32];d.ri='M'+pt(Mi)+'V'+f2(lk.t-6);si.forEach(function(a,k){var h='M'+pt([a.x,a.b])+Vs([a.x,a.b],Mi);d['s'+k]=h;lg['s'+k]=h+'V'+f2(lk.t-6)})}else d.ri=lg.ri='M'+pt([cx,sb+8])+'V'+f2(lk.t-6);ends.push([[cx,lk.t-6],90]);\nif(fanOut){var Mo=[co,ot-30];d.ro='M'+pt([co,lk.b+8])+'V'+f2(Mo[1]);so.forEach(function(a,k){var e=[a.x,a.t-7];d['o'+k]='M'+pt(Mo)+Vs(Mo,e);lg['o'+k]=d.ro+Vs(Mo,e);ends.push([e,90])})}else{d.ro=lg.ro='M'+pt([co,lk.b+8])+'V'+f2(oc.t-8);ends.push([[co,oc.t-8],90])}}\n(function(){var mm=r(META.el),cs2=r(CS),c0=[cs2.l+SC.lc[0],cs2.t+SC.lc[1]],rg=document.createRange();rg.selectNodeContents(K2);var kl=rg.getBoundingClientRect().left-ov.left,x0=Mt.max(lk.l+5,Mt.min(c0[0],kl-10,mm.l-12));d.mt='M'+pt([mm.l,mm.y])+'H'+f2(x0)+'V'+f2(c0[1]-10)+(x0&lt;c0[0]-1?'H'+f2(c0[0]):'')})();KEYS.forEach(function(k){var c=C[k],g=LG[k],v=d[k]||'';c.e.setAttribute('d',v);c.L=v?c.e.getTotalLength():0;c.e.style.strokeDasharray=f2(c.L)+' '+f2(c.L+2);c.p=null;g.p.setAttribute('d',lg[k]||'');g.L=lg[k]?g.p.getTotalLength():0});\nCHV.forEach(function(e,k){var v=ends[k];e.style.display=v?'':'none';e._o=undefined;if(v)e.setAttribute('transform','translate('+pt(v[0])+') rotate('+v[1]+')')});\nvar was=TL.end&amp;&amp;cur&gt;=END()-1e-6;TL=timeline();K=Mt.max(1,9/TL.end);fill();if(was)cur=END();paint(cur/K)}\nfunction paint(t){var T=TL,k;\nSRC.forEach(function(n,k){light(n,rp(t,T.s[k].lit,T.s[k].lit+.35));dr('s'+k,rp(t,T.s[k].dr,T.s[k].dr+.5));trav(PS[k],sk(k),t,T.s[k].go,T.s[k].du,k===0)});\ndr('ri',stk&amp;&amp;fanIn?rp(t,T.s[0].go+.2,T.s[0].go+.45):rp(t,.3,.7));o(CHV[0],stk?rp(t,.65,.8):rp(t,T.s[4].dr+.4,T.s[4].dr+.55));\no(LT,.5+.5*rp(t,T.lt,T.lt+.4));light(META,rp(t,T.meta,T.meta+.4));dr('mt',rp(t,T.meta+.05,T.meta+.42));o(K2,.5+.5*rp(t,T.meta+.3,T.meta+.6));\nCUBE.forEach(function(c,j){var w=T.w[j],on=rp(t,w+.15,w+.6),off=j&lt;4?0:rp(t,T.sus,T.sus+.5),g=on*(1-off),h=WH[j];o(c.fp,rp(t,w,w+.15)*(1-rp(t,w+.15,w+.32)));o(c.dash,j&lt;4?1-g:Mt.max(1-g,.85*off));o(c.solid,rp(t,w+.15,w+.22)*(j&lt;4?1:1-rp(t,T.sus+.44,T.sus+.5)));grow(c,g);o(h.sp,.62+.38*(j&lt;4?rp(t,w,w+.4):rp(t,T.sus+.1,T.sus+.5)));if(j==4)o(h.em,rp(t,T.sus+.3,T.sus+.6))});\nCELL.forEach(function(c){o(c.e,.62*rp(t,c.t,c.t+.18)-(.62-c.h)*rp(t,c.t+.5,c.t+1.4))});\nlight(STH,rp(t,T.st,T.st+.4));CHIP.forEach(function(e,i){o(e,.5+.5*rp(t,T.ch+.1*i,T.ch+.1*i+.3))});\nvar fp=rp(t,T.fan,T.fan+.4);OUT.forEach(function(n,k){dr('o'+k,stk?rp(t,T.fan+.25,T.fan+.55):fp);var x=T.o[k];trav(PO[k],ok(k),t,x.go,x.du);light(n,rp(t,x.go+x.du,x.go+x.du+.3))});dr('ro',rp(t,T.fan,T.fan+.3));\nfor(k=1;k&lt;6;k++)o(CHV[k],rp(t,T.fan+.45,T.fan+.6))}\n/* player: one timeline, play once on scroll-in, then hold */\nvar K=1,cur=0,playing=false,raf=0,last=0,vis=false,go=false,manual=false,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;\nfunction END(){return TL.end?TL.end*K:99}\nfunction render(t){cur=t;paint(t/K)}\nfunction step(now){var dt=Mt.min(.1,(now-last)/1000),t=cur+dt;last=now;if(t&gt;=END()){render(END());playing=false;return}render(t);raf=requestAnimationFrame(step)}\nfunction run(){if(playing||rm||!vis||document.hidden||cur&gt;=END())return;playing=true;last=performance.now();raf=requestAnimationFrame(step)}\nfunction halt(){cancelAnimationFrame(raf);playing=false}\nvar lw=0;new ResizeObserver(function(en){var w=en[0].contentRect.width;if(w!==lw){lw=w;lay()}}).observe(F);\nif(document.fonts&amp;&amp;document.fonts.ready)document.fonts.ready.then(lay);lay();if(rm)render(END());\nvar tq=0;function chk(){tq=0;var r=F.getBoundingClientRect(),vh=innerHeight,v=Mt.min(vh,r.bottom)-Mt.max(0,r.top),on=v&gt;48;if(on&amp;&amp;(r.top&lt;=.6*vh||v&gt;=.6*vh))go=true;vis=on&amp;&amp;go;if(vis){if(!manual)run()}else halt()}\nfunction ask(){if(!tq)tq=requestAnimationFrame(chk)}\naddEventListener('scroll',ask,{passive:true});addEventListener('resize',ask);new IntersectionObserver(ask,{threshold:[0,.25,.5,.75,1]}).observe(F);chk();\n/* print is a layout: re-lay at the print width and show the finished diagram, then restore */\nvar pc=0;function pr(e){var on=e.type==='beforeprint'||e.matches===true;lay();if(on){if(!pc)pc=cur+1;halt();render(END())}else if(pc){render(pc-1);pc=0;ask()}}\naddEventListener('beforeprint',pr);addEventListener('afterprint',pr);if(PQ.addEventListener)PQ.addEventListener('change',pr);else PQ.addListener(pr);\ndocument.addEventListener('visibilitychange',function(){if(document.hidden)halt();else if(!manual)run()});\nF.clb={get t(){return cur},get end(){return END()},get playing(){return playing},get tl(){return TL},get k(){return K},seek:function(t){manual=true;halt();render(Mt.max(0,Mt.min(t,END())))},play:function(){halt();manual=false;go=vis=true;render(rm?END():0);run()},rm:function(on){rm=!!on;halt();if(rm)render(END())}};\n})();\n&lt;/script&gt;\n&lt;/figure&gt;&lt;/body&gt;&lt;/html&gt;\" onload=\"const f=this,x=f.contentDocument.querySelector('.clb-fig'),r=()=>{if(x)f.style.height=Math.ceil(x.getBoundingClientRect().height)+'px'};r();if(x)new ResizeObserver(r).observe(x)\" loading=\"lazy\" scrolling=\"no\" style=\"display:block;width:100%;border:0;background:#0c0c11\"></iframe>",
        "itemColumns": 2
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "featureCard-1791047852824",
      "type": "featureCard",
      "props": {
        "title": "How Customers Use Cloud Lake",
        "items": [
          {
            "title": "ClinkPay",
            "description": "Payment analytics\n\nClinkPay uses TiDB Cloud Lake for continuous payment-data processing and analytics models. Its core analytics system went live in about one week."
          },
          {
            "title": "Global digital-asset exchange serving millions of users",
            "description": "Production log analytics\n\nA global digital-asset exchange migrated production log analytics to TiDB Cloud Lake. Queries that previously timed out after a minute now return within five seconds, while estimated monthly costs decreased by 67%."
          },
          {
            "title": "Production iGaming platform running live vector search",
            "description": "Vector search\n\nA production iGaming platform continuously synchronizes vector data from TiDB Essential into TiDB Cloud Lake and runs live vector search across its application data."
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "faq-section",
      "type": "faq",
      "props": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "How Does TiDB Cloud Lake Work with TiDB Cloud?",
            "a": "TiDB Cloud runs transactional applications; TiDB Cloud Lake runs analytics and search on a separate copy of your data. An initial snapshot and ongoing TiCDC changes move through S3 staging into TiDB Cloud Lake. You can also use TiDB Cloud Lake with data from other sources."
          },
          {
            "q": "What Data Can I Bring Into TiDB Cloud Lake?",
            "a": "Synchronize MySQL or PostgreSQL data with snapshot and change data capture (CDC) tasks. Load CSV, Parquet or NDJSON files from Amazon S3 through one-time or continuous ingestion.  Explore integration options - https://docs.pingcap.com/tidbcloudlake/data-integration-overview/"
          },
          {
            "q": "How Is TiDB Cloud Lake Priced?",
            "a": "Pricing covers warehouse compute, storage, cloud service/API usage and applicable Data Integration hosting. Suspending a warehouse stops its compute charges; storage and other applicable charges continue. View pricing - https://www.pingcap.com/pricing/"
          },
          {
            "q": "Is TiDB Cloud Lake Available Now?",
            "a": "TiDB Cloud Lake is in Public Preview. Sign in to TiDB Cloud, open My Lake and initialize the service. Follow the Quick Start to create a warehouse and run your first query. Read the Quickstart Guide  - https://docs.pingcap.com/tidbcloudlake/lake-quick-start/"
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Start building with TiDB Cloud Lake",
        "subtitle": "Explore the Quick Start, or talk with us about your workload.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Get Started",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Contact Sales",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
      }
    }
  ]
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
