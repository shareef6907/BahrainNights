'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

// Sample community events data
const communityData: ExploreItem[] = [
  {
    id: 'community-1',
    name: 'Beach Cleanup Drive',
    slug: 'beach-cleanup-drive',
    type: 'Volunteer',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800',
    area: 'Amwaj Islands',
    date: 'Every Saturday',
    organization: 'Bahrain Environment Society',
    description: 'Join us to keep Bahrain\'s beaches clean',
    features: ['Equipment Provided', 'Family Friendly', 'Certificate'],
    isFeatured: true,
  },
  {
    id: 'community-2',
    name: 'Bahrain Running Club',
    slug: 'bahrain-running-club',
    type: 'Sports Club',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
    area: 'Various Locations',
    date: 'Tue, Thu, Sat',
    organization: 'Bahrain Road Runners',
    description: 'Free weekly group runs for all levels',
    features: ['All Levels Welcome', 'Free to Join', 'Social Events'],
    isFeatured: true,
  },
  {
    id: 'community-3',
    name: 'Rotary Club Charity Gala',
    slug: 'rotary-charity-gala',
    type: 'Charity',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    area: 'Manama',
    date: 'March 15, 2025',
    organization: 'Rotary Club of Bahrain',
    description: 'Annual fundraising gala for local causes',
    features: ['Dinner Included', 'Live Auction', 'Entertainment'],
    isFeatured: true,
  },
  {
    id: 'community-4',
    name: 'Animal Shelter Volunteer Day',
    slug: 'animal-shelter-volunteer',
    type: 'Volunteer',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    area: 'Budaiya',
    date: 'Weekends',
    organization: 'Bahrain Society for Animal Welfare',
    description: 'Help care for rescued animals',
    features: ['Training Provided', 'Adopt Events', 'Dog Walking'],
  },
  {
    id: 'community-5',
    name: 'Business Networking Breakfast',
    slug: 'business-networking',
    type: 'Networking',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
    area: 'Seef',
    date: 'First Wednesday Monthly',
    organization: 'Bahrain Business Network',
    description: 'Connect with local entrepreneurs',
    features: ['Breakfast Included', 'Pitch Sessions', 'Mentoring'],
  },
  {
    id: 'community-6',
    name: 'Women in Tech Meetup',
    slug: 'women-in-tech',
    type: 'Networking',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    area: 'Manama',
    date: 'Monthly',
    organization: 'She Codes Bahrain',
    description: 'Empowering women in technology',
    features: ['Workshops', 'Panel Discussions', 'Mentorship'],
  },
  {
    id: 'community-7',
    name: 'Food Bank Distribution',
    slug: 'food-bank',
    type: 'Charity',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
    area: 'Multiple Locations',
    date: 'Weekly',
    organization: 'Bahrain Food Bank',
    description: 'Help distribute meals to families in need',
    features: ['Morning Shifts', 'Evening Shifts', 'Weekend Options'],
  },
  {
    id: 'community-8',
    name: 'Bahrain Photography Club',
    slug: 'photography-club',
    type: 'Hobby Club',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    area: 'Various Locations',
    date: 'Bi-weekly',
    organization: 'BH Photography Society',
    description: 'Photo walks and workshops',
    features: ['All Skill Levels', 'Photo Walks', 'Exhibitions'],
  },
];

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'volunteer', label: 'Volunteer' },
      { id: 'charity', label: 'Charity Events' },
      { id: 'networking', label: 'Networking' },
      { id: 'sports-club', label: 'Sports Clubs' },
      { id: 'hobby-club', label: 'Hobby Clubs' },
    ],
  },
  {
    id: 'frequency',
    label: 'Frequency',
    type: 'single',
    options: [
      { id: 'weekly', label: 'Weekly' },
      { id: 'monthly', label: 'Monthly' },
      { id: 'one-time', label: 'One-time Event' },
    ],
  },
  {
    id: 'area',
    label: 'Area',
    type: 'multi',
    options: [
      { id: 'manama', label: 'Manama' },
      { id: 'seef', label: 'Seef' },
      { id: 'amwaj', label: 'Amwaj Islands' },
      { id: 'budaiya', label: 'Budaiya' },
      { id: 'various', label: 'Multiple Locations' },
    ],
  },
];

export default function CommunityPage() {
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

  const filteredCommunity = useMemo(() => {
    let result = [...communityData];

    if (activeFilters.type?.length) {
      result = result.filter((item) =>
        activeFilters.type.some(
          (type) => item.type.toLowerCase().replace(' ', '-') === type
        )
      );
    }

    if (activeFilters.frequency?.length) {
      result = result.filter((item) => {
        const date = item.date?.toLowerCase() || '';
        if (activeFilters.frequency.includes('weekly') && (date.includes('week') || date.includes('sat') || date.includes('tue'))) return true;
        if (activeFilters.frequency.includes('monthly') && date.includes('month')) return true;
        if (activeFilters.frequency.includes('one-time') && date.includes('2025')) return true;
        return false;
      });
    }

    if (activeFilters.area?.length) {
      result = result.filter((item) =>
        activeFilters.area.some((area) => {
          const itemArea = item.area.toLowerCase();
          if (area === 'various' && (itemArea.includes('various') || itemArea.includes('multiple'))) return true;
          return itemArea.includes(area);
        })
      );
    }

    return result;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />

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
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Community & Charity
                </h1>
                <p className="text-gray-400">
                  {filteredCommunity.length} ways to connect and give back
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
            categoryColor="#F97316"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreGrid
          items={filteredCommunity}
          category="community"
          emptyMessage="No community events match your filters"
        />
      </section>
    </div>
  );
}
