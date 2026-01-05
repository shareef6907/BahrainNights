const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' }
});

async function createOffersTable() {
  console.log('Checking if offers table exists...');

  // First check if table exists by trying to query it
  const { data: existingCheck, error: checkError } = await supabase
    .from('offers')
    .select('id')
    .limit(1);

  if (!checkError) {
    console.log('✅ Offers table already exists!');

    // Show current offers count
    const { count } = await supabase
      .from('offers')
      .select('*', { count: 'exact', head: true });
    console.log(`   Current offers count: ${count || 0}`);
    return true;
  }

  if (checkError.code === 'PGRST205') {
    console.log('❌ Offers table does not exist.');
    console.log('\n=== MANUAL STEP REQUIRED ===');
    console.log('Please run the following SQL in the Supabase Dashboard SQL Editor:');
    console.log('Dashboard URL: https://supabase.com/dashboard/project/nrnrrogxrheeoaxgdyut/sql');
    console.log('\n--- COPY SQL BELOW ---\n');

    const sql = `-- Create offers table for BahrainNights.com
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  created_by UUID,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  offer_type VARCHAR(50) NOT NULL CHECK (offer_type IN ('ladies-night', 'brunch', 'happy-hour', 'special-deal', 'buy1get1', 'buffet')),
  days_available TEXT[] NOT NULL DEFAULT '{}',
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  valid_from DATE,
  valid_until DATE,
  is_ongoing BOOLEAN DEFAULT TRUE,
  whats_included TEXT[],
  terms_conditions TEXT,
  reservation_required BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'expired', 'paused')),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_offers_venue_id ON public.offers(venue_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON public.offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_offer_type ON public.offers(offer_type);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON public.offers(created_at);

-- Enable Row Level Security
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active offers
CREATE POLICY "Public can view active offers" ON public.offers
  FOR SELECT USING (status = 'active');

-- Policy: Service role can do everything (for API)
CREATE POLICY "Service role full access" ON public.offers
  FOR ALL USING (true);`;

    console.log(sql);
    console.log('\n--- END SQL ---\n');
    return false;
  }

  console.error('Unexpected error:', checkError);
  return false;
}

createOffersTable()
  .then(exists => {
    if (exists) {
      console.log('\n✅ Ready to use offers feature!');
    } else {
      console.log('\n⚠️  After running the SQL, run this script again to verify.');
    }
  })
  .catch(console.error);
