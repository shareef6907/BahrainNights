/**
 * Fix Cinépolis Movies Script
 *
 * The old Cinépolis URL structure changed from /Browsing/Movies/NowShowing/0
 * to /movies-list. This script directly updates the database with Cinépolis
 * Now Showing movies extracted from their website.
 *
 * Run this after the main scraper to add Cinépolis cinema to movies.
 */

// Load .env.local for local development
try {
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv might not be installed in production
}

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Cinépolis Now Showing movies (extracted from Cinépolis website)
// Updated: 2025-12-30
const CINEPOLIS_NOW_SHOWING = [
  "The Spongebob Movie Search For Squarepants",
  "The SpongeBob Movie: Search for Squarepants",
  "Anaconda",
  "Avatar: Fire and Ash",
  "Zootropolis 2",
  "Tala2ni",
  "Tu Meri Main Tera Main Tera Tu Meri",
  "Haal",
  "Sarvam Maya",
  "Silent Night, Deadly Night",
  "The Raja Saab",
  "Raja Saab",
  "Jana Nayagan",
  "Mindiyum Paranjum",
  "Al Majhoola",
  "Al Majhola",
  "Kharitat Ras Al Sana",
  "Palestine 36",
  "Beneath The Light",
  "Beneath the Light",
  "En Ghab El Kot",
  "Ikkis",
  "Affinity"
];

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fixCinepolisMovies() {
  console.log('==================================================');
  console.log('FIX CINÉPOLIS MOVIES SCRIPT');
  console.log('==================================================\n');

  // Get all movies from database
  const { data: movies, error } = await supabase
    .from('movies')
    .select('id, title, is_now_showing, is_coming_soon, scraped_from');

  if (error) {
    console.error('Error fetching movies:', error);
    process.exit(1);
  }

  console.log(`Found ${movies?.length || 0} movies in database\n`);

  // Normalize Cinépolis titles for matching
  const cinepolisNowShowingNormalized = new Set(
    CINEPOLIS_NOW_SHOWING.map(t => normalizeTitle(t))
  );

  let updatedCount = 0;
  let addedToNowShowing = 0;

  for (const movie of movies || []) {
    const normalizedDbTitle = normalizeTitle(movie.title);

    // Check if movie is in Cinépolis Now Showing
    let isOnCinepolis = cinepolisNowShowingNormalized.has(normalizedDbTitle);

    // Also check partial matches for movies with different naming
    if (!isOnCinepolis) {
      for (const cinepolisTitle of CINEPOLIS_NOW_SHOWING) {
        const normalizedCinepolis = normalizeTitle(cinepolisTitle);
        if (normalizedDbTitle.includes(normalizedCinepolis) || normalizedCinepolis.includes(normalizedDbTitle)) {
          isOnCinepolis = true;
          break;
        }
      }
    }

    if (isOnCinepolis) {
      const currentCinemas = movie.scraped_from || [];

      // Add 'cinepolis' if not already present
      if (!currentCinemas.includes('cinepolis')) {
        const newCinemas = [...currentCinemas, 'cinepolis'];

        // If movie was coming soon, move to now showing
        const updates = {
          scraped_from: newCinemas,
        };

        // If Cinépolis has it as Now Showing but we had it as Coming Soon, update status
        if (!movie.is_now_showing && movie.is_coming_soon) {
          updates.is_now_showing = true;
          updates.is_coming_soon = false;
          addedToNowShowing++;
          console.log(`🔄 MOVED TO NOW SHOWING: ${movie.title}`);
        }

        const { error: updateError } = await supabase
          .from('movies')
          .update(updates)
          .eq('id', movie.id);

        if (updateError) {
          console.log(`❌ Error updating ${movie.title}: ${updateError.message}`);
        } else {
          updatedCount++;
          console.log(`✅ Added Cinépolis to: ${movie.title} [${newCinemas.join(', ')}]`);
        }
      } else {
        // Cinépolis already present, check if we need to update status
        if (!movie.is_now_showing && movie.is_coming_soon) {
          const { error: updateError } = await supabase
            .from('movies')
            .update({
              is_now_showing: true,
              is_coming_soon: false,
            })
            .eq('id', movie.id);

          if (!updateError) {
            addedToNowShowing++;
            console.log(`🔄 MOVED TO NOW SHOWING: ${movie.title} (Cinépolis already present)`);
          }
        }
      }
    }
  }

  console.log('\n==================================================');
  console.log('SUMMARY');
  console.log('==================================================');
  console.log(`Total movies checked: ${movies?.length || 0}`);
  console.log(`Movies updated with Cinépolis: ${updatedCount}`);
  console.log(`Movies moved to Now Showing: ${addedToNowShowing}`);
  console.log('\n✅ Done!');
}

fixCinepolisMovies().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
