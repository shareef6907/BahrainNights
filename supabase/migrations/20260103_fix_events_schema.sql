-- Migration to add missing columns to events table
-- These columns are expected by the codebase but don't exist in the database

-- Add venue_id column (nullable UUID)
ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES venues(id) ON DELETE SET NULL;

-- Add rejection_reason column
ALTER TABLE events ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add published_at column
ALTER TABLE events ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Create view_count as alias for views (or add if views doesn't exist)
-- The codebase uses view_count but DB has views
-- We'll keep views and ensure view_count works too
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'view_count'
  ) THEN
    -- If views exists, copy to view_count
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'events' AND column_name = 'views'
    ) THEN
      ALTER TABLE events ADD COLUMN view_count INTEGER DEFAULT 0;
      UPDATE events SET view_count = views;
    ELSE
      ALTER TABLE events ADD COLUMN view_count INTEGER DEFAULT 0;
    END IF;
  END IF;
END $$;

-- Add created_by column
ALTER TABLE events ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;

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

-- Add gallery column (different from gallery_urls)
ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery TEXT[];

-- Add age_restriction column
ALTER TABLE events ADD COLUMN IF NOT EXISTS age_restriction TEXT;

-- Add dress_code column
ALTER TABLE events ADD COLUMN IF NOT EXISTS dress_code TEXT;

-- Add special_instructions column
ALTER TABLE events ADD COLUMN IF NOT EXISTS special_instructions TEXT;

-- Create index on venue_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Create index on start_date
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
