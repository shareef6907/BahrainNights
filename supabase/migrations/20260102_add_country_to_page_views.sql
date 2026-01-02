-- Add country column to page_views table for visitor geo tracking
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country_code VARCHAR(2);
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS city VARCHAR(100);

-- Create index for country queries
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);
CREATE INDEX IF NOT EXISTS idx_page_views_country_code ON page_views(country_code);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
