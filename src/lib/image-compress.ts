/**
 * Client-side image compression utility
 * Compresses images to a target size while maintaining resolution
 */

export interface CompressionOptions {
  maxSizeKB?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/webp';
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxSizeKB: 600,
  quality: 0.9,
  format: 'image/jpeg',
};

/**
 * Compress an image file to a target size
 * Uses iterative quality reduction to achieve target size without losing resolution
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<Blob> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const maxBytes = (opts.maxSizeKB || 600) * 1024;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Optionally resize if dimensions exceed max
        if (opts.maxWidth && width > opts.maxWidth) {
          height = (height * opts.maxWidth) / width;
          width = opts.maxWidth;
        }
        if (opts.maxHeight && height > opts.maxHeight) {
          width = (width * opts.maxHeight) / height;
          height = opts.maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Start with initial quality and reduce until target size is met
        let quality = opts.quality || 0.9;
        const format = opts.format || 'image/jpeg';

        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Compression failed - could not create blob'));
                return;
              }

              // If under target size or quality is too low, return the result
              if (blob.size <= maxBytes || quality <= 0.1) {
                console.log(`Compressed image: ${(blob.size / 1024).toFixed(1)}KB at quality ${quality.toFixed(2)}`);
                resolve(blob);
              } else {
                // Reduce quality and try again
                quality -= 0.1;
                compress();
              }
            },
            format,
            quality
          );
        };

        compress();
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
