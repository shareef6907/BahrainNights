import { test, expect } from '@playwright/test';

test.describe('Arabic Translation System', () => {
  test('should display language toggle and switch to Arabic', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.bahrainnights.com');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot of initial state (English)
    await page.screenshot({ path: 'tests/screenshots/01-homepage-english.png', fullPage: false });

    // Verify English text is showing
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toContainText('Bahrain', { timeout: 10000 });
    console.log('✅ English hero title visible');

    // Look for the language toggle button (pill variant with Globe icon)
    const languageToggle = page.locator('button').filter({ hasText: /ع|EN/ }).first();

    // Verify toggle exists
    await expect(languageToggle).toBeVisible({ timeout: 10000 });
    console.log('✅ Language toggle found on homepage');

    // Click to switch to Arabic
    await languageToggle.click();
    await page.waitForTimeout(1500); // Wait for state change

    // Take screenshot after switching to Arabic
    await page.screenshot({ path: 'tests/screenshots/02-homepage-arabic.png', fullPage: false });

    // Verify RTL direction is applied
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('rtl');
    console.log('✅ RTL direction applied');

    // Verify html lang attribute changed to 'ar'
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('ar');
    console.log('✅ Language attribute set to Arabic');

    // Verify Arabic text is showing (hero title should be in Arabic)
    await expect(heroTitle).toContainText('البحرين', { timeout: 5000 });
    console.log('✅ Arabic text displayed in hero');
  });

  test('should persist language preference across navigation', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.bahrainnights.com');
    await page.waitForLoadState('networkidle');

    // Switch to Arabic
    const languageToggle = page.locator('button').filter({ hasText: /ع|EN/ }).first();
    await languageToggle.click();
    await page.waitForTimeout(1000);

    // Navigate to events page
    await page.goto('https://www.bahrainnights.com/events');
    await page.waitForLoadState('networkidle');

    // Take screenshot of events page in Arabic
    await page.screenshot({ path: 'tests/screenshots/03-events-arabic.png', fullPage: false });

    // Verify Arabic is still active (RTL should persist)
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('rtl');
    console.log('✅ Arabic persists on events page');
  });

  test('should switch back to English', async ({ page }) => {
    // Navigate with Arabic already set (from localStorage)
    await page.goto('https://www.bahrainnights.com');
    await page.waitForLoadState('networkidle');

    // First switch to Arabic
    const languageToggle = page.locator('button').filter({ hasText: /ع|EN/ }).first();
    await languageToggle.click();
    await page.waitForTimeout(1000);

    // Now switch back to English
    await languageToggle.click();
    await page.waitForTimeout(1000);

    // Take screenshot back in English
    await page.screenshot({ path: 'tests/screenshots/04-homepage-back-english.png', fullPage: false });

    // Verify LTR direction
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('ltr');
    console.log('✅ Switched back to English (LTR)');

    // Verify lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');
    console.log('✅ Language attribute set to English');
  });

  test('should display language toggle in mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to homepage
    await page.goto('https://www.bahrainnights.com');
    await page.waitForLoadState('networkidle');

    // Take screenshot of mobile view
    await page.screenshot({ path: 'tests/screenshots/05-mobile-homepage.png', fullPage: false });

    // Open mobile menu (hamburger button)
    const mobileMenuButton = page.locator('button[data-testid="mobile-menu-button"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      // Take screenshot of mobile menu
      await page.screenshot({ path: 'tests/screenshots/06-mobile-menu-open.png', fullPage: false });

      // Look for language toggle in mobile menu
      const mobileLanguageToggle = page.locator('[data-testid="mobile-menu"] button').filter({ hasText: /ع|EN|العربية|English/ });

      if (await mobileLanguageToggle.count() > 0) {
        console.log('✅ Language toggle found in mobile menu');
      } else {
        // Check for any language toggle button in the menu
        const anyToggle = page.locator('button').filter({ hasText: /العربية|English/ });
        await expect(anyToggle.first()).toBeVisible();
        console.log('✅ Language toggle visible in mobile view');
      }
    }
  });
});
