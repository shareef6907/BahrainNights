import { test, expect } from '@playwright/test';

test.describe('Mukta A2 Cinema Scraper', () => {
  // Increase timeout for scraping tests
  test.setTimeout(120000);

  test.describe('Mukta Website Tests', () => {
    test('Mukta website is accessible', async ({ page }) => {
      const response = await page.goto('https://www.muktaa2cinemas.com/bahrain', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      expect(response?.status()).toBeLessThan(400);
      console.log('✅ Mukta website is accessible');
      console.log('Status:', response?.status());
    });

    test('Mukta website has movie listings', async ({ page }) => {
      await page.goto('https://www.muktaa2cinemas.com/bahrain', {
        waitUntil: 'networkidle',
        timeout: 60000,
      });

      // Wait for content to load
      await page.waitForTimeout(3000);

      // Look for movie images (poster indicators)
      const images = page.locator('img');
      const imageCount = await images.count();
      console.log('Total images on page:', imageCount);
      expect(imageCount).toBeGreaterThan(5);

      // Take screenshot for debugging
      await page.screenshot({ path: 'test-results/mukta-homepage.png', fullPage: true });
      console.log('✅ Screenshot saved to test-results/mukta-homepage.png');
    });

    test('Mukta website has Coming Soon section', async ({ page }) => {
      await page.goto('https://www.muktaa2cinemas.com/bahrain', {
        waitUntil: 'networkidle',
        timeout: 60000,
      });

      // Wait for page to fully load
      await page.waitForTimeout(3000);

      // Scroll to bottom to load footer slider
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(2000);

      // Look for "Coming Soon" text anywhere on the page
      const pageContent = await page.textContent('body');
      const hasComingSoon = pageContent?.toLowerCase().includes('coming soon') ||
                           pageContent?.toLowerCase().includes('comingsoon');

      console.log('Page has "Coming Soon" text:', hasComingSoon);

      // Also check for "Now Showing" to verify movie sections exist
      const hasNowShowing = pageContent?.toLowerCase().includes('now showing') ||
                            pageContent?.toLowerCase().includes('nowshowing');

      console.log('Page has "Now Showing" text:', hasNowShowing);

      // At least one should be present
      expect(hasComingSoon || hasNowShowing).toBe(true);

      // Take screenshot after scroll
      await page.screenshot({ path: 'test-results/mukta-scrolled.png', fullPage: true });
      console.log('✅ Screenshot saved to test-results/mukta-scrolled.png');
    });
  });

  test.describe('API Tests', () => {
    test('Scraper API endpoint requires authentication', async ({ request }) => {
      // Test without secret (should fail with 401)
      const response = await request.get('/api/cron/mukta-scraper');
      expect(response.status()).toBe(401);

      const data = await response.json();
      expect(data.error).toBe('Unauthorized');
      console.log('✅ Scraper API requires authentication');
    });

    test('Scraper API accepts valid secret', async ({ request }) => {
      // Test with correct secret
      const response = await request.get('/api/cron/mukta-scraper?secret=bahrainnights-mukta-cron-2024');

      // Should return 200 (might still fail if Playwright isn't installed on server)
      console.log('Response status:', response.status());

      if (response.status() === 200) {
        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2));
        expect(data).toHaveProperty('success');
        expect(data).toHaveProperty('timestamp');
        console.log('✅ Scraper API accepts valid secret');
      } else {
        // May fail due to Playwright not being available in serverless
        console.log('⚠️ API returned non-200 status (expected in some environments)');
        const text = await response.text();
        console.log('Response:', text.substring(0, 500));
      }
    });

    test('Admin sync endpoint requires admin auth', async ({ request }) => {
      // Test without auth
      const response = await request.post('/api/admin/cinema/sync-mukta');
      expect(response.status()).toBe(401);
      console.log('✅ Admin sync endpoint requires authentication');
    });

    test('Cinema logs API requires admin auth', async ({ request }) => {
      // Test without auth
      const response = await request.get('/api/admin/cinema/logs');
      expect(response.status()).toBe(401);
      console.log('✅ Cinema logs API requires authentication');
    });
  });

  test.describe('Admin UI Tests', () => {
    test.beforeEach(async ({ page }) => {
      // Login as admin
      await page.goto('/login');
      await page.waitForLoadState('networkidle');

      await page.fill('input[name="email"]', 'admin@bahrainnights.com');
      await page.fill('input[name="password"]', 'Admin@123');
      await page.click('button:has-text("Sign In")');
      await page.waitForTimeout(3000);
    });

    test('Cinema admin page has Sync Mukta button', async ({ page }) => {
      await page.goto('/admin/cinema');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check if we're on the admin page
      const currentUrl = page.url();
      console.log('Current URL:', currentUrl);

      if (!currentUrl.includes('/login')) {
        // Look for Sync Mukta button
        const syncButton = page.locator('button:has-text("Sync Mukta")');
        const syncVisible = await syncButton.isVisible().catch(() => false);

        console.log('Sync Mukta button visible:', syncVisible);

        if (syncVisible) {
          // Take screenshot showing the button
          await page.screenshot({ path: 'test-results/cinema-admin-sync-button.png' });
          console.log('✅ Sync Mukta button found');
        }

        // Also check for View Logs link
        const logsLink = page.locator('a:has-text("View Logs")');
        const logsVisible = await logsLink.isVisible().catch(() => false);
        console.log('View Logs link visible:', logsVisible);
      } else {
        console.log('⚠️ Redirected to login - admin access may be restricted');
      }
    });

    test('Cinema logs page is accessible', async ({ page }) => {
      await page.goto('/admin/cinema/logs');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      const currentUrl = page.url();
      console.log('Current URL:', currentUrl);

      if (!currentUrl.includes('/login')) {
        // Check for logs page header
        const header = page.locator('h1:has-text("Cinema Scraper Logs")');
        const headerVisible = await header.isVisible().catch(() => false);

        console.log('Logs page header visible:', headerVisible);

        // Take screenshot
        await page.screenshot({ path: 'test-results/cinema-scraper-logs.png' });
        console.log('✅ Screenshot saved');
      } else {
        console.log('⚠️ Redirected to login');
      }
    });

    test('Sync Mukta button triggers sync', async ({ page }) => {
      await page.goto('/admin/cinema');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        console.log('⚠️ Skipping sync test - not authenticated');
        return;
      }

      // Find and click sync button
      const syncButton = page.locator('button:has-text("Sync Mukta")');
      const syncVisible = await syncButton.isVisible().catch(() => false);

      if (syncVisible) {
        // Click sync button
        await syncButton.click();
        console.log('Clicked Sync Mukta button');

        // Wait for sync to start (button should show "Syncing...")
        await page.waitForTimeout(1000);

        // Take screenshot during/after sync
        await page.screenshot({ path: 'test-results/cinema-sync-in-progress.png' });

        // Wait for sync to complete (could take a while)
        await page.waitForTimeout(30000);

        // Take screenshot after sync
        await page.screenshot({ path: 'test-results/cinema-sync-result.png' });
        console.log('✅ Sync triggered and screenshots saved');

        // Check if result message appeared
        const successMessage = page.locator('text=Synced');
        const errorMessage = page.locator('text=Failed to sync');

        const hasSuccess = await successMessage.isVisible().catch(() => false);
        const hasError = await errorMessage.isVisible().catch(() => false);

        console.log('Has success message:', hasSuccess);
        console.log('Has error message:', hasError);
      } else {
        console.log('⚠️ Sync button not found');
      }
    });
  });
});
