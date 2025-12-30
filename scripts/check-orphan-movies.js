/**
 * Check for orphan movies - movies showing but not in any cinema
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

async function checkOrphans() {
  console.log('==================================================');
  console.log('CHECKING FOR ORPHAN MOVIES');
  console.log('==================================================\n');

  // Get all showing movies
  const { data: allShowing, error } = await supabase
    .from('movies')
    .select('id, title, is_now_showing, is_coming_soon, scraped_from')
    .or('is_now_showing.eq.true,is_coming_soon.eq.true');

  if (error) {
    console.error('Error fetching movies:', error);
    process.exit(1);
  }

  const withSources = [];
  const withoutSources = [];

  for (const movie of allShowing || []) {
    const sources = movie.scraped_from || [];
    if (sources.length === 0) {
      withoutSources.push(movie);
    } else {
      withSources.push(movie);
    }
  }

  console.log('Movies WITHOUT cinema sources (orphans):');
  console.log('--------------------------------------------------');

  if (withoutSources.length === 0) {
    console.log('  None! All movies have cinema sources.');
  } else {
    for (const movie of withoutSources) {
      const status = movie.is_now_showing ? 'NOW SHOWING' : 'COMING SOON';
      console.log(`  ❌ ${movie.title} (${status})`);
    }
  }

  console.log('\n==================================================');
  console.log('SUMMARY');
  console.log('==================================================');
  console.log(`Total showing movies: ${allShowing?.length || 0}`);
  console.log(`With cinema sources: ${withSources.length}`);
  console.log(`WITHOUT sources (orphans): ${withoutSources.length}`);

  if (withoutSources.length > 0) {
    console.log('\n⚠️  These orphan movies should be hidden or cleaned up!');
  } else {
    console.log('\n✅ All movies properly linked to cinemas!');
  }
}

checkOrphans().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
