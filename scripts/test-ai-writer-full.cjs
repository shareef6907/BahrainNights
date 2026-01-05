const { chromium } = require('playwright');

async function testAllAIWriters() {
  console.log('🎭 Testing ALL AI Writer implementations...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Step 1: Login to venue portal
    console.log('1️⃣ Logging into venue portal...');
    await page.goto('http://localhost:3000/venue-portal/login');
    await page.waitForLoadState('networkidle');
    
    await page.fill('input[placeholder="you@venue.com"]', 'freecafe@test.com');
    await page.fill('input[placeholder="Enter your password"]', 'test123456');
    await page.click('button:has-text("Sign In")');
    
    await page.waitForTimeout(2000);
    if (page.url().includes('/login')) {
      throw new Error('Venue login failed');
    }
    console.log('   ✅ Venue login successful!\n');
    
    // Test 1: Venue Profile - AI Writer
    console.log('2️⃣ Testing AI Writer on Venue Profile...');
    await page.goto('http://localhost:3000/venue-portal/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const profileBtn = await page.locator('button:has-text("Write with AI"), button:has-text("Enhance with AI")').first();
    if (await profileBtn.count() > 0) {
      console.log('   ✅ AI Writer button found on profile page');
      await profileBtn.click();
      console.log('   ⏳ Generating description...');
      await page.waitForTimeout(5000); // Wait for AI generation
      await page.screenshot({ path: '.playwright-mcp/ai-test-profile.png' });
      console.log('   ✅ AI Writer clicked on profile!\n');
    } else {
      console.log('   ❌ AI Writer button NOT found on profile page\n');
    }
    
    // Test 2: Offers Create - AI Writer
    console.log('3️⃣ Testing AI Writer on Offers Create...');
    await page.goto('http://localhost:3000/venue-portal/offers/create');
    await page.waitForLoadState('networkidle');
    
    // Fill in title first (required for AI)
    await page.fill('input[name="title"]', 'Test Ladies Night Special');
    await page.click('button:has-text("Ladies Night")');
    
    const offersBtn = await page.locator('button:has-text("Write with AI"), button:has-text("Enhance with AI")').first();
    if (await offersBtn.count() > 0) {
      console.log('   ✅ AI Writer button found on offers page');
      await offersBtn.click();
      console.log('   ⏳ Generating offer description...');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: '.playwright-mcp/ai-test-offers.png' });
      console.log('   ✅ AI Writer clicked on offers!\n');
    } else {
      console.log('   ❌ AI Writer button NOT found on offers page\n');
    }
    
    // Test 3: Events Create - AI Writer
    console.log('4️⃣ Testing AI Writer on Events Create...');
    await page.goto('http://localhost:3000/venue-portal/events/create');
    await page.waitForLoadState('networkidle');
    
    // Fill in title first
    await page.fill('input[name="title"]', 'Test Event Night');
    
    const eventsBtn = await page.locator('button:has-text("Write with AI"), button:has-text("Enhance with AI")').first();
    if (await eventsBtn.count() > 0) {
      console.log('   ✅ AI Writer button found on events page');
      await eventsBtn.click();
      console.log('   ⏳ Generating event description...');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: '.playwright-mcp/ai-test-events.png' });
      console.log('   ✅ AI Writer clicked on events!\n');
    } else {
      console.log('   ❌ AI Writer button NOT found on events page\n');
    }
    
    // Test 4: Admin Event Edit (need to login as admin)
    console.log('5️⃣ Testing AI Writer on Admin Event Edit...');
    await page.goto('http://localhost:3000/admin');
    await page.waitForLoadState('networkidle');
    
    // Check if we need to login
    if (page.url().includes('/login')) {
      console.log('   ⚠️ Need admin login - skipping admin test\n');
    } else {
      // Go to events and edit first one
      await page.goto('http://localhost:3000/admin/events');
      await page.waitForLoadState('networkidle');
      
      // Click first event
      const firstEvent = await page.locator('a[href*="/admin/events/"]').first();
      if (await firstEvent.count() > 0) {
        await firstEvent.click();
        await page.waitForLoadState('networkidle');
        
        // Click Edit button
        const editBtn = await page.locator('a:has-text("Edit"), button:has-text("Edit")').first();
        if (await editBtn.count() > 0) {
          await editBtn.click();
          await page.waitForLoadState('networkidle');
          
          const adminAIBtn = await page.locator('button:has-text("Write with AI"), button:has-text("Enhance with AI")').first();
          if (await adminAIBtn.count() > 0) {
            console.log('   ✅ AI Writer button found on admin edit page');
            await page.screenshot({ path: '.playwright-mcp/ai-test-admin.png' });
          }
        }
      }
    }
    
    console.log('\n✅ ALL AI WRITER TESTS COMPLETED!');
    console.log('📸 Screenshots saved to .playwright-mcp/');
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    await page.screenshot({ path: '.playwright-mcp/ai-test-error.png' });
  } finally {
    await browser.close();
  }
}

testAllAIWriters().catch(console.error);
