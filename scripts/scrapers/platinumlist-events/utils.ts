import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { AFFILIATE_CODE, KNOWN_ARTISTS } from './types';

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
 * Check if title contains a known artist name
 */
function isKnownArtist(title: string): boolean {
  const lowerTitle = title.toLowerCase();
  return KNOWN_ARTISTS.some(artist => lowerTitle.includes(artist));
}

// Known nightclub venues in Bahrain - events at these venues are nightlife
const NIGHTCLUB_VENUES = [
  'klub360',
  'ava club',
  'sofitel bahrain',
  'the bunker',
  'teres',
  'gulf hotel',
  'wyndham',
  'cielo sky lounge',
  'trader vic\'s',
  'havana club',
  'xs club',
  'bushido',
  'sass cafe',
  'zoe',
  'billionaire mansion',
  'calexico',
  'juju\'s',
  'oxygen',
];

/**
 * Check if title/venue indicates a nightlife event
 */
function isNightlifeEvent(title: string): boolean {
  const lowerTitle = title.toLowerCase();
  return NIGHTCLUB_VENUES.some(venue => lowerTitle.includes(venue));
}

/**
 * Map Platinumlist category to sidebar filter categories
 * These MUST match the sidebar filters exactly:
 * - concerts (Music & Concerts)
 * - dining (Dining & Food)
 * - family (Family & Kids)
 * - cultural (Arts & Culture)
 * - sports (Sports & Fitness)
 * - nightlife (Nightlife)
 * - business (Business)
 * - wellness (Wellness)
 * - shopping (Shopping)
 * - community (Community)
 *
 * IMPORTANT: Order matters! More specific categories (comedy, cultural, sports)
 * should be checked BEFORE generic categories (concerts, nightlife)
 */
export function mapEventCategory(platinumlistCategory: string, title: string): string {
  const lowerCategory = platinumlistCategory.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // Comedy - Check FIRST before concerts (comedians might be "known artists")
  if (lowerCategory.includes('comedy') ||
      lowerTitle.includes('comedy') ||
      lowerTitle.includes('stand-up') ||
      lowerTitle.includes('stand up') ||
      lowerTitle.includes('comedian') ||
      lowerTitle.includes('standup')) {
    return 'comedy';
  }

  // Theatre/Cultural - Check BEFORE concerts (musicals might have "live" in title)
  // NOTE: Don't use venue names (amphitheatre) as indicators - they host all event types!
  if (lowerCategory.includes('theatre') ||
      lowerCategory.includes('theater') ||
      lowerTitle.includes('the musical') ||  // "Wicked The Musical" - more specific
      lowerTitle.includes('ballet') ||
      lowerTitle.includes('orchestra') ||
      lowerTitle.includes('opera') ||
      lowerTitle.match(/\bwicked\b/) ||  // Match "wicked" as a word, not part of another word
      lowerTitle.includes('phantom of the opera') ||
      lowerTitle.includes('les miserables') ||
      lowerTitle.includes('cats the musical') ||
      lowerTitle.includes('broadway')) {
    return 'cultural';
  }

  // Sports - Check BEFORE concerts
  if (lowerCategory.includes('sport') ||
      lowerTitle.includes('f1') ||
      lowerTitle.includes('grand prix') ||
      lowerTitle.includes('racing') ||
      lowerTitle.includes('football') ||
      lowerTitle.includes('championship') ||
      lowerTitle.includes('match') ||
      lowerTitle.includes('tournament') ||
      lowerTitle.includes('horseracing') ||
      lowerTitle.includes('equestrian')) {
    return 'sports';
  }

  // Festivals
  if (lowerCategory.includes('festival') ||
      lowerTitle.includes('festival')) {
    return 'festivals';
  }

  // Family
  if (lowerCategory.includes('family') ||
      lowerCategory.includes('kids') ||
      lowerTitle.includes('family') ||
      lowerTitle.includes('kids') ||
      lowerTitle.includes('children')) {
    return 'family';
  }

  // Nightlife - DJ events, club nights, known nightclub venues
  // Check this BEFORE concerts to catch DJ events at clubs
  if (lowerCategory.includes('nightlife') ||
      lowerCategory.includes('club') ||
      lowerTitle.includes('dj ') ||
      lowerTitle.includes('night at') ||
      lowerTitle.includes('party') ||
      lowerTitle.includes('ladies night') ||
      lowerTitle.includes('club night') ||
      isNightlifeEvent(title)) {  // Check for known nightclub venues
    return 'nightlife';
  }

  // Concerts & Music - Default for live performances
  if (lowerCategory.includes('concert') ||
      lowerCategory.includes('music') ||
      lowerTitle.includes('live at') ||
      lowerTitle.includes('live in') ||
      lowerTitle.includes('concert') ||
      isKnownArtist(title)) {
    return 'concerts';
  }

  // Default fallback
  return 'concerts';
}

/**
 * Parse date from Platinumlist format
 * CRITICAL: This must handle dates correctly without timezone issues
 * Examples: "Wed 25 Mar 2026", "13 Jan 2026", "January 13, 2026", "Fri 16 Jan" (no year)
 * Also handles date ranges like "Fri 23 Jan - Sun 25 Jan" (takes first date)
 */
export function parseEventDate(dateText: string | null): string | null {
  if (!dateText) return null;

  // Clean up and take first date if it's a range
  let cleanDate = dateText.trim().replace(/\s+/g, ' ');

  // Handle date ranges - take the first date
  if (cleanDate.includes(' - ')) {
    cleanDate = cleanDate.split(' - ')[0].trim();
  }

  const months: Record<string, string> = {
    'jan': '01', 'january': '01',
    'feb': '02', 'february': '02',
    'mar': '03', 'march': '03',
    'apr': '04', 'april': '04',
    'may': '05',
    'jun': '06', 'june': '06',
    'jul': '07', 'july': '07',
    'aug': '08', 'august': '08',
    'sep': '09', 'september': '09',
    'oct': '10', 'october': '10',
    'nov': '11', 'november': '11',
    'dec': '12', 'december': '12',
  };

  // Try to extract day, month, year
  const dayMatch = cleanDate.match(/\b(\d{1,2})\b/);
  const yearMatch = cleanDate.match(/\b(20\d{2})\b/);
  const monthMatch = cleanDate.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i);

  if (!dayMatch || !monthMatch) {
    console.log(`    Could not parse date (missing day or month): ${dateText}`);
    return null;
  }

  const day = dayMatch[1].padStart(2, '0');
  const monthKey = monthMatch[1].toLowerCase().substring(0, 3);
  const month = months[monthKey];

  if (!month) {
    console.log(`    Unknown month in date: ${dateText}`);
    return null;
  }

  // Infer year if not provided
  let year: string;
  if (yearMatch) {
    year = yearMatch[1];
  } else {
    // Infer year based on current date
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-indexed
    const eventMonth = parseInt(month);

    // If the event month is in the past for this year, assume next year
    if (eventMonth < currentMonth) {
      year = (currentYear + 1).toString();
    } else {
      year = currentYear.toString();
    }
  }

  // Return as YYYY-MM-DD (no timezone conversion needed)
  return `${year}-${month}-${day}`;
}

/**
 * Parse time from text
 */
export function parseTime(timeText: string | null): string | null {
  if (!timeText) return null;

  // Try to extract HH:MM format
  const match = timeText.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (match) {
    let hours = parseInt(match[1]);
    const minutes = match[2];
    const ampm = match[3]?.toLowerCase();

    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  return null;
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
    const key = `processed/events/${slug}-${type}-${timestamp}.webp`;

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
