export interface ScrapedAttraction {
  title: string;
  slug: string;
  description: string;
  price: number;
  price_currency: string;
  image_url: string;
  cover_url: string;
  venue: string;
  location: string;
  category: string;
  type: string;
  original_url: string;
  affiliate_url: string;
  source: string;
  is_sold_out: boolean;
  is_active: boolean;
}

export interface AttractionCategory {
  name: string;
  url: string;
}

export const ATTRACTION_CATEGORIES: AttractionCategory[] = [
  { name: 'water-sports', url: 'https://manama.platinumlist.net/attraction/water-sports' },
  { name: 'attractions', url: 'https://manama.platinumlist.net/attraction/attractions' },
  { name: 'sightseeing', url: 'https://manama.platinumlist.net/attraction/sightseeing-and-tours' },
  { name: 'boat-tours', url: 'https://manama.platinumlist.net/attraction/boat-tours' },
  { name: 'experiences', url: 'https://manama.platinumlist.net/attraction/experiences' },
  { name: 'indoor', url: 'https://manama.platinumlist.net/attraction/indoor-attractions' },
];

export const AFFILIATE_CODE = 'yjg3yzi';
