// SEO Category Configuration for BahrainNights.com
// These categories are used for SEO landing pages that filter venues by tags

export interface CategoryConfig {
  slug: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  heroImage?: string;
  tags: string[]; // Tags to filter venues by
  relatedCategories: string[]; // Related category slugs for cross-linking
  keywords: string[]; // Additional SEO keywords
}

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  brunches: {
    slug: 'brunches',
    name: 'Brunches',
    nameAr: 'برانش',
    title: 'Best Brunches in Bahrain',
    titleAr: 'أفضل البرانش في البحرين',
    description: 'Discover the best Friday brunches, weekend brunches, and brunch deals across Bahrain. From luxury hotel brunches to casual brunch spots.',
    descriptionAr: 'اكتشف أفضل برانش الجمعة والعطلة الأسبوعية وعروض البرانش في جميع أنحاء البحرين.',
    metaTitle: 'Best Brunches in Bahrain 2026 | Friday Brunch Deals | BahrainNights',
    metaDescription: 'Discover the best brunches in Bahrain. Find Friday brunches, weekend brunch deals, and top brunch spots in Manama, Seef, Juffair, and more.',
    icon: '🥂',
    tags: ['brunch', 'friday-brunch', 'weekend-brunch', 'buffet'],
    relatedCategories: ['happy-hours', 'fine-dining', 'family-restaurants'],
    keywords: ['friday brunch bahrain', 'best brunch manama', 'weekend brunch deals', 'hotel brunch bahrain'],
  },
  nightclubs: {
    slug: 'nightclubs',
    name: 'Nightclubs',
    nameAr: 'النوادي الليلية',
    title: 'Best Nightclubs in Bahrain',
    titleAr: 'أفضل النوادي الليلية في البحرين',
    description: 'Experience the best nightlife in Bahrain. Top nightclubs with DJs, live music, and unforgettable nights out in Manama and beyond.',
    descriptionAr: 'استمتع بأفضل الحياة الليلية في البحرين. أفضل النوادي الليلية مع دي جي والموسيقى الحية.',
    metaTitle: 'Best Nightclubs in Bahrain 2026 | Top Clubs & DJ Nights | BahrainNights',
    metaDescription: 'Find the best nightclubs in Bahrain. Discover top clubs in Juffair, Adliya, and Manama with DJs, ladies nights, and VIP experiences.',
    icon: '🎵',
    tags: ['nightclub', 'club', 'dj', 'dancing', 'nightlife'],
    relatedCategories: ['ladies-nights', 'live-music', 'rooftop-bars'],
    keywords: ['nightclubs bahrain', 'best clubs manama', 'juffair nightlife', 'bahrain clubbing'],
  },
  'ladies-nights': {
    slug: 'ladies-nights',
    name: 'Ladies Nights',
    nameAr: 'ليالي السيدات',
    title: 'Best Ladies Nights in Bahrain',
    titleAr: 'أفضل ليالي السيدات في البحرين',
    description: 'Find the best ladies nights in Bahrain. Free drinks, special offers, and exclusive deals for ladies at top venues across the kingdom.',
    descriptionAr: 'اكتشفي أفضل ليالي السيدات في البحرين. مشروبات مجانية وعروض خاصة وخصومات حصرية للسيدات.',
    metaTitle: 'Best Ladies Nights in Bahrain 2026 | Free Drinks & Deals | BahrainNights',
    metaDescription: 'Discover the best ladies nights in Bahrain. Find venues offering free drinks, special deals, and exclusive offers for ladies every week.',
    icon: '👠',
    tags: ['ladies-night', 'ladies', 'free-drinks', 'women-only'],
    relatedCategories: ['nightclubs', 'happy-hours', 'rooftop-bars'],
    keywords: ['ladies night bahrain', 'free drinks ladies', 'women night out bahrain', 'ladies offers'],
  },
  'rooftop-bars': {
    slug: 'rooftop-bars',
    name: 'Rooftop Lounges',
    nameAr: 'صالونات السطح',
    title: 'Best Rooftop Lounges in Bahrain',
    titleAr: 'أفضل صالونات السطح في البحرين',
    description: 'Discover stunning rooftop lounges in Bahrain with breathtaking views. Perfect for sunset drinks and memorable evenings.',
    descriptionAr: 'اكتشف أفضل صالونات السطح في البحرين مع إطلالات خلابة. مثالية لمشروبات غروب الشمس والأمسيات المميزة.',
    metaTitle: 'Best Rooftop Lounges in Bahrain 2026 | Skyline Views & Cocktails | BahrainNights',
    metaDescription: 'Find the best rooftop lounges in Bahrain with stunning city views. Discover sky lounges and rooftop venues in Manama, Seef, and Juffair.',
    icon: '🌃',
    tags: ['rooftop', 'skybar', 'terrace', 'view', 'outdoor'],
    relatedCategories: ['happy-hours', 'shisha-lounges', 'nightclubs'],
    keywords: ['rooftop lounge bahrain', 'sky lounge manama', 'rooftop drinks', 'bahrain skyline lounge'],
  },
  cafes: {
    slug: 'cafes',
    name: 'Cafes',
    nameAr: 'المقاهي',
    title: 'Best Cafes in Bahrain',
    titleAr: 'أفضل المقاهي في البحرين',
    description: 'Explore the best cafes in Bahrain. From specialty coffee shops to cozy tea houses and Instagram-worthy spots.',
    descriptionAr: 'استكشف أفضل المقاهي في البحرين. من محلات القهوة المتخصصة إلى بيوت الشاي المريحة.',
    metaTitle: 'Best Cafes in Bahrain 2026 | Coffee Shops & Tea Houses | BahrainNights',
    metaDescription: 'Discover the best cafes in Bahrain. Find specialty coffee shops, cozy tea houses, and trendy cafes across Manama, Seef, and Riffa.',
    icon: '☕',
    tags: ['cafe', 'coffee', 'tea', 'desserts', 'breakfast'],
    relatedCategories: ['brunches', 'family-restaurants', 'shisha-lounges'],
    keywords: ['best cafe bahrain', 'coffee shop manama', 'specialty coffee', 'bahrain cafes'],
  },
  'fine-dining': {
    slug: 'fine-dining',
    name: 'Fine Dining',
    nameAr: 'المطاعم الفاخرة',
    title: 'Best Fine Dining in Bahrain',
    titleAr: 'أفضل المطاعم الفاخرة في البحرين',
    description: 'Experience luxury dining at the finest restaurants in Bahrain. Michelin-quality cuisine and unforgettable culinary experiences.',
    descriptionAr: 'استمتع بتجربة تناول الطعام الفاخر في أرقى مطاعم البحرين. مأكولات بجودة ميشلان وتجارب طهي لا تُنسى.',
    metaTitle: 'Best Fine Dining Restaurants in Bahrain 2026 | Luxury Dining | BahrainNights',
    metaDescription: 'Discover the best fine dining restaurants in Bahrain. Experience luxury cuisine, gourmet dishes, and elegant dining in Manama and Seef.',
    icon: '🍽️',
    tags: ['fine-dining', 'luxury', 'gourmet', 'upscale', 'michelin'],
    relatedCategories: ['brunches', 'rooftop-bars', 'beach-clubs'],
    keywords: ['fine dining bahrain', 'luxury restaurants manama', 'gourmet food', 'upscale dining'],
  },
  'beach-clubs': {
    slug: 'beach-clubs',
    name: 'Beach Clubs',
    nameAr: 'نوادي الشاطئ',
    title: 'Best Beach Clubs in Bahrain',
    titleAr: 'أفضل نوادي الشاطئ في البحرين',
    description: 'Relax at the best beach clubs in Bahrain. Enjoy pools, beaches, day parties, and sunset vibes at exclusive venues.',
    descriptionAr: 'استرخِ في أفضل نوادي الشاطئ في البحرين. استمتع بالمسابح والشواطئ والحفلات النهارية.',
    metaTitle: 'Best Beach Clubs in Bahrain 2026 | Pool Parties & Day Clubs | BahrainNights',
    metaDescription: 'Find the best beach clubs in Bahrain. Discover pool parties, beach venues, and day clubs in Amwaj, Zallaq, and more.',
    icon: '🏖️',
    tags: ['beach-club', 'pool', 'beach', 'day-party', 'swimming'],
    relatedCategories: ['rooftop-bars', 'brunches', 'happy-hours'],
    keywords: ['beach club bahrain', 'pool party manama', 'day club bahrain', 'beach venues'],
  },
  'sports-bars': {
    slug: 'sports-bars',
    name: 'Sports Lounges',
    nameAr: 'صالونات الرياضة',
    title: 'Best Sports Lounges in Bahrain',
    titleAr: 'أفضل صالونات الرياضة في البحرين',
    description: 'Watch live sports at the best sports lounges in Bahrain. Big screens, great atmosphere, and cold drinks for every match.',
    descriptionAr: 'شاهد الرياضة الحية في أفضل صالونات الرياضة في البحرين. شاشات كبيرة وأجواء رائعة ومشروبات باردة.',
    metaTitle: 'Best Sports Lounges in Bahrain 2026 | Live Football & Sports | BahrainNights',
    metaDescription: 'Find the best sports lounges in Bahrain. Watch live football, F1, and sports on big screens with great food and drinks.',
    icon: '⚽',
    tags: ['sports-bar', 'live-sports', 'football', 'pub', 'screens'],
    relatedCategories: ['happy-hours', 'shisha-lounges', 'nightclubs'],
    keywords: ['sports lounge bahrain', 'watch football manama', 'f1 viewing bahrain', 'pub bahrain'],
  },
  'shisha-lounges': {
    slug: 'shisha-lounges',
    name: 'Shisha Lounges',
    nameAr: 'صالات الشيشة',
    title: 'Best Shisha Lounges in Bahrain',
    titleAr: 'أفضل صالات الشيشة في البحرين',
    description: 'Relax at the best shisha lounges in Bahrain. Premium flavors, cozy ambiance, and great company for memorable nights.',
    descriptionAr: 'استرخِ في أفضل صالات الشيشة في البحرين. نكهات فاخرة وأجواء مريحة وصحبة رائعة.',
    metaTitle: 'Best Shisha Lounges in Bahrain 2026 | Hookah Lounges | BahrainNights',
    metaDescription: 'Discover the best shisha lounges in Bahrain. Find premium hookah lounges with great flavors and ambiance in Manama and Juffair.',
    icon: '💨',
    tags: ['shisha', 'hookah', 'lounge', 'terrace', 'arabic'],
    relatedCategories: ['rooftop-bars', 'cafes', 'sports-bars'],
    keywords: ['shisha bahrain', 'hookah lounge manama', 'best shisha', 'arabic cafe'],
  },
  'live-music': {
    slug: 'live-music',
    name: 'Live Music',
    nameAr: 'الموسيقى الحية',
    title: 'Best Live Music Venues in Bahrain',
    titleAr: 'أفضل أماكن الموسيقى الحية في البحرين',
    description: 'Experience live music at the best venues in Bahrain. Live bands, acoustic nights, and unforgettable performances.',
    descriptionAr: 'استمتع بالموسيقى الحية في أفضل الأماكن في البحرين. فرق موسيقية حية وليالي أكوستيك وعروض لا تُنسى.',
    metaTitle: 'Best Live Music Venues in Bahrain 2026 | Bands & Concerts | BahrainNights',
    metaDescription: 'Find the best live music venues in Bahrain. Discover lounges and venues with live bands, acoustic nights, and concerts.',
    icon: '🎸',
    tags: ['live-music', 'band', 'concert', 'acoustic', 'entertainment'],
    relatedCategories: ['nightclubs', 'rooftop-bars', 'happy-hours'],
    keywords: ['live music bahrain', 'live band manama', 'acoustic night', 'concerts bahrain'],
  },
  'family-restaurants': {
    slug: 'family-restaurants',
    name: 'Family Restaurants',
    nameAr: 'مطاعم عائلية',
    title: 'Best Family Restaurants in Bahrain',
    titleAr: 'أفضل المطاعم العائلية في البحرين',
    description: 'Find the best family-friendly restaurants in Bahrain. Great food, kids menus, and welcoming atmosphere for all ages.',
    descriptionAr: 'اكتشف أفضل المطاعم العائلية في البحرين. طعام رائع وقوائم للأطفال وأجواء ترحيبية لجميع الأعمار.',
    metaTitle: 'Best Family Restaurants in Bahrain 2026 | Kid-Friendly Dining | BahrainNights',
    metaDescription: 'Discover the best family restaurants in Bahrain. Find kid-friendly dining spots with great food and welcoming atmosphere.',
    icon: '👨‍👩‍👧‍👦',
    tags: ['family', 'kids', 'family-friendly', 'casual-dining', 'children'],
    relatedCategories: ['cafes', 'brunches', 'fine-dining'],
    keywords: ['family restaurant bahrain', 'kid friendly dining', 'family dining manama', 'children menu'],
  },
  'happy-hours': {
    slug: 'happy-hours',
    name: 'Happy Hours',
    nameAr: 'ساعات السعادة',
    title: 'Best Happy Hours in Bahrain',
    titleAr: 'أفضل ساعات السعادة في البحرين',
    description: 'Find the best happy hour deals in Bahrain. Discounted drinks, special offers, and great venues for after-work drinks.',
    descriptionAr: 'اكتشف أفضل عروض ساعات السعادة في البحرين. مشروبات بأسعار مخفضة وعروض خاصة وأماكن رائعة.',
    metaTitle: 'Best Happy Hours in Bahrain 2026 | Drink Deals & Offers | BahrainNights',
    metaDescription: 'Find the best happy hour deals in Bahrain. Discover lounges and venues with discounted drinks and special offers.',
    icon: '🍻',
    tags: ['happy-hour', 'deals', 'drinks', 'offers', 'after-work'],
    relatedCategories: ['ladies-nights', 'rooftop-bars', 'sports-bars'],
    keywords: ['happy hour bahrain', 'drink deals manama', 'after work drinks', 'lounge offers'],
  },
};

// Get all category slugs for static path generation
export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORY_CONFIGS);
}

// Get category config by slug
export function getCategoryConfig(slug: string): CategoryConfig | null {
  return CATEGORY_CONFIGS[slug] || null;
}

// Get related categories configs
export function getRelatedCategories(slug: string): CategoryConfig[] {
  const config = getCategoryConfig(slug);
  if (!config) return [];
  return config.relatedCategories
    .map(getCategoryConfig)
    .filter((c): c is CategoryConfig => c !== null);
}
