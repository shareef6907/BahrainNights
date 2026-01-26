import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthStr = nextMonth.toISOString().split('T')[0];

    // Fetch upcoming Bahrain events
    const { data: bahrainEvents } = await supabaseAdmin
      .from('events')
      .select('title, date, venue_name, category, time')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .lte('date', nextMonthStr)
      .order('date', { ascending: true })
      .limit(10);

    // Fetch international events
    const { data: internationalEvents } = await supabaseAdmin
      .from('events')
      .select('title, date, venue_name, country, city, category')
      .eq('status', 'published')
      .neq('country', 'Bahrain')
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(5);

    // Generate newsletter content
    const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    let content = `# BahrainNights Newsletter - ${monthName}\n\n`;
    content += `Hello there! 👋\n\n`;
    content += `Here's what's happening in Bahrain this month:\n\n`;
    
    content += `## 🔥 Top Events This Month\n\n`;
    
    if (bahrainEvents && bahrainEvents.length > 0) {
      bahrainEvents.forEach((event, index) => {
        const eventDate = new Date(event.date).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
        content += `${index + 1}. **${event.title}**\n`;
        content += `   📅 ${eventDate}`;
        if (event.time) content += ` at ${event.time}`;
        content += `\n`;
        if (event.venue_name) content += `   📍 ${event.venue_name}\n`;
        content += `\n`;
      });
    } else {
      content += `Stay tuned - new events are being added daily!\n\n`;
    }

    content += `## 🌍 International Events\n\n`;
    content += `Planning a trip? Don't miss these events in the region:\n\n`;
    
    if (internationalEvents && internationalEvents.length > 0) {
      internationalEvents.forEach((event) => {
        const eventDate = new Date(event.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        content += `• **${event.title}** - ${event.city || event.country} (${eventDate})\n`;
      });
    } else {
      content += `Check bahrainnights.com/international for the latest international events.\n`;
    }

    content += `\n## 💡 Insider Tips\n\n`;
    content += `• Best time to visit the new restaurants: Weekday lunches for shorter waits\n`;
    content += `• Don't forget - many venues offer early bird discounts!\n`;
    content += `• Follow us on Instagram @bahrainnights for real-time updates\n\n`;

    content += `---\n\n`;
    content += `Until next time,\n`;
    content += `The BahrainNights Team\n\n`;
    content += `[Browse All Events](https://bahrainnights.com/events) | [Unsubscribe](https://bahrainnights.com/unsubscribe)\n`;

    return NextResponse.json({ 
      content,
      eventsCount: bahrainEvents?.length || 0,
      internationalCount: internationalEvents?.length || 0,
    });
  } catch (error) {
    console.error('Newsletter generation error:', error);
    return NextResponse.json({ 
      content: '# Newsletter\n\nError generating content. Please try again.',
      error: 'Failed to generate newsletter'
    }, { status: 500 });
  }
}
