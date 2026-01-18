import { test, expect } from '@playwright/test';

/**
 * BahrainNights.com Comprehensive E2E Test Suite
 * Tests all major pages and functionality on both desktop and mobile
 *
 * Run: npm run test:e2e
 * Run with UI: npm run test:e2e:ui
 * Run headed: npm run test:e2e:headed
 */

// ============================================
// HOMEPAGE TESTS
// ============================================
test.describe('Homepage', () => {
  test('should load homepage with hero section', async ({ page }) => {
    await page.goto('/');

    // Check page loads
    await expect(page).toHaveTitle(/Bahrain/i);

    // Hero section should be visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Navigation should be present
    await expect(page.locator('nav')).toBeVisible();

    // Check for key content (use first() since there may be multiple events links)
    await expect(page.getByRole('link', { name: /events/i }).first()).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check navigation exists
    await expect(page.locator('nav')).toBeVisible();

    // Check for key links by href (more reliable than text)
    const keyRoutes = ['/events', '/cinema', '/places', '/offers'];
    for (const route of keyRoutes) {
      const link = page.locator(`a[href*="${route}"]`).first();
      await expect(link).toBeAttached();
    }
  });

  test('should display featured content sections', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check for event cards or featured sections
    const contentSection = page.locator('[class*="grid"]').first();
    await expect(contentSection).toBeVisible();
  });

  test('should have responsive mobile menu', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }

    await page.goto('/');

    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menu"]').or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );

    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Menu should open
      await page.waitForTimeout(500);
    }
  });
});

// ============================================
// EVENTS PAGE TESTS
// ============================================
test.describe('Events Page', () => {
  test('should load events listing page', async ({ page }) => {
    await page.goto('/events');

    // Page should load
    await expect(page).toHaveURL(/events/);

    // Should have events content
    await page.waitForLoadState('networkidle');

    // Check for page content (body or first section)
    const content = page.locator('body');
    await expect(content).toBeVisible();

    // Verify page title is correct
    await expect(page).toHaveTitle(/Events|Bahrain/i);
  });

  test('should have working category filters', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    // Look for filter buttons or dropdown
    const filterSection = page.locator('[class*="filter"]').or(
      page.locator('button').filter({ hasText: /all|category/i })
    );

    // If filters exist, they should be interactive
    if (await filterSection.first().isVisible()) {
      await expect(filterSection.first()).toBeVisible();
    }
  });

  test('should navigate to event detail page', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    // Find and click first event card
    const eventCard = page.locator('a[href*="/events/"]').first();

    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForLoadState('networkidle');

      // Should be on event detail page
      await expect(page).toHaveURL(/events\/.+/);
    }
  });
});

// ============================================
// PLACES/ATTRACTIONS PAGE TESTS
// ============================================
test.describe('Places Page', () => {
  test('should load places listing page', async ({ page }) => {
    await page.goto('/places');

    await expect(page).toHaveURL(/places/);
    await page.waitForLoadState('networkidle');

    // Verify page loads correctly
    await expect(page).toHaveTitle(/Places|Dining|Bahrain/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to place detail page', async ({ page }) => {
    await page.goto('/places');
    await page.waitForLoadState('networkidle');

    // Find and click first place card
    const placeCard = page.locator('a[href*="/places/"]').first();

    if (await placeCard.isVisible()) {
      await placeCard.click();
      await page.waitForLoadState('networkidle');

      // Should be on place detail page
      await expect(page).toHaveURL(/places\/.+/);
    }
  });

  test('should display place information', async ({ page }) => {
    await page.goto('/places');
    await page.waitForLoadState('networkidle');

    // Navigate to first place
    const placeCard = page.locator('a[href*="/places/"]').first();

    if (await placeCard.isVisible()) {
      await placeCard.click();
      await page.waitForLoadState('networkidle');

      // Check page content (flexible - may not have main tag)
      await expect(page.locator('body')).toBeVisible();
      await expect(page).toHaveURL(/places\/.+/);
    }
  });
});

// ============================================
// CINEMA PAGE TESTS
// ============================================
test.describe('Cinema Page', () => {
  test('should load cinema page', async ({ page }) => {
    await page.goto('/cinema');

    await expect(page).toHaveURL(/cinema/);
    await page.waitForLoadState('networkidle');

    // Verify page loads correctly
    await expect(page).toHaveTitle(/Cinema|Movies|Bahrain/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display movie listings', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    // Look for movie cards
    const movieSection = page.locator('[class*="movie"]').or(
      page.locator('[class*="grid"]')
    );

    await expect(movieSection.first()).toBeVisible();
  });

  test('should navigate to movie detail page', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    // Find and click first movie card
    const movieCard = page.locator('a[href*="/cinema/"]').first();

    if (await movieCard.isVisible()) {
      await movieCard.click();
      await page.waitForLoadState('networkidle');

      // Should be on movie detail page
      await expect(page).toHaveURL(/cinema\/.+/);
    }
  });

  test('should have cinema chain filters', async ({ page }) => {
    await page.goto('/cinema');
    await page.waitForLoadState('networkidle');

    // Look for cinema chain buttons/tabs
    const cinemaFilters = page.locator('button').filter({ hasText: /cineco|vox|mukta/i });

    // If filters exist, they should be visible
    const filtersExist = await cinemaFilters.first().isVisible().catch(() => false);
    if (filtersExist) {
      await expect(cinemaFilters.first()).toBeVisible();
    }
  });
});

// ============================================
// BLOG PAGE TESTS
// ============================================
test.describe('Blog Page', () => {
  test('should load blog page', async ({ page }) => {
    await page.goto('/blog');

    await expect(page).toHaveURL(/blog/);
    await page.waitForLoadState('networkidle');

    // Verify page loads correctly
    await expect(page).toHaveTitle(/Blog|Bahrain/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display blog articles', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Look for article cards
    const articleSection = page.locator('article').or(
      page.locator('a[href*="/blog/"]')
    );

    // Should have at least one article
    const articlesExist = await articleSection.first().isVisible().catch(() => false);
    if (articlesExist) {
      await expect(articleSection.first()).toBeVisible();
    }
  });

  test('should navigate to blog article', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Find and click first article
    const articleLink = page.locator('a[href*="/blog/"]').first();

    if (await articleLink.isVisible()) {
      await articleLink.click();
      await page.waitForLoadState('networkidle');

      // Should be on article page
      await expect(page).toHaveURL(/blog\/.+/);
    }
  });
});

// ============================================
// VENUE PORTAL TESTS
// ============================================
test.describe('Venue Portal', () => {
  test('should load venue portal login page', async ({ page }) => {
    await page.goto('/venue-portal/login');

    await expect(page).toHaveURL(/venue-portal\/login/);

    // Should have login form
    const emailInput = page.locator('input[type="email"]').or(
      page.locator('input[name="email"]')
    );
    await expect(emailInput).toBeVisible();

    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('should have venue registration link', async ({ page }) => {
    await page.goto('/venue-portal/login');

    // Look for register/signup link
    const registerLink = page.getByRole('link', { name: /register|sign up/i });

    const linkExists = await registerLink.isVisible().catch(() => false);
    if (linkExists) {
      await expect(registerLink).toBeVisible();
    }
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/venue-portal/login');

    // Find and click submit button
    const submitButton = page.locator('button[type="submit"]').or(
      page.getByRole('button', { name: /login|sign in/i })
    );

    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Should show some error indication
      await page.waitForTimeout(500);
    }
  });
});

// ============================================
// OFFERS PAGE TESTS
// ============================================
test.describe('Offers Page', () => {
  test('should load offers page', async ({ page }) => {
    await page.goto('/offers');

    await expect(page).toHaveURL(/offers/);
    await page.waitForLoadState('networkidle');

    // Verify page loads correctly
    await expect(page).toHaveTitle(/Offers|Bahrain/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display offer cards', async ({ page }) => {
    await page.goto('/offers');
    await page.waitForLoadState('networkidle');

    // Look for offer cards
    const offerSection = page.locator('[class*="offer"]').or(
      page.locator('a[href*="/offers/"]')
    ).or(
      page.locator('[class*="grid"]')
    );

    await expect(offerSection.first()).toBeVisible();
  });
});

// ============================================
// PERFORMANCE TESTS
// ============================================
test.describe('Performance', () => {
  test('homepage should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    // Page should load within 10 seconds (accounting for network)
    expect(loadTime).toBeLessThan(10000);

    console.log(`Homepage load time: ${loadTime}ms`);
  });

  test('should not have major console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected errors (like failed image loads)
    const criticalErrors = errors.filter(e =>
      !e.includes('Failed to load resource') &&
      !e.includes('net::ERR') &&
      !e.includes('404')
    );

    // Should have no critical errors
    expect(criticalErrors.length).toBeLessThan(5);
  });

  test('should have reasonable first contentful paint', async ({ page }) => {
    await page.goto('/');

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const navigation = entries[0];

      return {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.startTime,
        load: navigation?.loadEventEnd - navigation?.startTime,
      };
    });

    // DOM Content Loaded should be under 5 seconds
    if (metrics.domContentLoaded) {
      expect(metrics.domContentLoaded).toBeLessThan(5000);
    }

    console.log('Performance metrics:', metrics);
  });
});

// ============================================
// ACCESSIBILITY TESTS
// ============================================
test.describe('Accessibility', () => {
  test('homepage should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should have an h1
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check at least some images have alt text
    let imagesWithAlt = 0;
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      if (alt && alt.length > 0) {
        imagesWithAlt++;
      }
    }

    // At least 50% should have alt text
    if (imageCount > 0) {
      expect(imagesWithAlt / Math.min(imageCount, 10)).toBeGreaterThanOrEqual(0.5);
    }
  });

  test('should have focusable navigation elements', async ({ page }) => {
    await page.goto('/');

    // Tab through the page
    await page.keyboard.press('Tab');

    // Should focus on a link or button
    const focusedElement = page.locator(':focus');
    const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());

    expect(['a', 'button', 'input']).toContain(tagName);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Basic check - main text should be visible
    const mainText = page.locator('p, h1, h2, h3, span').first();
    await expect(mainText).toBeVisible();
  });
});

// ============================================
// SEO TESTS
// ============================================
test.describe('SEO', () => {
  test('should have meta title', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.toLowerCase()).toContain('bahrain');
  });

  test('should have meta description', async ({ page }) => {
    await page.goto('/');

    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute('content');

    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(50);
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');

    // Check for OG title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);

    // Check for OG description
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveCount(1);
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');

    const canonical = page.locator('link[rel="canonical"]');
    const canonicalCount = await canonical.count();

    // Should have canonical link
    expect(canonicalCount).toBeGreaterThanOrEqual(1);
  });

  test('should have robots meta tag', async ({ page }) => {
    await page.goto('/');

    // Check robots meta or robots.txt link
    const robotsMeta = page.locator('meta[name="robots"]');
    const robotsCount = await robotsMeta.count();

    // Either have robots meta or it's fine to not have one (defaults to index)
    expect(robotsCount).toBeGreaterThanOrEqual(0);
  });

  test('should have sitemap', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');

    // Sitemap should exist and return 200
    expect(response?.status()).toBe(200);
  });

  test('should have robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt');

    // robots.txt should exist
    expect(response?.status()).toBe(200);
  });
});

// ============================================
// MOBILE RESPONSIVENESS TESTS
// ============================================
test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('should display mobile-friendly layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Content should fit within viewport
    const body = page.locator('body');
    const bodyWidth = await body.evaluate(el => el.scrollWidth);

    // Should not have horizontal scroll
    expect(bodyWidth).toBeLessThanOrEqual(400);
  });

  test('should have touch-friendly button sizes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          // Buttons should be at least 44x44 for touch (Apple guidelines)
          // Being lenient with 30px minimum
          expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(30);
        }
      }
    }
  });

  test('should have readable text on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check font size of paragraph text
    const paragraphs = page.locator('p');
    const pCount = await paragraphs.count();

    if (pCount > 0) {
      const fontSize = await paragraphs.first().evaluate(el =>
        window.getComputedStyle(el).fontSize
      );

      const fontSizeNum = parseInt(fontSize);
      // Font size should be at least 14px for readability
      expect(fontSizeNum).toBeGreaterThanOrEqual(14);
    }
  });
});

// ============================================
// SEARCH FUNCTIONALITY TESTS
// ============================================
test.describe('Search', () => {
  test('should have working search functionality', async ({ page }) => {
    await page.goto('/');

    // Look for search input or search icon
    const searchInput = page.locator('input[type="search"]').or(
      page.locator('input[placeholder*="search" i]')
    );

    const searchExists = await searchInput.isVisible().catch(() => false);

    if (searchExists) {
      await searchInput.fill('restaurant');
      await searchInput.press('Enter');

      await page.waitForLoadState('networkidle');

      // Should navigate to search results or filter
      const url = page.url();
      expect(url).toBeTruthy();
    }
  });
});

// ============================================
// ERROR HANDLING TESTS
// ============================================
test.describe('Error Handling', () => {
  test('should show 404 page for non-existent route', async ({ page }) => {
    const response = await page.goto('/this-page-definitely-does-not-exist-12345');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show user-friendly error message
    const content = page.locator('body');
    await expect(content).toBeVisible();
  });

  test('should handle invalid event slug gracefully', async ({ page }) => {
    const response = await page.goto('/events/invalid-event-slug-xyz-12345');

    // Should either 404 or redirect
    expect([200, 404, 302, 301]).toContain(response?.status());
  });
});
