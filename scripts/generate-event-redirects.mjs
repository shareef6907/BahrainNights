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

/**
 * Read the map that is currently deployed.
 *
 * The generated module is a plain object literal, so it can be parsed without
 * executing it. This is the record of what production is SERVING right now.
 */
function readDeployedMap() {
  const redirects = {};
  const gone = [];
  let src;
  try {
    src = readFileSync(OUT_FILE, 'utf8');
  } catch {
    return { redirects, gone };
  }
  for (const m of src.matchAll(/^\s*"(\/events\/[^"]+)":\s*"([^"]+)",/gm)) {
    redirects[m[1]] = m[2];
  }
  for (const m of src.matchAll(/^\s*"(\/events\/[^"]+)",/gm)) {
    if (!redirects[m[1]]) gone.push(m[1]);
  }
  return { redirects, gone };
}

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
    // The feed resets the connection under sustained sequential fetching, so
    // each page is retried with a backoff. A partial feed would silently
    // classify live upstream events as dead.
    let body = null;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const res = await fetch(
          `${PL_BASE}?page=${page}&per_page=100&scope=affiliate.show.events&include=price`,
          {
            headers: {
              'Api-Key': key,
              'price_scope': 'price',
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(45000),
          },
        );
        if (!res.ok) throw new Error(`Platinumlist ${res.status}`);
        body = await res.json();
        break;
      } catch (err) {
        if (attempt === 5) throw err;
        console.error(`# feed page ${page} attempt ${attempt} failed (${err.message}); retrying...`);
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
    if (!body) throw new Error(`Platinumlist page ${page} could not be fetched`);
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
  const fromCache = process.argv.includes('--from-cache');

  // 1. Which event URLs does Google still know about?
  let impressions;
  let queriesByPage;
  let statuses;
  let dead;
  // Redirects that production is already serving, read back from the deployed
  // map. Populated when we probe live; empty when regenerating from cache
  // (the cached statuses are pre-deploy evidence, so the map is rebuilt in
  // full from the cached dead list instead).
  let carriedForward = [];
  let carriedGone = [];

  if (fromCache) {
    // Regenerate deterministically from the evidence we already verified,
    // instead of re-querying GSC and re-probing production. The cache holds
    // the GSC impressions, the per-URL HTTP status, and the dead-URL list.
    //
    // The cached STATUSES are the pre-deploy evidence and must not be
    // re-probed once the map is live: a redirected URL answers 301, not 404,
    // so a fresh probe would find no dead URLs at all and would silently
    // empty the map.
    const cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
    impressions = new Map(Object.entries(cache.impressions || {}));
    queriesByPage = new Map();
    for (const [page, list] of Object.entries(cache.queriesByPage || {})) {
      queriesByPage.set(page, list);
    }
    statuses = new Map(Object.entries(cache.statuses || {}));
    dead = cache.dead || [];
    console.error(`# using cached evidence: ${dead.length} dead URLs`);

    // The per-URL QUERIES are not in the cache (they were only needed to
    // infer a country), but they still matter: they are the strongest
    // evidence of which country a dead URL belonged to. Fetch them live —
    // GSC query data is stable for a closed date range.
    try {
      const token = gscToken();
      const queryRows = await gscQuery(token, 365, ['query', 'page']);
      queriesByPage = new Map();
      for (const row of queryRows) {
        const [, page] = row.keys;
        if (!queriesByPage.has(page)) queriesByPage.set(page, []);
        queriesByPage.get(page).push([row.keys[0], row.impressions]);
      }
      console.error(`# live GSC query data: ${queryRows.length} rows`);
    } catch (e) {
      console.error(`# WARNING: could not fetch GSC query data (${e.message}); ` +
        'country inference for some URLs may fall back to slug/feed evidence');
    }
  } else {
    const token = gscToken();
    const pageRows = await gscQuery(token, 365, ['page']);
    const queryRows = await gscQuery(token, 365, ['query', 'page']);

    impressions = new Map();
    for (const row of pageRows) impressions.set(row.keys[0], row.impressions);

    queriesByPage = new Map();
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
    statuses = new Map();
    const CONCURRENCY = 12;
    for (let i = 0; i < eventUrls.length; i += CONCURRENCY) {
      const chunk = eventUrls.slice(i, i + CONCURRENCY);
      const results = await Promise.all(chunk.map((u) => httpStatus(u)));
      chunk.forEach((u, j) => statuses.set(u, results[j]));
    }
    dead = eventUrls.filter((u) => statuses.get(u).status === 404);

    // A URL that is NOT a 404 needs no redirect. In particular, an event whose
    // row was restored (a past international event re-imported, a page brought
    // back by a content change) must keep serving its own page — a redirect
    // would shadow a live page and hand its ranking to a hub.
    const live = eventUrls.filter((u) => statuses.get(u).status === 200);
    console.error(`# currently 200 (left alone): ${live.length}`);

    // 🚨 A URL that is ALREADY REDIRECTING is not dead — it is SERVED.
    //
    // Once the map is deployed, every source answers 301, not 404. A fresh
    // probe therefore finds no dead URLs at all, and regenerating from that
    // probe would produce a 16-entry map — silently deleting 800 live
    // redirects and returning those URLs to 404. That is how the map gets
    // wiped by a well-meaning regeneration.
    //
    // The deployed map is the record of what is already served. Load it, and
    // carry every source forward that is still answering 301. Only entries
    // whose source has actually come back to life (200, or a live DB slug)
    // are dropped — which is exactly the intent of the map.
    const deployed = readDeployedMap();
    const stillRedirecting = eventUrls.filter((u) => statuses.get(u).status === 301);
    carriedForward = [];
    for (const u of stillRedirecting) {
      const path = new URL(u).pathname;
      if (!deployed.redirects[path]) continue;
      carriedForward.push({ path, dest: deployed.redirects[path] });
    }
    carriedGone = deployed.gone.filter((path) => {
      const u = `${SITE}${path}`;
      return statuses.get(u) && statuses.get(u).status === 410;
    });
    console.error(
      `# already redirecting (carried forward from the deployed map): ${carriedForward.length}`,
    );
    if (carriedGone.length) {
      console.error(`# already 410 (carried forward from the deployed map): ${carriedGone.length}`);
    }
  }

  const deadImpressions = dead.reduce((sum, u) => sum + (impressions.get(u) || 0), 0);
  console.error(`# dead URLs: ${dead.length}  (${deadImpressions} impressions)`);

  const eventUrls = [...impressions.keys()]
    .filter((u) => u.includes('/events/'))
    .sort();

  // 3. Evidence: the DB (for renamed slugs) and the live feed (for new slugs).
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const { data: dbEvents } = await supabase
    .from('events')
    .select('slug,country,category,source_event_id,status,is_hidden,date')
    .limit(5000);
  const bySourceId = new Map();
  const dbSlugs = new Set();
  // Slugs whose page RENDERS right now: the event detail route
  // (src/app/events/[slug]/page.tsx) selects exactly `status = 'published'`
  // and `is_hidden = false`, with no date filter. A slug in this set
  // therefore serves a 200 event page and MUST NOT be redirected.
  const liveSlugs = new Set();
  for (const e of dbEvents || []) {
    if (e.source_event_id) bySourceId.set(String(e.source_event_id), e);
    if (e.slug) dbSlugs.add(e.slug);
    if (e.slug && e.status === 'published' && !e.is_hidden) liveSlugs.add(e.slug);
  }
  console.error(`# live published DB slugs: ${liveSlugs.size}`);

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

    // (0) THE SLUG IS LIVE AGAIN IN THE DATABASE.
    //
    // A slug can be in the GSC dead list (it 404'd when the map was first
    // generated) while the event has since been re-imported or restored. The
    // event detail route renders any row with status='published' and
    // is_hidden=false, so that slug serves a real 200 page again.
    //
    // The HTTP recheck further down CANNOT catch this: once the redirect is
    // deployed the source URL answers 301, not 200, so the page looks dead
    // forever. The redirect then SHADOWS a live event page and hands its
    // ranking to a hub -- and, worse, the sitemap still advertises the slug
    // (the sitemap reads the same DB), so Google is told to index a URL that
    // redirects away.
    //
    // The database is the authority on whether a page exists, so consult it
    // here and leave a live slug alone.
    if (liveSlugs.has(slug)) {
      detail[path] = 'live-in-db|left-alone';
      stats['live-in-db'] = (stats['live-in-db'] || 0) + 1;
      console.error(`# LIVE in DB, not redirecting: ${path}`);
      continue;
    }

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

  // Carry forward the paths that are already served as 410 Gone. Same
  // reasoning as the 301 carry-forward: a 410 source answers 410, not 404,
  // so the probe above never lists it as dead and a regeneration would
  // return it to a 404.
  for (const path of carriedGone) {
    if (!sortedGone.includes(path) && !sortedRedirects[path]) {
      sortedGone.push(path);
      detail[path] = 'carried-forward|already-410';
    }
  }
  sortedGone.sort();

  const sources = [...Object.keys(sortedRedirects), ...sortedGone];

  // 4b. A destination that shows NO events is a soft 404: the visitor lands on
  //     a page that says "No events found" and Google sees a thin page. Worse,
  //     since PR #38 (2026-11-02) an empty hub is served as `noindex, nofollow`,
  //     so a redirect into one cannot consolidate any signal at all and the
  //     visitor gets nothing.
  //
  //     Every hub we point at must demonstrably contain real event listings,
  //     otherwise fall back to the populated index for that level:
  //       /events/category/<cat> with no events -> /events
  //       /international/<code> with no events -> /international
  //
  //     The emptiness test queries the DATABASE, not the rendered HTML. The
  //     database is what the page itself queries, so it is the authority, and
  //     an HTML scrape misreads hashes and build ids as event links.
  //
  //     The filters below mirror the pages exactly:
  //       /events/category/[category]
  //         status=published, is_hidden=false, country=Bahrain,
  //         category=<cat>, date >= today
  //       /international/[country]
  //         status=published, is_active=true, country=<db name>,
  //         (start_date >= today OR date >= today), and a 6-month back window
  const today = new Date().toISOString().split('T')[0];
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

  // A hub with a SINGLE listing is not a durable destination. The moment
  // that one event's date passes, the hub renders empty and PR #38 serves it
  // as `noindex, nofollow` — so every redirect pointing at it would land on
  // a noindex dead end. /events/category/sports held exactly one event
  // (kpw-underground-11-in-bahrain-109782) while 32 sources pointed at it.
  //
  // MIN_HUB_LISTINGS is the floor below which a category hub is treated as
  // unpopulated and the sources fall back to /events (which lists 510 events
  // and is indexable). Same reasoning applies to the country pages.
  const MIN_HUB_LISTINGS = 5;

  const { data: populatedCategories } = await supabase
    .from('events')
    .select('category')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .gte('date', today)
    .limit(5000);
  const catCounts = new Map();
  for (const r of populatedCategories || []) {
    if (!r.category) continue;
    catCounts.set(r.category, (catCounts.get(r.category) || 0) + 1);
  }
  const populatedCats = new Set(
    [...catCounts.entries()].filter(([, n]) => n >= MIN_HUB_LISTINGS).map(([c]) => c),
  );
  const thinCats = new Set(
    [...catCounts.entries()].filter(([, n]) => n < MIN_HUB_LISTINGS).map(([c]) => c),
  );

  const { data: populatedCountries } = await supabase
    .from('events')
    .select('country,start_date,date')
    .eq('status', 'published')
    .eq('is_active', true)
    .or(`start_date.gte.${today},date.gte.${today}`)
    .neq('country', 'Bahrain')
    .limit(5000);
  // The international pages keep a 6-month back window, so a country whose
  // only listings are recent past events is still a populated page.
  const ctryCounts = new Map();
  for (const r of populatedCountries || []) {
    if (!r.country) continue;
    if (((r.start_date || r.date) || '') < sixMonthsAgoStr) continue;
    ctryCounts.set(r.country, (ctryCounts.get(r.country) || 0) + 1);
  }
  const populatedCtry = new Set(
    [...ctryCounts.entries()].filter(([, n]) => n >= MIN_HUB_LISTINGS).map(([c]) => c),
  );

  // The site's URL country code -> the country name stored in the DB.
  const COUNTRY_CODE = {
    'UAE': 'uae', 'Saudi Arabia': 'saudi-arabia', 'Qatar': 'qatar', 'Kuwait': 'kuwait',
    'Oman': 'oman', 'Jordan': 'jordan', 'Lebanon': 'lebanon', 'Türkiye': 'turkiye',
    'Turkey': 'turkiye', 'Cyprus': 'cyprus', 'Egypt': 'egypt', 'Morocco': 'morocco',
    'South Africa': 'south-africa', 'Nigeria': 'nigeria', 'UK': 'uk',
    'United Kingdom': 'uk', 'Germany': 'germany', 'France': 'france', 'Spain': 'spain',
    'Italy': 'italy', 'Greece': 'greece', 'India': 'india', 'Pakistan': 'pakistan',
    'Singapore': 'singapore', 'Malaysia': 'malaysia', 'Thailand': 'thailand',
    'Indonesia': 'indonesia', 'Philippines': 'philippines', 'USA': 'usa',
    'United States': 'usa',
  };

  console.error(`# populated categories (Bahrain, upcoming, published, >=${MIN_HUB_LISTINGS} listings): ${[...populatedCats].sort().join(', ') || 'none'}`);
  console.error(`# populated countries (international, upcoming, published, >=${MIN_HUB_LISTINGS} listings): ${[...populatedCtry].sort().join(', ') || 'none'}`);
  if (thinCats.size) {
    console.error(`# THIN category hubs (<${MIN_HUB_LISTINGS} listings, treated as unpopulated): ${[...thinCats].sort().join(', ')}`);
  }

  const emptyDests = new Map();
  for (const dest of new Set(Object.values(sortedRedirects))) {
    if (dest.startsWith('/events/category/')) {
      const cat = dest.split('/').pop();
      if (!populatedCats.has(cat)) emptyDests.set(dest, dest);
    } else if (dest.startsWith('/international/')) {
      const code = dest.split('/').pop();
      const dbName = Object.keys(COUNTRY_CODE).find((k) => COUNTRY_CODE[k] === code);
      if (!dbName || !populatedCtry.has(dbName)) emptyDests.set(dest, dest);
    }
  }

  if (emptyDests.size) {
    console.error(`# ${emptyDests.size} destinations have no event listings; falling back:`);
    for (const dest of emptyDests.keys()) {
      const fb = dest.startsWith('/international/') ? '/international' : '/events';
      console.error(`#   ${dest} -> ${fb}`);
      for (const [path, d] of Object.entries(sortedRedirects)) {
        if (d === dest) {
          sortedRedirects[path] = fb;
          detail[path] = `${detail[path]}|empty-dest-fallback:${fb}`;
        }
      }
    }
  }

  // Carry forward the redirects that production is ALREADY serving.
  //
  // These sources answer 301, so the 404 probe above never saw them as dead.
  // Without this step a regeneration would emit a map containing only the
  // handful of URLs that are still genuinely 404 — and deploying it would
  // delete the other ~800 live redirects, returning those URLs to 404 and
  // giving back the impressions they were earning.
  //
  // A carried-forward entry is still subject to the destination checks above
  // (a destination that is now empty or noindex falls back), so the map can
  // still improve — it just cannot lose working redirects.
  if (carriedForward.length) {
    let added = 0;
    let skippedLive = 0;
    for (const { path, dest } of carriedForward) {
      const slug = path.split('/').pop();
      if (liveSlugs.has(slug)) {
        // The event came back to life: drop the redirect so the live page is
        // not shadowed. This is the map doing its job.
        skippedLive++;
        continue;
      }
      if (sortedRedirects[path]) continue;
      sortedRedirects[path] = dest;
      detail[path] = `carried-forward|already-redirecting:${dest}`;
      added++;
    }
    console.error(`# carried forward into the map: ${added} (${skippedLive} dropped — live again)`);
  }

  // The map's real size is not `dead.length`: entries carried forward from the
  // deployed map are still serving 301s and still earning impressions, so the
  // header must describe the map that is actually shipped.
  //
  // `impressions` is keyed by FULL URL (https://www.bahrainnights.com/events/...),
  // while the map is keyed by PATH — so every lookup has to go through SITE.
  const totalMapped = Object.keys(sortedRedirects).length + sortedGone.length;
  const mappedImpressions = [
    ...Object.keys(sortedRedirects),
    ...sortedGone,
  ].reduce((sum, path) => sum + (impressions.get(`${SITE}${path}`) || 0), 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    totalDead: dead.length,
    totalMapped,
    mappedImpressions,
    deadImpressions,
    redirects: sortedRedirects,
    gone: sortedGone,
    detail,
  };

  const serialized = renderModule(payload);

  if (writeCache) {
    writeFileSync(CACHE_FILE, JSON.stringify({
      dead, impressions: Object.fromEntries(impressions), statuses: Object.fromEntries(statuses),
      queriesByPage: Object.fromEntries(queriesByPage),
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
  // The HTTP recheck alone has a blind spot: once a redirect is deployed, its
  // source answers 301 -- not 200 -- so a source whose page came back to life
  // looks permanently dead to this probe. Check the DATABASE too: a slug with
  // a published, non-hidden row renders a 200 event page and must not be
  // shadowed by a redirect.
  for (const p of sources) {
    const slug = p.split('/').pop();
    if (liveSlugs.has(slug) && !liveSources.includes(p)) {
      liveSources.push(p);
      console.error(`# source is live in the DB (HTTP probe said ${'not-200'}): ${p}`);
    }
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

  // A destination that is served as `noindex` cannot consolidate any ranking
  // signal, so a redirect into one is a dead end even though it returns 200.
  // This is the check that would have caught the 89 redirects that PR #38
  // (2026-11-02) left pointing at empty, noindex hubs.
  console.error(`# checking ${dests.length} destinations are indexable...`);
  for (let i = 0; i < dests.length; i += CHECK_CONCURRENCY) {
    const chunk = dests.slice(i, i + CHECK_CONCURRENCY);
    const results = await Promise.all(
      chunk.map(async (d) => {
        try {
          const res = await fetch(`${SITE}${d}`, { redirect: 'manual' });
          const html = await res.text();
          const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
          return { dest: d, robots };
        } catch {
          return { dest: d, robots: '(unreadable)' };
        }
      }),
    );
    for (const r of results) {
      if (/noindex/i.test(r.robots)) {
        problems.push(`destination is noindex (${r.robots}): ${r.dest}`);
      }
    }
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
// ${payload.totalMapped} Platinumlist event URLs that Google still indexes but that
// no longer resolve to a live page (their rows were removed from the events table).
// Together they earn ${payload.mappedImpressions} impressions over 365 days. Each is
// mapped to the closest live page so the ranking and the clicks stop leaking.
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
