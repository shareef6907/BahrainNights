-- Migration: Add Instagram Reels support for venues
-- Date: 2026-01-12
-- Description: Creates venue_reels table and adds reel columns to venue_submissions and venues

-- Create table for venue Instagram reels (unlimited reels per venue)
CREATE TABLE IF NOT EXISTS venue_reels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  instagram_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookups by venue
CREATE INDEX IF NOT EXISTS idx_venue_reels_venue_id ON venue_reels(venue_id);

-- Index for active reels only (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_venue_reels_active ON venue_reels(venue_id, is_active) WHERE is_active = true;

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_venue_reels_order ON venue_reels(venue_id, display_order);

-- Add single reel field to venue_submissions for registration form
ALTER TABLE venue_submissions ADD COLUMN IF NOT EXISTS instagram_reel_url TEXT;

-- Add featured reel to venues table for quick access to primary reel
ALTER TABLE venues ADD COLUMN IF NOT EXISTS featured_reel_url TEXT;

-- Enable Row Level Security
ALTER TABLE venue_reels ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active reels
CREATE POLICY "Anyone can view active venue reels"
  ON venue_reels
  FOR SELECT
  USING (is_active = true);

-- Policy: Venue owners can manage their own reels (will need auth check in API)
CREATE POLICY "Venue owners can manage their reels"
  ON venue_reels
  FOR ALL
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_venue_reels_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS venue_reels_updated_at ON venue_reels;
CREATE TRIGGER venue_reels_updated_at
  BEFORE UPDATE ON venue_reels
  FOR EACH ROW
  EXECUTE FUNCTION update_venue_reels_updated_at();

-- Comment on table
COMMENT ON TABLE venue_reels IS 'Instagram reels associated with venues - unlimited reels per venue';
COMMENT ON COLUMN venue_reels.instagram_url IS 'Full Instagram reel URL';
COMMENT ON COLUMN venue_reels.display_order IS 'Order in which reels are displayed (0 = first)';
COMMENT ON COLUMN venue_reels.is_active IS 'Soft delete flag - false means reel is hidden/deleted';
