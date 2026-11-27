/**
 * Verify the P0 fixes against the live database:
 *
 *   1. The new DB query returns only upcoming rows.
 *   2. The new sort puts the rows in true chronological order.
 *   3. No past event is in the result.
 *   4. The old sort (by the DISPLAY string) would have produced the wrong
 *      order - this is the proof that the bug was real.
 *
 * Run: npx tsx scripts/audit/verify_p0.ts
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { todayInBahrain } from '../../src/lib/utils/date';

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

const today = todayInBahrain();
const upcomingFilter = [
  `end_date.gte.${today}`,
  `and(end_date.is.null,start_date.gte.${today})`,
  `and(end_date.is.null,start_date.is.null,date.gte.${today})`,
].join(',');

/** The display string the page renders - NO YEAR. */
function displayDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

async function main() {
  console.log('today (Bahrain):', today);
  console.log('');

  // ---- THE OLD QUERY ----
  const oldQ = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, is_featured, is_recurring, recurrence_pattern, recurrence_days')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .or(`date.gte.${today},start_date.gte.${today}`)
    .order('date', { ascending: true });
  console.log('OLD query rows:', (oldQ.data || []).length);

  // ---- THE NEW QUERY ----
  const newQ = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, is_featured, is_recurring, recurrence_pattern, recurrence_days')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .or(upcomingFilter)
    .order('start_date', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true });
  const rows = newQ.data || [];
  console.log('NEW query rows:', rows.length);
  if (newQ.error) console.log('  ERROR:', newQ.error.message);
  console.log('');

  // ---- Is any row past? ----
  const past = rows.filter((r: any) => {
    const eff = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    return eff && eff < today;
  });
  console.log('rows in the NEW result that are in the past:', past.length);
  for (const r of past) console.log('   PAST:', r.title);
  console.log('');

  // ---- THE ORDER PROOF ----
  // The OLD sort key: the DISPLAY string, parsed by new Date().
  const oldSortKey = (r: any) => new Date(displayDate(r.start_date || r.date)).getTime();
  const oldOrder = [...rows].sort((a: any, b: any) => oldSortKey(a) - oldSortKey(b));
  const newOrder = [...rows].sort((a: any, b: any) => {
    const ka = String(a.start_date || a.date || '').slice(0, 10);
    const kb = String(b.start_date || b.date || '').slice(0, 10);
    if (ka !== kb) return ka < kb ? -1 : 1;
    return String(a.id).localeCompare(String(b.id));
  });

  console.log('--- FIRST 8 IN THE OLD (display-string) ORDER ---');
  for (const r of oldOrder.slice(0, 8)) {
    const iso = String(r.start_date || r.date).slice(0, 10);
    console.log(`   ${displayDate(iso).padEnd(14)} (${iso})  ${String(r.title).slice(0, 46)}`);
  }
  console.log('');
  console.log('--- FIRST 8 IN THE NEW (ISO) ORDER ---');
  for (const r of newOrder.slice(0, 8)) {
    const iso = String(r.start_date || r.date).slice(0, 10);
    console.log(`   ${displayDate(iso).padEnd(14)} (${iso})  ${String(r.title).slice(0, 46)}`);
  }
  console.log('');
  const same = oldOrder.map((r: any) => r.id).join(',') === newOrder.map((r: any) => r.id).join(',');
  console.log('old order === new order ?', same, same ? '(no visible difference)' : '(THE ORDERS DIFFER - the bug was real)');

  /*
   * The rows whose START date is in the past but whose END date is in the
   * future. These are recurring/ongoing listings, and they are the reason
   * the new query returns MORE rows than the old one.
   */
  console.log('');
  console.log('--- rows whose START is before Nov 2026 but whose END is still ahead ---');
  const early = rows.filter((r: any) => String(r.start_date || r.date || '').slice(0, 10) < '2026-11-01');
  console.log('count:', early.length);
  for (const r of early) {
    const iso = String(r.start_date || r.date).slice(0, 10);
    const end = String(r.end_date || '').slice(0, 10);
    console.log(`   start=${iso} end=${end} recurring=${(r as any).is_recurring} pattern=${(r as any).recurrence_pattern} days=${JSON.stringify((r as any).recurrence_days)} | ${String(r.title).slice(0, 44)}`);
  }
  console.log('');

  console.log('--- LAST 5 IN THE NEW ORDER (the far-future events land at the END now) ---');
  for (const r of newOrder.slice(-5)) {
    const iso = String(r.start_date || r.date).slice(0, 10);
    console.log(`   ${displayDate(iso).padEnd(14)} (${iso})  ${String(r.title).slice(0, 46)}`);
  }
}

main();
