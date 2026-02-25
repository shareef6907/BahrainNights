import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guides | BahrainNights — Local Guides Coming Soon',
  description: 'Expert local guides to restaurants, nightlife, activities, and neighborhoods in Bahrain. Content coming soon.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Guides Coming Soon</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            We're creating verified, accurate guides to help you discover the best of Bahrain. 
            From restaurants and nightlife to activities and neighborhoods. Check back soon!
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
