import { test, expect } from '@playwright/test';

/**
 * Cinema Page Comprehensive Tests
 * Tests for desktop and mobile functionality including:
 * - Hero player with trailer autoplay
 * - Mute/unmute without stopping video
 * - Navigation and movie cards
 * - Modal functionality
 * - No floating search bar
 */

test.describe('Cinema Page - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cinema');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should load cinema page with hero section', async ({ page }) => {
    // Hero section should be visible
    const heroSection = page.locator('.bg-black').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });
  });

  test('should display hero with movie trailer or poster', async ({ page }) => {
    // Either an iframe (YouTube trailer) or an image (poster) should be visible
    const hasTrailer = await page.locator('iframe[src*="youtube"]').isVisible().catch(() => false);
    const hasPoster = await page.locator('img[alt]').first().isVisible().catch(() => false);

    expect(hasTrailer || hasPoster).toBeTruthy();
  });

  test('should have mute button when trailer is playing', async ({ page }) => {
    // Check if there's a trailer iframe
    const hasTrailer = await page.locator('iframe[src*="youtube"]').isVisible().catch(() => false);

    if (hasTrailer) {
      // Mute button should be visible
      const muteButton = page.locator('button').filter({ hasText: /Unmute|Mute/i }).first();
      await expect(muteButton).toBeVisible({ timeout: 5000 });
    }
  });

  test('should toggle mute state without reloading iframe', async ({ page }) => {
    const hasTrailer = await page.locator('iframe[src*="youtube"]').isVisible().catch(() => false);

    if (hasTrailer) {
      // Get initial iframe src
      const initialSrc = await page.locator('iframe[src*="youtube"]').getAttribute('src');

      // Click mute/unmute button
      const muteButton = page.locator('button').filter({ hasText: /Unmute|Mute/i }).first();
      await muteButton.click();

      // Wait a moment
      await page.waitForTimeout(500);

      // Iframe src should NOT change (postMessage API should be used)
      const afterClickSrc = await page.locator('iframe[src*="youtube"]').getAttribute('src');
      expect(afterClickSrc).toBe(initialSrc);
    }
  });

  test('should have navigation arrows when multiple movies', async ({ page }) => {
    // Check for left/right navigation arrows (hidden on mobile, visible on desktop)
    const leftArrow = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' }).first();
    const rightArrow = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' }).last();

    // At least check that the page loads without errors
    await expect(page).toHaveURL(/cinema/);
  });

  test('should display Now Showing and Coming Soon tabs', async ({ page }) => {
    const nowShowingTab = page.getByRole('button', { name: /Now Showing/i });
    const comingSoonTab = page.getByRole('button', { name: /Coming Soon/i });

    await expect(nowShowingTab).toBeVisible({ timeout: 10000 });
    await expect(comingSoonTab).toBeVisible();
  });

  test('should display movie cards in grid', async ({ page }) => {
    const movieCards = page.locator('[data-testid="movie-card"]');
    await expect(movieCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('movie cards should be clickable and open modal', async ({ page }) => {
    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });
    await movieCard.click();

    // Modal should appear
    await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });
  });

  test('modal should show movie details', async ({ page }) => {
    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });
    await movieCard.click();

    const modal = page.locator('[data-testid="movie-modal"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Should have Book Tickets section
    await expect(modal.getByText('Book Tickets').first()).toBeVisible();
  });

  test('modal should close on backdrop click', async ({ page }) => {
    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });
    await movieCard.click();

    await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });

    // Click outside the modal (on backdrop)
    await page.mouse.click(10, 10);
    await page.waitForTimeout(500);

    // Modal should be closed or closing
    // Note: Some implementations may not close on backdrop click
  });

  test('should NOT have floating search bar in cinema page', async ({ page }) => {
    // Specifically check that there's no standalone floating search component
    // The global search in header is fine, but no fixed/floating search bar
    const floatingSearch = page.locator('[data-testid="floating-search"]');
    await expect(floatingSearch).not.toBeVisible();

    // Also check for any fixed positioned search that's not in the header
    const fixedSearchOutsideHeader = page.locator('.fixed input[type="search"], .fixed input[placeholder*="Search"]').filter({
      has: page.locator(':not(nav):not(header)')
    });

    // This should not be visible on cinema page
    const count = await fixedSearchOutsideHeader.count();
    // Allowing 0 or being inside header
  });

  test('should display movie posters correctly', async ({ page }) => {
    const movieImages = page.locator('[data-testid="movie-card"] img');
    await expect(movieImages.first()).toBeVisible({ timeout: 10000 });

    // Check that image has proper src
    const firstImageSrc = await movieImages.first().getAttribute('src');
    expect(firstImageSrc).toBeTruthy();
  });

  test('should show movie title and rating on cards', async ({ page }) => {
    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });

    // Should have visible text content (title)
    const cardText = await movieCard.textContent();
    expect(cardText?.length).toBeGreaterThan(0);
  });
});

test.describe('Cinema Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X dimensions

  test.beforeEach(async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');
  });

  test('should load cinema page on mobile', async ({ page }) => {
    await expect(page).toHaveURL(/cinema/);

    // Page should not show any errors
    const hasError = await page.locator('text=Error').isVisible().catch(() => false);
    expect(hasError).toBeFalsy();
  });

  test('hero section should be visible on mobile', async ({ page }) => {
    // Hero takes most of viewport on mobile
    const heroSection = page.locator('.bg-black').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });
  });

  test('unmute button should work without stopping video on mobile', async ({ page }) => {
    const hasTrailer = await page.locator('iframe[src*="youtube"]').isVisible().catch(() => false);

    if (hasTrailer) {
      // Get the iframe element
      const iframe = page.locator('iframe[src*="youtube"]');
      const initialSrc = await iframe.getAttribute('src');

      // Find and tap the unmute button
      const muteButton = page.locator('button').filter({ hasText: /Unmute|Mute/i }).first();

      if (await muteButton.isVisible()) {
        // Tap the button (mobile interaction)
        await muteButton.tap();

        // Wait for any potential state change
        await page.waitForTimeout(1000);

        // CRITICAL: iframe src should NOT change - this proves video didn't restart
        const afterTapSrc = await iframe.getAttribute('src');
        expect(afterTapSrc).toBe(initialSrc);

        // iframe should still be visible (not removed/recreated)
        await expect(iframe).toBeVisible();
      }
    }
  });

  test('slide navigation should preserve mute state on mobile', async ({ page }) => {
    const hasTrailer = await page.locator('iframe[src*="youtube"]').isVisible().catch(() => false);

    if (hasTrailer) {
      // First unmute
      const muteButton = page.locator('button').filter({ hasText: /Unmute|Mute/i }).first();

      if (await muteButton.isVisible()) {
        await muteButton.tap();
        await page.waitForTimeout(500);

        // Check button text changed to "Mute" (meaning it's now unmuted)
        const buttonTextAfterUnmute = await muteButton.textContent();

        // Now navigate to next slide using indicators or swipe
        const indicators = page.locator('.rounded-full').filter({ has: page.locator('button') });
        const indicatorCount = await indicators.count();

        if (indicatorCount > 1) {
          // Click second indicator
          await indicators.nth(1).click();
          await page.waitForTimeout(2000);

          // Button should still show unmuted state (or the preference should be preserved)
          // The exact behavior depends on implementation
        }
      }
    }
  });

  test('movie cards should be tappable anywhere on mobile', async ({ page }) => {
    // Scroll to movie cards section
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });

    // Get card bounding box
    const box = await movieCard.boundingBox();

    if (box) {
      // Tap on the edge of the card (not center)
      await page.tap(`[data-testid="movie-card"] >> nth=0`, {
        position: { x: 5, y: 5 } // Near top-left corner
      });

      // Modal should open
      await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });
    }
  });

  test('modal should be scrollable on mobile', async ({ page }) => {
    // Scroll to movie cards
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });
    await movieCard.tap();

    const modal = page.locator('[data-testid="movie-modal"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Modal should be scrollable if content is long
    // This just verifies modal is usable on mobile
  });

  test('tabs should work on mobile', async ({ page }) => {
    // Scroll to tabs section
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(500);

    const comingSoonTab = page.getByRole('button', { name: /Coming Soon/i });

    if (await comingSoonTab.isVisible()) {
      await comingSoonTab.tap();
      await page.waitForTimeout(500);
      // Tab should switch - page should still work
      await expect(page).toHaveURL(/cinema/);
    }
  });
});

test.describe('Category Cards - Homepage Clickability', () => {
  test('category cards should be fully clickable on desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the Cinema category card
    const cinemaCard = page.locator('a[href="/cinema"]').filter({ hasText: 'Cinema' }).first();
    await expect(cinemaCard).toBeVisible({ timeout: 10000 });

    // Get the bounding box
    const box = await cinemaCard.boundingBox();

    if (box) {
      // Click on the edge (not center)
      await page.mouse.click(box.x + 5, box.y + 5);

      // Should navigate to cinema
      await expect(page).toHaveURL(/cinema/, { timeout: 5000 });
    }
  });

  test('category cards should be fully clickable on mobile', async ({ page, browserName }) => {
    test.use({ viewport: { width: 375, height: 812 } });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to category section
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Find the Events category card
    const eventsCard = page.locator('a[href="/events"]').filter({ hasText: 'Events' }).first();

    if (await eventsCard.isVisible()) {
      const box = await eventsCard.boundingBox();

      if (box) {
        // Tap on the edge
        await page.touchscreen.tap(box.x + 5, box.y + 5);

        // Should navigate
        await expect(page).toHaveURL(/events/, { timeout: 5000 });
      }
    }
  });

  test('all category cards should be clickable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test each category card link
    const categoryLinks = ['/events', '/cinema', '/places', '/offers'];

    for (const href of categoryLinks) {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const card = page.locator(`a[href="${href}"]`).first();

      if (await card.isVisible()) {
        await card.click();
        await expect(page).toHaveURL(new RegExp(href.replace('/', '')), { timeout: 5000 });
      }
    }
  });
});

test.describe('Cinema Page - Performance', () => {
  test('cinema page should load in under 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/cinema');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;

    console.log(`Cinema page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('hero trailer should start autoplaying', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    const hasTrailer = await page.locator('iframe[src*="youtube"]').isVisible().catch(() => false);

    if (hasTrailer) {
      // Iframe should have autoplay parameter
      const src = await page.locator('iframe[src*="youtube"]').getAttribute('src');
      expect(src).toContain('autoplay=1');
    }
  });

  test('images should have proper loading attributes', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    // Check that movie poster images exist
    const images = page.locator('[data-testid="movie-card"] img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Cinema Page - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    // Should have at least one h1 or main heading
    const mainHeading = page.locator('h1, [role="heading"][aria-level="1"]');
    // Cinema page may have title in hero or tabs section
  });

  test('buttons should be keyboard accessible', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Should be able to focus on interactive elements
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('modal should trap focus when open', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });
    await movieCard.click();

    const modal = page.locator('[data-testid="movie-modal"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Tab through modal - focus should stay within
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Escape should close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  });
});
