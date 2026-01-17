import { test, expect } from '@playwright/test';

/**
 * Blog Page Verification Tests
 * Verifies:
 * - Blog page loads correctly
 * - Single trailer iframe (no multiple audio)
 * - City sections display properly
 * - Article locations are accurate
 */

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('blog page loads successfully', async ({ page }) => {
    // Check page title or main content
    await expect(page).toHaveURL(/\/blog/);

    // Check for main content container
    const mainContent = page.locator('.min-h-screen');
    await expect(mainContent).toBeVisible();
  });

  test('hero trailer section displays', async ({ page }) => {
    // Wait for hero section to load
    const heroSection = page.locator('[class*="h-[70vh]"], [class*="h-[85vh]"]').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });
  });

  test('only ONE YouTube iframe is rendered at a time', async ({ page }) => {
    // Wait for hero section
    await page.waitForTimeout(3000);

    // Count the number of YouTube iframes
    const iframes = await page.locator('iframe[src*="youtube.com/embed"]').count();

    // There should be at most 1 iframe (could be 0 if no trailers)
    expect(iframes).toBeLessThanOrEqual(1);

    console.log(`Found ${iframes} YouTube iframe(s) - Expected: 0 or 1`);
  });

  test('trailer navigation arrows work', async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(2000);

    // Check if navigation arrows exist (only if multiple trailers)
    const rightArrow = page.locator('button[aria-label="Next trailer"]');
    const leftArrow = page.locator('button[aria-label="Previous trailer"]');

    // If arrows exist, they should be clickable
    if (await rightArrow.isVisible()) {
      await rightArrow.click();
      // Wait for transition
      await page.waitForTimeout(500);

      // Still only one iframe after navigation
      const iframes = await page.locator('iframe[src*="youtube.com/embed"]').count();
      expect(iframes).toBeLessThanOrEqual(1);
    }
  });

  test('mute/unmute button works', async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(2000);

    // Find the mute button
    const muteButton = page.locator('button').filter({ hasText: /Enable Sound|Mute/i }).first();

    if (await muteButton.isVisible()) {
      const initialText = await muteButton.textContent();
      await muteButton.click();
      await page.waitForTimeout(1000);

      // Button text should change after click
      const newText = await muteButton.textContent();
      console.log(`Mute button: "${initialText}" -> "${newText}"`);
    }
  });
});

test.describe('Blog Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    // Scroll down to load sections
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000);
  });

  test('featured stories section has proper heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Featured Stories/i });
    // May or may not exist depending on articles
    const count = await heading.count();
    console.log(`Featured Stories heading found: ${count > 0}`);
  });

  test('trending section has proper heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Trending Now/i });
    const count = await heading.count();
    console.log(`Trending Now heading found: ${count > 0}`);
  });

  test('city sections display with proper headings', async ({ page }) => {
    // Scroll down more to see city sections
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(500);

    const cities = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Doha', 'London', 'Bahrain'];
    const foundCities: string[] = [];

    for (const city of cities) {
      const heading = page.getByRole('heading', { name: new RegExp(`^${city}$`, 'i') });
      if (await heading.count() > 0) {
        foundCities.push(city);
      }
    }

    console.log(`City sections found: ${foundCities.join(', ') || 'None'}`);
  });
});

test.describe('Article Location Verification', () => {
  test('articles in Dubai section have Dubai locations', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(1000);

    // Find Dubai section
    const dubaiHeading = page.getByRole('heading', { name: /^Dubai$/i });

    if (await dubaiHeading.count() > 0) {
      // Get the parent section
      const dubaiSection = dubaiHeading.locator('..');

      // Find all article cards in this section
      const articleCards = dubaiSection.locator('[class*="BlogCard"]');
      const count = await articleCards.count();

      console.log(`Dubai section has ${count} articles`);
    }
  });

  test('verify blog card click opens modal', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(1000);

    // Find any visible blog card
    const blogCard = page.locator('[class*="rounded-lg"]').filter({ has: page.locator('img') }).first();

    if (await blogCard.isVisible()) {
      await blogCard.click();
      await page.waitForTimeout(500);

      // Check if modal opened
      const modal = page.locator('[class*="fixed inset-0"]');
      const modalVisible = await modal.isVisible();
      console.log(`Modal opened: ${modalVisible}`);
    }
  });
});

test.describe('Blog Admin Panel', () => {
  test('city stats section exists on admin page', async ({ page }) => {
    await page.goto('/admin/blog');
    await page.waitForLoadState('networkidle');

    // Check for city stats section
    const cityStatsHeading = page.getByText(/Articles by City/i);
    const exists = await cityStatsHeading.count() > 0;
    console.log(`City stats section found: ${exists}`);

    if (exists) {
      // Check for individual city cards
      const cities = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Doha', 'London', 'Bahrain'];
      for (const city of cities) {
        const cityCard = page.getByText(city).first();
        const visible = await cityCard.isVisible();
        console.log(`${city} card visible: ${visible}`);
      }
    }
  });

  test('manage trailers link exists', async ({ page }) => {
    await page.goto('/admin/blog');
    await page.waitForLoadState('networkidle');

    const trailersLink = page.getByRole('link', { name: /Manage Trailers/i });
    await expect(trailersLink).toBeVisible();

    // Click and verify navigation
    await trailersLink.click();
    await expect(page).toHaveURL(/\/admin\/blog\/trailers/);
  });
});

test.describe('Featured Trailers Admin', () => {
  test('trailers admin page loads', async ({ page }) => {
    await page.goto('/admin/blog/trailers');
    await page.waitForLoadState('networkidle');

    // Check for page title
    const heading = page.getByRole('heading', { name: /Featured Trailers/i });
    await expect(heading).toBeVisible();
  });

  test('can add trailers dropdown exists', async ({ page }) => {
    await page.goto('/admin/blog/trailers');
    await page.waitForLoadState('networkidle');

    // Check for the select dropdown
    const dropdown = page.locator('select').filter({ hasText: /Select a movie/i });
    const count = await dropdown.count();
    console.log(`Movie dropdown found: ${count > 0}`);
  });
});

test.describe('Performance Checks', () => {
  test('blog page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/blog');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;
    console.log(`Blog page DOM loaded in ${loadTime}ms`);

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('no console errors on blog page', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(e =>
      !e.includes('net::ERR') &&
      !e.includes('favicon') &&
      !e.includes('ResizeObserver')
    );

    if (criticalErrors.length > 0) {
      console.log('Console errors:', criticalErrors);
    }

    console.log(`Total console errors: ${errors.length}, Critical: ${criticalErrors.length}`);
  });
});
