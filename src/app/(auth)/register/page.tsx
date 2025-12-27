import { Suspense } from 'react';
import { Metadata } from 'next';
import AuthCard from '@/components/auth/AuthCard';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register Your Venue | BahrainNights',
  description: 'Join BahrainNights.com and promote your venue to thousands of visitors for free.',
};

export default function RegisterPage() {
  return (
    <AuthCard variant="register">
      <Suspense fallback={<RegisterFormSkeleton />}>
        <RegisterForm />
      </Suspense>
    </AuthCard>
  );
}

function RegisterFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-white/10 rounded w-56 mx-auto" />
      </div>
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-8 h-8 bg-white/10 rounded-full" />
        ))}
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-24" />
          <div className="h-12 bg-white/10 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-20" />
          <div className="h-12 bg-white/10 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-28" />
          <div className="h-12 bg-white/10 rounded-xl" />
        </div>
      </div>
      <div className="h-12 bg-white/10 rounded-xl" />
    </div>
  );
}
