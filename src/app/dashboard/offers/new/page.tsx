'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import OfferForm from '@/components/dashboard/OfferForm';

export default function NewOfferPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/dashboard/offers"
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Offer</h1>
          <p className="text-gray-400 mt-1">
            Create a special promotion for your venue
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <OfferForm />
    </div>
  );
}
