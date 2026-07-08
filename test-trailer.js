const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  // Collect errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  console.log('Navigating to /regional...');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Wait for player to initialize
  await page.waitForTimeout(3000);
  
  // Check if YouTube iframe exists
  const iframe = await page.$('iframe');
  console.log('YouTube iframe found:', !!iframe);
  
  if (iframe) {
    const src = await iframe.getAttribute('src');
    console.log('Iframe src:', src ? src.substring(0, 100) + '...' : 'no src');
  }
  
  // Check for player container
  const playerContainer = await page.$('#regional-youtube-player');
  console.log('Player container found:', !!playerContainer);
  
  // Check for any errors
  console.log('\n=== Console Errors ===');
  const errorMessages = consoleMessages.filter(m => m.type === 'error');
  console.log('Error count:', errorMessages.length);
  errorMessages.forEach(e => console.log('-', e.text));
  
  console.log('\n=== Page Errors ===');
  console.log('Count:', errors.length);
  errors.forEach(e => console.log('-', e));
  
  // Check YouTube API ready state
  const ytReady = await page.evaluate(() => {
    return !!window.YT && !!window.YT.Player;
  });
  console.log('\nYouTube API ready:', ytReady);
  
  // Check if player was created
  const playerExists = await page.evaluate(() => {
    // Look for YouTube embed
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        return true;
      }
    }
    return false;
  });
  console.log('YouTube embed present:', playerExists);
  
  await browser.close();
  console.log('\nTest complete.');
})();
