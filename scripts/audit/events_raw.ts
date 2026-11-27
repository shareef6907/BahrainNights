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

  const upcomingFilter = [
    `end_date.gte.${todayBahrain}`,
    `and(end_date.is.null,start_date.gte.${todayBahrain})`,
    `and(end_date.is.null,start_date.is.null,date.gte.${todayBahrain})`,
  ].join(',');

  /* INTERNATIONAL rows, with the OLD and NEW filters side by side. */
  const intl = rows.filter((r: any) => r.country && r.country !== 'Bahrain');
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];
  const intlNew = intl.filter((r: any) => {
    const eff = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    return eff >= todayBahrain;
  });
  const intlOld = intl.filter((r: any) => {
    const eff = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    return eff >= todayBahrain;
  });
  const intlOldSixMonth = intl.filter((r: any) => {
    const sd = String(r.start_date || r.date || '').slice(0, 10);
    return sd >= sixMonthsAgoStr;
  });
  const sixMonthsAgoStr2 = sixMonthsAgoStr;
  /*
   * THE INTERNATIONAL PAGE QUERY, verbatim.
   */
  const intlQuery = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, country, is_active, status, is_hidden')
    .neq('country', 'Bahrain')
    .eq('status', 'published')
    .eq('is_active', true)
    .or(upcomingFilter)
    .order('start_date', { ascending: true, nullsFirst: false });
  console.log('INTERNATIONAL PAGE QUERY returns:', (intlQuery.data || []).length, 'rows');
  if (intlQuery.error) console.log('  ERROR:', intlQuery.error.message);
  console.log('');
  {
    const irows = intlQuery.data || [];
    const byStart: Record<string, number> = {};
    for (const r of (irows as any[])) {
      const y = String(r.start_date || r.date || '????').slice(0, 4);
      byStart[y] = (byStart[y] || 0) + 1;
    }
    console.log('  international rows by START year:');
    for (const y of Object.keys(byStart).sort()) console.log(`     ${y}: ${byStart[y]}`);
    const endYears: Record<string, number> = {};
    for (const r of (irows as any[])) {
      const y = String(r.end_date || 'NULL').slice(0, 4);
      endYears[y] = (endYears[y] || 0) + 1;
    }
    console.log('  international rows by END year:');
    for (const y of Object.keys(endYears).sort()) console.log(`     ${y}: ${endYears[y]}`);
  }
  console.log('');

  /* The SAME query without the is_active filter, to isolate it. */
  const intlNoActive = await supabase
    .from('events')
    .select('id, title, country, is_active')
    .neq('country', 'Bahrain')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .or(upcomingFilter);
  console.log('international, no is_active filter:', (intlNoActive.data || []).length, 'rows');
  const activeCount = (intlNoActive.data || []).filter((r: any) => r.is_active === true).length;
  console.log('  of which is_active === true:', activeCount);
  console.log('  of which is_active === null:', (intlNoActive.data || []).filter((r: any) => r.is_active === null).length);
  console.log('');

  /*
   * THE OLD INTERNATIONAL PAGE QUERY, verbatim (before my change).
   */
  const todayUTCold = new Date().toISOString().split('T')[0];
  const sixMonthsAgoOld = new Date();
  sixMonthsAgoOld.setMonth(sixMonthsAgoOld.getMonth() - 6);
  const sixMonthsAgoOldStr = sixMonthsAgoOld.toISOString().split('T')[0];
  const intlOldQuery = await supabase
    .from('events')
    .select('id, title, slug, description, category, venue_name, date, time, start_date, end_date, start_time, featured_image, cover_url, affiliate_url, country, city')
    .neq('country', 'Bahrain')
    .eq('status', 'published')
    .eq('is_active', true)
    .or(`start_date.gte.${todayUTCold},date.gte.${todayUTCold}`)
    .order('start_date', { ascending: true, nullsFirst: false });
  const oldRows = intlOldQuery.data || [];
  const oldAfterClientFilter = oldRows.filter((r: any) => {
    const sd = String(r.start_date || r.date || '');
    return sd >= sixMonthsAgoOldStr;
  });
  console.log('OLD international query (DB filter only)      :', oldRows.length, 'rows');
  console.log('OLD international after the 6-month client cut :', oldAfterClientFilter.length, 'rows');
  console.log('NEW international query                        :', (intlQuery.data || []).length, 'rows');
  console.log('');

  /*
   * CANDIDATE INTERNATIONAL FILTERS - count each.
   */
  const sixMo = new Date();
  sixMo.setMonth(sixMo.getMonth() - 6);
  const sixMoStr = sixMo.toISOString().split('T')[0];
  const irows = (intlQuery.data || []) as any[];
  const countA = irows.filter((r: any) => {
    const sd = String(r.start_date || r.date || '').slice(0, 10);
    return sd >= sixMoStr;
  }).length;
  const countB = irows.filter((r: any) => {
    const sd = String(r.start_date || r.date || '').slice(0, 10);
    const ed = String(r.end_date || '').slice(0, 10);
    return sd >= sixMoStr && ed >= todayBahrain;
  }).length;
  const countC = irows.filter((r: any) => {
    const ed = String(r.end_date || '').slice(0, 10);
    return ed >= todayBahrain && ed <= '2027-12-31';
  }).length;
  /*
   * WHY DID THE OLD QUERY RETURN 474?
   *
   * OLD: .or(`start_date.gte.${today},date.gte.${today}`)
   * with today = UTC today.
   *
   * A row passes if start_date >= today OR date >= today. The `date`
   * column is often DIFFERENT from start_date on these rows.
   */
  const rowsAll = (intlQuery.data || []) as any[];
  const withDateCol = rowsAll.filter((r: any) => {
    const d = String(r.date || '').slice(0, 10);
    const sd = String(r.start_date || '').slice(0, 10);
    return d >= todayBahrain || sd >= todayBahrain;
  });
  console.log('rows where date OR start_date >= today:', withDateCol.length);
  const diff = rowsAll.filter((r: any) => {
    const d = String(r.date || '').slice(0, 10);
    const sd = String(r.start_date || '').slice(0, 10);
    return !(d >= todayBahrain || sd >= todayBahrain);
  });
  console.log('rows that FAIL date OR start_date >= today:', diff.length);
  console.log('  sample of the failures (start | end | date):');
  for (const r of diff.slice(0, 8)) {
    console.log(`     ${String(r.start_date||'').slice(0,10)} | ${String(r.end_date||'').slice(0,10)} | ${String(r.date||'').slice(0,10)} | ${String(r.title).slice(0,40)}`);
  }
  console.log('');

  const sixMo3 = new Date();
  sixMo3.setMonth(sixMo3.getMonth() - 6);
  const sixMo3Str = sixMo3.toISOString().split('T')[0];
  const countD = rowsAll.filter((r: any) => {
    const sd = String(r.start_date || r.date || '').slice(0, 10);
    const ed = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    const notFinished = ed >= todayBahrain || sd >= todayBahrain;
    const notStale = sd >= sixMo3Str;
    return notFinished && notStale;
  }).length;
  console.log('D: (end>=today OR start>=today) AND start>=6mo ago :', countD);
  console.log('');
  /* The rows the OLD filter kept but D drops, and vice versa. */
  const oldSet = new Set((oldRows as any[]).map((r: any) => r.id));
  const dSet = new Set(rowsAll.filter((r: any) => {
    const sd = String(r.start_date || r.date || '').slice(0, 10);
    const ed = String(r.end_date || r.start_date || r.date || '').slice(0, 10);
    return (ed >= todayBahrain || sd >= todayBahrain) && sd >= sixMo3Str;
  }).map((r: any) => r.id));
  const inDnotOld = rowsAll.filter((r: any) => dSet.has(r.id) && !oldSet.has(r.id));
  console.log('rows D keeps that the OLD filter dropped:', inDnotOld.length);
  for (const r of inDnotOld.slice(0, 10)) {
    console.log(`     start=${String(r.start_date||'').slice(0,10)} end=${String(r.end_date||'').slice(0,10)} | ${String(r.title).slice(0,46)}`);
  }
  console.log('');

  console.log('CANDIDATE international filters:');
  console.log('  A: start_date >= 6 months ago                        :', countA);
  console.log('  B: start_date >= 6 months ago AND end_date >= today  :', countB);
  console.log('  C: end_date >= today AND end_date <= end of 2027     :', countC);
  console.log('  (current NEW filter, end_date >= today)              :', irows.length);
  console.log('');

  /*
   * THE NEW INTERNATIONAL FILTER, run against the DB verbatim.
   */
  const sixMoNew = new Date();
  sixMoNew.setMonth(sixMoNew.getMonth() - 6);
  const sixMoNewStr = sixMoNew.toISOString().split('T')[0];
  const intlUpcoming = [`end_date.gte.${todayBahrain}`, `start_date.gte.${todayBahrain}`].join(',');
  const intlFilterTest = [
    `and(${intlUpcoming},start_date.gte.${sixMoNewStr})`,
    `and(start_date.gte.${todayBahrain})`,
  ].join(',');
  const intlNewQuery = await supabase
    .from('events')
    .select('id, title, start_date, end_date, country')
    .neq('country', 'Bahrain')
    .eq('status', 'published')
    .eq('is_active', true)
    .or(intlFilterTest);
  console.log('NEW international filter returns:', (intlNewQuery.data || []).length, 'rows');
  if (intlNewQuery.error) console.log('  ERROR:', intlNewQuery.error.message);
  console.log('OLD international query returned:', oldRows.length, 'rows');
  console.log('');

  /*
   * TEST THE NARROW LISTING SELECT against the database. If any column does
   * not exist on the `events` table, PostgREST rejects the whole query.
   */
  const narrowSelect = [
    'id','title','slug','description','category','venue_name','venue_address',
    'date','time','start_date','end_date','price','price_currency',
    'booking_method','cover_url','image_url','featured_image','is_featured',
    'is_sold_out','booking_url','affiliate_url','source_url',
  ].join(',');
  const narrowQ = await supabase
    .from('events')
    .select(narrowSelect)
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .limit(3);
  console.log('NARROW LISTING SELECT:', narrowQ.error ? 'ERROR -> ' + narrowQ.error.message : `OK, ${(narrowQ.data||[]).length} rows`);
  if (!narrowQ.error && narrowQ.data && narrowQ.data[0]) {
    const row: any = narrowQ.data[0];
    console.log('  price_range present in the row:', 'price_range' in row, '->', JSON.stringify(row.price_range));
    console.log('  columns returned:', Object.keys(row).length);
  }
  console.log('');

  /*
   * TEST THE NARROW ATTRACTION SELECT against the database.
   */
  const narrowAttr = [
    'id','name','slug','description','image_url','area','price_from','price_range',
    'tripadvisor_rating','rating','duration','suitable_for','tags','is_featured',
  ].join(',');
  const attrQ = await supabase.from('attractions').select(narrowAttr).eq('is_active', true).limit(3);
  console.log('NARROW ATTRACTION SELECT:', attrQ.error ? 'ERROR -> ' + attrQ.error.message : `OK, ${(attrQ.data||[]).length} rows`);
  if (!attrQ.error && attrQ.data && attrQ.data[0]) {
    console.log('  columns returned:', Object.keys(attrQ.data[0]).length);
  }
  console.log('');

  /*
   * THE CINEMA CHAINS IN THE DATABASE.
   */
  const cinemaCols = await supabase.from('cinemas').select('*').limit(1);
  if (cinemaCols.error) {
    console.log('cinemas table ERROR:', cinemaCols.error.message);
  } else {
    const cols = cinemaCols.data && cinemaCols.data[0] ? Object.keys(cinemaCols.data[0]) : [];
    console.log('cinemas table columns:', cols.join(', '));
  }
  const { data: cinemas, error: cinemaErr } = await supabase
    .from('cinemas')
    .select('id, name, slug, location, area, website, is_active, updated_at')
    .order('name');
  if (cinemaErr) console.log('cinemas query ERROR:', cinemaErr.message);
  console.log('');
  console.log('=== CINEMA CHAINS IN THE DATABASE ===');
  for (const c of (cinemas || []) as any[]) {
    console.log(`  ${String(c.name).padEnd(30)} slug=${String(c.slug).padEnd(24)} active=${c.is_active} area=${String(c.area || '-').padEnd(18)} updated=${String(c.updated_at || '-').slice(0, 10)}`);
  }
  console.log('');

  console.log('international published rows:', intl.length);
  console.log('  NEW filter (upcoming by end date):', intlNew.length);
  console.log('  OLD filter (start_date >= 6 months ago):', intlOldSixMonth.length);
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
