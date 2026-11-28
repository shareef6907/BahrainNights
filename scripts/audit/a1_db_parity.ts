/**
 * THE APP vs THE DATABASE.
 *
 * The migration is already run, so the database holds a real end_at for
 * every row, computed by the working bn_parse_time / bn_parse_date
 * helpers. This compares the APPLICATION resolver against the DATABASE'S
 * OWN end_at, row by row.
 *
 * That is stronger than comparing two transcriptions of each other: one
 * side is the thing that is actually in production.
 *
 * Run: npx tsx scripts/audit/a1_db_parity.ts
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

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, time, start_time, end_time, category, starts_at, end_at, is_overnight, status, is_hidden')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .limit(1000);
  if (error) { console.log('ERROR:', error.message); process.exit(1); }
  const rows = data as any[];
  console.log('rows checked:', rows.length);
  console.log('');

  let agree = 0;
  let disagree = 0;
  let appNoEnd = 0;
  let dbNoEnd = 0;
  const examples: any[] = [];
  for (const r of rows) {
    const t = resolveEventTimes(r);
    if (!t.end_at) { appNoEnd++; continue; }
    if (!r.end_at) { dbNoEnd++; continue; }
    const sameEnd = Math.abs(Date.parse(t.end_at) - Date.parse(r.end_at)) < 1000;
    const sameOver = t.is_overnight === r.is_overnight;
    if (sameEnd && sameOver) {
      agree++;
    } else {
      disagree++;
      if (examples.length < 8) {
        examples.push({
          title: String(r.title).slice(0, 44),
          raw: { time: r.time, start_time: r.start_time, end_time: r.end_time, start_date: r.start_date, end_date: r.end_date, category: r.category },
          db: { end_at: r.end_at, is_overnight: r.is_overnight },
          app: { end_at: t.end_at, is_overnight: t.is_overnight, rule: t.rule },
        });
      }
    }
  }
  console.log('=== THE APP vs THE DATABASE end_at ===');
  console.log('  rows where they AGREE   :', agree);
  console.log('  rows where they DISAGREE:', disagree);
  console.log('  rows with NO end_at (app):', appNoEnd, ' (fail closed - expired)');
  console.log('  rows with NO end_at (db) :', dbNoEnd);
  console.log('');
  if (examples.length) {
    console.log('=== EXAMPLES ===');
    for (const e of examples) console.log('  ' + JSON.stringify(e));
    console.log('');
  }
}

main();
