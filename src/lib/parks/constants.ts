// Hardcoded whitelist of verified parks in Bahrain
export const VERIFIED_PARKS_WHITELIST = [
  'Prince Khalifa Bin Salman Park',
  'Prince Khalifa bin Salman Park',
  'Arad Fort Park',
  'Arad Bay Park',
  'Dohat Arad Park',
  'Al Fateh Corniche Garden',
  'Andalus Garden',
  'Adhari Park',
  'Hunainiyah Park',
  'Al Areen Wildlife Park',
  'Khalifa Al Kabeer Park',
  'Budaiya Botanical Garden',
  'Prince Abdulla Al Faisal Park',
  'Quran Garden',
  'Al Montazah',
  'Muharraq Corniche',
  'Um Al Hassam Garden',
  'Juffair Park',
  'Water Garden',
  'Bahrain Bay Park',
  'Saar Park',
  'Riffa Views Park',
  'Hamad Town Park',
  'Isa Town Park',
  'Salmaniya Garden',
  'Tubli Bay Park',
];

// Keywords that indicate FALSE POSITIVES - not actual parks
export const EXCLUDE_KEYWORDS = [
  'villa',
  'compound',
  'property',
  'properties',
  'real estate',
  'hotel',
  'resort',
  'nursery',
  'plant shop',
  'parking',
  'business park',
  'industrial',
  'office park',
  'car park',
  'parking lot',
  'private club',
  'private garden',
  'restaurant',
  'cafe',
  'coffee',
  'mall',
  'shopping',
  'salon',
  'spa',
  'gym',
  'fitness',
  'school',
  'university',
  'clinic',
  'hospital',
  'pharmacy',
  'bank',
  'exchange',
  'laundry',
  'dry clean',
];

// Keywords that indicate POSITIVE matches - likely real parks
export const INCLUDE_KEYWORDS = [
  'playground',
  'slides',
  'swings',
  'children',
  'walking',
  'jogging',
  'green space',
  'picnic',
  'public park',
  'municipal',
  'corniche',
  'garden',
  'nature reserve',
  'botanical',
  'wildlife',
];

// Bahrain governorates for filtering
export const BAHRAIN_GOVERNORATES = [
  { id: 'capital', name: 'Capital Governorate', nameAr: 'محافظة العاصمة', areas: ['Manama', 'Juffair', 'Adliya', 'Gudaibiya', 'Seef', 'Sanabis', 'Salmaniya'] },
  { id: 'muharraq', name: 'Muharraq Governorate', nameAr: 'محافظة المحرق', areas: ['Muharraq', 'Arad', 'Hidd', 'Busaiteen', 'Galali', 'Amwaj'] },
  { id: 'northern', name: 'Northern Governorate', nameAr: 'المحافظة الشمالية', areas: ['Budaiya', 'Saar', 'Jasra', 'Barbar', 'Diraz', 'Janabiya', 'Hamala'] },
  { id: 'southern', name: 'Southern Governorate', nameAr: 'المحافظة الجنوبية', areas: ['Riffa', 'Isa Town', 'Hamad Town', 'Sakhir', 'Zallaq', 'Awali', 'Areen'] },
];

// Bahrain center coordinates
export const BAHRAIN_CENTER = {
  lat: 26.0667,
  lng: 50.5577,
};

// Default map zoom levels
export const MAP_ZOOM = {
  country: 10,
  city: 13,
  nearby: 14,
};

// Cache duration in milliseconds (24 hours)
export const PARKS_CACHE_DURATION = 24 * 60 * 60 * 1000;

// Minimum reviews for a park to be considered "verified"
export const MIN_REVIEWS_VERIFIED = 50;
export const MIN_REVIEWS_SHOW = 10;
