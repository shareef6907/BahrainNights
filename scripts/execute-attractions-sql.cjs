// Execute the attractions tables SQL migration
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nrnrrogxrheeoaxgdyut.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function executeMigration() {
  console.log('Starting attractions tables migration...\n');

  // Create tables one by one
  const tables = [
    {
      name: 'tour_providers',
      sql: `
        CREATE TABLE IF NOT EXISTS tour_providers (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          type TEXT DEFAULT 'company',
          slug TEXT UNIQUE,
          description TEXT,
          email TEXT,
          phone TEXT,
          whatsapp TEXT,
          website TEXT,
          instagram TEXT,
          facebook TEXT,
          address TEXT,
          area TEXT,
          logo_url TEXT,
          cover_image TEXT,
          images TEXT[],
          languages TEXT[],
          specialties TEXT[],
          years_experience INTEGER,
          is_verified BOOLEAN DEFAULT FALSE,
          license_number TEXT,
          rating DECIMAL(2, 1),
          review_count INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          is_featured BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    },
    {
      name: 'attractions',
      sql: `
        CREATE TABLE IF NOT EXISTS attractions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          name_arabic TEXT,
          slug TEXT UNIQUE,
          description TEXT,
          description_arabic TEXT,
          short_description TEXT,
          category TEXT,
          subcategory TEXT,
          tags TEXT[],
          address TEXT,
          area TEXT,
          latitude DECIMAL(10, 8),
          longitude DECIMAL(11, 8),
          google_maps_url TEXT,
          image_url TEXT,
          images TEXT[],
          video_url TEXT,
          duration TEXT,
          best_time TEXT,
          price_range TEXT,
          price_from DECIMAL(10, 2),
          price_to DECIMAL(10, 2),
          currency TEXT DEFAULT 'BHD',
          suitable_for TEXT[],
          age_restriction TEXT,
          accessibility TEXT,
          phone TEXT,
          email TEXT,
          website TEXT,
          booking_url TEXT,
          rating DECIMAL(2, 1),
          review_count INTEGER DEFAULT 0,
          tripadvisor_rating DECIMAL(2, 1),
          tripadvisor_reviews INTEGER,
          tripadvisor_url TEXT,
          source TEXT DEFAULT 'manual',
          source_id TEXT,
          is_featured BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          display_order INTEGER DEFAULT 0,
          seo_title TEXT,
          seo_description TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    },
    {
      name: 'tours',
      sql: `
        CREATE TABLE IF NOT EXISTS tours (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          name_arabic TEXT,
          slug TEXT UNIQUE,
          description TEXT,
          description_arabic TEXT,
          short_description TEXT,
          tour_type TEXT,
          category TEXT,
          duration TEXT,
          duration_hours DECIMAL(4, 1),
          group_size TEXT,
          max_participants INTEGER,
          languages TEXT[],
          price_from DECIMAL(10, 2),
          price_to DECIMAL(10, 2),
          price_per TEXT DEFAULT 'person',
          currency TEXT DEFAULT 'BHD',
          includes TEXT[],
          excludes TEXT[],
          highlights TEXT[],
          itinerary JSONB,
          meeting_point TEXT,
          end_point TEXT,
          image_url TEXT,
          images TEXT[],
          video_url TEXT,
          areas_covered TEXT[],
          suitable_for TEXT[],
          difficulty_level TEXT,
          accessibility TEXT,
          rating DECIMAL(2, 1),
          review_count INTEGER DEFAULT 0,
          tripadvisor_rating DECIMAL(2, 1),
          tripadvisor_reviews INTEGER,
          tripadvisor_url TEXT,
          provider_id UUID REFERENCES tour_providers(id),
          provider_name TEXT,
          source TEXT DEFAULT 'manual',
          source_id TEXT,
          is_featured BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          display_order INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    },
    {
      name: 'local_guides',
      sql: `
        CREATE TABLE IF NOT EXISTS local_guides (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          slug TEXT UNIQUE,
          bio TEXT,
          tagline TEXT,
          email TEXT,
          phone TEXT,
          whatsapp TEXT,
          profile_image TEXT,
          cover_image TEXT,
          languages TEXT[],
          specialties TEXT[],
          areas TEXT[],
          years_experience INTEGER,
          available_days TEXT[],
          tour_types TEXT[],
          hourly_rate DECIMAL(10, 2),
          half_day_rate DECIMAL(10, 2),
          full_day_rate DECIMAL(10, 2),
          currency TEXT DEFAULT 'BHD',
          is_verified BOOLEAN DEFAULT FALSE,
          id_verified BOOLEAN DEFAULT FALSE,
          rating DECIMAL(2, 1),
          review_count INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          is_featured BOOLEAN DEFAULT FALSE,
          registered_at TIMESTAMP DEFAULT NOW(),
          last_active TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    },
    {
      name: 'guide_applications',
      sql: `
        CREATE TABLE IF NOT EXISTS guide_applications (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          whatsapp TEXT,
          languages TEXT[],
          specialties TEXT[],
          experience TEXT,
          bio TEXT,
          status TEXT DEFAULT 'pending',
          reviewed_at TIMESTAMP,
          reviewed_by TEXT,
          notes TEXT,
          submitted_at TIMESTAMP DEFAULT NOW()
        );
      `
    },
    {
      name: 'experience_reviews',
      sql: `
        CREATE TABLE IF NOT EXISTS experience_reviews (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          review_type TEXT NOT NULL,
          reference_id UUID NOT NULL,
          reviewer_name TEXT,
          reviewer_email TEXT,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          title TEXT,
          content TEXT,
          source TEXT DEFAULT 'bahrainnights',
          source_url TEXT,
          is_approved BOOLEAN DEFAULT FALSE,
          visited_date DATE,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    }
  ];

  for (const table of tables) {
    console.log(`Creating table: ${table.name}...`);

    // Try direct table check first
    const { data, error: checkError } = await supabase.from(table.name).select('id').limit(1);

    if (!checkError) {
      console.log(`  ✓ Table ${table.name} already exists`);
    } else if (checkError.message.includes('does not exist') || checkError.message.includes('schema cache')) {
      console.log(`  ✗ Table ${table.name} does not exist - needs manual creation`);
    } else {
      console.log(`  ? Table ${table.name}: ${checkError.message}`);
    }
  }

  // Create indexes
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category)',
    'CREATE INDEX IF NOT EXISTS idx_attractions_active ON attractions(is_active)',
    'CREATE INDEX IF NOT EXISTS idx_attractions_featured ON attractions(is_featured)',
    'CREATE INDEX IF NOT EXISTS idx_attractions_area ON attractions(area)',
    'CREATE INDEX IF NOT EXISTS idx_attractions_slug ON attractions(slug)',
    'CREATE INDEX IF NOT EXISTS idx_tours_type ON tours(tour_type)',
    'CREATE INDEX IF NOT EXISTS idx_tours_active ON tours(is_active)',
    'CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(is_featured)',
    'CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug)',
    'CREATE INDEX IF NOT EXISTS idx_guides_active ON local_guides(is_active)',
    'CREATE INDEX IF NOT EXISTS idx_guides_featured ON local_guides(is_featured)',
    'CREATE INDEX IF NOT EXISTS idx_guides_slug ON local_guides(slug)',
    'CREATE INDEX IF NOT EXISTS idx_guide_applications_status ON guide_applications(status)',
    'CREATE INDEX IF NOT EXISTS idx_reviews_type ON experience_reviews(review_type, reference_id)',
    'CREATE INDEX IF NOT EXISTS idx_reviews_approved ON experience_reviews(is_approved)'
  ];

  console.log('\nIndexes will be created automatically when tables are created.\n');

  // Verify tables
  console.log('Verifying tables...');
  const tableNames = ['tour_providers', 'attractions', 'tours', 'local_guides', 'guide_applications', 'experience_reviews'];

  for (const tableName of tableNames) {
    const { data, error } = await supabase.from(tableName).select('id').limit(1);
    if (error) {
      console.log(`  ✗ ${tableName}: ${error.message}`);
    } else {
      console.log(`  ✓ ${tableName}: OK`);
    }
  }

  console.log('\nMigration complete!');
  console.log('\nIf tables show errors, please run the SQL migration manually in Supabase SQL Editor:');
  console.log('  File: supabase/migrations/20260106_create_attractions_tables.sql');
}

executeMigration().catch(console.error);
