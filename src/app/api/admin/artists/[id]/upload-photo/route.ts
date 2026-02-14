import { NextRequest, NextResponse } from 'next/server';
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

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// 20MB limit
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
 * Generate presigned URL for direct S3 upload of artist photos
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: artistId } = await params;
    const body = await request.json();
    const { fileType, fileSize, imageType = 'profile' } = body;

    // Validate file type
    if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!fileSize || fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 20MB allowed.' },
        { status: 400 }
      );
    }

    // Get artist slug for S3 path
    const supabase = getAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: artist, error: artistError } = await (supabase
      .from('artists') as any)
      .select('slug, stage_name')
      .eq('id', artistId)
      .single();

    if (artistError || !artist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    const extension = getExtension(fileType);
    const timestamp = Date.now();
    // Use slug if available, otherwise create one from stage_name or use ID
    const artistSlug = artist.slug || 
      (artist.stage_name ? artist.stage_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : artistId);

    // Generate S3 key based on image type
    let s3Key: string;
    
    switch (imageType) {
      case 'profile':
        // Main profile photo - goes directly to processed folder
        s3Key = `processed/artists/${artistSlug}/profile-${timestamp}.${extension}`;
        break;
      case 'gallery':
        // Gallery images
        s3Key = `processed/artists/${artistSlug}/gallery/${timestamp}.${extension}`;
        break;
      default:
        s3Key = `processed/artists/${artistSlug}/${imageType}-${timestamp}.${extension}`;
    }

    // Create presigned URL
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
    console.error('Artist photo presign error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
