import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Restaurants in Bahrain - Dining Guide 2026 | BahrainNights',
  description: 'Discover the best restaurants in Bahrain. From fine dining to casual eateries, find top-rated restaurants with reviews, menus, and reservations.',
  keywords: 'restaurants Bahrain, best restaurants Bahrain, dining Bahrain, where to eat Bahrain, fine dining Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/restaurants',
  },
  openGraph: {
    title: 'Best Restaurants in Bahrain - Dining Guide 2026',
    description: 'Discover the best restaurants in Bahrain. Fine dining, casual eateries, and hidden gems.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/restaurants',
  },
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
