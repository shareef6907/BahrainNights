import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkColumns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get first event with all columns to see what's available
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== EVENT COLUMNS ===');
  console.log(JSON.stringify(data, null, 2));
}

checkColumns().catch(console.error);
