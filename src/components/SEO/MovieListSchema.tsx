/**
 * MovieListSchema Component
 * Generates JSON-LD structured data for movie/cinema listing pages
 */

interface MovieItem {
  title: string;
  slug: string;
  description?: string | null;
  poster_url?: string | null;
  rating?: number | null;
  duration_minutes?: number | null;
  genre?: string[] | null;
}

interface MovieListSchemaProps {
  movies: MovieItem[];
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function MovieListSchema({
  movies,
  pageTitle,
  pageDescription,
  pageUrl,
}: MovieListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    numberOfItems: movies.length,
    itemListElement: movies.slice(0, 10).map((movie, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Movie',
        name: movie.title,
        url: `https://www.bahrainnights.com/cinema/${movie.slug}`,
        description: movie.description?.slice(0, 200) || movie.title,
        image: movie.poster_url || 'https://www.bahrainnights.com/og-image.jpg',
        ...(movie.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: movie.rating,
            bestRating: 10,
            worstRating: 0,
          },
        }),
        ...(movie.duration_minutes && {
          duration: `PT${movie.duration_minutes}M`,
        }),
        ...(movie.genre && movie.genre.length > 0 && {
          genre: movie.genre,
        }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
