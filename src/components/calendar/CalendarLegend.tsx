'use client';

import { categoryConfigs } from './CalendarFilters';
import { CalendarEvent } from './CalendarDay';
import Link from 'next/link';
import { ExternalLink, Calendar, Star } from 'lucide-react';

interface CalendarLegendProps {
  featuredEvents: CalendarEvent[];
}

export default function CalendarLegend({ featuredEvents }: CalendarLegendProps) {
  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          Category Legend
        </h3>
        <div className="space-y-2">
          {categoryConfigs.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-gray-300">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Highlights */}
      {featuredEvents.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            Upcoming Highlights
          </h3>
          <div className="space-y-3">
            {featuredEvents.slice(0, 3).map((event) => {
              const cat = categoryConfigs.find((c) => c.id === event.category);
              const eventDate = new Date(event.date);

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: cat?.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors truncate">
                        {event.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {eventDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        • {event.venue}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Subscribe Section */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-yellow-400" />
          Subscribe to Calendar
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Add all events to your personal calendar
        </p>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
            <ExternalLink className="w-4 h-4" />
            Add to Google Calendar
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
            <ExternalLink className="w-4 h-4" />
            Add to Apple Calendar
          </button>
        </div>

        <p className="text-gray-500 text-xs mt-3 text-center">
          iCal feed URL available
        </p>
      </div>
    </div>
  );
}
