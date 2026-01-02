'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Suspense,
} from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Types
export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
}

interface PublicAuthContextType {
  user: PublicUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  likedVenueIds: string[];
  loginWithGoogle: (returnUrl?: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  toggleLike: (venueId: string) => Promise<{ success: boolean; liked: boolean; likeCount: number }>;
  isVenueLiked: (venueId: string) => boolean;
}

const PublicAuthContext = createContext<PublicAuthContextType | undefined>(undefined);

// Inner component that handles auth error from URL params (uses useSearchParams)
function AuthErrorHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams) return;
    const authError = searchParams.get('auth_error');
    if (authError) {
      // Show error to user
      alert(`Login Error: ${decodeURIComponent(authError)}`);
      // Remove the error from URL to prevent showing it again
      const params = new URLSearchParams(searchParams.toString());
      params.delete('auth_error');
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      if (newUrl) {
        router.replace(newUrl);
      }
    }
  }, [searchParams, router, pathname]);

  return null;
}

export function PublicAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedVenueIds, setLikedVenueIds] = useState<string[]>([]);

  // Check authentication status on mount
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/public/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);

        // Fetch liked venues if user is authenticated
        if (data.user) {
          const likesResponse = await fetch('/api/public/likes', {
            credentials: 'include',
          });
          if (likesResponse.ok) {
            const likesData = await likesResponse.json();
            setLikedVenueIds(likesData.likedVenueIds || []);
          }
        }
      } else {
        setUser(null);
        setLikedVenueIds([]);
      }
    } catch {
      setUser(null);
      setLikedVenueIds([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login with Google
  const loginWithGoogle = (returnUrl?: string) => {
    const url = returnUrl || window.location.pathname;
    window.location.href = `/api/auth/google?returnUrl=${encodeURIComponent(url)}`;
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/public/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      setLikedVenueIds([]);
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    await checkAuth();
  };

  // Toggle like on a venue
  const toggleLike = async (venueId: string): Promise<{
    success: boolean;
    liked: boolean;
    likeCount: number;
  }> => {
    try {
      const response = await fetch('/api/public/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ venueId }),
      });

      const data = await response.json();

      if (response.status === 401 && data.requireAuth) {
        // Redirect to login
        loginWithGoogle();
        return { success: false, liked: false, likeCount: 0 };
      }

      if (data.success) {
        // Update local state
        setLikedVenueIds((prev) =>
          data.liked
            ? [...prev, venueId]
            : prev.filter((id) => id !== venueId)
        );
        return {
          success: true,
          liked: data.liked,
          likeCount: data.likeCount,
        };
      }

      return { success: false, liked: false, likeCount: 0 };
    } catch (error) {
      console.error('Error toggling like:', error);
      return { success: false, liked: false, likeCount: 0 };
    }
  };

  // Check if venue is liked
  const isVenueLiked = (venueId: string): boolean => {
    return likedVenueIds.includes(venueId);
  };

  const value: PublicAuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    likedVenueIds,
    loginWithGoogle,
    logout,
    refreshUser,
    toggleLike,
    isVenueLiked,
  };

  return (
    <PublicAuthContext.Provider value={value}>
      <Suspense fallback={null}>
        <AuthErrorHandler />
      </Suspense>
      {children}
    </PublicAuthContext.Provider>
  );
}

export function usePublicAuth(): PublicAuthContextType {
  const context = useContext(PublicAuthContext);
  if (context === undefined) {
    throw new Error('usePublicAuth must be used within a PublicAuthProvider');
  }
  return context;
}
