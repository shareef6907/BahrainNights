#!/usr/bin/env node
/**
 * Verifies the generated redirect map against live production.
 *
 * Checks, for every source path in the map:
 *   1. the source really is a 404 today (a redirect must not shadow a live page)
 *   2. the destination really returns 200 (a redirect must not land on a 404)
 *   3. no redirect chain (the destination must not itself be a dead source)
 *   4. no source appears in both the 301 map and the 410 list
 *
 * Exits non-zero if any check fails.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = 'https://www.bahrainnights.com';
const CONCURRENCY = 6;
const ATTEMPTS = 3;

const src = readFileSync(resolve(ROOT, 'src/data/event-redirects.ts'), 'utf8');

const redirectBlock = src.match(/export const eventRedirects: Record<string, string> = \{([\s\S]*?)\n\};/);
const goneBlock = src.match(/export const eventGonePaths: string\[\] = \[([\s\S]*?)\n\];/);

const redirects = {};
for (const m of redirectBlock[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) redirects[m[1]] = m[2];
const gone = [...goneBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

console.log(`# map: ${Object.keys(redirects).length} x 301, ${gone.length} x 410`);

async function status(url) {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status !== 404 || attempt === ATTEMPTS) return res.status;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400 * attempt));
  }
  return 0;
}

async function mapStatus(paths) {
  const out = new Map();
  for (let i = 0; i < paths.length; i += CONCURRENCY) {
    const chunk = paths.slice(i, i + CONCURRENCY);
    const results = await Promise.all(chunk.map((p) => status(`${SITE}${p}`)));
    chunk.forEach((p, j) => out.set(p, results[j]));
  }
  return out;
}

const sources = [...Object.keys(redirects), ...gone];
console.log(`# checking ${sources.length} sources against ${SITE} ...`);
const sourceStatus = await mapStatus(sources);

const live = [...sources].filter((s) => sourceStatus.get(s) === 200);
const notFound = [...sources].filter((s) => sourceStatus.get(s) === 404);
const other = [...sources].filter((s) => ![200, 404].includes(sourceStatus.get(s)));

console.log(`# sources now 404 (correct): ${notFound.length}`);
console.log(`# sources now 200 (SHADOWING a live page): ${live.length}`);
for (const s of live.slice(0, 40)) console.log(`   shadowed: ${s}`);
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

const deadPaths = new Set(sources);
const chains = Object.entries(redirects).filter(([, d]) => deadPaths.has(d));
console.log(`# redirect chains: ${chains.length}`);
for (const [s, d] of chains.slice(0, 20)) console.log(`   chain: ${s} -> ${d}`);

const both = gone.filter((g) => redirects[g]);
console.log(`# paths in both the 301 map and the 410 list: ${both.length}`);

const failed =
  live.length > 0 || badDest.length > 0 || chains.length > 0 || both.length > 0 || other.length > 0;

console.log(failed ? '\nFAIL: redirect map is not safe to ship.' : '\nPASS: redirect map is safe to ship.');
process.exit(failed ? 1 : 0);
