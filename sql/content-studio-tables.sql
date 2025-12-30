-- Content Studio Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Instagram Accounts
CREATE TABLE IF NOT EXISTS instagram_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  instagram_user_id VARCHAR(50),
  username VARCHAR(100) NOT NULL,
  access_token TEXT NOT NULL,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  account_type VARCHAR(20) DEFAULT 'business',
  profile_picture_url TEXT,
  followers_count INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 2: Content Posts
CREATE TABLE IF NOT EXISTS content_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content type
  content_type VARCHAR(20) NOT NULL, -- 'blog', 'feed', 'story', 'reel_brief'

  -- For Instagram posts
  instagram_account_id UUID REFERENCES instagram_accounts(id) ON DELETE SET NULL,

  -- Content
  title VARCHAR(500),
  caption TEXT,
  body TEXT, -- For blog posts (full article)
  hashtags TEXT[],

  -- Media
  media_urls TEXT[], -- Array of image/video URLs
  media_type VARCHAR(20), -- 'image', 'carousel', 'video'

  -- For reel briefs
  reel_concept TEXT,
  reel_hook TEXT,
  reel_text_overlays JSONB, -- [{slide: 1, text: "..."}, ...]
  reel_music_suggestions JSONB, -- [{song: "...", artist: "...", reason: "..."}]
  reel_duration VARCHAR(20),
  reel_style VARCHAR(100),

  -- Story specific
  story_type VARCHAR(30), -- 'promo', 'countdown', 'poll', 'question', 'tip', 'this_or_that'
  story_sticker_data JSONB, -- {type: 'poll', question: '...', options: [...]}

  -- Source reference
  source_type VARCHAR(20), -- 'event', 'movie', 'venue', 'custom', 'ai'
  source_id UUID,

  -- Scheduling
  scheduled_for TIMESTAMP WITH TIME ZONE,
  posted_at TIMESTAMP WITH TIME ZONE,

  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending_review', 'approved', 'scheduled', 'posted', 'rejected'

  -- SEO (for blog posts)
  seo_title VARCHAR(200),
  seo_description VARCHAR(500),
  seo_keywords TEXT[],
  slug VARCHAR(300),

  -- Metadata
  instagram_post_id VARCHAR(100),
  engagement JSONB DEFAULT '{"likes": 0, "comments": 0, "saves": 0, "shares": 0, "views": 0}'::jsonb,

  -- Review
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID,
  rejection_reason TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 3: Content Settings
CREATE TABLE IF NOT EXISTS content_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,

  -- AI Settings
  default_tone VARCHAR(50) DEFAULT 'friendly',
  default_language VARCHAR(10) DEFAULT 'en',
  include_emojis BOOLEAN DEFAULT true,
  hashtag_count INTEGER DEFAULT 12,
  caption_length VARCHAR(20) DEFAULT 'medium',

  -- Auto-generation
  auto_generate_enabled BOOLEAN DEFAULT true,
  auto_generate_time TIME DEFAULT '06:00',
  auto_generate_blog_count INTEGER DEFAULT 3,
  auto_generate_feed_count INTEGER DEFAULT 3,
  auto_generate_story_count INTEGER DEFAULT 10,
  auto_generate_reel_count INTEGER DEFAULT 1,

  -- Compliance
  block_political BOOLEAN DEFAULT true,
  block_religious BOOLEAN DEFAULT true,
  block_inappropriate BOOLEAN DEFAULT true,
  block_alcohol BOOLEAN DEFAULT true,

  -- Notifications
  notify_browser BOOLEAN DEFAULT true,
  notify_email BOOLEAN DEFAULT true,
  notification_email VARCHAR(255),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_posts_status ON content_posts(status);
CREATE INDEX IF NOT EXISTS idx_content_posts_content_type ON content_posts(content_type);
CREATE INDEX IF NOT EXISTS idx_content_posts_scheduled_for ON content_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_content_posts_created_at ON content_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_accounts_is_primary ON instagram_accounts(is_primary);

-- Insert default settings if none exist
INSERT INTO content_settings (id, default_tone, default_language, include_emojis, hashtag_count)
SELECT uuid_generate_v4(), 'friendly', 'en', true, 12
WHERE NOT EXISTS (SELECT 1 FROM content_settings LIMIT 1);

-- Add RLS policies (optional but recommended)
ALTER TABLE instagram_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all content
CREATE POLICY IF NOT EXISTS "Allow authenticated read instagram_accounts" ON instagram_accounts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated read content_posts" ON content_posts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated read content_settings" ON content_settings
  FOR SELECT TO authenticated USING (true);

-- Policy: Allow service role full access (for API routes)
CREATE POLICY IF NOT EXISTS "Allow service role all instagram_accounts" ON instagram_accounts
  FOR ALL TO service_role USING (true);

CREATE POLICY IF NOT EXISTS "Allow service role all content_posts" ON content_posts
  FOR ALL TO service_role USING (true);

CREATE POLICY IF NOT EXISTS "Allow service role all content_settings" ON content_settings
  FOR ALL TO service_role USING (true);
