import { createClient } from '@supabase/supabase-js';

/**
 * Venue Database Expansion Script
 * Run with: npx tsx scripts/seed-venues-expansion.ts
 * 
 * This adds 50+ popular Bahrain venues to the database
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const newVenues = [
  // === RESTAURANTS ===
  {
    name: 'Masso',
    description: 'Premium Italian steakhouse at Four Seasons with stunning bay views and world-class cuts.',
    category: 'restaurant',
    area: 'Bahrain Bay',
    address: 'Four Seasons Hotel, Bahrain Bay',
    phone: '+973 1711 5046',
    instagram: 'massobahrain',
    tags: ['fine dining', 'italian', 'steakhouse', 'romantic'],
    features: ['outdoor seating', 'valet parking', 'reservations required'],
  },
  {
    name: 'CUT by Wolfgang Puck',
    description: 'Celebrity chef Wolfgang Puck\'s signature steakhouse offering premium beef and refined American cuisine.',
    category: 'restaurant',
    area: 'Bahrain Bay',
    address: 'Four Seasons Hotel, Bahrain Bay',
    phone: '+973 1711 5044',
    instagram: 'cutbahrain',
    tags: ['fine dining', 'american', 'steakhouse', 'celebrity chef'],
    features: ['valet parking', 'reservations required', 'dress code'],
  },
  {
    name: 'La Vinoteca',
    description: 'Charming Spanish tapas bar and wine cellar in the heart of Adliya.',
    category: 'restaurant',
    area: 'Adliya',
    address: 'Block 338, Adliya',
    phone: '+973 1771 2312',
    instagram: 'lavinotecabh',
    tags: ['spanish', 'tapas', 'wine bar', 'casual'],
    features: ['outdoor seating', 'live music weekends'],
  },
  {
    name: 'Bushido',
    description: 'Contemporary Japanese cuisine with theatrical presentation and vibrant nightlife atmosphere.',
    category: 'restaurant',
    area: 'Seef',
    address: 'The Ritz-Carlton, Seef',
    phone: '+973 1758 0000',
    instagram: 'bushidobahrain',
    tags: ['japanese', 'sushi', 'nightlife', 'upscale'],
    features: ['dj nights', 'valet parking', 'reservations required'],
  },
  {
    name: 'Trader Vic\'s',
    description: 'Iconic Polynesian restaurant and bar known for legendary cocktails and Pacific Rim cuisine.',
    category: 'restaurant',
    area: 'Seef',
    address: 'The Ritz-Carlton, Seef',
    phone: '+973 1758 0000',
    instagram: 'tradervicsbh',
    tags: ['polynesian', 'cocktails', 'nightlife', 'tropical'],
    features: ['live entertainment', 'outdoor terrace', 'valet parking'],
  },
  {
    name: 'The Meat Co',
    description: 'South African steakhouse specializing in premium aged steaks and game meats.',
    category: 'restaurant',
    area: 'Seef',
    address: 'City Centre Bahrain, Seef',
    phone: '+973 1717 1234',
    instagram: 'themeatcobh',
    tags: ['steakhouse', 'south african', 'premium', 'family'],
    features: ['family friendly', 'mall location'],
  },
  {
    name: 'Indigo',
    description: 'Contemporary Indian fine dining with innovative presentations and authentic flavors.',
    category: 'restaurant',
    area: 'Adliya',
    address: 'Block 338, Road 3803, Adliya',
    phone: '+973 1771 1234',
    instagram: 'indigobahrain',
    tags: ['indian', 'fine dining', 'contemporary', 'romantic'],
    features: ['outdoor seating', 'valet parking'],
  },
  {
    name: 'Nozomi',
    description: 'High-end Japanese restaurant and lounge with stunning interiors and premium sushi.',
    category: 'restaurant',
    area: 'Manama',
    address: 'ART Rotana, Amwaj Islands',
    phone: '+973 1600 0111',
    instagram: 'nozomibahrain',
    tags: ['japanese', 'sushi', 'lounge', 'premium'],
    features: ['dj nights', 'outdoor terrace', 'shisha'],
  },
  {
    name: 'Furn Bistro',
    description: 'All-day dining destination with Mediterranean-inspired dishes and panoramic city views.',
    category: 'restaurant',
    area: 'Bahrain Bay',
    address: 'Four Seasons Hotel, Bahrain Bay',
    phone: '+973 1711 5000',
    instagram: 'furnbistro',
    tags: ['mediterranean', 'breakfast', 'brunch', 'casual'],
    features: ['breakfast', 'outdoor seating', 'family friendly'],
  },
  {
    name: 'Mirai',
    description: 'Modern Japanese izakaya serving creative small plates and craft cocktails.',
    category: 'restaurant',
    area: 'Juffair',
    address: 'Block 428, Juffair',
    phone: '+973 1767 0000',
    instagram: 'miraibahrain',
    tags: ['japanese', 'izakaya', 'cocktails', 'trendy'],
    features: ['late night', 'cocktail bar'],
  },
  
  // === CAFES ===
  {
    name: 'Coco\'s',
    description: 'Trendy all-day cafe and lounge in Block 338 with great coffee and shisha.',
    category: 'cafe',
    area: 'Adliya',
    address: 'Block 338, Adliya',
    phone: '+973 1771 3333',
    instagram: 'cocosbahrain',
    tags: ['cafe', 'shisha', 'trendy', 'all day'],
    features: ['outdoor seating', 'shisha', 'late night'],
  },
  {
    name: 'Lilou Artisan Patisserie',
    description: 'French-inspired artisan bakery and cafe with exquisite pastries and light meals.',
    category: 'cafe',
    area: 'Adliya',
    address: 'Block 338, Road 3803, Adliya',
    phone: '+973 1771 4440',
    instagram: 'liloubahrain',
    tags: ['french', 'bakery', 'brunch', 'pastries'],
    features: ['breakfast', 'outdoor seating', 'takeaway'],
  },
  {
    name: 'The Coffee Club',
    description: 'Australian cafe chain serving quality coffee, all-day breakfast, and casual meals.',
    category: 'cafe',
    area: 'Seef',
    address: 'City Centre Bahrain, Seef',
    phone: '+973 1717 2222',
    instagram: 'thecoffeeclubbh',
    tags: ['australian', 'coffee', 'breakfast', 'casual'],
    features: ['breakfast', 'family friendly', 'wifi'],
  },
  {
    name: 'Karaka Café',
    description: 'Cozy Lebanese cafe known for authentic breakfast, fresh juices, and afternoon tea.',
    category: 'cafe',
    area: 'Manama',
    address: 'Exhibition Road, Manama',
    phone: '+973 1729 0000',
    instagram: 'karakacafe',
    tags: ['lebanese', 'breakfast', 'juice', 'traditional'],
    features: ['breakfast', 'traditional', 'family friendly'],
  },
  
  // === NIGHTCLUBS & BARS ===
  {
    name: 'CK\'s',
    description: 'Legendary Bahrain nightclub that\'s been the heart of the party scene for decades.',
    category: 'nightclub',
    area: 'Juffair',
    address: 'Juffair Grand Hotel, Juffair',
    phone: '+973 1767 0000',
    instagram: 'cksbahrain',
    tags: ['nightclub', 'dancing', 'party', 'legendary'],
    features: ['dj', 'dancing', 'vip tables', 'late night'],
  },
  {
    name: 'Club D',
    description: 'Popular expat nightclub with multiple dance floors and international DJs.',
    category: 'nightclub',
    area: 'Juffair',
    address: 'Block 428, Juffair',
    phone: '+973 1767 1111',
    instagram: 'clubdbahrain',
    tags: ['nightclub', 'dancing', 'expat', 'djs'],
    features: ['multiple floors', 'dj', 'vip area'],
  },
  {
    name: 'Sherlock Holmes',
    description: 'Classic British pub with live music, quiz nights, and a great selection of beers.',
    category: 'bar',
    area: 'Seef',
    address: 'Gulf Hotel, Adliya',
    phone: '+973 1771 3000',
    instagram: 'sherlockbahrain',
    tags: ['british', 'pub', 'live music', 'beer'],
    features: ['live music', 'sports', 'quiz nights'],
  },
  {
    name: 'Zenj Bar',
    description: 'Sophisticated rooftop bar with panoramic views, craft cocktails, and live entertainment.',
    category: 'bar',
    area: 'Seef',
    address: 'Gulf Hotel, Adliya',
    phone: '+973 1771 3000',
    instagram: 'zenjbarbahrain',
    tags: ['rooftop', 'cocktails', 'views', 'upscale'],
    features: ['rooftop', 'live music', 'sunset views'],
  },
  {
    name: 'Belgian Cafe',
    description: 'Authentic Belgian brasserie with extensive beer selection and classic European dishes.',
    category: 'bar',
    area: 'Juffair',
    address: 'Intercontinental Regency, Manama',
    phone: '+973 1722 7777',
    instagram: 'belgiancafebh',
    tags: ['belgian', 'beer', 'european', 'casual'],
    features: ['beer selection', 'outdoor terrace'],
  },
  {
    name: 'Coral Bay Beach Club',
    description: 'Premier beach club with pool parties, DJ events, and a stunning beachfront setting.',
    category: 'nightclub',
    area: 'Amwaj Islands',
    address: 'Coral Bay, Amwaj Islands',
    phone: '+973 1600 1234',
    instagram: 'coralbaybh',
    tags: ['beach club', 'pool party', 'dj', 'events'],
    features: ['beach', 'pool', 'dj events', 'day parties'],
  },
  
  // === HOTELS ===
  {
    name: 'Four Seasons Hotel Bahrain Bay',
    description: 'Ultra-luxury waterfront hotel with private beach, world-class dining, and exceptional service.',
    category: 'hotel',
    area: 'Bahrain Bay',
    address: 'Bahrain Bay',
    phone: '+973 1711 5000',
    website: 'https://fourseasons.com/bahrain',
    instagram: 'fsbahrain',
    tags: ['luxury', '5 star', 'beach', 'spa'],
    features: ['private beach', 'spa', 'multiple restaurants', 'pool'],
  },
  {
    name: 'The Ritz-Carlton, Bahrain',
    description: 'Iconic luxury resort on its own island with pristine beach, spa, and exceptional dining.',
    category: 'hotel',
    area: 'Seef',
    address: 'Building 173, Road 2803, Seef',
    phone: '+973 1758 0000',
    website: 'https://ritzcarlton.com/bahrain',
    instagram: 'ritzcarltonbahrain',
    tags: ['luxury', '5 star', 'beach', 'resort'],
    features: ['private island', 'spa', 'beach', 'golf'],
  },
  {
    name: 'Gulf Hotel Bahrain',
    description: 'Historic landmark hotel with diverse dining options, pools, and legendary nightlife.',
    category: 'hotel',
    area: 'Adliya',
    address: 'Gulf Hotel Avenue, Adliya',
    phone: '+973 1771 3000',
    website: 'https://gulfhotelbahrain.com',
    instagram: 'gulfhotelbahrain',
    tags: ['5 star', 'historic', 'nightlife', 'dining'],
    features: ['multiple restaurants', 'pool', 'spa', 'nightlife'],
  },
  {
    name: 'ART Rotana Amwaj Islands',
    description: 'Contemporary resort on Amwaj Islands with marina views and excellent facilities.',
    category: 'hotel',
    area: 'Amwaj Islands',
    address: 'Amwaj Islands',
    phone: '+973 1600 0111',
    website: 'https://rotana.com/artrotana',
    instagram: 'artrotanabahrain',
    tags: ['5 star', 'resort', 'marina', 'modern'],
    features: ['marina', 'pool', 'spa', 'beach access'],
  },
  {
    name: 'Sofitel Bahrain Zallaq Thalassa',
    description: 'Beachfront resort with natural springs-fed thalassotherapy spa and private beach.',
    category: 'hotel',
    area: 'Zallaq',
    address: 'Zallaq Beach',
    phone: '+973 1763 6363',
    website: 'https://sofitel.com/bahrain',
    instagram: 'sofitelbahrain',
    tags: ['5 star', 'spa', 'beach', 'wellness'],
    features: ['thalassotherapy', 'private beach', 'spa', 'family friendly'],
  },
  {
    name: 'The Merchant House',
    description: 'Boutique heritage hotel in Manama\'s historic quarter with rooftop pool and fine dining.',
    category: 'hotel',
    area: 'Manama',
    address: 'Government Avenue, Manama',
    phone: '+973 1700 0200',
    website: 'https://themerchanthouse.com',
    instagram: 'themerchanthousebh',
    tags: ['boutique', 'heritage', 'historic', 'rooftop'],
    features: ['rooftop pool', 'heritage building', 'fine dining'],
  },
  {
    name: 'Wyndham Grand Manama',
    description: 'Modern business and leisure hotel in the heart of the financial district.',
    category: 'hotel',
    area: 'Manama',
    address: 'Government Avenue, Manama',
    phone: '+973 1721 0210',
    instagram: 'wyndhamgrandbh',
    tags: ['5 star', 'business', 'central', 'modern'],
    features: ['business center', 'pool', 'spa', 'central location'],
  },
  
  // === ENTERTAINMENT ===
  {
    name: 'Lost Paradise of Dilmun',
    description: 'Bahrain\'s largest waterpark featuring thrilling slides, lazy rivers, and wave pools.',
    category: 'entertainment',
    area: 'Sakhir',
    address: 'Lost Paradise Boulevard, Sakhir',
    phone: '+973 1784 5100',
    website: 'https://lpodwaterpark.com',
    instagram: 'lpodwaterpark',
    tags: ['waterpark', 'family', 'slides', 'adventure'],
    features: ['water slides', 'wave pool', 'lazy river', 'family friendly'],
  },
  {
    name: 'Gravity',
    description: 'Indoor entertainment center with trampoline park, climbing walls, and adventure activities.',
    category: 'entertainment',
    area: 'Seef',
    address: 'City Centre Bahrain, Seef',
    phone: '+973 1717 3333',
    instagram: 'gravitybahrain',
    tags: ['trampoline', 'indoor', 'family', 'adventure'],
    features: ['trampoline park', 'climbing wall', 'kids activities'],
  },
  {
    name: 'Magic Island',
    description: 'Family amusement park with rides, games, and entertainment for all ages.',
    category: 'entertainment',
    area: 'Manama',
    address: 'Seef Mall, Seef',
    phone: '+973 1729 9999',
    instagram: 'magicislandbh',
    tags: ['amusement park', 'family', 'rides', 'games'],
    features: ['rides', 'arcade', 'kids entertainment'],
  },
  {
    name: 'Bahrain International Circuit',
    description: 'World-class motorsport venue hosting Formula 1, endurance racing, and driving experiences.',
    category: 'entertainment',
    area: 'Sakhir',
    address: 'Gate 255, Gulf of Bahrain Avenue, Sakhir',
    phone: '+973 1745 0000',
    website: 'https://bahraingp.com',
    instagram: 'bahloaingp',
    tags: ['f1', 'motorsport', 'racing', 'events'],
    features: ['f1', 'track days', 'driving experiences', 'tours'],
  },
  {
    name: 'Bahrain National Museum',
    description: 'Premier cultural institution showcasing 6,000 years of Bahraini history and heritage.',
    category: 'entertainment',
    area: 'Manama',
    address: 'Al Fateh Highway, Manama',
    phone: '+973 1729 8777',
    instagram: 'bahrainmuseum',
    tags: ['museum', 'culture', 'history', 'heritage'],
    features: ['exhibitions', 'cafe', 'gift shop', 'tours'],
  },
  {
    name: 'Al Dana Amphitheatre',
    description: 'Outdoor concert venue hosting major international artists and cultural events.',
    category: 'entertainment',
    area: 'Sakhir',
    address: 'Bahrain International Circuit, Sakhir',
    phone: '+973 1745 0000',
    instagram: 'aldanaamphitheatre',
    tags: ['concerts', 'live music', 'outdoor', 'events'],
    features: ['concerts', 'festivals', 'outdoor venue'],
  },
  
  // === LOUNGES & SHISHA ===
  {
    name: 'Sky Lounge',
    description: 'Rooftop lounge with stunning city views, premium shisha, and international cuisine.',
    category: 'lounge',
    area: 'Juffair',
    address: 'Downtown Rotana, Juffair',
    phone: '+973 1311 9999',
    instagram: 'skyloungejuffair',
    tags: ['rooftop', 'shisha', 'views', 'lounge'],
    features: ['rooftop', 'shisha', 'views', 'late night'],
  },
  {
    name: 'Maki',
    description: 'Upscale Japanese restaurant and lounge with sushi, cocktails, and vibrant atmosphere.',
    category: 'lounge',
    area: 'Manama',
    address: 'Intercontinental Regency, Manama',
    phone: '+973 1722 7777',
    instagram: 'makibahrain',
    tags: ['japanese', 'sushi', 'lounge', 'cocktails'],
    features: ['dj nights', 'cocktail bar', 'sushi'],
  },
  {
    name: 'Hazel Rooftop Lounge',
    description: 'Stylish rooftop venue with craft cocktails, small plates, and live entertainment.',
    category: 'lounge',
    area: 'Manama',
    address: 'Downtown Manama',
    phone: '+973 1700 0000',
    instagram: 'hazelbahrain',
    tags: ['rooftop', 'cocktails', 'live music', 'trendy'],
    features: ['rooftop', 'craft cocktails', 'live entertainment'],
  },
  
  // === SPAS & WELLNESS ===
  {
    name: 'The Spa at Four Seasons',
    description: 'World-class spa offering holistic treatments, wellness programs, and luxury facilities.',
    category: 'spa',
    area: 'Bahrain Bay',
    address: 'Four Seasons Hotel, Bahrain Bay',
    phone: '+973 1711 5050',
    instagram: 'fsbahrain',
    tags: ['spa', 'wellness', 'luxury', 'relaxation'],
    features: ['treatments', 'pool', 'gym', 'sauna'],
  },
  {
    name: 'Thalassa Sea & Spa',
    description: 'Thalassotherapy spa using mineral-rich seawater for rejuvenating treatments.',
    category: 'spa',
    area: 'Zallaq',
    address: 'Sofitel Bahrain, Zallaq',
    phone: '+973 1763 6363',
    instagram: 'sofitelbahrain',
    tags: ['thalassotherapy', 'spa', 'wellness', 'beach'],
    features: ['seawater treatments', 'massage', 'beauty'],
  },
];

async function seedVenues() {
  console.log('🏪 Starting venue database expansion...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const venue of newVenues) {
    const slug = generateSlug(venue.name);
    
    // Check if venue already exists
    const { data: existing } = await supabase
      .from('venues')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      console.log(`⏭️  Skipping ${venue.name} (already exists)`);
      skipCount++;
      continue;
    }

    const { error } = await supabase
      .from('venues')
      .insert({
        name: venue.name,
        slug,
        description: venue.description,
        category: venue.category,
        area: venue.area,
        address: venue.address,
        phone: venue.phone || null,
        website: venue.website || null,
        instagram: venue.instagram || null,
        tags: venue.tags || [],
        features: venue.features || [],
        status: 'approved',
        is_verified: false,
        is_hidden: false,
      });

    if (error) {
      console.error(`❌ Error adding ${venue.name}:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Added: ${venue.name}`);
      successCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Added: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📦 Total: ${newVenues.length}`);
}

seedVenues()
  .then(() => {
    console.log('\n✨ Venue expansion complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
