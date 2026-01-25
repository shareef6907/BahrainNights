import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Use lazy-initialized admin client
const supabase = supabaseAdmin;

// Helper to check if scraped_from is empty
function hasNoCinemaSources(scrapedFrom: string[] | null | undefined): boolean {
  return !scrapedFrom ||
         (Array.isArray(scrapedFrom) && scrapedFrom.length === 0);
}

export async function POST() {
  try {
    const results = {
      fixedComingSoon: 0,
      deletedOrphaned: 0,
      fixedComingSoonTitles: [] as string[],
      deletedOrphanedTitles: [] as string[],
    };

    // ============================================================
    // STEP 1: Fix Coming Soon movies with no cinema sources
    // Movies marked as Coming Soon but not from any Bahrain cinema
    // should have is_coming_soon set to false
    // ============================================================
    console.log('Step 1: Fixing Coming Soon movies with no cinema sources...');

    const { data: comingSoonMovies, error: fetchComingSoonError } = await supabase
      .from('movies')
      .select('id, title, scraped_from')
      .eq('is_coming_soon', true);

    if (fetchComingSoonError) {
      console.error('Error fetching coming soon movies:', fetchComingSoonError);
    } else {
      // Filter to movies with empty scraped_from
      const orphanedComingSoon = (comingSoonMovies || []).filter(movie =>
        hasNoCinemaSources(movie.scraped_from)
      );

      if (orphanedComingSoon.length > 0) {
        const idsToFix = orphanedComingSoon.map(m => m.id);

        const { error: fixError } = await supabase
          .from('movies')
          .update({ is_coming_soon: false })
          .in('id', idsToFix);

        if (fixError) {
          console.error('Error fixing coming soon movies:', fixError);
        } else {
          results.fixedComingSoon = orphanedComingSoon.length;
          results.fixedComingSoonTitles = orphanedComingSoon.map(m => m.title);
          console.log(`Fixed ${orphanedComingSoon.length} Coming Soon movies:`);
          orphanedComingSoon.forEach(m => console.log(`  - ${m.title}`));
        }
      } else {
        console.log('No orphaned Coming Soon movies found.');
      }
    }

    // ============================================================
    // STEP 2: Delete orphaned movies
    // Movies that are not showing, not coming soon, and have no cinema sources
    // These are old imports that shouldn't be in the database
    // ============================================================
    console.log('\nStep 2: Deleting orphaned movies...');

    const { data: moviesToDelete, error: fetchError } = await supabase
      .from('movies')
      .select('id, title, scraped_from')
      .eq('is_now_showing', false)
      .eq('is_coming_soon', false);

    if (fetchError) {
      console.error('Error fetching movies to delete:', fetchError);
    } else {
      // Filter to only movies with empty or null scraped_from
      const filteredMovies = (moviesToDelete || []).filter(movie =>
        hasNoCinemaSources(movie.scraped_from)
      );

      if (filteredMovies.length > 0) {
        const idsToDelete = filteredMovies.map(m => m.id);

        const { error: deleteError } = await supabase
          .from('movies')
          .delete()
          .in('id', idsToDelete);

        if (deleteError) {
          console.error('Error deleting movies:', deleteError);
        } else {
          results.deletedOrphaned = filteredMovies.length;
          results.deletedOrphanedTitles = filteredMovies.map(m => m.title);
          console.log(`Deleted ${filteredMovies.length} orphaned movies:`);
          filteredMovies.forEach(m => console.log(`  - ${m.title}`));
        }
      } else {
        console.log('No orphaned movies to delete.');
      }
    }

    // Log summary
    console.log('\n=== CLEANUP COMPLETE ===');
    console.log(`Fixed Coming Soon: ${results.fixedComingSoon}`);
    console.log(`Deleted Orphaned: ${results.deletedOrphaned}`);

    return NextResponse.json({
      success: true,
      fixedComingSoon: results.fixedComingSoon,
      deleted: results.deletedOrphaned,
      fixedComingSoonTitles: results.fixedComingSoonTitles,
      deletedMovies: results.deletedOrphanedTitles,
      message: `Fixed ${results.fixedComingSoon} Coming Soon movies and deleted ${results.deletedOrphaned} orphaned movies`,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to preview what would be affected
export async function GET() {
  try {
    // Get Coming Soon movies that would be fixed (no cinema sources)
    const { data: comingSoonMovies, error: comingSoonError } = await supabase
      .from('movies')
      .select('id, title, scraped_from, release_date')
      .eq('is_coming_soon', true);

    if (comingSoonError) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch coming soon movies' },
        { status: 500 }
      );
    }

    const orphanedComingSoon = (comingSoonMovies || []).filter(movie =>
      hasNoCinemaSources(movie.scraped_from)
    );

    // Get orphaned movies that would be deleted
    const { data: moviesToDelete, error: deleteError } = await supabase
      .from('movies')
      .select('id, title, scraped_from, release_date')
      .eq('is_now_showing', false)
      .eq('is_coming_soon', false);

    if (deleteError) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch orphaned movies' },
        { status: 500 }
      );
    }

    const orphanedMovies = (moviesToDelete || []).filter(movie =>
      hasNoCinemaSources(movie.scraped_from)
    );

    return NextResponse.json({
      success: true,
      preview: {
        comingSoonToFix: {
          count: orphanedComingSoon.length,
          movies: orphanedComingSoon.map(m => ({
            id: m.id,
            title: m.title,
            release_date: m.release_date,
          })),
          description: 'These Coming Soon movies have no Bahrain cinema sources and will have is_coming_soon set to false',
        },
        orphanedToDelete: {
          count: orphanedMovies.length,
          movies: orphanedMovies.map(m => ({
            id: m.id,
            title: m.title,
            release_date: m.release_date,
          })),
          description: 'These movies are not showing, not coming soon, and have no cinema sources - they will be deleted',
        },
      },
      message: `Would fix ${orphanedComingSoon.length} Coming Soon movies and delete ${orphanedMovies.length} orphaned movies`,
    });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
