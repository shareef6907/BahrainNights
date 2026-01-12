-- Migration: Add is_hidden column to events table
-- Description: Allows admins to hide events from public view while keeping them in the database
-- Date: January 12, 2026

-- =====================================================
-- EVENTS TABLE - Add is_hidden Column
-- =====================================================

-- Add is_hidden column to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;

-- Create index for performance on visibility queries
CREATE INDEX IF NOT EXISTS idx_events_is_hidden ON events(is_hidden);

-- Add comment for documentation
COMMENT ON COLUMN events.is_hidden IS 'Whether the event is hidden from public view';

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Run this query to verify the migration:
-- SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'is_hidden';
