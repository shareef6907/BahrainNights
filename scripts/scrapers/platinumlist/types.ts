export interface ScrapedExperience {
  title: string;
  description: string | null;
  price: number | null;
  priceCurrency: string;
  imageUrl: string | null;
  venue: string | null;
  location: string | null;
  category: string | null;
  type: 'attraction' | 'tour' | 'event';
  originalUrl: string;
  affiliateUrl: string;
  startDate: string | null;
  endDate: string | null;
}

export interface ScraperConfig {
  affiliateCode: string;
  baseUrl: string;
  usdToBhdRate: number;
  delayMs: number;
  maxRetries: number;
}

export interface ScraperResult {
  success: boolean;
  totalScraped: number;
  totalUpserted: number;
  totalDeactivated: number;
  errors: string[];
  duration: number;
}

export const PLATINUMLIST_CATEGORIES = {
  // Main categories on Platinumlist
  'indoor-activities': 'indoor',
  'water-sports': 'water-sports',
  'sightseeing': 'sightseeing',
  'boat-tour': 'boat-tour',
  'tours': 'tour',
  'attractions': 'attraction',
  'events': 'event',
  'things-to-do': 'attraction',
  'experiences': 'experience',
} as const;

export type PlatinumlistCategory = keyof typeof PLATINUMLIST_CATEGORIES;
