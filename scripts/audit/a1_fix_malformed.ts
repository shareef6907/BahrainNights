/**
 * REPAIR THE 8 ROWS THAT HOLD A RANGE IN THE `time` COLUMN.
 *
 * These were written by the old Bahrain Calendar scraper, which stored
 * "05:00 PM - 12:00 AM" verbatim. The Postgres migration threw on them
 * the first time it ran.
 *
 * The repair SPLITS the range into `time` (the start) and `end_time` (the
 * end), and recomputes `end_at` / `starts_at` / `is_overnight` with the
 * shared resolver - the same function the app uses, so the two agree.
 *
 * It is idempotent, and it only touches rows that actually hold a range.
 *
 * Run: npx tsx scripts/audit/a1_fix_malformed.ts [--apply]
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolveEventTimes } from '../../src/lib/utils/event-times';
import { splitTimeRange, isStrictTime } from '../../src/lib/utils/time-parsing';

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

const APPLY = process.argv.includes('--apply');

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, time, start_time, end_time, category, starts_at, end_at, is_overnight')
    .not('time', 'is', null)
    .limit(5000);
  if (error) { console.log('ERROR:', error.message); process.exit(1); }
  const rows = data as any[];

  // The rows whose `time` holds something that is not a plain HH:MM.
  const bad = rows.filter((r) => !isStrictTime(r.time));
  console.log('=== THE ROWS THAT HOLD A RANGE IN `time` ===');
  console.log('  rows with a non-strict time:', bad.length);
  console.log('');

  let repaired = 0;
  let skipped = 0;
  for (const r of bad) {
    const split = splitTimeRange(r.time);
    if (!split.start) {
      console.log(`  SKIP (unparseable): "${String(r.title).slice(0, 44)}" time=${JSON.stringify(r.time)}`);
      skipped++;
      continue;
    }
    const resolved = resolveEventTimes({
      start_date: r.start_date || r.date,
      end_date: r.end_date,
      start_time: split.start,
      end_time: split.end ?? undefined,
      category: r.category,
    });
    console.log(`  "${String(r.title).slice(0, 44)}"`);
    console.log(`      time     ${JSON.stringify(r.time)} -> ${JSON.stringify(split.start)}   end_time -> ${JSON.stringify(split.end)}`);
    console.log(`      end_at   ${r.end_at} -> ${resolved.end_at}`);
    console.log(`      overnight ${r.is_overnight} -> ${resolved.is_overnight}`);

    if (APPLY) {
      const { error: uerr } = await supabase
        .from('events')
        .update({
          time: split.start,
          end_time: split.end ?? null,
          starts_at: resolved.starts_at,
          end_at: resolved.end_at,
          is_overnight: resolved.is_overnight,
          updated_at: new Date().toISOString(),
        })
        .eq('id', r.id);
      if (uerr) {
        console.log(`      UPDATE FAILED: ${uerr.message}`);
        skipped++;
      } else {
        repaired++;
      }
    }
  }

  console.log('');
  console.log(APPLY
    ? `  repaired: ${repaired}   skipped: ${skipped}`
    : `  would repair: ${bad.length - skipped}   skipped: ${skipped}   (run with --apply to write)`);
  console.log('');
}

main();
