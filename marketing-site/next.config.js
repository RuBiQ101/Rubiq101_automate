/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings for development
  reactStrictMode: true,
  poweredByHeader: false,
  // Fix workspace root detection
  outputFileTracingRoot: __dirname,
  
  // Webpack configuration to handle browser extension interference
  webpack: (config, { dev, isServer }) => {
    // Add custom webpack configurations for hydration issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  
  // Environment variables to suppress hydration warnings
  env: {
    NEXT_HIDE_HYDRATION_WARNINGS: 'true',
  },
  
  // Handle browser extension interference
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false
  },
  
  // Experimental features for better hydration handling
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  
  async redirects() {
    return [
      // Enforce apex domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.orkx.in'
          }
        ],
        destination: 'https://orkx.in/:path*',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
