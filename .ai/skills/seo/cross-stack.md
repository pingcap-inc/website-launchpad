# Cross-Stack SEO Mechanism

> This document covers everything needed to make WordPress and Next.js appear as one unified site to Google.
> Based on PingCAP SEO Audit recommendations (Q3).

---

## 1. Reverse Proxy Routing (Nginx)

Path-based routing: Next.js handles specific paths, WordPress handles everything else.

```nginx
# /etc/nginx/sites-available/pingcap.conf

server {
    listen 443 ssl;
    server_name www.pingcap.com;

    # ── Next.js paths ──────────────────────────────────────────────
    location /glossary/ {
        proxy_pass https://website-launchpad.vercel.app/glossary/;
        proxy_set_header Host www.pingcap.com;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /compare/ {
        proxy_pass https://website-launchpad.vercel.app/compare/;
        proxy_set_header Host www.pingcap.com;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /lp/ {
        proxy_pass https://website-launchpad.vercel.app/lp/;
        proxy_set_header Host www.pingcap.com;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /marketing/ {
        proxy_pass https://website-launchpad.vercel.app/marketing/;
        proxy_set_header Host www.pingcap.com;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }

    # ── Next.js static assets ───────────────────────────────────────
    location /_next/ {
        proxy_pass https://website-launchpad.vercel.app/_next/;
        proxy_set_header Host www.pingcap.com;
    }

    # ── Next.js sitemap ─────────────────────────────────────────────
    location /nextjs-sitemap.xml {
        proxy_pass https://website-launchpad.vercel.app/sitemap.xml;
        proxy_set_header Host www.pingcap.com;
    }

    # ── Security headers (applied to ALL backends) ──────────────────
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # ── WordPress (everything else) ─────────────────────────────────
    location / {
        proxy_pass http://wordpress-backend;
        proxy_set_header Host www.pingcap.com;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

**Critical:** Always set `Host: www.pingcap.com` in proxy headers so Next.js generates canonical URLs pointing to the main domain, not `vercel.app`.

---

## 2. Cloudflare Alternative

If using Cloudflare Workers instead of Nginx:

```js
// cloudflare-worker.js
export default {
  async fetch(request) {
    const url = new URL(request.url)
    const NEXTJS_ORIGIN = 'https://website-launchpad.vercel.app'
    const WP_ORIGIN = 'https://wordpress-backend.pingcap.com'

    const NEXTJS_PATHS = ['/glossary/', '/compare/', '/lp/', '/marketing/', '/_next/', '/nextjs-sitemap.xml']
    const isNextJs = NEXTJS_PATHS.some(p => url.pathname.startsWith(p))

    const origin = isNextJs ? NEXTJS_ORIGIN : WP_ORIGIN
    const targetUrl = `${origin}${url.pathname}${url.search}`

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        'Host': 'www.pingcap.com',
        'X-Forwarded-For': request.headers.get('CF-Connecting-IP') ?? '',
      },
      body: request.method !== 'GET' ? request.body : undefined,
    })

    const newResponse = new Response(response.body, response)

    // Security headers
    newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    newResponse.headers.set('X-Frame-Options', 'DENY')
    newResponse.headers.set('X-Content-Type-Options', 'nosniff')
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    return newResponse
  }
}
```

---

## 3. Sitemap Merge

**Option A (Recommended): Inject Next.js sitemap into WordPress Yoast**

Add to WordPress `functions.php`:

```php
add_filter('wpseo_sitemap_index', function($sitemap_index) {
    $sitemap_index .= '<sitemap>'
        . '<loc>https://www.pingcap.com/nextjs-sitemap.xml</loc>'
        . '<lastmod>' . date('c') . '</lastmod>'
        . '</sitemap>';
    return $sitemap_index;
});
```

**Option B: Declare both sitemaps in robots.txt**

```
Sitemap: https://www.pingcap.com/sitemap_index.xml
Sitemap: https://www.pingcap.com/nextjs-sitemap.xml
```

**Next.js sitemap generation** (`src/app/sitemap.ts`):

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.pingcap.com/glossary/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add new pages here as they go live
  ]
}
```

---

## 4. Route-Level Analytics (page_view on navigation)

Next.js App Router does not fire GTM page_view automatically on route changes.
Add this component to `src/app/layout.tsx`:

```tsx
// src/components/ui/RouteTracker.tsx
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/gtm'

export function RouteTracker({ pageType }: { pageType?: string }) {
  const pathname = usePathname()

  useEffect(() => {
    trackPageView({
      page_type: (pageType ?? 'other') as any,
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
```

Add to layout.tsx:
```tsx
<body>
  <GTMNoScript />
  <RouteTracker />
  {children}
</body>
```

For page-specific `page_type`, pass it via a layout or page-level wrapper.

---

## 5. Validation Checklist (run before each new path goes live)

```
Domain & Routing
- [ ] Page loads at www.pingcap.com/[path]/ (not vercel.app)
- [ ] canonical URL shows www.pingcap.com (not vercel.app)

Meta Tags
- [ ] <title> present and unique
- [ ] <meta name="description"> present (120–160 chars)
- [ ] og:title, og:description, og:image present
- [ ] twitter:card present

Schema
- [ ] JSON-LD uses @graph structure (Yoast-compatible)
- [ ] Page-specific schema present (DefinedTerm / Article / SoftwareApplication)
- [ ] Validate at: https://validator.schema.org

Security Headers
- [ ] Strict-Transport-Security present
- [ ] X-Frame-Options: DENY present
- [ ] X-Content-Type-Options: nosniff present
- [ ] Check at: https://securityheaders.com

Analytics
- [ ] GTM fires on page load
- [ ] page_view event in dataLayer with correct page_type
- [ ] Both GTM containers fire (pingcap.com + all_websites) — check Network tab for two gtm.js requests

Sitemap
- [ ] New URL appears in /nextjs-sitemap.xml
- [ ] /nextjs-sitemap.xml linked from sitemap_index.xml or robots.txt
```

---

## 6. Adding a New Next.js Path

When a new path goes live (e.g. `/solutions/`), three things must be updated:

1. **Nginx / Cloudflare** — add the new path to the proxy rules
2. **`src/app/sitemap.ts`** — add the URL entry
3. **Validation checklist** — run through before announcing live
