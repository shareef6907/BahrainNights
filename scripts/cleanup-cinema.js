/**
 * Cinema Cleanup Script
 *
 * Marks movies as inactive if:
 * 1. They haven't been updated in 7 days (no longer showing)
 * 2. They are not from supported cinemas (VOX or Cineco)
 *
 * Run after cinema scrapers (VOX + Cineco)
 */

// Load .env.local for local development
try {
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv might not be installed in production
}

const { createClient } = require('@supabase/supabase-js');

// Support both env var names
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Movies older than this (in days) without updates will be marked inactive
const STALE_DAYS = 7;

async function cleanupCinema() {
  console.log('='.repeat(60));
  console.log('CINEMA CLEANUP SCRIPT');
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  let cleaned = 0;
  let deactivated = 0;
  let errors = 0;

  try {
    // Calculate stale date
    const staleDate = new Date();
    staleDate.setDate(staleDate.getDate() - STALE_DAYS);
    const staleDateStr = staleDate.toISOString();

    console.log(`\nDeactivating movies not updated since: ${staleDateStr}`);

    // 1. Mark movies as inactive if they haven't been updated in 7 days and are still showing
    const { data: staleMovies, error: staleError } = await supabase
      .from('movies')
      .select('id, title, updated_at, scraped_from')
      .lt('updated_at', staleDateStr)
      .or('is_now_showing.eq.true,is_coming_soon.eq.true');

    if (staleError) {
      console.error('Error fetching stale movies:', staleError.message);
    } else {
      console.log(`\nFound ${staleMovies?.length || 0} stale movies to deactivate`);

      for (const movie of staleMovies || []) {
        try {
          await supabase
            .from('movies')
            .update({
              is_now_showing: false,
              is_coming_soon: false,
              updated_at: new Date().toISOString()
            })
            .eq('id', movie.id);

          console.log(`  Deactivated: ${movie.title} (last updated: ${movie.updated_at})`);
          deactivated++;
        } catch (err) {
          console.error(`  Error deactivating ${movie.title}:`, err.message);
          errors++;
        }
      }
    }

    // 2. Remove non-VOX sources from scraped_from array
    // (Keep movies but remove invalid cinema sources)
    console.log('\nCleaning up non-VOX cinema sources...');

    // NOTE: We now support multiple cinemas (VOX and Cineco)
    // Only clean up sources that are no longer valid (cinepolis, mukta, etc)
    const { data: allMovies, error: fetchError } = await supabase
      .from('movies')
      .select('id, title, scraped_from')
      .not('scraped_from', 'is', null);

    if (fetchError) {
      console.error('Error fetching movies:', fetchError.message);
    } else {
      for (const movie of allMovies || []) {
        const currentSources = movie.scraped_from || [];
        // Keep 'vox' and 'cineco' in scraped_from (remove cinepolis, mukta, etc)
        const validSources = currentSources.filter(s =>
          s.toLowerCase() === 'vox' || s.toLowerCase() === 'cineco'
        );

        // Only update if sources changed (removed invalid sources)
        if (validSources.length !== currentSources.length) {
          const updateData = {
            scraped_from: validSources.length > 0 ? validSources : null,
            updated_at: new Date().toISOString()
          };

          // If no valid sources left and movie is still showing, deactivate it
          if (validSources.length === 0) {
            updateData.is_now_showing = false;
            updateData.is_coming_soon = false;
          }

          await supabase
            .from('movies')
            .update(updateData)
            .eq('id', movie.id);

          console.log(`  Cleaned sources for: ${movie.title} (${currentSources.join(', ')} -> ${validSources.join(', ') || 'none'})`);
          cleaned++;
        }
      }
    }

    // 3. Log cleanup run
    await supabase
      .from('agent_logs')
      .insert({
        agent_name: 'cinema_cleanup',
        agent_type: 'cinema_cleanup',
        status: errors > 0 ? 'completed_with_errors' : 'completed',
        details: {
          deactivated_count: deactivated,
          cleaned_sources: cleaned,
          errors: errors,
          stale_days: STALE_DAYS
        },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      });

  } catch (error) {
    console.error('Cleanup error:', error.message);
    errors++;
  }

  console.log('\n' + '='.repeat(60));
  console.log('CLEANUP SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Movies deactivated: ${deactivated}`);
  console.log(`  Sources cleaned: ${cleaned}`);
  console.log(`  Errors: ${errors}`);
  console.log('\nCompleted at:', new Date().toISOString());
}

// Run cleanup
cleanupCinema().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
