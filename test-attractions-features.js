const { chromium } = require('playwright');

async function testAttractions() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('1. Navigating to login page...');
  await page.goto('https://www.bahrainnights.com/login');
  await page.waitForLoadState('networkidle');
  
  // Take screenshot
  await page.screenshot({ path: '.playwright-mcp/attractions-test-1-login.png' });
  console.log('Screenshot saved: login page');

  // Fill login credentials
  console.log('2. Logging in...');
  await page.fill('input[type="email"]', 'admin@bahrainnights.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  // Wait for redirect
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '.playwright-mcp/attractions-test-2-after-login.png' });
  console.log('Screenshot saved: after login');

  // Navigate to attractions
  console.log('3. Navigating to attractions...');
  await page.goto('https://www.bahrainnights.com/admin/attractions');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '.playwright-mcp/attractions-test-3-list.png' });
  console.log('Screenshot saved: attractions list');

  // Click edit on first attraction
  console.log('4. Opening edit page for first attraction...');
  const editButton = page.locator('a[href*="/admin/attractions/"][href*="/edit"]').first();
  if (await editButton.count() > 0) {
    await editButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '.playwright-mcp/attractions-test-4-edit.png', fullPage: true });
    console.log('Screenshot saved: edit page');

    // Look for reposition button (Move icon)
    console.log('5. Looking for Reposition button...');
    const repositionBtn = page.locator('button').filter({ has: page.locator('svg.lucide-move') });
    const repositionCount = await repositionBtn.count();
    console.log('Found reposition buttons:', repositionCount);
    
    if (repositionCount > 0) {
      console.log('✅ Reposition button found!');
      await repositionBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: '.playwright-mcp/attractions-test-5-positioner.png' });
      console.log('Screenshot saved: positioner modal');
      
      // Close modal
      const closeBtn = page.locator('button:has-text("Cancel")');
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
        await page.waitForTimeout(500);
      }
    } else {
      // Try alternative selector
      const altBtn = page.locator('button').filter({ hasText: /reposition/i });
      if (await altBtn.count() > 0) {
        console.log('✅ Reposition button found (alt)!');
        await altBtn.first().click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: '.playwright-mcp/attractions-test-5-positioner.png' });
      } else {
        console.log('❌ Reposition button not found - checking page content...');
        const pageContent = await page.content();
        console.log('Has Move icon:', pageContent.includes('lucide-move') || pageContent.includes('Move'));
      }
    }

    // Look for AI Rewrite button (Sparkles icon)
    console.log('6. Looking for AI Rewrite button...');
    const aiBtn = page.locator('button').filter({ has: page.locator('svg.lucide-sparkles') });
    const aiCount = await aiBtn.count();
    console.log('Found AI buttons:', aiCount);
    
    if (aiCount > 0) {
      console.log('✅ AI Rewrite button found!');
      await page.screenshot({ path: '.playwright-mcp/attractions-test-6-ai-found.png' });
    } else {
      console.log('❌ AI Rewrite button not found');
    }

    // Final full page screenshot
    await page.screenshot({ path: '.playwright-mcp/attractions-test-final.png', fullPage: true });
    console.log('Screenshot saved: final full page');
  } else {
    console.log('No edit button found');
  }

  console.log('\n=== Test Complete ===');
  await browser.close();
}

testAttractions().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
