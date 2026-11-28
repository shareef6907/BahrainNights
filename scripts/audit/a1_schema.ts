/**
 * A1: inspect the `events` table schema and the rows behind the five
 * overnight events Shareef named.
 *
 * Prints column names and the raw date/time fields for the affected rows.
 * Read-only.
 *
 * Run: npx tsx scripts/audit/a1_schema.ts
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* use process env */
  }
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

async function main() {
  // 1. The full column list.
  const probe = await supabase.from('events').select('*').limit(1);
  if (probe.error) {
    console.log('ERROR:', probe.error.message);
    process.exit(1);
  }
  const cols = Object.keys(probe.data![0] ?? {});
  console.log('=== events table columns (' + cols.length + ') ===');
  console.log(cols.join(', '));
  console.log('');

  const timeish = cols.filter(
    (c) => /at$|_at$|date|time|start|end|overnight/i.test(c)
  );
  console.log('=== date/time-ish columns ===');
  console.log(timeish.join(', '));
  console.log('');

  const has = (c: string) => cols.includes(c);
  console.log('starts_at exists :', has('starts_at'));
  console.log('end_at exists    :', has('end_at'));
  console.log('is_overnight     :', has('is_overnight'));
  console.log('');

  // 2. The rows behind the named events.
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .order('start_date', { ascending: true });
  if (error) {
    console.log('ERROR:', error.message);
    process.exit(1);
  }

  console.log('=== THE NAMED EVENTS (raw columns) ===');
  for (const row of data as any[]) {
    if (!NAMED.some((n) => String(row.title).includes(n))) continue;
    const keys = ['id', 'title', 'date', 'start_date', 'end_date', 'time', 'start_time', 'end_time', 'category', 'starts_at', 'end_at', 'is_overnight'];
    const parts: string[] = [];
    for (const k of keys) {
      if (k in row) parts.push(`${k}=${JSON.stringify(row[k])}`);
    }
    console.log('  ' + parts.join('  '));
    console.log('');
  }

  // 3. How many rows have an end_date, and the date distribution.
  const rows = data as any[];
  const withEnd = rows.filter((r) => r.end_date).length;
  const withStartTime = rows.filter((r) => r.start_time || r.time).length;
  const withEndTime = rows.filter((r) => r.end_time).length;
  console.log('=== COUNTS (published, not hidden) ===');
  console.log('  rows                       :', rows.length);
  console.log('  with end_date              :', withEnd);
  console.log('  with start_time or time    :', withStartTime);
  console.log('  with end_time              :', withEndTime);
  console.log('');

  // 4. The overnight candidates, by the rule.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bahrain' }).format(new Date());
  console.log('=== OVERNIGHT CANDIDATES (end_date = start_date + 1, start_time >= 18:00, end_time null or <= 06:00) ===');
  const toMin = (t: string | null | undefined) => {
    if (!t) return null;
    const m = String(t).match(/(\d{1,2}):(\d{2})/);
    if (!m) return null;
    return Number(m[1]) * 60 + Number(m[2]);
  };
  let overnight = 0;
  for (const r of rows) {
    if (!r.start_date || !r.end_date) continue;
    const s = String(r.start_date).slice(0, 10);
    const e = String(r.end_date).slice(0, 10);
    const dayMs = 86400000;
    const diff = Math.round((Date.parse(e + 'T00:00:00Z') - Date.parse(s + 'T00:00:00Z')) / dayMs);
    if (diff !== 1) continue;
    const st = toMin(r.start_time || r.time);
    const et = toMin(r.end_time);
    if (st === null || st < 18 * 60) continue;
    if (et !== null && et > 6 * 60) continue;
    overnight++;
    console.log(`  ${s} -> ${e}  start=${r.start_time || r.time} end=${r.end_time ?? '(null)'}  | ${String(r.title).slice(0, 54)}`);
  }
  console.log('');
  console.log('  overnight candidates:', overnight);
}

main();
