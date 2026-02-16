import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, Clock, Sun, Sunrise, Sunset, Calendar,
  Bell, Info, MapPin
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Ramadan Timings Bahrain 2026 | Iftar & Suhoor Times',
  description: 'Complete Ramadan 2026 prayer times and schedule for Bahrain. Daily iftar times, imsak (suhoor) times, and prayer schedule for the entire month of Ramadan.',
  keywords: 'Ramadan timings Bahrain 2026, iftar time Bahrain, imsak time Bahrain, suhoor time Bahrain, prayer times Ramadan Bahrain, fasting times Bahrain',
  openGraph: {
    title: 'Ramadan Timings Bahrain 2026 | Iftar & Suhoor Times',
    description: 'Complete Ramadan 2026 prayer times and schedule for Bahrain including iftar, imsak, and prayer times.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/timings',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/timings',
  },
};

// Ramadan 2026 is expected to start around Feb 28 / Mar 1, 2026
const ramadanTimings = [
  { day: 1, date: 'Sat, Mar 1', imsak: '4:43 AM', fajr: '4:53 AM', sunrise: '6:10 AM', dhuhr: '12:05 PM', asr: '3:22 PM', maghrib: '5:58 PM', isha: '7:13 PM' },
  { day: 2, date: 'Sun, Mar 2', imsak: '4:42 AM', fajr: '4:52 AM', sunrise: '6:09 AM', dhuhr: '12:05 PM', asr: '3:22 PM', maghrib: '5:59 PM', isha: '7:14 PM' },
  { day: 3, date: 'Mon, Mar 3', imsak: '4:41 AM', fajr: '4:51 AM', sunrise: '6:08 AM', dhuhr: '12:05 PM', asr: '3:23 PM', maghrib: '6:00 PM', isha: '7:15 PM' },
  { day: 4, date: 'Tue, Mar 4', imsak: '4:40 AM', fajr: '4:50 AM', sunrise: '6:07 AM', dhuhr: '12:04 PM', asr: '3:23 PM', maghrib: '6:01 PM', isha: '7:16 PM' },
  { day: 5, date: 'Wed, Mar 5', imsak: '4:39 AM', fajr: '4:49 AM', sunrise: '6:06 AM', dhuhr: '12:04 PM', asr: '3:23 PM', maghrib: '6:01 PM', isha: '7:16 PM' },
  { day: 6, date: 'Thu, Mar 6', imsak: '4:38 AM', fajr: '4:48 AM', sunrise: '6:05 AM', dhuhr: '12:04 PM', asr: '3:23 PM', maghrib: '6:02 PM', isha: '7:17 PM' },
  { day: 7, date: 'Fri, Mar 7', imsak: '4:37 AM', fajr: '4:47 AM', sunrise: '6:04 AM', dhuhr: '12:04 PM', asr: '3:24 PM', maghrib: '6:03 PM', isha: '7:18 PM' },
  { day: 8, date: 'Sat, Mar 8', imsak: '4:36 AM', fajr: '4:46 AM', sunrise: '6:03 AM', dhuhr: '12:03 PM', asr: '3:24 PM', maghrib: '6:03 PM', isha: '7:18 PM' },
  { day: 9, date: 'Sun, Mar 9', imsak: '4:35 AM', fajr: '4:45 AM', sunrise: '6:02 AM', dhuhr: '12:03 PM', asr: '3:24 PM', maghrib: '6:04 PM', isha: '7:19 PM' },
  { day: 10, date: 'Mon, Mar 10', imsak: '4:34 AM', fajr: '4:44 AM', sunrise: '6:00 AM', dhuhr: '12:03 PM', asr: '3:24 PM', maghrib: '6:05 PM', isha: '7:20 PM' },
  { day: 11, date: 'Tue, Mar 11', imsak: '4:33 AM', fajr: '4:43 AM', sunrise: '5:59 AM', dhuhr: '12:03 PM', asr: '3:24 PM', maghrib: '6:05 PM', isha: '7:20 PM' },
  { day: 12, date: 'Wed, Mar 12', imsak: '4:32 AM', fajr: '4:42 AM', sunrise: '5:58 AM', dhuhr: '12:02 PM', asr: '3:25 PM', maghrib: '6:06 PM', isha: '7:21 PM' },
  { day: 13, date: 'Thu, Mar 13', imsak: '4:30 AM', fajr: '4:40 AM', sunrise: '5:57 AM', dhuhr: '12:02 PM', asr: '3:25 PM', maghrib: '6:07 PM', isha: '7:22 PM' },
  { day: 14, date: 'Fri, Mar 14', imsak: '4:29 AM', fajr: '4:39 AM', sunrise: '5:56 AM', dhuhr: '12:02 PM', asr: '3:25 PM', maghrib: '6:07 PM', isha: '7:22 PM' },
  { day: 15, date: 'Sat, Mar 15', imsak: '4:28 AM', fajr: '4:38 AM', sunrise: '5:55 AM', dhuhr: '12:01 PM', asr: '3:25 PM', maghrib: '6:08 PM', isha: '7:23 PM' },
  { day: 16, date: 'Sun, Mar 16', imsak: '4:27 AM', fajr: '4:37 AM', sunrise: '5:53 AM', dhuhr: '12:01 PM', asr: '3:25 PM', maghrib: '6:08 PM', isha: '7:24 PM' },
  { day: 17, date: 'Mon, Mar 17', imsak: '4:26 AM', fajr: '4:36 AM', sunrise: '5:52 AM', dhuhr: '12:01 PM', asr: '3:25 PM', maghrib: '6:09 PM', isha: '7:24 PM' },
  { day: 18, date: 'Tue, Mar 18', imsak: '4:24 AM', fajr: '4:34 AM', sunrise: '5:51 AM', dhuhr: '12:00 PM', asr: '3:25 PM', maghrib: '6:10 PM', isha: '7:25 PM' },
  { day: 19, date: 'Wed, Mar 19', imsak: '4:23 AM', fajr: '4:33 AM', sunrise: '5:50 AM', dhuhr: '12:00 PM', asr: '3:25 PM', maghrib: '6:10 PM', isha: '7:25 PM' },
  { day: 20, date: 'Thu, Mar 20', imsak: '4:22 AM', fajr: '4:32 AM', sunrise: '5:49 AM', dhuhr: '12:00 PM', asr: '3:26 PM', maghrib: '6:11 PM', isha: '7:26 PM' },
  { day: 21, date: 'Fri, Mar 21', imsak: '4:21 AM', fajr: '4:31 AM', sunrise: '5:47 AM', dhuhr: '11:59 AM', asr: '3:26 PM', maghrib: '6:11 PM', isha: '7:27 PM' },
  { day: 22, date: 'Sat, Mar 22', imsak: '4:19 AM', fajr: '4:29 AM', sunrise: '5:46 AM', dhuhr: '11:59 AM', asr: '3:26 PM', maghrib: '6:12 PM', isha: '7:27 PM' },
  { day: 23, date: 'Sun, Mar 23', imsak: '4:18 AM', fajr: '4:28 AM', sunrise: '5:45 AM', dhuhr: '11:59 AM', asr: '3:26 PM', maghrib: '6:13 PM', isha: '7:28 PM' },
  { day: 24, date: 'Mon, Mar 24', imsak: '4:17 AM', fajr: '4:27 AM', sunrise: '5:44 AM', dhuhr: '11:58 AM', asr: '3:26 PM', maghrib: '6:13 PM', isha: '7:28 PM' },
  { day: 25, date: 'Tue, Mar 25', imsak: '4:16 AM', fajr: '4:26 AM', sunrise: '5:42 AM', dhuhr: '11:58 AM', asr: '3:26 PM', maghrib: '6:14 PM', isha: '7:29 PM' },
  { day: 26, date: 'Wed, Mar 26', imsak: '4:14 AM', fajr: '4:24 AM', sunrise: '5:41 AM', dhuhr: '11:58 AM', asr: '3:26 PM', maghrib: '6:14 PM', isha: '7:30 PM' },
  { day: 27, date: 'Thu, Mar 27', imsak: '4:13 AM', fajr: '4:23 AM', sunrise: '5:40 AM', dhuhr: '11:57 AM', asr: '3:26 PM', maghrib: '6:15 PM', isha: '7:30 PM' },
  { day: 28, date: 'Fri, Mar 28', imsak: '4:12 AM', fajr: '4:22 AM', sunrise: '5:39 AM', dhuhr: '11:57 AM', asr: '3:26 PM', maghrib: '6:15 PM', isha: '7:31 PM' },
  { day: 29, date: 'Sat, Mar 29', imsak: '4:10 AM', fajr: '4:20 AM', sunrise: '5:37 AM', dhuhr: '11:57 AM', asr: '3:26 PM', maghrib: '6:16 PM', isha: '7:31 PM' },
  { day: 30, date: 'Sun, Mar 30', imsak: '4:09 AM', fajr: '4:19 AM', sunrise: '5:36 AM', dhuhr: '11:56 AM', asr: '3:26 PM', maghrib: '6:17 PM', isha: '7:32 PM' },
];

const keyDates = [
  { name: 'First Day of Ramadan', date: 'March 1, 2026 (Expected)', note: 'Subject to moon sighting' },
  { name: 'Laylat al-Qadr (Night of Power)', date: 'March 27, 2026 (27th night)', note: 'Most significant night' },
  { name: 'Last Day of Ramadan', date: 'March 30, 2026 (Expected)', note: 'Subject to moon sighting' },
  { name: 'Eid al-Fitr', date: 'March 31, 2026 (Expected)', note: 'Subject to moon sighting' },
];

const faqs = [
  {
    q: 'When does Ramadan 2026 start in Bahrain?',
    a: 'Ramadan 2026 is expected to begin on Saturday, March 1, 2026 in Bahrain. However, the exact date depends on the sighting of the crescent moon. The Islamic Affairs Ministry will make the official announcement.',
  },
  {
    q: 'What time is iftar in Bahrain during Ramadan 2026?',
    a: 'Iftar time in Bahrain corresponds to Maghrib prayer time. In early March, iftar is around 5:58 PM, gradually moving to 6:17 PM by the end of Ramadan. Iftar time changes daily as sunset times shift.',
  },
  {
    q: 'What time should I stop eating for suhoor (imsak) in Bahrain?',
    a: 'Imsak (time to stop eating for suhoor) is approximately 10 minutes before Fajr prayer. In early March, this is around 4:43 AM, moving to 4:09 AM by late March. It\'s recommended to finish eating a few minutes before imsak.',
  },
  {
    q: 'What is the difference between imsak and Fajr time?',
    a: 'Imsak is the precautionary time to stop eating before Fajr, typically 10-15 minutes before Fajr prayer. Fajr is the actual start of the fasting period. Many people use imsak time as a safety margin to ensure they stop eating before the fast begins.',
  },
  {
    q: 'How long is the fast in Bahrain during Ramadan 2026?',
    a: 'Fasting hours in Bahrain during Ramadan 2026 range from approximately 13 hours in early March to about 14 hours by the end of the month. This is shorter than many countries further north, making Bahrain relatively easier for fasting.',
  },
  {
    q: 'Where can I find daily prayer times in Bahrain?',
    a: 'Daily prayer times are announced by the Ministry of Justice, Islamic Affairs and Endowments. You can also check local mosque schedules, use prayer time apps, or follow local media for daily updates during Ramadan.',
  },
];

export default function RamadanTimingsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Ramadan Timings', url: 'https://www.bahrainnights.com/guides/ramadan/timings' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ramadan Timings Bahrain 2026 | Iftar & Suhoor Times',
            description: 'Complete Ramadan 2026 prayer times and schedule for Bahrain.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/timings',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-orange-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ramadan Timings{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500">
                Bahrain 2026
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Complete Ramadan prayer schedule for Bahrain. Daily iftar, imsak, and prayer times 
              for the entire holy month of Ramadan 1447 AH / March 2026.
            </p>
          </div>
        </section>

        {/* Today's Times Highlight */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                First Day of Ramadan 2026 - March 1
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Imsak</span>
                  </div>
                  <span className="text-2xl font-bold text-white">4:43 AM</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                    <Sunrise className="w-4 h-4" />
                    <span className="text-sm">Fajr</span>
                  </div>
                  <span className="text-2xl font-bold text-white">4:53 AM</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                    <Sunset className="w-4 h-4" />
                    <span className="text-sm">Iftar</span>
                  </div>
                  <span className="text-2xl font-bold text-white">5:58 PM</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Isha</span>
                  </div>
                  <span className="text-2xl font-bold text-white">7:13 PM</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Fasting duration: ~13 hours | Times for Manama, Bahrain
              </p>
            </div>
          </div>
        </section>

        {/* Key Dates */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-amber-400" />
              Key Dates - Ramadan 2026
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {keyDates.map((date, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold text-white">{date.name}</h3>
                  <p className="text-amber-400 font-medium">{date.date}</p>
                  <p className="text-sm text-gray-400">{date.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Calendar */}
        <section className="py-12 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400" />
              Complete Ramadan 2026 Prayer Times
            </h2>
            <p className="text-gray-400 mb-6">
              Times shown for Manama, Bahrain. Iftar time = Maghrib prayer time.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-2 text-left text-gray-400 font-medium">Day</th>
                    <th className="py-3 px-2 text-left text-gray-400 font-medium">Date</th>
                    <th className="py-3 px-2 text-center text-amber-400 font-medium">Imsak</th>
                    <th className="py-3 px-2 text-center text-gray-400 font-medium">Fajr</th>
                    <th className="py-3 px-2 text-center text-gray-400 font-medium hidden md:table-cell">Sunrise</th>
                    <th className="py-3 px-2 text-center text-gray-400 font-medium hidden md:table-cell">Dhuhr</th>
                    <th className="py-3 px-2 text-center text-gray-400 font-medium hidden md:table-cell">Asr</th>
                    <th className="py-3 px-2 text-center text-yellow-400 font-medium">Maghrib/Iftar</th>
                    <th className="py-3 px-2 text-center text-gray-400 font-medium">Isha</th>
                  </tr>
                </thead>
                <tbody>
                  {ramadanTimings.map((day, index) => (
                    <tr key={index} className={`border-b border-white/5 ${day.day === 27 ? 'bg-amber-500/10' : ''}`}>
                      <td className="py-3 px-2 text-white font-medium">{day.day}</td>
                      <td className="py-3 px-2 text-gray-300">{day.date}</td>
                      <td className="py-3 px-2 text-center text-amber-400 font-medium">{day.imsak}</td>
                      <td className="py-3 px-2 text-center text-gray-300">{day.fajr}</td>
                      <td className="py-3 px-2 text-center text-gray-300 hidden md:table-cell">{day.sunrise}</td>
                      <td className="py-3 px-2 text-center text-gray-300 hidden md:table-cell">{day.dhuhr}</td>
                      <td className="py-3 px-2 text-center text-gray-300 hidden md:table-cell">{day.asr}</td>
                      <td className="py-3 px-2 text-center text-yellow-400 font-medium">{day.maghrib}</td>
                      <td className="py-3 px-2 text-center text-gray-300">{day.isha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-sm text-amber-400 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Highlighted row (Day 27) is Laylat al-Qadr - the Night of Power
              </p>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Info className="w-6 h-6 text-amber-400" />
              Tips for Your First Day of Fasting
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-amber-400" />
                  Suhoor Tips
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Wake up at least 30-45 minutes before imsak</li>
                  <li>• Eat complex carbs, protein, and fruits</li>
                  <li>• Drink plenty of water</li>
                  <li>• Avoid salty and fried foods</li>
                  <li>• Finish eating 10-15 min before Fajr</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Sunset className="w-5 h-5 text-yellow-400" />
                  Iftar Tips
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Break fast with dates and water (Sunnah)</li>
                  <li>• Start with light foods, then main meal</li>
                  <li>• Eat slowly - don&apos;t rush</li>
                  <li>• Stay hydrated throughout the evening</li>
                  <li>• Don&apos;t overeat - moderation is key</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-400" />
                  During the Day
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Stay in cool environments when possible</li>
                  <li>• Minimize physical exertion midday</li>
                  <li>• Rest during hottest hours if possible</li>
                  <li>• Keep busy with work or worship</li>
                  <li>• Avoid direct sunlight when possible</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Prayer Times
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Taraweeh prayers after Isha</li>
                  <li>• Most mosques have congregation prayers</li>
                  <li>• Qiyam (night prayers) last 10 nights</li>
                  <li>• Seek Laylat al-Qadr odd nights</li>
                  <li>• Use prayer apps for notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Note */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Location Note
              </h3>
              <p className="text-gray-300 text-sm">
                These times are calculated for Manama, Bahrain (26.2285° N, 50.5860° E). 
                Times may vary by 1-2 minutes in other parts of Bahrain. For official times, 
                refer to the Ministry of Justice, Islamic Affairs and Endowments or your local mosque.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Planning Your Ramadan?</h2>
            <p className="text-gray-400 mb-6">
              Explore our complete Ramadan guides for the best dining and events in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Best Iftar Spots
              </Link>
              <Link href="/guides/ramadan/suhoor" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Suhoor Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Explore More"
          links={[
            { href: '/guides/ramadan', title: 'Complete Ramadan Guide' },
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Venues' },
            { href: '/guides/ramadan/suhoor', title: 'Suhoor Spots' },
            { href: '/guides/ramadan/events', title: 'Ramadan Events' },
            { href: '/events', title: 'All Events' },
          ]}
        />
      </main>
    </>
  );
}
