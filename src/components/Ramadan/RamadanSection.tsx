'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Utensils, Star, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { useRamadan } from '@/contexts/RamadanContext';
import IftarWidget from './IftarWidget';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Ramadan quick links data
const ramadanLinks = [
  {
    title: 'Iftar Spots',
    description: 'Best restaurants for breaking fast',
    icon: Utensils,
    href: '/places?tag=iftar',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Ghabga Venues',
    description: 'Traditional evening gatherings',
    icon: Moon,
    href: '/places?tag=ghabga',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'Suhoor Places',
    description: 'Late night dining options',
    icon: Star,
    href: '/places?tag=suhoor',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Ramadan Events',
    description: 'Special events this month',
    icon: Calendar,
    href: '/events?tag=ramadan',
    image: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=400&h=300&fit=crop',
    gradient: 'from-green-500 to-emerald-500',
  },
];

// Featured Ramadan experiences
const featuredExperiences = [
  {
    title: 'Luxury Hotel Tents',
    venue: 'Premium iftar experiences',
    time: 'Sunset - 11 PM',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
  },
  {
    title: 'Traditional Majlis',
    venue: 'Authentic Bahraini gatherings',
    time: 'Evening',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=400&fit=crop',
  },
];

export default function RamadanSection() {
  const { isRamadan, dayOfRamadan } = useRamadan();

  if (!isRamadan) return null;

  return (
    <section className="px-4 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Moon className="w-10 h-10 text-ramadan-gold fill-ramadan-gold" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-ramadan-lantern-glow rounded-full animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ramadan in Bahrain
              </h2>
              <p className="text-ramadan-gold mt-1">Day {dayOfRamadan} of the Holy Month</p>
            </div>
          </div>
          
          {/* Compact Iftar Widget for desktop */}
          <div className="hidden md:block">
            <IftarWidget variant="header" />
          </div>
        </motion.div>

        {/* Mobile Iftar Widget */}
        <div className="md:hidden mb-6">
          <IftarWidget variant="header" />
        </div>

        {/* Quick Links Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {ramadanLinks.map((link) => (
            <motion.div key={link.title} variants={fadeIn}>
              <Link
                href={link.href}
                className="group relative block h-48 md:h-56 rounded-2xl overflow-hidden ramadan-card-gradient border border-ramadan-gold/20 hover:border-ramadan-gold/50 transition-all duration-300"
              >
                {/* Background Image */}
                <Image
                  src={link.image}
                  alt={link.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${link.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <link.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-ramadan-gold transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-ramadan-cream/70 mt-1">
                    {link.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-ramadan-gold" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Experiences Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredExperiences.map((experience) => (
            <motion.div
              key={experience.title}
              variants={fadeIn}
              className="group relative h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ramadan-primary via-ramadan-primary/50 to-transparent" />
              
              {/* Decorative border */}
              <div className="absolute inset-0 border-2 border-ramadan-gold/0 group-hover:border-ramadan-gold/30 rounded-2xl transition-colors" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-ramadan-gold text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{experience.time}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-ramadan-gold transition-colors">
                  {experience.title}
                </h3>
                <div className="flex items-center gap-2 text-ramadan-cream/70 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.venue}</span>
                </div>
              </div>

              {/* Decorative lantern glow */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-ramadan-lantern-glow rounded-full animate-pulse shadow-lg shadow-ramadan-lantern-glow/50" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="mt-8 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/ramadan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ramadan-gold to-ramadan-gold-light text-ramadan-primary font-semibold rounded-full hover:shadow-lg hover:shadow-ramadan-gold/30 transition-all duration-300 group"
          >
            <Moon className="w-5 h-5" />
            <span>Explore All Ramadan Experiences</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
