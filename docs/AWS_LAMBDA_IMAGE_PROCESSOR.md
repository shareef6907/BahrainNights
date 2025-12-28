# AWS Lambda Image Processor Setup Guide

This guide covers the deployment and configuration of the AWS Lambda function that processes and watermarks images for BahrainNights.com.

## Overview

The Lambda function:
- Automatically triggers when images are uploaded to the S3 `/uploads/` folder
- Compresses images based on type (logo, cover, gallery, banner)
- Adds "BahrainNights.com" watermark (except for logos)
- Converts all images to WebP format
- Moves processed images to `/processed/` folder
- Deletes originals from `/uploads/`

## Prerequisites

- AWS Account with access to Lambda, S3, and IAM
- Node.js 20.x runtime
- S3 bucket: `bahrainnights-images` (or your bucket name)

## Step 1: Create IAM Role

1. Go to **IAM Console** → **Roles** → **Create Role**
2. Select **AWS Service** → **Lambda**
3. Create the role with name: `bahrainnights-lambda-role`
4. Attach this inline policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::bahrainnights-images/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## Step 2: Create Sharp Lambda Layer

Sharp has native binaries, so you need a Lambda Layer:

### Option A: Use Pre-built Layer (Recommended)

Search for community layers or use ARNs like:
```
arn:aws:lambda:me-south-1:XXXXXXXXXXXX:layer:sharp:1
```

### Option B: Build Your Own Layer

```bash
# On a Linux/ARM64 machine (or use Docker)
mkdir -p lambda-layer/nodejs
cd lambda-layer/nodejs
npm init -y
npm install sharp --platform=linux --arch=arm64
cd ..
zip -r sharp-layer.zip nodejs

# Upload to Lambda Console → Layers → Create Layer
```

## Step 3: Create Lambda Function

1. Go to **Lambda Console** → **Create Function**
2. Configuration:
   - Name: `bahrainnights-image-processor`
   - Runtime: `Node.js 20.x`
   - Architecture: `arm64`
   - Execution Role: `bahrainnights-lambda-role`

3. Under **General Configuration**:
   - Memory: `1024 MB`
   - Timeout: `30 seconds`
   - Ephemeral storage: `512 MB`

4. Add the Sharp layer under **Layers**

## Step 4: Lambda Function Code

Create `index.mjs`:

```javascript
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3Client = new S3Client({ region: process.env.AWS_REGION });
const BUCKET = process.env.S3_BUCKET;

// Compression settings based on image type
const compressionSettings = {
  cover: { maxWidth: 1920, maxHeight: 1080, quality: 75 },
  gallery: { maxWidth: 1200, maxHeight: 800, quality: 75 },
  logo: { maxWidth: 400, maxHeight: 400, quality: 85 },
  banner: { maxWidth: 1920, maxHeight: 600, quality: 75 },
  default: { maxWidth: 1200, maxHeight: 800, quality: 75 }
};

// Watermark SVG generator
function createWatermarkSvg(width) {
  const fontSize = Math.max(16, Math.floor(width * 0.02));
  const padding = Math.floor(fontSize * 0.5);

  return Buffer.from(`
    <svg width="${width}" height="${fontSize + padding * 2}">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="black" flood-opacity="0.5"/>
        </filter>
      </defs>
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="white"
        fill-opacity="0.85"
        filter="url(#shadow)"
      >
        BahrainNights.com
      </text>
    </svg>
  `);
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

      // 3. Process image with Sharp
      let image = sharp(imageBuffer);

      // Resize maintaining aspect ratio
      image = image.resize(settings.maxWidth, settings.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });

      // Get new dimensions after resize
      const resizedBuffer = await image.toBuffer();
      const resizedMetadata = await sharp(resizedBuffer).metadata();

      // 4. Create and apply watermark (skip for logos)
      let finalBuffer;
      if (imageType === 'logo') {
        finalBuffer = await sharp(resizedBuffer)
          .webp({ quality: settings.quality })
          .toBuffer();
      } else {
        const watermarkSvg = createWatermarkSvg(resizedMetadata.width);
        finalBuffer = await sharp(resizedBuffer)
          .composite([{
            input: watermarkSvg,
            gravity: 'south'
          }])
          .webp({ quality: settings.quality })
          .toBuffer();
      }

      // 5. Generate processed key
      const processedKey = uploadKey
        .replace('uploads/', 'processed/')
        .replace(/\.[^.]+$/, '.webp');

      // 6. Upload processed image
      const putCommand = new PutObjectCommand({
        Bucket: BUCKET,
        Key: processedKey,
        Body: finalBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000',
        Metadata: {
          'original-size': String(imageBuffer.length),
          'processed-size': String(finalBuffer.length),
          'processed-at': new Date().toISOString()
        }
      });
      await s3Client.send(putCommand);

      // 7. Delete original from uploads folder
      const deleteCommand = new DeleteObjectCommand({ Bucket: BUCKET, Key: uploadKey });
      await s3Client.send(deleteCommand);

      console.log(`✅ Processed: ${uploadKey} → ${processedKey}`);
      console.log(`   Size: ${(imageBuffer.length / 1024).toFixed(0)}KB → ${(finalBuffer.length / 1024).toFixed(0)}KB`);

    } catch (error) {
      console.error(`❌ Error processing ${uploadKey}:`, error);
      throw error;
    }
  }

  return { statusCode: 200, body: 'Processing complete' };
};
```

## Step 5: Add Environment Variables

In Lambda Console → Configuration → Environment Variables:

| Key | Value |
|-----|-------|
| `AWS_REGION` | `me-south-1` |
| `S3_BUCKET` | `bahrainnights-images` |

## Step 6: Configure S3 Trigger

1. Go to **S3 Console** → Your Bucket → **Properties**
2. Scroll to **Event notifications** → **Create event notification**
3. Configuration:
   - Name: `image-upload-trigger`
   - Event types: ✓ All object create events
   - Prefix: `uploads/`
   - Destination: Lambda function → `bahrainnights-image-processor`

## Step 7: Set S3 Bucket Policy

Add this policy to make processed images public:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadProcessed",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bahrainnights-images/processed/*"
    }
  ]
}
```

## Step 8: Update Next.js Environment Variables

Add to `.env.local`:

```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=me-south-1
AWS_S3_BUCKET=bahrainnights-images
NEXT_PUBLIC_S3_URL=https://bahrainnights-images.s3.me-south-1.amazonaws.com/processed
```

Add to Vercel Environment Variables as well.

## Testing

### Manual Test

1. Upload a test image to S3:
   ```
   s3://bahrainnights-images/uploads/test/test-image.jpg
   ```

2. Check CloudWatch Logs for Lambda execution

3. Verify processed image appears at:
   ```
   s3://bahrainnights-images/processed/test/test-image.webp
   ```

4. Verify the watermark is visible at bottom center

### Test via Application

1. Use the admin panel to upload a sponsor logo
2. Check the browser network tab for the upload request
3. Verify the returned URL points to `/processed/`
4. Confirm the image displays correctly

## Troubleshooting

### Lambda Times Out
- Increase timeout to 60 seconds
- Check image size isn't too large
- Verify Sharp layer is correctly attached

### Permission Denied
- Check IAM role has correct S3 permissions
- Verify bucket name in environment variables

### Watermark Not Appearing
- Check image type detection logic
- Verify SVG generation is working
- Check Sharp composite operation

### Image Not Processing
- Check S3 trigger is configured correctly
- Verify uploads go to `/uploads/` folder
- Check CloudWatch logs for errors

## S3 Folder Structure

```
bahrainnights-images/
├── uploads/          ← Raw uploads land here (temporary)
│   └── [files being processed...]
│
└── processed/        ← Lambda moves watermarked images here (permanent, public)
    ├── venues/{venue-slug}/
    │   ├── logo.webp
    │   ├── cover.webp
    │   └── gallery/
    │       ├── 001.webp
    │       └── 002.webp
    │
    ├── events/{venue-slug}/{YYYY-MM}/{event-slug}/
    │   ├── cover.webp
    │   └── gallery/
    │       ├── 001.webp
    │       └── ...
    │
    ├── offers/{venue-slug}/{offer-slug}.webp
    │
    ├── sponsors/{sponsor-slug}.webp
    │
    └── ads/{YYYY-MM}/{ad-slug}.webp
```

## Cost Estimation

| Resource | Estimated Monthly Cost |
|----------|----------------------|
| Lambda Invocations | $0-5 (first 1M free) |
| Lambda Duration | $0-10 (based on usage) |
| S3 Storage | $0.023/GB |
| S3 Requests | $0.0004/1000 PUT, $0.0004/1000 GET |
| Data Transfer | $0.09/GB (after free tier) |

**Estimated Total: $5-25/month** depending on volume.

## Maintenance

### Regular Tasks
- Monitor CloudWatch logs for errors
- Review Lambda metrics monthly
- Clean up old processed images periodically
- Update Sharp layer when new versions are available

### Scaling Considerations
- Lambda automatically scales
- Consider S3 Intelligent-Tiering for cost optimization
- Add CloudFront CDN for better performance if needed
