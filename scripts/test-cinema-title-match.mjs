#!/usr/bin/env node
/**
 * Test for the title-fallback lookup in the cinema agent route.
 *
 * The bug it guards against: /api/agents/cinema/run matched an existing row
 * on tmdb_id ONLY. A row created by the cinema scraper has no tmdb_id when
 * the TMDB search failed for it (an accent or a punctuation difference), so
 * the route never matched it and inserted a SECOND row for the same film.
 * The cinema page renders every row it is given, so the film appeared twice.
 *
 * This checks the matching mechanism against the real rows in the database,
 * including the spelling variants that actually occur in production.
 */
import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

/** Mirrors foldTitle() in src/app/api/agents/cinema/run/route.ts. */
function foldTitle(title) {
  return (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// The route's fold must stay identical to the one used here.
const routeSrc = fs.readFileSync(
  'src/app/api/agents/cinema/run/route.ts',
  'utf8',
);
const routeFold = routeSrc.match(
  /function foldTitle[\s\S]*?replace\(\/\[\^a-z0-9\]\/g, ''\);/,
);
if (!routeFold) {
  console.error('FAIL: could not find foldTitle() in the cinema agent route');
  process.exit(1);
}

const env = Object.fromEntries(
  fs
    .readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf('=');
      return [
        l.slice(0, i).trim(),
        l.slice(i + 1).trim().replace(/^["']|["']$/g, ''),
      ];
    }),
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const { data: rows } = await sb
  .from('movies')
  .select('id, title, tmdb_id')
  .limit(5000);

// Exactly how the route builds it: first row wins for a given folded title.
const titleIndex = new Map();
for (const row of rows || []) {
  const key = foldTitle(row.title);
  if (key && !titleIndex.has(key)) {
    titleIndex.set(key, { id: row.id, tmdb_id: row.tmdb_id });
  }
}

console.log(`Indexed ${titleIndex.size} distinct titles from ${rows.length} rows.`);

// --- the cases that actually broke in production -------------------------
const CASES = [
  // [TMDB title, the spelling the scraper stored, note]
  ['Les Misérables', 'Les Miserables', 'accent dropped by the scraper'],
  ['The Cat in the Hat', 'the cat in the hat', 'case difference'],
  ['Sense and Sensibility', 'Sense  and  Sensibility', 'double space'],
  ['Les Misérables', 'les misérables', 'case difference + accent'],
  ['Fiddler on the Roof', 'Fiddler-on-the-Roof', 'dashes for spaces'],
];

let failed = 0;
console.log('\nMatching a TMDB title against the index:');
for (const [tmdbTitle, storedTitle, note] of CASES) {
  const key = foldTitle(tmdbTitle);
  const hit = titleIndex.get(key);
  const ok = !!hit;
  if (!ok) failed++;
  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'}  "${tmdbTitle}"` +
      `  ->  ${hit ? `row ${hit.id.slice(0, 8)} (tmdb=${hit.tmdb_id ?? 'none'})` : 'NO MATCH'}` +
      `   [${note}]`,
  );
}

// --- every row must still be findable by its own title --------------------
const unreachable = (rows || []).filter(
  (r) => !titleIndex.has(foldTitle(r.title)),
);
console.log(
  `\nRows not findable by their own title: ${unreachable.length}` +
    (unreachable.length ? ' (FAIL)' : ' (ok)'),
);
if (unreachable.length) {
  failed++;
  unreachable.slice(0, 5).forEach((r) => console.log('   ', r.title));
}

// --- no duplicate keys silently overwrite each other ----------------------
const byKey = new Map();
for (const r of rows || []) {
  const k = foldTitle(r.title);
  byKey.set(k, (byKey.get(k) || 0) + 1);
}
const collisions = [...byKey.entries()].filter(([, n]) => n > 1);
console.log(
  `Titles that still collide in the database: ${collisions.length}` +
    (collisions.length ? '' : ' (ok)'),
);
for (const [k, n] of collisions.slice(0, 5)) {
  console.log(`    ${n}x ${k}`);
}

if (failed) {
  console.log(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nOK: the title-fallback lookup behaves as intended.');
