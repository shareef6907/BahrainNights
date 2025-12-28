import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function POST(request: NextRequest) {
  // Require admin authentication
  const auth = await requireAdmin(request);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const supabase = getSupabaseAdmin();
    const results: string[] = [];
    const errors: string[] = [];

    // Create cinemas table
    const { error: cinemasError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS cinemas (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          location TEXT,
          area TEXT,
          logo_url TEXT,
          website TEXT,
          phone TEXT,
          booking_url TEXT,
          has_imax BOOLEAN DEFAULT false,
          has_vip BOOLEAN DEFAULT false,
          has_4dx BOOLEAN DEFAULT false,
          has_dolby BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (cinemasError) {
      // Try direct table creation approach
      console.log('RPC not available, using direct approach');
    }

    // Check if cinemas table exists by trying to select
    const { error: checkCinemas } = await supabase
      .from('cinemas')
      .select('id')
      .limit(1);

    if (checkCinemas?.code === '42P01') {
      errors.push('cinemas table does not exist - please create via Supabase dashboard');
    } else {
      results.push('cinemas table exists');
    }

    // Check movies table
    const { error: checkMovies } = await supabase
      .from('movies')
      .select('id')
      .limit(1);

    if (checkMovies?.code === '42P01') {
      errors.push('movies table does not exist - please create via Supabase dashboard');
    } else {
      results.push('movies table exists');
    }

    // Check showtimes table
    const { error: checkShowtimes } = await supabase
      .from('showtimes')
      .select('id')
      .limit(1);

    if (checkShowtimes?.code === '42P01') {
      errors.push('showtimes table does not exist - please create via Supabase dashboard');
    } else {
      results.push('showtimes table exists');
    }

    // Check agent_logs table
    const { error: checkAgentLogs } = await supabase
      .from('agent_logs')
      .select('id')
      .limit(1);

    if (checkAgentLogs?.code === '42P01') {
      errors.push('agent_logs table does not exist - please create via Supabase dashboard');
    } else {
      results.push('agent_logs table exists');
    }

    // If cinemas table exists, seed it
    if (!checkCinemas?.code) {
      const { error: seedError } = await supabase
        .from('cinemas')
        .upsert([
          { name: 'Cineco - Seef Mall', slug: 'cineco-seef', location: 'Seef Mall', area: 'Seef', website: 'https://www.cineco.com.bh', booking_url: 'https://www.cineco.com.bh', has_imax: false, has_vip: true },
          { name: 'Cineco - Saar Mall', slug: 'cineco-saar', location: 'Saar Mall', area: 'Saar', website: 'https://www.cineco.com.bh', booking_url: 'https://www.cineco.com.bh', has_imax: false, has_vip: false },
          { name: 'Cineco - Oasis Mall', slug: 'cineco-oasis', location: 'Oasis Mall', area: 'Juffair', website: 'https://www.cineco.com.bh', booking_url: 'https://www.cineco.com.bh', has_imax: false, has_vip: true },
          { name: 'Cineco - Wadi Al Sail', slug: 'cineco-wadi-al-sail', location: 'Wadi Al Sail Mall', area: 'Riffa', website: 'https://www.cineco.com.bh', booking_url: 'https://www.cineco.com.bh', has_imax: false, has_vip: false },
          { name: 'VOX Cinemas - City Centre', slug: 'vox-city-centre', location: 'City Centre Bahrain', area: 'Seef', website: 'https://voxcinemas.com', booking_url: 'https://voxcinemas.com/bahrain', has_imax: true, has_vip: true },
          { name: 'VOX Cinemas - The Avenues', slug: 'vox-avenues', location: 'The Avenues Mall', area: 'Manama', website: 'https://voxcinemas.com', booking_url: 'https://voxcinemas.com/bahrain', has_imax: true, has_vip: true },
          { name: 'Cinepolis - Wadi Al Sail', slug: 'cinepolis-wadi-al-sail', location: 'Wadi Al Sail Mall', area: 'Riffa', website: 'https://cinepolisbahrain.com', booking_url: 'https://cinepolisbahrain.com', has_imax: false, has_vip: true },
          { name: 'Mukta A2 Cinemas', slug: 'mukta-a2', location: 'Juffair Mall', area: 'Juffair', website: 'https://www.muktaa2.com', booking_url: 'https://www.muktaa2.com/bahrain', has_imax: false, has_vip: false },
        ], { onConflict: 'slug' });

      if (seedError) {
        errors.push(`Failed to seed cinemas: ${seedError.message}`);
      } else {
        results.push('Cinemas seeded successfully');
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      results,
      errors,
      message: errors.length > 0
        ? 'Some tables need to be created via Supabase dashboard. Copy the SQL from the setup instructions.'
        : 'All tables exist and are ready',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to check/create tables', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Cinema Tables Setup API',
    instructions: 'POST to this endpoint to check tables and seed cinemas',
    sql: `
-- Run this SQL in Supabase Dashboard -> SQL Editor:

-- Cinemas in Bahrain
CREATE TABLE IF NOT EXISTS cinemas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT,
  area TEXT,
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  booking_url TEXT,
  has_imax BOOLEAN DEFAULT false,
  has_vip BOOLEAN DEFAULT false,
  has_4dx BOOLEAN DEFAULT false,
  has_dolby BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Movies
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tmdb_id INTEGER UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  poster_url TEXT,
  backdrop_url TEXT,
  duration_minutes INTEGER,
  genre TEXT[],
  rating TEXT,
  synopsis TEXT,
  release_date DATE,
  trailer_url TEXT,
  trailer_key TEXT,
  language TEXT DEFAULT 'English',
  director TEXT,
  cast TEXT[],
  tmdb_rating DECIMAL(3,1),
  is_now_showing BOOLEAN DEFAULT false,
  is_coming_soon BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Showtimes
CREATE TABLE IF NOT EXISTS showtimes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  cinema_id UUID REFERENCES cinemas(id) ON DELETE CASCADE,
  showtime TIMESTAMP WITH TIME ZONE NOT NULL,
  format TEXT DEFAULT '2D',
  language TEXT DEFAULT 'English',
  screen_number TEXT,
  booking_url TEXT,
  price_standard DECIMAL(5,2),
  price_vip DECIMAL(5,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent logs for tracking
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  items_found INTEGER DEFAULT 0,
  items_processed INTEGER DEFAULT 0,
  items_added INTEGER DEFAULT 0,
  items_updated INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  status TEXT DEFAULT 'running',
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE cinemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view active cinemas" ON cinemas FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view movies" ON movies FOR SELECT USING (true);
CREATE POLICY "Public can view active showtimes" ON showtimes FOR SELECT USING (is_active = true);

-- Service role full access (for API)
CREATE POLICY "Service can manage cinemas" ON cinemas FOR ALL USING (true);
CREATE POLICY "Service can manage movies" ON movies FOR ALL USING (true);
CREATE POLICY "Service can manage showtimes" ON showtimes FOR ALL USING (true);
CREATE POLICY "Service can manage agent_logs" ON agent_logs FOR ALL USING (true);

-- Seed Bahrain cinemas
INSERT INTO cinemas (name, slug, location, area, website, booking_url, has_imax, has_vip) VALUES
('Cineco - Seef Mall', 'cineco-seef', 'Seef Mall', 'Seef', 'https://www.cineco.com.bh', 'https://www.cineco.com.bh', false, true),
('Cineco - Saar Mall', 'cineco-saar', 'Saar Mall', 'Saar', 'https://www.cineco.com.bh', 'https://www.cineco.com.bh', false, false),
('Cineco - Oasis Mall', 'cineco-oasis', 'Oasis Mall', 'Juffair', 'https://www.cineco.com.bh', 'https://www.cineco.com.bh', false, true),
('Cineco - Wadi Al Sail', 'cineco-wadi-al-sail', 'Wadi Al Sail Mall', 'Riffa', 'https://www.cineco.com.bh', 'https://www.cineco.com.bh', false, false),
('VOX Cinemas - City Centre', 'vox-city-centre', 'City Centre Bahrain', 'Seef', 'https://voxcinemas.com', 'https://voxcinemas.com/bahrain', true, true),
('VOX Cinemas - The Avenues', 'vox-avenues', 'The Avenues Mall', 'Manama', 'https://voxcinemas.com', 'https://voxcinemas.com/bahrain', true, true),
('Cinepolis - Wadi Al Sail', 'cinepolis-wadi-al-sail', 'Wadi Al Sail Mall', 'Riffa', 'https://cinepolisbahrain.com', 'https://cinepolisbahrain.com', false, true),
('Mukta A2 Cinemas', 'mukta-a2', 'Juffair Mall', 'Juffair', 'https://www.muktaa2.com', 'https://www.muktaa2.com/bahrain', false, false)
ON CONFLICT (slug) DO NOTHING;
    `,
  });
}
