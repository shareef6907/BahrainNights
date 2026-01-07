import { getAdminClient } from '@/lib/supabase/server';
import { SEO_CONFIG } from '@/lib/seo/config';
import { getSitemapStats } from '@/lib/seo/sitemapGenerator';

interface SEOAgentResult {
  success: boolean;
  pagesOptimized: number;
  keywordsChecked: number;
  sitemapUpdated: boolean;
  errors: string[];
  durationSeconds: number;
  details: {
    eventsProcessed: number;
    venuesProcessed: number;
    attractionsProcessed: number;
    sitemapStats: {
      totalUrls: number;
      staticUrls: number;
      events: number;
      venues: number;
      attractions: number;
      movies: number;
      offers: number;
    };
  };
}

/**
 * Daily SEO Agent - Runs optimization tasks
 */
export async function runSEOAgent(): Promise<SEOAgentResult> {
  const startTime = Date.now();
  const supabase = getAdminClient();
  const errors: string[] = [];

  let pagesOptimized = 0;
  let keywordsChecked = 0;
  let eventsProcessed = 0;
  let venuesProcessed = 0;
  let attractionsProcessed = 0;

  console.log('[SEO Agent] Starting daily SEO optimization run...');

  try {
    // 1. Check and update keywords status
    console.log('[SEO Agent] Checking target keywords...');
    const { data: keywords } = await supabase
      .from('seo_keywords')
      .select('*')
      .order('priority', { ascending: false });

    if (keywords) {
      keywordsChecked = keywords.length;
      console.log(`[SEO Agent] Found ${keywordsChecked} target keywords`);
    }

    // 2. Optimize event meta data
    console.log('[SEO Agent] Optimizing event pages...');
    const { data: events } = await supabase
      .from('events')
      .select('id, title, description, slug, venue_id, start_date')
      .eq('status', 'approved')
      .gte('start_date', new Date().toISOString().split('T')[0])
      .is('seo_optimized', null);

    const eventsTyped = events as Array<{ id: string; title: string; description?: string; slug: string; venue_id?: string; start_date?: string }> | null;
    if (eventsTyped && eventsTyped.length > 0) {
      for (const event of eventsTyped.slice(0, 50)) {  // Process max 50 per run
        try {
          await optimizeEventSEO(supabase, event);
          eventsProcessed++;
          pagesOptimized++;
        } catch (err) {
          errors.push(`Event ${event.id}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
      console.log(`[SEO Agent] Optimized ${eventsProcessed} event pages`);
    }

    // 3. Optimize venue meta data
    console.log('[SEO Agent] Optimizing venue pages...');
    const { data: venues } = await supabase
      .from('venues')
      .select('id, name, description, slug, category, area')
      .eq('status', 'approved')
      .is('seo_optimized', null);

    const venuesTyped = venues as Array<{ id: string; name: string; description?: string; slug: string; category: string; area?: string }> | null;
    if (venuesTyped && venuesTyped.length > 0) {
      for (const venue of venuesTyped.slice(0, 50)) {  // Process max 50 per run
        try {
          await optimizeVenueSEO(supabase, venue);
          venuesProcessed++;
          pagesOptimized++;
        } catch (err) {
          errors.push(`Venue ${venue.id}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
      console.log(`[SEO Agent] Optimized ${venuesProcessed} venue pages`);
    }

    // 4. Optimize attraction meta data
    console.log('[SEO Agent] Optimizing attraction pages...');
    const { data: attractions } = await supabase
      .from('attractions')
      .select('id, name, description, slug, area')
      .eq('status', 'active')
      .is('seo_optimized', null);

    const attractionsTyped = attractions as Array<{ id: string; name: string; description?: string; slug: string; area?: string }> | null;
    if (attractionsTyped && attractionsTyped.length > 0) {
      for (const attraction of attractionsTyped.slice(0, 20)) {  // Process max 20 per run
        try {
          await optimizeAttractionSEO(supabase, attraction);
          attractionsProcessed++;
          pagesOptimized++;
        } catch (err) {
          errors.push(`Attraction ${attraction.id}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
      console.log(`[SEO Agent] Optimized ${attractionsProcessed} attraction pages`);
    }

    // 5. Get sitemap stats
    console.log('[SEO Agent] Generating sitemap statistics...');
    const sitemapStats = await getSitemapStats();
    console.log(`[SEO Agent] Sitemap contains ${sitemapStats.totalUrls} URLs`);

    // 6. Log the run
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    const result: SEOAgentResult = {
      success: errors.length === 0,
      pagesOptimized,
      keywordsChecked,
      sitemapUpdated: true,
      errors,
      durationSeconds,
      details: {
        eventsProcessed,
        venuesProcessed,
        attractionsProcessed,
        sitemapStats
      }
    };

    // Save log to database
    await (supabase.from('seo_agent_logs') as any).insert({
      pages_optimized: pagesOptimized,
      keywords_checked: keywordsChecked,
      sitemap_updated: true,
      errors: errors.length > 0 ? errors : null,
      duration_seconds: durationSeconds,
      status: errors.length === 0 ? 'completed' : 'completed_with_errors',
      details: result.details
    });

    console.log(`[SEO Agent] Completed in ${durationSeconds}s. Pages optimized: ${pagesOptimized}`);

    return result;
  } catch (error) {
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(errorMessage);

    // Log failed run
    await (supabase.from('seo_agent_logs') as any).insert({
      pages_optimized: pagesOptimized,
      keywords_checked: keywordsChecked,
      sitemap_updated: false,
      errors,
      duration_seconds: durationSeconds,
      status: 'failed',
      details: { error: errorMessage }
    });

    console.error('[SEO Agent] Failed:', errorMessage);

    return {
      success: false,
      pagesOptimized,
      keywordsChecked,
      sitemapUpdated: false,
      errors,
      durationSeconds,
      details: {
        eventsProcessed,
        venuesProcessed,
        attractionsProcessed,
        sitemapStats: { totalUrls: 0, staticUrls: 0, events: 0, venues: 0, attractions: 0, movies: 0, offers: 0 }
      }
    };
  }
}

/**
 * Optimize SEO for a single event
 */
async function optimizeEventSEO(
  supabase: ReturnType<typeof getAdminClient>,
  event: { id: string; title: string; description?: string; slug: string; venue_id?: string; start_date?: string }
) {
  // Generate optimized meta description
  const metaDescription = event.description
    ? event.description.slice(0, 155).replace(/\s+/g, ' ').trim() + '...'
    : `${event.title} in Bahrain. Get event details, tickets, and more on BahrainNights.`;

  // Generate keywords based on title
  const keywords = generateKeywordsFromTitle(event.title, 'event');

  // Update event with SEO data
  await (supabase
    .from('events') as any)
    .update({
      meta_description: metaDescription,
      meta_keywords: keywords,
      seo_optimized: true,
      seo_optimized_at: new Date().toISOString()
    })
    .eq('id', event.id);

  // Save to seo_page_meta
  const pagePath = `/events/${event.slug}`;
  await (supabase
    .from('seo_page_meta') as any)
    .upsert({
      page_path: pagePath,
      page_type: 'event',
      title: `${event.title} | Events in Bahrain | BahrainNights`.slice(0, 70),
      description: metaDescription,
      keywords,
      og_title: event.title.slice(0, 95),
      og_description: metaDescription.slice(0, 200),
      last_optimized: new Date().toISOString(),
      optimization_score: calculateSEOScore(event.title, metaDescription, keywords)
    }, { onConflict: 'page_path' });
}

/**
 * Optimize SEO for a single venue
 */
async function optimizeVenueSEO(
  supabase: ReturnType<typeof getAdminClient>,
  venue: { id: string; name: string; description?: string; slug: string; category: string; area?: string }
) {
  const categoryLabel = getCategoryLabel(venue.category);
  const metaDescription = venue.description
    ? venue.description.slice(0, 155).replace(/\s+/g, ' ').trim() + '...'
    : `${venue.name} - ${categoryLabel} in ${venue.area || 'Bahrain'}. View menu, photos, and book your visit on BahrainNights.`;

  const keywords = generateKeywordsFromTitle(venue.name, 'venue', venue.category, venue.area);

  await (supabase
    .from('venues') as any)
    .update({
      meta_description: metaDescription,
      meta_keywords: keywords,
      seo_optimized: true,
      seo_optimized_at: new Date().toISOString()
    })
    .eq('id', venue.id);

  const categoryPath = getCategoryPath(venue.category);
  const pagePath = `/${categoryPath}/${venue.slug}`;

  await (supabase
    .from('seo_page_meta') as any)
    .upsert({
      page_path: pagePath,
      page_type: 'venue',
      title: `${venue.name} | ${categoryLabel} in ${venue.area || 'Bahrain'} | BahrainNights`.slice(0, 70),
      description: metaDescription,
      keywords,
      og_title: venue.name.slice(0, 95),
      og_description: metaDescription.slice(0, 200),
      last_optimized: new Date().toISOString(),
      optimization_score: calculateSEOScore(venue.name, metaDescription, keywords)
    }, { onConflict: 'page_path' });
}

/**
 * Optimize SEO for a single attraction
 */
async function optimizeAttractionSEO(
  supabase: ReturnType<typeof getAdminClient>,
  attraction: { id: string; name: string; description?: string; slug: string; area?: string }
) {
  const metaDescription = attraction.description
    ? attraction.description.slice(0, 155).replace(/\s+/g, ' ').trim() + '...'
    : `Visit ${attraction.name}${attraction.area ? ` in ${attraction.area}` : ''} - one of the top attractions in Bahrain. Get info and visitor tips on BahrainNights.`;

  const keywords = generateKeywordsFromTitle(attraction.name, 'attraction', undefined, attraction.area);

  await (supabase
    .from('attractions') as any)
    .update({
      meta_description: metaDescription,
      meta_keywords: keywords,
      seo_optimized: true,
      seo_optimized_at: new Date().toISOString()
    })
    .eq('id', attraction.id);

  const pagePath = `/attractions/${attraction.slug}`;

  await (supabase
    .from('seo_page_meta') as any)
    .upsert({
      page_path: pagePath,
      page_type: 'attraction',
      title: `${attraction.name} | Attractions in Bahrain | BahrainNights`.slice(0, 70),
      description: metaDescription,
      keywords,
      og_title: attraction.name.slice(0, 95),
      og_description: metaDescription.slice(0, 200),
      last_optimized: new Date().toISOString(),
      optimization_score: calculateSEOScore(attraction.name, metaDescription, keywords)
    }, { onConflict: 'page_path' });
}

/**
 * Generate keywords from title
 */
function generateKeywordsFromTitle(
  title: string,
  type: 'event' | 'venue' | 'attraction',
  category?: string,
  area?: string
): string[] {
  const keywords: string[] = [];

  // Add base keywords
  switch (type) {
    case 'event':
      keywords.push('events in bahrain', 'bahrain events', title.toLowerCase());
      break;
    case 'venue':
      keywords.push(`${category || 'venue'} bahrain`, 'places in bahrain', title.toLowerCase());
      if (category) keywords.push(`best ${category}s bahrain`);
      break;
    case 'attraction':
      keywords.push('attractions in bahrain', 'things to do in bahrain', title.toLowerCase());
      break;
  }

  // Add area if available
  if (area) {
    keywords.push(`${area.toLowerCase()} ${type}s`, `${type}s in ${area.toLowerCase()}`);
  }

  // Extract important words from title
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  keywords.push(...titleWords.slice(0, 3));

  // Return unique keywords
  return [...new Set(keywords)].slice(0, 10);
}

/**
 * Get category label for display
 */
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    restaurant: 'Restaurant',
    cafe: 'Cafe',
    lounge: 'Lounge',
    bar: 'Bar',
    nightclub: 'Nightclub',
    'beach-club': 'Beach Club',
    'pool-club': 'Pool Club'
  };
  return labels[category] || category;
}

/**
 * Get category path for URLs
 */
function getCategoryPath(category: string): string {
  const paths: Record<string, string> = {
    restaurant: 'restaurants',
    cafe: 'cafes',
    lounge: 'lounges-bars',
    bar: 'lounges-bars',
    nightclub: 'nightclubs',
    'beach-club': 'beach-pool-clubs',
    'pool-club': 'beach-pool-clubs'
  };
  return paths[category] || 'places';
}

/**
 * Calculate SEO optimization score (0-100)
 */
function calculateSEOScore(title: string, description: string, keywords: string[]): number {
  let score = 0;

  // Title length (ideal: 50-60 chars)
  if (title.length >= 50 && title.length <= 60) score += 25;
  else if (title.length >= 30 && title.length <= 70) score += 15;
  else score += 5;

  // Description length (ideal: 150-160 chars)
  if (description.length >= 150 && description.length <= 160) score += 25;
  else if (description.length >= 100 && description.length <= 200) score += 15;
  else score += 5;

  // Keywords count (ideal: 5-10)
  if (keywords.length >= 5 && keywords.length <= 10) score += 25;
  else if (keywords.length >= 3) score += 15;
  else score += 5;

  // Contains target keywords
  const hasTargetKeyword = SEO_CONFIG.targetKeywords.some(keyword =>
    title.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword)
  );
  if (hasTargetKeyword) score += 25;
  else score += 10;

  return Math.min(score, 100);
}
