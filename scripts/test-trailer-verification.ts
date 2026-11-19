/**
 * Regression tests for the trailer verification helpers.
 *
 * These encode the decisions the 2026-11-18 trailer audit actually made, so
 * the rule set that produced 641 KEEP / 54 REPAIR / 29 empty verdicts cannot
 * silently drift when the helper is refactored.
 *
 * Run: npx tsx scripts/test-trailer-verification.ts
 */

import {
  pickBestSearchResult,
  pickBestTmdbVideo,
  isTrailerTitleForFilm,
  titleRefersToFilm,
  catalogueTitleMatches,
  normalizeTitle,
} from '../src/lib/trailer-verification';

let passed = 0;
let failed = 0;

function check(name: string, condition: boolean, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

console.log('\n=== normalizeTitle ===');
check('strips accents', normalizeTitle('Amélie') === 'amelie', normalizeTitle('Amélie'));
check('keeps non-latin scripts', normalizeTitle('കൂടോത്രം') === 'കൂടോത്രം', normalizeTitle('കൂടോത്രം'));
check('expands math alphanumerics', normalizeTitle('𝐀𝐥𝐩𝐡𝐚') === 'alpha', normalizeTitle('𝐀𝐥𝐩𝐡𝐚'));

console.log('\n=== THE REPORTED BUG: "Crypto" ===');
{
  // The video that was actually written to the film "Crypto".
  const wrongTitle = 'Top Crypto To Buy In October 2026 (With Price Predictions)';
  const result = isTrailerTitleForFilm(['Crypto'], wrongTitle);
  check(
    'the crypto pitch is REJECTED for the film "Crypto"',
    !result.ok,
    result.reason
  );
  check(
    'rejection reason names the signal',
    /not a trailer|does not name/.test(result.reason),
    result.reason
  );
}
{
  // The correct trailer for the same film.
  const rightTitle =
    "'TALES FROM THE CRYPTO' Official Trailer (2026) | Crypto Comedy Feature | Dances With Films LA";
  const result = isTrailerTitleForFilm(['Tales from the Crypto'], rightTitle);
  check('the real trailer IS accepted for "Tales from the Crypto"', result.ok, result.reason);
}
{
  // Even without the non-trailer guard, the bare word "crypto" must not be
  // enough to claim a match.
  const result = titleRefersToFilm(['Crypto'], 'Top Crypto To Buy In October 2026');
  check(
    'token overlap alone does not make "Top Crypto To Buy" a match for "Crypto"',
    !result.matched || result.score < 0.95,
    `score=${result.score} how=${result.how}`
  );
}

console.log('\n=== a ONE-WORD title must not claim a different work ===');
{
  // The film "Fate" (tmdb 1286659) vs a trailer for "Fate/strange Fake" —
  // a different work whose title starts with the same word.
  const wrong = titleRefersToFilm(['Fate'], 'Fate/strange Fake | Official Trailer | Crunchyroll');
  check('"Fate/strange Fake" is REJECTED for the film "Fate"', !wrong.matched, `score=${wrong.score} how=${wrong.how}`);

  // The film "Father" vs "Fathers & Daughters" — a different film.
  const wrong2 = titleRefersToFilm(['Father'], 'Fathers & Daughters - Official Trailer (2015) - Amanda Seyfried, Russell Crowe Movie HD');
  check('"Fathers & Daughters" is REJECTED for the film "Father"', !wrong2.matched, `score=${wrong2.score} how=${wrong2.how}`);

  // The genuine trailers for those same two films must still match.
  const right = titleRefersToFilm(['Fate'], 'Fate (2026) | Official Trailer');
  check('the real "Fate" trailer still matches', right.matched, `score=${right.score}`);
  const right2 = titleRefersToFilm(['Father'], 'Father Official Trailer 2025');
  check('the real "Father" trailer still matches', right2.matched, `score=${right2.score}`);

  // A multi-word film keeps its subtitle: the guard only bites on one-word
  // titles, so "The Hunger Games" must still claim "Catching Fire".
  const sub = titleRefersToFilm(['The Hunger Games'], 'The Hunger Games: Catching Fire Official Trailer');
  check('a multi-word film still matches its sequel title', sub.matched, `score=${sub.score} how=${sub.how}`);

  // A one-word film with a release year in the trailer title still matches.
  const year = titleRefersToFilm(['Alpha'], 'Alpha (2026) | Official Trailer');
  check('a release year is not treated as a different work', year.matched, `score=${year.score}`);

  // "Official Trailer for X" — the marker comes FIRST, leaving an empty
  // title portion; the fallback must still match.
  const markerFirst = titleRefersToFilm(['Fate'], 'Official Trailer for Fate');
  check('a marker-first title still matches', markerFirst.matched, `score=${markerFirst.score} how=${markerFirst.how}`);

  // A DESCRIPTIVE video title is not a different work. These are real
  // trailers that the 2026-11-18 audit confirmed as correct, and a rule that
  // rejected them would cost 39 legitimate trailers.
  const descriptive: [string, string][] = [
    ['Sinners', 'Sinners | Black American Sign Language Official Trailer | Max'],
    ['Patriot', 'Patriot Malayalam Trailer | Mammootty | Mohanlal | Mahesh Narayanan | Anto Joseph'],
    ['The Patriot', 'The Patriot (2000) Original Trailer [FHD]'],
    ['GOAT', 'GOAT - International Trailer - Only In Cinemas Now'],
    ['Keeper', "Keeper. Let's go back to when we didn't know any of this. In Theaters November 14"],
    ['Supergirl', 'Supergirl | Tickets on Sale Now'],
  ];
  for (const [film, video] of descriptive) {
    const m = titleRefersToFilm([film], video);
    check(`a descriptive title still matches "${film}"`, m.matched, `score=${m.score} how=${m.how}`);
  }
}

console.log('\n=== a catalogue title must not claim a film that merely contains it ===');
{
  // The catalogue holds a shortened form of the title; the TMDB entry is the
  // full one. That is the SAME film.
  check('"khalifa" matches "Khalifa: The Ruler"', catalogueTitleMatches('khalifa', 'Khalifa: The Ruler'));
  check('"runner" matches "RUNNER"', catalogueTitleMatches('runner', 'RUNNER'));
  check('"john doe" matches "John Doe"', catalogueTitleMatches('john doe', 'John Doe'));
  check('"john doe" matches "John Doe (2026)"', catalogueTitleMatches('john doe', 'John Doe (2026)'));
  check('"batulo jun" matches "Batulo Jun"', catalogueTitleMatches('batulo jun', 'Batulo Jun'));

  // A common word inside another film's title is a DIFFERENT film.
  check('"english" does NOT match "Johnny English"', !catalogueTitleMatches('english', 'Johnny English'));
  check('"english" matches "English"', catalogueTitleMatches('english', 'English'));
  check('"unner" does NOT match "An Unnerving Realisation"', !catalogueTitleMatches('unner', 'An Unnerving Realisation'));
  // A sequel number is a digit, and digits are ignored on both sides.
  check('"runner" matches "Runner 2" (digits are ignored)', catalogueTitleMatches('runner', 'Runner 2'));
}

console.log('\n=== generic boilerplate is never evidence ===');
{
  for (const generic of ['Official Trailer', 'Trailer', 'HD', 'Official Teaser', 'First Look']) {
    const result = isTrailerTitleForFilm(['Some Real Film'], generic);
    check(`"${generic}" rejected as evidence`, !result.ok, result.reason);
  }
}

console.log('\n=== pickBestSearchResult does not take the first hit ===');
{
  const candidates = [
    { videoId: 'WRONG1', title: 'Top Crypto To Buy In October 2026 (With Price Predictions)', channelTitle: 'Crypto Jon' },
    { videoId: 'WRONG2', title: 'Crypto News Weekly', channelTitle: 'Some Channel' },
    { videoId: 'RIGHT1', title: "'TALES FROM THE CRYPTO' Official Trailer (2026)", channelTitle: 'Dances With Films LA' },
  ];
  const best = pickBestSearchResult(candidates, ['Tales from the Crypto']);
  check('picks the matching candidate, not the first', best?.key === 'RIGHT1', `got ${best?.key}`);
}
{
  const candidates = [
    { videoId: 'ONLYBAD', title: 'Crypto News Weekly', channelTitle: 'Some Channel' },
  ];
  const best = pickBestSearchResult(candidates, ['Crypto']);
  check('returns null when nothing matches', best === null, `got ${best?.key}`);
}
{
  const candidates = [
    { videoId: 'ONLYGOOD', title: 'Night Comes Official Trailer', channelTitle: 'Studio Channel' },
  ];
  const best = pickBestSearchResult(candidates, ['Night Comes']);
  check('accepts a clean title match', best?.key === 'ONLYGOOD', `got ${best?.key}`);
}

console.log('\n=== pickBestTmdbVideo ===');
{
  const videos = [
    { key: 'CLIP1', name: 'Behind the Scenes', type: 'Behind the Scenes', site: 'YouTube' },
    { key: 'TRAIL1', name: 'Official Trailer', type: 'Trailer', site: 'YouTube', official: true },
    { key: 'VIMEO1', name: 'Official Trailer', type: 'Trailer', site: 'Vimeo' },
  ];
  const oembed: Record<string, string> = { TRAIL1: 'Night Comes | Official Trailer' };
  const best = pickBestTmdbVideo(videos, ['Night Comes'], (key) => oembed[key]);
  check('picks the trailer, not the BTS clip', best?.key === 'TRAIL1', `got ${best?.key}`);
  check('ignores non-YouTube videos', best?.key !== 'VIMEO1');
}
{
  // A TMDB video whose oEmbed title names a DIFFERENT film must not be used.
  const videos = [
    { key: 'OTHERFILM', name: 'Trailer', type: 'Trailer', site: 'YouTube' },
  ];
  const oembed: Record<string, string> = { OTHERFILM: 'GODZILLA MINUS ZERO Official Trailer' };
  const best = pickBestTmdbVideo(videos, ['The Draw'], (key) => oembed[key]);
  check('rejects a TMDB video belonging to another film', best === null, `got ${best?.key}`);
}
{
  // Non-Latin titles: TMDB lists the film's home-market trailer.
  const videos = [
    { key: 'MALAYALAM1', name: 'കൂടോത്രം 2 Trailer', type: 'Trailer', site: 'YouTube' },
  ];
  const oembed: Record<string, string> = { MALAYALAM1: 'കൂടോത്രം 2 | Official Trailer' };
  const best = pickBestTmdbVideo(videos, ['Koodothram 2', 'കൂടോത്രം 2'], (key) => oembed[key]);
  check('accepts a non-latin trailer when the original title matches', best?.key === 'MALAYALAM1', `got ${best?.key}`);
}

console.log('\n=== non-trailer signals ===');
{
  const rejected = [
    'Crypto News: Top 10 Coins to Buy',
    'Full Movie | The Draw | Hollywood Action',
    'Breaking: Night Comes box office record',
    'Top Crypto To Buy In October 2026',
  ];
  for (const title of rejected) {
    const result = isTrailerTitleForFilm(['Crypto', 'The Draw', 'Night Comes'], title);
    check(`"${title.slice(0, 42)}" rejected`, !result.ok, result.reason);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`PASSED: ${passed} | FAILED: ${failed}`);
console.log('='.repeat(60));
if (failed > 0) {
  console.error('\n❌ Trailer verification tests FAILED\n');
  process.exit(1);
}
console.log('\n✅ All trailer verification tests passed\n');
