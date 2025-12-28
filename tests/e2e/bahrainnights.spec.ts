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

    test('should display Now Showing in Cinemas section', async ({ page }) => {
      await page.goto('/');
      // Check for cinema section
      const cinemaSection = page.getByText('Now Showing');
      await expect(cinemaSection.first()).toBeVisible({ timeout: 10000 });
    });

    test('should display movie posters on homepage', async ({ page }) => {
      await page.goto('/');
      // Wait for movies to load
      const movies = page.locator('[data-testid="movie-card"]');
      await expect(movies.first()).toBeVisible({ timeout: 10000 });
    });

    test('should open movie modal when clicking movie', async ({ page }) => {
      await page.goto('/');
      // Wait for movies to load and click the first one
      const movieCard = page.locator('[data-testid="movie-card"]').first();
      await movieCard.waitFor({ state: 'visible', timeout: 10000 });
      await movieCard.click();
      // Check modal is visible
      await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });
    });

    test('navigation links should work', async ({ page }) => {
      await page.goto('/');

      // Test Cinema link
      await page.click('text=Cinema');
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
      await expect(page.getByRole('heading', { name: /events/i }).first()).toBeVisible();
    });

    test('should display category filters', async ({ page }) => {
      await page.goto('/events');
      // Check for categories sidebar
      await expect(page.getByText('Categories')).toBeVisible();
      await expect(page.getByText('All Events')).toBeVisible();
    });

    test('should display time filters', async ({ page }) => {
      await page.goto('/events');
      await expect(page.getByText('All Dates')).toBeVisible();
      await expect(page.getByText('Today')).toBeVisible();
      await expect(page.getByText('This Weekend')).toBeVisible();
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
  });

  // ==================== CINEMA PAGE ====================
  test.describe('Cinema Page', () => {
    test('should load cinema page instantly (no loading state)', async ({ page }) => {
      await page.goto('/cinema');
      // Should NOT see loading message
      await expect(page.getByText('Loading movies...')).not.toBeVisible();
      // Should see content immediately
      await expect(page.getByText('Now Showing')).toBeVisible();
    });

    test('should display movies', async ({ page }) => {
      await page.goto('/cinema');
      const movies = page.locator('[data-testid="movie-card"]');
      await expect(movies.first()).toBeVisible({ timeout: 10000 });
    });

    test('should have tab switcher for Now Showing and Coming Soon', async ({ page }) => {
      await page.goto('/cinema');
      await expect(page.getByRole('button', { name: 'Now Showing' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Coming Soon' })).toBeVisible();
    });

    test('should switch between Now Showing and Coming Soon', async ({ page }) => {
      await page.goto('/cinema');
      // Click Coming Soon tab
      await page.click('button:has-text("Coming Soon")');
      // URL should update
      await expect(page).toHaveURL(/filter=coming-soon/);
    });

    test('should open movie modal with booking options', async ({ page }) => {
      await page.goto('/cinema');
      // Click first movie
      const movieCard = page.locator('[data-testid="movie-card"]').first();
      await movieCard.waitFor({ state: 'visible', timeout: 10000 });
      await movieCard.click();

      // Modal should be visible
      await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible({ timeout: 5000 });

      // Book Tickets text should be visible
      await expect(page.getByText('Book Tickets')).toBeVisible();
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

    test('should show error if submitting without cover image', async ({ page }) => {
      await page.goto('/list-event');

      // Fill required fields
      await page.fill('input[name="eventName"]', 'Test Event');
      await page.selectOption('select[name="category"]', 'dining');
      await page.fill('input[name="date"]', '2025-12-31');
      await page.fill('input[name="time"]', '19:00');
      await page.fill('input[name="contactName"]', 'Test User');
      await page.fill('input[name="contactEmail"]', 'test@example.com');

      // Try to submit without cover image
      await page.click('button[type="submit"]');

      // Should show error about cover image
      await expect(page.getByText(/cover image/i)).toBeVisible();
    });
  });

  // ==================== NAVIGATION & LINKS ====================
  test.describe('Navigation', () => {
    test('should navigate to Events page', async ({ page }) => {
      await page.goto('/');
      await page.click('text=Events');
      await expect(page).toHaveURL(/events/);
    });

    test('should navigate to Cinema page', async ({ page }) => {
      await page.goto('/');
      await page.click('text=Cinema');
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

    test('should close mobile menu when clicking a link', async ({ page }) => {
      await page.goto('/');
      await page.click('[data-testid="mobile-menu-button"]');
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible({ timeout: 3000 });

      // Click on the Cinema accordion to expand it
      await page.click('text=Cinema');
      await page.click('text=View All');

      // Menu should close and navigate
      await expect(page).toHaveURL(/cinema/);
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
      await expect(page.getByText('Now Showing')).toBeVisible();
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
