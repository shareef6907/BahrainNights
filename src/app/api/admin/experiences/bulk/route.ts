import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { rewriteDescription } from '@/lib/services/gemini';

// POST - Bulk operations on experiences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids } = body;

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Action and ids array are required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    switch (action) {
      case 'hide': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('experiences')
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .in('id', ids);

        if (error) {
          console.error('Error hiding experiences:', error);
          return NextResponse.json({ error: 'Failed to hide experiences' }, { status: 500 });
        }

        return NextResponse.json({ success: true, affected: ids.length });
      }

      case 'show': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('experiences')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .in('id', ids);

        if (error) {
          console.error('Error showing experiences:', error);
          return NextResponse.json({ error: 'Failed to show experiences' }, { status: 500 });
        }

        return NextResponse.json({ success: true, affected: ids.length });
      }

      case 'delete': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('experiences')
          .delete()
          .in('id', ids);

        if (error) {
          console.error('Error deleting experiences:', error);
          return NextResponse.json({ error: 'Failed to delete experiences' }, { status: 500 });
        }

        return NextResponse.json({ success: true, affected: ids.length });
      }

      case 'rewrite': {
        // Get all experiences to rewrite
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: experiences, error: fetchError } = await (supabase as any)
          .from('experiences')
          .select('id, title, description, venue')
          .in('id', ids);

        if (fetchError || !experiences) {
          return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
        }

        const results: Array<{ id: string; success: boolean; error?: string }> = [];

        // Process sequentially to avoid rate limits
        for (const exp of experiences) {
          const result = await rewriteDescription(exp.title, exp.description, exp.venue);

          if (result.success && result.description) {
            // Update the database
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: updateError } = await (supabase as any)
              .from('experiences')
              .update({
                description: result.description,
                updated_at: new Date().toISOString()
              })
              .eq('id', exp.id);

            if (updateError) {
              results.push({ id: exp.id, success: false, error: 'Failed to save' });
            } else {
              results.push({ id: exp.id, success: true });
            }
          } else {
            results.push({ id: exp.id, success: false, error: result.error });
          }

          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        const successCount = results.filter(r => r.success).length;
        return NextResponse.json({
          success: true,
          affected: successCount,
          total: ids.length,
          results
        });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST /api/admin/experiences/bulk:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
