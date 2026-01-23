/**
 * CINEMA SYNC - Simple & Reliable
 *
 * One script to keep all cinema data accurate.
 * Run every 4 hours via GitHub Actions.
 *
 * What it does:
 * 1. For each cinema, check which movies are showing
 * 2. Update database to match cinema websites
 * 3. Print a clear report
 */

// Load environment
try { require('dotenv').config({ path: '.env.local' }); } catch {}

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('ERROR: Missing database credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ============================================================
// CINEMA DATA - Update these lists when movies change
// Last updated: 2025-12-30
// ============================================================

const CINEMAS = {
  vox: {
    name: 'VOX Cinemas',
    nowShowing: [
      "Avatar: Fire and Ash",
      "Anaconda",
      "Tala2ni",
      "Zootropolis 2",
      "The SpongeBob Movie: Search for Squarepants",
      "Kharitat Ras Al Sana",
      "Silent Night, Deadly Night",
      "Beneath the Light",
      "Palestine 36",
      "The Shadow's Edge",
      "Now You See Me: Now You Don't",
      "Sarvam Maya",
      "Tu Meri Main Tera Main Tera Tu Meri",
      "Nuremberg",
      "Five Nights at Freddy's 2",
      "El Sett (Oum Kalthoum)",
      "El Selem W El Thoban",
      "Wicked: For Good",
      "Sambosa Chapati",
      "Bambi: The Reckoning",
      "Al Majhola",
      "Jana Nayagan",
      "The Raja Saab"
    ]
  },

  cineco: {
    name: 'Cineco',
    nowShowing: [
      "The SpongeBob Movie: Search for SquarePants",
      "Anaconda",
      "Nuremberg",
      "Sirai",
      "Tala2ni",
      "Tu Meri Main Tera Main Tera Tu Meri",
      "Vrusshabha",
      "Sarvam Maya",
      "Haal",
      "Retta Thala",
      "Avatar: Fire and Ash",
      "Bha Bha Ba",
      "Zootropolis 2"
    ]
  },

  cinepolis: {
    name: 'Cinepolis',
    nowShowing: [
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
      "Jana Nayagan",
      "Mindiyum Paranjum",
      "Al Majhola",
      "Kharitat Ras Al Sana",
      "Palestine 36",
      "Beneath the Light",
      "En Ghab El Kot",
      "Ikkis",
      "Affinity"
    ]
  }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Clean title for matching (remove special chars, lowercase)
function clean(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

// Check if movie matches any title in list
function isInList(movieTitle, titleList) {
  const cleanMovie = clean(movieTitle);

  for (const title of titleList) {
    const cleanTitle = clean(title);
    // Exact match or partial match (for title variations)
    if (cleanMovie === cleanTitle ||
        cleanMovie.includes(cleanTitle) ||
        cleanTitle.includes(cleanMovie)) {
      return true;
    }
  }
  return false;
}

// ============================================================
// MAIN SYNC FUNCTION
// ============================================================

async function syncCinemas() {
  console.log('\n========================================');
  console.log('  BAHRAIN NIGHTS - CINEMA SYNC');
  console.log('  ' + new Date().toISOString());
  console.log('========================================\n');

  // Step 1: Get all movies from database
  const { data: movies, error } = await supabase
    .from('movies')
    .select('id, title, is_now_showing, is_coming_soon, scraped_from');

  if (error) {
    console.error('Database error:', error.message);
    process.exit(1);
  }

  console.log(`Found ${movies.length} movies in database\n`);

  // Step 2: Process each cinema
  const stats = { total: 0, updated: 0, movedToNowShowing: 0 };

  for (const [cinemaId, cinema] of Object.entries(CINEMAS)) {
    console.log(`\n--- ${cinema.name} ---`);

    for (const movie of movies) {
      if (isInList(movie.title, cinema.nowShowing)) {
        stats.total++;

        const currentCinemas = movie.scraped_from || [];
        const needsCinemaAdded = !currentCinemas.includes(cinemaId);
        const needsStatusFix = !movie.is_now_showing && movie.is_coming_soon;

        if (needsCinemaAdded || needsStatusFix) {
          const updates = {};

          if (needsCinemaAdded) {
            updates.scraped_from = [...currentCinemas, cinemaId];
          }

          if (needsStatusFix) {
            updates.is_now_showing = true;
            updates.is_coming_soon = false;
            stats.movedToNowShowing++;
          }

          const { error: updateError } = await supabase
            .from('movies')
            .update(updates)
            .eq('id', movie.id);

          if (!updateError) {
            stats.updated++;
            const action = needsStatusFix ? '+ NOW SHOWING' : '+ added';
            console.log(`  ${action}: ${movie.title}`);
          }
        }
      }
    }
  }

  // Step 3: Print summary
  console.log('\n========================================');
  console.log('  SUMMARY');
  console.log('========================================');
  console.log(`  Movies matched: ${stats.total}`);
  console.log(`  Movies updated: ${stats.updated}`);
  console.log(`  Moved to Now Showing: ${stats.movedToNowShowing}`);
  console.log('\nDone!\n');
}

// Run
syncCinemas().catch(err => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
