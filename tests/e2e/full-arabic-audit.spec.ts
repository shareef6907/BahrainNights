import { test, expect } from '@playwright/test';

test.describe('Full Arabic Translation Audit', () => {
  test.beforeEach(async ({ page }) => {
    // Start on homepage and switch to Arabic
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Click language toggle to switch to Arabic
    const langToggle = page.locator('button:has-text("العربية"), button:has-text("EN")').first();
    if (await langToggle.isVisible()) {
      const buttonText = await langToggle.textContent();
      if (buttonText?.includes('EN') || buttonText?.includes('العربية')) {
        await langToggle.click();
        await page.waitForTimeout(500);
        // Check if we need to click again (if it shows EN, we need Arabic)
        const newText = await langToggle.textContent();
        if (newText?.includes('EN')) {
          // Already in Arabic
        }
      }
    }

    // Verify we're in Arabic mode
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('Homepage - check for untranslated English text', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/audit-01-homepage-arabic.png', fullPage: true });

    // Check hero section is in Arabic
    const heroText = await page.locator('h1').first().textContent();
    console.log('Homepage Hero:', heroText);

    // Look for common English words that shouldn't appear
    const bodyText = await page.locator('body').textContent();
    const englishPatterns = [
      'Events', 'Cinema', 'Dining', 'Nightlife', 'Explore',
      'View All', 'See All', 'Search', 'Featured'
    ];

    const foundEnglish: string[] = [];
    for (const pattern of englishPatterns) {
      if (bodyText?.includes(pattern)) {
        foundEnglish.push(pattern);
      }
    }

    if (foundEnglish.length > 0) {
      console.log('⚠️ Found untranslated English on Homepage:', foundEnglish);
    } else {
      console.log('✅ Homepage appears fully translated');
    }
  });

  test('Events page - check for untranslated English text', async ({ page }) => {
    await page.goto('http://localhost:3000/events');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/audit-02-events-arabic.png', fullPage: true });

    const bodyText = await page.locator('body').textContent();
    const englishPatterns = [
      'Discover Events', 'Search events', 'All Events', 'Today', 'This Week',
      'Music & Concerts', 'Dining & Food', 'Family & Kids', 'Arts & Culture',
      'No events found', 'Clear Filters', 'View Full Calendar', 'List Your Event'
    ];

    const foundEnglish: string[] = [];
    for (const pattern of englishPatterns) {
      if (bodyText?.includes(pattern)) {
        foundEnglish.push(pattern);
      }
    }

    console.log('Events page content sample:', bodyText?.substring(0, 500));

    if (foundEnglish.length > 0) {
      console.log('⚠️ Found untranslated English on Events:', foundEnglish);
    } else {
      console.log('✅ Events page appears fully translated');
    }
  });

  test('Cinema page - check for untranslated English text', async ({ page }) => {
    await page.goto('http://localhost:3000/cinema');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/audit-03-cinema-arabic.png', fullPage: true });

    const bodyText = await page.locator('body').textContent();
    const englishPatterns = [
      'Now Showing', 'Coming Soon', 'Search movies', 'All Cinemas',
      'All Genres', 'All Languages', 'No movies found', 'Clear Filters',
      'Watch Trailer', 'Book Now', 'Book Tickets'
    ];

    const foundEnglish: string[] = [];
    for (const pattern of englishPatterns) {
      if (bodyText?.includes(pattern)) {
        foundEnglish.push(pattern);
      }
    }

    if (foundEnglish.length > 0) {
      console.log('⚠️ Found untranslated English on Cinema:', foundEnglish);
    } else {
      console.log('✅ Cinema page appears fully translated');
    }
  });

  test('Places page - check for untranslated English text', async ({ page }) => {
    await page.goto('http://localhost:3000/places');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/audit-04-places-arabic.png', fullPage: true });

    const bodyText = await page.locator('body').textContent();
    const englishPatterns = [
      'Dining & Nightlife', 'Search places', 'All Places', 'Restaurants',
      'Cafes', 'Lounges', 'Nightclubs', 'Beach Clubs', 'Hotels', 'Spa',
      'Grid', 'Map', 'Showing', 'places', 'sorted by', 'Register Your Venue'
    ];

    const foundEnglish: string[] = [];
    for (const pattern of englishPatterns) {
      if (bodyText?.includes(pattern)) {
        foundEnglish.push(pattern);
      }
    }

    if (foundEnglish.length > 0) {
      console.log('⚠️ Found untranslated English on Places:', foundEnglish);
    } else {
      console.log('✅ Places page appears fully translated');
    }
  });

  test('Offers page - check for untranslated English text', async ({ page }) => {
    await page.goto('http://localhost:3000/offers');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/audit-05-offers-arabic.png', fullPage: true });

    const bodyText = await page.locator('body').textContent();
    const englishPatterns = [
      'Exclusive Deals', 'Best Offers', 'Search offers', 'All Offers',
      'Ladies Night', 'Happy Hour', 'Brunch', 'Special', 'Loading offers',
      'No Offers Yet', 'Check back soon'
    ];

    const foundEnglish: string[] = [];
    for (const pattern of englishPatterns) {
      if (bodyText?.includes(pattern)) {
        foundEnglish.push(pattern);
      }
    }

    if (foundEnglish.length > 0) {
      console.log('⚠️ Found untranslated English on Offers:', foundEnglish);
    } else {
      console.log('✅ Offers page appears fully translated');
    }
  });

  test('Navigation & Footer - check for untranslated English text', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check navigation
    const navText = await page.locator('nav, header').first().textContent();
    console.log('Navigation text:', navText?.substring(0, 300));

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Take footer screenshot
    await page.screenshot({ path: 'tests/screenshots/audit-06-footer-arabic.png', fullPage: false });

    const footerText = await page.locator('footer').textContent();
    console.log('Footer text:', footerText?.substring(0, 500));

    const navEnglishPatterns = [
      'Home', 'Events', 'Cinema', 'Dining', 'Offers', 'Login', 'Register'
    ];

    const footerEnglishPatterns = [
      'Quick Links', 'Categories', 'Support', 'Legal', 'Privacy Policy',
      'Terms of Service', 'Contact Us', 'For Businesses', 'Advertise'
    ];

    const foundNavEnglish: string[] = [];
    for (const pattern of navEnglishPatterns) {
      if (navText?.includes(pattern)) {
        foundNavEnglish.push(pattern);
      }
    }

    const foundFooterEnglish: string[] = [];
    for (const pattern of footerEnglishPatterns) {
      if (footerText?.includes(pattern)) {
        foundFooterEnglish.push(pattern);
      }
    }

    if (foundNavEnglish.length > 0) {
      console.log('⚠️ Found untranslated English in Navigation:', foundNavEnglish);
    }

    if (foundFooterEnglish.length > 0) {
      console.log('⚠️ Found untranslated English in Footer:', foundFooterEnglish);
    }

    if (foundNavEnglish.length === 0 && foundFooterEnglish.length === 0) {
      console.log('✅ Navigation and Footer appear fully translated');
    }
  });
});
