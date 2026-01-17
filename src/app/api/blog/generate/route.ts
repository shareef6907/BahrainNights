/**
 * Blog Generation API Route
 * Generates SEO-optimized blog posts for events and venues
 * Called by GitHub Actions or manually via secret key
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminClient } from '@/lib/supabase/server';
import {
  generateEventBlogPost,
  determineCountry,
  determineCity,
  type EventData,
} from '@/lib/services/blog-writer';
import type { Event, BlogArticle } from '@/types/database';

export const maxDuration = 300; // 5 minutes max for Pro plan

// Delay between API calls to avoid rate limits (in ms)
const DELAY_BETWEEN_CALLS = 1500;

export async function POST(request: NextRequest) {
  try {
    // Verify secret key for security
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (!secret || secret !== process.env.BLOG_GENERATION_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing secret key' },
        { status: 401 }
      );
    }

    // Check if Anthropic API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Get limit parameter (default 10, max 100)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

    const supabase = getAdminClient();

    // Get IDs of events that have already been blogged
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: bloggedEvents } = await (supabase as any)
      .from('blog_event_tracker')
      .select('event_id') as { data: { event_id: string }[] | null };

    const bloggedEventIds = bloggedEvents?.map((e) => e.event_id) || [];

    // Get today's date in YYYY-MM-DD format for filtering future events
    const today = new Date().toISOString().split('T')[0];

    // Get Platinumlist events with future dates that haven't been blogged yet
    // Only events with affiliate_url (Platinumlist source) and future start_date
    let eventsQuery = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .not('affiliate_url', 'is', null) // Only Platinumlist events (have affiliate URL)
      .gte('start_date', today) // Only future events
      .order('start_date', { ascending: true }) // Prioritize nearest events
      .limit(limit);

    // Exclude already blogged events if any exist
    if (bloggedEventIds.length > 0) {
      eventsQuery = eventsQuery.not('id', 'in', `(${bloggedEventIds.join(',')})`);
    }

    const { data, error: fetchError } = await eventsQuery;
    const unbloggedEvents = data as Event[] | null;

    if (fetchError) {
      console.error('Error fetching events:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch events from database' },
        { status: 500 }
      );
    }

    if (!unbloggedEvents || unbloggedEvents.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new events to blog',
        processed: 0,
        articles: [],
      });
    }

    const results: Array<{
      event_id: string;
      event_title: string;
      article_id: string;
      article_title: string;
      slug: string;
    }> = [];

    const errors: Array<{
      event_id: string;
      event_title: string;
      error: string;
    }> = [];

    for (const event of unbloggedEvents) {
      try {
        // CRITICAL: Combine ALL location sources for accurate extraction
        // Include title, description, venue info, and source URL for maximum coverage
        const allLocationSources = [
          event.title,
          event.venue_name,
          event.venue_address,
          event.description,
          event.source_url,
          event.affiliate_url,
          event.google_maps_link,
        ].filter(Boolean).join(' ');

        // Extract accurate city and country from all available data
        const extractedCity = determineCity(allLocationSources);
        const extractedCountry = determineCountry(allLocationSources);

        // Log for debugging
        console.log(`Event: ${event.title}`);
        console.log(`  Venue: ${event.venue_name || 'N/A'}`);
        console.log(`  Extracted city: ${extractedCity || 'NOT FOUND'}`);
        console.log(`  Extracted country: ${extractedCountry || 'NOT FOUND'}`);

        // Use extracted values, or derive country from city if needed
        let finalCity = extractedCity;
        let finalCountry = extractedCountry;

        // If we have a city but no country, derive country from city
        if (finalCity && !finalCountry) {
          // Dubai, Abu Dhabi, Sharjah, etc. are in UAE
          const uaeCities = ['dubai', 'abu dhabi', 'sharjah', 'ajman', 'ras al khaimah', 'fujairah', 'al ain', 'khorfakkan'];
          const saudiCities = ['riyadh', 'jeddah', 'dammam', 'al khobar', 'mecca', 'medina'];
          const qatarCities = ['doha', 'lusail', 'al wakrah'];
          const bahrainCities = ['manama', 'seef', 'muharraq', 'juffair', 'riffa', 'amwaj'];

          const cityLower = finalCity.toLowerCase();
          if (uaeCities.some(c => cityLower.includes(c))) finalCountry = 'uae';
          else if (saudiCities.some(c => cityLower.includes(c))) finalCountry = 'saudi-arabia';
          else if (qatarCities.some(c => cityLower.includes(c))) finalCountry = 'qatar';
          else if (bahrainCities.some(c => cityLower.includes(c))) finalCountry = 'bahrain';
        }

        // If we still don't have location, check if Platinumlist URL contains country hint
        if (!finalCity && !finalCountry && event.affiliate_url) {
          const urlLower = event.affiliate_url.toLowerCase();
          if (urlLower.includes('/ae/') || urlLower.includes('uae')) {
            finalCountry = 'uae';
          } else if (urlLower.includes('/bh/') || urlLower.includes('bahrain')) {
            finalCountry = 'bahrain';
          } else if (urlLower.includes('/sa/') || urlLower.includes('saudi')) {
            finalCountry = 'saudi-arabia';
          } else if (urlLower.includes('/qa/') || urlLower.includes('qatar')) {
            finalCountry = 'qatar';
          }
        }

        // Provide defaults only if absolutely nothing found
        const cityForBlog = finalCity || 'TBA';
        const countryForBlog = finalCountry || 'TBA';

        console.log(`  Final city: ${cityForBlog}, country: ${countryForBlog}`);

        const eventData: EventData = {
          id: event.id,
          title: event.title,
          description: event.description,
          venue_name: event.venue_name,
          venue_address: event.venue_address,
          location: allLocationSources || 'Location not specified',
          city: cityForBlog,
          country: countryForBlog,
          start_date: event.start_date,
          end_date: event.end_date,
          start_time: event.start_time,
          category: event.category,
          image_url: event.image_url,
          cover_url: event.cover_url,
          price: event.price,
          affiliate_url: event.affiliate_url,
          booking_url: event.booking_url,
        };

        // Generate blog post using AI - this now uses strict factual prompts
        console.log(`Generating blog post for: ${event.title}`);
        const article = await generateEventBlogPost(eventData);

        // Get featured image
        const featuredImage = event.cover_url || event.image_url || event.featured_image;

        // Save to database with accurate location data (using already-validated finalCity/finalCountry)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: savedArticle, error: saveError } = await (supabase as any)
          .from('blog_articles')
          .insert({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.content,
            meta_title: article.meta_title,
            meta_description: article.meta_description,
            keywords: article.keywords,
            tags: article.tags,
            read_time_minutes: article.read_time_minutes,
            country: countryForBlog,
            city: cityForBlog,
            category: event.category,
            event_id: event.id,
            featured_image: featuredImage,
            article_type: 'event',
            status: 'published',
            published_at: new Date().toISOString(),
          })
          .select()
          .single() as { data: BlogArticle | null; error: Error | null };

        if (saveError || !savedArticle) {
          console.error(`Error saving article for event ${event.id}:`, saveError);
          errors.push({
            event_id: event.id,
            event_title: event.title,
            error: saveError?.message || 'Failed to save article',
          });
          continue;
        }

        // Track that this event has been blogged
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: trackError } = await (supabase as any)
          .from('blog_event_tracker')
          .insert({
            event_id: event.id,
            article_id: savedArticle.id,
          });

        if (trackError) {
          console.error(`Error tracking blogged event ${event.id}:`, trackError);
          // Don't fail the whole operation for tracking errors
        }

        results.push({
          event_id: event.id,
          event_title: event.title,
          article_id: savedArticle.id,
          article_title: article.title,
          slug: article.slug,
        });

        console.log(`Successfully created blog post: ${article.title}`);

        // Delay between API calls to avoid rate limits
        if (unbloggedEvents.indexOf(event) < unbloggedEvents.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_CALLS));
        }
      } catch (err) {
        console.error(`Error processing event ${event.id}:`, err);
        errors.push({
          event_id: event.id,
          event_title: event.title,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    // Revalidate blog pages to show new articles immediately
    if (results.length > 0) {
      revalidatePath('/blog');
      revalidatePath('/blog/places-to-go/bahrain');
      revalidatePath('/blog/places-to-go/saudi-arabia');
      revalidatePath('/blog/places-to-go/uae');
      revalidatePath('/blog/places-to-go/qatar');
      revalidatePath('/blog/places-to-go/uk');
    }

    // Count remaining unblogged events
    const { count: totalRemaining } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .not('affiliate_url', 'is', null)
      .gte('start_date', today)
      .not('id', 'in', `(${[...bloggedEventIds, ...results.map(r => r.event_id)].join(',')})`);

    return NextResponse.json({
      success: true,
      message: `Generated ${results.length} blog posts`,
      processed: results.length,
      failed: errors.length,
      remaining: totalRemaining || 0,
      articles: results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (!secret || secret !== process.env.BLOG_GENERATION_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const supabase = getAdminClient();

  // Get today's date for filtering
  const today = new Date().toISOString().split('T')[0];

  // Get counts - use type assertions for new blog tables
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: totalArticles } = await (supabase as any)
    .from('blog_articles')
    .select('*', { count: 'exact', head: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: bloggedEvents } = await (supabase as any)
    .from('blog_event_tracker')
    .select('*', { count: 'exact', head: true });

  // Count only Platinumlist events with future dates
  const { count: eligibleEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .not('affiliate_url', 'is', null)
    .gte('start_date', today);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recentArticles } = await (supabase as any)
    .from('blog_articles')
    .select('title, slug, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  return NextResponse.json({
    status: 'ok',
    stats: {
      total_articles: totalArticles || 0,
      blogged_events: bloggedEvents || 0,
      eligible_events: eligibleEvents || 0,
      remaining_events: (eligibleEvents || 0) - (bloggedEvents || 0),
    },
    recent_articles: recentArticles || [],
    api_configured: !!process.env.ANTHROPIC_API_KEY,
  });
}
