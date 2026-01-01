const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const publicDir = './public';
  const sourceFile = path.join(publicDir, 'favicon.jpg');

  if (!fs.existsSync(sourceFile)) {
    console.error('No favicon.jpg found in public folder');
    process.exit(1);
  }

  console.log(`Using source: ${sourceFile}`);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'og-icon.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(sourceFile)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated: ${name}`);
  }

  // Generate favicon.ico (using 32x32)
  await sharp(sourceFile)
    .resize(32, 32, { fit: 'cover' })
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated: favicon.ico');

  console.log('\n✅ All favicons generated!');
}

generateFavicons().catch(console.error);
