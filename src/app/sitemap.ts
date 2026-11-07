import { MetadataRoute } from 'next';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getIndexableHubs } from '@/lib/seo/indexable-hubs';

const BASE_URL = 'https://www.bahrainnights.com';

/**
 * How many rows to fetch per page when reading the database.
 *
 * Supabase/PostgREST caps a single response, so every list is read in pages
 * and the loop continues until the database says there is nothing left. A
 * hardcoded `.limit(500)` silently DROPPED 203 published events from the
 * sitemap -- including 42 events happening in the next three days -- and the
 * DESC sort that came with it kept the farthest-future events and pushed the
 * soonest ones off the end.
 */
const PAGE_SIZE = 1000;

// Lazy initialization to avoid build-time errors
let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (_supabase) return _supabase;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase env vars not available for sitemap generation');
    return null;
  }
  
  _supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  return _supabase;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabaseClient();

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // High-traffic SEO landing pages
    {
      url: `${BASE_URL}/things-to-do-in-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/best-restaurants-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/bahrain-nightlife-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/weekend-in-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Tonight & Weekend pages
    {
      url: `${BASE_URL}/tonight`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },

    // New SEO landing pages (Feb 2026)
    {
      url: `${BASE_URL}/best-hotels-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/best-brunches-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/best-cafes-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/ladies-night-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/nightlife-bahrain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    
    // REMOVED: /things-to-do-bahrain - redirects to /things-to-do-in-bahrain
    {
      url: `${BASE_URL}/bahrain-events-this-week`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
{
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/places`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cinema`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/artists`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/become-an-artist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/regional`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // New guides - Round 2
    // Brand outlet guides - Round 4
    // New guides - Round 3
    // Individual mall guides
    // Event production & services guides (Feb 2026)
    {
      url: `${BASE_URL}/events/this-weekend`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/offers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/calendar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/explore/kids`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/explore/hotels`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/explore/spas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/explore/shopping`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/explore/tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/explore/community`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/venues`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/international`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sponsors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/attractions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/family-kids`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/events/today`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/events/calendar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/list-event`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register-venue`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/become-a-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    // REMOVED: /blog - redirects to /regional
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/content-guidelines`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Guide pages (malls, brands, restaurants, souks).
  // These are static, indexable pages that were missing from the sitemap.
  const guideSlugs = [
    // Guide section indexes
    'guides/malls',
    'guides/brands',
    // Individual mall guides
    'guides/malls/bahrain-mall',
    'guides/malls/city-centre-bahrain',
    'guides/malls/dana-mall',
    'guides/malls/dragon-city',
    'guides/malls/enma-mall',
    'guides/malls/marassi-galleria',
    'guides/malls/moda-mall',
    'guides/malls/oasis-mall',
    'guides/malls/seef-mall',
    'guides/malls/souq-al-baraha',
    'guides/malls/the-avenues',
    // Individual brand guides
    'guides/brands/adidas',
    'guides/brands/apple',
    'guides/brands/bath-body-works',
    'guides/brands/chanel',
    'guides/brands/cheesecake-factory',
    'guides/brands/costa-coffee',
    'guides/brands/crocs',
    'guides/brands/dior',
    'guides/brands/five-guys',
    'guides/brands/gucci',
    'guides/brands/hermes',
    'guides/brands/hm',
    'guides/brands/ikea',
    'guides/brands/louis-vuitton',
    'guides/brands/nike',
    'guides/brands/sephora',
    'guides/brands/shake-shack',
    'guides/brands/starbucks',
    'guides/brands/uniqlo',
    'guides/brands/zara',
    // Food & drink guides
    'guides/best-fine-dining-bahrain',
    'guides/best-korean-restaurants-bahrain',
    'guides/best-lebanese-restaurants-bahrain',
    'guides/best-mexican-restaurants-bahrain',
    'guides/best-steakhouses-bahrain',
    'guides/best-turkish-restaurants-bahrain',
    'guides/souks',
  ];

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug === 'guides/malls' || slug === 'guides/brands' ? 0.8 : 0.7,
  }));

  // If Supabase is not available (build time), return only static pages
  if (!supabase) {
    return [...staticPages, ...guidePages];
  }

  // Fetch published events (exclude hidden)
  //
  // Read in pages until the database is exhausted. Do NOT reintroduce a
  // hardcoded limit here: a limit silently truncates the sitemap, and the
  // pages that get dropped are whichever ones sort last -- which is not a
  // random set, it is a consistent set that never reaches Google.
  let eventPages: MetadataRoute.Sitemap = [];
  try {
    const today = new Date().toISOString().split('T')[0];
    const allEvents: {
      slug: string;
      updated_at: string | null;
      date: string | null;
    }[] = [];

    let from = 0;
    while (true) {
      const { data, error } = await supabase
        .from('events')
        .select('slug, updated_at, date')
        .eq('status', 'published')
        .eq('is_hidden', false)
        .or(`date.gte.${today},end_date.gte.${today}`)
        // Soonest first. The near-term events are the ones worth having in
        // the sitemap -- they are what "what's on this weekend" searches land
        // on. Sorting descending put them last and, combined with a limit,
        // dropped them entirely.
        .order('date', { ascending: true, nullsFirst: false })
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        console.error('Error fetching events for sitemap:', error);
        break;
      }
      if (!data || data.length === 0) break;

      allEvents.push(...data);
      if (data.length < PAGE_SIZE) break;
      from += PAGE_SIZE;
    }

    eventPages = allEvents
      // A row with no slug cannot produce a URL. Skip it rather than
      // emitting "/events/undefined" or "/events/null".
      .filter((event) => Boolean(event.slug))
      .map((event) => ({
        url: `${BASE_URL}/events/${event.slug}`,
        lastModified: event.updated_at ? new Date(event.updated_at) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
  }

  // The event hubs -- /events/category/<cat> and /international/<code>.
  //
  // These are the primary discovery entry points for event pages, and they
  // were entirely missing from the sitemap (all 13 category hubs, and 25 of
  // the 27 country hubs). Google reported the populated ones as "URL is
  // unknown to Google" despite a 200, a canonical and `index, follow`.
  //
  // A hub is listed if and only if it is indexable, which is the same
  // "does it have listings?" question the page asks for its robots meta tag.
  let hubPages: MetadataRoute.Sitemap = [];
  try {
    const hubs = await getIndexableHubs();

    hubPages = [
      ...hubs.categories.map((slug) => ({
        url: `${BASE_URL}/events/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.85,
      })),
      ...hubs.countries.map((slug) => ({
        url: `${BASE_URL}/international/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })),
    ];
  } catch (error) {
    console.error('Error resolving hubs for sitemap:', error);
  }

  // Fetch approved venues/places
  let venuePages: MetadataRoute.Sitemap = [];
  try {
    const { data: venues } = await supabase
      .from('venues')
      .select('slug, category, updated_at')
      .eq('status', 'approved')
      .limit(500);

    if (venues) {
      venuePages = venues.map((venue) => ({
        url: `${BASE_URL}/places/${venue.slug}`,
        lastModified: venue.updated_at ? new Date(venue.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching venues for sitemap:', error);
  }

  // Fetch movies (now showing)
  let moviePages: MetadataRoute.Sitemap = [];
  try {
    const { data: movies } = await supabase
      .from('movies')
      .select('slug, updated_at')
      .eq('status', 'now_showing')
      .limit(100);

    if (movies) {
      moviePages = movies.map((movie) => ({
        url: `${BASE_URL}/cinema/${movie.slug}`,
        lastModified: movie.updated_at ? new Date(movie.updated_at) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching movies for sitemap:', error);
  }

  // Fetch regional articles (international events coverage)
  let regionalPages: MetadataRoute.Sitemap = [];
  try {
    const { data: articles } = await supabase
      .from('blog_articles')
      .select('slug, published_at')
      .eq('status', 'published')
      .limit(500);

    if (articles) {
      regionalPages = articles.map((article) => ({
        url: `${BASE_URL}/regional/${article.slug}`,
        lastModified: article.published_at ? new Date(article.published_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching regional articles for sitemap:', error);
  }

  return [
    ...staticPages,
    ...guidePages,
    ...hubPages,
    ...eventPages,
    ...venuePages,
    ...moviePages,
    ...regionalPages,
  ];
}
