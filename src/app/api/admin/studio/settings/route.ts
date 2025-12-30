import { NextRequest, NextResponse } from 'next/server';
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

// GET - Get current settings
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('content_settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw error;
    }

    // Return default settings if none exist
    const settings = data || {
      default_tone: 'friendly',
      default_language: 'en',
      include_emojis: true,
      hashtag_count: 12,
      caption_length: 'medium',
      auto_generate_enabled: false,
      auto_generate_time: '06:00',
      auto_generate_blog_count: 3,
      auto_generate_feed_count: 3,
      auto_generate_story_count: 10,
      auto_generate_reel_count: 1,
      block_political: true,
      block_religious: true,
      block_inappropriate: true,
      block_alcohol: true,
      notify_browser: true,
      notify_email: true,
      notification_email: null,
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const updates = await request.json();

    // Check if settings exist
    const { data: existing } = await supabase
      .from('content_settings')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from('content_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Insert new
      result = await supabase
        .from('content_settings')
        .insert({
          ...updates,
        })
        .select()
        .single();
    }

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({
      success: true,
      settings: result.data,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
