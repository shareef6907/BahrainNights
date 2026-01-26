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
  ArrowRight,
  Star,
  MapPin,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

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

// Category data (static structure, names/taglines come from translations)
const exploreCategoriesConfig = [
  {
    id: 'hotels',
    nameKey: 'hotels',
    taglineKey: 'hotelsTagline',
    icon: Hotel,
    emoji: '🏨',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    color: '#3B82F6',
    gradient: 'from-blue-600/80 to-blue-900/90',
    categoryPath: '/explore/hotels',
  },
  {
    id: 'spas',
    nameKey: 'spas',
    taglineKey: 'spasTagline',
    icon: Sparkles,
    emoji: '💆‍♀️',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    color: '#A855F7',
    gradient: 'from-purple-600/80 to-purple-900/90',
    categoryPath: '/explore/spas',
  },
  {
    id: 'shopping',
    nameKey: 'shopping',
    taglineKey: 'shoppingTagline',
    icon: ShoppingBag,
    emoji: '🛍️',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
    color: '#F59E0B',
    gradient: 'from-amber-600/80 to-amber-900/90',
    categoryPath: '/explore/shopping',
  },
  {
    id: 'tours',
    nameKey: 'tours',
    taglineKey: 'toursTagline',
    icon: Ship,
    emoji: '🚤',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
    color: '#14B8A6',
    gradient: 'from-teal-600/80 to-teal-900/90',
    categoryPath: '/explore/tours',
  },
  {
    id: 'kids',
    nameKey: 'kids',
    taglineKey: 'kidsTagline',
    icon: Baby,
    emoji: '👶',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    color: '#22C55E',
    gradient: 'from-green-600/80 to-green-900/90',
    categoryPath: '/explore/kids',
  },
  {
    id: 'community',
    nameKey: 'community',
    taglineKey: 'communityTagline',
    icon: Users,
    emoji: '🤝',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    color: '#F97316',
    gradient: 'from-orange-600/80 to-orange-900/90',
    categoryPath: '/explore/community',
  },
];

export default function ExplorePage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredData, setFeaturedData] = useState<FeaturedData | null>(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  // Build translated categories
  const exploreCategories = exploreCategoriesConfig.map((cat) => ({
    ...cat,
    name: t.explore.categories[cat.nameKey as keyof typeof t.explore.categories] || cat.nameKey,
    tagline: t.explore.categories[cat.taglineKey as keyof typeof t.explore.categories] || cat.taglineKey,
  }));

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

  // Filter categories based on search
  const filteredCategories = exploreCategories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.explore.title}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.explore.titleHighlight}
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              {t.explore.subtitle}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.explore.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => {
            const IconComponent = category.icon;
            const featuredVenues = featuredData?.byCategory[category.id] || [];
            const hasVenues = featuredVenues.length > 0;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={category.categoryPath} className="group block">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`} />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top - Icon */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {hasVenues && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400/90 text-black text-xs font-semibold rounded-full">
                            <Star className="w-3 h-3 fill-black" />
                            {featuredVenues.length} {t.explore.featured}
                          </div>
                        )}
                      </div>

                      {/* Bottom - Text */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm">{category.tagline}</p>

                        {/* View button */}
                        <div className="mt-3 flex items-center gap-2 text-white/90 text-sm font-medium group-hover:text-yellow-300 transition-colors">
                          <span>{t.explore.exploreButton}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Venues Section */}
      {featuredData && featuredData.all.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <h2 className="text-2xl font-bold text-white">{t.explore.featuredPlaces}</h2>
            </div>
            <p className="text-gray-400">{t.explore.featuredPlacesSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredData.all.slice(0, 8).map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/places/${venue.slug}`} className="group block">
                  <div className="relative h-48 rounded-xl overflow-hidden bg-white/5">
                    {venue.cover_image_url || venue.logo_url ? (
                      <Image
                        src={venue.cover_image_url || venue.logo_url || ''}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Featured Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-lg">
                        <Star className="w-3 h-3 fill-black" />
                        {t.explore.featured}
                      </span>
                    </div>

                    {/* Likes */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-lg">
                        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                        {venue.like_count}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-white font-semibold group-hover:text-yellow-300 transition-colors line-clamp-1">
                        {venue.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-300 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{venue.area}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Register CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
                {t.explore.ownBusiness}
              </h2>
              <p className="text-black/80 text-lg mb-8 max-w-xl mx-auto">
                {t.explore.joinBahrainNights}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register-venue"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <span>{t.explore.registerYourVenue}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/venue-portal/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-black font-semibold rounded-xl hover:bg-white/30 transition-colors border border-black/20"
                >
                  {t.explore.alreadyRegistered}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
