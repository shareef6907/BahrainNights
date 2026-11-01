#!/usr/bin/env node
/**
 * Resolve the residual "gone" (410) cases with authoritative evidence.
 *
 * For each 410 candidate we look up:
 *   1. the events table in Supabase, by source_event_id -> real country/city
 *   2. the live Platinumlist feed -> real country/city/category for the event
 *
 * Any case where either source names a country that the site has a page for
 * gets promoted from 410 to a 301.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { VALID_COUNTRIES } from './lib/gcc-knowledge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
dotenv.config({ path: resolve(ROOT, '.env.local') });

const PL_KEY = process.env.PLATINUMLIST_API_KEY || 'd4787139-72b0-468c-a691-42deea0e8400';
const PL_BASE = 'https://api.platinumlist.net/v/7/events';

// The 410 candidates, with the numeric Platinumlist id pulled out of the slug.
const src = readFileSync(resolve(ROOT, 'src/data/event-redirects.ts'), 'utf8');
const goneBlock = src.match(/export const eventGonePaths[^=]*=\s*\[([\s\S]*?)\n\];/)[1];
const gone = [...goneBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function slugify(s) {
  return s.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Pull a country + city out of a Platinumlist event payload. */
function plLocation(ev) {
  const c = ev.country?.name || ev.country || ev.country_name || '';
  const city = ev.city?.name || ev.city || ev.city_name || '';
  const venue = ev.venue?.name || ev.venue_name || '';
  return { country: String(c), city: String(city), venue: String(venue) };
}

const slugToCountry = new Map([
  ['bahrain', 'bahrain'], ['manama', 'bahrain'],
  ['uae', 'uae'], ['united arab emirates', 'uae'], ['dubai', 'uae'], ['abu dhabi', 'uae'],
  ['saudi arabia', 'saudi-arabia'], ['saudi', 'saudi-arabia'],
  ['qatar', 'qatar'], ['oman', 'oman'], ['kuwait', 'kuwait'], ['egypt', 'egypt'],
  ['jordan', 'jordan'], ['lebanon', 'lebanon'], ['turkey', 'turkiye'], ['türkiye', 'turkiye'],
  ['turkiye', 'turkiye'], ['united kingdom', 'uk'], ['uk', 'uk'],
  ['germany', 'germany'], ['france', 'france'], ['spain', 'spain'], ['italy', 'italy'],
  ['greece', 'greece'], ['cyprus', 'cyprus'], ['india', 'india'], ['pakistan', 'pakistan'],
  ['malaysia', 'malaysia'], ['singapore', 'singapore'], ['thailand', 'thailand'],
  ['indonesia', 'indonesia'], ['philippines', 'philippines'],
  ['south africa', 'south-africa'], ['nigeria', 'nigeria'], ['morocco', 'morocco'],
  ['usa', 'usa'], ['united states', 'usa'],
]);

function toCountry(name) {
  if (!name) return null;
  return slugToCountry.get(String(name).trim().toLowerCase()) || null;
}

const results = [];

for (const path of gone) {
  const slug = path.split('/').pop();
  const idMatch = slug.match(/-(\d{5,6})$/);
  const plId = idMatch ? idMatch[1] : null;

  let db = null;
  if (plId) {
    const { data } = await supabase
      .from('events')
      .select('slug,title,country,city,category,status,is_hidden')
      .eq('source_event_id', plId)
      .limit(1);
    if (data?.length) db = data[0];
  }

  let pl = null;
  if (plId) {
    const res = await fetch(`${PL_BASE}/${plId}?scope=affiliate.show.events`, {
      headers: { 'Api-Key': PL_KEY, 'price_scope': 'price' },
    });
    if (res.ok) {
      const json = await res.json();
      pl = json?.data || json;
    }
  }

  const dbCountry = toCountry(db?.country);
  const plLoc = pl ? plLocation(pl) : null;
  const plCountry = toCountry(plLoc?.country) || toCountry(plLoc?.city);

  results.push({
    path, plId,
    db: db ? { slug: db.slug, title: db.title, country: db.country, city: db.city, status: db.status, is_hidden: db.is_hidden } : null,
    pl: pl ? { title: pl.name || pl.title, country: plLoc.country, city: plLoc.city, venue: plLoc.venue, category: pl.category?.name || pl.category, end_date: pl.end_date } : null,
    resolved: dbCountry || plCountry,
    dbCountry, plCountry,
  });
  console.error(`# ${plId} db=${dbCountry || '-'} pl=${plCountry || '-'} :: ${slug.slice(0, 60)}`);
}

writeFileSync('/tmp/resolved_410.json', JSON.stringify(results, null, 2));

console.error('\n=== SUMMARY ===');
console.error(`total: ${results.length}`);
console.error(`resolvable to a country with a live page: ${results.filter(r => r.resolved && (r.resolved === 'bahrain' || VALID_COUNTRIES.has(r.resolved))).length}`);
console.error(`still unknown: ${results.filter(r => !r.resolved).length}`);
console.error('\n=== DETAIL ===');
for (const r of results) {
  console.error(
    `${r.plId}\t${r.resolved || 'UNKNOWN'}\tdb=${r.db ? `${r.db.country}/${r.db.city}` : '-'}\tpl=${r.pl ? `${r.pl.country}/${r.pl.city}` : '-'}\t${r.path}`,
  );
}
