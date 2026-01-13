import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { rewriteDescription } from '@/lib/services/gemini';

// POST - Rewrite description with Gemini AI
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // Get the experience
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: experience, error: fetchError } = await (supabase as any)
      .from('experiences')
      .select('title, description, venue')
      .eq('id', id)
      .single();

    if (fetchError || !experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    // Rewrite with Gemini
    const result = await rewriteDescription(
      experience.title,
      experience.description,
      experience.venue
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Check if autoSave is requested
    const body = await request.json().catch(() => ({}));

    if (body.autoSave) {
      // Update the database with the new description
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from('experiences')
        .update({
          description: result.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error saving rewritten description:', updateError);
        return NextResponse.json({
          success: true,
          description: result.description,
          saved: false,
          saveError: 'Failed to save to database'
        });
      }

      return NextResponse.json({
        success: true,
        description: result.description,
        saved: true
      });
    }

    return NextResponse.json({
      success: true,
      description: result.description,
      saved: false
    });
  } catch (error) {
    console.error('Error in POST /api/admin/experiences/[id]/rewrite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
