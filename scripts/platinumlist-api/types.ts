// Platinumlist API Response Types (actual structure from API)

export interface PlatinumlistImage {
  src: string;
  width: number;
  height: number;
}

export interface PlatinumlistPrice {
  data: {
    price: number; // -1 means contact for price / sold out
    is_sold_out: boolean;
    currency: string;
  };
}

export interface PlatinumlistEvent {
  id: number;
  name: string;
  description: string;
  text_teaser: string | null;
  start: number; // Unix timestamp
  end: number; // Unix timestamp
  timezone: string;
  image_big: PlatinumlistImage;
  image_medium: PlatinumlistImage;
  image_small: PlatinumlistImage;
  image_full: PlatinumlistImage;
  url: string;
  white_label_url: string | null;
  is_attraction: boolean;
  is_online: boolean;
  status: string; // "on sale", "sold out", etc.
  rating: number;
  price: PlatinumlistPrice;
  has_tickets: boolean;
  has_sales_started: boolean;
  vat: number;
}

export interface PlatinumlistPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    next?: string;
    previous?: string;
  };
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: PlatinumlistPagination;
  };
}

// Database Types (matching actual schema from src/types/database.ts)

export interface DbEvent {
  id?: string;
  title: string;
  slug: string;
  description: string | null;
  description_ar: string | null;
  category: string;
  tags: string[] | null;
  venue_name: string | null;
  date: string;  // Required NOT NULL column
  time: string | null;
  start_date: string | null;
  end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: string | null;  // STRING type in DB, not number
  price_currency: string | null;
  featured_image: string | null;
  cover_url: string | null;
  booking_url: string | null;
  affiliate_url: string | null;
  source_name: string | null;  // DB uses source_name, not source
  source_url: string | null;
  source_event_id: string | null;
  status: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Database Attraction type (matches attractions table schema)
export interface DbAttraction {
  id?: string;
  name: string;
  name_arabic?: string | null;
  slug: string;
  description: string | null;
  description_arabic?: string | null;
  short_description?: string | null;
  image_url: string | null;
  images?: string[] | null;
  video_url?: string | null;
  area: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  google_maps_url?: string | null;
  price_from: number | null;
  price_to?: number | null;
  price_range: string | null;
  currency: string;
  tripadvisor_rating?: number | null;
  tripadvisor_reviews?: number | null;
  tripadvisor_url?: string | null;
  rating?: number | null;
  review_count?: number;
  duration?: string | null;
  best_time?: string | null;
  suitable_for?: string[] | null;
  age_restriction?: string | null;
  accessibility?: string | null;
  tags: string[] | null;
  category: string | null;
  subcategory?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  booking_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order?: number;
  seo_title?: string | null;
  seo_description?: string | null;
  source: string;
  source_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Category mapping for events
export const EVENT_CATEGORY_MAP: Record<string, string> = {
  'concerts': 'concerts',
  'music': 'concerts',
  'live music': 'concerts',
  'comedy': 'comedy',
  'stand-up': 'comedy',
  'nightlife': 'nightlife',
  'club': 'nightlife',
  'party': 'nightlife',
  'sports': 'sports',
  'football': 'sports',
  'cultural': 'cultural',
  'theatre': 'cultural',
  'theater': 'cultural',
  'arts': 'cultural',
  'family': 'family',
  'kids': 'family',
  'children': 'family',
  'events': 'events',
  'exhibition': 'cultural',
  'festival': 'events',
};

// Category mapping for attractions
export const ATTRACTION_CATEGORY_MAP: Record<string, string> = {
  'water sports': 'water-sports',
  'water-sports': 'water-sports',
  'boat': 'boat-tours',
  'boat tour': 'boat-tours',
  'boat tours': 'boat-tours',
  'desert': 'desert-safari',
  'desert safari': 'desert-safari',
  'indoor': 'indoor-activities',
  'indoor activities': 'indoor-activities',
  'tour': 'tours',
  'tours': 'tours',
  'sightseeing': 'sightseeing',
  'theme park': 'theme-parks',
  'theme parks': 'theme-parks',
  'attraction': 'attractions',
  'attractions': 'attractions',
  'family': 'family-kids',
  'kids': 'family-kids',
  'family & kids': 'family-kids',
  'sailing': 'boat-tours',
  'yacht': 'boat-tours',
  'dinner': 'dining',
  'dining': 'dining',
};
