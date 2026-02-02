import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import type { ActivityLog } from '@/types/database';

export async function GET() {
  try {
    const supabase = getAdminClient();

    // Get all PWA-related events from activity_log
    const { data: events, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('entity_type', 'pwa')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching PWA stats:', error);
      return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }

    // Calculate stats
    const allEvents = (events || []) as ActivityLog[];
    
    // Count by action type
    const installs = allEvents.filter(e => e.action === 'pwa_installed').length;
    const iosInstructionsViewed = allEvents.filter(e => e.action === 'pwa_ios_instructions_viewed').length;
    const promptsShown = allEvents.filter(e => e.action === 'pwa_prompt_shown').length;
    const promptsDismissed = allEvents.filter(e => e.action === 'pwa_prompt_dismissed').length;

    // Get daily install breakdown (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyInstalls: Record<string, number> = {};
    allEvents
      .filter(e => e.action === 'pwa_installed')
      .forEach(e => {
        const date = e.created_at.split('T')[0];
        dailyInstalls[date] = (dailyInstalls[date] || 0) + 1;
      });

    // Get platform breakdown from details
    let androidDesktopInstalls = 0;
    let iosInstalls = 0;

    allEvents
      .filter(e => e.action === 'pwa_installed')
      .forEach(e => {
        const details = e.details as Record<string, unknown> | null;
        if (details?.platform === 'android_desktop') {
          androidDesktopInstalls++;
        }
      });

    // iOS we can only estimate from instruction views
    iosInstalls = iosInstructionsViewed;

    // Recent installs
    const recentInstalls = allEvents
      .filter(e => e.action === 'pwa_installed')
      .slice(0, 10)
      .map(e => ({
        date: e.created_at,
        details: e.details,
      }));

    return NextResponse.json({
      summary: {
        totalInstalls: installs,
        estimatedIOSInstalls: iosInstalls,
        promptsShown,
        promptsDismissed,
        conversionRate: promptsShown > 0 
          ? ((installs / promptsShown) * 100).toFixed(1) + '%'
          : '0%',
      },
      platform: {
        androidDesktop: androidDesktopInstalls,
        ios: iosInstalls,
      },
      dailyInstalls: Object.entries(dailyInstalls)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => b.date.localeCompare(a.date)),
      recentInstalls,
    });
  } catch (error) {
    console.error('PWA stats error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
