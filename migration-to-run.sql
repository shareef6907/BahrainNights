-- Run this in Supabase Dashboard > SQL Editor
-- Migration: Add missing columns to events table

-- Add venue_id column (nullable UUID)
ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES venues(id) ON DELETE SET NULL;

-- Add rejection_reason column
ALTER TABLE events ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add published_at column
ALTER TABLE events ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Add view_count column
ALTER TABLE events ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Sync view_count with existing views column
UPDATE events SET view_count = COALESCE(views, 0) WHERE view_count IS NULL OR view_count = 0;

-- Add description_ar column
ALTER TABLE events ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- Add tags column
ALTER TABLE events ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Add is_recurring column
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT FALSE;

-- Add recurrence_pattern column
ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_pattern TEXT;

-- Add recurrence_days column
ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_days TEXT[];

-- Add gallery column
ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery TEXT[];

-- Add age_restriction column
ALTER TABLE events ADD COLUMN IF NOT EXISTS age_restriction TEXT;

-- Add dress_code column
ALTER TABLE events ADD COLUMN IF NOT EXISTS dress_code TEXT;

-- Add special_instructions column
ALTER TABLE events ADD COLUMN IF NOT EXISTS special_instructions TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

-- Verify the changes
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'events'
ORDER BY ordinal_position;
