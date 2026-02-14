-- Artists table for BahrainNights Entertainment Booking
-- Created: February 14, 2026

-- Create artist status enum
DO $$ BEGIN
  CREATE TYPE artist_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create artist tier enum
DO $$ BEGIN
  CREATE TYPE artist_tier AS ENUM ('vibes', 'bahrainnights_exclusive');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create artist category enum
DO $$ BEGIN
  CREATE TYPE artist_category AS ENUM (
    'dj', 
    'vocalist', 
    'instrumentalist', 
    'band', 
    'fire_show', 
    'performer', 
    'kids_entertainment', 
    'magician'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Status and tier
  status artist_status NOT NULL DEFAULT 'pending',
  tier artist_tier NOT NULL DEFAULT 'bahrainnights_exclusive',
  
  -- Basic info
  stage_name TEXT NOT NULL,
  real_name TEXT, -- Private, admin only
  slug TEXT UNIQUE NOT NULL,
  
  -- Category
  category artist_category NOT NULL,
  subcategory TEXT, -- e.g., 'guitarist', 'harpist', 'pianist', 'saxophonist', etc.
  
  -- Description
  bio TEXT,
  short_description TEXT, -- One-liner for cards
  
  -- Media
  profile_image TEXT, -- S3 URL, primary photo
  gallery_images TEXT[] DEFAULT '{}', -- S3 URLs, additional photos
  video_url TEXT, -- YouTube/Vimeo performance reel
  
  -- Social
  instagram_handle TEXT,
  instagram_verified BOOLEAN NOT NULL DEFAULT FALSE, -- has @bh.nights or @vibesbahrain in bio
  
  -- Rates (PRIVATE - admin only)
  rate_per_hour NUMERIC,
  rate_per_event NUMERIC,
  rate_notes TEXT, -- e.g., "charges extra for equipment"
  currency TEXT NOT NULL DEFAULT 'BHD',
  
  -- Display
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  
  -- Admin
  rejection_reason TEXT,
  admin_notes TEXT, -- Internal notes, not visible to artist or public
  
  -- Tier 2 signup info
  submitted_email TEXT,
  submitted_phone TEXT
);

-- Create booking requests table
CREATE TABLE IF NOT EXISTS artist_booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Event details
  event_date DATE NOT NULL,
  event_time TIME,
  event_type TEXT NOT NULL, -- 'private_party', 'corporate_event', 'wedding', 'hotel_venue_night', 'festival', 'other'
  venue_name TEXT,
  guest_count INTEGER,
  
  -- Artist preference
  preferred_artists TEXT[], -- Array of artist IDs or names
  budget_range TEXT, -- 'under_50', '50_100', '100_250', '250_500', '500_plus', 'prefer_not_to_say'
  special_requirements TEXT,
  
  -- Client info
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'
  admin_notes TEXT,
  quoted_amount NUMERIC,
  
  -- References
  assigned_artist_id UUID REFERENCES artists(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_artists_status ON artists(status);
CREATE INDEX IF NOT EXISTS idx_artists_tier ON artists(tier);
CREATE INDEX IF NOT EXISTS idx_artists_category ON artists(category);
CREATE INDEX IF NOT EXISTS idx_artists_slug ON artists(slug);
CREATE INDEX IF NOT EXISTS idx_artists_is_featured ON artists(is_featured);
CREATE INDEX IF NOT EXISTS idx_artists_display_order ON artists(display_order);

CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON artist_booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_booking_requests_event_date ON artist_booking_requests(event_date);
CREATE INDEX IF NOT EXISTS idx_booking_requests_created_at ON artist_booking_requests(created_at);

-- Enable Row Level Security
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_booking_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artists
-- Public can view approved artists
CREATE POLICY "Public can view approved artists" ON artists
  FOR SELECT USING (status = 'approved');

-- Authenticated admins can do everything
CREATE POLICY "Admins can manage artists" ON artists
  FOR ALL USING (true);

-- RLS Policies for booking requests
-- Admins can manage all booking requests
CREATE POLICY "Admins can manage booking requests" ON artist_booking_requests
  FOR ALL USING (true);

-- Anyone can insert booking requests (public form)
CREATE POLICY "Anyone can submit booking request" ON artist_booking_requests
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_artists_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER artists_updated_at
  BEFORE UPDATE ON artists
  FOR EACH ROW
  EXECUTE FUNCTION update_artists_updated_at();

CREATE TRIGGER booking_requests_updated_at
  BEFORE UPDATE ON artist_booking_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_artists_updated_at();

-- Add comment
COMMENT ON TABLE artists IS 'Artists for BahrainNights entertainment booking platform';
COMMENT ON TABLE artist_booking_requests IS 'Booking requests submitted through the public form';
