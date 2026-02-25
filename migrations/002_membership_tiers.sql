-- Migration: Add Membership Tier System to Venues
-- Run this in Supabase SQL Editor
-- Date: 2026-02-26

-- Step 1: Add membership columns to venues table
ALTER TABLE venues ADD COLUMN IF NOT EXISTS membership_tier varchar(20) DEFAULT 'free';
ALTER TABLE venues ADD COLUMN IF NOT EXISTS membership_start timestamptz;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS membership_end timestamptz;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS membership_amount numeric(10,3);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS membership_notes text;

-- Step 2: Add constraint for valid tiers
-- Drop constraint if it exists (for re-running migration)
ALTER TABLE venues DROP CONSTRAINT IF EXISTS valid_membership_tier;
ALTER TABLE venues ADD CONSTRAINT valid_membership_tier 
  CHECK (membership_tier IN ('free', 'premium', 'gold', 'founding_partner'));

-- Step 3: Create indexes for tier-based queries
CREATE INDEX IF NOT EXISTS idx_venues_membership_tier ON venues(membership_tier);
CREATE INDEX IF NOT EXISTS idx_venues_membership_end ON venues(membership_end);

-- Step 4: Update existing venues to ensure they have 'free' tier
-- (This is safe to run multiple times)
UPDATE venues SET membership_tier = 'free' WHERE membership_tier IS NULL;

-- MANUAL STEP (DO NOT AUTO-RUN):
-- If you want to set existing featured venues as founding partners, run this manually:
-- UPDATE venues SET membership_tier = 'founding_partner' WHERE is_featured = true AND status = 'approved';

-- Verification query:
-- SELECT membership_tier, COUNT(*) FROM venues GROUP BY membership_tier;
