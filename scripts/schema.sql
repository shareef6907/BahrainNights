-- BahrainNights.com Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'venue_owner' CHECK (role IN ('venue_owner', 'admin')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- VENUES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Basic info
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,

  -- Category
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[],
  cuisine_types TEXT[],

  -- Location
  area VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  google_maps_url TEXT,

  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  website TEXT,
  whatsapp VARCHAR(50),

  -- Social
  instagram VARCHAR(100),
  facebook VARCHAR(255),
  tiktok VARCHAR(100),
  twitter VARCHAR(100),

  -- Media
  logo_url TEXT,
  cover_image_url TEXT,
  gallery TEXT[],

  -- Business details
  opening_hours JSONB,
  price_range INTEGER CHECK (price_range BETWEEN 1 AND 3),
  avg_cost_per_person VARCHAR(50),
  features TEXT[],

  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Stats
  view_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- EVENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  created_by UUID REFERENCES users(id),

  -- Basic info
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT,

  -- Category
  category VARCHAR(100) NOT NULL,
  tags TEXT[],

  -- Date & Time
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern VARCHAR(100),
  recurrence_days TEXT[],

  -- Pricing
  price TEXT,

  -- Booking
  booking_url TEXT,
  booking_method VARCHAR(100),

  -- Media
  featured_image TEXT,
  gallery TEXT[],

  -- Additional
  age_restriction VARCHAR(50),
  dress_code TEXT,
  special_instructions TEXT,

  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'rejected', 'cancelled')),
  rejection_reason TEXT,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Stats
  view_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- OFFERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  created_by UUID REFERENCES users(id),

  -- Basic info
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  offer_type VARCHAR(100) NOT NULL CHECK (offer_type IN ('ladies-night', 'brunch', 'happy-hour', 'special-deal')),

  -- Schedule
  days_available TEXT[] NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  valid_from DATE,
  valid_until DATE,
  is_ongoing BOOLEAN DEFAULT FALSE,

  -- Details
  whats_included TEXT[],
  terms_conditions TEXT,
  reservation_required BOOLEAN DEFAULT FALSE,

  -- Media
  featured_image TEXT,

  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'expired', 'paused')),

  -- Stats
  view_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- MOVIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic info
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  overview TEXT,

  -- Details
  duration_minutes INTEGER,
  rating VARCHAR(20),
  genre TEXT[],
  language VARCHAR(100),
  release_date DATE,

  -- External IDs
  tmdb_id INTEGER,
  imdb_id VARCHAR(20),

  -- Ratings
  imdb_rating DECIMAL(3, 1),
  tmdb_rating DECIMAL(3, 1),

  -- Media
  poster_url TEXT,
  backdrop_url TEXT,
  trailer_url TEXT,

  -- Status
  status VARCHAR(50) DEFAULT 'now_showing' CHECK (status IN ('now_showing', 'coming_soon', 'ended')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SHOWTIMES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS showtimes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,

  cinema_name VARCHAR(200) NOT NULL,
  cinema_location VARCHAR(500),
  showtime TIME NOT NULL,
  show_date DATE NOT NULL,
  screen_type VARCHAR(100),
  booking_url TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- HOMEPAGE ADS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS homepage_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Advertiser
  advertiser_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),

  -- Creative
  title VARCHAR(255),
  subtitle VARCHAR(255),
  cta_text VARCHAR(100),
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,

  -- Placement
  slot_position INTEGER CHECK (slot_position BETWEEN 1 AND 5),

  -- Schedule
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  -- Pricing
  price_bd DECIMAL(10, 2) NOT NULL,
  invoice_number VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue')),
  payment_date DATE,

  -- Stats
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'expired')),

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SPONSORS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,

  -- Sponsor info
  name VARCHAR(255) NOT NULL,
  tier VARCHAR(50) NOT NULL CHECK (tier IN ('golden', 'silver')),
  logo_url TEXT NOT NULL,
  website_url TEXT,

  -- Schedule
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  -- Pricing
  price_bd DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',

  -- Status
  status VARCHAR(50) DEFAULT 'active',
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SUBSCRIBERS TABLE (newsletter)
-- =====================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  preferences JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- PAGE VIEWS TABLE (analytics)
-- =====================================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  page_type VARCHAR(50),
  reference_id UUID,
  user_agent TEXT,
  ip_hash VARCHAR(64),
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AD CLICKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS ad_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID REFERENCES homepage_ads(id) ON DELETE CASCADE,
  ip_hash VARCHAR(64),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PASSWORD RESET TOKENS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ACTIVITY LOG TABLE (for admin)
-- =====================================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_venues_status ON venues(status);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category);
CREATE INDEX IF NOT EXISTS idx_venues_area ON venues(area);
CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);
CREATE INDEX IF NOT EXISTS idx_venues_owner ON venues(owner_id);

CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_venue ON events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);

CREATE INDEX IF NOT EXISTS idx_offers_venue ON offers(venue_id);
CREATE INDEX IF NOT EXISTS idx_offers_type ON offers(offer_type);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);

CREATE INDEX IF NOT EXISTS idx_movies_status ON movies(status);
CREATE INDEX IF NOT EXISTS idx_movies_slug ON movies(slug);

CREATE INDEX IF NOT EXISTS idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX IF NOT EXISTS idx_showtimes_date ON showtimes(show_date);

CREATE INDEX IF NOT EXISTS idx_homepage_ads_status ON homepage_ads(status);
CREATE INDEX IF NOT EXISTS idx_homepage_ads_dates ON homepage_ads(start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_sponsors_status ON sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON sponsors(tier);

CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);

CREATE INDEX IF NOT EXISTS idx_activity_log_user ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_date ON activity_log(created_at);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_venues_updated_at ON venues;
CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_offers_updated_at ON offers;
CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_movies_updated_at ON movies;
CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON movies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_homepage_ads_updated_at ON homepage_ads;
CREATE TRIGGER update_homepage_ads_updated_at
  BEFORE UPDATE ON homepage_ads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Users: Only admins can see all users
CREATE POLICY "Service role can manage users"
ON users FOR ALL
USING (true)
WITH CHECK (true);

-- Venues: Public can read approved venues
CREATE POLICY "Public can view approved venues"
ON venues FOR SELECT
USING (status = 'approved');

-- Venues: Service role has full access
CREATE POLICY "Service role can manage venues"
ON venues FOR ALL
USING (true)
WITH CHECK (true);

-- Events: Public can view published events
CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (status = 'published');

-- Events: Service role has full access
CREATE POLICY "Service role can manage events"
ON events FOR ALL
USING (true)
WITH CHECK (true);

-- Offers: Public can view active offers
CREATE POLICY "Public can view active offers"
ON offers FOR SELECT
USING (status = 'active');

-- Offers: Service role has full access
CREATE POLICY "Service role can manage offers"
ON offers FOR ALL
USING (true)
WITH CHECK (true);

-- Movies: Public can view all movies
CREATE POLICY "Public can view movies"
ON movies FOR SELECT
USING (true);

-- Movies: Service role has full access
CREATE POLICY "Service role can manage movies"
ON movies FOR ALL
USING (true)
WITH CHECK (true);

-- Showtimes: Public can view all showtimes
CREATE POLICY "Public can view showtimes"
ON showtimes FOR SELECT
USING (true);

-- Showtimes: Service role has full access
CREATE POLICY "Service role can manage showtimes"
ON showtimes FOR ALL
USING (true)
WITH CHECK (true);

-- Homepage Ads: Public can view active ads
CREATE POLICY "Public can view active ads"
ON homepage_ads FOR SELECT
USING (status = 'active' AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE);

-- Homepage Ads: Service role has full access
CREATE POLICY "Service role can manage ads"
ON homepage_ads FOR ALL
USING (true)
WITH CHECK (true);

-- Sponsors: Public can view active sponsors
CREATE POLICY "Public can view active sponsors"
ON sponsors FOR SELECT
USING (status = 'active' AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE);

-- Sponsors: Service role has full access
CREATE POLICY "Service role can manage sponsors"
ON sponsors FOR ALL
USING (true)
WITH CHECK (true);

-- Subscribers: Service role only
CREATE POLICY "Service role can manage subscribers"
ON subscribers FOR ALL
USING (true)
WITH CHECK (true);

-- Page Views: Anyone can insert, service role can read
CREATE POLICY "Anyone can create page views"
ON page_views FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can view page views"
ON page_views FOR SELECT
USING (true);

-- Ad Clicks: Anyone can insert, service role can read
CREATE POLICY "Anyone can create ad clicks"
ON ad_clicks FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can view ad clicks"
ON ad_clicks FOR SELECT
USING (true);

-- Password Reset Tokens: Service role only
CREATE POLICY "Service role can manage password reset tokens"
ON password_reset_tokens FOR ALL
USING (true)
WITH CHECK (true);

-- Activity Log: Service role only
CREATE POLICY "Service role can manage activity log"
ON activity_log FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- GRANT PERMISSIONS TO ANON AND AUTHENTICATED ROLES
-- =====================================================

-- Grant select on public tables to anon
GRANT SELECT ON venues TO anon;
GRANT SELECT ON events TO anon;
GRANT SELECT ON offers TO anon;
GRANT SELECT ON movies TO anon;
GRANT SELECT ON showtimes TO anon;
GRANT SELECT ON homepage_ads TO anon;
GRANT SELECT ON sponsors TO anon;
GRANT INSERT ON page_views TO anon;
GRANT INSERT ON ad_clicks TO anon;

-- Grant same to authenticated
GRANT SELECT ON venues TO authenticated;
GRANT SELECT ON events TO authenticated;
GRANT SELECT ON offers TO authenticated;
GRANT SELECT ON movies TO authenticated;
GRANT SELECT ON showtimes TO authenticated;
GRANT SELECT ON homepage_ads TO authenticated;
GRANT SELECT ON sponsors TO authenticated;
GRANT INSERT ON page_views TO authenticated;
GRANT INSERT ON ad_clicks TO authenticated;
