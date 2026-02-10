import { 
  VERIFIED_PARKS_WHITELIST, 
  EXCLUDE_KEYWORDS, 
  INCLUDE_KEYWORDS,
  MIN_REVIEWS_VERIFIED,
  MIN_REVIEWS_SHOW,
  BAHRAIN_GOVERNORATES,
} from './constants';

export interface GooglePlaceResult {
  place_id: string;
  name: string;
  vicinity?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  types?: string[];
  reviews?: Array<{
    text: string;
    rating: number;
  }>;
}

export interface Park extends GooglePlaceResult {
  distance?: number;
  isVerified: boolean;
  isWhitelisted: boolean;
  governorate?: string;
  features?: string[];
}

/**
 * Check if a place name is in the verified whitelist
 */
export function isWhitelistedPark(name: string): boolean {
  const lowerName = name.toLowerCase();
  return VERIFIED_PARKS_WHITELIST.some(
    whitelisted => lowerName.includes(whitelisted.toLowerCase()) || 
                   whitelisted.toLowerCase().includes(lowerName)
  );
}

/**
 * Check if a place name contains exclusion keywords
 */
export function hasExclusionKeyword(name: string): boolean {
  const lowerName = name.toLowerCase();
  return EXCLUDE_KEYWORDS.some(keyword => lowerName.includes(keyword.toLowerCase()));
}

/**
 * Check if a place has park-related types
 */
export function hasParkType(types?: string[]): boolean {
  if (!types) return false;
  const parkTypes = ['park', 'tourist_attraction', 'point_of_interest'];
  return types.some(type => parkTypes.includes(type));
}

/**
 * Extract features from reviews
 */
export function extractFeaturesFromReviews(reviews?: Array<{ text: string }>): string[] {
  if (!reviews || reviews.length === 0) return [];
  
  const features: Set<string> = new Set();
  const allText = reviews.map(r => r.text.toLowerCase()).join(' ');
  
  const featureMap: Record<string, string[]> = {
    'Playground': ['playground', 'slides', 'swings', 'kids play', 'children play'],
    'Walking Track': ['walking track', 'jogging', 'walking path', 'running track'],
    'Parking Available': ['parking', 'car park', 'free parking'],
    'Lit at Night': ['lights', 'lit at night', 'evening', 'night time'],
    'Restrooms': ['restroom', 'bathroom', 'toilet', 'wc'],
    'Picnic Area': ['picnic', 'bbq', 'barbecue', 'seating'],
    'Exercise Equipment': ['exercise', 'gym equipment', 'fitness'],
    'Pet Friendly': ['dogs', 'pets', 'dog park'],
    'Shaded Areas': ['shade', 'trees', 'shaded'],
    'Waterfront': ['waterfront', 'beach', 'sea view', 'bay'],
  };
  
  for (const [feature, keywords] of Object.entries(featureMap)) {
    if (keywords.some(kw => allText.includes(kw))) {
      features.add(feature);
    }
  }
  
  return Array.from(features);
}

/**
 * Determine the governorate based on address/location
 */
export function determineGovernorate(address?: string, vicinity?: string): string | undefined {
  const location = (address || vicinity || '').toLowerCase();
  
  for (const gov of BAHRAIN_GOVERNORATES) {
    if (gov.areas.some(area => location.includes(area.toLowerCase()))) {
      return gov.id;
    }
  }
  
  return undefined;
}

/**
 * Validate and filter a place result to determine if it's a real park
 */
export function validatePark(place: GooglePlaceResult): { isValid: boolean; isVerified: boolean; reason?: string } {
  const name = place.name || '';
  
  // Always include whitelisted parks
  if (isWhitelistedPark(name)) {
    return { isValid: true, isVerified: true };
  }
  
  // Exclude if name contains exclusion keywords
  if (hasExclusionKeyword(name)) {
    return { isValid: false, isVerified: false, reason: 'Contains exclusion keyword' };
  }
  
  // Must have park type
  if (!hasParkType(place.types)) {
    return { isValid: false, isVerified: false, reason: 'No park type' };
  }
  
  // Check review count for verification status
  const reviewCount = place.user_ratings_total || 0;
  
  // If very few reviews and no photos, likely not a real public park
  if (reviewCount < MIN_REVIEWS_SHOW && (!place.photos || place.photos.length === 0)) {
    return { isValid: false, isVerified: false, reason: 'Too few reviews and no photos' };
  }
  
  const isVerified = reviewCount >= MIN_REVIEWS_VERIFIED;
  
  return { isValid: true, isVerified };
}

/**
 * Process and filter parks from Google Places results
 */
export function processParksResults(results: GooglePlaceResult[]): Park[] {
  const parks: Park[] = [];
  
  for (const place of results) {
    const validation = validatePark(place);
    
    if (!validation.isValid) continue;
    
    const park: Park = {
      ...place,
      isVerified: validation.isVerified,
      isWhitelisted: isWhitelistedPark(place.name),
      governorate: determineGovernorate(place.formatted_address, place.vicinity),
      features: extractFeaturesFromReviews(place.reviews),
    };
    
    parks.push(park);
  }
  
  return parks;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
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

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Get Google Maps directions URL
 */
export function getDirectionsUrl(
  park: { geometry: { location: { lat: number; lng: number } }; place_id: string },
  userLocation?: { lat: number; lng: number }
): string {
  const destination = `${park.geometry.location.lat},${park.geometry.location.lng}`;
  
  if (userLocation) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}&destination_place_id=${park.place_id}`;
  }
  
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${park.place_id}`;
}

/**
 * Sort parks by different criteria
 */
export function sortParks(parks: Park[], sortBy: 'distance' | 'rating' | 'reviews' | 'name', userLocation?: { lat: number; lng: number }): Park[] {
  const sorted = [...parks];
  
  switch (sortBy) {
    case 'distance':
      if (!userLocation) return sorted;
      return sorted.sort((a, b) => {
        const distA = a.distance ?? calculateDistance(userLocation.lat, userLocation.lng, a.geometry.location.lat, a.geometry.location.lng);
        const distB = b.distance ?? calculateDistance(userLocation.lat, userLocation.lng, b.geometry.location.lat, b.geometry.location.lng);
        return distA - distB;
      });
    
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    case 'reviews':
      return sorted.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
    
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    default:
      return sorted;
  }
}
