/**
 * Image Processor - Downloads event images and uploads to S3
 * Uses the existing S3/Lambda pipeline for watermarking and optimization
 */

import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import crypto from 'crypto';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const PUBLIC_URL = process.env.NEXT_PUBLIC_S3_URL || process.env.NEXT_PUBLIC_CDN_URL || `https://${BUCKET}.s3.me-south-1.amazonaws.com/processed`;

// Cache to prevent re-downloading same images
const processedImageCache = new Map<string, string>();

/**
 * Generate a unique hash for an image URL
 */
function generateImageHash(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex').substring(0, 12);
}

/**
 * Download image from URL and return as buffer
 */
async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    // Handle relative URLs
    if (!url.startsWith('http')) {
      console.warn(`[Image] Skipping relative URL: ${url}`);
      return null;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*',
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      console.warn(`[Image] Failed to download (${response.status}): ${url}`);
      return null;
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Validate it's actually an image
    if (!contentType.startsWith('image/')) {
      console.warn(`[Image] Not an image (${contentType}): ${url}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate minimum size (avoid broken images)
    if (buffer.length < 1000) {
      console.warn(`[Image] Image too small (${buffer.length} bytes): ${url}`);
      return null;
    }

    return { buffer, contentType };
  } catch (error) {
    console.error(`[Image] Download error for ${url}:`, error);
    return null;
  }
}

/**
 * Check if processed image already exists in S3
 */
async function checkImageExists(key: string): Promise<boolean> {
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for Lambda to process the image
 */
async function waitForProcessing(
  processedUrl: string,
  maxAttempts: number = 20,
  delayMs: number = 1000
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(processedUrl, { method: 'HEAD' });
      if (response.ok) return true;
    } catch {
      // Image not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  return false;
}

/**
 * Process an event image - download and upload to S3
 * Returns the final S3 URL or null if processing fails
 */
export async function processEventImage(
  imageUrl: string,
  eventSlug: string,
  sourceName: string
): Promise<string | null> {
  // Check cache first
  const cacheKey = `${sourceName}:${imageUrl}`;
  if (processedImageCache.has(cacheKey)) {
    return processedImageCache.get(cacheKey)!;
  }

  // Generate unique filename based on image URL hash
  const imageHash = generateImageHash(imageUrl);
  const now = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // Use scraped-events folder to separate from user uploads
  const folder = `scraped-events/${sourceName}/${yearMonth}`;
  const filename = `${eventSlug}-${imageHash}`;

  // Check if already processed
  const processedKey = `processed/${folder}/${filename}.webp`;
  const processedUrl = `${PUBLIC_URL}/${folder}/${filename}.webp`;

  if (await checkImageExists(processedKey)) {
    console.log(`[Image] Already exists: ${filename}`);
    processedImageCache.set(cacheKey, processedUrl);
    return processedUrl;
  }

  // Download the image
  console.log(`[Image] Downloading: ${imageUrl}`);
  const downloaded = await downloadImage(imageUrl);
  if (!downloaded) {
    return null;
  }

  // Determine file extension from content type
  const extMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
  };
  const ext = extMap[downloaded.contentType] || '.jpg';

  // Upload to S3 /uploads/ folder (Lambda will process and move to /processed/)
  const uploadKey = `uploads/${folder}/${filename}${ext}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: uploadKey,
        Body: downloaded.buffer,
        ContentType: downloaded.contentType,
      })
    );

    console.log(`[Image] Uploaded to S3: ${uploadKey}`);

    // Wait for Lambda to process
    const isProcessed = await waitForProcessing(processedUrl, 20, 1500);

    if (isProcessed) {
      console.log(`[Image] Processed successfully: ${filename}`);
      processedImageCache.set(cacheKey, processedUrl);
      return processedUrl;
    } else {
      console.warn(`[Image] Processing timeout for: ${filename}`);
      // Return the URL anyway - it should be available soon
      processedImageCache.set(cacheKey, processedUrl);
      return processedUrl;
    }
  } catch (error) {
    console.error(`[Image] Upload error:`, error);
    return null;
  }
}

/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 60); // Limit length
}

/**
 * Process multiple images in parallel with rate limiting
 */
export async function processEventImages(
  events: Array<{ imageUrl?: string; slug: string; sourceName: string }>,
  onProgress?: (current: number, total: number) => void
): Promise<Map<string, string | null>> {
  const results = new Map<string, string | null>();

  // Process in batches of 3 to avoid overwhelming the server
  const BATCH_SIZE = 3;

  for (let i = 0; i < events.length; i += BATCH_SIZE) {
    const batch = events.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map(async (event) => {
        if (!event.imageUrl) {
          return { slug: event.slug, url: null };
        }

        const url = await processEventImage(
          event.imageUrl,
          event.slug,
          event.sourceName
        );
        return { slug: event.slug, url };
      })
    );

    for (const result of batchResults) {
      results.set(result.slug, result.url);
    }

    if (onProgress) {
      onProgress(Math.min(i + BATCH_SIZE, events.length), events.length);
    }

    // Small delay between batches
    if (i + BATCH_SIZE < events.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return results;
}
