import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const dynamic = 'force-dynamic';

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

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 20 * 1024 * 1024;

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
 * Generate presigned URL for direct S3 upload (admin version)
 * Same as venue-portal/upload/presign but uses admin auth instead of venue_session
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

    const body = await request.json();
    const { fileName, fileType, fileSize, imageType = 'gallery', venueSlug } = body;

    if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    if (!fileSize || fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 20MB allowed.' },
        { status: 400 }
      );
    }

    if (!venueSlug) {
      return NextResponse.json(
        { error: 'venueSlug is required' },
        { status: 400 }
      );
    }

    if (!['logo', 'cover', 'gallery'].includes(imageType)) {
      return NextResponse.json(
        { error: 'Invalid imageType. Allowed: logo, cover, gallery' },
        { status: 400 }
      );
    }

    const extension = getExtension(fileType);
    const timestamp = Date.now();

    let s3Key: string;
    switch (imageType) {
      case 'logo':
        s3Key = `processed/venues/${venueSlug}/logo-${timestamp}.${extension}`;
        break;
      case 'cover':
        s3Key = `processed/venues/${venueSlug}/cover-${timestamp}.${extension}`;
        break;
      case 'gallery':
      default:
        s3Key = `processed/venues/${venueSlug}/gallery/${timestamp}.${extension}`;
        break;
    }

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    const finalUrl = `${S3_BASE_URL}/${s3Key}`;

    return NextResponse.json({
      success: true,
      presignedUrl,
      finalUrl,
      s3Key,
      expiresIn: 300,
    });
  } catch (error) {
    console.error('Admin presign error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}