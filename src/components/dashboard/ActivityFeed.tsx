'use client';

import { motion } from 'framer-motion';
import { Eye, Calendar, Tag, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'view' | 'event' | 'offer' | 'expiry';
  message: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  view: Eye,
  event: Calendar,
  offer: Tag,
  expiry: Clock,
};

const activityColors = {
  view: 'bg-blue-500/20 text-blue-400',
  event: 'bg-green-500/20 text-green-400',
  offer: 'bg-purple-500/20 text-purple-400',
  expiry: 'bg-yellow-500/20 text-yellow-400',
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            No recent activity
          </p>
        ) : (
          activities.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
