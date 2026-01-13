-- Migration: Add columns for Platinumlist events scraper
-- Description: Adds affiliate_url and price_currency columns to events table
-- Date: January 13, 2026

-- =====================================================
-- EVENTS TABLE - Add Scraper Columns
-- =====================================================

-- Add affiliate_url column for Platinumlist affiliate links
ALTER TABLE events ADD COLUMN IF NOT EXISTS affiliate_url TEXT;

-- Add price_currency column (default BHD for Bahrain Dinar)
ALTER TABLE events ADD COLUMN IF NOT EXISTS price_currency TEXT DEFAULT 'BHD';

-- Add is_active column to manage event visibility (separate from is_hidden)
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- =====================================================
-- INDEXES
-- =====================================================

-- Create index on source_url for upsert operations (conflict detection)
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_source_url_unique ON events(source_url) WHERE source_url IS NOT NULL;

-- Create index on source_name for filtering by source
CREATE INDEX IF NOT EXISTS idx_events_source_name ON events(source_name);

-- Create index on is_active for filtering active events
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON COLUMN events.affiliate_url IS 'Affiliate tracking URL for monetization (e.g., Platinumlist affiliate links)';
COMMENT ON COLUMN events.price_currency IS 'Currency code for price (default: BHD for Bahrain Dinar)';
COMMENT ON COLUMN events.is_active IS 'Whether the event is active (scraped events set to false when no longer found)';

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Run this query to verify the migration:
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'events'
-- AND column_name IN ('affiliate_url', 'price_currency', 'is_active');
