import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// One-time fix for miscategorized sports events
export async function GET() {
  try {
    // Find ALL events with sports-related keywords that are wrongly categorized
    const { data: allEvents, error: findError } = await supabaseAdmin
      .from('events')
      .select('id, title, category')
      .or('title.ilike.%golf%,title.ilike.%championship%,title.ilike.%basketball%,title.ilike.%bapco%,title.ilike.%f1%,title.ilike.%grand prix%,title.ilike.%football%,title.ilike.%tennis%')
      .neq('category', 'sports');

    if (findError) {
      return NextResponse.json({ error: findError.message }, { status: 500 });
    }

    // Filter to actual sports events (exclude music festivals with "championship" etc)
    const sportsKeywords = ['golf', 'basketball', 'football', 'tennis', 'f1', 'grand prix', 'bapco energies', 'racing'];
    const sportsEvents = (allEvents || []).filter(e => {
      const titleLower = e.title.toLowerCase();
      return sportsKeywords.some(keyword => titleLower.includes(keyword));
    });

    if (sportsEvents.length === 0) {
      return NextResponse.json({ 
        message: 'No misclassified sports events found', 
        checkedEvents: allEvents?.length || 0 
      });
    }

    // Update them to sports
    const updates = [];
    for (const event of sportsEvents) {
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
      message: `Fixed ${sportsEvents.length} sports event(s)`,
      updates 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
