'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapIcon, Grid3X3, X } from 'lucide-react';
import PlaceCategoryTabs, { PlaceCategory } from '@/components/places/PlaceCategoryTabs';
import PlaceFilters, { PlaceFiltersState } from '@/components/places/PlaceFilters';
import PlaceGrid from '@/components/places/PlaceGrid';
import PlaceMapView from '@/components/places/PlaceMapView';
import TrendingPlaces from '@/components/places/TrendingPlaces';
import { Place } from '@/components/places/PlaceCard';

// Sample Data - 15 Places
const placesData: Place[] = [
  // RESTAURANTS (5)
  {
    id: '1',
    name: 'CUT by Wolfgang Puck',
    slug: 'cut-by-wolfgang-puck',
    category: 'restaurant',
    subcategory: ['Steakhouse', 'American', 'Fine Dining'],
    description: 'Award-winning celebrity chef Wolfgang Puck brings his signature steakhouse to Bahrain. Experience perfectly aged USDA Prime beef, fresh seafood, and an extensive wine list in an elegant setting at the Four Seasons Hotel.',
    address: 'Four Seasons Hotel, Bahrain Bay',
    area: 'Manama',
    latitude: 26.2406,
    longitude: 50.5765,
    phone: '+973 1711 5000',
    email: 'dining.bahrain@fourseasons.com',
    website: 'https://www.fourseasons.com/bahrain/dining/restaurants/cut/',
    instagram: 'faboratorycut',
    priceRange: 3,
    openingHours: {
      sunday: { open: '18:00', close: '23:30' },
      monday: { open: '18:00', close: '23:30' },
      tuesday: { open: '18:00', close: '23:30' },
      wednesday: { open: '18:00', close: '23:30' },
      thursday: { open: '18:00', close: '23:30' },
      friday: { open: '18:00', close: '23:30' },
      saturday: { open: '18:00', close: '23:30' },
    },
    features: ['Reservations', 'Parking', 'Fine Dining'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '2',
    name: 'Masso',
    slug: 'masso',
    category: 'restaurant',
    subcategory: ['Italian', 'Mediterranean', 'Fine Dining'],
    description: 'A sophisticated Italian restaurant offering authentic Mediterranean flavors with a modern twist. Handmade pasta, wood-fired pizzas, and an impressive selection of Italian wines make this a favorite destination for discerning diners.',
    address: 'The Avenues Mall, Building 2',
    area: 'Seef',
    latitude: 26.2291,
    longitude: 50.5358,
    phone: '+973 1721 5555',
    email: 'info@masso.bh',
    website: 'https://www.masso.bh',
    instagram: 'massoseef',
    priceRange: 3,
    openingHours: {
      sunday: { open: '12:00', close: '23:00' },
      monday: { open: '12:00', close: '23:00' },
      tuesday: { open: '12:00', close: '23:00' },
      wednesday: { open: '12:00', close: '23:00' },
      thursday: { open: '12:00', close: '00:00' },
      friday: { open: '12:00', close: '00:00' },
      saturday: { open: '12:00', close: '23:00' },
    },
    features: ['Reservations', 'Outdoor Seating', 'Parking', 'Family Friendly'],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800',
      'https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=200',
    upcomingEventsCount: 1,
  },
  {
    id: '3',
    name: 'Takara',
    slug: 'takara',
    category: 'restaurant',
    subcategory: ['Japanese', 'Sushi', 'Asian'],
    description: 'Authentic Japanese cuisine in the heart of Adliya. From fresh sashimi and expertly crafted sushi rolls to sizzling teppanyaki, Takara delivers an unforgettable culinary journey through Japan\'s rich culinary traditions.',
    address: 'Block 338, Road 3804',
    area: 'Adliya',
    latitude: 26.2145,
    longitude: 50.5912,
    phone: '+973 1771 4141',
    email: 'reservations@takara.bh',
    instagram: 'takarabahrain',
    priceRange: 2,
    openingHours: {
      sunday: { open: '12:00', close: '22:30' },
      monday: { open: '12:00', close: '22:30' },
      tuesday: { open: '12:00', close: '22:30' },
      wednesday: { open: '12:00', close: '22:30' },
      thursday: { open: '12:00', close: '23:00' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '22:30' },
    },
    features: ['Reservations', 'Private Dining'],
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
      'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '4',
    name: 'Zahle',
    slug: 'zahle',
    category: 'restaurant',
    subcategory: ['Lebanese', 'Middle Eastern', 'Mediterranean'],
    description: 'Experience the authentic flavors of Lebanon at Zahle. Enjoy a wide selection of hot and cold mezze, grilled meats, and traditional Lebanese dishes in a warm and welcoming atmosphere.',
    address: 'Juffair Grand Hotel, Block 323',
    area: 'Juffair',
    latitude: 26.2188,
    longitude: 50.5987,
    phone: '+973 1723 7999',
    email: 'info@zahle.bh',
    instagram: 'zahlebahrain',
    priceRange: 2,
    openingHours: {
      sunday: { open: '11:00', close: '23:00' },
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '00:00' },
      friday: { open: '11:00', close: '00:00' },
      saturday: { open: '11:00', close: '23:00' },
    },
    features: ['Shisha', 'Outdoor Seating', 'Live Music', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1529543544277-750e390e391e?w=800',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200',
    upcomingEventsCount: 2,
  },
  {
    id: '5',
    name: 'Calexico',
    slug: 'calexico',
    category: 'restaurant',
    subcategory: ['Mexican', 'Tex-Mex', 'Casual Dining'],
    description: 'Vibrant Mexican flavors meet Bahraini hospitality at Calexico. Enjoy authentic tacos, burritos, nachos, and refreshing margaritas in a fun and colorful setting overlooking the Amwaj Marina.',
    address: 'The Lagoon, Amwaj Islands',
    area: 'Amwaj',
    latitude: 26.3011,
    longitude: 50.6512,
    phone: '+973 1600 1234',
    instagram: 'calexicobahrain',
    priceRange: 1,
    openingHours: {
      sunday: { open: '12:00', close: '23:00' },
      monday: { open: '12:00', close: '23:00' },
      tuesday: { open: '12:00', close: '23:00' },
      wednesday: { open: '12:00', close: '23:00' },
      thursday: { open: '12:00', close: '00:00' },
      friday: { open: '12:00', close: '00:00' },
      saturday: { open: '12:00', close: '23:00' },
    },
    features: ['Outdoor Seating', 'Family Friendly', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800',
      'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1624300629298-e9f8e14d0e6c?w=200',
    upcomingEventsCount: 0,
  },

  // CAFES (3)
  {
    id: '6',
    name: 'Café Lilou',
    slug: 'cafe-lilou',
    category: 'cafe',
    subcategory: ['French', 'Bakery', 'Brunch'],
    description: 'A charming French-style café known for its exquisite pastries, fresh-baked croissants, and delightful brunch menu. Café Lilou has been an Adliya institution for over two decades.',
    address: 'Block 338, Road 3833',
    area: 'Adliya',
    latitude: 26.2133,
    longitude: 50.5925,
    phone: '+973 1771 4440',
    email: 'info@cafelilou.com',
    website: 'https://www.cafelilou.com',
    instagram: 'cafeliloubahrain',
    priceRange: 2,
    openingHours: {
      sunday: { open: '07:00', close: '23:00' },
      monday: { open: '07:00', close: '23:00' },
      tuesday: { open: '07:00', close: '23:00' },
      wednesday: { open: '07:00', close: '23:00' },
      thursday: { open: '07:00', close: '00:00' },
      friday: { open: '08:00', close: '00:00' },
      saturday: { open: '08:00', close: '23:00' },
    },
    features: ['Outdoor Seating', 'Family Friendly', 'Reservations'],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '7',
    name: 'Crust & Crema',
    slug: 'crust-and-crema',
    category: 'cafe',
    subcategory: ['Coffee', 'Brunch', 'Bakery'],
    description: 'A trendy coffee shop specializing in artisanal coffee and fresh brunch options. Their signature avocado toast and specialty lattes have made them a go-to spot for coffee enthusiasts.',
    address: 'City Centre Bahrain',
    area: 'Seef',
    latitude: 26.2285,
    longitude: 50.5401,
    phone: '+973 1758 5858',
    instagram: 'crustandcrema',
    priceRange: 1,
    openingHours: {
      sunday: { open: '08:00', close: '22:00' },
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '23:00' },
      friday: { open: '09:00', close: '23:00' },
      saturday: { open: '09:00', close: '22:00' },
    },
    features: ['Family Friendly', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '8',
    name: 'The Coffee Lab',
    slug: 'the-coffee-lab',
    category: 'cafe',
    subcategory: ['Specialty Coffee', 'Third Wave', 'Roastery'],
    description: 'A specialty coffee roastery and café dedicated to the art and science of exceptional coffee. Experience single-origin beans, precise brewing methods, and passionate baristas.',
    address: 'Block 320, Road 2005',
    area: 'Manama',
    latitude: 26.2245,
    longitude: 50.5782,
    phone: '+973 3399 1234',
    instagram: 'thecoffeelabbh',
    priceRange: 1,
    openingHours: {
      sunday: { open: '07:30', close: '21:00' },
      monday: { open: '07:30', close: '21:00' },
      tuesday: { open: '07:30', close: '21:00' },
      wednesday: { open: '07:30', close: '21:00' },
      thursday: { open: '07:30', close: '22:00' },
      friday: { open: '09:00', close: '22:00' },
      saturday: { open: '09:00', close: '21:00' },
    },
    features: [],
    images: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=200',
    upcomingEventsCount: 0,
  },

  // LOUNGES & BARS (4)
  {
    id: '9',
    name: 'The Orangery',
    slug: 'the-orangery',
    category: 'lounge',
    subcategory: ['Rooftop', 'Cocktails', 'Lounge'],
    description: 'An upscale rooftop lounge offering panoramic views of Manama\'s skyline. Enjoy expertly crafted cocktails, live music on weekends, and a sophisticated atmosphere under the stars.',
    address: 'Downtown Rotana Hotel, Manama',
    area: 'Manama',
    latitude: 26.2312,
    longitude: 50.5689,
    phone: '+973 1311 0000',
    website: 'https://www.rotana.com/downtownrotana',
    instagram: 'theorangerymanama',
    priceRange: 3,
    openingHours: {
      sunday: { open: '17:00', close: '01:00' },
      monday: { open: '17:00', close: '01:00' },
      tuesday: { open: '17:00', close: '01:00' },
      wednesday: { open: '17:00', close: '01:00' },
      thursday: { open: '17:00', close: '02:00' },
      friday: { open: '17:00', close: '02:00' },
      saturday: { open: '17:00', close: '01:00' },
    },
    features: ['Outdoor Seating', 'Live Music', 'Reservations'],
    images: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1582106245687-cfd4d5c846d5?w=200',
    upcomingEventsCount: 3,
  },
  {
    id: '10',
    name: 'Trader Vic\'s',
    slug: 'trader-vics',
    category: 'bar',
    subcategory: ['Tiki Bar', 'Cocktails', 'Polynesian'],
    description: 'The legendary Tiki bar experience with exotic cocktails, Polynesian-inspired cuisine, and a vibrant tropical atmosphere. Famous for their signature Mai Tais and pupu platters.',
    address: 'The Ritz-Carlton, Bahrain',
    area: 'Seef',
    latitude: 26.2345,
    longitude: 50.5412,
    phone: '+973 1758 6499',
    website: 'https://www.ritzcarlton.com/bahrain',
    instagram: 'tradervicsbahrain',
    priceRange: 3,
    openingHours: {
      sunday: { open: '18:00', close: '01:00' },
      monday: { open: '18:00', close: '01:00' },
      tuesday: { open: '18:00', close: '01:00' },
      wednesday: { open: '18:00', close: '01:00' },
      thursday: { open: '18:00', close: '02:00' },
      friday: { open: '18:00', close: '02:00' },
      saturday: { open: '18:00', close: '01:00' },
    },
    features: ['Live Music', 'Reservations'],
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1527761939622-9119094c8d4d?w=200',
    upcomingEventsCount: 1,
  },
  {
    id: '11',
    name: 'JJ\'s Irish Bar',
    slug: 'jjs-irish-bar',
    category: 'bar',
    subcategory: ['Sports Bar', 'Pub', 'Irish'],
    description: 'A beloved Irish pub featuring live sports on big screens, quiz nights, live bands, and a great selection of beers on tap. The perfect spot to catch a game with friends.',
    address: 'Juffair Village',
    area: 'Juffair',
    latitude: 26.2201,
    longitude: 50.5978,
    phone: '+973 1773 2222',
    instagram: 'jjsirishbahrain',
    priceRange: 2,
    openingHours: {
      sunday: { open: '12:00', close: '01:00' },
      monday: { open: '12:00', close: '01:00' },
      tuesday: { open: '12:00', close: '01:00' },
      wednesday: { open: '12:00', close: '01:00' },
      thursday: { open: '12:00', close: '02:00' },
      friday: { open: '12:00', close: '02:00' },
      saturday: { open: '12:00', close: '01:00' },
    },
    features: ['Live Sports', 'Live Music', 'Outdoor Seating'],
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
      'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1571759074754-30bf6e8a8af9?w=200',
    upcomingEventsCount: 4,
  },
  {
    id: '12',
    name: 'Wanna Banana',
    slug: 'wanna-banana',
    category: 'lounge',
    subcategory: ['Shisha', 'Lounge', 'Café'],
    description: 'A trendy shisha lounge and café in the heart of Adliya. Relax with premium shisha flavors, fresh juices, and light bites in a chill atmosphere with great music.',
    address: 'Block 338, Road 3821',
    area: 'Adliya',
    latitude: 26.2128,
    longitude: 50.5918,
    phone: '+973 1771 8888',
    instagram: 'wannabananabh',
    priceRange: 2,
    openingHours: {
      sunday: { open: '16:00', close: '02:00' },
      monday: { open: '16:00', close: '02:00' },
      tuesday: { open: '16:00', close: '02:00' },
      wednesday: { open: '16:00', close: '02:00' },
      thursday: { open: '16:00', close: '03:00' },
      friday: { open: '16:00', close: '03:00' },
      saturday: { open: '16:00', close: '02:00' },
    },
    features: ['Shisha', 'Outdoor Seating'],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800',
      'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=200',
    upcomingEventsCount: 0,
  },

  // NIGHTCLUBS (2)
  {
    id: '13',
    name: 'Amber Lounge',
    slug: 'amber-lounge',
    category: 'nightclub',
    subcategory: ['Club', 'DJ', 'VIP'],
    description: 'An exclusive nightclub experience featuring world-class DJs, VIP bottle service, and an electric atmosphere. The place to see and be seen in Bahrain\'s nightlife scene.',
    address: 'Four Seasons Hotel, Bahrain Bay',
    area: 'Manama',
    latitude: 26.2408,
    longitude: 50.5768,
    phone: '+973 1711 5050',
    instagram: 'amberlounge',
    priceRange: 3,
    openingHours: {
      sunday: 'closed',
      monday: 'closed',
      tuesday: 'closed',
      wednesday: { open: '22:00', close: '03:00' },
      thursday: { open: '22:00', close: '03:00' },
      friday: { open: '22:00', close: '03:00' },
      saturday: { open: '22:00', close: '03:00' },
    },
    features: ['DJ', 'Reservations'],
    images: [
      'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800',
      'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1582106245687-cfd4d5c846d5?w=200',
    upcomingEventsCount: 2,
  },
  {
    id: '14',
    name: 'Club 360',
    slug: 'club-360',
    category: 'nightclub',
    subcategory: ['Club', 'Live DJ', 'Dance'],
    description: 'High-energy nightclub with cutting-edge sound systems, live DJs spinning the latest tracks, and a vibrant dance floor. Party all night in Juffair\'s premier club destination.',
    address: 'Elite Grande Hotel, Juffair',
    area: 'Juffair',
    latitude: 26.2195,
    longitude: 50.5992,
    phone: '+973 1771 3600',
    instagram: 'club360bahrain',
    priceRange: 2,
    openingHours: {
      sunday: 'closed',
      monday: 'closed',
      tuesday: 'closed',
      wednesday: { open: '21:00', close: '03:00' },
      thursday: { open: '21:00', close: '03:00' },
      friday: { open: '21:00', close: '03:00' },
      saturday: { open: '21:00', close: '03:00' },
    },
    features: ['DJ', 'Live Music'],
    images: [
      'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800',
      'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200',
    upcomingEventsCount: 5,
  },

  // BEACH CLUBS (1)
  {
    id: '15',
    name: 'Coral Bay Beach Club',
    slug: 'coral-bay-beach-club',
    category: 'beach-club',
    subcategory: ['Beach', 'Pool', 'Restaurant', 'Bar'],
    description: 'A stunning beachfront destination with pristine pools, private beach access, and exceptional dining. Spend the day lounging by the pool or enjoying water sports in the Arabian Gulf.',
    address: 'Bahrain Bay, Manama',
    area: 'Manama',
    latitude: 26.2425,
    longitude: 50.5798,
    phone: '+973 1711 5100',
    website: 'https://www.coralbayclub.com',
    instagram: 'coralbaybahrain',
    priceRange: 3,
    openingHours: {
      sunday: { open: '10:00', close: '20:00' },
      monday: { open: '10:00', close: '20:00' },
      tuesday: { open: '10:00', close: '20:00' },
      wednesday: { open: '10:00', close: '20:00' },
      thursday: { open: '10:00', close: '22:00' },
      friday: { open: '10:00', close: '22:00' },
      saturday: { open: '10:00', close: '20:00' },
    },
    features: ['Pool Access', 'Beach', 'Outdoor Seating', 'Parking', 'Family Friendly'],
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    ],
    logo: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=200',
    upcomingEventsCount: 2,
  },
];

// Tonight's Offers
const tonightOffers = [
  {
    id: 'o1',
    title: 'Ladies Night',
    venue: 'The Orangery',
    venueSlug: 'the-orangery',
    type: 'Ladies Night',
    time: '7PM - 12AM',
    discount: '3 Free Drinks',
  },
  {
    id: 'o2',
    title: 'Happy Hour',
    venue: 'JJ\'s Irish Bar',
    venueSlug: 'jjs-irish-bar',
    type: 'Happy Hour',
    time: '4PM - 8PM',
    discount: '50% Off',
  },
  {
    id: 'o3',
    title: 'Quiz Night',
    venue: 'Trader Vic\'s',
    venueSlug: 'trader-vics',
    type: 'Entertainment',
    time: '8PM',
  },
];

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState<PlaceFiltersState>({
    area: 'all',
    priceRange: 'all',
    features: [],
    sortBy: 'recommended',
  });

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: placesData.length };
    placesData.forEach((place) => {
      counts[place.category] = (counts[place.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categories = [
    { category: 'all' as PlaceCategory, label: 'All Places', count: counts('all'), icon: '🌟' },
    { category: 'restaurant' as PlaceCategory, label: 'Restaurants', count: counts('restaurant'), icon: '🍽️' },
    { category: 'cafe' as PlaceCategory, label: 'Cafes & Coffee Shops', count: counts('cafe'), icon: '☕' },
    { category: 'lounge' as PlaceCategory, label: 'Lounges & Bars', count: counts('lounge') + counts('bar'), icon: '🍸' },
    { category: 'nightclub' as PlaceCategory, label: 'Nightclubs', count: counts('nightclub'), icon: '🎵' },
    { category: 'beach-club' as PlaceCategory, label: 'Beach & Pool Clubs', count: counts('beach-club'), icon: '🏖️' },
  ];

  function counts(cat: string): number {
    if (cat === 'lounge') {
      return (categoryCounts['lounge'] || 0);
    }
    if (cat === 'bar') {
      return (categoryCounts['bar'] || 0);
    }
    return categoryCounts[cat] || 0;
  }

  // Filter places
  const filteredPlaces = useMemo(() => {
    let result = [...placesData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (place) =>
          place.name.toLowerCase().includes(query) ||
          place.subcategory.some((s) => s.toLowerCase().includes(query)) ||
          place.area.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'lounge') {
        result = result.filter((place) => place.category === 'lounge' || place.category === 'bar');
      } else {
        result = result.filter((place) => place.category === selectedCategory);
      }
    }

    // Area filter
    if (filters.area !== 'all') {
      result = result.filter(
        (place) => place.area.toLowerCase() === filters.area.toLowerCase()
      );
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      result = result.filter(
        (place) => place.priceRange === parseInt(filters.priceRange)
      );
    }

    // Features filter
    if (filters.features.length > 0) {
      result = result.filter((place) =>
        filters.features.every((f) => place.features.includes(f))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        // Mock: reverse order
        result.reverse();
        break;
      case 'popular':
        result.sort((a, b) => b.upcomingEventsCount - a.upcomingEventsCount);
        break;
      default:
        // Recommended: keep original order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, filters]);

  // Trending places (top 3 by events)
  const trendingPlaces = useMemo(() => {
    return [...placesData]
      .sort((a, b) => b.upcomingEventsCount - a.upcomingEventsCount)
      .slice(0, 3);
  }, []);

  // New openings (mock: last 3 added)
  const newOpenings = useMemo(() => {
    return placesData.slice(-3).reverse();
  }, []);

  const clearFilters = () => {
    setFilters({
      area: 'all',
      priceRange: 'all',
      features: [],
      sortBy: 'recommended',
    });
  };

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (filters.area !== 'all') params.set('area', filters.area);
    if (filters.priceRange !== 'all') params.set('price', filters.priceRange);
    if (searchQuery) params.set('q', searchQuery);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [selectedCategory, filters, searchQuery]);

  return (
    <>
      {/* SEO */}
      <head>
        <title>Best Restaurants, Bars & Nightlife in Bahrain | BahrainNights</title>
        <meta
          name="description"
          content="Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs across Manama, Seef, Juffair, and more."
        />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-orange-500/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                Dining & Nightlife in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                  Bahrain
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover the best restaurants, cafes, lounges, and nightclubs
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          {/* Category Tabs */}
          <div className="mb-6">
            <PlaceCategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <PlaceFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            />

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{filteredPlaces.length}</span>{' '}
              places
            </p>
          </div>

          {/* Content */}
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {viewMode === 'grid' ? (
                <PlaceGrid places={filteredPlaces} />
              ) : (
                <PlaceMapView places={filteredPlaces} />
              )}
            </div>

            {/* Sidebar (Desktop Only) */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <TrendingPlaces
                trending={trendingPlaces}
                newOpenings={newOpenings}
                tonightOffers={tonightOffers}
              />
            </div>
          </div>
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Best Restaurants, Bars & Nightlife in Bahrain',
              description:
                'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs.',
              url: 'https://www.bahrainnights.com/places',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: placesData.slice(0, 10).map((place, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'LocalBusiness',
                    name: place.name,
                    description: place.description,
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: place.area,
                      addressCountry: 'BH',
                    },
                    telephone: place.phone,
                    priceRange: 'BD'.repeat(place.priceRange),
                    geo: {
                      '@type': 'GeoCoordinates',
                      latitude: place.latitude,
                      longitude: place.longitude,
                    },
                  },
                })),
              },
            }),
          }}
        />
      </div>
    </>
  );
}
