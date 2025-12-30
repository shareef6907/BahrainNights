/**
 * Verify All Cinemas Script
 *
 * This is the master verification script that runs every 4 hours to ensure
 * cinema data is accurate and up-to-date across all 4 Bahrain cinemas:
 * - Cineco
 * - VOX Cinemas
 * - Cinépolis
 * - Mukta A2 Cinemas
 *
 * Schedule: Run via cron every 4 hours
 * Example crontab: 0 *\/4 * * * cd /path/to/project && node scripts/verify-all-cinemas.js
 *
 * Or via GitHub Actions scheduled workflow.
 */

// Load .env.local for local development
try {
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv might not be installed in production
}

const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Cinema metadata
const CINEMAS = [
  { id: 'cineco', name: 'Cineco', fixScript: 'fix-cineco-movies.js' },
  { id: 'vox', name: 'VOX Cinemas', fixScript: 'fix-vox-movies.js' },
  { id: 'cinepolis', name: 'Cinépolis', fixScript: 'fix-cinepolis-movies.js' },
  { id: 'mukta', name: 'Mukta A2 Cinemas', fixScript: null }, // Mukta scraper works fine
];

async function getCinemaCounts() {
  const { data: movies, error } = await supabase
    .from('movies')
    .select('id, title, is_now_showing, is_coming_soon, scraped_from')
    .or('is_now_showing.eq.true,is_coming_soon.eq.true');

  if (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }

  const counts = {
    cineco: 0,
    vox: 0,
    cinepolis: 0,
    mukta: 0,
    orphan: 0,
    total_showing: 0,
    now_showing: 0,
    coming_soon: 0,
  };

  for (const movie of movies || []) {
    const sources = movie.scraped_from || [];
    counts.total_showing++;

    if (movie.is_now_showing) counts.now_showing++;
    if (movie.is_coming_soon) counts.coming_soon++;

    if (sources.length === 0) {
      counts.orphan++;
    } else {
      sources.forEach(s => {
        if (counts[s] !== undefined) counts[s]++;
      });
    }
  }

  return counts;
}

async function runFixScript(scriptName) {
  const scriptPath = path.join(__dirname, scriptName);
  try {
    console.log(`\n📝 Running ${scriptName}...`);
    execSync(`node "${scriptPath}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    return true;
  } catch (error) {
    console.error(`❌ Error running ${scriptName}:`, error.message);
    return false;
  }
}

async function verifyAllCinemas() {
  const startTime = new Date();
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║          BAHRAIN NIGHTS - CINEMA VERIFICATION SYSTEM             ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
  console.log(`\n🕐 Started at: ${startTime.toISOString()}`);
  console.log('━'.repeat(70));

  // Step 1: Get initial counts
  console.log('\n📊 STEP 1: Getting initial cinema counts...');
  const beforeCounts = await getCinemaCounts();
  console.log(`   Cineco:    ${beforeCounts.cineco} movies`);
  console.log(`   VOX:       ${beforeCounts.vox} movies`);
  console.log(`   Cinépolis: ${beforeCounts.cinepolis} movies`);
  console.log(`   Mukta:     ${beforeCounts.mukta} movies`);
  console.log(`   Orphans:   ${beforeCounts.orphan} movies`);

  // Step 2: Run fix scripts for each cinema
  console.log('\n🔧 STEP 2: Running fix scripts for each cinema...');

  let fixesApplied = 0;
  for (const cinema of CINEMAS) {
    if (cinema.fixScript) {
      const success = await runFixScript(cinema.fixScript);
      if (success) fixesApplied++;
    } else {
      console.log(`\n⏭️  Skipping ${cinema.name} (no fix script needed)`);
    }
  }

  // Step 3: Get updated counts
  console.log('\n📊 STEP 3: Getting updated cinema counts...');
  const afterCounts = await getCinemaCounts();

  // Step 4: Generate report
  console.log('\n' + '═'.repeat(70));
  console.log('                    VERIFICATION REPORT');
  console.log('═'.repeat(70));

  const report = {
    timestamp: startTime.toISOString(),
    duration_ms: Date.now() - startTime.getTime(),
    fixes_applied: fixesApplied,
    before: beforeCounts,
    after: afterCounts,
    changes: {
      cineco: afterCounts.cineco - beforeCounts.cineco,
      vox: afterCounts.vox - beforeCounts.vox,
      cinepolis: afterCounts.cinepolis - beforeCounts.cinepolis,
      mukta: afterCounts.mukta - beforeCounts.mukta,
    }
  };

  console.log('\n┌─────────────────┬─────────┬─────────┬─────────┐');
  console.log('│     Cinema      │ Before  │  After  │ Change  │');
  console.log('├─────────────────┼─────────┼─────────┼─────────┤');
  console.log(`│ Cineco          │ ${String(beforeCounts.cineco).padStart(7)} │ ${String(afterCounts.cineco).padStart(7)} │ ${(report.changes.cineco >= 0 ? '+' : '') + report.changes.cineco.toString().padStart(6)} │`);
  console.log(`│ VOX Cinemas     │ ${String(beforeCounts.vox).padStart(7)} │ ${String(afterCounts.vox).padStart(7)} │ ${(report.changes.vox >= 0 ? '+' : '') + report.changes.vox.toString().padStart(6)} │`);
  console.log(`│ Cinépolis       │ ${String(beforeCounts.cinepolis).padStart(7)} │ ${String(afterCounts.cinepolis).padStart(7)} │ ${(report.changes.cinepolis >= 0 ? '+' : '') + report.changes.cinepolis.toString().padStart(6)} │`);
  console.log(`│ Mukta A2        │ ${String(beforeCounts.mukta).padStart(7)} │ ${String(afterCounts.mukta).padStart(7)} │ ${(report.changes.mukta >= 0 ? '+' : '') + report.changes.mukta.toString().padStart(6)} │`);
  console.log('└─────────────────┴─────────┴─────────┴─────────┘');

  console.log(`\n📈 Summary:`);
  console.log(`   Total Now Showing: ${afterCounts.now_showing}`);
  console.log(`   Total Coming Soon: ${afterCounts.coming_soon}`);
  console.log(`   Orphan Movies: ${afterCounts.orphan}`);
  console.log(`   Duration: ${report.duration_ms}ms`);

  // Step 5: Check for issues
  const issues = [];
  if (afterCounts.orphan > 0) {
    issues.push(`⚠️  ${afterCounts.orphan} orphan movies with no cinema source`);
  }
  if (afterCounts.cineco < 5) {
    issues.push(`⚠️  Cineco has only ${afterCounts.cineco} movies - may need attention`);
  }
  if (afterCounts.vox < 10) {
    issues.push(`⚠️  VOX has only ${afterCounts.vox} movies - may need attention`);
  }
  if (afterCounts.cinepolis < 5) {
    issues.push(`⚠️  Cinépolis has only ${afterCounts.cinepolis} movies - may need attention`);
  }

  if (issues.length > 0) {
    console.log('\n⚠️  ISSUES DETECTED:');
    issues.forEach(issue => console.log(`   ${issue}`));
  } else {
    console.log('\n✅ No issues detected - all cinemas verified successfully!');
  }

  console.log('\n' + '═'.repeat(70));
  console.log(`🕐 Completed at: ${new Date().toISOString()}`);
  console.log('═'.repeat(70));

  // Save report to database (optional)
  try {
    // You could save this to a verification_logs table if you want history
    // await supabase.from('verification_logs').insert([report]);
  } catch (e) {
    // Silently ignore if table doesn't exist
  }

  return report;
}

// Run verification
verifyAllCinemas()
  .then(report => {
    console.log('\n✅ Verification complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Verification failed:', err);
    process.exit(1);
  });
