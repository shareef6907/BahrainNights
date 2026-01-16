import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/api-auth';

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

// GET - List content with filters
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await requireAdmin(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('content_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('content_type', type);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      content: data || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content', content: [], total: 0 },
      { status: 500 }
    );
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await requireAdmin(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const supabase = getSupabaseAdmin();
    const body = await request.json();

    const {
      content_type,
      title,
      caption,
      body: postBody,
      hashtags,
      media_urls,
      media_type,
      source_type,
      source_id,
      scheduled_for,
      // Reel-specific fields
      reel_concept,
      reel_hook,
      reel_text_overlays,
      reel_music_suggestions,
      reel_duration,
      reel_style,
      // Story-specific fields
      story_type,
      story_sticker_data,
      // SEO fields
      seo_title,
      seo_description,
      seo_keywords,
      slug,
    } = body;

    // Validate required fields
    if (!content_type || !title) {
      return NextResponse.json(
        { error: 'content_type and title are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('content_posts')
      .insert({
        content_type,
        title,
        caption,
        body: postBody,
        hashtags,
        media_urls,
        media_type,
        source_type: source_type || 'ai',
        source_id,
        scheduled_for,
        status: 'pending_review',
        reel_concept,
        reel_hook,
        reel_text_overlays,
        reel_music_suggestions,
        reel_duration,
        reel_style,
        story_type,
        story_sticker_data,
        seo_title,
        seo_description,
        seo_keywords,
        slug,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await requireAdmin(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // Add updated_at timestamp
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('content_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await requireAdmin(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('content_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}
