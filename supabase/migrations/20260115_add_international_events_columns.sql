-- Migration: Add international events support
-- Description: Adds country and city columns to events table for international events
-- Date: January 15, 2026

-- =====================================================
-- EVENTS TABLE - Add International Support Columns
-- =====================================================

-- Add country column (default 'Bahrain' for existing events)
ALTER TABLE events ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'Bahrain';

-- Add city column
ALTER TABLE events ADD COLUMN IF NOT EXISTS city VARCHAR(200);

-- =====================================================
-- INDEXES for International Events
-- =====================================================

-- Create index on country for filtering by country
CREATE INDEX IF NOT EXISTS idx_events_country ON events(country);

-- Create index on city for filtering by city
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);

-- Create composite index for country + start_date queries
CREATE INDEX IF NOT EXISTS idx_events_country_date ON events(country, start_date);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON COLUMN events.country IS 'Country where the event takes place (default: Bahrain)';
COMMENT ON COLUMN events.city IS 'City where the event takes place';

-- =====================================================
-- UPDATE EXISTING DATA
-- =====================================================

-- Set country to 'Bahrain' for all existing events that have null country
UPDATE events SET country = 'Bahrain' WHERE country IS NULL;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Run this query to verify the migration:
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'events'
-- AND column_name IN ('country', 'city');
