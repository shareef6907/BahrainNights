'use client';

import { motion } from 'framer-motion';
import VenueProfileForm from '@/components/dashboard/VenueProfileForm';

export default function VenueProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Venue Profile</h1>
        <p className="text-gray-400 mt-1">
          Update your venue information and settings
        </p>
      </motion.div>

      {/* Form */}
      <VenueProfileForm />
    </div>
  );
}
