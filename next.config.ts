import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  assetPrefix: isProd ? 'https://static.pingcap.com/launchpad' : undefined,
  images: {
    loader: isProd ? 'custom' : 'default',
    loaderFile: isProd ? './src/lib/cdn-image-loader.ts' : undefined,
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
