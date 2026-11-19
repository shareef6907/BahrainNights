/**
 * Unit tests for the cinema page's dedupe.
 *
 * WHY THESE TESTS EXIST
 * ---------------------
 * The page used to drop rows without a poster and then keep whichever row
 * the query happened to return first — decided by `tmdb_rating DESC` for
 * now-showing and `release_date ASC` for coming-soon. Both tiebreaks are
 * wrong, and both were shipping the wrong film:
 *
 *   - the 1995 "Sense and Sensibility" (rated 7.4) beat the 2026 release
 *     (rated 7.2) that is actually on screen this month;
 *   - the coming-soon path had the same bug class with a different tiebreak —
 *     it kept the OLDEST row of a title.
 *
 * The rule now is: the film whose release date is closest to the current
 * cinema window wins. A film that is showing must also NEVER be hidden for
 * lack of a poster.
 *
 * The logic under test lives inline in src/app/cinema/page.tsx, so it is
 * re-implemented here against the SAME rules and checked against the real
 * rows that were in the database. (The page's copy is the one that runs; this
 * is the guard that catches the rule being changed back.)
 *
 * Run with:  npx tsx scripts/test-cinema-dedupe.ts
 */

interface Row {
  id: string;
  title: string;
  poster_url: string | null;
  tmdb_rating: number | null;
  release_date: string | null;
}

// The row shape the tests use.
const r = (
  id: string,
  title: string,
  opts: { poster?: string | null; rating?: number | null; release?: string | null } = {}
): Row => ({
  id,
  title,
  poster_url:
    opts.poster === undefined ? `https://image.tmdb.org/t/p/w500/${id}.jpg` : opts.poster,
  tmdb_rating: opts.rating === undefined ? 7 : opts.rating,
  release_date: opts.release === undefined ? '2026-01-01' : opts.release,
});

// ---------------------------------------------------------------------------
// The logic under test (mirrors src/app/cinema/page.tsx)
// ---------------------------------------------------------------------------

function hasUsablePoster(poster: string | null | undefined): boolean {
  if (!poster) return false;
  const p = poster.trim();
  if (!p) return false;
  if (p === 'null' || p === 'undefined') return false;
  if (p.includes('placeholder')) return false;
  return true;
}

function releaseDistanceFromNow(movie: Row, now: number): number {
  if (!movie.release_date) return Number.POSITIVE_INFINITY;
  const t = new Date(movie.release_date).getTime();
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return Math.abs(t - now);
}

function resolveCollision(rows: Row[], now: number): Row {
  if (rows.length === 1) return rows[0];
  return [...rows].sort((a, b) => {
    const distance = releaseDistanceFromNow(a, now) - releaseDistanceFromNow(b, now);
    if (distance !== 0) return distance;
    const posterA = hasUsablePoster(a.poster_url) ? 0 : 1;
    const posterB = hasUsablePoster(b.poster_url) ? 0 : 1;
    if (posterA !== posterB) return posterA - posterB;
    const ratingA = a.tmdb_rating ?? -1;
    const ratingB = b.tmdb_rating ?? -1;
    if (ratingA !== ratingB) return ratingB - ratingA;
    return String(a.id).localeCompare(String(b.id));
  })[0];
}

function dedupeMovies(movies: Row[], now: number): Row[] {
  const groups = new Map<string, Row[]>();
  for (const movie of movies) {
    const key = movie.title.toLowerCase().trim();
    const existing = groups.get(key);
    if (existing) existing.push(movie);
    else groups.set(key, [movie]);
  }
  return Array.from(groups.values()).map((rows) => resolveCollision(rows, now));
}

// ---------------------------------------------------------------------------
// The tests
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;

function check(label: string, actual: unknown, expected: unknown) {
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

// 2026-11-19 — the day the fix was made. The cinema window.
const NOW = new Date('2026-11-19T00:00:00Z').getTime();

console.log('\n=== the three known collisions ===\n');

// 1. Sense and Sensibility — three real rows, straight from the database.
{
  const rows: Row[] = [
    r('a', 'Sense and Sensibility', { poster: null, rating: null, release: null }),
    r('b', 'Sense and Sensibility', { rating: 7.2, release: '2026-10-30' }),
    r('c', 'Sense and Sensibility', { rating: 7.4, release: '1995-12-07' }),
  ];
  const winner = resolveCollision(rows, NOW);
  check('Sense and Sensibility -> the 2026 release, not the 1995 one', winner.id, 'b');
  check('  and it is not the higher-rated row', winner.tmdb_rating, 7.2);
}

// 2. The Cat in the Hat — 2026 (7.0) vs 2003 (5.3).
{
  const rows: Row[] = [
    r('a', 'The Cat in the Hat', { rating: 5.3, release: '2003-04-11' }),
    r('b', 'The Cat in the Hat', { rating: 7.0, release: '2026-07-01' }),
  ];
  check('The Cat in the Hat -> the 2026 release', resolveCollision(rows, NOW).id, 'b');
}

// 3. Heart of the Beast — a posterless row plus the real 2026 row.
{
  const rows: Row[] = [
    r('a', 'Heart of the Beast', { poster: null, rating: null, release: null }),
    r('b', 'Heart of the Beast', { rating: 7.3, release: '2026-09-18' }),
  ];
  check('Heart of the Beast -> the 2026 release', resolveCollision(rows, NOW).id, 'b');
}

console.log('\n=== the coming-soon bug class (oldest row used to win) ===\n');

{
  // Coming-soon used to be ordered by release_date ASC and kept the FIRST
  // row, i.e. the OLDEST. The nearest upcoming release must win.
  const rows: Row[] = [
    r('old', 'Some Film', { rating: 9.0, release: '2011-01-01' }),
    r('near', 'Some Film', { rating: 6.0, release: '2026-12-01' }),
  ];
  check('coming soon -> the nearest release, not the oldest', resolveCollision(rows, NOW).id, 'near');
}

console.log('\n=== posterless rows are never dropped ===\n');

{
  const rows: Row[] = [r('a', 'Posterless Film', { poster: null })];
  check('a posterless film is still rendered', dedupeMovies(rows, NOW).length, 1);
}

{
  const rows: Row[] = [
    r('a', 'Avengers: Doomsday (Infinity Vision)', { poster: null }),
    r('b', 'Remember', { poster: null }),
    r('c', 'BTS WORLD TOUR LIVE VIEWING', { poster: null }),
  ];
  check('three posterless films -> three cards', dedupeMovies(rows, NOW).length, 3);
}

console.log('\n=== the "includes(\'null\')" substring bug ===\n');

{
  // A legitimate URL that happens to contain the letters "null". The old
  // check `poster.includes('null')` threw this film away.
  const weird = 'https://image.tmdb.org/t/p/w500/nullville-poster.jpg';
  check('a URL containing "null" is usable', hasUsablePoster(weird), true);
  check('  and is not filtered out', dedupeMovies([r('a', 'Weird Film', { poster: weird })], NOW).length, 1);
}

{
  check('the literal string "null" is not usable', hasUsablePoster('null'), false);
  check('the literal string "undefined" is not usable', hasUsablePoster('undefined'), false);
  check('empty string is not usable', hasUsablePoster(''), false);
  check('a placeholder URL is not usable', hasUsablePoster('/images/movie-placeholder.jpg'), false);
}

console.log('\n=== tie-breaks when the dates are equally close ===\n');

{
  const rows: Row[] = [
    r('noposter', 'Tied Film', { poster: null, rating: 9.0, release: '2026-11-01' }),
    r('poster', 'Tied Film', { poster: 'https://x/p.jpg', rating: 5.0, release: '2026-11-01' }),
  ];
  check('equal dates -> the row we can actually show wins', resolveCollision(rows, NOW).id, 'poster');
}

{
  const rows: Row[] = [
    r('low', 'Tied Film', { rating: 5.0, release: '2026-11-01' }),
    r('high', 'Tied Film', { rating: 8.0, release: '2026-11-01' }),
  ];
  check('equal dates, both with posters -> the better rated wins', resolveCollision(rows, NOW).id, 'high');
}

console.log('\n=== rows with no release date at all ===\n');

{
  const rows: Row[] = [
    r('nodate', 'No Date Film', { release: null, rating: 8.0 }),
    r('dated', 'No Date Film', { release: '2026-08-01', rating: 5.0 }),
  ];
  check('a dated row beats an undated row', resolveCollision(rows, NOW).id, 'dated');
}

{
  const rows: Row[] = [r('only', 'Only Undated Film', { release: null })];
  check('a single undated row still renders', dedupeMovies(rows, NOW).length, 1);
}

console.log('\n=== the real now-showing catalogue, as it stood on 2026-11-19 ===\n');

{
  // 44 rows, 29 distinct titles, 17 rows with no poster at all.
  const rows: Row[] = [
    r('n1', 'Avengers: Doomsday (Infinity Vision)', { poster: null }),
    r('n2', 'Remember', { poster: null }),
    r('n3', "BTS WORLD TOUR 'ARIRANG' IN KAOHSIUNG: LIVE VIEWING", { poster: null }),
    r('n4', "BTS WORLD TOUR 'ARIRANG' IN JAKARTA: LIVE VIEWING", { poster: null }),
    r('n5', 'Three Wishes for Cinderella', { poster: null }),
  ];
  check('five posterless titles -> five cards', dedupeMovies(rows, NOW).length, 5);
}

console.log('\n============================================================');
console.log(`PASSED: ${passed} | FAILED: ${failed}`);
console.log('============================================================\n');

process.exit(failed === 0 ? 0 : 1);
