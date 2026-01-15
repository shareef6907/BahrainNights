import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from project root
dotenv.config({ path: resolve(process.cwd(), '../../.env.local') });
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

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
} from './utils.js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Convert Unix timestamp to ISO date string
 */
function unixToDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString().split('T')[0];
}

/**
 * Convert Unix timestamp to time string (HH:MM)
 */
function unixToTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toTimeString().split(' ')[0].substring(0, 5);
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

  // Extract venue name from event name if it contains location info
  let venueName: string | null = null;
  const nameMatch = event.name.match(/at\s+(.+)$/i);
  if (nameMatch) {
    venueName = nameMatch[1].trim();
  }

  const startDate = unixToDate(event.start);
  const startTime = unixToTime(event.start);

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
    end_date: unixToDate(event.end),
    start_time: startTime,
    end_time: unixToTime(event.end),
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
  };
}

/**
 * Fetch all events from Platinumlist API
 */
async function fetchAllEvents(): Promise<PlatinumlistEvent[]> {
  const allEvents: PlatinumlistEvent[] = [];
  let page = 1;
  const perPage = 50;
  const maxPages = 30; // Safety limit
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
 * Remove past events from database
 */
async function cleanupPastEvents(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('events')
    .delete()
    .eq('source_name', 'platinumlist')
    .lt('end_date', today)
    .select('id');

  if (error) {
    log(`Error cleaning up past events: ${error.message}`, 'error');
    return 0;
  }

  return data?.length || 0;
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
    log(`Removed ${cleaned} past events`, 'success');

    // Summary
    console.log('='.repeat(50));
    log('🎉 Events sync completed!', 'success');

  } catch (error) {
    log(`Fatal error during events sync: ${error}`, 'error');
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchEvents()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
