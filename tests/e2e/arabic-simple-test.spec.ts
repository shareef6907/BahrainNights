import { test, expect } from '@playwright/test';

test.describe('Arabic Translation Test', () => {
  test('Switch to Arabic and verify translations', async ({ page }) => {
    // Go to homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Take screenshot of English version
    await page.screenshot({ path: 'tests/screenshots/test-01-english.png', fullPage: true });

    // Find and click the language toggle button (aria-label="Switch to Arabic")
    const langToggle = page.locator('button[aria-label="Switch to Arabic"]');
    await expect(langToggle).toBeVisible({ timeout: 10000 });
    await langToggle.click();

    // Wait for language change to apply
    await page.waitForTimeout(1000);

    // Verify RTL is applied
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl', { timeout: 5000 });

    // Take screenshot of Arabic version
    await page.screenshot({ path: 'tests/screenshots/test-02-arabic-home.png', fullPage: true });

    // Check for Arabic text in navigation
    const navText = await page.locator('nav').textContent();
    console.log('Navigation text in Arabic mode:', navText?.substring(0, 500));

    // Check for Arabic menu items
    const hasArabicEvents = navText?.includes('الفعاليات');
    const hasArabicCinema = navText?.includes('السينما');
    const hasArabicOffers = navText?.includes('العروض');

    console.log('Arabic translations found:');
    console.log('- Events (الفعاليات):', hasArabicEvents);
    console.log('- Cinema (السينما):', hasArabicCinema);
    console.log('- Offers (العروض):', hasArabicOffers);

    // Go to Events page
    await page.goto('http://localhost:3000/events');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/test-03-arabic-events.png', fullPage: true });

    // Go to Cinema page
    await page.goto('http://localhost:3000/cinema');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/test-04-arabic-cinema.png', fullPage: true });

    // Go to Places page
    await page.goto('http://localhost:3000/places');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/test-05-arabic-places.png', fullPage: true });

    // Go to Offers page
    await page.goto('http://localhost:3000/offers');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/test-06-arabic-offers.png', fullPage: true });

    console.log('All screenshots saved to tests/screenshots/');
  });
});
