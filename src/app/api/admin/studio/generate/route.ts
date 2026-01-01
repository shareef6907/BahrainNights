import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  generateBlogPosts,
  generateFeedPosts,
  generateStories,
  generateReelBriefs,
  checkCompliance,
  type EventData,
  type ContentSettings,
} from '@/lib/studio/ai-generator';
import {
  generateImage,
  generateReelImages,
  buildBlogImagePrompt,
  buildInstagramImagePrompt,
  buildStoryImagePrompt,
  buildReelSlideImagePrompt,
} from '@/lib/studio/image-generator';

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
    const {
      type,
      count = 1,
      eventId,
      storyType,
      reelStyle,
      userInput,
      contentSource = 'custom',
      contentStyle = 'listicle',
      generateImages = true,
    } = body;

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

    // CRITICAL: User input is REQUIRED for all content types
    if (!userInput || userInput.trim().length < 3) {
      return NextResponse.json(
        { error: 'User input is required. Please specify what topic you want to create content about (minimum 3 characters).' },
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

    console.log(`[Generate] Starting ${type} generation: count=${count}, generateImages=${generateImages}`);

    try {
      switch (type) {
        case 'blog': {
          // Generate all blog posts at once using params object
          const blogPosts = await generateBlogPosts({
            userInput,
            contentSource,
            contentStyle,
            count,
            settings,
          });

          for (const blogPost of blogPosts) {
            // Check compliance
            const compliance = checkCompliance(blogPost.body, settings);
            if (!compliance.passed) {
              console.warn('Blog post failed compliance:', compliance.issues);
            }

            // Generate image if enabled
            let mediaUrls: string[] = [];
            if (generateImages) {
              console.log(`[Generate] Creating blog image for: ${blogPost.title}`);
              const imagePrompt = buildBlogImagePrompt(blogPost.title, userInput);
              const imageUrl = await generateImage(imagePrompt, 'blog');
              if (imageUrl) {
                mediaUrls = [imageUrl];
                console.log(`[Generate] Blog image created: ${imageUrl}`);
              }
            }

            const contentData = {
              content_type: 'blog',
              title: blogPost.title,
              body: blogPost.body,
              slug: blogPost.slug,
              seo_title: blogPost.seo_title,
              seo_description: blogPost.seo_description,
              seo_keywords: blogPost.seo_keywords,
              hashtags: blogPost.seo_keywords,
              media_urls: mediaUrls.length > 0 ? mediaUrls : null,
              source_type: contentSource === 'custom' ? 'ai' : contentSource,
              status: 'pending_review',
            };

            // Save to database
            const { data, error } = await supabase
              .from('content_posts')
              .insert(contentData)
              .select()
              .single();

            if (error) {
              console.error('Error saving blog post:', error);
              continue;
            }

            generatedContent.push(data);
          }
          break;
        }

        case 'feed': {
          // Generate all feed posts at once using params object
          const feedPosts = await generateFeedPosts({
            userInput,
            contentSource,
            count,
            settings,
          });

          for (const feedPost of feedPosts) {
            // Generate image if enabled
            let mediaUrls: string[] = [];
            if (generateImages) {
              console.log(`[Generate] Creating feed image for: ${feedPost.title}`);
              const imagePrompt = buildInstagramImagePrompt(feedPost.caption, userInput);
              const imageUrl = await generateImage(imagePrompt, 'instagram');
              if (imageUrl) {
                mediaUrls = [imageUrl];
                console.log(`[Generate] Feed image created: ${imageUrl}`);
              }
            }

            const contentData = {
              content_type: 'feed',
              title: feedPost.title,
              caption: feedPost.caption,
              hashtags: feedPost.hashtags,
              media_urls: mediaUrls.length > 0 ? mediaUrls : null,
              source_type: contentSource === 'custom' ? 'ai' : contentSource,
              status: 'pending_review',
            };

            // Save to database
            const { data, error } = await supabase
              .from('content_posts')
              .insert(contentData)
              .select()
              .single();

            if (error) {
              console.error('Error saving feed post:', error);
              continue;
            }

            generatedContent.push(data);
          }
          break;
        }

        case 'story': {
          // Generate all stories at once using params object
          const stories = await generateStories({
            userInput,
            storyTypes: storyType ? [storyType] : undefined,
            count,
            settings,
          });

          for (const story of stories) {
            // Generate image if enabled
            let mediaUrls: string[] = [];
            if (generateImages) {
              console.log(`[Generate] Creating story background for: ${story.title}`);
              const imagePrompt = buildStoryImagePrompt(story.title, story.story_type, userInput);
              const imageUrl = await generateImage(imagePrompt, 'story');
              if (imageUrl) {
                mediaUrls = [imageUrl];
                console.log(`[Generate] Story background created: ${imageUrl}`);
              }
            }

            // Story has headline, subtext, and full caption
            // Use the full caption if available, otherwise combine headline + subtext
            const fullCaption = story.caption || `${story.headline}\n\n${story.subtext || ''}`.trim();

            const contentData = {
              content_type: 'story',
              title: story.title,
              caption: fullCaption,
              story_type: story.story_type,
              story_sticker_data: story.sticker_data || null,
              media_urls: mediaUrls.length > 0 ? mediaUrls : null,
              source_type: 'ai',
              status: 'pending_review',
            };

            // Save to database
            const { data, error } = await supabase
              .from('content_posts')
              .insert(contentData)
              .select()
              .single();

            if (error) {
              console.error('Error saving story:', error);
              continue;
            }

            generatedContent.push(data);
          }
          break;
        }

        case 'reel': {
          // Generate all reel briefs at once using params object
          const reelBriefs = await generateReelBriefs({
            userInput,
            reelStyle: reelStyle || 'trendy',
            count,
            settings,
          });

          for (const reelBrief of reelBriefs) {
            // Transform slides to text_overlays for database storage
            const textOverlays = reelBrief.slides?.map(s => ({
              slide: s.order,
              text: s.text,
              visual_note: s.visualNote,
            })) || [];

            // Generate images for each slide if enabled (10-15 images for reels)
            let mediaUrls: string[] = [];
            if (generateImages && reelBrief.slides && reelBrief.slides.length > 0) {
              console.log(`[Generate] Creating ${reelBrief.slides.length} reel slide images for: ${reelBrief.title}`);

              // Generate images for ALL slides (10-15 images for proper reel content)
              // No limit - generate images for every slide
              for (const slide of reelBrief.slides) {
                try {
                  const imagePrompt = buildReelSlideImagePrompt(slide.text, slide.visualNote, userInput);
                  const imageUrl = await generateImage(imagePrompt, 'instagram');
                  if (imageUrl) {
                    mediaUrls.push(imageUrl);
                    console.log(`[Generate] Reel slide image ${slide.order} created`);
                  }
                } catch (imgError) {
                  console.error(`[Generate] Failed to create slide ${slide.order} image:`, imgError);
                }
              }
              console.log(`[Generate] Created ${mediaUrls.length} reel images`);
            }

            // NOTE: Music suggestions are NOT saved - user will add music manually
            const contentData = {
              content_type: 'reel_brief',
              title: reelBrief.title,
              caption: reelBrief.caption,
              hashtags: reelBrief.hashtags,
              reel_concept: reelBrief.concept,
              reel_hook: reelBrief.hook,
              reel_text_overlays: textOverlays,
              // reel_music_suggestions: NOT INCLUDED - user adds music manually
              reel_duration: reelBrief.duration,
              reel_style: reelBrief.style,
              reel_editing_style: reelBrief.editing_style || null,
              reel_higgsfield_prompt: reelBrief.higgsfield_prompt || null,
              media_urls: mediaUrls.length > 0 ? mediaUrls : null,
              source_type: 'ai',
              status: 'pending_review',
            };

            // Save to database
            const { data, error } = await supabase
              .from('content_posts')
              .insert(contentData)
              .select()
              .single();

            if (error) {
              console.error('Error saving reel brief:', error);
              continue;
            }

            generatedContent.push(data);
          }
          break;
        }
      }
    } catch (genError) {
      console.error(`Error generating ${type} content:`, genError);
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
