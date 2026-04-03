import type { NextConfig } from 'next'

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX
const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  assetPrefix: assetPrefix ?? undefined,
  images: {
    loader: assetPrefix ? 'custom' : 'default',
    loaderFile: assetPrefix ? './src/lib/cdn-image-loader.ts' : undefined,
    unoptimized: isDev,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.pingcap.com',
      },
    ],
  },
  // Trailing slash for SEO canonical consistency
  trailingSlash: true,
}

export default nextConfig
