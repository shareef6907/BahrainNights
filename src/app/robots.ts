import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/auth/', '/register/', '/login/'],
      },
    ],
    sitemap: 'https://www.bahrainnights.com/sitemap.xml',
  };
}
