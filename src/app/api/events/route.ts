import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Public API to get published events
 * Only returns events with status='published' and future dates
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const filter = searchParams.get('filter'); // today, weekend, week, month
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    let query = supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('start_date', todayStr)
      .order('start_date', { ascending: true })
      .limit(limit);

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Search by title or venue name
    if (search) {
      query = query.or(`title.ilike.%${search}%,venue_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filter by date range
    if (filter) {
      const now = new Date();
      let endDate: Date;

      switch (filter) {
        case 'today':
          query = query.eq('start_date', todayStr);
          break;
        case 'weekend':
          // Get next Saturday and Sunday
          const dayOfWeek = now.getDay();
          const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
          const saturday = new Date(now);
          saturday.setDate(now.getDate() + daysUntilSaturday);
          const sunday = new Date(saturday);
          sunday.setDate(saturday.getDate() + 1);
          query = query
            .gte('start_date', saturday.toISOString().split('T')[0])
            .lte('start_date', sunday.toISOString().split('T')[0]);
          break;
        case 'week':
          endDate = new Date(now);
          endDate.setDate(now.getDate() + 7);
          query = query.lte('start_date', endDate.toISOString().split('T')[0]);
          break;
        case 'month':
          endDate = new Date(now);
          endDate.setMonth(now.getMonth() + 1);
          query = query.lte('start_date', endDate.toISOString().split('T')[0]);
          break;
      }
    }

    // Filter featured events
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }

    // Transform events for frontend
    const transformedEvents = (events || []).map(event => ({
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description || '',
      image: event.featured_image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop',
      category: event.category,
      categoryColor: getCategoryColor(event.category),
      venue: event.venue_name || 'Venue TBD',
      location: event.venue_name || 'Bahrain',
      date: formatDate(event.start_date),
      time: event.start_time || 'TBD',
      price: formatPrice(event.price_type, event.booking_method),
      isFree: event.price_type === 'free',
      isFeatured: event.is_featured,
      viewCount: event.view_count || 0,
    }));

    return NextResponse.json({
      events: transformedEvents,
      total: events?.length || 0,
    });
  } catch (error) {
    console.error('Events fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper: Get category color
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    dining: 'bg-orange-500',
    family: 'bg-green-500',
    arts: 'bg-pink-500',
    music: 'bg-purple-500',
    cinema: 'bg-red-500',
    sports: 'bg-blue-500',
    shopping: 'bg-yellow-500',
    business: 'bg-slate-500',
    wellness: 'bg-teal-500',
    special: 'bg-amber-500',
    tours: 'bg-cyan-500',
    community: 'bg-indigo-500',
    other: 'bg-gray-500',
    concerts: 'bg-purple-500',
    nightlife: 'bg-indigo-500',
    cultural: 'bg-pink-500',
  };
  return colors[category.toLowerCase()] || 'bg-gray-500';
}

// Helper: Format date
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Helper: Format price
function formatPrice(priceType: string | null, bookingMethod: string | null): string {
  if (priceType === 'free') {
    return 'Free Entry';
  }
  if (bookingMethod) {
    // If bookingMethod contains a price like "BD 25" or "From BD 10"
    const priceMatch = bookingMethod.match(/BD\s*\d+/i);
    if (priceMatch) {
      return bookingMethod.includes('From') ? bookingMethod : `BD ${priceMatch[0].replace(/BD\s*/i, '')}`;
    }
    return bookingMethod;
  }
  return 'See Details';
}
