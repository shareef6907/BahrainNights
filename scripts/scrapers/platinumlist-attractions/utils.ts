import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { AFFILIATE_CODE } from './types';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY!,
  },
});

const S3_BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || 'bahrainnights-production';

/**
 * Generate affiliate link for Platinumlist
 */
export function generateAffiliateLink(originalUrl: string): string {
  return `https://platinumlist.net/aff/?ref=${AFFILIATE_CODE}&link=${encodeURIComponent(originalUrl)}`;
}

/**
 * Create URL-friendly slug from title
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Map Platinumlist category to our category
 */
export function mapAttractionCategory(platinumlistCategory: string, title: string): string {
  const lowerCategory = platinumlistCategory.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // Tours
  if (lowerCategory.includes('tour') || lowerTitle.includes('tour') || lowerTitle.includes('walking')) {
    return 'tours';
  }

  // Water Sports
  if (lowerCategory.includes('water') || lowerTitle.includes('snorkel') || lowerTitle.includes('diving') ||
      lowerTitle.includes('boat') || lowerTitle.includes('fishing') || lowerTitle.includes('jet ski') ||
      lowerTitle.includes('pearl') || lowerTitle.includes('kayak')) {
    return 'water-sports';
  }

  // Indoor Activities
  if (lowerCategory.includes('indoor') || lowerTitle.includes('vr') || lowerTitle.includes('gaming') ||
      lowerTitle.includes('climbing') || lowerTitle.includes('skydiving') || lowerTitle.includes('escape room') ||
      lowerTitle.includes('bowling') || lowerTitle.includes('arcade')) {
    return 'indoor-activities';
  }

  // Theme Parks
  if (lowerCategory.includes('park') || lowerTitle.includes('water park') || lowerTitle.includes('adventure park') ||
      lowerTitle.includes('lost paradise') || lowerTitle.includes('adhari')) {
    return 'theme-parks';
  }

  // Boat Tours
  if (lowerTitle.includes('boat') || lowerTitle.includes('cruise') || lowerTitle.includes('island') ||
      lowerTitle.includes('yacht') || lowerTitle.includes('dhow')) {
    return 'boat-tours';
  }

  // Sightseeing
  if (lowerTitle.includes('safari') || lowerTitle.includes('sightseeing') || lowerTitle.includes('city tour')) {
    return 'sightseeing';
  }

  return 'attractions'; // default
}

/**
 * Parse price from text
 */
export function parsePrice(priceText: string | null): { price: number; isSoldOut: boolean } {
  if (!priceText) {
    return { price: 0, isSoldOut: false };
  }

  const lowerText = priceText.toLowerCase();

  // Check for sold out
  if (lowerText.includes('sold out') || lowerText.includes('soldout')) {
    return { price: 0, isSoldOut: true };
  }

  // Extract price number
  const match = priceText.match(/[\d,.]+/);
  if (match) {
    let price = parseFloat(match[0].replace(',', ''));

    // Convert USD to BHD if needed (1 USD = 0.376 BHD)
    if (priceText.includes('$') || lowerText.includes('usd')) {
      price = price * 0.376;
    }

    return { price: Math.round(price * 100) / 100, isSoldOut: false };
  }

  return { price: 0, isSoldOut: false };
}

/**
 * Download image from URL and return as buffer
 */
export async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`    Failed to download image: ${response.status}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.log(`    Error downloading image: ${error}`);
    return null;
  }
}

/**
 * Process and upload image to S3
 */
export async function uploadImageToS3(
  imageBuffer: Buffer,
  slug: string,
  type: 'thumbnail' | 'cover'
): Promise<string | null> {
  try {
    // Process image with sharp - convert to WebP and resize
    const processedBuffer = await sharp(imageBuffer)
      .webp({ quality: 85 })
      .resize(type === 'thumbnail' ? 400 : 1200, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .toBuffer();

    const timestamp = Date.now();
    const key = `processed/attractions/${slug}-${type}-${timestamp}.webp`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: processedBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000',
      })
    );

    const s3Url = `https://${S3_BUCKET}.s3.me-south-1.amazonaws.com/${key}`;
    return s3Url;
  } catch (error) {
    console.log(`    Error uploading to S3: ${error}`);
    return null;
  }
}

/**
 * Clean description text
 */
export function cleanDescription(text: string | null): string {
  if (!text) return '';

  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();
}
