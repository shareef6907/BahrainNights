-- Migration: Add password_hash column to venues table for venue portal login
-- Run this in Supabase SQL Editor

-- Add password_hash column if it doesn't exist
ALTER TABLE venues ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Create index for faster email lookups during login
CREATE INDEX IF NOT EXISTS idx_venues_email ON venues(email);

-- For existing approved venues without password_hash,
-- you'll need to either:
-- 1. Reset their passwords via admin panel
-- 2. Or run this to set a temporary password (change 'TempPassword123!' to your choice)
-- UPDATE venues
-- SET password_hash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.MVdKoUhp8.MWTS'
-- WHERE password_hash IS NULL AND status = 'approved';
-- Note: The hash above is for 'TempPassword123!' - venues should change it immediately

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'venues' AND column_name = 'password_hash';
