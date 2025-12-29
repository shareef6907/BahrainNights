/**
 * Fix Event Categories Script
 * Re-categorizes miscategorized events using keyword detection
 *
 * Run: npx tsx scrapers/events/fix-event-categories.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

/**
 * Comprehensive category keywords - ordered by priority (more specific first)
 */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  // Sports keywords - comprehensive list to catch fitness, racing, etc.
  sports: [
    'fitness', 'racing', 'race', 'track', 'on track', 'circuit', 'international circuit',
    'equestrian', 'horse racing', 'horseracing', 'turf club', 'horse', 'polo',
    'marathon', 'run', 'running', 'triathlon', 'cycling', 'bike',
    'football', 'soccer', 'cricket', 'tennis', 'golf', 'basketball', 'volleyball',
    'swimming', 'diving', 'water sports', 'jet ski', 'kayak',
    'gym', 'workout', 'crossfit', 'athletic', 'sport', 'sports',
    'championship', 'tournament', 'league', 'match', 'game', 'competition',
    'stadium', 'arena', 'court', 'field',
    'f1', 'formula', 'grand prix', 'motorsport', 'karting', 'go-kart',
    'batelco fitness', 'bahrain turf', 'rashid equestrian',
  ],
  // Music keywords
  music: [
    'concert', 'live music', 'live performance', 'in concert',
    'orchestra', 'symphony', 'philharmonic', 'musical',
    'singer', 'artist', 'performer', 'band', 'musician',
    'world tour', 'tour', 'amphitheatre', 'amphitheater',
    'linkin park', 'john mayer', 'calvin harris', 'andre rieu', 'josh groban',
    'al dana', 'beyon al dana',
  ],
  // Dining keywords
  dining: [
    'brunch', 'dinner', 'lunch', 'breakfast', 'buffet',
    'restaurant', 'café', 'cafe', 'bistro', 'eatery',
    'food festival', 'culinary', 'chef', 'cuisine', 'gastronomy',
    'ladies night', 'happy hour', 'drinks', 'cocktail',
    'iftar', 'suhoor', 'afternoon tea', 'high tea',
    'roast', 'coffee', 'tea house',
  ],
  // Nightlife keywords
  nightlife: [
    'club night', 'nightclub', 'clubbing',
    'party', 'dance party', 'dj night', 'dj set',
    'bar', 'lounge', 'pub', 'after dark',
    'ladies night', 'gents night',
  ],
  // Arts keywords
  arts: [
    'exhibition', 'gallery', 'art show', 'art exhibition',
    'museum', 'sculpture', 'painting', 'photography',
    'theater', 'theatre', 'play', 'drama', 'opera', 'ballet',
    'cultural', 'heritage', 'traditional', 'folklore',
    'riwaq', 'art space', 'bahrain national museum',
  ],
  // Family keywords
  family: [
    'kids', 'children', 'child', 'family', 'families',
    'playground', 'fun zone', 'play area',
    'carnival', 'circus', 'puppet', 'magic show',
    'theme park', 'water park', 'amusement',
    'school', 'educational', 'learning',
  ],
  // Wellness keywords
  wellness: [
    'spa', 'massage', 'facial', 'beauty',
    'yoga', 'meditation', 'mindfulness', 'zen',
    'wellness', 'wellbeing', 'health', 'healing',
    'retreat', 'detox', 'cleanse',
    'fitness class', 'pilates', 'barre',
  ],
  // Shopping keywords
  shopping: [
    'market', 'bazaar', 'souk', 'souq',
    'shopping', 'sale', 'discount', 'offers',
    'pop-up', 'popup', 'craft fair', 'artisan',
    'mall', 'retail', 'boutique',
    'farmers market', 'flea market', 'night market',
  ],
  // Business keywords
  business: [
    'conference', 'summit', 'forum', 'congress',
    'seminar', 'workshop', 'training', 'masterclass',
    'networking', 'business', 'corporate', 'professional',
    'expo', 'trade show', 'exhibition', 'b2b',
    'entrepreneur', 'startup', 'innovation',
  ],
  // Community keywords
  community: [
    'festival', 'celebration', 'fiesta',
    'charity', 'fundraiser', 'volunteer', 'donation',
    'community', 'public', 'free event',
    'national day', 'independence', 'bahrain day',
    'pearling', 'heritage walk', 'cultural festival',
  ],
  // Tours keywords
  tours: [
    'tour', 'guided tour', 'walking tour',
    'sightseeing', 'excursion', 'trip',
    'desert safari', 'boat trip', 'cruise',
    'heritage', 'historical', 'discovery',
    'adventure', 'outdoor', 'nature',
  ],
  // Special keywords
  special: [
    'eid', 'ramadan', 'national day',
    'christmas', 'new year', 'nye',
    'valentine', 'halloween', 'easter',
    'holiday', 'seasonal', 'annual',
    'winter wonderland', 'festive',
  ],
};

/**
 * Venue-based category hints
 */
const VENUE_CATEGORY_HINTS: Record<string, string> = {
  'circuit': 'sports',
  'international circuit': 'sports',
  'equestrian': 'sports',
  'horseracing': 'sports',
  'turf club': 'sports',
  'stadium': 'sports',
  'golf': 'sports',
  'gym': 'sports',
  'fitness': 'sports',
  'amphitheatre': 'music',
  'amphitheater': 'music',
  'al dana': 'music',
  'theatre': 'arts',
  'theater': 'arts',
  'gallery': 'arts',
  'museum': 'arts',
  'art space': 'arts',
  'riwaq': 'arts',
  'mall': 'shopping',
  'souq': 'shopping',
  'souk': 'shopping',
  'restaurant': 'dining',
  'café': 'dining',
  'cafe': 'dining',
  'hotel': 'dining',
  'club': 'nightlife',
  'lounge': 'nightlife',
  'bar': 'nightlife',
  'spa': 'wellness',
  'resort': 'wellness',
};

/**
 * Detect category from venue name
 */
function getCategoryFromVenue(venueName: string): string | null {
  const venue = venueName.toLowerCase();
  for (const [keyword, category] of Object.entries(VENUE_CATEGORY_HINTS)) {
    if (venue.includes(keyword)) {
      return category;
    }
  }
  return null;
}

/**
 * High-confidence title keywords that should ALWAYS determine category
 * These are specific enough to be reliable
 */
const TITLE_PRIORITY_KEYWORDS: Record<string, string[]> = {
  sports: [
    'fitness on track', 'horse racing', 'turf club', 'equestrian',
    'marathon', 'triathlon', 'championship', 'tournament',
    'f1', 'formula 1', 'grand prix', 'motorsport',
    'batelco fitness', 'bahrain turf',
  ],
  music: [
    'concert', 'live in concert', 'in concert', 'world tour',
    'orchestra', 'symphony', 'philharmonic',
    'linkin park', 'john mayer', 'calvin harris', 'andre rieu', 'josh groban',
    'majid al-mohandes', 'nancy ajram', 'amr diab',
  ],
  arts: [
    'exhibition', 'art show', 'gallery', 'theater', 'theatre',
    'ballet', 'opera', 'play',
  ],
  family: [
    'kids', 'children', 'family fun', 'water park', 'theme park',
  ],
  dining: [
    'brunch', 'dinner', 'buffet', 'ladies night', 'happy hour',
    'food festival', 'culinary',
  ],
};

/**
 * Score-based category detection
 * Uses multiple signals: title keywords, venue hints, description keywords
 */
function detectCategory(title: string, description: string, venueName: string): string {
  const titleLower = title.toLowerCase();
  const venueLower = venueName.toLowerCase();
  const fullText = `${title} ${description} ${venueName}`.toLowerCase();

  // STEP 1: Check high-priority title keywords first (most reliable)
  for (const [category, keywords] of Object.entries(TITLE_PRIORITY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (titleLower.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // STEP 2: Check venue-based hints (very reliable for certain venues)
  const venueCategory = getCategoryFromVenue(venueName);

  // Strong venue signals - these should be trusted
  if (venueLower.includes('amphitheatre') || venueLower.includes('amphitheater')) {
    return 'music';
  }
  if (venueLower.includes('circuit') || venueLower.includes('turf club') || venueLower.includes('equestrian')) {
    return 'sports';
  }
  if (venueLower.includes('gallery') || venueLower.includes('museum') || venueLower.includes('riwaq')) {
    return 'arts';
  }

  // STEP 3: Score-based matching on full text
  const scores: Record<string, number> = {};

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    scores[category] = 0;
    for (const keyword of keywords) {
      if (fullText.includes(keyword.toLowerCase())) {
        // Title matches worth more than description matches
        if (titleLower.includes(keyword.toLowerCase())) {
          scores[category] += 3;
        } else if (venueLower.includes(keyword.toLowerCase())) {
          scores[category] += 2;
        } else {
          scores[category] += 1;
        }
      }
    }
  }

  // Find category with highest score
  let bestCategory = 'community';
  let bestScore = 0;
  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  // If venue category is set and has reasonable score, prefer it
  if (venueCategory && scores[venueCategory] >= bestScore * 0.5) {
    return venueCategory;
  }

  // Only return best category if it has a meaningful score
  if (bestScore >= 2) {
    return bestCategory;
  }

  // Fall back to venue category
  if (venueCategory) {
    return venueCategory;
  }

  // Default
  return 'community';
}

interface Event {
  id: string;
  title: string;
  description: string | null;
  venue_name: string | null;
  category: string;
}

async function fixEventCategories() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log('🔧 Fixing Event Categories...\n');

  // Fetch all events
  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, description, venue_name, category')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    process.exit(1);
  }

  console.log(`Found ${events?.length || 0} total events\n`);

  const changes: { title: string; oldCategory: string; newCategory: string; venue: string }[] = [];
  const unchanged: string[] = [];

  for (const event of events || []) {
    const detectedCategory = detectCategory(
      event.title,
      event.description || '',
      event.venue_name || ''
    );

    if (detectedCategory !== event.category) {
      changes.push({
        title: event.title,
        oldCategory: event.category,
        newCategory: detectedCategory,
        venue: event.venue_name || 'Unknown',
      });

      // Update the category in the database
      const { error: updateError } = await supabase
        .from('events')
        .update({ category: detectedCategory })
        .eq('id', event.id);

      if (updateError) {
        console.error(`  ❌ Error updating "${event.title}":`, updateError);
      }
    } else {
      unchanged.push(event.title);
    }
  }

  // Print results
  console.log('=' .repeat(80));
  console.log('📊 CATEGORY FIX RESULTS');
  console.log('=' .repeat(80));

  if (changes.length > 0) {
    console.log(`\n✅ Fixed ${changes.length} events:\n`);
    for (const change of changes) {
      console.log(`  📝 "${change.title}"`);
      console.log(`     Venue: ${change.venue}`);
      console.log(`     ${change.oldCategory} → ${change.newCategory}`);
      console.log('');
    }
  } else {
    console.log('\n✨ All events are already correctly categorized!');
  }

  console.log(`\n📈 Summary:`);
  console.log(`   - Total events: ${events?.length || 0}`);
  console.log(`   - Fixed: ${changes.length}`);
  console.log(`   - Already correct: ${unchanged.length}`);

  // Show specific fixes for the known problematic events
  console.log('\n🎯 Key Fixes:');
  const keyEvents = ['Batelco Fitness', 'Horse Racing', 'Turf Club', 'on Track'];
  for (const change of changes) {
    for (const key of keyEvents) {
      if (change.title.toLowerCase().includes(key.toLowerCase())) {
        console.log(`   ✅ "${change.title}": ${change.oldCategory} → ${change.newCategory}`);
      }
    }
  }

  console.log('\n🎉 Category fix complete!');
}

// Run the fix
fixEventCategories()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fix failed:', error);
    process.exit(1);
  });
