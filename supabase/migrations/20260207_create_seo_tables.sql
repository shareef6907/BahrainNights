-- Migration: Create SEO Agent Tables
-- Date: 2026-02-07
-- Description: Creates tables for SEO agent: seo_keywords, seo_page_meta, seo_agent_logs

-- ============================================
-- 1. SEO Keywords Table
-- Tracks target keywords and their status
-- ============================================
CREATE TABLE IF NOT EXISTS seo_keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword VARCHAR(255) NOT NULL UNIQUE,
  search_volume INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 0, -- 0-100 scale
  priority INTEGER DEFAULT 50, -- Higher = more important
  category VARCHAR(100), -- e.g., 'nightlife', 'restaurants', 'events'
  current_ranking INTEGER, -- Current Google ranking (if tracked)
  target_ranking INTEGER DEFAULT 10, -- Target position
  page_path VARCHAR(500), -- Which page targets this keyword
  status VARCHAR(50) DEFAULT 'active', -- active, archived, achieved
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_seo_keywords_priority ON seo_keywords(priority DESC);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_category ON seo_keywords(category);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_status ON seo_keywords(status);

-- ============================================
-- 2. SEO Page Meta Table
-- Stores optimized meta data for all pages
-- ============================================
CREATE TABLE IF NOT EXISTS seo_page_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(500) NOT NULL UNIQUE,
  page_type VARCHAR(50) NOT NULL, -- event, venue, guide, attraction, movie, etc.
  title VARCHAR(70), -- Optimal SEO title length
  description VARCHAR(160), -- Meta description
  keywords TEXT[], -- Target keywords for this page
  og_title VARCHAR(100),
  og_description VARCHAR(200),
  og_image VARCHAR(500),
  canonical_url VARCHAR(500),
  noindex BOOLEAN DEFAULT false,
  nofollow BOOLEAN DEFAULT false,
  optimization_score INTEGER DEFAULT 0, -- 0-100 SEO score
  last_optimized TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_seo_page_meta_page_path ON seo_page_meta(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_page_meta_page_type ON seo_page_meta(page_type);
CREATE INDEX IF NOT EXISTS idx_seo_page_meta_score ON seo_page_meta(optimization_score);

-- ============================================
-- 3. SEO Agent Logs Table
-- Tracks SEO agent runs and results
-- ============================================
CREATE TABLE IF NOT EXISTS seo_agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status VARCHAR(50) NOT NULL, -- running, completed, completed_with_errors, failed
  pages_optimized INTEGER DEFAULT 0,
  keywords_checked INTEGER DEFAULT 0,
  sitemap_updated BOOLEAN DEFAULT false,
  duration_seconds INTEGER,
  details JSONB,
  errors TEXT[],
  triggered_by VARCHAR(50) DEFAULT 'cron', -- cron, manual, api
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_seo_agent_logs_status ON seo_agent_logs(status);
CREATE INDEX IF NOT EXISTS idx_seo_agent_logs_created ON seo_agent_logs(created_at DESC);

-- ============================================
-- 4. Add SEO columns to events table if not exists
-- ============================================
ALTER TABLE events 
  ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT[],
  ADD COLUMN IF NOT EXISTS seo_optimized BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS seo_optimized_at TIMESTAMP WITH TIME ZONE;

-- ============================================
-- 5. Add SEO columns to venues table if not exists
-- ============================================
ALTER TABLE venues 
  ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT[],
  ADD COLUMN IF NOT EXISTS seo_optimized BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS seo_optimized_at TIMESTAMP WITH TIME ZONE;

-- ============================================
-- 6. Add SEO columns to attractions table if not exists
-- ============================================
ALTER TABLE attractions 
  ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT[],
  ADD COLUMN IF NOT EXISTS seo_optimized BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS seo_optimized_at TIMESTAMP WITH TIME ZONE;

-- ============================================
-- 7. Insert some initial target keywords
-- ============================================
INSERT INTO seo_keywords (keyword, search_volume, priority, category, page_path) VALUES
  ('things to do in bahrain', 12000, 100, 'attractions', '/things-to-do-in-bahrain'),
  ('bahrain nightlife', 8000, 95, 'nightlife', '/bahrain-nightlife-guide'),
  ('best restaurants bahrain', 6500, 90, 'restaurants', '/best-restaurants-bahrain'),
  ('events in bahrain', 5000, 95, 'events', '/events'),
  ('bahrain parties', 4000, 85, 'nightlife', '/guides/parties'),
  ('weekend in bahrain', 3500, 90, 'general', '/weekend-in-bahrain'),
  ('bahrain brunch', 3000, 80, 'restaurants', '/guides/brunch'),
  ('juffair nightlife', 2500, 75, 'nightlife', '/guides/nightlife-juffair'),
  ('bahrain beach clubs', 2000, 75, 'attractions', '/guides/beach-clubs'),
  ('bahrain f1 2026', 2000, 70, 'events', '/guides/f1-2026'),
  ('ladies night bahrain', 1800, 70, 'nightlife', '/guides/ladies-nights'),
  ('bahrain cinema', 1500, 65, 'entertainment', '/cinema'),
  ('bahrain concerts', 1200, 70, 'events', '/guides/concerts'),
  ('bahrain malls', 1000, 60, 'shopping', '/guides/malls'),
  ('bahrain hotels', 1000, 60, 'hotels', '/guides/hotels')
ON CONFLICT (keyword) DO NOTHING;

-- ============================================
-- 8. Create updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_seo_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_seo_keywords_updated_at ON seo_keywords;
CREATE TRIGGER update_seo_keywords_updated_at
    BEFORE UPDATE ON seo_keywords
    FOR EACH ROW
    EXECUTE FUNCTION update_seo_updated_at();

DROP TRIGGER IF EXISTS update_seo_page_meta_updated_at ON seo_page_meta;
CREATE TRIGGER update_seo_page_meta_updated_at
    BEFORE UPDATE ON seo_page_meta
    FOR EACH ROW
    EXECUTE FUNCTION update_seo_updated_at();
