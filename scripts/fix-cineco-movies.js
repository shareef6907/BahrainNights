/**
 * Fix Cineco Movies Script
 *
 * Updates the database with Cineco Now Showing movies extracted from their website.
 * Run this after the main scraper to ensure Cineco cinema is properly linked.
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

// Cineco Now Showing movies (extracted from Cineco website)
// Updated: 2025-12-30
const CINECO_NOW_SHOWING = [
  "THE SPONGEBOB MOVIE:(2025)(AR)",
  "THE SPONGEBOB MOVIE:(2025)(EN)",
  "The SpongeBob Movie: Search for SquarePants",
  "The Spongebob Movie Search For Squarepants",
  "ANACONDA",
  "Anaconda",
  "NUREMBERG",
  "Nuremberg",
  "SIRAI",
  "Sirai",
  "TALAANI",
  "Tala2ni",
  "Talaani",
  "TU MERI MAIN TERA MAIN TERA",
  "Tu Meri Main Tera Main Tera Tu Meri",
  "VRUSSHABHA",
  "Vrusshabha",
  "SARVAM MAYA",
  "Sarvam Maya",
  "HAAL",
  "Haal",
  "RETTA THALA",
  "Retta Thala",
  "AVATAR: FIRE AND ASH",
  "Avatar: Fire and Ash",
  "BHA BHA BA",
  "Bha Bha Ba",
  "ZOOTROPOLIS 2",
  "Zootropolis 2"
];

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fixCinecoMovies() {
  console.log('==================================================');
  console.log('FIX CINECO MOVIES SCRIPT');
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

  // Normalize Cineco titles for matching
  const cinecoNowShowingNormalized = new Set(
    CINECO_NOW_SHOWING.map(t => normalizeTitle(t))
  );

  let updatedCount = 0;
  let addedToNowShowing = 0;

  for (const movie of movies || []) {
    const normalizedDbTitle = normalizeTitle(movie.title);

    // Check if movie is in Cineco Now Showing
    let isOnCineco = cinecoNowShowingNormalized.has(normalizedDbTitle);

    // Also check partial matches for movies with different naming
    if (!isOnCineco) {
      for (const cinecoTitle of CINECO_NOW_SHOWING) {
        const normalizedCineco = normalizeTitle(cinecoTitle);
        if (normalizedDbTitle.includes(normalizedCineco) || normalizedCineco.includes(normalizedDbTitle)) {
          isOnCineco = true;
          break;
        }
      }
    }

    if (isOnCineco) {
      const currentCinemas = movie.scraped_from || [];

      // Add 'cineco' if not already present
      if (!currentCinemas.includes('cineco')) {
        const newCinemas = [...currentCinemas, 'cineco'];

        // If movie was coming soon, move to now showing
        const updates = {
          scraped_from: newCinemas,
        };

        // If Cineco has it as Now Showing but we had it as Coming Soon, update status
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
          console.log(`✅ Added Cineco to: ${movie.title} [${newCinemas.join(', ')}]`);
        }
      } else {
        // Cineco already present, check if we need to update status
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
            console.log(`🔄 MOVED TO NOW SHOWING: ${movie.title} (Cineco already present)`);
          }
        }
      }
    }
  }

  console.log('\n==================================================');
  console.log('SUMMARY');
  console.log('==================================================');
  console.log(`Total movies checked: ${movies?.length || 0}`);
  console.log(`Movies updated with Cineco: ${updatedCount}`);
  console.log(`Movies moved to Now Showing: ${addedToNowShowing}`);
  console.log('\n✅ Done!');
}

fixCinecoMovies().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
