'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Eye,
  MoreVertical,
  Edit,
  Copy,
  EyeOff,
  Trash2,
  ChevronRight,
} from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  status: 'published' | 'draft' | 'past';
  views: number;
  image?: string;
}

interface EventsTableProps {
  events: Event[];
  compact?: boolean;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onTogglePublish?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusStyles = {
  published: 'bg-green-500/20 text-green-400 border-green-500/30',
  draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  past: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const statusLabels = {
  published: 'Published',
  draft: 'Draft',
  past: 'Past',
};

export default function EventsTable({
  events,
  compact = false,
  onEdit,
  onDuplicate,
  onTogglePublish,
  onDelete,
}: EventsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (events.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No events yet</h3>
        <p className="text-gray-400 mb-4">Create your first event to get started!</p>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
        >
          Create Event
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
                Event
              </th>
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Date & Time
              </th>
              {!compact && (
                <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                  Category
                </th>
              )}
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Status
              </th>
              <th className="text-left text-sm font-medium text-gray-400 px-6 py-4">
                Views
              </th>
              <th className="text-right text-sm font-medium text-gray-400 px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <span className="font-medium text-white">{event.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">{event.date}</div>
                  <div className="text-sm text-gray-500">{event.time}</div>
                </td>
                {!compact && (
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{event.category}</span>
                  </td>
                )}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${
                      statusStyles[event.status]
                    }`}
                  >
                    {statusLabels[event.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-gray-300">
                    <Eye className="w-4 h-4" />
                    <span>{event.views}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === event.id ? null : event.id)
                      }
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {openMenuId === event.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.1 }}
                          className="absolute right-0 mt-2 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              onEdit?.(event.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDuplicate?.(event.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => {
                              onTogglePublish?.(event.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <EyeOff className="w-4 h-4" />
                            {event.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => {
                              onDelete?.(event.id);
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
        {events.map((event) => (
          <div key={event.id} className="p-4 hover:bg-white/5 transition-colors">
            <div className="flex items-start gap-3">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${
                      statusStyles[event.status]
                    }`}
                  >
                    {statusLabels[event.status]}
                  </span>
                </div>
                <h3 className="font-medium text-white truncate">{event.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {event.date} • {event.time}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{event.category}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {event.views} views
                  </span>
                </div>
              </div>
              <Link
                href={`/dashboard/events/${event.id}/edit`}
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
            href="/dashboard/events"
            className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            View All Events
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
