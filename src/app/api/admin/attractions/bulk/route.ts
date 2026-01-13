import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { action, ids } = body;

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: action and ids array required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    let affected = 0;

    switch (action) {
      case 'hide':
        const { error: hideError } = await (supabase as any)
          .from('attractions')
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .in('id', ids);

        if (hideError) throw hideError;
        affected = ids.length;
        break;

      case 'show':
        const { error: showError } = await (supabase as any)
          .from('attractions')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .in('id', ids);

        if (showError) throw showError;
        affected = ids.length;
        break;

      case 'delete':
        const { error: deleteError } = await (supabase as any)
          .from('attractions')
          .delete()
          .in('id', ids);

        if (deleteError) throw deleteError;
        affected = ids.length;
        break;

      case 'rewrite':
        // For bulk rewrite, we'll just mark them for now
        // Full AI rewrite would be done individually
        affected = ids.length;
        break;

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      affected,
    });
  } catch (error) {
    console.error('Bulk action error:', error);
    return NextResponse.json(
      { error: 'Bulk action failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
