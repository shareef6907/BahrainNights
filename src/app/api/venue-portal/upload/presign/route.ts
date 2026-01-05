import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

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
// 20MB limit for direct S3 uploads
const MAX_FILE_SIZE = 20 * 1024 * 1024;

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

/**
 * Generate presigned URL for direct S3 upload
 * This bypasses Vercel's 4.5MB body size limit
 */
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

    const body = await request.json();
    const { fileName, fileType, fileSize, imageType = 'gallery' } = body;

    // Validate file type
    if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (20MB limit)
    if (!fileSize || fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 20MB allowed.' },
        { status: 400 }
      );
    }

    // Get file extension
    const extension = getExtension(fileType);
    const timestamp = Date.now();

    // Generate S3 key based on image type
    // For logo and cover, upload directly to final location (no Lambda processing needed)
    // These don't get watermarked
    let s3Key: string;

    switch (imageType) {
      case 'logo':
        // Profile photos go directly to processed folder (publicly accessible) - NO watermark
        s3Key = `processed/venues/${venue.venueSlug}/logo.${extension}`;
        break;
      case 'cover':
        // Cover photos go directly to processed folder (publicly accessible) - NO watermark
        s3Key = `processed/venues/${venue.venueSlug}/cover.${extension}`;
        break;
      case 'event':
        const eventSlug = body.eventSlug || `event-${timestamp}`;
        s3Key = `processed/events/${venue.venueSlug}/${eventSlug}/cover.${extension}`;
        break;
      case 'gallery':
      default:
        // Gallery images may be processed by Lambda for watermarking
        s3Key = `uploads/venues/${venue.venueSlug}/gallery/${timestamp}.${extension}`;
        break;
    }

    // Create presigned URL for PUT operation
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      ContentType: fileType,
    });

    // URL expires in 5 minutes
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    // Final URL where the file will be accessible
    const finalUrl = `${S3_BASE_URL}/${s3Key}`;

    return NextResponse.json({
      success: true,
      presignedUrl,
      finalUrl,
      s3Key,
      expiresIn: 300,
    });
  } catch (error) {
    console.error('Presign error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
