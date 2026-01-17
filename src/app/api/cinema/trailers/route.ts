import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface Movie {
  id: string;
  title: string;
  synopsis: string | null;
  genre: string[] | null;
  trailer_url: string | null;
  trailer_key: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  release_date: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');

    const supabase = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: movies, error } = await (supabase as any)
      .from('movies')
      .select('id, title, synopsis, genre, trailer_url, trailer_key, poster_url, backdrop_url, release_date')
      .eq('is_now_showing', true)
      .order('release_date', { ascending: false })
      .limit(limit * 2) as { data: Movie[] | null; error: { message: string } | null };

    if (error) {
      console.error('Trailers API error:', error);
      return NextResponse.json({ movies: [], error: error.message }, { status: 200 });
    }

    // Filter movies that have trailers (trailer_url or trailer_key for YouTube)
    const moviesWithTrailers = (movies || [])
      .filter(m => m.trailer_url || m.trailer_key);

    // Prioritize Avatar to be first (featured trailer)
    const avatarIndex = moviesWithTrailers.findIndex(m =>
      m.title.toLowerCase().includes('avatar')
    );

    if (avatarIndex > 0) {
      const [avatar] = moviesWithTrailers.splice(avatarIndex, 1);
      moviesWithTrailers.unshift(avatar);
    }

    return NextResponse.json({ movies: moviesWithTrailers.slice(0, limit) });
  } catch (err) {
    console.error('Trailers API exception:', err);
    return NextResponse.json({ movies: [], error: String(err) }, { status: 200 });
  }
}
