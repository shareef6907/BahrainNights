const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://bahrainnights.com/regional', { timeout: 60000 });
    await page.waitForTimeout(3000);
    
    const html = await page.content();
    const hasIframe = html.includes('youtube.com/embed');
    const hasBackdrop = html.includes('backdrop_url');
    
    console.log('Has YouTube embed:', hasIframe);
    console.log('Has backdrop:', hasBackdrop);
    
    // Check if iframe is visible
    const iframeVisible = await page.isVisible('iframe');
    console.log('Iframe visible:', iframeVisible);
    
  } catch(e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();
