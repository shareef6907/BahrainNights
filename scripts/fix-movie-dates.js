/**
 * Fix Movie Dates Script
 *
 * This script fixes the is_now_showing and is_coming_soon flags
 * based on the release_date field.
 *
 * Rule:
 * - release_date <= today → NOW SHOWING
 * - release_date > today → COMING SOON
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

async function fixMovieDates() {
  console.log('==================================================');
  console.log('FIX MOVIE DATES SCRIPT');
  console.log('==================================================\n');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(`Today's date: ${today.toISOString().split('T')[0]}\n`);

  // Get all movies with their current status
  const { data: movies, error } = await supabase
    .from('movies')
    .select('id, title, release_date, is_now_showing, is_coming_soon, scraped_from')
    .or('is_now_showing.eq.true,is_coming_soon.eq.true');

  if (error) {
    console.error('Error fetching movies:', error);
    process.exit(1);
  }

  console.log(`Found ${movies?.length || 0} movies to check\n`);

  let fixedCount = 0;
  let nowShowingCount = 0;
  let comingSoonCount = 0;
  let noDateCount = 0;

  for (const movie of movies || []) {
    if (!movie.release_date) {
      noDateCount++;
      continue;
    }

    const releaseDate = new Date(movie.release_date);
    releaseDate.setHours(0, 0, 0, 0);

    const shouldBeNowShowing = releaseDate <= today;
    const shouldBeComingSoon = releaseDate > today;

    // Check if status needs fixing
    const needsFix = movie.is_now_showing !== shouldBeNowShowing ||
                     movie.is_coming_soon !== shouldBeComingSoon;

    if (needsFix) {
      const oldStatus = movie.is_now_showing ? 'NOW SHOWING' : 'COMING SOON';
      const newStatus = shouldBeNowShowing ? 'NOW SHOWING' : 'COMING SOON';

      console.log(`🔧 FIXING: "${movie.title}"`);
      console.log(`   Release: ${movie.release_date}`);
      console.log(`   Old: ${oldStatus} → New: ${newStatus}`);

      const { error: updateError } = await supabase
        .from('movies')
        .update({
          is_now_showing: shouldBeNowShowing,
          is_coming_soon: shouldBeComingSoon,
        })
        .eq('id', movie.id);

      if (updateError) {
        console.log(`   ❌ Error: ${updateError.message}`);
      } else {
        fixedCount++;
        console.log(`   ✅ Fixed!\n`);
      }
    }

    if (shouldBeNowShowing) {
      nowShowingCount++;
    } else {
      comingSoonCount++;
    }
  }

  console.log('\n==================================================');
  console.log('SUMMARY');
  console.log('==================================================');
  console.log(`Total movies checked: ${movies?.length || 0}`);
  console.log(`Movies fixed: ${fixedCount}`);
  console.log(`Now Showing: ${nowShowingCount}`);
  console.log(`Coming Soon: ${comingSoonCount}`);
  console.log(`No release date (skipped): ${noDateCount}`);
  console.log('\n✅ Done!');
}

fixMovieDates().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
