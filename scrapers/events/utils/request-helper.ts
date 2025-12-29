/**
 * Request Helper with Rate Limiting
 * Provides controlled, respectful scraping with delays and retries
 */

import { SCRAPER_CONFIG } from '../config';

// Track last request time per domain
const lastRequestTime: Map<string, number> = new Map();

/**
 * Get a random delay with variation
 */
export function getRandomDelay(baseDelay: number, variation: number = SCRAPER_CONFIG.delays.randomVariation): number {
  return baseDelay + Math.floor(Math.random() * variation);
}

/**
 * Sleep for a specified duration
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait with rate limiting based on domain
 * Ensures we don't hit the same domain too frequently
 */
export async function rateLimitedDelay(domain: string, delayType: 'request' | 'page' | 'source' = 'request'): Promise<void> {
  const now = Date.now();
  const lastRequest = lastRequestTime.get(domain) || 0;

  // Determine base delay
  let baseDelay: number;
  switch (delayType) {
    case 'page':
      baseDelay = SCRAPER_CONFIG.delays.betweenPages;
      break;
    case 'source':
      baseDelay = SCRAPER_CONFIG.delays.betweenSources;
      break;
    case 'request':
    default:
      baseDelay = SCRAPER_CONFIG.delays.betweenRequests;
  }

  // Calculate required wait time
  const timeSinceLastRequest = now - lastRequest;
  const requiredDelay = getRandomDelay(baseDelay);

  if (timeSinceLastRequest < requiredDelay) {
    const waitTime = requiredDelay - timeSinceLastRequest;
    console.log(`[RateLimit] Waiting ${(waitTime / 1000).toFixed(1)}s before next request to ${domain}`);
    await sleep(waitTime);
  }

  // Update last request time
  lastRequestTime.set(domain, Date.now());
}

/**
 * Extract domain from URL
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
}

/**
 * Fetch with retry and exponential backoff
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = SCRAPER_CONFIG.maxRetries
): Promise<Response> {
  const domain = getDomain(url);
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Rate limit before request
      if (attempt === 0) {
        await rateLimitedDelay(domain, 'request');
      }

      // Set timeout using AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), SCRAPER_CONFIG.timeout);

      // Add headers
      const headers = {
        'User-Agent': SCRAPER_CONFIG.userAgent,
        ...SCRAPER_CONFIG.headers,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      if (attempt < retries) {
        const retryDelay = SCRAPER_CONFIG.retryDelays[attempt] || SCRAPER_CONFIG.retryDelays[SCRAPER_CONFIG.retryDelays.length - 1];
        console.log(`[Retry] Attempt ${attempt + 1}/${retries} failed for ${url}: ${lastError.message}`);
        console.log(`[Retry] Waiting ${retryDelay / 1000}s before retry...`);
        await sleep(retryDelay);
      }
    }
  }

  throw new Error(`Failed after ${retries} retries: ${lastError?.message}`);
}

/**
 * Download image with retry
 */
export async function downloadImageWithRetry(
  url: string,
  retries: number = SCRAPER_CONFIG.maxRetries
): Promise<Buffer> {
  const response = await fetchWithRetry(url, {}, retries);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Logger utility for consistent scraper output
 */
export const scraperLog = {
  info: (source: string, message: string) => {
    console.log(`[${source}] ${message}`);
  },

  success: (source: string, message: string) => {
    console.log(`[${source}] ✓ ${message}`);
  },

  error: (source: string, message: string) => {
    console.error(`[${source}] ✗ ${message}`);
  },

  warn: (source: string, message: string) => {
    console.warn(`[${source}] ⚠ ${message}`);
  },

  debug: (source: string, message: string) => {
    if (SCRAPER_CONFIG.logLevel === 'debug') {
      console.log(`[${source}] [DEBUG] ${message}`);
    }
  },

  summary: (source: string, stats: { scraped: number; failed: number; skipped: number }) => {
    console.log(`\n[${source}] Summary:`);
    console.log(`  ✓ Scraped: ${stats.scraped} events`);
    console.log(`  ✗ Failed: ${stats.failed} events`);
    console.log(`  ⏭ Skipped: ${stats.skipped} duplicates`);
    console.log('');
  },
};

/**
 * Scraper statistics tracker
 */
export class ScraperStats {
  private stats: Map<string, { scraped: number; failed: number; skipped: number }> = new Map();

  constructor() {}

  getStats(source: string) {
    if (!this.stats.has(source)) {
      this.stats.set(source, { scraped: 0, failed: 0, skipped: 0 });
    }
    return this.stats.get(source)!;
  }

  recordSuccess(source: string) {
    const stats = this.getStats(source);
    stats.scraped++;
  }

  recordFailure(source: string) {
    const stats = this.getStats(source);
    stats.failed++;
  }

  recordSkip(source: string) {
    const stats = this.getStats(source);
    stats.skipped++;
  }

  printSummary(source: string) {
    const stats = this.getStats(source);
    scraperLog.summary(source, stats);
  }

  printAllSummaries() {
    console.log('\n' + '═'.repeat(60));
    console.log('                    SCRAPER SUMMARY');
    console.log('═'.repeat(60));

    let totalScraped = 0;
    let totalFailed = 0;
    let totalSkipped = 0;

    for (const [source, stats] of this.stats) {
      console.log(`\n${source}:`);
      console.log(`  ✓ Scraped: ${stats.scraped}`);
      console.log(`  ✗ Failed: ${stats.failed}`);
      console.log(`  ⏭ Skipped: ${stats.skipped}`);

      totalScraped += stats.scraped;
      totalFailed += stats.failed;
      totalSkipped += stats.skipped;
    }

    console.log('\n' + '─'.repeat(60));
    console.log('TOTALS:');
    console.log(`  ✓ Total Scraped: ${totalScraped}`);
    console.log(`  ✗ Total Failed: ${totalFailed}`);
    console.log(`  ⏭ Total Skipped: ${totalSkipped}`);
    console.log('═'.repeat(60) + '\n');
  }
}
