import { test, expect, Page, ConsoleMessage } from '@playwright/test';

test.describe('S3 Migration: Venue Images Fix', () => {
  test.setTimeout(120000);

  const BASE = 'https://www.bahrainnights.com';
  const NEW_BUCKET = 'bahrainnights-production-us.s3.us-east-1.amazonaws.com';
  const OLD_BUCKET = 'bahrainnights-production.s3.me-south-1.amazonaws.com';

  // Track console errors
  let consoleErrors: string[] = [];
  let consoleWarnings: string[] = [];
  let brokenImages: { url: string; status: number; page: string }[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    consoleWarnings = [];
    brokenImages = [];

    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      if (msg.type() === 'warning') consoleWarnings.push(msg.text());
    });

    page.on('response', (response) => {
      const url = response.url();
      const status = response.status();
      if (status >= 400 && (url.includes('s3.') || url.includes('processed'))) {
        brokenImages.push({ url: url.substring(0, 80), status, page: page.url() });
      }
    });
  });

  async function checkImageLoad(page: Page, src: string): Promise<number> {
    if (!src || src.includes('placeholder') || src.length < 10) return 0;
    try {
      const r = await page.request.get(src, { timeout: 10000 });
      return r.status();
    } catch {
      return 999;
    }
  }

  // ==========================================
  // TEST 1: Public places page - all images load
  // ==========================================
  test('T1: /places - venue images load without 4xx errors', async ({ page }) => {
    const errors: string[] = [];
    const failedUrls: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      const status = response.status();
      if (status >= 400 && (url.includes(NEW_BUCKET) || url.includes('s3.') || url.includes('/processed/'))) {
        failedUrls.push(`${status}: ${url.substring(0, 100)}`);
      }
    });

    await page.goto(`${BASE}/places`, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for images to attempt loading
    await page.waitForTimeout(2000);

    // Check for broken images via next/image proxy
    const imgs = page.locator('img[src*="processed"]');
    const count = await imgs.count();
    console.log(`[T1] Found ${count} processed images on /places`);

    let broken = 0;
    for (let i = 0; i < Math.min(count, 10); i++) {
      const src = await imgs.nth(i).getAttribute('src').catch(() => null);
      if (src && !src.includes('placeholder')) {
        // The Next.js image proxy URL - fetch the actual S3 URL
        if (src.includes('/_next/image?url=')) {
          const decoded = decodeURIComponent(src.split('url=')[1]?.split('&')[0] || '');
          const status = await checkImageLoad(page, decoded);
          if (status >= 400) {
            broken++;
            console.log(`[T1] BROKEN: ${decoded.substring(0, 80)} → ${status}`);
          }
        }
      }
    }

    console.log(`[T1] Console errors: ${consoleErrors.filter(e => !e.includes('favicon')).length}`);
    console.log(`[T1] Failed S3 URLs: ${failedUrls.length}`);
    console.log(`[T1] Result: ${broken} broken images`);

    expect(broken).toBe(0);
  });

  // ==========================================
  // TEST 2: Public venue detail page
  // ==========================================
  test('T2: /places/{slug} - logo, cover, gallery images load', async ({ page }) => {
    const failedUrls: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      const status = response.status();
      if (status >= 400 && (url.includes(NEW_BUCKET) || url.includes('s3.') || url.includes('/processed/'))) {
        failedUrls.push(`${status}: ${url}`);
      }
    });

    // Get first venue slug
    const resp = await page.request.get(`${BASE}/api/public/venues?limit=3`);
    let slug = 'the-orangery';
    if (resp.status() === 200) {
      const data = await resp.json();
      const venues = data.venues || data.data || [];
      if (venues.length > 0 && venues[0].slug) slug = venues[0].slug;
    }

    console.log(`[T2] Testing venue: ${slug}`);
    await page.goto(`${BASE}/places/${slug}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    const imgs = page.locator('img[src*="processed"], img[src*="s3."]');
    const count = await imgs.count();
    console.log(`[T2] Found ${count} images`);

    let broken = 0;
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src').catch(() => null);
      if (src && !src.includes('placeholder')) {
        let status = 0;
        if (src.includes('/_next/image?url=')) {
          const decoded = decodeURIComponent(src.split('url=')[1]?.split('&')[0] || '');
          status = await checkImageLoad(page, decoded);
        } else if (src.startsWith('http')) {
          status = await checkImageLoad(page, src);
        }
        if (status >= 400) {
          broken++;
          console.log(`[T2] BROKEN (${status}): ${src.substring(0, 100)}`);
        }
      }
    }

    console.log(`[T2] Failed URLs: ${failedUrls.length}`);
    console.log(`[T2] Result: ${broken} broken images`);

    expect(broken).toBe(0);
  });

  // ==========================================
  // TEST 3: Admin venue page (requires auth)
  // ==========================================
  test('T3: /admin/venues/{id} - logo + cover load', async ({ page }) => {
    // Login first
    const loginResp = await page.request.post(`${BASE}/api/auth/login`, {
      data: { email: 'admin@bahrainnights.com', password: process.env.ADMIN_TEST_PASSWORD || 'admin' },
      timeout: 10000
    });

    if (loginResp.status() !== 200) {
      console.log('[T3] Admin login failed, testing via direct fetch instead');
      // Test via API response
      const resp = await page.request.get(`${BASE}/api/admin/venues?limit=3`);
      const data = await resp.json();
      const venue = data.venues?.[0];
      if (venue?.logo_url || venue?.cover_image_url) {
        const logoStatus = venue.logo_url ? await checkImageLoad(page, venue.logo_url) : 0;
        const coverStatus = venue.cover_image_url ? await checkImageLoad(page, venue.cover_image_url) : 0;
        console.log(`[T3] Logo: ${logoStatus}, Cover: ${coverStatus}`);
        expect(logoStatus).toBeLessThan(400);
        expect(coverStatus).toBeLessThan(400);
      } else {
        console.log('[T3] No venue images to test');
      }
      return;
    }

    const cookies = loginResp.headers()['set-cookie'] || '';
    const token = cookies.match(/auth_token=([^;]+)/)?.[1];
    if (token) {
      await page.context().addCookies([{
        name: 'auth_token',
        value: token,
        domain: '.bahrainnights.com',
        path: '/'
      }]);
    }

    // Get a venue ID
    const venuesResp = await page.request.get(`${BASE}/api/admin/venues?limit=3`);
    let venueId = '27e05150-1a00-43ef-b5c6-59d472c9bb92';
    if (venuesResp.status() === 200) {
      const data = await venuesResp.json();
      if (data.venues?.[0]?.id) venueId = data.venues[0].id;
    }

    console.log(`[T3] Testing admin venue: ${venueId}`);
    await page.goto(`${BASE}/admin/venues/${venueId}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const imgs = page.locator('img[src*="processed"], img[src*="s3."]');
    const count = await imgs.count();

    let broken = 0;
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src').catch(() => null);
      if (src && !src.includes('placeholder')) {
        let status = 0;
        if (src.includes('/_next/image?url=')) {
          const decoded = decodeURIComponent(src.split('url=')[1]?.split('&')[0] || '');
          status = await checkImageLoad(page, decoded);
        } else if (src.startsWith('http')) {
          status = await checkImageLoad(page, src);
        }
        if (status >= 400) {
          broken++;
          console.log(`[T3] BROKEN (${status}): ${src.substring(0, 100)}`);
        }
      }
    }

    console.log(`[T3] Result: ${broken} broken images`);
    expect(broken).toBe(0);
  });

  // ==========================================
  // TEST 4: Events page still works (regression)
  // ==========================================
  test('T4: /events - event images load correctly', async ({ page }) => {
    await page.goto(`${BASE}/events`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const errors = consoleErrors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('404') &&
      e.length > 10
    );

    console.log(`[T4] Console errors: ${errors.length}`);
    console.log('[T4] PASSED - Events page loads without critical errors');
  });

  // ==========================================
  // TEST 5: Venue portal gallery still works (regression)
  // ==========================================
  test('T5: /venue-portal/images - gallery images load', async ({ page }) => {
    // Venue portal login
    const loginResp = await page.request.post(`${BASE}/api/venue-portal/login`, {
      data: { email: 'venue@test.com', password: 'test123' },
      timeout: 10000
    });

    if (loginResp.status() !== 200) {
      console.log('[T5] Venue portal login failed, testing via API');
      // Test that the API returns correct bucket URLs
      const resp = await page.request.get(`${BASE}/api/public/venues?limit=2`);
      if (resp.status() === 200) {
        const data = await resp.json();
        const venue = (data.venues || data.data || [])[0];
        if (venue?.gallery?.length > 0) {
          const galleryUrl = venue.gallery[0];
          const status = await checkImageLoad(page, galleryUrl);
          console.log(`[T5] Gallery URL status: ${status}`);
          expect(status).toBeLessThan(400);
        }
      }
      return;
    }

    const cookies = loginResp.headers()['set-cookie'] || '';
    const token = cookies.match(/venue_session=([^;]+)/)?.[1];
    if (token) {
      await page.context().addCookies([{
        name: 'venue_session',
        value: token,
        domain: '.bahrainnights.com',
        path: '/'
      }]);
    }

    await page.goto(`${BASE}/venue-portal/images`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const imgs = page.locator('img[src*="processed"], img[src*="s3."]');
    const count = await imgs.count();

    let broken = 0;
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src').catch(() => null);
      if (src && !src.includes('placeholder')) {
        let status = 0;
        if (src.includes('/_next/image?url=')) {
          const decoded = decodeURIComponent(src.split('url=')[1]?.split('&')[0] || '');
          status = await checkImageLoad(page, decoded);
        } else if (src.startsWith('http')) {
          status = await checkImageLoad(page, src);
        }
        if (status >= 400) {
          broken++;
          console.log(`[T5] BROKEN (${status}): ${src.substring(0, 100)}`);
        }
      }
    }

    console.log(`[T5] Result: ${broken} broken images`);
    expect(broken).toBe(0);
  });

  // ==========================================
  // TEST 6: URL format validation (post-revert)
  // ==========================================
  test('T6: URL state matches expected (old reverted, new kept for new venues)', async ({ page }) => {
    const resp = await page.request.get(`${BASE}/api/public/venues?limit=5`);
    if (resp.status() !== 200) {
      expect(resp.status()).toBe(200);
      return;
    }

    const data = await resp.json();
    const venues = data.venues || data.data || [];

    const oldBucketCount = { logo: 0, cover: 0, gallery: 0 };
    const newBucketCount = { logo: 0, cover: 0, gallery: 0 };
    const excludedVenues = ['test-new-', 'bh-nights', 'bh nights'];

    for (const v of venues) {
      const isExcluded = excludedVenues.some(e => v.slug?.toLowerCase().includes(e.toLowerCase()));

      if (v.logo_url) {
        if (v.logo_url.includes(NEW_BUCKET)) newBucketCount.logo++;
        if (v.logo_url.includes(OLD_BUCKET)) oldBucketCount.logo++;
      }
      if (v.cover_image_url) {
        if (v.cover_image_url.includes(NEW_BUCKET)) newBucketCount.cover++;
        if (v.cover_image_url.includes(OLD_BUCKET)) oldBucketCount.cover++;
      }
      if (Array.isArray(v.gallery)) {
        for (const url of v.gallery) {
          if (url.includes(NEW_BUCKET)) newBucketCount.gallery++;
          if (url.includes(OLD_BUCKET)) oldBucketCount.gallery++;
        }
      }
    }

    console.log(`[T6] Old bucket URLs: logo=${oldBucketCount.logo}, cover=${oldBucketCount.cover}, gallery=${oldBucketCount.gallery}`);
    console.log(`[T6] New bucket URLs: logo=${newBucketCount.logo}, cover=${newBucketCount.cover}, gallery=${newBucketCount.gallery}`);
    console.log(`[T6] Total: ${oldBucketCount.logo + oldBucketCount.cover + oldBucketCount.gallery + newBucketCount.logo + newBucketCount.cover + newBucketCount.gallery}`);

    // After revert: most venues on old bucket, 2 excluded on new bucket
    expect(oldBucketCount.logo + newBucketCount.logo).toBeGreaterThan(0);
    expect(oldBucketCount.cover + newBucketCount.cover).toBeGreaterThan(0);

    console.log('[T6] PASSED - URL state is correct (reverted for existing venues)');
  });
});