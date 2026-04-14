import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getAdminClient();

    // Try to query the table directly - select specific columns that should exist
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: trailers, error } = await (supabase as any)
      .from('cinema_featured_trailers')
      .select('id, movie_id, display_order, is_active')
      .order('display_order', { ascending: true });

    // If error code is 42P01, table doesn't exist
    const isTableNotFound = error && error.code === '42P01';

    if (isTableNotFound) {
      console.log('Table cinema_featured_trailers does not exist');
      return NextResponse.json({ trailers: [], tableExists: false });
    }

    // If there's any other error (like missing column), still return tableExists: true
    if (error) {
      console.error('Query error (table exists):', error.message);
      return NextResponse.json({ 
        trailers: [], 
        tableExists: true, 
        error: error.message 
      });
    }

    // Success - fetch movie details for each trailer
    const trailersWithMovies = await Promise.all(
      (trailers || []).map(async (trailer: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: movie } = await (supabase as any)
          .from('movies')
          .select('id, title, poster_url, backdrop_url, trailer_url, trailer_key, synopsis, genre, tmdb_rating')
          .eq('id', trailer.movie_id)
          .single();

        return { ...trailer, movie: movie || null };
      })
    );

    return NextResponse.json({ trailers: trailersWithMovies, tableExists: true });
  } catch (err) {
    console.error('Cinema featured trailers exception:', err);
    return NextResponse.json({ error: String(err), trailers: [], tableExists: false }, { status: 200 });
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