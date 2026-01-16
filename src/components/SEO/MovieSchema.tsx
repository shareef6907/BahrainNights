interface MovieSchemaProps {
  movie: {
    title: string;
    description?: string | null;
    synopsis?: string | null;
    image_url?: string | null;
    poster_url?: string | null;
    backdrop_url?: string | null;
    release_date?: string | null;
    genre?: string | string[] | null;
    duration_minutes?: number | null;
    duration?: number | null;
    rating?: string | null;
    tmdb_rating?: number | null;
    slug?: string | null;
  };
}

export default function MovieSchema({ movie }: MovieSchemaProps) {
  const genres = Array.isArray(movie.genre)
    ? movie.genre.join(', ')
    : movie.genre || 'Entertainment';

  const duration = movie.duration_minutes || movie.duration;
  const movieUrl = movie.slug
    ? `https://bahrainnights.com/cinema/${movie.slug}`
    : 'https://bahrainnights.com/cinema';

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.synopsis || movie.description || `${movie.title} - Now showing in Bahrain cinemas`,
    image: movie.poster_url || movie.backdrop_url || movie.image_url || 'https://bahrainnights.com/og-image.jpg',
    datePublished: movie.release_date || new Date().toISOString().split('T')[0],
    genre: genres,
    url: movieUrl,
  };

  if (duration) {
    schema.duration = `PT${duration}M`;
  }

  if (movie.rating) {
    schema.contentRating = movie.rating;
  }

  if (movie.tmdb_rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: movie.tmdb_rating.toString(),
      bestRating: '10',
      ratingCount: '100',
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
