import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  generateBlogPost,
  generateFeedPost,
  generateStory,
  generateReelBrief,
  checkCompliance,
  type EventData,
  type ContentSettings,
} from '@/lib/studio/ai-generator';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Fetch settings from database
async function getSettings(): Promise<ContentSettings> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('content_settings')
    .select('*')
    .limit(1)
    .single();

  return data || {
    default_tone: 'friendly',
    default_language: 'en',
    include_emojis: true,
    hashtag_count: 12,
    caption_length: 'medium',
    block_political: true,
    block_religious: true,
    block_inappropriate: true,
    block_alcohol: true,
  };
}

// Fetch upcoming events for content generation
async function getUpcomingEvents(limit = 5): Promise<EventData[]> {
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().split('T')[0];

  const { data } = await supabase
    .from('events')
    .select('id, title, description, start_date, end_date, start_time, category, price_range, booking_url, featured_image, venues(name)')
    .gte('start_date', today)
    .eq('status', 'published')
    .order('start_date', { ascending: true })
    .limit(limit);

  return (data || []).map((event: Record<string, unknown>) => ({
    id: event.id as string,
    title: event.title as string,
    description: event.description as string | undefined,
    venue_name: (event.venues as { name: string } | null)?.name,
    start_date: event.start_date as string,
    end_date: event.end_date as string | undefined,
    start_time: event.start_time as string | undefined,
    category: event.category as string | undefined,
    price_range: event.price_range as string | undefined,
    booking_url: event.booking_url as string | undefined,
    featured_image: event.featured_image as string | undefined,
  }));
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { type, count = 1, eventId, storyType, reelStyle } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Content type is required' },
        { status: 400 }
      );
    }

    const validTypes = ['blog', 'feed', 'story', 'reel'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid content type. Must be: blog, feed, story, or reel' },
        { status: 400 }
      );
    }

    // Get settings and events
    const [settings, events] = await Promise.all([
      getSettings(),
      getUpcomingEvents(type === 'blog' ? 10 : 5),
    ]);

    // Get specific event if eventId provided
    let specificEvent: EventData | null = null;
    if (eventId) {
      specificEvent = events.find(e => e.id === eventId) || null;
    }

    const generatedContent = [];

    for (let i = 0; i < count; i++) {
      let content: Record<string, unknown> = {};
      let contentData: Record<string, unknown> = {};

      try {
        switch (type) {
          case 'blog': {
            const blogPost = await generateBlogPost(events, settings);

            // Check compliance
            const compliance = checkCompliance(blogPost.body, settings);
            if (!compliance.passed) {
              console.warn('Blog post failed compliance:', compliance.issues);
            }

            contentData = {
              content_type: 'blog',
              title: blogPost.title,
              body: blogPost.body,
              slug: blogPost.slug,
              seo_title: blogPost.seo_title,
              seo_description: blogPost.seo_description,
              seo_keywords: blogPost.seo_keywords,
              hashtags: blogPost.seo_keywords,
              source_type: 'ai',
              status: 'pending_review',
            };
            break;
          }

          case 'feed': {
            const event = specificEvent || events[i % events.length] || null;
            const feedPost = await generateFeedPost(event, settings);

            contentData = {
              content_type: 'feed',
              title: feedPost.title,
              caption: feedPost.caption,
              hashtags: feedPost.hashtags,
              source_type: event ? 'event' : 'ai',
              source_id: event?.id || null,
              status: 'pending_review',
            };
            break;
          }

          case 'story': {
            const event = specificEvent || events[i % events.length] || null;
            const story = await generateStory(
              event,
              storyType || 'promo',
              settings
            );

            contentData = {
              content_type: 'story',
              title: story.title,
              caption: story.caption,
              story_type: story.story_type,
              story_sticker_data: story.sticker_data || null,
              source_type: event ? 'event' : 'ai',
              source_id: event?.id || null,
              status: 'pending_review',
            };
            break;
          }

          case 'reel': {
            const reelBrief = await generateReelBrief(
              events.slice(0, 5),
              reelStyle || 'trendy',
              settings
            );

            contentData = {
              content_type: 'reel_brief',
              title: reelBrief.title,
              caption: reelBrief.caption,
              hashtags: reelBrief.hashtags,
              reel_concept: reelBrief.concept,
              reel_hook: reelBrief.hook,
              reel_text_overlays: reelBrief.text_overlays,
              reel_music_suggestions: reelBrief.music_suggestions,
              reel_duration: reelBrief.duration,
              reel_style: reelBrief.style,
              source_type: 'ai',
              status: 'pending_review',
            };
            break;
          }
        }

        // Save to database
        const { data, error } = await supabase
          .from('content_posts')
          .insert(contentData)
          .select()
          .single();

        if (error) {
          console.error('Error saving generated content:', error);
          continue;
        }

        content = data;
        generatedContent.push(content);
      } catch (genError) {
        console.error(`Error generating ${type} content:`, genError);
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      generated: generatedContent.length,
      content: generatedContent,
      message: `Generated ${generatedContent.length} ${type} content${generatedContent.length > 1 ? 's' : ''}`,
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: String(error) },
      { status: 500 }
    );
  }
}
