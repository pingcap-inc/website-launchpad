import type { NextConfig } from 'next'

const cdnPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX

const nextConfig: NextConfig = {
  assetPrefix: cdnPrefix ?? undefined,
  images: {
    loader: cdnPrefix ? 'custom' : 'default',
    loaderFile: cdnPrefix ? './src/lib/cdn-image-loader.ts' : undefined,
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
