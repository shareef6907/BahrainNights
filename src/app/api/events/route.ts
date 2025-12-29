import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Try to fetch events - handle case where table might not exist or have different schema
    let query = supabaseAdmin
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Search by title or venue name
    if (search) {
      query = query.or(`title.ilike.%${search}%,venue_name.ilike.%${search}%`);
    }

    // Filter featured events
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Events fetch error:', error);
      // Return empty array instead of error for better UX
      return NextResponse.json({
        events: [],
        total: 0,
        error: error.message,
      });
    }

    // Filter by date on the client side to handle different field names
    let filteredEvents = events || [];

    // Try to filter by date field (might be 'date' or 'start_date')
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = event.date || event.start_date;
      if (!eventDate) return true; // Include events without dates
      return new Date(eventDate) >= today;
    });

    // Apply date filter
    if (filter && filter !== 'all') {
      const now = new Date();
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date || event.start_date);

        switch (filter) {
          case 'today':
            return eventDate.toDateString() === now.toDateString();
          case 'weekend': {
            const dayOfWeek = now.getDay();
            const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
            const saturday = new Date(now);
            saturday.setDate(now.getDate() + daysUntilSaturday);
            saturday.setHours(0, 0, 0, 0);
            const sunday = new Date(saturday);
            sunday.setDate(saturday.getDate() + 1);
            sunday.setHours(23, 59, 59, 999);
            return eventDate >= saturday && eventDate <= sunday;
          }
          case 'week': {
            const endOfWeek = new Date(now);
            endOfWeek.setDate(now.getDate() + 7);
            return eventDate <= endOfWeek;
          }
          case 'month': {
            const endOfMonth = new Date(now);
            endOfMonth.setMonth(now.getMonth() + 1);
            return eventDate <= endOfMonth;
          }
          default:
            return true;
        }
      });
    }

    // Transform events for frontend
    const transformedEvents = filteredEvents.map(event => {
      const eventDateRaw = event.date || event.start_date;
      return {
        id: event.id,
        title: event.title || 'Untitled Event',
        slug: event.slug || event.id,
        description: event.description || '',
        image: event.cover_url || event.image_url || event.featured_image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop',
        category: event.category || 'other',
        categoryColor: getCategoryColor(event.category),
        venue: event.venue_name || 'Venue TBD',
        location: event.venue_address || event.venue_name || 'Bahrain',
        date: formatDate(eventDateRaw),
        rawDate: normalizeToISODate(eventDateRaw), // ISO format for filtering
        time: (event.time || event.start_time || '').toLowerCase().includes('tba') ? '' : (event.time || event.start_time || ''),
        price: formatPrice(event.price, event.booking_method),
        isFree: !event.price || event.price === 'Free' || event.price.toLowerCase() === 'free',
        isFeatured: event.is_featured || false,
        viewCount: event.views || event.view_count || 0,
      };
    });

    return NextResponse.json({
      events: transformedEvents,
      total: transformedEvents.length,
    });
  } catch (error) {
    console.error('Events API error:', error);
    // Return empty array on any error
    return NextResponse.json({
      events: [],
      total: 0,
      error: 'Server error',
    });
  }
}

// Helper: Get category color
function getCategoryColor(category: string | null): string {
  if (!category) return 'bg-gray-500';
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
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'TBD';
  }
}

// Helper: Format price
function formatPrice(priceType: string | null, bookingMethod: string | null): string {
  if (!priceType && !bookingMethod) return 'See Details';
  if (priceType === 'free' || priceType === 'Free') {
    return 'Free Entry';
  }
  if (bookingMethod) {
    const priceMatch = bookingMethod.match(/BD\s*\d+/i);
    if (priceMatch) {
      return bookingMethod.includes('From') ? bookingMethod : `BD ${priceMatch[0].replace(/BD\s*/i, '')}`;
    }
    return bookingMethod;
  }
  if (priceType) {
    return priceType;
  }
  return 'See Details';
}

// Helper: Normalize date to ISO format (YYYY-MM-DD)
function normalizeToISODate(dateStr: string | null): string {
  if (!dateStr) return '';

  // If already in ISO format (YYYY-MM-DD), return as-is
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    return dateStr.split('T')[0]; // Strip time if present
  }

  // Try to parse various formats
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      // If the year is missing/wrong (e.g., "Dec 29" parsed as 2001), use current/next year
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();

      if (year < currentYear - 1) {
        // Date was parsed with wrong year, assume current or next year
        const month = date.getMonth();
        const day = date.getDate();
        const currentMonth = new Date().getMonth();

        // If the month is before current month, assume next year
        const targetYear = month < currentMonth ? currentYear + 1 : currentYear;
        const correctedDate = new Date(targetYear, month, day);
        return correctedDate.toISOString().split('T')[0];
      }

      return date.toISOString().split('T')[0];
    }
  } catch {
    // Fall through
  }

  return ''; // Return empty if we can't parse
}
