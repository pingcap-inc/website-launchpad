import type { NextConfig } from 'next'

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX

const nextConfig: NextConfig = {
  assetPrefix: assetPrefix ?? undefined,
  images: {
    loader: assetPrefix ? 'custom' : 'default',
    loaderFile: assetPrefix ? './src/lib/cdn-image-loader.ts' : undefined,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.pingcap.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.pingcap.com',
      },
    ],
  },
  // Trailing slash for SEO canonical consistency
  trailingSlash: true,
}

export default nextConfig
