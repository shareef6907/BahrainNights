-- Add Cineco columns to movies table
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cineco_url TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cineco_booking_url TEXT;
