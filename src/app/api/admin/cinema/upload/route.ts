import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Cinema-specific image upload - NO WATERMARKS
 * Direct S3 upload for movie posters and backdrops
 */
export async function POST(request: NextRequest) {
  console.log('[Cinema Upload] Starting...');

  const accessKeyId = process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretKey = process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
  const region = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';

  if (!accessKeyId || !secretKey) {
    console.error('[Cinema Upload] Missing AWS credentials');
    return NextResponse.json(
      { error: 'Server configuration error: Missing AWS credentials' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const movieId = formData.get('movieId') as string;
    const imageType = formData.get('imageType') as string; // 'poster' or 'backdrop'

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Use JPG, PNG, or WebP.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Max 10MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Configure resize based on image type
    let maxWidth = 1200;
    let maxHeight = 1200;
    let targetQuality = 90;

    if (imageType === 'poster') {
      // Poster aspect ratio ~2:3 (680x1000)
      maxWidth = 680;
      maxHeight = 1000;
      targetQuality = 92;
    } else if (imageType === 'backdrop') {
      // Backdrop aspect ratio ~16:9 (1920x1080)
      maxWidth = 1920;
      maxHeight = 1080;
      targetQuality = 88;
    }

    // Process image with sharp - NO WATERMARK
    let processedBuffer = await sharp(buffer)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: targetQuality })
      .toBuffer();

    // If still too large (over 1MB for posters, 2MB for backdrops), reduce quality
    const maxOutputSize = imageType === 'poster' ? 1024 * 1024 : 2 * 1024 * 1024;
    let quality = targetQuality;

    while (processedBuffer.length > maxOutputSize && quality > 40) {
      quality -= 10;
      processedBuffer = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality })
        .toBuffer();
    }

    // Generate unique filename
    const timestamp = Date.now();
    const uniqueId = uuidv4().substring(0, 8);
    const movieSlug = movieId || 'new';
    const folder = imageType === 'backdrop' ? 'backdrops' : 'posters';
    const fileName = `processed/cinema/${folder}/${movieSlug}-${timestamp}-${uniqueId}.jpg`;

    // Upload to S3 - NO WATERMARK, direct upload
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: processedBuffer,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000',
    }));

    const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;

    console.log('[Cinema Upload] Success:', {
      url,
      imageType,
      originalSize: file.size,
      compressedSize: processedBuffer.length,
      quality,
    });

    return NextResponse.json({
      success: true,
      url,
      fileName,
      originalSize: file.size,
      compressedSize: processedBuffer.length,
    });
  } catch (error) {
    console.error('[Cinema Upload] Error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
