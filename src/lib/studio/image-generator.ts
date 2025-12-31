// Image Generator Library
// Supports: Replicate (FLUX), OpenAI DALL-E, Leonardo.ai, Unsplash fallback

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const S3_BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';

export type ImageStyle = 'instagram' | 'blog' | 'story';

interface ImageDimensions {
  width: number;
  height: number;
}

const DIMENSIONS: Record<ImageStyle, ImageDimensions> = {
  instagram: { width: 1080, height: 1080 },  // Square for feed
  blog: { width: 1200, height: 630 },        // OG image size
  story: { width: 1080, height: 1920 },      // 9:16 for stories
};

/**
 * Main function to generate an image
 * Tries providers in order: Replicate (FLUX) → DALL-E → Leonardo → Unsplash
 */
export async function generateImage(
  prompt: string,
  style: ImageStyle = 'instagram'
): Promise<string | null> {
  const { width, height } = DIMENSIONS[style];

  console.log(`[ImageGen] Generating ${style} image (${width}x${height})`);
  console.log(`[ImageGen] Prompt: ${prompt.substring(0, 100)}...`);

  // Try Replicate FLUX first (best quality/cost ratio)
  if (REPLICATE_API_TOKEN) {
    try {
      console.log('[ImageGen] Using Replicate FLUX');
      return await generateWithReplicate(prompt, width, height);
    } catch (error) {
      console.error('[ImageGen] Replicate failed:', error);
    }
  }

  // Try OpenAI DALL-E (premium quality)
  if (OPENAI_API_KEY) {
    try {
      console.log('[ImageGen] Using DALL-E 3');
      return await generateWithDALLE(prompt, width, height);
    } catch (error) {
      console.error('[ImageGen] DALL-E failed:', error);
    }
  }

  // Try Leonardo.ai (free tier)
  if (LEONARDO_API_KEY) {
    try {
      console.log('[ImageGen] Using Leonardo.ai');
      return await generateWithLeonardo(prompt, width, height);
    } catch (error) {
      console.error('[ImageGen] Leonardo failed:', error);
    }
  }

  // Fallback: Unsplash (always free)
  try {
    console.log('[ImageGen] Using Unsplash/Picsum fallback');
    return await getUnsplashImage(prompt, width, height);
  } catch (error) {
    console.error('[ImageGen] Unsplash failed:', error);
  }

  return null;
}

/**
 * Generate image using Replicate FLUX model
 */
async function generateWithReplicate(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  // Determine aspect ratio for FLUX
  let aspectRatio = '1:1';
  if (width > height) {
    aspectRatio = '16:9';
  } else if (height > width) {
    aspectRatio = '9:16';
  }

  // Start prediction
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // FLUX Schnell model (fast, good quality)
      version: 'black-forest-labs/flux-schnell',
      input: {
        prompt: sanitizePromptForImage(prompt),
        aspect_ratio: aspectRatio,
        output_format: 'webp',
        output_quality: 90,
        num_outputs: 1,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Replicate API error: ${error.detail || JSON.stringify(error)}`);
  }

  const prediction = await response.json();

  // Poll for completion (max 60 seconds)
  let imageUrl: string | null = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds

    const statusResponse = await fetch(prediction.urls.get, {
      headers: { 'Authorization': `Bearer ${REPLICATE_API_TOKEN}` },
    });

    if (!statusResponse.ok) continue;

    const statusData = await statusResponse.json();

    if (statusData.status === 'succeeded' && statusData.output) {
      imageUrl = Array.isArray(statusData.output) ? statusData.output[0] : statusData.output;
      break;
    }

    if (statusData.status === 'failed') {
      throw new Error(`Replicate generation failed: ${statusData.error}`);
    }
  }

  if (!imageUrl) {
    throw new Error('Replicate generation timed out');
  }

  // Upload to S3 for permanent storage
  const s3Url = await uploadToS3(imageUrl, `studio/generated/${Date.now()}-flux.webp`);
  return s3Url;
}

/**
 * Generate multiple images for a reel (one per slide)
 */
export async function generateReelImages(
  slides: { text: string; visualNote: string }[],
  userInput?: string
): Promise<string[]> {
  const imageUrls: string[] = [];

  for (const slide of slides) {
    const prompt = buildReelSlideImagePrompt(slide.text, slide.visualNote, userInput);
    const imageUrl = await generateImage(prompt, 'instagram');
    if (imageUrl) {
      imageUrls.push(imageUrl);
    }
  }

  return imageUrls;
}

/**
 * Generate image using OpenAI DALL-E 3
 */
async function generateWithDALLE(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  // DALL-E 3 supported sizes
  let size: '1024x1024' | '1792x1024' | '1024x1792' = '1024x1024';

  if (width > height) {
    size = '1792x1024'; // Landscape
  } else if (height > width) {
    size = '1024x1792'; // Portrait (stories)
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: sanitizePromptForImage(prompt),
      n: 1,
      size,
      quality: 'standard',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`DALL-E API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();

  if (data.data?.[0]?.url) {
    // Download and upload to S3 for permanent storage
    const s3Url = await uploadToS3(data.data[0].url, `studio/generated/${Date.now()}-dalle.png`);
    return s3Url;
  }

  throw new Error('No image URL in DALL-E response');
}

/**
 * Generate image using Leonardo.ai
 */
async function generateWithLeonardo(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  // Step 1: Create generation
  const createResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LEONARDO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: sanitizePromptForImage(prompt),
      modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3', // Leonardo Creative
      width: Math.min(width, 1024),
      height: Math.min(height, 1024),
      num_images: 1,
    }),
  });

  if (!createResponse.ok) {
    const error = await createResponse.json();
    throw new Error(`Leonardo API error: ${JSON.stringify(error)}`);
  }

  const createData = await createResponse.json();
  const generationId = createData.sdGenerationJob?.generationId;

  if (!generationId) {
    throw new Error('Failed to start Leonardo generation');
  }

  // Step 2: Poll for completion (max 60 seconds)
  let imageUrl: string | null = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds

    const statusResponse = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      {
        headers: { 'Authorization': `Bearer ${LEONARDO_API_KEY}` },
      }
    );

    if (!statusResponse.ok) continue;

    const statusData = await statusResponse.json();

    if (statusData.generations_by_pk?.generated_images?.[0]?.url) {
      imageUrl = statusData.generations_by_pk.generated_images[0].url;
      break;
    }

    if (statusData.generations_by_pk?.status === 'FAILED') {
      throw new Error('Leonardo generation failed');
    }
  }

  if (!imageUrl) {
    throw new Error('Leonardo generation timed out');
  }

  // Upload to S3
  const s3Url = await uploadToS3(imageUrl, `studio/generated/${Date.now()}-leonardo.png`);
  return s3Url;
}

/**
 * Get image from Unsplash or reliable placeholder (free fallback)
 */
async function getUnsplashImage(
  query: string,
  width: number,
  height: number
): Promise<string> {
  const searchTerms = extractKeywords(query);

  // If we have an API key, use the search API
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerms)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1&orientation=${width === height ? 'squarish' : height > width ? 'portrait' : 'landscape'}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.results?.[0]?.urls?.regular) {
          // Add size parameters
          const url = data.results[0].urls.regular;
          return `${url}&w=${width}&h=${height}&fit=crop`;
        }
      }
    } catch (error) {
      console.error('[ImageGen] Unsplash API error:', error);
    }
  }

  // Use Pexels-style curated images based on category
  const categoryImages = getCategoryPlaceholderImage(searchTerms, width, height);
  if (categoryImages) {
    return categoryImages;
  }

  // Ultimate fallback - use Lorem Picsum (reliable placeholder service)
  // Add random seed based on search terms for variety
  const seed = searchTerms.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Get curated placeholder images by category
 */
function getCategoryPlaceholderImage(searchTerms: string, width: number, height: number): string | null {
  const terms = searchTerms.toLowerCase();

  // Map search terms to reliable stock photo URLs (using Lorem Picsum with category seeds)
  const categorySeeds: Record<string, number[]> = {
    food: [292, 312, 376, 429, 488],
    restaurant: [292, 312, 429, 490, 674],
    dining: [292, 312, 376, 429, 488],
    brunch: [292, 312, 376, 429, 488],
    family: [447, 823, 1027, 1043, 1045],
    kids: [447, 823, 1027, 1043, 1045],
    spa: [183, 395, 576, 696, 737],
    wellness: [183, 395, 576, 696, 737],
    yoga: [183, 395, 576, 696, 737],
    fitness: [416, 685, 766, 879, 967],
    gym: [416, 685, 766, 879, 967],
    sports: [416, 685, 766, 879, 967],
    beach: [247, 349, 426, 473, 610],
    tour: [247, 349, 426, 473, 610],
    adventure: [247, 349, 426, 473, 610],
    art: [339, 379, 453, 514, 622],
    museum: [339, 379, 453, 514, 622],
    culture: [339, 379, 453, 514, 622],
    music: [145, 193, 325, 453, 514],
    concert: [145, 193, 325, 453, 514],
    party: [145, 193, 325, 453, 514],
    nightlife: [145, 193, 325, 453, 514],
    shopping: [335, 336, 403, 428, 534],
    market: [335, 336, 403, 428, 534],
    cinema: [274, 336, 453, 514, 622],
    movie: [274, 336, 453, 514, 622],
    business: [180, 366, 380, 507, 534],
    networking: [180, 366, 380, 507, 534],
    luxury: [164, 250, 338, 416, 564],
    bahrain: [164, 250, 338, 416, 564],
  };

  // Find matching category
  for (const [category, seeds] of Object.entries(categorySeeds)) {
    if (terms.includes(category)) {
      const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
      return `https://picsum.photos/id/${randomSeed}/${width}/${height}`;
    }
  }

  return null;
}

/**
 * Sanitize and enhance prompt for image generation
 */
function sanitizePromptForImage(prompt: string): string {
  // Remove any potentially problematic content
  let sanitized = prompt
    .replace(/\b(nude|naked|explicit|nsfw|violence|gore|blood)\b/gi, '')
    .replace(/\b(political|politician|election|vote)\b/gi, '')
    .replace(/\b(religious|religion|mosque|church|temple)\b/gi, '')
    .trim();

  // Add Bahrain/Middle East aesthetic and quality instructions
  return `Professional photography style, vibrant colors, modern aesthetic, Middle East luxury vibe, high quality, 8k resolution: ${sanitized}. IMPORTANT: No text, no words, no letters, no watermarks in the image.`;
}

/**
 * Extract main keywords for Unsplash search
 */
function extractKeywords(text: string): string {
  // Common words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need',
    'this', 'that', 'these', 'those', 'i', 'you', 'we', 'they', 'he', 'she',
    'it', 'who', 'what', 'where', 'when', 'why', 'how', 'create', 'image',
    'generate', 'show', 'display', 'make', 'background', 'style'
  ]);

  const keywords = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))
    .slice(0, 5)
    .join(' ');

  return keywords || 'bahrain luxury lifestyle';
}

/**
 * Upload an image from URL to S3
 */
async function uploadToS3(imageUrl: string, key: string): Promise<string> {
  try {
    // Download image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    // Determine content type
    const contentType = response.headers.get('content-type') || 'image/png';

    // Upload to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: contentType,
      CacheControl: 'max-age=31536000', // Cache for 1 year
    }));

    const region = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';
    return `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('[ImageGen] S3 upload failed:', error);
    // Return original URL if S3 upload fails
    return imageUrl;
  }
}

/**
 * Build image prompt for blog featured images
 */
export function buildBlogImagePrompt(title: string, userInput?: string): string {
  return `
    Create a stunning blog featured image for an article titled "${title}".
    ${userInput ? `Context: ${userInput}` : ''}
    Style: Modern, professional, vibrant colors, Bahrain/Middle East luxury aesthetic.
    The image should be eye-catching and work well as a social media preview.
    Cinematic lighting, high-end magazine quality.
  `.trim();
}

/**
 * Build image prompt for Instagram feed posts
 */
export function buildInstagramImagePrompt(caption: string, userInput?: string): string {
  // Extract the main topic from caption
  const topic = caption.split('\n')[0].replace(/[^\w\s]/g, '').trim();

  return `
    Create a stunning Instagram post image for: "${topic}".
    ${userInput ? `Additional context: ${userInput}` : ''}
    Style: Instagram-worthy, vibrant, modern, eye-catching.
    Bahrain/Gulf luxury lifestyle aesthetic.
    Perfect for social media engagement.
    Square format (1:1 ratio).
    Lifestyle photography feel.
  `.trim();
}

/**
 * Build image prompt for Instagram stories
 */
export function buildStoryImagePrompt(
  headline: string,
  storyType: string,
  userInput?: string
): string {
  const styleByType: Record<string, string> = {
    promo: 'exciting, energetic, party vibes, neon colors, nightlife',
    countdown: 'anticipation, dramatic, spotlight effect, event atmosphere',
    poll: 'fun, engaging, split design friendly, playful',
    question: 'curious, inviting, warm colors, friendly',
    tip: 'informative, clean, professional, helpful',
    this_or_that: 'playful, comparison friendly, vibrant, fun choice',
  };

  const style = styleByType[storyType] || 'modern, engaging';

  return `
    Create an Instagram story background image.
    Topic: "${headline}"
    ${userInput ? `Context: ${userInput}` : ''}
    Style: ${style}
    Bahrain/Middle East aesthetic, luxurious.
    Portrait orientation (9:16 ratio).
    Should work well with text overlay on top.
    Include slightly blurred or gradient areas for text readability.
    Atmospheric and mood-setting.
  `.trim();
}

/**
 * Build image prompt for reel reference images
 */
export function buildReelSlideImagePrompt(
  text: string,
  visualNote: string,
  userInput?: string
): string {
  return `
    Create a reference image for a reel slide.
    Text that will overlay: "${text}"
    Visual direction: ${visualNote || 'eye-catching, dynamic, trendy'}
    ${userInput ? `Overall reel topic: ${userInput}` : ''}
    Style: Instagram Reels aesthetic, trendy, viral-worthy.
    Bahrain/Gulf lifestyle, modern.
    Square format.
    Dynamic and engaging visual.
  `.trim();
}

/**
 * Check which image generation provider is available
 */
export function getAvailableProvider(): string {
  if (REPLICATE_API_TOKEN) return 'Replicate FLUX';
  if (OPENAI_API_KEY) return 'DALL-E 3';
  if (LEONARDO_API_KEY) return 'Leonardo.ai';
  if (UNSPLASH_ACCESS_KEY) return 'Unsplash';
  return 'Picsum (fallback)';
}
