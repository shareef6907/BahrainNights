const { chromium } = require('playwright');
const https = require('https');
const fs = require('fs');
const path = require('path');

async function testProdUpload() {
  console.log('PRODUCTION UPLOAD TEST\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen for console messages
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('error') || msg.text().includes('Error')) {
      console.log('CONSOLE:', msg.type(), msg.text());
    }
  });

  // Listen for network failures
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log('NETWORK ERROR:', response.status(), response.url());
    }
  });

  try {
    // Login
    console.log('1. Logging in...');
    await page.goto('https://www.bahrainnights.com/admin/login', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    await page.fill('input[type="email"], input[name="email"]', 'admin@bahrainnights.com');
    await page.fill('input[type="password"], input[name="password"]', 'Admin123!');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    console.log('   Done logging in');

    // Go to venue edit page
    console.log('\n2. Going to venue edit page...');
    await page.goto('https://www.bahrainnights.com/admin/venues/7fbd1367-4cb8-4348-8203-3319d03a5be0', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Take screenshot before
    await page.screenshot({ path: '.playwright-mcp/prod-upload-before.png', fullPage: true });
    console.log('   Screenshot: prod-upload-before.png');

    // Try to upload an image
    console.log('\n3. Attempting upload...');

    // Find file input
    const fileInputs = await page.$$('input[type="file"][accept="image/*"]');
    console.log('   Found', fileInputs.length, 'file inputs');

    if (fileInputs.length > 0) {
      const testImagePath = path.join(__dirname, 'test-prod-image.jpg');

      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(testImagePath);
        https.get('https://picsum.photos/400/400', (response) => {
          if (response.statusCode === 302 || response.statusCode === 301) {
            https.get(response.headers.location, (res) => {
              res.pipe(file);
              file.on('finish', () => { file.close(); resolve(); });
            });
          } else {
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
          }
        }).on('error', reject);
      });
      console.log('   Test image downloaded');

      // Upload to logo (first input)
      await fileInputs[0].setInputFiles(testImagePath);
      console.log('   File selected - waiting for upload...');

      // Wait and watch for any errors
      await page.waitForTimeout(10000);

      // Take screenshot after
      await page.screenshot({ path: '.playwright-mcp/prod-upload-after.png', fullPage: true });
      console.log('   Screenshot: prod-upload-after.png');

      // Check for any error toasts
      const errorToast = await page.$('.bg-red-500, [class*="error"], .text-red');
      if (errorToast) {
        const errorText = await errorToast.textContent();
        console.log('\n   ERROR FOUND:', errorText);
      }

      // Check for success toast
      const successToast = await page.$('.bg-green-500, [class*="success"]');
      if (successToast) {
        const successText = await successToast.textContent();
        console.log('\n   SUCCESS:', successText);
      }

      // Check network tab for upload response
      const [response] = await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/api/upload'), { timeout: 5000 }).catch(() => null),
      ]);

      if (response) {
        console.log('\n   Upload Response:', response.status());
        try {
          const body = await response.json();
          console.log('   Response body:', JSON.stringify(body, null, 2));
        } catch (e) {
          console.log('   Could not parse response');
        }
      }

      // Cleanup
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }

  } catch (error) {
    console.error('\nError:', error.message);
    await page.screenshot({ path: '.playwright-mcp/prod-upload-error.png' });
  } finally {
    console.log('\nBrowser closing in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

testProdUpload();
