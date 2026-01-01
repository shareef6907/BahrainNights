import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if table exists first
    const { data: existingTable } = await supabase.from('venues').select('id').limit(1);

    if (existingTable !== null) {
      return NextResponse.json({
        success: true,
        message: 'Venues table already exists'
      });
    }

    // Table doesn't exist - provide SQL to create it
    const sql = `
-- Create venues table
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[],
  cuisine_types TEXT[],
  area VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  google_maps_url TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  website TEXT,
  whatsapp VARCHAR(50),
  instagram VARCHAR(100),
  facebook TEXT,
  tiktok VARCHAR(100),
  twitter VARCHAR(100),
  logo_url TEXT,
  cover_image_url TEXT,
  gallery TEXT[],
  opening_hours JSONB,
  price_range INTEGER CHECK (price_range >= 1 AND price_range <= 4),
  avg_cost_per_person VARCHAR(50),
  features TEXT[],
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_venues_status ON venues(status);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category);
CREATE INDEX IF NOT EXISTS idx_venues_area ON venues(area);
CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);
CREATE INDEX IF NOT EXISTS idx_venues_owner ON venues(owner_id);
CREATE INDEX IF NOT EXISTS idx_venues_featured ON venues(is_featured);

-- Enable RLS
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read approved venues" ON venues
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Allow service role full access venues" ON venues
  FOR ALL USING (true);

-- Create venue_likes table
CREATE TABLE IF NOT EXISTS venue_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  user_ip VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(venue_id, user_ip)
);

CREATE INDEX IF NOT EXISTS idx_venue_likes_venue ON venue_likes(venue_id);

ALTER TABLE venue_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert venue likes" ON venue_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access venue_likes" ON venue_likes
  FOR ALL USING (true);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_venue_views(venue_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE venues SET view_count = view_count + 1 WHERE id = venue_id;
END;
$$ LANGUAGE plpgsql;
`;

    return NextResponse.json({
      success: false,
      message: 'Venues table does not exist. Please run the SQL below in Supabase SQL Editor.',
      sql: sql
    }, { status: 400 });

  } catch (error) {
    console.error('Error checking venues table:', error);
    return NextResponse.json(
      { error: 'Failed to check venues table', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to check/create the venues table',
    note: 'If the table does not exist, SQL will be provided to run in Supabase SQL Editor'
  });
}
