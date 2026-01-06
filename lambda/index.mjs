import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { RekognitionClient, DetectModerationLabelsCommand } from '@aws-sdk/client-rekognition';
import sharp from 'sharp';

const s3Client = new S3Client({ region: process.env.REGION });
// Rekognition not available in me-south-1 (Bahrain), use eu-west-1 (Ireland) for lower latency
const rekognition = new RekognitionClient({ region: 'eu-west-1' });
const BUCKET = process.env.S3_BUCKET;

// Content moderation settings (MODERATE strictness)
// Block explicit content, allow suggestive nightlife photos
const BLOCKED_CATEGORIES = [
  'Explicit Nudity',      // Full nudity, genitalia
  'Graphic Violence',     // Blood, gore
  'Drugs',                // Illegal substances
  'Drug Paraphernalia',   // Pipes, syringes
  'Tobacco',              // Smoking/cigarettes
  'Hate Symbols',         // Nazi, extremist, political hate symbols - BIG NO
  'Extremist',            // Extremist content
  'Rude Gestures',        // Offensive hand gestures
  'Visually Disturbing'   // Disturbing/defaming imagery
];

// Categories we ALLOW (nightlife-friendly):
// - Suggestive (revealing outfits OK)
// - Alcohol (cocktails, bars OK)
// - Violence (action scenes OK)
// - Gambling (cards, casino OK)

// IMPORTANT: Hate symbols and political extremism are STRICTLY blocked

const MODERATION_CONFIDENCE = 75; // 75% confidence threshold

/**
 * Check image for inappropriate content using AWS Rekognition
 * @param {string} bucket - S3 bucket name
 * @param {string} key - S3 object key
 * @returns {Promise<{safe: boolean, violations: Array}>}
 */
async function checkContentModeration(bucket, key) {
  try {
    console.log(`🔍 Checking content moderation for: ${key}`);

    // Download image from S3 first (cross-region S3->Rekognition not supported)
    const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key });
    const s3Response = await s3Client.send(getCommand);
    const imageBytes = await s3Response.Body.transformToByteArray();

    const command = new DetectModerationLabelsCommand({
      Image: {
        Bytes: imageBytes
      },
      MinConfidence: MODERATION_CONFIDENCE
    });

    const response = await rekognition.send(command);

    // Log all detected labels for debugging
    if (response.ModerationLabels && response.ModerationLabels.length > 0) {
      console.log('Detected moderation labels:', JSON.stringify(response.ModerationLabels, null, 2));
    }

    // Filter for blocked categories only
    const violations = (response.ModerationLabels || []).filter(label =>
      BLOCKED_CATEGORIES.some(blocked =>
        label.Name === blocked || label.ParentName === blocked
      )
    );

    if (violations.length > 0) {
      console.log('🚫 Content violations found:', violations.map(v => ({
        name: v.Name,
        parent: v.ParentName,
        confidence: v.Confidence.toFixed(1) + '%'
      })));
    }

    return {
      safe: violations.length === 0,
      violations: violations.map(v => ({
        name: v.Name,
        parent: v.ParentName,
        confidence: v.Confidence
      }))
    };
  } catch (error) {
    // Log error but allow image through (fail open)
    // This prevents blocking all uploads if Rekognition has issues
    console.error('⚠️ Rekognition error (allowing image):', error.message);
    return { safe: true, violations: [], error: error.message };
  }
}

// Note: Watermarks removed from all uploads per user request

// Compression settings
const compressionSettings = {
  cover: { maxWidth: 1920, maxHeight: 1080, quality: 85 },
  gallery: { maxWidth: 1200, maxHeight: 800, quality: 80 },
  logo: { maxWidth: 400, maxHeight: 400, quality: 90 },
  banner: { maxWidth: 1920, maxHeight: 600, quality: 85 },
  default: { maxWidth: 1200, maxHeight: 800, quality: 80 }
};

// Maximum file size in bytes (1MB)
const MAX_FILE_SIZE = 1024 * 1024;

/**
 * Compress image to target file size (1MB max)
 * Iteratively reduces quality until under target size
 */
async function compressToTargetSize(sharpInstance, initialQuality, maxSize = MAX_FILE_SIZE) {
  let quality = initialQuality;
  let buffer = await sharpInstance.webp({ quality }).toBuffer();

  // Iterate down quality until under max size (min quality 50)
  while (buffer.length > maxSize && quality > 50) {
    quality -= 5;
    buffer = await sharpInstance.webp({ quality }).toBuffer();
    console.log(`  Reducing quality to ${quality}%, size: ${(buffer.length / 1024).toFixed(0)}KB`);
  }

  return { buffer, quality };
}

export const handler = async (event) => {
  console.log('Processing event:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    const uploadKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

    // Only process files in /uploads/ folder
    if (!uploadKey.startsWith('uploads/')) {
      console.log('Skipping non-upload file:', uploadKey);
      continue;
    }

    try {
      // ============================================
      // STEP 0: AI CONTENT MODERATION CHECK
      // ============================================
      const moderationResult = await checkContentModeration(BUCKET, uploadKey);

      if (!moderationResult.safe) {
        console.log('🚫 CONTENT BLOCKED - Deleting image:', uploadKey);
        console.log('Violations:', JSON.stringify(moderationResult.violations));

        // Silent deletion - delete the uploaded file
        await s3Client.send(new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: uploadKey
        }));

        console.log('✅ Blocked image deleted successfully');

        // Continue to next image (don't throw error)
        continue;
      }

      console.log('✅ Content moderation passed for:', uploadKey);
      // ============================================

      // 1. Get the uploaded image
      const getCommand = new GetObjectCommand({ Bucket: BUCKET, Key: uploadKey });
      const response = await s3Client.send(getCommand);
      const imageBuffer = Buffer.from(await response.Body.transformToByteArray());

      // 2. Determine image type from path
      let imageType = 'default';
      if (uploadKey.includes('/logo')) imageType = 'logo';
      else if (uploadKey.includes('/cover')) imageType = 'cover';
      else if (uploadKey.includes('/banner') || uploadKey.includes('/ads/') || uploadKey.includes('/slider/')) imageType = 'banner';
      else if (uploadKey.includes('/gallery')) imageType = 'gallery';

      const settings = compressionSettings[imageType];

      // 3. Resize image
      const resizedBuffer = await sharp(imageBuffer)
        .resize(settings.maxWidth, settings.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer();

      // 4. Get dimensions
      const metadata = await sharp(resizedBuffer).metadata();

      // 5. NO watermark for ANY image type (logo, cover, banner, gallery)
      // Compress to max 1MB using iterative quality reduction
      const { buffer: finalBuffer, quality: finalQuality } = await compressToTargetSize(
        sharp(resizedBuffer),
        settings.quality,
        MAX_FILE_SIZE
      );

      console.log(`   Final quality: ${finalQuality}%, size: ${(finalBuffer.length / 1024).toFixed(0)}KB`);

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
