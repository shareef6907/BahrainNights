'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

interface AddToCalendarProps {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO format: 2025-01-10T20:00:00
  endDate: string;   // ISO format: 2025-01-10T23:00:00
}

export default function AddToCalendar({
  title,
  description,
  location,
  startDate,
  endDate
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format dates for different calendar services
  const formatGoogleDate = (date: string) => {
    return date.replace(/[-:]/g, '').replace('.000', '');
  };

  const formatICSDate = (date: string) => {
    return date.replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Generate Google Calendar URL
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  // Generate Outlook Calendar URL
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    title
  )}&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  // Generate ICS file content for Apple Calendar
  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BahrainNights//Event//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const calendarOptions = [
    {
      name: 'Google Calendar',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V7.5h15v12z" />
          <path fill="#4285F4" d="M12 18c-2.485 0-4.5-2.015-4.5-4.5S9.515 9 12 9s4.5 2.015 4.5 4.5S14.485 18 12 18z" />
        </svg>
      ),
      action: () => window.open(googleCalendarUrl, '_blank'),
      color: 'text-blue-400'
    },
    {
      name: 'Apple Calendar',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
      action: generateICS,
      color: 'text-gray-300'
    },
    {
      name: 'Outlook',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.23-.58.23h-8.547v-6.959l1.6 1.229c.102.086.227.13.376.13.148 0 .273-.044.375-.13l6.014-4.601V7.387zM24 5.39v.573l-6.77 5.234-1.412-1.083V5.39H24zM7.875 19.5c-.633 0-1.172-.22-1.617-.66-.445-.44-.668-.973-.668-1.597V6.757c0-.624.223-1.157.668-1.597.445-.44.984-.66 1.617-.66h8.25c.633 0 1.172.22 1.617.66.445.44.668.973.668 1.597v10.486c0 .624-.223 1.157-.668 1.597-.445.44-.984.66-1.617.66h-8.25z" />
          <path fill="#0078D4" d="M12 16.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
      ),
      action: () => window.open(outlookCalendarUrl, '_blank'),
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white font-medium hover:bg-white/20 hover:border-yellow-400/50 transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Add to Calendar</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="py-2">
              {calendarOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  <span className={option.color}>{option.icon}</span>
                  <span className="text-gray-300">{option.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
