import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * DELETE endpoint to remove dummy/seed events
 * Only removes events that were seeded or don't have a source
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();

    // First, count how many events will be deleted
    const { count: dummyCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .or('contact_email.eq.events@bahrainnights.com,source_name.is.null');

    // Count total scraped events
    const { count: scrapedCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .not('source_name', 'is', null);

    // Safety check: don't delete if we don't have scraped events
    if (!scrapedCount || scrapedCount < 5) {
      return NextResponse.json({
        success: false,
        error: 'Not enough scraped events to safely delete dummy events',
        dummy_events: dummyCount,
        scraped_events: scrapedCount,
        message: 'Run the event scrapers first to populate real events before deleting dummy data',
      }, { status: 400 });
    }

    // Delete dummy events
    const { error, count: deletedCount } = await supabase
      .from('events')
      .delete({ count: 'exact' })
      .or('contact_email.eq.events@bahrainnights.com,source_name.is.null');

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      deleted: deletedCount,
      remaining_scraped: scrapedCount,
      message: `Deleted ${deletedCount} dummy events. ${scrapedCount} scraped events remain.`,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup dummy events', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check status before deletion
 */
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Count dummy events (from seed script)
    const { count: dummyCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('contact_email', 'events@bahrainnights.com');

    // Count events without source (likely manually added or old)
    const { count: noSourceCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .is('source_name', null);

    // Count scraped events by source
    const { data: sourceStats } = await supabase
      .from('events')
      .select('source_name')
      .not('source_name', 'is', null);

    const sourceCounts: Record<string, number> = {};
    if (sourceStats) {
      for (const event of sourceStats) {
        const source = event.source_name || 'unknown';
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      }
    }

    // Total count
    const { count: totalCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      total_events: totalCount,
      dummy_events: dummyCount,
      events_without_source: noSourceCount,
      scraped_events_by_source: sourceCounts,
      total_scraped: Object.values(sourceCounts).reduce((a, b) => a + b, 0),
      can_safely_delete: Object.values(sourceCounts).reduce((a, b) => a + b, 0) >= 5,
      instructions: {
        to_check: 'GET /api/admin/cleanup-dummy-events',
        to_delete: 'DELETE /api/admin/cleanup-dummy-events',
        warning: 'Only delete after verifying scrapers have added real events',
      },
      sql_for_manual_cleanup: `
-- Run this in Supabase Dashboard if API doesn't work:
-- First check what will be deleted:
SELECT id, title, source_name, contact_email
FROM events
WHERE contact_email = 'events@bahrainnights.com'
   OR source_name IS NULL;

-- Then delete:
DELETE FROM events
WHERE contact_email = 'events@bahrainnights.com'
   OR source_name IS NULL;
      `.trim(),
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check status', details: String(error) },
      { status: 500 }
    );
  }
}
