
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },

  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      try {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false },
          })
        );
      } catch {}
    }
    return config;
  },

  experimental: {
    serverComponentsExternalPackages: ['@reactflow/core'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=60' },
        ],
      },
    ];
  },

  editor: undefined,
};

module.exports = nextConfig;
