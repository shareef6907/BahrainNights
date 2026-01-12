-- Migration: SEO Features - Category Pages, Venue Submissions, Discovery Agent
-- Date: 2026-01-11

-- ============================================
-- 1. Add tags column to venues for category filtering
-- ============================================
ALTER TABLE venues ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create GIN index for efficient tag searches
CREATE INDEX IF NOT EXISTS idx_venues_tags ON venues USING GIN(tags);

-- ============================================
-- 2. Create venue_submissions table for crowd-sourced submissions
-- ============================================
CREATE TABLE IF NOT EXISTS venue_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Venue Info
  venue_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  address TEXT,
  area VARCHAR(100),
  phone VARCHAR(50),
  instagram VARCHAR(100),
  website VARCHAR(255),
  google_maps_url TEXT,

  -- Submitter Info
  submitter_name VARCHAR(255),
  submitter_email VARCHAR(255) NOT NULL,
  submitter_phone VARCHAR(50),
  is_owner BOOLEAN DEFAULT false,

  -- Admin Fields
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  admin_notes TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Link to created venue if approved
  venue_id UUID REFERENCES venues(id),

  -- Auto Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for venue_submissions
CREATE INDEX IF NOT EXISTS idx_venue_submissions_status ON venue_submissions(status);
CREATE INDEX IF NOT EXISTS idx_venue_submissions_created ON venue_submissions(created_at DESC);

-- ============================================
-- 3. Create discovered_venues table for Google Maps discovery
-- ============================================
CREATE TABLE IF NOT EXISTS discovered_venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Google Maps Data
  google_place_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(2, 1),
  total_ratings INTEGER,
  phone VARCHAR(50),
  website VARCHAR(255),
  google_maps_url VARCHAR(500),
  photo_reference VARCHAR(500),

  -- Categorization
  category VARCHAR(100),
  suggested_tags TEXT[] DEFAULT '{}',

  -- Admin Review
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, duplicate
  admin_notes TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Link to actual venue if approved
  venue_id UUID REFERENCES venues(id),

  -- Auto Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for discovered_venues
CREATE INDEX IF NOT EXISTS idx_discovered_venues_status ON discovered_venues(status);
CREATE INDEX IF NOT EXISTS idx_discovered_venues_category ON discovered_venues(category);
CREATE INDEX IF NOT EXISTS idx_discovered_venues_created ON discovered_venues(created_at DESC);

-- ============================================
-- 4. Create agent_logs table for tracking discovery agent runs
-- ============================================
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_name VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL, -- running, completed, failed
  details JSONB,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for agent_logs
CREATE INDEX IF NOT EXISTS idx_agent_logs_agent_name ON agent_logs(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_logs_created ON agent_logs(created_at DESC);

-- ============================================
-- 5. Update function for updated_at timestamps
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_venue_submissions_updated_at ON venue_submissions;
CREATE TRIGGER update_venue_submissions_updated_at
    BEFORE UPDATE ON venue_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_discovered_venues_updated_at ON discovered_venues;
CREATE TRIGGER update_discovered_venues_updated_at
    BEFORE UPDATE ON discovered_venues
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
