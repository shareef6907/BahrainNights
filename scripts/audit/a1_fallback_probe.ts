/**
 * Prove the FALLBACK path works: a select WITHOUT end_at against the live
 * database, with the same filters the listing uses.
 *
 * The fallback failed the first time because PUBLIC_EVENT_LISTING_SELECT
 * includes `end_at`, and PostgREST rejects the WHOLE select when one
 * column does not exist. This probe uses the reduced column list.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { PUBLIC_EVENT_LISTING_FIELDS } from '../../src/lib/public-fields';

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

async function main() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bahrain' });

  const reduced = PUBLIC_EVENT_LISTING_FIELDS.filter(
    (f) => f !== 'end_at' && f !== 'starts_at' && f !== 'is_overnight'
  );
  console.log('=== THE FALLBACK SELECT (without end_at) ===');
  console.log('  columns:', reduced.length, 'of', PUBLIC_EVENT_LISTING_FIELDS.length);
  console.log('  today (Bahrain):', today);
  console.log('');

  const q = await supabase
    .from('events')
    .select(reduced.join(','))
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .or(
      [
        `end_date.gte.${today}`,
        `and(end_date.is.null,start_date.gte.${today})`,
        `and(end_date.is.null,start_date.is.null,date.gte.${today})`,
      ].join(',')
    )
    .order('start_date', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true });

  console.log('  error :', q.error ? q.error.message : 'none');
  console.log('  rows  :', (q.data || []).length);
  console.log('');

  if (q.data && q.data.length) {
    const NAMED = ['Naak x Thuya', 'Cavallo Club', 'ANII live', 'Narratives at Teres', 'Pax Arabiana'];
    console.log('  the five expired events in the FALLBACK result:');
    for (const n of NAMED) {
      const hit = q.data.find((r: any) => String(r.title).includes(n));
      console.log(`      ${n.padEnd(22)} ${hit ? 'PRESENT (the fallback still shows it - expected)' : 'not in the result'}`);
    }
  }
}

main();
