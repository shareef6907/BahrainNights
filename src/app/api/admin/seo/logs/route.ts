import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth/verifyAdmin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/seo/logs
 * Get SEO agent run logs
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = getAdminClient();

    const { data: logs, error, count } = await supabase
      .from('seo_agent_logs')
      .select('*', { count: 'exact' })
      .order('run_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[Admin SEO] Error fetching logs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch logs', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      }
    });
  } catch (error) {
    console.error('[Admin SEO] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
