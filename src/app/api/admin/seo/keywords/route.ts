import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth/verifyAdmin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/seo/keywords
 * Get all target keywords
 */
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getAdminClient();

    const { data: keywords, error } = await supabase
      .from('seo_keywords')
      .select('*')
      .order('priority', { ascending: false });

    if (error) {
      console.error('[Admin SEO Keywords] Error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch keywords', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: keywords
    });
  } catch (error) {
    console.error('[Admin SEO Keywords] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/seo/keywords
 * Add a new target keyword
 */
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { keyword, search_volume, difficulty, priority, target_pages } = body;

    if (!keyword) {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { data, error } = await (supabase
      .from('seo_keywords') as any)
      .upsert({
        keyword: keyword.toLowerCase().trim(),
        search_volume: search_volume || 0,
        difficulty: difficulty || 'medium',
        priority: priority || 5,
        target_pages: target_pages || []
      }, { onConflict: 'keyword' })
      .select()
      .single();

    if (error) {
      console.error('[Admin SEO Keywords] Error:', error);
      return NextResponse.json(
        { error: 'Failed to add keyword', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('[Admin SEO Keywords] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/seo/keywords
 * Delete a keyword
 */
export async function DELETE(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Keyword ID is required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { error } = await supabase
      .from('seo_keywords')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Admin SEO Keywords] Error:', error);
      return NextResponse.json(
        { error: 'Failed to delete keyword', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Admin SEO Keywords] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
