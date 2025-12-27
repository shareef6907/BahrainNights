'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Mail, Phone, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function PendingApprovalPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // If not logged in, redirect to login
      if (!user) {
        router.push('/login');
        return;
      }

      // If venue is approved, redirect to dashboard
      if (user.venue?.status === 'approved') {
        router.push('/dashboard');
        return;
      }

      // If admin, redirect to admin panel
      if (user.role === 'admin') {
        router.push('/admin');
        return;
      }
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
      </div>
    );
  }

  if (!user || !user.venue) {
    return null;
  }

  const isRejected = user.venue.status === 'rejected';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-yellow-600/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              BahrainNights
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
              {isRejected ? (
                <>
                  {/* Rejected State */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
                  >
                    <span className="text-4xl">❌</span>
                  </motion.div>

                  <h1 className="text-2xl font-bold text-white mb-2">
                    Application Not Approved
                  </h1>
                  <p className="text-gray-400 mb-6">
                    Unfortunately, your venue application for{' '}
                    <span className="text-white font-medium">{user.venue.name}</span>{' '}
                    was not approved at this time.
                  </p>

                  <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                    <p className="text-gray-300 text-sm">
                      This could be due to incomplete information or not meeting our guidelines.
                      Please contact us for more details.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Pending State */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center"
                  >
                    <Clock className="w-10 h-10 text-yellow-400" />
                  </motion.div>

                  <h1 className="text-2xl font-bold text-white mb-2">
                    Pending Approval
                  </h1>
                  <p className="text-gray-400 mb-6">
                    Your venue <span className="text-white font-medium">{user.venue.name}</span> is being reviewed.
                    We typically respond within 24-48 hours.
                  </p>

                  {/* What&apos;s Next */}
                  <div className="bg-white/5 rounded-xl p-6 mb-6 text-left">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      What happens next?
                    </h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-400 text-sm font-bold">1</span>
                        </span>
                        <span>Our team reviews your venue information</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-400 text-sm font-bold">2</span>
                        </span>
                        <span>You&apos;ll receive an email once approved</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-400 text-sm font-bold">3</span>
                        </span>
                        <span>Start posting events and promoting your venue for FREE!</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}

              {/* Contact Info */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-400 text-sm mb-4">
                  Questions? Contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:support@bahrainnights.com"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>support@bahrainnights.com</span>
                  </a>
                  <a
                    href="tel:+97317000000"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+973 1700 0000</span>
                  </a>
                </div>
              </div>

              {/* Back to Home */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-8 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
