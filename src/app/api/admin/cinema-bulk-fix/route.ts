import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

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

/**
 * POST /api/admin/cinema-bulk-fix
 * 
 * Bulk fix for cinema data - resets all movies and sets specific ones to showing
 * 
 * Body:
 * {
 *   "action": "reset_all" | "set_now_showing" | "set_coming_soon",
 *   "titles": ["movie1", "movie2"] // array of titles (case insensitive)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin auth
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { action, titles } = body;

    if (action === 'reset_all') {
      // Reset all movies to not showing
      const { error } = await supabase
        .from('movies')
        .update({ 
          is_now_showing: false, 
          is_coming_soon: false,
          updated_at: new Date().toISOString()
        })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all rows

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: 'All movies marked as not showing' 
      });
    }

    if (action === 'set_now_showing') {
      if (!titles || !Array.isArray(titles)) {
        return NextResponse.json({ error: 'titles array required' }, { status: 400 });
      }

      // Build case-insensitive match
      const titleLower = titles.map((t: string) => t.toLowerCase());
      
      const { data, error } = await supabase
        .from('movies')
        .select('id, title')
        .in('title_lowercase', titleLower);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const foundIds = data?.map(m => m.id) || [];
      
      if (foundIds.length === 0) {
        // Try case-insensitive match using ilike
        for (const title of titles) {
          const { data: searchData } = await supabase
            .from('movies')
            .select('id')
            .ilike('title', title);
          
          if (searchData && searchData.length > 0) {
            foundIds.push(...searchData.map(m => m.id));
          }
        }
      }

      if (foundIds.length > 0) {
        const { error: updateError } = await supabase
          .from('movies')
          .update({ 
            is_now_showing: true, 
            is_coming_soon: false,
            updated_at: new Date().toISOString()
          })
          .in('id', foundIds);

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 500 });
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: `Marked ${foundIds.length} movies as now showing`,
        found: foundIds.length,
        titles
      });
    }

    if (action === 'set_coming_soon') {
      if (!titles || !Array.isArray(titles)) {
        return NextResponse.json({ error: 'titles array required' }, { status: 400 });
      }

      const foundIds: string[] = [];
      
      for (const title of titles) {
        const { data: searchData } = await supabase
          .from('movies')
          .select('id')
          .ilike('title', title);
        
        if (searchData && searchData.length > 0) {
          foundIds.push(...searchData.map(m => m.id));
        }
      }

      if (foundIds.length > 0) {
        const { error: updateError } = await supabase
          .from('movies')
          .update({ 
            is_coming_soon: true, 
            is_now_showing: false,
            updated_at: new Date().toISOString()
          })
          .in('id', foundIds);

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 500 });
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: `Marked ${foundIds.length} movies as coming soon`,
        found: foundIds.length
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Bulk fix error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}