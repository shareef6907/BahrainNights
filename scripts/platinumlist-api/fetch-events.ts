import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get directory of current file for proper path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from project root (handles running from any directory)
dotenv.config({ path: resolve(__dirname, '../../.env.local') });
dotenv.config({ path: resolve(__dirname, '../../.env') });

import { createClient } from '@supabase/supabase-js';
import type { PlatinumlistEvent, DbEvent, ApiResponse } from './types.js';
import {
  fetchFromPlatinumlist,
  generateAffiliateUrl,
  generateSlug,
  cleanDescription,
  log,
  sleep,
  isBahrainEvent,
  extractVenueFromImageUrl,
  detectCountry,
  extractCity,
} from './utils.js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Convert Unix timestamp to ISO date string in event's timezone
 * Uses the event's timezone (defaults to Asia/Bahrain for Bahrain events)
 */
function unixToDate(timestamp: number, timezone: string = 'Asia/Bahrain'): string {
  const date = new Date(timestamp * 1000);
  // Format as YYYY-MM-DD in the event's timezone
  return date.toLocaleDateString('en-CA', { timeZone: timezone });
}

/**
 * Convert Unix timestamp to time string (HH:MM) in event's timezone
 * IMPORTANT: Must use event's timezone, not server timezone (Vercel runs in UTC)
 */
function unixToTime(timestamp: number, timezone: string = 'Asia/Bahrain'): string {
  const date = new Date(timestamp * 1000);
  // Format as HH:MM in the event's timezone
  return date.toLocaleTimeString('en-GB', { 
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });
}

/**
 * Detect category from event name/description
 */
function detectCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();

  if (text.includes('concert') || text.includes('music') || text.includes('live band')) {
    return 'concerts';
  }
  if (text.includes('comedy') || text.includes('stand-up') || text.includes('standup')) {
    return 'comedy';
  }
  if (text.includes('club') || text.includes('party') || text.includes('dj') || text.includes('nightlife')) {
    return 'nightlife';
  }
  if (text.includes('sport') || text.includes('football') || text.includes('racing') || text.includes('match')) {
    return 'sports';
  }
  if (text.includes('theatre') || text.includes('theater') || text.includes('play') || text.includes('drama')) {
    return 'cultural';
  }
  if (text.includes('family') || text.includes('kids') || text.includes('children')) {
    return 'family';
  }

  return 'events';
}

/**
 * Transform Platinumlist event to database format
 */
function transformEvent(event: PlatinumlistEvent): DbEvent {
  const price = event.price?.data?.price;
  const currency = event.price?.data?.currency || 'BHD';

  // Parse price - API returns -1 for "contact for price" or sold out
  // DB stores price as STRING, format: "From X BHD" or null
  const priceString = price > 0 ? `${price}` : null;

  // Extract venue name - try multiple methods
  let venueName: string | null = null;

  // Method 1: Extract from event name pattern "at [Venue]"
  const nameMatch = event.name.match(/at\s+(.+)$/i);
  if (nameMatch) {
    venueName = nameMatch[1].trim();
  }

  // Method 2: Extract from image URL if not found in name
  // Image URLs contain venue info in format: {event}_{date}_{venue}_{id}-size.ext
  if (!venueName) {
    const imageUrl = event.image_full?.src || event.image_big?.src;
    venueName = extractVenueFromImageUrl(imageUrl, event.id);
  }

  // Detect country and city
  const countryConfig = detectCountry(event);
  const country = countryConfig?.name || 'Bahrain';
  const city = countryConfig ? extractCity(event.name, countryConfig) : null;

  // Use event's timezone from API, fallback to country-based timezone
  const timezone = event.timezone || countryConfig?.timezone || 'Asia/Bahrain';

  const startDate = unixToDate(event.start, timezone);
  const startTime = unixToTime(event.start, timezone);

  return {
    title: event.name,
    slug: generateSlug(event.name, event.id),
    description: cleanDescription(event.description),
    description_ar: null,
    category: detectCategory(event.name, event.description || ''),
    tags: null,
    venue_name: venueName,
    date: startDate,  // Required NOT NULL column
    time: startTime,
    start_date: startDate,
    end_date: unixToDate(event.end, timezone),
    start_time: startTime,
    end_time: unixToTime(event.end, timezone),
    price: priceString,
    price_currency: currency,
    featured_image: event.image_full?.src || event.image_big?.src || null,
    cover_url: event.image_full?.src || event.image_big?.src || null,
    booking_url: event.url,
    affiliate_url: generateAffiliateUrl(event.url),
    source_name: 'platinumlist',
    source_url: event.url,
    source_event_id: String(event.id),
    status: 'published',
    is_featured: false,
    is_active: true,
    country: country,
    city: city,
  };
}

/**
 * Fetch all events from Platinumlist API
 */
async function fetchAllEvents(): Promise<PlatinumlistEvent[]> {
  const allEvents: PlatinumlistEvent[] = [];
  let page = 1;
  const perPage = 50;
  // Runaway guard only. The real end of the feed is decided by the API's own
  // pagination metadata below -- NEVER by a hardcoded page count. A fixed cap
  // silently truncates the feed the moment it grows, and because the feed is
  // ordered oldest-first, the events that get dropped are the newest ones.
  const maxPages = 2000; // runaway guard, not a page count
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    log(`Fetching events page ${page}...`);

    const response = await fetchFromPlatinumlist<ApiResponse<PlatinumlistEvent>>(
      `/events?page=${page}&per_page=${perPage}`
    );

    if (!response || !response.data || response.data.length === 0) {
      hasMore = false;
      break;
    }

    // Filter for Bahrain events that are not sold out and are not pure attractions
    const bahrainEvents = response.data.filter(e => {
      // Must be from Bahrain
      if (!isBahrainEvent(e)) return false;

      // Skip attractions (they go to attractions table)
      if (e.is_attraction) return false;

      // Must have tickets available (on sale)
      if (e.status === 'sold out') return false;

      return true;
    });

    log(`Found ${bahrainEvents.length} Bahrain events on page ${page} (filtered from ${response.data.length})`);
    allEvents.push(...bahrainEvents);

    // Check pagination
    if (response.meta?.pagination) {
      hasMore = page < response.meta.pagination.total_pages;
    } else {
      hasMore = response.data.length === perPage;
    }

    page++;
    await sleep(300); // Rate limiting
  }

  return allEvents;
}

/**
 * Upsert events to database
 */
async function upsertEvents(events: DbEvent[]): Promise<{ inserted: number; updated: number; errors: number }> {
  const stats = { inserted: 0, updated: 0, errors: 0 };

  for (const event of events) {
    try {
      // Check if event exists by source_event_id (Platinumlist ID)
      const { data: existing } = await supabase
        .from('events')
        .select('id')
        .eq('source_name', 'platinumlist')
        .eq('source_event_id', event.source_event_id)
        .single();

      if (existing) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update({
            ...event,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (error) {
          log(`Error updating event "${event.title}": ${error.message}`, 'error');
          stats.errors++;
        } else {
          stats.updated++;
        }
      } else {
        // Insert new event
        const { error } = await supabase
          .from('events')
          .insert({
            ...event,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (error) {
          log(`Error inserting event "${event.title}": ${error.message}`, 'error');
          stats.errors++;
        } else {
          stats.inserted++;
        }
      }
    } catch (error) {
      log(`Exception for event "${event.title}": ${error}`, 'error');
      stats.errors++;
    }
  }

  return stats;
}

/**
 * Retain past events.
 *
 * These rows used to be hard-deleted once their end_date passed. Every one of
 * them had a page Google had already indexed, so deleting the row turned an
 * indexed page into a 404 that kept earning impressions and clicks - a steady,
 * self-inflicted leak.
 *
 * They are now simply left in place: the event page keeps resolving (200) and
 * its existing ranking is preserved, while the public listings already filter
 * on start_date/end_date so a finished event never appears in the feeds.
 *
 * Nothing is deleted or hidden here on purpose.
 */
async function cleanupPastEvents(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];

  const { count, error } = await supabase
    .from('events')
    .select('id', { count: 'exact', head: true })
    .eq('source_name', 'platinumlist')
    .lt('end_date', today);

  if (error) {
    log(`Error counting past events: ${error.message}`, 'error');
    return 0;
  }

  return count || 0;
}

/**
 * Main function to fetch and sync events
 */
export async function fetchEvents(): Promise<void> {
  log('🎫 Starting Platinumlist Events Sync', 'info');
  console.log('='.repeat(50));

  try {
    // Step 1: Fetch all events from API
    log('Fetching events from Platinumlist API...', 'info');
    const apiEvents = await fetchAllEvents();
    log(`Fetched ${apiEvents.length} Bahrain events from API`, 'success');

    if (apiEvents.length === 0) {
      log('No Bahrain events found from API.', 'warn');
    } else {
      // Step 2: Transform events
      log('Transforming events...', 'info');
      const dbEvents = apiEvents.map(transformEvent);
      log(`Transformed ${dbEvents.length} events`, 'success');

      // Step 3: Upsert to database
      log('Upserting events to database...', 'info');
      const stats = await upsertEvents(dbEvents);
      log(`Inserted: ${stats.inserted}, Updated: ${stats.updated}, Errors: ${stats.errors}`, 'success');
    }

    // Step 4: Cleanup past events
    log('Cleaning up past events...', 'info');
    const cleaned = await cleanupPastEvents();
    log(`Retained ${cleaned} past events (kept so their URLs stay live)`, 'success');

    // Summary
    console.log('='.repeat(50));
    log('🎉 Events sync completed!', 'success');

  } catch (error) {
    log(`Fatal error during events sync: ${error}`, 'error');
    throw error;
  }
}

// Run if executed directly
// Use fileURLToPath to handle URL encoding in paths with spaces
const isMainModule = fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  fetchEvents()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
