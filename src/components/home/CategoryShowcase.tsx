'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Utensils, 
  Music, 
  Calendar, 
  Film, 
  Users, 
  Trophy,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  count: number;
  color: string;
  glowColor: string;
  href: string;
  index: number;
}

function CategoryCard({ icon, name, description, count, color, glowColor, href, index }: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {/* Glow effect - appears on hover */}
      <motion.div 
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${glowColor} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        style={{ transform: 'translateZ(-10px)' }}
      />
      
      <Link href={href} className="block relative">
        <motion.div 
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 p-6 h-full group-hover:border-transparent transition-all duration-500`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Background gradient that intensifies on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Animated shine effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon with animated background */}
            <div className="relative mb-4">
              <motion.div 
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {icon}
              </motion.div>
              
              {/* Floating particles on hover */}
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${color}`}
                      initial={{ 
                        x: 28, 
                        y: 28, 
                        opacity: 0,
                        scale: 0 
                      }}
                      animate={{ 
                        x: 28 + (Math.random() - 0.5) * 60,
                        y: 28 + (Math.random() - 0.5) * 60,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
              {description}
            </p>

            {/* Count & Arrow */}
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {count.toLocaleString()} listings
              </span>
              
              <motion.div
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                whileHover={{ scale: 1.1 }}
                animate={isHovered ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>

          {/* Corner accent */}
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${color} opacity-5 rounded-bl-full`} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

interface CategoryShowcaseProps {
  stats: {
    events: number;
    venues: number;
    cinema: number;
    attractions: number;
  };
}

export default function CategoryShowcase({ stats }: CategoryShowcaseProps) {
  const categories = [
    {
      icon: <Utensils className="w-7 h-7" />,
      name: 'Dining',
      description: 'Restaurants, cafés, and culinary experiences',
      count: stats.venues || 847,
      color: 'from-orange-500 to-red-500',
      glowColor: 'from-orange-500/50 to-red-500/50',
      href: '/places?category=restaurant',
    },
    {
      icon: <Music className="w-7 h-7" />,
      name: 'Nightlife',
      description: 'Clubs, lounges, and bars',
      count: Math.round((stats.venues || 847) * 0.3),
      color: 'from-purple-500 to-pink-500',
      glowColor: 'from-purple-500/50 to-pink-500/50',
      href: '/places?category=nightclub',
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      name: 'Events',
      description: 'Concerts, exhibitions, and happenings',
      count: stats.events || 1247,
      color: 'from-yellow-500 to-amber-500',
      glowColor: 'from-yellow-500/50 to-amber-500/50',
      href: '/events',
    },
    {
      icon: <Film className="w-7 h-7" />,
      name: 'Cinema',
      description: 'Now showing and coming soon',
      count: stats.cinema || 48,
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'from-blue-500/50 to-cyan-500/50',
      href: '/cinema',
    },
    {
      icon: <Users className="w-7 h-7" />,
      name: 'Family',
      description: 'Kid-friendly activities and outings',
      count: Math.round((stats.attractions || 50) * 0.6),
      color: 'from-teal-500 to-green-500',
      glowColor: 'from-teal-500/50 to-green-500/50',
      href: '/attractions?category=family',
    },
    {
      icon: <Trophy className="w-7 h-7" />,
      name: 'Sports',
      description: 'Matches, games, and activities',
      count: Math.round((stats.events || 1247) * 0.15),
      color: 'from-emerald-500 to-lime-500',
      glowColor: 'from-emerald-500/50 to-lime-500/50',
      href: '/events?category=sports',
    },
  ];

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">Quick Access</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Explore by Category
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the best of Bahrain across dining, nightlife, events, and more
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.name}
              {...category}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/explore"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 rounded-full text-white font-medium transition-all duration-300"
          >
            <span>Explore Everything</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
