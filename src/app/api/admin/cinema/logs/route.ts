import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    // Try to fetch logs
    try {
      const { data, error } = await supabaseAdmin
        .from('cinema_scraper_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        // Table might not exist yet
        if (error.message.includes('does not exist')) {
          return NextResponse.json({
            logs: [],
            message: 'Logs table not yet created. Run migrations first.',
          });
        }
        throw error;
      }

      return NextResponse.json({ logs: data || [] });
    } catch (dbError) {
      console.error('Error fetching logs:', dbError);
      return NextResponse.json({
        logs: [],
        error: dbError instanceof Error ? dbError.message : 'Database error',
      });
    }

  } catch (error) {
    console.error('Cinema logs API error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
