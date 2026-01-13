-- Migration: Add is_sold_out column to events table
-- Date: 2026-01-13
-- Description: Adds sold out tracking for events from Platinumlist

-- Add is_sold_out column to events table (if it doesn't exist)
ALTER TABLE events
ADD COLUMN IF NOT EXISTS is_sold_out BOOLEAN DEFAULT FALSE;

-- Add comment for documentation
COMMENT ON COLUMN events.is_sold_out IS 'Indicates if the event is sold out (from scraper)';

-- Add index for filtering (optional but useful)
CREATE INDEX IF NOT EXISTS idx_events_is_sold_out ON events(is_sold_out) WHERE is_sold_out = TRUE;

-- Verification: Check the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'events' AND column_name = 'is_sold_out';
