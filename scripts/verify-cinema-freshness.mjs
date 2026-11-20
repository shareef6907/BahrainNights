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

/**
 * ============================================================================
 * THE CONTRIBUTION THRESHOLDS — DERIVED FROM 30 DAYS OF REAL RUNS
 * ============================================================================
 *
 * These numbers are NOT guesses. They are derived from the per-source counts
 * in the GitHub Actions logs of the cinema-sync workflow over the 30 days
 * ending 2026-11-20.
 *
 * THE RAW DATA
 * ------------
 * 12 SUCCESSFUL runs (8 further runs in the window failed and are excluded —
 * a failed run contributes nothing by definition):
 *
 *   run started          vox_now vox_soon cineco_now cineco_soon
 *   2026-11-20T11:12Z        26       52         22          2
 *   2026-11-19T15:10Z        26       46         22          2
 *   2026-11-19T05:45Z        24       44          0          0
 *   2026-11-19T05:29Z        24       44         20          0
 *   2026-11-18T21:56Z        24       42         20          0
 *   2026-11-17T05:05Z        31       48          0          0
 *   2026-11-17T04:58Z        31       48          0          0
 *   2026-10-30T09:48Z        31       64          0          0
 *   2026-10-28T09:29Z        34       60          0          0
 *   2026-10-26T08:43Z        28       76          0          0
 *   2026-10-23T08:24Z        30       76          0          0
 *   2026-10-21T08:25Z        30       68          0          0
 *
 * THE DISTRIBUTION
 * ----------------
 *   vox, now_showing   : 24, 24, 24, 26, 26, 28, 30, 30, 31, 31, 31, 34
 *                         min 24   max 34   median 28.5   zero-runs 0 of 12
 *   vox, coming_soon   : 42, 44, 44, 46, 48, 48, 52, 60, 64, 68, 76, 76
 *                         min 42   max 76   median 53     zero-runs 0 of 12
 *   cineco, now_showing: 20, 20, 22, 22  (the non-zero runs)
 *                         min 20   max 22   zero-runs 8 of 12  (67%)
 *   cineco, coming_soon: 2, 2           (the non-zero runs)
 *                         min 2    max 2    zero-runs 10 of 12 (83%)
 *
 * THE THRESHOLDS AND WHY
 * ----------------------
 * 1. VOLUME, per source — the minimum contribution that means "this source
 *    is alive", as a COUNT OF FILMS ON THE LIVE PAGE:
 *
 *      threshold = 50% of the source's smallest observed NON-ZERO per-run
 *                  contribution (now_showing + coming_soon), floored at 1
 *
 *    The factor of 50% is deliberate: the live page holds the CURRENT
 *    lineup, which is roughly one run's worth of films, but a cleanup pass
 *    can drop a film that is still listed on the cinema's own site. Half of
 *    the smallest healthy run is comfortably below a healthy source and
 *    comfortably above a dead one.
 *
 *      vox    : (24 + 42) * 0.5 = 33
 *      cineco : (20 +  0) * 0.5 = 10
 *
 *    Measured against the live site right now: vox 60 (38 now-showing +
 *    22 coming-soon), cineco 14 (14 + 0). Both are above their thresholds —
 *    so the check passes on a system where Cineco is in fact half-dead.
 *    That is what check D is for.
 *
 * 2. ZERO-RUN RATE — the rate at which a source contributes NOTHING, as a
 *    fraction of the successful runs examined:
 *
 *      threshold = 25% of successful runs
 *
 *    Derived from the data: the REFERENCE source (vox) contributed 0 in 0
 *    of 12 successful runs — a zero rate of 0%. The FAILING source
 *    (cineco) contributed 0 in 8 of 12 — a zero rate of 67%. A threshold
 *    of 25% (3 of 12) sits between the two with margin on both sides: it
 *    tolerates a couple of genuine one-off scraper failures, and it catches
 *    the 67% failure mode decisively.
 *
 * 3. RUNS EXAMINED = 12, the number of successful runs in the 30-day
 *    window. Twelve runs is enough to see a 67% pattern (8 of 12) and short
 *    enough that a broken source is caught within a day or two of the
 *    history filling up.
 *
 * WHY A PER-SOURCE THRESHOLD AT ALL
 * ---------------------------------
 * The old check was binary: a source that contributed 0 films FAILED, a
 * source that contributed 1 film PASSED. Against this data that is wrong in
 * both directions — it cannot tell a source that contributes 20 films from
 * one that contributes 2, and it cannot see the intermittent failure that
 * the Cineco scraper actually has.
 */

/** Minimum live contribution (films on the page) for a source to be alive. */
const CONTRIBUTION_THRESHOLD = {
  vox: 33,
  cineco: 10,
};

/** Maximum fraction of successful runs a source may contribute nothing to. */
const MAX_ZERO_RUN_RATE = 0.25;

/** How many recent runs the zero-run-rate check looks at. */
const RUNS_EXAMINED = 12;

/**
 * How many recent runs are needed before the zero-run-rate check can say
 * anything. Below this the history is too short to be meaningful, so the
 * check reports a warning rather than a verdict.
 */
const MIN_RUNS_FOR_RATE = 6;

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
 * Mirrors the page's dedupe in src/app/cinema/page.tsx:
 * duplicates are removed by lower-cased title, and the surviving row of each
 * group is the one whose release_date is closest to now (the film actually
 * screening) — NOT the highest rated and NOT whichever row sorted first.
 *
 * It deliberately does NOT drop rows without a poster any more: the page now
 * renders a branded fallback poster instead of hiding the film, so every
 * now-showing row reaches the page.
 *
 * If this copy ever drifts from the page's logic, CHECK C would report a false
 * loss - so it is kept deliberately literal.
 */
function dedupeMovies(movies) {
  const groups = new Map();
  for (const m of movies) {
    const key = (m.title || '').toLowerCase().trim();
    const list = groups.get(key);
    if (list) list.push(m);
    else groups.set(key, [m]);
  }
  const now = Date.now();
  const distance = (m) => {
    if (!m.release_date) return Number.POSITIVE_INFINITY;
    const t = new Date(m.release_date).getTime();
    if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
    return Math.abs(t - now);
  };
  const out = [];
  for (const list of groups.values()) {
    const sorted = [...list].sort((a, b) => {
      const d = distance(a) - distance(b);
      if (d !== 0) return d;
      const pa = a.poster_url ? 0 : 1;
      const pb = b.poster_url ? 0 : 1;
      if (pa !== pb) return pa - pb;
      const ra = a.tmdb_rating ?? -1;
      const rb = b.tmdb_rating ?? -1;
      if (ra !== rb) return rb - ra;
      return String(a.id).localeCompare(String(b.id));
    });
    out.push(sorted[0]);
  }
  return out;
}

/**
 * Counts the movie cards actually rendered on the page.
 *
 * Each grid card carries data-testid="cinema-movie-card". Counting that
 * marker is exact for BOTH kinds of card: one with a poster image and one
 * with the branded fallback poster for a film that has no artwork. (An earlier
 * version counted lazy-loaded <img> tags, which silently under-counted every
 * film without a poster.)
 */
function countRenderedCards(html) {
  const matches = html.match(/data-testid="cinema-movie-card"/g) || [];
  return matches.length;
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
    const threshold = CONTRIBUTION_THRESHOLD[src] ?? 1;
    if (n === 0) {
      fail(
        `Cinema source "${src}" contributed 0 movies. Its scraper is silently ` +
          `failing - the job still exits 0, so nothing else will report this.`
      );
    } else if (n < threshold) {
      warn(
        `Cinema source "${src}" contributed ${n} movies, below the derived ` +
          `threshold of ${threshold} (50% of its smallest healthy run). ` +
          `It is contributing, but less than half of what a healthy run gives.`
      );
    } else {
      ok(`Source "${src}" contributed ${n} movies (threshold ${threshold}).`);
    }
  }
  const unknown = [...perSource.keys()].filter((s) => !EXPECTED_SOURCES.includes(s));
  if (unknown.length) {
    warn(`Unexpected source(s) in scraped_from: ${unknown.join(', ')}`);
  }
  console.log('');

  // ---------------------------------------------------------------------
  // CHECK D - is any source contributing INTERMITTENTLY?
  // ---------------------------------------------------------------------
  //
  // The state of the table cannot show this. A source that contributed 20
  // films three weeks ago and has been dead ever since still has those 20
  // rows in the table, so check B sees a healthy-looking source.
  //
  // The run history CAN show it: each run records what each source
  // contributed that day, so a source that contributes 0 on most runs is
  // visible even though the job exits 0 every time.
  //
  // This is the observed failure mode: the Cineco scraper contributed 0 on
  // 8 of the last 12 successful runs while every run still exited 0.
  console.log('D. CONTRIBUTION HISTORY');
  try {
    const historyRes = await getJson(`${SITE}/api/cinema/source-history?limit=${RUNS_EXAMINED}`);
    const runs = historyRes.runs || [];

    if (runs.length < MIN_RUNS_FOR_RATE) {
      warn(
        `Only ${runs.length} cinema-sync run(s) recorded so far; at least ` +
          `${MIN_RUNS_FOR_RATE} are needed to judge the contribution rate. ` +
          `The per-source counts are recorded by every run from now on.`
      );
    } else {
      const examined = runs.slice(0, RUNS_EXAMINED);

      for (const src of EXPECTED_SOURCES) {
        const perRun = examined.map((run) => {
          const s = run.sources?.[src];
          if (!s) return null;
          const now = Number(s.now_showing ?? 0);
          const soon = Number(s.coming_soon ?? 0);
          return now + soon;
        });

        const known = perRun.filter((v) => v !== null);
        const zeroRuns = known.filter((v) => v === 0).length;
        const rate = known.length > 0 ? zeroRuns / known.length : 0;
        const nonZero = known.filter((v) => v > 0);

        const detail = known
          .map((v) => (v === 0 ? '0' : String(v)))
          .join(', ');

        if (known.length < MIN_RUNS_FOR_RATE) {
          warn(
            `Source "${src}": only ${known.length} run(s) with recorded counts; ` +
              `at least ${MIN_RUNS_FOR_RATE} are needed to judge the rate.`
          );
          continue;
        }

        if (nonZero.length === 0) {
          fail(
            `Source "${src}" contributed 0 films on ALL ${known.length} recorded runs ` +
              `(${detail}). Its scraper is dead - and because the job still exits 0, ` +
              `nothing else reports it.`
          );
        } else if (rate > MAX_ZERO_RUN_RATE) {
          fail(
            `Source "${src}" contributed 0 films on ${zeroRuns} of ${known.length} runs ` +
              `(${detail}) — a zero rate of ${(rate * 100).toFixed(0)}%, above the ` +
              `${(MAX_ZERO_RUN_RATE * 100).toFixed(0)}% threshold derived from the 30-day ` +
              `run history. The scraper is failing intermittently while the job still exits 0.`
          );
        } else {
          ok(
            `Source "${src}": ${zeroRuns}/${known.length} runs contributed nothing ` +
              `(${detail}) — a zero rate of ${(rate * 100).toFixed(0)}%, within the ` +
              `${(MAX_ZERO_RUN_RATE * 100).toFixed(0)}% threshold.`
          );
        }
      }
    }
  } catch (err) {
    warn(`Could not read the contribution history: ${err.message}`);
  }
  console.log('');

  // ---------------------------------------------------------------------
  // CHECK C - is anything lost between the table and the live page?
  // ---------------------------------------------------------------------
  console.log('C. PAGE RENDERING');
  const html = await getText(`${SITE}/cinema`);
  const rendered = countRenderedCards(html);
  const expected = dedupeMovies(nowRows).length;
  const expectedSoon = dedupeMovies(soonRows).length;

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
    `now showing: ${nowRows.length} rows -> ${expected} distinct titles | ` +
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
