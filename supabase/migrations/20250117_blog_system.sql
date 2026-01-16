-- =====================================================
-- BLOG SYSTEM SCHEMA FOR BAHRAINNIGHTS.COM
-- Run in Supabase SQL Editor
-- =====================================================

-- Blog Articles Table
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],

  -- Categorization
  country TEXT NOT NULL DEFAULT 'bahrain',
  city TEXT,
  category TEXT,
  tags TEXT[],

  -- Related content
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,

  -- Media
  featured_image TEXT,
  images TEXT[],

  -- Type: 'event', 'cornerstone', 'guide', 'performer', 'venue'
  article_type TEXT DEFAULT 'event',

  -- Status
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT FALSE,

  -- Stats
  view_count INTEGER DEFAULT 0,
  read_time_minutes INTEGER DEFAULT 5,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Track which events have been blogged (prevent duplicates)
CREATE TABLE IF NOT EXISTS blog_event_tracker (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  article_id UUID REFERENCES blog_articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id)
);

-- Track which venues have been blogged
CREATE TABLE IF NOT EXISTS blog_venue_tracker (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  article_id UUID REFERENCES blog_articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(venue_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_articles_country ON blog_articles(country);
CREATE INDEX IF NOT EXISTS idx_blog_articles_city ON blog_articles(city);
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_type ON blog_articles(article_type);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_articles_event ON blog_articles(event_id);
CREATE INDEX IF NOT EXISTS idx_blog_articles_venue ON blog_articles(venue_id);
CREATE INDEX IF NOT EXISTS idx_blog_articles_featured ON blog_articles(is_featured) WHERE is_featured = true;

-- Full text search on blog content
CREATE INDEX IF NOT EXISTS idx_blog_articles_search ON blog_articles
USING gin(to_tsvector('english', title || ' ' || COALESCE(content, '')));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_blog_articles_updated_at ON blog_articles;
CREATE TRIGGER trigger_blog_articles_updated_at
  BEFORE UPDATE ON blog_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_articles_updated_at();

-- Enable RLS
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_event_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_venue_tracker ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Public can view published blog articles"
  ON blog_articles FOR SELECT
  USING (status = 'published');

-- Admin full access (using service role key bypasses RLS anyway)
CREATE POLICY "Service role has full access to blog_articles"
  ON blog_articles FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to blog_event_tracker"
  ON blog_event_tracker FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to blog_venue_tracker"
  ON blog_venue_tracker FOR ALL
  USING (true)
  WITH CHECK (true);
