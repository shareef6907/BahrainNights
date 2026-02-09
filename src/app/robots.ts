import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/auth/', '/register/', '/login/', '/venue-portal/', '/offline/'],
      },
    ],
    sitemap: 'https://www.bahrainnights.com/sitemap.xml',
  };
}
