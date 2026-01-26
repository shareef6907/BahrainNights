import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// One-time fix for Bapco Golf event category
export async function GET() {
  try {
    // Find events with "Bapco" and "Golf" or "Championship" in title that are wrongly categorized
    const { data: events, error: findError } = await supabaseAdmin
      .from('events')
      .select('id, title, category')
      .or('title.ilike.%Bapco%,title.ilike.%Golf%,title.ilike.%Championship%')
      .in('category', ['nightlife', 'music', 'arts']);

    if (findError) {
      return NextResponse.json({ error: findError.message }, { status: 500 });
    }

    // Filter to golf-related events
    const golfEvents = (events || []).filter(e => 
      e.title.toLowerCase().includes('golf') || 
      (e.title.toLowerCase().includes('bapco') && e.title.toLowerCase().includes('championship'))
    );

    if (golfEvents.length === 0) {
      return NextResponse.json({ message: 'No misclassified golf events found', events });
    }

    // Update them to sports
    const updates = [];
    for (const event of golfEvents) {
      const { error: updateError } = await supabaseAdmin
        .from('events')
        .update({ category: 'sports' })
        .eq('id', event.id);

      if (updateError) {
        updates.push({ id: event.id, title: event.title, error: updateError.message });
      } else {
        updates.push({ id: event.id, title: event.title, oldCategory: event.category, newCategory: 'sports' });
      }
    }

    return NextResponse.json({ 
      message: `Fixed ${golfEvents.length} golf event(s)`,
      updates 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
