-- Experiences table for Platinumlist affiliate data (attractions, tours, events)
-- Run this SQL in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  price_currency TEXT DEFAULT 'BHD',
  image_url TEXT,
  venue TEXT,
  location TEXT,
  category TEXT, -- 'attraction', 'tour', 'water-sports', 'indoor', 'sightseeing', 'boat-tour', etc.
  type TEXT NOT NULL, -- 'attraction', 'tour', or 'event'
  original_url TEXT UNIQUE NOT NULL,
  affiliate_url TEXT NOT NULL,
  source TEXT DEFAULT 'platinumlist',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_experiences_type ON experiences(type);
CREATE INDEX IF NOT EXISTS idx_experiences_is_active ON experiences(is_active);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON experiences(category);
CREATE INDEX IF NOT EXISTS idx_experiences_source ON experiences(source);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_experiences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_experiences_updated_at();
