import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
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
