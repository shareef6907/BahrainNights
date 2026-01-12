import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

// Configuration
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 80;
const TARGET_SIZE_KB = 600;
const WATERMARK_OPACITY = 0.15;

interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
  format: string;
  size: number;
}

interface ProcessOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  addWatermark?: boolean;
  watermarkPosition?: 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Create a text-based watermark SVG
 */
function createTextWatermark(width: number, height: number, text: string = 'BahrainNights.com'): Buffer {
  const fontSize = Math.max(16, Math.min(width / 20, 48));
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .watermark {
            font-family: Arial, sans-serif;
            font-size: ${fontSize}px;
            font-weight: bold;
            fill: white;
            opacity: ${WATERMARK_OPACITY};
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          }
        </style>
      </defs>
      <text x="50%" y="95%" text-anchor="middle" class="watermark">${text}</text>
    </svg>
  `;
  return Buffer.from(svg);
}

/**
 * Create a diagonal repeating watermark pattern
 */
function createDiagonalWatermark(width: number, height: number, text: string = 'BahrainNights.com'): Buffer {
  const fontSize = Math.max(12, Math.min(width / 30, 24));
  const spacing = fontSize * 8;

  const lines: string[] = [];
  for (let y = -height; y < height * 2; y += spacing) {
    for (let x = -width; x < width * 2; x += spacing * 2) {
      lines.push(`
        <text x="${x}" y="${y}" transform="rotate(-30 ${x} ${y})" class="watermark">${text}</text>
      `);
    }
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .watermark {
            font-family: Arial, sans-serif;
            font-size: ${fontSize}px;
            font-weight: bold;
            fill: white;
            opacity: 0.08;
          }
        </style>
      </defs>
      ${lines.join('')}
    </svg>
  `;
  return Buffer.from(svg);
}

/**
 * Process image: resize, compress, and optionally add watermark
 */
export async function processImage(
  input: Buffer | string,
  options: ProcessOptions = {}
): Promise<ProcessedImage> {
  const {
    maxWidth = MAX_WIDTH,
    maxHeight = MAX_HEIGHT,
    quality = QUALITY,
    addWatermark = false, // Watermarking disabled - only compression
    watermarkPosition = 'bottom-right',
    format = 'webp',
  } = options;

  // Load image
  let image = sharp(input);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image: could not read dimensions');
  }

  // Calculate new dimensions (maintain aspect ratio)
  let newWidth = metadata.width;
  let newHeight = metadata.height;

  if (newWidth > maxWidth) {
    newHeight = Math.round((newHeight * maxWidth) / newWidth);
    newWidth = maxWidth;
  }

  if (newHeight > maxHeight) {
    newWidth = Math.round((newWidth * maxHeight) / newHeight);
    newHeight = maxHeight;
  }

  // Resize if needed
  if (newWidth !== metadata.width || newHeight !== metadata.height) {
    image = image.resize(newWidth, newHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Add watermark if requested
  if (addWatermark) {
    const watermark = createTextWatermark(newWidth, newHeight);
    image = image.composite([
      {
        input: watermark,
        top: 0,
        left: 0,
      },
    ]);
  }

  // Convert to target format with quality
  let outputBuffer: Buffer;
  switch (format) {
    case 'webp':
      outputBuffer = await image.webp({ quality }).toBuffer();
      break;
    case 'jpeg':
      outputBuffer = await image.jpeg({ quality, progressive: true }).toBuffer();
      break;
    case 'png':
      outputBuffer = await image.png({ compressionLevel: 9 }).toBuffer();
      break;
    default:
      outputBuffer = await image.webp({ quality }).toBuffer();
  }

  // If the image is still too large, reduce quality further
  let currentQuality = quality;
  while (outputBuffer.length > TARGET_SIZE_KB * 1024 && currentQuality > 20) {
    currentQuality -= 10;
    switch (format) {
      case 'webp':
        outputBuffer = await sharp(input)
          .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: currentQuality })
          .toBuffer();
        break;
      case 'jpeg':
        outputBuffer = await sharp(input)
          .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: currentQuality, progressive: true })
          .toBuffer();
        break;
      default:
        break;
    }
  }

  return {
    buffer: outputBuffer,
    width: newWidth,
    height: newHeight,
    format,
    size: outputBuffer.length,
  };
}

/**
 * Process image for thumbnail
 */
export async function createThumbnail(
  input: Buffer | string,
  width: number = 400,
  height: number = 300
): Promise<Buffer> {
  return sharp(input)
    .resize(width, height, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 75 })
    .toBuffer();
}

/**
 * Add watermark to an existing image
 */
export async function addWatermark(
  input: Buffer | string,
  style: 'simple' | 'diagonal' = 'simple'
): Promise<Buffer> {
  const image = sharp(input);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image: could not read dimensions');
  }

  const watermark = style === 'diagonal'
    ? createDiagonalWatermark(metadata.width, metadata.height)
    : createTextWatermark(metadata.width, metadata.height);

  return image
    .composite([
      {
        input: watermark,
        top: 0,
        left: 0,
      },
    ])
    .toBuffer();
}

/**
 * Extract dominant color from image
 */
export async function getDominantColor(input: Buffer | string): Promise<string> {
  const { dominant } = await sharp(input)
    .resize(50, 50, { fit: 'cover' })
    .stats();

  const r = Math.round(dominant.r);
  const g = Math.round(dominant.g);
  const b = Math.round(dominant.b);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Get image metadata
 */
export async function getImageMetadata(input: Buffer | string): Promise<{
  width: number;
  height: number;
  format: string;
  size: number;
}> {
  const metadata = await sharp(input).metadata();
  const stats = await sharp(input).stats();

  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    size: metadata.size || 0,
  };
}

/**
 * Validate image file
 */
export function validateImageFile(
  mimeType: string,
  size: number,
  maxSizeMB: number = 10
): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!allowedTypes.includes(mimeType)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
    };
  }

  if (size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `File too large. Maximum: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Process and upload image (combines processing with S3 upload)
 */
export async function processAndPrepareForUpload(
  fileBuffer: Buffer,
  options: ProcessOptions = {}
): Promise<{
  buffer: Buffer;
  contentType: string;
  extension: string;
  metadata: ProcessedImage;
}> {
  const processed = await processImage(fileBuffer, options);

  const contentTypeMap: Record<string, string> = {
    webp: 'image/webp',
    jpeg: 'image/jpeg',
    png: 'image/png',
  };

  return {
    buffer: processed.buffer,
    contentType: contentTypeMap[processed.format] || 'image/webp',
    extension: `.${processed.format}`,
    metadata: processed,
  };
}
