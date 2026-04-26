import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { processImage } from '@/lib/image-processing';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// S3 client configuration
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production-us';
const REGION = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'us-east-1';
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'admin-portal-secret-key-min-32-chars!'
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
      const { getAdminClient } = await import('@/lib/supabase/server');
      const supabase = getAdminClient();
      const { data } = await supabase
        .from('venues')
        .select('slug')
        .eq('id', venueId)
        .single();
      venueSlug = (data as any)?.slug || venueId;
    }

    return { venueId, venueSlug };
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

async function getAdminFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    if (!payload?.isAdmin && payload?.role !== 'admin') {
      return null;
    }
    return { isAdmin: true };
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Accept both venue and admin auth
    let venueSlug: string | undefined;
    const formData = await request.formData();
    const imageType = formData.get('imageType') as string || 'gallery';

    // Check if admin is uploading (venueSlug from formData for admin)
    const adminAuth = await getAdminFromSession();
    if (adminAuth) {
      // Admin uploads need venueSlug in formData
      venueSlug = formData.get('venueSlug') as string | undefined;
      if (!venueSlug) {
        return NextResponse.json(
          { error: 'venueSlug required for admin uploads' },
          { status: 400 }
        );
      }
    } else {
      // Venue portal uploads - get slug from session
      const venue = await getVenueFromSession();
      if (!venue) {
        return NextResponse.json(
          { error: 'Unauthorized - Please log in to your venue portal' },
          { status: 401 }
        );
      }
      venueSlug = venue.venueSlug;
    }

    const file = formData.get('file') as File | null;

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

    // Get timestamp for unique filenames
    const timestamp = Date.now();

    // All images upload directly to processed/ (no Lambda - watermarking disabled)
    let s3Key: string;

    switch (imageType) {
      case 'logo':
        s3Key = `processed/venues/${venueSlug}/logo.webp`;
        break;
      case 'cover':
        s3Key = `processed/venues/${venueSlug}/cover.webp`;
        break;
      case 'event':
        const eventSlug = formData.get('eventSlug') as string || `event-${timestamp}`;
        s3Key = `processed/events/${venueSlug}/${eventSlug}/cover.webp`;
        break;
      case 'offer':
        const offerSlug = formData.get('offerSlug') as string || `offer-${timestamp}`;
        s3Key = `processed/offers/${venueSlug}/${offerSlug}.webp`;
        break;
      case 'gallery':
      default:
        s3Key = `processed/venues/${venueSlug}/gallery/${timestamp}.webp`;
        break;
    }

    console.log('[VP-UPLOAD] Uploading:', { s3Key, imageType, venueSlug, fileType: file.type, fileSize: file.size });

    // Process image locally with Sharp (compression, resize, convert to WebP)
    const processed = await processImage(buffer, {
      addWatermark: false,
      format: 'webp',
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    // Upload image to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
        Body: processed.buffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000',
      })
    );

    // Return URL immediately (no Lambda dependency)
    const finalUrl = `${S3_BASE_URL}/${s3Key}`;

    return NextResponse.json({
      success: true,
      url: finalUrl,
      key: s3Key,
      width: processed.width,
      height: processed.height,
      originalSize: file.size,
      processedSize: processed.size,
    });
  } catch (error) {
    console.error('[VP-UPLOAD] Upload failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}