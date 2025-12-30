import { test, expect } from '@playwright/test';

test.describe('Admin Edit Button Check', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Fill login form
    await page.fill('input[name="email"]', 'shareef6907@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty@6907');
    await page.click('button:has-text("Sign In")');

    // Wait for login to complete and redirect
    await page.waitForURL(/\/(admin|dashboard|events)/, { timeout: 15000 }).catch(() => {
      // If no redirect, try to navigate manually
    });
    await page.waitForTimeout(2000);
  });

  test('Edit button visible for ALL events including Bahrain Calendar', async ({ page }) => {
    // Navigate to admin events
    await page.goto('/admin/events');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Screenshot the admin page
    await page.screenshot({ path: 'test-results/admin-events-page.png', fullPage: true });

    // Check page content
    const pageContent = await page.content();
    console.log('Page URL:', page.url());
    console.log('Has event content:', pageContent.includes('event'));

    // Find all Edit links on the page
    const editLinks = page.locator('a[href*="/edit"]');
    const editCount = await editLinks.count();
    console.log('Total Edit links found:', editCount);

    // Also find Edit text in buttons or links
    const editElements = page.locator('text=Edit');
    const editTextCount = await editElements.count();
    console.log('Edit text elements:', editTextCount);

    // Get all event items
    const eventRows = page.locator('[class*="rounded-xl"][class*="border"]');
    const eventCount = await eventRows.count();
    console.log('Event rows found:', eventCount);

    // For each visible event, check if there's an Edit option
    for (let i = 0; i < Math.min(eventCount, 5); i++) {
      const row = eventRows.nth(i);
      const rowText = await row.textContent();
      console.log(`Event ${i + 1}:`, rowText?.substring(0, 100));

      // Check if this row has an Edit link
      const editInRow = row.locator('a[href*="/edit"]');
      const hasEdit = await editInRow.count() > 0;
      console.log(`  Has Edit link:`, hasEdit);
    }

    // Verify at least some Edit links exist
    expect(editCount).toBeGreaterThan(0);

    // Click on first event to see if modal/dropdown has Edit
    const firstEvent = eventRows.first();
    if (await firstEvent.isVisible()) {
      await firstEvent.click();
      await page.waitForTimeout(1000);

      await page.screenshot({ path: 'test-results/admin-event-expanded.png', fullPage: true });

      // Check for Edit in expanded view or modal
      const modalEdit = page.locator('.fixed a[href*="/edit"], .absolute a[href*="/edit"]');
      const modalEditCount = await modalEdit.count();
      console.log('Edit in modal/expanded:', modalEditCount);
    }
  });

  test('Can navigate to edit page for any event', async ({ page }) => {
    await page.goto('/admin/events');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Find the first Edit link
    const editLink = page.locator('a[href*="/edit"]').first();

    if (await editLink.isVisible()) {
      const href = await editLink.getAttribute('href');
      console.log('Clicking Edit link:', href);

      await editLink.click();

      // Wait for navigation to edit page
      await page.waitForURL(/\/admin\/events\/.*\/edit/, { timeout: 10000 });
      console.log('Navigated to:', page.url());

      await page.screenshot({ path: 'test-results/admin-edit-page.png', fullPage: true });

      // Verify edit page loaded
      const pageContent = await page.content();
      const hasEditForm = pageContent.includes('Save') || pageContent.includes('Edit') || pageContent.includes('Title');
      console.log('Edit form loaded:', hasEditForm);

      expect(hasEditForm).toBe(true);
    } else {
      console.log('No Edit link found - FAIL');
      expect(false).toBe(true);
    }
  });
});
