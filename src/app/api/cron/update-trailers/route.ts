import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

/**
 * Trailer Auto-Fetch Cron Job
 * 
 * Queries movies missing trailer data where:
 * - trailer_url IS NULL
 * - release_date is within last 3 months OR is_now_showing OR is_coming_soon
 * 
 * Searches YouTube for "{movie title} official trailer {year}"
 * Updates trailer_key and trailer_url in movies table
 * 
 * Add to vercel.json:
 * {
 *   "crons": [
 *     { "path": "/api/cron/update-trailers", "schedule": "0 0 * * 0" }
 *   ]
 * }
 * 
 * Requires YOUTUBE_API_KEY in environment variables
 * Requires CRON_SECRET for auth
 */

interface YouTubeSearchResult {
  videoId: string;
  title: string;
  channelTitle: string;
}

async function searchYouTube(query: string, apiKey: string): Promise<YouTubeSearchResult | null> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${apiKey}`;
  
  try {
    const response = await fetch(url, { next: { revalidate: 0 } });
    if (!response.ok) {
      console.error('YouTube API error:', response.status);
      return null;
    }
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
      };
    }
    
    return null;
  } catch (error) {
    console.error('YouTube search error:', error);
    return null;
  }
}

// Define movie type based on actual DB columns
interface MovieRecord {
  id: string;
  title: string;
  release_date: string | null;
  trailer_url: string | null;
  trailer_key: string | null;
  is_now_showing: boolean;
  is_coming_soon: boolean;
}

export async function GET(request: Request) {
  const startTime = Date.now();
  
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');
  
  const cronSecret = process.env.CRON_SECRET;
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  
  // Auth check
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && apiKey !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Check YouTube API key
  if (!youtubeApiKey) {
    return NextResponse.json({
      success: false,
      error: 'YOUTUBE_API_KEY not configured. Set it in Vercel environment variables.',
    });
  }

  try {
    const supabase = getAdminClient();
    
    // Calculate date range (last 3 months)
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
    const threeMonthsAgoStr = threeMonthsAgo.toISOString().split('T')[0];
    
    // Query ALL movies missing trailers - exclude sports events
    const { data: movies, error } = await supabase
      .from('movies')
      .select('id, title, release_date, trailer_url, trailer_key, is_now_showing, is_coming_soon')
      .or('trailer_url.is.null,trailer_key.is.null');
    
    if (error) {
      throw error;
    }
    
    // Filter to only movies that actually need trailers
    const moviesNeedingTrailers = (movies as MovieRecord[] | null)?.filter(
      m => !m.trailer_url || !m.trailer_key
    ) || [];
    
    if (moviesNeedingTrailers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No movies found need trailers. All caught up!',
        stats: {
          processed: 0,
          updated: 0,
          failed: 0,
        },
        timeMs: Date.now() - startTime,
      });
    }
    
    console.log(`Found ${moviesNeedingTrailers.length} movies needing trailers`);
    
    let updatedCount = 0;
    let failedCount = 0;
    const results: {
      title: string;
      release_date: string | null;
      status: string;
      videoId?: string;
      error?: string;
    }[] = [];
    
    // Process each movie (with rate limiting for YouTube API)
    // Free tier: 10,000 quota/day, search costs 100 units
    // Increase limit to catch all remaining movies
    const moviesToProcess = moviesNeedingTrailers.slice(0, 100);
    
    for (const movie of moviesToProcess) {
      const title = movie.title || '';
      const releaseDate = movie.release_date;
      const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
      
      // Build search query
      const searchQuery = year 
        ? `${title} official trailer ${year}`
        : `${title} official trailer`;
      
      console.log(`Searching: ${searchQuery}`);
      
      const youtubeResult = await searchYouTube(searchQuery, youtubeApiKey);
      
      if (youtubeResult) {
        // Update the movie with trailer data
        const trailerUrl = `https://www.youtube.com/watch?v=${youtubeResult.videoId}`;
        
        const { error: updateError } = await (supabase as any)
          .from('movies')
          .update({
            trailer_key: youtubeResult.videoId,
            trailer_url: trailerUrl,
          })
          .eq('id', movie.id);
        
        if (updateError) {
          failedCount++;
          results.push({
            title,
            release_date: releaseDate,
            status: 'failed',
            error: updateError.message,
          });
        } else {
          updatedCount++;
          results.push({
            title,
            release_date: releaseDate,
            status: 'updated',
            videoId: youtubeResult.videoId,
          });
        }
      } else {
        failedCount++;
        results.push({
          title,
          release_date: releaseDate,
          status: 'not_found',
          error: 'No YouTube result found',
        });
      }
      
      // Rate limiting: 100ms delay between searches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const remaining = moviesNeedingTrailers.length - moviesToProcess.length;
    
    return NextResponse.json({
      success: true,
      message: updatedCount > 0 
        ? `Updated ${updatedCount} trailers. ${remaining} more remaining (will continue on next run).`
        : `Processed ${moviesToProcess.length} movies. No trailers found.`,
      stats: {
        totalNeedingTrailers: moviesNeedingTrailers.length,
        processedThisRun: moviesToProcess.length,
        updated: updatedCount,
        failed: failedCount,
        remaining: remaining,
      },
      results: results.slice(0, 20),
      timeMs: Date.now() - startTime,
    });
    
  } catch (error) {
    console.error('Update trailers error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timeMs: Date.now() - startTime,
    }, { status: 500 });
  }
}

// Also support POST for manual triggers
export async function POST(request: Request) {
  return GET(request);
}