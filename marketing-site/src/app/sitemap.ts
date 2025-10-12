import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://orkx.in';
  const now = new Date().toISOString();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/#features`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
