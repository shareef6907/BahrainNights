/**
 * Fix VOX Movies Script
 *
 * Since Puppeteer has HTTP/2 issues with VOX website, this script
 * directly updates the database with VOX Now Showing movies.
 *
 * Run this after the main scraper to add VOX cinema to movies.
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

// VOX Now Showing movies (manually extracted from VOX website)
// Updated: 2025-12-30
const VOX_NOW_SHOWING = [
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
  "The SpongeBob: Search for Squarepants",
  "Al Majhola",
  "Jana Nayagan",
  "The Raja Saab"
];

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fixVOXMovies() {
  console.log('==================================================');
  console.log('FIX VOX MOVIES SCRIPT');
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

  // Normalize VOX titles for matching
  const voxNowShowingNormalized = new Set(
    VOX_NOW_SHOWING.map(t => normalizeTitle(t))
  );

  let updatedCount = 0;
  let addedToNowShowing = 0;

  for (const movie of movies || []) {
    const normalizedDbTitle = normalizeTitle(movie.title);

    // Check if movie is in VOX Now Showing
    let isOnVOX = voxNowShowingNormalized.has(normalizedDbTitle);

    // Also check partial matches for movies with different naming
    if (!isOnVOX) {
      for (const voxTitle of VOX_NOW_SHOWING) {
        const normalizedVox = normalizeTitle(voxTitle);
        if (normalizedDbTitle.includes(normalizedVox) || normalizedVox.includes(normalizedDbTitle)) {
          isOnVOX = true;
          break;
        }
      }
    }

    if (isOnVOX) {
      const currentCinemas = movie.scraped_from || [];

      // Add 'vox' if not already present
      if (!currentCinemas.includes('vox')) {
        const newCinemas = [...currentCinemas, 'vox'];

        // If movie was coming soon, move to now showing
        const updates = {
          scraped_from: newCinemas,
        };

        // If VOX has it as Now Showing but we had it as Coming Soon, update status
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
          console.log(`✅ Added VOX to: ${movie.title} [${newCinemas.join(', ')}]`);
        }
      } else {
        // VOX already present, check if we need to update status
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
            console.log(`🔄 MOVED TO NOW SHOWING: ${movie.title} (VOX already present)`);
          }
        }
      }
    }
  }

  console.log('\n==================================================');
  console.log('SUMMARY');
  console.log('==================================================');
  console.log(`Total movies checked: ${movies?.length || 0}`);
  console.log(`Movies updated with VOX: ${updatedCount}`);
  console.log(`Movies moved to Now Showing: ${addedToNowShowing}`);
  console.log('\n✅ Done!');
}

fixVOXMovies().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
