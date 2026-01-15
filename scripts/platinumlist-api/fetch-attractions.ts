import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from project root
dotenv.config({ path: resolve(process.cwd(), '../../.env.local') });
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

import { createClient } from '@supabase/supabase-js';
import type { PlatinumlistEvent, DbAttraction, ApiResponse } from './types.js';
import {
  fetchFromPlatinumlist,
  generateAffiliateUrl,
  generateSlug,
  mapAttractionCategory,
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
 * Detect attraction category from name/description
 */
function detectAttractionCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();

  if (text.includes('boat') || text.includes('yacht') || text.includes('sailing') || text.includes('cruise')) {
    return 'boat-tours';
  }
  if (text.includes('water') || text.includes('diving') || text.includes('snorkel') || text.includes('swim')) {
    return 'water-sports';
  }
  if (text.includes('desert') || text.includes('safari') || text.includes('camel')) {
    return 'desert-safari';
  }
  if (text.includes('indoor') || text.includes('skydiving') || text.includes('bowling') || text.includes('game')) {
    return 'indoor-activities';
  }
  if (text.includes('theme park') || text.includes('amusement') || text.includes('adventure park')) {
    return 'theme-parks';
  }
  if (text.includes('tour') || text.includes('sightseeing') || text.includes('city')) {
    return 'tours';
  }
  if (text.includes('family') || text.includes('kids') || text.includes('children')) {
    return 'family-kids';
  }

  return 'attractions';
}

/**
 * Transform Platinumlist attraction to database format (attractions table)
 */
function transformAttraction(event: PlatinumlistEvent): DbAttraction {
  const price = event.price?.data?.price;
  const currency = event.price?.data?.currency || 'BHD';

  // Parse price - API returns -1 for "contact for price" or sold out
  const numericPrice = price > 0 ? price : null;
  const priceRange = numericPrice ? `From ${numericPrice} ${currency}` : null;

  const cleanedDesc = cleanDescription(event.description);

  // Round rating to 1 decimal place to fit DECIMAL(2,1) constraint
  const roundedRating = event.rating ? Math.round(event.rating * 10) / 10 : null;
  // Ensure rating is within valid range (0.0 - 9.9)
  const validRating = roundedRating ? Math.min(roundedRating, 9.9) : null;

  return {
    name: event.name,
    slug: generateSlug(event.name, event.id),
    description: cleanedDesc,
    short_description: event.text_teaser || (cleanedDesc ? cleanedDesc.substring(0, 200) : null),
    image_url: event.image_full?.src || event.image_big?.src || null,
    area: 'Bahrain',
    address: null,
    price_from: numericPrice,
    price_range: priceRange,
    currency: currency,
    rating: validRating,
    tags: null,
    category: detectAttractionCategory(event.name, event.description || ''),
    booking_url: generateAffiliateUrl(event.url),
    is_featured: false,
    is_active: true,
    source: 'platinumlist',
    source_id: String(event.id),
  };
}

/**
 * Fetch all attractions from Platinumlist API
 * Attractions are events with is_attraction = true
 */
async function fetchAllAttractions(): Promise<PlatinumlistEvent[]> {
  const allAttractions: PlatinumlistEvent[] = [];
  let page = 1;
  const perPage = 50;
  const maxPages = 30; // Safety limit
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    log(`Fetching attractions page ${page}...`);

    const response = await fetchFromPlatinumlist<ApiResponse<PlatinumlistEvent>>(
      `/events?page=${page}&per_page=${perPage}`
    );

    if (!response || !response.data || response.data.length === 0) {
      hasMore = false;
      break;
    }

    // Filter for Bahrain attractions that are available
    const bahrainAttractions = response.data.filter(e => {
      // Must be from Bahrain
      if (!isBahrainEvent(e)) return false;

      // Must be an attraction
      if (!e.is_attraction) return false;

      // Must be on sale (not sold out)
      if (e.status === 'sold out') return false;

      return true;
    });

    log(`Found ${bahrainAttractions.length} Bahrain attractions on page ${page} (filtered from ${response.data.length})`);
    allAttractions.push(...bahrainAttractions);

    // Check pagination
    if (response.meta?.pagination) {
      hasMore = page < response.meta.pagination.total_pages;
    } else {
      hasMore = response.data.length === perPage;
    }

    page++;
    await sleep(300); // Rate limiting
  }

  return allAttractions;
}

/**
 * Upsert attractions to database (attractions table)
 */
async function upsertAttractions(attractions: DbAttraction[]): Promise<{ inserted: number; updated: number; errors: number }> {
  const stats = { inserted: 0, updated: 0, errors: 0 };

  for (const attraction of attractions) {
    try {
      // Check if attraction exists by source_id (Platinumlist ID)
      const { data: existing } = await supabase
        .from('attractions')
        .select('id')
        .eq('source', 'platinumlist')
        .eq('source_id', attraction.source_id)
        .single();

      if (existing) {
        // Update existing attraction
        const { error } = await supabase
          .from('attractions')
          .update({
            ...attraction,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (error) {
          log(`Error updating attraction "${attraction.name}": ${error.message}`, 'error');
          stats.errors++;
        } else {
          stats.updated++;
        }
      } else {
        // Insert new attraction
        const { error } = await supabase
          .from('attractions')
          .insert({
            ...attraction,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (error) {
          log(`Error inserting attraction "${attraction.name}": ${error.message}`, 'error');
          stats.errors++;
        } else {
          stats.inserted++;
        }
      }
    } catch (error) {
      log(`Exception for attraction "${attraction.name}": ${error}`, 'error');
      stats.errors++;
    }
  }

  return stats;
}

/**
 * Deactivate attractions no longer in API
 */
async function deactivateRemovedAttractions(currentSourceIds: string[]): Promise<number> {
  if (currentSourceIds.length === 0) return 0;

  // Get all platinumlist attractions that are not in current list
  const { data: toDeactivate, error: fetchError } = await supabase
    .from('attractions')
    .select('id, source_id')
    .eq('source', 'platinumlist')
    .eq('is_active', true);

  if (fetchError) {
    log(`Error fetching attractions to deactivate: ${fetchError.message}`, 'error');
    return 0;
  }

  const idsToDeactivate = (toDeactivate || [])
    .filter(a => !currentSourceIds.includes(a.source_id))
    .map(a => a.id);

  if (idsToDeactivate.length === 0) return 0;

  const { error } = await supabase
    .from('attractions')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .in('id', idsToDeactivate);

  if (error) {
    log(`Error deactivating removed attractions: ${error.message}`, 'error');
    return 0;
  }

  return idsToDeactivate.length;
}

/**
 * Main function to fetch and sync attractions
 */
export async function fetchAttractions(): Promise<void> {
  log('🎯 Starting Platinumlist Attractions Sync', 'info');
  console.log('='.repeat(50));

  try {
    // Step 1: Fetch all attractions from API
    log('Fetching attractions from Platinumlist API...', 'info');
    const apiAttractions = await fetchAllAttractions();
    log(`Fetched ${apiAttractions.length} Bahrain attractions from API`, 'success');

    if (apiAttractions.length === 0) {
      log('No Bahrain attractions found from API.', 'warn');
      return;
    }

    // Step 2: Transform attractions
    log('Transforming attractions...', 'info');
    const dbAttractions = apiAttractions.map(transformAttraction);
    log(`Transformed ${dbAttractions.length} attractions`, 'success');

    // Step 3: Upsert to database
    log('Upserting attractions to database...', 'info');
    const stats = await upsertAttractions(dbAttractions);
    log(`Inserted: ${stats.inserted}, Updated: ${stats.updated}, Errors: ${stats.errors}`, 'success');

    // Step 4: Deactivate removed attractions
    log('Deactivating removed attractions...', 'info');
    const currentSourceIds = dbAttractions.map(a => a.source_id!);
    const deactivated = await deactivateRemovedAttractions(currentSourceIds);
    log(`Deactivated ${deactivated} attractions no longer in API`, 'success');

    // Summary
    console.log('='.repeat(50));
    log('🎉 Attractions sync completed!', 'success');
    console.log(`   📥 New attractions: ${stats.inserted}`);
    console.log(`   🔄 Updated: ${stats.updated}`);
    console.log(`   🔕 Deactivated: ${deactivated}`);
    console.log(`   ❌ Errors: ${stats.errors}`);

  } catch (error) {
    log(`Fatal error during attractions sync: ${error}`, 'error');
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAttractions()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
