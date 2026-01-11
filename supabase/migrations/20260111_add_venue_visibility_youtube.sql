-- Migration: Add is_hidden and youtube_url columns to venues table
-- Date: 2026-01-11
-- Purpose:
--   1. is_hidden: Allow admin to hide venues from public pages while keeping them in admin panel
--   2. youtube_url: Allow venues to display embedded YouTube videos

-- Add is_hidden column with default false (visible by default)
ALTER TABLE venues ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;

-- Add index for efficient filtering of hidden venues
CREATE INDEX IF NOT EXISTS idx_venues_is_hidden ON venues(is_hidden);

-- Add youtube_url column (nullable, stores full YouTube URL)
ALTER TABLE venues ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN venues.is_hidden IS 'If true, venue is hidden from public pages but visible in admin panel';
COMMENT ON COLUMN venues.youtube_url IS 'YouTube video URL for venue (supports youtube.com/watch, youtu.be, and embed formats)';
