'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

// Sample shopping data
const shoppingData: ExploreItem[] = [
  {
    id: 'shop-1',
    name: 'City Centre Bahrain',
    slug: 'city-centre-bahrain',
    type: 'Mall',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
    area: 'Seef',
    openingHours: '10 AM - 10 PM',
    description: '350+ stores, Cinema, Entertainment',
    features: ['Cinema', 'Food Court', 'Parking'],
    isFeatured: true,
  },
  {
    id: 'shop-2',
    name: 'The Avenues Bahrain',
    slug: 'avenues-bahrain',
    type: 'Mall',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
    area: 'Manama',
    openingHours: '10 AM - 10 PM',
    description: '200+ stores, Dining, Cinema',
    features: ['Waterfront', 'Dining District', 'VOX Cinema'],
    isFeatured: true,
  },
  {
    id: 'shop-3',
    name: 'Manama Souq',
    slug: 'manama-souq',
    type: 'Traditional Market',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1555529669-2269763671c0?w=800',
    area: 'Manama',
    openingHours: '9 AM - 9 PM',
    description: 'Gold, pearls, spices, textiles',
    features: ['Gold Souq', 'Spice Market', 'Textiles'],
    isFeatured: true,
  },
  {
    id: 'shop-4',
    name: 'Bahrain Farmers Market',
    slug: 'farmers-market',
    type: 'Weekly Market',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
    area: 'Budaiya',
    openingHours: 'Saturdays 8 AM - 12 PM',
    description: 'Local produce every Saturday',
    features: ['Fresh Produce', 'Local Vendors', 'Organic'],
  },
  {
    id: 'shop-5',
    name: 'Moda Mall',
    slug: 'moda-mall',
    type: 'Mall',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    area: 'Manama',
    openingHours: '10 AM - 10 PM',
    description: 'Luxury brands and designer stores',
    features: ['Luxury Brands', 'Fine Dining', 'Valet Parking'],
  },
  {
    id: 'shop-6',
    name: 'Seef Mall',
    slug: 'seef-mall',
    type: 'Mall',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800',
    area: 'Seef',
    openingHours: '10 AM - 10 PM',
    description: 'Family-friendly shopping destination',
    features: ['Family Entertainment', 'Food Court', 'Cinema'],
  },
  {
    id: 'shop-7',
    name: 'Gold City',
    slug: 'gold-city',
    type: 'Specialty Market',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    area: 'Manama',
    openingHours: '10 AM - 9 PM',
    description: 'Gold jewelry and precious gems',
    features: ['Gold Jewelry', 'Diamonds', 'Custom Design'],
  },
  {
    id: 'shop-8',
    name: 'Block 338',
    slug: 'block-338',
    type: 'Boutique District',
    category: 'shopping',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800',
    area: 'Adliya',
    openingHours: '10 AM - 11 PM',
    description: 'Art galleries, boutiques, and cafes',
    features: ['Art Galleries', 'Boutiques', 'Cafes & Bars'],
  },
];

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'mall', label: 'Mall' },
      { id: 'traditional-market', label: 'Souq/Market' },
      { id: 'boutique', label: 'Boutique' },
      { id: 'weekly-market', label: 'Pop-up Market' },
    ],
  },
  {
    id: 'area',
    label: 'Area',
    type: 'multi',
    options: [
      { id: 'manama', label: 'Manama' },
      { id: 'seef', label: 'Seef' },
      { id: 'adliya', label: 'Adliya' },
      { id: 'budaiya', label: 'Budaiya' },
    ],
  },
];

export default function ShoppingPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (filterId: string, value: string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleClearAll = () => {
    setActiveFilters({});
  };

  const filteredShopping = useMemo(() => {
    let result = [...shoppingData];

    if (activeFilters.type?.length) {
      result = result.filter((shop) =>
        activeFilters.type.some(
          (type) => shop.type.toLowerCase().replace(' ', '-') === type
        )
      );
    }

    if (activeFilters.area?.length) {
      result = result.filter((shop) =>
        activeFilters.area.some(
          (area) => shop.area.toLowerCase() === area
        )
      );
    }

    return result;
  }, [activeFilters]);

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
                  {filteredShopping.length} shopping destinations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="py-4 border-b border-white/10">
          <ExploreFilters
            filters={filterConfigs}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            categoryColor="#D97706"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreGrid
          items={filteredShopping}
          category="shopping"
          emptyMessage="No shopping destinations match your filters"
        />
      </section>
    </div>
  );
}
