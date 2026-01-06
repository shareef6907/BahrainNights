'use client';

import { useState, useEffect } from 'react';
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
  ArrowRight,
  Star,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedVenue {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  logo_url: string | null;
  cover_image_url: string | null;
  like_count: number;
  description: string | null;
}

interface FeaturedData {
  byCategory: Record<string, FeaturedVenue[]>;
  all: FeaturedVenue[];
}

// Category data
const exploreCategories = [
  {
    id: 'hotels',
    name: 'Hotels & Staycations',
    tagline: 'Luxury stays and weekend getaways',
    icon: Hotel,
    emoji: '🏨',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    color: '#3B82F6',
    gradient: 'from-blue-600 to-blue-800',
    description: 'List your hotel, resort, or vacation rental on BahrainNights and reach thousands of visitors looking for the perfect stay.',
    categoryPath: '/places?category=hotel',
  },
  {
    id: 'spas',
    name: 'Spa & Wellness',
    tagline: 'Relax, rejuvenate, and unwind',
    icon: Sparkles,
    emoji: '💆‍♀️',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    color: '#A855F7',
    gradient: 'from-purple-600 to-purple-800',
    description: 'Showcase your spa, wellness center, or fitness studio to health-conscious visitors seeking relaxation.',
    categoryPath: '/places?category=spa',
  },
  {
    id: 'shopping',
    name: 'Shopping & Markets',
    tagline: 'Malls, souqs, and pop-up markets',
    icon: ShoppingBag,
    emoji: '🛍️',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
    color: '#D97706',
    gradient: 'from-amber-600 to-amber-800',
    description: 'Promote your retail store, market stall, or shopping experience to shoppers across Bahrain.',
    categoryPath: '/places?category=shopping',
  },
  {
    id: 'tours',
    name: 'Tours & Experiences',
    tagline: 'Adventures and cultural discoveries',
    icon: Ship,
    emoji: '🚤',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
    color: '#14B8A6',
    gradient: 'from-teal-600 to-teal-800',
    description: 'Share your tours, adventures, and unique experiences with travelers exploring Bahrain.',
    categoryPath: '/places?category=tour',
  },
  {
    id: 'kids',
    name: 'Kids Activities',
    tagline: 'Fun for the whole family',
    icon: Baby,
    emoji: '👶',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    color: '#22C55E',
    gradient: 'from-green-600 to-green-800',
    description: 'Reach families looking for fun activities, entertainment, and educational experiences for children.',
    categoryPath: '/places?category=kids',
  },
  {
    id: 'community',
    name: 'Community Events',
    tagline: 'Connect, volunteer, and give back',
    icon: Users,
    emoji: '🤝',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    color: '#F97316',
    gradient: 'from-orange-600 to-orange-800',
    description: 'Promote your community initiatives, charity events, and social gatherings to engaged locals.',
    categoryPath: '/places?category=community',
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [featuredData, setFeaturedData] = useState<FeaturedData | null>(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await fetch('/api/explore/featured');
        if (response.ok) {
          const data = await response.json();
          setFeaturedData(data);
        }
      } catch (error) {
        console.error('Failed to fetch featured venues:', error);
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
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

      {/* Category Cards Section with Featured Venues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="space-y-12">
          {exploreCategories.map((category, index) => {
            const featuredVenues = featuredData?.byCategory[category.id] || [];
            const hasFeatured = featuredVenues.length > 0;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <span className="text-xl">{category.emoji}</span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">{category.name}</h2>
                    <p className="text-gray-400 text-sm">{category.tagline}</p>
                  </div>
                </div>

                {/* Featured Venues Grid */}
                {hasFeatured ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {featuredVenues.slice(0, 3).map((venue) => (
                      <Link
                        key={venue.id}
                        href={`/places/${venue.slug}`}
                        className="group block"
                      >
                        <div className="relative h-48 rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                          {/* Background Image */}
                          <div className="absolute inset-0">
                            {venue.cover_image_url || venue.logo_url ? (
                              <Image
                                src={venue.cover_image_url || venue.logo_url || ''}
                                alt={venue.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                            )}
                          </div>

                          {/* Gradient Overlay */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(to top, ${category.color}E6 0%, ${category.color}80 30%, transparent 70%)`,
                            }}
                          />

                          {/* Featured Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-lg">
                              <Star className="w-3 h-3 fill-black" />
                              Featured
                            </span>
                          </div>

                          {/* Content */}
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <h3 className="text-white font-semibold text-lg group-hover:text-yellow-300 transition-colors line-clamp-1">
                              {venue.name}
                            </h3>
                            <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{venue.area}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* Empty State - Register CTA Card */
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, ${category.color}F0 0%, ${category.color}CC 50%, ${category.color}66 100%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-center">
                      <p className="text-white/90 text-sm mb-3 max-w-md">
                        {category.description}
                      </p>
                      <Link
                        href="/venues/register"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all w-fit"
                      >
                        <span>Register for Free</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* View All / Register Link */}
                <div className="flex items-center justify-between">
                  {hasFeatured && (
                    <Link
                      href={category.categoryPath}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      View all {category.name.toLowerCase()}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  {!hasFeatured && <div />}
                  <Link
                    href="/venues/register"
                    className="text-sm font-medium hover:text-yellow-400 transition-colors"
                    style={{ color: category.color }}
                  >
                    + List your business
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          <div className="relative z-10 py-12 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
                Own a Business in Bahrain?
              </h2>
              <p className="text-black/80 text-lg mb-8 max-w-xl mx-auto">
                Join BahrainNights for FREE and showcase your venue, events, and offers to thousands of visitors every month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/venues/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <span>Register Your Venue</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/venues/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-black font-semibold rounded-xl hover:bg-white/30 transition-colors border border-black/20"
                >
                  Already Registered? Login
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
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
