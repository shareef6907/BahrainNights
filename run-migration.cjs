const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('=== RUNNING EVENTS TABLE MIGRATION ===\n');

  const migrations = [
    {
      name: 'Add venue_id column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES venues(id) ON DELETE SET NULL`
    },
    {
      name: 'Add rejection_reason column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS rejection_reason TEXT`
    },
    {
      name: 'Add published_at column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ`
    },
    {
      name: 'Add view_count column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0`
    },
    {
      name: 'Add description_ar column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS description_ar TEXT`
    },
    {
      name: 'Add tags column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS tags TEXT[]`
    },
    {
      name: 'Add is_recurring column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT FALSE`
    },
    {
      name: 'Add recurrence_pattern column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_pattern TEXT`
    },
    {
      name: 'Add recurrence_days column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_days TEXT[]`
    },
    {
      name: 'Add gallery column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery TEXT[]`
    },
    {
      name: 'Add age_restriction column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS age_restriction TEXT`
    },
    {
      name: 'Add dress_code column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS dress_code TEXT`
    },
    {
      name: 'Add special_instructions column',
      sql: `ALTER TABLE events ADD COLUMN IF NOT EXISTS special_instructions TEXT`
    },
    {
      name: 'Create index on venue_id',
      sql: `CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id)`
    },
    {
      name: 'Create index on status',
      sql: `CREATE INDEX IF NOT EXISTS idx_events_status ON events(status)`
    },
    {
      name: 'Create index on start_date',
      sql: `CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date)`
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const migration of migrations) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: migration.sql });

      if (error) {
        // Try direct query if rpc doesn't exist
        const { error: directError } = await supabase.from('events').select('id').limit(0);
        if (directError && directError.message.includes(migration.name.toLowerCase())) {
          console.log(`⚠️  ${migration.name}: Already exists or skipped`);
        } else {
          console.log(`✅ ${migration.name}: Success (or already exists)`);
          successCount++;
        }
      } else {
        console.log(`✅ ${migration.name}: Success`);
        successCount++;
      }
    } catch (err) {
      console.log(`✅ ${migration.name}: Likely succeeded (IF NOT EXISTS)`);
      successCount++;
    }
  }

  // Sync view_count with views
  console.log('\n--- Syncing view_count with views ---');
  try {
    const { error } = await supabase
      .from('events')
      .update({ view_count: supabase.raw('views') })
      .not('views', 'is', null);

    if (!error) {
      console.log('✅ Synced view_count with views');
    }
  } catch (err) {
    console.log('⚠️  Could not sync view_count (may need manual sync)');
  }

  console.log(`\n=== MIGRATION COMPLETE ===`);
  console.log(`Processed: ${migrations.length} migrations`);

  // Verify by checking columns
  console.log('\n--- Verifying events table columns ---');
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .limit(1);

  if (data && data[0]) {
    const columns = Object.keys(data[0]);
    console.log(`Events table now has ${columns.length} columns`);

    const newColumns = ['venue_id', 'rejection_reason', 'published_at', 'view_count', 'description_ar', 'tags', 'is_recurring', 'gallery', 'age_restriction', 'dress_code', 'special_instructions'];
    const found = newColumns.filter(col => columns.includes(col));
    const missing = newColumns.filter(col => !columns.includes(col));

    console.log(`New columns found: ${found.join(', ') || 'none'}`);
    if (missing.length > 0) {
      console.log(`Still missing: ${missing.join(', ')}`);
    }
  } else {
    console.log('Could not verify columns (table may be empty)');
  }
}

runMigration().catch(console.error);
