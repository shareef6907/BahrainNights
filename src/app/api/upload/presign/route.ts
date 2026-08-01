import { NextRequest, NextResponse } from 'next/server';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { s3Client, BUCKET } from '@/lib/s3';

export const dynamic = 'force-dynamic';

// Per-instance in-memory rate limiter. Resets on cold start — not a real security
// control, just a speed bump against burst requests from a single IP.
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per IP per window

// Allowed image types — only logo and cover for venue registration
const ALLOWED_IMAGE_TYPES = new Set(['logo', 'cover']);

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

// Allowed file extensions for additional client-side validation
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const now = Date.now();
    const record = ipRequestCounts.get(ip);
    if (record && now < record.resetAt) {
      if (record.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Too many requests. Please slow down.' },
          { status: 429 }
        );
      }
      record.count++;
    } else {
      ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await request.json();
    const { filename, contentType, entityType, imageType } = body;

    // Validate required fields
    if (!filename || !contentType || !entityType || !imageType) {
      return NextResponse.json(
        { error: 'filename, contentType, entityType, and imageType are all required' },
        { status: 400 }
      );
    }

    // Reject entityType other than venue-registration
    if (entityType !== 'venue-registration') {
      return NextResponse.json(
        { error: 'Invalid entity type. Only venue-registration uploads are supported.' },
        { status: 400 }
      );
    }

    // Reject image types other than logo and cover
    if (!ALLOWED_IMAGE_TYPES.has(imageType)) {
      return NextResponse.json(
        { error: 'Invalid image type. Only logo and cover images are allowed.' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file extension
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: 'Invalid file extension. Allowed: jpg, jpeg, png, webp, gif' },
        { status: 400 }
      );
    }

    // Generate server-side key — no user-supplied string reaches S3
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const safeExt = ext.replace(/[^a-z0-9]/g, '');
    const uniqueFilename = `${imageType}-${timestamp}-${randomSuffix}.${safeExt}`;
    const key = `processed/venues/pending-${timestamp}/${uniqueFilename}`;

    // Generate presigned POST using createPresignedPost
    const post = await createPresignedPost(s3Client, {
      Bucket: BUCKET,
      Key: key,
      Conditions: [
        ['content-length-range', 1, 10_485_760], // 1 byte to 10 MB
        ['eq', '$Content-Type', contentType],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 300, // 5 minutes — NOT ExpiresIn; the SDK ignores ExpiresIn for POST
    });

    return NextResponse.json({
      success: true,
      url: post.url,
      fields: post.fields,
      key,
      processedUrl: post.url + '/' + key,
    });
  } catch (error) {
    console.error('Error generating presigned POST:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
