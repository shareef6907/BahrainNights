'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Eye,
  MoreVertical,
  Edit,
  Copy,
  Power,
  Trash2,
  ChevronRight,
  Calendar,
} from 'lucide-react';

export interface Offer {
  id: string;
  title: string;
  type: string;
  days: string[];
  time: string;
  validUntil?: string;
  status: 'active' | 'expired' | 'draft';
  views: number;
  image?: string;
}

interface OffersTableProps {
  offers: Offer[];
  compact?: boolean;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onToggleActive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusStyles = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  expired: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const statusLabels = {
  active: 'Active',
  expired: 'Expired',
  draft: 'Draft',
};

const dayAbbreviations: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

export default function OffersTable({
  offers,
  compact = false,
  onEdit,
  onDuplicate,
  onToggleActive,
  onDelete,
}: OffersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const formatDays = (days: string[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 0) return 'No days set';
    return days.map((d) => dayAbbreviations[d] || d).join(', ');
  };

  if (offers.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
        <Tag className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No offers yet</h3>
        <p className="text-gray-400 mb-4">Create your first offer to attract more customers!</p>
        <Link
          href="/dashboard/offers/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
        >
          Create Offer
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Offer
              </th>
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Type
              </th>
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Schedule
              </th>
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Status
              </th>
              {!compact && (
                <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                  Views
                </th>
              )}
              <th className="text-right text-sm font-medium text-gray-400 px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {offer.image && (
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <span className="font-medium text-white">{offer.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-300">{offer.type}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300 text-sm">
                    {formatDays(offer.days)}
                  </div>
                  <div className="text-gray-500 text-sm">{offer.time}</div>
                  {offer.validUntil && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      Until {offer.validUntil}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${
                      statusStyles[offer.status]
                    }`}
                  >
                    {statusLabels[offer.status]}
                  </span>
                </td>
                {!compact && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Eye className="w-4 h-4" />
                      <span>{offer.views}</span>
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === offer.id ? null : offer.id)
                      }
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {openMenuId === offer.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.1 }}
                          className="absolute right-0 mt-2 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              onEdit?.(offer.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDuplicate?.(offer.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => {
                              onToggleActive?.(offer.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Power className="w-4 h-4" />
                            {offer.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => {
                              onDelete?.(offer.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-white/5">
        {offers.map((offer) => (
          <div key={offer.id} className="p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-start gap-3">
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${
                      statusStyles[offer.status]
                    }`}
                  >
                    {statusLabels[offer.status]}
                  </span>
                </div>
                <h3 className="font-medium text-white truncate">{offer.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{offer.type}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{formatDays(offer.days)}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {offer.views} views
                  </span>
                </div>
              </div>
              <Link
                href={`/dashboard/offers/${offer.id}/edit`}
                className="p-2 text-gray-400 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link (for compact mode) */}
      {compact && (
        <div className="border-t border-white/10 p-4">
          <Link
            href="/dashboard/offers"
            className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            View All Offers
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
