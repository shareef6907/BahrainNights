import { SEO_CONFIG } from './config';
import { getAdminClient } from '@/lib/supabase/server';

interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate complete sitemap XML
 */
export async function generateSitemap(): Promise<string> {
  const urls: SitemapUrl[] = [];

  // Add static pages
  urls.push(...getStaticUrls());

  // Add dynamic pages from database
  const dynamicUrls = await getDynamicUrls();
  urls.push(...dynamicUrls);

  return buildSitemapXml(urls);
}

/**
 * Get static page URLs
 */
function getStaticUrls(): SitemapUrl[] {
  const today = new Date().toISOString().split('T')[0];

  return [
    {
      url: SEO_CONFIG.siteUrl,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      url: `${SEO_CONFIG.siteUrl}/events`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${SEO_CONFIG.siteUrl}/cinema`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${SEO_CONFIG.siteUrl}/places`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/restaurants`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/cafes`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/lounges-bars`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/nightclubs`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/beach-pool-clubs`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/attractions`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/offers`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      url: `${SEO_CONFIG.siteUrl}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      url: `${SEO_CONFIG.siteUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      url: `${SEO_CONFIG.siteUrl}/register-venue`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${SEO_CONFIG.siteUrl}/login`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.4
    }
  ];
}

/**
 * Get dynamic URLs from database
 */
async function getDynamicUrls(): Promise<SitemapUrl[]> {
  const supabase = getAdminClient();
  const urls: SitemapUrl[] = [];

  try {
    // Get approved events
    const { data: events } = await supabase
      .from('events')
      .select('slug, updated_at, start_date')
      .eq('status', 'approved')
      .gte('start_date', new Date().toISOString().split('T')[0])
      .order('start_date', { ascending: true });

    const eventsTyped = events as Array<{ slug: string; updated_at?: string; start_date: string }> | null;
    if (eventsTyped) {
      eventsTyped.forEach(event => {
        urls.push({
          url: `${SEO_CONFIG.siteUrl}/events/${event.slug}`,
          lastmod: event.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          changefreq: 'daily',
          priority: 0.8
        });
      });
    }

    // Get approved venues
    const { data: venues } = await supabase
      .from('venues')
      .select('slug, category, updated_at')
      .eq('status', 'approved');

    const venuesTyped = venues as Array<{ slug: string; category: string; updated_at?: string }> | null;
    if (venuesTyped) {
      venuesTyped.forEach(venue => {
        const categoryPath = getCategoryPath(venue.category);
        urls.push({
          url: `${SEO_CONFIG.siteUrl}/${categoryPath}/${venue.slug}`,
          lastmod: venue.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.7
        });
      });
    }

    // Get attractions
    const { data: attractions } = await supabase
      .from('attractions')
      .select('slug, updated_at')
      .eq('status', 'active');

    const attractionsTyped = attractions as Array<{ slug: string; updated_at?: string }> | null;
    if (attractionsTyped) {
      attractionsTyped.forEach(attraction => {
        urls.push({
          url: `${SEO_CONFIG.siteUrl}/attractions/${attraction.slug}`,
          lastmod: attraction.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.7
        });
      });
    }

    // Get movies (now showing)
    const { data: movies } = await supabase
      .from('movies')
      .select('slug, updated_at')
      .eq('status', 'now_showing');

    const moviesTyped = movies as Array<{ slug: string; updated_at?: string }> | null;
    if (moviesTyped) {
      moviesTyped.forEach(movie => {
        urls.push({
          url: `${SEO_CONFIG.siteUrl}/cinema/${movie.slug}`,
          lastmod: movie.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          changefreq: 'daily',
          priority: 0.7
        });
      });
    }

    // Get offers (active)
    const { data: offers } = await supabase
      .from('offers')
      .select('id, updated_at')
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString().split('T')[0]);

    const offersTyped = offers as Array<{ id: string; updated_at?: string }> | null;
    if (offersTyped) {
      offersTyped.forEach(offer => {
        urls.push({
          url: `${SEO_CONFIG.siteUrl}/offers/${offer.id}`,
          lastmod: offer.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.6
        });
      });
    }

  } catch (error) {
    console.error('Error fetching dynamic URLs for sitemap:', error);
  }

  return urls;
}

/**
 * Get category path for venue URLs
 */
function getCategoryPath(category: string): string {
  const categoryPaths: Record<string, string> = {
    restaurant: 'restaurants',
    cafe: 'cafes',
    lounge: 'lounges-bars',
    bar: 'lounges-bars',
    nightclub: 'nightclubs',
    'beach-club': 'beach-pool-clubs',
    'pool-club': 'beach-pool-clubs'
  };
  return categoryPaths[category] || 'places';
}

/**
 * Build sitemap XML string
 */
function buildSitemapXml(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => `
  <url>
    <loc>${escapeXml(url.url)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  return `# BahrainNights.com Robots.txt
# Last updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /venue-portal/
Disallow: /api/
Disallow: /_next/
Disallow: /login
Disallow: /register

# Sitemap location
Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Google-specific directives
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing-specific directives
User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;
}

/**
 * Get sitemap stats for logging
 */
export async function getSitemapStats(): Promise<{
  totalUrls: number;
  staticUrls: number;
  events: number;
  venues: number;
  attractions: number;
  movies: number;
  offers: number;
}> {
  const staticUrls = getStaticUrls();
  const dynamicUrls = await getDynamicUrls();

  // Count by type (rough estimate based on URL patterns)
  const events = dynamicUrls.filter(u => u.url.includes('/events/')).length;
  const venues = dynamicUrls.filter(u =>
    u.url.includes('/restaurants/') ||
    u.url.includes('/cafes/') ||
    u.url.includes('/lounges-bars/') ||
    u.url.includes('/nightclubs/') ||
    u.url.includes('/beach-pool-clubs/') ||
    u.url.includes('/places/')
  ).length;
  const attractions = dynamicUrls.filter(u => u.url.includes('/attractions/')).length;
  const movies = dynamicUrls.filter(u => u.url.includes('/cinema/')).length;
  const offers = dynamicUrls.filter(u => u.url.includes('/offers/')).length;

  return {
    totalUrls: staticUrls.length + dynamicUrls.length,
    staticUrls: staticUrls.length,
    events,
    venues,
    attractions,
    movies,
    offers
  };
}
