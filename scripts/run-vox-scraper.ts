#!/usr/bin/env npx tsx

/**
 * VOX Bahrain Cinema Scraper Runner
 *
 * This script runs the VOX Bahrain scraper and updates the database.
 * Run with: npx tsx scripts/run-vox-scraper.ts
 */

import { config } from 'dotenv';
// Load .env.local for local development
config({ path: '.env.local' });
// Also try .env for CI/CD
config();
import { createClient } from '@supabase/supabase-js';
import {
  scrapeVOXBahrain,
  searchTMDB,
  createSlug,
  type ScrapedMovie,
  type TMDBMovie
} from '../src/lib/scrapers/vox-bahrain';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Delay helper
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

  // Combine all movies
  const allMovies = [
    ...nowShowing.map(m => ({ ...m, isNowShowing: true, isComingSoon: false })),
    ...comingSoon.map(m => ({ ...m, isNowShowing: false, isComingSoon: true }))
  ];

  // Track processed slugs for cleanup
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
        // PGRST116 = no rows found, which is expected for new movies
        console.error(`  Error checking ${movie.title}:`, fetchError.message);
        errors++;
        continue;
      }

      if (existing) {
        // Update existing movie
        const currentSources = (existing as MovieRecord).scraped_from || [];
        const hasVox = currentSources.some(s => s.toLowerCase() === 'vox');

        const updateData: Record<string, unknown> = {
          is_now_showing: movie.isNowShowing,
          is_coming_soon: movie.isComingSoon,
          cinema_source: 'vox',
          updated_at: new Date().toISOString()
        };

        if (!hasVox) {
          updateData.scraped_from = [...currentSources, 'vox'];
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
          await wait(300); // Rate limit TMDB requests
        }

        // Map VOX language codes to full names
        const languageMap: Record<string, string> = {
          'english': 'English',
          'arb': 'Arabic',
          'arabic': 'Arabic',
          'hindi': 'Hindi',
          'malayalam': 'Malayalam',
          'tamil': 'Tamil',
          'telugu': 'Telugu',
          'korean': 'Korean',
          'japanese': 'Japanese'
        };
        const voxLanguage = movie.language ? languageMap[movie.language.toLowerCase()] || movie.language : null;

        // Poster fallback chain: TMDB → VOX scraped poster
        const finalPosterUrl = tmdbData?.poster_url || movie.posterUrl || null;
        
        // SKIP movies without any poster - every movie must have a poster
        if (!finalPosterUrl) {
          console.log(`  ⚠️ Skipping ${movie.title}: No poster available (TMDB or VOX)`);
          continue;
        }

        // Prepare movie data (only include fields that exist in the database)
        const movieData = {
          title: tmdbData?.title || movie.title,
          slug: slug,
          poster_url: finalPosterUrl,
          backdrop_url: tmdbData?.backdrop_url || null,
          trailer_url: tmdbData?.trailer_url || null,
          trailer_key: tmdbData?.trailer_key || null,
          synopsis: tmdbData?.synopsis || movie.synopsis || null,
          genre: tmdbData?.genre || [],
          duration_minutes: tmdbData?.duration_minutes || movie.durationMinutes || null,
          tmdb_rating: tmdbData?.tmdb_rating || null,
          tmdb_id: tmdbData?.tmdb_id || null,
          release_date: movie.releaseDate || tmdbData?.release_date || null,
          language: tmdbData?.language || voxLanguage || 'English',
          director: tmdbData?.director || null,
          movie_cast: tmdbData?.movie_cast || [],
          is_now_showing: movie.isNowShowing,
          is_coming_soon: movie.isComingSoon,
          scraped_from: ['vox'],
          cinema_source: 'vox',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('movies')
          .insert(movieData);

        if (insertError) {
          // Check if it's a duplicate slug error
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

  // Cleanup movies no longer at VOX
  await cleanupOldMovies(processedSlugs);

  return { added, updated, errors };
}

/**
 * Mark movies no longer at VOX as inactive
 * SAFETY: Only cleanup if we have enough scraped movies to indicate a successful scrape
 */
async function cleanupOldMovies(currentSlugs: string[]): Promise<void> {
  console.log('\nCleaning up old movies...');

  // SAFETY CHECK: Don't cleanup if we scraped very few movies
  // This prevents wiping the database if the scrape partially failed
  if (currentSlugs.length < 3) {
    console.log(`  ⚠️  Skipping cleanup: only ${currentSlugs.length} movies scraped (minimum 3 required)`);
    console.log('  This prevents accidental data loss from partial scrape failures.');
    return;
  }

  try {
    // Get all movies that have 'vox' in scraped_from
    const { data: voxMovies, error } = await supabase
      .from('movies')
      .select('id, slug, title, scraped_from')
      .contains('scraped_from', ['vox']);

    if (error) {
      console.error('  Error fetching VOX movies:', error.message);
      return;
    }

    let cleaned = 0;
    for (const movie of (voxMovies || []) as MovieRecord[]) {
      if (!currentSlugs.includes(movie.slug)) {
        // Remove 'vox' from scraped_from
        const updatedSources = (movie.scraped_from || []).filter(s => s.toLowerCase() !== 'vox');

        const updateData: Record<string, unknown> = {
          scraped_from: updatedSources,
          updated_at: new Date().toISOString()
        };

        // If no sources left, mark as not showing
        if (updatedSources.length === 0) {
          updateData.is_now_showing = false;
          updateData.is_coming_soon = false;
        }

        await supabase
          .from('movies')
          .update(updateData)
          .eq('id', movie.id);

        console.log(`  Removed VOX from: ${movie.title}`);
        cleaned++;
      }
    }

    console.log(`  Cleaned ${cleaned} old movies`);
  } catch (error) {
    console.error('  Cleanup error:', error instanceof Error ? error.message : error);
  }
}

/**
 * Log scraper run to agent_logs table
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
        agent_name: 'vox_bahrain_scraper_cheerio',
        agent_type: 'cinema_scraper_github',
        status: errors > 0 ? 'completed_with_errors' : 'completed',
        details: {
          movies_added: added,
          movies_updated: updated,
          errors: errors,
          now_showing_count: nowShowingCount,
          coming_soon_count: comingSoonCount,
          source: 'vox_bahrain',
          scraper_version: 'cheerio_v2'
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
    // Run the scraper
    const { nowShowing, comingSoon } = await scrapeVOXBahrain();

    // CRITICAL: If no movies were scraped, preserve existing data
    if (nowShowing.length === 0 && comingSoon.length === 0) {
      console.log('\n' + '='.repeat(60));
      console.log('⚠️  WARNING: NO MOVIES SCRAPED!');
      console.log('='.repeat(60));
      console.log('The VOX website might be blocking requests or experiencing issues.');
      console.log('Skipping database update to PRESERVE EXISTING DATA.');
      console.log('Existing movies in database will NOT be removed.');
      console.log('\n' + '='.repeat(60));

      // Log the failed run
      await logScraperRun(0, 0, 1, 0, 0);

      // Exit with code 0 to not fail the workflow
      // This prevents retries that could also fail
      process.exit(0);
    }

    // Update database
    const { added, updated, errors } = await updateDatabase(nowShowing, comingSoon);

    // Log the run
    await logScraperRun(added, updated, errors, nowShowing.length, comingSoon.length);

    // Print summary
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

    // Exit with error code if there were errors
    if (errors > 0 && added === 0 && updated === 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run
main();
