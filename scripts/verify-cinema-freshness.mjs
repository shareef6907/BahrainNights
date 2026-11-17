#!/usr/bin/env node
/**
 * verify-cinema-freshness.mjs
 *
 * Standalone health check for the /cinema page. Uses ONLY public endpoints, so
 * it needs no database credentials and can run from anywhere (CI, cron, a
 * laptop). It exits non-zero when something is wrong, so it can be wired
 * straight into a monitoring job.
 *
 * WHY THIS EXISTS
 * ---------------
 * The cinema-sync workflow failed on every scheduled run between 2026-11-04 and
 * 2026-11-17 and NOTHING surfaced it. Two independent reasons it stayed quiet:
 *
 *   1. The Cineco scraper catches its own browser-launch failure and returns
 *      an empty array, so the job exited 0. A green run did not mean a
 *      successful scrape.
 *   2. Every existing check in this repo (scripts/check-cinema-status.js,
 *      scripts/check-orphan-movies.js) inspects the DATABASE. None of them
 *      look at what the live page actually renders, so rows silently
 *      disappearing between the table and the page were invisible.
 *
 * This check closes both gaps:
 *   A. STALE  - is the data actually fresh?
 *   B. SOURCES - is every cinema source contributing, or has one silently
 *                gone to zero?
 *   C. LOSS   - does the live page render everything the page's own filter
 *                would keep? (i.e. is anything being dropped on the way out?)
 *
 * Usage:
 *   node scripts/verify-cinema-freshness.mjs
 *   node scripts/verify-cinema-freshness.mjs --site https://www.bahrainnights.com
 *   node scripts/verify-cinema-freshness.mjs --max-age-hours 36
 */

import { execFileSync } from 'node:child_process';

const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}

const SITE = flag('site', 'https://www.bahrainnights.com').replace(/\/$/, '');
const MAX_AGE_HOURS = Number(flag('max-age-hours', '36'));
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

/**
 * Cinema sources that are supposed to contribute. A source dropping to zero is
 * the exact signature of a scraper that has silently stopped working.
 */
const EXPECTED_SOURCES = ['vox', 'cineco'];

const failures = [];
const warnings = [];

// Colour only when writing to a terminal, so CI logs stay readable.
const useColour = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, text) => (useColour ? `\x1b[${code}m${text}\x1b[0m` : text);

function fail(msg) {
  failures.push(msg);
  console.log(`  ${paint('31', 'FAIL')}  ${msg}`);
}
function warn(msg) {
  warnings.push(msg);
  console.log(`  ${paint('33', 'WARN')}  ${msg}`);
}
function ok(msg) {
  console.log(`  ${paint('32', 'OK')}    ${msg}`);
}

async function getJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.json();
}

async function getText(url) {
  const res = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.text();
}

/**
 * Mirrors filterValidMovies() in src/app/cinema/page.tsx exactly:
 * a movie must have a poster_url that is not a placeholder, and duplicates are
 * removed by lower-cased title. If this copy ever drifts from the page's
 * filter, CHECK C would report a false loss - so it is kept deliberately
 * literal.
 */
function filterValidMovies(movies) {
  const valid = movies.filter((m) => {
    const poster = m.poster_url || '';
    if (!poster || poster.includes('placeholder') || poster.includes('null')) return false;
    return true;
  });
  const seen = new Set();
  return valid.filter((m) => {
    const key = (m.title || '').toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Counts the movie cards actually rendered on the page.
 *
 * Movie cards render their poster with loading="lazy"; the Netflix-style hero
 * image above the grid does not. Counting only lazy-loaded <img> tags gives
 * exactly the "Now Showing" grid - which is what the server renders, because
 * "Coming Soon" is behind a client-side tab and is not in the initial HTML.
 */
function countRenderedCards(html) {
  const lazyTags = html.match(/<img[^>]*loading="lazy"[^>]*>/g) || [];
  const alts = new Set();
  for (const tag of lazyTags) {
    const m = tag.match(/alt="([^"]*)"/);
    if (m) alts.add(m[1]);
  }
  return alts.size;
}

console.log('='.repeat(78));
console.log('CINEMA FRESHNESS CHECK');
console.log('='.repeat(78));
console.log(`site         : ${SITE}`);
console.log(`max age      : ${MAX_AGE_HOURS}h`);
console.log('');

try {
  // ---------------------------------------------------------------------
  // Fetch the data the page renders from.
  // ---------------------------------------------------------------------
  const [nowRes, soonRes] = await Promise.all([
    getJson(`${SITE}/api/cinema/movies?status=now_showing&limit=500`),
    getJson(`${SITE}/api/cinema/movies?status=coming_soon&limit=500`),
  ]);
  const nowRows = nowRes.movies || [];
  const soonRows = soonRes.movies || [];
  const allRows = [...nowRows, ...soonRows];

  // ---------------------------------------------------------------------
  // CHECK A - is the data fresh?
  // ---------------------------------------------------------------------
  console.log('A. DATA FRESHNESS');
  const stamps = allRows
    .map((m) => m.updated_at || m.last_scraped || m.last_synced_at)
    .filter(Boolean)
    .map((s) => new Date(s).getTime())
    .filter((t) => !Number.isNaN(t));

  if (stamps.length === 0) {
    fail('No timestamps on any movie row - cannot determine data age.');
  } else {
    const newest = Math.max(...stamps);
    const ageHours = (Date.now() - newest) / 36e5;
    const when = new Date(newest).toISOString();
    if (ageHours > MAX_AGE_HOURS) {
      fail(
        `Cinema data is STALE: newest row was updated ${ageHours.toFixed(1)}h ago ` +
          `(${when}), limit is ${MAX_AGE_HOURS}h. The sync workflow is probably failing.`
      );
    } else {
      ok(`Data is fresh: newest row updated ${ageHours.toFixed(1)}h ago (${when}).`);
    }
  }
  console.log('');

  // ---------------------------------------------------------------------
  // CHECK B - is every cinema source contributing?
  // ---------------------------------------------------------------------
  console.log('B. SOURCE COVERAGE');
  const perSource = new Map();
  for (const m of allRows) {
    const srcs = Array.isArray(m.scraped_from)
      ? m.scraped_from
      : m.scraped_from
        ? [m.scraped_from]
        : [];
    for (const s of srcs) {
      perSource.set(s, (perSource.get(s) || 0) + 1);
    }
  }
  for (const src of EXPECTED_SOURCES) {
    const n = perSource.get(src) || 0;
    if (n === 0) {
      fail(
        `Cinema source "${src}" contributed 0 movies. Its scraper is silently ` +
          `failing - the job still exits 0, so nothing else will report this.`
      );
    } else {
      ok(`Source "${src}" contributed ${n} movies.`);
    }
  }
  const unknown = [...perSource.keys()].filter((s) => !EXPECTED_SOURCES.includes(s));
  if (unknown.length) {
    warn(`Unexpected source(s) in scraped_from: ${unknown.join(', ')}`);
  }
  console.log('');

  // ---------------------------------------------------------------------
  // CHECK C - is anything lost between the table and the live page?
  // ---------------------------------------------------------------------
  console.log('C. PAGE RENDERING');
  const html = await getText(`${SITE}/cinema`);
  const rendered = countRenderedCards(html);
  const expected = filterValidMovies(nowRows).length;
  const expectedSoon = filterValidMovies(soonRows).length;

  if (rendered === 0) {
    fail('The /cinema page rendered 0 movie cards.');
  } else if (rendered < expected) {
    fail(
      `The /cinema page renders ${rendered} cards but ${expected} movies should ` +
        `qualify (${expected - rendered} lost between the table and the page).`
    );
  } else {
    ok(
      `Page renders ${rendered} "Now Showing" cards; ${expected} qualify from the table. ` +
        `(${expectedSoon} more in "Coming Soon", behind a client-side tab.)`
    );
  }
  console.log('');

  // ---------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------
  console.log('='.repeat(78));
  console.log(
    `now showing: ${nowRows.length} rows -> ${expected} with a usable poster | ` +
      `coming soon: ${soonRows.length} rows -> ${expectedSoon} | rendered: ${rendered}`
  );
  if (failures.length) {
    console.log(`RESULT: FAILED (${failures.length} failure(s), ${warnings.length} warning(s))`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  if (warnings.length) {
    console.log(`RESULT: PASSED with ${warnings.length} warning(s)`);
    process.exit(0);
  }
  console.log('RESULT: PASSED');
  process.exit(0);
} catch (err) {
  fail(`Check could not complete: ${err.message}`);
  console.log('');
  console.log('RESULT: FAILED');
  process.exit(1);
}
