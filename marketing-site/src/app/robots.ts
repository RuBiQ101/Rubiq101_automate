import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const host = 'orkx.in';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${host}/sitemap.xml`,
    host: `https://${host}`,
  };
}
