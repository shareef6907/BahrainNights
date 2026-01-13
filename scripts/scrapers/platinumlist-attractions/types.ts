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
  { name: 'things-to-do', url: 'https://manama.platinumlist.net/things-to-do' },
  { name: 'attractions', url: 'https://manama.platinumlist.net/attractions' },
  { name: 'tours', url: 'https://manama.platinumlist.net/tours' },
];

export const AFFILIATE_CODE = 'yjg3yzi';
