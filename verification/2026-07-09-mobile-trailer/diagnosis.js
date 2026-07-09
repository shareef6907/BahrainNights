const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  console.log('=== DIAGNOSIS: /cinema Mobile ===');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://www.bahrainnights.com/cinema');
  await page.waitForTimeout(4000);
  
  // Check for YouTube iframe
  const iframe = await page.$('iframe[src*="youtube"]');
  if (iframe) {
    const src = await iframe.getAttribute('src');
    console.log('YouTube iframe src:', src);
    
    const hasAutoplay = src.includes('autoplay=1');
    const hasMute = src.includes('mute=1');
    const hasPlaysinline = src.includes('playsinline=1');
    console.log('autoplay=1:', hasAutoplay);
    console.log('mute=1:', hasMute);
    console.log('playsinline=1:', hasPlaysinline);
  } else {
    console.log('No YouTube iframe found');
  }
  
  console.log('Console errors:', consoleErrors);
  
  console.log('\n=== DIAGNOSIS: /regional Mobile ===');
  await page.goto('https://www.bahrainnights.com/regional');
  await page.waitForTimeout(4000);
  
  const iframe2 = await page.$('iframe[src*="youtube"]');
  if (iframe2) {
    const src2 = await iframe2.getAttribute('src');
    console.log('YouTube iframe src:', src2);
  } else {
    console.log('No YouTube iframe found');
  }
  
  // Check container IDs
  const regionalPlayer = await page.$('#regional-youtube-player');
  console.log('regional-youtube-player exists:', !!regionalPlayer);
  
  await browser.close();
})();
