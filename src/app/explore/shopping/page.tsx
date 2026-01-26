'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, MapPin, Store, Sparkles, Shirt, Smartphone, Coffee, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Brand data organized by category
const brandCategories = [
  {
    title: 'Luxury Fashion',
    icon: Sparkles,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    brands: [
      { name: 'Chanel', slug: 'chanel', emoji: '👜' },
      { name: 'Louis Vuitton', slug: 'louis-vuitton', emoji: '👝' },
      { name: 'Gucci', slug: 'gucci', emoji: '🎀' },
      { name: 'Dior', slug: 'dior', emoji: '💎' },
      { name: 'Hermès', slug: 'hermes', emoji: '🧣' },
    ],
  },
  {
    title: 'Popular Fashion',
    icon: Shirt,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-400',
    brands: [
      { name: 'Zara', slug: 'zara', emoji: '👗' },
      { name: 'H&M', slug: 'hm', emoji: '👕' },
      { name: 'Uniqlo', slug: 'uniqlo', emoji: '🧥' },
      { name: 'Nike', slug: 'nike', emoji: '👟' },
      { name: 'Adidas', slug: 'adidas', emoji: '👟' },
    ],
  },
  {
    title: 'Lifestyle & Home',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    brands: [
      { name: 'Apple', slug: 'apple', emoji: '📱' },
      { name: 'IKEA', slug: 'ikea', emoji: '🛋️' },
      { name: 'Sephora', slug: 'sephora', emoji: '💄' },
      { name: 'Bath & Body Works', slug: 'bath-body-works', emoji: '🧴' },
      { name: 'Crocs', slug: 'crocs', emoji: '🩴' },
    ],
  },
  {
    title: 'Food & Coffee',
    icon: Coffee,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    brands: [
      { name: 'Starbucks', slug: 'starbucks', emoji: '☕' },
      { name: 'Costa Coffee', slug: 'costa-coffee', emoji: '☕' },
      { name: 'Cheesecake Factory', slug: 'cheesecake-factory', emoji: '🍰' },
      { name: 'Shake Shack', slug: 'shake-shack', emoji: '🍔' },
      { name: 'Five Guys', slug: 'five-guys', emoji: '🍟' },
    ],
  },
];

// Mall data
const malls = [
  { name: 'City Centre Bahrain', area: 'Seef', stores: '340+' },
  { name: 'Seef Mall', area: 'Seef', stores: '160+' },
  { name: 'Moda Mall', area: 'Manama', stores: '80+' },
  { name: 'The Avenues', area: 'Bahrain Bay', stores: '200+' },
  { name: 'Bahrain Mall', area: 'Sanabis', stores: '120+' },
];

export default function ShoppingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Shopping & Markets
                </h1>
                <p className="text-gray-400">
                  Find your favorite brands in Bahrain
                </p>
              </div>
            </div>
            <p className="text-gray-300 max-w-2xl mt-4">
              Your complete guide to shopping in Bahrain. Find store locations, mall directories, 
              and brand outlets across the Kingdom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links - Malls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-400" />
            Major Malls
          </h2>
          <div className="flex flex-wrap gap-3">
            {malls.map((mall) => (
              <div
                key={mall.name}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm"
              >
                <span className="text-white font-medium">{mall.name}</span>
                <span className="text-gray-500 ml-2">• {mall.area}</span>
              </div>
            ))}
            <Link
              href="/guides/malls"
              className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-sm text-amber-400 hover:bg-amber-500/30 transition-colors"
            >
              View All Malls →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Brand Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-400" />
            Find Brands in Bahrain
          </h2>

          <div className="space-y-10">
            {brandCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * categoryIndex }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                    <category.icon className={`w-5 h-5 ${category.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {category.brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/guides/brands/${brand.slug}`}
                      className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="text-3xl mb-2">{brand.emoji}</div>
                      <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {brand.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Store locations →</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* More Shopping Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-6">More Shopping Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/guides/malls"
              className="group bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all"
            >
              <span className="text-3xl mb-3 block">🏬</span>
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                Complete Mall Guide
              </h3>
              <p className="text-sm text-gray-400 mt-1">All malls with store directories</p>
            </Link>

            <Link
              href="/guides/souks"
              className="group bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all"
            >
              <span className="text-3xl mb-3 block">🏺</span>
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                Traditional Souks
              </h3>
              <p className="text-sm text-gray-400 mt-1">Gold Souq, Bab Al Bahrain & more</p>
            </Link>

            <Link
              href="/guides/budget"
              className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all"
            >
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
                Budget Shopping
              </h3>
              <p className="text-sm text-gray-400 mt-1">Best deals and discounts</p>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Register CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-8 text-center"
        >
          <ShoppingBag className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Own a Store or Mall?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            List your venue on BahrainNights and reach thousands of shoppers looking for the best places in Bahrain.
          </p>
          <Link
            href="/register-venue"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
          >
            Register Your Venue
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
