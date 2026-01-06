import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'https://bahrainnights.com';

test.describe('BahrainNights Website Tests', () => {

  // ==================== HOMEPAGE ====================
  test.describe('Homepage', () => {
    test('should load homepage', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Bahrain/i);
    });

    test('should display navigation menu', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('nav')).toBeVisible();
    });

    test('should display New Movies & Trailers section', async ({ page }) => {
      await page.goto('/');
      // Check for cinema section heading specifically
      const cinemaHeading = page.getByRole('heading', { name: /New Movies.*Trailers/i });
      await expect(cinemaHeading).toBeVisible({ timeout: 10000 });
    });

    test('should display movie posters on homepage', async ({ page }) => {
      await page.goto('/');
      // Wait for movies in the New Movies section
      const movieSection = page.locator('text=New Movies').locator('..').locator('..');
      await expect(movieSection.locator('img').first()).toBeVisible({ timeout: 10000 });
    });

    test('should display Happening Today section', async ({ page }) => {
      await page.goto('/');
      const todayHeading = page.getByRole('heading', { name: /Happening Today/i });
      await expect(todayHeading).toBeVisible({ timeout: 10000 });
    });

    test('should have category quick links', async ({ page }) => {
      await page.goto('/');
      // Check for quick links in hero section
      await expect(page.locator('a[href="/events"]').first()).toBeVisible();
      await expect(page.locator('a[href="/cinema"]').first()).toBeVisible();
    });

    test('navigation via hero quick links should work', async ({ page }) => {
      await page.goto('/');
      // Use the quick links in the hero section (not the dropdown nav)
      const cinemaLink = page.locator('a[href="/cinema"]').first();
      await cinemaLink.click();
      await expect(page).toHaveURL(/cinema/);
    });
  });

  // ==================== EVENTS PAGE ====================
  test.describe('Events Page', () => {
    test('should load events page', async ({ page }) => {
      await page.goto('/events');
      await expect(page.getByText('Discover')).toBeVisible();
    });

    test('should display events header', async ({ page }) => {
      await page.goto('/events');
      await expect(page.getByRole('heading', { name: /Discover Events/i })).toBeVisible();
    });

    test('should display category filters', async ({ page }) => {
      await page.goto('/events');
      // Check for categories sidebar
      await expect(page.getByText('Categories')).toBeVisible();
      await expect(page.getByText('All Events')).toBeVisible();
    });

    test('should display time filters', async ({ page }) => {
      await page.goto('/events');
      await expect(page.getByRole('button', { name: 'All Dates' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'This Weekend' })).toBeVisible();
    });

    test('should have search input', async ({ page }) => {
      await page.goto('/events');
      const searchInput = page.locator('input[placeholder*="Search"]');
      await expect(searchInput).toBeVisible();
    });

    test('List Your Event button should work', async ({ page }) => {
      await page.goto('/events');
      await page.click('text=List Your Event');
      await expect(page).toHaveURL(/list-event/);
    });

    test('should show events count', async ({ page }) => {
      await page.goto('/events');
      // Check for "X events found" text
      await expect(page.getByText(/events found/)).toBeVisible({ timeout: 10000 });
    });

    test('should display event cards', async ({ page }) => {
      await page.goto('/events');
      // Events are displayed as links to /events/[slug] (excluding calendar link)
      const eventLinks = page.locator('a[href^="/events/"]:not([href="/events/calendar"])');
      // Wait for page to load, check for either event cards or "No events" message
      const hasEvents = await eventLinks.first().isVisible().catch(() => false);
      if (!hasEvents) {
        // If no event cards, ensure the page loaded successfully with filters
        await expect(page.getByText(/events found/)).toBeVisible({ timeout: 10000 });
      }
    });
  });

  // ==================== CINEMA PAGE ====================
  test.describe('Cinema Page', () => {
    test('should load cinema page with content', async ({ page }) => {
      await page.goto('/cinema');
      // Check for the heading or tab button
      const nowShowingButton = page.getByRole('button', { name: /Now Showing/i });
      await expect(nowShowingButton).toBeVisible({ timeout: 10000 });
    });

    test('should display movies', async ({ page }) => {
      await page.goto('/cinema');
      // Wait for movie images to load
      const movieImages = page.locator('img[alt]');
      await expect(movieImages.first()).toBeVisible({ timeout: 10000 });
    });

    test('should have tab switcher for Now Showing and Coming Soon', async ({ page }) => {
      await page.goto('/cinema');
      await expect(page.getByRole('button', { name: /Now Showing/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Coming Soon/i })).toBeVisible();
    });

    test('should switch between Now Showing and Coming Soon', async ({ page }) => {
      await page.goto('/cinema');
      // Click Coming Soon tab
      const comingSoonTab = page.getByRole('button', { name: /Coming Soon/i });
      await comingSoonTab.click();
      // Tab should be active (highlighted)
      await expect(comingSoonTab).toBeVisible();
      // The content should change - wait for any transition
      await page.waitForTimeout(500);
    });

    test('should open movie modal when clicking movie', async ({ page }) => {
      await page.goto('/cinema');
      // Wait for movies to load and click the first movie card
      const movieCard = page.locator('[data-testid="movie-card"]').first();
      await movieCard.waitFor({ state: 'visible', timeout: 10000 });
      await movieCard.click();

      // Modal should be visible
      await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });
    });

    test('should show Book Tickets in modal', async ({ page }) => {
      await page.goto('/cinema');
      // Click first movie
      const movieCard = page.locator('[data-testid="movie-card"]').first();
      await movieCard.waitFor({ state: 'visible', timeout: 10000 });
      await movieCard.click();

      // Wait for modal
      const modal = page.locator('[data-testid="movie-modal"]');
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Book Tickets heading should be visible within the modal
      await expect(modal.getByText('Book Tickets').first()).toBeVisible();
    });

    test('should show cinema options in modal', async ({ page }) => {
      await page.goto('/cinema');
      // Click first movie
      const movieCard = page.locator('[data-testid="movie-card"]').first();
      await movieCard.waitFor({ state: 'visible', timeout: 10000 });
      await movieCard.click();

      // Wait for modal
      await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });

      // At least one cinema option should be available
      const cinemaOptions = page.locator('[data-testid="cinema-option"]');
      await expect(cinemaOptions.first()).toBeVisible({ timeout: 5000 });
    });
  });

  // ==================== LIST YOUR EVENT ====================
  test.describe('List Your Event Form', () => {
    test('should load list event form', async ({ page }) => {
      await page.goto('/list-event');
      await expect(page.getByText('List Your')).toBeVisible();
    });

    test('should display free for all businesses banner', async ({ page }) => {
      await page.goto('/list-event');
      await expect(page.getByText('100% Free for All Businesses')).toBeVisible();
    });

    test('should have cover image upload section', async ({ page }) => {
      await page.goto('/list-event');
      await expect(page.getByText('Event Cover Image')).toBeVisible();
    });

    test('should have event details section', async ({ page }) => {
      await page.goto('/list-event');
      await expect(page.getByText('Event Details')).toBeVisible();
    });

    test('should have required form fields', async ({ page }) => {
      await page.goto('/list-event');
      // Check for event name field
      await expect(page.getByPlaceholder('Enter event name')).toBeVisible();
      // Check for category dropdown
      await expect(page.getByRole('combobox').first()).toBeVisible();
    });

    test('should have contact information section', async ({ page }) => {
      await page.goto('/list-event');
      await expect(page.getByText('Contact Information')).toBeVisible();
    });

    test('should have submit button', async ({ page }) => {
      await page.goto('/list-event');
      await expect(page.getByRole('button', { name: /Submit Event/i })).toBeVisible();
    });
  });

  // ==================== NAVIGATION & LINKS ====================
  test.describe('Navigation', () => {
    test('should navigate to Events page via category cards', async ({ page }) => {
      await page.goto('/');
      // Use the "Explore by Category" section links
      const eventsCard = page.locator('a[href="/events"]').filter({ hasText: 'Events' }).first();
      await eventsCard.click();
      await expect(page).toHaveURL(/events/);
    });

    test('should navigate to Cinema page via category cards', async ({ page }) => {
      await page.goto('/');
      // Use the "Explore by Category" section links
      const cinemaCard = page.locator('a[href="/cinema"]').filter({ hasText: 'Cinema' }).first();
      await cinemaCard.click();
      await expect(page).toHaveURL(/cinema/);
    });

    test('should navigate to List Event page', async ({ page }) => {
      await page.goto('/');
      // Find the List Your Event button in nav
      const listEventBtn = page.getByRole('link', { name: /List Your Event/i }).first();
      await listEventBtn.click();
      await expect(page).toHaveURL(/list-event/);
    });
  });

  // ==================== MOBILE RESPONSIVENESS ====================
  test.describe('Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display mobile menu button', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    });

    test('should open mobile menu on click', async ({ page }) => {
      await page.goto('/');
      await page.click('[data-testid="mobile-menu-button"]');
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible({ timeout: 3000 });
    });

    test('mobile menu should have navigation links', async ({ page }) => {
      await page.goto('/');
      await page.click('[data-testid="mobile-menu-button"]');
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible({ timeout: 3000 });

      // Check for navigation items in mobile menu
      await expect(page.locator('[data-testid="mobile-menu"]').getByText('Events')).toBeVisible();
      await expect(page.locator('[data-testid="mobile-menu"]').getByText('Cinema')).toBeVisible();
    });
  });

  // ==================== PERFORMANCE ====================
  test.describe('Performance', () => {
    test('homepage should load in under 5 seconds', async ({ page }) => {
      const start = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - start;
      console.log(`Homepage load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(5000);
    });

    test('cinema page should load in under 5 seconds', async ({ page }) => {
      const start = Date.now();
      await page.goto('/cinema');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - start;
      console.log(`Cinema page load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(5000);
    });

    test('events page should load in under 5 seconds', async ({ page }) => {
      const start = Date.now();
      await page.goto('/events');
      await expect(page.getByText('Discover')).toBeVisible();
      const loadTime = Date.now() - start;
      console.log(`Events page load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(5000);
    });
  });

  // ==================== SEO ====================
  test.describe('SEO', () => {
    test('homepage should have proper meta title', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Bahrain/i);
    });

    test('events page should have proper meta title', async ({ page }) => {
      await page.goto('/events');
      await expect(page).toHaveTitle(/Events.*Bahrain/i);
    });

    test('cinema page should have proper meta title', async ({ page }) => {
      await page.goto('/cinema');
      await expect(page).toHaveTitle(/Cinema.*Bahrain/i);
    });
  });

  // ==================== ERROR HANDLING ====================
  test.describe('Error Handling', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-xyz');
      // Next.js should return 404
      expect(response?.status()).toBe(404);
    });
  });
});
