'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Hotel, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

// Sample hotels data
const hotelsData: ExploreItem[] = [
  {
    id: 'hotel-1',
    name: 'The Ritz-Carlton Bahrain',
    slug: 'ritz-carlton-bahrain',
    type: '5 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    area: 'Seef',
    price: 'BD 120+/night',
    stars: 5,
    rating: 4.9,
    features: ['Beach', 'Pool', 'Spa', 'Multiple Restaurants'],
    isFeatured: true,
  },
  {
    id: 'hotel-2',
    name: 'Four Seasons Hotel Bahrain',
    slug: 'four-seasons-bahrain',
    type: '5 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    area: 'Manama',
    price: 'BD 150+/night',
    stars: 5,
    rating: 4.9,
    features: ['Private Beach', 'Spa', 'Fine Dining'],
    isFeatured: true,
  },
  {
    id: 'hotel-3',
    name: 'Gulf Hotel Bahrain',
    slug: 'gulf-hotel-bahrain',
    type: '5 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    area: 'Manama',
    price: 'BD 80+/night',
    stars: 5,
    rating: 4.7,
    features: ['Pool', 'Multiple Restaurants', 'Convention Center'],
  },
  {
    id: 'hotel-4',
    name: 'The Merchant House',
    slug: 'merchant-house',
    type: 'Boutique',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    area: 'Manama',
    price: 'BD 95+/night',
    stars: 4,
    rating: 4.8,
    features: ['Historic Building', 'Rooftop', 'Restaurant'],
    isFeatured: true,
  },
  {
    id: 'hotel-5',
    name: 'Wyndham Grand Manama',
    slug: 'wyndham-grand-manama',
    type: '5 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    area: 'Manama',
    price: 'BD 70+/night',
    stars: 5,
    rating: 4.5,
    features: ['Pool', 'Spa', 'Central Location'],
  },
  {
    id: 'hotel-6',
    name: 'Coral Bay Resort',
    slug: 'coral-bay-resort',
    type: '4 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    area: 'Amwaj Islands',
    price: 'BD 60+/night',
    stars: 4,
    rating: 4.4,
    features: ['Beach Club', 'Pool', 'Water Sports'],
  },
  {
    id: 'hotel-7',
    name: 'Sofitel Bahrain Zallaq',
    slug: 'sofitel-zallaq',
    type: '5 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    area: 'Zallaq',
    price: 'BD 100+/night',
    stars: 5,
    rating: 4.6,
    features: ['Beach', 'Pool', 'Spa', 'Golf Nearby'],
  },
  {
    id: 'hotel-8',
    name: 'The Westin City Centre',
    slug: 'westin-city-centre',
    type: '5 Star',
    category: 'hotels',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    area: 'Seef',
    price: 'BD 85+/night',
    stars: 5,
    rating: 4.5,
    features: ['Mall Access', 'Pool', 'Spa', 'Fitness Center'],
  },
];

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'stars',
    label: 'Star Rating',
    type: 'multi',
    options: [
      { id: '5', label: '5 Stars' },
      { id: '4', label: '4 Stars' },
      { id: '3', label: '3 Stars' },
    ],
  },
  {
    id: 'area',
    label: 'Area',
    type: 'multi',
    options: [
      { id: 'manama', label: 'Manama' },
      { id: 'seef', label: 'Seef' },
      { id: 'amwaj-islands', label: 'Amwaj Islands' },
      { id: 'zallaq', label: 'Zallaq' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'single',
    options: [
      { id: 'budget', label: 'Under BD 70' },
      { id: 'mid', label: 'BD 70 - 100' },
      { id: 'luxury', label: 'BD 100+' },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    type: 'multi',
    options: [
      { id: 'pool', label: 'Pool' },
      { id: 'spa', label: 'Spa' },
      { id: 'beach', label: 'Beach' },
      { id: 'restaurant', label: 'Restaurant' },
    ],
  },
];

export default function HotelsPage() {
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

  const filteredHotels = useMemo(() => {
    let result = [...hotelsData];

    // Filter by stars
    if (activeFilters.stars?.length) {
      result = result.filter((hotel) =>
        activeFilters.stars.includes(String(hotel.stars))
      );
    }

    // Filter by area
    if (activeFilters.area?.length) {
      result = result.filter((hotel) =>
        activeFilters.area.some(
          (area) => hotel.area.toLowerCase().replace(' ', '-') === area
        )
      );
    }

    // Filter by price
    if (activeFilters.price?.length) {
      result = result.filter((hotel) => {
        const priceNum = parseInt(hotel.price?.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.price.includes('budget')) return priceNum < 70;
        if (activeFilters.price.includes('mid')) return priceNum >= 70 && priceNum <= 100;
        if (activeFilters.price.includes('luxury')) return priceNum > 100;
        return true;
      });
    }

    // Filter by features
    if (activeFilters.features?.length) {
      result = result.filter((hotel) =>
        activeFilters.features.some((feature) =>
          hotel.features?.some((f) => f.toLowerCase().includes(feature))
        )
      );
    }

    return result;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Link */}
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
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <span className="text-2xl">🏨</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Hotels & Staycations
                </h1>
                <p className="text-gray-400">
                  {filteredHotels.length} luxury stays in Bahrain
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
            categoryColor="#3B82F6"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreGrid
          items={filteredHotels}
          category="hotels"
          emptyMessage="No hotels match your filters"
        />
      </section>
    </div>
  );
}
