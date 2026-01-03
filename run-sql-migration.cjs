const https = require('https');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sql = `
ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES venues(id) ON DELETE SET NULL;
ALTER TABLE events ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE events ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT FALSE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_pattern TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_days TEXT[];
ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery TEXT[];
ALTER TABLE events ADD COLUMN IF NOT EXISTS age_restriction TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS dress_code TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS special_instructions TEXT;
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
UPDATE events SET view_count = COALESCE(views, 0) WHERE view_count IS NULL OR view_count = 0;
`;

const url = new URL(SUPABASE_URL);
const options = {
  hostname: url.hostname,
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': 'Bearer ' + SERVICE_KEY,
    'Prefer': 'return=representation'
  }
};

console.log('Attempting to run migration via Supabase API...');
console.log('URL:', SUPABASE_URL);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
});

req.write(JSON.stringify({ sql }));
req.end();
