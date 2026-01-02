import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

// Allow up to 25MB uploads (will be compressed to 600KB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

// S3 client configuration
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const PUBLIC_URL = process.env.NEXT_PUBLIC_S3_URL || process.env.NEXT_PUBLIC_CDN_URL || `https://${BUCKET}.s3.me-south-1.amazonaws.com/processed`;

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
    if (payload.type !== 'venue' || !payload.venueId || !payload.venueSlug) {
      return null;
    }
    return {
      venueId: payload.venueId as string,
      venueSlug: payload.venueSlug as string,
    };
  } catch {
    return null;
  }
}

/**
 * Compress image to target size (600KB)
 * Iteratively reduces quality until under target size
 */
async function compressImage(buffer: Buffer): Promise<{
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

  // Start with high quality
  let quality = 90;
  let compressedBuffer = await sharp(buffer)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();

  // Iteratively reduce quality until under target size
  while (compressedBuffer.length > TARGET_SIZE_KB * 1024 && quality > 20) {
    quality -= 10;
    compressedBuffer = await sharp(buffer)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
  }

  // If still too large, reduce dimensions
  if (compressedBuffer.length > TARGET_SIZE_KB * 1024) {
    const scaleFactor = Math.sqrt((TARGET_SIZE_KB * 1024) / compressedBuffer.length);
    width = Math.round(width * scaleFactor);
    height = Math.round(height * scaleFactor);

    compressedBuffer = await sharp(buffer)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
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

  // Return the processed URL
  const urlPath = key.replace('processed/', '');
  return `${PUBLIC_URL}/${urlPath}`;
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

    // Compress image to 600KB
    const { buffer: compressedBuffer, width, height } = await compressImage(buffer);

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
