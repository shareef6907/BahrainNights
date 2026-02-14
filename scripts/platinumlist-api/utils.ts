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

// Country detection configuration
export interface CountryConfig {
  name: string;
  code: string;
  currency: string;
  timezone: string;
  urlPatterns: string[];
  cities: string[];
}

export const COUNTRY_CONFIGS: CountryConfig[] = [
  {
    name: 'Bahrain',
    code: 'BH',
    currency: 'BHD',
    timezone: 'Asia/Bahrain',
    urlPatterns: ['manama.platinumlist.net', 'bahrain.platinumlist.net'],
    cities: ['Manama', 'Muharraq', 'Riffa', 'Hamad Town', 'Isa Town', 'Sitra', 'Budaiya', 'Juffair', 'Seef', 'Amwaj Islands']
  },
  {
    name: 'UAE',
    code: 'AE',
    currency: 'AED',
    timezone: 'Asia/Dubai',
    urlPatterns: ['dubai.platinumlist.net', 'abudhabi.platinumlist.net', 'uae.platinumlist.net'],
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    urlPatterns: ['riyadh.platinumlist.net', 'jeddah.platinumlist.net', 'saudi.platinumlist.net', 'ksa.platinumlist.net'],
    cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Dhahran', 'Tabuk', 'Abha', 'Taif', 'AlUla']
  },
  {
    name: 'Qatar',
    code: 'QA',
    currency: 'QAR',
    timezone: 'Asia/Qatar',
    urlPatterns: ['doha.platinumlist.net', 'qatar.platinumlist.net'],
    cities: ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail', 'The Pearl']
  },
  {
    name: 'Kuwait',
    code: 'KW',
    currency: 'KWD',
    timezone: 'Asia/Kuwait',
    urlPatterns: ['kuwait.platinumlist.net', 'kuwaitcity.platinumlist.net'],
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Fahaheel', 'Jahra']
  },
  {
    name: 'Oman',
    code: 'OM',
    currency: 'OMR',
    timezone: 'Asia/Muscat',
    urlPatterns: ['muscat.platinumlist.net', 'oman.platinumlist.net'],
    cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur']
  },
  {
    name: 'Jordan',
    code: 'JO',
    currency: 'JOD',
    timezone: 'Asia/Amman',
    urlPatterns: ['amman.platinumlist.net', 'jordan.platinumlist.net'],
    cities: ['Amman', 'Aqaba', 'Petra', 'Irbid', 'Dead Sea']
  },
  {
    name: 'Lebanon',
    code: 'LB',
    currency: 'LBP',
    timezone: 'Asia/Beirut',
    urlPatterns: ['beirut.platinumlist.net', 'lebanon.platinumlist.net'],
    cities: ['Beirut', 'Byblos', 'Baalbek', 'Tripoli', 'Sidon']
  },
  {
    name: 'Egypt',
    code: 'EG',
    currency: 'EGP',
    timezone: 'Africa/Cairo',
    urlPatterns: ['cairo.platinumlist.net', 'egypt.platinumlist.net'],
    cities: ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Luxor', 'Aswan', 'El Gouna']
  },
  {
    name: 'Morocco',
    code: 'MA',
    currency: 'MAD',
    timezone: 'Africa/Casablanca',
    urlPatterns: ['morocco.platinumlist.net', 'casablanca.platinumlist.net', 'marrakech.platinumlist.net'],
    cities: ['Casablanca', 'Marrakech', 'Rabat', 'Fes', 'Tangier', 'Agadir']
  },
  {
    name: 'Türkiye',
    code: 'TR',
    currency: 'TRY',
    timezone: 'Europe/Istanbul',
    urlPatterns: ['istanbul.platinumlist.net', 'turkey.platinumlist.net', 'turkiye.platinumlist.net'],
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bodrum', 'Cappadocia']
  },
  {
    name: 'UK',
    code: 'GB',
    currency: 'GBP',
    timezone: 'Europe/London',
    urlPatterns: ['london.platinumlist.net', 'uk.platinumlist.net'],
    cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh', 'Glasgow', 'Bristol']
  },
  {
    name: 'India',
    code: 'IN',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    urlPatterns: ['india.platinumlist.net', 'mumbai.platinumlist.net', 'delhi.platinumlist.net'],
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Goa']
  },
  {
    name: 'Pakistan',
    code: 'PK',
    currency: 'PKR',
    timezone: 'Asia/Karachi',
    urlPatterns: ['pakistan.platinumlist.net', 'karachi.platinumlist.net', 'lahore.platinumlist.net'],
    cities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad']
  },
  {
    name: 'Singapore',
    code: 'SG',
    currency: 'SGD',
    timezone: 'Asia/Singapore',
    urlPatterns: ['singapore.platinumlist.net'],
    cities: ['Singapore', 'Marina Bay', 'Sentosa']
  },
  {
    name: 'Malaysia',
    code: 'MY',
    currency: 'MYR',
    timezone: 'Asia/Kuala_Lumpur',
    urlPatterns: ['malaysia.platinumlist.net', 'kualalumpur.platinumlist.net'],
    cities: ['Kuala Lumpur', 'Penang', 'Langkawi', 'Johor Bahru', 'Malacca']
  },
  {
    name: 'Thailand',
    code: 'TH',
    currency: 'THB',
    timezone: 'Asia/Bangkok',
    urlPatterns: ['thailand.platinumlist.net', 'bangkok.platinumlist.net'],
    cities: ['Bangkok', 'Pattaya', 'Phuket', 'Chiang Mai', 'Koh Samui']
  },
  {
    name: 'Indonesia',
    code: 'ID',
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
    urlPatterns: ['indonesia.platinumlist.net', 'jakarta.platinumlist.net', 'bali.platinumlist.net'],
    cities: ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Yogyakarta']
  },
  {
    name: 'Philippines',
    code: 'PH',
    currency: 'PHP',
    timezone: 'Asia/Manila',
    urlPatterns: ['philippines.platinumlist.net', 'manila.platinumlist.net'],
    cities: ['Manila', 'Cebu', 'Davao', 'Boracay', 'Palawan']
  },
  {
    name: 'South Africa',
    code: 'ZA',
    currency: 'ZAR',
    timezone: 'Africa/Johannesburg',
    urlPatterns: ['southafrica.platinumlist.net', 'johannesburg.platinumlist.net', 'capetown.platinumlist.net'],
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth']
  },
  {
    name: 'Nigeria',
    code: 'NG',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    urlPatterns: ['nigeria.platinumlist.net', 'lagos.platinumlist.net'],
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano']
  },
  {
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    timezone: 'Europe/Berlin',
    urlPatterns: ['germany.platinumlist.net', 'berlin.platinumlist.net'],
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Düsseldorf']
  },
  {
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    timezone: 'Europe/Paris',
    urlPatterns: ['france.platinumlist.net', 'paris.platinumlist.net'],
    cities: ['Paris', 'Nice', 'Lyon', 'Marseille', 'Cannes', 'Monaco']
  },
  {
    name: 'Spain',
    code: 'ES',
    currency: 'EUR',
    timezone: 'Europe/Madrid',
    urlPatterns: ['spain.platinumlist.net', 'madrid.platinumlist.net', 'barcelona.platinumlist.net'],
    cities: ['Madrid', 'Barcelona', 'Ibiza', 'Valencia', 'Seville', 'Marbella']
  },
  {
    name: 'Italy',
    code: 'IT',
    currency: 'EUR',
    timezone: 'Europe/Rome',
    urlPatterns: ['italy.platinumlist.net', 'rome.platinumlist.net', 'milan.platinumlist.net'],
    cities: ['Rome', 'Milan', 'Venice', 'Florence', 'Naples', 'Sardinia']
  },
  {
    name: 'Greece',
    code: 'GR',
    currency: 'EUR',
    timezone: 'Europe/Athens',
    urlPatterns: ['greece.platinumlist.net', 'athens.platinumlist.net', 'mykonos.platinumlist.net'],
    cities: ['Athens', 'Mykonos', 'Santorini', 'Thessaloniki', 'Rhodes', 'Crete']
  },
  {
    name: 'Cyprus',
    code: 'CY',
    currency: 'EUR',
    timezone: 'Asia/Nicosia',
    urlPatterns: ['cyprus.platinumlist.net', 'nicosia.platinumlist.net', 'limassol.platinumlist.net'],
    cities: ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Ayia Napa']
  },
  {
    name: 'USA',
    code: 'US',
    currency: 'USD',
    timezone: 'America/New_York',
    urlPatterns: ['usa.platinumlist.net', 'newyork.platinumlist.net', 'miami.platinumlist.net', 'lasvegas.platinumlist.net'],
    cities: ['New York', 'Los Angeles', 'Miami', 'Las Vegas', 'Chicago', 'Houston', 'San Francisco']
  }
];

/**
 * Detect country from event data
 */
export function detectCountry(event: {
  url?: string;
  timezone?: string;
  price?: { data?: { currency?: string } };
}): CountryConfig | null {
  const url = event.url?.toLowerCase() || '';
  const timezone = event.timezone || '';
  const currency = event.price?.data?.currency || '';

  for (const config of COUNTRY_CONFIGS) {
    // Check URL patterns first (most reliable)
    for (const pattern of config.urlPatterns) {
      if (url.includes(pattern)) {
        return config;
      }
    }

    // Check timezone
    if (timezone === config.timezone) {
      return config;
    }

    // Check currency
    if (currency === config.currency) {
      return config;
    }
  }

  return null;
}

/**
 * Check if an event/attraction is from Bahrain
 */
export function isBahrainEvent(event: {
  url?: string;
  timezone?: string;
  price?: { data?: { currency?: string } };
}): boolean {
  const country = detectCountry(event);
  return country?.name === 'Bahrain';
}

/**
 * Check if an event is from a supported international country (not Bahrain)
 */
export function isInternationalEvent(event: {
  url?: string;
  timezone?: string;
  price?: { data?: { currency?: string } };
}): boolean {
  const country = detectCountry(event);
  return country !== null && country.name !== 'Bahrain';
}

/**
 * Get list of supported international countries (excluding Bahrain)
 */
export function getInternationalCountries(): string[] {
  return COUNTRY_CONFIGS.filter(c => c.name !== 'Bahrain').map(c => c.name);
}

/**
 * Extract city from event name or description
 */
export function extractCity(eventName: string, country: CountryConfig): string | null {
  const text = eventName.toLowerCase();

  for (const city of country.cities) {
    if (text.includes(city.toLowerCase())) {
      return city;
    }
  }

  // Default to first city (usually capital/major city)
  return country.cities[0] || null;
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

/**
 * Extract venue name from Platinumlist image URL
 * Image URLs follow pattern: {event_slug}_{YYYY}_{mon}_{DD}_{venue_slug}_{ID}-size.ext
 * Example: wicked_the_musical_in_bahrain_2026_jan_13_2026_jan_17_bahrain_national_theatre_103422-full-en1764321001.jpg
 */
export function extractVenueFromImageUrl(imageUrl: string | null, eventId: number): string | null {
  if (!imageUrl) return null;

  try {
    // Get just the filename from URL
    const filename = imageUrl.split('/').pop() || '';

    // Remove the suffix after first hyphen (e.g., -full-en1764321001.jpg)
    const baseName = filename.split('-')[0];

    // Split by underscore
    const parts = baseName.split('_');

    // Find the index of the event ID
    const idStr = String(eventId);
    const idIndex = parts.lastIndexOf(idStr);

    if (idIndex === -1 || idIndex < 5) return null;

    // Find the date pattern (year_mon_day)
    // Look for patterns like 2026_jan_13 or 2025_dec_31
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    let lastDateEndIndex = -1;

    for (let i = 0; i < parts.length - 3; i++) {
      // Check for year_month_day pattern
      const isYear = /^20\d{2}$/.test(parts[i]);
      const isMonth = months.includes(parts[i + 1]?.toLowerCase());
      const isDay = /^\d{1,2}$/.test(parts[i + 2]);

      if (isYear && isMonth && isDay) {
        lastDateEndIndex = i + 3; // Position after the date
        // Continue searching in case there's a date range (start and end dates)
      }
    }

    if (lastDateEndIndex === -1 || lastDateEndIndex >= idIndex) return null;

    // Extract venue parts (everything between last date and ID)
    const venueParts = parts.slice(lastDateEndIndex, idIndex);

    if (venueParts.length === 0) return null;

    // Convert to readable venue name
    const venueName = venueParts
      .join(' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    return venueName || null;
  } catch {
    return null;
  }
}
