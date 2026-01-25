import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, Cookie, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | BahrainNights',
  description: 'Privacy Policy for BahrainNights - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/20 to-pink-600/20 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        <section className="mb-12">
          <p className="text-lg text-gray-300 leading-relaxed">
            BahrainNights respects your privacy and is committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <h3 className="text-lg font-semibold text-white">Public Users (Google Sign-In)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address (from Google account)</li>
              <li>Profile picture (from Google account)</li>
              <li>Likes and favorites on the platform</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">Venue Owners</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Business name and CR number</li>
              <li>Contact information (name, email, phone)</li>
              <li>Venue details and photos</li>
              <li>Login credentials</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on our platform</li>
              <li>Referral source (how you found us)</li>
            </ul>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our platform</li>
              <li>To display venue and event information to users</li>
              <li>To enable likes and personalization features</li>
              <li>To communicate with venue owners about their listings</li>
              <li>To send important updates about the platform</li>
              <li>To improve our services and user experience</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To prevent fraud and ensure platform security</li>
            </ul>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. Data Sharing</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>We do NOT sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Companies that help us operate our platform (hosting, email, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <p className="text-green-400 font-semibold">We never sell your data to advertisers or third parties.</p>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">4. Data Protection</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>We take data security seriously and implement:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Industry-standard encryption for data in transit (HTTPS/TLS)</li>
              <li>Secure database management with Supabase</li>
              <li>Encrypted storage on AWS S3 with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal data</li>
              <li>Secure password hashing for venue accounts</li>
            </ul>
          </div>
        </section>

        {/* Cookies */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Cookie className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">5. Cookies</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences</li>
              <li>Analyze how our platform is used</li>
              <li>Improve our services</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the platform to function (authentication, security)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <p className="mt-4">
              You can control cookies through your browser settings. Note that disabling certain cookies may
              affect platform functionality.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain processing of your data</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:info@bahrainnights.com" className="text-amber-400 hover:underline">
                info@bahrainnights.com
              </a>
            </p>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-500/20 rounded-lg">
              <Database className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">7. Data Retention</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Account data is retained while your account is active</li>
              <li>Venue data is retained while the venue listing is active</li>
              <li>Analytics data is typically retained for 26 months</li>
              <li>You can request deletion of your data at any time</li>
            </ul>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">8. Children&apos;s Privacy</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>
              BahrainNights is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children. If you believe we have collected information from a child,
              please contact us immediately.
            </p>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Eye className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">9. Changes to This Policy</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">10. Contact Us</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>For privacy-related questions or to exercise your rights, contact us:</p>
            <div className="bg-gray-900 rounded-xl p-6 mt-4">
              <p className="font-semibold text-white mb-2">BahrainNights</p>
              <p>Email: <a href="mailto:info@bahrainnights.com" className="text-amber-400 hover:underline">info@bahrainnights.com</a></p>
              <p>Website: <a href="https://www.bahrainnights.com" className="text-amber-400 hover:underline">bahrainnights.com</a></p>
              <p className="mt-4 text-gray-400">Manama, Kingdom of Bahrain</p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 BahrainNights. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
