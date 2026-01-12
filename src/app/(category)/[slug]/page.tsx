import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';
import { getCategoryConfig, getAllCategorySlugs, CategoryConfig } from '@/lib/categories';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getCategoryConfig(slug);

  if (!config) {
    return {
      title: 'Category Not Found | BahrainNights',
    };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords.join(', '),
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://www.bahrainnights.com/${config.slug}`,
      siteName: 'BahrainNights',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.bahrainnights.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
    },
    alternates: {
      canonical: `https://www.bahrainnights.com/${config.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const config = getCategoryConfig(slug);

  if (!config) {
    notFound();
  }

  return <CategoryPageClient config={config} />;
}
