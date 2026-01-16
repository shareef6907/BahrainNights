/**
 * Client-side image compression utility
 * Compresses images to be between 600KB and 1MB
 */

const MIN_SIZE = 600 * 1024; // 600KB
const MAX_SIZE = 1024 * 1024; // 1MB
const MAX_DIMENSION = 2000; // Max width/height to prevent huge images

/**
 * Compress an image file to be between 600KB and 1MB
 * Uses canvas API for browser-based compression
 */
export async function compressImage(file: File): Promise<File> {
  // If file is already in the target range, return as-is
  if (file.size >= MIN_SIZE && file.size <= MAX_SIZE) {
    return file;
  }

  // If file is smaller than minimum, return as-is (don't upscale)
  if (file.size < MIN_SIZE) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    // Create object URL for the file
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      // Revoke the object URL to free memory (prevents memory leak)
      URL.revokeObjectURL(objectUrl);

      try {
        // Calculate dimensions (resize if too large)
        let { width, height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Binary search for optimal quality
        let minQuality = 0.1;
        let maxQuality = 0.95;
        let bestBlob: Blob | null = null;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
          const quality = (minQuality + maxQuality) / 2;

          const blob = await new Promise<Blob | null>((res) => {
            canvas.toBlob((b) => res(b), 'image/jpeg', quality);
          });

          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }

          if (blob.size >= MIN_SIZE && blob.size <= MAX_SIZE) {
            // Perfect! In range
            bestBlob = blob;
            break;
          } else if (blob.size > MAX_SIZE) {
            // Too big, reduce quality
            maxQuality = quality;
            bestBlob = blob; // Keep as fallback
          } else {
            // Too small, increase quality
            minQuality = quality;
            bestBlob = blob;
          }

          attempts++;
        }

        if (!bestBlob) {
          // Fallback: just use 0.8 quality
          bestBlob = await new Promise<Blob | null>((res) => {
            canvas.toBlob((b) => res(b), 'image/jpeg', 0.8);
          });
        }

        if (!bestBlob) {
          reject(new Error('Failed to compress image'));
          return;
        }

        // Create new File from Blob
        const compressedFile = new File(
          [bestBlob],
          file.name.replace(/\.[^.]+$/, '.jpg'), // Change extension to .jpg
          { type: 'image/jpeg' }
        );

        resolve(compressedFile);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl); // Clean up on error
      reject(new Error('Failed to load image'));
    };

    // Load image from file
    img.src = objectUrl;
  });
}

/**
 * Check if a file needs compression
 */
export function needsCompression(file: File): boolean {
  return file.size > MAX_SIZE;
}

/**
 * Get compression info for display
 */
export function getCompressionInfo(originalSize: number, compressedSize: number): string {
  const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(0);
  return `Compressed: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(compressedSize / 1024).toFixed(0)}KB (${reduction}% smaller)`;
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
