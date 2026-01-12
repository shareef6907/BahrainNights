'use client';

import { useState, useEffect } from 'react';
import CategoryPage from '@/components/category/CategoryPage';
import { CategoryConfig } from '@/lib/categories';
import type { Venue } from '@/types/database';

interface CategoryPageClientProps {
  config: CategoryConfig;
}

export default function CategoryPageClient({ config }: CategoryPageClientProps) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch venues filtered by tags
        const tagsParam = config.tags.join(',');
        const response = await fetch(`/api/public/venues?tags=${encodeURIComponent(tagsParam)}&limit=100`);

        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }

        const data = await response.json();
        setVenues(data.venues || []);
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError('Failed to load venues. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [config.tags]);

  return (
    <CategoryPage
      config={config}
      venues={venues}
      isLoading={isLoading}
      error={error}
    />
  );
}
