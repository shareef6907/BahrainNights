import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * The per-source contribution history of the cinema sync.
 *
 * WHY THIS EXISTS
 * ---------------
 * The contribution monitor (scripts/verify-cinema-freshness.mjs) needs to
 * know how much each cinema contributed on each run, not just what the
 * table looks like now.
 *
 * Without a run history it cannot tell these two states apart:
 *
 *   (a) a source that contributed 20 films on the last run, and
 *   (b) a source that contributed 20 films THREE WEEKS AGO and has been
 *       silently dead ever since, with the old rows still in the table.
 *
 * The observed failure mode is exactly (b). In the last 30 days of sync
 * runs, the Cineco scraper contributed ZERO films on 8 of 12 successful
 * runs while the job still exited 0.
 *
 * Each run writes a row to `agent_logs` whose `metadata` carries the
 * per-source counts. This route exposes ONLY those counts — no titles, no
 * ids of films, no personal data of any kind.
 *
 * QUERY PARAMETERS
 *   ?limit=N   how many runs to return (default 20, max 100)
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limitParam = parseInt(url.searchParams.get('limit') || '20', 10);
    const limit = Number.isFinite(limitParam)
      ? Math.max(1, Math.min(100, limitParam))
      : 20;

    const { data, error } = await supabaseAdmin
      .from('agent_logs')
      .select('started_at, completed_at, status, metadata')
      .eq('metadata->>trigger', 'cinema-sync')
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[cinema/source-history] query failed:', error.message);
      return NextResponse.json(
        { error: 'Could not read the run history' },
        { status: 500 }
      );
    }

    const runs = (data || []).map((row: any) => {
      const meta = row.metadata || {};
      const sources = meta.sources || {};
      return {
        started_at: row.started_at,
        completed_at: row.completed_at,
        status: row.status,
        duration_ms: meta.duration_ms ?? null,
        sources: {
          vox: {
            now_showing: sources.vox?.now_showing ?? null,
            coming_soon: sources.vox?.coming_soon ?? null,
          },
          cineco: {
            now_showing: sources.cineco?.now_showing ?? null,
            coming_soon: sources.cineco?.coming_soon ?? null,
          },
        },
      };
    });

    return NextResponse.json({ runs, count: runs.length });
  } catch (err) {
    console.error('[cinema/source-history] threw:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
