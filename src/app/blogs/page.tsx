import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | BahrainNights — Guides & Reviews Coming Soon',
  description: 'Expert local guides and reviews about restaurants, nightlife, and things to do in Bahrain. Content coming soon.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/blogs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Blog Coming Soon</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            We're working on creating verified, accurate guides and articles about the best 
            restaurants, nightlife, and things to do in Bahrain. Check back soon!
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
