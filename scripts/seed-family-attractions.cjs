const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const FAMILY_ATTRACTIONS = [
  {
    name: 'Bahrain National Museum',
    description: 'The largest and oldest public museum in Bahrain, featuring exhibits on the ancient Dilmun civilization, traditional crafts, and natural history. Interactive displays make it engaging for children.',
    category: 'Family & Kids',
    area: 'Manama',
    address: 'Al Fatih Highway, Manama',
    price_range: 'Budget',
    price_from: 1,
    duration: '2-3 hours',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['museum', 'educational', 'indoor', 'air-conditioned'],
    image_url: 'https://images.unsplash.com/photo-1565060169194-19fabf63012c?w=800',
    best_time: 'Any time',
  },
  {
    name: "Bahrain Fort (Qal'at al-Bahrain)",
    description: 'UNESCO World Heritage site with ancient ruins dating back 4,000 years. Kids can explore the fort walls while parents enjoy the archaeological significance. Beautiful sunset views.',
    category: 'Family & Kids',
    area: 'Karbabad',
    price_range: 'Free',
    duration: '1-2 hours',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['historical', 'outdoor', 'free', 'unesco'],
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    best_time: 'Evening',
  },
  {
    name: 'Al Areen Wildlife Park',
    description: 'Home to over 500 animals including Arabian oryx, gazelles, and various bird species. Safari-style tours let families see animals in naturalistic habitats.',
    category: 'Family & Kids',
    area: 'Sakhir',
    price_range: 'Budget',
    price_from: 2,
    duration: '2-4 hours',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['wildlife', 'outdoor', 'safari', 'animals'],
    image_url: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800',
    best_time: 'Morning',
  },
  {
    name: 'Wahooo! Waterpark',
    description: "Bahrain's largest indoor waterpark at City Centre Bahrain. Features wave pools, lazy rivers, water slides for all ages, and dedicated kids' areas.",
    category: 'Family & Kids',
    area: 'Seef',
    address: 'City Centre Bahrain, Seef District',
    price_range: 'Mid-range',
    price_from: 12,
    duration: '4-6 hours',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['waterpark', 'indoor', 'swimming', 'slides'],
    image_url: 'https://images.unsplash.com/photo-1560087637-bf797bc7a164?w=800',
    best_time: 'Any time',
  },
  {
    name: 'Gravity Indoor Skydiving',
    description: 'Experience the thrill of skydiving in a safe, controlled environment. Suitable for ages 3 and up with professional instructors.',
    category: 'Family & Kids',
    area: 'Amwaj Islands',
    price_range: 'Premium',
    price_from: 25,
    duration: '1-2 hours',
    suitable_for: ['families', 'kids', 'adventure-seekers'],
    tags: ['adventure', 'indoor', 'unique-experience'],
    image_url: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800',
    best_time: 'Any time',
  },
  {
    name: 'Lost Paradise of Dilmun Water Park',
    description: 'One of the largest water parks in the Middle East, themed around the ancient Dilmun civilization. Features over 20 rides, a wave pool, and a lazy river.',
    category: 'Family & Kids',
    area: 'Sakhir',
    price_range: 'Mid-range',
    price_from: 18,
    duration: 'Full day',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['waterpark', 'outdoor', 'swimming', 'rides'],
    image_url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
    best_time: 'Morning',
  },
  {
    name: 'Bahrain International Circuit',
    description: 'Home of the Formula 1 Bahrain Grand Prix. Offers karting experiences for kids and adults, driving experiences, and facility tours.',
    category: 'Family & Kids',
    area: 'Sakhir',
    price_range: 'Mid-range',
    price_from: 15,
    duration: '2-3 hours',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['motorsport', 'karting', 'f1', 'adventure'],
    image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    best_time: 'Any time',
  },
  {
    name: 'Tree of Life',
    description: 'A 400-year-old mesquite tree standing alone in the desert. A natural wonder and great photo opportunity. Best visited during cooler months.',
    category: 'Family & Kids',
    area: 'Southern Governorate',
    price_range: 'Free',
    duration: '30 minutes - 1 hour',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['nature', 'outdoor', 'free', 'landmark'],
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    best_time: 'Evening',
  },
  {
    name: 'Adhari Park',
    description: 'An amusement park with rides suitable for all ages, arcade games, and dining options. Great for a full day of family fun.',
    category: 'Family & Kids',
    area: 'Adhari',
    price_range: 'Budget',
    price_from: 5,
    duration: '3-5 hours',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['amusement-park', 'rides', 'arcade'],
    image_url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800',
    best_time: 'Evening',
  },
  {
    name: 'The Avenues - Kids Entertainment',
    description: "The largest mall in Bahrain featuring multiple kids' entertainment zones including Magic Planet, bowling, and indoor playgrounds.",
    category: 'Family & Kids',
    area: 'Bahrain Bay',
    price_range: 'Budget',
    duration: '2-4 hours',
    suitable_for: ['families', 'kids'],
    tags: ['mall', 'indoor', 'entertainment', 'shopping'],
    image_url: 'https://images.unsplash.com/photo-1519567241046-7f570f86d3b9?w=800',
    best_time: 'Any time',
  },
  {
    name: 'Al Dar Islands',
    description: 'A group of islands offering beach activities, swimming, and snorkeling. Boat trips available with beach BBQ options.',
    category: 'Family & Kids',
    area: 'Sitra',
    price_range: 'Mid-range',
    price_from: 10,
    duration: 'Half day - Full day',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['beach', 'island', 'swimming', 'boat'],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    best_time: 'Morning',
  },
  {
    name: 'Beit Al Quran',
    description: 'A museum dedicated to Islamic arts and rare Quran manuscripts. Features beautiful Arabic calligraphy and a mosque with stunning architecture.',
    category: 'Family & Kids',
    area: 'Hoora',
    price_range: 'Free',
    duration: '1-2 hours',
    suitable_for: ['families', 'everyone'],
    tags: ['museum', 'cultural', 'islamic', 'educational'],
    image_url: 'https://images.unsplash.com/photo-1584286595398-a59511e0649f?w=800',
    best_time: 'Any time',
  },
  {
    name: 'Dolphin Resort',
    description: 'A beach resort offering swimming, kayaking, and water sports. Day passes available for families who want beach access.',
    category: 'Family & Kids',
    area: 'Amwaj Islands',
    price_range: 'Mid-range',
    price_from: 10,
    duration: 'Half day - Full day',
    suitable_for: ['families', 'kids', 'everyone'],
    tags: ['beach', 'resort', 'swimming', 'watersports'],
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    best_time: 'Morning',
  },
  {
    name: 'Manama Souq (Bab Al Bahrain)',
    description: 'Traditional market area perfect for exploring local culture. Kids will enjoy the colorful stalls, spices, and traditional handicrafts.',
    category: 'Family & Kids',
    area: 'Manama',
    address: 'Bab Al Bahrain, Government Avenue',
    price_range: 'Free',
    duration: '1-2 hours',
    suitable_for: ['families', 'everyone'],
    tags: ['shopping', 'cultural', 'market', 'traditional'],
    image_url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
    best_time: 'Evening',
  },
  {
    name: 'Al Fateh Grand Mosque',
    description: 'One of the largest mosques in the world. Free guided tours available. Kids can learn about Islamic architecture and culture.',
    category: 'Family & Kids',
    area: 'Juffair',
    price_range: 'Free',
    duration: '1 hour',
    suitable_for: ['families', 'everyone'],
    tags: ['religious', 'cultural', 'architecture', 'free'],
    image_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800',
    best_time: 'Morning',
  },
];

async function seedFamilyAttractions() {
  console.log('Seeding Family & Kids Attractions...\n');

  let added = 0;
  let skipped = 0;

  for (const attraction of FAMILY_ATTRACTIONS) {
    const slug = attraction.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if exists
    const { data: existing } = await supabase
      .from('attractions')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!existing) {
      const { error } = await supabase
        .from('attractions')
        .insert({
          ...attraction,
          slug,
          source: 'manual',
          is_active: true,
          is_featured: false,
        });

      if (error) {
        console.error(`Failed to add ${attraction.name}:`, error.message);
      } else {
        console.log(`✅ Added: ${attraction.name}`);
        added++;
      }
    } else {
      console.log(`⏭️ Skipped (exists): ${attraction.name}`);
      skipped++;
    }
  }

  console.log(`\n📊 Results: ${added} added, ${skipped} skipped`);
}

seedFamilyAttractions().catch(console.error);
