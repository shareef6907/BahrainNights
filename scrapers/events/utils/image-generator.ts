/**
 * AI Image Generator for Events
 * Uses Replicate's Flux model to generate event cover images
 * when no source image is available or the source is a logo/placeholder
 */

import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Generate an event cover image using AI
 * @param eventTitle - The title of the event
 * @param category - The event category (Music & Concerts, Dining, etc.)
 * @param venueName - Optional venue name for context
 * @returns URL of the generated image, or null if generation fails
 */
export async function generateEventImage(
  eventTitle: string,
  category: string,
  venueName?: string
): Promise<string | null> {
  // Skip if no API token configured
  if (!process.env.REPLICATE_API_TOKEN) {
    console.log('[ImageGen] No REPLICATE_API_TOKEN configured, skipping AI generation');
    return null;
  }

  try {
    // Create a prompt based on event details
    const prompt = createImagePrompt(eventTitle, category, venueName);

    console.log(`[ImageGen] Generating image for: ${eventTitle}`);
    console.log(`[ImageGen] Prompt: ${prompt.substring(0, 100)}...`);

    const output = await replicate.run(
      'black-forest-labs/flux-schnell',
      {
        input: {
          prompt: prompt,
          num_outputs: 1,
          aspect_ratio: '16:9',
          output_format: 'webp',
          output_quality: 80,
        },
      }
    );

    // Output is an array of URLs or ReadableStream objects
    let imageUrl: string | null = null;

    if (Array.isArray(output) && output.length > 0) {
      const firstOutput = output[0];
      if (typeof firstOutput === 'string') {
        imageUrl = firstOutput;
      } else if (firstOutput && typeof firstOutput === 'object' && 'url' in firstOutput) {
        imageUrl = (firstOutput as { url: string }).url;
      }
    } else if (typeof output === 'string') {
      imageUrl = output;
    }

    if (imageUrl) {
      console.log(`[ImageGen] Generated image successfully`);
      return imageUrl;
    }

    console.warn('[ImageGen] No image URL in response');
    return null;
  } catch (error) {
    console.error(`[ImageGen] Error generating image:`, error);
    return null;
  }
}

/**
 * Create a descriptive prompt for the AI image generator
 */
function createImagePrompt(title: string, category: string, venue?: string): string {
  // Base style for all images - professional event photography
  const style = 'professional event promotional photo, vibrant colors, high quality, modern, cinematic lighting, no text, no logos, no watermarks';

  // Category-specific prompts
  const categoryPrompts: Record<string, string> = {
    music: `live concert stage with dramatic purple and blue lighting, crowd silhouettes in foreground, ${style}`,
    'music & concerts': `live concert stage with dramatic purple and blue lighting, crowd silhouettes in foreground, ${style}`,
    dining: `elegant fine dining restaurant interior with warm ambient lighting, beautiful table setting, ${style}`,
    'dining & food': `elegant fine dining restaurant interior with warm ambient lighting, beautiful table setting, ${style}`,
    family: `colorful family entertainment venue, fun atmosphere, bright lighting, ${style}`,
    'family & kids': `colorful family entertainment venue, fun atmosphere, bright lighting, ${style}`,
    arts: `sophisticated art gallery with elegant lighting, modern exhibition space, ${style}`,
    'arts & culture': `sophisticated art gallery with elegant lighting, modern exhibition space, ${style}`,
    cultural: `cultural festival scene with traditional decorations and warm lighting, ${style}`,
    sports: `dynamic sports arena with dramatic lighting, athletic energy, ${style}`,
    'sports & fitness': `dynamic sports arena with dramatic lighting, athletic energy, ${style}`,
    nightlife: `upscale nightclub interior with neon lights and sophisticated modern design, ${style}`,
    business: `professional modern conference room with sleek design and natural lighting, ${style}`,
    'business & networking': `professional modern conference room with sleek design and natural lighting, ${style}`,
    wellness: `serene spa environment with soft lighting, calm zen atmosphere, ${style}`,
    'wellness & spa': `serene spa environment with soft lighting, calm zen atmosphere, ${style}`,
    shopping: `luxury shopping mall atrium with modern architecture and elegant lighting, ${style}`,
    'shopping & markets': `vibrant market scene with colorful stalls and warm lighting, ${style}`,
    tours: `beautiful Bahrain cityscape at golden hour, modern architecture, ${style}`,
    'tours & adventures': `scenic desert landscape at sunset with dramatic sky, ${style}`,
    comedy: `comedy club stage with single spotlight on microphone stand, intimate venue, ${style}`,
    theatre: `elegant theatre stage with red velvet curtains and dramatic spotlight, ${style}`,
    cinema: `modern cinema interior with comfortable seats and ambient lighting, ${style}`,
    other: `elegant event venue in Bahrain with modern design and ambient lighting, ${style}`,
  };

  // Get base prompt from category (case insensitive)
  const categoryLower = category.toLowerCase();
  let basePrompt = categoryPrompts[categoryLower] || categoryPrompts.other;

  // Add venue-specific context if available
  if (venue) {
    const venueLower = venue.toLowerCase();

    if (venueLower.includes('beach')) {
      basePrompt = `beautiful beach event venue at golden hour sunset, ocean view, ${style}`;
    } else if (venueLower.includes('amphitheatre') || venueLower.includes('amphitheater')) {
      basePrompt = `outdoor amphitheatre concert venue at night with dramatic stage lighting and starry sky, ${style}`;
    } else if (venueLower.includes('hotel')) {
      basePrompt = `luxury hotel ballroom with crystal chandeliers and elegant decor, ${style}`;
    } else if (venueLower.includes('garden') || venueLower.includes('park')) {
      basePrompt = `beautiful outdoor garden venue with string lights and evening atmosphere, ${style}`;
    } else if (venueLower.includes('pool')) {
      basePrompt = `poolside event venue at sunset with lounge atmosphere, ${style}`;
    } else if (venueLower.includes('rooftop')) {
      basePrompt = `stunning rooftop venue with city skyline view at twilight, ${style}`;
    }
  }

  // Add title context for specific event types
  const titleLower = title.toLowerCase();
  if (titleLower.includes('brunch')) {
    basePrompt = `elegant brunch setting with natural sunlight and beautiful food spread, ${style}`;
  } else if (titleLower.includes('ladies night')) {
    basePrompt = `sophisticated ladies night venue with pink and purple lighting, glamorous atmosphere, ${style}`;
  } else if (titleLower.includes('happy hour')) {
    basePrompt = `trendy bar during happy hour with warm sunset light through windows, ${style}`;
  } else if (titleLower.includes('festival')) {
    basePrompt = `vibrant outdoor festival scene with colorful lights and festive atmosphere, ${style}`;
  } else if (titleLower.includes('wedding') || titleLower.includes('bridal')) {
    basePrompt = `elegant wedding venue with romantic lighting and floral decorations, ${style}`;
  } else if (titleLower.includes('kids') || titleLower.includes('children')) {
    basePrompt = `fun colorful children's entertainment area with bright decorations, ${style}`;
  }

  return basePrompt;
}

export default generateEventImage;
