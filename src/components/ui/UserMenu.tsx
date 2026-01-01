'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { User, LogOut, Heart, ChevronDown } from 'lucide-react';
import { usePublicAuth } from '@/context/PublicAuthContext';
import { cn } from '@/lib/utils';

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const { user, isAuthenticated, isLoading, loginWithGoogle, logout, likedVenueIds } = usePublicAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className={cn('w-10 h-10 rounded-full bg-white/10 animate-pulse', className)} />
    );
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => loginWithGoogle()}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full',
          'bg-white/10 hover:bg-white/20 transition-colors',
          'text-white text-sm font-medium',
          className
        )}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Sign in
      </button>
    );
  }

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 p-1 rounded-full',
          'hover:bg-white/10 transition-colors',
          isOpen && 'bg-white/10'
        )}
      >
        {user?.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.name || 'User'}
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        )}
        <ChevronDown
          size={16}
          className={cn(
            'text-white/70 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-900 border border-white/10 shadow-lg py-2 z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white font-medium truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-white/50 text-sm truncate">
              {user?.email}
            </p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <a
              href="/my-likes"
              className="flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Heart size={18} />
              <span>My Likes</span>
              {likedVenueIds.length > 0 && (
                <span className="ml-auto bg-pink-500/20 text-pink-400 text-xs px-2 py-0.5 rounded-full">
                  {likedVenueIds.length}
                </span>
              )}
            </a>
          </div>

          {/* Logout */}
          <div className="border-t border-white/10 pt-1">
            <button
              onClick={async () => {
                setIsOpen(false);
                await logout();
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
