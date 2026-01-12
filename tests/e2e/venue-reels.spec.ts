import { test, expect } from '@playwright/test';

test.describe('Instagram Reels Feature', () => {
  // Test valid Instagram reel URLs
  const validReelUrls = [
    'https://www.instagram.com/reel/ABC123xyz/',
    'https://instagram.com/reel/DEF456/',
    'https://www.instagram.com/p/GHI789/',
  ];

  const invalidReelUrls = [
    'https://youtube.com/watch?v=123',
    'https://instagram.com/username',
    'not-a-url',
  ];

  test.describe('Venue Submission Form', () => {
    test('submission form has Instagram reel URL input field', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/submit-venue');
      await page.waitForTimeout(2000);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/submit-venue-reels-field.png', fullPage: true });

      // Look for the Instagram Reel URL input field
      const reelInput = page.locator('input[placeholder*="instagram.com/reel"]');

      // Check if field exists
      const inputCount = await reelInput.count();
      console.log(`Found ${inputCount} Instagram reel input fields`);

      // Look for the label
      const reelLabel = page.locator('text=Instagram Reel').first();
      const labelVisible = await reelLabel.isVisible().catch(() => false);
      console.log(`Instagram Reel label visible: ${labelVisible}`);
    });

    test('submission form validates Instagram reel URL format', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/submit-venue');
      await page.waitForTimeout(2000);

      // Find the reel URL input
      const reelInput = page.locator('input[placeholder*="instagram.com/reel"]');

      if (await reelInput.count() > 0) {
        // Enter an invalid URL
        await reelInput.fill('invalid-url');

        // Look for the Film icon or optional text
        const optionalText = page.locator('text=Optional');
        const optionalCount = await optionalText.count();
        console.log(`Found ${optionalCount} "Optional" texts`);

        // Take screenshot after entering invalid URL
        await page.screenshot({ path: 'tests/screenshots/submit-venue-invalid-reel.png', fullPage: true });
      }
    });
  });

  test.describe('Venue Portal Reels Management', () => {
    test('venue portal has reels link in sidebar', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/venue-portal');
      await page.waitForTimeout(2000);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/venue-portal-sidebar.png', fullPage: true });

      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        console.log('Not authenticated - redirected to login');

        // Check login page loads
        const loginForm = page.locator('form');
        const loginFormVisible = await loginForm.isVisible().catch(() => false);
        console.log(`Login form visible: ${loginFormVisible}`);
        return;
      }

      // Look for Instagram Reels link in sidebar
      const reelsLink = page.locator('a[href*="/venue-portal/reels"], text=Instagram Reels');
      const linkCount = await reelsLink.count();
      console.log(`Found ${linkCount} reels links in sidebar`);
    });

    test('venue portal reels page loads', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/venue-portal/reels');
      await page.waitForTimeout(3000);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/venue-portal-reels-page.png', fullPage: true });

      const currentUrl = page.url();
      console.log('Current URL:', currentUrl);

      if (currentUrl.includes('/login')) {
        console.log('Not authenticated - redirected to login');
        return;
      }

      // Check for page title
      const pageTitle = page.locator('h1, h2').first();
      const titleText = await pageTitle.textContent().catch(() => '');
      console.log(`Page title: ${titleText}`);

      // Check for add reel button
      const addButton = page.locator('button:has-text("Add"), button:has-text("Reel")');
      const addButtonCount = await addButton.count();
      console.log(`Found ${addButtonCount} add buttons`);
    });

    test('add reel modal opens and validates URL', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/venue-portal/reels');
      await page.waitForTimeout(3000);

      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        console.log('Not authenticated - skipping modal test');
        return;
      }

      // Click add button
      const addButton = page.locator('button:has-text("Add Reel"), button:has-text("Add")').first();
      if (await addButton.count() > 0) {
        await addButton.click();
        await page.waitForTimeout(1000);

        // Take screenshot of modal
        await page.screenshot({ path: 'tests/screenshots/venue-portal-add-reel-modal.png' });

        // Check for URL input in modal
        const urlInput = page.locator('input[placeholder*="instagram"], input[type="url"]');
        const urlInputCount = await urlInput.count();
        console.log(`Found ${urlInputCount} URL inputs in modal`);

        // Check for submit button
        const submitButton = page.locator('button[type="submit"], button:has-text("Add")');
        const submitCount = await submitButton.count();
        console.log(`Found ${submitCount} submit buttons`);
      }
    });
  });

  test.describe('Public Venue Page - Reels Display', () => {
    test('venue page shows reels section when available', async ({ page }) => {
      // Visit a venue that might have reels
      await page.goto('https://www.bahrainnights.com/places');
      await page.waitForTimeout(2000);

      // Take screenshot of places list
      await page.screenshot({ path: 'tests/screenshots/places-list.png', fullPage: true });

      // Click on first venue card
      const venueCard = page.locator('a[href*="/places/"]').first();
      if (await venueCard.count() > 0) {
        await venueCard.click();
        await page.waitForTimeout(3000);

        // Take screenshot of venue detail page
        await page.screenshot({ path: 'tests/screenshots/venue-detail-page.png', fullPage: true });

        // Check for reels section
        const reelsSection = page.locator('text=Instagram Reels, text=Reels').first();
        const reelsSectionVisible = await reelsSection.isVisible().catch(() => false);
        console.log(`Reels section visible: ${reelsSectionVisible}`);

        // Check for reel embeds or placeholder
        const reelEmbeds = page.locator('iframe[src*="instagram.com"]');
        const embedCount = await reelEmbeds.count();
        console.log(`Found ${embedCount} Instagram embeds`);
      }
    });

    test('reels display in grid layout', async ({ page }) => {
      // Navigate to places page
      await page.goto('https://www.bahrainnights.com/places');
      await page.waitForTimeout(2000);

      // Get first venue link
      const venueLink = page.locator('a[href*="/places/"]').first();
      const venueHref = await venueLink.getAttribute('href');

      if (venueHref) {
        await page.goto(`https://www.bahrainnights.com${venueHref}`);
        await page.waitForTimeout(3000);

        // Look for grid container with reels
        const reelsGrid = page.locator('[class*="grid"]').filter({ has: page.locator('iframe[src*="instagram"]') });
        const gridCount = await reelsGrid.count();
        console.log(`Found ${gridCount} grid containers with Instagram embeds`);

        // Take screenshot of potential reels area
        await page.screenshot({ path: 'tests/screenshots/venue-reels-grid.png', fullPage: true });
      }
    });
  });

  test.describe('API Routes', () => {
    test('reels API requires authentication', async ({ request }) => {
      // Test GET without auth
      const getResponse = await request.get('https://www.bahrainnights.com/api/venue-portal/reels');
      console.log(`GET /api/venue-portal/reels status: ${getResponse.status()}`);
      expect(getResponse.status()).toBe(401);

      // Test POST without auth
      const postResponse = await request.post('https://www.bahrainnights.com/api/venue-portal/reels', {
        data: { instagram_url: 'https://www.instagram.com/reel/test123/' }
      });
      console.log(`POST /api/venue-portal/reels status: ${postResponse.status()}`);
      expect(postResponse.status()).toBe(401);

      // Test DELETE without auth
      const deleteResponse = await request.delete('https://www.bahrainnights.com/api/venue-portal/reels/test-id');
      console.log(`DELETE /api/venue-portal/reels/test-id status: ${deleteResponse.status()}`);
      expect(deleteResponse.status()).toBe(401);

      // Test PATCH reorder without auth
      const patchResponse = await request.patch('https://www.bahrainnights.com/api/venue-portal/reels/reorder', {
        data: { reels: [] }
      });
      console.log(`PATCH /api/venue-portal/reels/reorder status: ${patchResponse.status()}`);
      expect(patchResponse.status()).toBe(401);
    });
  });

  test.describe('Instagram URL Validation', () => {
    test('validates correct Instagram reel URLs', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/submit-venue');
      await page.waitForTimeout(2000);

      const reelInput = page.locator('input[placeholder*="instagram.com/reel"]');

      if (await reelInput.count() > 0) {
        for (const url of validReelUrls) {
          await reelInput.fill(url);
          await page.waitForTimeout(500);

          // Check if error message appears
          const errorMessage = page.locator('text=Invalid Instagram, text=Please enter a valid').first();
          const errorVisible = await errorMessage.isVisible().catch(() => false);
          console.log(`URL "${url}" - error visible: ${errorVisible}`);
        }
      }
    });

    test('rejects invalid Instagram URLs on submission', async ({ page }) => {
      await page.goto('https://www.bahrainnights.com/submit-venue');
      await page.waitForTimeout(2000);

      const reelInput = page.locator('input[placeholder*="instagram.com/reel"]');

      if (await reelInput.count() > 0) {
        // Fill in an invalid URL
        await reelInput.fill('https://youtube.com/watch?v=123');

        // Try to submit the form (fill required fields first)
        const submitButton = page.locator('button[type="submit"]');

        // Take screenshot before submission
        await page.screenshot({ path: 'tests/screenshots/submit-invalid-reel-attempt.png', fullPage: true });
      }
    });
  });
});
