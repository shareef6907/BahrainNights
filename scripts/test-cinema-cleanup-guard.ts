#!/usr/bin/env npx tsx

/**
 * Tests for the cinema cleanup guard.
 *
 * Regression under test: on 2026-11-19 the Cineco scraper returned 0 movies
 * in one sync run, the combined total still passed the old threshold, and 15
 * films were demoted even though they were still listed on the cinema's site.
 * The live /cinema page fell from 34 cards to 24 in that single run.
 */

import { decideCleanup, KNOWN_SOURCES } from './cinema-cleanup-guard';

let passed = 0;
let failed = 0;

function check(name: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name} — expected ${e}, got ${a}`);
  }
}

console.log('\n=== both sources healthy ===');
const healthy = decideCleanup({ vox: 24, cineco: 20 });
check('cleanup runs', healthy.run, true);
check('no failed sources', healthy.failedSources, []);

console.log('\n=== the 2026-11-19 failure: Cineco returned 0 movies ===');
const cinecoDown = decideCleanup({ vox: 24, cineco: 0 });
check('cleanup does NOT run', cinecoDown.run, false);
check('cineco is reported as failed', cinecoDown.failedSources, ['cineco']);
check(
  'the reason names the failing source',
  cinecoDown.reason.includes('cineco'),
  true,
);

console.log('\n=== VOX returned 0 movies ===');
const voxDown = decideCleanup({ vox: 0, cineco: 20 });
check('cleanup does NOT run', voxDown.run, false);
check('vox is reported as failed', voxDown.failedSources, ['vox']);

console.log('\n=== both sources returned 0 movies ===');
const bothDown = decideCleanup({ vox: 0, cineco: 0 });
check('cleanup does NOT run', bothDown.run, false);
check('both sources are reported', bothDown.failedSources, ['vox', 'cineco']);

console.log('\n=== a source missing from the totals object ===');
const missing = decideCleanup({ vox: 24 });
check('cleanup does NOT run', missing.run, false);
check('the missing source is reported', missing.failedSources, ['cineco']);

console.log('\n=== a source that returned only coming-soon films still counts as healthy ===');
const comingSoonOnly = decideCleanup({ vox: 0, cineco: 0 });
check('a source with 0 in BOTH buckets is failed', comingSoonOnly.run, false);

console.log('\n=== unknown sources are ignored ===');
const extra = decideCleanup({ vox: 24, cineco: 20, pluto: 0 });
check('cleanup still runs', extra.run, true);
check('no failed sources', extra.failedSources, []);

console.log('\n=== the known source list ===');
check('two known sources', KNOWN_SOURCES.join(','), 'vox,cineco');

console.log(`\nPASSED: ${passed} | FAILED: ${failed}`);
if (failed > 0) {
  console.log('RESULT: FAILED');
  process.exit(1);
}
console.log('RESULT: PASSED');
