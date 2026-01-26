import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Fix miscategorized sports events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    
    // If search term provided, find matching events
    if (search) {
      const { data: events } = await supabaseAdmin
        .from('events')
        .select('id, title, category')
        .ilike('title', `%${search}%`);
      
      return NextResponse.json({ search, events });
    }

    // Otherwise, find and fix ALL sports events that are miscategorized
    const sportsPatterns = ['golf', 'basketball', 'football', 'tennis', 'f1', 'grand prix', 'bapco', 'racing', 'championship'];
    
    const { data: allEvents, error: findError } = await supabaseAdmin
      .from('events')
      .select('id, title, category')
      .neq('category', 'sports');

    if (findError) {
      return NextResponse.json({ error: findError.message }, { status: 500 });
    }

    // Filter to events that look like sports
    const sportsEvents = (allEvents || []).filter(e => {
      const titleLower = e.title.toLowerCase();
      // Must contain a sports keyword
      const hasSportsKeyword = sportsPatterns.some(kw => titleLower.includes(kw));
      // Exclude music/concert events
      const isMusicEvent = titleLower.includes('live') || titleLower.includes('concert') || titleLower.includes('dj ');
      return hasSportsKeyword && !isMusicEvent;
    });

    if (sportsEvents.length === 0) {
      return NextResponse.json({ 
        message: 'No misclassified sports events found',
        totalChecked: allEvents?.length || 0
      });
    }

    // Update them to sports
    const updates = [];
    for (const event of sportsEvents) {
      const { error: updateError } = await supabaseAdmin
        .from('events')
        .update({ category: 'sports' })
        .eq('id', event.id);

      updates.push({ 
        id: event.id, 
        title: event.title, 
        oldCategory: event.category, 
        newCategory: 'sports',
        success: !updateError,
        error: updateError?.message
      });
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
