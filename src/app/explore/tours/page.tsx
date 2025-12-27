'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

// Sample tours data
const toursData: ExploreItem[] = [
  {
    id: 'tour-1',
    name: 'Pearl Diving Heritage Experience',
    slug: 'pearl-diving-experience',
    type: 'Heritage',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    area: 'Muharraq',
    price: 'BD 45',
    duration: '4 hours',
    description: 'Dive into Bahrain\'s pearl diving history',
    features: ['Traditional Dhow', 'Pearl Museum Visit', 'Light Lunch'],
    isFeatured: true,
  },
  {
    id: 'tour-2',
    name: 'Desert Safari Adventure',
    slug: 'desert-safari',
    type: 'Adventure',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
    area: 'Southern Governorate',
    price: 'BD 35',
    duration: '5 hours',
    description: 'Dune bashing, camel rides, and sunset BBQ',
    features: ['4x4 Dune Bashing', 'Camel Rides', 'BBQ Dinner'],
    isFeatured: true,
  },
  {
    id: 'tour-3',
    name: 'Bahrain Food Tour',
    slug: 'food-tour',
    type: 'Culinary',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    area: 'Manama',
    price: 'BD 40',
    duration: '3 hours',
    description: 'Taste authentic Bahraini cuisine',
    features: ['Local Markets', 'Street Food', 'Traditional Restaurant'],
    isFeatured: true,
  },
  {
    id: 'tour-4',
    name: 'Sunset Dhow Cruise',
    slug: 'sunset-dhow-cruise',
    type: 'Boat',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800',
    area: 'Manama',
    price: 'BD 55',
    duration: '3 hours',
    description: 'Sail the Arabian Gulf at sunset',
    features: ['Dinner Included', 'Live Music', 'Skyline Views'],
  },
  {
    id: 'tour-5',
    name: 'Historical Bahrain Tour',
    slug: 'historical-tour',
    type: 'Cultural',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    area: 'Multiple Areas',
    price: 'BD 30',
    duration: '6 hours',
    description: 'UNESCO sites and ancient forts',
    features: ['Qal\'at al-Bahrain', 'Bahrain Fort Museum', 'Burial Mounds'],
  },
  {
    id: 'tour-6',
    name: 'Mangrove Kayaking',
    slug: 'mangrove-kayaking',
    type: 'Adventure',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?w=800',
    area: 'Tubli Bay',
    price: 'BD 25',
    duration: '2 hours',
    description: 'Paddle through Bahrain\'s mangroves',
    features: ['Equipment Provided', 'Guide Included', 'Wildlife Spotting'],
  },
  {
    id: 'tour-7',
    name: 'F1 Track Experience',
    slug: 'f1-track-experience',
    type: 'Adventure',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=800',
    area: 'Sakhir',
    price: 'BD 150',
    duration: '2 hours',
    description: 'Drive on the Bahrain International Circuit',
    features: ['Track Driving', 'Professional Instruction', 'Safety Briefing'],
  },
  {
    id: 'tour-8',
    name: 'Night Photography Tour',
    slug: 'night-photography-tour',
    type: 'Cultural',
    category: 'tours',
    image: 'https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?w=800',
    area: 'Manama',
    price: 'BD 35',
    duration: '3 hours',
    description: 'Capture Bahrain\'s illuminated skyline',
    features: ['Professional Guide', 'Best Photo Spots', 'Tips & Techniques'],
  },
];

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'heritage', label: 'Heritage' },
      { id: 'adventure', label: 'Adventure' },
      { id: 'culinary', label: 'Food & Culinary' },
      { id: 'boat', label: 'Boat Tours' },
      { id: 'cultural', label: 'Cultural' },
    ],
  },
  {
    id: 'duration',
    label: 'Duration',
    type: 'single',
    options: [
      { id: 'short', label: 'Under 3 hours' },
      { id: 'medium', label: '3-5 hours' },
      { id: 'full-day', label: 'Full day (5+ hours)' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'single',
    options: [
      { id: 'budget', label: 'Under BD 35' },
      { id: 'mid', label: 'BD 35 - 50' },
      { id: 'premium', label: 'BD 50+' },
    ],
  },
];

export default function ToursPage() {
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

  const filteredTours = useMemo(() => {
    let result = [...toursData];

    if (activeFilters.type?.length) {
      result = result.filter((tour) =>
        activeFilters.type.some(
          (type) => tour.type.toLowerCase() === type
        )
      );
    }

    if (activeFilters.duration?.length) {
      result = result.filter((tour) => {
        const hours = parseInt(tour.duration?.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.duration.includes('short')) return hours < 3;
        if (activeFilters.duration.includes('medium')) return hours >= 3 && hours <= 5;
        if (activeFilters.duration.includes('full-day')) return hours > 5;
        return true;
      });
    }

    if (activeFilters.price?.length) {
      result = result.filter((tour) => {
        const priceNum = parseInt(tour.price?.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.price.includes('budget')) return priceNum < 35;
        if (activeFilters.price.includes('mid')) return priceNum >= 35 && priceNum <= 50;
        if (activeFilters.price.includes('premium')) return priceNum > 50;
        return true;
      });
    }

    return result;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent" />

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
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <span className="text-2xl">🧭</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Tours & Adventures
                </h1>
                <p className="text-gray-400">
                  {filteredTours.length} unique experiences
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
            categoryColor="#14B8A6"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreGrid
          items={filteredTours}
          category="tours"
          emptyMessage="No tours match your filters"
        />
      </section>
    </div>
  );
}
