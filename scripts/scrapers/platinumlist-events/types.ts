export interface ScrapedEvent {
  title: string;
  slug: string;
  description: string;
  price: number | null;  // null means "Contact for price"
  price_currency: string;
  image_url: string;
  cover_url: string;
  venue_name: string;
  venue_address: string;
  category: string;
  start_date: string;
  end_date: string | null;
  start_time: string | null;
  source_url: string;
  source_name: string;
  affiliate_url: string;
  is_sold_out: boolean;
  is_active: boolean;
  status: string;
}

export interface EventCategory {
  name: string;
  url: string;
}

export const EVENT_CATEGORIES: EventCategory[] = [
  { name: 'events', url: 'https://manama.platinumlist.net/events' },
  { name: 'concerts', url: 'https://manama.platinumlist.net/concerts' },
  { name: 'nightlife', url: 'https://manama.platinumlist.net/nightlife' },
  { name: 'comedy', url: 'https://manama.platinumlist.net/comedy' },
  { name: 'theatre', url: 'https://manama.platinumlist.net/theatre' },
  { name: 'festivals', url: 'https://manama.platinumlist.net/festivals' },
  { name: 'sports', url: 'https://manama.platinumlist.net/sports' },
];

export const AFFILIATE_CODE = 'yjg3yzi';

// Known artists for category detection
export const KNOWN_ARTISTS = [
  'josh groban', 'linkin park', 'calvin harris', 'andré rieu', 'andre rieu',
  'halsey', 'john mayer', 'majid al mohandis', 'el daheeh', 'abhishek upmanyu',
  'russell peters', 'trevor noah', 'kevin hart', 'chris rock', 'dave chappelle',
  'green day', 'coldplay', 'ed sheeran', 'the weeknd', 'dua lipa', 'bad bunny',
  'billie eilish', 'taylor swift', 'beyonce', 'drake', 'kanye west', 'eminem',
  'ariana grande', 'bruno mars', 'maroon 5', 'imagine dragons', 'one republic',
];
