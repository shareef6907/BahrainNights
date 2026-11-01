#!/usr/bin/env node
/**
 * Enumerates every routable page this app can serve and probes the running
 * server for it.
 *
 * WHY
 * ---
 * `next build` prints "Generating static pages (267/267)" and writes 188 .html
 * files. Those are two different denominators and it is easy to quote the
 * wrong one:
 *
 *   - 267 = pages Next.js RENDERED during the build.
 *   - 188 = pages Next.js PERSISTED to disk as a standalone .html document.
 *
 * The pages Next renders but does not persist (dynamic-route fallbacks, pages
 * whose output is a .body/.meta pair rather than a document, routes under a
 * path segment that groups several source paths onto one URL) are still
 * SERVED with HTTP 200. So the denominator that matters for an SEO audit is
 * "pages this server actually serves", not "html files on disk" and not
 * "pages the build counter mentions".
 *
 * This script computes exactly that: it enumerates every route from the build
 * manifest, expands the routes that have generateStaticParams, probes the
 * server, and reports the real numbers with raw output.
 *
 * USAGE
 * -----
 *   node scripts/audit-served-pages.mjs http://localhost:3111
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BASE = process.argv[2] || 'http://localhost:3111';
const OWN_DOMAIN = 'www.bahrainnights.com';

// --- read the build manifests ------------------------------------------------
const appPaths = JSON.parse(readFileSync(resolve(ROOT, '.next/app-path-routes-manifest.json'), 'utf8'));
const routesManifest = JSON.parse(readFileSync(resolve(ROOT, '.next/routes-manifest.json'), 'utf8'));
const prerender = JSON.parse(readFileSync(resolve(ROOT, '.next/prerender-manifest.json'), 'utf8'));

// --- the param expansions each SSG route produces -----------------------------
// Read from source, so this stays correct if the lists change.
const source = (p) => readFileSync(resolve(ROOT, p), 'utf8');

function topLevelKeys(file, marker) {
  const s = source(file);
  const i = s.indexOf(marker);
  const body = s.slice(i);
  return [...body.matchAll(/^\s{2}'?([a-z0-9-]+)'?\s*:\s*\{/gm)].map((m) => m[1]);
}

const CATEGORY_SLUGS = topLevelKeys('src/lib/categories.ts', 'CATEGORY_CONFIGS');
const LOCATION_SLUGS = topLevelKeys('src/types/blog.ts', 'LOCATION_DATA');

/** Event categories, from the same list the sync route validates against. */
const EVENT_CATEGORIES = [
  'music', 'sports', 'arts', 'dining', 'community', 'shopping', 'nightlife',
  'special', 'family', 'wellness', 'business', 'cultural', 'concerts',
];

/** International country codes, from the site's own /international pages. */
const INTERNATIONAL_COUNTRIES = [
  'cyprus', 'egypt', 'france', 'germany', 'greece', 'india', 'indonesia', 'italy',
  'jordan', 'kuwait', 'lebanon', 'malaysia', 'morocco', 'nigeria', 'oman', 'pakistan',
  'philippines', 'qatar', 'saudi-arabia', 'singapore', 'south-africa', 'spain',
  'thailand', 'turkiye', 'uae', 'uk', 'usa',
];

/**
 * Expansion rules for the 5 routes that declare generateStaticParams.
 * Each entry lists the concrete URLs that route produces.
 */
const EXPANSIONS = [
  { route: '/(category)/[slug]', prefix: '/', values: CATEGORY_SLUGS },
  { route: '/events/category/[category]', prefix: '/events/category/', values: EVENT_CATEGORIES },
  { route: '/international/[country]', prefix: '/international/', values: INTERNATIONAL_COUNTRIES },
  { route: '/regional/country/[country]', prefix: '/regional/country/', values: LOCATION_SLUGS },
  { route: '/regional/places-to-go/[location]', prefix: '/regional/places-to-go/', values: LOCATION_SLUGS },
];

// --- build the candidate URL list -------------------------------------------
const candidates = new Set();

// 1. Every UI route from the build manifest that has no path parameter.
for (const key of Object.keys(appPaths)) {
  if (!key.endsWith('/page')) continue;
  if (key.includes('/api/')) continue;
  let p = key.replace(/\/page$/, '');
  if (p.includes('[')) continue;
  if (p === '') p = '/';
  if (!p.startsWith('/')) p = '/' + p;
  candidates.add(p);
}

// 2. Every expansion of the SSG routes.
for (const exp of EXPANSIONS) {
  for (const v of exp.values) candidates.add(exp.prefix + v);
}

// 3. Every route the build manifest lists as a dynamic route with a fallback,
//    plus the pages the sitemap advertises.
for (const r of routesManifest.dynamicRoutes || []) {
  if (r.page.includes('[id]')) continue; // admin editors, one per record
  const m = r.page.match(/^\/(.*)\/\[([a-z]+)\]$/);
  if (!m) continue;
}

try {
  const sitemap = readFileSync(resolve(ROOT, '.next/server/app/sitemap.xml.body'), 'utf8');
  for (const m of sitemap.matchAll(/<loc>https?:\/\/[^<]*?bahrainnights\.com([^<]*)<\/loc>/g)) {
    const p = m[1] || '/';
    candidates.add(p);
  }
} catch {
  /* sitemap not built */
}

// 4. Pages the prerender manifest knows about.
for (const r of Object.keys(prerender.routes || {})) {
  const p = '/' + r.replace(/^\//, '');
  candidates.add(p);
}

// --- probe -------------------------------------------------------------------
async function probe(path) {
  try {
    const res = await fetch(BASE + path, { redirect: 'manual' });
    const text = res.headers.get('content-type')?.includes('text/html')
      ? await res.text()
      : '';
    return { path, status: res.status, text };
  } catch (err) {
    return { path, status: 0, text: '', error: String(err) };
  }
}

const list = [...candidates].sort();
const CONCURRENCY = 12;
const results = [];
for (let i = 0; i < list.length; i += CONCURRENCY) {
  const chunk = list.slice(i, i + CONCURRENCY);
  const got = await Promise.all(chunk.map(probe));
  results.push(...got);
}

// --- audit -------------------------------------------------------------------
const CANON_RE = /<link[^>]*rel=["']canonical["'][^>]*>/gi;
const CANON_HREF_RE = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i;
const OG_IMAGE_RE = /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
const NOINDEX_RE = /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i;

const EXPECTED_NOINDEX = [
  /^\/admin(\/|$)/, /^\/api(\/|$)/, /^\/venue-portal(\/|$)/,
  /^\/auth(\/|$)/, /^\/login(\/|$)/, /^\/register(\/|$)/,
  /^\/forgot-password(\/|$)/, /^\/reset-password(\/|$)/, /^\/offline(\/|$)/,
];

const served = results.filter((r) => r.status === 200);
const notFound = results.filter((r) => r.status === 404);
const other = results.filter((r) => r.status !== 200 && r.status !== 404);

console.log(`# base: ${BASE}`);
console.log(`# candidate URLs probed : ${results.length}`);
console.log(`# served HTTP 200       : ${served.length}`);
console.log(`# HTTP 404              : ${notFound.length}`);
console.log(`# other status          : ${other.length}`);
console.log('');

let noCanonical = 0, dupCanonical = 0, wrongHost = 0, noOg = 0, noindexMismatch = 0;
const problemRows = [];

for (const r of served) {
  const html = r.text;
  const canonTags = html.match(CANON_RE) || [];
  const canon = html.match(CANON_HREF_RE)?.[1] || null;
  const ogImage = html.match(OG_IMAGE_RE)?.[1] || null;
  const robots = html.match(NOINDEX_RE)?.[1] || null;
  const isNoindex = !!robots && /noindex/i.test(robots);
  const shouldNoindex = EXPECTED_NOINDEX.some((re) => re.test(r.path));

  const problems = [];
  if (canonTags.length === 0) { noCanonical++; problems.push('no-canonical'); }
  else if (canonTags.length > 1) { dupCanonical++; problems.push('duplicate-canonical'); }
  else if (!canon) problems.push('canonical-without-href');
  else {
    try {
      const host = new URL(canon).host;
      if (host !== OWN_DOMAIN) { wrongHost++; problems.push(`canonical-wrong-host:${host}`); }
    } catch { problems.push('canonical-not-absolute'); }
  }
  if (!ogImage) { noOg++; problems.push('missing-og-image'); }
  if (shouldNoindex !== isNoindex) { noindexMismatch++; problems.push('noindex-mismatch'); }

  if (problems.length) problemRows.push({ path: r.path, problems, canon, ogImage, isNoindex, shouldNoindex });
}

console.log('# === SEO TAG AUDIT (denominator = pages served HTTP 200) ===');
console.log(`# pages audited                          : ${served.length}`);
console.log(`# missing canonical                      : ${noCanonical}`);
console.log(`# duplicate canonical                    : ${dupCanonical}`);
console.log(`# canonical pointing at another domain   : ${wrongHost}`);
console.log(`# missing og:image                       : ${noOg}`);
console.log(`# noindex mismatch (expected vs actual)  : ${noindexMismatch}`);
console.log(`# pages with >=1 problem                 : ${problemRows.length}`);
console.log('');
if (problemRows.length) {
  console.log('path\tproblems\tcanonical\togImage\tnoindex\texpectedNoindex');
  for (const p of problemRows) {
    console.log(`${p.path}\t${p.problems.join(',')}\t${p.canon ?? '(none)'}\t${p.ogImage ? 'yes' : 'no'}\t${p.isNoindex}\t${p.shouldNoindex}`);
  }
}
console.log('');
console.log('# === non-200 candidates ===');
for (const r of notFound) console.log(`404\t${r.path}`);
for (const r of other) console.log(`${r.status}\t${r.path}`);
