/**
 * Blog Stats API - Returns statistics for blog generation
 */

import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getAdminClient();
    const today = new Date().toISOString().split('T')[0];

    // Get total articles count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: totalArticles } = await (supabase as any)
      .from('blog_articles')
      .select('*', { count: 'exact', head: true });

    // Get blogged events count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: bloggedEvents } = await (supabase as any)
      .from('blog_event_tracker')
      .select('*', { count: 'exact', head: true });

    // Get total eligible events (Platinumlist events with future dates)
    const { count: eligibleEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .not('affiliate_url', 'is', null)
      .gte('start_date', today);

    // Calculate remaining events
    const remainingEvents = (eligibleEvents || 0) - (bloggedEvents || 0);

    return NextResponse.json({
      total_articles: totalArticles || 0,
      remaining_events: Math.max(0, remainingEvents),
      blogged_events: bloggedEvents || 0,
      eligible_events: eligibleEvents || 0,
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
