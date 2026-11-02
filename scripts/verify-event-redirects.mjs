#!/usr/bin/env node
/**
 * Verifies the generated redirect map against live production.
 *
 * Checks, for every source path in the map:
 *   1. the source is not a live 200 page (a redirect must not shadow a live page)
 *   2. the destination really returns 200 (a redirect must not land on a 404)
 *   3. no redirect chain (the destination must not itself be a dead source)
 *   4. no source appears in both the 301 map and the 410 list
 *
 * The source check is deployment-state aware. Before the map is live a source
 * is a 404; after it is live a source is a 301 (or 410 for the gone list).
 * Both are correct. A source that is 200 means the map would shadow a page
 * that is live — that is always a failure.
 *
 * The DESTINATION check is stricter. A source that already redirects, but to
 * somewhere other than the destination this map prescribes, means the
 * previously deployed map is still live and points somewhere else. That is
 * expected while a new map is being prepared, so it is a warning by default
 * and only a failure once the map under test is the one actually deployed.
 * Pass --pre-deploy to make that distinction explicit; the recommended proof
 * is to run the verifier against a local server built from the map under test,
 * where a mismatch IS a failure.
 *
 * Exits non-zero if any check fails.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONCURRENCY = 6;
const ATTEMPTS = 3;

const src = readFileSync(resolve(ROOT, 'src/data/event-redirects.ts'), 'utf8');

const redirectBlock = src.match(/export const eventRedirects: Record<string, string> = \{([\s\S]*?)\n\};/);
const goneBlock = src.match(/export const eventGonePaths: string\[\] = \[([\s\S]*?)\n\];/);

const redirects = {};
for (const m of redirectBlock[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) redirects[m[1]] = m[2];
const gone = [...goneBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

// --pre-deploy: the map under test is not the one live on production yet, so
// a source serving the OLD redirect is expected, not a failure.
const preDeploy = process.argv.includes('--pre-deploy');
// --site: verify against a local build instead of production.
const SITE = (() => {
  const i = process.argv.indexOf('--site');
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1].replace(/\/$/, '') : 'https://www.bahrainnights.com';
})();

console.log(`# map: ${Object.keys(redirects).length} x 301, ${gone.length} x 410`);
console.log(`# target: ${SITE}${preDeploy ? '  (--pre-deploy: stale redirects are warnings)' : ''}`);

async function status(url) {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      // A 404 or a 5xx is worth retrying; anything else is a stable answer.
      if (![404, 500, 502, 503].includes(res.status) || attempt === ATTEMPTS) return res.status;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400 * attempt));
  }
  return 0;
}

// Captures the Location header so a live 301 can be checked against the map.
const res301Target = new Map();

async function mapStatus(paths) {
  const out = new Map();
  for (let i = 0; i < paths.length; i += CONCURRENCY) {
    const chunk = paths.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map(async (p) => {
        const url = `${SITE}${p}`;
        for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
          try {
            const res = await fetch(url, { redirect: 'manual' });
            if (![404, 500, 502, 503].includes(res.status) || attempt === ATTEMPTS) {
              if (res.status === 301) res301Target.set(p, res.headers.get('location') || '');
              return res.status;
            }
          } catch {
            /* retry */
          }
          await new Promise((r) => setTimeout(r, 400 * attempt));
        }
        return 0;
      })
    );
    chunk.forEach((p, j) => out.set(p, results[j]));
  }
  return out;
}

const sources = [...Object.keys(redirects), ...gone];
console.log(`# checking ${sources.length} sources against ${SITE} ...`);
const sourceStatus = await mapStatus(sources);

// A source is acceptable when it is 404 (map not yet deployed), or when it
// already resolves to the redirect the map prescribes (map is live).
const live = [...sources].filter((s) => sourceStatus.get(s) === 200);
const notFound = [...sources].filter((s) => sourceStatus.get(s) === 404);
const applied = [...sources].filter((s) => {
  const st = sourceStatus.get(s);
  if (st === 410) return gone.includes(s);
  if (st !== 301) return false;
  const dest = redirects[s];
  if (!dest) return false;
  const expected = `${SITE}${dest}`;
  const actual = res301Target.get(s) || '';
  // Location may be absolute or relative, and may carry a query string.
  const actualPath = actual.startsWith('http') ? actual.replace(SITE, '') : actual;
  const actualClean = actualPath.split('?')[0].replace(/\/$/, '');
  const expectedClean = dest.split('?')[0].replace(/\/$/, '');
  return actualClean === expectedClean;
});
const wrongApplied = [...sources].filter((s) => {
  const st = sourceStatus.get(s);
  if (st === 410) return !gone.includes(s);
  if (st !== 301) return false;
  return !applied.includes(s);
});
// Under --pre-deploy the previously deployed map is still live, so a source
// that redirects somewhere else is the OLD map, not a defect in this one.
const staleApplied = preDeploy ? wrongApplied : [];
const realWrongApplied = preDeploy ? [] : wrongApplied;
const other = [...sources].filter((s) => ![200, 404, 301, 410].includes(sourceStatus.get(s)));

console.log(`# sources 404 (map not deployed yet): ${notFound.length}`);
console.log(`# sources already serving the mapped redirect: ${applied.length}`);
console.log(`# sources now 200 (SHADOWING a live page): ${live.length}`);
for (const s of live.slice(0, 40)) console.log(`   shadowed: ${s}`);
if (staleApplied.length) {
  console.log(`# sources serving the PREVIOUSLY deployed redirect (expected pre-deploy): ${staleApplied.length}`);
  for (const s of staleApplied.slice(0, 20)) {
    console.log(`   status 301 -> ${res301Target.get(s) || '(none)'}: ${s}`);
  }
}
if (realWrongApplied.length) {
  console.log(`# sources serving the WRONG redirect/status: ${realWrongApplied.length}`);
  for (const s of realWrongApplied.slice(0, 20)) {
    console.log(`   status ${sourceStatus.get(s)} -> ${res301Target.get(s) || '(none)'}: ${s}`);
  }
}
if (other.length) {
  console.log(`# sources with an unexpected status: ${other.length}`);
  for (const s of other.slice(0, 20)) console.log(`   status ${sourceStatus.get(s)}: ${s}`);
}

const destinations = [...new Set(Object.values(redirects))];
console.log(`# checking ${destinations.length} distinct destinations ...`);
const destStatus = await mapStatus(destinations);
const badDest = destinations.filter((d) => destStatus.get(d) !== 200);
console.log(`# destinations returning 200: ${destinations.length - badDest.length}/${destinations.length}`);
for (const d of badDest) console.log(`   bad destination ${destStatus.get(d)}: ${d}`);

// A destination served as `noindex` cannot consolidate ranking signal, so a
// redirect into one is a dead end even though it returns 200. This is the
// check that catches a map generated before an empty hub was made noindex.
const noindexDests = [];
for (const d of destinations) {
  try {
    const res = await fetch(`${SITE}${d}`, { redirect: 'manual' });
    const html = await res.text();
    const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
    if (/noindex/i.test(robots)) noindexDests.push({ d, robots });
  } catch {
    /* network hiccup — the status check above already covers reachability */
  }
}
console.log(`# destinations served as noindex: ${noindexDests.length}/${destinations.length}`);
for (const { d, robots } of noindexDests) console.log(`   noindex destination (${robots}): ${d}`);

const deadPaths = new Set(sources);
const chains = Object.entries(redirects).filter(([, d]) => deadPaths.has(d));
console.log(`# redirect chains: ${chains.length}`);
for (const [s, d] of chains.slice(0, 20)) console.log(`   chain: ${s} -> ${d}`);

const both = gone.filter((g) => redirects[g]);
console.log(`# paths in both the 301 map and the 410 list: ${both.length}`);

const failed =
  live.length > 0 ||
  badDest.length > 0 ||
  noindexDests.length > 0 ||
  chains.length > 0 ||
  both.length > 0 ||
  other.length > 0 ||
  realWrongApplied.length > 0;

console.log(failed ? '\nFAIL: redirect map is not safe to ship.' : '\nPASS: redirect map is safe to ship.');
process.exit(failed ? 1 : 0);
