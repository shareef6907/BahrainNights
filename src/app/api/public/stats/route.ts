import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes

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

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Fetch counts in parallel
    const [
      eventsResult,
      venuesResult,
      moviesResult,
      offersResult,
    ] = await Promise.all([
      // Count events (only upcoming/active events)
      supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gte('start_date', new Date().toISOString().split('T')[0]),

      // Count approved venues
      supabase
        .from('venues')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved'),

      // Count now showing movies
      supabase
        .from('movies')
        .select('*', { count: 'exact', head: true })
        .eq('is_now_showing', true),

      // Count active offers
      supabase
        .from('offers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
    ]);

    const stats = {
      events: eventsResult.count || 0,
      venues: venuesResult.count || 0,
      cinema: moviesResult.count || 0,
      offers: offersResult.count || 0,
      // Explore is a combination of different things - just show venues for now
      explore: venuesResult.count || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API error:', error);
    // Return zeros on error
    return NextResponse.json({
      events: 0,
      venues: 0,
      cinema: 0,
      offers: 0,
      explore: 0,
    });
  }
}
