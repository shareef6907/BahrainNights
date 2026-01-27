'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import { X, Calendar, MapPin, Download, ChevronRight } from 'lucide-react';
import { CalendarEvent } from './CalendarDay';
import { EventCategory, categoryConfigs } from './CalendarFilters';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  events: CalendarEvent[];
}

export default function DayDetailModal({
  isOpen,
  onClose,
  date,
  events,
}: DayDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getCategoryColor = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.color || '#6B7280';
  };

  const getCategoryLabel = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.label || category;
  };

  const getCategoryEmoji = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.emoji || '📅';
  };

  const formatDate = (d: Date): string => {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const downloadICS = () => {
    if (!date || events.length === 0) return;

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BahrainNights//Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const dateStr = eventDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 8);

      icsContent += `BEGIN:VEVENT
DTSTART:${dateStr}T${event.time.replace(':', '').replace(' ', '').replace('AM', '').replace('PM', '')}00
SUMMARY:${event.title}
LOCATION:${event.venue}, ${event.area}
DESCRIPTION:Event at ${event.venue}
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bahrainnights-${date.toISOString().split('T')[0]}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!date) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal - Side panel on desktop, bottom sheet on mobile */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-slate-900 border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">{formatDate(date)}</h2>
                <p className="text-gray-400 text-sm">
                  {events.length} event{events.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Calendar className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No events on this day
                  </h3>
                  <p className="text-gray-400 max-w-xs">
                    Browse other dates to discover exciting events in Bahrain!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/events/${event.slug}`}
                        className="block p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          {/* Time */}
                          <div className="flex-shrink-0 text-center">
                            <div className="text-lg font-bold text-white">
                              {event.time.split(' ')[0]}
                            </div>
                            <div className="text-xs text-gray-400">
                              {event.time.split(' ')[1]}
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="flex-1 min-w-0">
                            {/* Category Badge */}
                            <div
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                              style={{
                                backgroundColor: `${getCategoryColor(event.category)}20`,
                                color: getCategoryColor(event.category),
                              }}
                            >
                              <span>{getCategoryEmoji(event.category)}</span>
                              <span>{getCategoryLabel(event.category)}</span>
                            </div>

                            {/* Title */}
                            <h4 className="text-white font-semibold group-hover:text-yellow-400 transition-colors mb-1">
                              {event.title}
                            </h4>

                            {/* Venue */}
                            <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="truncate">
                                {event.venue} • {event.area}
                              </span>
                            </div>

                            {/* Price */}
                            {event.price && (
                              <div className="mt-2 text-yellow-400 font-medium text-sm">
                                {event.price}
                              </div>
                            )}
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {events.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={downloadICS}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-xl font-medium transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Add to My Calendar
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
