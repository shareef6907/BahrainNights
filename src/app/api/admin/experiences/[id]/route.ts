import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// GET - Get single experience
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching experience:', error);
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json({ experience: data });
  } catch (error) {
    console.error('Error in GET /api/admin/experiences/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - Update experience
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getAdminClient();

    // Fields that can be updated
    const allowedFields = [
      'title', 'description', 'price', 'price_currency',
      'image_url', 'cover_url', 'venue', 'location', 'category',
      'is_active', 'is_featured'
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        // Convert empty strings to null for optional fields
        if (body[field] === '' && field !== 'title' && field !== 'description') {
          updateData[field] = null;
        } else {
          updateData[field] = body[field];
        }
      }
    }

    console.log('Updating experience:', id, 'with data:', JSON.stringify(updateData, null, 2));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('experiences')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating experience:', error.message, error.code, error.details);
      return NextResponse.json({
        error: `Failed to update experience: ${error.message || 'Unknown error'}`,
        code: error.code,
        details: error.details
      }, { status: 500 });
    }

    if (!data) {
      console.error('No data returned from update - experience may not exist');
      return NextResponse.json({ error: 'Experience not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ experience: data });
  } catch (error) {
    console.error('Error in PATCH /api/admin/experiences/[id]:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Internal server error: ${errorMessage}` }, { status: 500 });
  }
}

// DELETE - Delete experience
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting experience:', error);
      return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/experiences/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
