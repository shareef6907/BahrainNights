// SEO Configuration for BahrainNights.com

export const SEO_CONFIG = {
  siteName: 'BahrainNights',
  siteUrl: 'https://www.bahrainnights.com',
  defaultTitle: 'BahrainNights - Events, Nightlife & Attractions in Bahrain',
  defaultDescription: 'Discover the best events, nightlife, restaurants, clubs, and attractions in Bahrain. Your ultimate guide to things to do in Bahrain.',
  defaultImage: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/og-default.jpg',
  twitterHandle: '@bahaborainnights',
  locale: 'en_US',
  alternateLocale: 'ar_BH',

  // Target keywords for SEO optimization
  targetKeywords: [
    'events in bahrain',
    'nightlife in bahrain',
    'attractions in bahrain',
    'things to do in bahrain',
    'bahrain restaurants',
    'bahrain clubs',
    'bahrain bars',
    'bahrain cinema',
    'family activities bahrain',
    'weekend in bahrain',
    'bahrain events today',
    'bahrain nightclubs',
    'best restaurants bahrain',
    'bahrain entertainment',
    'bahrain tourism'
  ],

  // Page-specific SEO templates
  pageTemplates: {
    home: {
      title: 'BahrainNights - Events, Nightlife & Things to Do in Bahrain',
      description: 'Discover the best events, nightlife, restaurants, clubs, and attractions in Bahrain. Your ultimate guide to things to do in Bahrain this weekend.',
      keywords: ['events in bahrain', 'nightlife in bahrain', 'things to do in bahrain', 'bahrain entertainment']
    },
    events: {
      title: 'Events in Bahrain | Concerts, Parties & Shows | BahrainNights',
      description: 'Find the latest events in Bahrain - concerts, parties, exhibitions, and more. Discover what\'s happening in Bahrain today and this weekend.',
      keywords: ['events in bahrain', 'bahrain events today', 'things to do in bahrain', 'bahrain entertainment']
    },
    nightlife: {
      title: 'Nightlife in Bahrain | Clubs, Bars & Lounges | BahrainNights',
      description: 'Explore the best nightlife in Bahrain - top clubs, bars, lounges, and late-night venues. Your guide to Bahrain nightclubs and bars.',
      keywords: ['nightlife in bahrain', 'bahrain clubs', 'bahrain bars', 'bahrain nightclubs']
    },
    restaurants: {
      title: 'Best Restaurants in Bahrain | Dining Guide | BahrainNights',
      description: 'Discover the best restaurants in Bahrain - fine dining, casual eats, cafes, and more. Find where to eat in Bahrain with reviews and menus.',
      keywords: ['bahrain restaurants', 'best restaurants bahrain', 'dining in bahrain', 'where to eat bahrain']
    },
    cinema: {
      title: 'Cinema in Bahrain | Movies Now Showing | BahrainNights',
      description: 'Find movies now showing in Bahrain cinemas. Check showtimes at VOX, Cineco, and more. Your complete guide to Bahrain cinema.',
      keywords: ['bahrain cinema', 'movies in bahrain', 'cinema showtimes bahrain', 'vox bahrain']
    },
    attractions: {
      title: 'Attractions in Bahrain | Things to Do & See | BahrainNights',
      description: 'Explore top attractions in Bahrain - museums, landmarks, beaches, and experiences. Discover the best things to do in Bahrain.',
      keywords: ['attractions in bahrain', 'things to do in bahrain', 'bahrain tourism', 'bahrain sightseeing']
    },
    places: {
      title: 'Places in Bahrain | Venues & Locations | BahrainNights',
      description: 'Browse all venues and places in Bahrain - restaurants, clubs, cafes, and more. Find the perfect spot for any occasion.',
      keywords: ['places in bahrain', 'venues bahrain', 'bahrain locations', 'where to go bahrain']
    },
    family: {
      title: 'Family Activities in Bahrain | Kids Events | BahrainNights',
      description: 'Find family-friendly activities and events in Bahrain. Kid-friendly venues, family dining, and fun things to do with children.',
      keywords: ['family activities bahrain', 'things to do with kids bahrain', 'family events bahrain', 'kids activities bahrain']
    }
  },

  // Organization schema data
  organization: {
    name: 'BahrainNights',
    legalName: 'BahrainNights',
    url: 'https://www.bahrainnights.com',
    logo: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/logo.png',
    foundingDate: '2024',
    founders: ['BahrainNights Team'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manama',
      addressCountry: 'BH'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'help@bahrainnights.com'
    },
    sameAs: [
      'https://www.instagram.com/bh.nights',
      'https://www.facebook.com/bahrainnights'
    ]
  },

  // Robots settings
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Sitemap settings
  sitemap: {
    changefreq: {
      home: 'daily',
      events: 'daily',
      venues: 'weekly',
      cinema: 'daily',
      attractions: 'weekly',
      static: 'monthly'
    },
    priority: {
      home: 1.0,
      events: 0.9,
      venues: 0.8,
      cinema: 0.8,
      attractions: 0.7,
      static: 0.5
    }
  }
};

// Helper to get page-specific SEO config
export function getPageSEO(pageType: keyof typeof SEO_CONFIG.pageTemplates) {
  return SEO_CONFIG.pageTemplates[pageType] || SEO_CONFIG.pageTemplates.home;
}

// Helper to generate canonical URL
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
}

// Helper to generate OG image URL
export function getOgImageUrl(image?: string): string {
  return image || SEO_CONFIG.defaultImage;
}
