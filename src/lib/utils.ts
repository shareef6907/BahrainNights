import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cached regex patterns for coordinate extraction (prevents recreation on each call)
const COORD_PATTERNS = {
  // Pattern 1: /@lat,lng,zoom format (most common in place URLs)
  at: /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
  // Pattern 2: ?q=lat,lng or &q=lat,lng format
  q: /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
  // Pattern 3: query=lat,lng format (API style)
  query: /[?&]query=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
  // Pattern 4: ll=lat,lng format
  ll: /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
  // Pattern 5: destination=lat,lng format (directions)
  destination: /[?&]destination=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
} as const;

/**
 * Extract latitude and longitude coordinates from a Google Maps URL
 * Supports various formats:
 * - https://www.google.com/maps/place/.../@26.2285,50.5860,17z/...
 * - https://maps.google.com/?q=26.2285,50.5860
 * - https://www.google.com/maps?q=26.2285,50.5860
 * - https://www.google.com/maps/search/?api=1&query=26.2285,50.5860
 * - https://maps.app.goo.gl/... (returns null - shortened URLs need server-side resolution)
 * - https://goo.gl/maps/... (returns null - shortened URLs need server-side resolution)
 */
export function extractCoordinatesFromGoogleMapsUrl(url: string): { latitude: number; longitude: number } | null {
  if (!url) return null;

  try {
    // Try each pattern in order of likelihood
    for (const pattern of Object.values(COORD_PATTERNS)) {
      const match = url.match(pattern);
      if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        if (isValidCoordinate(latitude, longitude)) {
          return { latitude, longitude };
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Validate that coordinates are within valid ranges
 * Latitude: -90 to 90
 * Longitude: -180 to 180
 */
function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}
