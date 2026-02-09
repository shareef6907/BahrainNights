import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Waves, Sun, MapPin, Clock, Star,
  Utensils, Users, Umbrella, Phone
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Pool Day Passes in Bahrain 2026 | Hotel Pools & Beach Clubs',
  description: 'Complete guide to pool day passes in Bahrain — luxury hotel pools, beach clubs, and day access rates. Compare prices, facilities, and book your perfect pool day.',
  keywords: 'pool day pass Bahrain, hotel pool Bahrain, beach club Bahrain, day pass Manama, swimming Bahrain, Four Seasons pool, Ritz Carlton pool, best pools Bahrain',
  openGraph: {
    title: 'Best Pool Day Passes in Bahrain 2026 | Hotel Pools & Beach Clubs',
    description: 'Your guide to the best hotel pools and beach clubs with day passes in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/pool-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Pool Day Passes in Bahrain 2026',
    description: 'Luxury hotel pools and beach clubs with day access in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain',
  },
};

const luxuryPools = [
  { name: 'Four Seasons Bahrain Bay', location: 'Bahrain Bay', description: 'Stunning infinity pools overlooking the bay with private cabanas, beach access, and world-class service. The ultimate luxury pool experience.', pools: '3 pools + beach', facilities: 'Cabanas, beach, spa, fine dining', price: 'BD 40-60', weekendPrice: 'BD 50-70', includes: 'Pool, beach, towels, locker', contact: '+973 1711 5000' },
  { name: 'The Ritz-Carlton Bahrain', location: 'Seef', description: 'Iconic resort with expansive pools, private beach, and legendary service. Multiple pool options including adults-only.', pools: '4 pools + lagoon beach', facilities: 'Private beach, cabanas, restaurants', price: 'BD 35-55', weekendPrice: 'BD 45-65', includes: 'Pool, beach, towels, F&B credit', contact: '+973 1758 0000' },
  { name: 'Jumeirah Royal Saray', location: 'Seef', description: 'Adults-only beach club with premium pools, daybeds, and sophisticated atmosphere. Perfect for couples.', pools: '2 pools + beach', facilities: 'Infinity pool, beach, restaurant', price: 'BD 35-50', weekendPrice: 'BD 45-60', includes: 'Pool, beach, towels', contact: '+973 7777 3000' },
  { name: 'Sofitel Bahrain', location: 'Seef', description: 'Beachfront resort with multiple pools, water sports, and excellent F&B options. Great for families.', pools: '3 pools + beach', facilities: 'Beach, water sports, kids pool', price: 'BD 25-40', weekendPrice: 'BD 35-50', includes: 'Pool, beach, towels', contact: '+973 1711 5000' },
];

const midRangePools = [
  { name: 'Gulf Hotel', location: 'Adliya', description: 'Legendary hotel with large pool, gardens, and iconic atmosphere. Day passes include F&B credit.', pools: '1 large pool', price: 'BD 20-30', includes: 'Pool, F&B credit, towels', facilities: 'Restaurant, bar, garden' },
  { name: 'Wyndham Grand', location: 'Manama', description: 'City hotel with rooftop pool and stunning skyline views. Adult-friendly atmosphere.', pools: 'Rooftop pool', price: 'BD 18-28', includes: 'Pool, towels, gym access', facilities: 'Rooftop bar, gym' },
  { name: 'Intercontinental Regency', location: 'Manama', description: 'Central location with pool, gym, and convenient access to Manama attractions.', pools: '1 pool', price: 'BD 20-30', includes: 'Pool, gym, towels', facilities: 'Gym, restaurants' },
  { name: 'Crowne Plaza', location: 'Diplomatic Area', description: 'Business hotel with refreshing pool area, good for a quick escape from the city.', pools: '1 pool', price: 'BD 15-25', includes: 'Pool, towels', facilities: 'Restaurant, bar' },
  { name: 'ART Rotana', location: 'Amwaj Islands', description: 'Island resort with beach access, pools, and relaxed vibe. Great for families.', pools: '2 pools + beach', price: 'BD 20-35', includes: 'Pool, beach, towels', facilities: 'Beach, restaurants' },
  { name: 'Novotel Al Dana Resort', location: 'Diplomatic Area', description: 'Resort-style hotel with large pool area and family-friendly facilities.', pools: '1 large pool', price: 'BD 15-22', includes: 'Pool, towels', facilities: 'Gardens, restaurant' },
];

const beachClubs = [
  { name: 'Marassi Beach Club', location: 'Diyar Al Muharraq', description: 'Premium beach club with pristine sands, crystal pools, and upscale dining. Bahrain\'s most Instagrammable beach destination.', vibe: 'Upscale', dayPass: 'BD 35-50', membership: 'Available', bestFor: 'Couples, influencers' },
  { name: 'Coral Beach Club', location: 'Amwaj Islands', description: 'Established beach club with pools, beach, and water sports. Popular with families and groups.', vibe: 'Family-friendly', dayPass: 'BD 25-40', membership: 'Available', bestFor: 'Families, groups' },
  { name: 'Hawar Islands Resort', location: 'Hawar Islands', description: 'Remote island resort with pristine beaches and wildlife. Day trips available by boat.', vibe: 'Adventure', dayPass: 'BD 50+ (includes boat)', membership: 'Resort packages', bestFor: 'Nature lovers, adventure' },
];

const budgetOptions = [
  { name: 'Public Beaches', location: 'Various', description: 'Free beach access at Amwaj, Jaw, and other public areas. Basic facilities.', price: 'Free', facilities: 'Basic' },
  { name: 'Lost Paradise Pool', location: 'Sakhir', description: 'Waterpark entry includes pools, slides, and all-day fun.', price: 'BD 18-28', facilities: 'Waterpark' },
  { name: 'Hotel Happy Hours', location: 'Various', description: 'Some hotels offer discounted afternoon rates (2-6pm). Call to inquire.', price: 'BD 10-18', facilities: 'Varies' },
];

const seasonalTips = [
  { season: 'Summer (May-Sep)', advice: 'Peak pool season. Book cabanas in advance. Morning visits (before 11am) are less crowded and cooler.', pricing: 'Higher rates, book ahead' },
  { season: 'Winter (Nov-Feb)', advice: 'Pleasant weather but pools may be too cool for some. Heated pools at luxury hotels. Great for beach clubs.', pricing: 'Lower rates, deals available' },
  { season: 'Ramadan', advice: 'Pools still available for non-Muslims. Expect quieter atmosphere and possible restaurant closures during day.', pricing: 'Special Ramadan packages' },
  { season: 'Weekends (Thu-Fri)', advice: 'Busiest days. Prices often higher. Book in advance for cabanas and beach clubs.', pricing: 'Weekend premium rates' },
];

const whatToExpect = [
  { item: 'Included', details: 'Pool access, beach (where available), towels, sun loungers, changing facilities' },
  { item: 'Extra Cost', details: 'Food & beverages, cabanas/daybeds, water sports, spa treatments' },
  { item: 'Dress Code', details: 'Swimwear at pool only. Cover-up required in restaurant areas' },
  { item: 'Booking', details: 'Advance booking recommended, especially weekends. Call hotel directly for best rates' },
  { item: 'Children', details: 'Most hotels welcome kids. Some beach clubs are adults-only. Check before booking' },
  { item: 'Time Slots', details: 'Typical access 9am-7pm. Some offer half-day rates. Sunset sessions popular' },
];

const faqs = [
  { q: 'Which hotel has the best pool in Bahrain?', a: 'Four Seasons Bahrain Bay is widely considered to have the best hotel pool, with stunning infinity pools overlooking the bay. The Ritz-Carlton offers the most extensive pool complex with multiple pools and a private beach. Both offer premium day passes.' },
  { q: 'How much is a pool day pass in Bahrain?', a: 'Pool day passes in Bahrain range from BD 15-25 at mid-range hotels to BD 35-60+ at luxury properties like Four Seasons and Ritz-Carlton. Weekend rates are typically BD 10-15 higher. Most include pool, towels, and basic facilities.' },
  { q: 'Are there adults-only pools in Bahrain?', a: 'Yes, Jumeirah Royal Saray offers an adults-only beach club experience. Several luxury hotels also have designated adults-only pool areas. Beach clubs like Marassi tend to have a more adult-oriented atmosphere, especially on weekdays.' },
  { q: 'Can non-guests use hotel pools in Bahrain?', a: 'Yes, most hotels in Bahrain offer day passes to non-guests. Call ahead to confirm availability and rates, especially during peak season and weekends. Some hotels may require advance booking.' },
  { q: 'What are the best beach clubs in Bahrain?', a: 'Top beach clubs include Marassi Beach Club (upscale, Diyar), Coral Beach Club (family-friendly, Amwaj), and the beach clubs at Four Seasons and Ritz-Carlton. Hawar Islands Resort offers a unique remote beach experience.' },
];

export default function PoolDayPassesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Pool Day Passes', url: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max