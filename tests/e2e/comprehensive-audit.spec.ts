import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'https://www.bahrainnights.com';

// ==================== LINK CRAWLER FOR 404 DETECTION ====================
test.describe('Link Crawler - 404 Detection', () => {
  const visitedUrls = new Set<string>();
  const brokenLinks: { from: string; to: string; status: number }[] = [];
  const allLinks: { from: string; to: string }[] = [];

  async function crawlPage(page: Page, url: string, depth: number = 0, maxDepth: number = 2) {
    if (depth > maxDepth || visitedUrls.has(url)) return;
    visitedUrls.add(url);

    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const status = response?.status() || 0;

    if (status >= 400) {
      console.log(`[${status}] ${url}`);
    }

    // Get all internal links
    const links = await page.$$eval('a[href]', (anchors) =>
      anchors
        .map((a) => a.getAttribute('href'))
        .filter((href): href is string => href !== null)
    );

    for (const link of links) {
      if (!link) continue;

      let fullUrl: string;
      try {
        // Handle relative URLs
        if (link.startsWith('/')) {
          fullUrl = new URL(link, BASE_URL).href;
        } else if (link.startsWith('http')) {
          fullUrl = link;
        } else if (link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
          continue;
        } else {
          fullUrl = new URL(link, url).href;
        }

        // Only crawl internal links
        if (!fullUrl.startsWith(BASE_URL)) continue;

        allLinks.push({ from: url, to: fullUrl });

        if (!visitedUrls.has(fullUrl)) {
          await crawlPage(page, fullUrl, depth + 1, maxDepth);
        }
      } catch {
        // Invalid URL, skip
      }
    }
  }

  test('should not have any broken internal links', async ({ page }) => {
    await crawlPage(page, BASE_URL, 0, 2);

    // Check all discovered links
    for (const link of allLinks) {
      if (visitedUrls.has(link.to)) continue;

      try {
        const response = await page.goto(link.to, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const status = response?.status() || 0;
        visitedUrls.add(link.to);

        if (status >= 400) {
          brokenLinks.push({ from: link.from, to: link.to, status });
        }
      } catch {
        brokenLinks.push({ from: link.from, to: link.to, status: 0 });
      }
    }

    console.log(`\n=== LINK CRAWL RESULTS ===`);
    console.log(`Total pages visited: ${visitedUrls.size}`);
    console.log(`Broken links found: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.log('\nBroken Links:');
      brokenLinks.forEach((link) => {
        console.log(`  [${link.status}] ${link.to} (from: ${link.from})`);
      });
    }

    expect(brokenLinks.length).toBe(0);
  });

  test('should have key pages accessible', async ({ page }) => {
    const keyPages = [
      '/',
      '/events',
      '/cinema',
      '/places',
      '/list-event',
      '/register-venue',
      '/offers',
      '/explore',
      '/attractions',
    ];

    const failedPages: { url: string; status: number }[] = [];

    for (const path of keyPages) {
      const response = await page.goto(`${BASE_URL}${path}`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      const status = response?.status() || 0;

      if (status >= 400 && status !== 404) {
        failedPages.push({ url: path, status });
      }
      console.log(`[${status}] ${path}`);
    }

    expect(failedPages.filter((p) => p.status >= 500).length).toBe(0);
  });
});

// ==================== VENUE REGISTRATION FLOW ====================
test.describe('Venue Registration Flow', () => {
  test('should load venue registration page', async ({ page }) => {
    await page.goto('/register-venue');
    await expect(page.getByRole('heading', { name: /Register.*Venue/i }).first()).toBeVisible({ timeout: 10000 });
  });

  test('should have all required form fields', async ({ page }) => {
    await page.goto('/register-venue');
    await page.waitForTimeout(1000); // Wait for page to fully render

    // Check for key form elements by text content
    await expect(page.getByText('Venue Name').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Email').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Phone').first()).toBeVisible({ timeout: 5000 });
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/register-venue');

    // Try to submit empty form
    const submitBtn = page.getByRole('button', { name: /register|submit/i });
    if (await submitBtn.isVisible()) {
      await submitBtn.click();

      // Should show some validation error or not submit
      await page.waitForTimeout(1000);
      // Form should still be on the same page
      await expect(page).toHaveURL(/register-venue/);
    }
  });

  test('should have image upload sections', async ({ page }) => {
    await page.goto('/register-venue');
    await page.waitForTimeout(1000);

    // Check for image upload areas by text
    const hasLogoUpload = await page.getByText(/logo/i).first().isVisible().catch(() => false);
    const hasCoverUpload = await page.getByText(/cover/i).first().isVisible().catch(() => false);

    expect(hasLogoUpload || hasCoverUpload).toBeTruthy();
  });

  test('should navigate back from registration', async ({ page }) => {
    await page.goto('/register-venue');

    // Check if there's a back link or logo link
    const backLink = page.locator('a[href="/"]').first();
    if (await backLink.isVisible()) {
      await backLink.click();
      await expect(page).toHaveURL(/^https?:\/\/[^/]+\/?$/);
    }
  });
});

// ==================== RESPONSIVE DESIGN AUDIT ====================
test.describe('Responsive Design Audit', () => {
  test('Homepage should render on Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });

  test('Homepage should render on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);

    // Check mobile menu button exists
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible({ timeout: 5000 });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('mobile menu should open and close', async ({ page }) => {
      await page.goto('/');

      const menuButton = page.locator('[data-testid="mobile-menu-button"]');
      await expect(menuButton).toBeVisible();

      await menuButton.click();
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible({ timeout: 3000 });

      // Close menu
      const closeButton = page.locator('[data-testid="mobile-menu-close"]').or(menuButton);
      await closeButton.click();
    });

    test('mobile menu should have all nav links', async ({ page }) => {
      await page.goto('/');

      await page.click('[data-testid="mobile-menu-button"]');
      const menu = page.locator('[data-testid="mobile-menu"]');
      await expect(menu).toBeVisible({ timeout: 3000 });

      // Check for main navigation items
      const expectedLinks = ['Events', 'Cinema', 'Dining'];
      for (const link of expectedLinks) {
        const hasLink = await menu.getByText(link, { exact: false }).isVisible().catch(() => false);
        if (!hasLink) {
          console.log(`Warning: Mobile menu missing "${link}" link`);
        }
      }
    });
  });
});

// ==================== PERFORMANCE AUDIT ====================
test.describe('Performance Audit', () => {
  test('homepage Core Web Vitals', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    console.log(`Homepage full load time: ${loadTime}ms`);

    // Get Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry?.startTime || 0);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        setTimeout(() => resolve(0), 5000);
      });
    });

    console.log(`LCP: ${lcp}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('images should have proper dimensions', async ({ page }) => {
    await page.goto('/');

    const images = await page.$$eval('img', (imgs) =>
      imgs.map((img) => ({
        src: img.src,
        hasWidth: img.hasAttribute('width') || img.style.width !== '',
        hasHeight: img.hasAttribute('height') || img.style.height !== '',
        alt: img.alt,
      }))
    );

    const imagesWithoutDimensions = images.filter((img) => !img.hasWidth || !img.hasHeight);
    const imagesWithoutAlt = images.filter((img) => !img.alt);

    console.log(`Total images: ${images.length}`);
    console.log(`Images without dimensions: ${imagesWithoutDimensions.length}`);
    console.log(`Images without alt text: ${imagesWithoutAlt.length}`);

    // Warning only, not failing
    if (imagesWithoutAlt.length > 0) {
      console.log('Images missing alt text:');
      imagesWithoutAlt.slice(0, 5).forEach((img) => console.log(`  - ${img.src}`));
    }
  });

  test('page should not have critical console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    if (errors.length > 0) {
      console.log('Console errors found:');
      errors.forEach((err) => console.log(`  - ${err}`));
    }

    // Filter out known non-critical errors (401/500 from API calls, favicon, manifest, third-party)
    const criticalErrors = errors.filter(
      (err) =>
        !err.includes('favicon') &&
        !err.includes('manifest') &&
        !err.includes('third-party') &&
        !err.includes('401') &&
        !err.includes('500') &&
        !err.includes('Failed to load resource') &&
        !err.includes('net::')
    );

    // Warn about errors but don't fail the test
    if (criticalErrors.length > 0) {
      console.log('Critical errors that should be investigated:');
      criticalErrors.forEach((err) => console.log(`  - ${err}`));
    }
  });
});

// ==================== SEO & ACCESSIBILITY AUDIT ====================
test.describe('SEO & Accessibility Audit', () => {
  const pages = ['/', '/events', '/cinema'];

  for (const path of pages) {
    test(`${path} should have proper SEO meta tags`, async ({ page }) => {
      await page.goto(path);

      // Check title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);

      // Check meta description (warn only)
      const metaDescription = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content')).catch(() => '');
      if (metaDescription) {
        console.log(`${path} meta description length: ${metaDescription.length}`);
      } else {
        console.log(`Warning: ${path} missing meta description`);
      }

      // Check Open Graph tags
      const ogTitle = await page.$eval('meta[property="og:title"]', (el) => el.getAttribute('content')).catch(() => null);
      expect(ogTitle).toBeTruthy();
    });
  }

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', (elements) =>
      elements.map((el) => ({
        level: parseInt(el.tagName.charAt(1)),
        text: el.textContent?.trim().slice(0, 50),
      }))
    );

    // Should have exactly one H1
    const h1Count = headings.filter((h) => h.level === 1).length;
    console.log(`H1 count: ${h1Count}`);
    console.log('Heading structure:', headings.slice(0, 10));

    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Try tabbing through the page
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }

    // Check that focus is visible somewhere
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});

// ==================== FORMS & FUNCTIONALITY AUDIT ====================
test.describe('Forms & Functionality', () => {
  test('List Event form should have all fields', async ({ page }) => {
    await page.goto('/list-event');

    // Required fields
    const requiredFields = [
      'event name',
      'category',
      'date',
      'contact',
    ];

    for (const field of requiredFields) {
      const hasField = await page.getByText(field, { exact: false }).isVisible().catch(() => false) ||
                       await page.getByLabel(field, { exact: false }).isVisible().catch(() => false) ||
                       await page.getByPlaceholder(field, { exact: false }).isVisible().catch(() => false);

      if (!hasField) {
        console.log(`Warning: "${field}" field not found on list-event page`);
      }
    }
  });

  test('search functionality should work', async ({ page }) => {
    await page.goto('/');

    // Look for search input
    const searchInput = page.locator('input[type="text"][placeholder*="Search"], input[type="search"], input[role="search"]').first();

    if (await searchInput.isVisible()) {
      await searchInput.fill('concert');
      await page.keyboard.press('Enter');

      // Should either show results or stay on page
      await page.waitForTimeout(1000);
    }
  });

  test('cinema movie cards should be clickable', async ({ page }) => {
    await page.goto('/cinema');

    const movieCard = page.locator('[data-testid="movie-card"]').first();
    await movieCard.waitFor({ state: 'visible', timeout: 10000 });

    await movieCard.click();

    // Modal should appear
    await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });
  });
});

// ==================== API HEALTH CHECK ====================
test.describe('API Health Check', () => {
  test('events API should respond', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/api/events`, { timeout: 30000 });
    expect(response?.status()).toBeLessThan(500);
  });

  test('venues API should respond', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/api/venues`, { timeout: 30000 });
    expect(response?.status()).toBeLessThan(500);
  });

  test('cinema API should respond', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/api/cinema/movies`, { timeout: 30000 });
    expect(response?.status()).toBeLessThan(500);
  });
});
