import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import {
  uploadImage,
  generateFolderPath,
  generateUniqueFilename,
  isValidImageType,
  isValidFileSize,
  getNextGalleryNumber,
  EntityType,
  ImageType,
} from '@/lib/s3';
import {
  processImage,
  createThumbnail,
  validateImageFile,
} from '@/lib/image-processing';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// S3 client for direct processed uploads
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const REGION = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';
// Always use the full S3 URL with bucket name and region
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

interface UploadOptions {
  entityType: EntityType;
  imageType: ImageType;
  venueSlug?: string;
  eventSlug?: string;
  adSlug?: string;
  attractionId?: string;
  addWatermark?: boolean;
  processLocally?: boolean;
  createThumb?: boolean;
}

/**
 * Upload and process images
 *
 * Supports two modes:
 * 1. Lambda processing (default): Upload to /uploads/, Lambda processes to /processed/
 * 2. Local processing: Process with Sharp, upload directly to /processed/
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const entityType = formData.get('entityType') as EntityType | null;
    const imageType = formData.get('imageType') as ImageType | null;
    const venueSlug = formData.get('venueSlug') as string | null;
    const eventSlug = formData.get('eventSlug') as string | null;
    const adSlug = formData.get('adSlug') as string | null;
    const attractionId = formData.get('attractionId') as string | null;
    const addWatermark = formData.get('addWatermark') === 'true';
    const processLocally = formData.get('processLocally') !== 'false'; // Default true
    const createThumb = formData.get('createThumbnail') === 'true';

    // Validate required fields
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!entityType) {
      return NextResponse.json({ error: 'entityType is required' }, { status: 400 });
    }

    if (!imageType) {
      return NextResponse.json({ error: 'imageType is required' }, { status: 400 });
    }

    // Validate file type and size
    const validation = validateImageFile(file.type, file.size);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Get file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate folder path
    const folder = generateFolderPath(entityType, {
      venueSlug: venueSlug || undefined,
      eventSlug: eventSlug || undefined,
      adSlug: adSlug || undefined,
      attractionId: attractionId || undefined,
    });

    // Generate filename
    let filename: string;
    if (imageType === 'gallery') {
      const nextNum = await getNextGalleryNumber(folder);
      filename = `gallery/${nextNum}.webp`;
    } else {
      filename = `${imageType}.webp`;
    }

    let result: {
      url: string;
      key: string;
      thumbnailUrl?: string;
      thumbnailKey?: string;
      width?: number;
      height?: number;
      size?: number;
    };

    if (processLocally) {
      // Process image locally with Sharp
      const processed = await processImage(buffer, {
        addWatermark,
        format: 'webp',
        quality: 80,
        maxWidth: 1920,
        maxHeight: 1080,
      });

      // Upload processed image directly to /processed/ folder
      const processedKey = `processed/${folder}/${filename}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: processedKey,
          Body: processed.buffer,
          ContentType: 'image/webp',
          CacheControl: 'public, max-age=31536000',
        })
      );

      result = {
        url: `${S3_BASE_URL}/${processedKey}`,
        key: processedKey,
        width: processed.width,
        height: processed.height,
        size: processed.size,
      };

      // Create thumbnail if requested
      if (createThumb) {
        const thumbnail = await createThumbnail(buffer, 400, 300);
        const thumbFilename = filename.replace('.webp', '-thumb.webp');
        const thumbKey = `processed/${folder}/${thumbFilename}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: thumbKey,
            Body: thumbnail,
            ContentType: 'image/webp',
            CacheControl: 'public, max-age=31536000',
          })
        );

        result.thumbnailUrl = `${S3_BASE_URL}/${thumbKey}`;
        result.thumbnailKey = thumbKey;
      }
    } else {
      // Use Lambda processing (upload to /uploads/, Lambda processes)
      const uploadResult = await uploadImage(
        buffer,
        folder,
        filename.replace('.webp', getExtension(file.name)),
        file.type
      );

      result = {
        url: uploadResult.processedUrl,
        key: uploadResult.processedKey,
      };
    }

    return NextResponse.json({
      success: true,
      ...result,
      message: processLocally
        ? 'Image processed and uploaded successfully'
        : 'Image uploaded, processing in progress',
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

/**
 * Get file extension from filename
 */
function getExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? `.${ext}` : '.jpg';
}

/**
 * Handle multiple file uploads
 */
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const entityType = formData.get('entityType') as EntityType | null;
    const venueSlug = formData.get('venueSlug') as string | null;
    const eventSlug = formData.get('eventSlug') as string | null;
    const addWatermark = formData.get('addWatermark') === 'true';

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (!entityType) {
      return NextResponse.json({ error: 'entityType is required' }, { status: 400 });
    }

    const folder = generateFolderPath(entityType, {
      venueSlug: venueSlug || undefined,
      eventSlug: eventSlug || undefined,
    });

    const results = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        // Validate file
        const validation = validateImageFile(file.type, file.size);
        if (!validation.valid) {
          errors.push({ filename: file.name, error: validation.error });
          continue;
        }

        // Get buffer and process
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const processed = await processImage(buffer, {
          addWatermark,
          format: 'webp',
        });

        // Generate unique gallery filename
        const nextNum = await getNextGalleryNumber(folder);
        const filename = `gallery/${nextNum}.webp`;
        const processedKey = `processed/${folder}/${filename}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: processedKey,
            Body: processed.buffer,
            ContentType: 'image/webp',
            CacheControl: 'public, max-age=31536000',
          })
        );

        results.push({
          originalName: file.name,
          url: `${S3_BASE_URL}/${processedKey}`,
          key: processedKey,
          width: processed.width,
          height: processed.height,
          size: processed.size,
        });
      } catch (error) {
        errors.push({
          filename: file.name,
          error: error instanceof Error ? error.message : 'Processing failed'
        });
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}
