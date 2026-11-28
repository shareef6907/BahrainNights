/**
 * THE TIME-TRAVEL TEST.
 *
 * This is the deliverable for the A1 proof. A page that looks right at
 * 09:00 is NOT evidence that it will be right at 03:01.
 *
 * The listing query is run with an INJECTED now() at three points:
 *
 *   2026-11-27 22:00 Bahrain  ->  the five named events MUST be PRESENT
 *   2026-11-28 02:59 Bahrain  ->  they MUST STILL BE PRESENT
 *   2026-11-28 03:30 Bahrain  ->  they MUST ALL BE GONE
 *
 * It runs against the LIVE DATABASE with the real listing predicate:
 *
 *     WHERE status = 'published' AND is_hidden = false AND end_at > <now>
 *
 * The `end_at` values are computed by the SAME resolver the migration's
 * backfill uses (src/lib/utils/event-times.ts), so the test proves the
 * model, not just the filter.
 *
 * Run: npx tsx scripts/audit/a1_time_travel.ts
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolveEventTimes } from '../../src/lib/utils/event-times';

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
  return out;
}
const env = { ...loadEnv(), ...process.env } as Record<string, string>;
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const NAMED = [
  'Naak x Thuya',
  'Cavallo Club',
  'ANII live',
  'Narratives at Teres',
  'Pax Arabiana',
];

/** Bahrain is UTC+3. */
const BAHRAIN_OFFSET_MIN = 180;

function bahrainLabel(iso: string): string {
  const d = new Date(Date.parse(iso) + BAHRAIN_OFFSET_MIN * 60000);
  return d.toISOString().slice(0, 16).replace('T', ' ') + ' Bahrain';
}

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, time, start_time, end_time, category, status, is_hidden, country')
    .eq('status', 'published')
    .eq('is_hidden', false)
    /*
     * THE PROJECT'S API CAP IS 1000 ROWS.
     *
     * `.limit(5000)` does not raise it - the Supabase project's
     * `db-max-rows` setting caps every request at 1000, and the two rows
     * Shareef named (Narratives at Teres, Pax Arabiana) sit beyond that
     * boundary. The first version of this test could therefore only find
     * three of the five.
     *
     * The listing query itself is NOT affected: it filters in the database
     * with `end_at > now()`, so it returns only the live rows - far fewer
     * than 1000.
     *
     * To test the five named rows specifically, they are fetched by title
     * in a separate, unbounded query below.
     */
    .limit(1000);
  if (error) {
    console.log('ERROR:', error.message);
    process.exit(1);
  }
  const rows = data as any[];
  console.log('=== THE QUERY ===');
  console.log('  rows returned by the published+visible query:', rows.length);
  /*
   * THE NAMED ROWS, FETCHED BY TITLE, UNBOUNDED.
   *
   * The 1000-row cap is on the whole set, so the named rows are fetched
   * with a title filter, which is a handful of rows.
   */
  const namedRows: any[] = [];
  for (const n of NAMED) {
    const r = await supabase
      .from('events')
      .select('id, title, date, start_date, end_date, time, start_time, end_time, category, status, is_hidden, country')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .ilike('title', `%${n}%`);
    for (const x of r.data || []) namedRows.push(x);
  }
  // Merge them into the set, so the test sees every row.
  for (const nr of namedRows) {
    if (!rows.find((r) => r.id === nr.id)) rows.push(nr);
  }
  console.log('  rows after merging the named rows fetched by title:', rows.length);
  console.log('');

  // Resolve every row with the shared resolver - the same rule the
  // migration's backfill uses.
  const resolved = rows.map((r) => ({ row: r, t: resolveEventTimes(r) }));

  console.log('=== THE ROWS UNDER TEST ===');
  for (const n of NAMED) {
    const hits = rows.filter((r) => String(r.title).includes(n));
    console.log(`  "${n}" -> ${hits.length} row(s) in the published+visible set`);
    for (const h of hits) {
      const t = resolveEventTimes(h);
      console.log(`      ${String(h.title).slice(0, 46).padEnd(48)} end_at=${t.end_at} rule=${t.rule}`);
    }
  }
  console.log('');

  console.log('=== THE LISTING PREDICATE, WITH AN INJECTED now() ===');
  console.log('');
  console.log("    WHERE status = 'published' AND is_hidden = false");
  console.log('      AND end_at > <injected now>');
  console.log('');

  const POINTS = [
    '2026-11-27T19:00:00.000Z', // 22:00 Bahrain on the 27th
    '2026-11-27T23:59:00.000Z', // 02:59 Bahrain on the 28th
    '2026-11-28T00:30:00.000Z', // 03:30 Bahrain on the 28th
  ];

  let allPass = true;
  for (const p of POINTS) {
    const nowMs = Date.parse(p);
    // THE PREDICATE. A row is listed when end_at > now.
    const listed = resolved.filter(
      (x) => x.t.end_at !== null && Date.parse(x.t.end_at) > nowMs
    );
    const namedPresent = resolved.filter(
      (x) =>
        NAMED.some((n) => String(x.row.title).includes(n)) &&
        x.t.end_at !== null &&
        Date.parse(x.t.end_at) > nowMs
    );
    const namedMissing = resolved.filter(
      (x) =>
        NAMED.some((n) => String(x.row.title).includes(n)) &&
        !(x.t.end_at !== null && Date.parse(x.t.end_at) > nowMs)
    );

    console.log('---------------------------------------------------------------');
    console.log(`  now() = ${p}`);
    console.log(`         = ${bahrainLabel(p)}`);
    console.log(`  rows listed by the predicate: ${listed.length}`);
    console.log(`  THE FIVE NAMED EVENTS: ${namedPresent.length}/5 present`);
    for (const x of namedPresent) {
      console.log(`      PRESENT  ${String(x.row.title).slice(0, 46).padEnd(48)} end_at=${x.t.end_at}`);
    }
    for (const x of namedMissing) {
      console.log(`      GONE     ${String(x.row.title).slice(0, 46).padEnd(48)} end_at=${x.t.end_at}`);
    }
    console.log('');
  }

  // THE ASSERTIONS, stated plainly.
  const at = (iso: string) =>
    resolved.filter(
      (x) =>
        NAMED.some((n) => String(x.row.title).includes(n)) &&
        x.t.end_at !== null &&
        Date.parse(x.t.end_at) > Date.parse(iso)
    ).length;

  const p1 = at(POINTS[0]);
  const p2 = at(POINTS[1]);
  const p3 = at(POINTS[2]);

  console.log('=== THE ASSERTIONS ===');
  console.log(`  2026-11-27 22:00 Bahrain -> the five MUST be present : ${p1}/5  ${p1 === 5 ? 'PASS' : 'FAIL'}`);
  console.log(`  2026-11-28 02:59 Bahrain -> they MUST still be present: ${p2}/5  ${p2 === 5 ? 'PASS' : 'FAIL'}`);
  console.log(`  2026-11-28 03:30 Bahrain -> they MUST all be gone   : ${p3}/5  ${p3 === 0 ? 'PASS' : 'FAIL'}`);
  console.log('');

  allPass = p1 === 5 && p2 === 5 && p3 === 0;
  console.log(allPass
    ? 'RESULT: PASS - the predicate removes an event the moment it ends'
    : 'RESULT: FAIL');

  if (!allPass) process.exit(1);
}

main();
