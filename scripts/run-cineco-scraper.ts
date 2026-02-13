#!/usr/bin/env npx tsx

/**
 * Cineco Bahrain Cinema Scraper Runner
 *
 * Scrapes movies from Cineco Bahrain and updates the database.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
config();

import { createClient } from '@supabase/supabase-js';
import {
  scrapeCinecoBahrain,
  createSlug,
  type ScrapedMovie
} from '../src/lib/scrapers/cineco-bahrain';
import { searchTMDB, type TMDBMovie } from '../src/lib/scrapers/vox-bahrain';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface MovieRecord {
  id: string;
  slug: string;
  title: string;
  scraped_from: string[] | null;
}

/**
 * Update database with scraped movies
 */
async function updateDatabase(
  nowShowing: ScrapedMovie[],
  comingSoon: ScrapedMovie[]
): Promise<{ added: number; updated: number; errors: number }> {
  console.log('\n' + '='.repeat(60));
  console.log('UPDATING DATABASE');
  console.log('='.repeat(60));

  let added = 0;
  let updated = 0;
  let errors = 0;

  const allMovies = [
    ...nowShowing.map(m => ({ ...m, isNowShowing: true, isComingSoon: false })),
    ...comingSoon.map(m => ({ ...m, isNowShowing: false, isComingSoon: true }))
  ];

  const processedSlugs: string[] = [];

  for (const movie of allMovies) {
    try {
      const slug = movie.slug || createSlug(movie.title);
      processedSlugs.push(slug);

      // Check if movie exists
      const { data: existing, error: fetchError } = await supabase
        .from('movies')
        .select('id, slug, title, scraped_from')
        .eq('slug', slug)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error(`  Error checking ${movie.title}:`, fetchError.message);
        errors++;
        continue;
      }

      if (existing) {
        // Update existing movie
        const currentSources = (existing as MovieRecord).scraped_from || [];
        const hasCineco = currentSources.some(s => s.toLowerCase() === 'cineco');

        const updateData: Record<string, unknown> = {
          is_now_showing: movie.isNowShowing || (existing as MovieRecord).scraped_from?.includes('vox'),
          is_coming_soon: movie.isComingSoon,
          updated_at: new Date().toISOString()
        };

        if (!hasCineco) {
          updateData.scraped_from = [...currentSources, 'cineco'];
        }

        // Add trailer if we have one and existing doesn't
        if (movie.trailerUrl) {
          updateData.trailer_url = movie.trailerUrl;
        }

        const { error: updateError } = await supabase
          .from('movies')
          .update(updateData)
          .eq('id', (existing as MovieRecord).id);

        if (updateError) {
          console.error(`  Error updating ${movie.title}:`, updateError.message);
          errors++;
        } else {
          console.log(`  Updated: ${movie.title} (${movie.isNowShowing ? 'Now Showing' : 'Coming Soon'})`);
          updated++;
        }
      } else {
        // New movie - search TMDB for details
        console.log(`  Searching TMDB for: ${movie.title}`);
        let tmdbData: TMDBMovie | null = null;

        if (TMDB_API_KEY) {
          tmdbData = await searchTMDB(movie.title, TMDB_API_KEY);
          await wait(300);
        }

        // Language mapping
        const languageMap: Record<string, string> = {
          'english': 'English',
          'arabic': 'Arabic',
          'hindi': 'Hindi',
          'malayalam': 'Malayalam',
          'tamil': 'Tamil',
          'telugu': 'Telugu',
          'sinhala': 'Sinhala',
          'nepali': 'Nepali'
        };
        const cinecoLanguage = movie.language ? 
          languageMap[movie.language.toLowerCase()] || movie.language : null;

        // Poster fallback chain: TMDB → Cineco scraped poster
        const finalPosterUrl = tmdbData?.poster_url || movie.posterUrl || null;
        
        // SKIP movies without any poster - every movie must have a poster
        if (!finalPosterUrl) {
          console.log(`  ⚠️ Skipping ${movie.title}: No poster available (TMDB or Cineco)`);
          continue;
        }

        const movieData = {
          title: tmdbData?.title || movie.title,
          slug: slug,
          poster_url: finalPosterUrl,
          backdrop_url: tmdbData?.backdrop_url || null,
          trailer_url: tmdbData?.trailer_url || movie.trailerUrl || null,
          trailer_key: tmdbData?.trailer_key || null,
          synopsis: tmdbData?.synopsis || null,
          genre: tmdbData?.genre || [],
          duration_minutes: tmdbData?.duration_minutes || null,
          tmdb_rating: tmdbData?.tmdb_rating || null,
          tmdb_id: tmdbData?.tmdb_id || null,
          release_date: tmdbData?.release_date || null,
          language: tmdbData?.language || cinecoLanguage || 'English',
          director: tmdbData?.director || null,
          movie_cast: tmdbData?.movie_cast || [],
          is_now_showing: movie.isNowShowing,
          is_coming_soon: movie.isComingSoon,
          scraped_from: ['cineco'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('movies')
          .insert(movieData);

        if (insertError) {
          if (insertError.code === '23505') {
            console.log(`  Skipping duplicate: ${movie.title}`);
          } else {
            console.error(`  Error adding ${movie.title}:`, insertError.message);
            errors++;
          }
        } else {
          console.log(`  Added: ${movie.title} (${movie.isNowShowing ? 'Now Showing' : 'Coming Soon'})`);
          added++;
        }
      }
    } catch (error) {
      console.error(`  Error processing ${movie.title}:`, error instanceof Error ? error.message : error);
      errors++;
    }
  }

  // Cleanup old Cineco movies
  await cleanupOldMovies(processedSlugs);

  return { added, updated, errors };
}

/**
 * Mark movies no longer at Cineco as inactive
 */
async function cleanupOldMovies(currentSlugs: string[]): Promise<void> {
  console.log('\nCleaning up old movies...');

  if (currentSlugs.length < 3) {
    console.log(`  ⚠️  Skipping cleanup: only ${currentSlugs.length} movies scraped`);
    return;
  }

  try {
    const { data: cinecoMovies, error } = await supabase
      .from('movies')
      .select('id, slug, title, scraped_from')
      .contains('scraped_from', ['cineco']);

    if (error) {
      console.error('  Error fetching Cineco movies:', error.message);
      return;
    }

    let cleaned = 0;
    for (const movie of (cinecoMovies || []) as MovieRecord[]) {
      if (!currentSlugs.includes(movie.slug)) {
        const updatedSources = (movie.scraped_from || []).filter(s => s.toLowerCase() !== 'cineco');

        const updateData: Record<string, unknown> = {
          scraped_from: updatedSources,
          updated_at: new Date().toISOString()
        };

        if (updatedSources.length === 0) {
          updateData.is_now_showing = false;
          updateData.is_coming_soon = false;
        }

        await supabase
          .from('movies')
          .update(updateData)
          .eq('id', movie.id);

        console.log(`  Removed Cineco from: ${movie.title}`);
        cleaned++;
      }
    }

    console.log(`  Cleaned ${cleaned} old movies`);
  } catch (error) {
    console.error('  Cleanup error:', error instanceof Error ? error.message : error);
  }
}

/**
 * Log scraper run
 */
async function logScraperRun(
  added: number,
  updated: number,
  errors: number,
  nowShowingCount: number,
  comingSoonCount: number
): Promise<void> {
  try {
    await supabase
      .from('agent_logs')
      .insert({
        agent_name: 'cineco_bahrain_scraper',
        agent_type: 'cinema_scraper_github',
        status: errors > 0 ? 'completed_with_errors' : 'completed',
        details: {
          movies_added: added,
          movies_updated: updated,
          errors: errors,
          now_showing_count: nowShowingCount,
          coming_soon_count: comingSoonCount,
          source: 'cineco_bahrain'
        },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error logging scraper run:', error instanceof Error ? error.message : error);
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    const { nowShowing, comingSoon } = await scrapeCinecoBahrain();

    if (nowShowing.length === 0 && comingSoon.length === 0) {
      console.log('\n' + '='.repeat(60));
      console.log('⚠️  WARNING: NO MOVIES SCRAPED!');
      console.log('='.repeat(60));
      console.log('Skipping database update to preserve existing data.');
      await logScraperRun(0, 0, 1, 0, 0);
      process.exit(0);
    }

    const { added, updated, errors } = await updateDatabase(nowShowing, comingSoon);

    await logScraperRun(added, updated, errors, nowShowing.length, comingSoon.length);

    console.log('\n' + '='.repeat(60));
    console.log('DATABASE UPDATE SUMMARY');
    console.log('='.repeat(60));
    console.log(`Movies Added: ${added}`);
    console.log(`Movies Updated: ${updated}`);
    console.log(`Errors: ${errors}`);
    console.log('\n' + '='.repeat(60));
    console.log('SCRAPER COMPLETED');
    console.log('Finished at:', new Date().toISOString());
    console.log('='.repeat(60));

    if (errors > 0 && added === 0 && updated === 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
