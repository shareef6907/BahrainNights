import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function restoreMovies() {
  const movieIds = [
    '94017cc8-9552-49ce-a6c5-f8fe48ac08dc', // The Devil Wears Prada 2
    '3ddd0458-d67a-424c-80b0-a5073be9d139', // I Swear
    '6d9d2c3d-cedb-4fb1-9867-50454fc377d8', // Project Hail Mary
    'f1b3345d-0fe6-450e-9221-f751d49c5251', // Kara
    '525b0666-3089-4d13-9bd7-204b21844f13', // Crime 101
    'cbd10492-a916-43f2-86c8-364796662cae', // GOAT
    '8fcf4a2c-7b73-4bd6-8dc3-656cf1b00f6f', // Hoppers
    'b01430e3-899a-4307-868e-b8958879fcf3', // Michael
  ];

  const { error } = await supabase
    .from('movies')
    .update({ is_now_showing: true, updated_at: new Date().toISOString() })
    .in('id', movieIds);

  if (error) {
    console.error('Restore failed:', error.message);
    process.exit(1);
  }

  console.log('Restored', movieIds.length, 'movies to Now Showing');
}

restoreMovies();