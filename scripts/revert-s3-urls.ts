/**
 * REVERT S3 URL Migration Script
 * Restores all venue image URLs from new us-east-1 bucket back to old me-south-1 bucket
 * EXCEPT venues that actually have files in the new bucket: "test-new-" and "bh-nights"
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

const NEW_HOST = 'bahrainnights-production-us.s3.us-east-1.amazonaws.com';
const OLD_HOST = 'bahrainnights-production.s3.me-south-1.amazonaws.com';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function revertUrls() {
  console.log('REVERTING S3 URL migration...');
  console.log(`FROM: ${NEW_HOST}`);
  console.log(`TO: ${OLD_HOST}`);
  console.log('EXCLUDING: test-new-, bh-nights (have files in new bucket)\n');

  // Get all venues with image URLs pointing to new bucket
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, slug, logo_url, cover_image_url, gallery');

  if (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }

  const excluded = ['test-new-', 'bh-nights', 'bh nights'];
  let reverted = 0;
  let skipped = 0;
  let errors = 0;

  for (const venue of venues) {
    // Skip venues that should stay on new bucket
    if (excluded.some(e => venue.slug?.toLowerCase().includes(e.toLowerCase()))) {
      console.log(`SKIP (keep on new bucket): ${venue.name} (${venue.slug})`);
      skipped++;
      continue;
    }

    // Check if any images point to new bucket
    const hasNewLogo = venue.logo_url?.includes(NEW_HOST);
    const hasNewCover = venue.cover_image_url?.includes(NEW_HOST);
    const hasNewGallery = Array.isArray(venue.gallery) &&
      venue.gallery.some((url: string) => url.includes(NEW_HOST));

    if (!hasNewLogo && !hasNewCover && !hasNewGallery) {
      skipped++;
      continue;
    }

    let newLogo = venue.logo_url;
    let newCover = venue.cover_image_url;
    let newGallery = venue.gallery;

    if (hasNewLogo) newLogo = venue.logo_url!.replace(NEW_HOST, OLD_HOST);
    if (hasNewCover) newCover = venue.cover_image_url!.replace(NEW_HOST, OLD_HOST);
    if (hasNewGallery) {
      newGallery = venue.gallery.map((url: string) =>
        url.includes(NEW_HOST) ? url.replace(NEW_HOST, OLD_HOST) : url
      );
    }

    const { error: updateError } = await supabase
      .from('venues')
      .update({
        ...(newLogo && { logo_url: newLogo }),
        ...(newCover && { cover_image_url: newCover }),
        ...(newGallery && { gallery: newGallery }),
      })
      .eq('id', venue.id);

    if (updateError) {
      console.error(`Error reverting ${venue.name}:`, updateError.message);
      errors++;
    } else {
      const changes = [];
      if (hasNewLogo) changes.push('logo');
      if (hasNewCover) changes.push('cover');
      if (hasNewGallery) changes.push('gallery');
      console.log(`REVERTED [${changes.join(', ')}]: ${venue.name} (${venue.slug})`);
      reverted++;
    }
  }

  console.log(`\nRevert complete:`);
  console.log(`  Reverted: ${reverted}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Errors: ${errors}`);

  process.exit(errors > 0 ? 1 : 0);
}

revertUrls();