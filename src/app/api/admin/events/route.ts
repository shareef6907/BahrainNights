import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Get all events for admin panel
 * Includes all statuses: pending, published, draft, rejected
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const source = searchParams.get('source');
    const includeHidden = searchParams.get('includeHidden') === 'true';

    // Use supabaseAdmin to bypass RLS
    let query = supabaseAdmin
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by source (e.g., 'platinumlist')
    if (source) {
      query = query.eq('source_name', source);
    }

    // Filter by hidden status
    if (!includeHidden) {
      query = query.eq('is_hidden', false);
    }

    // Filter by status (only if not 'all' or 'past')
    if (status && status !== 'all' && status !== 'past') {
      query = query.eq('status', status);
    }

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Search by title or venue name
    if (search) {
      query = query.or(`title.ilike.%${search}%,venue_name.ilike.%${search}%`);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Admin events fetch error:', error);
      return NextResponse.json(
        { events: [], counts: { all: 0, pending: 0, published: 0, draft: 0, past: 0 }, error: error.message },
        { status: 200 }
      );
    }

    // Calculate counts
    const now = new Date();
    const allEvents = events || [];

    const counts = {
      all: allEvents.length,
      pending: allEvents.filter(e => e.status === 'pending').length,
      published: allEvents.filter(e => {
        const eventDate = e.date || e.start_date;
        return e.status === 'published' && (!eventDate || new Date(eventDate) >= now);
      }).length,
      draft: allEvents.filter(e => e.status === 'draft').length,
      past: allEvents.filter(e => {
        const eventDate = e.date || e.start_date;
        return eventDate && new Date(eventDate) < now;
      }).length,
    };

    // Normalize field names for frontend compatibility
    const normalizedEvents = allEvents.map(event => ({
      ...event,
      // Ensure consistent field names
      start_date: event.date || event.start_date,
      start_time: event.time || event.start_time,
      featured_image: event.cover_url || event.featured_image,
      view_count: event.views || event.view_count || 0,
    }));

    return NextResponse.json({
      events: normalizedEvents,
      counts,
    });
  } catch (error) {
    console.error('Admin events API error:', error);
    return NextResponse.json(
      { events: [], counts: { all: 0, pending: 0, published: 0, draft: 0, past: 0 }, error: 'Server error' },
      { status: 200 }
    );
  }
}
