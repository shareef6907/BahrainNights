'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Hotel,
  Sparkles,
  ShoppingBag,
  Ship,
  Baby,
  Users,
  Send,
} from 'lucide-react';
import ExploreCategoryCard, { ExploreCategory } from '@/components/explore/ExploreCategoryCard';
import FeaturedExperiences, { FeaturedItem } from '@/components/explore/FeaturedExperiences';
import AreasSection, { Area } from '@/components/explore/AreaCard';
import SeasonalSection, { SeasonalItem } from '@/components/explore/SeasonalSection';
import Link from 'next/link';
import Image from 'next/image';

// Category data
const exploreCategories: ExploreCategory[] = [
  {
    id: 'hotels',
    name: 'Hotels & Staycations',
    tagline: 'Luxury stays and weekend getaways',
    icon: Hotel,
    emoji: '🏨',
    href: '/explore/hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    itemCount: 24,
    color: '#3B82F6',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 'spas',
    name: 'Spas & Wellness',
    tagline: 'Relax, rejuvenate, and unwind',
    icon: Sparkles,
    emoji: '💆‍♀️',
    href: '/explore/spas',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    itemCount: 18,
    color: '#A855F7',
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 'shopping',
    name: 'Shopping & Markets',
    tagline: 'Malls, souqs, and pop-up markets',
    icon: ShoppingBag,
    emoji: '🛍️',
    href: '/explore/shopping',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
    itemCount: 32,
    color: '#D97706',
    gradient: 'from-amber-600 to-amber-800',
  },
  {
    id: 'tours',
    name: 'Tours & Experiences',
    tagline: 'Adventures and cultural discoveries',
    icon: Ship,
    emoji: '🚤',
    href: '/explore/tours',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
    itemCount: 15,
    color: '#14B8A6',
    gradient: 'from-teal-600 to-teal-800',
  },
  {
    id: 'kids',
    name: 'Kids Activities',
    tagline: 'Fun for the whole family',
    icon: Baby,
    emoji: '👶',
    href: '/explore/kids',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    itemCount: 22,
    color: '#22C55E',
    gradient: 'from-green-600 to-green-800',
  },
  {
    id: 'community',
    name: 'Community Events',
    tagline: 'Connect, volunteer, and give back',
    icon: Users,
    emoji: '🤝',
    href: '/explore/community',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    itemCount: 12,
    color: '#F97316',
    gradient: 'from-orange-600 to-orange-800',
  },
];

// Featured items
const featuredItems: FeaturedItem[] = [
  {
    id: 'feat-1',
    name: 'The Ritz-Carlton Bahrain',
    slug: 'ritz-carlton-bahrain',
    category: 'hotels',
    categoryLabel: 'Hotel',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    area: 'Seef',
    price: 'BD 120+/night',
    rating: 4.9,
  },
  {
    id: 'feat-2',
    name: 'Pearl Diving Experience',
    slug: 'pearl-diving-experience',
    category: 'tours',
    categoryLabel: 'Tour',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    area: 'Muharraq',
    price: 'BD 45',
    rating: 4.8,
  },
  {
    id: 'feat-3',
    name: 'The Spa at Ritz-Carlton',
    slug: 'spa-ritz-carlton',
    category: 'spas',
    categoryLabel: 'Spa',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
    area: 'Seef',
    price: 'BD 85',
    rating: 4.9,
  },
  {
    id: 'feat-4',
    name: 'Wahooo! Waterpark',
    slug: 'wahooo-waterpark',
    category: 'kids',
    categoryLabel: 'Kids',
    image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800',
    area: 'Seef',
    price: 'BD 15',
    rating: 4.6,
  },
  {
    id: 'feat-5',
    name: 'Manama Souq',
    slug: 'manama-souq',
    category: 'shopping',
    categoryLabel: 'Shopping',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800',
    area: 'Manama',
    rating: 4.5,
  },
  {
    id: 'feat-6',
    name: 'Bahrain Running Club',
    slug: 'bahrain-running-club',
    category: 'community',
    categoryLabel: 'Community',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
    area: 'Manama',
  },
];

// Popular items
const popularItems = [
  {
    id: 'pop-1',
    name: 'Four Seasons Hotel',
    slug: 'four-seasons-bahrain',
    category: 'hotels' as const,
    categoryLabel: 'Hotel',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    area: 'Manama',
    price: 'BD 150+/night',
    views: 2847,
  },
  {
    id: 'pop-2',
    name: 'Desert Safari Adventure',
    slug: 'desert-safari',
    category: 'tours' as const,
    categoryLabel: 'Tour',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
    area: 'Desert',
    price: 'BD 35',
    views: 1923,
  },
  {
    id: 'pop-3',
    name: 'City Centre Bahrain',
    slug: 'city-centre-bahrain',
    category: 'shopping' as const,
    categoryLabel: 'Shopping',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
    area: 'Seef',
    views: 1654,
  },
  {
    id: 'pop-4',
    name: 'Drift Spa at Four Seasons',
    slug: 'drift-spa-four-seasons',
    category: 'spas' as const,
    categoryLabel: 'Spa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
    area: 'Manama',
    price: 'BD 95',
    views: 1432,
  },
];

// Areas data
const areas: Area[] = [
  {
    id: 'manama',
    name: 'Manama',
    slug: 'manama',
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600',
    placeCount: 48,
  },
  {
    id: 'seef',
    name: 'Seef',
    slug: 'seef',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    placeCount: 35,
  },
  {
    id: 'juffair',
    name: 'Juffair',
    slug: 'juffair',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
    placeCount: 28,
  },
  {
    id: 'amwaj',
    name: 'Amwaj Islands',
    slug: 'amwaj-islands',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    placeCount: 15,
  },
  {
    id: 'adliya',
    name: 'Adliya',
    slug: 'adliya',
    image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600',
    placeCount: 22,
  },
  {
    id: 'riffa',
    name: 'Riffa',
    slug: 'riffa',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571f24ae5?w=600',
    placeCount: 18,
  },
  {
    id: 'muharraq',
    name: 'Muharraq',
    slug: 'muharraq',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600',
    placeCount: 24,
  },
];

// Seasonal items (Festive Season)
const seasonalItems: SeasonalItem[] = [
  {
    id: 'seasonal-1',
    name: 'New Year Gala at Ritz-Carlton',
    slug: 'nye-gala-ritz',
    category: 'Hotel',
    categorySlug: 'hotels',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800',
    area: 'Seef',
    description: 'Ring in 2026 with a spectacular gala dinner and fireworks',
    badge: 'NYE Special',
  },
  {
    id: 'seasonal-2',
    name: 'Winter Wonderland at City Centre',
    slug: 'winter-wonderland',
    category: 'Kids',
    categorySlug: 'kids',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800',
    area: 'Seef',
    description: 'Snow, Santa, and festive fun for the whole family',
    badge: 'Family Fun',
  },
  {
    id: 'seasonal-3',
    name: 'Holiday Spa Retreat',
    slug: 'holiday-spa-retreat',
    category: 'Spa',
    categorySlug: 'spas',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    area: 'Manama',
    description: 'Unwind with our special winter wellness packages',
    badge: '20% OFF',
  },
  {
    id: 'seasonal-4',
    name: 'Festive Market at Block 338',
    slug: 'festive-market',
    category: 'Shopping',
    categorySlug: 'shopping',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800',
    area: 'Adliya',
    description: 'Local crafts, gifts, and holiday treats',
    badge: 'This Weekend',
  },
];

const categoryColors: Record<string, string> = {
  hotels: '#3B82F6',
  spas: '#A855F7',
  shopping: '#D97706',
  tours: '#14B8A6',
  kids: '#22C55E',
  community: '#F97316',
};

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          {/* Bahrain skyline silhouette effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Explore{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover hidden gems, unique experiences, and local favorites
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {exploreCategories.map((category, index) => (
            <ExploreCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FeaturedExperiences title="Featured This Week" items={featuredItems} />
      </section>

      {/* What's Popular */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Popular Right Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/explore/${item.category}/${item.slug}`}
                className="block group"
              >
                <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                  {/* Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="inline-block px-2 py-0.5 rounded text-xs font-medium mb-2"
                      style={{
                        backgroundColor: `${categoryColors[item.category]}20`,
                        color: categoryColors[item.category],
                      }}
                    >
                      {item.categoryLabel}
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{item.area}</p>
                    <div className="flex items-center justify-between">
                      {item.price && (
                        <span
                          className="text-sm font-medium"
                          style={{ color: categoryColors[item.category] }}
                        >
                          {item.price}
                        </span>
                      )}
                      <span className="text-gray-500 text-xs">
                        {item.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Seasonal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SeasonalSection
          title="Festive Season Specials"
          subtitle="Make the most of the holiday season with these special experiences"
          items={seasonalItems}
          accentColor="#EF4444"
        />
      </section>

      {/* Areas to Explore */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AreasSection areas={areas} />
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          <div className="relative z-10 py-12 px-6 md:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Discover More Every Week
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Get personalized recommendations, exclusive deals, and insider tips delivered to your inbox
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter signup
                setEmail('');
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
