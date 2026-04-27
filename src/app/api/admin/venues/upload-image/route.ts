import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getVenueById } from '@/lib/db/venues';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { processImage } from '@/lib/image-processing';
import { cookies } from 'next/headers';

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

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel limit)

/**
 * Admin venue image upload endpoint
 * Uploads logo or cover images for venues from admin panel
 * Processes with Sharp and saves to processed/venues/{slug}/
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const imageType = formData.get('imageType') as string || 'gallery';
    const venueSlug = formData.get('venueSlug') as string;

    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate imageType - only allow logo and cover for this endpoint
    if (!['logo', 'cover'].includes(imageType)) {
      return NextResponse.json(
        { error: 'Invalid imageType. Allowed: logo, cover' },
        { status: 400 }
      );
    }

    // Validate venueSlug
    if (!venueSlug) {
      return NextResponse.json(
        { error: 'venueSlug is required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 4MB allowed.' },
        { status: 400 }
      );
    }

    // Verify venue exists
    const venue = await getVenueById(venueSlug);
    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine S3 key based on image type
    let s3Key: string;
    switch (imageType) {
      case 'logo':
        s3Key = `processed/venues/${venue.slug}/logo.webp`;
        break;
      case 'cover':
        s3Key = `processed/venues/${venue.slug}/cover.webp`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid image type' },
          { status: 400 }
        );
    }

    // Process image locally with Sharp (compression, resize, convert to WebP)
    const processed = await processImage(buffer, {
      addWatermark: false,
      format: 'webp',
      quality: 80,
      maxWidth: imageType === 'logo' ? 512 : 1920,
      maxHeight: imageType === 'logo' ? 512 : 1080,
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

    // Return URL immediately
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
    console.error('Admin venue upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}