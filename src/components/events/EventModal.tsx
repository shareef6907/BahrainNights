'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink, Tag, Calendar, Clock, Ticket } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

export interface EventData {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  price_currency: string;
  image_url: string | null;
  cover_url?: string | null;
  venue_name: string | null;
  location: string | null;
  category: string | null;
  start_date: string | null;
  start_time: string | null;
  end_date?: string | null;
  end_time?: string | null;
  affiliate_url: string;
}

interface EventModalProps {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Category styling configuration
const categoryStyles: Record<string, {
  icon: string;
  color: string;
  gradient: string;
  borderColor: string;
  buttonGradient: string;
  labels: { en: string; ar: string };
}> = {
  'concerts': {
    icon: '🎤',
    color: 'text-purple-400',
    gradient: 'from-purple-500/90 to-pink-500/90',
    borderColor: 'border-purple-500/30',
    buttonGradient: 'from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400',
    labels: { en: 'Concert', ar: 'حفلة موسيقية' },
  },
  'comedy': {
    icon: '😂',
    color: 'text-yellow-400',
    gradient: 'from-yellow-500/90 to-orange-500/90',
    borderColor: 'border-yellow-500/30',
    buttonGradient: 'from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400',
    labels: { en: 'Comedy', ar: 'كوميديا' },
  },
  'nightlife': {
    icon: '🎉',
    color: 'text-pink-400',
    gradient: 'from-pink-500/90 to-rose-500/90',
    borderColor: 'border-pink-500/30',
    buttonGradient: 'from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400',
    labels: { en: 'Nightlife', ar: 'الحياة الليلية' },
  },
  'sports': {
    icon: '⚽',
    color: 'text-green-400',
    gradient: 'from-green-500/90 to-emerald-500/90',
    borderColor: 'border-green-500/30',
    buttonGradient: 'from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400',
    labels: { en: 'Sports', ar: 'رياضة' },
  },
  'cultural': {
    icon: '🎭',
    color: 'text-amber-400',
    gradient: 'from-amber-500/90 to-red-500/90',
    borderColor: 'border-amber-500/30',
    buttonGradient: 'from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400',
    labels: { en: 'Theatre & Arts', ar: 'المسرح والفنون' },
  },
  'family': {
    icon: '👨‍👩‍👧‍👦',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/90 to-blue-500/90',
    borderColor: 'border-cyan-500/30',
    buttonGradient: 'from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400',
    labels: { en: 'Family', ar: 'عائلي' },
  },
  'events': {
    icon: '🎪',
    color: 'text-teal-400',
    gradient: 'from-teal-500/90 to-emerald-500/90',
    borderColor: 'border-teal-500/30',
    buttonGradient: 'from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400',
    labels: { en: 'Events', ar: 'فعاليات' },
  },
};

const defaultStyle = {
  icon: '🎫',
  color: 'text-teal-400',
  gradient: 'from-teal-500/90 to-emerald-500/90',
  borderColor: 'border-teal-500/30',
  buttonGradient: 'from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400',
  labels: { en: 'Event', ar: 'فعالية' },
};

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  const { language } = useTranslation();

  // Lock body scroll when modal is open
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

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!event) return null;

  const getCategoryStyle = (cat: string | null) => {
    if (!cat) return defaultStyle;
    return categoryStyles[cat.toLowerCase()] || defaultStyle;
  };

  const style = getCategoryStyle(event.category);

  const getCategoryLabel = () => {
    return language === 'ar' ? style.labels.ar : style.labels.en;
  };

  // Format date display
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(language === 'ar' ? 'ar-BH' : 'en-BH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Format time display
  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return null;
    try {
      // Handle various time formats
      if (timeStr.includes(':')) {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
      }
      return timeStr;
    } catch {
      return timeStr;
    }
  };

  // Use cover_url if available, fallback to image_url
  const coverImage = event.cover_url || event.image_url ||
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=600&fit=crop';

  // Use image_url for thumbnail
  const thumbnailImage = event.image_url ||
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[95] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 pt-10 pb-20">
              <motion.div
                className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
                data-testid="event-modal"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Cover Image */}
                <div className="relative h-[250px] md:h-[300px]">
                  <Image
                    src={coverImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Category Badge on Cover */}
                  {event.category && (
                    <div className={`absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${style.gradient} backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2`}>
                      <span>{style.icon}</span>
                      <span>{getCategoryLabel()}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative -mt-24 px-6 pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail Image */}
                    <div className="relative w-[140px] md:w-[180px] aspect-square rounded-xl overflow-hidden shadow-2xl flex-shrink-0 mx-auto md:mx-0 border-4 border-slate-900">
                      <Image
                        src={thumbnailImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="180px"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-16">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center md:text-left">
                        {event.title}
                      </h2>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        {/* Date Badge */}
                        {event.start_date && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-white/10 border border-white/20 rounded-lg">
                            <Calendar className={`w-4 h-4 ${style.color}`} />
                            <span className="text-white text-sm">
                              {formatDate(event.start_date)}
                            </span>
                          </div>
                        )}

                        {/* Time Badge */}
                        {event.start_time && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-white/10 border border-white/20 rounded-lg">
                            <Clock className={`w-4 h-4 ${style.color}`} />
                            <span className="text-white text-sm">
                              {formatTime(event.start_time)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price and Location Row */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        {/* Price Badge */}
                        {event.price !== null && (
                          <div className={`flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${style.gradient.replace('/90', '/20')} border ${style.borderColor} rounded-lg`}>
                            <Ticket className={`w-4 h-4 ${style.color}`} />
                            <span className={`${style.color} font-bold`}>
                              {event.price === 0
                                ? (language === 'ar' ? 'مجاني' : 'Free')
                                : `${event.price_currency} ${event.price}`
                              }
                            </span>
                          </div>
                        )}

                        {/* Location */}
                        {(event.venue_name || event.location) && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <MapPin className={`w-4 h-4 ${style.color}`} />
                            <span>{event.venue_name || event.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Category Tag */}
                      {event.category && (
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          <span className={`flex items-center gap-1 px-3 py-1 bg-white/10 border ${style.borderColor} rounded-full text-sm text-gray-300`}>
                            <Tag className="w-3 h-3" />
                            {getCategoryLabel()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {event.description && (
                    <div className="mt-6 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {language === 'ar' ? 'عن الفعالية' : 'About This Event'}
                      </h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {event.description}
                      </p>
                    </div>
                  )}

                  {/* Date & Time Details */}
                  {(event.start_date || event.start_time) && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {language === 'ar' ? 'الموعد' : 'When'}
                      </h3>
                      <div className="flex flex-col gap-2 text-gray-300">
                        {event.start_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-5 h-5 ${style.color}`} />
                            <span>{formatDate(event.start_date)}</span>
                            {event.end_date && event.end_date !== event.start_date && (
                              <span> - {formatDate(event.end_date)}</span>
                            )}
                          </div>
                        )}
                        {event.start_time && (
                          <div className="flex items-center gap-2">
                            <Clock className={`w-5 h-5 ${style.color}`} />
                            <span>{formatTime(event.start_time)}</span>
                            {event.end_time && (
                              <span> - {formatTime(event.end_time)}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Venue/Location Details */}
                  {event.venue_name && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {language === 'ar' ? 'الموقع' : 'Location'}
                      </h3>
                      <div className="flex items-start gap-2 text-gray-300">
                        <MapPin className={`w-5 h-5 ${style.color} mt-0.5 flex-shrink-0`} />
                        <div>
                          <p className="font-medium">{event.venue_name}</p>
                          {event.location && event.location !== event.venue_name && (
                            <p className="text-sm text-gray-400">{event.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Now Section */}
                  <div className="mt-6">
                    <a
                      href={event.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r ${style.buttonGradient} text-white font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:scale-[1.02]`}
                    >
                      <Ticket className="w-5 h-5" />
                      <span>{language === 'ar' ? 'احجز التذاكر' : 'Get Tickets'}</span>
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-center text-gray-400 text-sm mt-2">
                      {language === 'ar'
                        ? 'سيتم توجيهك إلى Platinumlist لإتمام الحجز'
                        : 'You will be redirected to Platinumlist to complete your booking'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
