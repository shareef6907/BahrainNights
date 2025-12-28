import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

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

// GET /api/cinema/showtimes - Get all showtimes
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const movieId = searchParams.get('movie_id');
    const cinemaId = searchParams.get('cinema_id');
    const date = searchParams.get('date');
    const futureOnly = searchParams.get('future_only') !== 'false';

    let query = supabase
      .from('showtimes')
      .select(`
        *,
        movie:movies(id, title, poster_url, slug),
        cinema:cinemas(id, name, location, area, booking_url)
      `)
      .eq('is_active', true)
      .order('showtime', { ascending: true });

    if (movieId) {
      query = query.eq('movie_id', movieId);
    }

    if (cinemaId) {
      query = query.eq('cinema_id', cinemaId);
    }

    if (date) {
      const startOfDay = `${date}T00:00:00`;
      const endOfDay = `${date}T23:59:59`;
      query = query.gte('showtime', startOfDay).lte('showtime', endOfDay);
    } else if (futureOnly) {
      query = query.gte('showtime', new Date().toISOString());
    }

    const { data: showtimes, error } = await query;

    if (error) {
      console.error('Error fetching showtimes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch showtimes' },
        { status: 500 }
      );
    }

    return NextResponse.json({ showtimes: showtimes || [] });
  } catch (error) {
    console.error('Showtimes API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/cinema/showtimes - Create a new showtime
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();

    const {
      movie_id,
      cinema_id,
      showtime,
      format = '2D',
      language = 'English',
      screen_number,
      booking_url,
      price_standard,
      price_vip,
    } = body;

    if (!movie_id || !cinema_id || !showtime) {
      return NextResponse.json(
        { error: 'movie_id, cinema_id, and showtime are required' },
        { status: 400 }
      );
    }

    const { data: newShowtime, error } = await supabase
      .from('showtimes')
      .insert({
        movie_id,
        cinema_id,
        showtime,
        format,
        language,
        screen_number,
        booking_url,
        price_standard,
        price_vip,
        is_active: true,
      })
      .select(`
        *,
        movie:movies(id, title, poster_url),
        cinema:cinemas(id, name, location)
      `)
      .single();

    if (error) {
      console.error('Error creating showtime:', error);
      return NextResponse.json(
        { error: 'Failed to create showtime' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, showtime: newShowtime });
  } catch (error) {
    console.error('Create showtime error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
