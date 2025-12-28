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

// POST /api/cinema/showtimes/cleanup - Clean up past showtimes
// This endpoint can be called by a cron job (e.g., Vercel Cron)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();

    // Get optional authorization header for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is set, validate the request
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body for optional parameters
    let daysOld = 1; // Default: delete showtimes older than 1 day
    let dryRun = false;

    try {
      const body = await request.json();
      if (body.days_old !== undefined) {
        daysOld = parseInt(body.days_old, 10);
      }
      if (body.dry_run !== undefined) {
        dryRun = body.dry_run === true;
      }
    } catch {
      // No body provided, use defaults
    }

    // Calculate the cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const cutoffTimestamp = cutoffDate.toISOString();

    // First, count how many showtimes will be deleted
    const { count: toDeleteCount, error: countError } = await supabase
      .from('showtimes')
      .select('*', { count: 'exact', head: true })
      .lt('showtime', cutoffTimestamp);

    if (countError) {
      console.error('Error counting showtimes to delete:', countError);
      return NextResponse.json(
        { error: 'Failed to count showtimes' },
        { status: 500 }
      );
    }

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dry_run: true,
        would_delete: toDeleteCount || 0,
        cutoff_date: cutoffTimestamp,
        message: `Would delete ${toDeleteCount || 0} showtimes older than ${cutoffTimestamp}`,
      });
    }

    // Delete past showtimes
    const { error: deleteError } = await supabase
      .from('showtimes')
      .delete()
      .lt('showtime', cutoffTimestamp);

    if (deleteError) {
      console.error('Error deleting past showtimes:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete past showtimes' },
        { status: 500 }
      );
    }

    console.log(`Cleaned up ${toDeleteCount || 0} past showtimes older than ${cutoffTimestamp}`);

    return NextResponse.json({
      success: true,
      deleted: toDeleteCount || 0,
      cutoff_date: cutoffTimestamp,
      message: `Successfully deleted ${toDeleteCount || 0} showtimes older than ${cutoffTimestamp}`,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for checking cleanup status
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Get counts
    const now = new Date().toISOString();

    const { count: pastCount } = await supabase
      .from('showtimes')
      .select('*', { count: 'exact', head: true })
      .lt('showtime', now);

    const { count: futureCount } = await supabase
      .from('showtimes')
      .select('*', { count: 'exact', head: true })
      .gte('showtime', now);

    const { count: totalCount } = await supabase
      .from('showtimes')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      message: 'Showtimes cleanup status',
      stats: {
        total_showtimes: totalCount || 0,
        past_showtimes: pastCount || 0,
        future_showtimes: futureCount || 0,
      },
      instructions: {
        cleanup: 'POST /api/cinema/showtimes/cleanup',
        parameters: {
          days_old: 'Number of days old to delete (default: 1)',
          dry_run: 'If true, returns count without deleting',
        },
      },
    });
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
