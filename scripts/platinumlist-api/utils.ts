import { EVENT_CATEGORY_MAP, ATTRACTION_CATEGORY_MAP } from './types.js';

// Platinumlist API Configuration
export const PLATINUMLIST_API_BASE = 'https://api.platinumlist.net/v/7';
export const PLATINUMLIST_API_KEY = 'd4787139-72b0-468c-a691-42deea0e8400';
export const AFFILIATE_REF = 'yjg3yzi';

/**
 * Generate affiliate URL for Platinumlist
 */
export function generateAffiliateUrl(originalUrl: string): string {
  const encodedUrl = encodeURIComponent(originalUrl);
  return `https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=${encodedUrl}`;
}

/**
 * Generate URL-safe slug from title
 */
export function generateSlug(title: string, id: number | string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `${baseSlug}-${id}`;
}

/**
 * Map Platinumlist category to our event categories
 */
export function mapEventCategory(platinumlistCategory: string): string {
  const normalized = platinumlistCategory.toLowerCase().trim();
  return EVENT_CATEGORY_MAP[normalized] || 'events';
}

/**
 * Map Platinumlist category to our attraction categories
 */
export function mapAttractionCategory(platinumlistCategory: string): string {
  const normalized = platinumlistCategory.toLowerCase().trim();
  return ATTRACTION_CATEGORY_MAP[normalized] || 'attractions';
}

/**
 * Parse date string to ISO format
 */
export function parseDate(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

/**
 * Parse time string to HH:MM format
 */
export function parseTime(timeStr: string | null | undefined): string | null {
  if (!timeStr) return null;
  try {
    // Handle various time formats
    const match = timeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (match) {
      const hours = match[1].padStart(2, '0');
      const minutes = match[2];
      return `${hours}:${minutes}`;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Clean and truncate description
 */
export function cleanDescription(desc: string | null | undefined): string | null {
  if (!desc) return null;
  // Remove HTML tags
  let cleaned = desc.replace(/<[^>]*>/g, '');
  // Decode HTML entities
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned || null;
}

/**
 * Get best available image URL
 */
export function getBestImage(images: { thumbnail?: string; poster?: string; cover?: string } | null | undefined): string | null {
  if (!images) return null;
  return images.poster || images.cover || images.thumbnail || null;
}

/**
 * Get cover image URL
 */
export function getCoverImage(images: { thumbnail?: string; poster?: string; cover?: string } | null | undefined): string | null {
  if (!images) return null;
  return images.cover || images.poster || null;
}

/**
 * Fetch from Platinumlist API with error handling
 * Uses Api-Key header and affiliate scope as per docs
 */
export async function fetchFromPlatinumlist<T>(endpoint: string, includePrice: boolean = true): Promise<T | null> {
  // Build URL with required scope parameter
  const separator = endpoint.includes('?') ? '&' : '?';
  const scopeParam = 'scope=affiliate.show.events';
  const includeParam = includePrice ? '&include=price' : '';
  const url = `${PLATINUMLIST_API_BASE}${endpoint}${separator}${scopeParam}${includeParam}`;

  try {
    console.log(`Fetching: ${url}`);

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Api-Key': PLATINUMLIST_API_KEY,
    };

    // Add price_scope header to get actual prices
    if (includePrice) {
      headers['price_scope'] = 'price';
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(`Response body: ${text.substring(0, 500)}`);
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if an event/attraction is from Bahrain
 */
export function isBahrainEvent(event: {
  url?: string;
  timezone?: string;
  price?: { data?: { currency?: string } };
}): boolean {
  // Check URL for Bahrain-specific subdomains
  if (event.url) {
    const url = event.url.toLowerCase();
    if (url.includes('manama.platinumlist.net') ||
        url.includes('bahrain.platinumlist.net')) {
      return true;
    }
  }

  // Check timezone
  if (event.timezone === 'Asia/Bahrain') {
    return true;
  }

  // Check currency (BHD = Bahraini Dinar)
  if (event.price?.data?.currency === 'BHD') {
    return true;
  }

  return false;
}

/**
 * Log with timestamp
 */
export function log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info'): void {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warn: '⚠️',
  }[type];
  console.log(`[${timestamp}] ${prefix} ${message}`);
}
