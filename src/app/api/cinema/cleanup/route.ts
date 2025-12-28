import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    // Find movies that:
    // 1. are NOT now showing (is_now_showing = false)
    // 2. are NOT coming soon (is_coming_soon = false)
    // 3. have empty or null scraped_from array
    // These are old movies from previous TMDB syncs that are not in any Bahrain cinema

    // First, get the movies to be deleted
    const { data: moviesToDelete, error: fetchError } = await supabase
      .from('movies')
      .select('id, title, scraped_from')
      .eq('is_now_showing', false)
      .eq('is_coming_soon', false);

    if (fetchError) {
      console.error('Error fetching movies:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch movies' },
        { status: 500 }
      );
    }

    // Filter to only movies with empty or null scraped_from
    const filteredMovies = (moviesToDelete || []).filter(movie => {
      // Check if scraped_from is null, undefined, or empty array
      return !movie.scraped_from ||
             (Array.isArray(movie.scraped_from) && movie.scraped_from.length === 0);
    });

    if (filteredMovies.length === 0) {
      return NextResponse.json({
        success: true,
        deleted: 0,
        message: 'No old movies to clean up',
      });
    }

    // Delete the filtered movies
    const idsToDelete = filteredMovies.map(m => m.id);

    const { error: deleteError } = await supabase
      .from('movies')
      .delete()
      .in('id', idsToDelete);

    if (deleteError) {
      console.error('Error deleting movies:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete movies' },
        { status: 500 }
      );
    }

    // Log the cleanup
    console.log(`Cleaned up ${filteredMovies.length} old movies:`);
    filteredMovies.forEach(m => console.log(`  - ${m.title}`));

    return NextResponse.json({
      success: true,
      deleted: filteredMovies.length,
      deletedMovies: filteredMovies.map(m => m.title),
      message: `Successfully deleted ${filteredMovies.length} old movies not in any Bahrain cinema`,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to preview what would be deleted
export async function GET() {
  try {
    const { data: moviesToDelete, error } = await supabase
      .from('movies')
      .select('id, title, scraped_from, is_now_showing, is_coming_soon, release_date')
      .eq('is_now_showing', false)
      .eq('is_coming_soon', false);

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch movies' },
        { status: 500 }
      );
    }

    // Filter to only movies with empty or null scraped_from
    const filteredMovies = (moviesToDelete || []).filter(movie => {
      return !movie.scraped_from ||
             (Array.isArray(movie.scraped_from) && movie.scraped_from.length === 0);
    });

    return NextResponse.json({
      success: true,
      count: filteredMovies.length,
      movies: filteredMovies.map(m => ({
        id: m.id,
        title: m.title,
        release_date: m.release_date,
      })),
      message: `Found ${filteredMovies.length} movies that would be deleted`,
    });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
