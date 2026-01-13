import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { uploadImage, isValidImageType, isValidFileSize, waitForProcessing } from '@/lib/s3';

// POST - Upload cover image for experience (wide banner for modal)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
      const filename = `${id}-cover-${timestamp}.${ext}`;

      // Upload to S3
      const result = await uploadImage(buffer, 'attractions', filename, file.type);

      // Wait for Lambda processing
      const processed = await waitForProcessing(result.processedUrl, 10, 1000);

      if (!processed) {
        console.warn('Image processing timeout, using upload URL');
      }

      // Update database with new cover URL
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from('experiences')
        .update({
          cover_url: result.processedUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating experience cover:', updateError);
        return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        coverUrl: result.processedUrl,
        processed
      });
    }

    // Option 2: Fetch from URL
    if (imageUrl) {
      try {
        // Check if URL is already on our S3 - just save it directly without re-uploading
        const ourS3Domain = 'bahrainnights-production.s3.me-south-1.amazonaws.com';
        if (imageUrl.includes(ourS3Domain)) {
          console.log('URL is already on our S3, saving directly:', imageUrl);

          // Update database directly with the existing S3 URL
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error: updateError } = await (supabase as any)
            .from('experiences')
            .update({
              cover_url: imageUrl,
              updated_at: new Date().toISOString()
            })
            .eq('id', id);

          if (updateError) {
            console.error('Error updating experience cover:', updateError);
            return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
          }

          return NextResponse.json({
            success: true,
            coverUrl: imageUrl,
            processed: true
          });
        }

        // Download the image from external URL
        console.log('Fetching image from external URL:', imageUrl);
        const response = await fetch(imageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; BahrainNights/1.0)',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch image:', response.status, response.statusText);
          return NextResponse.json({
            error: `Failed to fetch image: ${response.status} ${response.statusText}`
          }, { status: 400 });
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';
        if (!isValidImageType(contentType)) {
          return NextResponse.json(
            { error: `Invalid image type from URL: ${contentType}` },
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
        const filename = `${id}-cover-${timestamp}.${ext}`;

        // Upload to S3
        const result = await uploadImage(buffer, 'attractions', filename, contentType);

        // Wait for Lambda processing
        const processed = await waitForProcessing(result.processedUrl, 10, 1000);

        // Update database
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: updateError } = await (supabase as any)
          .from('experiences')
          .update({
            cover_url: result.processedUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (updateError) {
          console.error('Error updating experience cover:', updateError);
          return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          coverUrl: result.processedUrl,
          processed
        });
      } catch (error) {
        console.error('Error fetching image from URL:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: `Failed to fetch image: ${errorMessage}` }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'No file or imageUrl provided' }, { status: 400 });
  } catch (error) {
    console.error('Error in POST /api/admin/experiences/[id]/upload-cover:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
