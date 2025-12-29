'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Shirt, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import Link from 'next/link';

interface PriceTier {
  tier: string;
  price: string;
}

interface EventDetailsProps {
  description: string;
  date: string;
  dayOfWeek: string;
  time: string;
  duration?: string;
  priceTiers: PriceTier[];
  ageRestriction?: string;
  dressCode?: string;
  tags: string[];
}

export default function EventDetails({
  description,
  date,
  dayOfWeek,
  time,
  duration,
  priceTiers,
  ageRestriction,
  dressCode,
  tags
}: EventDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 400;
  const shouldTruncate = description.length > maxLength;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="space-y-8">
      {/* About This Event */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {shouldTruncate && !isExpanded
            ? `${description.slice(0, maxLength)}...`
            : description}
        </div>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-4 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            {isExpanded ? (
              <>
                Read Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </motion.div>

      {/* Event Details */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Event Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date & Time */}
          <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
            <div className="p-3 bg-yellow-400/10 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Date & Time</p>
              <p className="text-white font-medium">{dayOfWeek}, {date}</p>
              <p className="text-gray-300">{time}</p>
            </div>
          </div>

          {/* Duration */}
          {duration && (
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="p-3 bg-yellow-400/10 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-white font-medium">{duration}</p>
              </div>
            </div>
          )}

          {/* Age Restriction */}
          {ageRestriction && (
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="p-3 bg-yellow-400/10 rounded-lg">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Age Restriction</p>
                <p className="text-white font-medium">{ageRestriction}</p>
              </div>
            </div>
          )}

          {/* Dress Code */}
          {dressCode && (
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="p-3 bg-yellow-400/10 rounded-lg">
                <Shirt className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Dress Code</p>
                <p className="text-white font-medium">{dressCode}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Tag className="w-5 h-5 text-gray-400" />
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/events?tag=${encodeURIComponent(tag)}`}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-yellow-400/50 hover:text-white transition-all"
          >
            {tag}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
