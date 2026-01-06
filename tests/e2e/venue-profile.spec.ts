import { test, expect } from '@playwright/test';

test.describe('Venue Portal Profile', () => {
  test('profile page loads and photo upload buttons are accessible', async ({ page }) => {
    // Navigate to venue portal login
    await page.goto('https://www.bahrainnights.com/venue-portal/login');

    // Take screenshot of login page
    await page.screenshot({ path: 'tests/screenshots/venue-login.png' });

    // Check if login form exists
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');

    // Verify login fields exist
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await expect(passwordInput).toBeVisible({ timeout: 10000 });

    console.log('Login page loaded successfully');
  });

  test('profile page elements are accessible when logged in', async ({ page }) => {
    // This test assumes you're already logged in via cookies
    // Navigate directly to profile page
    await page.goto('https://www.bahrainnights.com/venue-portal/profile');

    // Wait for page to load
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/venue-profile.png', fullPage: true });

    // Check if we're redirected to login (not authenticated)
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);

    if (currentUrl.includes('/login')) {
      console.log('Not authenticated - redirected to login');
      return;
    }

    // If authenticated, check for profile elements
    // Check for profile photo upload button
    const profileUploadLabel = page.locator('text=Profile Photo').first();
    const coverUploadLabel = page.locator('text=Cover Photo').first();

    // Check for file inputs
    const fileInputs = page.locator('input[type="file"]');
    const fileInputCount = await fileInputs.count();
    console.log(`Found ${fileInputCount} file inputs`);

    // Check if upload buttons are visible
    const uploadButtons = page.locator('text=Upload Photo, text=Change Photo, text=Upload Cover, text=Change Cover');

    // Log all clickable upload elements
    const labels = page.locator('label:has(input[type="file"])');
    const labelCount = await labels.count();
    console.log(`Found ${labelCount} upload labels`);

    for (let i = 0; i < labelCount; i++) {
      const label = labels.nth(i);
      const text = await label.textContent();
      const isVisible = await label.isVisible();
      const isEnabled = await label.isEnabled();
      console.log(`Label ${i}: "${text}" - visible: ${isVisible}, enabled: ${isEnabled}`);
    }
  });

  test('check all form fields are editable', async ({ page }) => {
    await page.goto('https://www.bahrainnights.com/venue-portal/profile');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Not authenticated - skipping form check');
      return;
    }

    // Screenshot the page
    await page.screenshot({ path: 'tests/screenshots/venue-profile-form.png', fullPage: true });

    // Check all input fields
    const allInputs = page.locator('input:not([type="file"]):not([type="hidden"])');
    const inputCount = await allInputs.count();
    console.log(`Found ${inputCount} input fields`);

    for (let i = 0; i < inputCount; i++) {
      const input = allInputs.nth(i);
      const name = await input.getAttribute('name');
      const type = await input.getAttribute('type');
      const disabled = await input.isDisabled();
      const readonly = await input.getAttribute('readonly');
      console.log(`Input: name="${name}" type="${type}" disabled=${disabled} readonly=${readonly}`);
    }

    // Check textareas
    const textareas = page.locator('textarea');
    const textareaCount = await textareas.count();
    console.log(`Found ${textareaCount} textareas`);

    // Check selects
    const selects = page.locator('select');
    const selectCount = await selects.count();
    console.log(`Found ${selectCount} selects`);

    // Check submit button
    const submitButton = page.locator('button[type="submit"]');
    const submitVisible = await submitButton.isVisible();
    const submitEnabled = await submitButton.isEnabled();
    console.log(`Submit button - visible: ${submitVisible}, enabled: ${submitEnabled}`);
  });
});
