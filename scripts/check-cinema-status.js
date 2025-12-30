/**
 * Check Cinema Status Script
 *
 * Cross-verifies database movies against cinema sources
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

async function checkCinemaStatus() {
  console.log('='.repeat(80));
  console.log('DATABASE CINEMA CROSS-REFERENCE');
  console.log('='.repeat(80));

  // Get all showing movies with their sources
  const { data: movies, error } = await supabase
    .from('movies')
    .select('id, title, is_now_showing, is_coming_soon, scraped_from')
    .or('is_now_showing.eq.true,is_coming_soon.eq.true')
    .order('title');

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  // Count by cinema
  const cinemaCounts = { cineco: 0, vox: 0, cinepolis: 0, mukta: 0, orphan: 0 };
  const byStatus = { now_showing: [], coming_soon: [] };

  for (const movie of movies) {
    const sources = movie.scraped_from || [];
    const status = movie.is_now_showing ? 'now_showing' : 'coming_soon';

    byStatus[status].push({
      title: movie.title,
      sources: sources.length > 0 ? sources.join(', ') : 'ORPHAN'
    });

    if (sources.length === 0) {
      cinemaCounts.orphan++;
    } else {
      sources.forEach(s => {
        if (cinemaCounts[s] !== undefined) cinemaCounts[s]++;
      });
    }
  }

  console.log('\nNOW SHOWING (' + byStatus.now_showing.length + '):');
  console.log('-'.repeat(80));
  byStatus.now_showing.forEach(m => {
    console.log(`  ${m.title.padEnd(50)} [${m.sources}]`);
  });

  console.log('\nCOMING SOON (' + byStatus.coming_soon.length + '):');
  console.log('-'.repeat(80));
  byStatus.coming_soon.forEach(m => {
    console.log(`  ${m.title.padEnd(50)} [${m.sources}]`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('CINEMA COUNTS:');
  console.log('='.repeat(80));
  console.log(`  Cineco:    ${cinemaCounts.cineco} movies`);
  console.log(`  VOX:       ${cinemaCounts.vox} movies`);
  console.log(`  Cinépolis: ${cinemaCounts.cinepolis} movies`);
  console.log(`  Mukta:     ${cinemaCounts.mukta} movies`);
  console.log(`  Orphans:   ${cinemaCounts.orphan} movies (NO CINEMA SOURCE!)`);

  return { movies, cinemaCounts, byStatus };
}

checkCinemaStatus().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
