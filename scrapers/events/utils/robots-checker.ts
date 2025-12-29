/**
 * Robots.txt Checker
 * Checks if scraping is allowed by robots.txt before accessing a site
 */

import { SCRAPER_CONFIG } from '../config';
import { scraperLog, sleep } from './request-helper';

interface RobotsRule {
  path: string;
  allowed: boolean;
}

interface RobotsConfig {
  rules: RobotsRule[];
  crawlDelay?: number;
  sitemaps: string[];
  fetchedAt: number;
}

// Cache for robots.txt results
const robotsCache: Map<string, RobotsConfig | null> = new Map();

// Cache duration (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

/**
 * Extract domain from URL
 */
function getDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.hostname}`;
  } catch {
    return url;
  }
}

/**
 * Parse robots.txt content
 */
function parseRobotsTxt(content: string, userAgent: string = '*'): RobotsConfig {
  const lines = content.split('\n').map(line => line.trim());
  const rules: RobotsRule[] = [];
  const sitemaps: string[] = [];
  let crawlDelay: number | undefined;

  let currentUserAgent: string | null = null;
  let isRelevantSection = false;

  for (const line of lines) {
    // Skip comments and empty lines
    if (line.startsWith('#') || line === '') continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const field = line.substring(0, colonIndex).toLowerCase().trim();
    const value = line.substring(colonIndex + 1).trim();

    switch (field) {
      case 'user-agent':
        currentUserAgent = value.toLowerCase();
        // Check if this section applies to our bot
        isRelevantSection =
          currentUserAgent === '*' ||
          currentUserAgent === 'bahrainnightsbot' ||
          userAgent.toLowerCase().includes(currentUserAgent);
        break;

      case 'disallow':
        if (isRelevantSection && value) {
          rules.push({ path: value, allowed: false });
        }
        break;

      case 'allow':
        if (isRelevantSection && value) {
          rules.push({ path: value, allowed: true });
        }
        break;

      case 'crawl-delay':
        if (isRelevantSection) {
          const delay = parseFloat(value);
          if (!isNaN(delay) && delay > 0) {
            crawlDelay = delay * 1000; // Convert to milliseconds
          }
        }
        break;

      case 'sitemap':
        if (value.startsWith('http')) {
          sitemaps.push(value);
        }
        break;
    }
  }

  return {
    rules,
    crawlDelay,
    sitemaps,
    fetchedAt: Date.now(),
  };
}

/**
 * Check if a path matches a robots.txt rule
 */
function pathMatchesRule(path: string, rule: string): boolean {
  // Handle wildcard rules
  if (rule.includes('*')) {
    const regex = new RegExp('^' + rule.replace(/\*/g, '.*').replace(/\?/g, '\\?') + '.*$');
    return regex.test(path);
  }

  // Handle $ (end of URL)
  if (rule.endsWith('$')) {
    return path === rule.slice(0, -1);
  }

  // Standard prefix matching
  return path.startsWith(rule);
}

/**
 * Fetch and parse robots.txt for a domain
 */
async function fetchRobotsTxt(baseUrl: string): Promise<RobotsConfig | null> {
  const robotsUrl = `${baseUrl}/robots.txt`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(robotsUrl, {
      headers: {
        'User-Agent': SCRAPER_CONFIG.userAgent,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // No robots.txt found - assume everything is allowed
      scraperLog.debug('RobotsChecker', `No robots.txt found at ${robotsUrl} (${response.status})`);
      return null;
    }

    const content = await response.text();
    return parseRobotsTxt(content, 'BahrainNightsBot');
  } catch (error) {
    scraperLog.warn('RobotsChecker', `Failed to fetch robots.txt from ${baseUrl}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Get robots.txt config for a domain (with caching)
 */
async function getRobotsConfig(url: string): Promise<RobotsConfig | null> {
  const baseUrl = getDomain(url);
  const cached = robotsCache.get(baseUrl);

  // Check if cache is valid
  if (cached !== undefined) {
    if (cached === null) {
      // We previously determined there's no robots.txt
      return null;
    }

    const age = Date.now() - cached.fetchedAt;
    if (age < CACHE_DURATION) {
      return cached;
    }
  }

  // Fetch fresh robots.txt
  const config = await fetchRobotsTxt(baseUrl);
  robotsCache.set(baseUrl, config);

  return config;
}

/**
 * Check if we're allowed to scrape a URL
 */
export async function isScrapingAllowed(url: string): Promise<{ allowed: boolean; crawlDelay?: number; reason?: string }> {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname + parsed.search;
    const config = await getRobotsConfig(url);

    // No robots.txt = allowed
    if (!config) {
      return { allowed: true, reason: 'No robots.txt found - assuming allowed' };
    }

    // Check rules (most specific rule wins)
    let bestMatch: { path: string; allowed: boolean } | null = null;
    let bestMatchLength = 0;

    for (const rule of config.rules) {
      if (pathMatchesRule(path, rule.path)) {
        if (rule.path.length > bestMatchLength) {
          bestMatch = rule;
          bestMatchLength = rule.path.length;
        }
      }
    }

    if (bestMatch && !bestMatch.allowed) {
      return {
        allowed: false,
        crawlDelay: config.crawlDelay,
        reason: `Disallowed by robots.txt rule: ${bestMatch.path}`,
      };
    }

    return {
      allowed: true,
      crawlDelay: config.crawlDelay,
      reason: bestMatch ? `Explicitly allowed by rule: ${bestMatch.path}` : 'No matching rules - allowed by default',
    };
  } catch (error) {
    scraperLog.warn('RobotsChecker', `Error checking robots.txt for ${url}: ${(error as Error).message}`);
    // On error, assume allowed but log warning
    return { allowed: true, reason: 'Error checking robots.txt - proceeding with caution' };
  }
}

/**
 * Check if a source should be scraped based on robots.txt
 * Returns crawl delay if specified
 */
export async function checkSourcePermission(
  sourceName: string,
  baseUrl: string
): Promise<{ allowed: boolean; crawlDelay?: number }> {
  scraperLog.info('RobotsChecker', `Checking robots.txt for ${sourceName}...`);

  const result = await isScrapingAllowed(baseUrl);

  if (result.allowed) {
    scraperLog.success('RobotsChecker', `${sourceName}: Scraping allowed${result.crawlDelay ? ` (crawl delay: ${result.crawlDelay / 1000}s)` : ''}`);
  } else {
    scraperLog.warn('RobotsChecker', `${sourceName}: Scraping NOT allowed - ${result.reason}`);
  }

  return {
    allowed: result.allowed,
    crawlDelay: result.crawlDelay,
  };
}

/**
 * Apply crawl delay if specified in robots.txt
 */
export async function respectCrawlDelay(crawlDelay?: number): Promise<void> {
  if (crawlDelay && crawlDelay > 0) {
    // Use the larger of robots.txt crawl delay or our configured delay
    const effectiveDelay = Math.max(crawlDelay, SCRAPER_CONFIG.delays.betweenRequests);
    scraperLog.debug('RobotsChecker', `Applying crawl delay: ${effectiveDelay / 1000}s`);
    await sleep(effectiveDelay);
  }
}

/**
 * Pre-check all sources before scraping
 */
export async function preCheckAllSources(): Promise<Map<string, { allowed: boolean; crawlDelay?: number }>> {
  const results = new Map<string, { allowed: boolean; crawlDelay?: number }>();

  const sources = [
    { name: 'Bahrain Calendar', url: 'https://www.bahrain.com' },
    { name: 'Platinumlist Events', url: 'https://manama.platinumlist.net' },
    { name: 'Platinumlist Attractions', url: 'https://manama.platinumlist.net' },
    { name: 'Al Dana Amphitheatre', url: 'https://www.beyonaldana.com.bh' },
  ];

  console.log('\n' + '─'.repeat(60));
  console.log('                  ROBOTS.TXT CHECK');
  console.log('─'.repeat(60) + '\n');

  for (const source of sources) {
    const result = await checkSourcePermission(source.name, source.url);
    results.set(source.name, result);

    // Small delay between checks
    await sleep(500);
  }

  console.log('─'.repeat(60) + '\n');

  return results;
}
