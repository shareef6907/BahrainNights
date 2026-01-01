import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getAdminClient();
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];

    // Fetch all stats in parallel
    const [
      venuesResult,
      pendingVenuesResult,
      eventsResult,
      eventsThisMonthResult,
      usersResult,
      adsResult,
      recentActivityResult,
      topVenuesResult,
      topEventsResult,
      categoryStatsResult,
    ] = await Promise.all([
      // Total venues by status
      supabase.from('venues').select('id, status', { count: 'exact' }),
      // Pending venues with details
      supabase.from('venues')
        .select('id, name, category, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5),
      // Total events
      supabase.from('events').select('id', { count: 'exact' }),
      // Events this month
      supabase.from('events')
        .select('id', { count: 'exact' })
        .gte('created_at', startOfMonth),
      // Total users
      supabase.from('users').select('id', { count: 'exact' }),
      // Active ads
      supabase.from('homepage_ads')
        .select('id, price_bd, payment_status, status')
        .eq('status', 'active'),
      // Recent activity (recent events and venues)
      supabase.from('events')
        .select('id, title, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5),
      // Top venues by view_count
      supabase.from('venues')
        .select('id, name, view_count')
        .order('view_count', { ascending: false })
        .limit(5),
      // Top events by view_count
      supabase.from('events')
        .select('id, title, view_count')
        .order('view_count', { ascending: false })
        .limit(5),
      // Events by category
      supabase.from('events')
        .select('category'),
    ]);

    // Calculate venue stats
    const venues = venuesResult.data || [];
    const approvedVenues = venues.filter((v: { status: string }) => v.status === 'approved').length;
    const pendingVenuesCount = venues.filter((v: { status: string }) => v.status === 'pending').length;
    const rejectedVenues = venues.filter((v: { status: string }) => v.status === 'rejected').length;

    // Calculate ad revenue
    const ads = adsResult.data || [];
    const activeAds = ads.length;
    const revenueThisMonth = ads
      .filter((a: { payment_status: string }) => a.payment_status === 'paid')
      .reduce((sum: number, a: { price_bd: number | null }) => sum + (a.price_bd || 0), 0);

    // Format pending venues
    const pendingVenues = (pendingVenuesResult.data || []).map((v: { id: string; name: string; category: string | null; created_at: string }) => ({
      id: v.id,
      name: v.name,
      category: v.category || 'Uncategorized',
      registeredAgo: getTimeAgo(v.created_at),
    }));

    // Format recent activity
    const recentActivity = (recentActivityResult.data || []).map((e: { id: string; title: string; created_at: string; status: string }) => ({
      id: e.id,
      type: 'event',
      text: `${e.status === 'pending' ? 'New event submitted' : 'Event ' + e.status}: ${e.title}`,
      time: getTimeAgo(e.created_at),
    }));

    // Format top venues
    const topVenues = (topVenuesResult.data || []).map((v: { id: string; name: string; view_count: number | null }) => ({
      id: v.id,
      name: v.name,
      views: v.view_count || 0,
      change: 0, // Would need historical data to calculate
    }));

    // Format top events
    const topEvents = (topEventsResult.data || []).map((e: { id: string; title: string; view_count: number | null }) => ({
      id: e.id,
      name: e.title,
      views: e.view_count || 0,
      change: 0, // Would need historical data to calculate
    }));

    // Calculate category distribution
    const categoryCount: Record<string, number> = {};
    (categoryStatsResult.data || []).forEach((e: { category: string | null }) => {
      const cat = e.category || 'Other';
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const categoryData = Object.entries(categoryCount)
      .map(([category, count]) => ({
        category: formatCategoryName(category),
        count,
        color: getCategoryColor(category),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      stats: {
        totalVenues: venues.length,
        approvedVenues,
        pendingVenues: pendingVenuesCount,
        rejectedVenues,
        totalEvents: eventsResult.count || 0,
        eventsThisMonth: eventsThisMonthResult.count || 0,
        totalUsers: usersResult.count || 0,
        pageViewsToday: 0, // Would need analytics integration
        pageViewsTrend: 0,
        activeAds,
        revenueThisMonth,
        revenueTrend: 0,
      },
      pendingVenues,
      recentActivity,
      topVenues,
      topEvents,
      categoryData,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function formatCategoryName(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    dining: 'bg-orange-400',
    family: 'bg-green-400',
    arts: 'bg-blue-400',
    music: 'bg-purple-400',
    cinema: 'bg-red-400',
    sports: 'bg-yellow-400',
    shopping: 'bg-pink-400',
    business: 'bg-indigo-400',
    wellness: 'bg-teal-400',
    special: 'bg-amber-400',
    tours: 'bg-cyan-400',
    community: 'bg-lime-400',
  };
  return colors[category.toLowerCase()] || 'bg-gray-400';
}
