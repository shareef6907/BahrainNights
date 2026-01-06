import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client - support both BAHRAINNIGHTS_ and AWS_ prefixed env vars
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
// Keep PUBLIC_URL for backwards compatibility but derive from S3_BASE_URL
const PUBLIC_URL = `${S3_BASE_URL}/processed`;

export type EntityType = 'venue' | 'event' | 'offer' | 'sponsor' | 'ad' | 'attraction';
export type ImageType = 'logo' | 'cover' | 'gallery' | 'banner';

interface FolderOptions {
  venueSlug?: string;
  eventSlug?: string;
  offerSlug?: string;
  sponsorSlug?: string;
  adSlug?: string;
  attractionId?: string;
}

interface UploadResult {
  uploadKey: string;
  processedUrl: string;
  processedKey: string;
}

/**
 * Upload image to S3 /uploads/ folder (Lambda will process and move to /processed/)
 */
export async function uploadImage(
  file: Buffer,
  folder: string,
  filename: string,
  contentType: string
): Promise<UploadResult> {
  const uploadKey = `uploads/${folder}/${filename}`;
  const processedFilename = filename.replace(/\.[^.]+$/, '.webp');
  const processedKey = `processed/${folder}/${processedFilename}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: uploadKey,
      Body: file,
      ContentType: contentType,
    })
  );

  return {
    uploadKey,
    processedKey,
    processedUrl: `${PUBLIC_URL}/${folder}/${processedFilename}`,
  };
}

/**
 * Delete image from S3 (processed folder)
 */
export async function deleteImage(key: string): Promise<void> {
  const deleteKey = key.startsWith('processed/') ? key : `processed/${key}`;

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: deleteKey,
      })
    );
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Delete multiple images from S3
 */
export async function deleteImages(keys: string[]): Promise<void> {
  await Promise.all(keys.map((key) => deleteImage(key)));
}

/**
 * Count images in a gallery folder
 */
export async function countGalleryImages(folder: string): Promise<number> {
  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: `processed/${folder}/gallery/`,
      })
    );
    return response.KeyCount || 0;
  } catch (error) {
    console.error('Error counting gallery images:', error);
    return 0;
  }
}

/**
 * List all images in a gallery folder
 */
export async function listGalleryImages(folder: string): Promise<string[]> {
  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: `processed/${folder}/gallery/`,
      })
    );

    return (response.Contents || [])
      .map((obj) => `${PUBLIC_URL}/${folder}/gallery/${obj.Key?.split('/').pop()}`)
      .filter(Boolean);
  } catch (error) {
    console.error('Error listing gallery images:', error);
    return [];
  }
}

/**
 * Get next gallery image number (001, 002, etc.)
 */
export async function getNextGalleryNumber(folder: string): Promise<string> {
  const count = await countGalleryImages(folder);
  return String(count + 1).padStart(3, '0');
}

/**
 * Generate folder path based on entity type
 */
export function generateFolderPath(
  entityType: EntityType,
  options: FolderOptions
): string {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  switch (entityType) {
    case 'venue':
      if (!options.venueSlug) throw new Error('venueSlug is required for venue uploads');
      return `venues/${options.venueSlug}`;

    case 'event':
      if (!options.venueSlug || !options.eventSlug) {
        throw new Error('venueSlug and eventSlug are required for event uploads');
      }
      return `events/${options.venueSlug}/${yearMonth}/${options.eventSlug}`;

    case 'offer':
      if (!options.venueSlug) throw new Error('venueSlug is required for offer uploads');
      return `offers/${options.venueSlug}`;

    case 'sponsor':
      return 'sponsors';

    case 'ad':
      return `ads/${yearMonth}`;

    case 'attraction':
      if (!options.attractionId) throw new Error('attractionId is required for attraction uploads');
      return `attractions/${options.attractionId}`;

    default:
      return 'general';
  }
}

/**
 * Generate full S3 URL from a key
 */
export function getS3Url(key: string): string {
  const processedKey = key.startsWith('processed/') ? key.replace('processed/', '') : key;
  return `${PUBLIC_URL}/${processedKey}`;
}

/**
 * Extract S3 key from a full URL
 */
export function getKeyFromUrl(url: string): string | null {
  if (!url.includes(BUCKET) && !url.startsWith(PUBLIC_URL)) {
    return null;
  }

  const urlParts = url.split('/processed/');
  if (urlParts.length > 1) {
    return `processed/${urlParts[1]}`;
  }

  return null;
}

/**
 * Check if an image exists in S3
 */
export async function imageExists(key: string): Promise<boolean> {
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: BUCKET,
        Key: key.startsWith('processed/') ? key : `processed/${key}`,
      })
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for Lambda to process image (poll for processed image)
 */
export async function waitForProcessing(
  processedUrl: string,
  maxAttempts: number = 15,
  delayMs: number = 1000
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(processedUrl, { method: 'HEAD' });
      if (response.ok) return true;
    } catch {
      // Image not ready yet, continue polling
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return false;
}

/**
 * Validate file type
 */
export function isValidImageType(mimeType: string): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return allowedTypes.includes(mimeType);
}

/**
 * Validate file size (max 10MB)
 */
export function isValidFileSize(size: number, maxSizeMB: number = 10): boolean {
  return size <= maxSizeMB * 1024 * 1024;
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? `.${ext}` : '.jpg';
}

/**
 * Generate a unique filename with timestamp
 */
export function generateUniqueFilename(
  imageType: ImageType,
  originalFilename: string
): string {
  const ext = getFileExtension(originalFilename);
  const timestamp = Date.now();

  if (imageType === 'gallery') {
    // Gallery images will get numbered by the upload function
    return `gallery/${timestamp}${ext}`;
  }

  return `${imageType}${ext}`;
}

/**
 * Generate a presigned URL for direct browser-to-S3 upload
 * This bypasses Vercel's 4.5MB limit by uploading directly to S3
 */
export interface PresignedUrlResult {
  uploadUrl: string;
  uploadKey: string;
  processedUrl: string;
  processedKey: string;
}

export async function getPresignedUploadUrl(
  folder: string,
  filename: string,
  contentType: string,
  expiresIn: number = 300 // 5 minutes default
): Promise<PresignedUrlResult> {
  const uploadKey = `uploads/${folder}/${filename}`;
  const processedFilename = filename.replace(/\.[^.]+$/, '.webp');
  const processedKey = `processed/${folder}/${processedFilename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: uploadKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });

  return {
    uploadUrl,
    uploadKey,
    processedKey,
    processedUrl: `${PUBLIC_URL}/${folder}/${processedFilename}`,
  };
}

// Export the S3 client for advanced use cases
export { s3Client, BUCKET, S3_BASE_URL, PUBLIC_URL };
