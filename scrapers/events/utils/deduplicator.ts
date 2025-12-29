/**
 * Deduplication System - Prevents duplicate events from being added
 * Checks by source ID (exact) and by title+date (fuzzy)
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScrapedEvent, DatabaseEvent } from '../types';

// Initialize Supabase client
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return supabase;
}

/**
 * Normalize text for comparison (lowercase, remove special chars, trim)
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity between two strings (0 to 1)
 * Uses Levenshtein distance normalized by max length
 */
function stringSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);

  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  // Simple word overlap for performance
  const words1 = new Set(s1.split(' '));
  const words2 = new Set(s2.split(' '));

  const intersection = [...words1].filter(word => words2.has(word)).length;
  const union = new Set([...words1, ...words2]).size;

  return intersection / union;
}

/**
 * Check if an event is a duplicate by exact source match
 */
export async function isDuplicateBySource(
  sourceName: string,
  sourceEventId: string
): Promise<boolean> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('events')
    .select('id')
    .eq('source_name', sourceName)
    .eq('source_event_id', sourceEventId)
    .limit(1);

  if (error) {
    console.error('[Dedup] Error checking source duplicate:', error);
    return false;
  }

  return data !== null && data.length > 0;
}

/**
 * Check if an event is a duplicate by title and date (fuzzy match)
 * This catches cross-source duplicates
 */
export async function isDuplicateByTitleDate(
  title: string,
  date: string,
  venueName?: string
): Promise<boolean> {
  const supabase = getSupabase();

  // Get events on the same date
  const { data: sameDate, error } = await supabase
    .from('events')
    .select('id, title, venue_name')
    .eq('date', date);

  if (error) {
    console.error('[Dedup] Error checking title/date duplicate:', error);
    return false;
  }

  if (!sameDate || sameDate.length === 0) {
    return false;
  }

  // Check for similar titles
  const normalizedTitle = normalizeText(title);

  for (const event of sameDate) {
    const eventTitle = normalizeText(event.title || '');
    const similarity = stringSimilarity(normalizedTitle, eventTitle);

    // High similarity threshold for title match
    if (similarity > 0.7) {
      console.log(`[Dedup] Found similar event: "${event.title}" (similarity: ${similarity.toFixed(2)})`);
      return true;
    }

    // Lower threshold if venue also matches
    if (venueName && event.venue_name && similarity > 0.5) {
      const venueMatch = stringSimilarity(venueName, event.venue_name) > 0.7;
      if (venueMatch) {
        console.log(`[Dedup] Found similar event with venue match: "${event.title}"`);
        return true;
      }
    }
  }

  return false;
}

/**
 * Check if a scraped event is a duplicate (combines all checks)
 */
export async function isDuplicate(event: ScrapedEvent): Promise<boolean> {
  // First check by source (fast, exact match)
  if (event.source_event_id) {
    const bySource = await isDuplicateBySource(event.source_name, event.source_event_id);
    if (bySource) {
      console.log(`[Dedup] Duplicate by source: ${event.title}`);
      return true;
    }
  }

  // Then check by title/date (slower, fuzzy match)
  const byTitleDate = await isDuplicateByTitleDate(event.title, event.date, event.venue_name);
  if (byTitleDate) {
    console.log(`[Dedup] Duplicate by title/date: ${event.title}`);
    return true;
  }

  return false;
}

/**
 * Find an existing event that matches the scraped event
 */
export async function findExistingEvent(event: ScrapedEvent): Promise<DatabaseEvent | null> {
  const supabase = getSupabase();

  // First try exact source match
  if (event.source_event_id) {
    const { data: bySource } = await supabase
      .from('events')
      .select('*')
      .eq('source_name', event.source_name)
      .eq('source_event_id', event.source_event_id)
      .limit(1)
      .single();

    if (bySource) {
      return bySource as DatabaseEvent;
    }
  }

  // Then try title + date
  const { data: sameDate } = await supabase
    .from('events')
    .select('*')
    .eq('date', event.date);

  if (!sameDate || sameDate.length === 0) {
    return null;
  }

  const normalizedTitle = normalizeText(event.title);

  for (const existing of sameDate) {
    const eventTitle = normalizeText(existing.title || '');
    if (stringSimilarity(normalizedTitle, eventTitle) > 0.7) {
      return existing as DatabaseEvent;
    }
  }

  return null;
}

/**
 * Update last_scraped_at for an existing event
 */
export async function updateLastScraped(eventId: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from('events')
    .update({ last_scraped_at: new Date().toISOString() })
    .eq('id', eventId);

  if (error) {
    console.error('[Dedup] Error updating last_scraped_at:', error);
  }
}

/**
 * Filter out duplicates from a batch of scraped events
 * Returns only unique events that should be added
 */
export async function filterDuplicates(
  events: ScrapedEvent[],
  onProgress?: (checked: number, total: number, duplicates: number) => void
): Promise<ScrapedEvent[]> {
  const uniqueEvents: ScrapedEvent[] = [];
  let duplicateCount = 0;

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const isDup = await isDuplicate(event);

    if (!isDup) {
      uniqueEvents.push(event);
    } else {
      duplicateCount++;
    }

    if (onProgress) {
      onProgress(i + 1, events.length, duplicateCount);
    }
  }

  console.log(`[Dedup] ${events.length} events checked, ${duplicateCount} duplicates, ${uniqueEvents.length} unique`);
  return uniqueEvents;
}
