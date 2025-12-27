'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EventHeroProps {
  title: string;
  image: string;
  category: string;
  categoryColor: string;
  venue: string;
  venueSlug: string;
  date: string;
  time: string;
  price: string;
  onShareClick: () => void;
}

export default function EventHero({
  title,
  image,
  category,
  categoryColor,
  venue,
  venueSlug,
  date,
  time,
  price,
  onShareClick
}: EventHeroProps) {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[500px] overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0"
        style={mounted ? { y } : undefined}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />

      {/* Top Badges */}
      <motion.div
        className="absolute top-6 left-6 right-6 flex items-start justify-between z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Category Badge */}
        <span className={`px-4 py-2 ${categoryColor} text-white text-sm font-bold rounded-full shadow-lg`}>
          {category}
        </span>

        {/* Share Button */}
        <button
          onClick={onShareClick}
          className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          aria-label="Share event"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10"
        style={mounted ? { opacity } : undefined}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Venue */}
            <Link
              href={`/venues/${venueSlug}`}
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors group"
            >
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span className="font-medium group-hover:underline">{venue}</span>
            </Link>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{date}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{time}</span>
            </div>

            {/* Price */}
            <span className="px-4 py-1.5 bg-yellow-400 text-black font-bold rounded-full">
              {price}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
