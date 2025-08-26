import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.upbit.com/v1/:path*', // 외부 API
      },
    ]
  },
}

export default nextConfig
