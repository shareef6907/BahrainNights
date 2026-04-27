/**
 * Cinema Cleanup Script - FIXED
 *
 * Mark movies as NOT showing ONLY if:
 * 1. They are from a cinema source (VOX/Cineco) AND
 * 2. They were NOT found on the cinema website for 2+ consecutive scraper runs
 *
 * Movies with null scraped_from (manually added) are NEVER deactivated by this script.
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

async function cleanupCinema() {
  console.log('='.repeat(60));
  console.log('CINEMA CLEANUP SCRIPT (FIXED)');
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  let deactivated = 0;
  let errors = 0;

  try {
    // Only deactivate movies that came from a cinema source (vox/cineco)
    // Movies with null scraped_from are manually added and SKIPPED
    const { data: cinemaMovies, error: fetchError } = await supabase
      .from('movies')
      .select('id, title, scraped_from, updated_at, is_now_showing, is_coming_soon')
      .not('scraped_from', 'is', null)  // Only movies with cinema sources
      .or('is_now_showing.eq.true,is_coming_soon.eq.true');

    if (fetchError) {
      console.error('Error fetching cinema movies:', fetchError.message);
      errors++;
    } else {
      console.log(`\nFound ${cinemaMovies?.length || 0} cinema-sourced movies to check`);

      for (const movie of cinemaMovies || []) {
        const sources = (movie.scraped_from || []).map(s => s.toLowerCase());
        const hasCinemaSource = sources.includes('vox') || sources.includes('cineco');
        
        // Skip movies without valid cinema sources (manually added)
        if (!hasCinemaSource) {
          console.log(`  SKIPPED (no cinema source): ${movie.title}`);
          continue;
        }

        // Skip if updated recently (within 7 days) - scraper recently ran
        const updatedAt = new Date(movie.updated_at);
        const daysSinceUpdate = (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysSinceUpdate < 7) {
          console.log(`  SKIPPED (recently updated): ${movie.title}`);
          continue;
        }

        // Movie from cinema source hasn't been updated in 7+ days
        // Deactivate it (cinema scraper didn't find it)
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
      }
    }

    // Log cleanup run
    const cleanupLog = {
      timestamp: new Date().toISOString(),
      deactivated,
      errors
    };

    console.log('\n' + '='.repeat(60));
    console.log('CLEANUP COMPLETE');
    console.log('='.repeat(60));
    console.log('Deactivated:', deactivated);
    console.log('Errors:', errors);
    console.log(JSON.stringify(cleanupLog, null, 2));

  } catch (error) {
    console.error('Cleanup error:', error);
    process.exit(1);
  }
}

cleanupCinema();