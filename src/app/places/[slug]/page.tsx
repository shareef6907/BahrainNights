'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Navigation } from 'lucide-react';
import PlaceHero from '@/components/places/PlaceHero';
import PlaceActionBar from '@/components/places/PlaceActionBar';
import PlaceInfo from '@/components/places/PlaceInfo';
import PlaceGallery from '@/components/places/PlaceGallery';
import PlaceFeatures from '@/components/places/PlaceFeatures';
import PlaceOffers, { PlaceOffer } from '@/components/places/PlaceOffers';
import PlaceHours from '@/components/places/PlaceHours';
import PlaceMap from '@/components/places/PlaceMap';
import PlaceEvents, { PlaceEvent } from '@/components/places/PlaceEvents';
import SimilarPlaces from '@/components/places/SimilarPlaces';
import PlaceShareModal from '@/components/places/PlaceShareModal';
import { Place, OpeningHours } from '@/components/places/PlaceCard';

// Extended Place interface for detail page
interface PlaceDetail extends Place {
  cuisineTypes: string[];
  avgCostPerPerson: string;
  facebook?: string;
  bookingUrl?: string;
  menuUrl?: string;
  offers: PlaceOffer[];
  upcomingEvents: PlaceEvent[];
}

// Featured Place Data - The Orangery
const featuredPlace: PlaceDetail = {
  id: 'the-orangery',
  name: 'The Orangery',
  slug: 'the-orangery',
  category: 'lounge',
  subcategory: ['Rooftop Bar', 'Cocktails', 'International'],
  cuisineTypes: ['International', 'Cocktails', 'Tapas'],
  priceRange: 3,
  avgCostPerPerson: 'BD 25-40',

  description: `Perched atop one of Manama's most prestigious addresses, The Orangery offers a sophisticated rooftop experience with panoramic views of the city skyline. Known for its expertly crafted cocktails, international tapas menu, and vibrant atmosphere, it's the perfect destination for sunset drinks or a glamorous night out.

The venue features both indoor and outdoor seating, with a stunning terrace that comes alive as the sun sets over Bahrain Bay. Whether you're celebrating a special occasion, enjoying a romantic evening, or catching up with friends, The Orangery provides an unparalleled ambiance.

Our award-winning mixologists create innovative cocktails using premium spirits and fresh ingredients, while our culinary team prepares a selection of international tapas designed for sharing. The venue also hosts weekly live music performances featuring local and international artists.

With its elegant décor, attentive service, and breathtaking views, The Orangery has become one of Bahrain's most sought-after destinations for discerning guests seeking an elevated nightlife experience.`,

  address: 'Level 25, Downtown Rotana Hotel, Manama Bay',
  area: 'Manama',
  latitude: 26.2285,
  longitude: 50.5860,

  phone: '+973 1311 0000',
  email: 'reservations@theorangery.bh',
  website: 'https://www.rotana.com/downtownrotana',
  instagram: 'theorangerybh',
  facebook: 'theorangerybahrain',

  openingHours: {
    sunday: { open: '17:00', close: '01:00' },
    monday: { open: '17:00', close: '01:00' },
    tuesday: { open: '17:00', close: '02:00' },
    wednesday: { open: '17:00', close: '02:00' },
    thursday: { open: '17:00', close: '02:00' },
    friday: { open: '15:00', close: '02:00' },
    saturday: { open: '15:00', close: '02:00' },
  },

  features: [
    'Outdoor Seating',
    'Live Music',
    'Reservations',
    'Valet Parking',
    'WiFi',
    'Private Events',
  ],

  images: [
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200',
    'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1200',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200',
    'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200',
  ],

  logo: 'https://images.unsplash.com/photo-1582106245687-cfd4d5c846d5?w=200',

  upcomingEventsCount: 3,

  offers: [
    {
      id: 'o1',
      title: 'Ladies Night',
      day: 'Tuesday',
      description: 'Complimentary drinks for ladies from 8 PM - 12 AM. Enjoy 3 free house beverages.',
      validUntil: 'Ongoing',
      type: 'ladies-night',
    },
    {
      id: 'o2',
      title: 'Happy Hour',
      day: 'Daily',
      description: '50% off selected beverages from 5 PM - 8 PM. Perfect for after-work drinks.',
      validUntil: 'Ongoing',
      type: 'happy-hour',
    },
    {
      id: 'o3',
      title: 'Weekend Brunch',
      day: 'Friday & Saturday',
      description: 'Premium brunch with unlimited drinks from 1 PM - 5 PM. BD 35 per person.',
      validUntil: 'Ongoing',
      type: 'brunch',
    },
    {
      id: 'o4',
      title: 'Sunset Special',
      day: 'Daily',
      description: 'Complimentary appetizer with any bottle purchase before 7 PM.',
      validUntil: 'December 31, 2025',
      type: 'special',
    },
  ],

  upcomingEvents: [
    {
      id: 'e1',
      title: 'Live Jazz Night',
      slug: 'live-jazz-night-orangery',
      date: 'Friday, January 3',
      time: '9:00 PM',
      image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600',
      category: 'Live Music',
      categoryColor: 'bg-purple-500',
    },
    {
      id: 'e2',
      title: 'NYE Countdown Party',
      slug: 'nye-countdown-party-2025',
      date: 'Tuesday, December 31',
      time: '9:00 PM',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',
      category: 'Party',
      categoryColor: 'bg-pink-500',
    },
    {
      id: 'e3',
      title: 'Sunset Sessions DJ Night',
      slug: 'sunset-sessions-dj-night',
      date: 'Saturday, January 4',
      time: '7:00 PM',
      image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=600',
      category: 'DJ Night',
      categoryColor: 'bg-indigo-500',
    },
  ],

  bookingUrl: 'https://www.rotana.com/downtownrotana/dining/the-orangery',
  menuUrl: 'https://www.rotana.com/downtownrotana/dining/the-orangery/menu',
};

// Similar Places (Same Category - Lounges/Bars)
const similarPlaces: Place[] = [
  {
    id: '10',
    name: "Trader Vic's",
    slug: 'trader-vics',
    category: 'bar',
    subcategory: ['Tiki Bar', 'Cocktails', 'Polynesian'],
    description: 'Legendary Tiki bar with exotic cocktails and Polynesian cuisine',
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
    images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'],
    logo: 'https://images.unsplash.com/photo-1527761939622-9119094c8d4d?w=200',
    upcomingEventsCount: 1,
  },
  {
    id: '11',
    name: "JJ's Irish Bar",
    slug: 'jjs-irish-bar',
    category: 'bar',
    subcategory: ['Sports Bar', 'Pub', 'Irish'],
    description: 'Beloved Irish pub with live sports, quiz nights, and great beers',
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
    images: ['https://images.unsplash.com/photo-1503095396549-807759245b35?w=800'],
    logo: 'https://images.unsplash.com/photo-1571759074754-30bf6e8a8af9?w=200',
    upcomingEventsCount: 4,
  },
  {
    id: '12',
    name: 'Wanna Banana',
    slug: 'wanna-banana',
    category: 'lounge',
    subcategory: ['Shisha', 'Lounge', 'Café'],
    description: 'Trendy shisha lounge with premium flavors and chill vibes',
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
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'],
    logo: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '13',
    name: 'Amber Lounge',
    slug: 'amber-lounge',
    category: 'nightclub',
    subcategory: ['Club', 'DJ', 'VIP'],
    description: 'Exclusive nightclub with world-class DJs and VIP bottle service',
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
    images: ['https://images.unsplash.com/photo-1545128485-c400e7702796?w=800'],
    logo: 'https://images.unsplash.com/photo-1582106245687-cfd4d5c846d5?w=200',
    upcomingEventsCount: 2,
  },
];

// Nearby Places (Same Area - Manama)
const nearbyPlaces: Place[] = [
  {
    id: '1',
    name: 'CUT by Wolfgang Puck',
    slug: 'cut-by-wolfgang-puck',
    category: 'restaurant',
    subcategory: ['Steakhouse', 'American', 'Fine Dining'],
    description: 'Award-winning celebrity chef steakhouse at Four Seasons',
    address: 'Four Seasons Hotel, Bahrain Bay',
    area: 'Manama',
    latitude: 26.2406,
    longitude: 50.5765,
    phone: '+973 1711 5000',
    website: 'https://www.fourseasons.com/bahrain',
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
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=800'],
    logo: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '8',
    name: 'The Coffee Lab',
    slug: 'the-coffee-lab',
    category: 'cafe',
    subcategory: ['Specialty Coffee', 'Third Wave', 'Roastery'],
    description: 'Specialty coffee roastery dedicated to exceptional coffee',
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
    images: ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800'],
    logo: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=200',
    upcomingEventsCount: 0,
  },
  {
    id: '15',
    name: 'Coral Bay Beach Club',
    slug: 'coral-bay-beach-club',
    category: 'beach-club',
    subcategory: ['Beach', 'Pool', 'Restaurant'],
    description: 'Stunning beachfront destination with pools and dining',
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
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800'],
    logo: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=200',
    upcomingEventsCount: 2,
  },
  {
    id: '14',
    name: 'Club 360',
    slug: 'club-360',
    category: 'nightclub',
    subcategory: ['Club', 'Live DJ', 'Dance'],
    description: 'High-energy nightclub with cutting-edge sound systems',
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
    images: ['https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800'],
    logo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200',
    upcomingEventsCount: 5,
  },
];

const categoryColors: Record<string, string> = {
  restaurant: 'bg-orange-500',
  cafe: 'bg-amber-600',
  lounge: 'bg-purple-500',
  bar: 'bg-blue-500',
  nightclub: 'bg-pink-500',
  'beach-club': 'bg-cyan-500',
};

const categoryLabels: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  lounge: 'Lounge',
  bar: 'Bar',
  nightclub: 'Nightclub',
  'beach-club': 'Beach Club',
};

export default function PlaceDetailPage() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const place = featuredPlace;

  // Calculate if open now and today's hours
  const { isOpen, todayHours } = useMemo(() => {
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[now.getDay()];
    const hours = place.openingHours[today];

    if (!hours || hours === 'closed') {
      return { isOpen: false, todayHours: 'Closed today' };
    }

    const currentTime = now.getHours() * 100 + now.getMinutes();
    const openTime = parseInt(hours.open.replace(':', ''));
    let closeTime = parseInt(hours.close.replace(':', ''));

    const formatTime = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHours = h % 12 || 12;
      return `${displayHours}:${m.toString().padStart(2, '0')} ${period}`;
    };

    let isCurrentlyOpen = false;
    if (closeTime < openTime) {
      isCurrentlyOpen = currentTime >= openTime || currentTime <= closeTime;
    } else {
      isCurrentlyOpen = currentTime >= openTime && currentTime <= closeTime;
    }

    return {
      isOpen: isCurrentlyOpen,
      todayHours: `${formatTime(hours.open)} - ${formatTime(hours.close)}`,
    };
  }, [place.openingHours]);

  const placeUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/places/${place.slug}`
    : `https://bahrainnights.com/places/${place.slug}`;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: place.name,
            description: place.description.slice(0, 200),
            image: place.images[0],
            url: placeUrl,
            telephone: place.phone,
            email: place.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: place.address,
              addressLocality: place.area,
              addressCountry: 'BH',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: place.latitude,
              longitude: place.longitude,
            },
            priceRange: 'BD'.repeat(place.priceRange),
            openingHoursSpecification: Object.entries(place.openingHours)
              .filter(([_, hours]) => hours !== 'closed')
              .map(([day, hours]) => ({
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
                opens: typeof hours === 'object' ? hours.open : undefined,
                closes: typeof hours === 'object' ? hours.close : undefined,
              })),
            sameAs: [
              place.instagram ? `https://instagram.com/${place.instagram}` : null,
              place.facebook ? `https://facebook.com/${place.facebook}` : null,
              place.website,
            ].filter(Boolean),
          }),
        }}
      />

      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        {/* Hero Section */}
        <PlaceHero
          name={place.name}
          category={categoryLabels[place.category]}
          categoryColor={categoryColors[place.category]}
          subcategory={place.subcategory}
          area={place.area}
          priceRange={place.priceRange}
          coverImage={place.images[0]}
          logo={place.logo}
          isOpen={isOpen}
          todayHours={todayHours}
          onShareClick={() => setShareModalOpen(true)}
          onSaveClick={() => setIsSaved(!isSaved)}
          isSaved={isSaved}
        />

        {/* Action Bar */}
        <PlaceActionBar
          phone={place.phone}
          latitude={place.latitude}
          longitude={place.longitude}
          bookingUrl={place.bookingUrl}
          menuUrl={place.menuUrl}
          instagram={place.instagram}
          website={place.website}
          name={place.name}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - 65% */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <PlaceInfo description={place.description} />

              {/* Photo Gallery */}
              <PlaceGallery images={place.images} name={place.name} />

              {/* Features & Amenities */}
              <PlaceFeatures features={place.features} />

              {/* Upcoming Events */}
              <PlaceEvents
                events={place.upcomingEvents}
                venueName={place.name}
                venueSlug={place.slug}
              />

              {/* Current Offers */}
              <PlaceOffers offers={place.offers} />
            </div>

            {/* Right Column - 35% */}
            <div className="space-y-6">
              {/* Opening Hours & Contact */}
              <PlaceHours
                openingHours={place.openingHours}
                phone={place.phone}
                email={place.email}
                website={place.website}
                instagram={place.instagram}
                facebook={place.facebook}
              />

              {/* Map & Location */}
              <PlaceMap
                name={place.name}
                address={place.address}
                latitude={place.latitude}
                longitude={place.longitude}
                area={place.area}
              />

              {/* Price Range Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3">Price Range</h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold">
                    <span className="text-yellow-400">{'BD '.repeat(place.priceRange).trim()}</span>
                    <span className="text-gray-600">{' BD'.repeat(3 - place.priceRange)}</span>
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Average cost: <span className="text-white font-medium">{place.avgCostPerPerson}</span> per person
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="mt-16 space-y-12">
            {/* Similar Places */}
            <SimilarPlaces
              title="Similar Places"
              places={similarPlaces}
              viewAllHref="/places?category=lounge"
            />

            {/* Nearby Places */}
            <SimilarPlaces
              title="Nearby Places"
              places={nearbyPlaces}
              viewAllHref="/places?area=Manama"
            />
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            {place.phone && (
              <motion.a
                href={`tel:${place.phone}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Call
              </motion.a>
            )}
            <motion.button
              onClick={() => {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                const mapsUrl = isIOS
                  ? `maps://maps.apple.com/?daddr=${place.latitude},${place.longitude}`
                  : `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
                window.open(mapsUrl, '_blank');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold"
              whileTap={{ scale: 0.98 }}
            >
              <Navigation className="w-5 h-5" />
              Directions
            </motion.button>
          </div>
        </div>

        {/* Share Modal */}
        <PlaceShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={place.name}
          url={placeUrl}
        />

        {/* Bottom padding for mobile sticky bar */}
        <div className="h-24 lg:hidden" />
      </div>
    </>
  );
}
