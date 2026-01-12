/**
 * Instagram Reel URL Parser Utility
 * Extracts reel ID from various Instagram URL formats
 */

/**
 * Extracts Instagram reel/post ID from various URL formats:
 * - https://www.instagram.com/reel/REEL_ID/
 * - https://instagram.com/reel/REEL_ID/
 * - https://www.instagram.com/reels/REEL_ID/
 * - https://www.instagram.com/p/POST_ID/
 * - https://instagr.am/reel/REEL_ID/
 *
 * @param url - The Instagram URL to parse
 * @returns The reel/post ID or null if not found
 */
export function extractInstagramReelId(url: string | null | undefined): string | null {
  if (!url) return null;

  // Clean the URL
  const cleanUrl = url.trim();

  // Various regex patterns for different Instagram URL formats
  const patterns = [
    // Standard reel URLs: instagram.com/reel/REEL_ID
    /(?:www\.)?instagram\.com\/reel\/([a-zA-Z0-9_-]+)/,
    // Plural reels URLs: instagram.com/reels/REEL_ID
    /(?:www\.)?instagram\.com\/reels\/([a-zA-Z0-9_-]+)/,
    // Post URLs (can also be reels): instagram.com/p/POST_ID
    /(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)/,
    // Short URLs: instagr.am/reel/REEL_ID
    /instagr\.am\/reel\/([a-zA-Z0-9_-]+)/,
    // Short URLs: instagr.am/p/POST_ID
    /instagr\.am\/p\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      // Remove trailing slash if present
      return match[1].replace(/\/$/, '');
    }
  }

  // If URL is just the reel ID (alphanumeric, typically 11 characters but can vary)
  if (/^[a-zA-Z0-9_-]{10,15}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

/**
 * Validates if a string is a valid Instagram reel URL
 *
 * @param url - The URL to validate
 * @returns True if valid Instagram reel URL
 */
export function isValidInstagramReelUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  const cleanUrl = url.trim().toLowerCase();

  // Must be an Instagram URL
  const isInstagramUrl =
    cleanUrl.includes('instagram.com/reel/') ||
    cleanUrl.includes('instagram.com/reels/') ||
    cleanUrl.includes('instagram.com/p/') ||
    cleanUrl.includes('instagr.am/reel/') ||
    cleanUrl.includes('instagr.am/p/');

  if (!isInstagramUrl) return false;

  // Must have a valid reel ID
  return extractInstagramReelId(url) !== null;
}

/**
 * Generates an embed URL for Instagram reel
 * Instagram uses oEmbed for embedding reels
 *
 * @param url - The Instagram URL or reel ID
 * @returns The embed URL or null if invalid
 */
export function getInstagramEmbedUrl(url: string | null | undefined): string | null {
  const reelId = extractInstagramReelId(url);
  if (!reelId) return null;

  // Instagram embeds use the direct post/reel URL
  return `https://www.instagram.com/reel/${reelId}/embed/`;
}

/**
 * Generates the canonical Instagram reel URL
 *
 * @param url - The Instagram URL or reel ID
 * @returns The canonical URL or null if invalid
 */
export function getInstagramReelUrl(url: string | null | undefined): string | null {
  const reelId = extractInstagramReelId(url);
  if (!reelId) return null;

  return `https://www.instagram.com/reel/${reelId}/`;
}

/**
 * Normalizes an Instagram reel URL to a consistent format
 * Useful for storing in database
 *
 * @param url - The Instagram URL to normalize
 * @returns The normalized URL or null if invalid
 */
export function normalizeInstagramReelUrl(url: string | null | undefined): string | null {
  return getInstagramReelUrl(url);
}
