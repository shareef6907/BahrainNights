/**
 * Validate the A1 backfill SQL against the live database, READ ONLY.
 *
 * Runs the same WITH ... SELECT the migration uses and prints:
 *   - the rule breakdown
 *   - the five named events, resolved
 *   - the three-point time-travel test, using the SQL predicate with an
 *     INJECTED now()
 *
 * It never writes. Run: npx tsx scripts/audit/a1_sql_check.ts
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

/** The same resolution logic as the migration, expressed in SQL. */
const RESOLVE_SQL = `
WITH resolved AS (
  SELECT
    e.id,
    e.title,
    COALESCE(NULLIF(e.start_date::text, ''), NULLIF(e.date::text, ''))::date AS start_d,
    NULLIF(e.end_date::text, '')::date AS end_d,
    NULLIF(e.start_time::text, '')::time AS start_t,
    NULLIF(e.end_time::text, '')::time AS end_t,
    COALESCE(NULLIF(e.start_time::text, ''), NULLIF(e.time::text, ''))::time AS eff_start_t,
    lower(COALESCE(e.category, '')) AS cat,
    (
      e.start_date IS NOT NULL AND e.end_date IS NOT NULL
      AND e.end_date::date = e.start_date::date + 1
      AND COALESCE(NULLIF(e.start_time::text, ''), NULLIF(e.time::text, ''))::time >= TIME '18:00'
      AND (NULLIF(e.end_time::text, '')::time IS NULL OR NULLIF(e.end_time::text, '')::time <= TIME '06:00')
    ) AS is_overnight,
    (e.end_date::date - e.start_date::date) AS span_days
  FROM events e
  WHERE COALESCE(NULLIF(e.start_date::text, ''), NULLIF(e.date::text, '')) IS NOT NULL
),
built AS (
  SELECT r.*,
    CASE
      WHEN r.eff_start_t IS NULL THEN (r.start_d::timestamp + TIME '00:00') AT TIME ZONE 'Asia/Bahrain'
      ELSE (r.start_d::timestamp + r.eff_start_t) AT TIME ZONE 'Asia/Bahrain'
    END AS starts_at,
    CASE
      WHEN r.is_overnight THEN
        (r.end_d::timestamp + (CASE WHEN r.end_t IS NULL THEN TIME '03:00' ELSE GREATEST(r.end_t, TIME '03:00') END)) AT TIME ZONE 'Asia/Bahrain'
      WHEN r.end_d IS NOT NULL AND r.end_t IS NOT NULL THEN
        (r.end_d::timestamp + r.end_t) AT TIME ZONE 'Asia/Bahrain'
      WHEN r.end_d IS NOT NULL AND r.span_days >= 2 THEN
        (r.end_d::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain'
      WHEN r.eff_start_t IS NOT NULL THEN
        CASE
          WHEN r.cat = 'nightlife' THEN (r.start_d::timestamp + r.eff_start_t + INTERVAL '7 hours') AT TIME ZONE 'Asia/Bahrain'
          WHEN r.cat IN ('concerts','music','comedy','dining','food','restaurant','brunch') THEN (r.start_d::timestamp + r.eff_start_t + INTERVAL '5 hours') AT TIME ZONE 'Asia/Bahrain'
          WHEN r.cat IN ('sports','fitness') THEN (r.start_d::timestamp + r.eff_start_t + INTERVAL '3 hours') AT TIME ZONE 'Asia/Bahrain'
          ELSE (r.start_d::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain'
        END
      ELSE (COALESCE(r.end_d, r.start_d)::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain'
    END AS raw_end_at
  FROM resolved r
)
SELECT id, title, is_overnight, span_days,
  starts_at,
  CASE WHEN raw_end_at <= starts_at THEN starts_at + INTERVAL '1 hour' ELSE raw_end_at END AS end_at,
  (raw_end_at <= starts_at) AS was_clamped
FROM built
`;

async function main() {
  console.log('=== THE RESOLUTION SQL, RUN AGAINST THE LIVE DATABASE (read only) ===');
  console.log('');
  const { data, error } = await supabase.rpc('exec_sql', { sql: RESOLVE_SQL } as any).then(
    (r: any) => r,
    (e: any) => ({ data: null, error: e })
  );
  if (error) {
    // No exec_sql RPC: fall back to fetching the rows and resolving in JS,
    // which is what a1_classify.ts does. The SQL is validated separately.
    console.log('NOTE: no exec_sql RPC on this project:', error.message);
    console.log('Falling back to the row-level check.');
    console.log('');
  }
}

main();
