/**
 * Blog Generation API Route
 * Generates SEO-optimized blog posts for events and venues
 * Called by GitHub Actions or manually via secret key
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import {
  generateEventBlogPost,
  determineCountry,
  determineCity,
  type EventData,
} from '@/lib/services/blog-writer';
import type { Event, BlogArticle } from '@/types/database';

// Maximum events to process per request to avoid timeouts
const MAX_EVENTS_PER_RUN = 10;

// Delay between API calls to avoid rate limits (in ms)
const DELAY_BETWEEN_CALLS = 3000;

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

    const supabase = getAdminClient();

    // Get IDs of events that have already been blogged
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: bloggedEvents } = await (supabase as any)
      .from('blog_event_tracker')
      .select('event_id') as { data: { event_id: string }[] | null };

    const bloggedEventIds = bloggedEvents?.map((e) => e.event_id) || [];

    // Get events that haven't been blogged yet
    let eventsQuery = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(MAX_EVENTS_PER_RUN);

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
        // Determine location info
        const location = event.venue_address || event.venue_name || 'Bahrain';
        const country = determineCountry(location);
        const city = determineCity(location);

        const eventData: EventData = {
          id: event.id,
          title: event.title,
          description: event.description,
          venue_name: event.venue_name,
          venue_address: event.venue_address,
          location,
          city: city || 'Manama',
          country,
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

        // Generate blog post using AI
        console.log(`Generating blog post for: ${event.title}`);
        const article = await generateEventBlogPost(eventData);

        // Get featured image
        const featuredImage = event.cover_url || event.image_url || event.featured_image;

        // Save to database
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
            country,
            city: city || null,
            category: event.category,
            event_id: event.id,
            featured_image: featuredImage,
            article_type: 'event',
            status: 'published',
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

    return NextResponse.json({
      success: true,
      message: `Generated ${results.length} blog posts`,
      processed: results.length,
      failed: errors.length,
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

  // Get counts - use type assertions for new blog tables
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: totalArticles } = await (supabase as any)
    .from('blog_articles')
    .select('*', { count: 'exact', head: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: bloggedEvents } = await (supabase as any)
    .from('blog_event_tracker')
    .select('*', { count: 'exact', head: true });

  const { count: totalEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

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
      total_active_events: totalEvents || 0,
      remaining_events: (totalEvents || 0) - (bloggedEvents || 0),
    },
    recent_articles: recentArticles || [],
    api_configured: !!process.env.ANTHROPIC_API_KEY,
  });
}
