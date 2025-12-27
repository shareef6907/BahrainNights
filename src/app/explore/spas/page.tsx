'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

// Sample spas data
const spasData: ExploreItem[] = [
  {
    id: 'spa-1',
    name: 'The Spa at Ritz-Carlton',
    slug: 'spa-ritz-carlton',
    type: 'Hotel Spa',
    category: 'spas',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
    area: 'Seef',
    price: 'BD 85',
    rating: 4.9,
    description: 'Signature: Royal Hammam Experience',
    features: ['Hammam', 'Couples Rooms', 'Pool Access'],
    isFeatured: true,
  },
  {
    id: 'spa-2',
    name: 'Drift Spa at Four Seasons',
    slug: 'drift-spa-four-seasons',
    type: 'Hotel Spa',
    category: 'spas',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
    area: 'Manama',
    price: 'BD 95',
    rating: 4.9,
    description: 'Signature: Bahraini Pearl Journey',
    features: ['Pearl Treatments', 'Private Suites', 'Sea View'],
    isFeatured: true,
  },
  {
    id: 'spa-3',
    name: 'Serenity Wellness Center',
    slug: 'serenity-wellness',
    type: 'Day Spa',
    category: 'spas',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    area: 'Adliya',
    price: 'BD 65',
    rating: 4.7,
    description: 'Signature: Full Day Retreat',
    features: ['Yoga Studio', 'Meditation', 'Organic Products'],
  },
  {
    id: 'spa-4',
    name: 'Thai Harmony Spa',
    slug: 'thai-harmony-spa',
    type: 'Day Spa',
    category: 'spas',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800',
    area: 'Juffair',
    price: 'BD 35',
    rating: 4.6,
    description: 'Signature: Traditional Thai Massage',
    features: ['Thai Massage', 'Foot Reflexology', 'Hot Stone'],
  },
  {
    id: 'spa-5',
    name: 'Heavenly Spa by Westin',
    slug: 'heavenly-spa-westin',
    type: 'Hotel Spa',
    category: 'spas',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800',
    area: 'Seef',
    price: 'BD 75',
    rating: 4.5,
    description: 'Signature: Heavenly Body Treatment',
    features: ['Aromatherapy', 'Body Wraps', 'Facials'],
  },
  {
    id: 'spa-6',
    name: 'Zen Garden Wellness',
    slug: 'zen-garden-wellness',
    type: 'Wellness Center',
    category: 'spas',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800',
    area: 'Riffa',
    price: 'BD 45',
    rating: 4.4,
    description: 'Signature: Holistic Healing Package',
    features: ['Acupuncture', 'Cupping', 'Herbal Therapy'],
  },
];

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'hotel-spa', label: 'Hotel Spa' },
      { id: 'day-spa', label: 'Day Spa' },
      { id: 'wellness-center', label: 'Wellness Center' },
    ],
  },
  {
    id: 'area',
    label: 'Area',
    type: 'multi',
    options: [
      { id: 'manama', label: 'Manama' },
      { id: 'seef', label: 'Seef' },
      { id: 'juffair', label: 'Juffair' },
      { id: 'adliya', label: 'Adliya' },
      { id: 'riffa', label: 'Riffa' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    type: 'multi',
    options: [
      { id: 'massage', label: 'Massage' },
      { id: 'hammam', label: 'Hammam' },
      { id: 'facials', label: 'Facials' },
      { id: 'yoga', label: 'Yoga' },
    ],
  },
];

export default function SpasPage() {
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

  const filteredSpas = useMemo(() => {
    let result = [...spasData];

    if (activeFilters.type?.length) {
      result = result.filter((spa) =>
        activeFilters.type.some(
          (type) => spa.type.toLowerCase().replace(' ', '-') === type
        )
      );
    }

    if (activeFilters.area?.length) {
      result = result.filter((spa) =>
        activeFilters.area.some(
          (area) => spa.area.toLowerCase() === area
        )
      );
    }

    return result;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />

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
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <span className="text-2xl">💆‍♀️</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Spas & Wellness
                </h1>
                <p className="text-gray-400">
                  {filteredSpas.length} relaxation destinations
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
            categoryColor="#A855F7"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreGrid
          items={filteredSpas}
          category="spas"
          emptyMessage="No spas match your filters"
        />
      </section>
    </div>
  );
}
