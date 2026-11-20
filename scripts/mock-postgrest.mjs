#!/usr/bin/env node
/**
 * A mock PostgREST server for proving the per-film "Book" button end to end.
 *
 * WHY THIS EXISTS
 * ---------------
 * The per-film booking URLs live in `movies.booking_urls`, a column added by
 * `docs/sql/2026-11-20-add-movies-booking-urls.sql`. That script is MANUAL
 * and has NOT been run against production, so:
 *
 *   - the production database has no `booking_urls` column, and
 *   - creating one is a schema mutation, which this agent is not permitted
 *     to perform.
 *
 * Without a way to prove the feature works, "it should work" would be the
 * only claim available — and that is not evidence.
 *
 * So the dev server is pointed at THIS server instead of production. It
 * speaks enough PostgREST for the two queries the cinema page makes, and it
 * serves a movie row that has a per-film URL for BOTH VOX and Cineco — the
 * "dual-cinema film" case.
 *
 * The point is that the REAL code path runs: the server component fetches
 * the URLs, `buildBookingLinks` turns them into links, and the modal renders
 * a Book button per cinema. Only the database is faked.
 *
 * Usage:
 *   node scripts/mock-postgrest.mjs --port 5440
 */

import http from 'node:http';

const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}
const PORT = Number(flag('port', 5440));

/**
 * The featured-trailer fixture.
 *
 * The hero rotates through the films it is given, so a fixture with only ONE
 * film cannot demonstrate a dwell time — there is nothing to rotate to. This
 * is FOUR films, each with its own trailer, so the rotation can be measured
 * across four consecutive slides.
 *
 * The per-film slugs are the REAL VOX slugs, taken from VOX's own listing
 * page (https://bhr.voxcinemas.com/movies/whatson). A computed slug would
 * 404: VOX appends a language or format suffix the title never implies
 * ("Hadoota" -> `hadoota-arabic`, "Crypto" -> `crypto-arabic`).
 */
const FEATURED_TRAILERS = [
  { title: 'I Play Rocky', slug: 'i-play-rocky', trailer_key: 'dQw4w9WgXcQ' },
  { title: 'Hadoota', slug: 'hadoota-arabic', trailer_key: 'aqz-KE-bpKQ' },
  { title: 'Dune: Part Three', slug: 'dune-part-three', trailer_key: 'Way9Dexny3w' },
  { title: 'Crypto', slug: 'crypto-arabic', trailer_key: 'z9Ug-8f2H9w' },
];

/**
 * The dual-cinema fixture.
 *
 * These are REAL per-film URLs from the two cinemas' own listings, and both
 * are verified to answer HTTP 200:
 *
 *   https://bhr.voxcinemas.com/movies/i-play-rocky      -> 200
 *   https://bahrain.cineco.net/amy_movie/i-play-rocky/  -> 200
 */
const DUAL_CINEMA_MOVIE = {
  id: '11111111-1111-1111-1111-111111111111',
  title: 'I Play Rocky',
  slug: 'i-play-rocky',
  poster_url: 'https://image.tmdb.org/t/p/w500/poster.jpg',
  backdrop_url: 'https://image.tmdb.org/t/p/original/backdrop.jpg',
  trailer_key: 'dQw4w9WgXcQ',
  trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  rating: 'PG',
  synopsis: 'A dual-cinema fixture used to prove the per-film Book button.',
  runtime: 120,
  release_date: '2026-11-01',
  tmdb_id: 999001,
  tmdb_rating: 7.5,
  genre: ['Drama'],
  genres: ['Drama'],
  movie_cast: ['A. Actor', 'B. Actor'],
  language: 'English',
  duration: '2h 00m',
  is_now_showing: true,
  is_coming_soon: false,
  scraped_from: ['vox', 'cineco'],
  display_order: 1,
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  last_scraped: new Date().toISOString(),
  last_synced_at: new Date().toISOString(),
  /** THE THING UNDER TEST: a per-film URL for each cinema. */
  booking_urls: {
    vox: 'https://bhr.voxcinemas.com/movies/i-play-rocky',
    cineco: 'https://bahrain.cineco.net/amy_movie/i-play-rocky/',
  },
};

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-range': `0-${Math.max(0, (Array.isArray(body) ? body.length : 1) - 1)}/*`,
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const table = url.pathname.replace(/^\/rest\/v1\//, '').split('?')[0];

  console.log(`[mock-postgrest] ${req.method} ${url.pathname}${url.search}`);

  if (table === 'movies') {
    const select = url.searchParams.get('select') || '';
    // The booking_urls read is the one that carries the fixture's URLs.
    const wantsBooking = select.includes('booking_urls');
    const row = { ...DUAL_CINEMA_MOVIE };
    if (!wantsBooking) delete row.booking_urls;

    /*
     * There are THREE query shapes for `movies` here, and they must be told
     * apart correctly:
     *
     *   1. the cinema grid    — `is_now_showing=eq.true` / `is_coming_soon=eq.true`
     *   2. the hero's featured — `id=in.(...)` with the FULL column list
     *   3. the booking URLs   — `id=in.(...)` selecting ONLY `id,booking_urls`
     *
     * Shapes 2 and 3 both filter on `id`, so the filter alone cannot tell
     * them apart — the SELECT list does. Getting this wrong returns the
     * wrong rows for the booking lookup, and the Book buttons silently
     * disappear.
     */
    const isBookingQuery = /(^|,)booking_urls(,|$)/.test(select);
    const isFeaturedQuery = url.searchParams.has('id') && !isBookingQuery;

    if (isFeaturedQuery) {
      const rows = FEATURED_TRAILERS.map((f, i) => ({
        ...DUAL_CINEMA_MOVIE,
        id: `2222222${i}-2222-2222-2222-222222222222`,
        title: f.title,
        slug: f.slug,
        trailer_key: f.trailer_key,
        trailer_url: `https://www.youtube.com/watch?v=${f.trailer_key}`,
        display_order: i + 1,
        booking_urls: { vox: `https://bhr.voxcinemas.com/movies/${f.slug}` },
      }));
      return send(res, 200, rows);
    }

    // The cinema page asks for a set of columns; PostgREST returns only
    // those. Returning the whole row is fine for a fixture, but let me trim
    // to what was asked for so an over-broad select would be visible.
    if (isBookingQuery) {
      // The booking-URL lookup. It must return the row for the id that was
      // asked about, carrying the fixture's per-film URLs.
      const cols = select.split(',').map((c) => c.trim());
      const trimmed = {};
      for (const c of cols) if (c in row) trimmed[c] = row[c];
      return send(res, 200, [trimmed]);
    }

    if (select && select !== '*') {
      const cols = select.split(',').map((c) => c.trim());
      const trimmed = {};
      for (const c of cols) {
        if (c.includes('(') || c.includes(' ')) continue; // relation syntax
        if (c in row) trimmed[c] = row[c];
      }
      return send(res, 200, [trimmed]);
    }
    return send(res, 200, [row]);
  }

  // Everything else: an empty list, which every consumer handles.
  return send(res, 200, []);
});

server.listen(PORT, () => {
  console.log(`mock postgrest listening on http://localhost:${PORT}/rest/v1`);
});
