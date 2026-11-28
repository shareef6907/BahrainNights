/**
 * PARITY CHECK: the migration's SQL expressions vs the app's TypeScript.
 *
 * The SQL in docs/sql/2026-11-28-add-events-timestamps.sql cannot be run
 * here (no exec_sql RPC on this project), so the LOGIC is validated
 * instead: every expression the SQL uses is re-implemented here exactly as
 * Postgres would evaluate it, and the result is compared against
 * resolveEventTimes() from src/lib/utils/event-times.ts for every row.
 *
 * If they agree on every row, the two implementations are the same rule.
 *
 * Run: npx tsx scripts/audit/a1_parity.ts
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

/** Postgres semantics: a text column cast to time, NULL when empty. */
function pgTime(v: any): number | null {
  if (v === null || v === undefined || v === '') return null;
  const s = String(v);
  const m = s.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}
function pgDate(v: any): string | null {
  if (v === null || v === undefined || v === '') return null;
  return String(v).slice(0, 10);
}
function pgDateMinus(s: string, e: string): number {
  return Math.round((Date.parse(e + 'T00:00:00Z') - Date.parse(s + 'T00:00:00Z')) / 86400000);
}
/** (date::timestamp + time) AT TIME ZONE 'Asia/Bahrain' -> UTC instant. */
function pgAtBahrain(d: string, minutes: number): string {
  return new Date(Date.parse(d + 'T00:00:00Z') + minutes * 60000 - 180 * 60000).toISOString();
}
function pgTimeStr(t: number): string {
  return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
}

/** The migration's SQL, transcribed to JS with Postgres semantics. */
function sqlResolve(e: any) {
  const start_d = pgDate(e.start_date) || pgDate(e.date);
  const end_d = pgDate(e.end_date);
  const end_t = pgTime(e.end_time);
  const eff_start_t = pgTime(e.start_time) ?? pgTime(e.time);
  const cat = String(e.category || '').toLowerCase();

  const sd = pgDate(e.start_date);
  const ed = pgDate(e.end_date);
  // pgDateMinus(a, b) returns b - a, so "end is one day after start" is 1.
  const rule1 =
    sd !== null &&
    ed !== null &&
    pgDateMinus(sd, ed) === 1 &&
    eff_start_t !== null &&
    eff_start_t >= 18 * 60 &&
    (end_t === null || end_t <= 6 * 60);
  // RULE 2 can also be an overnight event: an explicit end time in the
  // small hours with an evening start, on a longer span.
  const rule2 =
    sd !== null &&
    ed !== null &&
    end_t !== null &&
    end_t <= 6 * 60 &&
    eff_start_t !== null &&
    eff_start_t >= 18 * 60;
  const overnight = rule1 || rule2;

  if (!start_d) return null;
  const span_days = end_d ? pgDateMinus(sd!, ed!) : null;

  const starts_at =
    eff_start_t === null
      ? pgAtBahrain(start_d, 0)
      : pgAtBahrain(start_d, eff_start_t);

  let raw_end_at: string;
  // The END FORMULA is keyed on rule1 ALONE. Rule 2 uses the explicit end
  // time as given. This mirrors the migration exactly.
  if (rule1) {
    const m = end_t === null ? 180 : Math.max(end_t, 180);
    raw_end_at = pgAtBahrain(end_d!, m);
  } else if (end_d && end_t !== null) {
    raw_end_at = pgAtBahrain(end_d, end_t);
  } else if (end_d && span_days !== null && span_days >= 2) {
    raw_end_at = pgAtBahrain(end_d, 23 * 60 + 59);
  } else if (eff_start_t !== null) {
    let dur: number | null = null;
    if (cat === 'nightlife') dur = 7 * 60;
    else if (['concerts','music','comedy','dining','food','restaurant','brunch'].includes(cat)) dur = 5 * 60;
    else if (['sports','fitness'].includes(cat)) dur = 3 * 60;
    if (dur === null) raw_end_at = pgAtBahrain(start_d, 23 * 60 + 59);
    else raw_end_at = pgAtBahrain(start_d, eff_start_t + dur);
  } else {
    raw_end_at = pgAtBahrain(end_d || start_d, 23 * 60 + 59);
  }

  const end_at = Date.parse(raw_end_at) <= Date.parse(starts_at)
    ? new Date(Date.parse(starts_at) + 3600000).toISOString()
    : raw_end_at;

  return { starts_at, end_at, is_overnight: overnight, clamped: Date.parse(raw_end_at) <= Date.parse(starts_at) };
}

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, time, start_time, end_time, category')
    .eq('status', 'published')
    .eq('is_hidden', false);
  // The migration's backfill only touches rows with a resolvable start
  // date; the rest get the fail-closed sentinel in step 3.
  if (error) { console.log('ERROR:', error.message); process.exit(1); }
  const rows = data as any[];
  console.log('rows checked:', rows.length);
  console.log('');

  let agree = 0;
  let disagree: any[] = [];
  let unresolvable = 0;
  for (const e of rows) {
    const ts = resolveEventTimes(e);
    const sql = sqlResolve(e);
    if (!sql) continue;
    // Rows with no resolvable start date are excluded from the backfill's
    // WITH clause; the migration gives them the fail-closed sentinel.
    if (!ts.starts_at) { unresolvable++; continue; }
    const same =
      sql.starts_at === ts.starts_at &&
      sql.end_at === ts.end_at &&
      sql.is_overnight === ts.is_overnight;
    if (same) agree++;
    else if (disagree.length < 6) {
      disagree.push({
        title: e.title,
        raw: {
          start_date: e.start_date, end_date: e.end_date,
          start_time: e.start_time, time: e.time, end_time: e.end_time,
          category: e.category,
          rule1: (function () {
            var a = pgDate(e.start_date), b = pgDate(e.end_date);
            if (!a || !b) return false;
            if (pgDateMinus(a, b) !== 1) return false;
            var st = pgTime(e.start_time) ?? pgTime(e.time);
            if (st === null || st < 18 * 60) return false;
            var et = pgTime(e.end_time);
            return et === null || et <= 6 * 60;
          })(),
          spanDays: e.start_date && e.end_date
            ? Math.round((Date.parse(String(e.end_date).slice(0,10) + 'T00:00:00Z') - Date.parse(String(e.start_date).slice(0,10) + 'T00:00:00Z')) / 86400000)
            : null,
        },
        ts: { starts_at: ts.starts_at, end_at: ts.end_at, overnight: ts.is_overnight, rule: ts.rule },
        sql: { starts_at: sql.starts_at, end_at: sql.end_at, overnight: sql.is_overnight },
      });
    }
  }
  console.log('=== PARITY: the migration SQL vs src/lib/utils/event-times.ts ===');
  console.log('  rows where they AGREE   :', agree);
  console.log('  rows where they DISAGREE:', rows.length - agree - unresolvable);
  console.log('  rows with no resolvable start date (fail-closed sentinel):', unresolvable);
  if (disagree.length) {
    console.log('');
    for (const d of disagree) console.log('  ', JSON.stringify(d, null, 2).replace(/\n/g, '\n   '));
  }
}

main();
