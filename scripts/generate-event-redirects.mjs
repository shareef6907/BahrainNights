#!/usr/bin/env node
/**
 * Generates the event redirect map consumed by next.config.ts + src/middleware.ts.
 *
 * WHY THIS EXISTS
 * ---------------
 * Platinumlist event pages were indexed by Google, then their rows were removed
 * from the `events` table (past international events were hard-deleted by
 * cleanupPastEvents() in scripts/platinumlist-api/fetch-international.ts).
 * The URLs kept their Google ranking but started returning 404, leaking
 * impressions every single day — 802 URLs, ~19.7k impressions over 365 days.
 *
 * This script rebuilds the map from live evidence:
 *   - GSC search performance (which URLs actually get impressions, and the
 *     queries Google received for each)
 *   - a live HTTP status check against production
 *   - the events table in Supabase (to detect a slug that merely CHANGED)
 *   - the live Platinumlist feed (to detect an event that is still upstream)
 *
 * The classification rules live in scripts/event-redirect-knowledge.mjs.
 *
 * USAGE
 * -----
 *   node scripts/generate-event-redirects.mjs          # writes src/data/event-redirects.ts
 *   node scripts/generate-event-redirects.mjs --check  # fails if the file is stale
 */
import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, mkdirSync, readFileSync as readText } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { QUERY_COUNTRY, resolveDestination, FEED_HOST_COUNTRY, FEED_TZ_COUNTRY } from './event-redirect-knowledge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
dotenv.config({ path: resolve(ROOT, '.env.local') });

const OUT_FILE = resolve(ROOT, 'src/data/event-redirects.ts');
const CACHE_FILE = resolve(ROOT, '.event-redirects-cache.json');
const SITE = 'https://www.bahrainnights.com';
const GSC_SITE = 'sc-domain:bahrainnights.com';
const GSC_ENDPOINT = 'https://searchconsole.googleapis.com/webmasters/v3';
const PL_BASE = 'https://api.platinumlist.net/v/7/events';

/**
 * The Platinumlist key lives in the sync route. Read it from there rather than
 * keeping a second copy of the secret in this file.
 */
function platinumlistKey() {
  if (process.env.PLATINUMLIST_API_KEY) return process.env.PLATINUMLIST_API_KEY;
  const route = readText(
    resolve(ROOT, 'src/app/api/admin/sync-platinumlist/route.ts'),
    'utf8',
  );
  const match = route.match(/PLATINUMLIST_API_KEY\s*=\s*'([^']+)'/);
  if (!match) throw new Error('Could not find PLATINUMLIST_API_KEY in the sync route.');
  return match[1];
}

// ---------------------------------------------------------------------------
// Data sources
// ---------------------------------------------------------------------------
function gscToken() {
  const gcloud = process.env.GCLOUD_BIN || '/opt/homebrew/share/google-cloud-sdk/bin/gcloud';
  return execFileSync(gcloud, [
    'auth', 'print-access-token',
    '--scopes=https://www.googleapis.com/auth/webmasters.readonly',
  ], { encoding: 'utf8' }).trim();
}

async function gscQuery(token, days, dimensions) {
  const end = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
  const start = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const res = await fetch(`${GSC_ENDPOINT}/sites/${GSC_SITE}/searchAnalytics/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit: 25000, dataState: 'final' }),
  });
  if (!res.ok) throw new Error(`GSC ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.rows || [];
}

/** Every Platinumlist event currently in the live feed, keyed by id. */
async function platinumlistFeed() {
  const key = platinumlistKey();
  const events = new Map();
  let page = 1;
  let totalPages = null;
  do {
    const res = await fetch(
      `${PL_BASE}?page=${page}&per_page=100&scope=affiliate.show.events&include=price`,
      {
        headers: {
          'Api-Key': key,
          'price_scope': 'price',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) throw new Error(`Platinumlist ${res.status}`);
    const body = await res.json();
    for (const e of body.data || []) events.set(String(e.id), e);
    totalPages = body.meta?.pagination?.total_pages ?? totalPages;
    page++;
    await new Promise((r) => setTimeout(r, 250));
  } while (totalPages && page <= totalPages);
  return events;
}

/** Live HTTP status of a URL, without following redirects. */
async function httpStatus(url) {
  const res = await fetch(url, { redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location') };
}

/**
 * The country an event is in, straight from Platinumlist.
 *
 * The feed carries the venue host (dubai.platinumlist.net) and the event
 * timezone (Asia/Dubai). Both come from Platinumlist itself, so they are
 * ground truth rather than inference from the title.
 */
function feedCountry(plEvent) {
  if (!plEvent) return null;
  const host = (plEvent.url || '').split('/')[2] || '';
  const subdomain = host.split('.')[0].toLowerCase();
  if (FEED_HOST_COUNTRY[subdomain]) return FEED_HOST_COUNTRY[subdomain];
  const tz = plEvent.timezone;
  if (tz && FEED_TZ_COUNTRY[tz]) return FEED_TZ_COUNTRY[tz];
  return null;
}

/** Same slug algorithm as src/lib/slug.ts (generateEventSlug). */
function slugify(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateSlug(title, id, hint) {
  const base = slugify(title);
  if (base) return `${base}-${id}`;
  const hintSlug = slugify(hint || '');
  if (hintSlug) return `${hintSlug}-${id}`;
  return `${id}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const checkOnly = process.argv.includes('--check');
  const writeCache = process.argv.includes('--cache');

  // 1. Which event URLs does Google still know about?
  const token = gscToken();
  const pageRows = await gscQuery(token, 365, ['page']);
  const queryRows = await gscQuery(token, 365, ['query', 'page']);

  const impressions = new Map();
  for (const row of pageRows) impressions.set(row.keys[0], row.impressions);

  const queriesByPage = new Map();
  for (const row of queryRows) {
    const [, page] = row.keys;
    if (!queriesByPage.has(page)) queriesByPage.set(page, []);
    queriesByPage.get(page).push([row.keys[0], row.impressions]);
  }

  const eventUrls = [...impressions.keys()]
    .filter((u) => u.includes('/events/'))
    .sort();
  console.error(`# GSC event URLs with impressions (365d): ${eventUrls.length}`);

  // 2. Which of them are actually broken right now?
  const statuses = new Map();
  const CONCURRENCY = 12;
  for (let i = 0; i < eventUrls.length; i += CONCURRENCY) {
    const chunk = eventUrls.slice(i, i + CONCURRENCY);
    const results = await Promise.all(chunk.map((u) => httpStatus(u)));
    chunk.forEach((u, j) => statuses.set(u, results[j]));
  }
  const dead = eventUrls.filter((u) => statuses.get(u).status === 404);
  const deadImpressions = dead.reduce((sum, u) => sum + impressions.get(u), 0);
  console.error(`# currently 404: ${dead.length}  (${deadImpressions} impressions)`);

  // A URL that is NOT a 404 needs no redirect. In particular, an event whose
  // row was restored (a past international event re-imported, a page brought
  // back by a content change) must keep serving its own page — a redirect
  // would shadow a live page and hand its ranking to a hub.
  const live = eventUrls.filter((u) => statuses.get(u).status === 200);
  console.error(`# currently 200 (left alone): ${live.length}`);

  // 3. Evidence: the DB (for renamed slugs) and the live feed (for new slugs).
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const { data: dbEvents } = await supabase
    .from('events')
    .select('slug,country,category,source_event_id')
    .limit(5000);
  const bySourceId = new Map();
  const dbSlugs = new Set();
  for (const e of dbEvents || []) {
    if (e.source_event_id) bySourceId.set(String(e.source_event_id), e);
    if (e.slug) dbSlugs.add(e.slug);
  }

  console.error('# fetching the live Platinumlist feed...');
  const feed = await platinumlistFeed();
  console.error(`# feed events: ${feed.size}`);

  // 4. Classify each dead URL.
  const redirects = {};
  const gone = [];
  const detail = {};
  const stats = {};

  for (const url of dead) {
    const slug = url.split('/').pop();
    const path = `/events/${slug}`;
    const idMatch = slug.match(/-(\d{5,6})$/);
    const sourceId = idMatch ? idMatch[1] : null;

    // (a) The event lives in the DB under a different slug.
    let newSlug = null;
    let feedCtry = null;
    const dbMatch = sourceId ? bySourceId.get(sourceId) : null;
    if (dbMatch && dbMatch.slug !== slug) {
      newSlug = dbMatch.slug;
    } else if (sourceId && feed.has(sourceId)) {
      // (b) The event is upstream but was never imported (or its slug changed).
      const plEvent = feed.get(sourceId);
      feedCtry = feedCountry(plEvent);
      const candidate = generateSlug(plEvent.name, plEvent.id, 'bahrain');
      // Only redirect to a slug we have actually imported. The feed carries the
      // CURRENT title, so regenerating a slug from it can produce a URL that
      // was never published (e.g. "Moonlight Splash ... in Dubai" -> a slug
      // ending "-in-dubai-106780" that has no page). Redirecting there would
      // trade a 404 for a 404.
      if (candidate !== slug && dbSlugs.has(candidate)) {
        newSlug = candidate;
      }
    } else if (sourceId) {
      // The event is gone from the feed too, but the DB may still know where
      // it was held.
      feedCtry = feedCountry({ ...(dbMatch || {}) });
    }

    // (c) What country do the GSC queries for this URL point at?
    const votes = new Map();
    for (const [query, imp] of queriesByPage.get(url) || []) {
      const q = query.toLowerCase();
      for (const [term, country] of Object.entries(QUERY_COUNTRY)) {
        if (q.includes(term)) votes.set(country, (votes.get(country) || 0) + imp);
      }
    }
    const queryCountry = [...votes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    const result = resolveDestination(slug, newSlug, queryCountry, feedCtry);

    if (result.destination) {
      redirects[path] = result.destination;
      detail[path] = `${result.reason}|${result.country || '?'}|${result.category || '-'}`;
      stats[result.reason.split(':')[0]] = (stats[result.reason.split(':')[0]] || 0) + 1;
    } else {
      gone.push(path);
      detail[path] = `410|${result.reason}|${result.category || '-'}`;
      stats['410'] = (stats['410'] || 0) + 1;
    }
  }

  const sortedRedirects = Object.fromEntries(
    Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b)),
  );
  const sortedGone = gone.sort();
  const sources = [...Object.keys(sortedRedirects), ...sortedGone];

  const payload = {
    generatedAt: new Date().toISOString(),
    totalDead: dead.length,
    deadImpressions,
    redirects: sortedRedirects,
    gone: sortedGone,
    detail,
  };

  const serialized = renderModule(payload);

  if (writeCache) {
    writeFileSync(CACHE_FILE, JSON.stringify({
      dead, impressions: Object.fromEntries(impressions), statuses: Object.fromEntries(statuses),
    }, null, 1));
    console.error(`# cached evidence to ${CACHE_FILE}`);
  }

  // 5. Self-checks — a bad map is worse than no map.
  const problems = [];
  for (const [path, dest] of Object.entries(sortedRedirects)) {
    if (!dest.startsWith('/events') && !dest.startsWith('/international')) {
      problems.push(`destination outside /events|/international: ${path} -> ${dest}`);
    }
    if (dest.startsWith('/international/')) {
      const code = dest.split('/').pop();
      if (!['cyprus', 'egypt', 'france', 'germany', 'greece', 'india', 'indonesia', 'italy', 'jordan', 'kuwait', 'lebanon', 'malaysia', 'morocco', 'nigeria', 'oman', 'pakistan', 'philippines', 'qatar', 'saudi-arabia', 'singapore', 'south-africa', 'spain', 'thailand', 'turkiye', 'uae', 'uk', 'usa'].includes(code)) {
        problems.push(`invalid international code: ${path} -> ${dest}`);
      }
    }
    if (dest.startsWith('/events/category/')) {
      const cat = dest.split('/').pop();
      if (!['music', 'sports', 'arts', 'dining', 'community', 'shopping', 'nightlife', 'special', 'family', 'wellness', 'business', 'cultural', 'concerts'].includes(cat)) {
        problems.push(`invalid category: ${path} -> ${dest}`);
      }
    }
    // No chains: a redirect target must not itself be a dead URL.
    if (sortedRedirects[dest] || sortedGone.includes(dest)) {
      problems.push(`redirect chain: ${path} -> ${dest}`);
    }
    // The target must resolve. If the site has a page for it, it should be a
    // live 200 — if Google already knows the target URL we can check it
    // directly, otherwise it is a hub page that was never a 404.
    const targetStatus = statuses.get(`${SITE}${dest}`);
    if (targetStatus && targetStatus.status !== 200) {
      problems.push(`target is not live (${targetStatus.status}): ${path} -> ${dest}`);
    }
  }

  // A redirect must never shadow a live page. The source URLs were checked
  // when the evidence was collected, but a page can come back to life in the
  // meantime (a past international event gets re-imported, a row is restored).
  // Re-check every source right now, and drop any that is no longer a 404.
  console.error(`# re-checking ${sources.length} source URLs for pages that came back to life...`);
  const liveSources = [];
  const CHECK_CONCURRENCY = 12;
  for (let i = 0; i < sources.length; i += CHECK_CONCURRENCY) {
    const chunk = sources.slice(i, i + CHECK_CONCURRENCY);
    const results = await Promise.all(chunk.map((p) => httpStatus(`${SITE}${p}`)));
    chunk.forEach((p, j) => {
      if (results[j].status === 200) liveSources.push(p);
    });
  }
  if (liveSources.length) {
    problems.push(
      `${liveSources.length} source(s) are live again and would be shadowed by a redirect: ` +
      liveSources.join(', '),
    );
  }

  // And every destination must return 200 RIGHT NOW, not just the ones
  // Google happens to know about. A redirect into a 404 is worse than no
  // redirect at all.
  const dests = [...new Set(Object.values(sortedRedirects))];
  console.error(`# re-checking ${dests.length} destinations...`);
  for (let i = 0; i < dests.length; i += CHECK_CONCURRENCY) {
    const chunk = dests.slice(i, i + CHECK_CONCURRENCY);
    const results = await Promise.all(chunk.map((d) => httpStatus(`${SITE}${d}`)));
    chunk.forEach((d, j) => {
      if (results[j].status !== 200) {
        problems.push(`destination is not live (${results[j].status}): ${d}`);
      }
    });
  }
  if (problems.length) {
    console.error('\n# SELF-CHECK FAILURES:');
    for (const p of problems) console.error(`#   ${p}`);
    process.exit(1);
  }

  if (checkOnly) {
    const current = readFileSync(OUT_FILE, 'utf8');
    if (current !== serialized) {
      console.error('FAIL: src/data/event-redirects.ts is stale. Re-run without --check.');
      process.exit(1);
    }
    console.error('OK: event-redirects.ts is up to date.');
    return;
  }

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, serialized);
  console.error(`# wrote ${OUT_FILE}`);
  console.error(`# ${Object.keys(sortedRedirects).length} x 301, ${sortedGone.length} x 410, of ${dead.length} dead URLs`);
  console.error('# breakdown:');
  for (const [k, v] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
    console.error(`#   ${String(v).padStart(4)}  ${k}`);
  }
}

/** Emit a TypeScript module so next.config.ts can import it without a JSON loader. */
function renderModule(payload) {
  const redirectLines = Object.entries(payload.redirects)
    .map(([source, destination]) => `  ${JSON.stringify(source)}: ${JSON.stringify(destination)},`)
    .join('\n');
  const goneLines = payload.gone.map((path) => `  ${JSON.stringify(path)},`).join('\n');

  return `// AUTO-GENERATED by scripts/generate-event-redirects.mjs — do not edit by hand.
//
// ${payload.totalDead} Platinumlist event URLs that Google still indexes but that
// return 404 (their rows were removed from the events table). Together they earn
// ${payload.deadImpressions} impressions over 365 days. Each is mapped to the
// closest live page so the ranking and the clicks stop leaking.
//
// Regenerate:  node scripts/generate-event-redirects.mjs
// Verify:      node scripts/generate-event-redirects.mjs --check

/** Dead event path -> closest live page. Served as a 301. */
export const eventRedirects: Record<string, string> = {
${redirectLines}
};

/** Dead event paths with no honest live replacement. Served as a 410 Gone. */
export const eventGonePaths: string[] = [
${goneLines}
];
`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
