/**
 * Client-side image compression utility
 * Compresses images to a target size range (600KB-1MB) while maintaining resolution
 */

export interface CompressionOptions {
  maxSizeKB?: number;
  minSizeKB?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/webp';
}

const DEFAULT_OPTIONS: CompressionOptions = {
  minSizeKB: 600,
  maxSizeKB: 1024,
  maxWidth: 2000,
  maxHeight: 2000,
  quality: 0.9,
  format: 'image/jpeg',
};

/**
 * Compress an image file to a target size range (600KB-1MB)
 * Uses binary search for optimal quality to hit the target range
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<Blob> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const minBytes = (opts.minSizeKB || 600) * 1024;
  const maxBytes = (opts.maxSizeKB || 1024) * 1024;

  // If file is already in the target range, return as-is
  if (file.size >= minBytes && file.size <= maxBytes) {
    console.log(`[Compress] File already in range: ${(file.size / 1024).toFixed(0)}KB`);
    return file;
  }

  // If file is smaller than minimum, return as-is (don't upscale)
  if (file.size < minBytes) {
    console.log(`[Compress] File below minimum (${(file.size / 1024).toFixed(0)}KB), keeping original`);
    return file;
  }

  console.log(`[Compress] Starting: ${(file.size / 1024).toFixed(0)}KB -> target: ${opts.minSizeKB}KB-${opts.maxSizeKB}KB`);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if dimensions exceed max
        const maxDim = Math.max(opts.maxWidth || 2000, opts.maxHeight || 2000);
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const format = opts.format || 'image/jpeg';

        // Binary search for optimal quality
        let minQuality = 0.1;
        let maxQuality = 0.95;
        let bestBlob: Blob | null = null;
        let attempts = 0;
        const maxAttempts = 10;

        const toBlob = (quality: number): Promise<Blob | null> => {
          return new Promise((res) => {
            canvas.toBlob((b) => res(b), format, quality);
          });
        };

        while (attempts < maxAttempts) {
          const quality = (minQuality + maxQuality) / 2;
          const blob = await toBlob(quality);

          if (!blob) {
            reject(new Error('Compression failed - could not create blob'));
            return;
          }

          console.log(`[Compress] Attempt ${attempts + 1}: quality=${quality.toFixed(2)}, size=${(blob.size / 1024).toFixed(0)}KB`);

          if (blob.size >= minBytes && blob.size <= maxBytes) {
            bestBlob = blob;
            break;
          } else if (blob.size > maxBytes) {
            maxQuality = quality;
            bestBlob = blob;
          } else {
            minQuality = quality;
            bestBlob = blob;
          }

          attempts++;
        }

        if (!bestBlob) {
          bestBlob = await toBlob(0.8);
        }

        if (!bestBlob) {
          reject(new Error('Failed to compress image'));
          return;
        }

        console.log(`[Compress] Complete: ${(file.size / 1024).toFixed(0)}KB -> ${(bestBlob.size / 1024).toFixed(0)}KB`);
        resolve(bestBlob);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validate an image file before upload
 */
export function validateImage(file: File, maxSizeMB: number = 10): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please upload an image file (JPG, PNG, WebP, GIF)' };
  }

  // Check file size
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { valid: false, error: `File too large. Maximum size is ${maxSizeMB}MB` };
  }

  // Check supported formats
  const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!supportedTypes.includes(file.type)) {
    return { valid: false, error: 'Unsupported image format. Use JPG, PNG, WebP, or GIF' };
  }

  return { valid: true };
}

/**
 * Get image dimensions from a file
 */
export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Create a preview URL for a file
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke a preview URL to free memory
 */
export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
