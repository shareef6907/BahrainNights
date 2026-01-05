const { chromium } = require('playwright');

async function testAIWriter() {
  console.log('🎭 Testing AI Writer buttons...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
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
    const currentUrl = page.url();
    
    if (currentUrl.includes('/login')) {
      throw new Error('Login failed');
    }
    console.log('   ✅ Login successful!\n');
    
    // Step 2: Check venue profile page for AI Writer
    console.log('2️⃣ Checking AI Writer on venue profile page...');
    await page.goto('http://localhost:3000/venue-portal/profile');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '.playwright-mcp/ai-writer-profile.png' });
    
    const profileAIButton = await page.locator('button:has-text("AI"), button:has-text("Write with AI"), button:has-text("Enhance")').count();
    if (profileAIButton > 0) {
      console.log('   ✅ AI Writer button found on profile page!\n');
    } else {
      console.log('   ⚠️ AI Writer button not visible on profile page\n');
    }
    
    // Step 3: Check offers create page for AI Writer
    console.log('3️⃣ Checking AI Writer on offers create page...');
    await page.goto('http://localhost:3000/venue-portal/offers/create');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '.playwright-mcp/ai-writer-offers.png' });
    
    const offersAIButton = await page.locator('button:has-text("AI"), button:has-text("Write with AI"), button:has-text("Enhance")').count();
    if (offersAIButton > 0) {
      console.log('   ✅ AI Writer button found on offers create page!\n');
    } else {
      console.log('   ⚠️ AI Writer button not visible on offers create page\n');
    }
    
    // Step 4: Check events create page for AI Writer
    console.log('4️⃣ Checking AI Writer on events create page...');
    await page.goto('http://localhost:3000/venue-portal/events/create');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '.playwright-mcp/ai-writer-events.png' });
    
    const eventsAIButton = await page.locator('button:has-text("AI"), button:has-text("Write with AI"), button:has-text("Enhance")').count();
    if (eventsAIButton > 0) {
      console.log('   ✅ AI Writer button found on events create page!\n');
    } else {
      console.log('   ⚠️ AI Writer button not visible on events create page\n');
    }
    
    console.log('\n✅ AI Writer test completed!');
    console.log('📸 Screenshots saved to .playwright-mcp/');
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    await page.screenshot({ path: '.playwright-mcp/ai-writer-error.png' });
  } finally {
    await browser.close();
  }
}

testAIWriter().catch(console.error);
