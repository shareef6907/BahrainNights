-- Migration: Add Terms & Conditions Acceptance Tracking
-- Description: Adds columns to track terms acceptance for venue submissions and registrations
-- Date: January 12, 2026

-- =====================================================
-- VENUE SUBMISSIONS TABLE - Add Terms Columns
-- =====================================================

-- Add terms acceptance columns to venue_submissions table
ALTER TABLE venue_submissions
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS content_guidelines_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ip_address VARCHAR(50),
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Comment on columns
COMMENT ON COLUMN venue_submissions.terms_accepted IS 'Whether user accepted Terms & Conditions';
COMMENT ON COLUMN venue_submissions.terms_accepted_at IS 'Timestamp when terms were accepted';
COMMENT ON COLUMN venue_submissions.content_guidelines_accepted IS 'Whether user accepted Content Guidelines';
COMMENT ON COLUMN venue_submissions.ip_address IS 'IP address at time of submission for legal records';
COMMENT ON COLUMN venue_submissions.user_agent IS 'User agent string at time of submission';

-- =====================================================
-- VENUES TABLE - Add Terms Columns
-- =====================================================

-- Add terms acceptance columns to venues table
ALTER TABLE venues
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS content_guidelines_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS registration_ip VARCHAR(50),
ADD COLUMN IF NOT EXISTS registration_user_agent TEXT;

-- Comment on columns
COMMENT ON COLUMN venues.terms_accepted IS 'Whether venue owner accepted Terms & Conditions during registration';
COMMENT ON COLUMN venues.terms_accepted_at IS 'Timestamp when terms were accepted';
COMMENT ON COLUMN venues.content_guidelines_accepted IS 'Whether venue owner accepted Content Guidelines during registration';
COMMENT ON COLUMN venues.registration_ip IS 'IP address at time of registration for legal records';
COMMENT ON COLUMN venues.registration_user_agent IS 'User agent string at time of registration';

-- =====================================================
-- TERMS ACCEPTANCE LOG TABLE - For Legal Evidence
-- =====================================================

-- Create terms_acceptance_log table for legal audit trail
CREATE TABLE IF NOT EXISTS terms_acceptance_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Reference to submission or venue (one should be set)
  submission_id UUID REFERENCES venue_submissions(id) ON DELETE SET NULL,
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,

  -- User identification
  user_email VARCHAR(255) NOT NULL,

  -- Terms details
  terms_version VARCHAR(50) DEFAULT 'v1.0',
  terms_accepted BOOLEAN NOT NULL,
  content_guidelines_version VARCHAR(50) DEFAULT 'v1.0',
  content_guidelines_accepted BOOLEAN NOT NULL,

  -- Legal evidence fields
  ip_address VARCHAR(50),
  user_agent TEXT,

  -- Timestamps
  accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_terms_acceptance_log_email ON terms_acceptance_log(user_email);
CREATE INDEX IF NOT EXISTS idx_terms_acceptance_log_submission ON terms_acceptance_log(submission_id);
CREATE INDEX IF NOT EXISTS idx_terms_acceptance_log_venue ON terms_acceptance_log(venue_id);
CREATE INDEX IF NOT EXISTS idx_terms_acceptance_log_accepted_at ON terms_acceptance_log(accepted_at);

-- Comment on table
COMMENT ON TABLE terms_acceptance_log IS 'Audit log for terms and content guidelines acceptance - used for legal compliance';

-- =====================================================
-- FUNCTION: Log Terms Acceptance
-- =====================================================

-- Create function to log terms acceptance (can be called from API or trigger)
CREATE OR REPLACE FUNCTION log_terms_acceptance(
  p_submission_id UUID DEFAULT NULL,
  p_venue_id UUID DEFAULT NULL,
  p_user_email VARCHAR(255),
  p_terms_accepted BOOLEAN,
  p_content_guidelines_accepted BOOLEAN,
  p_ip_address VARCHAR(50) DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_terms_version VARCHAR(50) DEFAULT 'v1.0',
  p_content_guidelines_version VARCHAR(50) DEFAULT 'v1.0'
) RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO terms_acceptance_log (
    submission_id,
    venue_id,
    user_email,
    terms_version,
    terms_accepted,
    content_guidelines_version,
    content_guidelines_accepted,
    ip_address,
    user_agent,
    accepted_at
  ) VALUES (
    p_submission_id,
    p_venue_id,
    p_user_email,
    p_terms_version,
    p_terms_accepted,
    p_content_guidelines_version,
    p_content_guidelines_accepted,
    p_ip_address,
    p_user_agent,
    NOW()
  ) RETURNING id INTO log_id;

  RETURN log_id;
END;
$$ LANGUAGE plpgsql;

-- Comment on function
COMMENT ON FUNCTION log_terms_acceptance IS 'Logs terms acceptance to audit table for legal compliance';

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Enable RLS on terms_acceptance_log
ALTER TABLE terms_acceptance_log ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can read terms acceptance logs
CREATE POLICY "Admins can read terms_acceptance_log"
  ON terms_acceptance_log
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policy: System can insert (for API calls with service role)
CREATE POLICY "Service role can insert terms_acceptance_log"
  ON terms_acceptance_log
  FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- MIGRATION NOTES
-- =====================================================

-- Note: This migration adds:
-- 1. Terms acceptance fields to venue_submissions table
-- 2. Terms acceptance fields to venues table
-- 3. A new terms_acceptance_log table for legal audit trail
-- 4. A helper function to log terms acceptance
-- 5. RLS policies for security

-- To run this migration:
-- 1. Go to Supabase Dashboard > SQL Editor
-- 2. Copy and paste this entire file
-- 3. Run the query

-- Verification queries (run after migration):
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'venue_submissions' AND column_name LIKE '%terms%';
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'venues' AND column_name LIKE '%terms%';
-- SELECT * FROM information_schema.tables WHERE table_name = 'terms_acceptance_log';
