import { Suspense } from 'react';
import { Metadata } from 'next';
import AuthCard from '@/components/auth/AuthCard';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | BahrainNights',
  description: 'Reset your BahrainNights.com account password.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard variant="forgot-password">
      <Suspense fallback={<ForgotPasswordSkeleton />}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthCard>
  );
}

function ForgotPasswordSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-white/10 rounded w-64 mx-auto" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-24" />
        <div className="h-12 bg-white/10 rounded-xl" />
      </div>
      <div className="h-12 bg-white/10 rounded-xl" />
      <div className="h-4 bg-white/10 rounded w-24 mx-auto" />
    </div>
  );
}
