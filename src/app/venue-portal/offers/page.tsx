'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Tag,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Edit,
  Eye,
  Sparkles,
  Wine,
  UtensilsCrossed,
  Gift,
  Utensils,
} from 'lucide-react';

interface OfferData {
  id: string;
  title: string;
  slug: string;
  status: string;
  offer_type: string;
  days_available: string[];
  start_time: string;
  end_time: string;
  valid_until?: string;
  is_ongoing: boolean;
  featured_image?: string;
}

const offerTypeLabels: Record<string, string> = {
  'ladies-night': 'Ladies Night',
  'brunch': 'Brunch',
  'happy-hour': 'Happy Hour',
  'special-deal': 'Special Deal',
  'buy1get1': 'Buy 1 Get 1 Free',
  'buffet': 'Buffet',
};

const offerTypeIcons: Record<string, React.ElementType> = {
  'ladies-night': Sparkles,
  'brunch': UtensilsCrossed,
  'happy-hour': Wine,
  'special-deal': Tag,
  'buy1get1': Gift,
  'buffet': Utensils,
};

const offerTypeColors: Record<string, string> = {
  'ladies-night': 'bg-pink-500/20 text-pink-400',
  'brunch': 'bg-orange-500/20 text-orange-400',
  'happy-hour': 'bg-yellow-500/20 text-yellow-400',
  'special-deal': 'bg-blue-500/20 text-blue-400',
  'buy1get1': 'bg-green-500/20 text-green-400',
  'buffet': 'bg-purple-500/20 text-purple-400',
};

export default function VenueOffersPage() {
  const [offers, setOffers] = useState<OfferData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'expired' | 'draft'>('all');

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const response = await fetch('/api/venue-portal/offers');
      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers || []);
      }
    } catch (error) {
      console.error('Failed to load offers:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredOffers = filter === 'all'
    ? offers
    : offers.filter(o => o.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'paused':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'expired':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDays = (days: string[]) => {
    if (days.length === 7) return 'Every Day';
    if (days.length > 3) return `${days.slice(0, 3).map(d => d.slice(0, 3)).join(', ')}...`;
    return days.map(d => d.slice(0, 3)).join(', ');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">My Offers</h1>
          <p className="text-gray-400 mt-1">Manage your venue's special offers and deals.</p>
        </div>
        <Link
          href="/venue-portal/offers/create"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Offer
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'active', 'paused', 'expired', 'draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? 'bg-yellow-400 text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 opacity-70">
                ({offers.filter(o => o.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Offers List */}
      {filteredOffers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        >
          <Tag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            {filter === 'all' ? 'No offers yet' : `No ${filter} offers`}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Create your first offer to attract more customers
          </p>
          <Link
            href="/venue-portal/offers/create"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Offer
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="divide-y divide-white/5">
            {filteredOffers.map((offer, index) => {
              const TypeIcon = offerTypeIcons[offer.offer_type] || Tag;
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 lg:p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Image */}
                    <div className="w-full lg:w-24 h-32 lg:h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                      {offer.featured_image ? (
                        <img
                          src={offer.featured_image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <TypeIcon className="w-8 h-8 text-gray-600" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(offer.status)}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold truncate">{offer.title}</h3>
                          <p className="text-gray-500 text-sm mt-1">
                            {formatDays(offer.days_available)} • {offer.start_time} - {offer.end_time}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${offerTypeColors[offer.offer_type] || 'bg-gray-500/20 text-gray-400'}`}>
                              <TypeIcon className="w-3 h-3" />
                              {offerTypeLabels[offer.offer_type] || offer.offer_type}
                            </span>
                            {offer.is_ongoing && (
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                                Ongoing
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3 lg:flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(offer.status)}`}>
                        {offer.status}
                      </span>
                      <div className="flex items-center gap-2">
                        {offer.status === 'active' && (
                          <Link
                            href={`/offers?id=${offer.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View Offer"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                        )}
                        <Link
                          href={`/venue-portal/offers/${offer.id}/edit`}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit Offer"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Offer Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <div>
              <p className="text-white text-sm font-medium">Ladies Night</p>
              <p className="text-gray-500 text-xs">Special offers for ladies</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-white text-sm font-medium">Brunch</p>
              <p className="text-gray-500 text-xs">Weekend brunch deals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wine className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-white text-sm font-medium">Happy Hour</p>
              <p className="text-gray-500 text-xs">Drink & appetizer specials</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-white text-sm font-medium">Special Deal</p>
              <p className="text-gray-500 text-xs">Limited time offers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-white text-sm font-medium">Buy 1 Get 1 Free</p>
              <p className="text-gray-500 text-xs">BOGO promotions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Utensils className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-white text-sm font-medium">Buffet</p>
              <p className="text-gray-500 text-xs">All-you-can-eat deals</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
