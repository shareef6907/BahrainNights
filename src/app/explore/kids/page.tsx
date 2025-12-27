'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

// Sample kids activities data
const kidsData: ExploreItem[] = [
  {
    id: 'kids-1',
    name: 'Wahooo! Waterpark',
    slug: 'wahooo-waterpark',
    type: 'Waterpark',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1526582622520-4d6c30cd4db4?w=800',
    area: 'Seef',
    price: 'BD 15',
    ageRange: 'All Ages',
    description: 'Bahrain\'s largest indoor waterpark',
    features: ['Wave Pool', 'Lazy River', 'Kids Splash Zone'],
    isFeatured: true,
  },
  {
    id: 'kids-2',
    name: 'Little Explorer Science Centre',
    slug: 'little-explorer',
    type: 'Educational',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800',
    area: 'Manama',
    price: 'BD 8',
    ageRange: '3-12 years',
    description: 'Interactive science exhibits for curious minds',
    features: ['Planetarium', 'Workshops', 'Interactive Exhibits'],
    isFeatured: true,
  },
  {
    id: 'kids-3',
    name: 'Adhari Park',
    slug: 'adhari-park',
    type: 'Theme Park',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800',
    area: 'Adhari',
    price: 'BD 12',
    ageRange: 'All Ages',
    description: 'Outdoor theme park with rides and attractions',
    features: ['Roller Coasters', 'Ferris Wheel', 'Arcade Games'],
    isFeatured: true,
  },
  {
    id: 'kids-4',
    name: 'KidZania',
    slug: 'kidzania',
    type: 'Entertainment',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
    area: 'Seef',
    price: 'BD 18',
    ageRange: '4-14 years',
    description: 'Kid-sized city with role-play activities',
    features: ['Career Role-Play', 'Educational', 'Birthday Parties'],
  },
  {
    id: 'kids-5',
    name: 'Fun Factory',
    slug: 'fun-factory',
    type: 'Indoor Play',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800',
    area: 'Multiple Locations',
    price: 'BD 6',
    ageRange: '2-10 years',
    description: 'Indoor play areas at major malls',
    features: ['Soft Play', 'Ball Pits', 'Climbing Frames'],
  },
  {
    id: 'kids-6',
    name: 'Gravity Indoor Trampoline Park',
    slug: 'gravity-trampoline',
    type: 'Indoor Play',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=800',
    area: 'Riffa',
    price: 'BD 10',
    ageRange: '5+ years',
    description: 'Jump, flip, and bounce',
    features: ['Trampoline Arena', 'Foam Pits', 'Ninja Course'],
  },
  {
    id: 'kids-7',
    name: 'Al Areen Wildlife Park',
    slug: 'al-areen-wildlife',
    type: 'Nature',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800',
    area: 'Zallaq',
    price: 'BD 2',
    ageRange: 'All Ages',
    description: 'See Arabian wildlife up close',
    features: ['Safari Drive', 'Petting Zoo', 'Picnic Areas'],
  },
  {
    id: 'kids-8',
    name: 'Bahrain National Museum - Kids Wing',
    slug: 'national-museum-kids',
    type: 'Educational',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1565060169194-19fabf63012c?w=800',
    area: 'Manama',
    price: 'BD 1',
    ageRange: 'All Ages',
    description: 'Interactive history for children',
    features: ['Interactive Displays', 'Craft Workshops', 'Story Time'],
  },
];

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'waterpark', label: 'Waterparks' },
      { id: 'theme-park', label: 'Theme Parks' },
      { id: 'indoor-play', label: 'Indoor Play' },
      { id: 'educational', label: 'Educational' },
      { id: 'entertainment', label: 'Entertainment' },
      { id: 'nature', label: 'Nature & Wildlife' },
    ],
  },
  {
    id: 'age',
    label: 'Age Range',
    type: 'multi',
    options: [
      { id: 'toddler', label: 'Toddlers (0-3)' },
      { id: 'young', label: 'Young Kids (4-7)' },
      { id: 'older', label: 'Older Kids (8-12)' },
      { id: 'teens', label: 'Teens (13+)' },
      { id: 'all', label: 'All Ages' },
    ],
  },
  {
    id: 'area',
    label: 'Area',
    type: 'multi',
    options: [
      { id: 'manama', label: 'Manama' },
      { id: 'seef', label: 'Seef' },
      { id: 'riffa', label: 'Riffa' },
      { id: 'zallaq', label: 'Zallaq' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'single',
    options: [
      { id: 'budget', label: 'Under BD 8' },
      { id: 'mid', label: 'BD 8 - 15' },
      { id: 'premium', label: 'BD 15+' },
    ],
  },
];

export default function KidsPage() {
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

  const filteredKids = useMemo(() => {
    let result = [...kidsData];

    if (activeFilters.type?.length) {
      result = result.filter((item) =>
        activeFilters.type.some(
          (type) => item.type.toLowerCase().replace(' ', '-') === type
        )
      );
    }

    if (activeFilters.age?.length) {
      result = result.filter((item) => {
        const ageRange = item.ageRange?.toLowerCase() || '';
        if (activeFilters.age.includes('all') && ageRange.includes('all ages')) return true;
        if (activeFilters.age.includes('toddler') && (ageRange.includes('0-') || ageRange.includes('2-'))) return true;
        if (activeFilters.age.includes('young') && (ageRange.includes('3-') || ageRange.includes('4-'))) return true;
        if (activeFilters.age.includes('older') && (ageRange.includes('8-') || ageRange.includes('12'))) return true;
        if (activeFilters.age.includes('teens') && (ageRange.includes('13') || ageRange.includes('14') || ageRange.includes('+'))) return true;
        if (activeFilters.age.includes('all') && ageRange.includes('all')) return true;
        return false;
      });
    }

    if (activeFilters.area?.length) {
      result = result.filter((item) =>
        activeFilters.area.some(
          (area) => item.area.toLowerCase().includes(area)
        )
      );
    }

    if (activeFilters.price?.length) {
      result = result.filter((item) => {
        const priceNum = parseInt(item.price?.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.price.includes('budget')) return priceNum < 8;
        if (activeFilters.price.includes('mid')) return priceNum >= 8 && priceNum <= 15;
        if (activeFilters.price.includes('premium')) return priceNum > 15;
        return true;
      });
    }

    return result;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />

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
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Family & Kids
                </h1>
                <p className="text-gray-400">
                  {filteredKids.length} family-friendly activities
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
            categoryColor="#22C55E"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreGrid
          items={filteredKids}
          category="kids"
          emptyMessage="No activities match your filters"
        />
      </section>
    </div>
  );
}
