import { createClient } from '@supabase/supabase-js';
import { scrapePlatinumlistEvents, filterActiveEvents, generateAffiliateUrl } from './events-scraper';
import { ScrapedEvent, EventsScraperResult } from './events-types';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AFFILIATE_CODE = process.env.PLATINUMLIST_AFFILIATE_CODE || 'yjg3yzi';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100)
    .trim();
}

// Convert scraped event to database format
function toDbFormat(event: ScrapedEvent) {
  const slug = generateSlug(event.title);
  // Use startDate or default to today if not available
  const eventDate = event.startDate || new Date().toISOString().split('T')[0];

  return {
    title: event.title,
    slug: slug,
    description: event.description,
    category: event.category,
    venue_name: event.venue,
    venue_address: event.location,
    date: eventDate, // Required field
    start_date: event.startDate,
    end_date: event.endDate,
    time: event.startTime, // Also set time field
    start_time: event.startTime,
    price: event.price ? `${event.price} BHD` : null,
    price_min: event.price,
    price_currency: event.priceCurrency,
    image_url: event.imageUrl,
    thumbnail: event.imageUrl,
    cover_url: event.coverUrl || event.imageUrl,
    source_url: event.originalUrl,
    source_name: 'platinumlist',
    source_event_id: event.externalId,
    affiliate_url: event.affiliateUrl,
    booking_url: event.affiliateUrl,
    is_active: true,
    is_hidden: false,
    status: 'published',
    last_scraped_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Bulk upsert events
async function bulkUpsertEvents(events: ScrapedEvent[]): Promise<number> {
  if (events.length === 0) return 0;

  let totalUpserted = 0;
  const batchSize = 50;

  for (let i = 0; i < events.length; i += batchSize) {
    const batch = events.slice(i, i + batchSize);
    const dbRecords = batch.map(toDbFormat);

    // Since source_url has unique constraint, use upsert
    const { data, error } = await supabase
      .from('events')
      .upsert(dbRecords, {
        onConflict: 'source_url',
        ignoreDuplicates: false,
      })
      .select();

    if (error) {
      console.error(`Error upserting events batch ${i / batchSize + 1}:`, error);
      // Continue with next batch
    } else {
      totalUpserted += data?.length || 0;
    }
  }

  return totalUpserted;
}

// Deactivate events not in the latest scrape
async function deactivateStaleEvents(scrapedUrls: string[]): Promise<number> {
  // Get all active platinumlist events
  const { data: activeEvents, error: fetchError } = await supabase
    .from('events')
    .select('source_url')
    .eq('source_name', 'platinumlist')
    .eq('is_active', true);

  if (fetchError) {
    console.error('Error fetching active events:', fetchError);
    throw new Error('Failed to fetch active events');
  }

  const activeUrls = activeEvents?.map(e => e.source_url).filter(Boolean) as string[] || [];
  const staleUrls = activeUrls.filter(url => !scrapedUrls.includes(url));

  if (staleUrls.length === 0) {
    console.log('No stale events to deactivate');
    return 0;
  }

  // Deactivate in batches
  const batchSize = 100;
  let totalDeactivated = 0;

  for (let i = 0; i < staleUrls.length; i += batchSize) {
    const batch = staleUrls.slice(i, i + batchSize);

    const { error: updateError } = await supabase
      .from('events')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .in('source_url', batch);

    if (updateError) {
      console.error('Error deactivating batch:', updateError);
    } else {
      totalDeactivated += batch.length;
    }
  }

  console.log(`Deactivated ${totalDeactivated} stale events`);
  return totalDeactivated;
}

// Main function
async function main(): Promise<EventsScraperResult> {
  const startTime = Date.now();
  const errors: string[] = [];

  console.log('='.repeat(50));
  console.log('Platinumlist Events Scraper - Starting');
  console.log('='.repeat(50));
  console.log(`Affiliate Code: ${AFFILIATE_CODE}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('');

  try {
    // Step 1: Scrape Platinumlist Events
    console.log('Step 1: Scraping Platinumlist Events...');
    const scrapedEvents = await scrapePlatinumlistEvents({
      affiliateCode: AFFILIATE_CODE,
    });
    console.log(`Scraped ${scrapedEvents.length} events`);

    // Step 2: Filter out past events
    console.log('\nStep 2: Filtering active events...');
    const activeEvents = filterActiveEvents(scrapedEvents);
    console.log(`${activeEvents.length} active events after filtering`);

    // Step 3: Upsert to database
    console.log('\nStep 3: Upserting to database...');
    const totalUpserted = await bulkUpsertEvents(activeEvents);
    console.log(`Upserted ${totalUpserted} events`);

    // Step 4: Deactivate stale events
    console.log('\nStep 4: Deactivating stale events...');
    const scrapedUrls = activeEvents.map((e: ScrapedEvent) => e.originalUrl);
    const totalDeactivated = await deactivateStaleEvents(scrapedUrls);

    const duration = (Date.now() - startTime) / 1000;

    console.log('\n' + '='.repeat(50));
    console.log('Events Scraper Complete');
    console.log('='.repeat(50));
    console.log(`Total scraped: ${scrapedEvents.length}`);
    console.log(`Total upserted: ${totalUpserted}`);
    console.log(`Total deactivated: ${totalDeactivated}`);
    console.log(`Duration: ${duration.toFixed(2)}s`);
    console.log(`Errors: ${errors.length}`);

    return {
      success: true,
      totalScraped: scrapedEvents.length,
      totalUpserted,
      totalDeactivated,
      errors,
      duration,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(errorMessage);
    console.error('\nEvents scraper failed:', errorMessage);

    return {
      success: false,
      totalScraped: 0,
      totalUpserted: 0,
      totalDeactivated: 0,
      errors,
      duration: (Date.now() - startTime) / 1000,
    };
  }
}

// Run if called directly
main()
  .then(result => {
    console.log('\nResult:', JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

export { main as runPlatinumlistEventsScraper };
