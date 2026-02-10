import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// GET /api/cinema/cinemas - Get all cinemas
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data: cinemas, error } = await supabase
      .from('cinemas')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching cinemas:', error);
      return NextResponse.json(
        { error: 'Failed to fetch cinemas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ cinemas: cinemas || [] }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Cinemas API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
