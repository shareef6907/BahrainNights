import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// GET - List all platinumlist experiences
export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const searchParams = request.nextUrl.searchParams;
    const source = searchParams.get('source') || 'platinumlist';
    const includeHidden = searchParams.get('includeHidden') === 'true';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from('experiences')
      .select('*')
      .eq('source', source)
      .order('created_at', { ascending: false });

    if (!includeHidden) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching experiences:', error);
      return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
    }

    return NextResponse.json({ experiences: data || [] });
  } catch (error) {
    console.error('Error in GET /api/admin/experiences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
