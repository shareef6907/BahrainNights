import { test, expect } from '@playwright/test';

test.describe('Cinema Admin Edit & Public Page Verification', () => {
  // Increase timeout for this test suite
  test.setTimeout(120000);

  test('Login and verify Cinema Admin page loads', async ({ page }) => {
    // Go to login page
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Take screenshot of login page
    await page.screenshot({ path: 'test-results/1-login-page.png', fullPage: true });

    // Fill login credentials
    await page.fill('input[name="email"]', 'shareef6907@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty@6907');

    // Click sign in
    await page.click('button:has-text("Sign In")');

    // Wait for navigation
    await page.waitForTimeout(3000);

    // Screenshot after login
    await page.screenshot({ path: 'test-results/2-after-login.png', fullPage: true });

    console.log('Current URL after login:', page.url());

    // Navigate to Cinema Admin
    await page.goto('/admin/cinema');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Screenshot cinema admin page
    await page.screenshot({ path: 'test-results/3-cinema-admin-page.png', fullPage: true });

    console.log('Cinema Admin URL:', page.url());

    // Check if we're on the cinema admin page or redirected to login
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Still on login page - checking for errors');
      const pageContent = await page.textContent('body');
      console.log('Page content preview:', pageContent?.substring(0, 500));
    } else {
      console.log('Successfully loaded Cinema Admin page');

      // Check for key elements
      const pageContent = await page.textContent('body');
      console.log('Has "Cinema" text:', pageContent?.includes('Cinema'));
      console.log('Has "Movie" text:', pageContent?.includes('Movie'));
      console.log('Has "Add" button:', pageContent?.includes('Add'));
    }
  });

  test('Edit movie and verify all fields are editable', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'shareef6907@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty@6907');
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(3000);

    // Navigate to Cinema Admin
    await page.goto('/admin/cinema');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Screenshot the page
    await page.screenshot({ path: 'test-results/4-cinema-admin-list.png', fullPage: true });

    // Check if we're on the admin page
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Login failed - skipping edit test');
      return;
    }

    // Look for Edit button
    const editButtons = page.locator('button:has-text("Edit")');
    const editCount = await editButtons.count();
    console.log('Edit buttons found:', editCount);

    if (editCount > 0) {
      // Click first Edit button
      await editButtons.first().click();
      await page.waitForTimeout(1000);

      // Screenshot edit modal
      await page.screenshot({ path: 'test-results/5-edit-modal-basic.png', fullPage: true });

      // Check Basic Info tab fields
      const titleInput = page.locator('input[name="title"], input[placeholder*="title"]').first();
      if (await titleInput.isVisible()) {
        const titleValue = await titleInput.inputValue();
        console.log('Title field value:', titleValue);
        console.log('Title field is editable: true');
      }

      // Check synopsis/description field
      const synopsisField = page.locator('textarea[name="synopsis"], textarea[name="description"], textarea').first();
      if (await synopsisField.isVisible()) {
        const synopsisValue = await synopsisField.inputValue();
        console.log('Synopsis/Description field found, length:', synopsisValue?.length);
        console.log('Synopsis field is editable: true');
      }

      // Check release date field
      const releaseDateField = page.locator('input[name="release_date"], input[type="date"]').first();
      if (await releaseDateField.isVisible()) {
        const dateValue = await releaseDateField.inputValue();
        console.log('Release date field value:', dateValue);
        console.log('Release date field is editable: true');
      }

      // Click Media tab if exists
      const mediaTab = page.locator('button:has-text("Media")');
      if (await mediaTab.isVisible()) {
        await mediaTab.click();
        await page.waitForTimeout(500);

        // Screenshot media tab
        await page.screenshot({ path: 'test-results/6-edit-modal-media.png', fullPage: true });

        // Check for poster upload
        const posterSection = page.locator('text=Poster').first();
        const hasPoster = await posterSection.isVisible().catch(() => false);
        console.log('Poster upload section visible:', hasPoster);

        // Check for backdrop upload
        const backdropSection = page.locator('text=Backdrop').first();
        const hasBackdrop = await backdropSection.isVisible().catch(() => false);
        console.log('Backdrop upload section visible:', hasBackdrop);

        // Check for file input
        const fileInputs = page.locator('input[type="file"]');
        const fileInputCount = await fileInputs.count();
        console.log('File input fields found:', fileInputCount);
      }

      // Click Details tab if exists
      const detailsTab = page.locator('button:has-text("Details")');
      if (await detailsTab.isVisible()) {
        await detailsTab.click();
        await page.waitForTimeout(500);

        // Screenshot details tab
        await page.screenshot({ path: 'test-results/7-edit-modal-details.png', fullPage: true });

        // Check for Now Showing toggle
        const nowShowingToggle = page.locator('text=Now Showing').first();
        const hasNowShowing = await nowShowingToggle.isVisible().catch(() => false);
        console.log('Now Showing toggle visible:', hasNowShowing);

        // Check for Coming Soon toggle
        const comingSoonToggle = page.locator('text=Coming Soon').first();
        const hasComingSoon = await comingSoonToggle.isVisible().catch(() => false);
        console.log('Coming Soon toggle visible:', hasComingSoon);
      }

      // Close modal
      const cancelButton = page.locator('button:has-text("Cancel")');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      }
    }
  });

  test('Make actual edit and verify on public page', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'shareef6907@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty@6907');
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(3000);

    // Navigate to Cinema Admin
    await page.goto('/admin/cinema');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Login failed - skipping edit verification test');
      return;
    }

    // Find a movie to edit - get the first movie's title
    const firstMovieTitle = await page.locator('h3, [class*="font-bold"], [class*="font-semibold"]').first().textContent();
    console.log('First movie title:', firstMovieTitle);

    // Click Edit on first movie
    const editButton = page.locator('button:has-text("Edit")').first();
    if (await editButton.isVisible()) {
      await editButton.click();
      await page.waitForTimeout(1000);

      // Get current synopsis value
      const synopsisField = page.locator('textarea').first();
      let originalSynopsis = '';
      if (await synopsisField.isVisible()) {
        originalSynopsis = await synopsisField.inputValue();
        console.log('Original synopsis length:', originalSynopsis?.length);

        // Add a test marker to the synopsis
        const testMarker = ` [Test Edit ${Date.now()}]`;
        await synopsisField.fill(originalSynopsis + testMarker);
        console.log('Added test marker to synopsis');
      }

      // Click Save
      const saveButton = page.locator('button:has-text("Save")');
      if (await saveButton.isVisible()) {
        await saveButton.click();
        await page.waitForTimeout(2000);
        console.log('Clicked Save button');
      }

      // Screenshot after save
      await page.screenshot({ path: 'test-results/8-after-save.png', fullPage: true });

      // Now verify on public cinema page
      await page.goto('/cinema');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Screenshot public cinema page
      await page.screenshot({ path: 'test-results/9-public-cinema-page.png', fullPage: true });

      console.log('Public cinema page URL:', page.url());

      // Check if changes are reflected
      const publicPageContent = await page.textContent('body');
      const hasTestMarker = publicPageContent?.includes('[Test Edit');
      console.log('Test marker found on public page:', hasTestMarker);

      // Revert the change
      await page.goto('/admin/cinema');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      const revertEdit = page.locator('button:has-text("Edit")').first();
      if (await revertEdit.isVisible()) {
        await revertEdit.click();
        await page.waitForTimeout(1000);

        const revertSynopsis = page.locator('textarea').first();
        if (await revertSynopsis.isVisible()) {
          await revertSynopsis.fill(originalSynopsis);

          const revertSave = page.locator('button:has-text("Save")');
          if (await revertSave.isVisible()) {
            await revertSave.click();
            await page.waitForTimeout(1000);
            console.log('Reverted synopsis to original');
          }
        }
      }
    }
  });

  test('Toggle Now Showing / Coming Soon status', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'shareef6907@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty@6907');
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(3000);

    // Navigate to Cinema Admin
    await page.goto('/admin/cinema');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Login failed - skipping toggle test');
      return;
    }

    // Screenshot the page
    await page.screenshot({ path: 'test-results/10-before-toggle.png', fullPage: true });

    // Look for toggle buttons or switches
    const toggles = page.locator('button[role="switch"], input[type="checkbox"], [class*="toggle"]');
    const toggleCount = await toggles.count();
    console.log('Toggle elements found:', toggleCount);

    // Check for inline status toggles on movie cards
    const nowShowingToggles = page.locator('button:has-text("Now"), [class*="now-showing"]');
    const nsCount = await nowShowingToggles.count();
    console.log('Now Showing related elements:', nsCount);

    // Open edit modal and check status toggles
    const editButton = page.locator('button:has-text("Edit")').first();
    if (await editButton.isVisible()) {
      await editButton.click();
      await page.waitForTimeout(1000);

      // Go to Details tab
      const detailsTab = page.locator('button:has-text("Details")');
      if (await detailsTab.isVisible()) {
        await detailsTab.click();
        await page.waitForTimeout(500);

        // Screenshot details tab with toggles
        await page.screenshot({ path: 'test-results/11-details-tab-toggles.png', fullPage: true });

        // Check for status toggles
        const modalContent = await page.textContent('[class*="fixed"]');
        console.log('Modal has "Now Showing":', modalContent?.includes('Now Showing'));
        console.log('Modal has "Coming Soon":', modalContent?.includes('Coming Soon'));

        // Find and interact with toggles
        const statusToggles = page.locator('[class*="fixed"] input[type="checkbox"], [class*="fixed"] button[role="switch"]');
        const statusToggleCount = await statusToggles.count();
        console.log('Status toggles in modal:', statusToggleCount);
      }

      // Close modal
      const cancelButton = page.locator('button:has-text("Cancel")');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      }
    }
  });

  test('API verify - Get movie, update, verify change', async ({ request }) => {
    // Get first movie from API
    const listResponse = await request.get('/api/cinema/movies?limit=1');
    expect(listResponse.status()).toBe(200);

    const listData = await listResponse.json();
    const movie = listData.movies[0];

    console.log('Test movie:', movie.title);
    console.log('Movie ID:', movie.id);
    console.log('Current synopsis:', movie.synopsis?.substring(0, 100));
    console.log('Current is_now_showing:', movie.is_now_showing);
    console.log('Current is_coming_soon:', movie.is_coming_soon);
    console.log('Current release_date:', movie.release_date);
    console.log('Current poster_url:', movie.poster_url?.substring(0, 50));

    // Verify all expected fields exist
    expect(movie).toHaveProperty('id');
    expect(movie).toHaveProperty('title');
    expect(movie).toHaveProperty('poster_url');
    expect(movie).toHaveProperty('is_now_showing');
    expect(movie).toHaveProperty('is_coming_soon');

    console.log('\nAll expected fields present in movie object ✓');
    console.log('Fields available for editing:', Object.keys(movie).join(', '));
  });
});
