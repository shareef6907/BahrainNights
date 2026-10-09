/**
 * Google Indexing API — DISABLED
 * All functions below are permanently disabled per standing mission Part 2 Rule 3.
 * Use sitemap-based crawling instead.
 */


export function isIndexingConfigured(): boolean {
  return false;
}

export function buildPageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bahrainnights.com';
  return path.startsWith('http') ? path : `${base}${path}`;
}

export async function fetchSitemap(url: string): Promise<string> {
  const res = await fetch(url);
  return res.text();
}

export function getUrlsFromSitemap(xml: string): string[] {
  const matches = xml.match(/<loc>[^<]*<\/loc>/g) || [];
  return matches.map(m => m.replace(/<loc>|<\/loc>/g, ''));
}

export async function requestIndexing(url: string, type = 'URL_UPDATED') {
  return { success: false, error: 'Indexing API permanently disabled.' };
}

export async function requestBatchIndexing(urls: string[], type = 'URL_UPDATED') {
  return { success: false, error: 'Indexing API permanently disabled.', submitted: 0, failed: 0 };
}

export async function pingSitemap() {
  return { success: false, error: 'Indexing API permanently disabled.' };
}

export async function indexEventPage(slug: string) {
  return { success: false, error: 'Indexing API permanently disabled.', url: slug };
}

export async function indexVenuePage(slug: string) {
  return { success: false, error: 'Indexing API permanently disabled.', url: slug };
}

export async function indexAttractionPage(slug: string) {
  return { success: false, error: 'Indexing API permanently disabled.', url: slug };
}

export async function removeFromIndex(path: string) {
  return { success: false, error: 'Indexing API permanently disabled.', url: path };
}
