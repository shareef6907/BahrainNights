/**
 * S3 URL Migration Script
 * Updates all venue image URLs in the database from old me-south-1 bucket to new us-east-1 bucket
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
for (const line of envFile.split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && rest.length > 0) {
    process.env[key.trim()] = rest.join('=').trim();
  }
}

const OLD_HOST = 'bahrainnights-production.s3.me-south-1.amazonaws.com';
const NEW_HOST = 'bahrainnights-production-us.s3.us-east-1.amazonaws.com';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrateUrls() {
  console.log('Starting S3 URL migration (logo + cover + gallery)...');
  console.log(`OLD: ${OLD_HOST}`);
  console.log(`NEW: ${NEW_HOST}\n`);

  // Count affected records
  const { count: totalCount } = await supabase
    .from('venues')
    .select('*', { count: 'exact', head: true });

  console.log(`Total venues in database: ${totalCount}`);

  // Get all venues with their image fields
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, logo_url, cover_image_url, gallery');

  if (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const venue of venues) {
    let newLogo = venue.logo_url;
    let newCover = venue.cover_image_url;
    let newGallery = venue.gallery;

    if (venue.logo_url?.includes(OLD_HOST)) {
      newLogo = venue.logo_url.replace(OLD_HOST, NEW_HOST);
    }
    if (venue.cover_image_url?.includes(OLD_HOST)) {
      newCover = venue.cover_image_url.replace(OLD_HOST, NEW_HOST);
    }
    if (Array.isArray(venue.gallery) && venue.gallery.length > 0) {
      const migratedGallery = venue.gallery.map((url: string) =>
        url.includes(OLD_HOST) ? url.replace(OLD_HOST, NEW_HOST) : url
      );
      if (migratedGallery.some((url: string) => url.includes(NEW_HOST))) {
        newGallery = migratedGallery;
      }
    }

    if (newLogo !== venue.logo_url || newCover !== venue.cover_image_url || newGallery !== venue.gallery) {
      const { error: updateError } = await supabase
        .from('venues')
        .update({
          ...(newLogo !== venue.logo_url && { logo_url: newLogo }),
          ...(newCover !== venue.cover_image_url && { cover_image_url: newCover }),
          ...(newGallery !== venue.gallery && { gallery: newGallery }),
        })
        .eq('id', venue.id);

      if (updateError) {
        console.error(`Error updating ${venue.name}:`, updateError.message);
        errors++;
      } else {
        const changes = [];
        if (newLogo !== venue.logo_url) changes.push('logo');
        if (newCover !== venue.cover_image_url) changes.push('cover');
        if (newGallery !== venue.gallery) changes.push('gallery');
        console.log(`Updated [${changes.join(', ')}]: ${venue.name}`);
        updated++;
      }
    } else {
      skipped++;
    }
  }

  console.log(`\nMigration complete:`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Errors: ${errors}`);

  process.exit(errors > 0 ? 1 : 0);
}

migrateUrls();