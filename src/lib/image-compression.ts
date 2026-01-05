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
    console.log(`[Compression] File already in range: ${(file.size / 1024).toFixed(0)}KB`);
    return file;
  }

  // If file is smaller than minimum, return as-is (don't upscale)
  if (file.size < MIN_SIZE) {
    console.log(`[Compression] File below minimum (${(file.size / 1024).toFixed(0)}KB), keeping original`);
    return file;
  }

  console.log(`[Compression] Starting compression: ${(file.size / 1024).toFixed(0)}KB -> target: 600KB-1MB`);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    img.onload = async () => {
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

          console.log(`[Compression] Attempt ${attempts + 1}: quality=${quality.toFixed(2)}, size=${(blob.size / 1024).toFixed(0)}KB`);

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

        // If still too large after compression, accept it but log warning
        if (bestBlob.size > MAX_SIZE) {
          console.warn(`[Compression] Could not compress below 1MB: ${(bestBlob.size / 1024).toFixed(0)}KB`);
        }

        // Create new File from Blob
        const compressedFile = new File(
          [bestBlob],
          file.name.replace(/\.[^.]+$/, '.jpg'), // Change extension to .jpg
          { type: 'image/jpeg' }
        );

        console.log(`[Compression] Complete: ${(file.size / 1024).toFixed(0)}KB -> ${(compressedFile.size / 1024).toFixed(0)}KB`);
        resolve(compressedFile);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load image from file
    img.src = URL.createObjectURL(file);
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
