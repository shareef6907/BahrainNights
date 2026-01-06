const { chromium } = require('playwright');
const https = require('https');
const fs = require('fs');
const path = require('path');

async function testCoverUpload() {
  console.log('COVER PHOTO UPLOAD TEST\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Track upload API calls
  let uploadResponse = null;
  page.on('response', async response => {
    if (response.url().includes('/api/upload')) {
      uploadResponse = {
        status: response.status(),
        url: response.url()
      };
      try {
        uploadResponse.body = await response.json();
      } catch (e) {
        uploadResponse.body = 'Could not parse';
      }
      console.log('\n=== UPLOAD API RESPONSE ===');
      console.log('Status:', uploadResponse.status);
      console.log('Body:', JSON.stringify(uploadResponse.body, null, 2));
      console.log('===========================\n');
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
    console.log('   Done');

    // Go to venue edit page
    console.log('\n2. Going to venue edit page...');
    await page.goto('https://www.bahrainnights.com/admin/venues/7fbd1367-4cb8-4348-8203-3319d03a5be0', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Download test image
    console.log('\n3. Downloading test image...');
    const testImagePath = path.join(__dirname, 'test-cover-image.jpg');

    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(testImagePath);
      https.get('https://picsum.photos/800/400', (response) => {
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
    console.log('   Downloaded');

    // Find cover image file input (second one)
    console.log('\n4. Finding cover image input...');
    const fileInputs = await page.$$('input[type="file"][accept="image/*"]');
    console.log('   Found', fileInputs.length, 'file inputs');

    if (fileInputs.length >= 2) {
      // Upload to cover (second input)
      console.log('\n5. Uploading cover image...');
      await fileInputs[1].setInputFiles(testImagePath);
      console.log('   File selected - waiting for upload response...');

      // Wait for upload to complete
      await page.waitForTimeout(15000);

      // Take screenshot
      await page.screenshot({ path: '.playwright-mcp/cover-upload-result.png', fullPage: true });
      console.log('   Screenshot: cover-upload-result.png');

      // Check what happened
      if (uploadResponse) {
        if (uploadResponse.status === 200 && uploadResponse.body.success) {
          console.log('\n=== SUCCESS ===');
          console.log('Cover image uploaded to S3!');
          console.log('URL:', uploadResponse.body.url);

          // Verify URL contains S3
          if (uploadResponse.body.url && uploadResponse.body.url.includes('bahrainnights-production')) {
            console.log('Confirmed: Image is in S3 bucket');
          }
        } else {
          console.log('\n=== FAILED ===');
          console.log('Error:', uploadResponse.body.error || 'Unknown error');
        }
      } else {
        console.log('\n=== NO RESPONSE ===');
        console.log('Upload API was not called - check for client-side errors');
      }
    } else {
      console.log('   Not enough file inputs found');
    }

    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }

  } catch (error) {
    console.error('\nError:', error.message);
    await page.screenshot({ path: '.playwright-mcp/cover-upload-error.png' });
  } finally {
    console.log('\nBrowser closing in 3 seconds...');
    await page.waitForTimeout(3000);
    await browser.close();
  }
}

testCoverUpload();
