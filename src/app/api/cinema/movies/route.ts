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

// GET /api/cinema/movies - Get all movies
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status'); // 'now_showing' | 'coming_soon' | null
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('movies')
      .select('*', { count: 'exact' })
      .order('tmdb_rating', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    if (status === 'now_showing') {
      query = query.eq('is_now_showing', true);
    } else if (status === 'coming_soon') {
      query = query.eq('is_coming_soon', true);
    }

    const { data: movies, count, error } = await query;

    if (error) {
      console.error('Error fetching movies:', error);
      return NextResponse.json(
        { error: 'Failed to fetch movies' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      movies: movies || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Movies API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
