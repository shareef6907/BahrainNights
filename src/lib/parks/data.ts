// Hardcoded public parks data for Bahrain
// No API required - uses Google Maps links for directions

export interface ParkData {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  area: string;
  governorate: 'capital' | 'muharraq' | 'northern' | 'southern';
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
  rating?: number;
  reviewCount?: number;
  image?: string;
  openingHours?: string;
  isVerified: boolean;
}

// Helper to generate Google Maps URLs
export function getGoogleMapsSearchUrl(parkName: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(parkName + ' Bahrain')}`;
}

export function getGoogleMapsDirectionsUrl(
  park: ParkData,
  userLocation?: { lat: number; lng: number }
): string {
  const destination = `${park.coordinates.lat},${park.coordinates.lng}`;
  if (userLocation) {
    return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destination}`;
  }
  return `https://www.google.com/maps/dir//${destination}`;
}

export function getGoogleMapsEmbedUrl(park: ParkData): string {
  // Free embed URL - no API key needed
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${park.coordinates.lng}!3d${park.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(park.name)}!5e0!3m2!1sen!2sbh!4v1234567890`;
}

// All verified public parks in Bahrain
export const BAHRAIN_PARKS: ParkData[] = [
  // Capital Governorate
  {
    id: 'andalus-garden',
    name: 'Andalus Garden',
    nameAr: 'حديقة الأندلس',
    description: 'Beautiful traditional Andalusian-style garden in the heart of Gudaibiya with fountains and shaded walkways.',
    area: 'Gudaibiya',
    governorate: 'capital',
    coordinates: { lat: 26.2167, lng: 50.5833 },
    features: ['Walking Paths', 'Fountains', 'Shaded Areas', 'Benches'],
    rating: 4.3,
    reviewCount: 850,
    openingHours: '7:00 AM - 10:00 PM',
    isVerified: true,
  },
  {
    id: 'um-al-hassam-garden',
    name: 'Um Al Hassam Garden',
    nameAr: 'حديقة أم الحصم',
    description: 'Family-friendly park with playground equipment and open green spaces.',
    area: 'Um Al Hassam',
    governorate: 'capital',
    coordinates: { lat: 26.2089, lng: 50.5756 },
    features: ['Playground', 'Walking Track', 'Parking Available'],
    rating: 4.1,
    reviewCount: 320,
    openingHours: '6:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'salmaniya-garden',
    name: 'Salmaniya Garden',
    nameAr: 'حديقة السلمانية',
    description: 'Neighborhood park with children play area and walking paths.',
    area: 'Salmaniya',
    governorate: 'capital',
    coordinates: { lat: 26.2256, lng: 50.5678 },
    features: ['Playground', 'Walking Paths', 'Lit at Night'],
    rating: 4.0,
    reviewCount: 180,
    openingHours: '6:00 AM - 10:00 PM',
    isVerified: true,
  },
  {
    id: 'juffair-park',
    name: 'Juffair Park',
    nameAr: 'حديقة الجفير',
    description: 'Popular park in Juffair with playground and exercise equipment.',
    area: 'Juffair',
    governorate: 'capital',
    coordinates: { lat: 26.2128, lng: 50.6053 },
    features: ['Playground', 'Exercise Equipment', 'Walking Track', 'Restrooms'],
    rating: 4.2,
    reviewCount: 450,
    openingHours: '6:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'water-garden',
    name: 'Water Garden',
    nameAr: 'الحديقة المائية',
    description: 'Scenic waterfront garden along Bahrain Bay with stunning views.',
    area: 'Bahrain Bay',
    governorate: 'capital',
    coordinates: { lat: 26.2389, lng: 50.5456 },
    features: ['Waterfront', 'Walking Track', 'Shaded Areas', 'Restaurants Nearby'],
    rating: 4.5,
    reviewCount: 620,
    openingHours: '24 Hours',
    isVerified: true,
  },

  // Muharraq Governorate
  {
    id: 'prince-khalifa-bin-salman-park',
    name: 'Prince Khalifa Bin Salman Park',
    nameAr: 'حديقة الأمير خليفة بن سلمان',
    description: 'The largest park in Bahrain featuring vast green spaces, playgrounds, walking tracks, and family picnic areas.',
    area: 'Hidd',
    governorate: 'muharraq',
    coordinates: { lat: 26.2478, lng: 50.6567 },
    features: ['Playground', 'Walking Track', 'Picnic Area', 'Parking Available', 'Restrooms', 'Lit at Night'],
    rating: 4.6,
    reviewCount: 2100,
    openingHours: '6:00 AM - 12:00 AM',
    isVerified: true,
  },
  {
    id: 'arad-fort-park',
    name: 'Arad Fort Park',
    nameAr: 'حديقة قلعة عراد',
    description: 'Historic park surrounding Arad Fort with beautiful gardens and sea views.',
    area: 'Arad',
    governorate: 'muharraq',
    coordinates: { lat: 26.2544, lng: 50.6156 },
    features: ['Historic Site', 'Waterfront', 'Walking Paths', 'Photography Spot'],
    rating: 4.4,
    reviewCount: 980,
    openingHours: '7:00 AM - 10:00 PM',
    isVerified: true,
  },
  {
    id: 'dohat-arad-park',
    name: 'Dohat Arad Park',
    nameAr: 'حديقة دوحة عراد',
    description: 'Waterfront park along Arad Bay with jogging track and exercise stations.',
    area: 'Arad',
    governorate: 'muharraq',
    coordinates: { lat: 26.2489, lng: 50.6089 },
    features: ['Waterfront', 'Walking Track', 'Exercise Equipment', 'Parking Available'],
    rating: 4.3,
    reviewCount: 540,
    openingHours: '5:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'muharraq-corniche-park',
    name: 'Muharraq Corniche Park',
    nameAr: 'حديقة كورنيش المحرق',
    description: 'Scenic corniche park with walking path along the waterfront.',
    area: 'Muharraq',
    governorate: 'muharraq',
    coordinates: { lat: 26.2567, lng: 50.6234 },
    features: ['Waterfront', 'Walking Track', 'Benches', 'Lit at Night'],
    rating: 4.2,
    reviewCount: 380,
    openingHours: '24 Hours',
    isVerified: true,
  },
  {
    id: 'busaiteen-park',
    name: 'Busaiteen Park',
    nameAr: 'حديقة البسيتين',
    description: 'Family park with playground and shaded seating areas.',
    area: 'Busaiteen',
    governorate: 'muharraq',
    coordinates: { lat: 26.2378, lng: 50.6123 },
    features: ['Playground', 'Shaded Areas', 'Parking Available'],
    rating: 4.0,
    reviewCount: 210,
    openingHours: '6:00 AM - 10:00 PM',
    isVerified: true,
  },

  // Northern Governorate
  {
    id: 'budaiya-botanical-garden',
    name: 'Budaiya Botanical Garden',
    nameAr: 'حديقة البديع النباتية',
    description: 'Beautiful botanical garden featuring diverse plant species and peaceful walking paths.',
    area: 'Budaiya',
    governorate: 'northern',
    coordinates: { lat: 26.2189, lng: 50.4456 },
    features: ['Botanical Garden', 'Walking Paths', 'Educational', 'Photography Spot'],
    rating: 4.4,
    reviewCount: 720,
    openingHours: '7:00 AM - 6:00 PM',
    isVerified: true,
  },
  {
    id: 'janabiya-park',
    name: 'Janabiya Park',
    nameAr: 'حديقة الجنبية',
    description: 'Modern park with excellent playground facilities and walking tracks.',
    area: 'Janabiya',
    governorate: 'northern',
    coordinates: { lat: 26.1989, lng: 50.5012 },
    features: ['Playground', 'Walking Track', 'Exercise Equipment', 'Parking Available'],
    rating: 4.3,
    reviewCount: 410,
    openingHours: '6:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'saar-park',
    name: 'Saar Park',
    nameAr: 'حديقة سار',
    description: 'Popular neighborhood park with play areas and green spaces.',
    area: 'Saar',
    governorate: 'northern',
    coordinates: { lat: 26.1856, lng: 50.5089 },
    features: ['Playground', 'Walking Paths', 'Shaded Areas'],
    rating: 4.1,
    reviewCount: 290,
    openingHours: '6:00 AM - 10:00 PM',
    isVerified: true,
  },
  {
    id: 'barbar-park',
    name: 'Barbar Park',
    nameAr: 'حديقة باربار',
    description: 'Community park near the historic Barbar Temple site.',
    area: 'Barbar',
    governorate: 'northern',
    coordinates: { lat: 26.2234, lng: 50.4789 },
    features: ['Playground', 'Historic Nearby', 'Parking Available'],
    rating: 4.0,
    reviewCount: 180,
    openingHours: '6:00 AM - 10:00 PM',
    isVerified: true,
  },

  // Southern Governorate
  {
    id: 'adhari-park',
    name: 'Adhari Park',
    nameAr: 'حديقة عذاري',
    description: 'Large amusement and recreation park with rides, playground, and natural spring pools.',
    area: 'Adhari',
    governorate: 'southern',
    coordinates: { lat: 26.1867, lng: 50.5234 },
    features: ['Amusement Rides', 'Playground', 'Natural Spring', 'Restaurants', 'Parking Available'],
    rating: 4.2,
    reviewCount: 1850,
    openingHours: '4:00 PM - 11:00 PM (Weekdays), 10:00 AM - 11:00 PM (Weekends)',
    isVerified: true,
  },
  {
    id: 'al-areen-wildlife-park',
    name: 'Al Areen Wildlife Park',
    nameAr: 'محمية العرين',
    description: 'Nature reserve and wildlife park home to Arabian oryx, gazelles, and diverse bird species.',
    area: 'Zallaq',
    governorate: 'southern',
    coordinates: { lat: 25.9678, lng: 50.5012 },
    features: ['Wildlife', 'Nature Reserve', 'Educational', 'Parking Available', 'Guided Tours'],
    rating: 4.5,
    reviewCount: 1420,
    openingHours: '8:00 AM - 5:00 PM',
    isVerified: true,
  },
  {
    id: 'hunainiyah-park',
    name: 'Hunainiyah Park',
    nameAr: 'حديقة الحنينية',
    description: 'Green park in Riffa with playground and jogging track.',
    area: 'Riffa',
    governorate: 'southern',
    coordinates: { lat: 26.1234, lng: 50.5567 },
    features: ['Playground', 'Walking Track', 'Parking Available', 'Lit at Night'],
    rating: 4.1,
    reviewCount: 340,
    openingHours: '6:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'khalifa-al-kabeer-park',
    name: 'Khalifa Al Kabeer Park',
    nameAr: 'حديقة خليفة الكبير',
    description: 'Spacious park with excellent facilities for families and sports enthusiasts.',
    area: 'Riffa',
    governorate: 'southern',
    coordinates: { lat: 26.1156, lng: 50.5489 },
    features: ['Playground', 'Sports Facilities', 'Walking Track', 'Parking Available'],
    rating: 4.3,
    reviewCount: 560,
    openingHours: '6:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'isa-town-park',
    name: 'Isa Town Park',
    nameAr: 'حديقة مدينة عيسى',
    description: 'Central park in Isa Town with playground and community gathering spaces.',
    area: 'Isa Town',
    governorate: 'southern',
    coordinates: { lat: 26.1689, lng: 50.5478 },
    features: ['Playground', 'Community Space', 'Walking Paths'],
    rating: 4.0,
    reviewCount: 270,
    openingHours: '6:00 AM - 10:00 PM',
    isVerified: true,
  },
  {
    id: 'hamad-town-park',
    name: 'Hamad Town Park',
    nameAr: 'حديقة مدينة حمد',
    description: 'Large park in Hamad Town with diverse recreational facilities.',
    area: 'Hamad Town',
    governorate: 'southern',
    coordinates: { lat: 26.1145, lng: 50.4856 },
    features: ['Playground', 'Walking Track', 'Sports Courts', 'Parking Available'],
    rating: 4.2,
    reviewCount: 380,
    openingHours: '6:00 AM - 11:00 PM',
    isVerified: true,
  },
  {
    id: 'quran-garden',
    name: 'Quran Garden',
    nameAr: 'حديقة القرآن الكريم',
    description: 'Unique garden featuring plants mentioned in the Holy Quran with educational displays.',
    area: 'Hamad Town',
    governorate: 'southern',
    coordinates: { lat: 26.1089, lng: 50.4923 },
    features: ['Educational', 'Botanical Garden', 'Walking Paths', 'Peaceful'],
    rating: 4.4,
    reviewCount: 650,
    openingHours: '7:00 AM - 6:00 PM',
    isVerified: true,
  },
  {
    id: 'al-fateh-corniche',
    name: 'Al Fateh Corniche',
    nameAr: 'كورنيش الفاتح',
    description: 'Popular waterfront promenade near Al Fateh Grand Mosque with walking paths.',
    area: 'Juffair',
    governorate: 'capital',
    coordinates: { lat: 26.2189, lng: 50.5967 },
    features: ['Waterfront', 'Walking Track', 'Mosque Nearby', 'Photography Spot'],
    rating: 4.5,
    reviewCount: 890,
    openingHours: '24 Hours',
    isVerified: true,
  },
  {
    id: 'prince-abdulla-park',
    name: 'Prince Abdulla Al Faisal Park',
    nameAr: 'حديقة الأمير عبدالله الفيصل',
    description: 'Well-maintained park with playground and community facilities.',
    area: 'Riffa',
    governorate: 'southern',
    coordinates: { lat: 26.1345, lng: 50.5678 },
    features: ['Playground', 'Walking Track', 'Parking Available'],
    rating: 4.1,
    reviewCount: 320,
    openingHours: '6:00 AM - 10:00 PM',
    isVerified: true,
  },
];

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Format distance for display
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)} km`;
}

// Get parks sorted by distance from user
export function getParksByDistance(
  userLat: number,
  userLng: number,
  parks: ParkData[] = BAHRAIN_PARKS
): (ParkData & { distance: number })[] {
  return parks
    .map(park => ({
      ...park,
      distance: calculateDistance(userLat, userLng, park.coordinates.lat, park.coordinates.lng)
    }))
    .sort((a, b) => a.distance - b.distance);
}

// Filter parks by governorate
export function getParksByGovernorate(
  governorate: string,
  parks: ParkData[] = BAHRAIN_PARKS
): ParkData[] {
  if (governorate === 'all') return parks;
  return parks.filter(p => p.governorate === governorate);
}

// Search parks by name
export function searchParks(
  query: string,
  parks: ParkData[] = BAHRAIN_PARKS
): ParkData[] {
  const lowerQuery = query.toLowerCase();
  return parks.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.nameAr?.includes(query) ||
    p.area.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}
