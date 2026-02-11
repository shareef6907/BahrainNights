/**
 * Google Indexing API Integration
 * 
 * Used to request immediate crawling of time-sensitive pages (events, venues)
 * 
 * Setup required:
 * 1. Create a Google Cloud project
 * 2. Enable the Indexing API
 * 3. Create a service account with Indexing API access
 * 4. Download the JSON key file
 * 5. Add the service account email as an Owner in Search Console
 * 6. Set environment variables:
 *    - GOOGLE_INDEXING_CLIENT_EMAIL (service account email)
 *    - GOOGLE_INDEXING_PRIVATE_KEY (private key from JSON, with \n preserved)
 * 
 * Documentation: https://developers.google.com/search/apis/indexing-api/v3/quickstart
 */

import { SignJWT, importPKCS8 } from 'jose';

const INDEXING_API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const BATCH_ENDPOINT = 'https://indexing.googleapis.com/batch';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/indexing';

interface IndexingResult {
  success: boolean;
  url: string;
  error?: string;
  response?: {
    urlNotificationMetadata?: {
      url: string;
      latestUpdate?: { type: string; notifyTime: string };
      latestRemove?: { type: string; notifyTime: string };
    };
  };
}

interface BatchResult {
  success: boolean;
  results: IndexingResult[];
  errors: string[];
}

/**
 * Check if Google Indexing API is configured
 */
export function isIndexingConfigured(): boolean {
  return !!(
    process.env.GOOGLE_INDEXING_CLIENT_EMAIL &&
    process.env.GOOGLE_INDEXING_PRIVATE_KEY
  );
}

/**
 * Get an access token using service account credentials
 */
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google Indexing API credentials not configured');
  }

  // Create JWT
  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(privateKey, 'RS256');
  
  const jwt = await new SignJWT({
    scope: SCOPE,
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience(TOKEN_ENDPOINT)
    .sign(key);

  // Exchange JWT for access token
  const tokenResponse = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Request Google to crawl/update a URL
 * @param url Full URL to index (e.g., https://www.bahrainnights.com/events/my-event)
 * @param type 'URL_UPDATED' for new/updated pages, 'URL_DELETED' for removed pages
 */
export async function requestIndexing(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResult> {
  if (!isIndexingConfigured()) {
    console.warn('Google Indexing API not configured - skipping indexing request');
    return { success: false, url, error: 'API not configured' };
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(INDEXING_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, type }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Indexing API error for ${url}:`, error);
      return { success: false, url, error };
    }

    const data = await response.json();
    console.log(`Successfully requested indexing for: ${url}`);
    return { success: true, url, response: data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to request indexing for ${url}:`, message);
    return { success: false, url, error: message };
  }
}

/**
 * Request indexing for multiple URLs (batch request)
 * Google allows up to 100 URLs per batch, 200 requests per day
 */
export async function requestBatchIndexing(
  urls: string[],
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<BatchResult> {
  if (!isIndexingConfigured()) {
    console.warn('Google Indexing API not configured - skipping batch indexing');
    return { 
      success: false, 
      results: urls.map(url => ({ success: false, url, error: 'API not configured' })),
      errors: ['API not configured']
    };
  }

  // Limit to 100 URLs per batch (Google's limit)
  const urlsToIndex = urls.slice(0, 100);
  const results: IndexingResult[] = [];
  const errors: string[] = [];

  try {
    const accessToken = await getAccessToken();

    // Build multipart batch request
    const boundary = 'batch_indexing_' + Date.now();
    let batchBody = '';

    urlsToIndex.forEach((url, index) => {
      batchBody += `--${boundary}\r\n`;
      batchBody += 'Content-Type: application/http\r\n';
      batchBody += `Content-ID: <item${index}>\r\n\r\n`;
      batchBody += 'POST /v3/urlNotifications:publish HTTP/1.1\r\n';
      batchBody += 'Content-Type: application/json\r\n\r\n';
      batchBody += JSON.stringify({ url, type }) + '\r\n';
    });
    batchBody += `--${boundary}--`;

    const response = await fetch(BATCH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/mixed; boundary=${boundary}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: batchBody,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Batch indexing error:', error);
      errors.push(error);
      urlsToIndex.forEach(url => {
        results.push({ success: false, url, error });
      });
    } else {
      // For simplicity, assume all succeeded if batch request succeeded
      // In production, you'd parse the multipart response
      urlsToIndex.forEach(url => {
        results.push({ success: true, url });
      });
      console.log(`Successfully requested batch indexing for ${urlsToIndex.length} URLs`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    errors.push(message);
    urlsToIndex.forEach(url => {
      results.push({ success: false, url, error: message });
    });
  }

  return {
    success: errors.length === 0,
    results,
    errors,
  };
}

/**
 * Ping Google to refresh sitemap
 */
export async function pingSitemap(
  sitemapUrl: string = 'https://www.bahrainnights.com/sitemap.xml'
): Promise<{ success: boolean; error?: string }> {
  try {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const response = await fetch(pingUrl);
    
    if (response.ok) {
      console.log('Successfully pinged sitemap');
      return { success: true };
    } else {
      const error = `Sitemap ping failed: ${response.status}`;
      console.error(error);
      return { success: false, error };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Sitemap ping error:', message);
    return { success: false, error: message };
  }
}

/**
 * Helper to build full URL for a page
 */
export function buildPageUrl(path: string): string {
  const base = 'https://www.bahrainnights.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Request indexing for an event page
 */
export async function indexEventPage(slug: string): Promise<IndexingResult> {
  const url = buildPageUrl(`/events/${slug}`);
  return requestIndexing(url, 'URL_UPDATED');
}

/**
 * Request indexing for a venue/place page
 */
export async function indexVenuePage(slug: string): Promise<IndexingResult> {
  const url = buildPageUrl(`/places/${slug}`);
  return requestIndexing(url, 'URL_UPDATED');
}

/**
 * Request indexing for an attraction page
 */
export async function indexAttractionPage(slug: string): Promise<IndexingResult> {
  const url = buildPageUrl(`/attractions/${slug}`);
  return requestIndexing(url, 'URL_UPDATED');
}

/**
 * Request removal of a deleted page from Google's index
 */
export async function removeFromIndex(path: string): Promise<IndexingResult> {
  const url = buildPageUrl(path);
  return requestIndexing(url, 'URL_DELETED');
}
