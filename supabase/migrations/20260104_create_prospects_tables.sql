-- Prospects table for storing advertising prospects
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Company Info
  company_name TEXT NOT NULL,
  company_name_arabic TEXT,
  industry TEXT,
  website TEXT,
  logo_url TEXT,
  description TEXT,

  -- Contact Info (AI enriched)
  contact_name TEXT,
  contact_title TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_linkedin TEXT,

  -- Source Tracking
  source TEXT NOT NULL, -- facebook/instagram/google_ads/linkedin/news_site/billboard/magazine/newspaper/manual
  source_url TEXT,
  source_screenshot TEXT,
  ad_content TEXT,

  -- AI Enrichment
  ai_enriched BOOLEAN DEFAULT FALSE,
  ai_enriched_at TIMESTAMP,
  ai_summary TEXT,
  ai_suggested_approach TEXT,
  estimated_budget TEXT, -- small/medium/large/enterprise

  -- Scoring
  relevance_score INTEGER DEFAULT 0, -- 1-100
  industry_fit TEXT, -- high/medium/low

  -- Sales Tracking
  status TEXT DEFAULT 'new', -- new/contacted/meeting/proposal/won/lost/not_interested
  priority TEXT, -- high/medium/low
  assigned_to TEXT,
  notes TEXT,
  follow_up_date DATE,
  contacted_at TIMESTAMP,

  -- Timestamps
  first_seen_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Prevent duplicates
  UNIQUE(company_name, source)
);

-- Prospect sightings (track multiple appearances)
CREATE TABLE IF NOT EXISTS prospect_sightings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  source_url TEXT,
  screenshot_url TEXT,
  ad_content TEXT,
  spotted_at TIMESTAMP DEFAULT NOW()
);

-- Manual entries (billboard/magazine/newspaper)
CREATE TABLE IF NOT EXISTS prospect_manual_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  source_type TEXT NOT NULL, -- billboard/magazine/newspaper
  location TEXT, -- For billboards: "Sheikh Khalifa Highway", for magazine: "Gulf Insider May 2026"
  description TEXT,
  photo_url TEXT,
  spotted_date DATE DEFAULT CURRENT_DATE,
  processed BOOLEAN DEFAULT FALSE, -- Whether AI has processed this
  prospect_id UUID REFERENCES prospects(id), -- Link after AI processing
  created_at TIMESTAMP DEFAULT NOW()
);

-- Daily scrape log
CREATE TABLE IF NOT EXISTS prospect_scrape_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  status TEXT, -- success/failed
  prospects_found INTEGER DEFAULT 0,
  new_prospects INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source);
CREATE INDEX IF NOT EXISTS idx_prospects_created ON prospects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_sightings_prospect ON prospect_sightings(prospect_id);
CREATE INDEX IF NOT EXISTS idx_manual_processed ON prospect_manual_entries(processed);
