export interface ScrapedEvent {
  title: string;
  description: string | null;
  price: number | null;
  priceCurrency: string;
  imageUrl: string | null;
  coverUrl: string | null;
  venue: string | null;
  location: string | null;
  category: string;
  originalUrl: string;
  affiliateUrl: string;
  externalId: string | null;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
}

export interface EventsScraperConfig {
  affiliateCode: string;
  baseUrl: string;
  usdToBhdRate: number;
  delayMs: number;
  maxRetries: number;
}

export interface EventsScraperResult {
  success: boolean;
  totalScraped: number;
  totalUpserted: number;
  totalDeactivated: number;
  errors: string[];
  duration: number;
}

// Category mapping from Platinumlist URL to BahrainNights categories
export const EVENT_CATEGORY_MAP: Record<string, string> = {
  'concerts': 'concerts',
  'nightlife': 'nightlife',
  'comedy': 'comedy',
  'theatre': 'cultural',
  'theater': 'cultural',
  'festivals': 'cultural',
  'sports': 'sports',
  'events': 'events',
} as const;

// Keywords for additional category detection
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  concerts: ['concert', 'live music', 'singer', 'band', 'performance', 'gig', 'tour'],
  nightlife: ['night', 'club', 'dj', 'party', 'lounge', 'bar', 'dance'],
  comedy: ['comedy', 'stand-up', 'standup', 'comedian', 'funny', 'laugh', 'humour', 'humor'],
  cultural: ['theatre', 'theater', 'musical', 'opera', 'ballet', 'play', 'festival', 'art', 'exhibition', 'drama'],
  sports: ['sports', 'match', 'championship', 'tournament', 'race', 'grand prix', 'f1', 'formula', 'football', 'soccer', 'cricket', 'tennis', 'golf'],
  family: ['family', 'kids', 'children', 'circus', 'magic show', 'disney', 'cartoon'],
};
