import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3Client = new S3Client({ region: process.env.REGION });
const BUCKET = process.env.S3_BUCKET;

// Always fetch fresh watermark (no caching to ensure updates are reflected)
async function getWatermark() {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: 'logo.png'
  });
  const response = await s3Client.send(command);
  return Buffer.from(await response.Body.transformToByteArray());
}

// Compression settings
const compressionSettings = {
  cover: { maxWidth: 1920, maxHeight: 1080, quality: 75 },
  gallery: { maxWidth: 1200, maxHeight: 800, quality: 75 },
  logo: { maxWidth: 400, maxHeight: 400, quality: 85 },
  banner: { maxWidth: 1920, maxHeight: 600, quality: 75 },
  default: { maxWidth: 1200, maxHeight: 800, quality: 75 }
};

export const handler = async (event) => {
  console.log('Processing event:', JSON.stringify(event, null, 2));

  // Fetch watermark once
  const watermark = await getWatermark();

  for (const record of event.Records) {
    const uploadKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

    // Only process files in /uploads/ folder
    if (!uploadKey.startsWith('uploads/')) {
      console.log('Skipping non-upload file:', uploadKey);
      continue;
    }

    try {
      // 1. Get the uploaded image
      const getCommand = new GetObjectCommand({ Bucket: BUCKET, Key: uploadKey });
      const response = await s3Client.send(getCommand);
      const imageBuffer = Buffer.from(await response.Body.transformToByteArray());

      // 2. Determine image type from path
      let imageType = 'default';
      if (uploadKey.includes('/logo')) imageType = 'logo';
      else if (uploadKey.includes('/cover')) imageType = 'cover';
      else if (uploadKey.includes('/banner') || uploadKey.includes('/ads/')) imageType = 'banner';
      else if (uploadKey.includes('/gallery')) imageType = 'gallery';

      const settings = compressionSettings[imageType];

      // Use high quality (95) for files under 600KB to preserve quality
      const fileSizeKB = imageBuffer.length / 1024;
      const quality = fileSizeKB < 600 ? 95 : settings.quality;

      // 3. Resize image
      const resizedBuffer = await sharp(imageBuffer)
        .resize(settings.maxWidth, settings.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer();

      // 4. Get dimensions
      const metadata = await sharp(resizedBuffer).metadata();

      // 5. Apply watermark (skip for logos)
      let finalBuffer;
      if (imageType === 'logo') {
        finalBuffer = await sharp(resizedBuffer)
          .webp({ quality: quality })
          .toBuffer();
      } else {
        // Resize watermark to ~35% of image width with high quality
        const watermarkWidth = Math.floor(metadata.width * 0.35);
        const resizedWm = await sharp(watermark)
          .resize(watermarkWidth, null, { kernel: 'lanczos3' })
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });

        // Apply 60% opacity to alpha channel
        const { data, info } = resizedWm;
        for (let i = 3; i < data.length; i += 4) {
          data[i] = Math.round(data[i] * 0.6);
        }

        const resizedWatermark = await sharp(data, {
          raw: { width: info.width, height: info.height, channels: info.channels }
        })
          .png()
          .toBuffer();

        // Get watermark dimensions for positioning (lower - only 10px from bottom)
        const wmMeta = await sharp(resizedWatermark).metadata();
        const left = Math.floor((metadata.width - wmMeta.width) / 2);
        const top = metadata.height - wmMeta.height - 10;

        finalBuffer = await sharp(resizedBuffer)
          .composite([{
            input: resizedWatermark,
            left: left,
            top: top,
            blend: 'over'
          }])
          .webp({ quality: quality })
          .toBuffer();
      }

      // 6. Generate processed key
      const processedKey = uploadKey
        .replace('uploads/', 'processed/')
        .replace(/\.[^.]+$/, '.webp');

      // 7. Upload processed image
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: processedKey,
        Body: finalBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000'
      }));

      // 8. Delete original
      await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: uploadKey }));

      console.log(`✅ Processed: ${uploadKey} → ${processedKey}`);
      console.log(`   Size: ${(imageBuffer.length / 1024).toFixed(0)}KB → ${(finalBuffer.length / 1024).toFixed(0)}KB`);

    } catch (error) {
      console.error(`❌ Error processing ${uploadKey}:`, error);
      throw error;
    }
  }

  return { statusCode: 200, body: 'Processing complete' };
};
