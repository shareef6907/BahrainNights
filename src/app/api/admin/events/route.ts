import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Get all events for admin panel
 * Includes all statuses: pending, published, draft
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by status
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
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }

    // Get counts for each status
    const { data: allEvents } = await supabase
      .from('events')
      .select('status, start_date');

    const now = new Date();
    const counts = {
      all: allEvents?.length || 0,
      pending: allEvents?.filter(e => e.status === 'pending').length || 0,
      published: allEvents?.filter(e => e.status === 'published' && new Date(e.start_date) >= now).length || 0,
      draft: allEvents?.filter(e => e.status === 'draft').length || 0,
      past: allEvents?.filter(e => new Date(e.start_date) < now).length || 0,
    };

    return NextResponse.json({
      events: events || [],
      counts,
    });
  } catch (error) {
    console.error('Admin events fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
