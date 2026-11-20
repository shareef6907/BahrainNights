/**
 * Unit tests for the consolidated cleanTitle.
 *
 * WHY THESE TESTS EXIST
 * ---------------------
 * The broken regex shipped to production and silently renamed films:
 * "Ramayana" became "amayana" and was written to the database, where it then
 * survived for weeks. Nothing guarded it. These tests exist so that cannot
 * happen again silently.
 *
 * Run with:  npx tsx scripts/test-title-clean.ts
 */
import { cleanTitle, toTitleCase } from '../src/lib/cinema/title-clean';

let passed = 0;
let failed = 0;

function check(label: string, actual: string, expected: string) {
  if (actual === expected) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    console.log(`  ❌ ${label}`);
    console.log(`       expected: ${JSON.stringify(expected)}`);
    console.log(`       actual  : ${JSON.stringify(actual)}`);
  }
}

console.log('\n=== cleanTitle: the exact cases that must pass ===\n');

// The mandatory cases from the brief, verbatim.
check('Ramayana -> Ramayana', cleanTitle('Ramayana'), 'Ramayana');
check('Rocky -> Rocky', cleanTitle('Rocky'), 'Rocky');
check('Ran -> Ran', cleanTitle('Ran'), 'Ran');
check('Remember -> Remember', cleanTitle('Remember'), 'Remember');
check('"R Ramayana" -> Ramayana', cleanTitle('R Ramayana'), 'Ramayana');
check('"Rated PG Sinners" -> Sinners', cleanTitle('Rated PG Sinners'), 'Sinners');
check('"PG13 Wicked" -> Wicked', cleanTitle('PG13 Wicked'), 'Wicked');
check('"18TC Nosferatu" -> Nosferatu', cleanTitle('18TC Nosferatu'), 'Nosferatu');

console.log('\n=== cleanTitle: the bare-R regression, exhaustively ===\n');

// Every title that begins with R must survive intact. The old regex stripped
// the R from every one of them.
for (const title of [
  'R',
  'Ra',
  'Ram',
  'Ran',
  'Ramayana',
  'Rambo',
  'Rocky',
  'Remember',
  'Raging Bull',
  'Rabbit Hole',
  'Roma',
  'Rocky III',
  'Reality Bites',
  'Ronin',
  'Rear Window',
  'Riverside',
]) {
  check(`"${title}" survives the bare-R bug`, cleanTitle(title), title);
}

console.log('\n=== cleanTitle: rating prefixes ===\n');

check('"PG Wicked" -> Wicked', cleanTitle('PG Wicked'), 'Wicked');
check('"PG13 Wicked" -> Wicked', cleanTitle('PG13 Wicked'), 'Wicked');
check('"PG-13 Wicked" -> Wicked', cleanTitle('PG-13 Wicked'), 'Wicked');
check('"18+ Nosferatu" -> Nosferatu', cleanTitle('18+ Nosferatu'), 'Nosferatu');
check('"15+ Movie" -> Movie', cleanTitle('15+ Movie'), 'Movie');
check('"TC Movie" -> Movie', cleanTitle('TC Movie'), 'Movie');
check('"Rated R Movie" -> Movie', cleanTitle('Rated R Movie'), 'Movie');
check('"Rated PG-13 Movie" -> Movie', cleanTitle('Rated PG-13 Movie'), 'Movie');
check(
  'bare "Rated" is NOT stripped — "Rated" may be part of the title ("Rated X")',
  cleanTitle('Rated Movie'),
  'Rated Movie',
);
check(
  'only ONE rating token is stripped: "PG 18 Movie" -> "18 Movie"',
  cleanTitle('PG 18 Movie'),
  '18 Movie',
);

console.log('\n=== cleanTitle: trailing tags ===\n');

check('"Wicked (PG)" -> Wicked', cleanTitle('Wicked (PG)'), 'Wicked');
check('"Wicked (2026)" -> Wicked', cleanTitle('Wicked (2026)'), 'Wicked');
check('"Wicked (IMAX)" -> Wicked', cleanTitle('Wicked (IMAX)'), 'Wicked');
check('"Wicked (3D)" -> Wicked', cleanTitle('Wicked (3D)'), 'Wicked');
check('"Rocky (1976)" -> Rocky', cleanTitle('Rocky (1976)'), 'Rocky');
check('"Alien (2 hours 17 mins)" -> Alien', cleanTitle('Alien (2 hours 17 mins)'), 'Alien');
check('"Alien (97 mins)" -> Alien', cleanTitle('Alien (97 mins)'), 'Alien');

console.log('\n=== cleanTitle: entities and whitespace ===\n');

check('HTML entity decoded', cleanTitle('Rock &amp; Roll'), 'Rock & Roll');
check('apostrophe entity decoded', cleanTitle("Ocean&apos;s 11"), "Ocean's 11");
check('extra whitespace collapsed', cleanTitle('  The   Cat  '), 'The Cat');
check('empty input -> empty', cleanTitle(''), '');
check('null-ish input -> empty', cleanTitle(undefined as unknown as string), '');

console.log('\n=== cleanTitle: options ===\n');

check(
  'stripLeadingRating:false keeps the rating',
  cleanTitle('PG13 Wicked', { stripLeadingRating: false }),
  'PG13 Wicked',
);
check(
  'stripTrailingTags:false keeps the year',
  cleanTitle('Rocky (1976)', { stripTrailingTags: false }),
  'Rocky (1976)',
);
check(
  'toTitleCase:true title-cases an ALL-CAPS title',
  cleanTitle('THE CAT IN THE HAT', { toTitleCase: true }),
  'The Cat In The Hat',
);
check(
  'styled acronym is left alone by toTitleCase',
  toTitleCase('M.I.A. Movie'),
  'M.I.A. Movie',
);

check('"12 Years a Slave" -> 12 Years a Slave', cleanTitle('12 Years a Slave'), '12 Years a Slave');
check('"1984" -> 1984', cleanTitle('1984'), '1984');
check('"M.I.A." -> M.I.A.', cleanTitle('M.I.A.'), 'M.I.A.');

console.log('\n=== cleanTitle: real titles from the live catalogue ===\n');

// Titles that actually appeared in the scraped catalogue, including the ones
// the broken regex damaged.
for (const [input, expected] of [
  ['Ramayana', 'Ramayana'],
  ['amayana', 'amayana'],
  ['Rocky', 'Rocky'],
  ['Remember', 'Remember'],
  ['The Cat in the Hat', 'The Cat in the Hat'],
  ['Sense and Sensibility', 'Sense and Sensibility'],
  ['Three Wishes for Cinderella', 'Three Wishes for Cinderella'],
  ['Avengers: Doomsday', 'Avengers: Doomsday'],
  ['Hadoota', 'Hadoota'],
  ['Ebenezer', 'Ebenezer'],
  ['Clayface', 'Clayface'],
  ['Heart of the Beast', 'Heart of the Beast'],
  ['Wildwood', 'Wildwood'],
] as Array<[string, string]>) {
  check(`"${input}" unchanged`, cleanTitle(input), expected);
}

console.log('\n=== cleanTitle: screening format suffixes ===\n');

/*
 * A cinema prints the format it is screening a film in as a suffix. It is
 * NOT part of the title, so "Dune: Part Three" and "Dune: Part Three
 * -Preview Screening" are the SAME film and must not become two rows.
 *
 * Both spellings are real: "Dune: Part Three" and
 * "Dune: Part Three -Preview Screening" were both observed in the database.
 */
check(
  '"Dune: Part Three -Preview Screening" -> "Dune: Part Three"',
  cleanTitle('Dune: Part Three -Preview Screening'),
  'Dune: Part Three',
);
check(
  '"Dune: Part Three -Preview" -> "Dune: Part Three"',
  cleanTitle('Dune: Part Three -Preview'),
  'Dune: Part Three',
);
check(
  '"Dune: Part Three - Special Screening" -> "Dune: Part Three"',
  cleanTitle('Dune: Part Three - Special Screening'),
  'Dune: Part Three',
);
check(
  '"Dune: Part Three – Advanced Screening" -> "Dune: Part Three"',
  cleanTitle('Dune: Part Three – Advanced Screening'),
  'Dune: Part Three',
);
check(
  '"Dune: Part Three Preview Screening" -> "Dune: Part Three"',
  cleanTitle('Dune: Part Three Preview Screening'),
  'Dune: Part Three',
);
check(
  'the two Dune spellings clean to the SAME title',
  String(cleanTitle('Dune: Part Three -Preview Screening') === cleanTitle('Dune: Part Three')),
  'true',
);

// Titles that must NOT be damaged by the new rule.
check(
  '"Avengers: Doomsday (Infinity Vision)" unchanged — a REAL distinct VOX listing',
  cleanTitle('Avengers: Doomsday (Infinity Vision)'),
  'Avengers: Doomsday (Infinity Vision)',
);
check(
  '"Something Special" unchanged — a title that merely ends in the word "Special"',
  cleanTitle('Something Special'),
  'Something Special',
);
check(
  '"The Preview" unchanged — a title that merely ends in the word "Preview"',
  cleanTitle('The Preview'),
  'The Preview',
);
check(
  '"Crypto" unchanged',
  cleanTitle('Crypto'),
  'Crypto',
);
check(
  '"Tales from the Crypto" unchanged',
  cleanTitle('Tales from the Crypto'),
  'Tales from the Crypto',
);

console.log('\n============================================================');
console.log(`PASSED: ${passed} | FAILED: ${failed}`);
console.log('============================================================\n');

process.exit(failed === 0 ? 0 : 1);
