const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  console.log('Creating attractions, tours, and guides tables...\n');

  // Create tour_providers table first (referenced by tours)
  const tourProvidersSQL = `
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
  `;

  // Create attractions table
  const attractionsSQL = `
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
  `;

  // Create tours table
  const toursSQL = `
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
      provider_id UUID,
      provider_name TEXT,
      source TEXT DEFAULT 'manual',
      source_id TEXT,
      is_featured BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  // Create local_guides table
  const localGuidesSQL = `
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
  `;

  // Create guide_applications table
  const guideApplicationsSQL = `
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
  `;

  // Create experience_reviews table
  const experienceReviewsSQL = `
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
  `;

  // Execute all SQL statements
  const statements = [
    { name: 'tour_providers', sql: tourProvidersSQL },
    { name: 'attractions', sql: attractionsSQL },
    { name: 'tours', sql: toursSQL },
    { name: 'local_guides', sql: localGuidesSQL },
    { name: 'guide_applications', sql: guideApplicationsSQL },
    { name: 'experience_reviews', sql: experienceReviewsSQL },
  ];

  for (const { name, sql } of statements) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
      if (error) {
        // Try direct query if RPC doesn't exist
        console.log(`Note: RPC not available, table ${name} may need manual creation`);
      } else {
        console.log(`✅ Created table: ${name}`);
      }
    } catch (err) {
      console.log(`Note: ${name} - ${err.message}`);
    }
  }

  // Create indexes
  const indexStatements = [
    'CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);',
    'CREATE INDEX IF NOT EXISTS idx_attractions_active ON attractions(is_active);',
    'CREATE INDEX IF NOT EXISTS idx_attractions_featured ON attractions(is_featured);',
    'CREATE INDEX IF NOT EXISTS idx_attractions_area ON attractions(area);',
    'CREATE INDEX IF NOT EXISTS idx_tours_type ON tours(tour_type);',
    'CREATE INDEX IF NOT EXISTS idx_tours_active ON tours(is_active);',
    'CREATE INDEX IF NOT EXISTS idx_guides_active ON local_guides(is_active);',
    'CREATE INDEX IF NOT EXISTS idx_reviews_type ON experience_reviews(review_type, reference_id);',
  ];

  console.log('\nCreating indexes...');
  for (const indexSql of indexStatements) {
    try {
      await supabase.rpc('exec_sql', { sql_query: indexSql });
    } catch (err) {
      // Indexes may need manual creation
    }
  }

  console.log('\n✅ Database setup complete!');
  console.log('\nIf tables were not created automatically, please run the SQL in Supabase dashboard.');
  console.log('SQL file: supabase/migrations/20260106_create_attractions_tables.sql');
}

createTables().catch(console.error);
