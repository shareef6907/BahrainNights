import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = getAdminClient();

    // ============ VENUES ============
    const { count: totalVenues } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true });

    const { count: approvedVenues } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    const { count: pendingVenues } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: rejectedVenues } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rejected');

    // ============ EVENTS ============
    const { count: totalEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true });

    const { count: publishedEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    const { count: pendingEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Events this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: eventsThisMonth } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString());

    // Upcoming events
    const today = new Date().toISOString().split('T')[0];
    const { count: upcomingEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')
      .gte('start_date', today);

    // ============ USERS ============
    let totalPublicUsers = 0;
    try {
      const { count } = await supabase
        .from('public_users')
        .select('*', { count: 'exact', head: true });
      totalPublicUsers = count || 0;
    } catch {
      // Table may not exist
    }

    // ============ LIKES ============
    let totalVenueLikes = 0;
    let likesToday = 0;
    let likesThisWeek = 0;
    let likesThisMonth = 0;

    try {
      const { count: likeCount } = await supabase
        .from('venue_likes')
        .select('*', { count: 'exact', head: true });
      totalVenueLikes = likeCount || 0;

      // Likes today
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const { count: todayLikes } = await supabase
        .from('venue_likes')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayStart.toISOString());
      likesToday = todayLikes || 0;

      // Likes this week
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);

      const { count: weekLikes } = await supabase
        .from('venue_likes')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekStart.toISOString());
      likesThisWeek = weekLikes || 0;

      // Likes this month
      const { count: monthLikes } = await supabase
        .from('venue_likes')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());
      likesThisMonth = monthLikes || 0;
    } catch {
      // Table may not exist
    }

    // ============ EVENT LIKES ============
    let totalEventLikes = 0;
    try {
      const { count } = await supabase
        .from('event_likes')
        .select('*', { count: 'exact', head: true });
      totalEventLikes = count || 0;
    } catch {
      // Table may not exist
    }

    // ============ SLIDER ADS ============
    let activeAds = 0;
    let totalAds = 0;
    let revenueThisMonth = 0;
    let totalRevenue = 0;

    try {
      const { count: adCount } = await supabase
        .from('slider_ads')
        .select('*', { count: 'exact', head: true });
      totalAds = adCount || 0;

      const { count: activeCount } = await supabase
        .from('slider_ads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')
        .lte('start_date', today)
        .gte('end_date', today);
      activeAds = activeCount || 0;

      // Revenue this month
      const { data: monthlyAds } = await supabase
        .from('slider_ads')
        .select('price_paid')
        .gte('start_date', startOfMonth.toISOString().split('T')[0]);

      revenueThisMonth = (monthlyAds as { price_paid: string | number }[] | null)?.reduce((sum, ad) => {
        const price = parseFloat(String(ad.price_paid)) || 0;
        return sum + price;
      }, 0) || 0;

      // Total revenue
      const { data: allAds } = await supabase
        .from('slider_ads')
        .select('price_paid');

      totalRevenue = (allAds as { price_paid: string | number }[] | null)?.reduce((sum, ad) => {
        const price = parseFloat(String(ad.price_paid)) || 0;
        return sum + price;
      }, 0) || 0;
    } catch {
      // Table may not exist
    }

    // ============ VENUE VIEWS (from venues table) ============
    const { data: venueViews } = await supabase
      .from('venues')
      .select('view_count')
      .eq('status', 'approved');

    const totalVenueViews = (venueViews as { view_count: number }[] | null)?.reduce((sum, v) => sum + (v.view_count || 0), 0) || 0;

    // ============ EVENT VIEWS ============
    const { data: eventViews } = await supabase
      .from('events')
      .select('view_count')
      .eq('status', 'published');

    const totalEventViews = (eventViews as { view_count: number }[] | null)?.reduce((sum, e) => sum + (e.view_count || 0), 0) || 0;

    // ============ TOP VENUES BY LIKES ============
    const { data: topVenuesByLikes } = await supabase
      .from('venues')
      .select('id, name, slug, like_count, view_count, category')
      .eq('status', 'approved')
      .order('like_count', { ascending: false })
      .limit(10);

    // ============ TOP VENUES BY VIEWS ============
    const { data: topVenuesByViews } = await supabase
      .from('venues')
      .select('id, name, slug, like_count, view_count, category')
      .eq('status', 'approved')
      .order('view_count', { ascending: false })
      .limit(10);

    // ============ TOP EVENTS BY VIEWS ============
    const { data: topEventsByViews } = await supabase
      .from('events')
      .select('id, title, slug, view_count, like_count, venue_name, start_date')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(10);

    // ============ RECENT ACTIVITY ============
    const { data: recentVenues } = await supabase
      .from('venues')
      .select('id, name, status, created_at, category')
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: recentEvents } = await supabase
      .from('events')
      .select('id, title, status, created_at, venue_name, start_date')
      .order('created_at', { ascending: false })
      .limit(10);

    // ============ VENUES BY CATEGORY ============
    const { data: venuesByCategory } = await supabase
      .from('venues')
      .select('category')
      .eq('status', 'approved');

    const categoryCount: Record<string, number> = {};
    (venuesByCategory as { category: string }[] | null)?.forEach((v) => {
      const cat = v.category || 'Uncategorized';
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    // ============ EVENTS BY CATEGORY ============
    const { data: eventsByCategory } = await supabase
      .from('events')
      .select('category')
      .eq('status', 'published');

    const eventCategoryCount: Record<string, number> = {};
    (eventsByCategory as { category: string }[] | null)?.forEach((e) => {
      const cat = e.category || 'Uncategorized';
      eventCategoryCount[cat] = (eventCategoryCount[cat] || 0) + 1;
    });

    // ============ MOVIES ============
    let totalMovies = 0;
    let nowShowingMovies = 0;
    let comingSoonMovies = 0;

    try {
      const { count: movieCount } = await supabase
        .from('movies')
        .select('*', { count: 'exact', head: true });
      totalMovies = movieCount || 0;

      const { count: nowShowing } = await supabase
        .from('movies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'now_showing');
      nowShowingMovies = nowShowing || 0;

      const { count: comingSoon } = await supabase
        .from('movies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'coming_soon');
      comingSoonMovies = comingSoon || 0;
    } catch {
      // Table may not exist
    }

    // ============ NEWSLETTER SUBSCRIBERS ============
    let totalSubscribers = 0;
    try {
      const { count } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });
      totalSubscribers = count || 0;
    } catch {
      // Table may not exist
    }

    return NextResponse.json({
      overview: {
        venues: {
          total: totalVenues || 0,
          approved: approvedVenues || 0,
          pending: pendingVenues || 0,
          rejected: rejectedVenues || 0,
        },
        events: {
          total: totalEvents || 0,
          published: publishedEvents || 0,
          pending: pendingEvents || 0,
          thisMonth: eventsThisMonth || 0,
          upcoming: upcomingEvents || 0,
        },
        users: {
          publicUsers: totalPublicUsers,
          venueOwners: approvedVenues || 0,
        },
        likes: {
          venues: totalVenueLikes,
          events: totalEventLikes,
          total: totalVenueLikes + totalEventLikes,
          today: likesToday,
          thisWeek: likesThisWeek,
          thisMonth: likesThisMonth,
        },
        views: {
          totalVenueViews,
          totalEventViews,
          total: totalVenueViews + totalEventViews,
        },
        ads: {
          total: totalAds,
          active: activeAds,
          totalSlots: 40, // 8 pages × 5 slots (this is a config value)
        },
        revenue: {
          thisMonth: revenueThisMonth,
          total: totalRevenue,
        },
        movies: {
          total: totalMovies,
          nowShowing: nowShowingMovies,
          comingSoon: comingSoonMovies,
        },
        subscribers: totalSubscribers,
      },
      topVenues: {
        byLikes: topVenuesByLikes || [],
        byViews: topVenuesByViews || [],
      },
      topEvents: {
        byViews: topEventsByViews || [],
      },
      venuesByCategory: categoryCount,
      eventsByCategory: eventCategoryCount,
      recentActivity: {
        venues: recentVenues || [],
        events: recentEvents || [],
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
