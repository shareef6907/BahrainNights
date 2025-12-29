/**
 * Shared types for event scrapers
 */

// Raw scraped event from any source
export interface ScrapedEvent {
  title: string;
  description: string;
  date: string;           // YYYY-MM-DD format
  time?: string;          // HH:MM format (24hr)
  end_date?: string;      // YYYY-MM-DD format
  end_time?: string;      // HH:MM format
  venue_name: string;
  venue_address?: string;
  price?: string;         // Free text like "BD 10" or "Free" or "From BD 25"
  category: string;       // Will be normalized by categorizer
  image_url?: string;     // Original image URL from source
  booking_url?: string;   // Link to buy tickets
  source_url: string;     // URL we scraped this from
  source_name: string;    // e.g., 'bahrain-calendar', 'platinumlist', 'aldana'
  source_event_id: string; // Unique ID from source for deduplication
}

// Event as stored in database
export interface DatabaseEvent {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;           // Stored as 'date' column in DB
  time?: string;
  end_date?: string;
  end_time?: string;
  venue_name: string;
  venue_address?: string;
  price?: string;
  cover_url?: string;     // S3 URL after processing
  image_url?: string;     // Original or processed URL
  booking_url?: string;
  source_url?: string;
  source_name?: string;
  source_event_id?: string;
  last_scraped_at?: string;
  status: 'pending' | 'published' | 'draft' | 'rejected';
  is_featured?: boolean;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
}

// AI rewriter output
export interface RewrittenContent {
  title: string;
  description: string;
  category: string;
}

// Scraper result
export interface ScraperResult {
  source: string;
  events: ScrapedEvent[];
  errors: string[];
  duration_ms: number;
}

// Event categories matching our database
export const EVENT_CATEGORIES = [
  'dining',
  'family',
  'arts',
  'music',
  'cinema',
  'sports',
  'shopping',
  'business',
  'wellness',
  'special',
  'tours',
  'community',
  'nightlife',
  'other',
] as const;

export type EventCategory = typeof EVENT_CATEGORIES[number];

// Source names for tracking
export const SOURCE_NAMES = {
  BAHRAIN_CALENDAR: 'bahrain-calendar',
  PLATINUMLIST_EVENTS: 'platinumlist-events',
  PLATINUMLIST_ATTRACTIONS: 'platinumlist-attractions',
  ALDANA: 'aldana',
} as const;

export type SourceName = typeof SOURCE_NAMES[keyof typeof SOURCE_NAMES];
