/**
 * YouTube URL Parser Utility
 * Extracts video ID from various YouTube URL formats
 */

/**
 * Extracts YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 *
 * @param url - The YouTube URL to parse
 * @returns The video ID or null if not found
 */
export function extractYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;

  // Clean the URL
  const cleanUrl = url.trim();

  // Various regex patterns for different YouTube URL formats
  const patterns = [
    // Standard watch URLs: youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?.*v=|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Short URLs: youtu.be/VIDEO_ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URLs: youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // Old embed URLs: youtube.com/v/VIDEO_ID
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    // Shorts URLs: youtube.com/shorts/VIDEO_ID
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If URL is just the video ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

/**
 * Validates if a string is a valid YouTube URL or video ID
 *
 * @param url - The URL or video ID to validate
 * @returns True if valid YouTube URL or video ID
 */
export function isValidYouTubeUrl(url: string | null | undefined): boolean {
  return extractYouTubeVideoId(url) !== null;
}

/**
 * Generates an embed URL for YouTube video
 *
 * @param url - The YouTube URL or video ID
 * @param options - Embed options
 * @returns The embed URL or null if invalid
 */
export function getYouTubeEmbedUrl(
  url: string | null | undefined,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    controls?: boolean;
    modestbranding?: boolean;
    rel?: boolean;
  } = {}
): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  const {
    autoplay = false,
    mute = false,
    loop = false,
    controls = true,
    modestbranding = true,
    rel = false,
  } = options;

  const params = new URLSearchParams();

  if (autoplay) params.set('autoplay', '1');
  if (mute) params.set('mute', '1');
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId); // Required for loop to work
  }
  if (!controls) params.set('controls', '0');
  if (modestbranding) params.set('modestbranding', '1');
  if (!rel) params.set('rel', '0');

  const queryString = params.toString();
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Generates a thumbnail URL for YouTube video
 *
 * @param url - The YouTube URL or video ID
 * @param quality - Thumbnail quality (default, medium, high, maxres)
 * @returns The thumbnail URL or null if invalid
 */
export function getYouTubeThumbnailUrl(
  url: string | null | undefined,
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'
): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}
