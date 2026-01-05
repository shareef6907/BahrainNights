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
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// Vercel serverless functions have a 4.5MB body size limit
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel limit)

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
      venueSlug = (data as { slug?: string })?.slug || venueId;
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
    })
  );

  return `${S3_BASE_URL}/${key}`;
}

/**
 * Get file extension from MIME type
 */
function getExtension(mimeType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  return map[mimeType] || 'jpg';
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

    // Validate file size (4MB limit - Vercel constraint)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 4MB allowed. Please compress your image before uploading.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get image dimensions for response
    const metadata = await sharp(buffer).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    // Get file extension
    const extension = getExtension(file.type);
    const timestamp = Date.now();

    // Generate S3 keys - upload to 'uploads/' folder to trigger Lambda processing
    // Lambda will process and move to 'processed/' folder with logo watermark
    let uploadKey: string;
    let processedKey: string;

    switch (imageType) {
      case 'logo':
        // Logos don't get watermarked by Lambda, so upload directly to processed
        uploadKey = `uploads/venues/${venue.venueSlug}/logo.${extension}`;
        processedKey = `processed/venues/${venue.venueSlug}/logo.webp`;
        break;
      case 'cover':
        uploadKey = `uploads/venues/${venue.venueSlug}/cover.${extension}`;
        processedKey = `processed/venues/${venue.venueSlug}/cover.webp`;
        break;
      case 'event':
        const eventSlug = formData.get('eventSlug') as string || `event-${timestamp}`;
        uploadKey = `uploads/events/${venue.venueSlug}/${eventSlug}/cover.${extension}`;
        processedKey = `processed/events/${venue.venueSlug}/${eventSlug}/cover.webp`;
        break;
      case 'gallery':
      default:
        uploadKey = `uploads/venues/${venue.venueSlug}/gallery/${timestamp}.${extension}`;
        processedKey = `processed/venues/${venue.venueSlug}/gallery/${timestamp}.webp`;
        break;
    }

    // Upload raw file to S3 - Lambda will process it
    // Lambda adds: logo watermark, compression, WebP conversion, content moderation
    await uploadToS3(buffer, uploadKey, file.type);

    // Return the raw upload URL for immediate preview
    // The processed URL will be available after Lambda finishes (within seconds)
    const rawUrl = `${S3_BASE_URL}/${uploadKey}`;
    const processedUrl = `${S3_BASE_URL}/${processedKey}`;

    return NextResponse.json({
      success: true,
      url: rawUrl,              // Use raw URL for immediate availability
      processedUrl: processedUrl, // Will be available after Lambda processing
      uploadKey: uploadKey,     // Where we uploaded the raw file
      processedKey: processedKey,
      width,
      height,
      originalSize: file.size,
      processing: true,         // Indicates Lambda is processing async
    });
  } catch (error) {
    console.error('Venue upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
