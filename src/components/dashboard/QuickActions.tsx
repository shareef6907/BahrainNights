'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Tag, Settings, ArrowRight } from 'lucide-react';

interface QuickAction {
  label: string;
  href: string;
  icon: React.ElementType;
  variant: 'primary' | 'secondary';
  description?: string;
}

const actions: QuickAction[] = [
  {
    label: 'Create New Event',
    href: '/dashboard/events/new',
    icon: Plus,
    variant: 'primary',
    description: 'Add a new event to your venue',
  },
  {
    label: 'Add New Offer',
    href: '/dashboard/offers/new',
    icon: Tag,
    variant: 'secondary',
    description: 'Create a special promotion',
  },
  {
    label: 'Edit Venue Profile',
    href: '/dashboard/profile',
    icon: Settings,
    variant: 'secondary',
    description: 'Update your venue details',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              href={action.href}
              className={`group flex flex-col p-5 rounded-2xl border transition-all duration-200 h-full ${
                action.variant === 'primary'
                  ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/30 hover:border-yellow-400/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    action.variant === 'primary'
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-white/10 text-gray-400 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    action.variant === 'primary'
                      ? 'text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <h3
                className={`font-semibold ${
                  action.variant === 'primary' ? 'text-white' : 'text-gray-200'
                }`}
              >
                {action.label}
              </h3>
              {action.description && (
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
