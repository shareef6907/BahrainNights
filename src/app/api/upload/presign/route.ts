import { NextRequest, NextResponse } from 'next/server';
import { getPresignedUploadUrl, isValidImageType, generateFolderPath } from '@/lib/s3';

export const dynamic = 'force-dynamic';

/**
 * Generate presigned URLs for direct browser-to-S3 upload
 * This bypasses Vercel's 4.5MB limit
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, contentType, entityType, entitySlug, imageType } = body;

    // Validate required fields
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'filename and contentType are required' },
        { status: 400 }
      );
    }

    // Validate content type
    if (!isValidImageType(contentType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Generate folder path
    let folder: string;
    if (entityType === 'venue-registration') {
      // For new venue registration, use a temporary folder with timestamp
      const timestamp = Date.now();
      folder = `venues/pending-${timestamp}`;
    } else if (entityType && entitySlug) {
      folder = generateFolderPath(entityType, { venueSlug: entitySlug });
    } else {
      // Default to a general uploads folder
      const timestamp = Date.now();
      folder = `general/${timestamp}`;
    }

    // Generate unique filename
    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
    const uniqueFilename = imageType
      ? `${imageType}.${ext}`
      : `${Date.now()}.${ext}`;

    // Get presigned URL
    const result = await getPresignedUploadUrl(folder, uniqueFilename, contentType);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
