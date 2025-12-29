/**
 * Scraper Configuration
 * Centralized configuration for all event scrapers
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface ScraperConfig {
  delays: {
    betweenRequests: number;
    betweenPages: number;
    betweenSources: number;
    randomVariation: number;
  };
  userAgent: string;
  headers: Record<string, string>;
  maxRetries: number;
  timeout: number;
  retryDelays: number[];
  preferredHour: number;
  runInterval: number;
  cacheHours: number;
  maxEventsPerSource: number;
  maxDetailPages: number;
  logLevel: LogLevel;
  sources: {
    bahrainCalendar: { enabled: boolean; baseUrl: string; calendarPath: string; respectRobots: boolean };
    platinumlistEvents: { enabled: boolean; baseUrl: string; eventsPath: string; respectRobots: boolean };
    platinumlistAttractions: { enabled: boolean; baseUrl: string; attractionsPath: string; respectRobots: boolean };
    aldana: { enabled: boolean; baseUrl: string; respectRobots: boolean };
  };
}

export const SCRAPER_CONFIG: ScraperConfig = {
  // Rate limiting
  delays: {
    betweenRequests: 3000,    // 3 seconds between requests
    betweenPages: 5000,       // 5 seconds between page navigations
    betweenSources: 10000,    // 10 seconds between different sources
    randomVariation: 2000,    // 0-2 seconds random variation
  },

  // Bot identification
  userAgent: 'BahrainNightsBot/1.0 (+https://bahrainnights.com/bot-info; events aggregator)',

  // Browser-like headers
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
  },

  // Retry settings
  maxRetries: 3,
  timeout: 30000,             // 30 seconds
  retryDelays: [1000, 3000, 5000],  // Exponential backoff delays

  // Schedule preference (for GitHub Action cron)
  preferredHour: 3,           // 3 AM Bahrain time (off-peak)
  runInterval: 6,             // Every 6 hours

  // Cache settings
  cacheHours: 6,              // Don't re-scrape same event within 6 hours

  // Scraper limits
  maxEventsPerSource: 50,     // Maximum events to scrape from one source
  maxDetailPages: 25,         // Maximum detail pages to scrape per source

  // Logging
  logLevel: 'info',           // 'debug' | 'info' | 'warn' | 'error'

  // Source-specific settings
  sources: {
    bahrainCalendar: {
      enabled: true,
      baseUrl: 'https://www.bahrain.com',
      calendarPath: '/en/bahrain-calendar',
      respectRobots: true,
    },
    platinumlistEvents: {
      enabled: true,
      baseUrl: 'https://manama.platinumlist.net',
      eventsPath: '/event-list',
      respectRobots: true,
    },
    platinumlistAttractions: {
      enabled: true,
      baseUrl: 'https://manama.platinumlist.net',
      attractionsPath: '/attraction/attractions',
      respectRobots: true,
    },
    aldana: {
      enabled: true,
      baseUrl: 'https://www.beyonaldana.com.bh',
      respectRobots: true,
    },
  },
};

// Type for source keys
export type SourceKey = keyof typeof SCRAPER_CONFIG.sources;

// Helper to get full URL for a source
export function getSourceUrl(source: SourceKey, path?: string): string {
  const config = SCRAPER_CONFIG.sources[source];
  const basePath = 'calendarPath' in config ? config.calendarPath :
                   'eventsPath' in config ? config.eventsPath :
                   'attractionsPath' in config ? config.attractionsPath : '';
  return `${config.baseUrl}${path || basePath}`;
}

// Check if source is enabled
export function isSourceEnabled(source: SourceKey): boolean {
  return SCRAPER_CONFIG.sources[source].enabled;
}
