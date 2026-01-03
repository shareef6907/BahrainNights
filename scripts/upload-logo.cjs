const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

async function uploadLogo() {
  console.log('AWS credentials check:');
  console.log('- Region:', process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1');
  console.log('- Access Key ID exists:', !!process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID);
  console.log('- Secret Key exists:', !!process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY);

  const s3 = new S3Client({
    region: process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1',
    credentials: {
      accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY,
    },
  });

  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  console.log('Logo path:', logoPath);
  console.log('Logo exists:', fs.existsSync(logoPath));

  const fileContent = fs.readFileSync(logoPath);

  // Upload to processed folder which is publicly accessible
  const command = new PutObjectCommand({
    Bucket: 'bahrainnights-production',
    Key: 'processed/assets/logo-email.png',
    Body: fileContent,
    ContentType: 'image/png',
  });

  try {
    const result = await s3.send(command);
    console.log('Logo uploaded successfully!');
    console.log('URL: https://bahrainnights-production.s3.me-south-1.amazonaws.com/processed/assets/logo-email.png');
  } catch (error) {
    console.error('Error uploading:', error.message);
  }
}

uploadLogo();
