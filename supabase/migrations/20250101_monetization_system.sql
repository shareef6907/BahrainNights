-- BahrainNights Monetization System Migration
-- Phase 1: Public Users, Venue Likes, and Like Count

-- =============================================
-- 1. PUBLIC_USERS TABLE
-- For visitors who sign up with Google OAuth
-- =============================================
CREATE TABLE IF NOT EXISTS public_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for public_users
CREATE INDEX IF NOT EXISTS idx_public_users_google_id ON public_users(google_id);
CREATE INDEX IF NOT EXISTS idx_public_users_email ON public_users(email);

-- =============================================
-- 2. VENUE_LIKES TABLE
-- Tracks which users have liked which venues
-- =============================================
CREATE TABLE IF NOT EXISTS venue_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, venue_id)
);

-- Indexes for venue_likes
CREATE INDEX IF NOT EXISTS idx_venue_likes_user_id ON venue_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_venue_likes_venue_id ON venue_likes(venue_id);
CREATE INDEX IF NOT EXISTS idx_venue_likes_created_at ON venue_likes(created_at);

-- =============================================
-- 3. ADD LIKE_COUNT TO VENUES TABLE
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'venues' AND column_name = 'like_count'
  ) THEN
    ALTER TABLE venues ADD COLUMN like_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- Index for like_count (for ranking)
CREATE INDEX IF NOT EXISTS idx_venues_like_count ON venues(like_count DESC);

-- =============================================
-- 4. FUNCTION TO INCREMENT LIKE COUNT
-- =============================================
CREATE OR REPLACE FUNCTION increment_venue_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE venues SET like_count = like_count + 1 WHERE id = NEW.venue_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE venues SET like_count = GREATEST(0, like_count - 1) WHERE id = OLD.venue_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS trigger_venue_like_count ON venue_likes;

-- Create trigger
CREATE TRIGGER trigger_venue_like_count
AFTER INSERT OR DELETE ON venue_likes
FOR EACH ROW
EXECUTE FUNCTION increment_venue_like_count();

-- =============================================
-- 5. LIKE_RATE_LIMITS TABLE
-- Prevents spam by tracking like actions
-- =============================================
CREATE TABLE IF NOT EXISTS like_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  action_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for rate limits
CREATE INDEX IF NOT EXISTS idx_like_rate_limits_user_id ON like_rate_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_like_rate_limits_window_start ON like_rate_limits(window_start);

-- =============================================
-- 6. UPDATE EXISTING VENUES WITH CORRECT LIKE COUNTS
-- =============================================
UPDATE venues v
SET like_count = (
  SELECT COUNT(*) FROM venue_likes vl WHERE vl.venue_id = v.id
);

-- =============================================
-- 7. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on new tables
ALTER TABLE public_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE like_rate_limits ENABLE ROW LEVEL SECURITY;

-- Public users: anyone can read, only owner can update
CREATE POLICY "public_users_read" ON public_users
  FOR SELECT USING (true);

CREATE POLICY "public_users_insert" ON public_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_users_update" ON public_users
  FOR UPDATE USING (true);

-- Venue likes: anyone can read, authenticated users can insert/delete their own
CREATE POLICY "venue_likes_read" ON venue_likes
  FOR SELECT USING (true);

CREATE POLICY "venue_likes_insert" ON venue_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "venue_likes_delete" ON venue_likes
  FOR DELETE USING (true);

-- Rate limits: service role only
CREATE POLICY "like_rate_limits_all" ON like_rate_limits
  FOR ALL USING (true);

-- =============================================
-- 8. HELPER FUNCTION: Get venues ranked by likes
-- =============================================
CREATE OR REPLACE FUNCTION get_venues_by_popularity(
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0,
  p_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  category TEXT,
  area TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  like_count INTEGER,
  view_count INTEGER,
  is_verified BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    v.id,
    v.name,
    v.slug,
    v.category,
    v.area,
    v.logo_url,
    v.cover_image_url,
    v.like_count,
    v.view_count,
    v.is_verified
  FROM venues v
  WHERE v.status = 'approved'
    AND (p_category IS NULL OR v.category = p_category)
  ORDER BY v.like_count DESC, v.view_count DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;
