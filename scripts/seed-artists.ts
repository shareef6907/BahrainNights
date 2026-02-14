/**
 * Seed script for initial Vibes Bahrain artists
 * Run with: npx tsx scripts/seed-artists.ts
 */

import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize S3
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || 'bahrainnights-production';
const REGION = process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1';
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

// Artist data to seed
interface ArtistSeed {
  stage_name: string;
  category: 'dj' | 'vocalist' | 'instrumentalist' | 'band' | 'fire_show' | 'performer' | 'kids_entertainment' | 'magician';
  subcategory?: string;
  filename: string; // File on Desktop
}

const ARTISTS: ArtistSeed[] = [
  // DJs (8)
  { stage_name: 'DJ Hope', category: 'dj', filename: 'DJ Hope.png' },
  { stage_name: 'DJ Alona', category: 'dj', filename: 'DJ Alona.png' },
  { stage_name: 'DK Skaay', category: 'dj', filename: 'DK Skaay.png' },
  { stage_name: 'DJ Mariika', category: 'dj', filename: 'DJ Mariika.png' },
  { stage_name: 'DJ Ryde', category: 'dj', filename: 'DJ Ryde.png' },
  { stage_name: 'DJ Player', category: 'dj', filename: 'DJ Player.png' },
  { stage_name: 'DJ Aaron Wolf', category: 'dj', filename: 'DJ Aaron Wolf.png' },
  { stage_name: 'DJ Lisa', category: 'dj', filename: 'DJ Lisa.png' },

  // Instrumentalists (9)
  { stage_name: 'Violinist 1', category: 'instrumentalist', subcategory: 'violinist', filename: 'Violinst 1.png' },
  { stage_name: 'Guitarist 1', category: 'instrumentalist', subcategory: 'guitarist', filename: 'Guitarist 1 .png' },
  { stage_name: 'Guitarist 2', category: 'instrumentalist', subcategory: 'guitarist', filename: 'Guitarist 2 .png' },
  { stage_name: 'Oud Player 1', category: 'instrumentalist', subcategory: 'oud_player', filename: 'Oud player 1 .png' },
  { stage_name: 'Qanun Player', category: 'instrumentalist', subcategory: 'kanun_player', filename: 'Qanun:kanun player.png' },
  { stage_name: 'Harpist 1', category: 'instrumentalist', subcategory: 'harpist', filename: 'Harpist 1.png' },
  { stage_name: 'Pianist 1', category: 'instrumentalist', subcategory: 'pianist', filename: 'Pianist 1.png' },
  { stage_name: 'Franky Flowers', category: 'instrumentalist', subcategory: 'saxophonist', filename: 'Saxophonist - Franky Flowers.png' },
  { stage_name: 'Drummer 1', category: 'instrumentalist', subcategory: 'drummer', filename: 'Dummer 1.png' },

  // Vocalists (2)
  { stage_name: 'Vocalist 1', category: 'vocalist', filename: 'Vocalist 1.png' },
  { stage_name: 'Vocalist 2', category: 'vocalist', filename: 'Vocalist 2 .png' },

  // Band (1)
  { stage_name: 'Band 1', category: 'band', filename: 'Band 1.png' },

  // Fire Shows (4)
  { stage_name: 'Fire Show 1', category: 'fire_show', filename: 'Fireshow 1 .png' },
  { stage_name: 'Fire Show 2', category: 'fire_show', filename: 'Fireshow 2.png' },
  { stage_name: 'Fire Show 3', category: 'fire_show', filename: 'Fireshow 3 .png' },
  { stage_name: 'Fire Show 4', category: 'fire_show', filename: 'Fireshow 4.png' },

  // Performers (5)
  { stage_name: 'Performers 1', category: 'performer', filename: 'Performers.png' },
  { stage_name: 'Performers 2', category: 'performer', filename: 'Performers 2 .png' },
  { stage_name: 'Performers 3', category: 'performer', filename: 'performers 3 .png' },
  { stage_name: 'Performers 4', category: 'performer', filename: 'performers 4 .png' },
  { stage_name: 'Performers 5', category: 'performer', filename: 'performers 5 .png' },

  // Kids Entertainment (3)
  { stage_name: 'Magician Kids Show', category: 'kids_entertainment', filename: 'Magician:kids show.png' },
  { stage_name: 'Kids Entertainment', category: 'kids_entertainment', filename: 'kids entertainment.png' },
  { stage_name: 'Kids Activities', category: 'kids_entertainment', filename: 'kids activities..png' },

  // Magician (1)
  { stage_name: 'Magician', category: 'magician', filename: 'Magician.png' },
];

// Generate slug from stage name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Upload image to S3
async function uploadToS3(filePath: string, key: string, contentType: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  }));

  return `${S3_BASE_URL}/${key}`;
}

async function seedArtists() {
  console.log('🎭 Starting artist seed...\n');

  const desktopPath = path.join(process.env.HOME || '', 'Desktop');
  let successCount = 0;
  let errorCount = 0;

  for (const artist of ARTISTS) {
    const filePath = path.join(desktopPath, artist.filename);
    const slug = generateSlug(artist.stage_name);
    
    console.log(`Processing: ${artist.stage_name}...`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${artist.filename}`);
      errorCount++;
      continue;
    }

    try {
      // Upload image to S3
      const s3Key = `processed/artists/${slug}/profile.png`;
      console.log(`  📤 Uploading to S3: ${s3Key}`);
      const imageUrl = await uploadToS3(filePath, s3Key, 'image/png');

      // Insert artist into database
      const { error } = await supabase.from('artists').upsert({
        stage_name: artist.stage_name,
        slug,
        category: artist.category,
        subcategory: artist.subcategory || null,
        status: 'approved',
        tier: 'vibes',
        profile_image: imageUrl,
        is_featured: false,
        display_order: 0,
        instagram_verified: true, // Vibes artists have @vibesbahrain
      }, {
        onConflict: 'slug',
      });

      if (error) {
        console.log(`  ❌ Database error: ${error.message}`);
        errorCount++;
      } else {
        console.log(`  ✅ Created: ${artist.stage_name}`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error: ${err instanceof Error ? err.message : String(err)}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${ARTISTS.length}`);
}

// Upload header video
async function uploadHeaderVideo() {
  const videoPath = path.join(process.env.HOME || '', 'Documents', 'Artist Header Video final.mp4');
  
  if (!fs.existsSync(videoPath)) {
    console.log('⚠️  Header video not found at:', videoPath);
    return;
  }

  console.log('🎬 Uploading header video...');
  
  try {
    const s3Key = 'processed/artists/header-video.mp4';
    const url = await uploadToS3(videoPath, s3Key, 'video/mp4');
    console.log('✅ Header video uploaded:', url);
  } catch (err) {
    console.log('❌ Failed to upload header video:', err);
  }
}

async function main() {
  // First upload the header video
  await uploadHeaderVideo();
  
  console.log('\n');
  
  // Then seed the artists
  await seedArtists();
}

main().catch(console.error);
