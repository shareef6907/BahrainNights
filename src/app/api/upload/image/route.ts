import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { processImage } from '@/lib/image-processing';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// S3 client configuration - identical to venue-portal/upload/route.ts
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

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel limit)

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'admin-portal-secret-key-min-32-chars!'
);

export async function POST(request: NextRequest) {
  try {
    // Authenticate admin - keep admin auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: any;
    try {
      const { payload: p } = await jwtVerify(token, ADMIN_SECRET);
      payload = p;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!payload?.isAdmin && payload?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const entityType = formData.get('entityType') as string || 'venue';
    const imageType = formData.get('imageType') as string || 'gallery';
    const venueSlug = formData.get('venueSlug') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 4MB allowed.' },
        { status: 400 }
      );
    }

    // Process image - identical to venue-portal/upload/route.ts
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const processed = await processImage(buffer, {
      addWatermark: false,
      format: 'webp',
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    // S3 key - IDENTICAL pattern to venue-portal/upload/route.ts
    const timestamp = Date.now();
    let s3Key: string;

    if (entityType === 'venue') {
      if (!venueSlug) {
        return NextResponse.json({ error: 'venueSlug required for venue uploads' }, { status: 400 });
      }

      switch (imageType) {
        case 'logo':
          s3Key = `processed/venues/${venueSlug}/logo.webp`;
          break;
        case 'cover':
          s3Key = `processed/venues/${venueSlug}/cover.webp`;
          break;
        case 'gallery':
          s3Key = `processed/venues/${venueSlug}/gallery/${timestamp}.webp`;
          break;
        default:
          s3Key = `processed/venues/${venueSlug}/${imageType}/${timestamp}.webp`;
      }
    } else {
      // Generic fallback
      s3Key = `processed/${entityType}/${imageType}/${timestamp}.webp`;
    }

    // Upload to S3 - IDENTICAL to venue-portal/upload/route.ts
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
        Body: processed.buffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000',
      })
    );

    // Return URL - IDENTICAL to venue-portal/upload/route.ts
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
    console.error('Admin upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}