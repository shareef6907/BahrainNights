import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';
import { rewriteDescription } from '@/lib/services/gemini';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Get the event
    const { data: event, error: fetchError } = await supabaseAdmin
      .from('events')
      .select('id, title, description, venue_name')
      .eq('id', id)
      .single();

    if (fetchError || !event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Rewrite description using Gemini
    const result = await rewriteDescription(event.title, event.description, event.venue_name);

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'AI rewriting failed' }, { status: 500 });
    }

    // Update the event
    const { error: updateError } = await supabaseAdmin
      .from('events')
      .update({
        description: result.description,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }

    return NextResponse.json({ success: true, description: result.description });
  } catch (error) {
    console.error('Rewrite error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Rewriting failed' },
      { status: 500 }
    );
  }
}
