const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Starting Cinema Schema Migration...\n');

  // Check current movies table structure
  console.log('Checking existing movies table structure...');
  const { data: sampleMovie, error: sampleError } = await supabase
    .from('movies')
    .select('*')
    .limit(1);

  if (sampleError) {
    console.error('Error accessing movies table:', sampleError.message);
    return;
  }

  const existingColumns = sampleMovie && sampleMovie.length > 0
    ? Object.keys(sampleMovie[0])
    : [];

  console.log('Existing columns:', existingColumns.join(', '));

  // Check cinema_chains table
  console.log('\nChecking cinema_chains table...');
  const { data: chainsData, error: chainsError } = await supabase
    .from('cinema_chains')
    .select('*')
    .limit(1);

  if (chainsError) {
    if (chainsError.code === '42P01') {
      console.log('❌ cinema_chains table does not exist - needs to be created');
    } else {
      console.log('⚠️ cinema_chains error:', chainsError.message);
    }
  } else {
    console.log('✅ cinema_chains table exists');

    // Insert default chains if empty
    const { count } = await supabase
      .from('cinema_chains')
      .select('*', { count: 'exact', head: true });

    if (count === 0) {
      console.log('Inserting default cinema chains...');
      const chains = [
        { name: 'VOX Cinemas', slug: 'vox', website: 'https://www.voxcinemas.com', is_active: true, display_order: 1 },
        { name: 'Cineco', slug: 'cineco', website: 'https://www.cineco.com', is_active: true, display_order: 2 },
        { name: 'Mukta A2 Cinemas', slug: 'mukta', website: 'https://www.muktaa2.com', is_active: true, display_order: 3 },
        { name: 'Seef Cinemas', slug: 'seef', website: 'https://www.seefcinemas.com', is_active: true, display_order: 4 },
      ];

      for (const chain of chains) {
        const { error: insertError } = await supabase
          .from('cinema_chains')
          .insert(chain);

        if (insertError) {
          console.log(`⚠️ ${chain.name}:`, insertError.message);
        } else {
          console.log(`✅ Added: ${chain.name}`);
        }
      }
    } else {
      console.log(`✅ cinema_chains has ${count} entries`);
    }
  }

  // Check movie_showtimes table
  console.log('\nChecking movie_showtimes table...');
  const { error: showtimesError } = await supabase
    .from('movie_showtimes')
    .select('id')
    .limit(1);

  if (showtimesError) {
    if (showtimesError.code === '42P01') {
      console.log('❌ movie_showtimes table does not exist - needs to be created');
    } else {
      console.log('⚠️ movie_showtimes error:', showtimesError.message);
    }
  } else {
    console.log('✅ movie_showtimes table exists');
  }

  // Test updating a movie to verify columns work
  console.log('\nTesting column availability...');

  // Required columns for cinema admin
  const requiredColumns = [
    'title', 'slug', 'poster_url', 'backdrop_url', 'trailer_url',
    'title_arabic', 'description', 'description_arabic', 'genre',
    'duration', 'rating', 'imdb_rating', 'release_date', 'director',
    'cast', 'language', 'subtitle_languages', 'status', 'is_featured',
    'is_active', 'display_order', 'source', 'created_at', 'updated_at'
  ];

  const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

  if (missingColumns.length > 0) {
    console.log('\n⚠️ Missing columns in movies table:');
    missingColumns.forEach(col => console.log(`  - ${col}`));
    console.log('\nRun this SQL in Supabase dashboard to add them:');
    console.log('');

    const columnDefs = {
      'poster_url': 'TEXT',
      'backdrop_url': 'TEXT',
      'trailer_url': 'TEXT',
      'title_arabic': 'TEXT',
      'description': 'TEXT',
      'description_arabic': 'TEXT',
      'genre': 'TEXT',
      'duration': 'INTEGER',
      'rating': 'TEXT',
      'imdb_rating': 'DECIMAL(3,1)',
      'release_date': 'DATE',
      'director': 'TEXT',
      'cast': 'TEXT[]',
      'language': 'TEXT',
      'subtitle_languages': 'TEXT[]',
      'status': "TEXT DEFAULT 'now_showing'",
      'is_featured': 'BOOLEAN DEFAULT FALSE',
      'is_active': 'BOOLEAN DEFAULT TRUE',
      'display_order': 'INTEGER DEFAULT 0',
      'source': "TEXT DEFAULT 'manual'",
      'source_id': 'TEXT',
      'created_at': 'TIMESTAMP DEFAULT NOW()',
      'updated_at': 'TIMESTAMP DEFAULT NOW()',
    };

    missingColumns.forEach(col => {
      if (columnDefs[col]) {
        console.log(`ALTER TABLE movies ADD COLUMN IF NOT EXISTS ${col} ${columnDefs[col]};`);
      }
    });
  } else {
    console.log('✅ All required columns exist in movies table');
  }

  // Get movie count and display stats
  console.log('\n--- Database Stats ---');
  const { count: movieCount } = await supabase
    .from('movies')
    .select('*', { count: 'exact', head: true });

  console.log(`Total Movies: ${movieCount}`);

  // Count by status if the column exists
  if (existingColumns.includes('status')) {
    const { data: statusData } = await supabase
      .from('movies')
      .select('status');

    if (statusData) {
      const statusCounts = {};
      statusData.forEach(m => {
        const status = m.status || 'unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      console.log('By Status:', statusCounts);
    }
  }

  console.log('\n✅ Migration check complete!');
}

runMigration().catch(console.error);
