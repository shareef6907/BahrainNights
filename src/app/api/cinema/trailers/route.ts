import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface Movie {
  id: string;
  title: string;
  overview: string | null;
  genre: string | null;
  trailer_url: string | null;
  youtube_trailer_id: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  release_date: string | null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '5');

  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: movies, error } = await (supabase as any)
    .from('movies')
    .select('id, title, overview, genre, trailer_url, youtube_trailer_id, poster_url, backdrop_url, release_date')
    .eq('is_active', true)
    .order('release_date', { ascending: false })
    .limit(limit * 2) as { data: Movie[] | null; error: { message: string } | null };

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter movies that have trailers
  const moviesWithTrailers = (movies || [])
    .filter(m => m.trailer_url || m.youtube_trailer_id)
    .slice(0, limit);

  return NextResponse.json({ movies: moviesWithTrailers });
}
