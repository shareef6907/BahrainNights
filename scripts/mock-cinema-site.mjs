#!/usr/bin/env node
/**
 * A mock site for PROVING the contribution monitor detects a failing source.
 *
 * The monitor (scripts/verify-cinema-freshness.mjs) is meant to be run
 * against the live site, but "it passed on the live site" does not prove it
 * would have caught a broken scraper. This server serves a FIXTURE:
 *
 *   - a cinema whose scraper is HEALTHY (it contributes on every run), and
 *   - a cinema whose scraper is DEAD (it contributes on 8 of the last 12
 *     successful runs — the exact pattern observed in the real 30-day data),
 *
 * so the monitor must FAIL on the dead one.
 *
 * Usage:
 *   node scripts/mock-cinema-site.mjs [--port 3999] [--scenario dead|healthy]
 *
 * The scenario can also be taken from the environment variable
 * MOCK_SCENARIO.
 */

import http from 'node:http';

const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}

const PORT = Number(flag('port', process.env.MOCK_PORT || 3999));
const SCENARIO = flag('scenario', process.env.MOCK_SCENARIO || 'dead');

/**
 * The fixture run history.
 *
 * These are the REAL per-source counts from the 30-day window ending
 * 2026-11-20 (12 successful runs). In the `dead` scenario the Cineco counts
 * are the ones actually observed — 0 on 8 of 12 runs.
 */
const RUNS = [
  { started_at: '2026-11-20T11:12:44Z', vox: [26, 52], cineco: [22, 2] },
  { started_at: '2026-11-19T15:10:15Z', vox: [26, 46], cineco: [22, 2] },
  { started_at: '2026-11-19T05:45:28Z', vox: [24, 44], cineco: [0, 0] },
  { started_at: '2026-11-19T05:29:11Z', vox: [24, 44], cineco: [20, 0] },
  { started_at: '2026-11-18T21:56:20Z', vox: [24, 42], cineco: [20, 0] },
  { started_at: '2026-11-17T05:05:09Z', vox: [31, 48], cineco: [0, 0] },
  { started_at: '2026-11-17T04:58:07Z', vox: [31, 48], cineco: [0, 0] },
  { started_at: '2026-10-30T09:48:48Z', vox: [31, 64], cineco: [0, 0] },
  { started_at: '2026-10-28T09:29:18Z', vox: [34, 60], cineco: [0, 0] },
  { started_at: '2026-10-26T08:43:17Z', vox: [28, 76], cineco: [0, 0] },
  { started_at: '2026-10-23T08:24:05Z', vox: [30, 76], cineco: [0, 0] },
  { started_at: '2026-10-21T08:25:15Z', vox: [30, 68], cineco: [0, 0] },
];

const runRows = RUNS.map((r) => ({
  started_at: r.started_at,
  completed_at: r.started_at,
  status: 'completed',
  duration_ms: 9000,
  sources: {
    vox: { now_showing: r.vox[0], coming_soon: r.vox[1] },
    cineco:
      SCENARIO === 'healthy'
        ? { now_showing: 20, coming_soon: 2 }
        : { now_showing: r.cineco[0], coming_soon: r.cineco[1] },
  },
}));

/** A film, in the shape the monitor reads. */
const MOVIES = Array.from({ length: 40 }, (_, i) => ({
  id: `0000000${i}-0000-0000-0000-000000000000`,
  title: `Film ${i}`,
  poster_url: 'https://example.com/p.jpg',
  release_date: '2026-11-01',
  tmdb_rating: 7,
  updated_at: new Date().toISOString(),
  scraped_from: ['vox', 'cineco'],
}));

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'content-type': type });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  if (path === '/api/cinema/movies') {
    send(res, 200, { movies: MOVIES });
    return;
  }
  if (path === '/api/cinema/source-history') {
    send(res, 200, { runs: runRows, count: runRows.length });
    return;
  }
  if (path === '/cinema') {
    // 40 rendered cards, matching the 40 rows above.
    const cards = '<div data-testid="movie-card"></div>'.repeat(40);
    send(res, 200, `<html><body>${cards}</body></html>`, 'text/html');
    return;
  }
  send(res, 404, { error: 'not found' });
});

server.listen(PORT, () => {
  console.log(`mock cinema site listening on http://localhost:${PORT} (scenario: ${SCENARIO})`);
});
