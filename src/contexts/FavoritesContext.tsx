'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type FavoriteType = 'event' | 'place' | 'movie' | 'attraction';

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  title: string;
  slug: string;
  image?: string;
  addedAt: number;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFavorite: (id: string, type: FavoriteType) => void;
  isFavorite: (id: string, type: FavoriteType) => boolean;
  clearAll: () => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'bahrain_nights_favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isHydrated]);

  const addFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavorites(prev => {
      // Check if already exists
      const exists = prev.some(f => f.id === item.id && f.type === item.type);
      if (exists) return prev;
      
      // Add new favorite (limit to 50 items)
      const newFavorite: FavoriteItem = {
        ...item,
        addedAt: Date.now(),
      };
      const updated = [newFavorite, ...prev].slice(0, 50);
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((id: string, type: FavoriteType) => {
    setFavorites(prev => prev.filter(f => !(f.id === id && f.type === type)));
  }, []);

  const isFavorite = useCallback((id: string, type: FavoriteType) => {
    return favorites.some(f => f.id === id && f.type === type);
  }, [favorites]);

  const clearAll = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearAll,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
