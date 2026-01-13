import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/server';
import { uploadImage, isValidImageType, isValidFileSize, waitForProcessing } from '@/lib/s3';

// POST - Upload new image for attraction
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;
    const supabase = getAdminClient();

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    // Option 1: Upload from file
    if (file) {
      // Validate file
      if (!isValidImageType(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
          { status: 400 }
        );
      }

      if (!isValidFileSize(file.size, 10)) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 10MB' },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const timestamp = Date.now();
      const ext = file.name.split('.').pop() || 'jpg';
      const filename = `${id}-${timestamp}.${ext}`;

      // Upload to S3
      const result = await uploadImage(buffer, 'attractions', filename, file.type);

      // Wait for Lambda processing
      const processed = await waitForProcessing(result.processedUrl, 10, 1000);

      if (!processed) {
        console.warn('Image processing timeout, using upload URL');
      }

      // Update database with new image URL
      const { error: updateError } = await (supabase as any)
        .from('attractions')
        .update({
          image_url: result.processedUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating attraction image:', updateError);
        return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        imageUrl: result.processedUrl,
        processed
      });
    }

    // Option 2: Fetch from URL
    if (imageUrl) {
      try {
        // Download the image
        const response = await fetch(imageUrl);
        if (!response.ok) {
          return NextResponse.json({ error: 'Failed to fetch image from URL' }, { status: 400 });
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';
        if (!isValidImageType(contentType)) {
          return NextResponse.json(
            { error: 'Invalid image type from URL' },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        if (!isValidFileSize(buffer.length, 10)) {
          return NextResponse.json(
            { error: 'Image from URL is too large. Maximum size is 10MB' },
            { status: 400 }
          );
        }

        const timestamp = Date.now();
        const ext = contentType.split('/')[1] || 'jpg';
        const filename = `${id}-${timestamp}.${ext}`;

        // Upload to S3
        const result = await uploadImage(buffer, 'attractions', filename, contentType);

        // Wait for Lambda processing
        const processed = await waitForProcessing(result.processedUrl, 10, 1000);

        // Update database
        const { error: updateError } = await (supabase as any)
          .from('attractions')
          .update({
            image_url: result.processedUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (updateError) {
          console.error('Error updating attraction image:', updateError);
          return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          imageUrl: result.processedUrl,
          processed
        });
      } catch (error) {
        console.error('Error fetching image from URL:', error);
        return NextResponse.json({ error: 'Failed to fetch image from URL' }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'No file or imageUrl provided' }, { status: 400 });
  } catch (error) {
    console.error('Error in POST /api/admin/attractions/[id]/upload-image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
