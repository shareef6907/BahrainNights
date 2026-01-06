import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { processImage } from '@/lib/image-processing';

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

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// Vercel serverless functions have a 4.5MB body size limit
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel limit)

/**
 * Upload endpoint for venue registration
 * Handles gallery images with watermarking via Lambda
 */
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const imageType = formData.get('imageType') as string || 'gallery';
    const registrationId = formData.get('registrationId') as string || `reg-${Date.now()}`;

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

    // Determine S3 key based on image type
    let s3Key: string;
    let isGallery = false;

    switch (imageType) {
      case 'logo':
        // Logo goes directly to processed (no watermark needed)
        s3Key = `processed/venues/pending-${registrationId}/logo.webp`;
        break;
      case 'cover':
        // Cover goes directly to processed (no watermark needed)
        s3Key = `processed/venues/pending-${registrationId}/cover.webp`;
        break;
      case 'gallery':
      default:
        // Gallery images go to uploads/ folder for Lambda watermarking
        s3Key = `uploads/venues/pending-${registrationId}/gallery/${timestamp}.webp`;
        isGallery = true;
        break;
    }

    // Process image locally with Sharp (compression, resize, convert to WebP)
    const processed = await processImage(buffer, {
      addWatermark: false, // Watermark is added by Lambda for gallery images
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

    // For gallery images, Lambda will process and move to 'processed/' folder
    // Return the final URL where the image will be available
    const finalKey = isGallery
      ? s3Key.replace('uploads/', 'processed/')
      : s3Key;
    const finalUrl = `${S3_BASE_URL}/${finalKey}`;

    return NextResponse.json({
      success: true,
      url: finalUrl,
      key: finalKey,
      width: processed.width,
      height: processed.height,
      originalSize: file.size,
      processedSize: processed.size,
      // Let client know if Lambda processing is pending
      lambdaProcessing: isGallery,
    });
  } catch (error) {
    console.error('Registration upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
