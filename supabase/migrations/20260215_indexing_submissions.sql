-- Create table for tracking Google Indexing API submissions
-- This helps avoid re-submitting URLs and tracks indexing status

CREATE TABLE IF NOT EXISTS indexing_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, submitted, indexed, failed
  submitted_at TIMESTAMPTZ,
  indexed_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for quick lookups
CREATE INDEX IF NOT EXISTS idx_indexing_submissions_url ON indexing_submissions(url);
CREATE INDEX IF NOT EXISTS idx_indexing_submissions_status ON indexing_submissions(status);

-- Add RLS policies (allow service role full access)
ALTER TABLE indexing_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access" ON indexing_submissions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_indexing_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_indexing_submissions_updated_at
  BEFORE UPDATE ON indexing_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_indexing_submissions_updated_at();

COMMENT ON TABLE indexing_submissions IS 'Tracks URLs submitted to Google Indexing API to avoid duplicate submissions';
