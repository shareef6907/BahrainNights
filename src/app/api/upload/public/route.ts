import { NextRequest, NextResponse } from 'next/server';
import {
  uploadImage,
  waitForProcessing,
  isValidImageType,
  isValidFileSize,
  getFileExtension,
} from '@/lib/s3';

export const dynamic = 'force-dynamic';

// Vercel serverless functions have a 4.5MB body size limit
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel limit)

// Simple in-memory rate limiting (in production, use Redis)
const uploadAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_UPLOADS_PER_HOUR = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = uploadAttempts.get(ip);

  if (!entry || now > entry.resetTime) {
    uploadAttempts.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (entry.count >= MAX_UPLOADS_PER_HOUR) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Public upload endpoint for event cover images
 * No authentication required, but rate limited
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many upload attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const entityId = formData.get('entityId') as string; // Temporary ID for pending events

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!isValidImageType(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!isValidFileSize(file.size, 10)) {
      return NextResponse.json(
        { error: 'File too large. Maximum 10MB allowed' },
        { status: 400 }
      );
    }

    // Generate folder path for pending events
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const uniqueId = entityId || `pending-${Date.now()}`;
    const folder = `events/pending/${yearMonth}/${uniqueId}`;

    // Generate filename
    const ext = getFileExtension(file.name);
    const filename = `cover${ext}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3 (Lambda will process and move to /processed/)
    const { uploadKey, processedUrl, processedKey } = await uploadImage(
      buffer,
      folder,
      filename,
      file.type
    );

    // Wait for Lambda to process (with timeout)
    const isProcessed = await waitForProcessing(processedUrl, 15, 1000);

    if (!isProcessed) {
      console.warn(`Image processing taking longer than expected: ${processedUrl}`);
    }

    return NextResponse.json({
      success: true,
      url: processedUrl,
      key: processedKey,
      processed: isProcessed,
      originalSize: file.size,
    });
  } catch (error) {
    console.error('Public upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
