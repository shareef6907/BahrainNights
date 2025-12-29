/**
 * Event Scraper Orchestrator
 * Main entry point that runs all scrapers and processes events
 *
 * Features:
 * - Robots.txt compliance checking
 * - Rate limiting between sources
 * - Proper bot identification
 * - Error handling and recovery
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScrapedEvent, DatabaseEvent, ScraperResult } from './types';
import { scrapeBahrainCalendar } from './sources/bahrain-calendar';
import { scrapePlatinumlistEvents } from './sources/platinumlist-events';
import { scrapePlatinumlistAttractions } from './sources/platinumlist-attractions';
import { scrapeAlDana } from './sources/aldana';
import { rewriteEventContent } from './utils/ai-rewriter';
import { processEventImage, generateSlug } from './utils/image-processor';
import { isDuplicate, findExistingEvent, updateLastScraped } from './utils/deduplicator';
import { preCheckAllSources, checkSourcePermission } from './utils/robots-checker';
import { sleep, scraperLog } from './utils/request-helper';
import { SCRAPER_CONFIG } from './config';

// Initialize Supabase client
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    }

    supabase = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabase;
}

// Generate a unique slug for an event
function createUniqueSlug(title: string, date: string): string {
  const baseSlug = generateSlug(title);
  const dateSlug = date.replace(/-/g, '');
  return `${baseSlug}-${dateSlug}`;
}

/**
 * Validate event data quality before processing
 * Returns true if event is valid, false if it should be skipped
 */
function isValidEvent(event: ScrapedEvent): { valid: boolean; reason?: string } {
  // Skip garbage/button-like titles
  const skipTitles = [
    'buy now', 'get tickets', 'book now', 'learn more', 'read more',
    'view details', 'click here', 'register now', 'sign up', 'purchase',
    'buy tickets', 'get started', 'view event', 'see more', 'view more',
  ];
  const lowerTitle = event.title.toLowerCase().trim();
  if (skipTitles.some(skip => lowerTitle === skip || lowerTitle.includes(skip))) {
    return { valid: false, reason: `Button-like title: "${event.title}"` };
  }

  // Require minimum title length (3+ words or 10+ characters)
  const wordCount = event.title.trim().split(/\s+/).length;
  if (event.title.length < 10 && wordCount < 3) {
    return { valid: false, reason: `Title too short: "${event.title}"` };
  }

  // Title max length check (prevent garbage data)
  if (event.title.length > 200) {
    return { valid: false, reason: `Title too long: ${event.title.length} chars` };
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(event.date)) {
    return { valid: false, reason: `Invalid date format: "${event.date}"` };
  }

  // Check date is not too far in past (allow 1 day buffer for timezone issues)
  const eventDate = new Date(event.date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (eventDate < yesterday) {
    return { valid: false, reason: `Past event: ${event.date}` };
  }

  // Check date is not too far in future (2 years max)
  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
  if (eventDate > twoYearsFromNow) {
    return { valid: false, reason: `Date too far in future: ${event.date}` };
  }

  // Require venue name
  if (!event.venue_name || event.venue_name.trim().length < 2) {
    return { valid: false, reason: 'Missing venue name' };
  }

  // Require source URL
  if (!event.source_url || !event.source_url.startsWith('http')) {
    return { valid: false, reason: 'Missing or invalid source URL' };
  }

  // Require source name
  if (!event.source_name || event.source_name.trim().length < 2) {
    return { valid: false, reason: 'Missing source name' };
  }

  return { valid: true };
}

// Insert event into database
async function insertEvent(event: ScrapedEvent, rewritten: { title: string; description: string; category: string }, imageUrl: string | null): Promise<boolean> {
  const db = getSupabase();

  const slug = createUniqueSlug(rewritten.title, event.date);

  const dbEvent: Partial<DatabaseEvent> = {
    title: rewritten.title,
    slug,
    description: rewritten.description,
    category: rewritten.category,
    date: event.date,
    time: event.time,
    end_date: event.end_date,
    end_time: event.end_time,
    venue_name: event.venue_name,
    venue_address: event.venue_address,
    price: event.price,
    cover_url: imageUrl || undefined,
    booking_url: event.booking_url,
    source_url: event.source_url,
    source_name: event.source_name,
    source_event_id: event.source_event_id,
    last_scraped_at: new Date().toISOString(),
    status: 'published', // Auto-publish scraped events
    is_featured: false,
  };

  try {
    const { error } = await db.from('events').insert(dbEvent);

    if (error) {
      // Check if it's a duplicate key error
      if (error.code === '23505') {
        console.log(`[Orchestrator] Event already exists (duplicate key): ${rewritten.title}`);
        return false;
      }

      console.error(`[Orchestrator] Insert error for "${rewritten.title}":`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[Orchestrator] Insert exception for "${rewritten.title}":`, error);
    return false;
  }
}

// Update existing event with fresh data
async function updateEvent(eventId: string, event: ScrapedEvent, rewritten: { title: string; description: string; category: string }, imageUrl: string | null): Promise<boolean> {
  const db = getSupabase();

  const updates: Partial<DatabaseEvent> = {
    title: rewritten.title,
    description: rewritten.description,
    category: rewritten.category,
    date: event.date,
    time: event.time,
    venue_name: event.venue_name,
    venue_address: event.venue_address,
    price: event.price,
    booking_url: event.booking_url,
    last_scraped_at: new Date().toISOString(),
  };

  // Only update image if we got a new one
  if (imageUrl) {
    updates.cover_url = imageUrl;
  }

  try {
    const { error } = await db
      .from('events')
      .update(updates)
      .eq('id', eventId);

    if (error) {
      console.error(`[Orchestrator] Update error:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[Orchestrator] Update exception:`, error);
    return false;
  }
}

// Process a single event
async function processEvent(event: ScrapedEvent, stats: ScraperStats): Promise<void> {
  try {
    // Validate event data quality first
    const validation = isValidEvent(event);
    if (!validation.valid) {
      console.log(`[Orchestrator] Skipping invalid event: ${validation.reason}`);
      stats.skipped++;
      return;
    }

    // Check for duplicates
    const existing = await findExistingEvent(event);

    if (existing) {
      console.log(`[Orchestrator] Updating existing: ${event.title}`);
      await updateLastScraped(existing.id!);
      stats.updated++;
      return;
    }

    // Skip if definitely a duplicate
    if (await isDuplicate(event)) {
      console.log(`[Orchestrator] Skipping duplicate: ${event.title}`);
      stats.skipped++;
      return;
    }

    // Rewrite content with AI (if description exists)
    let rewritten = {
      title: event.title,
      description: event.description || `Experience ${event.title} at ${event.venue_name} in Bahrain.`,
      category: event.category,
    };

    if (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY) {
      try {
        console.log(`[Orchestrator] Rewriting content for: ${event.title}`);
        rewritten = await rewriteEventContent(event);
      } catch (error) {
        console.warn(`[Orchestrator] AI rewrite failed, using original content:`, error);
      }
    } else {
      console.log(`[Orchestrator] No AI key, using original content for: ${event.title}`);
    }

    // Process image
    let imageUrl: string | null = null;
    if (event.image_url) {
      try {
        console.log(`[Orchestrator] Processing image for: ${rewritten.title}`);
        const slug = generateSlug(rewritten.title);
        imageUrl = await processEventImage(event.image_url, slug, event.source_name);
      } catch (error) {
        console.warn(`[Orchestrator] Image processing failed:`, error);
      }
    }

    // Insert into database
    const inserted = await insertEvent(event, rewritten, imageUrl);

    if (inserted) {
      console.log(`[Orchestrator] Added: ${rewritten.title}`);
      stats.added++;
    } else {
      stats.failed++;
    }
  } catch (error) {
    console.error(`[Orchestrator] Error processing "${event.title}":`, error);
    stats.failed++;
  }
}

interface ScraperStats {
  total: number;
  added: number;
  updated: number;
  skipped: number;
  failed: number;
}

/**
 * Run a single scraper with error handling
 */
async function runScraper(
  name: string,
  scraperFn: () => Promise<ScrapedEvent[]>
): Promise<ScraperResult> {
  const startTime = Date.now();
  const errors: string[] = [];

  try {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Starting scraper: ${name}`);
    console.log(`${'='.repeat(50)}\n`);

    const events = await scraperFn();

    return {
      source: name,
      events,
      errors,
      duration_ms: Date.now() - startTime,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    errors.push(errorMsg);
    console.error(`[${name}] Scraper failed:`, errorMsg);

    return {
      source: name,
      events: [],
      errors,
      duration_ms: Date.now() - startTime,
    };
  }
}

/**
 * Main orchestrator function - runs all scrapers
 */
export async function runEventScrapers(): Promise<void> {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║          BahrainNights Event Scraper Orchestrator            ║');
  console.log('║                Starting automated scraping...                 ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('\n');

  const overallStartTime = Date.now();
  const allEvents: ScrapedEvent[] = [];
  const scraperResults: ScraperResult[] = [];

  // Pre-check robots.txt for all sources
  scraperLog.info('Orchestrator', 'Checking robots.txt for all sources...');
  const robotsPermissions = await preCheckAllSources();

  // Define all scrapers with their base URLs for robots.txt checking
  // NOTE: Platinumlist scrapers disabled until business agreement is in place
  const scrapers: Array<{
    name: string;
    baseUrl: string;
    fn: () => Promise<ScrapedEvent[]>;
  }> = [
    { name: 'Bahrain Calendar', baseUrl: 'https://www.bahrain.com', fn: scrapeBahrainCalendar },
    // DISABLED: Platinumlist scrapers - awaiting business agreement
    // { name: 'Platinumlist Events', baseUrl: 'https://manama.platinumlist.net', fn: scrapePlatinumlistEvents },
    // { name: 'Platinumlist Attractions', baseUrl: 'https://manama.platinumlist.net', fn: scrapePlatinumlistAttractions },
    // DISABLED: Al Dana scraper - producing low-quality data, needs fixing
    // { name: 'Al Dana Amphitheatre', baseUrl: 'https://www.beyonaldana.com.bh', fn: scrapeAlDana },
  ];

  // Run scrapers sequentially to avoid overwhelming resources
  for (const scraper of scrapers) {
    // Check if scraping is allowed by robots.txt
    const permission = robotsPermissions.get(scraper.name);
    if (permission && !permission.allowed) {
      scraperLog.warn('Orchestrator', `Skipping ${scraper.name} - disallowed by robots.txt`);
      scraperResults.push({
        source: scraper.name,
        events: [],
        errors: ['Skipped: disallowed by robots.txt'],
        duration_ms: 0,
      });
      continue;
    }

    const result = await runScraper(scraper.name, scraper.fn);
    scraperResults.push(result);
    allEvents.push(...result.events);

    // Rate limiting: delay between sources using config
    scraperLog.info('Orchestrator', `Waiting ${SCRAPER_CONFIG.delays.betweenSources / 1000}s before next source...`);
    await sleep(SCRAPER_CONFIG.delays.betweenSources);
  }

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    Processing Events                          ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('\n');

  console.log(`Total events scraped: ${allEvents.length}`);

  // Process each event
  const stats: ScraperStats = {
    total: allEvents.length,
    added: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  for (let i = 0; i < allEvents.length; i++) {
    const event = allEvents[i];
    console.log(`\n[${i + 1}/${allEvents.length}] Processing: ${event.title}`);
    await processEvent(event, stats);

    // Rate limit: small delay between events
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Print summary
  const totalDuration = Date.now() - overallStartTime;

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                       SCRAPING COMPLETE                       ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('\n');

  console.log('Scraper Results:');
  console.log('─'.repeat(50));
  for (const result of scraperResults) {
    console.log(`  ${result.source}: ${result.events.length} events (${result.duration_ms}ms)`);
    if (result.errors.length > 0) {
      result.errors.forEach(err => console.log(`    ⚠️ ${err}`));
    }
  }

  console.log('\nProcessing Stats:');
  console.log('─'.repeat(50));
  console.log(`  Total scraped:  ${stats.total}`);
  console.log(`  ✅ Added:       ${stats.added}`);
  console.log(`  🔄 Updated:     ${stats.updated}`);
  console.log(`  ⏭️  Skipped:     ${stats.skipped}`);
  console.log(`  ❌ Failed:      ${stats.failed}`);
  console.log(`\nTotal duration: ${(totalDuration / 1000).toFixed(1)}s`);
  console.log('\n');
}

// CLI entry point
if (require.main === module) {
  runEventScrapers()
    .then(() => {
      console.log('Orchestrator finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Orchestrator failed:', error);
      process.exit(1);
    });
}

export default runEventScrapers;
