import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/server';

// GET: Debug endpoint to check attraction sources and data
export async function GET(request: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const supabase = getAdminClient();

    // Get all unique source values
    const { data: attractions, error } = await (supabase as any)
      .from('attractions')
      .select('id, name, slug, source, price_from, price_range, is_active')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Analyze source values
    const sourceStats: Record<string, number> = {};
    const sourceSamples: Record<string, { name: string; slug: string; price_from: number | null }[]> = {};

    for (const attraction of attractions || []) {
      const source = attraction.source || 'null';
      sourceStats[source] = (sourceStats[source] || 0) + 1;

      if (!sourceSamples[source]) {
        sourceSamples[source] = [];
      }
      if (sourceSamples[source].length < 3) {
        sourceSamples[source].push({
          name: attraction.name,
          slug: attraction.slug,
          price_from: attraction.price_from,
        });
      }
    }

    // Get platinumlist-prefixed items
    const platinumlistPrefixed = (attractions || []).filter(
      (a: any) => a.slug?.startsWith('platinumlist-')
    );

    return NextResponse.json({
      total: attractions?.length || 0,
      sourceStats,
      sourceSamples,
      platinumlistPrefixedCount: platinumlistPrefixed.length,
      platinumlistPrefixedSample: platinumlistPrefixed.slice(0, 5).map((a: any) => ({
        name: a.name,
        slug: a.slug,
        source: a.source,
        price_from: a.price_from,
      })),
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch debug data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
