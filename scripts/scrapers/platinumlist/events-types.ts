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
  isSoldOut: boolean;
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

// Keywords for additional category detection (ordered by priority)
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  concerts: [
    'concert', 'live music', 'singer', 'band', 'performance', 'gig', 'tour',
    'live at', 'live in', 'amphitheatre', 'amphitheater',
    // Known artists/bands (will be categorized as concerts)
    'josh groban', 'linkin park', 'calvin harris', 'andre rieu', 'andré rieu',
    'john mayer', 'maroon 5', 'coldplay', 'ed sheeran', 'drake', 'the weeknd',
    'taylor swift', 'beyonce', 'rihanna', 'bruno mars', 'justin bieber',
    'majid al mohandis', 'balti', 'dystinct', 'wailing wailers', 'bob marley',
  ],
  comedy: ['comedy', 'stand-up', 'standup', 'comedian', 'funny', 'laugh', 'humour', 'humor', 'el daheeh', 'imran al aradi'],
  nightlife: ['night', 'club', 'dj', 'party', 'lounge', 'bar', 'dance', 'ava club', 'klub360', 'volto'],
  cultural: ['theatre', 'theater', 'musical', 'opera', 'ballet', 'play', 'festival', 'art', 'exhibition', 'drama', 'wicked', 'the musical', 'dinner show'],
  sports: ['sports', 'match', 'championship', 'tournament', 'race', 'grand prix', 'f1', 'formula', 'football', 'soccer', 'cricket', 'tennis', 'golf', 'pageant'],
  family: ['family', 'kids', 'children', 'circus', 'magic show', 'disney', 'cartoon', 'booga'],
};

// Known artist names that should always be categorized as concerts
export const KNOWN_ARTISTS: string[] = [
  'josh groban', 'linkin park', 'calvin harris', 'andre rieu', 'andré rieu',
  'john mayer', 'maroon 5', 'coldplay', 'ed sheeran', 'drake', 'the weeknd',
  'taylor swift', 'beyonce', 'rihanna', 'bruno mars', 'justin bieber',
  'majid al mohandis', 'balti', 'dystinct', 'masha vincent', 'moii', 'sara',
  'yubik', 'julees', 'mahmoud el lithy',
];
