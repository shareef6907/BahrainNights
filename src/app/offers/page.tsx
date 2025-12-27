'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
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

// Sample Offers Data (16 offers across 4 categories)
const sampleOffers: Offer[] = [
  // Ladies Nights (4)
  {
    id: 'ln-1',
    title: 'Pink Wednesday - Free Drinks for Ladies',
    slug: 'pink-wednesday-free-drinks',
    venue: {
      id: 'v1',
      name: 'The Orangery',
      slug: 'the-orangery',
      logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=500&fit=crop',
      area: 'Adliya',
      category: 'lounge',
    },
    type: 'ladies-night',
    description: 'Join us every Wednesday for the ultimate ladies night experience. Enjoy 3 complimentary house beverages, access to our exclusive ladies-only lounge area, and 50% off on selected food items. DJ spinning the best tracks from 9 PM onwards.',
    shortDescription: '3 free drinks for ladies + 50% off food',
    price: 'Free Entry',
    days: ['Wednesday'],
    time: '8:00 PM - 1:00 AM',
    validUntil: 'March 31, 2025',
    terms: ['Valid ID required', 'Maximum 3 free drinks per person', 'Cannot be combined with other offers'],
    highlights: ['3 Free Drinks', '50% Off Food', 'Live DJ', 'VIP Lounge Access'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'ln-2',
    title: 'Ladies Night Tuesdays',
    slug: 'ladies-night-tuesdays',
    venue: {
      id: 'v2',
      name: 'Coda Jazz Lounge',
      slug: 'coda-jazz-lounge',
      logo: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
      area: 'Juffair',
      category: 'lounge',
    },
    type: 'ladies-night',
    description: 'Experience an elegant evening at Coda Jazz Lounge every Tuesday. Complimentary champagne and canapés for all ladies, with live jazz performances throughout the night.',
    shortDescription: 'Free champagne & canapés with live jazz',
    price: 'Free Entry',
    days: ['Tuesday'],
    time: '7:00 PM - 12:00 AM',
    highlights: ['Free Champagne', 'Live Jazz', 'Canapés', 'Elegant Ambiance'],
    isFeatured: true,
  },
  {
    id: 'ln-3',
    title: 'Sunset Ladies at Coral Bay',
    slug: 'sunset-ladies-coral-bay',
    venue: {
      id: 'v3',
      name: 'Coral Bay Club',
      slug: 'coral-bay-club',
      logo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=500&fit=crop',
      area: 'Amwaj Islands',
      category: 'beach-club',
    },
    type: 'ladies-night',
    description: 'Watch the sunset with your girls at Coral Bay! Every Thursday, ladies enjoy unlimited house beverages from 6 PM to 10 PM, plus access to our infinity pool.',
    shortDescription: 'Unlimited drinks & pool access from 6-10 PM',
    price: 'BD 15',
    originalPrice: 'BD 35',
    discount: '57% OFF',
    days: ['Thursday'],
    time: '6:00 PM - 10:00 PM',
    highlights: ['Unlimited Drinks', 'Pool Access', 'Sunset Views', 'Beach Vibes'],
    isEndingSoon: true,
  },
  {
    id: 'ln-4',
    title: 'Femme Fatale Fridays',
    slug: 'femme-fatale-fridays',
    venue: {
      id: 'v4',
      name: 'Block 338',
      slug: 'block-338',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&h=500&fit=crop',
      area: 'Adliya',
      category: 'bar',
    },
    type: 'ladies-night',
    description: 'Start your weekend right with Femme Fatale Fridays! Free entry and 2 complimentary cocktails for all ladies before midnight.',
    shortDescription: '2 free cocktails before midnight',
    price: 'Free Entry',
    days: ['Friday'],
    time: '9:00 PM - 2:00 AM',
    highlights: ['2 Free Cocktails', 'DJ Music', 'Weekend Vibes', 'VIP Tables Available'],
  },

  // Brunches (4)
  {
    id: 'br-1',
    title: 'Friday Garden Brunch',
    slug: 'friday-garden-brunch',
    venue: {
      id: 'v5',
      name: 'The Westin Bahrain',
      slug: 'the-westin-bahrain',
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
      area: 'Bahrain Bay',
      category: 'restaurant',
    },
    type: 'brunch',
    description: 'Indulge in our award-winning Friday brunch featuring live cooking stations, international cuisine, and unlimited beverages. Kids under 6 eat free!',
    shortDescription: 'Premium buffet with live cooking stations',
    price: 'BD 28',
    originalPrice: 'BD 38',
    discount: '26% OFF',
    days: ['Friday'],
    time: '12:30 PM - 4:00 PM',
    validUntil: 'December 31, 2025',
    terms: ['Reservation required', 'Smart casual dress code', 'Kids 6-12 half price'],
    highlights: ['Live Cooking', 'Unlimited Drinks', 'Kids Eat Free', '5-Star Quality'],
    isFeatured: true,
  },
  {
    id: 'br-2',
    title: 'Seaview Saturday Brunch',
    slug: 'seaview-saturday-brunch',
    venue: {
      id: 'v6',
      name: 'Gulf Hotel',
      slug: 'gulf-hotel',
      logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=500&fit=crop',
      area: 'Manama',
      category: 'restaurant',
    },
    type: 'brunch',
    description: 'Experience Bahrain\'s most famous Saturday brunch with over 200 dishes, live entertainment, and stunning sea views. Perfect for families!',
    shortDescription: '200+ dishes with sea views & entertainment',
    price: 'BD 35',
    days: ['Saturday'],
    time: '12:00 PM - 4:00 PM',
    highlights: ['200+ Dishes', 'Live Band', 'Sea Views', 'Kids Area'],
    isNew: true,
  },
  {
    id: 'br-3',
    title: 'Pool Brunch Party',
    slug: 'pool-brunch-party',
    venue: {
      id: 'v7',
      name: 'Sofitel Bahrain',
      slug: 'sofitel-bahrain',
      logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop',
      area: 'Seef',
      category: 'restaurant',
    },
    type: 'brunch',
    description: 'Brunch and swim! Enjoy a lavish spread by the pool with live DJ, unlimited drinks, and pool access all day. The ultimate Saturday experience.',
    shortDescription: 'Brunch buffet + pool access + DJ',
    price: 'BD 32',
    days: ['Saturday'],
    time: '1:00 PM - 6:00 PM',
    highlights: ['Pool Access', 'Live DJ', 'Unlimited Drinks', 'BBQ Station'],
  },
  {
    id: 'br-4',
    title: 'Lazy Sunday Brunch',
    slug: 'lazy-sunday-brunch',
    venue: {
      id: 'v8',
      name: 'Mezzanine',
      slug: 'mezzanine',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
      area: 'Adliya',
      category: 'restaurant',
    },
    type: 'brunch',
    description: 'Start your Sunday right with our relaxed brunch menu. Eggs benedict, pancakes, fresh juices, and artisan coffee in a cozy setting.',
    shortDescription: 'Cozy brunch with artisan coffee',
    price: 'BD 18',
    days: ['Sunday'],
    time: '10:00 AM - 3:00 PM',
    highlights: ['Artisan Coffee', 'Fresh Juices', 'Eggs Benedict', 'Cozy Vibes'],
  },

  // Happy Hours (4)
  {
    id: 'hh-1',
    title: 'Golden Hour - 50% Off Drinks',
    slug: 'golden-hour-drinks',
    venue: {
      id: 'v9',
      name: 'JJ\'s Irish Restaurant',
      slug: 'jjs-irish-restaurant',
      logo: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
      area: 'Juffair',
      category: 'bar',
    },
    type: 'happy-hour',
    description: 'Half price on all drinks every day from 4 PM to 8 PM! Plus, enjoy buy-one-get-one on selected appetizers. The best after-work deal in Bahrain.',
    shortDescription: '50% off all drinks + BOGO appetizers',
    price: '50% OFF',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    time: '4:00 PM - 8:00 PM',
    highlights: ['50% Off Drinks', 'BOGO Appetizers', 'Live Sports', 'Daily Specials'],
    isFeatured: true,
  },
  {
    id: 'hh-2',
    title: 'Sunset Happy Hour',
    slug: 'sunset-happy-hour',
    venue: {
      id: 'v10',
      name: 'Trader Vic\'s',
      slug: 'trader-vics',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=500&fit=crop',
      area: 'Seef',
      category: 'bar',
    },
    type: 'happy-hour',
    description: 'Watch the sunset while enjoying our famous Mai Tais at half price! All cocktails 50% off from 5 PM to 7 PM daily.',
    shortDescription: 'Half price Mai Tais & cocktails 5-7 PM',
    price: '50% OFF',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    time: '5:00 PM - 7:00 PM',
    highlights: ['Half Price Cocktails', 'Sunset Views', 'Polynesian Vibes', 'Tiki Bar'],
  },
  {
    id: 'hh-3',
    title: 'Afterwork Mixer',
    slug: 'afterwork-mixer',
    venue: {
      id: 'v11',
      name: 'CUT by Wolfgang Puck',
      slug: 'cut-wolfgang-puck',
      logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=500&fit=crop',
      area: 'Bahrain Bay',
      category: 'restaurant',
    },
    type: 'happy-hour',
    description: 'Unwind at CUT\'s bar with premium wines by the glass at 40% off and complimentary bar bites from 6 PM to 8 PM, Monday to Thursday.',
    shortDescription: '40% off wines + free bar bites',
    price: '40% OFF',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    time: '6:00 PM - 8:00 PM',
    highlights: ['Premium Wines', 'Free Bar Bites', 'Elegant Setting', 'Business Casual'],
    isNew: true,
  },
  {
    id: 'hh-4',
    title: 'Triple Threat Thursday',
    slug: 'triple-threat-thursday',
    venue: {
      id: 'v12',
      name: 'Fusions by Tala',
      slug: 'fusions-by-tala',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&h=500&fit=crop',
      area: 'Juffair',
      category: 'bar',
    },
    type: 'happy-hour',
    description: 'Every Thursday, get 3 drinks for the price of 2! Valid on house beverages from 6 PM to 9 PM. Perfect way to kickstart your weekend.',
    shortDescription: 'Buy 2 Get 1 Free on all drinks',
    price: 'B2G1 Free',
    days: ['Thursday'],
    time: '6:00 PM - 9:00 PM',
    highlights: ['Buy 2 Get 1 Free', 'DJ Music', 'Dance Floor', 'Weekend Starter'],
  },

  // Special Deals (4)
  {
    id: 'sp-1',
    title: 'Ramadan Iftar Buffet',
    slug: 'ramadan-iftar-buffet',
    venue: {
      id: 'v13',
      name: 'Ritz-Carlton Bahrain',
      slug: 'ritz-carlton-bahrain',
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=500&fit=crop',
      area: 'Seef',
      category: 'restaurant',
    },
    type: 'special',
    description: 'Experience a magnificent Iftar spread featuring traditional Arabic cuisine, live cooking stations, and a stunning seaside setting. Early bird discount available!',
    shortDescription: 'Premium Iftar buffet with early bird pricing',
    price: 'BD 25',
    originalPrice: 'BD 35',
    discount: '29% OFF',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    time: 'Sunset - 10:00 PM',
    validUntil: 'During Ramadan',
    terms: ['Early bird rate ends 5 days before Ramadan', 'Reservation required'],
    highlights: ['Arabic Cuisine', 'Live Cooking', 'Sea Views', 'Early Bird Deal'],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'sp-2',
    title: 'Birthday Month Free Meal',
    slug: 'birthday-month-free-meal',
    venue: {
      id: 'v14',
      name: 'TGI Friday\'s',
      slug: 'tgi-fridays',
      logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&h=500&fit=crop',
      area: 'Seef',
      category: 'restaurant',
    },
    type: 'special',
    description: 'Celebrate your birthday month with a FREE main course! Just show your ID and enjoy a complimentary meal up to BD 10 value.',
    shortDescription: 'Free main course during your birthday month',
    price: 'FREE',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    time: '12:00 PM - 11:00 PM',
    terms: ['Valid ID required', 'One per customer', 'Dine-in only', 'Max value BD 10'],
    highlights: ['Free Main Course', 'Birthday Celebration', 'Any Day', 'No Reservation Needed'],
  },
  {
    id: 'sp-3',
    title: 'Couples Date Night Package',
    slug: 'couples-date-night',
    venue: {
      id: 'v15',
      name: 'La Vinoteca',
      slug: 'la-vinoteca',
      logo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
      area: 'Adliya',
      category: 'restaurant',
    },
    type: 'special',
    description: 'A romantic 4-course dinner for two with a bottle of house wine. Available every Thursday, Friday, and Saturday. Perfect for date night!',
    shortDescription: '4-course dinner for 2 + wine bottle',
    price: 'BD 55',
    originalPrice: 'BD 80',
    discount: '31% OFF',
    days: ['Thursday', 'Friday', 'Saturday'],
    time: '7:00 PM - 11:00 PM',
    validUntil: 'February 28, 2025',
    highlights: ['4-Course Dinner', 'Bottle of Wine', 'Romantic Setting', 'Perfect for Couples'],
    isEndingSoon: true,
  },
  {
    id: 'sp-4',
    title: 'Summer Pool Membership',
    slug: 'summer-pool-membership',
    venue: {
      id: 'v16',
      name: 'Diplomat Radisson Blu',
      slug: 'diplomat-radisson-blu',
      logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&h=100&fit=crop',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop',
      area: 'Manama',
      category: 'beach-club',
    },
    type: 'special',
    description: 'Beat the heat with our Summer Pool Membership! Unlimited pool access for the whole family including gym, sauna, and 20% off F&B.',
    shortDescription: 'Family pool membership + gym + 20% F&B discount',
    price: 'BD 199/month',
    originalPrice: 'BD 299/month',
    discount: '33% OFF',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    time: '6:00 AM - 10:00 PM',
    validUntil: 'September 30, 2025',
    terms: ['Family of 4', 'Kids under 2 free', 'Monthly commitment', 'Cancellation with 30 days notice'],
    highlights: ['Unlimited Pool', 'Gym Access', 'Sauna', '20% F&B Discount'],
  },
];

function OffersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
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
    if (offerId) {
      const offer = sampleOffers.find((o) => o.id === offerId);
      if (offer) {
        setSelectedOffer(offer);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

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
    let result = [...sampleOffers];

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
  }, [searchQuery, activeCategory, filters]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: sampleOffers.length,
      'ladies-night': sampleOffers.filter((o) => o.type === 'ladies-night').length,
      'happy-hour': sampleOffers.filter((o) => o.type === 'happy-hour').length,
      brunch: sampleOffers.filter((o) => o.type === 'brunch').length,
      special: sampleOffers.filter((o) => o.type === 'special').length,
    };
  }, []);

  // Today's offers
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayOffers = sampleOffers.filter((o) =>
    o.days.some((d) => d.toLowerCase() === todayName.toLowerCase())
  );
  const weekendOffers = sampleOffers.filter((o) =>
    o.days.some((d) => ['Friday', 'Saturday'].includes(d))
  );
  const newOffers = sampleOffers.filter((o) => o.isNew);

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
              <span className="text-yellow-400 font-medium text-sm">Exclusive Deals</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Best Offers in{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover ladies nights, brunches, happy hours, and special deals at the best venues
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
                placeholder="Search offers, venues, or deals..."
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

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
        <p className="text-gray-400">Loading offers...</p>
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
