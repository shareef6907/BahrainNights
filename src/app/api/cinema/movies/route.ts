import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

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
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const orderBy = searchParams.get('orderBy') || 'display_order';
    const orderDir = searchParams.get('orderDir') || 'asc';

    let query = supabase
      .from('movies')
      .select('*', { count: 'exact' });

    // Apply filters
    if (status === 'now_showing') {
      query = query.eq('is_now_showing', true);
    } else if (status === 'coming_soon') {
      query = query.eq('is_coming_soon', true);
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply ordering
    if (orderBy === 'display_order') {
      query = query
        .order('display_order', { ascending: orderDir === 'asc', nullsFirst: false })
        .order('tmdb_rating', { ascending: false, nullsFirst: false });
    } else if (orderBy === 'rating') {
      query = query.order('tmdb_rating', { ascending: orderDir === 'asc', nullsFirst: false });
    } else if (orderBy === 'title') {
      query = query.order('title', { ascending: orderDir === 'asc' });
    } else if (orderBy === 'created_at') {
      query = query.order('created_at', { ascending: orderDir === 'asc' });
    } else {
      query = query.order('tmdb_rating', { ascending: false, nullsFirst: false });
    }

    query = query.range(offset, offset + limit - 1);

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
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Movies API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/cinema/movies - Create a new movie manually
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    // Required fields
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100);

    // Check if slug exists
    const { data: existing } = await supabase
      .from('movies')
      .select('slug')
      .eq('slug', slug)
      .single();

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    // Get max display_order
    const { data: maxOrderData } = await supabase
      .from('movies')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = (maxOrderData?.display_order || 0) + 1;

    // Build movie object with all editable fields
    const movieData = {
      title: body.title,
      slug: finalSlug,
      poster_url: body.poster_url || null,
      backdrop_url: body.backdrop_url || null,
      trailer_url: body.trailer_url || null,
      trailer_key: body.trailer_key || null,
      synopsis: body.synopsis || body.description || null,
      genre: body.genre || [],
      duration_minutes: body.duration_minutes || body.duration || null,
      rating: body.rating || null,
      tmdb_rating: body.tmdb_rating || body.imdb_rating || null,
      release_date: body.release_date || null,
      director: body.director || null,
      movie_cast: body.movie_cast || body.cast || [],
      language: body.language || 'English',
      is_now_showing: body.is_now_showing ?? true,
      is_coming_soon: body.is_coming_soon ?? false,
      display_order: body.display_order || nextOrder,
      scraped_from: body.source === 'manual' ? null : body.scraped_from,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: movie, error } = await supabase
      .from('movies')
      .insert(movieData)
      .select()
      .single();

    if (error) {
      console.error('Create movie error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create movie' },
        { status: 500 }
      );
    }

    // Revalidate cinema pages
    revalidatePath('/cinema');
    revalidatePath('/admin/cinema');

    return NextResponse.json({ success: true, movie });
  } catch (error) {
    console.error('Create movie error:', error);
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}
