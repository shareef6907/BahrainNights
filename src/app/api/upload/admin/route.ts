import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB upload limit
const MAX_OUTPUT_SIZE = 600 * 1024; // 600KB target output

/**
 * Admin upload endpoint with sharp compression
 * - Compresses images to max 600KB
 * - Resizes to max 1200x1200 (preserving aspect ratio)
 * - No watermarking - direct S3 upload
 * - Used for admin event editing
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    // Validate file exists
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No valid file provided' },
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
    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 10MB allowed' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compress image using sharp
    let quality = 90;
    let processedBuffer = await sharp(buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality })
      .toBuffer();

    // Reduce quality until under 600KB (minimum quality 20)
    while (processedBuffer.length > MAX_OUTPUT_SIZE && quality > 20) {
      quality -= 10;
      processedBuffer = await sharp(buffer)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality })
        .toBuffer();
    }

    // Generate unique filename (always .jpg since we convert to JPEG)
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    const filename = `uploads/events/admin/${timestamp}-${randomStr}.jpg`;

    const bucket = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
    const region = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';

    // Upload compressed image to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: processedBuffer,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000',
    }));

    // Generate public URL
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${filename}`;

    console.log(`[Admin Upload] Success: ${url} (${file.size} -> ${processedBuffer.length} bytes, quality: ${quality})`);

    return NextResponse.json({
      success: true,
      url,
      key: filename,
      originalSize: file.size,
      compressedSize: processedBuffer.length,
      compressionQuality: quality,
    });
  } catch (error) {
    console.error('[Admin Upload] Error:', error);
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
