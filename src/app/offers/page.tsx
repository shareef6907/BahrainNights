'use client';

import { useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Sparkles, Wine, UtensilsCrossed, X, Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import OfferCategoryTabs, { OfferType } from '@/components/offers/OfferCategoryTabs';
import OfferFilters, { FilterState } from '@/components/offers/OfferFilters';
import OfferGrid from '@/components/offers/OfferGrid';
import OffersByDay from '@/components/offers/OffersByDay';
import TodaysOffers from '@/components/offers/TodaysOffers';
import OfferModal from '@/components/offers/OfferModal';
import { Offer } from '@/components/offers/OfferCard';
import AdBanner from '@/components/ads/AdBanner';
import { useTranslation } from '@/lib/i18n';

function OffersPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<OfferType>('all');
  const [filters, setFilters] = useState<FilterState>({
    day: '',
    area: '',
    priceRange: '',
    sortBy: 'featured',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'day'>('grid');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch offers from API
  const fetchOffers = useCallback(async () => {
    try {
      setIsLoadingOffers(true);
      const response = await fetch('/api/offers');
      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers || []);
      }
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
      setIsLoadingOffers(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  // Initialize from URL params
  useEffect(() => {
    if (!searchParams) return;

    const type = searchParams.get('type') as OfferType;
    const day = searchParams.get('day');
    const offerId = searchParams.get('id');

    if (type && ['all', 'ladies-night', 'happy-hour', 'brunch', 'special'].includes(type)) {
      setActiveCategory(type);
    }
    if (day) {
      setFilters((prev) => ({ ...prev, day }));
    }
    if (offerId && offers.length > 0) {
      const offer = offers.find((o) => o.id === offerId);
      if (offer) {
        setSelectedOffer(offer);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, offers]);

  // Update URL on filter change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== 'all') params.set('type', activeCategory);
    if (filters.day) params.set('day', filters.day);

    const newUrl = params.toString() ? `?${params.toString()}` : '/offers';
    router.replace(newUrl, { scroll: false });
  }, [activeCategory, filters.day, router]);

  // Filter offers
  const filteredOffers = useMemo(() => {
    let result = [...offers];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (offer) =>
          offer.title.toLowerCase().includes(query) ||
          offer.venue.name.toLowerCase().includes(query) ||
          offer.description.toLowerCase().includes(query)
      );
    }

    // Category
    if (activeCategory !== 'all') {
      result = result.filter((offer) => offer.type === activeCategory);
    }

    // Day
    if (filters.day) {
      result = result.filter((offer) =>
        offer.days.some((d) => d.toLowerCase() === filters.day.toLowerCase())
      );
    }

    // Area
    if (filters.area) {
      result = result.filter((offer) =>
        offer.venue.area.toLowerCase().includes(filters.area.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        result = result.filter((o) => o.isNew).concat(result.filter((o) => !o.isNew));
        break;
      case 'ending-soon':
        result = result.filter((o) => o.isEndingSoon).concat(result.filter((o) => !o.isEndingSoon));
        break;
      case 'featured':
      default:
        result = result.filter((o) => o.isFeatured).concat(result.filter((o) => !o.isFeatured));
        break;
    }

    return result;
  }, [searchQuery, activeCategory, filters, offers]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: offers.length,
      'ladies-night': offers.filter((o) => o.type === 'ladies-night').length,
      'happy-hour': offers.filter((o) => o.type === 'happy-hour').length,
      brunch: offers.filter((o) => o.type === 'brunch').length,
      special: offers.filter((o) => o.type === 'special').length,
    };
  }, [offers]);

  // Today's offers
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayOffers = offers.filter((o) =>
    o.days.some((d) => d.toLowerCase() === todayName.toLowerCase())
  );
  const weekendOffers = offers.filter((o) =>
    o.days.some((d) => ['Friday', 'Saturday'].includes(d))
  );
  const newOffers = offers.filter((o) => o.isNew);

  const handleOfferClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
    router.replace(`/offers?id=${offer.id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
    const params = new URLSearchParams(window.location.search);
    params.delete('id');
    const newUrl = params.toString() ? `?${params.toString()}` : '/offers';
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 animate-bounce">
          <Sparkles className="w-8 h-8 text-pink-400/30" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Wine className="w-10 h-10 text-yellow-400/30" />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-bounce delay-300">
          <UtensilsCrossed className="w-8 h-8 text-orange-400/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
              <Tag className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium text-sm">{t.offers.hero.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.offers.hero.title}{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                {t.offers.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              {t.offers.hero.subtitle}
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
                placeholder={t.offers.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <OfferCategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          counts={categoryCounts}
        />
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <OfferFilters
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResults={filteredOffers.length}
        />
      </section>

      {/* Ad Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <AdBanner targetPage="offers" placement="banner" limit={5} />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
        {isLoadingOffers ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mb-4" />
            <p className="text-gray-400">{t.offers.loading}</p>
          </div>
        ) : offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Tag className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{t.offers.emptyState.title}</h3>
            <p className="text-gray-400 text-center max-w-md">
              {t.offers.emptyState.subtitle}
            </p>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Offers Grid/List */}
            <div className="flex-1">
              {viewMode === 'grid' ? (
                <OfferGrid offers={filteredOffers} onOfferClick={handleOfferClick} />
              ) : (
                <OffersByDay offers={filteredOffers} onOfferClick={handleOfferClick} />
              )}
            </div>

            {/* Sidebar - Hidden on mobile */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <TodaysOffers
                  todayOffers={todayOffers}
                  weekendOffers={weekendOffers}
                  newOffers={newOffers}
                  onOfferClick={handleOfferClick}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Offer Modal */}
      <OfferModal
        offer={selectedOffer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

// Loading component for Suspense fallback
function OffersLoading() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
        <p className="text-gray-400">{t.offers.loading}</p>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function OffersPage() {
  return (
    <Suspense fallback={<OffersLoading />}>
      <OffersPageContent />
    </Suspense>
  );
}
