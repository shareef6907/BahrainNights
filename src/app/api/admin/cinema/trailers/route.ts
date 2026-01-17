import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface FeaturedTrailer {
  id: string;
  movie_id: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Movie {
  id: string;
  title: string;
  poster_url: string | null;
  backdrop_url: string | null;
  trailer_url: string | null;
  trailer_key: string | null;
  synopsis: string | null;
  genre: string[] | null;
  tmdb_rating: number | null;
}

export async function GET() {
  try {
    const supabase = getAdminClient();

    // First check if the table exists by trying to query it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: trailers, error } = await (supabase as any)
      .from('cinema_featured_trailers')
      .select(`
        id,
        movie_id,
        display_order,
        is_active,
        created_at,
        updated_at
      `)
      .order('display_order', { ascending: true }) as { data: FeaturedTrailer[] | null; error: { message: string; code?: string } | null };

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ trailers: [], tableExists: false });
      }
      console.error('Cinema featured trailers fetch error:', error);
      return NextResponse.json({ error: error.message, trailers: [] }, { status: 200 });
    }

    // Now fetch the movie details for each trailer
    const trailersWithMovies = await Promise.all(
      (trailers || []).map(async (trailer) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: movie } = await (supabase as any)
          .from('movies')
          .select('id, title, poster_url, backdrop_url, trailer_url, trailer_key, synopsis, genre, tmdb_rating')
          .eq('id', trailer.movie_id)
          .single() as { data: Movie | null };

        return {
          ...trailer,
          movie: movie || null,
        };
      })
    );

    return NextResponse.json({ trailers: trailersWithMovies, tableExists: true });
  } catch (err) {
    console.error('Cinema featured trailers exception:', err);
    return NextResponse.json({ error: String(err), trailers: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const { movie_id } = await request.json();

    if (!movie_id) {
      return NextResponse.json({ error: 'movie_id is required' }, { status: 400 });
    }

    // Get highest order number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: maxOrderData } = await (supabase as any)
      .from('cinema_featured_trailers')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single() as { data: { display_order: number } | null };

    const nextOrder = (maxOrderData?.display_order || 0) + 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('cinema_featured_trailers')
      .insert({
        movie_id,
        display_order: nextOrder,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert cinema featured trailer error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ trailer: data });
  } catch (err) {
    console.error('POST cinema featured trailer exception:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
