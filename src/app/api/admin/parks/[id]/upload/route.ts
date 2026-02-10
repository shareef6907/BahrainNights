import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { supabaseAdmin } from '@/lib/supabase';
import sharp from 'sharp';

// S3 Client setup - using existing env vars
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const REGION = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'us-east-1';

// POST /api/admin/parks/[id]/upload - Upload image for park
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify park exists
    const { data: park, error: parkError } = await supabaseAdmin
      .from('parks')
      .select('id, name, image_url')
      .eq('id', id)
      .single();

    if (parkError || !park) {
      return NextResponse.json({ error: 'Park not found' }, { status: 404 });
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process image with Sharp
    const processedBuffer = await sharp(buffer)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate S3 key
    const s3Key = `parks/${id}/main.webp`;

    // Delete old image if exists
    if (park.image_url) {
      try {
        const oldKey = park.image_url.split('.amazonaws.com/')[1];
        if (oldKey) {
          await s3Client.send(new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: oldKey,
          }));
        }
      } catch (deleteError) {
        console.error('Error deleting old image:', deleteError);
        // Continue with upload even if delete fails
      }
    }

    // Upload to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      Body: processedBuffer,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000', // 1 year cache
    }));

    // Generate public URL
    const imageUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${s3Key}`;

    // Update park record with image URL
    const { error: updateError } = await supabaseAdmin
      .from('parks')
      .update({ image_url: imageUrl })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating park with image URL:', updateError);
      return NextResponse.json({ error: 'Failed to update park record' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      image_url: imageUrl,
    });
  } catch (error) {
    console.error('Error uploading park image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// DELETE /api/admin/parks/[id]/upload - Delete park image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get park to find image URL
    const { data: park, error: parkError } = await supabaseAdmin
      .from('parks')
      .select('id, image_url')
      .eq('id', id)
      .single();

    if (parkError || !park) {
      return NextResponse.json({ error: 'Park not found' }, { status: 404 });
    }

    if (!park.image_url) {
      return NextResponse.json({ error: 'No image to delete' }, { status: 400 });
    }

    // Delete from S3
    try {
      const s3Key = park.image_url.split('.amazonaws.com/')[1];
      if (s3Key) {
        await s3Client.send(new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: s3Key,
        }));
      }
    } catch (deleteError) {
      console.error('Error deleting from S3:', deleteError);
      // Continue to clear URL even if S3 delete fails
    }

    // Clear image URL in database
    const { error: updateError } = await supabaseAdmin
      .from('parks')
      .update({ image_url: null })
      .eq('id', id);

    if (updateError) {
      console.error('Error clearing image URL:', updateError);
      return NextResponse.json({ error: 'Failed to update park record' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting park image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
