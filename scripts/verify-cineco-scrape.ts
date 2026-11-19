/**
 * Live check of the Cineco scraper's title resolution and trailer capture.
 *
 * Runs the real scrape against the live Cineco site and prints the titles and
 * trailer keys it resolves. It does NOT write to the database.
 *
 * Run: npx tsx scripts/verify-cineco-scrape.ts
 */

import { scrapeCineco } from './scrape-cineco';

async function main() {
  const result = await scrapeCineco();

  console.log('\n' + '='.repeat(70));
  console.log('RESOLVED TITLES (now showing)');
  console.log('='.repeat(70));
  for (const movie of result.nowShowing) {
    console.log(`  ${movie.title.padEnd(44)} ${movie.trailerKey ? `✅ ${movie.trailerKey}` : '— no trailer'}`);
  }

  console.log('\n' + '='.repeat(70));
  console.log('RESOLVED TITLES (coming soon)');
  console.log('='.repeat(70));
  for (const movie of result.comingSoon) {
    console.log(`  ${movie.title.padEnd(44)} ${movie.trailerKey ? `✅ ${movie.trailerKey}` : '— no trailer'}`);
  }

  const withTrailer = [...result.nowShowing, ...result.comingSoon].filter((m) => m.trailerKey);
  console.log('\n' + '='.repeat(70));
  console.log(`SUMMARY: ${result.nowShowing.length} now showing, ${result.comingSoon.length} coming soon, ${withTrailer.length} with a cinema trailer key`);
  console.log('='.repeat(70));

  // A lowercase title means the slug fallback won, which is the bug this fix
  // removes. Flag it loudly rather than letting it through silently.
  const lowercased = [...result.nowShowing, ...result.comingSoon].filter((m) => {
    const t = m.title.trim();
    return t.length > 1 && t === t.toLowerCase() && /[a-z]/.test(t);
  });
  if (lowercased.length) {
    console.log('\n⚠️  These titles are still fully lowercase (slug fallback won):');
    for (const movie of lowercased) {
      console.log(`     - "${movie.title}" (slug: ${movie.slug || '—'})`);
    }
    console.log('    The real link text was not found for them.');
  } else {
    console.log('\n✅ No lowercased titles — every movie resolved to its real link text.');
  }

  if (result.errors.length) {
    console.log(`\n⚠️  Scrape errors: ${result.errors.join(' | ')}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal:', error);
  process.exit(1);
});
