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

export async function POST() {
  try {
    const supabase = getSupabaseAdmin();

    // Create instagram_accounts table
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS instagram_accounts (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID,
          instagram_user_id VARCHAR(50),
          username VARCHAR(100) NOT NULL,
          access_token TEXT NOT NULL,
          token_expires_at TIMESTAMP,
          account_type VARCHAR(20) DEFAULT 'business',
          profile_picture_url TEXT,
          followers_count INTEGER DEFAULT 0,
          is_primary BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    // Create content_posts table
    const { error: error2 } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS content_posts (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          content_type VARCHAR(20) NOT NULL,
          instagram_account_id UUID REFERENCES instagram_accounts(id),
          title VARCHAR(500),
          caption TEXT,
          body TEXT,
          hashtags TEXT[],
          media_urls TEXT[],
          media_type VARCHAR(20),
          reel_concept TEXT,
          reel_hook TEXT,
          reel_text_overlays JSONB,
          reel_music_suggestions JSONB,
          reel_duration VARCHAR(20),
          reel_style VARCHAR(100),
          story_type VARCHAR(30),
          story_sticker_data JSONB,
          source_type VARCHAR(20),
          source_id UUID,
          scheduled_for TIMESTAMP,
          posted_at TIMESTAMP,
          status VARCHAR(20) DEFAULT 'draft',
          seo_title VARCHAR(200),
          seo_description VARCHAR(500),
          seo_keywords TEXT[],
          slug VARCHAR(300),
          instagram_post_id VARCHAR(100),
          engagement JSONB,
          reviewed_at TIMESTAMP,
          rejection_reason TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    // Create content_settings table
    const { error: error3 } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS content_settings (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID,
          default_tone VARCHAR(50) DEFAULT 'friendly',
          default_language VARCHAR(10) DEFAULT 'en',
          include_emojis BOOLEAN DEFAULT true,
          hashtag_count INTEGER DEFAULT 12,
          caption_length VARCHAR(20) DEFAULT 'medium',
          auto_generate_enabled BOOLEAN DEFAULT true,
          auto_generate_time TIME DEFAULT '06:00',
          auto_generate_blog_count INTEGER DEFAULT 3,
          auto_generate_feed_count INTEGER DEFAULT 3,
          auto_generate_story_count INTEGER DEFAULT 10,
          auto_generate_reel_count INTEGER DEFAULT 1,
          block_political BOOLEAN DEFAULT true,
          block_religious BOOLEAN DEFAULT true,
          block_inappropriate BOOLEAN DEFAULT true,
          block_alcohol BOOLEAN DEFAULT true,
          notify_browser BOOLEAN DEFAULT true,
          notify_email BOOLEAN DEFAULT true,
          notification_email VARCHAR(255),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    // If RPC doesn't exist, try direct SQL via REST
    // Let's try creating tables directly using Supabase's from() if RPC fails

    return NextResponse.json({
      success: true,
      message: 'Content Studio tables setup initiated. Please check Supabase dashboard.',
      errors: { error1, error2, error3 }
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup Content Studio tables', details: error },
      { status: 500 }
    );
  }
}

// GET: Check if tables exist
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Check if tables exist by querying them
    const [accounts, posts, settings] = await Promise.all([
      supabase.from('instagram_accounts').select('id').limit(1),
      supabase.from('content_posts').select('id').limit(1),
      supabase.from('content_settings').select('id').limit(1),
    ]);

    return NextResponse.json({
      tables: {
        instagram_accounts: !accounts.error,
        content_posts: !posts.error,
        content_settings: !settings.error,
      },
      errors: {
        instagram_accounts: accounts.error?.message,
        content_posts: posts.error?.message,
        content_settings: settings.error?.message,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Check failed', details: error }, { status: 500 });
  }
}
