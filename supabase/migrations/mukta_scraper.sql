
-- Add source tracking columns to movies table
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source_id TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS mukta_status TEXT;

-- Create scraper logs table
CREATE TABLE IF NOT EXISTS cinema_scraper_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cinema_chain TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  movies_found INTEGER DEFAULT 0,
  movies_updated INTEGER DEFAULT 0,
  coming_soon_count INTEGER DEFAULT 0,
  now_showing_count INTEGER DEFAULT 0,
  error_message TEXT,
  details JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_movies_cinema_source ON movies(cinema_source);
CREATE INDEX IF NOT EXISTS idx_movies_mukta_status ON movies(mukta_status);
CREATE INDEX IF NOT EXISTS idx_scraper_logs_cinema ON cinema_scraper_logs(cinema_chain);
CREATE INDEX IF NOT EXISTS idx_scraper_logs_created ON cinema_scraper_logs(created_at DESC);
  