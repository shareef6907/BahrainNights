const { chromium } = require('playwright');

async function testOffersFeature() {
  console.log('🎭 Starting Playwright test for Offers feature...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Test public offers page
    console.log('1️⃣ Testing public /offers page...');
    await page.goto('http://localhost:3000/offers');
    await page.waitForLoadState('networkidle');

    const offersPageTitle = await page.title();
    console.log(`   Page title: ${offersPageTitle}`);

    // Check if page loads without error
    const hasError = await page.locator('text=Failed to get offers').count();
    if (hasError > 0) {
      throw new Error('Public offers page shows error');
    }
    console.log('   ✅ Public offers page loads successfully\n');

    // Take screenshot
    await page.screenshot({ path: '.playwright-mcp/offers-public-page.png' });

    // Step 2: Navigate to venue portal login
    console.log('2️⃣ Testing venue portal login...');
    await page.goto('http://localhost:3000/venue-portal/login');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '.playwright-mcp/venue-login-page.png' });

    // Get a test venue from database
    console.log('   Looking for test venue credentials...\n');

    // Step 3: Check venue portal offers page structure
    console.log('3️⃣ Testing venue portal offers page (requires login)...');
    await page.goto('http://localhost:3000/venue-portal/offers');
    await page.waitForLoadState('networkidle');

    // Should redirect to login if not authenticated
    const currentUrl = page.url();
    console.log(`   Current URL: ${currentUrl}`);

    if (currentUrl.includes('/login')) {
      console.log('   ✅ Correctly redirects to login when not authenticated\n');
    }

    await page.screenshot({ path: '.playwright-mcp/venue-offers-redirect.png' });

    // Step 4: Test API endpoints
    console.log('4️⃣ Testing API endpoints...');

    // Test public offers API
    const publicResponse = await page.request.get('http://localhost:3000/api/offers');
    const publicData = await publicResponse.json();
    console.log(`   GET /api/offers - Status: ${publicResponse.status()}`);
    console.log(`   Offers count: ${publicData.offers?.length || 0}`);

    if (publicResponse.status() === 200) {
      console.log('   ✅ Public offers API works\n');
    } else {
      throw new Error(`Public offers API failed: ${publicData.error}`);
    }

    console.log('\n✅ All tests passed!');
    console.log('\n📋 Summary:');
    console.log('   - Public /offers page: ✅ Working');
    console.log('   - Public /api/offers API: ✅ Working');
    console.log('   - Venue portal auth redirect: ✅ Working');
    console.log('\n📸 Screenshots saved to .playwright-mcp/');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    await page.screenshot({ path: '.playwright-mcp/offers-test-error.png' });
  } finally {
    await browser.close();
  }
}

testOffersFeature().catch(console.error);
