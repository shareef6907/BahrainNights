'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Navigation } from 'lucide-react';
import PlaceHero from './PlaceHero';
import PlaceActionBar from './PlaceActionBar';
import PlaceInfo from './PlaceInfo';
import PlaceGallery from './PlaceGallery';
import PlaceFeatures from './PlaceFeatures';
import PlaceOffers, { PlaceOffer } from './PlaceOffers';
import PlaceHours from './PlaceHours';
import PlaceMap from './PlaceMap';
import PlaceEvents, { PlaceEvent } from './PlaceEvents';
import SimilarPlaces from './SimilarPlaces';
import PlaceShareModal from './PlaceShareModal';
import { Place } from './PlaceCard';

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

interface PlaceDetailPageContentProps {
  category?: string;
}

// All places data (In production, this would come from a database)
const allPlacesData: Record<string, PlaceDetail> = {
  'the-orangery': {
    id: 'the-orangery',
    name: 'The Orangery',
    slug: 'the-orangery',
    category: 'lounge',
    subcategory: ['Rooftop Bar', 'Cocktails', 'International'],
    cuisineTypes: ['International', 'Cocktails', 'Tapas'],
    priceRange: 3,
    avgCostPerPerson: 'BD 25-40',
    description: `Perched atop one of Manama's most prestigious addresses, The Orangery offers a sophisticated rooftop experience with panoramic views of the city skyline. Known for its expertly crafted cocktails, international tapas menu, and vibrant atmosphere, it's the perfect destination for sunset drinks or a glamorous night out.

The venue features both indoor and outdoor seating, with a stunning terrace that comes alive as the sun sets over Bahrain Bay. Whether you're celebrating a special occasion, enjoying a romantic evening, or catching up with friends, The Orangery provides an unparalleled ambiance.`,
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
    features: ['Outdoor Seating', 'Live Music', 'Reservations', 'Valet Parking', 'WiFi', 'Private Events'],
    images: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200',
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1200',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200',
    ],
    logo: 'https://images.unsplash.com/photo-1582106245687-cfd4d5c846d5?w=200',
    upcomingEventsCount: 3,
    offers: [
      { id: 'o1', title: 'Ladies Night', day: 'Tuesday', description: 'Complimentary drinks for ladies from 8 PM - 12 AM', validUntil: 'Ongoing', type: 'ladies-night' },
      { id: 'o2', title: 'Happy Hour', day: 'Daily', description: '50% off selected beverages from 5 PM - 8 PM', validUntil: 'Ongoing', type: 'happy-hour' },
    ],
    upcomingEvents: [
      { id: 'e1', title: 'Live Jazz Night', slug: 'live-jazz-night-orangery', date: 'Friday, January 3', time: '9:00 PM', image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600', category: 'Live Music', categoryColor: 'bg-purple-500' },
    ],
    bookingUrl: 'https://www.rotana.com/downtownrotana/dining/the-orangery',
    menuUrl: 'https://www.rotana.com/downtownrotana/dining/the-orangery/menu',
  },
  'cut-by-wolfgang-puck': {
    id: '1',
    name: 'CUT by Wolfgang Puck',
    slug: 'cut-by-wolfgang-puck',
    category: 'restaurant',
    subcategory: ['Steakhouse', 'American', 'Fine Dining'],
    cuisineTypes: ['American', 'Steakhouse', 'Fine Dining'],
    priceRange: 3,
    avgCostPerPerson: 'BD 40-60',
    description: `Award-winning celebrity chef Wolfgang Puck brings his signature steakhouse to Bahrain. Experience perfectly aged USDA Prime beef, fresh seafood, and an extensive wine list in an elegant setting at the Four Seasons Hotel.

The restaurant features an open kitchen where you can watch our master chefs prepare your meal to perfection. The sophisticated décor combines modern elegance with warm hospitality, creating the perfect ambiance for business dinners or special celebrations.`,
    address: 'Four Seasons Hotel, Bahrain Bay',
    area: 'Manama',
    latitude: 26.2406,
    longitude: 50.5765,
    phone: '+973 1711 5000',
    email: 'dining.bahrain@fourseasons.com',
    website: 'https://www.fourseasons.com/bahrain/dining/restaurants/cut/',
    instagram: 'faboratorycut',
    openingHours: {
      sunday: { open: '18:00', close: '23:30' },
      monday: { open: '18:00', close: '23:30' },
      tuesday: { open: '18:00', close: '23:30' },
      wednesday: { open: '18:00', close: '23:30' },
      thursday: { open: '18:00', close: '23:30' },
      friday: { open: '18:00', close: '23:30' },
      saturday: { open: '18:00', close: '23:30' },
    },
    features: ['Reservations', 'Parking', 'Fine Dining', 'Private Dining', 'Valet Parking'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200',
      'https://images.unsplash.com/photo-1558030006-450675393462?w=1200',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    ],
    logo: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=200',
    upcomingEventsCount: 0,
    offers: [],
    upcomingEvents: [],
    bookingUrl: 'https://www.fourseasons.com/bahrain/dining/restaurants/cut/reservations/',
    menuUrl: 'https://www.fourseasons.com/bahrain/dining/restaurants/cut/menu/',
  },
  'cafe-lilou': {
    id: '6',
    name: 'Café Lilou',
    slug: 'cafe-lilou',
    category: 'cafe',
    subcategory: ['French', 'Bakery', 'Brunch'],
    cuisineTypes: ['French', 'Pastries', 'Brunch'],
    priceRange: 2,
    avgCostPerPerson: 'BD 10-18',
    description: `A charming French-style café known for its exquisite pastries, fresh-baked croissants, and delightful brunch menu. Café Lilou has been an Adliya institution for over two decades.

The café features a beautiful terrace perfect for people-watching while enjoying your morning coffee. Our pastry chefs create authentic French delicacies daily, from buttery croissants to delicate macarons.`,
    address: 'Block 338, Road 3833',
    area: 'Adliya',
    latitude: 26.2133,
    longitude: 50.5925,
    phone: '+973 1771 4440',
    email: 'info@cafelilou.com',
    website: 'https://www.cafelilou.com',
    instagram: 'cafeliloubahrain',
    openingHours: {
      sunday: { open: '07:00', close: '23:00' },
      monday: { open: '07:00', close: '23:00' },
      tuesday: { open: '07:00', close: '23:00' },
      wednesday: { open: '07:00', close: '23:00' },
      thursday: { open: '07:00', close: '00:00' },
      friday: { open: '08:00', close: '00:00' },
      saturday: { open: '08:00', close: '23:00' },
    },
    features: ['Outdoor Seating', 'Family Friendly', 'Reservations', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
    ],
    logo: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=200',
    upcomingEventsCount: 0,
    offers: [],
    upcomingEvents: [],
  },
};

// Similar/Nearby places data
const similarPlacesData: Place[] = [
  {
    id: '10',
    name: "Trader Vic's",
    slug: 'trader-vics',
    category: 'bar',
    subcategory: ['Tiki Bar', 'Cocktails', 'Polynesian'],
    description: 'Legendary Tiki bar with exotic cocktails',
    address: 'The Ritz-Carlton, Bahrain',
    area: 'Seef',
    latitude: 26.2345,
    longitude: 50.5412,
    phone: '+973 1758 6499',
    priceRange: 3,
    openingHours: { sunday: { open: '18:00', close: '01:00' }, monday: { open: '18:00', close: '01:00' }, tuesday: { open: '18:00', close: '01:00' }, wednesday: { open: '18:00', close: '01:00' }, thursday: { open: '18:00', close: '02:00' }, friday: { open: '18:00', close: '02:00' }, saturday: { open: '18:00', close: '01:00' } },
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
    description: 'Beloved Irish pub with live sports',
    address: 'Juffair Village',
    area: 'Juffair',
    latitude: 26.2201,
    longitude: 50.5978,
    phone: '+973 1773 2222',
    priceRange: 2,
    openingHours: { sunday: { open: '12:00', close: '01:00' }, monday: { open: '12:00', close: '01:00' }, tuesday: { open: '12:00', close: '01:00' }, wednesday: { open: '12:00', close: '01:00' }, thursday: { open: '12:00', close: '02:00' }, friday: { open: '12:00', close: '02:00' }, saturday: { open: '12:00', close: '01:00' } },
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
    description: 'Trendy shisha lounge with chill vibes',
    address: 'Block 338, Road 3821',
    area: 'Adliya',
    latitude: 26.2128,
    longitude: 50.5918,
    phone: '+973 1771 8888',
    priceRange: 2,
    openingHours: { sunday: { open: '16:00', close: '02:00' }, monday: { open: '16:00', close: '02:00' }, tuesday: { open: '16:00', close: '02:00' }, wednesday: { open: '16:00', close: '02:00' }, thursday: { open: '16:00', close: '03:00' }, friday: { open: '16:00', close: '03:00' }, saturday: { open: '16:00', close: '02:00' } },
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
    description: 'Exclusive nightclub with world-class DJs',
    address: 'Four Seasons Hotel, Bahrain Bay',
    area: 'Manama',
    latitude: 26.2408,
    longitude: 50.5768,
    phone: '+973 1711 5050',
    priceRange: 3,
    openingHours: { sunday: 'closed', monday: 'closed', tuesday: 'closed', wednesday: { open: '22:00', close: '03:00' }, thursday: { open: '22:00', close: '03:00' }, friday: { open: '22:00', close: '03:00' }, saturday: { open: '22:00', close: '03:00' } },
    features: ['DJ', 'Reservations'],
    images: ['https://images.unsplash.com/photo-1545128485-c400e7702796?w=800'],
    logo: 'https://images.unsplash.com/photo-1582106245687-cfd4d5c846d5?w=200',
    upcomingEventsCount: 2,
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

export default function PlaceDetailPageContent({ category }: PlaceDetailPageContentProps) {
  const params = useParams();
  const slug = params?.slug as string;
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Get place data (in production, fetch from database based on slug)
  const place = allPlacesData[slug] || allPlacesData['the-orangery'];

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
    const closeTime = parseInt(hours.close.replace(':', ''));

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
    ? window.location.href
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
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <PlaceInfo description={place.description} />
              <PlaceGallery images={place.images} name={place.name} />
              <PlaceFeatures features={place.features} />
              <PlaceEvents events={place.upcomingEvents} venueName={place.name} venueSlug={place.slug} />
              <PlaceOffers offers={place.offers} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <PlaceHours
                openingHours={place.openingHours}
                phone={place.phone}
                email={place.email}
                website={place.website}
                instagram={place.instagram}
                facebook={place.facebook}
              />
              <PlaceMap name={place.name} address={place.address} latitude={place.latitude} longitude={place.longitude} area={place.area} />

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
            <SimilarPlaces title="Similar Places" places={similarPlacesData} viewAllHref={`/places?category=${place.category}`} />
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            {place.phone && (
              <motion.a href={`tel:${place.phone}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold" whileTap={{ scale: 0.98 }}>
                <Phone className="w-5 h-5" />
                Call
              </motion.a>
            )}
            <motion.button
              onClick={() => {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                const mapsUrl = isIOS ? `maps://maps.apple.com/?daddr=${place.latitude},${place.longitude}` : `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
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
        <PlaceShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} title={place.name} url={placeUrl} />

        <div className="h-24 lg:hidden" />
      </div>
    </>
  );
}
