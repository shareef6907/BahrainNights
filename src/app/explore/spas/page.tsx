'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ExternalLink, Dumbbell, Heart, Users } from 'lucide-react';
import Link from 'next/link';

// Data verified on Google Maps - January 2026

const gyms = [
  {
    name: 'Fitness First - City Centre Bahrain',
    area: 'City Centre Bahrain, Seef',
    rating: 4.7,
    reviews: 470,
    mapsLink: 'https://www.google.com/maps/search/Fitness+First+City+Centre+Bahrain',
  },
  {
    name: 'Fitness First - Oasis Juffair Mall',
    area: 'Oasis Mall, Juffair',
    rating: 4.5,
    reviews: 363,
    mapsLink: 'https://www.google.com/maps/search/Fitness+First+Oasis+Juffair',
  },
  {
    name: 'Fitness First - East Riffa',
    area: 'Isa Town',
    rating: 4.0,
    reviews: 397,
    mapsLink: 'https://www.google.com/maps/search/Fitness+First+Isa+Town+Bahrain',
  },
  {
    name: 'UFC GYM Bahrain',
    area: 'Juffair',
    rating: 4.5,
    reviews: 268,
    mapsLink: 'https://www.google.com/maps/search/UFC+GYM+Bahrain',
  },
  {
    name: 'Al Nakheel Premium Fitness',
    area: 'Multiple Locations',
    rating: 4.2,
    reviews: 134,
    mapsLink: 'https://www.google.com/maps/search/Nakheel+Fitness+Bahrain',
  },
  {
    name: 'Al Nakheel Premium Fitness - Bahrain Bay',
    area: 'Bahrain Bay',
    rating: 3.8,
    reviews: 21,
    mapsLink: 'https://www.google.com/maps/search/Al+Nakheel+Premium+Fitness+Bahrain+Bay',
  },
  {
    name: 'Iron Park Gym',
    area: 'Manama',
    rating: 4.6,
    reviews: 235,
    mapsLink: 'https://www.google.com/maps/search/Iron+Park+Gym+Bahrain',
  },
  {
    name: 'Train Fitness',
    area: 'Manama',
    rating: 4.9,
    reviews: 188,
    mapsLink: 'https://www.google.com/maps/search/Train+Fitness+Bahrain',
  },
  {
    name: 'Fitness Hub Gym',
    area: 'Manama',
    rating: 4.7,
    reviews: 267,
    mapsLink: 'https://www.google.com/maps/search/Fitness+Hub+gym+Bahrain',
  },
  {
    name: 'Body Force',
    area: 'Adliya',
    rating: 4.9,
    reviews: 82,
    mapsLink: 'https://www.google.com/maps/search/Body+Force+Bahrain',
  },
];

const crossfitStudios = [
  {
    name: 'The Forge',
    area: 'Jidhafs',
    rating: 4.9,
    reviews: 230,
    type: 'CrossFit & Functional Training',
    mapsLink: 'https://www.google.com/maps/search/The+Forge+Bahrain',
  },
  {
    name: 'CrossFit Muharraq',
    area: 'Muharraq',
    rating: 4.6,
    reviews: 59,
    type: 'CrossFit',
    mapsLink: 'https://www.google.com/maps/search/CrossFit+Muharraq',
  },
];

const pilatesYoga = [
  {
    name: 'Breathe Pilates Studio',
    area: 'Saar',
    rating: 5.0,
    reviews: 67,
    mapsLink: 'https://www.google.com/maps/search/Breathe+Pilates+studio+Saar+Bahrain',
  },
  {
    name: 'Formé Pilates Studio',
    area: 'Seef',
    rating: 4.9,
    reviews: 31,
    mapsLink: 'https://www.google.com/maps/search/Forme+Pilates+Studio+Bahrain',
  },
  {
    name: 'Core Pilates Studio',
    area: 'Budaiya',
    rating: 4.9,
    reviews: 39,
    mapsLink: 'https://www.google.com/maps/search/Core+Pilates+Studio+Bahrain',
  },
  {
    name: 'Equilibrium Pilates & Fitness',
    area: 'Saar',
    rating: 4.7,
    reviews: 29,
    mapsLink: 'https://www.google.com/maps/search/Equilibrium+Pilates+Saar+Bahrain',
  },
  {
    name: 'Erah Pilates Wellness',
    area: 'Riffa',
    rating: 4.3,
    reviews: 29,
    mapsLink: 'https://www.google.com/maps/search/Erah+Pilates+Wellness+Bahrain',
  },
];

const ladiesGyms = [
  {
    name: 'Al Nakheel Premium Fitness - Ladies',
    area: 'Multiple Locations',
    rating: 4.3,
    reviews: 169,
    mapsLink: 'https://www.google.com/maps/search/النخيل+للياقة+فرع+السيدات+Bahrain',
  },
  {
    name: '88 Fitness Club Ladies',
    area: 'Muharraq',
    rating: 4.8,
    reviews: 46,
    mapsLink: 'https://www.google.com/maps/search/88+fitness+club+ladies+Bahrain',
  },
  {
    name: 'Ladies Zone Club',
    area: 'Riffa',
    rating: 4.4,
    reviews: 35,
    mapsLink: 'https://www.google.com/maps/search/Ladies+Zone+Club+Bahrain',
  },
];

function VenueCard({ venue, icon }: { venue: typeof gyms[0]; icon: React.ReactNode }) {
  return (
    <a
      href={venue.mapsLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{venue.area}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-400 text-sm">★ {venue.rating}</span>
            <span className="text-gray-500 text-xs">({venue.reviews} reviews)</span>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
      </div>
    </a>
  );
}

export default function SpasPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <span className="text-2xl">💆‍♀️</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Gyms & Fitness
                </h1>
                <p className="text-gray-400">
                  Find the best gyms, fitness centers, and studios in Bahrain
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        {/* Gyms & Fitness Centers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Dumbbell className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Gyms & Fitness Centers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gyms.map((gym) => (
              <VenueCard key={gym.name} venue={gym} icon={<Dumbbell className="w-5 h-5 text-purple-400" />} />
            ))}
          </div>
        </motion.div>

        {/* CrossFit & Functional Training */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🏋️</span>
            <h2 className="text-2xl font-bold text-white">CrossFit & Functional Training</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crossfitStudios.map((studio) => (
              <VenueCard key={studio.name} venue={studio} icon={<span className="text-lg">🏋️</span>} />
            ))}
          </div>
        </motion.div>

        {/* Pilates & Yoga Studios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🧘‍♀️</span>
            <h2 className="text-2xl font-bold text-white">Pilates & Yoga Studios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pilatesYoga.map((studio) => (
              <VenueCard key={studio.name} venue={studio} icon={<span className="text-lg">🧘‍♀️</span>} />
            ))}
          </div>
        </motion.div>

        {/* Ladies-Only Gyms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold text-white">Ladies-Only Gyms</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ladiesGyms.map((gym) => (
              <VenueCard key={gym.name} venue={gym} icon={<Heart className="w-5 h-5 text-pink-400" />} />
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-4 bg-white/5 border border-white/10 rounded-xl"
        >
          <p className="text-gray-400 text-sm text-center">
            📍 All venues verified on Google Maps. Click any card to view location and details.
            <br />
            <span className="text-gray-500">Last updated: January 2026</span>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
