// Search data types and mock data for BahrainNights search functionality

export interface SearchItem {
  id: string;
  type: 'event' | 'place' | 'cinema' | 'offer';
  title: string;
  slug: string;
  description: string;
  image: string;
  url: string;
  // Event specific
  date?: string;
  time?: string;
  venue?: string;
  // Place specific
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  // Common
  area?: string;
  category?: string;
  tags?: string[];
  features?: string[];
}

export interface SearchResults {
  query: string;
  totalResults: number;
  results: {
    events: { count: number; items: SearchItem[] };
    places: { count: number; items: SearchItem[] };
    cinema: { count: number; items: SearchItem[] };
    offers: { count: number; items: SearchItem[] };
  };
  suggestions: string[];
}

export interface SearchSuggestion {
  type: 'event' | 'place' | 'cinema' | 'offer';
  title: string;
  url: string;
  image?: string;
  subtitle?: string;
}

// Mock Events Data
export const eventsData: SearchItem[] = [
  {
    id: 'event-1',
    type: 'event',
    title: 'Friday Brunch at Ritz-Carlton',
    slug: 'friday-brunch-ritz-carlton',
    description: 'Lavish Friday brunch with live cooking stations and unlimited beverages',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    url: '/events/friday-brunch-ritz-carlton',
    date: 'Every Friday',
    time: '12:30 PM - 4:00 PM',
    venue: 'The Ritz-Carlton',
    area: 'Seef',
    category: 'Dining',
    tags: ['brunch', 'friday', 'buffet', 'family'],
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Ladies Night at Coral Bay',
    slug: 'ladies-night-coral-bay',
    description: 'Exclusive ladies night with complimentary drinks and live DJ',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
    url: '/events/ladies-night-coral-bay',
    date: 'Every Wednesday',
    time: '8:00 PM - 1:00 AM',
    venue: 'Coral Bay Resort',
    area: 'Amwaj Islands',
    category: 'Nightlife',
    tags: ['ladies night', 'nightlife', 'drinks', 'dj'],
  },
  {
    id: 'event-3',
    type: 'event',
    title: 'NYE Gala at Four Seasons',
    slug: 'nye-gala-four-seasons',
    description: 'Ring in 2026 with a spectacular gala dinner, live entertainment and fireworks',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800',
    url: '/events/nye-gala-four-seasons',
    date: 'December 31, 2025',
    time: '8:00 PM - 2:00 AM',
    venue: 'Four Seasons Hotel',
    area: 'Manama',
    category: 'Special Event',
    tags: ['nye', 'new year', 'gala', 'fireworks', 'celebration'],
  },
  {
    id: 'event-4',
    type: 'event',
    title: 'Live Music Fridays at Block 338',
    slug: 'live-music-block-338',
    description: 'Weekly live music performances featuring local and international artists',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    url: '/events/live-music-block-338',
    date: 'Every Friday',
    time: '9:00 PM - 1:00 AM',
    venue: 'Block 338',
    area: 'Adliya',
    category: 'Entertainment',
    tags: ['live music', 'concert', 'nightlife', 'entertainment'],
  },
  {
    id: 'event-5',
    type: 'event',
    title: 'Saturday Brunch at Gulf Hotel',
    slug: 'saturday-brunch-gulf-hotel',
    description: 'Award-winning Saturday brunch with international cuisine',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    url: '/events/saturday-brunch-gulf-hotel',
    date: 'Every Saturday',
    time: '12:00 PM - 4:00 PM',
    venue: 'Gulf Hotel',
    area: 'Manama',
    category: 'Dining',
    tags: ['brunch', 'saturday', 'buffet', 'family'],
  },
  {
    id: 'event-6',
    type: 'event',
    title: 'Family Fun Day at Adhari Park',
    slug: 'family-fun-day-adhari',
    description: 'Special family day with discounted rides and entertainment for kids',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800',
    url: '/events/family-fun-day-adhari',
    date: 'Every Weekend',
    time: '10:00 AM - 10:00 PM',
    venue: 'Adhari Park',
    area: 'Adhari',
    category: 'Family',
    tags: ['family', 'kids', 'theme park', 'entertainment'],
  },
  {
    id: 'event-7',
    type: 'event',
    title: 'Happy Hour at Trader Vics',
    slug: 'happy-hour-trader-vics',
    description: 'Daily happy hour with 50% off selected beverages',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    url: '/events/happy-hour-trader-vics',
    date: 'Daily',
    time: '5:00 PM - 8:00 PM',
    venue: 'Trader Vics',
    area: 'Seef',
    category: 'Nightlife',
    tags: ['happy hour', 'drinks', 'bar', 'deals'],
  },
  {
    id: 'event-8',
    type: 'event',
    title: 'Beach Party at Jumeirah',
    slug: 'beach-party-jumeirah',
    description: 'Weekend beach party with pool access, BBQ and live DJ',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    url: '/events/beach-party-jumeirah',
    date: 'Every Saturday',
    time: '2:00 PM - 10:00 PM',
    venue: 'Jumeirah Royal Saray',
    area: 'Seef',
    category: 'Entertainment',
    tags: ['beach', 'pool party', 'dj', 'bbq'],
  },
  {
    id: 'event-9',
    type: 'event',
    title: 'Jazz Night at Upstairs Downstairs',
    slug: 'jazz-night-upstairs-downstairs',
    description: 'Live jazz performances every Thursday evening',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
    url: '/events/jazz-night-upstairs-downstairs',
    date: 'Every Thursday',
    time: '8:00 PM - 12:00 AM',
    venue: 'Upstairs Downstairs',
    area: 'Adliya',
    category: 'Entertainment',
    tags: ['jazz', 'live music', 'nightlife'],
  },
  {
    id: 'event-10',
    type: 'event',
    title: 'Seafood Night at La Mer',
    slug: 'seafood-night-la-mer',
    description: 'Fresh seafood buffet with ocean views',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    url: '/events/seafood-night-la-mer',
    date: 'Every Tuesday',
    time: '7:00 PM - 11:00 PM',
    venue: 'La Mer',
    area: 'Manama',
    category: 'Dining',
    tags: ['seafood', 'buffet', 'dinner', 'ocean view'],
  },
  {
    id: 'event-11',
    type: 'event',
    title: 'Comedy Night at The Clubhouse',
    slug: 'comedy-night-clubhouse',
    description: 'Stand-up comedy featuring international comedians',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
    url: '/events/comedy-night-clubhouse',
    date: 'Monthly',
    time: '8:00 PM - 11:00 PM',
    venue: 'The Clubhouse',
    area: 'Juffair',
    category: 'Entertainment',
    tags: ['comedy', 'stand-up', 'entertainment', 'nightlife'],
  },
  {
    id: 'event-12',
    type: 'event',
    title: 'Sushi Masterclass at Maki',
    slug: 'sushi-masterclass-maki',
    description: 'Learn to make sushi with expert Japanese chefs',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    url: '/events/sushi-masterclass-maki',
    date: 'Every Sunday',
    time: '3:00 PM - 5:00 PM',
    venue: 'Maki',
    area: 'Seef',
    category: 'Dining',
    tags: ['sushi', 'japanese', 'cooking class', 'masterclass'],
  },
];

// Mock Places Data
export const placesData: SearchItem[] = [
  {
    id: 'place-1',
    type: 'place',
    title: 'The Ritz-Carlton Bahrain',
    slug: 'ritz-carlton-bahrain',
    description: 'Luxury beachfront resort with world-class dining and spa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    url: '/places/ritz-carlton-bahrain',
    area: 'Seef',
    category: 'Hotel',
    rating: 4.9,
    priceRange: 'BD 120+',
    features: ['beach', 'pool', 'spa', 'fine dining', 'brunch'],
    tags: ['luxury', 'hotel', 'resort', 'brunch', 'spa'],
  },
  {
    id: 'place-2',
    type: 'place',
    title: 'Bushido',
    slug: 'bushido-bahrain',
    description: 'Premium Japanese restaurant with teppanyaki and sushi bar',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    url: '/places/bushido-bahrain',
    area: 'Seef',
    category: 'Restaurant',
    cuisine: 'Japanese',
    rating: 4.7,
    priceRange: 'BD 25-50',
    features: ['sushi', 'teppanyaki', 'private dining'],
    tags: ['japanese', 'sushi', 'fine dining', 'date night'],
  },
  {
    id: 'place-3',
    type: 'place',
    title: 'Block 338',
    slug: 'block-338',
    description: 'Trendy arts and dining district with galleries and restaurants',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800',
    url: '/places/block-338',
    area: 'Adliya',
    category: 'District',
    rating: 4.6,
    features: ['art galleries', 'restaurants', 'cafes', 'live music'],
    tags: ['arts', 'culture', 'dining', 'nightlife', 'live music'],
  },
  {
    id: 'place-4',
    type: 'place',
    title: 'Calexico',
    slug: 'calexico-bahrain',
    description: 'Authentic Mexican restaurant and bar with vibrant atmosphere',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    url: '/places/calexico-bahrain',
    area: 'Adliya',
    category: 'Restaurant',
    cuisine: 'Mexican',
    rating: 4.5,
    priceRange: 'BD 15-30',
    features: ['tacos', 'margaritas', 'live music'],
    tags: ['mexican', 'tacos', 'bar', 'casual dining'],
  },
  {
    id: 'place-5',
    type: 'place',
    title: 'Maki Bahrain',
    slug: 'maki-bahrain',
    description: 'Contemporary Japanese cuisine with a modern twist',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
    url: '/places/maki-bahrain',
    area: 'Seef',
    category: 'Restaurant',
    cuisine: 'Japanese',
    rating: 4.6,
    priceRange: 'BD 20-40',
    features: ['sushi', 'robata', 'sake bar'],
    tags: ['japanese', 'sushi', 'asian', 'trendy'],
  },
  {
    id: 'place-6',
    type: 'place',
    title: 'Coral Bay Resort',
    slug: 'coral-bay-resort',
    description: 'Beachfront resort with water sports and nightlife',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    url: '/places/coral-bay-resort',
    area: 'Amwaj Islands',
    category: 'Hotel',
    rating: 4.4,
    priceRange: 'BD 60+',
    features: ['beach', 'pool', 'water sports', 'nightclub'],
    tags: ['resort', 'beach', 'nightlife', 'ladies night'],
  },
  {
    id: 'place-7',
    type: 'place',
    title: 'Gulf Hotel Bahrain',
    slug: 'gulf-hotel-bahrain',
    description: 'Iconic luxury hotel with award-winning restaurants',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    url: '/places/gulf-hotel-bahrain',
    area: 'Manama',
    category: 'Hotel',
    rating: 4.7,
    priceRange: 'BD 80+',
    features: ['pool', 'spa', 'multiple restaurants', 'brunch'],
    tags: ['hotel', 'luxury', 'brunch', 'dining'],
  },
  {
    id: 'place-8',
    type: 'place',
    title: 'Brunch & Cake',
    slug: 'brunch-and-cake',
    description: 'Instagrammable cafe famous for all-day brunch',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    url: '/places/brunch-and-cake',
    area: 'Seef',
    category: 'Cafe',
    cuisine: 'International',
    rating: 4.5,
    priceRange: 'BD 10-20',
    features: ['brunch', 'coffee', 'instagrammable'],
    tags: ['brunch', 'cafe', 'breakfast', 'coffee'],
  },
  {
    id: 'place-9',
    type: 'place',
    title: 'CUT by Wolfgang Puck',
    slug: 'cut-wolfgang-puck',
    description: 'Celebrity chef steakhouse with premium cuts',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
    url: '/places/cut-wolfgang-puck',
    area: 'Manama',
    category: 'Restaurant',
    cuisine: 'Steakhouse',
    rating: 4.8,
    priceRange: 'BD 40-80',
    features: ['steaks', 'fine dining', 'wine list'],
    tags: ['steakhouse', 'fine dining', 'celebrity chef'],
  },
  {
    id: 'place-10',
    type: 'place',
    title: 'Mahonia',
    slug: 'mahonia-bahrain',
    description: 'Mediterranean restaurant with sea views',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800',
    url: '/places/mahonia-bahrain',
    area: 'Manama',
    category: 'Restaurant',
    cuisine: 'Mediterranean',
    rating: 4.6,
    priceRange: 'BD 20-40',
    features: ['sea view', 'terrace', 'sunset'],
    tags: ['mediterranean', 'sea view', 'romantic'],
  },
  {
    id: 'place-11',
    type: 'place',
    title: 'Manama Souq',
    slug: 'manama-souq',
    description: 'Traditional market for gold, pearls, spices and textiles',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800',
    url: '/places/manama-souq',
    area: 'Manama',
    category: 'Shopping',
    rating: 4.5,
    features: ['gold', 'pearls', 'spices', 'traditional'],
    tags: ['shopping', 'traditional', 'souq', 'gold'],
  },
  {
    id: 'place-12',
    type: 'place',
    title: 'Wahooo! Waterpark',
    slug: 'wahooo-waterpark',
    description: 'Indoor waterpark with slides and wave pool',
    image: 'https://images.unsplash.com/photo-1526582622520-4d6c30cd4db4?w=800',
    url: '/places/wahooo-waterpark',
    area: 'Seef',
    category: 'Entertainment',
    rating: 4.3,
    priceRange: 'BD 15',
    features: ['water slides', 'wave pool', 'family friendly'],
    tags: ['waterpark', 'family', 'kids', 'entertainment'],
  },
  {
    id: 'place-13',
    type: 'place',
    title: 'The Spa at Ritz-Carlton',
    slug: 'spa-ritz-carlton',
    description: 'Luxury spa with hammam and signature treatments',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
    url: '/places/spa-ritz-carlton',
    area: 'Seef',
    category: 'Spa',
    rating: 4.9,
    priceRange: 'BD 85+',
    features: ['hammam', 'massage', 'pool access'],
    tags: ['spa', 'wellness', 'luxury', 'relaxation'],
  },
  {
    id: 'place-14',
    type: 'place',
    title: 'Trader Vics',
    slug: 'trader-vics',
    description: 'Legendary Polynesian restaurant and bar',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    url: '/places/trader-vics',
    area: 'Seef',
    category: 'Bar',
    cuisine: 'Polynesian',
    rating: 4.4,
    priceRange: 'BD 20-40',
    features: ['cocktails', 'happy hour', 'live entertainment'],
    tags: ['bar', 'cocktails', 'happy hour', 'nightlife'],
  },
  {
    id: 'place-15',
    type: 'place',
    title: 'Four Seasons Hotel Bahrain',
    slug: 'four-seasons-bahrain',
    description: 'Ultra-luxury hotel with private beach and world-class dining',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    url: '/places/four-seasons-bahrain',
    area: 'Manama',
    category: 'Hotel',
    rating: 4.9,
    priceRange: 'BD 150+',
    features: ['private beach', 'spa', 'fine dining'],
    tags: ['luxury', 'hotel', 'beach', 'spa', 'nye'],
  },
];

// Mock Cinema Data
export const cinemaData: SearchItem[] = [
  {
    id: 'movie-1',
    type: 'cinema',
    title: 'Dune: Part Two',
    slug: 'dune-part-two',
    description: 'Paul Atreides unites with the Fremen while on a warpath of revenge',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800',
    url: '/cinema/dune-part-two',
    category: 'Sci-Fi',
    tags: ['sci-fi', 'action', 'epic', 'dune'],
  },
  {
    id: 'movie-2',
    type: 'cinema',
    title: 'Oppenheimer',
    slug: 'oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    url: '/cinema/oppenheimer',
    category: 'Drama',
    tags: ['drama', 'biography', 'history'],
  },
  {
    id: 'movie-3',
    type: 'cinema',
    title: 'The Batman',
    slug: 'the-batman',
    description: 'Batman ventures into Gotham City underworld',
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800',
    url: '/cinema/the-batman',
    category: 'Action',
    tags: ['action', 'superhero', 'batman', 'dc'],
  },
  {
    id: 'movie-4',
    type: 'cinema',
    title: 'Barbie',
    slug: 'barbie',
    description: 'Barbie and Ken are having the time of their lives in Barbie Land',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    url: '/cinema/barbie',
    category: 'Comedy',
    tags: ['comedy', 'family', 'fantasy'],
  },
  {
    id: 'movie-5',
    type: 'cinema',
    title: 'Avatar: The Way of Water',
    slug: 'avatar-way-of-water',
    description: 'Jake Sully lives with his newfound family on Pandora',
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800',
    url: '/cinema/avatar-way-of-water',
    category: 'Sci-Fi',
    tags: ['sci-fi', 'adventure', 'avatar', '3d'],
  },
  {
    id: 'movie-6',
    type: 'cinema',
    title: 'Spider-Man: Across the Spider-Verse',
    slug: 'spider-man-spider-verse',
    description: 'Miles Morales catapults across the Multiverse',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
    url: '/cinema/spider-man-spider-verse',
    category: 'Animation',
    tags: ['animation', 'superhero', 'family', 'spider-man'],
  },
  {
    id: 'movie-7',
    type: 'cinema',
    title: 'Mission: Impossible - Dead Reckoning',
    slug: 'mission-impossible-dead-reckoning',
    description: 'Ethan Hunt faces his most dangerous mission yet',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    url: '/cinema/mission-impossible-dead-reckoning',
    category: 'Action',
    tags: ['action', 'thriller', 'tom cruise'],
  },
  {
    id: 'movie-8',
    type: 'cinema',
    title: 'Wonka',
    slug: 'wonka',
    description: 'The story of how Willy Wonka became the world-famous chocolate maker',
    image: 'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=800',
    url: '/cinema/wonka',
    category: 'Family',
    tags: ['family', 'fantasy', 'musical'],
  },
];

// Mock Offers Data
export const offersData: SearchItem[] = [
  {
    id: 'offer-1',
    type: 'offer',
    title: 'Friday Brunch 20% Off',
    slug: 'friday-brunch-discount',
    description: 'Get 20% off Friday brunch at Ritz-Carlton with this exclusive offer',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    url: '/offers/friday-brunch-discount',
    venue: 'The Ritz-Carlton',
    area: 'Seef',
    category: 'Dining',
    tags: ['brunch', 'discount', 'dining', 'friday'],
  },
  {
    id: 'offer-2',
    type: 'offer',
    title: 'Ladies Night Free Entry',
    slug: 'ladies-night-free-entry',
    description: 'Free entry and 3 complimentary drinks for ladies every Wednesday',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
    url: '/offers/ladies-night-free-entry',
    venue: 'Various Venues',
    area: 'Multiple',
    category: 'Nightlife',
    tags: ['ladies night', 'free', 'drinks', 'nightlife'],
  },
  {
    id: 'offer-3',
    type: 'offer',
    title: 'NYE Early Bird Tickets',
    slug: 'nye-early-bird',
    description: 'Save 30% on NYE gala tickets when you book early',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800',
    url: '/offers/nye-early-bird',
    venue: 'Four Seasons Hotel',
    area: 'Manama',
    category: 'Special Event',
    tags: ['nye', 'new year', 'early bird', 'discount'],
  },
  {
    id: 'offer-4',
    type: 'offer',
    title: 'Happy Hour 2-for-1',
    slug: 'happy-hour-deal',
    description: '2-for-1 on all cocktails during happy hour',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    url: '/offers/happy-hour-deal',
    venue: 'Trader Vics',
    area: 'Seef',
    category: 'Nightlife',
    tags: ['happy hour', 'cocktails', 'deals', 'bar'],
  },
  {
    id: 'offer-5',
    type: 'offer',
    title: 'Spa Day Package',
    slug: 'spa-day-package',
    description: 'Full day spa access with massage and lunch for BD 99',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
    url: '/offers/spa-day-package',
    venue: 'The Spa at Ritz-Carlton',
    area: 'Seef',
    category: 'Wellness',
    tags: ['spa', 'wellness', 'massage', 'relaxation'],
  },
  {
    id: 'offer-6',
    type: 'offer',
    title: 'Family Waterpark Bundle',
    slug: 'family-waterpark-bundle',
    description: 'Family of 4 entry + lunch for BD 45',
    image: 'https://images.unsplash.com/photo-1526582622520-4d6c30cd4db4?w=800',
    url: '/offers/family-waterpark-bundle',
    venue: 'Wahooo! Waterpark',
    area: 'Seef',
    category: 'Family',
    tags: ['family', 'kids', 'waterpark', 'bundle'],
  },
  {
    id: 'offer-7',
    type: 'offer',
    title: 'Sushi Set Menu Deal',
    slug: 'sushi-set-menu',
    description: 'Premium sushi set for 2 at special price',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    url: '/offers/sushi-set-menu',
    venue: 'Maki',
    area: 'Seef',
    category: 'Dining',
    tags: ['sushi', 'japanese', 'set menu', 'dining'],
  },
  {
    id: 'offer-8',
    type: 'offer',
    title: 'Weekend Staycation',
    slug: 'weekend-staycation',
    description: 'Stay 2 nights get 3rd night free at Gulf Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    url: '/offers/weekend-staycation',
    venue: 'Gulf Hotel',
    area: 'Manama',
    category: 'Hotel',
    tags: ['staycation', 'hotel', 'weekend', 'deal'],
  },
  {
    id: 'offer-9',
    type: 'offer',
    title: 'Live Music Night Free Cover',
    slug: 'live-music-free-cover',
    description: 'Free entry to live music nights at Block 338',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    url: '/offers/live-music-free-cover',
    venue: 'Block 338',
    area: 'Adliya',
    category: 'Entertainment',
    tags: ['live music', 'free', 'entertainment', 'nightlife'],
  },
  {
    id: 'offer-10',
    type: 'offer',
    title: 'Brunch & Beach Combo',
    slug: 'brunch-beach-combo',
    description: 'Brunch + beach access for BD 35 per person',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    url: '/offers/brunch-beach-combo',
    venue: 'Coral Bay Resort',
    area: 'Amwaj Islands',
    category: 'Dining',
    tags: ['brunch', 'beach', 'combo', 'deal'],
  },
  {
    id: 'offer-11',
    type: 'offer',
    title: 'Steak Night Special',
    slug: 'steak-night-special',
    description: 'Premium steak dinner with wine for BD 45',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
    url: '/offers/steak-night-special',
    venue: 'CUT by Wolfgang Puck',
    area: 'Manama',
    category: 'Dining',
    tags: ['steak', 'dinner', 'wine', 'fine dining'],
  },
  {
    id: 'offer-12',
    type: 'offer',
    title: 'Movie & Dinner Package',
    slug: 'movie-dinner-package',
    description: 'Cinema tickets + dinner at City Centre for BD 20',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    url: '/offers/movie-dinner-package',
    venue: 'City Centre Bahrain',
    area: 'Seef',
    category: 'Entertainment',
    tags: ['cinema', 'dinner', 'package', 'date night'],
  },
  {
    id: 'offer-13',
    type: 'offer',
    title: 'Seafood Buffet Deal',
    slug: 'seafood-buffet-deal',
    description: 'All-you-can-eat seafood buffet for BD 25',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    url: '/offers/seafood-buffet-deal',
    venue: 'La Mer',
    area: 'Manama',
    category: 'Dining',
    tags: ['seafood', 'buffet', 'deal', 'dinner'],
  },
  {
    id: 'offer-14',
    type: 'offer',
    title: 'Pearl Diving Tour Discount',
    slug: 'pearl-diving-discount',
    description: '15% off pearl diving heritage experience',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    url: '/offers/pearl-diving-discount',
    venue: 'Pearl Diving Experience',
    area: 'Muharraq',
    category: 'Tours',
    tags: ['pearl diving', 'tour', 'heritage', 'discount'],
  },
  {
    id: 'offer-15',
    type: 'offer',
    title: 'Desert Safari Group Deal',
    slug: 'desert-safari-group',
    description: 'Book 4 get 1 free on desert safari adventures',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
    url: '/offers/desert-safari-group',
    venue: 'Desert Safari Tours',
    area: 'Southern',
    category: 'Tours',
    tags: ['desert', 'safari', 'group', 'adventure'],
  },
  {
    id: 'offer-16',
    type: 'offer',
    title: 'Mexican Fiesta Night',
    slug: 'mexican-fiesta-night',
    description: 'Unlimited tacos and margaritas for BD 22',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    url: '/offers/mexican-fiesta-night',
    venue: 'Calexico',
    area: 'Adliya',
    category: 'Dining',
    tags: ['mexican', 'tacos', 'margaritas', 'unlimited'],
  },
];

// All searchable data combined
export const allSearchData: SearchItem[] = [
  ...eventsData,
  ...placesData,
  ...cinemaData,
  ...offersData,
];

// Popular search terms
export const popularSearches = [
  'Ladies Night',
  'Brunch',
  'NYE',
  'Live Music',
  'Happy Hour',
  'Family',
  'Spa',
  'Beach',
];

// Search function
export function searchItems(
  query: string,
  type?: 'all' | 'events' | 'places' | 'cinema' | 'offers',
  limit?: number
): SearchResults {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return {
      query: '',
      totalResults: 0,
      results: {
        events: { count: 0, items: [] },
        places: { count: 0, items: [] },
        cinema: { count: 0, items: [] },
        offers: { count: 0, items: [] },
      },
      suggestions: [],
    };
  }

  const matchItem = (item: SearchItem): boolean => {
    const searchableText = [
      item.title,
      item.description,
      item.venue || '',
      item.area || '',
      item.category || '',
      item.cuisine || '',
      ...(item.tags || []),
      ...(item.features || []),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  };

  const filterAndLimit = (items: SearchItem[], maxItems?: number): SearchItem[] => {
    const filtered = items.filter(matchItem);
    return maxItems ? filtered.slice(0, maxItems) : filtered;
  };

  const eventResults = type === 'all' || type === 'events' || !type
    ? filterAndLimit(eventsData, limit)
    : [];
  const placeResults = type === 'all' || type === 'places' || !type
    ? filterAndLimit(placesData, limit)
    : [];
  const cinemaResults = type === 'all' || type === 'cinema' || !type
    ? filterAndLimit(cinemaData, limit)
    : [];
  const offerResults = type === 'all' || type === 'offers' || !type
    ? filterAndLimit(offersData, limit)
    : [];

  const totalResults =
    eventResults.length +
    placeResults.length +
    cinemaResults.length +
    offerResults.length;

  // Generate search suggestions based on query
  const suggestions = generateSuggestions(normalizedQuery);

  return {
    query,
    totalResults,
    results: {
      events: { count: eventResults.length, items: eventResults },
      places: { count: placeResults.length, items: placeResults },
      cinema: { count: cinemaResults.length, items: cinemaResults },
      offers: { count: offerResults.length, items: offerResults },
    },
    suggestions,
  };
}

function generateSuggestions(query: string): string[] {
  const suggestions: string[] = [];
  const queryWords = query.split(' ');

  // Add variations
  if (query.includes('brunch')) {
    suggestions.push('brunch friday', 'brunch saturday', 'best brunch bahrain');
  }
  if (query.includes('ladies')) {
    suggestions.push('ladies night wednesday', 'ladies night free drinks');
  }
  if (query.includes('nye') || query.includes('new year')) {
    suggestions.push('nye party bahrain', 'new year gala', 'nye dinner');
  }

  return suggestions.slice(0, 5);
}

// Get quick suggestions for dropdown
export function getQuickSuggestions(
  query: string,
  limit: number = 8
): SearchSuggestion[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery || normalizedQuery.length < 2) {
    return [];
  }

  const suggestions: SearchSuggestion[] = [];

  const matchItem = (item: SearchItem): boolean => {
    const searchableText = [
      item.title,
      item.venue || '',
      item.area || '',
      ...(item.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  };

  // Get matches from each category
  const matchedEvents = eventsData.filter(matchItem).slice(0, 3);
  const matchedPlaces = placesData.filter(matchItem).slice(0, 3);
  const matchedCinema = cinemaData.filter(matchItem).slice(0, 2);
  const matchedOffers = offersData.filter(matchItem).slice(0, 3);

  matchedEvents.forEach((item) => {
    suggestions.push({
      type: 'event',
      title: item.title,
      url: item.url,
      image: item.image,
      subtitle: item.venue || item.area,
    });
  });

  matchedPlaces.forEach((item) => {
    suggestions.push({
      type: 'place',
      title: item.title,
      url: item.url,
      image: item.image,
      subtitle: item.area,
    });
  });

  matchedCinema.forEach((item) => {
    suggestions.push({
      type: 'cinema',
      title: item.title,
      url: item.url,
      image: item.image,
      subtitle: item.category,
    });
  });

  matchedOffers.forEach((item) => {
    suggestions.push({
      type: 'offer',
      title: item.title,
      url: item.url,
      image: item.image,
      subtitle: item.venue,
    });
  });

  return suggestions.slice(0, limit);
}
