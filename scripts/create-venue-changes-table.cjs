const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTable() {
  console.log('Checking if venue_change_requests table exists...');

  // First check if table exists
  const { data, error: checkError } = await supabase
    .from('venue_change_requests')
    .select('id')
    .limit(1);

  if (!checkError) {
    console.log('Table already exists!');
    return;
  }

  if (checkError.code !== '42P01') {
    console.log('Unexpected error:', checkError);
    return;
  }

  console.log('Table does not exist. Please create it using Supabase SQL Editor.');
  console.log('\nSQL to execute in Supabase SQL Editor:');
  console.log('========================================');
  console.log(`
CREATE TABLE venue_change_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  venue_name VARCHAR(500) NOT NULL,
  changes JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_venue_change_requests_venue_id ON venue_change_requests(venue_id);
CREATE INDEX idx_venue_change_requests_status ON venue_change_requests(status);

-- Enable RLS
ALTER TABLE venue_change_requests ENABLE ROW LEVEL SECURITY;

-- Policy for service role access
CREATE POLICY "Service role has full access" ON venue_change_requests
  FOR ALL
  USING (true)
  WITH CHECK (true);
  `);
}

createTable();
