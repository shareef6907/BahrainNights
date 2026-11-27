/**
 * Inspect the raw `events` table rows for the listing page.
 *
 * Run with: npx tsx scripts/audit/events_raw.ts
 *
 * Uses the service role key from .env.local. Prints ONLY non-secret columns.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

/** Minimal .env.local reader — no dependency on the app's env loader. */
function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const raw = readFileSync('.env.local', 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* fall back to the process env */
  }
  return out;
}

const env = { ...loadEnv(), ...process.env } as Record<string, string>;
const url = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, country, status, is_hidden, is_active')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .order('date', { ascending: true })
    .limit(200);

  if (error) {
    console.error('QUERY ERROR:', error.message);
    process.exit(1);
  }

  const rows = data || [];
  console.log('published, not-hidden rows:', rows.length);
  console.log('');

  const bahrain = rows.filter((r: any) => (r.country || 'Bahrain') === 'Bahrain');
  console.log('country = Bahrain (or null):', bahrain.length);
  console.log('');

  const todayUTC = new Date().toISOString().split('T')[0];
  const todayBahrain = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bahrain',
  }).format(new Date());
  console.log('today (UTC)      :', todayUTC);
  console.log('today (Bahrain)  :', todayBahrain);
  console.log('');

  /*
   * THE PAGE'S ACTUAL QUERY, run against the DB verbatim.
   */
  console.log('=== THE PAGE QUERY, VERBATIM ===');
  console.log("  .from('events').select(PUBLIC_EVENT_SELECT)");
  console.log("  .eq('status','published').eq('is_hidden',false).eq('country','Bahrain')");
  console.log('  .or(`date.gte.' + todayUTC + ',start_date.gte.' + todayUTC + '`)');
  console.log("  .order('date', { ascending: true })");
  console.log('');
  const pageQ = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .or(`date.gte.${todayUTC},start_date.gte.${todayUTC}`)
    .order('date', { ascending: true });
  console.log('PAGE QUERY returns:', (pageQ.data || []).length, 'rows');
  if (pageQ.error) console.log('  error:', pageQ.error.message);
  console.log('');
  for (const r of pageQ.data || []) {
    console.log(`   ${String(r.id).slice(0,8)} date=${String(r.date||'').slice(0,10)} start=${String(r.start_date||'').slice(0,10)} end=${String(r.end_date||'').slice(0,10)} | ${String(r.title).slice(0,46)}`);
  }
  console.log('');


  console.log('id | raw date | raw start_date | raw end_date | title');
  for (const r of bahrain) {
    const d = r.date ? String(r.date).slice(0, 10) : '';
    const s = r.start_date ? String(r.start_date).slice(0, 10) : '';
    const e = r.end_date ? String(r.end_date).slice(0, 10) : '';
    // COALESCE(end_date, start_date) >= today, the rule the brief specifies.
    const effective = e || s || d;
    const past = effective && effective < todayBahrain;
    console.log(
      `${String(r.id).slice(0, 8)} | ${d} | ${s} | ${e} | ${past ? 'PAST ' : '     '}${String(r.title).slice(0, 44)}`
    );
  }

  /*
   * FILTER VARIANT COMPARISON — which rows does each filter keep?
   */
  const passes = (r: any, test: (x: any) => boolean) => test(r);
  const curFilter = (r: any) =>
    String(r.date || '').slice(0, 10) >= todayBahrain ||
    String(r.start_date || '').slice(0, 10) >= todayBahrain;
  const briefFilter = (r: any) => {
    const eff = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    return eff >= todayBahrain;
  };
  console.log('--- FILTER VARIANTS (Bahrain rows, today=' + todayBahrain + ') ---');
  console.log('current page filter  (date>=today OR start_date>=today):',
    bahrain.filter(curFilter).length);
  console.log('brief filter         (COALESCE(end,start,date)>=today):',
    bahrain.filter(briefFilter).length);
  console.log('');
  console.log('rows KEPT by current but DROPPED by the brief filter:');
  for (const r of bahrain) {
    if (curFilter(r) && !briefFilter(r)) {
      const eff = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
      console.log(`   ${String(r.id).slice(0,8)} date=${String(r.date||'').slice(0,10)} start=${String(r.start_date||'').slice(0,10)} end=${String(r.end_date||'').slice(0,10)} -> eff=${eff} | ${String(r.title).slice(0,50)}`);
    }
  }
  console.log('');
  console.log('rows DROPPED by current but KEPT by the brief filter:');
  for (const r of bahrain) {
    if (!curFilter(r) && briefFilter(r)) {
      const eff = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
      console.log(`   ${String(r.id).slice(0,8)} date=${String(r.date||'').slice(0,10)} start=${String(r.start_date||'').slice(0,10)} end=${String(r.end_date||'').slice(0,10)} -> eff=${eff} | ${String(r.title).slice(0,50)}`);
    }
  }
  console.log('');

  const pastCount = bahrain.filter((r: any) => {
    const effective = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    return effective && effective < todayBahrain;
  }).length;
  console.log('');
  console.log('rows whose COALESCE(end_date,start_date,date) < today (Bahrain):', pastCount);
  console.log('rows with NULL end_date AND NULL start_date:', bahrain.filter((r: any) => !r.end_date && !r.start_date).length);
}

main();
