/**
 * FIND EVERY MALFORMED TIME VALUE.
 *
 * The migration failed on its first run with:
 *
 *     invalid input syntax for type time: "05:00 PM - 12:00 AM"
 *
 * so SOME ROWS STORE A WHOLE RANGE IN `start_time`. The TypeScript parser
 * must survive those, and the ingestion path must never write them.
 *
 * This finds them all, and classifies each malformed value so the parser
 * and the ingestion fix can be written against real data.
 *
 * Run: npx tsx scripts/audit/a1_malformed_times.ts
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
  } catch {}
  return out;
}
const env = { ...loadEnv(), ...process.env } as Record<string, string>;
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

/** A strict 'HH:MM' or 'HH:MM:SS'. */
const STRICT_TIME = /^\d{1,2}:\d{2}(:\d{2})?$/;
/** Any time-like token anywhere in the string. */
const TIME_TOKEN = /(\d{1,2}):(\d{2})(:(\d{2}))?\s*(AM|PM)?/gi;

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, start_date, end_date, time, start_time, end_time, source_name, source_url, category, status')
    .limit(5000);
  if (error) {
    console.log('ERROR:', error.message);
    process.exit(1);
  }
  const rows = data as any[];
  console.log('rows fetched:', rows.length);
  console.log('');

  const malformed: { col: string; value: string; row: any }[] = [];
  const byCol: Record<string, number> = { start_time: 0, end_time: 0, time: 0 };

  for (const r of rows) {
    for (const col of ['start_time', 'end_time', 'time'] as const) {
      const v = r[col];
      if (v === null || v === undefined || v === '') continue;
      if (STRICT_TIME.test(String(v).trim())) continue;
      byCol[col]++;
      malformed.push({ col, value: String(v), row: r });
    }
  }

  console.log('=== MALFORMED TIME VALUES (not a strict HH:MM[:SS]) ===');
  console.log('  start_time:', byCol.start_time);
  console.log('  end_time  :', byCol.end_time);
  console.log('  time      :', byCol.time);
  console.log('  TOTAL     :', malformed.length);
  console.log('');

  // The distinct shapes.
  const shapes = new Map<string, number>();
  for (const m of malformed) {
    const shape = String(m.value).replace(/\d/g, 'N');
    shapes.set(shape, (shapes.get(shape) || 0) + 1);
  }
  console.log('=== THE DISTINCT SHAPES ===');
  for (const [shape, n] of [...shapes.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)} x  ${shape}`);
  }
  console.log('');

  // How many time tokens does each malformed value contain? A value with
  // TWO tokens is a RANGE and must be split.
  let ranges = 0;
  let single = 0;
  let none = 0;
  const examples: string[] = [];
  for (const m of malformed) {
    const tokens = String(m.value).match(new RegExp(TIME_TOKEN.source, 'gi')) || [];
    if (tokens.length >= 2) {
      ranges++;
      if (examples.length < 8) {
        examples.push(
          `RANGE  ${m.col.padEnd(10)} "${m.value}"  -> tokens: ${JSON.stringify(tokens)}`
        );
      }
    } else if (tokens.length === 1) {
      single++;
      if (examples.length < 8) {
        examples.push(`SINGLE ${m.col.padEnd(10)} "${m.value}"`);
      }
    } else {
      none++;
      if (examples.length < 8) examples.push(`NONE   ${m.col.padEnd(10)} "${m.value}"`);
    }
  }
  console.log('=== HOW MANY TIME TOKENS EACH MALFORMED VALUE HAS ===');
  console.log('  two or more (a RANGE - must be split):', ranges);
  console.log('  exactly one (a single time)          :', single);
  console.log('  none at all (unparseable)            :', none);
  console.log('');
  console.log('=== EXAMPLES ===');
  for (const e of examples) console.log('  ' + e);
  console.log('');

  // Which ingestion path wrote them?
  console.log('=== WHICH SOURCE WROTE THEM ===');
  const bySource: Record<string, number> = {};
  for (const m of malformed) {
    const s = m.row.source_name || '(null)';
    bySource[s] = (bySource[s] || 0) + 1;
  }
  for (const [s, n] of Object.entries(bySource).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)} x  source_name = ${s}`);
  }
  console.log('');

  // And which column - a RANGE in start_time is the bug.
  console.log('=== RANGES IN start_time (the ingestion bug) ===');
  let n = 0;
  for (const m of malformed) {
    const tokens = String(m.value).match(new RegExp(TIME_TOKEN.source, 'gi')) || [];
    if (m.col === 'start_time' && tokens.length >= 2) {
      n++;
      if (n <= 10) {
        console.log(`  "${m.value}"  |  ${String(m.row.title).slice(0, 44).padEnd(46)} | source=${m.row.source_name}`);
      }
    }
  }
  console.log(`  TOTAL ranges in start_time: ${n}`);
  console.log('');

  // The rows the CURRENT parser would break on.
  console.log('=== ROWS THE CURRENT PARSER WOULD BREAK ON ===');
  let breaks = 0;
  for (const r of rows) {
    for (const col of ['start_time', 'end_time', 'time'] as const) {
      const v = r[col];
      if (v === null || v === undefined || v === '') continue;
      // The CURRENT parser: /(\d{1,2}):(\d{2})/ - unanchored, so it
      // silently reads the FIRST time-like token and ignores the rest.
      // That is a SILENT wrong answer, not a throw. But `new Date(v)`
      // would throw, and Postgres casting would throw.
      const m = String(v).match(/(\d{1,2}):(\d{2})/);
      if (!m) {
        breaks++;
        if (breaks <= 6) console.log(`  NO TOKEN AT ALL: ${col}="${v}"`);
      }
    }
  }
  console.log('  rows with no time-like token at all:', breaks);
}

main();
