'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  EyeOff,
  Eye,
} from 'lucide-react';

interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

interface OpeningHours {
  sunday: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
}

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

const DAY_LABELS: Record<string, string> = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
};

const DEFAULT_HOURS: DayHours = {
  open: '10:00',
  close: '22:00',
  isClosed: false,
};

export default function VenueHoursPage() {
  const [hours, setHours] = useState<OpeningHours>({
    sunday: { ...DEFAULT_HOURS },
    monday: { ...DEFAULT_HOURS },
    tuesday: { ...DEFAULT_HOURS },
    wednesday: { ...DEFAULT_HOURS },
    thursday: { ...DEFAULT_HOURS },
    friday: { ...DEFAULT_HOURS },
    saturday: { ...DEFAULT_HOURS },
  });
  const [hideHours, setHideHours] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadHours();
  }, []);

  async function loadHours() {
    try {
      const response = await fetch('/api/venue-portal/profile');
      if (response.ok) {
        const data = await response.json();
        const savedHours = data.venue.opening_hours;

        if (savedHours && typeof savedHours === 'object') {
          const parsedHours: OpeningHours = { ...hours };

          // Load hideHours flag
          if (savedHours.hideHours !== undefined) {
            setHideHours(savedHours.hideHours);
          }

          DAYS.forEach((day) => {
            if (savedHours[day]) {
              if (savedHours[day] === 'closed') {
                parsedHours[day] = { open: '10:00', close: '22:00', isClosed: true };
              } else if (typeof savedHours[day] === 'object') {
                parsedHours[day] = {
                  open: savedHours[day].open || '10:00',
                  close: savedHours[day].close || '22:00',
                  isClosed: false,
                };
              }
            }
          });

          setHours(parsedHours);
        }
      }
    } catch (error) {
      console.error('Failed to load hours:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDayChange = (day: keyof OpeningHours, field: keyof DayHours, value: string | boolean) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleToggleClosed = (day: keyof OpeningHours) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isClosed: !prev[day].isClosed,
      },
    }));
  };

  const handleCopyToAll = (sourceDay: keyof OpeningHours) => {
    const sourceHours = hours[sourceDay];
    const newHours = { ...hours };

    DAYS.forEach((day) => {
      newHours[day] = { ...sourceHours };
    });

    setHours(newHours);
    setMessage({ type: 'success', text: `Copied ${DAY_LABELS[sourceDay]}'s hours to all days` });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      // Convert to database format
      const dbHours: Record<string, { open: string; close: string } | 'closed' | boolean> = {
        hideHours, // Include the hide flag
      };

      DAYS.forEach((day) => {
        if (hours[day].isClosed) {
          dbHours[day] = 'closed';
        } else {
          dbHours[day] = {
            open: hours[day].open,
            close: hours[day].close,
          };
        }
      });

      const response = await fetch('/api/venue-portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opening_hours: dbHours }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Opening hours saved successfully!' });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to save hours' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Opening Hours</h1>
        <p className="text-gray-400 mt-1">Set your venue's operating hours for each day of the week.</p>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Hide Hours Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {hideHours ? (
              <EyeOff className="w-5 h-5 text-orange-400" />
            ) : (
              <Eye className="w-5 h-5 text-green-400" />
            )}
            <div>
              <p className="text-white font-medium">
                {hideHours ? 'Opening Hours Hidden' : 'Opening Hours Visible'}
              </p>
              <p className="text-gray-400 text-sm">
                {hideHours
                  ? 'Opening hours will not be displayed on your venue page'
                  : 'Opening hours will be shown on your venue page'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setHideHours(!hideHours)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              hideHours ? 'bg-orange-500' : 'bg-green-500'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                hideHours ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Hours Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Days List */}
        <div className={`divide-y divide-white/10 ${hideHours ? 'opacity-50' : ''}`}>
          {DAYS.map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 ${
                hours[day].isClosed ? 'bg-white/5' : ''
              }`}
            >
              {/* Day Name */}
              <div className="w-32 flex-shrink-0">
                <p className="text-white font-medium">{DAY_LABELS[day]}</p>
              </div>

              {/* Open/Closed Toggle */}
              <button
                type="button"
                onClick={() => handleToggleClosed(day)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  hours[day].isClosed
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-green-500/20 text-green-400'
                }`}
              >
                {hours[day].isClosed ? (
                  <>
                    <ToggleLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Closed</span>
                  </>
                ) : (
                  <>
                    <ToggleRight className="w-5 h-5" />
                    <span className="text-sm font-medium">Open</span>
                  </>
                )}
              </button>

              {/* Time Inputs */}
              {!hours[day].isClosed && (
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-400">From</label>
                    <input
                      type="time"
                      value={hours[day].open}
                      onChange={(e) => handleDayChange(day, 'open', e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                  <span className="text-gray-500">—</span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-400">To</label>
                    <input
                      type="time"
                      value={hours[day].close}
                      onChange={(e) => handleDayChange(day, 'close', e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    />
                  </div>
                </div>
              )}

              {/* Copy to All Button */}
              <button
                type="button"
                onClick={() => handleCopyToAll(day)}
                className="text-xs text-gray-500 hover:text-yellow-400 transition-colors whitespace-nowrap"
              >
                Copy to all
              </button>
            </motion.div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="p-6 bg-white/5 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>These hours will be displayed on your venue page</span>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Hours
                </>
              )}
            </button>
          </div>
        </div>
      </motion.form>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-3">Tips for Setting Hours</h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Set accurate hours to help customers plan their visit</li>
          <li>• Mark special holidays as closed when applicable</li>
          <li>• Consider peak times when setting opening hours</li>
          <li>• Keep hours updated during Ramadan or special occasions</li>
        </ul>
      </motion.div>
    </div>
  );
}
