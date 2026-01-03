import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// S3 client configuration
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const REGION = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';
// Always use the full S3 URL with bucket name and region - don't rely on CDN URL as it might not include /processed path
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

// Compression settings
const TARGET_SIZE_KB = 600;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

async function getVenueFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('venue_session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, VENUE_SESSION_SECRET);
    if (payload.type !== 'venue' || !payload.venueId) {
      return null;
    }

    const venueId = payload.venueId as string;
    let venueSlug = payload.venueSlug as string | undefined;

    // If venueSlug not in token, fetch from database
    if (!venueSlug) {
      const supabase = getAdminClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase
        .from('venues') as any)
        .select('slug')
        .eq('id', venueId)
        .single();
      venueSlug = (data as { slug?: string })?.slug || venueId; // Fallback to ID if no slug
    }

    return {
      venueId,
      venueSlug,
    };
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

/**
 * Create watermark SVG text
 */
function createWatermarkSvg(imageWidth: number, imageHeight: number): Buffer {
  // Scale watermark based on image size
  const fontSize = Math.max(16, Math.min(32, Math.round(imageWidth / 40)));
  const padding = Math.round(fontSize * 0.75);
  const text = 'BahrainNights.com';

  const svg = `
    <svg width="${imageWidth}" height="${imageHeight}">
      <style>
        .watermark {
          fill: rgba(255, 255, 255, 0.6);
          font-family: Arial, sans-serif;
          font-size: ${fontSize}px;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
      </style>
      <text
        x="${imageWidth - padding}"
        y="${imageHeight - padding}"
        class="watermark"
        text-anchor="end"
      >${text}</text>
    </svg>
  `;

  return Buffer.from(svg);
}

/**
 * Compress image to target size (600KB) and add watermark
 * Iteratively reduces quality until under target size
 */
async function compressImage(buffer: Buffer, addWatermark: boolean = true): Promise<{
  buffer: Buffer;
  width: number;
  height: number;
}> {
  // Get original metadata
  const metadata = await sharp(buffer).metadata();
  let width = metadata.width || MAX_WIDTH;
  let height = metadata.height || MAX_HEIGHT;

  // Calculate resize dimensions while maintaining aspect ratio
  if (width > MAX_WIDTH) {
    height = Math.round((height * MAX_WIDTH) / width);
    width = MAX_WIDTH;
  }
  if (height > MAX_HEIGHT) {
    width = Math.round((width * MAX_HEIGHT) / height);
    height = MAX_HEIGHT;
  }

  // Create base sharp instance with resize
  let sharpInstance = sharp(buffer)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true });

  // Add watermark if requested
  if (addWatermark) {
    const watermarkSvg = createWatermarkSvg(width, height);
    sharpInstance = sharpInstance.composite([
      {
        input: watermarkSvg,
        top: 0,
        left: 0,
      },
    ]);
  }

  // Start with high quality
  let quality = 90;
  let compressedBuffer = await sharpInstance.webp({ quality }).toBuffer();

  // Iteratively reduce quality until under target size
  while (compressedBuffer.length > TARGET_SIZE_KB * 1024 && quality > 20) {
    quality -= 10;
    sharpInstance = sharp(buffer)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true });

    if (addWatermark) {
      const watermarkSvg = createWatermarkSvg(width, height);
      sharpInstance = sharpInstance.composite([
        {
          input: watermarkSvg,
          top: 0,
          left: 0,
        },
      ]);
    }

    compressedBuffer = await sharpInstance.webp({ quality }).toBuffer();
  }

  // If still too large, reduce dimensions
  if (compressedBuffer.length > TARGET_SIZE_KB * 1024) {
    const scaleFactor = Math.sqrt((TARGET_SIZE_KB * 1024) / compressedBuffer.length);
    width = Math.round(width * scaleFactor);
    height = Math.round(height * scaleFactor);

    sharpInstance = sharp(buffer)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true });

    if (addWatermark) {
      const watermarkSvg = createWatermarkSvg(width, height);
      sharpInstance = sharpInstance.composite([
        {
          input: watermarkSvg,
          top: 0,
          left: 0,
        },
      ]);
    }

    compressedBuffer = await sharpInstance.webp({ quality: 80 }).toBuffer();
  }

  return {
    buffer: compressedBuffer,
    width,
    height,
  };
}

/**
 * Upload image to S3
 */
async function uploadToS3(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000',
    })
  );

  // Return the full S3 URL - key already includes the full path (e.g., processed/venues/...)
  return `${S3_BASE_URL}/${key}`;
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate venue owner
    const venue = await getVenueFromSession();
    if (!venue) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to your venue portal' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const imageType = formData.get('imageType') as string || 'gallery';
    const folder = formData.get('folder') as string || 'venues/gallery';

    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (25MB limit)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 25MB allowed' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine if watermark should be added (gallery images only)
    const shouldAddWatermark = imageType === 'gallery';

    // Compress image to 600KB and optionally add watermark
    const { buffer: compressedBuffer, width, height } = await compressImage(buffer, shouldAddWatermark);

    // Generate S3 key based on image type
    let s3Key: string;
    const timestamp = Date.now();

    switch (imageType) {
      case 'logo':
        s3Key = `processed/venues/${venue.venueSlug}/logo.webp`;
        break;
      case 'cover':
        s3Key = `processed/venues/${venue.venueSlug}/cover.webp`;
        break;
      case 'event':
        const eventSlug = formData.get('eventSlug') as string || `event-${timestamp}`;
        s3Key = `processed/events/${venue.venueSlug}/${eventSlug}/cover.webp`;
        break;
      case 'gallery':
      default:
        s3Key = `processed/venues/${venue.venueSlug}/gallery/${timestamp}.webp`;
        break;
    }

    // Upload to S3
    const url = await uploadToS3(compressedBuffer, s3Key, 'image/webp');

    return NextResponse.json({
      success: true,
      url,
      key: s3Key,
      width,
      height,
      originalSize: file.size,
      compressedSize: compressedBuffer.length,
      compressionRatio: Math.round((1 - compressedBuffer.length / file.size) * 100),
    });
  } catch (error) {
    console.error('Venue upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
