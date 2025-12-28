import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  scrapeAllCinemas,
  getUniqueTitles,
  matchMovies,
  ScrapeResult,
  MatchedMovie,
} from '@/lib/scrapers/cinema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds timeout for scraping

interface ScrapeLogEntry {
  agent_type: string;
  started_at: string;
  completed_at?: string;
  status: 'running' | 'completed' | 'failed';
  items_found: number;
  items_added: number;
  items_updated: number;
  error_count: number;
  duration_ms?: number;
  metadata?: Record<string, unknown>;
}

export async function POST() {
  const startTime = Date.now();

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create log entry
    const logEntry: ScrapeLogEntry = {
      agent_type: 'cinema_scraper',
      started_at: new Date().toISOString(),
      status: 'running',
      items_found: 0,
      items_added: 0,
      items_updated: 0,
      error_count: 0,
    };

    const { data: logData, error: logError } = await supabase
      .from('agent_logs')
      .insert(logEntry)
      .select()
      .single();

    const logId = logData?.id;

    // Scrape all cinema websites
    console.log('Starting cinema scrape...');
    const scrapeResults: ScrapeResult[] = await scrapeAllCinemas();

    // Get unique titles from all cinemas
    const uniqueScrapedMovies = getUniqueTitles(scrapeResults);
    const totalScraped = uniqueScrapedMovies.length;

    console.log(`Total unique movies scraped: ${totalScraped}`);

    // Fetch all movies from database
    const { data: dbMovies, error: dbError } = await supabase
      .from('movies')
      .select('id, title');

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    if (!dbMovies || dbMovies.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No movies in database to match against. Run TMDB sync first.',
        scrapeResults,
        totalScraped,
        matchedCount: 0,
        unmatchedTitles: uniqueScrapedMovies.map(m => m.title),
      });
    }

    // Match scraped movies with database
    const { matched, unmatched } = matchMovies(uniqueScrapedMovies, dbMovies, 0.7);

    console.log(`Matched ${matched.length} movies, ${unmatched.length} unmatched`);

    // Get unique matched movie IDs
    const matchedIds = [...new Set(matched.map(m => m.id))];

    // FALLBACK: If scraping found very few movies, use TMDB release date logic
    const MIN_SCRAPED_THRESHOLD = 3; // If we scraped fewer than 3 movies, use fallback
    const useTMDBFallback = matchedIds.length < MIN_SCRAPED_THRESHOLD;

    console.log(`Matched ${matchedIds.length} movies. Use TMDB fallback: ${useTMDBFallback}`);

    // Update movies: set is_now_showing based on scrape results
    // First, set all movies to NOT now showing
    const { error: resetError } = await supabase
      .from('movies')
      .update({
        is_now_showing: false,
        scraped_from: null,
        last_scraped: new Date().toISOString(),
      })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Match all

    if (resetError) {
      console.error('Error resetting movies:', resetError);
    }

    let updatedCount = 0;
    let fallbackCount = 0;

    if (useTMDBFallback) {
      // TMDB Fallback: Mark movies as "now showing" if released within last 60 days
      console.log('Using TMDB release date fallback...');

      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
      const sixtyDaysAgoStr = sixtyDaysAgo.toISOString().split('T')[0];

      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];

      // Get movies released in the last 60 days with decent popularity
      const { data: recentMovies, error: recentError } = await supabase
        .from('movies')
        .select('id, title, release_date, popularity')
        .gte('release_date', sixtyDaysAgoStr)
        .lte('release_date', todayStr)
        .gte('popularity', 20) // Only popular movies
        .order('popularity', { ascending: false })
        .limit(30); // Top 30 recent popular movies

      if (recentError) {
        console.error('Error fetching recent movies:', recentError);
      } else if (recentMovies && recentMovies.length > 0) {
        console.log(`Found ${recentMovies.length} movies via TMDB fallback`);

        for (const movie of recentMovies) {
          const { error: updateError } = await supabase
            .from('movies')
            .update({
              is_now_showing: true,
              scraped_from: ['tmdb_fallback'],
              last_scraped: new Date().toISOString(),
            })
            .eq('id', movie.id);

          if (updateError) {
            console.error(`Error updating movie ${movie.id}:`, updateError);
          } else {
            fallbackCount++;
          }
        }
      }
    } else {
      // Use scraped data
      for (const movieId of matchedIds) {
        const sources = matched
          .filter(m => m.id === movieId)
          .map(m => m.source);

        const { error: updateError } = await supabase
          .from('movies')
          .update({
            is_now_showing: true,
            scraped_from: sources,
            last_scraped: new Date().toISOString(),
          })
          .eq('id', movieId);

        if (updateError) {
          console.error(`Error updating movie ${movieId}:`, updateError);
        } else {
          updatedCount++;
        }
      }
    }

    const duration = Date.now() - startTime;

    // Update log entry
    if (logId) {
      await supabase
        .from('agent_logs')
        .update({
          completed_at: new Date().toISOString(),
          status: 'completed',
          items_found: totalScraped,
          items_updated: useTMDBFallback ? fallbackCount : updatedCount,
          duration_ms: duration,
          metadata: {
            scrapeResults: scrapeResults.map(r => ({
              cinema: r.cinema,
              moviesFound: r.moviesFound,
            })),
            matchedCount: matched.length,
            unmatchedCount: unmatched.length,
            unmatchedTitles: unmatched.slice(0, 20), // Limit for storage
            usedTMDBFallback: useTMDBFallback,
            fallbackCount: useTMDBFallback ? fallbackCount : 0,
          },
        })
        .eq('id', logId);
    }

    const finalUpdatedCount = useTMDBFallback ? fallbackCount : updatedCount;

    return NextResponse.json({
      success: true,
      message: useTMDBFallback
        ? `Scraping found too few movies. Used TMDB fallback: ${fallbackCount} movies marked as now showing`
        : `Scraped ${totalScraped} movies, matched ${matched.length}, updated ${updatedCount}`,
      summary: {
        totalScraped,
        matchedCount: matched.length,
        updatedCount: finalUpdatedCount,
        unmatchedCount: unmatched.length,
        usedFallback: useTMDBFallback,
        fallbackCount: useTMDBFallback ? fallbackCount : 0,
        duration: `${duration}ms`,
      },
      scrapeResults: scrapeResults.map(r => ({
        cinema: r.cinema,
        moviesFound: r.moviesFound,
        movies: r.movies.map(m => m.title),
      })),
      matchedMovies: matched.map(m => ({
        title: m.title,
        matchedWith: m.matchedWith,
        source: m.source,
        similarity: Math.round(m.similarity * 100) + '%',
      })),
      unmatchedTitles: unmatched,
    });
  } catch (error) {
    console.error('Cinema scrape error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: `${Date.now() - startTime}ms`,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check last scrape status
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get latest scrape log
    const { data: latestLog, error: logError } = await supabase
      .from('agent_logs')
      .select('*')
      .eq('agent_type', 'cinema_scraper')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    // Get count of now showing movies
    const { count: nowShowingCount } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_now_showing', true);

    // Get movies with their scraped sources
    const { data: scrapedMovies } = await supabase
      .from('movies')
      .select('title, scraped_from, last_scraped')
      .eq('is_now_showing', true)
      .not('scraped_from', 'is', null);

    return NextResponse.json({
      success: true,
      lastScrape: latestLog || null,
      nowShowingCount: nowShowingCount || 0,
      scrapedMovies: scrapedMovies || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
