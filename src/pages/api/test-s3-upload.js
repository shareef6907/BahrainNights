import { S3Client, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';

export default async function handler(req, res) {
  // Only allow GET requests for testing
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use GET to test S3 upload.'
    });
  }

  const startTime = Date.now();
  const results = {
    success: false,
    timestamp: new Date().toISOString(),
    environment: {},
    bucketCheck: null,
    upload: null,
    publicUrl: null,
    duration: null,
    error: null
  };

  // Check environment variables
  const envVars = {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY,
    region: process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1',
    bucket: process.env.BAHRAINNIGHTS_S3_BUCKET || 'bahrainnights-production'
  };

  results.environment = {
    accessKeyId: envVars.accessKeyId ? `${envVars.accessKeyId.substring(0, 4)}...${envVars.accessKeyId.slice(-4)}` : 'NOT SET',
    secretAccessKey: envVars.secretAccessKey ? '********' : 'NOT SET',
    region: envVars.region,
    bucket: envVars.bucket
  };

  // Validate required environment variables
  if (!envVars.accessKeyId || !envVars.secretAccessKey) {
    results.error = {
      type: 'MISSING_CREDENTIALS',
      message: 'AWS credentials not configured. Set BAHRAINNIGHTS_AWS_ACCESS_KEY_ID and BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY environment variables.'
    };
    results.duration = `${Date.now() - startTime}ms`;
    return res.status(500).json(results);
  }

  // Initialize S3 client
  const s3Client = new S3Client({
    region: envVars.region,
    credentials: {
      accessKeyId: envVars.accessKeyId,
      secretAccessKey: envVars.secretAccessKey
    }
  });

  try {
    // Step 1: Verify bucket access
    const headBucketCommand = new HeadBucketCommand({
      Bucket: envVars.bucket
    });

    await s3Client.send(headBucketCommand);
    results.bucketCheck = {
      status: 'SUCCESS',
      message: `Bucket '${envVars.bucket}' is accessible`
    };
  } catch (bucketError) {
    results.bucketCheck = {
      status: 'FAILED',
      message: bucketError.message,
      code: bucketError.Code || bucketError.name
    };
    results.error = {
      type: 'BUCKET_ACCESS_ERROR',
      message: `Cannot access bucket: ${bucketError.message}`,
      suggestion: bucketError.name === 'NotFound'
        ? 'Bucket does not exist. Create it first.'
        : bucketError.name === 'AccessDenied'
        ? 'Check IAM permissions for s3:HeadBucket, s3:PutObject actions.'
        : 'Check your AWS credentials and bucket configuration.'
    };
    results.duration = `${Date.now() - startTime}ms`;
    return res.status(500).json(results);
  }

  try {
    // Step 2: Upload test file
    const testKey = 'test/verification.txt';
    const testContent = `BahrainNights S3 Upload Test
=============================
Timestamp: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV || 'development'}
Region: ${envVars.region}
Bucket: ${envVars.bucket}

This file confirms S3 upload is working correctly.
`;

    const putCommand = new PutObjectCommand({
      Bucket: envVars.bucket,
      Key: testKey,
      Body: testContent,
      ContentType: 'text/plain',
      Metadata: {
        'uploaded-by': 'bahrainnights-s3-test',
        'upload-timestamp': new Date().toISOString()
      }
    });

    const uploadResult = await s3Client.send(putCommand);

    // Construct public URL
    const publicUrl = `https://${envVars.bucket}.s3.${envVars.region}.amazonaws.com/${testKey}`;

    results.upload = {
      status: 'SUCCESS',
      key: testKey,
      etag: uploadResult.ETag,
      versionId: uploadResult.VersionId || null,
      contentLength: Buffer.byteLength(testContent, 'utf8')
    };

    results.publicUrl = publicUrl;
    results.success = true;
    results.duration = `${Date.now() - startTime}ms`;

    return res.status(200).json({
      ...results,
      message: 'S3 upload test completed successfully! Your AWS S3 configuration is working.'
    });

  } catch (uploadError) {
    results.upload = {
      status: 'FAILED',
      message: uploadError.message,
      code: uploadError.Code || uploadError.name
    };
    results.error = {
      type: 'UPLOAD_ERROR',
      message: uploadError.message,
      suggestion: uploadError.name === 'AccessDenied'
        ? 'Check IAM permissions for s3:PutObject action on the bucket.'
        : 'Verify your S3 configuration and try again.'
    };
    results.duration = `${Date.now() - startTime}ms`;
    return res.status(500).json(results);
  }
}
