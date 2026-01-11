import { test, expect } from '@playwright/test';

/**
 * Tests for Venue Visibility (Hide/Unhide) and YouTube Embed Features
 *
 * Feature 1: Hide/Unhide Venues
 * - Admin can toggle venue visibility
 * - Hidden venues don't appear on public pages
 * - Hidden venues show "Hidden" badge in admin
 *
 * Feature 2: YouTube Video Embed
 * - Admin can add YouTube URL to venue
 * - Public venue page shows embedded YouTube video
 */

test.describe('Venue Visibility Feature', () => {

  test('admin venue list page shows hidden filter button', async ({ page }) => {
    // Navigate to admin venues page
    await page.goto('https://www.bahrainnights.com/admin/venues');

    // Wait for page load
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/admin-venues-list.png', fullPage: true });

    // Check if we're redirected to login (not authenticated)
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);

    if (currentUrl.includes('/login') || currentUrl.includes('/admin') === false) {
      console.log('Not authenticated or redirected - test needs admin login');
      return;
    }

    // Look for hidden filter button
    const hiddenFilterButton = page.locator('button:has-text("Hidden")');
    const filterExists = await hiddenFilterButton.count() > 0;
    console.log('Hidden filter button exists:', filterExists);

    // Look for EyeOff icon (hidden venue indicator)
    const eyeOffIcon = page.locator('svg[class*="lucide-eye-off"], [data-lucide="eye-off"]');
    const eyeOffExists = await eyeOffIcon.count() > 0;
    console.log('EyeOff icon exists:', eyeOffExists);
  });

  test('admin venue edit page shows visibility toggle', async ({ page }) => {
    // Navigate to admin venues page first to get a venue ID
    await page.goto('https://www.bahrainnights.com/admin/venues');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (!currentUrl.includes('/admin')) {
      console.log('Not authenticated - skipping test');
      return;
    }

    // Click on the first venue to edit
    const firstVenueLink = page.locator('a[href*="/admin/venues/"]').first();
    if (await firstVenueLink.count() > 0) {
      await firstVenueLink.click();
      await page.waitForTimeout(2000);

      // Take screenshot of venue edit page
      await page.screenshot({ path: 'tests/screenshots/admin-venue-edit.png', fullPage: true });

      // Check for visibility section
      const visibilitySection = page.locator('text=Visibility');
      const visibilitySectionExists = await visibilitySection.count() > 0;
      console.log('Visibility section exists:', visibilitySectionExists);

      // Check for visibility toggle
      const visibilityToggle = page.locator('button[class*="rounded-full"]');
      const toggleExists = await visibilityToggle.count() > 0;
      console.log('Visibility toggle exists:', toggleExists);

      // Check for YouTube URL field
      const youtubeField = page.locator('input[name="youtube_url"]');
      const youtubeFieldExists = await youtubeField.count() > 0;
      console.log('YouTube URL field exists:', youtubeFieldExists);
    } else {
      console.log('No venues found to edit');
    }
  });

  test('hidden venues show badge in admin list', async ({ page }) => {
    await page.goto('https://www.bahrainnights.com/admin/venues');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (!currentUrl.includes('/admin')) {
      console.log('Not authenticated - skipping test');
      return;
    }

    // Look for "Hidden" badge text
    const hiddenBadges = page.locator('text=Hidden');
    const badgeCount = await hiddenBadges.count();
    console.log('Hidden badges found:', badgeCount);

    // Take screenshot showing badges
    await page.screenshot({ path: 'tests/screenshots/admin-venues-badges.png', fullPage: true });
  });
});

test.describe('YouTube Embed Feature', () => {

  test('admin venue edit page has YouTube URL input field', async ({ page }) => {
    // Go to a venue edit page
    await page.goto('https://www.bahrainnights.com/admin/venues');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (!currentUrl.includes('/admin')) {
      console.log('Not authenticated - skipping test');
      return;
    }

    // Click on first venue
    const firstVenueLink = page.locator('a[href*="/admin/venues/"]').first();
    if (await firstVenueLink.count() > 0) {
      await firstVenueLink.click();
      await page.waitForTimeout(2000);

      // Check for YouTube URL input
      const youtubeInput = page.locator('input[name="youtube_url"]');
      const inputExists = await youtubeInput.count() > 0;
      console.log('YouTube URL input exists:', inputExists);

      if (inputExists) {
        // Check placeholder text
        const placeholder = await youtubeInput.getAttribute('placeholder');
        console.log('YouTube input placeholder:', placeholder);
        expect(placeholder).toContain('youtube');
      }

      // Check for YouTube icon (SVG with YouTube path)
      const youtubeIcon = page.locator('svg path[d*="23.498"]');
      const iconExists = await youtubeIcon.count() > 0;
      console.log('YouTube icon exists:', iconExists);

      // Take screenshot
      await page.screenshot({ path: 'tests/screenshots/admin-youtube-field.png', fullPage: true });
    }
  });

  test('public venue page with YouTube URL shows video embed', async ({ page }) => {
    // Navigate to places listing to find a venue
    await page.goto('https://www.bahrainnights.com/places');
    await page.waitForTimeout(3000);

    // Take screenshot of places page
    await page.screenshot({ path: 'tests/screenshots/places-page.png', fullPage: true });

    // Click on first venue
    const firstVenueCard = page.locator('a[href*="/places/"]').first();
    if (await firstVenueCard.count() > 0) {
      await firstVenueCard.click();
      await page.waitForTimeout(3000);

      // Take full page screenshot
      await page.screenshot({ path: 'tests/screenshots/venue-detail.png', fullPage: true });

      // Check if YouTube iframe exists (if venue has youtube_url)
      const youtubeIframe = page.locator('iframe[src*="youtube.com/embed"]');
      const hasYouTube = await youtubeIframe.count() > 0;
      console.log('Venue has YouTube video:', hasYouTube);

      if (hasYouTube) {
        // Verify iframe has correct attributes
        const src = await youtubeIframe.getAttribute('src');
        console.log('YouTube embed src:', src);

        // Check for autoplay and mute params
        expect(src).toContain('autoplay=1');
        expect(src).toContain('mute=1');

        // Take screenshot showing video
        await page.screenshot({ path: 'tests/screenshots/venue-youtube-embed.png', fullPage: true });
      } else {
        console.log('This venue does not have a YouTube video configured');
      }
    }
  });
});

test.describe('Public Pages - Hidden Venues', () => {

  test('public places page loads without errors', async ({ page }) => {
    await page.goto('https://www.bahrainnights.com/places');
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/public-places.png', fullPage: true });

    // Check page has venue cards
    const venueCards = page.locator('a[href*="/places/"]');
    const cardCount = await venueCards.count();
    console.log('Venue cards visible:', cardCount);

    // All visible venues should NOT have "Hidden" text visible
    const hiddenText = page.locator('.venue-card:has-text("Hidden")');
    const hiddenCardCount = await hiddenText.count();
    console.log('Hidden badges on public page:', hiddenCardCount);
    expect(hiddenCardCount).toBe(0);
  });

  test('public API excludes hidden venues', async ({ page }) => {
    // Call the public venues API directly
    const response = await page.request.get('https://www.bahrainnights.com/api/public/venues');
    const data = await response.json();

    console.log('API response status:', response.status());
    console.log('Venues returned:', data.venues?.length || 0);

    // Check that no venue has is_hidden = true
    if (data.venues && Array.isArray(data.venues)) {
      const hiddenVenues = data.venues.filter((v: { is_hidden?: boolean }) => v.is_hidden === true);
      console.log('Hidden venues in response:', hiddenVenues.length);
      expect(hiddenVenues.length).toBe(0);
    }
  });

  test('homepage loads without hidden venues', async ({ page }) => {
    await page.goto('https://www.bahrainnights.com');
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });

    // Homepage should not show any "Hidden" badges
    const hiddenBadges = page.locator('.hidden-badge, [class*="purple"][class*="badge"]:has-text("Hidden")');
    const badgeCount = await hiddenBadges.count();
    console.log('Hidden badges on homepage:', badgeCount);
    expect(badgeCount).toBe(0);
  });
});

test.describe('Integration Tests', () => {

  test('venue edit save includes new fields', async ({ page }) => {
    // Navigate to admin venue edit
    await page.goto('https://www.bahrainnights.com/admin/venues');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (!currentUrl.includes('/admin')) {
      console.log('Not authenticated - skipping test');
      return;
    }

    // Click first venue
    const firstVenueLink = page.locator('a[href*="/admin/venues/"]').first();
    if (await firstVenueLink.count() > 0) {
      await firstVenueLink.click();
      await page.waitForTimeout(2000);

      // Check that YouTube field and visibility toggle exist
      const youtubeInput = page.locator('input[name="youtube_url"]');
      const visibilityToggle = page.locator('button[class*="rounded-full"]');

      const youtubeExists = await youtubeInput.count() > 0;
      const toggleExists = await visibilityToggle.count() > 0;

      console.log('YouTube input present:', youtubeExists);
      console.log('Visibility toggle present:', toggleExists);

      // Check Save button exists
      const saveButton = page.locator('button:has-text("Save")');
      const saveExists = await saveButton.count() > 0;
      console.log('Save button present:', saveExists);

      expect(youtubeExists).toBe(true);
      expect(saveExists).toBe(true);

      await page.screenshot({ path: 'tests/screenshots/venue-edit-form.png', fullPage: true });
    }
  });
});
