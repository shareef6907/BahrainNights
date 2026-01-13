import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';
import { rewriteMultipleDescriptions } from '@/lib/services/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { action, ids } = body;

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    let affected = 0;

    switch (action) {
      case 'hide':
        const { error: hideError, count: hideCount } = await supabaseAdmin
          .from('events')
          .update({ is_hidden: true, updated_at: new Date().toISOString() })
          .in('id', ids);
        if (hideError) throw hideError;
        affected = hideCount || ids.length;
        break;

      case 'show':
        const { error: showError, count: showCount } = await supabaseAdmin
          .from('events')
          .update({ is_hidden: false, updated_at: new Date().toISOString() })
          .in('id', ids);
        if (showError) throw showError;
        affected = showCount || ids.length;
        break;

      case 'activate':
        const { error: activateError, count: activateCount } = await supabaseAdmin
          .from('events')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .in('id', ids);
        if (activateError) throw activateError;
        affected = activateCount || ids.length;
        break;

      case 'deactivate':
        const { error: deactivateError, count: deactivateCount } = await supabaseAdmin
          .from('events')
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .in('id', ids);
        if (deactivateError) throw deactivateError;
        affected = deactivateCount || ids.length;
        break;

      case 'delete':
        const { error: deleteError, count: deleteCount } = await supabaseAdmin
          .from('events')
          .delete()
          .in('id', ids);
        if (deleteError) throw deleteError;
        affected = deleteCount || ids.length;
        break;

      case 'rewrite':
        // Fetch events to rewrite
        const { data: events, error: fetchError } = await supabaseAdmin
          .from('events')
          .select('id, title, description, venue_name')
          .in('id', ids);

        if (fetchError) throw fetchError;

        if (!events || events.length === 0) {
          return NextResponse.json({ error: 'No events found' }, { status: 404 });
        }

        // Rewrite descriptions using Gemini
        const items = events.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description,
          venue: e.venue_name
        }));

        const results = await rewriteMultipleDescriptions(items);

        // Update each event with new description
        for (const { id, result } of results) {
          if (result.success && result.description) {
            await supabaseAdmin
              .from('events')
              .update({
                description: result.description,
                updated_at: new Date().toISOString()
              })
              .eq('id', id);
            affected++;
          }
        }
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true, affected });
  } catch (error) {
    console.error('Bulk action error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bulk action failed' },
      { status: 500 }
    );
  }
}
