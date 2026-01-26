import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all subscribers
    const { data: subscribers, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscribers:', error);
      return NextResponse.json({ subscribers: [], stats: { total: 0, active: 0, unsubscribed: 0, thisMonth: 0 } });
    }

    // Calculate stats
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    
    const stats = {
      total: subscribers?.length || 0,
      active: subscribers?.filter(s => s.status === 'subscribed').length || 0,
      unsubscribed: subscribers?.filter(s => s.status === 'unsubscribed').length || 0,
      thisMonth: subscribers?.filter(s => s.subscribed_at >= firstOfMonth).length || 0,
    };

    return NextResponse.json({ subscribers: subscribers || [], stats });
  } catch (error) {
    console.error('Newsletter subscribers error:', error);
    return NextResponse.json({ subscribers: [], stats: { total: 0, active: 0, unsubscribed: 0, thisMonth: 0 } });
  }
}
