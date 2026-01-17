/**
 * Blog System Types for BahrainNights.com
 */

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  country: string;
  city: string | null;
  category: string | null;
  tags: string[] | null;
  event_id: string | null;
  venue_id: string | null;
  featured_image: string | null;
  images: string[] | null;
  article_type: 'event' | 'cornerstone' | 'guide' | 'performer' | 'venue';
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  view_count: number;
  read_time_minutes: number;
  created_at: string;
  updated_at: string;
  published_at: string;
  // Event-specific fields for modal display
  event_date: string | null;
  event_end_date: string | null;
  event_venue: string | null;
  affiliate_url: string | null;
}

export interface BlogEventTracker {
  id: string;
  event_id: string;
  article_id: string;
  created_at: string;
}

export interface BlogVenueTracker {
  id: string;
  venue_id: string;
  article_id: string;
  created_at: string;
}

export interface GeneratedBlogArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  tags: string[];
  read_time_minutes: number;
}

export interface LocationData {
  name: string;
  flag: string;
  cities: string[];
  description?: string;
}

export const LOCATION_DATA: Record<string, LocationData> = {
  'bahrain': {
    name: 'Bahrain',
    flag: '🇧🇭',
    cities: ['Manama', 'Muharraq', 'Riffa', 'Seef', 'Juffair', 'Amwaj'],
    description: 'The Kingdom of Bahrain, a pearl of the Arabian Gulf, offers an incredible mix of modern entertainment and rich cultural heritage.'
  },
  'uae': {
    name: 'UAE',
    flag: '🇦🇪',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
    description: 'The United Arab Emirates brings together luxury, innovation, and world-class entertainment across its stunning cities.'
  },
  'saudi-arabia': {
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Al Khobar', 'Mecca', 'Medina'],
    description: 'Saudi Arabia is rapidly transforming into a global entertainment destination with Vision 2030 bringing world-class events and experiences.'
  },
  'qatar': {
    name: 'Qatar',
    flag: '🇶🇦',
    cities: ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail'],
    description: 'Qatar, host of the FIFA World Cup 2022, continues to shine as a premier destination for sports, culture, and entertainment.'
  },
  'uk': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Liverpool', 'Glasgow'],
    description: 'The United Kingdom offers legendary music venues, world-famous theaters, and an unmatched nightlife scene across its historic cities.'
  }
};
