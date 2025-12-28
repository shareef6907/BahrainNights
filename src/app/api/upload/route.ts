import { NextRequest, NextResponse } from 'next/server';
import {
  uploadImage,
  getNextGalleryNumber,
  countGalleryImages,
  generateFolderPath,
  waitForProcessing,
  isValidImageType,
  isValidFileSize,
  getFileExtension,
  EntityType,
  ImageType,
} from '@/lib/s3';
import { requireVenueOwnerOrAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_GALLERY_IMAGES = 12;

export async function POST(request: NextRequest) {
  // Require authentication - must be venue owner or admin
  const auth = await requireVenueOwnerOrAdmin(request);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const formData = await request.formData();

    // Get file and metadata from form data
    const file = formData.get('file') as File;
    const entityType = formData.get('entityType') as EntityType;
    const imageType = formData.get('imageType') as ImageType;
    const venueSlug = formData.get('venueSlug') as string | null;
    const eventSlug = formData.get('eventSlug') as string | null;
    const offerSlug = formData.get('offerSlug') as string | null;
    const sponsorSlug = formData.get('sponsorSlug') as string | null;
    const adSlug = formData.get('adSlug') as string | null;

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

    // Validate entity type
    if (!entityType || !['venue', 'event', 'offer', 'sponsor', 'ad'].includes(entityType)) {
      return NextResponse.json(
        { error: 'Invalid entity type' },
        { status: 400 }
      );
    }

    // Validate image type
    if (!imageType || !['logo', 'cover', 'gallery', 'banner'].includes(imageType)) {
      return NextResponse.json(
        { error: 'Invalid image type' },
        { status: 400 }
      );
    }

    // Generate folder path based on entity type
    let folder: string;
    try {
      folder = generateFolderPath(entityType, {
        venueSlug: venueSlug || undefined,
        eventSlug: eventSlug || undefined,
        offerSlug: offerSlug || undefined,
        sponsorSlug: sponsorSlug || undefined,
        adSlug: adSlug || undefined,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Missing required slug' },
        { status: 400 }
      );
    }

    // Check gallery limit for gallery uploads
    if (imageType === 'gallery') {
      const currentCount = await countGalleryImages(folder);
      if (currentCount >= MAX_GALLERY_IMAGES) {
        return NextResponse.json(
          { error: `Maximum ${MAX_GALLERY_IMAGES} gallery images allowed` },
          { status: 400 }
        );
      }
    }

    // Generate filename based on image type
    let filename: string;
    const ext = getFileExtension(file.name);

    if (imageType === 'gallery') {
      const number = await getNextGalleryNumber(folder);
      filename = `gallery/${number}${ext}`;
    } else {
      // For logo, cover, banner - use fixed names
      filename = `${imageType}${ext}`;
    }

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
    // Give Lambda up to 15 seconds to process the image
    const isProcessed = await waitForProcessing(processedUrl, 15, 1000);

    if (!isProcessed) {
      // Log warning but return URL anyway - it will be available shortly
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
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove an image
export async function DELETE(request: NextRequest) {
  // Require authentication - must be venue owner or admin
  const auth = await requireVenueOwnerOrAdmin(request);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const url = searchParams.get('url');

    if (!key && !url) {
      return NextResponse.json(
        { error: 'Either key or url parameter is required' },
        { status: 400 }
      );
    }

    const { deleteImage, getKeyFromUrl } = await import('@/lib/s3');

    let deleteKey: string | null = key;
    if (!deleteKey && url) {
      deleteKey = getKeyFromUrl(url);
    }

    if (!deleteKey) {
      return NextResponse.json(
        { error: 'Could not determine image key to delete' },
        { status: 400 }
      );
    }

    await deleteImage(deleteKey);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 }
    );
  }
}
