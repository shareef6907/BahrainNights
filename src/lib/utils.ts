import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    // Pattern 1: /@lat,lng,zoom format (most common in place URLs)
    // Example: https://www.google.com/maps/place/.../@26.2285067,50.5860123,17z/...
    const atPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const atMatch = url.match(atPattern);
    if (atMatch) {
      const latitude = parseFloat(atMatch[1]);
      const longitude = parseFloat(atMatch[2]);
      if (isValidCoordinate(latitude, longitude)) {
        return { latitude, longitude };
      }
    }

    // Pattern 2: ?q=lat,lng or &q=lat,lng format
    // Example: https://maps.google.com/?q=26.2285,50.5860
    const qPattern = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const qMatch = url.match(qPattern);
    if (qMatch) {
      const latitude = parseFloat(qMatch[1]);
      const longitude = parseFloat(qMatch[2]);
      if (isValidCoordinate(latitude, longitude)) {
        return { latitude, longitude };
      }
    }

    // Pattern 3: query=lat,lng format (API style)
    // Example: https://www.google.com/maps/search/?api=1&query=26.2285,50.5860
    const queryPattern = /[?&]query=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const queryMatch = url.match(queryPattern);
    if (queryMatch) {
      const latitude = parseFloat(queryMatch[1]);
      const longitude = parseFloat(queryMatch[2]);
      if (isValidCoordinate(latitude, longitude)) {
        return { latitude, longitude };
      }
    }

    // Pattern 4: ll=lat,lng format
    // Example: https://maps.google.com/?ll=26.2285,50.5860
    const llPattern = /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const llMatch = url.match(llPattern);
    if (llMatch) {
      const latitude = parseFloat(llMatch[1]);
      const longitude = parseFloat(llMatch[2]);
      if (isValidCoordinate(latitude, longitude)) {
        return { latitude, longitude };
      }
    }

    // Pattern 5: destination=lat,lng format (directions)
    // Example: https://www.google.com/maps/dir/?api=1&destination=26.2285,50.5860
    const destPattern = /[?&]destination=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const destMatch = url.match(destPattern);
    if (destMatch) {
      const latitude = parseFloat(destMatch[1]);
      const longitude = parseFloat(destMatch[2]);
      if (isValidCoordinate(latitude, longitude)) {
        return { latitude, longitude };
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
