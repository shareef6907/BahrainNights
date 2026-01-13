-- Add cover_url column to experiences table for modal banner images
-- Run this SQL in Supabase SQL Editor

ALTER TABLE experiences ADD COLUMN IF NOT EXISTS cover_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN experiences.cover_url IS 'Wide banner image for attraction detail modal. Falls back to image_url if not set.';
