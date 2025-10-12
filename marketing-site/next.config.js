/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
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
